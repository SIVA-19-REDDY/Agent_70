import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Layers, AlertTriangle, BookOpen, Users, TrendingDown,
  CheckCircle2, Clock, ShieldCheck, Target, Sparkles, Sliders,
  HelpCircle, BarChart2
} from 'lucide-react';
import { PriorityBadge } from '../components/common/PriorityBadge';
import { AgentBadge } from '../components/common/AgentBadge';
import { useAI } from '../contexts/AIContext';
import { api } from '../services/api';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';

export function CourseDiagnosticsView() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { openDecisionModal } = useAI();

  const courseId = searchParams.get('course') || 'cs201';
  const [courseData, setCourseData] = useState(null);
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourseDetail();
  }, [courseId]);

  const loadCourseDetail = async () => {
    setLoading(true);
    try {
      const [resDetail, resAll] = await Promise.all([
        api.getCourseDetail(courseId),
        api.getCourses()
      ]);
      setCourseData(resDetail);
      setAllCourses(resAll.courses || []);
    } catch (err) {
      console.warn('Course diagnostic fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const course = courseData?.course;
  if (loading && !course) {
    return (
      <div className="p-12 text-center text-xs text-slate-500">
        Loading institutional telemetry and diagnostic drivers...
      </div>
    );
  }

  if (!course) {
    return (
      <div className="p-12 text-center space-y-3">
        <h3 className="text-base font-bold text-slate-800">Course Not Found</h3>
        <button
          onClick={() => navigate('/priorities')}
          className="text-xs text-institutional-600 underline font-semibold"
        >
          Return to Priority Courses
        </button>
      </div>
    );
  }

  const sectionData = (course.sections || []).map(s => ({
    section: s.section,
    passRate: s.pass_pct,
    attendance: s.attendance,
    assignment: s.assignment_completion,
    riskCount: s.risk_count
  }));

  const assessmentComparisonData = [
    { factor: 'Internal Assessment', score: course.diagnostic?.internal_assessment_avg || 58 },
    { factor: 'External Assessment', score: course.diagnostic?.external_assessment_avg || 52 },
    { factor: 'Lab Practical', score: course.diagnostic?.lab_performance_avg || 71 },
    { factor: 'Entry Preparedness', score: course.diagnostic?.student_entry_ability_score || 76 },
    { factor: 'Syllabus Milestone', score: course.syllabus_completion_pct || 54 }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Course Header & Course Switcher */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-card">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-institutional-600">
              Deep Academic Diagnostic
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500 font-medium">{course.department} Department</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {course.code} — {course.name}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Lead Faculty: <strong>{course.lead_faculty}</strong> • Year {course.year} • Semester {course.semester} • {course.credits} Credits • {course.enrolled} Enrolled
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Select different course */}
          <select
            value={course.id}
            onChange={(e) => navigate(`/diagnostics?course=${e.target.value}`)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-institutional-500"
          >
            {allCourses.map(c => (
              <option key={c.id} value={c.id}>{c.code} - {c.name}</option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => openDecisionModal({
              title: `Targeted Intervention: ${course.code}`,
              issue: `Pass rate deviation of ${course.deviation}% in ${course.name}`,
              chosen_action: course.recommended_action
            })}
            className="px-4 py-2 bg-institutional-600 hover:bg-institutional-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Target className="w-3.5 h-3.5" />
            <span>Create Decision</span>
          </button>
        </div>
      </div>

      {/* Primary Diagnostic Driver Card (Section 24) */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/90 shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-institutional-600 block">
              Core Root Cause Analysis
            </span>
            <h2 className="text-lg font-bold text-slate-900">What is driving the performance issue?</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-institutional-700 bg-institutional-50 px-3 py-1 rounded-full border border-institutional-200">
              Diagnostic Confidence: {course.diagnostic?.confidence || 84}%
            </span>
          </div>
        </div>

        {/* Diagnosis Result Banner */}
        <div className="bg-institutional-50/70 border border-institutional-200 rounded-2xl p-5 space-y-2">
          <div className="flex items-center gap-2.5">
            <Layers className="w-5 h-5 text-institutional-600 shrink-0" />
            <div>
              <span className="text-xs text-institutional-700 font-medium uppercase tracking-wider block">
                Primary Diagnostic Classification:
              </span>
              <h3 className="text-base md:text-lg font-black text-slate-900">
                {course.diagnostic?.primary_driver}
              </h3>
            </div>
          </div>
          <p className="text-xs text-slate-600 pl-7">
            Correlated across continuous internal tests, external exam calibration, section parity, and syllabus delivery telemetry.
          </p>
        </div>

        {/* Root Causes Evidence Bullets */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
            Observed Institutional Evidence:
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {(course.diagnostic?.root_causes || []).map((cause, idx) => (
              <div key={idx} className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 text-xs text-slate-700 space-y-1">
                <span className="font-bold text-slate-900 block">Finding #{idx + 1}</span>
                <p>{cause}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Multi-Agent Evidence Badges */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Telemetry Nodes:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {(course.agent_evidence || ['Agent 34', 'Agent 11', 'Agent 6']).map((src, i) => (
                <AgentBadge key={i} source={src} />
              ))}
            </div>
          </div>
          <span className="text-[11px] text-slate-400">
            Diagnoses are model-inferred advisory insights, not absolute truths.
          </span>
        </div>
      </div>

      {/* Performance Metrics & Section Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section Comparison Chart */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Cohort Parity
              </span>
              <h3 className="text-base font-bold text-slate-900">Section-Level Pass Rate & Attendance</h3>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="section" tickLine={false} axisLine={{ stroke: '#E2E8F0' }} tick={{ fill: '#64748B', fontSize: 11, fontWeight: 600 }} />
                <YAxis domain={[40, 100]} tickLine={false} axisLine={false} tick={{ fill: '#94A3B8', fontSize: 11 }} />
                <Tooltip
                  cursor={{ fill: '#F8FAFC' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="bg-slate-900 text-white rounded-xl p-3 text-xs shadow-lg space-y-1">
                          <span className="font-bold block">{d.section}</span>
                          <span className="text-institutional-200 block">Pass Rate: {d.passRate}%</span>
                          <span className="text-emerald-300 block">Attendance: {d.attendance}%</span>
                          <span className="text-amber-300 block">At-Risk Count: {d.riskCount} students</span>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="passRate" fill="#0284C7" radius={[6, 6, 0, 0]} maxBarSize={32} />
                <Bar dataKey="attendance" fill="#94A3B8" radius={[6, 6, 0, 0]} maxBarSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 text-xs text-slate-600 pt-1">
            <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-institutional-600" /> Pass Rate %</span>
            <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-slate-400" /> Attendance %</span>
          </div>
        </div>

        {/* Assessment Calibration & Driver Radar */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Factor Calibration
              </span>
              <h3 className="text-base font-bold text-slate-900">Internal vs External Assessment Marks</h3>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={assessmentComparisonData} layout="vertical" margin={{ top: 10, right: 20, left: 40, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                <XAxis type="number" domain={[0, 100]} tickLine={false} axisLine={false} tick={{ fill: '#94A3B8', fontSize: 11 }} />
                <YAxis type="category" dataKey="factor" tickLine={false} axisLine={false} tick={{ fill: '#475569', fontSize: 11, fontWeight: 500 }} />
                <Tooltip cursor={{ fill: '#F8FAFC' }} />
                <Bar dataKey="score" fill="#3B82F6" radius={[0, 6, 6, 0]} maxBarSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-600 border border-slate-200/80">
            <span className="font-semibold text-slate-800">Assessment Divergence: </span>
            Internal continuous evaluation (58%) is 6 points higher than external university questions (52%), indicating an assessment cognitive demand gap.
          </div>
        </div>
      </div>

      {/* Historical Interventions & Previous Outcomes */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-card space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Empirical Precedent
            </span>
            <h3 className="text-base font-bold text-slate-900">Historical Interventions in this Course</h3>
          </div>
          <button
            onClick={() => navigate('/interventions')}
            className="text-xs font-semibold text-institutional-600 hover:underline"
          >
            View Institutional Library
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(courseData?.related_interventions || []).map((hi) => (
            <div key={hi.id} className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">{hi.title}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  +{hi.observed_improvement_points} pp Gain
                </span>
              </div>
              <p className="text-xs text-slate-600">{hi.problem_addressed}</p>
              <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-slate-200 text-slate-500">
                <span>Before: <strong>{hi.before_pass_probability}%</strong></span>
                <span>After: <strong className="text-emerald-700">{hi.after_pass_rate}%</strong></span>
              </div>
              <p className="text-[11px] text-institutional-800 italic pt-1">
                Lesson: {hi.lessons_learned}
              </p>
            </div>
          ))}
          {(!courseData?.related_interventions || courseData.related_interventions.length === 0) && (
            <div className="col-span-2 text-center p-6 text-xs text-slate-400">
              No previous formal intervention docket recorded for this specific course ID.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
