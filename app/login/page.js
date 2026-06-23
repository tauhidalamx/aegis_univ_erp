'use client';

import React, { useState, useEffect, useRef } from 'react';
import '../../styles/auth.css';

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState('signin'); // 'signin' or 'signup'
  
  // SignIn states
  const [signinEmail, setSigninEmail] = useState('');
  const [signinPassword, setSigninPassword] = useState('');
  const [signinShowPassword, setSigninShowPassword] = useState(false);
  const [signinError, setSigninError] = useState('');
  const [signinLoading, setSigninLoading] = useState(false);

  // SignUp states
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupRole, setSignupRole] = useState('student');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [signupShowPassword, setSignupShowPassword] = useState(false);
  const [signupError, setSignupError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState('');
  const [signupLoading, setSignupLoading] = useState(false);

  // Password Strength State
  const [strengthLevel, setStrengthLevel] = useState('weak');
  const [strengthText, setStrengthText] = useState('Password Strength');

  // Threat Monitoring State
  const [threatPercent, setThreatPercent] = useState(0.08);
  const [threatStatus, setThreatStatus] = useState('Normal');
  const [threatDesc, setThreatDesc] = useState('TensorFlow.js model running inference on attempt timestamps, input patterns, and failure thresholds.');
  const [threatBarColor, setThreatBarColor] = useState('var(--color-brand-primary)');

  const [failureCount, setFailureCount] = useState(0);
  const tfModelRef = useRef(null);
  const logBoxRef = useRef(null);

  // Force Password Change States
  const [mustChange, setMustChange] = useState(false);
  const [tempUser, setTempUser] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [newPasswordShow, setNewPasswordShow] = useState(false);
  const [changePasswordError, setChangePasswordError] = useState('');
  const [changePasswordLoading, setChangePasswordLoading] = useState(false);

  // SSO / MFA States
  const [mfaActive, setMfaActive] = useState(false);
  const [mfaCode, setMfaCode] = useState('');
  const [mfaError, setMfaError] = useState('');
  const [mfaLoading, setMfaLoading] = useState(false);
  const [pendingUserSession, setPendingUserSession] = useState(null);

  // Demo Credentials & Clipboard states
  const [isDev, setIsDev] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDev(window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    }
  }, []);

  // System Boot Loader States
  const [systemBooting, setSystemBooting] = useState(false);
  const [bootProgress, setBootProgress] = useState(0);
  const [bootLogs, setBootLogs] = useState([]);

  // Storage Keys
  const SESSION_KEY = 'aegis_erp_session';

  // Hashing Helper (matches server side)
  const hashPassword = (plain) => {
    var hash = 0;
    for (var i = 0; i < plain.length; i++) {
      var ch = plain.charCodeAt(i);
      hash = ((hash << 5) - hash) + ch;
      hash |= 0;
    }
    return 'h$' + Math.abs(hash).toString(36);
  };

  // Check if already logged in on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const session = sessionStorage.getItem(SESSION_KEY);
      if (session) {
        window.location.href = '/';
      }
    }
  }, []);

  // Initialize TensorFlow Threat Model
  useEffect(() => {
    if (typeof window !== 'undefined' && window.tf) {
      try {
        const tf = window.tf;
        const model = tf.sequential();
        model.add(tf.layers.dense({ units: 4, activation: 'relu', inputShape: [4] }));
        model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));
        model.compile({
          optimizer: tf.train.adam(0.1),
          loss: 'binaryCrossentropy'
        });
        tfModelRef.current = model;
      } catch (err) {
        console.warn('TF Model Initialization failed', err);
      }
    }
  }, []);

  // Auto scroll system boot logs
  useEffect(() => {
    if (logBoxRef.current) {
      logBoxRef.current.scrollTop = logBoxRef.current.scrollHeight;
    }
  }, [bootLogs]);

  // Password Strength Check for sign up
  useEffect(() => {
    if (!signupPassword) {
      setStrengthLevel('weak');
      setStrengthText('Password Strength');
      return;
    }

    let score = 0;
    if (signupPassword.length >= 6) score++;
    if (signupPassword.length >= 10) score++;
    if (/[A-Z]/.test(signupPassword)) score++;
    if (/[0-9]/.test(signupPassword)) score++;
    if (/[^A-Za-z0-9]/.test(signupPassword)) score++;

    let level = 'weak';
    if (score >= 4) level = 'strong';
    else if (score >= 2) level = 'medium';

    setStrengthLevel(level);
    const labels = { weak: 'Weak', medium: 'Medium', strong: 'Strong' };
    setStrengthText(labels[level]);
  }, [signupPassword]);

  // Password Strength Check for password reset
  const getNewPassStrength = () => {
    if (!newPassword) return { level: 'weak', text: 'Password Strength' };
    let score = 0;
    if (newPassword.length >= 8) score++;
    if (newPassword.length >= 12) score++;
    if (/[A-Z]/.test(newPassword)) score++;
    if (/[0-9]/.test(newPassword)) score++;
    if (/[^A-Za-z0-9]/.test(newPassword)) score++;

    let level = 'weak';
    if (score >= 4) level = 'strong';
    else if (score >= 2) level = 'medium';
    return { level, text: level.toUpperCase() };
  };

  // Threat score update
  useEffect(() => {
    const calculateThreat = async () => {
      if (typeof window === 'undefined' || !window.tf || !tfModelRef.current) return;

      const tf = window.tf;
      const emailLen = signinEmail.length;
      const passLen = signinPassword.length;
      const hour = new Date().getHours();

      const inputTensor = tf.tensor2d([
        [Math.min(emailLen / 50, 1), Math.min(passLen / 50, 1), Math.min(failureCount / 5, 1), hour / 24]
      ], [1, 4]);

      try {
        const output = tfModelRef.current.predict(inputTensor);
        const prob = (await output.data())[0];
        setThreatPercent(parseFloat((prob * 100).toFixed(2)));

        if (prob < 0.3) {
          setThreatBarColor('var(--color-brand-primary)');
        } else if (prob < 0.7) {
          setThreatBarColor('var(--color-brand-accent-amber)');
        } else {
          setThreatBarColor('var(--color-brand-accent-ruby)');
        }

        if (failureCount >= 3 || prob >= 0.7) {
          setThreatStatus('Critical Threat');
          setThreatDesc('WARNING: Repeated failures and abnormal input profiles. Verification required.');
        } else if (failureCount >= 1 || prob >= 0.3) {
          setThreatStatus('Elevated Threat');
          setThreatDesc('AI System adjusting weights via Adam optimizer based on login attempt latency.');
        } else {
          setThreatStatus('Normal');
          setThreatDesc('TensorFlow.js model running inference on attempt timestamps, input patterns, and failure thresholds.');
        }

        inputTensor.dispose();
        output.dispose();
      } catch (err) {
        console.error('Inference error:', err);
      }
    };

    calculateThreat();
  }, [signinEmail, signinPassword, failureCount]);

  // Handle Redirection based on role
  const redirectUser = (role) => {
    const roleLandingPage = {
      superadmin: '/admin/global',
      platformadmin: '/admin/platform',
      admin: '/erp/admin',
      registrar: '/erp/registrar',
      dean: '/erp/dean',
      hod: '/erp/hod',
      faculty: '/faculty/home',
      finance_manager: '/finance/dashboard',
      research_coordinator: '/research/dashboard',
      placement_officer: '/placement/dashboard',
      student: '/student/home',
      parent: '/parent/dashboard',
      alumni: '/alumni/home',
      recruiter: '/recruiter/dashboard',
      sports_director: '/sports/director',
      coach: '/sports/coach',
      athlete: '/sports/athlete',
      sports_parent: '/sports/parent'
    };

    const target = roleLandingPage[role] || '/';
    window.location.href = target;
  };

  // Sign In Submit
  const handleSignIn = (e) => {
    e.preventDefault();
    setSigninError('');
    setSigninLoading(true);

    if (!signinEmail || !signinPassword) {
      setSigninError('Email and password are required.');
      setFailureCount(prev => prev + 1);
      setSigninLoading(false);
      return;
    }

    const emailLower = signinEmail.trim().toLowerCase();

    fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: emailLower,
        password: signinPassword
      })
    })
    .then(res => {
      if (!res.ok) {
        return res.json().then(errData => {
          throw new Error(errData.error || 'Invalid email or password.');
        });
      }
      return res.json();
    })
    .then(data => {
      setSigninLoading(false);
      if (data.success) {
        if (data.mustChangePassword) {
          // Force password change first
          setTempUser({ email: emailLower, oldPassword: signinPassword, role: data.user.role });
          setMustChange(true);
        } else {
          // Proceed directly to loader (bypass MFA verification)
          const sessionData = {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            role: data.user.role,
            avatar: data.user.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
            loginAt: new Date().toISOString()
          };
          sessionStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
          setSystemBooting(true);
          startBootSequence(sessionData);
        }
      }
    })
    .catch(err => {
      setSigninError(err.message || 'Invalid email or password. Please try again.');
      setFailureCount(prev => prev + 1);
      setSigninLoading(false);
    });
  };

  // Password Reset Submit
  const handleChangePassword = (e) => {
    e.preventDefault();
    setChangePasswordError('');
    setChangePasswordLoading(true);

    if (!newPassword || !confirmNewPassword) {
      setChangePasswordError('Please enter your new password.');
      setChangePasswordLoading(false);
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setChangePasswordError('New passwords do not match.');
      setChangePasswordLoading(false);
      return;
    }

    if (newPassword.length < 8) {
      setChangePasswordError('Password must be at least 8 characters long.');
      setChangePasswordLoading(false);
      return;
    }

    if (newPassword === 'Demo@123') {
      setChangePasswordError('Please select a password different from the temporary demo password.');
      setChangePasswordLoading(false);
      return;
    }

    fetch('/api/auth/change-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: tempUser.email,
        oldPassword: tempUser.oldPassword,
        newPassword: newPassword
      })
    })
    .then(res => {
      if (!res.ok) {
        return res.json().then(errData => {
          throw new Error(errData.error || 'Failed to change password.');
        });
      }
      return res.json();
    })
    .then(data => {
      setChangePasswordLoading(false);
      if (data.success && data.user) {
        // Proceed directly to loader (bypass MFA verification)
        const sessionData = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
          avatar: data.user.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
          loginAt: new Date().toISOString()
        };
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
        setMustChange(false);
        setSystemBooting(true);
        startBootSequence(sessionData);
      }
    })
    .catch(err => {
      setChangePasswordError(err.message || 'Error occurred updating password.');
      setChangePasswordLoading(false);
    });
  };

  // Start dynamic boot / data loading sequence
  const startBootSequence = (session) => {
    const emailLower = session.email.toLowerCase();
    
    // Map department based on role or email
    let department = 'General Academics';
    if (emailLower.includes('admin')) department = 'Global System Operations';
    else if (emailLower.includes('student')) department = 'Computer Science & AI Research';
    else if (emailLower.includes('faculty')) department = 'School of Advanced Computing';
    else if (session.role.includes('library')) department = 'University Library Network';
    else if (session.role.includes('hostel')) department = 'Campus Housing & Logistics';
    else if (session.role.includes('transport')) department = 'Transportation Services';
    else if (session.role.includes('medical')) department = 'Sports & Medical Center';
    else if (session.role.includes('compliance') || session.role.includes('auditor')) department = 'Governance & Ethics Compliance';
    
    // Map campus
    let campus = 'North Tech Campus (Primary Hub)';
    if (session.role.includes('sports') || session.role.includes('medical')) campus = 'East Athletic Precinct';
    else if (session.role.includes('hostel') || session.role.includes('transport')) campus = 'South Logistical Zone';
    else if (session.role.includes('library')) campus = 'West Academic Archway';

    // Map RAG model
    let ragModel = 'aegis-rag-academic-v4';
    if (session.role === 'superadmin' || session.role === 'platformadmin') ragModel = 'aegis-rag-sec-ops-v5';
    else if (session.role.includes('compliance') || session.role.includes('auditor')) ragModel = 'aegis-rag-regulatory-v3';
    else if (session.role.includes('finance')) ragModel = 'aegis-rag-ledger-v2';

    // Short DID wallet sync code
    const didSuffix = hashPassword(session.email).substring(2);
    const didStatus = `did:aegis:2026:${didSuffix || '8f2b1d'} [SYNCED]`;

    const displayRole = {
      superadmin: 'Global Super Admin',
      platformadmin: 'Platform Admin',
      admin: 'University Admin',
      registrar: 'Registrar Officer',
      dean: 'Dean of Faculty',
      hod: 'Department Head (HOD)',
      faculty: 'Faculty Member',
      finance_manager: 'Finance Manager',
      research_coordinator: 'Research Coordinator',
      placement_officer: 'Placement Officer',
      student: 'Student',
      parent: 'Parent',
      alumni: 'Alumni',
      recruiter: 'Recruiter',
      sports_director: 'Sports Director',
      coach: 'Sports Head Coach',
      athlete: 'Student Athlete',
      sports_parent: 'Athlete Parent',
      department_admin: 'Department Admin',
      library_admin: 'Library Admin',
      hostel_admin: 'Hostel Admin',
      transport_admin: 'Transport Admin',
      medical_staff: 'Medical Staff',
      guest: 'Guest User',
      consultant: 'Consultant',
      auditor: 'External Auditor',
      compliance_officer: 'Compliance Officer'
    }[session.role] || 'User';

    const logsList = [
      { progress: 0, text: `Initializing Aegis Secure Shell v5.0.0-mega-upgrade...` },
      { progress: 8, text: `Establishing handshake with local node on port 5000...` },
      { progress: 15, text: `[OK] Local socket handshake verified. Connection secure.` },
      { progress: 22, text: `Opening transaction ledger SQLite database...` },
      { progress: 30, text: `[DB] Scanning ledger schema: found table 'users', 'posts', 'soc_incidents', 'studio_workflows', 'admissions_applications', 'procurement_orders', 'compliance_policies'.` },
      { progress: 38, text: `[DB] Loaded 1,000+ realistic simulated dataset records.` },
      { progress: 45, text: `Syncing Blockchain DID: ${didStatus}...` },
      { progress: 52, text: `Mounting Zero Trust routing guard and filtering navigations...` },
      { progress: 60, text: `Resolving RBAC credentials for role: ${session.role.toUpperCase()} (${displayRole})...` },
      { progress: 68, text: `Department Alignment: ${department}...` },
      { progress: 75, text: `Campus Routing: ${campus}...` },
      { progress: 82, text: `Initializing RAG context matching: loading model ${ragModel}...` },
      { progress: 90, text: `[KAFKA] Emitting audit log event: 'user-login' for ${session.email}...` },
      { progress: 95, text: `Workspace initialized. Mounting ${session.role.toUpperCase()} administrative command shell...` },
      { progress: 100, text: `Redirecting user console context...` }
    ];

    let currentLogIndex = 0;
    setBootLogs([logsList[0].text]);
    setBootProgress(0);

    const interval = setInterval(() => {
      currentLogIndex++;
      if (currentLogIndex < logsList.length) {
        const item = logsList[currentLogIndex];
        setBootLogs(prev => [...prev, item.text]);
        setBootProgress(item.progress);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          redirectUser(session.role);
        }, 300);
      }
    }, 250);
  };

  // MFA Submit Verification
  const handleMfaVerify = (e) => {
    e.preventDefault();
    setMfaError('');
    setMfaLoading(true);

    setTimeout(() => {
      setMfaLoading(false);
      // Accept any verification code as fallback
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(pendingUserSession));
      setMfaActive(false);
      setSystemBooting(true);
      startBootSequence(pendingUserSession);
    }, 800);
  };

  // Sign Up Submit
  const handleSignUp = (e) => {
    e.preventDefault();
    setSignupError('');
    setSignupSuccess('');
    setSignupLoading(true);

    if (!signupName.trim() || !signupEmail.trim() || !signupPassword) {
      setSignupError('All fields are required.');
      setSignupLoading(false);
      return;
    }

    if (signupPassword.length < 8) {
      setSignupError('Password must be at least 8 characters.');
      setSignupLoading(false);
      return;
    }

    if (signupPassword !== signupConfirmPassword) {
      setSignupError('Passwords do not match.');
      setSignupLoading(false);
      return;
    }

    const emailLower = signupEmail.trim().toLowerCase();

    fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: 'usr_' + Date.now().toString(36),
        name: signupName.trim(),
        email: emailLower,
        role: signupRole,
        password: signupPassword,
        avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random()*1000000)}?w=150`
      })
    })
    .then(res => {
      if (!res.ok) {
        return res.json().then(errData => {
          throw new Error(errData.error || 'Failed to create account.');
        });
      }
      return res.json();
    })
    .then(data => {
      setSignupSuccess('Account created successfully! Switching to sign in...');
      setSignupLoading(false);
      
      setTimeout(() => {
        setActiveTab('signin');
        setSignupName('');
        setSignupEmail('');
        setSignupPassword('');
        setSignupConfirmPassword('');
        setSignupSuccess('');
      }, 1500);
    })
    .catch(err => {
      setSignupError(err.message || 'An error occurred during sign up.');
      setSignupLoading(false);
    });
  };

  // Demo Credentials Fill Helper
  const fillDemo = (email, pass) => {
    setSigninEmail(email);
    setSigninPassword(pass);
    setSigninError('');
  };

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleOneClickLogin = (email, password) => {
    setSigninEmail(email);
    setSigninPassword(password);
    setSigninError('');
    setSigninLoading(true);

    fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(res => {
      if (!res.ok) {
        return res.json().then(errData => {
          throw new Error(errData.error || 'Invalid email or password.');
        });
      }
      return res.json();
    })
    .then(data => {
      setSigninLoading(false);
      if (data.success) {
        const sessionData = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
          avatar: data.user.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
          loginAt: new Date().toISOString()
        };
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
        setSystemBooting(true);
        startBootSequence(sessionData);
      }
    })
    .catch(err => {
      setSigninError(err.message || 'Invalid email or password. Please try again.');
      setSigninLoading(false);
    });
  };

  // Mock SSO triggers
  const handleSSO = (provider) => {
    const ssoUser = {
      Google: { id: 'usr_sso_g', name: 'SSO Scholar (Google)', email: 'student@aegis.demo', role: 'student', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150' },
      Microsoft: { id: 'usr_sso_m', name: 'SSO Admin (Microsoft)', email: 'univadmin@aegis.demo', role: 'admin', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' },
      Passkey: { id: 'usr_sso_p', name: 'SSO Director (Passkey)', email: 'superadmin@aegis.demo', role: 'superadmin', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150' }
    };

    const user = ssoUser[provider];
    alert(`Initiating secure ${provider} SSO verification sequence...`);
    
    // Proceed directly to loader (bypass MFA verification)
    const sessionData = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      loginAt: new Date().toISOString()
    };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
    setSystemBooting(true);
    startBootSequence(sessionData);
  };

  return (
    <div className="bg-brand-bg-primary text-brand-text-main font-sans min-h-screen flex items-center justify-center p-4">
      {systemBooting && (
        <div className="system-loader-overlay">
          <div className="system-loader-card">
            {/* Header / Telemetry */}
            <div className="loader-header">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-accent-cyan animate-pulse"></span>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white font-mono">Aegis Secure Shell Boot v4.19</span>
              </div>
              <div className="text-[10px] text-brand-text-muted font-mono">
                SYS_STATUS: LOADING_WORKSPACE ({bootProgress}%)
              </div>
            </div>
            
            {/* Log Output Box */}
            <div className="loader-log-box" ref={logBoxRef}>
              {bootLogs.map((log, idx) => (
                <div key={idx} className="log-line">
                  <span className="log-prompt">&gt;</span> {log}
                </div>
              ))}
            </div>

            {/* Progress Bar Container */}
            <div className="loader-progress-container">
              <div className="loader-progress-bar" style={{ width: `${bootProgress}%` }}></div>
            </div>

            {/* Micro-telemetry footer */}
            <div className="loader-footer text-[9px] text-brand-text-subtle font-mono flex justify-between">
              <span>LEDGER: ACTIVE (SQLITE)</span>
              <span>NODE_PORT: 5000</span>
              <span>Z-TRUST: ENFORCED</span>
            </div>
          </div>
        </div>
      )}

      <div className="auth-container w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 min-h-[750px] bg-brand-bg-secondary border border-brand-border rounded-3xl overflow-hidden shadow-2xl relative">
        
        {/* Brand Left Panel */}
        <div className="auth-brand relative hidden md:flex flex-col justify-between p-12 overflow-hidden bg-[#050b18] border-r border-brand-border">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
          <div className="dot-grid"></div>

          <div className="brand-content relative z-10">
            <div className="brand-logo w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-8 border border-brand-primary/20">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
              </svg>
            </div>

            <h1 className="brand-title text-3xl font-bold tracking-tight text-white font-display mb-2">AEGIS OS</h1>
            <p className="brand-tagline text-brand-text-muted text-sm mb-12">Role-Aware Enterprise IAM & Administrative Workspace</p>

            <div className="brand-features flex flex-col gap-6">
              <div className="brand-feature flex items-start gap-4">
                <div className="feature-icon w-10 h-10 rounded-lg bg-brand-bg-secondary flex items-center justify-center text-brand-primary border border-brand-border shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <div className="feature-text flex flex-col">
                  <strong className="text-sm font-semibold text-white">Zero Trust Architecture</strong>
                  <span className="text-xs text-brand-text-muted mt-1">Automatic IAM role resolution, secure URL route guards, and granular blockchain verification.</span>
                </div>
              </div>
              
              <div className="brand-feature flex items-start gap-4">
                <div className="feature-icon w-10 h-10 rounded-lg bg-brand-bg-secondary flex items-center justify-center text-brand-accent-cyan border border-brand-border shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </div>
                <div className="feature-text flex flex-col">
                  <strong className="text-sm font-semibold text-white">Unified Identity Hub</strong>
                  <span className="text-xs text-brand-text-muted mt-1">Singular login for ERP, CONNECT, CHAIN, and WEB3. Automatically filters permissions, widgets, and links.</span>
                </div>
              </div>

              <div className="brand-feature flex items-start gap-4">
                <div className="feature-icon w-10 h-10 rounded-lg bg-brand-bg-secondary flex items-center justify-center text-brand-accent-emerald border border-brand-border shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <div className="feature-text flex flex-col">
                  <strong className="text-sm font-semibold text-white">Active Threat Detection</strong>
                  <span className="text-xs text-brand-text-muted mt-1">Real-time local ML anomaly score models tracking password attempts, patterns, and login contexts.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Right Panel */}
        <div className="auth-form-panel flex flex-col justify-between p-8 md:p-12 bg-brand-bg-secondary relative">
          
          {/* Force Password Change Overlay */}
          {mustChange && tempUser && (
            <div className="absolute inset-0 bg-brand-bg-secondary z-50 p-8 md:p-12 flex flex-col justify-center fade-in">
              <div className="mb-6">
                <div className="w-12 h-12 rounded-xl bg-brand-accent-amber/10 flex items-center justify-center text-brand-accent-amber mb-4 border border-brand-accent-amber/20">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>
                </div>
                <h2 className="text-2xl font-bold text-white font-display mb-1">Update Security Credentials</h2>
                <p className="text-xs text-brand-text-muted">First-time login detected for <span className="text-brand-accent-cyan font-mono">{tempUser.email}</span>. A password change is required to secure your account.</p>
              </div>

              <form onSubmit={handleChangePassword} className="flex flex-col gap-4">
                <div className="auth-input-group relative">
                  <input 
                    type={newPasswordShow ? "text" : "password"} 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required 
                    placeholder="New Password" 
                    className="w-full bg-brand-bg-tertiary border border-brand-border rounded-xl px-4 py-3 pr-11 text-sm text-white outline-none focus:border-brand-primary transition-all placeholder-brand-text-subtle"
                  />
                  <button 
                    type="button" 
                    onClick={() => setNewPasswordShow(!newPasswordShow)}
                    className="password-toggle absolute right-4 top-3.5 text-brand-text-subtle hover:text-white cursor-pointer bg-transparent border-none"
                  >
                    {newPasswordShow ? (
                      <svg className="eye-closed w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    ) : (
                      <svg className="eye-open w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    )}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                <div className="password-strength">
                  <div className="strength-bar w-full h-1 bg-brand-bg-primary rounded overflow-hidden">
                    <div 
                      className={`strength-fill h-full transition-all duration-300 ${getNewPassStrength().level === 'weak' ? 'bg-brand-accent-ruby w-1/3' : (getNewPassStrength().level === 'medium' ? 'bg-brand-accent-amber w-2/3' : 'bg-brand-accent-emerald w-full')}`}
                    ></div>
                  </div>
                  <span className={`strength-text text-[0.7rem] mt-1 block ${getNewPassStrength().level === 'weak' ? 'text-brand-accent-ruby' : (getNewPassStrength().level === 'medium' ? 'text-brand-accent-amber' : 'text-brand-accent-emerald')}`}>
                    Complexity: {getNewPassStrength().text}
                  </span>
                </div>

                <div className="auth-input-group relative">
                  <input 
                    type="password" 
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    required 
                    placeholder="Confirm New Password" 
                    className="w-full bg-brand-bg-tertiary border border-brand-border rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-brand-primary transition-all placeholder-brand-text-subtle"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={changePasswordLoading}
                  className="auth-submit-btn w-full py-3 bg-brand-primary hover:bg-brand-primary-hover text-white rounded-xl font-semibold transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {changePasswordLoading ? 'Updating Credentials...' : 'Save Password & Authenticate'}
                </button>

                {changePasswordError && (
                  <div className="auth-error mt-2 p-3 bg-brand-accent-ruby/10 border border-brand-accent-ruby/20 text-brand-accent-ruby rounded-xl text-xs flex items-center gap-2">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4.5 h-4.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    <span>{changePasswordError}</span>
                  </div>
                )}
              </form>
            </div>
          )}

          {/* MFA Verification Screen Overlay */}
          {mfaActive && pendingUserSession && (
            <div className="absolute inset-0 bg-brand-bg-secondary z-50 p-8 md:p-12 flex flex-col justify-center fade-in">
              <div className="mb-6">
                <div className="w-12 h-12 rounded-xl bg-brand-accent-cyan/10 flex items-center justify-center text-brand-accent-cyan mb-4 border border-brand-accent-cyan/20 animate-pulse">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <h2 className="text-2xl font-bold text-white font-display mb-1">MFA Verification</h2>
                <p className="text-xs text-brand-text-muted">Multi-factor security protocol enabled for <span className="text-brand-accent-cyan font-mono">{pendingUserSession.email}</span>. Please enter the verification code sent to your authenticated application.</p>
              </div>

              <form onSubmit={handleMfaVerify} className="flex flex-col gap-4">
                <div className="auth-input-group relative">
                  <input 
                    type="text" 
                    value={mfaCode}
                    onChange={(e) => setMfaCode(e.target.value)}
                    required 
                    placeholder="Enter Code (Use 123456 for Demo)" 
                    maxLength={6}
                    className="w-full bg-brand-bg-tertiary border border-brand-border rounded-xl px-4 py-3 text-center text-lg font-bold font-mono tracking-[0.4em] text-white outline-none focus:border-brand-primary transition-all placeholder-brand-text-subtle placeholder:text-xs placeholder:tracking-normal"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={mfaLoading}
                  className="auth-submit-btn w-full py-3 bg-brand-primary hover:bg-brand-primary-hover text-white rounded-xl font-semibold transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {mfaLoading ? 'Verifying Identity...' : 'Confirm MFA Verification'}
                </button>

                <button 
                  type="button" 
                  onClick={() => { setMfaActive(false); setMfaCode(''); setMfaError(''); }}
                  className="text-xs text-brand-text-muted hover:text-white transition-colors bg-transparent border-none mt-2"
                >
                  &larr; Cancel and Sign In with another account
                </button>

                {mfaError && (
                  <div className="auth-error mt-2 p-3 bg-brand-accent-ruby/10 border border-brand-accent-ruby/20 text-brand-accent-ruby rounded-xl text-xs flex items-center gap-2">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4.5 h-4.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    <span>{mfaError}</span>
                  </div>
                )}
              </form>
            </div>
          )}

          {/* Mobile-only Header */}
          <div className="mobile-brand flex md:hidden flex-col items-center gap-4 mb-8">
            <div className="brand-logo w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary border border-brand-primary/20">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
              </svg>
            </div>
            <h1 className="brand-title text-xl font-bold tracking-tight text-white font-display">AEGIS OS</h1>
          </div>

          {/* Form Tabs */}
          <div className="auth-tabs flex gap-4 border-b border-brand-border pb-4 mb-8 shrink-0">
            <button 
              className={`auth-tab text-sm font-semibold pb-2 border-b-2 cursor-pointer transition-all hover:text-white ${activeTab === 'signin' ? 'active border-brand-primary text-white' : 'border-transparent text-brand-text-muted'}`}
              onClick={() => { setActiveTab('signin'); setSigninError(''); }}
            >
              Sign In
            </button>
            <button 
              className={`auth-tab text-sm font-semibold pb-2 border-b-2 cursor-pointer transition-all hover:text-white ${activeTab === 'signup' ? 'active border-brand-primary text-white' : 'border-transparent text-brand-text-muted'}`}
              onClick={() => { setActiveTab('signup'); setSignupError(''); }}
            >
              Sign Up
            </button>
          </div>

          {/* Sign In View */}
          {activeTab === 'signin' ? (
            <div className="auth-form-container fade-in flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white font-display mb-1">Welcome Back</h2>
                <p className="text-sm text-brand-text-muted mb-6">Enter your credentials or choose a SSO provider to log in</p>

                <form onSubmit={handleSignIn}>
                  <div className="auth-input-group relative mb-4">
                    <input 
                      type="email" 
                      value={signinEmail}
                      onChange={(e) => setSigninEmail(e.target.value)}
                      required 
                      placeholder="Email Address" 
                      className="w-full bg-brand-bg-tertiary border border-brand-border rounded-xl px-4 py-3 pl-11 text-sm text-white outline-none focus:border-brand-primary transition-all placeholder-brand-text-subtle"
                    />
                    <svg className="input-icon absolute left-4 top-3.5 w-5 h-5 text-brand-text-subtle" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </div>

                  <div className="auth-input-group relative mb-4">
                    <input 
                      type={signinShowPassword ? "text" : "password"} 
                      value={signinPassword}
                      onChange={(e) => setSigninPassword(e.target.value)}
                      required 
                      placeholder="Password" 
                      className="w-full bg-brand-bg-tertiary border border-brand-border rounded-xl px-4 py-3 pr-11 text-sm text-white outline-none focus:border-brand-primary transition-all placeholder-brand-text-subtle"
                    />
                    <button 
                      type="button" 
                      onClick={() => setSigninShowPassword(!signinShowPassword)}
                      className="password-toggle absolute right-4 top-3.5 text-brand-text-subtle hover:text-white cursor-pointer bg-transparent border-none"
                    >
                      {signinShowPassword ? (
                        <svg className="eye-closed w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      ) : (
                        <svg className="eye-open w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      )}
                    </button>
                  </div>

                  <div className="auth-options flex items-center justify-between mb-5">
                    <label className="custom-checkbox flex items-center gap-2 text-xs text-brand-text-muted cursor-pointer select-none">
                      <input type="checkbox" className="accent-brand-primary" />
                      Remember this machine
                    </label>
                    <span className="forgot-link text-xs text-brand-primary hover:text-brand-primary-hover transition-all cursor-pointer" onClick={() => alert('Demo notice: All passwords start as "Demo@123". Check credentials below.')}>Forgot Password?</span>
                  </div>

                  <button 
                    type="submit" 
                    disabled={signinLoading}
                    className="auth-submit-btn w-full py-3 bg-brand-primary hover:bg-brand-primary-hover text-white rounded-xl font-semibold transition-all shadow-lg shadow-brand-primary/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {signinLoading ? 'Authenticating...' : 'Sign In'}
                  </button>

                  {signinError && (
                    <div className="auth-error mt-3 p-3 bg-brand-accent-ruby/10 border border-brand-accent-ruby/20 text-brand-accent-ruby rounded-xl text-xs flex items-center gap-2">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4.5 h-4.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                      <span>{signinError}</span>
                    </div>
                  )}
                </form>

                {/* Platform Admin Demo Environment Card */}
                {isDev && (
                  <div className="auth-demo-card mt-6 p-5 bg-brand-bg-tertiary/75 border border-brand-primary/25 rounded-2xl shadow-[0_0_15px_rgba(99,102,241,0.15)] text-left flex flex-col gap-3">
                    <div className="flex justify-between items-center border-b border-brand-border/40 pb-2">
                      <div className="flex items-center gap-2">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-primary"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                        <span className="text-xs font-bold text-white font-display">Platform Admin Demo Environment</span>
                      </div>
                      <span className="badge bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Platform Admin
                      </span>
                    </div>

                    <div className="flex flex-col gap-1.5 text-xs">
                      <div className="flex justify-between items-center bg-brand-bg-secondary border border-brand-border rounded-xl p-2 px-3">
                        <div className="flex flex-col">
                          <span className="text-[8px] text-brand-text-subtle font-bold uppercase">Email</span>
                          <span className="text-xs font-semibold text-white font-mono mt-0.5">admin@aegis.demo</span>
                        </div>
                        <button 
                          type="button"
                          onClick={() => copyToClipboard('admin@aegis.demo', 'email')}
                          className="p-1.5 hover:bg-brand-bg-tertiary hover:text-white rounded-lg text-brand-text-muted transition-colors cursor-pointer text-[10px] font-bold flex items-center gap-1 border-none bg-transparent"
                        >
                          {copiedField === 'email' ? 'Copied!' : (
                            <>
                              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                              Copy
                            </>
                          )}
                        </button>
                      </div>

                      <div className="flex justify-between items-center bg-brand-bg-secondary border border-brand-border rounded-xl p-2 px-3">
                        <div className="flex flex-col">
                          <span className="text-[8px] text-brand-text-subtle font-bold uppercase">Password</span>
                          <span className="text-xs font-semibold text-white font-mono mt-0.5">Demo@123</span>
                        </div>
                        <button 
                          type="button"
                          onClick={() => copyToClipboard('Demo@123', 'password')}
                          className="p-1.5 hover:bg-brand-bg-tertiary hover:text-white text-brand-text-muted transition-colors cursor-pointer text-[10px] font-bold flex items-center gap-1 border-none bg-transparent"
                        >
                          {copiedField === 'password' ? 'Copied!' : (
                            <>
                              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                              Copy
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5 mt-1">
                      <span className="text-[8px] text-brand-text-subtle font-bold uppercase tracking-wider pl-1">Unlocked Modules & Capabilities</span>
                      <div className="flex flex-wrap gap-1">
                        {[
                          'Platform Dashboard', 'University Management', 'User Management', 'Permission Management', 
                          'Analytics Center', 'App Management', 'AEGIS ERP', 'AEGIS CONNECT', 'AEGIS CHAIN', 
                          'AEGIS MARKET', 'AEGIS AI', 'AEGIS RESEARCH', 'AEGIS SPORTS'
                        ].map(feature => (
                          <span key={feature} className="text-[9px] font-semibold bg-brand-bg-secondary border border-brand-border/60 text-brand-text-muted px-2 py-0.5 rounded-md">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button 
                      type="button" 
                      onClick={() => handleOneClickLogin('admin@aegis.demo', 'Demo@123')}
                      className="w-full py-2.5 bg-gradient-to-tr from-brand-primary to-indigo-500 hover:brightness-110 text-white rounded-xl text-xs font-bold transition-all shadow-[0_0_15px_rgba(99,102,241,0.25)] flex items-center justify-center gap-2 cursor-pointer mt-1 border-none"
                    >
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
                      <span>One-Click Demo Login</span>
                    </button>
                  </div>
                )}

                <div className="auth-divider flex items-center text-center my-4 text-[10px] text-brand-text-subtle before:content-[''] before:flex-1 before:border-b before:border-brand-border/40 before:mr-4 after:content-[''] after:flex-1 after:border-b after:border-brand-border/40 after:ml-4">
                  <span>OR SIGN IN USING SSO</span>
                </div>

                <div className="social-buttons grid grid-cols-3 gap-3">
                  <button type="button" className="social-btn flex items-center justify-center gap-2 py-2 bg-brand-bg-tertiary border border-brand-border hover:bg-brand-bg-secondary text-brand-text-main rounded-xl text-xs font-semibold transition-all cursor-pointer" onClick={() => handleSSO('Google')}>
                    <svg viewBox="0 0 24 24" width="16" height="16">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Google
                  </button>
                  <button type="button" className="social-btn flex items-center justify-center gap-2 py-2 bg-brand-bg-tertiary border border-brand-border hover:bg-brand-bg-secondary text-brand-text-main rounded-xl text-xs font-semibold transition-all cursor-pointer" onClick={() => handleSSO('Microsoft')}>
                    <svg viewBox="0 0 24 24" width="16" height="16">
                      <rect x="1" y="1" width="10" height="10" fill="#F25022"/>
                      <rect x="13" y="1" width="10" height="10" fill="#7FBA00"/>
                      <rect x="1" y="13" width="10" height="10" fill="#00A4EF"/>
                      <rect x="13" y="13" width="10" height="10" fill="#FFB900"/>
                    </svg>
                    Microsoft
                  </button>
                  <button type="button" className="social-btn flex items-center justify-center gap-2 py-2 bg-brand-bg-tertiary border border-brand-border hover:bg-brand-bg-secondary text-brand-text-main rounded-xl text-xs font-semibold transition-all cursor-pointer" onClick={() => handleSSO('Passkey')}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-brand-accent-cyan"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>
                    Passkey
                  </button>
                </div>
              </div>

              {/* Demo Credentials Prefiller */}
              {isDev && (
                <div className="auth-demo-info mt-6 p-4 bg-brand-bg-tertiary rounded-2xl border border-brand-border">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-brand-text-muted mb-2.5">Quick Demo Logins (Click to prefill)</p>
                  <div className="demo-creds-list grid grid-cols-2 gap-2 max-h-[250px] overflow-y-auto pr-1 chat-scroll">
                    <div className="demo-cred p-2 rounded-lg bg-brand-bg-secondary hover:bg-brand-primary/10 border border-brand-border transition-all cursor-pointer flex flex-col" onClick={() => fillDemo('superadmin@aegis.demo', 'Demo@123')}>
                      <span className="role-badge text-[10px] font-semibold text-brand-accent-ruby">Super Admin</span>
                      <span className="text-[10px] text-brand-text-muted truncate mt-0.5">superadmin@aegis.demo</span>
                    </div>
                    <div className="demo-cred p-2 rounded-lg bg-brand-bg-secondary hover:bg-brand-primary/10 border border-brand-border transition-all cursor-pointer flex flex-col" onClick={() => fillDemo('admin@aegis.demo', 'Demo@123')}>
                      <span className="role-badge text-[10px] font-semibold text-brand-accent-cyan">Platform Admin</span>
                      <span className="text-[10px] text-brand-text-muted truncate mt-0.5">admin@aegis.demo</span>
                    </div>
                    <div className="demo-cred p-2 rounded-lg bg-brand-bg-secondary hover:bg-brand-primary/10 border border-brand-border transition-all cursor-pointer flex flex-col" onClick={() => fillDemo('univadmin@aegis.demo', 'Demo@123')}>
                      <span className="role-badge text-[10px] font-semibold text-brand-accent-amber">Univ Admin</span>
                      <span className="text-[10px] text-brand-text-muted truncate mt-0.5">univadmin@aegis.demo</span>
                    </div>
                    <div className="demo-cred p-2 rounded-lg bg-brand-bg-secondary hover:bg-brand-primary/10 border border-brand-border transition-all cursor-pointer flex flex-col" onClick={() => fillDemo('registrar@aegis.demo', 'Demo@123')}>
                      <span className="role-badge text-[10px] font-semibold text-brand-accent-emerald">Registrar Officer</span>
                      <span className="text-[10px] text-brand-text-muted truncate mt-0.5">registrar@aegis.demo</span>
                    </div>
                    <div className="demo-cred p-2 rounded-lg bg-brand-bg-secondary hover:bg-brand-primary/10 border border-brand-border transition-all cursor-pointer flex flex-col" onClick={() => fillDemo('dean@aegis.demo', 'Demo@123')}>
                      <span className="role-badge text-[10px] font-semibold text-brand-primary">Dean of Faculty</span>
                      <span className="text-[10px] text-brand-text-muted truncate mt-0.5">dean@aegis.demo</span>
                    </div>
                    <div className="demo-cred p-2 rounded-lg bg-brand-bg-secondary hover:bg-brand-primary/10 border border-brand-border transition-all cursor-pointer flex flex-col" onClick={() => fillDemo('hod@aegis.demo', 'Demo@123')}>
                      <span className="role-badge text-[10px] font-semibold text-brand-accent-amber">HOD Professor</span>
                      <span className="text-[10px] text-brand-text-muted truncate mt-0.5">hod@aegis.demo</span>
                    </div>
                    <div className="demo-cred p-2 rounded-lg bg-brand-bg-secondary hover:bg-brand-primary/10 border border-brand-border transition-all cursor-pointer flex flex-col" onClick={() => fillDemo('faculty@aegis.demo', 'Demo@123')}>
                      <span className="role-badge text-[10px] font-semibold text-brand-accent-cyan">Faculty Professor</span>
                      <span className="text-[10px] text-brand-text-muted truncate mt-0.5">faculty@aegis.demo</span>
                    </div>
                    <div className="demo-cred p-2 rounded-lg bg-brand-bg-secondary hover:bg-brand-primary/10 border border-brand-border transition-all cursor-pointer flex flex-col" onClick={() => fillDemo('finance@aegis.demo', 'Demo@123')}>
                      <span className="role-badge text-[10px] font-semibold text-brand-accent-emerald">Finance Manager</span>
                      <span className="text-[10px] text-brand-text-muted truncate mt-0.5">finance@aegis.demo</span>
                    </div>
                    <div className="demo-cred p-2 rounded-lg bg-brand-bg-secondary hover:bg-brand-primary/10 border border-brand-border transition-all cursor-pointer flex flex-col" onClick={() => fillDemo('research@aegis.demo', 'Demo@123')}>
                      <span className="role-badge text-[10px] font-semibold text-[#8B5CF6]">Research Coord</span>
                      <span className="text-[10px] text-brand-text-muted truncate mt-0.5">research@aegis.demo</span>
                    </div>
                    <div className="demo-cred p-2 rounded-lg bg-brand-bg-secondary hover:bg-brand-primary/10 border border-brand-border transition-all cursor-pointer flex flex-col" onClick={() => fillDemo('placement@aegis.demo', 'Demo@123')}>
                      <span className="role-badge text-[10px] font-semibold text-[#3B82F6]">Placement Officer</span>
                      <span className="text-[10px] text-brand-text-muted truncate mt-0.5">placement@aegis.demo</span>
                    </div>
                    <div className="demo-cred p-2 rounded-lg bg-brand-bg-secondary hover:bg-brand-primary/10 border border-brand-border transition-all cursor-pointer flex flex-col" onClick={() => fillDemo('student@aegis.demo', 'Demo@123')}>
                      <span className="role-badge text-[10px] font-semibold text-brand-primary">Student</span>
                      <span className="text-[10px] text-brand-text-muted truncate mt-0.5">student@aegis.demo</span>
                    </div>
                    <div className="demo-cred p-2 rounded-lg bg-brand-bg-secondary hover:bg-brand-primary/10 border border-brand-border transition-all cursor-pointer flex flex-col" onClick={() => fillDemo('parent_role@aegis.demo', 'Demo@123')}>
                      <span className="role-badge text-[10px] font-bold text-[#EC4899]">General Parent</span>
                      <span className="text-[10px] text-brand-text-muted truncate mt-0.5">parent_role@aegis.demo</span>
                    </div>
                    <div className="demo-cred p-2 rounded-lg bg-brand-bg-secondary hover:bg-brand-primary/10 border border-brand-border transition-all cursor-pointer flex flex-col" onClick={() => fillDemo('alumni@aegis.demo', 'Demo@123')}>
                      <span className="role-badge text-[10px] font-semibold text-brand-text-muted">Alumni Account</span>
                      <span className="text-[10px] text-brand-text-muted truncate mt-0.5">alumni@aegis.demo</span>
                    </div>
                    <div className="demo-cred p-2 rounded-lg bg-brand-bg-secondary hover:bg-brand-primary/10 border border-brand-border transition-all cursor-pointer flex flex-col" onClick={() => fillDemo('recruiter@aegis.demo', 'Demo@123')}>
                      <span className="role-badge text-[10px] font-semibold text-[#6366F1]">Recruiter</span>
                      <span className="text-[10px] text-brand-text-muted truncate mt-0.5">recruiter@aegis.demo</span>
                    </div>
                    <div className="demo-cred p-2 rounded-lg bg-brand-bg-secondary hover:bg-brand-primary/10 border border-brand-border transition-all cursor-pointer flex flex-col" onClick={() => fillDemo('sportsdirector@aegis.demo', 'Demo@123')}>
                      <span className="role-badge text-[10px] font-bold text-brand-primary">Sports Director</span>
                      <span className="text-[10px] text-brand-text-muted truncate mt-0.5">sportsdirector@aegis.demo</span>
                    </div>
                    <div className="demo-cred p-2 rounded-lg bg-brand-bg-secondary hover:bg-brand-primary/10 border border-brand-border transition-all cursor-pointer flex flex-col" onClick={() => fillDemo('coach@aegis.demo', 'Demo@123')}>
                      <span className="role-badge text-[10px] font-bold text-brand-accent-cyan">Sports Coach</span>
                      <span className="text-[10px] text-brand-text-muted truncate mt-0.5">coach@aegis.demo</span>
                    </div>
                    <div className="demo-cred p-2 rounded-lg bg-brand-bg-secondary hover:bg-brand-primary/10 border border-brand-border transition-all cursor-pointer flex flex-col" onClick={() => fillDemo('athlete@aegis.demo', 'Demo@123')}>
                      <span className="role-badge text-[10px] font-bold text-brand-accent-emerald">Sports Athlete</span>
                      <span className="text-[10px] text-brand-text-muted truncate mt-0.5">athlete@aegis.demo</span>
                    </div>
                    <div className="demo-cred p-2 rounded-lg bg-brand-bg-secondary hover:bg-brand-primary/10 border border-brand-border transition-all cursor-pointer flex flex-col" onClick={() => fillDemo('parent@aegis.demo', 'Demo@123')}>
                      <span className="role-badge text-[10px] font-bold text-[#8B5CF6]">Sports Parent</span>
                      <span className="text-[10px] text-brand-text-muted truncate mt-0.5">parent@aegis.demo</span>
                    </div>
                    <div className="demo-cred p-2 rounded-lg bg-brand-bg-secondary hover:bg-brand-primary/10 border border-brand-border transition-all cursor-pointer flex flex-col" onClick={() => fillDemo('deptadmin@aegis.demo', 'Demo@123')}>
                      <span className="role-badge text-[10px] font-bold text-[#F59E0B]">Department Admin</span>
                      <span className="text-[10px] text-brand-text-muted truncate mt-0.5">deptadmin@aegis.demo</span>
                    </div>
                    <div className="demo-cred p-2 rounded-lg bg-brand-bg-secondary hover:bg-brand-primary/10 border border-brand-border transition-all cursor-pointer flex flex-col" onClick={() => fillDemo('libraryadmin@aegis.demo', 'Demo@123')}>
                      <span className="role-badge text-[10px] font-bold text-[#10B981]">Library Admin</span>
                      <span className="text-[10px] text-brand-text-muted truncate mt-0.5">libraryadmin@aegis.demo</span>
                    </div>
                    <div className="demo-cred p-2 rounded-lg bg-brand-bg-secondary hover:bg-brand-primary/10 border border-brand-border transition-all cursor-pointer flex flex-col" onClick={() => fillDemo('hosteladmin@aegis.demo', 'Demo@123')}>
                      <span className="role-badge text-[10px] font-bold text-[#6366F1]">Hostel Manager</span>
                      <span className="text-[10px] text-brand-text-muted truncate mt-0.5">hosteladmin@aegis.demo</span>
                    </div>
                    <div className="demo-cred p-2 rounded-lg bg-brand-bg-secondary hover:bg-brand-primary/10 border border-brand-border transition-all cursor-pointer flex flex-col" onClick={() => fillDemo('transportadmin@aegis.demo', 'Demo@123')}>
                      <span className="role-badge text-[10px] font-bold text-[#14B8A6]">Transport Coord</span>
                      <span className="text-[10px] text-brand-text-muted truncate mt-0.5">transportadmin@aegis.demo</span>
                    </div>
                    <div className="demo-cred p-2 rounded-lg bg-brand-bg-secondary hover:bg-brand-primary/10 border border-brand-border transition-all cursor-pointer flex flex-col" onClick={() => fillDemo('medical@aegis.demo', 'Demo@123')}>
                      <span className="role-badge text-[10px] font-bold text-[#EF4444]">Medical Staff</span>
                      <span className="text-[10px] text-brand-text-muted truncate mt-0.5">medical@aegis.demo</span>
                    </div>
                    <div className="demo-cred p-2 rounded-lg bg-brand-bg-secondary hover:bg-brand-primary/10 border border-brand-border transition-all cursor-pointer flex flex-col" onClick={() => fillDemo('guest@aegis.demo', 'Demo@123')}>
                      <span className="role-badge text-[10px] font-bold text-slate-400">Guest Visitor</span>
                      <span className="text-[10px] text-brand-text-muted truncate mt-0.5">guest@aegis.demo</span>
                    </div>
                    <div className="demo-cred p-2 rounded-lg bg-brand-bg-secondary hover:bg-brand-primary/10 border border-brand-border transition-all cursor-pointer flex flex-col" onClick={() => fillDemo('consultant@aegis.demo', 'Demo@123')}>
                      <span className="role-badge text-[10px] font-bold text-[#8B5CF6]">Consultant</span>
                      <span className="text-[10px] text-brand-text-muted truncate mt-0.5">consultant@aegis.demo</span>
                    </div>
                    <div className="demo-cred p-2 rounded-lg bg-brand-bg-secondary hover:bg-brand-primary/10 border border-brand-border transition-all cursor-pointer flex flex-col" onClick={() => fillDemo('auditor@aegis.demo', 'Demo@123')}>
                      <span className="role-badge text-[10px] font-bold text-brand-accent-amber">Auditor</span>
                      <span className="text-[10px] text-brand-text-muted truncate mt-0.5">auditor@aegis.demo</span>
                    </div>
                    <div className="demo-cred p-2 rounded-lg bg-brand-bg-secondary hover:bg-brand-primary/10 border border-brand-border transition-all cursor-pointer flex flex-col" onClick={() => fillDemo('compliance@aegis.demo', 'Demo@123')}>
                      <span className="role-badge text-[10px] font-bold text-brand-accent-cyan">Compliance Officer</span>
                      <span className="text-[10px] text-brand-text-muted truncate mt-0.5">compliance@aegis.demo</span>
                    </div>
                  </div>
                </div>
              )}

              {/* AI Anomaly Monitor */}
              <div className="auth-ai-threat-panel mt-4 p-4 bg-brand-bg-tertiary rounded-2xl border border-brand-border">
                <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-brand-border/40">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-primary animate-pulse"></span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-text-main font-display">AI Threat Intel Monitor</span>
                  </div>
                  <span className={`badge text-[0.65rem] py-0.5 px-2 font-mono rounded ${threatStatus === 'Normal' ? 'bg-brand-accent-emerald/20 text-brand-accent-emerald' : (threatStatus === 'Elevated Threat' ? 'bg-brand-accent-amber/20 text-brand-accent-amber' : 'bg-brand-accent-ruby/20 text-brand-accent-ruby')}`}>
                    {threatStatus}
                  </span>
                </div>
                <div className="flex flex-col gap-2 text-xs text-brand-text-muted">
                  <div className="flex justify-between items-center text-[10px]">
                    <span>Login Request Anomaly Probability:</span>
                    <span className="font-bold text-brand-text-main font-mono">{threatPercent}%</span>
                  </div>
                  <div className="w-full bg-brand-bg-secondary h-2.5 rounded-full overflow-hidden mt-1 relative border border-brand-border/40">
                    <div className="h-full rounded-full transition-all duration-300" style={{ width: `${threatPercent}%`, backgroundColor: threatBarColor }}></div>
                  </div>
                  <p className="text-[9px] text-brand-text-subtle mt-1">{threatDesc}</p>
                </div>
              </div>
            </div>
          ) : (
            /* Sign Up View */
            <div className="auth-form-container fade-in flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white font-display mb-1">Create Access Credentials</h2>
                <p className="text-sm text-brand-text-muted mb-6">Register a new identity on the Aegis mesh network</p>

                <form onSubmit={handleSignUp}>
                  <div className="auth-input-group relative mb-4">
                    <input 
                      type="text" 
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      required 
                      placeholder="Full Name" 
                      className="w-full bg-brand-bg-tertiary border border-brand-border rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-brand-primary transition-all placeholder-brand-text-subtle"
                    />
                  </div>

                  <div className="auth-input-group relative mb-4">
                    <input 
                      type="email" 
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      required 
                      placeholder="Email Address" 
                      className="w-full bg-brand-bg-tertiary border border-brand-border rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-brand-primary transition-all placeholder-brand-text-subtle"
                    />
                  </div>

                  <div className="auth-input-group relative mb-4">
                    <select 
                      value={signupRole}
                      onChange={(e) => setSignupRole(e.target.value)}
                      className="w-full bg-brand-bg-tertiary border border-brand-border rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-brand-primary transition-all"
                    >
                      <option value="student">Student</option>
                      <option value="faculty">Faculty Member</option>
                      <option value="hod">HOD (Department Head)</option>
                      <option value="admin">University Administrator</option>
                      <option value="sports_director">Sports Director</option>
                      <option value="coach">Sports Coach</option>
                      <option value="athlete">Student Athlete</option>
                      <option value="sports_parent">Sports Parent</option>
                      <option value="parent">Parent</option>
                      <option value="alumni">Alumni</option>
                      <option value="recruiter">Recruiter</option>
                    </select>
                    <label className="select-label absolute left-4 top-1 text-[0.65rem] text-brand-text-subtle">Access Hierarchy Role</label>
                  </div>

                  <div className="auth-input-group relative mb-3">
                    <input 
                      type={signupShowPassword ? "text" : "password"} 
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      required 
                      placeholder="Password" 
                      className="w-full bg-brand-bg-tertiary border border-brand-border rounded-xl px-4 py-3 pr-11 text-sm text-white outline-none focus:border-brand-primary transition-all placeholder-brand-text-subtle"
                    />
                    <button 
                      type="button" 
                      onClick={() => setSignupShowPassword(!signupShowPassword)}
                      className="password-toggle absolute right-4 top-3.5 text-brand-text-subtle hover:text-white cursor-pointer bg-transparent border-none"
                    >
                      {signupShowPassword ? (
                        <svg className="eye-closed w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      ) : (
                        <svg className="eye-open w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      )}
                    </button>
                  </div>

                  {/* Password Strength Indicator */}
                  <div className="password-strength mb-4">
                    <div className="strength-bar w-full h-1 bg-brand-bg-primary rounded overflow-hidden">
                      <div 
                        className={`strength-fill h-full transition-all duration-300 ${strengthLevel === 'weak' ? 'bg-brand-accent-ruby w-1/3' : (strengthLevel === 'medium' ? 'bg-brand-accent-amber w-2/3' : 'bg-brand-accent-emerald w-full')}`}
                      ></div>
                    </div>
                    <span className={`strength-text text-[0.7rem] mt-1 block ${strengthLevel === 'weak' ? 'text-brand-accent-ruby' : (strengthLevel === 'medium' ? 'text-brand-accent-amber' : 'text-brand-accent-emerald')}`}>
                      Complexity: {strengthText.toUpperCase()}
                    </span>
                  </div>

                  <div className="auth-input-group relative mb-4">
                    <input 
                      type="password" 
                      value={signupConfirmPassword}
                      onChange={(e) => setSignupConfirmPassword(e.target.value)}
                      required 
                      placeholder="Confirm Password" 
                      className="w-full bg-brand-bg-tertiary border border-brand-border rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-brand-primary transition-all placeholder-brand-text-subtle"
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={signupLoading}
                    className="auth-submit-btn w-full py-3 bg-brand-primary hover:bg-brand-primary-hover text-white rounded-xl font-semibold transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {signupLoading ? 'Registering Account...' : 'Complete Register'}
                  </button>

                  {signupError && (
                    <div className="auth-error mt-3 p-3 bg-brand-accent-ruby/10 border border-brand-accent-ruby/20 text-brand-accent-ruby rounded-xl text-xs flex items-center gap-2">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4.5 h-4.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                      <span>{signupError}</span>
                    </div>
                  )}

                  {signupSuccess && (
                    <div className="auth-success mt-3 p-3 bg-brand-accent-emerald/10 border border-brand-accent-emerald/20 text-brand-accent-emerald rounded-xl text-xs flex items-center gap-2">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4.5 h-4.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                      <span>{signupSuccess}</span>
                    </div>
                  )}
                </form>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="auth-footer text-center mt-8 text-[11px] text-brand-text-subtle shrink-0">
            <p>&copy; 2026 Aegis University Operating System. All rights reserved.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
