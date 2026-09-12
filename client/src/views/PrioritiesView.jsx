import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Sparkles, ArrowRight, Gauge, CheckCircle2 } from 'lucide-react';
import { useAI } from '../contexts/AIContext';
import { api } from '../services/api';

export function PrioritiesView() {
  const { triggerAskQuestion } = useAI();
  const navigate = useNavigate();

  const [priorities, setPriorities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPriorities();
  }, []);

  const loadPriorities = async () => {
    setLoading(true);
    try {
      const res = await api.getPriorities();
      setPriorities(res.priorities || []);
    } catch (err) {
      console.warn('Priorities fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenInCopilot = (item) => {
    const question = item.query || `Analyze priority course ${item.course_or_issue}`;
    triggerAskQuestion(question);
    navigate('/');
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6">
      {/* Header (Section 23) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-institutional-600 block">
            AI-Generated Decision Docket
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            Priorities
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Ranked academic issues weighted by institutional impact, actionability, and intervention feasibility.
          </p>
        </div>

        <button
          onClick={() => {
            triggerAskQuestion("Which courses require immediate intervention this semester?");
            navigate('/');
          }}
          className="inline-flex items-center gap-2 px-4.5 py-2.5 bg-institutional-600 hover:bg-institutional-700 text-white rounded-xl text-sm font-bold shadow-xs transition-colors cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Ask Copilot to Re-rank Priorities</span>
        </button>
      </div>

      {/* Priorities Table (Section 23) */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-xs">
              <tr>
                <th className="p-4">Rank</th>
                <th className="p-4">Course / Issue</th>
                <th className="p-4 text-center">Impact</th>
                <th className="p-4 text-center">Actionability</th>
                <th className="p-4 text-center">Priority</th>
                <th className="p-4">Reason</th>
                <th className="p-4 text-center">Confidence</th>
                <th className="p-4">Recommended Next Step</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {priorities.map((item) => (
                <tr
                  key={item.rank}
                  onClick={() => handleOpenInCopilot(item)}
                  className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                >
                  <td className="p-4 font-mono font-bold text-slate-900 text-sm">#{item.rank}</td>
                  <td className="p-4 font-bold text-slate-900 group-hover:text-institutional-700 transition-colors">
                    {item.course_or_issue}
                    <span className="block font-normal text-xs text-slate-400 mt-0.5">
                      {item.department} • {item.students_affected} Students Affected
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                      item.impact === 'High' ? 'bg-red-50 text-red-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {item.impact}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                      item.actionability === 'High' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {item.actionability}
                    </span>
                  </td>
                  <td className="p-4 text-center font-mono font-black text-red-600 text-base">
                    {item.priority_score}
                  </td>
                  <td className="p-4 text-slate-600 text-xs md:text-sm max-w-xs leading-relaxed">{item.reason}</td>
                  <td className="p-4 text-center font-mono font-bold text-slate-800 text-sm">
                    {item.confidence}%
                  </td>
                  <td className="p-4 text-slate-800 font-medium text-xs md:text-sm max-w-xs leading-relaxed">
                    {item.recommended_next_step}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenInCopilot(item);
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-institutional-50 text-institutional-700 font-bold text-xs md:text-sm hover:bg-institutional-100 transition-colors cursor-pointer"
                    >
                      <span>Analyze</span>
                      <ArrowRight className="w-3.5 h-3.5" />
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
