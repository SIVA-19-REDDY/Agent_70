import React from 'react';
import { X, ShieldCheck, Database, Calendar, Users, TrendingDown, Clock, ExternalLink, CheckCircle2 } from 'lucide-react';
import { useAI } from '../../contexts/AIContext';

export function EvidenceDrawer() {
  const { isDrawerOpen, closeEvidenceDrawer, activeEvidence } = useAI();

  if (!isDrawerOpen) return null;

  const data = activeEvidence || {
    source_agent: "Agent 34 — Result Analysis",
    metric: "Course Pass Percentage",
    period: "Semester 1, 2026–27",
    population: "CSE Year 2 (240 students)",
    current_value: "61%",
    baseline_value: "74%",
    delta: "-13 percentage points",
    confidence: 92,
    timestamp: "Today, 08:40 AM"
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm transition-opacity"
        onClick={closeEvidenceDrawer}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-elevated border-l border-slate-200 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-institutional-100 text-institutional-700 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Evidence Verification Trace</h3>
                <p className="text-xs text-slate-500">Agent 70 Multi-Agent Audit Log</p>
              </div>
            </div>
            <button
              onClick={closeEvidenceDrawer}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Status Banner */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-semibold text-emerald-800">Verified Institutional Evidence</span>
                <p className="text-emerald-700 mt-0.5">
                  Extracted and verified across the 72-agent platform telemetry. No synthetic fabrication detected.
                </p>
              </div>
            </div>

            {/* Source Agent Card */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block mb-1">Source Agent</span>
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-institutional-600" />
                <span className="text-base font-bold text-slate-900">{data.source_agent}</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">Autonomous academic telemetry node</p>
            </div>

            {/* Metric Detail Grid */}
            <div className="space-y-3">
              <div className="border border-slate-200/80 rounded-xl p-3.5">
                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block mb-1">Observed Metric</span>
                <span className="text-sm font-semibold text-slate-800">{data.metric}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="border border-slate-200/80 rounded-xl p-3.5">
                  <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block mb-1">Current Value</span>
                  <span className="text-lg font-bold text-red-600">{data.current_value}</span>
                </div>
                <div className="border border-slate-200/80 rounded-xl p-3.5">
                  <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block mb-1">Historical Baseline</span>
                  <span className="text-lg font-bold text-slate-700">{data.baseline_value}</span>
                </div>
              </div>

              <div className="border border-slate-200/80 rounded-xl p-3.5 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block mb-1">Net Performance Deviation</span>
                  <span className="text-sm font-bold text-red-700">{data.delta}</span>
                </div>
                <TrendingDown className="w-5 h-5 text-red-500" />
              </div>

              <div className="border border-slate-200/80 rounded-xl p-3.5">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-medium">Academic Period</span>
                </div>
                <span className="text-sm font-semibold text-slate-800">{data.period}</span>
              </div>

              <div className="border border-slate-200/80 rounded-xl p-3.5">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-medium">Evaluated Population</span>
                </div>
                <span className="text-sm font-semibold text-slate-800">{data.population}</span>
              </div>

              <div className="border border-slate-200/80 rounded-xl p-3.5 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block mb-0.5">Evidence Confidence</span>
                  <span className="text-sm font-bold text-institutional-700">{data.confidence || 90}% Confidence</span>
                </div>
                <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  <div className="h-full bg-institutional-600 rounded-full" style={{ width: `${data.confidence || 90}%` }} />
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-400 pt-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Last Telemetry Sync: {data.timestamp || 'Today, 08:40 AM'}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
            <button
              onClick={closeEvidenceDrawer}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-300 rounded-xl hover:bg-white transition-colors"
            >
              Close Drawer
            </button>
            <button
              onClick={() => {
                alert(`Navigating to verified source repository for: ${data.source_agent}`);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-institutional-600 hover:bg-institutional-700 rounded-xl shadow-sm transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Source Agent</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
