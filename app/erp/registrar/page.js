'use client';

import React, { useState, useEffect } from 'react';
import { Award, FileText, CheckCircle, ShieldCheck, RefreshCw, Send } from 'lucide-react';

export default function RegistrarDashboard() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([
    { id: 'req_1', student: 'Aria Nakamura', type: 'Official Transcript', status: 'Pending Audit', hash: 'N/A' },
    { id: 'req_2', student: 'Alex Rivera', type: 'B.Sc. Degree Certificate', status: 'Pending Signature', hash: 'N/A' },
    { id: 'req_3', student: 'Zoe Chen', type: 'Academic Honours Certificate', status: 'Issued & Hashed', hash: '0x8f72...a12c' }
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

  const handleIssueCredential = (id) => {
    const randomHash = '0x' + Math.floor(Math.random()*10000000).toString(16) + '...' + Math.floor(Math.random()*10000).toString(16);
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'Issued & Hashed', hash: randomHash } : r));
    alert(`Credential successfully generated, signed cryptographically, and anchored to Aegis Ledger. Hash: ${randomHash}`);
  };

  if (loading) return null;

  return (
    <div className="flex flex-col gap-6 md:gap-8 fade-in">
      <div className="flex justify-between items-center pb-4 border-b border-brand-border/40">
        <div>
          <h1 className="text-3xl font-display font-bold text-white tracking-tight flex items-center gap-3">
            <Award className="w-8 h-8 text-brand-accent-cyan" />
            Academic Records Center
          </h1>
          <p className="text-brand-text-muted text-sm mt-1">Registrar administrative desk. Perform academic audits, issue official transcripts, verify student credentials, and publish signed certificates to blockchain.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-5 bg-brand-bg-secondary border border-brand-border rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-brand-text-muted text-xs font-semibold">Pending Audit Requests</span>
            <span className="block text-2xl font-bold font-display text-white mt-1">12 Students</span>
            <span className="text-[10px] text-brand-accent-amber mt-1 block">Requires GPA checks</span>
          </div>
          <div className="p-3 bg-brand-accent-amber/10 rounded-xl text-brand-accent-amber">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        <div className="card p-5 bg-brand-bg-secondary border border-brand-border rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-brand-text-muted text-xs font-semibold">Ready for Issue</span>
            <span className="block text-2xl font-bold font-display text-brand-accent-cyan mt-1">4 Degrees</span>
            <span className="text-[10px] text-brand-accent-cyan mt-1 block">Approved by Dean & HOD</span>
          </div>
          <div className="p-3 bg-brand-accent-cyan/10 rounded-xl text-brand-accent-cyan">
            <Award className="w-6 h-6" />
          </div>
        </div>

        <div className="card p-5 bg-brand-bg-secondary border border-brand-border rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-brand-text-muted text-xs font-semibold">Total Credentials Issued</span>
            <span className="block text-2xl font-bold font-display text-brand-accent-emerald mt-1">142 Certificates</span>
            <span className="text-[10px] text-brand-accent-emerald mt-1 block">Fully anchored to block ledger</span>
          </div>
          <div className="p-3 bg-brand-accent-emerald/10 rounded-xl text-brand-accent-emerald">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Verification Queue */}
        <div className="card bg-brand-bg-secondary border border-brand-border rounded-2xl p-6 flex flex-col gap-4">
          <h3 className="text-lg font-bold font-display text-white border-b border-brand-border/40 pb-3 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-accent-cyan" />
            Verification & Graduation Issuance Panel
          </h3>
          <div className="flex flex-col gap-3.5">
            {requests.map(req => (
              <div key={req.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-brand-bg-tertiary/60 border border-brand-border/40 rounded-2xl text-xs gap-3">
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-white text-sm">{req.student}</span>
                  <span className="text-brand-text-muted">Requested Document: <strong className="text-white font-medium">{req.type}</strong></span>
                  {req.hash !== 'N/A' && (
                    <span className="text-[10px] text-brand-accent-emerald font-mono">Ledger Proof Hash: {req.hash}</span>
                  )}
                </div>
                <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                  <span className={`badge text-[10px] px-2.5 py-0.5 rounded font-semibold ${
                    req.status === 'Issued & Hashed' 
                      ? 'bg-brand-accent-emerald/20 text-brand-accent-emerald' 
                      : (req.status === 'Pending Signature' ? 'bg-brand-accent-cyan/20 text-brand-accent-cyan' : 'bg-brand-accent-amber/20 text-brand-accent-amber')
                  }`}>
                    {req.status}
                  </span>
                  {req.status !== 'Issued & Hashed' && (
                    <button 
                      onClick={() => handleIssueCredential(req.id)} 
                      className="btn btn-primary btn-sm flex items-center gap-1.5 cursor-pointer text-xs py-1 px-3"
                    >
                      <Award className="w-3.5 h-3.5" />
                      Sign & Issue
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
