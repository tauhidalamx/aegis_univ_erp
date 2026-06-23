'use client';

import React, { useState, useEffect } from 'react';
import { Briefcase, FileText, CheckCircle, RefreshCw, BarChart2 } from 'lucide-react';

export default function PlacementDashboard() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([
    { id: 'job_1', company: 'Google Inc.', title: 'AI Research Engineer', openings: 3, status: 'Active Hiring' },
    { id: 'job_2', company: 'Stripe Payments', title: 'Senior Backend Developer', openings: 2, status: 'Active Hiring' },
    { id: 'job_3', company: 'Coinbase Global', title: 'Web3 Protocol Engineer', openings: 1, status: 'Interviews Complete' }
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

  const handlePostJob = () => {
    alert('Mock function: Job posting form triggers email notifications to student cohort.');
  };

  if (loading) return null;

  return (
    <div className="flex flex-col gap-6 md:gap-8 fade-in">
      <div className="flex justify-between items-center pb-4 border-b border-brand-border/40">
        <div>
          <h1 className="text-3xl font-display font-bold text-white tracking-tight flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-brand-primary" />
            Career Placement Hub
          </h1>
          <p className="text-brand-text-muted text-sm mt-1">Welcome back, {currentUser?.name || 'Placement Officer'}. Monitor corporate partnerships, coordinate candidate shortlists, and analyze cohort recruitment rates.</p>
        </div>
        <button onClick={handlePostJob} className="btn btn-primary btn-sm flex items-center gap-1.5 cursor-pointer">
          Create Corporate Notice
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-5 bg-brand-bg-secondary border border-brand-border rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-brand-text-muted text-xs font-semibold">Active Corporate Partners</span>
            <span className="block text-2xl font-bold font-display text-white mt-1">42 Companies</span>
            <span className="text-[10px] text-brand-accent-emerald mt-1 block">Tier-1 Tech & Finance</span>
          </div>
          <div className="p-3 bg-brand-primary/10 rounded-xl text-brand-primary">
            <Briefcase className="w-6 h-6" />
          </div>
        </div>

        <div className="card p-5 bg-brand-bg-secondary border border-brand-border rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-brand-text-muted text-xs font-semibold">Target Placement rate</span>
            <span className="block text-2xl font-bold font-display text-white mt-1">88.5% Predicted</span>
            <span className="text-[10px] text-brand-accent-cyan mt-1 block">Based on TensorFlow model</span>
          </div>
          <div className="p-3 bg-brand-accent-cyan/10 rounded-xl text-brand-accent-cyan">
            <BarChart2 className="w-6 h-6" />
          </div>
        </div>

        <div className="card p-5 bg-brand-bg-secondary border border-brand-border rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-brand-text-muted text-xs font-semibold">Total Offers Released</span>
            <span className="block text-2xl font-bold font-display text-white mt-1">68 Placed</span>
            <span className="text-[10px] text-brand-accent-emerald mt-1 block">82% of batch registered</span>
          </div>
          <div className="p-3 bg-brand-accent-emerald/10 rounded-xl text-brand-accent-emerald">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Jobs List */}
        <div className="card bg-brand-bg-secondary border border-brand-border rounded-2xl p-6 flex flex-col gap-4">
          <h3 className="text-lg font-bold font-display text-white border-b border-brand-border/40 pb-3 flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand-accent-cyan" />
            Corporate Job Postings & Hiring Pipelines
          </h3>
          <div className="flex flex-col gap-3.5">
            {jobs.map(job => (
              <div key={job.id} className="p-3 bg-brand-bg-tertiary/60 border border-brand-border/40 rounded-xl text-xs flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="font-bold text-white text-sm">{job.company}</span>
                  <span className="text-[10px] text-brand-text-muted mt-1">Title: <strong className="text-white font-medium">{job.title}</strong> | Open Positions: {job.openings}</span>
                </div>
                <span className={`badge text-[10px] px-2.5 py-0.5 rounded font-bold ${
                  job.status === 'Active Hiring' ? 'bg-brand-accent-cyan/20 text-brand-accent-cyan animate-pulse' : 'bg-brand-accent-emerald/20 text-brand-accent-emerald'
                }`}>
                  {job.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
