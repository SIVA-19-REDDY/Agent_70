import React, { useState } from 'react';
import { Shield, Sparkles, Check, ChevronDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useAI } from '../../contexts/AIContext';
import { AIRobotAvatar } from '../ai/AIRobotAvatar';

export function TopNav() {
  const { user, switchRole } = useAuth();
  const { providerStatus } = useAI();
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);

  const roles = [
    { key: 'hod', label: 'Head of Department (HoD)', scope: 'Department Level (CSE)' },
    { key: 'dean', label: 'Dean of Academic Affairs', scope: 'Institutional Cross-Department' }
  ];

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 px-6 flex items-center justify-between sticky top-0 z-30 select-none">
      {/* Left: Brand Title & Term Context */}
      <div className="flex items-center gap-3">
        <span className="text-sm md:text-base font-bold text-slate-900 tracking-tight">
          Academic Decision Support
        </span>
        <span className="text-slate-300">•</span>
        <span className="px-3 py-1 rounded-xl text-xs md:text-sm font-semibold bg-slate-100 text-slate-700">
          2026–27
        </span>
        <span className="px-3 py-1 rounded-xl text-xs md:text-sm font-semibold bg-slate-100 text-slate-700">
          Semester 1
        </span>
      </div>

      {/* Right Controls: Role Badge & AI Indicator */}
      <div className="flex items-center gap-3">
        {/* Role Quick-Switch Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs md:text-sm font-semibold bg-institutional-50 border border-institutional-200 text-institutional-900 hover:bg-institutional-100 transition-colors cursor-pointer"
          >
            <Shield className="w-4 h-4 text-institutional-600" />
            <span>Role: <strong>{user?.shortRole || 'HoD'}</strong></span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
          </button>

          {isRoleMenuOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-elevated border border-slate-200 p-2 z-50 space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5 block">
                Active Leadership Scope
              </span>
              {roles.map((r) => {
                const isCurrent = user?.role?.toLowerCase().includes(r.key);
                return (
                  <button
                    key={r.key}
                    type="button"
                    onClick={() => {
                      switchRole(r.key);
                      setIsRoleMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-xl text-left transition-colors ${
                      isCurrent
                        ? 'bg-institutional-50 text-institutional-800 font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <span className="block font-semibold">{r.label}</span>
                      <span className="text-xs text-slate-400">{r.scope}</span>
                    </div>
                    {isCurrent && <Check className="w-4 h-4 text-institutional-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* AI Status Indicator with Animated Robot */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs md:text-sm font-bold shadow-2xs">
          <AIRobotAvatar size="xs" animate={true} />
          <span>Gemini Online</span>
        </div>
      </div>
    </header>
  );
}
