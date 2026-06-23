'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useDb } from '../../context/db-context';

export default function AttendancePage() {
  const {
    students,
    courses,
    faculty,
    updateStudent
  } = useDb();

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const session = sessionStorage.getItem('aegis_erp_session');
      if (session) {
        setCurrentUser(JSON.parse(session));
      }
    }
  }, []);

  const activeCourses = courses.filter(c => c.status === 'Active');
  const facultyMember = faculty ? faculty.find(f => f.email.toLowerCase() === currentUser?.email.toLowerCase()) : null;
  const allowedCourses = currentUser?.role === 'admin' ? activeCourses : (activeCourses.filter(c => c.facultyId === facultyMember?.id));
  
  // Selection states
  const [selectedCourseCode, setSelectedCourseCode] = useState('');
  const [sessionDate, setSessionDate] = useState('2026-06-08');

  // Enrolled students local state
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [attendanceMap, setAttendanceMap] = useState({}); // studentId -> boolean (present)

  // AI predictions state
  const [aiPeak, setAiPeak] = useState('Calculating...');
  const [aiDip, setAiDip] = useState('Calculating...');
  const [aiAvg, setAiAvg] = useState('Calculating...');
  const [aiProjecting, setAiProjecting] = useState(false);

  // Chart ref
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  // Set default course code on load
  useEffect(() => {
    if (allowedCourses.length > 0 && !selectedCourseCode) {
      setSelectedCourseCode(allowedCourses[0].code);
    }
  }, [allowedCourses, selectedCourseCode]);

  // Load students when course code changes
  useEffect(() => {
    if (!selectedCourseCode) return;

    const course = activeCourses.find(c => c.code === selectedCourseCode);
    if (!course) return;

    // Filter enrolled or fallback to dept
    let list = students.filter(s => s.courses.includes(selectedCourseCode));
    if (list.length === 0) {
      list = students.filter(s => s.dept === course.dept);
    }

    setEnrolledStudents(list);

    // Default everyone to present (true)
    const initialMap = {};
    list.forEach(s => {
      initialMap[s.id] = true;
    });
    setAttendanceMap(initialMap);
  }, [selectedCourseCode, students]);

  // Toggle Attendance checkbox
  const handleCheckboxChange = (studentId) => {
    setAttendanceMap(prev => ({
      ...prev,
      [studentId]: !prev[studentId]
    }));
  };

  // Commit attendance changes
  const handleCommitAttendance = () => {
    let presentCount = 0;
    enrolledStudents.forEach(s => {
      const isPresent = !!attendanceMap[s.id];
      if (isPresent) presentCount++;

      // Modify student attendance score locally
      let currentAttend = s.attendance;
      let newAttend = currentAttend;
      if (isPresent && currentAttend < 100) {
        newAttend = Math.min(100, Math.round(currentAttend + (100 - currentAttend) * 0.05));
      } else if (!isPresent && currentAttend > 0) {
        newAttend = Math.max(0, Math.round(currentAttend - currentAttend * 0.05));
      }

      if (newAttend !== currentAttend) {
        updateStudent(s.id, { attendance: newAttend });
      }
    });

    alert(`Attendance recorded for ${sessionDate}! Course: ${selectedCourseCode}.\n${presentCount} students marked present.`);
  };

  // Run TensorFlow Projection
  const runAttendanceProjection = async () => {
    if (typeof window === 'undefined' || !window.tf || !canvasRef.current) return;
    const tf = window.tf;
    const Chart = window.Chart;

    setAiProjecting(true);

    try {
      const xVal = [0, 1, 2, 3, 4, 5, 6, 7];
      const yVal = [0.88, 0.92, 0.94, 0.85, 0.78, 0.89, 0.91, 0.95];

      const xs = tf.tensor2d(xVal.map(x => x / 7), [8, 1]);
      const ys = tf.tensor2d(yVal, [8, 1]);

      const model = tf.sequential();
      model.add(tf.layers.dense({ units: 2, activation: 'tanh', inputShape: [1] }));
      model.add(tf.layers.dense({ units: 1 }));
      
      model.compile({ optimizer: tf.train.adam(0.1), loss: 'meanSquaredError' });
      await model.fit(xs, ys, { epochs: 20, verbose: 0 });

      const predictX = [8, 9, 10, 11, 12];
      const predictTensor = tf.tensor2d(predictX.map(x => x / 7), [5, 1]);
      const predictOutput = model.predict(predictTensor);
      const outputData = await predictOutput.data();

      xs.dispose();
      ys.dispose();
      predictTensor.dispose();
      predictOutput.dispose();
      model.dispose();

      const projectedY = Array.from(outputData).map(val => Math.round(Math.max(0.4, Math.min(1.0, val)) * 100));

      const avg = Math.round(projectedY.reduce((a,b) => a+b, 0) / projectedY.length);
      const max = Math.max(...projectedY);
      const min = Math.min(...projectedY);

      setAiPeak(max + '%');
      setAiDip(min + '%');
      setAiAvg(avg + '%');

      // Update / Create Chart
      if (chartRef.current) chartRef.current.destroy();

      chartRef.current = new Chart(canvasRef.current, {
        type: 'line',
        data: {
          labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          datasets: [{
            label: 'Projected Attendance Rate (%)',
            data: projectedY,
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.3
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: {
              grid: { color: 'rgba(255, 255, 255, 0.05)' },
              ticks: { color: '#94a3b8' },
              min: 40,
              max: 100
            },
            x: {
              grid: { display: false },
              ticks: { color: '#94a3b8' }
            }
          }
        }
      });
    } catch (err) {
      console.error('TF Attendance projection error:', err);
    } finally {
      setAiProjecting(false);
    }
  };

  // Run AI Projection on mount
  useEffect(() => {
    setTimeout(runAttendanceProjection, 300);
  }, []);

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="w-8 h-8 border-4 border-brand-primary/30 border-t-brand-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (currentUser.role === 'student') {
    const s = students.find(item => item.email.toLowerCase() === currentUser.email.toLowerCase()) || {
      name: currentUser.name,
      id: 'STU001',
      dept: 'CS',
      attendance: 92,
      courses: ['CS101', 'CS202', 'CS302']
    };

    const timetableItems = [
      { day: 'Monday', time: '09:00 AM - 11:00 AM', code: 'CS101', title: 'Intro Programming', venue: 'Hall A', color: 'var(--color-brand-primary)' },
      { day: 'Tuesday', time: '11:30 AM - 01:30 PM', code: 'EE201', title: 'Signals and Systems', venue: 'Hall B', color: 'var(--color-brand-accent-cyan)' },
      { day: 'Wednesday', time: '02:00 PM - 04:00 PM', code: 'ME102', title: 'Engineering Thermodynamics', venue: 'Hall C', color: 'var(--color-brand-accent-amber)' },
      { day: 'Thursday', time: '09:00 AM - 11:00 AM', code: 'CS202', title: 'Data Structures', venue: 'Lab 3', color: 'var(--color-brand-primary)' },
      { day: 'Friday', time: '10:00 AM - 12:00 PM', code: 'BI101', title: 'Biotechnology Basics', venue: 'BI Lab', color: 'var(--color-brand-accent-emerald)' }
    ];

    const mySchedule = timetableItems.filter(item => s.courses?.includes(item.code));

    return (
      <div className="flex flex-col gap-6 md:gap-8">
        <div className="page-header animate-fade-in flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-brand-text-main">My Attendance & Schedule</h1>
            <p className="text-brand-text-muted mt-1 text-sm">Review your weekly classes timetable and monitor academic attendance progress.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-6">
          <div className="card p-6 bg-brand-bg-secondary border border-brand-border rounded-2xl flex flex-col gap-5 justify-between">
            <div>
              <h3 className="font-display text-lg font-bold text-brand-text-main mb-3">Attendance Summary</h3>
              <div className="flex items-center gap-4 py-2">
                <div className="relative w-20 h-20 flex items-center justify-center rounded-full border-4 border-brand-accent-emerald/20">
                  <span className="text-xl font-mono font-bold text-brand-accent-emerald">{s.attendance}%</span>
                </div>
                <div>
                  <strong className="text-sm text-brand-text-main block">Good Academic Standing</strong>
                  <span className="text-xs text-brand-text-muted">Minimum requirement: 75%</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-brand-border/40 pt-4">
              {s.courses?.map(code => {
                const c = courses.find(item => item.code === code);
                const pct = s.attendance ? Math.min(100, s.attendance + (code.charCodeAt(0) % 7) - 3) : 85;
                return (
                  <div key={code} className="flex justify-between items-center text-xs">
                    <span className="text-brand-text-muted font-medium">{c ? c.title : code} ({code})</span>
                    <strong className={pct >= 75 ? 'text-brand-accent-emerald font-mono' : 'text-brand-accent-ruby font-mono'}>{pct}%</strong>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card p-6 bg-brand-bg-secondary border border-brand-border rounded-2xl flex flex-col gap-4">
            <h3 className="font-display text-lg font-bold text-brand-text-main">My Weekly Timetable</h3>
            <p className="text-brand-text-muted text-xs">Classes schedule dynamically synced to your course selections.</p>
            
            <div className="flex flex-col gap-3">
              {mySchedule.length === 0 ? (
                <p className="text-brand-text-muted text-xs text-center py-6">No classes scheduled for your enrolled courses.</p>
              ) : (
                mySchedule.map((item, idx) => (
                  <div key={idx} className="p-4 border border-brand-border rounded-2xl flex justify-between items-center bg-brand-bg-tertiary hover:border-brand-primary/20 transition-all duration-200" style={{ borderLeft: `4px solid ${item.color}` }}>
                    <div>
                      <strong className="text-sm font-semibold text-brand-text-main">{item.day} ({item.time})</strong>
                      <div className="text-xs text-brand-text-muted mt-1">{item.code} - {item.title} ({item.venue})</div>
                    </div>
                    <span className="badge bg-brand-primary/10 text-brand-primary text-xs px-2 py-0.5 rounded">Active</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <div className="page-header animate-fade-in flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-display font-bold text-brand-text-main">Attendance & Weekly Schedule</h1>
          <p className="text-brand-text-muted mt-1 text-sm">Mark class attendances, view department timetables, and monitor student academic participation.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Attendance Sheet Panel */}
        <div className="card p-6 bg-brand-bg-secondary border border-brand-border rounded-2xl flex flex-col gap-4">
          <h3 className="font-display text-lg font-bold text-brand-text-main">Register Attendance</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group flex flex-col gap-1.5">
              <label className="form-label text-xs font-semibold text-brand-text-muted">Select Course</label>
              <select 
                className="bg-brand-bg-tertiary border border-brand-border text-brand-text-main p-2.5 rounded-xl outline-none cursor-pointer"
                value={selectedCourseCode}
                onChange={(e) => setSelectedCourseCode(e.target.value)}
              >
                {allowedCourses.map(c => (
                  <option key={c.code} value={c.code}>{c.code} - {c.title}</option>
                ))}
              </select>
            </div>
            <div className="form-group flex flex-col gap-1.5">
              <label className="form-label text-xs font-semibold text-brand-text-muted">Session Date</label>
              <input 
                type="date" 
                className="bg-brand-bg-tertiary border border-brand-border text-brand-text-main p-2.5 rounded-xl outline-none"
                value={sessionDate}
                onChange={(e) => setSessionDate(e.target.value)}
              />
            </div>
          </div>

          <div className="max-h-[380px] overflow-y-auto border border-brand-border rounded-xl bg-brand-bg-primary p-3">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-brand-border text-brand-text-subtle text-xs uppercase font-semibold">
                  <th className="p-2.5">Student Name</th>
                  <th className="p-2.5 text-center">Mark Attendance</th>
                </tr>
              </thead>
              <tbody>
                {enrolledStudents.length === 0 ? (
                  <tr>
                    <td colSpan="2" className="text-center text-brand-text-muted p-4 text-xs">No students enrolled in this department section.</td>
                  </tr>
                ) : (
                  enrolledStudents.map(s => (
                    <tr key={s.id} className="border-b border-brand-border/60 text-sm text-brand-text-main">
                      <td className="p-2.5">
                        <div className="flex items-center gap-2">
                          <img src={s.avatar} className="w-7 h-7 rounded-full object-cover border border-brand-border shrink-0" alt="" />
                          <div>
                            <strong>{s.name}</strong> <code className="text-[0.7rem] text-brand-text-subtle font-mono ml-1">{s.id}</code>
                          </div>
                        </div>
                      </td>
                      <td className="p-2.5 text-center">
                        <input 
                          type="checkbox" 
                          checked={!!attendanceMap[s.id]}
                          onChange={() => handleCheckboxChange(s.id)}
                          className="w-4 h-4 cursor-pointer accent-brand-primary"
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <button className="btn btn-primary w-full cursor-pointer py-3" onClick={handleCommitAttendance}>Commit Session Attendance</button>
        </div>

        {/* Weekly Timetable Grid */}
        <div className="card p-6 bg-brand-bg-secondary border border-brand-border rounded-2xl flex flex-col gap-4">
          <h3 className="font-display text-lg font-bold text-brand-text-main">Campus Master Schedule</h3>
          <p className="text-brand-text-muted text-xs">Standard working hours block (Monday - Friday).</p>
          
          <div className="flex flex-col gap-3">
            <div className="p-4.5 border border-brand-border rounded-2xl flex justify-between items-center bg-brand-primary/5">
              <div>
                <strong className="text-brand-primary text-sm font-semibold">Monday (09:00 AM - 11:00 AM)</strong>
                <div className="text-xs text-brand-text-muted mt-1">CS101 - Intro Programming (Hall A)</div>
              </div>
              <span className="badge bg-brand-primary/10 text-brand-primary text-xs px-2 py-0.5 rounded">Active</span>
            </div>
            
            <div className="p-4.5 border border-brand-border rounded-2xl flex justify-between items-center">
              <div>
                <strong className="text-brand-accent-cyan text-sm font-semibold">Tuesday (11:30 AM - 01:30 PM)</strong>
                <div className="text-xs text-brand-text-muted mt-1">EE201 - Signals and Systems (Hall B)</div>
              </div>
              <span className="badge bg-brand-accent-cyan/10 text-brand-accent-cyan text-xs px-2 py-0.5 rounded">Active</span>
            </div>

            <div className="p-4.5 border border-brand-border rounded-2xl flex justify-between items-center">
              <div>
                <strong className="text-brand-accent-amber text-sm font-semibold">Wednesday (02:00 PM - 04:00 PM)</strong>
                <div className="text-xs text-brand-text-muted mt-1">ME102 - Engineering Thermodynamics (Hall C)</div>
              </div>
              <span className="badge bg-brand-accent-amber/10 text-brand-accent-amber text-xs px-2 py-0.5 rounded">Active</span>
            </div>

            <div className="p-4.5 border border-brand-border rounded-2xl flex justify-between items-center">
              <div>
                <strong className="text-brand-primary text-sm font-semibold">Thursday (09:00 AM - 11:00 AM)</strong>
                <div className="text-xs text-brand-text-muted mt-1">CS202 - Data Structures (Lab 3)</div>
              </div>
              <span className="badge bg-brand-primary/10 text-brand-primary text-xs px-2 py-0.5 rounded">Active</span>
            </div>

            <div className="p-4.5 border border-brand-border rounded-2xl flex justify-between items-center">
              <div>
                <strong className="text-brand-accent-emerald text-sm font-semibold">Friday (10:00 AM - 12:00 PM)</strong>
                <div className="text-xs text-brand-text-muted mt-1">BI101 - Biotechnology Basics (BI Lab)</div>
              </div>
              <span className="badge bg-brand-accent-emerald/10 text-brand-accent-emerald text-xs px-2 py-0.5 rounded">Active</span>
            </div>
          </div>
        </div>

      </div>

      {/* AI Attendance Forecast Panel */}
      {currentUser?.role === 'admin' && (
        <div className="card p-6 bg-brand-bg-secondary border border-brand-border rounded-2xl flex flex-col gap-4">
          <h3 className="font-display text-lg font-bold text-brand-text-main">AI Attendance & Class Participation Forecast</h3>
          <p className="text-brand-text-muted text-xs">Uses a sequential time-series model to predict daily student attendance rates for the upcoming week based on historical records.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
            <div className="h-[220px] relative">
              <canvas ref={canvasRef}></canvas>
            </div>
            <div className="flex flex-col gap-4 p-5 rounded-2xl border border-brand-border bg-brand-bg-tertiary">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-text-main font-display pb-2 border-b border-brand-border/40">Projection Summary</h4>
              <div className="text-xs text-brand-text-muted flex flex-col gap-2.5">
                <div className="flex justify-between items-center">
                  <span>Predicted Mid-week Peak:</span>
                  <strong className="text-brand-accent-emerald font-mono text-sm">{aiPeak}</strong>
                </div>
                <div className="flex justify-between items-center">
                  <span>Predicted Weekend Dip:</span>
                  <strong className="text-brand-accent-ruby font-mono text-sm">{aiDip}</strong>
                </div>
                <div className="flex justify-between border-t border-brand-border/40 pt-2.5 items-center">
                  <span>Average Weekly Projection:</span>
                  <strong className="text-brand-primary font-mono text-base">{aiAvg}</strong>
                </div>
              </div>
              <button 
                onClick={runAttendanceProjection}
                disabled={aiProjecting}
                className="btn btn-secondary btn-sm mt-auto w-full cursor-pointer disabled:opacity-50"
              >
                {aiProjecting ? 'Projecting...' : 'Re-run AI Projection'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
