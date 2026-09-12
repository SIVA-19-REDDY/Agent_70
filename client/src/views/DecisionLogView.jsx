import React, { useState, useEffect } from 'react';
import { Target, CheckCircle2, Clock, Calendar, User, FileText, Plus, ShieldCheck } from 'lucide-react';
import { useAI } from '../contexts/AIContext';
import { api } from '../services/api';

export function DecisionLogView() {
  const { openDecisionModal } = useAI();
  const [decisions, setDecisions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDecisions();
  }, []);

  const loadDecisions = async () => {
    setLoading(true);
    try {
      const res = await api.getDecisions();
      setDecisions(res.decisions || []);
    } catch (err) {
      console.warn('Decisions fetch error:', err);
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
            Institutional Accountability Register
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Academic Decision Log
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Formally recorded leadership actions, assigned owners, and scheduled review dates for outcome tracking.
          </p>
        </div>

        <button
          onClick={() => openDecisionModal()}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-institutional-600 hover:bg-institutional-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Record New Decision</span>
        </button>
      </div>

      {/* Decisions List */}
      <div className="space-y-4">
        {decisions.map((dec) => (
          <div
            key={dec.id}
            className="bg-white rounded-3xl p-6 md:p-7 border border-slate-200/90 shadow-card space-y-4"
          >
            {/* Top row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold font-mono text-slate-400 uppercase">{dec.id}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs font-bold text-slate-900">{dec.title}</span>
                </div>
                <p className="text-xs text-slate-500"><strong>Diagnosed Issue:</strong> {dec.issue}</p>
              </div>

              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                  dec.status === 'Active'
                    ? 'bg-institutional-50 text-institutional-800 border border-institutional-200'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                }`}>
                  {dec.status}
                </span>
              </div>
            </div>

            {/* Action & Expected Outcome */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Approved Academic Action
                </span>
                <p className="text-slate-800 font-semibold">{dec.chosen_action}</p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Target Expected Outcome
                </span>
                <p className="text-emerald-800 font-semibold">{dec.expected_outcome}</p>
              </div>
            </div>

            {/* Metadata Footer */}
            <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
              <div className="flex flex-wrap items-center gap-4">
                <span>Decision Owner: <strong className="text-slate-800">{dec.owner}</strong></span>
                <span>Assigned Lead: <strong className="text-slate-800">{dec.assigned_to}</strong></span>
                <span>Start: <strong className="text-slate-700">{dec.start_date}</strong></span>
                <span>Formal Review: <strong className="text-institutional-700">{dec.target_review_date}</strong></span>
              </div>
              {dec.notes && (
                <span className="text-[11px] text-slate-400 italic">Notes: {dec.notes}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
