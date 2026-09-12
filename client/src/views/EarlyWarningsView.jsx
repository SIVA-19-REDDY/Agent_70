import React, { useState, useEffect } from 'react';
import { Bell, AlertTriangle, ShieldAlert, CheckCircle2, User, Clock, ArrowRight, ShieldCheck, Target } from 'lucide-react';
import { PriorityBadge } from '../components/common/PriorityBadge';
import { useAI } from '../contexts/AIContext';
import { api } from '../services/api';

export function EarlyWarningsView() {
  const { openDecisionModal } = useAI();
  const [warnings, setWarnings] = useState([]);
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWarnings();
  }, []);

  const loadWarnings = async () => {
    setLoading(true);
    try {
      const res = await api.getWarnings();
      setWarnings(res.warnings || []);
    } catch (err) {
      console.warn('Warnings fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = filterSeverity === 'all'
    ? warnings
    : warnings.filter(w => w.severity.toLowerCase() === filterSeverity.toLowerCase());

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-institutional-600 block">
            Agent 69 Anomaly Detection Feed
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Early Warning Center
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time multi-agent anomaly flags and human-review prompts requiring departmental investigation.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl p-1 shadow-2xs text-xs">
          {['all', 'critical', 'urgent', 'moderate'].map((sev) => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className={`px-3 py-1 rounded-lg font-semibold capitalize transition-colors ${
                filterSeverity === sev
                  ? 'bg-institutional-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Human Review Guardrail Banner */}
      <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 flex items-start gap-3 text-xs text-slate-700">
        <ShieldCheck className="w-5 h-5 text-institutional-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block text-sm text-slate-900 mb-0.5">Human-Deliberated Action Requirement</span>
          <p className="leading-relaxed">
            All early-warning signals represent <strong>human-review prompts</strong>, not definitive autonomous judgments. Pursuant to student privacy statutes, sensitive medical, psychological, or confidential counseling records are strictly quarantined and never surfaced in academic management consoles.
          </p>
        </div>
      </div>

      {/* Warnings List */}
      <div className="space-y-4">
        {filtered.map((w) => (
          <div
            key={w.id}
            className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-card space-y-4"
          >
            {/* Top row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  w.severity === 'Critical' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                }`}>
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{w.signal}</h3>
                  <span className="text-[11px] text-slate-400 font-mono">ID: {w.id} • {w.source_agent}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <PriorityBadge status={w.severity} size="sm" />
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                  w.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-700'
                }`}>
                  {w.status}
                </span>
              </div>
            </div>

            {/* Evidence & Population */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Observed Anomaly Evidence
                </span>
                <p className="text-slate-800 font-medium">{w.evidence}</p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Targeted Population
                </span>
                <p className="text-slate-800 font-medium">{w.affected_population}</p>
              </div>
            </div>

            {/* Suggested Human Review Prompt & Ownership */}
            <div className="bg-institutional-50/60 rounded-2xl p-4 border border-institutional-100 space-y-2 text-xs">
              <span className="font-bold text-institutional-900 block">
                Suggested Human Review Protocol:
              </span>
              <p className="text-slate-700 leading-relaxed">{w.suggested_human_review}</p>

              <div className="pt-2 border-t border-institutional-100/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
                <div className="flex items-center gap-4">
                  <span>Assigned Owner: <strong className="text-slate-800">{w.assigned_owner}</strong></span>
                  <span>Escalation: <strong className="text-amber-800">{w.escalation}</strong></span>
                </div>
                <button
                  type="button"
                  onClick={() => openDecisionModal({
                    title: `Review Action: ${w.signal}`,
                    issue: w.evidence,
                    chosen_action: w.suggested_human_review,
                    assigned_to: w.assigned_owner
                  })}
                  className="px-3 py-1.5 bg-institutional-600 hover:bg-institutional-700 text-white rounded-xl font-semibold shadow-2xs transition-colors flex items-center gap-1.5"
                >
                  <Target className="w-3.5 h-3.5" />
                  <span>Formalize Review Decision</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
