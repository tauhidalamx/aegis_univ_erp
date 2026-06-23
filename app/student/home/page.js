'use client';

import React, { useState, useEffect } from 'react';
import { useDb } from '../../../context/db-context';
import { BookOpen, Wallet, Calendar, Award, GraduationCap } from 'lucide-react';

export default function StudentHomeDashboard() {
  const { announcements } = useDb();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [courseSchedule, setCourseSchedule] = useState([
    { code: 'CS202', title: 'Data Structures & Algorithms', progress: 85, grade: 'A' },
    { code: 'CS302', title: 'Database Management Systems', progress: 92, grade: 'A-' },
    { code: 'CS305', title: 'Software Engineering', progress: 75, grade: 'B+' }
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

  if (loading) return null;

  return (
    <div className="flex flex-col gap-6 md:gap-8 fade-in">
      {/* Page Title */}
      <div className="flex justify-between items-center pb-4 border-b border-brand-border/40">
        <div>
          <h1 className="text-3xl font-display font-bold text-white tracking-tight flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-brand-primary" />
            My Academic Workspace
          </h1>
          <p className="text-brand-text-muted text-sm mt-1">Student portal for {currentUser?.name || 'Student'}. Tracks term grades, syllabus progress, and Web3 credentials.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="card p-5 bg-brand-bg-secondary border border-brand-border rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-brand-text-muted text-xs font-semibold">Cumulative GPA</span>
            <span className="block text-2xl font-bold font-display text-white mt-1">3.82 CGPA</span>
            <span className="text-[10px] text-brand-accent-emerald mt-1 block">Top 5% of Cohort</span>
          </div>
          <div className="p-3 bg-brand-primary/10 rounded-xl text-brand-primary">
            <Award className="w-6 h-6" />
          </div>
        </div>

        <div className="card p-5 bg-brand-bg-secondary border border-brand-border rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-brand-text-muted text-xs font-semibold">Term Attendance</span>
            <span className="block text-2xl font-bold font-display text-white mt-1">94.2%</span>
            <span className="text-[10px] text-brand-accent-emerald mt-1 block">✓ Satisfies attendance minimums</span>
          </div>
          <div className="p-3 bg-brand-accent-cyan/10 rounded-xl text-brand-accent-cyan">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        <div className="card p-5 bg-brand-bg-secondary border border-brand-border rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-brand-text-muted text-xs font-semibold">Academic Wallet Balance</span>
            <span className="block text-2xl font-bold font-display text-brand-accent-cyan mt-1">45.0 AGC</span>
            <span className="text-[10px] text-brand-accent-cyan mt-1 block">3 NFT Credentials verified</span>
          </div>
          <div className="p-3 bg-brand-accent-emerald/10 rounded-xl text-brand-accent-emerald">
            <Wallet className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Class Progress */}
        <div className="card bg-brand-bg-secondary border border-brand-border rounded-2xl p-6 flex flex-col gap-4">
          <h3 className="text-lg font-bold font-display text-white border-b border-brand-border/40 pb-3 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-brand-accent-cyan" />
            Registered Courses & Term Progress
          </h3>
          <div className="flex flex-col gap-4">
            {courseSchedule.map(course => (
              <div key={course.code} className="p-3.5 bg-brand-bg-tertiary/60 border border-brand-border/40 rounded-xl text-xs flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="font-bold text-white text-sm">{course.title}</span>
                    <span className="text-[10px] text-brand-text-muted mt-0.5">Subject Code: {course.code}</span>
                  </div>
                  <span className="text-sm font-bold text-brand-accent-cyan">Grade: {course.grade}</span>
                </div>
                <div className="w-full bg-brand-bg-secondary h-2 rounded-full overflow-hidden border border-brand-border/40 mt-1">
                  <div className="h-full bg-brand-primary rounded-full transition-all duration-300" style={{ width: `${course.progress}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notices Board */}
        <div className="card bg-brand-bg-secondary border border-brand-border rounded-2xl p-6 flex flex-col gap-4">
          <h3 className="text-lg font-bold font-display text-white border-b border-brand-border/40 pb-3 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-brand-accent-amber" />
            Active Announcements
          </h3>
          <div className="flex flex-col gap-4">
            {announcements.slice(0, 3).map((ann, i) => (
              <div key={i} className="pl-3 border-l-2" style={{ borderColor: ann.color || 'var(--color-brand-primary)' }}>
                <div className="flex justify-between items-center text-[10px] text-brand-text-subtle">
                  <span className="font-bold text-white uppercase">{ann.tag}</span>
                  <span>{ann.date}</span>
                </div>
                <h4 className="text-xs font-semibold text-white my-1">{ann.title}</h4>
                <p className="text-[11px] text-brand-text-muted leading-relaxed m-0 truncate">{ann.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
