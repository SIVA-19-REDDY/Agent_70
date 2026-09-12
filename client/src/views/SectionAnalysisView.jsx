import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layers, AlertTriangle, Users, TrendingDown, CheckCircle2, Sliders, ArrowRight } from 'lucide-react';
import { PriorityBadge } from '../components/common/PriorityBadge';
import { useFilters } from '../contexts/FilterContext';
import { api } from '../services/api';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';

export function SectionAnalysisView() {
  const { filters } = useFilters();
  const navigate = useNavigate();

  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSections();
  }, [filters]);

  const loadSections = async () => {
    setLoading(true);
    try {
      const res = await api.getSections();
      setSections(res.sections || []);
    } catch (err) {
      console.warn('Sections fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const chartData = sections.map(s => ({
    name: `${s.course_code} ${s.section}`,
    passPct: s.pass_pct,
    attendance: s.attendance,
    avgMarks: s.avg_marks,
    riskCount: s.risk_count
  }));

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-institutional-600 block">
            Cohort Delivery Analytics
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Section Analysis
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Compare pass rates, attendance, and assignment completion across sections to detect localized bottlenecks.
          </p>
        </div>

        <button
          onClick={() => navigate('/warnings')}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 shadow-2xs"
        >
          <span>View Section Anomaly Signals</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Comparative Chart */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-card space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Comparative Section Performance & Attendance</h3>
          <div className="flex items-center gap-4 text-xs">
            <span className="inline-flex items-center gap-1.5 text-institutional-700">
              <span className="w-3 h-3 rounded bg-institutional-600" /> Pass Rate %
            </span>
            <span className="inline-flex items-center gap-1.5 text-slate-500">
              <span className="w-3 h-3 rounded bg-slate-400" /> Attendance %
            </span>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="name" tickLine={false} axisLine={{ stroke: '#E2E8F0' }} tick={{ fill: '#64748B', fontSize: 10 }} />
              <YAxis domain={[40, 100]} tickLine={false} axisLine={false} tick={{ fill: '#94A3B8', fontSize: 11 }} />
              <Tooltip
                cursor={{ fill: '#F8FAFC' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const d = payload[0].payload;
                    return (
                      <div className="bg-slate-900 text-white rounded-xl p-3 text-xs shadow-lg space-y-1">
                        <span className="font-bold block">{d.name}</span>
                        <span className="text-institutional-200 block">Pass Rate: {d.passPct}%</span>
                        <span className="text-slate-300 block">Attendance: {d.attendance}%</span>
                        <span className="text-amber-300 block">At-Risk: {d.riskCount} students</span>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="passPct" fill="#0284C7" radius={[6, 6, 0, 0]} maxBarSize={28} />
              <Bar dataKey="attendance" fill="#94A3B8" radius={[6, 6, 0, 0]} maxBarSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sections Detail Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800">All Tracked Sections ({sections.length})</span>
          <span className="text-[11px] text-slate-400">Synced with Agent 11 & Agent 34</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3.5">Section</th>
                <th className="p-3.5">Course</th>
                <th className="p-3.5">Assigned Faculty</th>
                <th className="p-3.5 text-center">Enrolled</th>
                <th className="p-3.5 text-center">Pass %</th>
                <th className="p-3.5 text-center">Avg Marks</th>
                <th className="p-3.5 text-center">Attendance %</th>
                <th className="p-3.5 text-center">Assignments %</th>
                <th className="p-3.5 text-center">At-Risk Count</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sections.map((s, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-3.5 font-bold text-slate-900">{s.section}</td>
                  <td className="p-3.5">
                    <span className="font-semibold text-slate-800 block">{s.course_code}</span>
                    <span className="text-[11px] text-slate-400">{s.course_name}</span>
                  </td>
                  <td className="p-3.5 text-slate-700">{s.faculty}</td>
                  <td className="p-3.5 text-center font-mono text-slate-600">{s.enrolled}</td>
                  <td className="p-3.5 text-center font-mono font-bold text-slate-800">
                    <span className={s.pass_pct < 60 ? 'text-red-600' : 'text-slate-800'}>
                      {s.pass_pct}%
                    </span>
                  </td>
                  <td className="p-3.5 text-center font-mono text-slate-600">{s.avg_marks}/100</td>
                  <td className="p-3.5 text-center font-mono text-slate-700">{s.attendance}%</td>
                  <td className="p-3.5 text-center font-mono text-slate-700">{s.assignment_completion}%</td>
                  <td className="p-3.5 text-center font-mono font-bold">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                      s.risk_count > 10 ? 'bg-red-50 text-red-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {s.risk_count}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => navigate(`/diagnostics?course=${s.course_id || 'cs201'}`)}
                      className="px-2.5 py-1 text-[11px] font-semibold bg-institutional-50 text-institutional-700 rounded-lg hover:bg-institutional-100"
                    >
                      Diagnostic
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
