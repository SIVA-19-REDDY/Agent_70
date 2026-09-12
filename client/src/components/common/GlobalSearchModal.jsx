import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, User, AlertTriangle, CheckSquare, History, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { INSTITUTIONAL_DATA } from '../../../../server/data/institutionalData.js';

export function GlobalSearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        onClose(); // toggle or open
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Search logic across institutional entities
  const matchedCourses = (INSTITUTIONAL_DATA.courses || []).filter(c =>
    !q || c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q) || c.department.toLowerCase().includes(q)
  );

  const matchedFaculty = (INSTITUTIONAL_DATA.faculty_support_opportunities || []).filter(f =>
    !q || f.faculty_name.toLowerCase().includes(q) || f.department.toLowerCase().includes(q)
  );

  const matchedDecisions = (INSTITUTIONAL_DATA.recorded_decisions || []).filter(d =>
    !q || d.title.toLowerCase().includes(q) || d.issue.toLowerCase().includes(q)
  );

  const matchedInterventions = (INSTITUTIONAL_DATA.historical_interventions || []).filter(i =>
    !q || i.title.toLowerCase().includes(q) || i.course_name.toLowerCase().includes(q)
  );

  const handleSelect = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-elevated border border-slate-200 overflow-hidden">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/70">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder="Search courses, faculty, decisions, interventions, or early warnings..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Results */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {/* Courses */}
          {matchedCourses.length > 0 && (
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 block mb-1">
                Courses ({matchedCourses.length})
              </span>
              <div className="space-y-1">
                {matchedCourses.slice(0, 3).map(c => (
                  <div
                    key={c.id}
                    onClick={() => handleSelect(`/diagnostics?course=${c.id}`)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-institutional-50/70 cursor-pointer group transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <BookOpen className="w-4 h-4 text-institutional-600" />
                      <div>
                        <span className="text-xs font-bold text-slate-900">{c.code} — {c.name}</span>
                        <span className="text-[11px] text-slate-500 block">{c.department} • Pass Rate: {c.current_pass_pct}% ({c.deviation} pp)</span>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-institutional-600 group-hover:translate-x-0.5 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Decisions */}
          {matchedDecisions.length > 0 && (
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 block mb-1">
                Recorded Decisions ({matchedDecisions.length})
              </span>
              <div className="space-y-1">
                {matchedDecisions.slice(0, 2).map(d => (
                  <div
                    key={d.id}
                    onClick={() => handleSelect('/decisions')}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-institutional-50/70 cursor-pointer group transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <CheckSquare className="w-4 h-4 text-emerald-600" />
                      <div>
                        <span className="text-xs font-bold text-slate-900">{d.title}</span>
                        <span className="text-[11px] text-slate-500 block">{d.owner} • Review: {d.target_review_date}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-institutional-600 group-hover:translate-x-0.5 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Historical Interventions */}
          {matchedInterventions.length > 0 && (
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 block mb-1">
                Historical Interventions ({matchedInterventions.length})
              </span>
              <div className="space-y-1">
                {matchedInterventions.slice(0, 2).map(i => (
                  <div
                    key={i.id}
                    onClick={() => handleSelect('/interventions')}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-institutional-50/70 cursor-pointer group transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <History className="w-4 h-4 text-purple-600" />
                      <div>
                        <span className="text-xs font-bold text-slate-900">{i.title}</span>
                        <span className="text-[11px] text-slate-500 block">{i.course_name} • Outcome: +{i.observed_improvement_points} pp</span>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-institutional-600 group-hover:translate-x-0.5 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {matchedCourses.length === 0 && matchedDecisions.length === 0 && (
            <div className="p-8 text-center text-xs text-slate-400">
              No matching institutional records found for "{query}".
            </div>
          )}
        </div>

        {/* Footer tip */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 px-4">
          <span>Navigate with arrows, select with Enter</span>
          <span>ESC to dismiss</span>
        </div>
      </div>
    </div>
  );
}
