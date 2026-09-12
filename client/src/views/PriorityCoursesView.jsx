import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle, ArrowUpDown, Filter, ChevronRight,
  TrendingDown, BookOpen, Layers, ShieldCheck, HelpCircle,
  Sparkles, Sliders
} from 'lucide-react';
import { PriorityBadge } from '../components/common/PriorityBadge';
import { AgentBadge } from '../components/common/AgentBadge';
import { useFilters } from '../contexts/FilterContext';
import { useAI } from '../contexts/AIContext';
import { api } from '../services/api';

export function PriorityCoursesView() {
  const { filters } = useFilters();
  const { openDecisionModal } = useAI();
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourseForBreakdown, setSelectedCourseForBreakdown] = useState(null);

  useEffect(() => {
    loadCourses();
  }, [filters]);

  const loadCourses = async () => {
    setLoading(true);
    try {
      const res = await api.getCourses({
        department: filters.department,
        priority: filters.priorityFilter,
        year: filters.year,
        semester: filters.semester
      });
      setCourses(res.courses || []);
    } catch (err) {
      console.warn('Courses fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-institutional-600 block">
            Priority Intelligence
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Priority Courses
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Where academic intervention is most actionable based on multi-factor telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate('/copilot')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-institutional-600 hover:bg-institutional-700 rounded-xl shadow-xs transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Consult AURA on Priorities</span>
          </button>
        </div>
      </div>

      {/* Courses Master Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-800">
              Ranked Intervention Opportunities ({courses.length})
            </span>
          </div>
          <span className="text-[11px] text-slate-400">
            Click any course row to open full diagnostic driver analysis
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3.5">Rank</th>
                <th className="p-3.5">Course Code & Name</th>
                <th className="p-3.5">Dept</th>
                <th className="p-3.5 text-center">Pass %</th>
                <th className="p-3.5 text-center">Historical</th>
                <th className="p-3.5 text-center">Deviation</th>
                <th className="p-3.5 text-center">Attendance</th>
                <th className="p-3.5 text-center">Syllabus</th>
                <th className="p-3.5 text-center">At Risk</th>
                <th className="p-3.5 text-center">Priority</th>
                <th className="p-3.5 text-center">Confidence</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {courses.map((c, idx) => (
                <tr
                  key={c.id}
                  onClick={() => navigate(`/diagnostics?course=${c.id}`)}
                  className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                >
                  <td className="p-3.5 font-bold text-slate-900 font-mono">#{idx + 1}</td>
                  <td className="p-3.5">
                    <span className="font-bold text-slate-900 block group-hover:text-institutional-700 transition-colors">
                      {c.code} — {c.name}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Lead: {c.lead_faculty} • Year {c.year} Sem {c.semester}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-700">
                      {c.department}
                    </span>
                  </td>
                  <td className="p-3.5 text-center font-bold text-slate-800 font-mono">{c.current_pass_pct}%</td>
                  <td className="p-3.5 text-center text-slate-500 font-mono">{c.historical_pass_pct}%</td>
                  <td className="p-3.5 text-center font-bold text-red-600 font-mono">{c.deviation}%</td>
                  <td className="p-3.5 text-center font-medium text-slate-700 font-mono">{c.attendance_pct}%</td>
                  <td className="p-3.5 text-center font-medium text-slate-700 font-mono">{c.syllabus_completion_pct}%</td>
                  <td className="p-3.5 text-center font-bold text-amber-700 font-mono">{c.students_at_risk}</td>
                  <td className="p-3.5 text-center">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCourseForBreakdown(c);
                      }}
                      className="cursor-pointer"
                      title="Click to view explainable score breakdown"
                    >
                      <PriorityBadge status={c.priority_status} score={c.priority_score} size="sm" />
                    </button>
                  </td>
                  <td className="p-3.5 text-center font-mono font-medium text-slate-600">
                    {c.diagnostic?.confidence || 84}%
                  </td>
                  <td className="p-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/diagnostics?course=${c.id}`);
                        }}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-institutional-50 text-institutional-700 hover:bg-institutional-100 transition-colors"
                      >
                        Diagnose
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openDecisionModal({
                            title: `Intervention Decision: ${c.code}`,
                            issue: `${c.name} has ${c.deviation}% pass deviation and ${c.students_at_risk} at-risk students.`,
                            chosen_action: c.recommended_action
                          });
                        }}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                      >
                        Act
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Score Breakdown Modal */}
      {selectedCourseForBreakdown && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-elevated border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Explainable Factor Model</span>
                <h3 className="text-base font-bold text-slate-900">{selectedCourseForBreakdown.code} Priority Score</h3>
              </div>
              <button
                onClick={() => setSelectedCourseForBreakdown(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center justify-between py-2">
              <span className="text-xs font-bold text-slate-700">Total Calculated Priority</span>
              <span className="text-2xl font-black text-red-600 font-mono">{selectedCourseForBreakdown.priority_score} / 100</span>
            </div>

            <div className="space-y-2 text-xs border-t border-slate-100 pt-3">
              {Object.entries(selectedCourseForBreakdown.priority_factors || {}).map(([factor, val]) => (
                <div key={factor} className="flex items-center justify-between text-slate-600">
                  <span className="capitalize">{factor.replace(/_/g, ' ')}</span>
                  <span className="font-mono font-bold text-institutional-700">+{val}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 text-center">
              <button
                type="button"
                onClick={() => {
                  const c = selectedCourseForBreakdown;
                  setSelectedCourseForBreakdown(null);
                  navigate(`/diagnostics?course=${c.id}`);
                }}
                className="w-full py-2 bg-institutional-600 text-white rounded-xl text-xs font-semibold hover:bg-institutional-700 transition-colors"
              >
                Open Full Course Diagnostic
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
