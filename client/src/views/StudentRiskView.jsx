import React, { useState, useEffect } from 'react';
import { Users, AlertTriangle, ShieldAlert, CheckCircle2, TrendingDown, BookOpen, Lock, ShieldCheck } from 'lucide-react';
import { StatCard } from '../components/common/StatCard';
import { api } from '../services/api';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';

export function StudentRiskView() {
  const [riskData, setRiskData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRiskData();
  }, []);

  const loadRiskData = async () => {
    setLoading(true);
    try {
      const res = await api.getStudentRisk();
      setRiskData(res);
    } catch (err) {
      console.warn('Risk data fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const pieData = [
    { name: 'High Academic Risk', value: riskData?.risk_breakdown?.high_risk || 126, color: '#EF4444' },
    { name: 'Moderate Risk', value: riskData?.risk_breakdown?.moderate_risk || 218, color: '#F59E0B' },
    { name: 'Stable Performance', value: riskData?.risk_breakdown?.stable || 3376, color: '#10B981' }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-institutional-600 block">
            Cohort Welfare & Progression
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Student Academic Risk Intelligence
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Aggregated predictive indicators for early institutional advising, mentoring, and remedial resource allocation.
          </p>
        </div>
      </div>

      {/* Mandatory Statutory Ethical Disclaimer (Section 26) */}
      <div className="bg-amber-50 border border-amber-200/90 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block text-sm mb-0.5">Statutory Ethical Usage Boundary & Protection Policy</span>
          <p className="leading-relaxed text-amber-800">
            {riskData?.statutory_warning || "Aggregated academic risk indicators are for proactive institutional mentoring and remedial teaching support only. Pursuant to Academic Council Charter and University Ethics Regulations, predictive risk telemetry must NEVER be utilized for admission filtering, financial aid/scholarship disqualification, disciplinary measures, or career placement eligibility."}
          </p>
        </div>
      </div>

      {/* 3 High-Level Cohort Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard
          title="High Academic Risk"
          value={riskData?.risk_breakdown?.high_risk || 126}
          trend="Immediate proctorial review"
          explanation="3+ risk triggers active"
          icon={AlertTriangle}
          variant="danger"
        />
        <StatCard
          title="Moderate Risk"
          value={riskData?.risk_breakdown?.moderate_risk || 218}
          trend="Early mentoring recommended"
          explanation="Attendance or 1-paper gap"
          icon={Users}
          variant="warning"
        />
        <StatCard
          title="Stable Cohort"
          value={riskData?.risk_breakdown?.stable || 3376}
          trend="90.7% of student population"
          explanation="Satisfactory progression"
          icon={CheckCircle2}
          variant="success"
        />
      </div>

      {/* Risk Distribution & Contributing Factors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donut Chart: Risk Distribution */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-card space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Institutional Risk Segmentation</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium">
            {pieData.map((item, idx) => (
              <span key={idx} className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span>{item.name}: <strong>{item.value}</strong></span>
              </span>
            ))}
          </div>
        </div>

        {/* Contributing Risk Factors Breakdown */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-card space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Primary Risk Contributing Factors</h3>
          <div className="space-y-3">
            {(riskData?.risk_factors || []).map((f, idx) => (
              <div key={idx} className="space-y-1 text-xs">
                <div className="flex items-center justify-between font-semibold text-slate-800">
                  <span>{f.factor}</span>
                  <span className="text-institutional-700">{f.count} students ({f.contribution_pct}%)</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-institutional-600 rounded-full transition-all duration-500"
                    style={{ width: `${f.contribution_pct * 2.5}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-slate-400 pt-2 border-t border-slate-100">
            Telemetry combined across Agent 11 (Attendance), Agent 34 (Results), and Agent 35 (Backlog).
          </p>
        </div>
      </div>

      {/* Department Breakdown */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-card space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Department-wise At-Risk Student Distribution</h3>
        <div className="h-60 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={riskData?.department_distribution || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="department" tickLine={false} axisLine={{ stroke: '#E2E8F0' }} tick={{ fill: '#64748B', fontSize: 11, fontWeight: 600 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fill: '#94A3B8', fontSize: 11 }} />
              <Tooltip cursor={{ fill: '#F8FAFC' }} />
              <Bar dataKey="high" fill="#EF4444" name="High Risk" radius={[4, 4, 0, 0]} />
              <Bar dataKey="moderate" fill="#F59E0B" name="Moderate Risk" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
