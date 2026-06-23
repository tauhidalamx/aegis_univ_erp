'use client';

import React, { useState, useEffect } from 'react';
import { FlaskConical, Award, BookOpen, CheckCircle, FileText } from 'lucide-react';

export default function ResearchDashboard() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [grants, setGrants] = useState([
    { id: 'g_1', project: 'Quantum Crypto Mesh Node Validation', agency: 'NSF', amount: '$60,000', status: 'Pending Coordinator Review' },
    { id: 'g_2', project: 'Distributed Climate Sensors Network', agency: 'EU Research', amount: '$85,000', status: 'Active' },
    { id: 'g_3', project: 'Low-latency Real-time WebRTC Collaboration', agency: 'DARPA Office', amount: '$120,000', status: 'Pending Coordinator Review' }
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

  const handleApproveGrant = (id) => {
    setGrants(prev => prev.map(g => g.id === id ? { ...g, status: 'Active' } : g));
    alert('Grant proposal validated, logged to blockchain registry, and funded.');
  };

  if (loading) return null;

  return (
    <div className="flex flex-col gap-6 md:gap-8 fade-in">
      <div className="flex justify-between items-center pb-4 border-b border-brand-border/40">
        <div>
          <h1 className="text-3xl font-display font-bold text-white tracking-tight flex items-center gap-3">
            <FlaskConical className="w-8 h-8 text-brand-primary" />
            Research Intelligence Hub
          </h1>
          <p className="text-brand-text-muted text-sm mt-1">Welcome back, {currentUser?.name || 'Research Coordinator'}. Monitor active research projects, verify patent filings, and audit academic grant structures.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-5 bg-brand-bg-secondary border border-brand-border rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-brand-text-muted text-xs font-semibold">Active Research Projects</span>
            <span className="block text-2xl font-bold font-display text-white mt-1">18 Projects</span>
            <span className="text-[10px] text-brand-accent-emerald mt-1 block">All indexes active</span>
          </div>
          <div className="p-3 bg-brand-primary/10 rounded-xl text-brand-primary">
            <FlaskConical className="w-6 h-6" />
          </div>
        </div>

        <div className="card p-5 bg-brand-bg-secondary border border-brand-border rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-brand-text-muted text-xs font-semibold">Total Grant Funding</span>
            <span className="block text-2xl font-bold font-display text-white mt-1">$265,000 USD</span>
            <span className="text-[10px] text-brand-accent-cyan mt-1 block">NSF, EU, and DARPA sources</span>
          </div>
          <div className="p-3 bg-brand-accent-cyan/10 rounded-xl text-brand-accent-cyan">
            <Award className="w-6 h-6" />
          </div>
        </div>

        <div className="card p-5 bg-brand-bg-secondary border border-brand-border rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-brand-text-muted text-xs font-semibold">Pending Coordinator Reviews</span>
            <span className="block text-2xl font-bold font-display text-white mt-1">
              {grants.filter(g => g.status === 'Pending Coordinator Review').length} Proposals
            </span>
            <span className="text-[10px] text-brand-accent-amber mt-1 block">Requires manual screening</span>
          </div>
          <div className="p-3 bg-brand-accent-amber/10 rounded-xl text-brand-accent-amber">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Research Grants */}
        <div className="card bg-brand-bg-secondary border border-brand-border rounded-2xl p-6 flex flex-col gap-4">
          <h3 className="text-lg font-bold font-display text-white border-b border-brand-border/40 pb-3 flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand-accent-cyan" />
            Federal Research Grants & Institutional Endowments
          </h3>
          <div className="flex flex-col gap-3.5">
            {grants.map(g => (
              <div key={g.id} className="p-3 bg-brand-bg-tertiary/60 border border-brand-border/40 rounded-xl text-xs flex justify-between items-center">
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-white text-sm">{g.project}</span>
                  <span className="text-brand-text-muted">Funding agency: <strong className="text-white font-medium">{g.agency}</strong> | Total Amount: <strong className="text-brand-accent-cyan font-mono">{g.amount}</strong></span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`badge text-[10px] px-2.5 py-0.5 rounded font-semibold ${
                    g.status === 'Active' ? 'bg-brand-accent-emerald/20 text-brand-accent-emerald' : 'bg-brand-accent-amber/20 text-brand-accent-amber'
                  }`}>
                    {g.status}
                  </span>
                  {g.status === 'Pending Coordinator Review' && (
                    <button 
                      onClick={() => handleApproveGrant(g.id)} 
                      className="btn btn-primary btn-sm flex items-center gap-1.5 cursor-pointer text-xs py-1 px-3"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      Approve Proposal
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
