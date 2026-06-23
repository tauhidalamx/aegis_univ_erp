'use client';

import React, { useState, useEffect } from 'react';
import { useDb } from '../../../context/db-context';
import { Award, Calendar, DollarSign, UserCheck } from 'lucide-react';

export default function ParentDashboard() {
  const { announcements } = useDb();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
      <div className="flex justify-between items-center pb-4 border-b border-brand-border/40">
        <div>
          <h1 className="text-3xl font-display font-bold text-white tracking-tight flex items-center gap-3">
            <UserCheck className="w-8 h-8 text-brand-primary" />
            Student Progress Dashboard
          </h1>
          <p className="text-brand-text-muted text-sm mt-1">Parent monitoring workspace. Review attendance history, grades evaluation, and outstanding tuition invoices for your dependent.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* GPA */}
        <div className="card p-5 bg-brand-bg-secondary border border-brand-border rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-brand-text-muted text-xs font-semibold">Dependent CGPA</span>
            <span className="block text-2xl font-bold font-display text-white mt-1">3.82 GPA</span>
            <span className="text-[10px] text-brand-accent-emerald mt-1 block">Excellent academic standing</span>
          </div>
          <div className="p-3 bg-brand-primary/10 rounded-xl text-brand-primary">
            <Award className="w-6 h-6" />
          </div>
        </div>

        {/* Attendance */}
        <div className="card p-5 bg-brand-bg-secondary border border-brand-border rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-brand-text-muted text-xs font-semibold">Dependent Attendance</span>
            <span className="block text-2xl font-bold font-display text-white mt-1">94.2%</span>
            <span className="text-[10px] text-brand-accent-emerald mt-1 block">✓ Satisfies attendance rules</span>
          </div>
          <div className="p-3 bg-brand-accent-cyan/10 rounded-xl text-brand-accent-cyan">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        {/* Tuition */}
        <div className="card p-5 bg-brand-bg-secondary border border-brand-border rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-brand-text-muted text-xs font-semibold">Tuition Invoice Balance</span>
            <span className="block text-2xl font-bold font-display text-white mt-1">$0.00 Outstanding</span>
            <span className="text-[10px] text-brand-accent-emerald mt-1 block">✓ All invoices settled</span>
          </div>
          <div className="p-3 bg-brand-accent-emerald/10 rounded-xl text-brand-accent-emerald">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Notices */}
      <div className="card bg-brand-bg-secondary border border-brand-border rounded-2xl p-6 flex flex-col gap-4">
        <h3 className="text-lg font-bold font-display text-white border-b border-brand-border/40 pb-3 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-brand-accent-amber" />
          Recent School Broadcaster Notifications
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
  );
}
