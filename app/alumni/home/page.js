'use client';

import React, { useState, useEffect } from 'react';
import { Award, Briefcase, Share2, Wallet, Users } from 'lucide-react';

export default function AlumniHomeDashboard() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([
    { title: 'AI Engineering Specialist', company: 'Google Inc.', location: 'Mountain View, CA', salary: '$180,000' },
    { title: 'Protocol Security Lead', company: 'Chainlink Labs', location: 'Remote', salary: '$160,000' }
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

  const handleShareCredentials = () => {
    alert('Cryptographic degree wallet verification link copied. Share this hash proof with recruiters for zero-knowledge validation.');
  };

  if (loading) return null;

  return (
    <div className="flex flex-col gap-6 md:gap-8 fade-in">
      <div className="flex justify-between items-center pb-4 border-b border-brand-border/40">
        <div>
          <h1 className="text-3xl font-display font-bold text-white tracking-tight flex items-center gap-3">
            <Users className="w-8 h-8 text-brand-primary" />
            Alumni Relations Portal
          </h1>
          <p className="text-brand-text-muted text-sm mt-1">Welcome back, {currentUser?.name || 'Alumni Member'}. Manage your academic credential wallet, connect with graduates, and check corporate openings.</p>
        </div>
        <button onClick={handleShareCredentials} className="btn btn-primary btn-sm flex items-center gap-1.5 cursor-pointer">
          <Share2 className="w-4 h-4" />
          Share Degree Proof
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-5 bg-brand-bg-secondary border border-brand-border rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-brand-text-muted text-xs font-semibold">Academic Credentials Verified</span>
            <span className="block text-2xl font-bold font-display text-white mt-1">2 Degrees</span>
            <span className="text-[10px] text-brand-accent-emerald mt-1 block">✓ Fully anchored on chain</span>
          </div>
          <div className="p-3 bg-brand-accent-emerald/10 rounded-xl text-brand-accent-emerald">
            <Award className="w-6 h-6" />
          </div>
        </div>

        <div className="card p-5 bg-brand-bg-secondary border border-brand-border rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-brand-text-muted text-xs font-semibold">Alumni Wallet Balance</span>
            <span className="block text-2xl font-bold font-display text-white mt-1">120.0 AGC</span>
            <span className="text-[10px] text-brand-accent-cyan mt-1 block">Acquired on-chain points</span>
          </div>
          <div className="p-3 bg-brand-accent-cyan/10 rounded-xl text-brand-accent-cyan">
            <Wallet className="w-6 h-6" />
          </div>
        </div>

        <div className="card p-5 bg-brand-bg-secondary border border-brand-border rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-brand-text-muted text-xs font-semibold">Active Referrals</span>
            <span className="block text-2xl font-bold font-display text-white mt-1">4 Offers</span>
            <span className="text-[10px] text-brand-accent-emerald mt-1 block">Forwarded to placement cells</span>
          </div>
          <div className="p-3 bg-brand-primary/10 rounded-xl text-brand-primary">
            <Briefcase className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Jobs List */}
        <div className="card bg-brand-bg-secondary border border-brand-border rounded-2xl p-6 flex flex-col gap-4">
          <h3 className="text-lg font-bold font-display text-white border-b border-brand-border/40 pb-3 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-brand-accent-cyan" />
            Alumni Recommended Jobs & Hiring Opportunities
          </h3>
          <div className="flex flex-col gap-3.5">
            {jobs.map((job, idx) => (
              <div key={idx} className="p-4 bg-brand-bg-tertiary/60 border border-brand-border/40 rounded-2xl text-xs flex justify-between items-center">
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-white text-sm">{job.title}</span>
                  <span className="text-brand-text-muted">Company: <strong className="text-white font-medium">{job.company}</strong> | Location: {job.location}</span>
                </div>
                <span className="font-mono text-brand-accent-cyan font-bold shrink-0">{job.salary}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
