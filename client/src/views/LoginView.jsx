import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Mail, Sparkles, ShieldCheck, ArrowRight, ChevronDown, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { AIRobotAvatar } from '../components/ai/AIRobotAvatar';
import { InstitutionalOfficialHeader } from '../components/layout/InstitutionalOfficialHeader';
import { OfficialAgentEmblem } from '../components/common/OfficialAgentEmblem';

export function LoginView() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState('hod');
  const [email, setEmail] = useState('hod.cse@institution.edu');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    if (newRole === 'dean') {
      setEmail('dean.academics@institution.edu');
    } else {
      setEmail('hod.cse@institution.edu');
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(role, email);
      navigate('/');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemo = async (demoRole) => {
    setIsLoading(true);
    try {
      await login(demoRole);
      navigate('/');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col select-none">
      {/* Official Institutional Header */}
      <InstitutionalOfficialHeader />

      {/* Main Login Body */}
      <div className="flex-1 flex flex-col md:flex-row min-h-[calc(100vh-65px)]">
      {/* Left Column: Real Campus Image with Blue Gradient & 3D AI Robot Mascot */}
      <div className="md:w-1/2 relative bg-blue-600 text-white p-8 md:p-14 flex flex-col justify-between overflow-hidden">
        {/* Background Real Campus Photo */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
          style={{ backgroundImage: "url('/assets/campus_quad.jpg')" }}
        />

        {/* Ambient Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 opacity-90" />

        {/* Top Branding matching Reference Image & Agent 70 */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-bold mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-300 animate-pulse" />
            <span>AGENT 70 • ACADEMIC DECISION SUPPORT</span>
          </div>

          <div className="flex items-center gap-3">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-white">
              Agent 70
            </h1>
            <OfficialAgentEmblem size={42} className="shadow-lg" />
          </div>
          <p className="text-lg md:text-xl text-blue-100 font-semibold mt-2">
            Academic Decision Support Platform
          </p>
          <p className="text-sm text-blue-200 mt-2 max-w-md leading-relaxed font-normal">
            Institutional decision-intelligence copilot for Heads of Department & Deans, synthesizing cross-domain telemetry from 72 academic agents.
          </p>
        </div>

        {/* Mid-Hero Card with 3D Animated AI Robot Mascot */}
        <div className="relative z-10 my-8">
          <div className="bg-white/15 backdrop-blur-md rounded-3xl p-5 border border-white/20 max-w-md shadow-lg flex items-center gap-4">
            <AIRobotAvatar size="lg" animate={true} />
            <div>
              <div className="flex items-center gap-1.5 text-amber-300 font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Intelligence Engine</span>
              </div>
              <h3 className="font-extrabold text-base text-white mt-0.5">Google Gemini Online</h3>
              <p className="text-xs text-blue-100 mt-1 leading-relaxed">
                Decomposes course pass rates, diagnostic drivers, and remedial scenarios in real time.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Real-Time Badge */}
        <div className="relative z-10 text-xs text-blue-200 flex items-center justify-between pt-4 border-t border-white/15">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>72-Agent Institutional Platform</span>
          </div>
          <span className="font-mono text-[11px] text-blue-200">ISO 27001 • Academic Level 4/5</span>
        </div>
      </div>

      {/* Right Column: Clean White Theme Login Form */}
      <div className="md:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-16 bg-[#FAFAFA]">
        <div className="w-full max-w-md space-y-6 bg-white p-8 md:p-10 rounded-3xl border border-slate-200/90 shadow-lg">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-1">
              BATCH: AGENT 70
            </span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Sign In to Workspace</h2>
            <p className="text-xs text-slate-500 mt-1">
              Authorized access for Heads of Department (HoD) and Deans of Academic Affairs.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Executive Leadership Role
              </label>
              <div className="relative">
                <select
                  value={role}
                  onChange={(e) => handleRoleChange(e.target.value)}
                  className="w-full text-xs font-bold px-3.5 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 appearance-none pr-10 text-slate-800 shadow-2xs"
                >
                  <option value="hod">Head of Department (HoD — CSE)</option>
                  <option value="dean">Dean of Academic Affairs (Institutional)</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Institutional Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 shadow-2xs"
                  placeholder="name@institution.edu"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Security Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-xs pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 shadow-2xs"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {isLoading ? 'Authenticating Security Clearance...' : 'Access Agent 70 Workspace'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Access with Real Executive Portraits */}
          <div className="pt-4 border-t border-slate-100 space-y-2.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block text-center">
              One-Click Executive Demo Access
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleQuickDemo('hod')}
                className="p-2.5 bg-white hover:bg-blue-50 border border-slate-200 text-slate-800 hover:border-blue-300 font-bold text-xs rounded-2xl transition-all text-left flex items-center gap-2 shadow-2xs cursor-pointer"
              >
                <img
                  src="/assets/hod_portrait.jpg"
                  alt="Dr. K. S. Sharma"
                  className="w-8 h-8 rounded-xl object-cover border border-slate-200 shrink-0"
                />
                <div className="min-w-0">
                  <span className="block truncate text-slate-900">Demo HoD</span>
                  <span className="block text-[10px] text-blue-600 font-medium truncate">Dr. Sharma</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('dean')}
                className="p-2.5 bg-white hover:bg-blue-50 border border-slate-200 text-slate-800 hover:border-blue-300 font-bold text-xs rounded-2xl transition-all text-left flex items-center gap-2 shadow-2xs cursor-pointer"
              >
                <img
                  src="/assets/dean_portrait.jpg"
                  alt="Dr. Eleanor Vance"
                  className="w-8 h-8 rounded-xl object-cover border border-slate-200 shrink-0"
                />
                <div className="min-w-0">
                  <span className="block truncate text-slate-900">Demo Dean</span>
                  <span className="block text-[10px] text-blue-600 font-medium truncate">Dr. Vance</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default LoginView;
