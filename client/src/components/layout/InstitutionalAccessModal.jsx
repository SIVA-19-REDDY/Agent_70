import React from 'react';
import { Shield, ShieldCheck, X, Check, ArrowRight, UserCheck, Lock, ExternalLink, Award, FileText, BarChart3, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function InstitutionalAccessModal({ isOpen, onClose }) {
  const { user, switchRole } = useAuth();

  if (!isOpen) return null;

  const isDean = user?.role?.toLowerCase().includes('dean');

  const accessMatrix = [
    {
      domain: "Cross-Domain Telemetry Ingestion (Agents 6–69)",
      status: "GRANTED",
      level: "Unrestricted Read & Diagnose",
      hod: "Full Access (CSE)",
      dean: "Full Access (Institution-Wide)"
    },
    {
      domain: "Course Diagnostics & Root Cause Analysis",
      status: "GRANTED",
      level: "Predictive & Historical Traceability",
      hod: "Departmental Purview",
      dean: "Cross-Faculty Purview"
    },
    {
      domain: "Remedial 'What-If' Simulation Engine",
      status: "GRANTED",
      level: "Live Recalculation Engine",
      hod: "Targeting Dept Cohorts",
      dean: "Targeting Institutional Batches"
    },
    {
      domain: "Remedial Resource Spending Authority",
      status: isDean ? "TIER-1 AUTHORIZED" : "DEPARTMENT AUTHORIZED",
      level: isDean ? "Up to $250,000 / Semester" : "Up to $45,000 / Semester",
      hod: "$45,000 Cap",
      dean: "$250,000 Cap"
    },
    {
      domain: "Faculty Workload & Remedial Directives",
      status: "GRANTED",
      level: isDean ? "Senate & Dean Directives" : "Department Chair Directives",
      hod: "CSE Faculty Scope",
      dean: "All 8 Academic Faculties"
    },
    {
      domain: "Academic Senate Docket Submission",
      status: isDean ? "DIRECT SENATE PRIVILEGE" : "DEAN CO-SIGN REQUIRED",
      level: isDean ? "Immediate Senate Floor Docket" : "Requires Dean Endorsement",
      hod: "Review & Propose",
      dean: "Immediate Authorize"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in select-none">
      <div 
        className="bg-white border border-slate-200 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-institutional-600/30 border border-institutional-400/40 text-institutional-300 flex items-center justify-center">
              <Shield className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">
                  Institutional Security Protocol
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold">
                  ACTIVE SESSION
                </span>
              </div>
              <h2 className="text-xl font-black tracking-tight text-white mt-0.5">
                Executive Access & Clearance Purview
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-slate-50/50">
          {/* Active Profile Card */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-4">
            <img
              src={user?.avatar || (isDean ? "/assets/dean_portrait.jpg" : "/assets/hod_portrait.jpg")}
              alt={user?.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-institutional-200 shadow-sm shrink-0"
            />
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h3 className="text-lg font-bold text-slate-900">{user?.name}</h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-institutional-100 text-institutional-800 border border-institutional-200">
                  {user?.clearance || (isDean ? 'Level 5 — Institutional Senate Authority' : 'Level 4 — Executive Departmental Authority')}
                </span>
              </div>
              <p className="text-sm font-semibold text-slate-600 mt-0.5">{user?.title}</p>
              <p className="text-xs text-slate-400 font-mono mt-1">{user?.email} • {user?.department}</p>
            </div>
          </div>

          {/* Quick Role Elevation / Switcher */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2 px-1">
              Switch Delegated Leadership Scope
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* HoD Card */}
              <button
                type="button"
                onClick={() => {
                  switchRole('hod');
                  onClose();
                }}
                className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                  !isDean
                    ? 'bg-institutional-50/80 border-institutional-400 shadow-xs ring-2 ring-institutional-500/20'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <img
                  src="/assets/hod_portrait.jpg"
                  alt="Dr. K. S. Sharma"
                  className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 truncate">Dr. K. S. Sharma</span>
                    {!isDean && <Check className="w-4 h-4 text-institutional-600 shrink-0" />}
                  </div>
                  <span className="text-[11px] text-institutional-700 font-bold block">Head of Department (CSE)</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Purview: 840 students • 18 Faculty</span>
                </div>
              </button>

              {/* Dean Card */}
              <button
                type="button"
                onClick={() => {
                  switchRole('dean');
                  onClose();
                }}
                className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                  isDean
                    ? 'bg-institutional-50/80 border-institutional-400 shadow-xs ring-2 ring-institutional-500/20'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <img
                  src="/assets/dean_portrait.jpg"
                  alt="Dr. Eleanor Vance"
                  className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 truncate">Dr. Eleanor Vance</span>
                    {isDean && <Check className="w-4 h-4 text-institutional-600 shrink-0" />}
                  </div>
                  <span className="text-[11px] text-institutional-700 font-bold block">Dean of Academic Affairs</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Purview: 6,400 students • 8 Faculties</span>
                </div>
              </button>
            </div>
          </div>

          {/* Access Matrix Table */}
          <div>
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Institutional Privileges Matrix
              </span>
              <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Cryptographic Token
              </span>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs divide-y divide-slate-100">
              {accessMatrix.map((item, idx) => (
                <div key={idx} className="p-3.5 flex items-center justify-between gap-3 text-xs hover:bg-slate-50/80 transition-colors">
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-800 block">{item.domain}</span>
                    <span className="text-[11px] text-slate-400">{item.level}</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`inline-block px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                      item.status.includes('GRANTED') || item.status.includes('TIER-1')
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {isDean ? item.dean : item.hod}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span className="font-mono text-[11px]">Academic Governance Framework • ISO 27001</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}

export default InstitutionalAccessModal;
