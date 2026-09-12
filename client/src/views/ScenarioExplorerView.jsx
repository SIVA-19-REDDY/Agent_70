import React, { useState, useEffect } from 'react';
import { Sliders, Sparkles, Target, ArrowRight, CheckCircle2, TrendingUp, HelpCircle, Layers, ShieldCheck } from 'lucide-react';
import { useAI } from '../contexts/AIContext';
import { api } from '../services/api';

export function ScenarioExplorerView() {
  const { openDecisionModal } = useAI();

  const [courseId, setCourseId] = useState('cs201');
  const [studentsTargeted, setStudentsTargeted] = useState(20);
  const [weeks, setWeeks] = useState(4);
  const [hoursPerWeek, setHoursPerWeek] = useState(2);
  const [attendanceBoost, setAttendanceBoost] = useState(8);
  const [interventionType, setInterventionType] = useState('remedial');

  const [simulationResult, setSimulationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    runSimulation();
  }, [courseId, studentsTargeted, weeks, hoursPerWeek, attendanceBoost, interventionType]);

  const runSimulation = async () => {
    setLoading(true);
    try {
      const res = await api.simulateScenario({
        course_id: courseId,
        students_targeted: studentsTargeted,
        weeks,
        hours_per_week: hoursPerWeek,
        attendance_boost_pct: attendanceBoost,
        intervention_type: interventionType
      });
      setSimulationResult(res);
    } catch (err) {
      console.warn('Simulation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const results = simulationResult?.results || {
    baseline_pass_rate: 61,
    projected_pass_rate: 73,
    estimated_improvement: "+12 percentage points",
    improvement_points: 12,
    students_benefited: 16,
    cost_requirement: "Low",
    lead_time: "4 weeks",
    confidence: 84
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-institutional-600 block">
            What-If Academic Simulation Engine
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Scenario Explorer
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Model the expected pass rate improvements and resource costs of academic interventions prior to deployment.
          </p>
        </div>

        <button
          onClick={() => openDecisionModal({
            title: `Adopt Simulated Intervention for ${simulationResult?.course_code || 'CS201'}`,
            issue: `Baseline pass rate at ${results.baseline_pass_rate}%. Target: ${results.projected_pass_rate}%.`,
            chosen_action: `Launch ${weeks}-week ${interventionType === 'remedial' ? 'Weekend Remedial Clinic' : 'Teaching Assistant Support'} (${hoursPerWeek} hrs/wk) for ${studentsTargeted} students.`
          })}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-institutional-600 hover:bg-institutional-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
        >
          <Target className="w-3.5 h-3.5" />
          <span>Commit Scenario to Decision Log</span>
        </button>
      </div>

      {/* Main Interactive Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 5 Cols: Sliders & Controls */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 md:p-7 border border-slate-200/90 shadow-card space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Intervention Controls</h3>
            <span className="text-xs font-semibold text-institutional-700">Dynamic Live Recalculation</span>
          </div>

          {/* Select Course */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
              Target Course
            </label>
            <select
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              className="w-full text-xs font-semibold border border-slate-200 rounded-xl p-2.5 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-institutional-500"
            >
              <option value="cs201">CS201 — Data Structures & Algorithms (CSE)</option>
              <option value="cs202">CS202 — Database Management Systems (CSE)</option>
              <option value="cs301">CS301 — Operating Systems (CSE)</option>
              <option value="ec201">EC201 — Digital Signal Processing (ECE)</option>
            </select>
          </div>

          {/* Intervention Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
              Intervention Modality
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {[
                { id: 'remedial', label: 'Remedial Clinic' },
                { id: 'ta_support', label: 'TA Lab Support' },
                { id: 'peer', label: 'Peer Tutoring' }
              ].map((mod) => (
                <button
                  key={mod.id}
                  type="button"
                  onClick={() => setInterventionType(mod.id)}
                  className={`p-2 rounded-xl border text-center font-medium transition-all ${
                    interventionType === mod.id
                      ? 'border-institutional-500 bg-institutional-50 text-institutional-800 font-bold'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {mod.label}
                </button>
              ))}
            </div>
          </div>

          {/* Slider 1: Students Targeted */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">Targeted Student Cohort</span>
              <span className="font-mono font-bold text-institutional-700">{studentsTargeted} Students</span>
            </div>
            <input
              type="range"
              min="10"
              max="60"
              step="5"
              value={studentsTargeted}
              onChange={(e) => setStudentsTargeted(Number(e.target.value))}
              className="w-full accent-institutional-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>10 (Weakest cohort)</span>
              <span>60 (Full section)</span>
            </div>
          </div>

          {/* Slider 2: Duration in Weeks */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">Intervention Duration</span>
              <span className="font-mono font-bold text-institutional-700">{weeks} Weeks</span>
            </div>
            <input
              type="range"
              min="2"
              max="8"
              step="1"
              value={weeks}
              onChange={(e) => setWeeks(Number(e.target.value))}
              className="w-full accent-institutional-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>2 Weeks (Sprint)</span>
              <span>8 Weeks (Full Semester)</span>
            </div>
          </div>

          {/* Slider 3: Hours per Week */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">Contact Hours / Week</span>
              <span className="font-mono font-bold text-institutional-700">{hoursPerWeek} Hours</span>
            </div>
            <input
              type="range"
              min="1"
              max="4"
              step="1"
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(Number(e.target.value))}
              className="w-full accent-institutional-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>1 hr/wk</span>
              <span>4 hrs/wk</span>
            </div>
          </div>

          {/* Slider 4: Attendance Improvement */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">Attendance Target Boost</span>
              <span className="font-mono font-bold text-institutional-700">+{attendanceBoost}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="20"
              step="2"
              value={attendanceBoost}
              onChange={(e) => setAttendanceBoost(Number(e.target.value))}
              className="w-full accent-institutional-600"
            />
          </div>
        </div>

        {/* Right 7 Cols: Estimated Outcomes & Model Projection */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Outcome Card */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/90 shadow-card space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Simulation Projection Results
              </span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                {results.confidence}% Model Confidence
              </span>
            </div>

            {/* Before vs After Big Metric */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Baseline Pass Rate</span>
                <span className="text-3xl font-black font-mono text-slate-800">{results.baseline_pass_rate}%</span>
                <span className="text-[11px] text-slate-400 block mt-1">Current telemetry</span>
              </div>

              <div className="bg-institutional-50/70 rounded-2xl p-4 border border-institutional-200">
                <span className="text-[10px] uppercase font-bold text-institutional-700 block mb-1">Projected Pass Rate</span>
                <span className="text-3xl font-black font-mono text-institutional-800">{results.projected_pass_rate}%</span>
                <span className="text-[11px] text-institutional-600 block mt-1 font-semibold">{results.estimated_improvement}</span>
              </div>

              <div className="bg-emerald-50/60 rounded-2xl p-4 border border-emerald-200 col-span-2 md:col-span-1">
                <span className="text-[10px] uppercase font-bold text-emerald-700 block mb-1">Rescued Students</span>
                <span className="text-3xl font-black font-mono text-emerald-800">{results.students_benefited}</span>
                <span className="text-[11px] text-emerald-700 block mt-1">Out of {studentsTargeted} targeted</span>
              </div>
            </div>

            {/* Feasibility & Resource Assessment */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50/50">
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Resource Intensity</span>
                <span className="font-bold text-slate-800 text-sm mt-0.5 block">{results.cost_requirement} Cost</span>
                <p className="text-[11px] text-slate-500 mt-1">Total Contact Load: {weeks * hoursPerWeek} Hours</p>
              </div>

              <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50/50">
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Implementation Lead Time</span>
                <span className="font-bold text-slate-800 text-sm mt-0.5 block">{results.lead_time}</span>
                <p className="text-[11px] text-slate-500 mt-1">Classroom & TA ready for Week 11</p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 text-xs text-slate-600 space-y-1">
              <span className="font-bold text-slate-800 block">Historical Grounding Reference:</span>
              <p className="leading-relaxed text-slate-700">
                {results.historical_precedent || "Calibrated against Fall 2025 Weekend Remedial Programme in Data Structures (+17 pp observed gain)."}
              </p>
            </div>
          </div>

          {/* Side-by-Side Comparison Table (Section 34) */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-card space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Side-by-Side Policy Comparison Matrix
            </h3>
            <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-2.5">Dimension</th>
                  <th className="p-2.5 text-center">Baseline</th>
                  <th className="p-2.5 text-center bg-institutional-50/60 text-institutional-900 font-bold">Scenario A (Simulated)</th>
                  <th className="p-2.5 text-center">Scenario B (Intensive 6-Wk)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-2.5 font-medium text-slate-700">Pass Rate</td>
                  <td className="p-2.5 text-center font-mono">{results.baseline_pass_rate}%</td>
                  <td className="p-2.5 text-center font-mono font-bold text-institutional-700 bg-institutional-50/30">{results.projected_pass_rate}%</td>
                  <td className="p-2.5 text-center font-mono font-bold text-emerald-700">{Math.min(92, results.projected_pass_rate + 4)}%</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium text-slate-700">Students Helped</td>
                  <td className="p-2.5 text-center text-slate-400">—</td>
                  <td className="p-2.5 text-center font-mono font-bold bg-institutional-50/30">{results.students_benefited}</td>
                  <td className="p-2.5 text-center font-mono font-bold">{Math.min(studentsTargeted, results.students_benefited + 3)}</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium text-slate-700">Cost / Resources</td>
                  <td className="p-2.5 text-center text-slate-400">—</td>
                  <td className="p-2.5 text-center bg-institutional-50/30">{results.cost_requirement}</td>
                  <td className="p-2.5 text-center">Medium</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium text-slate-700">Lead Time</td>
                  <td className="p-2.5 text-center text-slate-400">—</td>
                  <td className="p-2.5 text-center bg-institutional-50/30">{results.lead_time}</td>
                  <td className="p-2.5 text-center">6 weeks</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
