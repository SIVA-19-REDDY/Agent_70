import React, { useState } from 'react';
import { X, Target, Calendar, User, FileText, CheckCircle2 } from 'lucide-react';
import { useAI } from '../../contexts/AIContext';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../services/api';

export function DecisionModal({ onDecisionSaved }) {
  const { isDecisionModalOpen, closeDecisionModal, decisionContext } = useAI();
  const { user } = useAuth();

  const [issue, setIssue] = useState(decisionContext?.issue || 'Data Structures performance decline');
  const [selectedOption, setSelectedOption] = useState(decisionContext?.selected_option || 'Targeted remedial programme');
  const [expectedEffect, setExpectedEffect] = useState(decisionContext?.expected_effect || '+10–16 percentage points');
  const [owner, setOwner] = useState(user?.shortRole || 'HoD');
  const [reviewDate, setReviewDate] = useState(new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0]);
  const [notes, setNotes] = useState('Authorized in accordance with departmental remedial allocation charter.');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isDecisionModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.createDecision({
        issue,
        selected_option: selectedOption,
        expected_effect: expectedEffect,
        owner: user?.shortRole || owner,
        review_date: reviewDate,
        notes
      });
      setSuccess(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setSuccess(false);
        closeDecisionModal();
        if (onDecisionSaved) onDecisionSaved();
      }, 1000);
    } catch (err) {
      alert('Failed to save decision: ' + err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm select-none">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-elevated border border-slate-200 overflow-hidden">
        {/* Header (Section 21) */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-institutional-600 text-white flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Record Decision</h2>
              <p className="text-[11px] text-slate-500">Formalize an academic action for outcome tracking</p>
            </div>
          </div>
          <button
            onClick={closeDecisionModal}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {success ? (
            <div className="py-8 text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Decision Saved to Register</h3>
              <p className="text-[11px] text-slate-500">Scheduled for review on {reviewDate}</p>
            </div>
          ) : (
            <>
              <div>
                <label className="font-semibold uppercase tracking-wider text-slate-500 block mb-1">
                  Issue
                </label>
                <input
                  type="text"
                  required
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                  className="w-full font-medium border border-slate-200 rounded-xl p-2.5 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-institutional-500 text-slate-800"
                />
              </div>

              <div>
                <label className="font-semibold uppercase tracking-wider text-slate-500 block mb-1">
                  Selected Option
                </label>
                <textarea
                  rows={2}
                  required
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="w-full font-medium border border-slate-200 rounded-xl p-2.5 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-institutional-500 text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold uppercase tracking-wider text-slate-500 block mb-1">
                    Expected Effect
                  </label>
                  <input
                    type="text"
                    required
                    value={expectedEffect}
                    onChange={(e) => setExpectedEffect(e.target.value)}
                    className="w-full font-bold border border-slate-200 rounded-xl p-2.5 bg-slate-50 text-emerald-700 font-mono"
                  />
                </div>

                <div>
                  <label className="font-semibold uppercase tracking-wider text-slate-500 block mb-1">
                    Decision Owner
                  </label>
                  <input
                    type="text"
                    disabled
                    value={user?.role || owner}
                    className="w-full font-semibold border border-slate-200 rounded-xl p-2.5 bg-slate-100 text-slate-700"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold uppercase tracking-wider text-slate-500 block mb-1">
                  Review Date
                </label>
                <input
                  type="date"
                  required
                  value={reviewDate}
                  onChange={(e) => setReviewDate(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-2.5 bg-slate-50 font-medium text-slate-800"
                />
              </div>

              <div>
                <label className="font-semibold uppercase tracking-wider text-slate-500 block mb-1">
                  Notes
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-2.5 bg-slate-50 font-medium text-slate-800"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={closeDecisionModal}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 border border-slate-200 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-institutional-600 hover:bg-institutional-700 text-white font-semibold rounded-xl shadow-xs transition-colors"
                >
                  {isSubmitting ? 'Saving...' : 'Save Decision'}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
