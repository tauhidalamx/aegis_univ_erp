'use client';

import React, { useState, useEffect } from 'react';
import { useDb } from '../../../context/db-context';
import { GraduationCap, Users, Calendar, Megaphone, FileText, CheckCircle } from 'lucide-react';

export default function UniversityAdminDashboard() {
  const { students, faculty, announcements } = useDb();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [admissions, setAdmissions] = useState([
    { id: 'adm_1', name: 'James Carter', major: 'Computer Science', status: 'Pending Review' },
    { id: 'adm_2', name: 'Sophia Loren', major: 'Genetics', status: 'Accepted' },
    { id: 'adm_3', name: 'Robert Downey', major: 'Business Admin', status: 'Pending Review' }
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

  const handleApproveAdmission = (id) => {
    setAdmissions(prev => prev.map(a => a.id === id ? { ...a, status: 'Accepted' } : a));
    alert('Student admission application approved and record queued for registrar enrolment.');
  };

  if (loading) return null;

  return (
    <div className="flex flex-col gap-6 md:gap-8 fade-in">
      <div className="flex justify-between items-center pb-4 border-b border-brand-border/40">
        <div>
          <h1 className="text-3xl font-display font-bold text-white tracking-tight flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-brand-primary" />
            University Control Center
          </h1>
          <p className="text-brand-text-muted text-sm mt-1">Welcome back, {currentUser?.name || 'Administrator'}. Monitor academic cohorts, campus notices, admissions flow, and departmental events.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-5 bg-brand-bg-secondary border border-brand-border rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-brand-text-muted text-xs font-semibold">Total Students</span>
            <span className="block text-2xl font-bold font-display text-brand-primary mt-1">{students.length} Enrolled</span>
            <span className="text-[10px] text-brand-accent-emerald mt-1 block">Active Enrollment</span>
          </div>
          <div className="p-3 bg-brand-primary/10 rounded-xl text-brand-primary">
            <GraduationCap className="w-6 h-6" />
          </div>
        </div>

        <div className="card p-5 bg-brand-bg-secondary border border-brand-border rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-brand-text-muted text-xs font-semibold">Faculty Members</span>
            <span className="block text-2xl font-bold font-display text-brand-accent-cyan mt-1">{faculty.length} Active</span>
            <span className="text-[10px] text-brand-accent-cyan mt-1 block">Full academic roster</span>
          </div>
          <div className="p-3 bg-brand-accent-cyan/10 rounded-xl text-brand-accent-cyan">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="card p-5 bg-brand-bg-secondary border border-brand-border rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-brand-text-muted text-xs font-semibold">Active Announcements</span>
            <span className="block text-2xl font-bold font-display text-brand-accent-amber mt-1">{announcements.length} Notices</span>
            <span className="text-[10px] text-brand-accent-amber mt-1 block">Published on dashboard</span>
          </div>
          <div className="p-3 bg-brand-accent-amber/10 rounded-xl text-brand-accent-amber">
            <Megaphone className="w-6 h-6" />
          </div>
        </div>

        <div className="card p-5 bg-brand-bg-secondary border border-brand-border rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-brand-text-muted text-xs font-semibold">Admissions Queue</span>
            <span className="block text-2xl font-bold font-display text-brand-accent-ruby mt-1">{admissions.filter(a => a.status === 'Pending Review').length} Pending</span>
            <span className="text-[10px] text-brand-accent-ruby mt-1 block">Requires manual review</span>
          </div>
          <div className="p-3 bg-brand-accent-ruby/10 rounded-xl text-brand-accent-ruby">
            <FileText className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Admissions Table */}
        <div className="card bg-brand-bg-secondary border border-brand-border rounded-2xl p-6 flex flex-col gap-4">
          <h3 className="text-lg font-bold font-display text-white border-b border-brand-border/40 pb-3 flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand-accent-cyan" />
            Admissions Flow Register
          </h3>
          <div className="flex flex-col gap-3.5">
            {admissions.map(adm => (
              <div key={adm.id} className="flex justify-between items-center p-3 bg-brand-bg-tertiary/60 border border-brand-border/40 rounded-xl text-xs">
                <div className="flex flex-col">
                  <span className="font-bold text-white">{adm.name}</span>
                  <span className="text-[10px] text-brand-text-muted mt-1">Course major: {adm.major}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`badge text-[10px] px-2 py-0.5 rounded ${adm.status === 'Accepted' ? 'bg-brand-accent-emerald/20 text-brand-accent-emerald' : 'bg-brand-accent-amber/20 text-brand-accent-amber'}`}>
                    {adm.status}
                  </span>
                  {adm.status === 'Pending Review' && (
                    <button onClick={() => handleApproveAdmission(adm.id)} className="p-1 text-brand-accent-emerald hover:text-white hover:bg-brand-accent-emerald/20 rounded-lg cursor-pointer transition-all">
                      <CheckCircle className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notices Board */}
        <div className="card bg-brand-bg-secondary border border-brand-border rounded-2xl p-6 flex flex-col gap-4">
          <h3 className="text-lg font-bold font-display text-white border-b border-brand-border/40 pb-3 flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-brand-accent-amber" />
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
                <p className="text-[11px] text-brand-text-muted leading-relaxed m-0">{ann.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
