import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle, BookOpen, Users, RefreshCw, Bell,
  Target, Sparkles, ArrowRight, TrendingDown,
  CheckCircle2, ChevronRight, Activity, ShieldAlert,
  BarChart2, Layers
} from 'lucide-react';
import { StatCard } from '../components/common/StatCard';
import { PriorityBadge } from '../components/common/PriorityBadge';
import { AgentBadge } from '../components/common/AgentBadge';
import { useAuth } from '../contexts/AuthContext';
import { useFilters } from '../contexts/FilterContext';
import { useAI } from '../contexts/AIContext';
import { api } from '../services/api';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, LineChart, Line, AreaChart, Area
} from 'recharts';

export function DashboardView() {
  const { user } = useAuth();
  const { filters } = useFilters();
  const { triggerAskQuestion } = useAI();
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [quickPrompt, setQuickPrompt] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, [filters.department]);

  const loadDashboard = async () => {
    setLoading(true);
    try {
      const data = await api.getDashboard({ department: filters.department });
      setDashboardData(data);
    } catch (err) {
      console.warn('Dashboard fetch fallback:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAskAura = (e) => {
    e.preventDefault();
    if (!quickPrompt.trim()) return;
    triggerAskQuestion(quickPrompt);
    navigate('/copilot');
  };

  const departmentComparison = [
    { dept: 'CSE', currentPass: 68, historical: 76, delta: -8, riskCount: 42 },
    { dept: 'ECE', currentPass: 64, historical: 74, delta: -10, riskCount: 34 },
    { dept: 'AI & DS', currentPass: 75, historical: 79, delta: -4, riskCount: 8 },
    { dept: 'EEE', currentPass: 71, historical: 77, delta: -6, riskCount: 14 },
    { dept: 'MECH', currentPass: 67, historical: 73, delta: -6, riskCount: 22 },
    { dept: 'CIVIL', currentPass: 73, historical: 76, delta: -3, riskCount: 6 }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Executive Welcome & AI Quick Ask Bar */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/90 shadow-card flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-institutional-600">
              Executive Briefing • {filters.department === 'all' ? 'Institutional' : filters.department}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-medium text-slate-500">Live Pipeline Active</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Academic Decision Overview
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Evidence-backed diagnostic priorities and actionable intervention opportunities for your leadership review.
          </p>
        </div>

        {/* Interactive Ask AURA Quick Form */}
        <form onSubmit={handleAskAura} className="w-full lg:w-96 flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl p-1.5 shadow-2xs focus-within:ring-2 focus-within:ring-institutional-500/20 focus-within:border-institutional-500 transition-all">
          <div className="pl-3 text-institutional-600">
            <Sparkles className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Ask AURA a decision question..."
            value={quickPrompt}
            onChange={(e) => setQuickPrompt(e.target.value)}
            className="w-full bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
          />
          <button
            type="submit"
            className="px-3 py-1.5 bg-institutional-600 hover:bg-institutional-700 text-white rounded-xl text-xs font-semibold shrink-0 transition-colors"
          >
            Ask
          </button>
        </form>
      </div>

      {/* Top 6 KPI Cards (Section 16) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard
          title="Critical Priorities"
          value={dashboardData?.kpis?.critical_priorities ?? "08"}
          trend={dashboardData?.kpis?.critical_priorities_trend ?? "+2 vs last week"}
          explanation="Immediate intervention"
          icon={AlertTriangle}
          variant="danger"
          onClick={() => navigate('/priorities')}
        />
        <StatCard
          title="Courses Requiring Action"
          value={dashboardData?.kpis?.courses_requiring_action ?? "14"}
          trend={dashboardData?.kpis?.courses_requiring_action_trend ?? "+3 vs mid-term"}
          explanation="Deviation > -5%"
          icon={BookOpen}
          variant="warning"
          onClick={() => navigate('/priorities')}
        />
        <StatCard
          title="Students at Risk"
          value={dashboardData?.kpis?.students_at_risk ?? "126"}
          trend={dashboardData?.kpis?.students_at_risk_trend ?? "-12 post mentor"}
          explanation="Cohort aggregate"
          icon={Users}
          variant="warning"
          onClick={() => navigate('/risk')}
        />
        <StatCard
          title="Intervention Ops"
          value={dashboardData?.kpis?.intervention_opportunities ?? "09"}
          trend={dashboardData?.kpis?.intervention_opportunities_trend ?? "5 high feasibility"}
          explanation="High expected impact"
          icon={Target}
          variant="success"
          onClick={() => navigate('/scenarios')}
        />
        <StatCard
          title="Backlog Cases"
          value={dashboardData?.kpis?.backlog_cases ?? "73"}
          trend={dashboardData?.kpis?.backlog_cases_trend ?? "48 recoverable"}
          explanation="Targeted support"
          icon={RefreshCw}
          variant="default"
          onClick={() => navigate('/backlogs')}
        />
        <StatCard
          title="Early Warnings"
          value={dashboardData?.kpis?.early_warning_signals ?? "18"}
          trend={dashboardData?.kpis?.early_warning_signals_trend ?? "6 urgent reviews"}
          explanation="Agent 69 telemetry"
          icon={Bell}
          variant="danger"
          onClick={() => navigate('/warnings')}
        />
      </div>

      {/* Priority Scoring Model Breakdown & Critical Courses Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Priority Courses Requiring Action */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Ranked Action Docket
              </span>
              <h2 className="text-base font-bold text-slate-900">Priority Courses Requiring Intervention</h2>
            </div>
            <button
              onClick={() => navigate('/priorities')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-institutional-600 hover:text-institutional-700"
            >
              <span>View All Courses</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3">Rank</th>
                  <th className="p-3">Course</th>
                  <th className="p-3 text-center">Pass Rate</th>
                  <th className="p-3 text-center">Deviation</th>
                  <th className="p-3 text-center">Attendance</th>
                  <th className="p-3 text-center">Priority</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(dashboardData?.critical_courses || []).slice(0, 4).map((c, idx) => (
                  <tr
                    key={c.id}
                    onClick={() => navigate(`/diagnostics?course=${c.id}`)}
                    className="hover:bg-slate-50/60 transition-colors cursor-pointer"
                  >
                    <td className="p-3 font-bold text-slate-900 font-mono">#{idx + 1}</td>
                    <td className="p-3">
                      <span className="font-bold text-slate-900 block">{c.code} — {c.name}</span>
                      <span className="text-[11px] text-slate-500">{c.department} • Year {c.year}</span>
                    </td>
                    <td className="p-3 text-center font-semibold text-slate-800">{c.current_pass_pct}%</td>
                    <td className="p-3 text-center font-bold text-red-600">{c.deviation}%</td>
                    <td className="p-3 text-center text-slate-600">{c.attendance_pct}%</td>
                    <td className="p-3 text-center">
                      <PriorityBadge status={c.priority_status} score={c.priority_score} size="sm" />
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/diagnostics?course=${c.id}`);
                        }}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-100 text-slate-700 hover:bg-institutional-50 hover:text-institutional-700 transition-colors"
                      >
                        Diagnose
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <span>Aggregated across Agent 34 (Results), Agent 11 (Attendance), and Agent 6 (Progress)</span>
            <span className="font-semibold text-institutional-700">Multi-factor explainable ranking</span>
          </div>
        </div>

        {/* Right Col: Explainable Priority Score Model Breakdown (Section 17) */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-card flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Decision Model Architecture
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200">
                High Priority
              </span>
            </div>

            <div className="flex items-baseline gap-2 mb-1">
              <h3 className="text-3xl font-extrabold text-slate-900 font-mono">87 <span className="text-lg text-slate-400 font-normal">/ 100</span></h3>
            </div>
            <span className="text-xs font-bold text-slate-700 block">Explainable Composite Priority Score</span>
            <p className="text-xs text-slate-500 mt-1">
              Deterministic weighting matrix ensuring zero black-box opacity in academic resource allocation.
            </p>

            {/* Why? Factor Contributions */}
            <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Performance deviation</span>
                <span className="font-mono font-bold text-red-600">+21</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Students affected (cohort size)</span>
                <span className="font-mono font-bold text-red-600">+18</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Historical persistence</span>
                <span className="font-mono font-bold text-amber-600">+15</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Attendance risk threshold</span>
                <span className="font-mono font-bold text-amber-600">+12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Syllabus delivery delay</span>
                <span className="font-mono font-bold text-amber-600">+09</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Intervention feasibility</span>
                <span className="font-mono font-bold text-institutional-600">+12</span>
              </div>
            </div>
          </div>

          <div className="bg-institutional-50/60 rounded-xl p-3 border border-institutional-100 text-xs">
            <span className="font-bold text-institutional-900 block mb-0.5">Automated Action Trigger:</span>
            <p className="text-institutional-700 text-[11px]">
              Scores exceeding 75 trigger mandatory HoD human review and remedial intervention simulation.
            </p>
          </div>
        </div>
      </div>

      {/* Cross-Department Performance Deviation & Early Warnings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Pass Rate & Historical Comparison Chart */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Cross-Department Benchmarking
              </span>
              <h2 className="text-base font-bold text-slate-900">Current vs Historical Pass Percentage</h2>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="inline-flex items-center gap-1.5 text-institutional-700">
                <span className="w-3 h-3 rounded-md bg-institutional-600" /> Current Term
              </span>
              <span className="inline-flex items-center gap-1.5 text-slate-400">
                <span className="w-3 h-3 rounded-md bg-slate-300" /> Historical Benchmark
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentComparison} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="dept" tickLine={false} axisLine={{ stroke: '#E2E8F0' }} tick={{ fill: '#64748B', fontSize: 11, fontWeight: 600 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: '#94A3B8', fontSize: 11 }} domain={[40, 100]} />
                <Tooltip
                  cursor={{ fill: '#F8FAFC' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="bg-slate-900 text-white rounded-xl p-3 text-xs shadow-lg space-y-1">
                          <span className="font-bold block">{d.dept} Department</span>
                          <span className="text-institutional-200 block">Current Pass: {d.currentPass}%</span>
                          <span className="text-slate-300 block">Historical: {d.historical}%</span>
                          <span className="text-red-400 font-bold block">Delta: {d.delta} pp</span>
                          <span className="text-amber-300 block">Students at Risk: {d.riskCount}</span>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="currentPass" fill="#0284C7" radius={[6, 6, 0, 0]} maxBarSize={36} />
                <Bar dataKey="historical" fill="#CBD5E1" radius={[6, 6, 0, 0]} maxBarSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Early Warnings from Agent 69 */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-card flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Agent 69 Telemetry
                </span>
                <h3 className="text-base font-bold text-slate-900">Recent Early Warnings</h3>
              </div>
              <button
                onClick={() => navigate('/warnings')}
                className="text-xs font-semibold text-institutional-600 hover:text-institutional-700"
              >
                View All (18)
              </button>
            </div>

            <div className="space-y-3">
              {(dashboardData?.recent_early_warnings || []).map((w) => (
                <div
                  key={w.id}
                  onClick={() => navigate('/warnings')}
                  className="p-3 rounded-2xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/70 transition-all cursor-pointer space-y-1"
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold text-slate-900 truncate">{w.signal}</span>
                    <PriorityBadge status={w.severity} size="sm" />
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2">{w.evidence}</p>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                    <span>{w.affected_population}</span>
                    <span>{w.assigned_owner}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 text-center">
            <span className="text-[11px] text-slate-400">
              Warnings are <strong>human-review prompts</strong>, not automated conclusions.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
