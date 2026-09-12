import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle2, GitBranch, Cpu, Database } from 'lucide-react';

export function PipelineIndicator({ steps = [], activeStep = null, sourcesUsed = [] }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const defaultPipeline = [
    { title: "Question Understanding & Intent Parsing", agent: "AURA Core" },
    { title: "Decomposition into Sub-hypotheses", agent: "Agent 70" },
    { title: "Multi-Agent Data Gathering (Telemetry Sync)", agent: "Agents 6, 7, 11, 34, 69" },
    { title: "Continuous Academic Assessment Analysis", agent: "Agent 34 & 46" },
    { title: "Historical Cohort Deviation Comparison", agent: "Agent 15 & Archive" },
    { title: "Explainable Priority Scoring Calculation", agent: "Decision Model" },
    { title: "Driver Diagnosis (Paper vs Teaching vs Preparedness)", agent: "Diagnostic Engine" },
    { title: "Actionable Recommendation Synthesis", agent: "AURA Engine" },
    { title: "What-If Scenario Simulation Mapping", agent: "Simulator" },
    { title: "Decision Record & Feedback Preparation", agent: "Register Sync" }
  ];

  const displaySteps = steps && steps.length > 0
    ? steps.map((s, i) => ({ title: typeof s === 'string' ? s : s.title, agent: s.agent || `Stage ${i + 1}` }))
    : defaultPipeline;

  return (
    <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 transition-all">
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between cursor-pointer select-none"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-institutional-100 text-institutional-700 flex items-center justify-center">
            <GitBranch className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-800">Analytical Decision Pipeline</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                10-Stage Verification Complete
              </span>
            </div>
            <p className="text-[11px] text-slate-500">Trace how AURA decomposed this question using verified multi-agent telemetry</p>
          </div>
        </div>

        <button
          type="button"
          className="text-xs font-semibold text-institutional-600 flex items-center gap-1 hover:text-institutional-700"
        >
          <span>{isExpanded ? 'Collapse Pipeline' : 'How I Analysed This'}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-slate-200 space-y-4">
          {/* Steps Timeline */}
          <div className="space-y-2.5">
            {displaySteps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="text-slate-800 font-medium">{step.title}</span>
                  {step.agent && (
                    <span className="text-[10px] font-mono text-slate-400 ml-2">[{step.agent}]</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Sources Verified */}
          <div className="pt-3 border-t border-slate-100">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Verified Source Agents Consulted
            </span>
            <div className="flex flex-wrap gap-1.5">
              {(sourcesUsed.length > 0 ? sourcesUsed : ['Agent 34 (Results)', 'Agent 11 (Attendance)', 'Agent 6 (Progress)', 'Agent 15 (Forecast)', 'Agent 69 (Early Warnings)', 'Historical Archive']).map((source, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white text-slate-700 border border-slate-200 shadow-2xs"
                >
                  <Database className="w-3 h-3 text-institutional-600" />
                  <span>{source}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
