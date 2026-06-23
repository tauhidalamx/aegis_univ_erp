'use client';

import React, { useState, useEffect } from 'react';
import { useDb } from '../../../context/db-context';
import { Layers, FileText, CheckCircle, RefreshCw, BarChart2, ShieldAlert } from 'lucide-react';

export default function DeanDashboard() {
  const { faculty, students } = useDb();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [researchProjects, setResearchProjects] = useState([
    { id: 'res_1', title: 'Federated Learning on Campus Mesh Networks', lead: 'Prof. Marcus Chen', budget: '$45,000', status: 'Pending Dean Review' },
    { id: 'res_2', title: 'Post-Quantum Encryption Ledger Architecture', lead: 'Dr. Evelyn Sterling', budget: '$65,000', status: 'Approved' },
    { id: 'res_3', title: 'Automated Timetable Scheduling using TensorFlow.js', lead: 'Prof. Sarah Connor', budget: '$20,000', status: 'Pending Dean Review' }
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

  const handleApproveProject = (id) => {
    setResearchProjects(prev => prev.map(p => p.id === id ? { ...p, status: 'Approved' } : p));
    alert('Research grant proposal has been officially approved by Dean. Budget reserved and assigned.');
  };

  if (loading) return null;

  return (
    <div className="flex flex-col gap-6 md:gap-8 fade-in">
      <div className="flex justify-between items-center pb-4 border-b border-brand-border/40">
        <div>
          <h1 className="text-3xl font-display font-bold text-white tracking-tight flex items-center gap-3">
            <Layers className="w-8 h-8 text-brand-primary" />
            Faculty Management Center
          </h1>
          <p className="text-brand-text-muted text-sm mt-1">Welcome back, {currentUser?.name || 'Dean of Faculty'}. Oversight of academic divisions, research proposals, faculty analytics, and curriculum audits.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-5 bg-brand-bg-secondary border border-brand-border rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-brand-text-muted text-xs font-semibold">Division Faculty members</span>
            <span className="block text-2xl font-bold font-display text-white mt-1">{faculty.length} Members</span>
            <span className="text-[10px] text-brand-accent-emerald mt-1 block">Full Faculty Roster</span>
          </div>
          <div className="p-3 bg-brand-primary/10 rounded-xl text-brand-primary">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        <div className="card p-5 bg-brand-bg-secondary border border-brand-border rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-brand-text-muted text-xs font-semibold">Active Research Funds</span>
            <span className="block text-2xl font-bold font-display text-brand-accent-cyan mt-1">$130,000 Allocated</span>
            <span className="text-[10px] text-brand-accent-emerald mt-1 block">3 Active core groups</span>
          </div>
          <div className="p-3 bg-brand-accent-cyan/10 rounded-xl text-brand-accent-cyan">
            <BarChart2 className="w-6 h-6" />
          </div>
        </div>

        <div className="card p-5 bg-brand-bg-secondary border border-brand-border rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-brand-text-muted text-xs font-semibold">Pending Approvals</span>
            <span className="block text-2xl font-bold font-display text-brand-accent-amber mt-1">
              {researchProjects.filter(p => p.status === 'Pending Dean Review').length} Proposals
            </span>
            <span className="text-[10px] text-brand-accent-amber mt-1 block">Requires manual audit</span>
          </div>
          <div className="p-3 bg-brand-accent-amber/10 rounded-xl text-brand-accent-amber">
            <FileText className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Research Proposals */}
        <div className="card bg-brand-bg-secondary border border-brand-border rounded-2xl p-6 flex flex-col gap-4">
          <h3 className="text-lg font-bold font-display text-white border-b border-brand-border/40 pb-3 flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand-accent-cyan" />
            Research Project Proposals & Grant Clearances
          </h3>
          <div className="flex flex-col gap-3.5">
            {researchProjects.map(proj => (
              <div key={proj.id} className="flex justify-between items-center p-3 bg-brand-bg-tertiary/60 border border-brand-border/40 rounded-xl text-xs">
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-white text-sm">{proj.title}</span>
                  <span className="text-brand-text-muted">Lead Investigator: <strong className="text-white font-medium">{proj.lead}</strong> | Budget: <strong className="text-brand-accent-cyan font-mono font-bold">{proj.budget}</strong></span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`badge text-[10px] px-2.5 py-0.5 rounded font-semibold ${
                    proj.status === 'Approved' ? 'bg-brand-accent-emerald/20 text-brand-accent-emerald' : 'bg-brand-accent-amber/20 text-brand-accent-amber'
                  }`}>
                    {proj.status}
                  </span>
                  {proj.status === 'Pending Dean Review' && (
                    <button 
                      onClick={() => handleApproveProject(proj.id)} 
                      className="btn btn-primary btn-sm flex items-center gap-1.5 cursor-pointer text-xs py-1 px-3"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      Approve Grant
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
