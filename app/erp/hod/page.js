'use client';

import React, { useState, useEffect } from 'react';
import { useDb } from '../../../context/db-context';
import { BookOpen, Users, Calendar, Megaphone, FileText, CheckCircle } from 'lucide-react';

export default function HodDashboard() {
  const { faculty, courses } = useDb();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [syllabusProgress, setSyllabusProgress] = useState([
    { code: 'CS101', subject: 'Intro to Programming', progress: 78, status: 'On Track' },
    { code: 'CS202', subject: 'Data Structures', progress: 85, status: 'On Track' },
    { code: 'CS301', subject: 'Database Systems', progress: 60, status: 'Behind Schedule' }
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

  const handleAccelerateSubject = (code) => {
    setSyllabusProgress(prev => prev.map(s => s.code === code ? { ...s, progress: Math.min(s.progress + 10, 100), status: 'On Track' } : s));
    alert(`Instruction sent to course coordinator for ${code} to accelerate schedule.`);
  };

  if (loading) return null;

  return (
    <div className="flex flex-col gap-6 md:gap-8 fade-in">
      <div className="flex justify-between items-center pb-4 border-b border-brand-border/40">
        <div>
          <h1 className="text-3xl font-display font-bold text-white tracking-tight flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-brand-primary" />
            Department Operations Dashboard
          </h1>
          <p className="text-brand-text-muted text-sm mt-1">Welcome back, {currentUser?.name || 'Department Head'}. Manage courses, monitor syllabus completion rates, and assign faculty teaching loads.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="card p-5 bg-brand-bg-secondary border border-brand-border rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-brand-text-muted text-xs font-semibold">Active Faculty</span>
            <span className="block text-2xl font-bold font-display text-brand-primary mt-1">{faculty.length} Members</span>
            <span className="text-[10px] text-brand-accent-emerald mt-1 block">Full Department Roster</span>
          </div>
          <div className="p-3 bg-brand-primary/10 rounded-xl text-brand-primary">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="card p-5 bg-brand-bg-secondary border border-brand-border rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-brand-text-muted text-xs font-semibold">Courses Offered</span>
            <span className="block text-2xl font-bold font-display text-brand-accent-cyan mt-1">{courses.length} Subjects</span>
            <span className="text-[10px] text-brand-accent-cyan mt-1 block">Syllabus Tracking Enabled</span>
          </div>
          <div className="p-3 bg-brand-accent-cyan/10 rounded-xl text-brand-accent-cyan">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        <div className="card p-5 bg-brand-bg-secondary border border-brand-border rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-brand-text-muted text-xs font-semibold">Behind Syllabus Progress</span>
            <span className="block text-2xl font-bold font-display text-brand-accent-ruby mt-1">
              {syllabusProgress.filter(s => s.status === 'Behind Schedule').length} Alerts
            </span>
            <span className="text-[10px] text-brand-accent-ruby mt-1 block">Action required</span>
          </div>
          <div className="p-3 bg-brand-accent-ruby/10 rounded-xl text-brand-accent-ruby animate-pulse">
            <FileText className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Syllabus Progress */}
        <div className="card bg-brand-bg-secondary border border-brand-border rounded-2xl p-6 flex flex-col gap-4">
          <h3 className="text-lg font-bold font-display text-white border-b border-brand-border/40 pb-3 flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand-accent-cyan" />
            Curriculum Audit & Syllabus Completion Telemetry
          </h3>
          <div className="flex flex-col gap-4">
            {syllabusProgress.map(subj => (
              <div key={subj.code} className="p-4 bg-brand-bg-tertiary/60 border border-brand-border/40 rounded-2xl text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-white text-sm">{subj.code} - {subj.subject}</span>
                    <span className="font-mono text-brand-accent-cyan font-bold">{subj.progress}% Completed</span>
                  </div>
                  <div className="w-full bg-brand-bg-secondary h-2 rounded-full overflow-hidden border border-brand-border/40">
                    <div className="h-full bg-brand-primary rounded-full transition-all duration-300" style={{ width: `${subj.progress}%` }}></div>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`badge text-[10px] px-2.5 py-0.5 rounded font-semibold ${
                    subj.status === 'On Track' ? 'bg-brand-accent-emerald/20 text-brand-accent-emerald' : 'bg-brand-accent-ruby/20 text-brand-accent-ruby animate-pulse'
                  }`}>
                    {subj.status}
                  </span>
                  {subj.status === 'Behind Schedule' && (
                    <button 
                      onClick={() => handleAccelerateSubject(subj.code)} 
                      className="btn btn-primary btn-sm flex items-center gap-1.5 cursor-pointer text-xs py-1 px-3"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      Issue Speed Alert
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
