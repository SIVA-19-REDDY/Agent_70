import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { History, TrendingUp, CheckCircle2, Sliders, Target, Sparkles, ShieldCheck } from 'lucide-react';
import { useAI } from '../contexts/AIContext';
import { api } from '../services/api';

export function HistoricalInterventionsView() {
  const { openDecisionModal } = useAI();
  const navigate = useNavigate();

  const [interventions, setInterventions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInterventions();
  }, []);

  const loadInterventions = async () => {
    setLoading(true);
    try {
      const res = await api.getInterventions();
      setInterventions(res.interventions || []);
    } catch (err) {
      console.warn('Interventions fetch error:', err);
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
            Institutional Empirical Precedents
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            What Worked Before
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit-grade retrospective archive of validated interventions, observed deltas, and documented pedagogical lessons.
          </p>
        </div>

        <button
          onClick={() => navigate('/scenarios')}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-institutional-600 hover:bg-institutional-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Simulate These Interventions</span>
        </button>
      </div>

      {/* Historical Library Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {interventions.map((hi) => (
          <div
            key={hi.id}
            className="bg-white rounded-3xl p-6 md:p-7 border border-slate-200/90 shadow-card flex flex-col justify-between space-y-5"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-institutional-600 block">
                    {hi.course_name} ({hi.academic_term})
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-0.5">{hi.title}</h3>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                  +{hi.observed_improvement_points} pp Delta
                </span>
              </div>

              {/* Problem & Format */}
              <div className="space-y-2 py-3 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] font-semibold uppercase">Addressed Problem:</span>
                  <p className="text-slate-800 font-medium">{hi.problem_addressed}</p>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-semibold uppercase">Intervention Design:</span>
                  <p className="text-slate-700">{hi.intervention_format}</p>
                </div>
              </div>

              {/* Numerical Metrics Bar */}
              <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/70 text-center text-xs my-2">
                <div>
                  <span className="text-[10px] text-slate-400 block">Before Pass</span>
                  <span className="font-bold text-slate-700 font-mono text-sm">{hi.before_pass_probability}%</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">After Pass</span>
                  <span className="font-bold text-emerald-700 font-mono text-sm">{hi.after_pass_rate}%</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Attendance Delta</span>
                  <span className="font-bold text-institutional-700 font-mono text-sm">{hi.attendance_change_pct}</span>
                </div>
              </div>

              {/* Lessons Learned */}
              <div className="bg-institutional-50/50 p-3.5 rounded-2xl border border-institutional-100 text-xs text-institutional-900 space-y-1 mt-3">
                <span className="font-bold uppercase tracking-wider text-[10px] text-institutional-700 block">
                  Documented Pedagogical Lesson:
                </span>
                <p className="leading-relaxed italic">"{hi.lessons_learned}"</p>
              </div>
            </div>

            {/* Action footer */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400">
                Resource: {hi.cost_resources} • {hi.synthetic_label}
              </span>
              <button
                type="button"
                onClick={() => openDecisionModal({
                  title: `Replicate: ${hi.title}`,
                  issue: `Current performance decline similar to ${hi.course_name} baseline.`,
                  chosen_action: hi.intervention_format
                })}
                className="inline-flex items-center gap-1 font-semibold text-institutional-600 hover:text-institutional-700"
              >
                <span>Replicate Decision</span>
                <Target className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
