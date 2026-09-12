import React, { useState, useEffect } from 'react';
import { GraduationCap, ShieldCheck, CheckCircle2, Clock, BookOpen, AlertCircle, Target, Users } from 'lucide-react';
import { useAI } from '../contexts/AIContext';
import { api } from '../services/api';

export function FacultySupportView() {
  const { openDecisionModal } = useAI();
  const [supportData, setSupportData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFacultySupport();
  }, []);

  const loadFacultySupport = async () => {
    setLoading(true);
    try {
      const res = await api.getFacultySupport();
      setSupportData(res);
    } catch (err) {
      console.warn('Faculty support fetch error:', err);
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
            Academic Capacity & Resource Balancing
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Faculty Support Opportunities
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Constructive institutional workload rebalancing, teaching assistant allocations, and instructional pacing assistance.
          </p>
        </div>
      </div>

      {/* Mandatory Statutory Appraisal Protection Notice (Section 28) */}
      <div className="bg-institutional-50 border border-institutional-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-institutional-900">
        <ShieldCheck className="w-5 h-5 text-institutional-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block text-sm mb-0.5">Institutional Ethics & Faculty Appraisal Safeguard</span>
          <p className="leading-relaxed text-institutional-800">
            {supportData?.statutory_note || "These analytical insights are strictly for institutional workload rebalancing, teaching assistant provisioning, and syllabus pacing support. Under no circumstances may these telemetry models be utilized for automated faculty appraisal, tenure determination, or career-impacting administrative actions. All appraisal decisions must remain human-deliberated, contestable, and governed by statutory committee protocols."}
          </p>
        </div>
      </div>

      {/* Opportunities List */}
      <div className="space-y-4">
        {(supportData?.opportunities || []).map((fac) => (
          <div
            key={fac.id}
            className="bg-white rounded-3xl p-6 md:p-7 border border-slate-200/90 shadow-card space-y-5"
          >
            {/* Top row: Name, Load & Administrative Duty */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-institutional-100 text-institutional-700 flex items-center justify-center font-bold text-sm">
                  {fac.faculty_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{fac.faculty_name}</h3>
                  <span className="text-xs text-slate-500">{fac.designation} • {fac.department}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                  fac.teaching_load_hours > fac.norm_hours
                    ? 'bg-amber-50 text-amber-800 border border-amber-200'
                    : 'bg-slate-100 text-slate-700'
                }`}>
                  Teaching Load: {fac.teaching_load_hours} hrs/wk (Norm: {fac.norm_hours} hrs)
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                  Rating: {fac.student_feedback_score} / 5.0
                </span>
              </div>
            </div>

            {/* Middle Grid: Courses, Administrative Duties & Syllabus Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/70">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Assigned Courses
                </span>
                <ul className="space-y-1 text-slate-700 font-medium">
                  {fac.courses_handled.map((c, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-institutional-600 shrink-0" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/70">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Administrative Institutional Burden
                </span>
                <p className="text-slate-800 font-semibold">{fac.administrative_burden}</p>
                <span className="text-[11px] text-slate-500 mt-1 block">Requires minimum 4-6 hrs/week overhead</span>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/70">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Syllabus Milestone Completion
                  </span>
                  <span className="font-bold text-red-600">{fac.syllabus_coverage_pct}% / {fac.target_coverage_pct}%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden my-2">
                  <div
                    className="h-full bg-institutional-600 rounded-full"
                    style={{ width: `${(fac.syllabus_coverage_pct / fac.target_coverage_pct) * 100}%` }}
                  />
                </div>
                <span className="text-[11px] text-slate-500">
                  Delay: <strong>-{fac.target_coverage_pct - fac.syllabus_coverage_pct}% points behind schedule</strong>
                </span>
              </div>
            </div>

            {/* Diagnostic Reason & Tailored Support Recommendation */}
            <div className="bg-institutional-50/50 border border-institutional-100 rounded-2xl p-4 md:p-5 space-y-3">
              <div>
                <span className="text-xs font-bold text-institutional-900 block mb-0.5">
                  Identified Support Opportunity Rationale:
                </span>
                <p className="text-xs text-slate-700 leading-relaxed">{fac.support_reason}</p>
              </div>

              <div className="bg-white rounded-xl p-3.5 border border-institutional-100 shadow-2xs space-y-2 text-xs">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-bold text-slate-900 block">Suggested Institutional Support:</span>
                    <p className="text-institutional-800 font-medium mt-0.5">{fac.suggested_support}</p>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                    {fac.confidence}% Model Confidence
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Expected Effect: <strong className="text-emerald-700">{fac.expected_effect}</strong></span>
                  <button
                    type="button"
                    onClick={() => openDecisionModal({
                      title: `Workload & Resource Support for ${fac.faculty_name}`,
                      issue: fac.support_reason,
                      chosen_action: fac.suggested_support,
                      assigned_to: fac.faculty_name
                    })}
                    className="text-xs font-semibold text-institutional-600 hover:underline flex items-center gap-1"
                  >
                    <span>Authorize Resource Docket</span>
                    <Target className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
