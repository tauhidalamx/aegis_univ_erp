'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, HelpCircle, CheckCircle, FileText } from 'lucide-react';

export default function FacultyHomeDashboard() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [schedule, setSchedule] = useState([
    { time: '09:00 AM - 10:30 AM', subject: 'CS101 - Intro to Programming', room: 'Hall A' },
    { time: '11:00 AM - 12:30 PM', subject: 'CS202 - Data Structures', room: 'Lab 3' }
  ]);
  const [advisingQueue, setAdvisingQueue] = useState([
    { id: 'adv_1', student: 'Alex Rivera', issue: 'Syllabus exemption check', status: 'Pending Approval' },
    { id: 'adv_2', student: 'Zoe Chen', issue: 'Internship authorization signoff', status: 'Approved' }
  ]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const session = sessionStorage.getItem('aegis_erp_session');
      if (session) {
        setCurrentUser(JSON.parse(session));
      }
      setLoading(false);
    }
  }, []);

  const handleApproveAdvising = (id) => {
    setAdvisingQueue(prev => prev.map(a => a.id === id ? { ...a, status: 'Approved' } : a));
    alert('Advising ticket signed off successfully.');
  };

  if (loading) return null;

  return (
    <div className="flex flex-col gap-6 md:gap-8 fade-in">
      <div className="flex justify-between items-center pb-4 border-b border-brand-border/40">
        <div>
          <h1 className="text-3xl font-display font-bold text-white tracking-tight flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-brand-primary" />
            Faculty Control Panel
          </h1>
          <p className="text-brand-text-muted text-sm mt-1">Welcome back, {currentUser?.name || 'Faculty Member'}. View lecture schedules, student advising threads, and research grant logs.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Lecture Schedule */}
        <div className="card bg-brand-bg-secondary border border-brand-border rounded-2xl p-6 flex flex-col gap-4">
          <h3 className="text-lg font-bold font-display text-white border-b border-brand-border/40 pb-3 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-brand-accent-cyan" />
            Today's Teaching Schedule
          </h3>
          <div className="flex flex-col gap-3.5">
            {schedule.map((sch, i) => (
              <div key={i} className="p-3.5 bg-brand-bg-tertiary/60 border border-brand-border/40 rounded-xl text-xs flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="font-bold text-white text-sm">{sch.subject}</span>
                  <span className="text-[10px] text-brand-text-muted mt-1">{sch.time}</span>
                </div>
                <span className="badge text-[10px] px-2.5 py-0.5 rounded bg-brand-primary/20 text-brand-primary font-bold">
                  {sch.room}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Student Advising Panel */}
        <div className="card bg-brand-bg-secondary border border-brand-border rounded-2xl p-6 flex flex-col gap-4">
          <h3 className="text-lg font-bold font-display text-white border-b border-brand-border/40 pb-3 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-brand-accent-amber" />
            Student Advising Queue
          </h3>
          <div className="flex flex-col gap-3.5">
            {advisingQueue.map(adv => (
              <div key={adv.id} className="p-3 bg-brand-bg-tertiary/60 border border-brand-border/40 rounded-xl text-xs flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="font-bold text-white">{adv.student}</span>
                  <span className="text-[10px] text-brand-text-muted mt-0.5">{adv.issue}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`badge text-[10px] px-2 py-0.5 rounded ${adv.status === 'Approved' ? 'bg-brand-accent-emerald/20 text-brand-accent-emerald' : 'bg-brand-accent-amber/20 text-brand-accent-amber'}`}>
                    {adv.status}
                  </span>
                  {adv.status === 'Pending Approval' && (
                    <button onClick={() => handleApproveAdvising(adv.id)} className="p-1 text-brand-accent-emerald hover:text-white hover:bg-brand-accent-emerald/20 rounded-lg cursor-pointer transition-all">
                      <CheckCircle className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
