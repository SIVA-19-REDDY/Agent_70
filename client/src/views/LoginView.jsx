import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, Lock, Mail, User, Building2, BadgeCheck, 
  ArrowRight, KeyRound, AlertCircle, CheckCircle2, ChevronDown, Sparkles
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { InstitutionalOfficialHeader } from '../components/layout/InstitutionalOfficialHeader';
import { OfficialAgentEmblem } from '../components/common/OfficialAgentEmblem';
import { AIRobotAvatar } from '../components/ai/AIRobotAvatar';

export function LoginView() {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  // Mode: 'login' | 'register'
  const [activeTab, setActiveTab] = useState('register'); // default to 'register' to encourage "first register then login"
  
  // Login Form State (clean, empty inputs - no sample pre-fills)
  const [loginRole, setLoginRole] = useState('Head of Department');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Registration Form State (clean, empty inputs - no sample pre-fills)
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regFacultyId, setRegFacultyId] = useState('');
  const [regRole, setRegRole] = useState('Head of Department');
  const [regDepartment, setRegDepartment] = useState('Computer Science & Engineering (CSE)');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  // Status & Feedback State
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Academic Roles authorized for Agent 70
  const ACADEMIC_ROLES = [
    { value: 'Head of Department', label: 'Head of Department (HoD)', clearance: 'Level 4 — Departmental Authority' },
    { value: 'Dean of Academic Affairs', label: 'Dean of Academic Affairs', clearance: 'Level 5 — Institutional Senate Authority' },
    { value: 'Principal / Campus Director', label: 'Principal / Campus Director', clearance: 'Level 5 — Campus Directorate Authority' },
    { value: 'Course Coordinator / Lead Faculty', label: 'Course Coordinator / Lead Faculty', clearance: 'Level 3 — Course Diagnostic Authority' },
    { value: 'Controller of Examinations', label: 'Controller of Examinations', clearance: 'Level 4 — Examination & Regulatory Authority' }
  ];

  // University Departments
  const DEPARTMENTS = [
    'Computer Science & Engineering (CSE)',
    'Electronics & Communication Engineering (ECE)',
    'Information Technology (IT)',
    'Mechanical Engineering (MECH)',
    'Electrical & Electronics Engineering (EEE)',
    'Civil Engineering (CIVIL)',
    'Institutional Academic Affairs (All Departments)'
  ];

  // Handle Registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!regName.trim()) {
      setErrorMessage('Please enter your full academic name and title (e.g. Dr. / Prof.).');
      return;
    }
    if (!regEmail.trim() || !regEmail.includes('@')) {
      setErrorMessage('Please enter a valid institutional email address.');
      return;
    }
    if (!regPassword) {
      setErrorMessage('Please create a secure password.');
      return;
    }
    if (regPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setErrorMessage('Passwords do not match. Please re-type your password.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await register({
        name: regName.trim(),
        email: regEmail.trim(),
        facultyId: regFacultyId.trim(),
        role: regRole,
        department: regDepartment,
        password: regPassword
      });

      if (res.error) {
        setErrorMessage(res.error);
      } else {
        setSuccessMessage('Registration successful! You may now sign in with your credentials.');
        // Set login fields for immediate convenience
        setLoginEmail(regEmail.trim());
        setLoginRole(regRole);
        setLoginPassword('');
        // Switch to login tab
        setActiveTab('login');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Registration failed. Please verify your details.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!loginEmail.trim()) {
      setErrorMessage('Please enter your registered institutional email.');
      return;
    }
    if (!loginPassword) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await login({
        email: loginEmail.trim(),
        password: loginPassword,
        role: loginRole
      });

      if (res) {
        navigate('/');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Authentication failed. Please check your email and password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans select-none">
      {/* 1. Official Institutional Header */}
      <InstitutionalOfficialHeader />

      {/* 2. Main Auth Container */}
      <div className="flex-1 flex flex-col lg:flex-row items-stretch justify-center">
        
        {/* Left Panel: Institutional Context & Multi-Agent Intelligence */}
        <div className="lg:w-5/12 bg-gradient-to-br from-[#0F1E4A] via-[#1E3A8A] to-[#1D4ED8] text-white p-8 lg:p-14 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>ACADEMIC DECISION SUPPORT AGENT • AGENT 70</span>
            </div>

            <div className="flex items-center gap-3">
              <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-white">
                Institutional Gateway
              </h1>
              <OfficialAgentEmblem size={38} className="drop-shadow-lg" />
            </div>

            <p className="text-blue-100 text-sm mt-3 leading-relaxed max-w-md">
              Authorized decision intelligence platform synthesizing telemetry from 12 specialized academic sub-agents to support Heads of Department, Deans, and Principals.
            </p>

            {/* Academic Leadership Access Matrix */}
            <div className="mt-8 space-y-3 max-w-md">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-200 block">
                Authorized Leadership Clearance:
              </span>
              
              <div className="p-3 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-500/30 flex items-center justify-center shrink-0">
                  <Building2 className="w-4 h-4 text-blue-200" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Heads of Department (HoD)</h4>
                  <p className="text-[11px] text-blue-200 leading-tight">Course pacing, section pass rates, and student risk intervention.</p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/30 flex items-center justify-center shrink-0">
                  <BadgeCheck className="w-4 h-4 text-indigo-200" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Deans of Academic Affairs</h4>
                  <p className="text-[11px] text-blue-200 leading-tight">Institutional senate governance, NBA/NAAC accreditation metrics.</p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/30 flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4 text-emerald-200" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Principals & Lead Faculty</h4>
                  <p className="text-[11px] text-blue-200 leading-tight">Remedial resource allocations, timetable optimization, and audit compliance.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Accreditation Badge */}
          <div className="relative z-10 pt-6 mt-8 border-t border-white/15 flex items-center justify-between text-xs text-blue-200">
            <span className="font-semibold">Vignan's Foundation for Science, Technology & Research</span>
            <span className="font-mono text-[11px] bg-white/15 px-2 py-0.5 rounded-md text-white">Level 4 / 5 Clearance</span>
          </div>
        </div>

        {/* Right Panel: Clean Authentication Box (Register & Login Tabs) */}
        <div className="lg:w-7/12 flex items-center justify-center p-6 md:p-10 lg:p-12">
          <div className="w-full max-w-lg bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 md:p-8 space-y-6">
            
            {/* Header / Tabs */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600">
                    Agent 70 • Academic Decision Support
                  </span>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    {activeTab === 'register' ? 'Register Academic Account' : 'Sign In to Workspace'}
                  </h2>
                </div>
                <div className="p-1 rounded-xl bg-blue-50 border border-blue-200">
                  <AIRobotAvatar size="xs" animate={false} />
                </div>
              </div>

              {/* Toggle Switch: Register vs Sign In */}
              <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('register');
                    setErrorMessage('');
                    setSuccessMessage('');
                  }}
                  className={`py-2 px-4 rounded-xl transition-all cursor-pointer text-center ${
                    activeTab === 'register'
                      ? 'bg-white text-blue-700 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  1. Register New Account
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('login');
                    setErrorMessage('');
                    setSuccessMessage('');
                  }}
                  className={`py-2 px-4 rounded-xl transition-all cursor-pointer text-center ${
                    activeTab === 'login'
                      ? 'bg-white text-blue-700 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  2. Sign In
                </button>
              </div>
            </div>

            {/* Error Message Banner */}
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5 animate-shake">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span className="font-semibold leading-relaxed">{errorMessage}</span>
              </div>
            )}

            {/* Success Message Banner */}
            {successMessage && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="font-semibold leading-relaxed">{successMessage}</span>
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 1: REGISTRATION FORM ("first register then login")   */}
            {/* ======================================================== */}
            {activeTab === 'register' && (
              <form onSubmit={handleRegister} className="space-y-4">
                {/* 1. Academic Leadership Role */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Academic Leadership Role <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={regRole}
                      onChange={(e) => setRegRole(e.target.value)}
                      className="w-full text-xs font-semibold px-3.5 py-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 appearance-none pr-10 text-slate-800 transition-colors shadow-2xs"
                    >
                      {ACADEMIC_ROLES.map((r) => (
                        <option key={r.value} value={r.value}>
                          {r.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                  </div>
                </div>

                {/* 2. Department / School */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Academic Department <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={regDepartment}
                      onChange={(e) => setRegDepartment(e.target.value)}
                      className="w-full text-xs font-semibold px-3.5 py-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 appearance-none pr-10 text-slate-800 transition-colors shadow-2xs"
                    >
                      {DEPARTMENTS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                  </div>
                </div>

                {/* 3. Full Academic Name & Faculty ID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Full Name & Title <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="Dr. K. S. Sharma"
                        className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 shadow-2xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Faculty / Employee ID
                    </label>
                    <div className="relative">
                      <BadgeCheck className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={regFacultyId}
                        onChange={(e) => setRegFacultyId(e.target.value)}
                        placeholder="VIGNAN-FAC-089"
                        className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 shadow-2xs"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Institutional Email */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Institutional Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="hod.cse@vignan.ac.in"
                      className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 shadow-2xs"
                    />
                  </div>
                </div>

                {/* 5. Password & Confirm Password */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Security Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="password"
                        required
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="Minimum 6 characters"
                        className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 shadow-2xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="password"
                        required
                        value={regConfirmPassword}
                        onChange={(e) => setRegConfirmPassword(e.target.value)}
                        placeholder="Re-type password"
                        className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 shadow-2xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Register Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  {isLoading ? 'Creating Institutional Profile...' : 'Complete Registration'}
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('login');
                      setErrorMessage('');
                    }}
                    className="text-xs text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
                  >
                    Already registered? Click here to Sign In →
                  </button>
                </div>
              </form>
            )}

            {/* ======================================================== */}
            {/* TAB 2: LOGIN FORM ("then login")                         */}
            {/* ======================================================== */}
            {activeTab === 'login' && (
              <form onSubmit={handleLogin} className="space-y-4">
                {/* 1. Academic Leadership Role */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Academic Leadership Role
                  </label>
                  <div className="relative">
                    <select
                      value={loginRole}
                      onChange={(e) => setLoginRole(e.target.value)}
                      className="w-full text-xs font-semibold px-3.5 py-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 appearance-none pr-10 text-slate-800 transition-colors shadow-2xs"
                    >
                      {ACADEMIC_ROLES.map((r) => (
                        <option key={r.value} value={r.value}>
                          {r.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                  </div>
                </div>

                {/* 2. Institutional Email */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Institutional Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="e.g. name@vignan.ac.in or faculty.id@institution.edu"
                      className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 shadow-2xs"
                    />
                  </div>
                </div>

                {/* 3. Security Password */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Security Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 shadow-2xs"
                    />
                  </div>
                </div>

                {/* Submit Sign In Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  {isLoading ? 'Verifying Institutional Clearance...' : 'Sign In to Agent 70 Workspace'}
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('register');
                      setErrorMessage('');
                    }}
                    className="text-xs text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
                  >
                    Don't have an academic account yet? Register here →
                  </button>
                </div>
              </form>
            )}

            {/* Bottom Footer Assurance */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-blue-500" />
                Encrypted Role-Based Access Control
              </span>
              <span>ISO 27001 Certified</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default LoginView;
