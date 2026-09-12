import React, { useState, useEffect } from 'react';
import { RefreshCw, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, Target, Layers } from 'lucide-react';
import { StatCard } from '../components/common/StatCard';
import { useAI } from '../contexts/AIContext';
import { api } from '../services/api';

export function BacklogRecoveryView() {
  const { openDecisionModal } = useAI();
  const [backlogData, setBacklogData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBacklogData();
  }, []);

  const loadBacklogData = async () => {
    setLoading(true);
    try {
      const res = await api.getBacklogs();
      setBacklogData(res);
    } catch (err) {
      console.warn('Backlog fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-institutional-600 block">
            Academic Progression & Clearance
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Backlog & Recovery Intelligence
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Segmented recoverability intelligence from Agent 35 to rescue students prior to statutory progression barriers.
          </p>
        </div>

        <button
          onClick={() => openDecisionModal({
            title: "Approve Departmental Backlog Clearance Programme",
            issue: "73 active student backlogs across core prerequisites.",
            chosen_action: "Sanction 4-week evening question clinics for Recoverable cohort (42 students)."
          })}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-institutional-600 hover:bg-institutional-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
        >
          <Target className="w-3.5 h-3.5" />
          <span>Launch Backlog Recovery Action</span>
        </button>
      </div>

      {/* 3 High-Level KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard
          title="Total Backlog Cases"
          value={backlogData?.total_backlog_cases || "73"}
          trend="Down 14% vs 2025"
          explanation="Active unearned credits"
          icon={RefreshCw}
          variant="default"
        />
        <StatCard
          title="Recoverable with Support"
          value={backlogData?.segments?.[0]?.count || "42"}
          trend="82% expected clearance"
          explanation="High attendance, marginal fail"
          icon={CheckCircle2}
          variant="success"
        />
        <StatCard
          title="High Progression Risk"
          value={(backlogData?.segments?.[2]?.count || 9) + (backlogData?.segments?.[3]?.count || 4)}
          trend="Council review required"
          explanation="Year promotion barrier"
          icon={AlertTriangle}
          variant="danger"
        />
      </div>

      {/* Segmented Recoverability Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Cohort Segmentation & Tailored Interventions</h3>
          <span className="text-xs text-slate-500 font-medium">{backlogData?.clearance_trend_semester_over_semester}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {(backlogData?.segments || []).map((seg, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-card flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Segment #{idx + 1}
                    </span>
                    <h4 className="text-base font-bold text-slate-900">{seg.segment}</h4>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-institutional-50 text-institutional-800 border border-institutional-200 shrink-0">
                    {seg.count} Students
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-slate-100 my-3">
                  <div>
                    <span className="text-slate-400 block text-[11px]">CGPA Range:</span>
                    <span className="font-semibold text-slate-800">{seg.cgpa_range}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Expected Clearance:</span>
                    <span className="font-bold text-emerald-700">{seg.expected_clearance_rate}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>Characteristics:</strong> {seg.characteristics}
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                  Recommended Academic Action:
                </span>
                <p className="text-xs text-slate-800 font-medium leading-relaxed">
                  {seg.recommended_action}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
