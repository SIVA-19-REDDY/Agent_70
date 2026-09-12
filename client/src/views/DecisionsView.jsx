import React, { useState, useEffect } from 'react';
import { Target, CheckCircle2, Clock, Calendar, Plus, Check, FileText } from 'lucide-react';
import { useAI } from '../contexts/AIContext';
import { api } from '../services/api';

export function DecisionsView() {
  const { openDecisionModal } = useAI();
  const [decisions, setDecisions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Outcome recording modal state
  const [activeDecisionForOutcome, setActiveDecisionForOutcome] = useState(null);
  const [actualOutcome, setActualOutcome] = useState('75%');
  const [actualImprovement, setActualImprovement] = useState('+14%');
  const [variance, setVariance] = useState('Better than expected');
  const [lessonsLearned, setLessonsLearned] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSaveOutcome = async (e) => {
    e.preventDefault();
    if (!activeDecisionForOutcome) return;
    setIsSubmitting(true);
    try {
      await api.recordOutcome(activeDecisionForOutcome.id, {
        actual_outcome: actualOutcome,
        actual_improvement: actualImprovement,
        variance,
        lessons_learned: lessonsLearned
      });
      setActiveDecisionForOutcome(null);
      loadDecisions();
    } catch (err) {
      alert('Failed to record outcome: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6">
      {/* Header (Section 24) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-institutional-600 block">
            Institutional Action Register
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            Decisions & Outcomes
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Formal record of academic decisions, owners, review dates, and post-intervention outcome evaluations.
          </p>
        </div>

        <button
          onClick={() => openDecisionModal()}
          className="inline-flex items-center gap-2 px-4.5 py-2.5 bg-institutional-600 hover:bg-institutional-700 text-white rounded-xl text-sm font-bold shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Record New Decision</span>
        </button>
      </div>

      {/* Decisions List (Section 24) */}
      <div className="space-y-4">
        {decisions.map((dec) => (
          <div
            key={dec.id}
            className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-card space-y-4"
          >
            {/* Top row: Issue & Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                  {dec.id} • Owner: <strong className="text-slate-700">{dec.owner}</strong>
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">{dec.issue}</h3>
              </div>

              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  dec.status === 'Completed'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-institutional-50 text-institutional-800 border border-institutional-200'
                }`}>
                  {dec.status}
                </span>
              </div>
            </div>

            {/* Decision & Expected Effect */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                  Approved Decision / Option
                </span>
                <p className="font-semibold text-slate-800">{dec.chosen_action || dec.title}</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                  Expected Effect / Target
                </span>
                <p className="font-bold text-emerald-700">{dec.expected_outcome}</p>
              </div>
            </div>

            {/* Outcome Record Display (Section 22) */}
            {dec.outcome ? (
              <div className="bg-emerald-50/50 border border-emerald-200 rounded-2xl p-4 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-emerald-900 uppercase tracking-wider text-[10px]">
                      Measured Outcome (Expected vs Actual)
                    </span>
                  </div>
                  <span className="font-bold text-emerald-800 bg-white px-2.5 py-0.5 rounded-full border border-emerald-200 text-[10px]">
                    {dec.outcome.variance}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-white p-3 rounded-xl border border-emerald-100 text-center">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Expected Outcome</span>
                    <span className="font-mono font-bold text-slate-700 text-sm">{dec.outcome.expected_outcome}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-emerald-700 block font-semibold">Actual Outcome</span>
                    <span className="font-mono font-black text-emerald-700 text-sm">{dec.outcome.actual_outcome}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Expected Gain</span>
                    <span className="font-mono font-bold text-slate-700 text-sm">{dec.outcome.expected_improvement}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-emerald-700 block font-semibold">Actual Gain</span>
                    <span className="font-mono font-black text-emerald-700 text-sm">{dec.outcome.actual_improvement}</span>
                  </div>
                </div>

                {dec.outcome.lessons_learned && (
                  <p className="text-slate-700 text-[11px] italic pt-1">
                    <strong>Lessons Learned:</strong> "{dec.outcome.lessons_learned}"
                  </p>
                )}
              </div>
            ) : (
              <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 border-t border-slate-100">
                <div className="flex items-center gap-3 text-[11px]">
                  <span>Review Date: <strong>{dec.target_review_date}</strong></span>
                  {dec.notes && <span>• Note: {dec.notes}</span>}
                </div>
                <button
                  type="button"
                  onClick={() => setActiveDecisionForOutcome(dec)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Record Measured Outcome
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Outcome Recording Modal (Section 22) */}
      {activeDecisionForOutcome && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-elevated border border-slate-200 p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Record Intervention Outcome</h3>
            <p className="text-xs text-slate-500">
              Audit the actual results achieved against model predictions for {activeDecisionForOutcome.issue}.
            </p>

            <form onSubmit={handleSaveOutcome} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-600 block mb-1">Expected Outcome</label>
                  <input
                    type="text"
                    disabled
                    value={activeDecisionForOutcome.expected_outcome || "72%"}
                    className="w-full bg-slate-100 border border-slate-200 rounded-xl p-2.5 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-600 block mb-1">Actual Outcome</label>
                  <input
                    type="text"
                    required
                    value={actualOutcome}
                    onChange={(e) => setActualOutcome(e.target.value)}
                    placeholder="e.g. 75%"
                    className="w-full border border-slate-200 rounded-xl p-2.5 font-mono font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-600 block mb-1">Actual Improvement</label>
                  <input
                    type="text"
                    required
                    value={actualImprovement}
                    onChange={(e) => setActualImprovement(e.target.value)}
                    placeholder="e.g. +14%"
                    className="w-full border border-slate-200 rounded-xl p-2.5 font-mono font-bold text-emerald-700"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-600 block mb-1">Outcome Evaluation</label>
                  <select
                    value={variance}
                    onChange={(e) => setVariance(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-2.5 font-semibold"
                  >
                    <option value="Better than expected">Better than expected</option>
                    <option value="As expected">As expected</option>
                    <option value="Needs adjustment">Needs adjustment</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-600 block mb-1">Lessons Learned (Feedback Loop)</label>
                <textarea
                  rows={3}
                  required
                  placeholder="What worked? What should feed future AI recommendation quality?..."
                  value={lessonsLearned}
                  onChange={(e) => setLessonsLearned(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-2.5 text-xs"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActiveDecisionForOutcome(null)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-institutional-600 hover:bg-institutional-700 text-white rounded-xl font-semibold text-xs transition-colors"
                >
                  {isSubmitting ? 'Saving...' : 'Save Outcome & Learn'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
