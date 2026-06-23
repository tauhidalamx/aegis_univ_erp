'use client';

import React, { useState, useEffect } from 'react';
import { DollarSign, Percent, TrendingUp, RefreshCw, BarChart2, CheckCircle2 } from 'lucide-react';

export default function FinanceDashboard() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState([
    { id: 'inv_101', student: 'Jackson Cole', amount: '$4,500', due: 'Overdue', status: 'Unpaid' },
    { id: 'inv_102', student: 'Maya Lin', amount: '$1,164', due: 'June 30, 2026', status: 'Pending Approval' },
    { id: 'inv_103', student: 'Ravi Kumar', amount: '$4,200', due: 'Completed', status: 'Paid' }
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

  const handleApproveInvoice = (id) => {
    setInvoices(prev => prev.map(inv => inv.id === id ? { ...inv, status: 'Paid', due: 'Completed' } : inv));
    alert('Invoice transaction successfully marked as cleared on bank register.');
  };

  if (loading) return null;

  return (
    <div className="flex flex-col gap-6 md:gap-8 fade-in">
      <div className="flex justify-between items-center pb-4 border-b border-brand-border/40">
        <div>
          <h1 className="text-3xl font-display font-bold text-white tracking-tight flex items-center gap-3">
            <DollarSign className="w-8 h-8 text-brand-primary" />
            Financial Controller Dashboard
          </h1>
          <p className="text-brand-text-muted text-sm mt-1">Welcome back, {currentUser?.name || 'Finance Controller'}. Treasury reconciliation, tuition collection records, fee defaults, and budget monitoring.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-5 bg-brand-bg-secondary border border-brand-border rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-brand-text-muted text-xs font-semibold">Tuition Revenue Cleared</span>
            <span className="block text-2xl font-bold font-display text-white mt-1">$118,200</span>
            <span className="text-[10px] text-brand-accent-emerald mt-1 block">✓ 84% target cleared</span>
          </div>
          <div className="p-3 bg-brand-accent-emerald/10 rounded-xl text-brand-accent-emerald">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="card p-5 bg-brand-bg-secondary border border-brand-border rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-brand-text-muted text-xs font-semibold">Total Scholarships Disbursed</span>
            <span className="block text-2xl font-bold font-display text-white mt-1">$45,000</span>
            <span className="text-[10px] text-brand-accent-cyan mt-1 block">52 student profiles active</span>
          </div>
          <div className="p-3 bg-brand-accent-cyan/10 rounded-xl text-brand-accent-cyan">
            <Percent className="w-6 h-6" />
          </div>
        </div>

        <div className="card p-5 bg-brand-bg-secondary border border-brand-border rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-brand-text-muted text-xs font-semibold">Treasury Cash Reserves</span>
            <span className="block text-2xl font-bold font-display text-white mt-1">$450,000 USD</span>
            <span className="text-[10px] text-brand-accent-emerald mt-1 block">Liquidity quotient: Stable</span>
          </div>
          <div className="p-3 bg-brand-accent-emerald/10 rounded-xl text-brand-accent-emerald">
            <BarChart2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Tuition Invoices */}
        <div className="card bg-brand-bg-secondary border border-brand-border rounded-2xl p-6 flex flex-col gap-4">
          <h3 className="text-lg font-bold font-display text-white border-b border-brand-border/40 pb-3 flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand-accent-cyan" />
            Tuition Fee Invoice & Collection Register
          </h3>
          <div className="flex flex-col gap-3.5">
            {invoices.map(inv => (
              <div key={inv.id} className="p-3 bg-brand-bg-tertiary/60 border border-brand-border/40 rounded-xl text-xs flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="font-bold text-white text-sm">{inv.student}</span>
                  <span className="text-[10px] text-brand-text-muted mt-1">Amount: <code className="text-white font-mono">{inv.amount}</code> | Due: {inv.due}</span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`badge text-[10px] px-2 py-0.5 rounded font-bold ${
                    inv.status === 'Paid' 
                      ? 'bg-brand-accent-emerald/20 text-brand-accent-emerald' 
                      : (inv.status === 'Pending Approval' ? 'bg-brand-accent-cyan/20 text-brand-accent-cyan' : 'bg-brand-accent-ruby/20 text-brand-accent-ruby animate-pulse')
                  }`}>
                    {inv.status}
                  </span>
                  {inv.status === 'Pending Approval' && (
                    <button 
                      onClick={() => handleApproveInvoice(inv.id)}
                      className="btn btn-primary btn-sm flex items-center gap-1.5 cursor-pointer text-xs py-1 px-3"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Clear Fees
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
