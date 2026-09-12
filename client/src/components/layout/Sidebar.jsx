import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, AlertOctagon, BarChart3, FlaskConical, 
  Scale, FileSearch, Users2, LineChart, LogOut, ShieldCheck, ChevronRight
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { AIRobotAvatar } from '../ai/AIRobotAvatar';
import { OfficialAgentEmblem } from '../common/OfficialAgentEmblem';

export function Sidebar({ onOpenAccessModal, onCollapse }) {
  const { user, logout, switchRole } = useAuth();
  const location = useLocation();

  const isDean = user?.role?.toLowerCase().includes('dean');

  // Exact 8 academic navigation items styled as pill-buttons matching the reference image
  const navItems = [
    {
      path: "/",
      label: "Decision Workspace",
      emoji: "🏠",
      badge: "Core"
    },
    {
      path: "/priorities",
      label: "Priority Interventions",
      emoji: "🚨",
      count: "5"
    },
    {
      path: "/diagnostics",
      label: "Course Diagnostics",
      emoji: "📊",
      badge: "Pass Rate"
    },
    {
      path: "/scenarios",
      label: "Scenario Simulator",
      emoji: "🧪",
      badge: "What-If"
    },
    {
      path: "/decisions",
      label: "Decisions Register",
      emoji: "⚖️",
      count: "3"
    },
    {
      path: "/evidence",
      label: "Evidence Explorer",
      emoji: "🔍",
      badge: "Agents 6–69"
    },
    {
      path: "/faculty",
      label: "Faculty Support",
      emoji: "👥",
      count: "2"
    },
    {
      path: "/outcomes",
      label: "Outcome Tracking",
      emoji: "📈",
      badge: "Verified"
    }
  ];

  return (
    <aside className="w-64 md:w-72 bg-white border-r border-slate-200/90 flex flex-col justify-between shrink-0 h-full overflow-y-auto select-none z-30 shadow-xs">
      <div>
        {/* Brand Header matching Reference Image (Bold Blue "Agent 70" + Star Emblem + Robot Mascot) */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl font-black text-blue-600 tracking-tight">
              Agent 70
            </span>
            <OfficialAgentEmblem size={28} className="drop-shadow-xs" />
          </div>

          <div className="flex items-center gap-1.5">
            {/* AI Robot Mascot & Status Indicator */}
            <div 
              onClick={onOpenAccessModal}
              className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-blue-50 border border-blue-200/80 shadow-xs cursor-pointer hover:bg-blue-100 transition-colors"
              title="Institutional Clearance: Click to view access matrix"
            >
              <AIRobotAvatar size="xs" animate={true} />
            </div>

            {/* Collapse Sidebar Button */}
            {onCollapse && (
              <button
                onClick={onCollapse}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Collapse Sidebar for Full-Width View"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
              </button>
            )}
          </div>
        </div>

        {/* Navigation Items (Pill Cards with subtle border, active is solid vibrant blue) */}
        <div className="p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/25 border border-blue-600'
                    : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50/90 shadow-2xs'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-base shrink-0 select-none">{item.emoji}</span>
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-blue-50 text-blue-700 border border-blue-100'
                  }`}>
                    {item.badge}
                  </span>
                )}

                {item.count && (
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full shrink-0 ${
                    isActive
                      ? 'bg-white/25 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {item.count}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Footer Profile & Scope Card (Pure White Theme) */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/70 space-y-3">
        {/* Delegated Authority & Security Clearance Badge */}
        <button
          type="button"
          onClick={onOpenAccessModal}
          className="w-full bg-white rounded-2xl p-3 border border-slate-200 shadow-xs flex items-center justify-between text-left hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Access Clearance
              </span>
              <span className="text-xs font-extrabold text-slate-800 block truncate group-hover:text-blue-600 transition-colors">
                {isDean ? 'Level 5 (Institutional)' : 'Level 4 (Department)'}
              </span>
            </div>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* User Card with Real Portrait */}
        <div className="flex items-center justify-between gap-2 p-1">
          <div 
            onClick={onOpenAccessModal}
            className="flex items-center gap-2.5 overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
            title="Click to switch role or inspect authority"
          >
            <img
              src={user?.avatar || (isDean ? "/assets/dean_portrait.jpg" : "/assets/hod_portrait.jpg")}
              alt={user?.name}
              className="w-10 h-10 rounded-2xl object-cover border-2 border-white shadow-xs shrink-0"
            />
            <div className="overflow-hidden">
              <span className="text-sm font-bold text-slate-900 block truncate">{user?.name}</span>
              <span className="text-xs text-blue-600 block truncate font-semibold">{user?.role}</span>
            </div>
          </div>

          <button
            onClick={logout}
            title="Sign out of Agent 70"
            className="p-2 text-slate-400 hover:text-red-600 rounded-xl hover:bg-red-50 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
