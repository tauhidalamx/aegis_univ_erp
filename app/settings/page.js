'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ToggleLeft, ShieldCheck, Key, Settings, User, Bell, Sliders, Moon, Info } from 'lucide-react';

export default function SettingsPage() {
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

  const [institutionName, setInstitutionName] = useState('Aegis Model University');
  const [timeZone, setTimeZone] = useState('UTC +05:30 (Calcutta, Mumbai)');
  const [startYear, setStartYear] = useState(2026);
  const [autoGrades, setAutoGrades] = useState('Enabled (Real-time Grade Calculation)');

  // User preference states
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [systemLogsVisibility, setSystemLogsVisibility] = useState(false);

  // Auditor states
  const [auditLoading, setAuditLoading] = useState(false);
  const [auditResults, setAuditResults] = useState(null);

  const handleSavePreferences = () => {
    alert('Preferences persisted successfully!');
  };

  const handleRunIntegrity = async () => {
    setAuditLoading(true);
    setAuditResults(null);

    setTimeout(async () => {
      if (typeof window !== 'undefined' && window.UniversityDB && typeof window.UniversityDB.runIntegrityPrediction === 'function') {
        try {
          const anomalies = await window.UniversityDB.runIntegrityPrediction();
          setAuditResults({
            status: 'success',
            anomalies: anomalies || []
          });
        } catch (e) {
          console.error(e);
          setAuditResults({
            status: 'error',
            message: 'Integrity scan encountered a calculation error.'
          });
        } finally {
          setAuditLoading(false);
        }
      } else {
        setAuditResults({
          status: 'error',
          message: 'Database auditor model is currently unavailable.'
        });
        setAuditLoading(false);
      }
    }, 800);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="w-8 h-8 border-4 border-brand-primary/30 border-t-brand-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!currentUser) return null;

  const isAdmin = currentUser.role === 'admin' || currentUser.role === 'superadmin' || currentUser.role === 'platformadmin';

  return (
    <div className="flex flex-col gap-6 md:gap-8 fade-in">
      <div className="page-header pb-4 border-b border-brand-border/40">
        <div>
          <h1 className="text-3xl font-display font-bold text-white tracking-tight flex items-center gap-3">
            <Settings className="w-8 h-8 text-brand-primary" />
            System Settings & Preferences
          </h1>
          <p className="text-brand-text-muted mt-1 text-sm">Configure account behaviors, alert routing, notification triggers, and check diagnostic levels.</p>
        </div>
      </div>

      {isAdmin ? (
        // ADMINISTRATOR VIEW
        <div className="flex flex-col gap-6">
          {/* System Configurations Card */}
          <div className="card p-6 bg-brand-bg-secondary border border-brand-border rounded-2xl mt-2">
            <h3 className="mb-4 font-display text-lg font-bold text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-brand-primary" />
              System Configuration Panel
            </h3>
            <p className="text-brand-text-muted text-xs mb-6">Manage application settings, custom credentials, user privileges, and system API configuration integrations.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="form-group flex flex-col gap-1.5">
                <label className="form-label text-xs font-semibold text-brand-text-muted">Institution Name</label>
                <input 
                  type="text" 
                  className="bg-brand-bg-tertiary border border-brand-border text-white p-2.5 rounded-xl outline-none" 
                  value={institutionName}
                  onChange={(e) => setInstitutionName(e.target.value)}
                />
              </div>
              <div className="form-group flex flex-col gap-1.5">
                <label className="form-label text-xs font-semibold text-brand-text-muted">System Time Zone</label>
                <select 
                  className="bg-brand-bg-tertiary border border-brand-border text-white p-2.5 rounded-xl outline-none"
                  value={timeZone}
                  onChange={(e) => setTimeZone(e.target.value)}
                >
                  <option>UTC +05:30 (Calcutta, Mumbai)</option>
                  <option>UTC +00:00 (London, GMT)</option>
                  <option>UTC -05:00 (New York, EST)</option>
                </select>
              </div>
              <div className="form-group flex flex-col gap-1.5">
                <label className="form-label text-xs font-semibold text-brand-text-muted">Academic Calendar Start Year</label>
                <input 
                  type="number" 
                  className="bg-brand-bg-tertiary border border-brand-border text-white p-2.5 rounded-xl outline-none" 
                  value={startYear}
                  onChange={(e) => setStartYear(parseInt(e.target.value) || 2026)}
                />
              </div>
              <div className="form-group flex flex-col gap-1.5">
                <label className="form-label text-xs font-semibold text-brand-text-muted">Enable Automated Result Processing</label>
                <select 
                  className="bg-brand-bg-tertiary border border-brand-border text-white p-2.5 rounded-xl outline-none"
                  value={autoGrades}
                  onChange={(e) => setAutoGrades(e.target.value)}
                >
                  <option>Enabled (Real-time Grade Calculation)</option>
                  <option>Disabled (Manual Batch Runs)</option>
                </select>
              </div>
            </div>
            <button className="btn btn-primary mt-6 cursor-pointer font-semibold" onClick={handleSavePreferences}>Save Preferences</button>
          </div>

          {/* Database AI Auditor Panel */}
          <div className="card p-6 bg-brand-bg-secondary border border-brand-border rounded-2xl mt-2 flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-brand-border/40 pb-4">
              <div>
                <h3 className="m-0 font-display text-lg font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-brand-accent-emerald" />
                  Database AI Integrity Auditor
                </h3>
                <p className="text-brand-text-muted text-xs mt-1">Run the autoencoder model over student profiles to detect logical record inconsistencies or anomalous values.</p>
              </div>
              <button 
                className="btn btn-primary btn-sm cursor-pointer shrink-0" 
                onClick={handleRunIntegrity}
                disabled={auditLoading}
              >
                {auditLoading ? 'Auditing...' : 'Scan Database'}
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {auditLoading && (
                <div className="text-xs text-brand-primary animate-pulse font-semibold py-2">
                  Auditing database records via TensorFlow autoencoder models...
                </div>
              )}

              {!auditLoading && !auditResults && (
                <div className="text-brand-text-subtle text-xs py-2">
                  Click Scan Database to run the in-browser anomaly detection neural network.
                </div>
              )}

              {auditResults && auditResults.status === 'error' && (
                <div className="p-4 rounded-xl bg-brand-accent-ruby/10 border border-brand-accent-ruby/20 text-brand-accent-ruby text-xs font-semibold">
                  {auditResults.message}
                </div>
              )}

              {auditResults && auditResults.status === 'success' && (
                <>
                  {auditResults.anomalies.length === 0 ? (
                    <div className="p-4 rounded-xl bg-brand-accent-emerald/10 border border-brand-accent-emerald/20 text-brand-accent-emerald text-xs font-semibold">
                      ✓ No profile data anomalies or integrity issues identified.
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <div className="text-brand-accent-ruby text-xs font-bold">
                        ⚠️ Detected {auditResults.anomalies.length} anomaly pattern(s):
                      </div>
                      {auditResults.anomalies.map((a, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-brand-bg-tertiary border border-brand-border flex justify-between items-center text-xs text-white font-semibold">
                          <div>
                            <strong className="text-white">{a.name} ({a.studentId})</strong>
                            <div className="text-brand-accent-ruby font-normal mt-1">{a.reason}</div>
                          </div>
                          <div className="text-right font-mono text-[0.7rem] text-brand-text-subtle">
                            Error score: {a.errorScore}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        // END-USER/STAFF VIEW
        <div className="flex flex-col gap-6">
          {/* User Preferences Card */}
          <div className="card p-6 bg-brand-bg-secondary border border-brand-border rounded-2xl">
            <h3 className="mb-4 font-display text-lg font-bold text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-brand-primary" />
              User Account Preferences
            </h3>
            <p className="text-brand-text-muted text-xs mb-6">Configure account preferences, notifications toggle, and security triggers.</p>

            <div className="flex flex-col gap-5 max-w-xl">
              <div className="flex items-center justify-between p-3.5 bg-brand-bg-tertiary/60 border border-brand-border/40 rounded-xl">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-brand-accent-cyan" />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white">Email Notifications</span>
                    <span className="text-[10px] text-brand-text-muted mt-0.5">Receive announcements and alert digests.</span>
                  </div>
                </div>
                <input 
                  type="checkbox" 
                  checked={emailNotifications} 
                  onChange={(e) => setEmailNotifications(e.target.checked)} 
                  className="w-4 h-4 cursor-pointer accent-brand-primary"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-brand-bg-tertiary/60 border border-brand-border/40 rounded-xl">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-brand-accent-emerald" />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white">Security Alerts</span>
                    <span className="text-[10px] text-brand-text-muted mt-0.5">Receive immediate notifications on failed key signatures or wallet activity.</span>
                  </div>
                </div>
                <input 
                  type="checkbox" 
                  checked={securityAlerts} 
                  onChange={(e) => setSecurityAlerts(e.target.checked)} 
                  className="w-4 h-4 cursor-pointer accent-brand-primary"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-brand-bg-tertiary/60 border border-brand-border/40 rounded-xl">
                <div className="flex items-center gap-3">
                  <Moon className="w-5 h-5 text-brand-accent-amber" />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white">Interface Theme Mode</span>
                    <span className="text-[10px] text-brand-text-muted mt-0.5">Toggle dark and custom high-contrast modes.</span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-brand-accent-amber">Dark (Primary)</span>
              </div>
            </div>
            <button className="btn btn-primary mt-6 cursor-pointer font-semibold" onClick={handleSavePreferences}>Save Preferences</button>
          </div>

          {/* User Session Detail Card */}
          <div className="card p-6 bg-brand-bg-secondary border border-brand-border rounded-2xl flex flex-col gap-4">
            <h3 className="text-lg font-bold font-display text-white border-b border-brand-border/40 pb-3 flex items-center gap-2">
              <Info className="w-5 h-5 text-brand-accent-cyan" />
              Security Log Details
            </h3>
            <div className="flex flex-col gap-3.5 text-xs">
              <div className="flex justify-between items-center border-b border-brand-border/20 pb-2.5">
                <span className="text-brand-text-muted">User Identity:</span>
                <span className="text-white font-bold">{currentUser.name}</span>
              </div>
              <div className="flex justify-between items-center border-b border-brand-border/20 pb-2.5">
                <span className="text-brand-text-muted">Clearance Role:</span>
                <span className="text-brand-accent-cyan font-bold font-mono uppercase">{currentUser.role}</span>
              </div>
              <div className="flex justify-between items-center border-b border-brand-border/20 pb-2.5">
                <span className="text-brand-text-muted">Email endpoint:</span>
                <span className="text-white font-mono">{currentUser.email}</span>
              </div>
              <div className="flex justify-between items-center pb-1">
                <span className="text-brand-text-muted">Session Status:</span>
                <span className="text-brand-accent-emerald font-bold">Authorized & Active</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
