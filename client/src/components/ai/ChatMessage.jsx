import React from 'react';
import { 
  Bot, User, Sparkles, AlertCircle, CheckCircle2, 
  ArrowRight, ShieldCheck, ChevronRight, FileText, 
  Sliders, Target, HelpCircle, Layers, Gauge
} from 'lucide-react';
import { PriorityBadge } from '../common/PriorityBadge';
import { AgentBadge } from '../common/AgentBadge';
import { PipelineIndicator } from './PipelineIndicator';
import { useAI } from '../../contexts/AIContext';
import { useNavigate } from 'react-router-dom';

export function ChatMessage({ message, onFollowUpSelect }) {
  const { openDecisionModal, openBriefModal } = useAI();
  const navigate = useNavigate();

  const isUser = message.sender === 'user';

  if (isUser) {
    return (
      <div className="flex justify-end gap-3 max-w-3xl ml-auto">
        <div className="bg-institutional-600 text-white rounded-2xl rounded-tr-xs p-4 shadow-subtle">
          <p className="text-sm font-medium leading-relaxed">{message.content}</p>
        </div>
        <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0">
          <User className="w-4 h-4" />
        </div>
      </div>
    );
  }

  // AI Response Card
  const data = message.data || {};
  const provider = message.provider || 'Demo AI Mode';
  const confidence = data.confidence || 88;

  return (
    <div className="flex items-start gap-3.5 max-w-4xl mr-auto w-full">
      {/* AURA Avatar */}
      <div className="w-9 h-9 rounded-2xl bg-institutional-600 text-white flex items-center justify-center shadow-md shadow-institutional-500/20 shrink-0 mt-1">
        <Bot className="w-5 h-5" />
      </div>

      <div className="flex-1 space-y-4 overflow-hidden">
        {/* Main Response Box */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card p-6 md:p-7 space-y-6">
          {/* Header & Provider Attribution */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900 tracking-tight">AURA Decision Intelligence</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-institutional-50 text-institutional-700 border border-institutional-200">
                Agent 70
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Answered by <strong>{provider}</strong></span>
              </span>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-1 text-institutional-700 font-semibold">
                <Gauge className="w-3.5 h-3.5 text-institutional-600" />
                <span>{confidence}% Confidence</span>
              </div>
            </div>
          </div>

          {/* 10-Step Pipeline Visualizer */}
          <PipelineIndicator
            steps={data.analysis_decomposition}
            sourcesUsed={data.evidence?.map(e => e.source_agent)}
          />

          {/* Executive Answer */}
          <div className="bg-slate-50/80 rounded-2xl p-4 md:p-5 border border-slate-200/70">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Executive Institutional Summary
            </span>
            <p className="text-sm md:text-base font-semibold text-slate-900 leading-relaxed">
              {data.executive_answer || message.content}
            </p>
          </div>

          {/* Priority Ranking Table */}
          {data.priority_ranking && data.priority_ranking.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Priority Ranking & Issues
                </span>
                <span className="text-[11px] text-slate-400">Sorted by Explainable Priority Score</span>
              </div>
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3">Rank</th>
                      <th className="p-3">Course / Cohort</th>
                      <th className="p-3 text-center">Priority</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Core Diagnostic Issue</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {data.priority_ranking.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-3 font-bold text-slate-900 font-mono">#{item.rank}</td>
                        <td className="p-3">
                          <span className="font-bold text-slate-900 block">{item.item}</span>
                          {item.metric_change && (
                            <span className="text-[11px] text-slate-500">{item.metric_change}</span>
                          )}
                        </td>
                        <td className="p-3 text-center font-mono font-bold text-slate-800">
                          {item.priority_score}
                        </td>
                        <td className="p-3">
                          <PriorityBadge status={item.severity || 'Critical'} size="sm" />
                        </td>
                        <td className="p-3 text-slate-600 max-w-xs">{item.main_issue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Driver Diagnosis Card */}
          {data.driver_diagnosis && (
            <div className="bg-institutional-50/50 border border-institutional-100 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-institutional-600" />
                  <span className="text-xs font-bold text-institutional-900 uppercase tracking-wider">
                    Diagnostic Driver Analysis
                  </span>
                </div>
                <span className="text-xs font-bold text-institutional-700 bg-white px-2.5 py-0.5 rounded-full border border-institutional-200">
                  {data.driver_diagnosis.confidence}% Diagnostic Confidence
                </span>
              </div>
              <div className="bg-white rounded-xl p-3.5 border border-institutional-100 shadow-2xs">
                <span className="text-xs font-bold text-slate-900 block mb-1">
                  Primary Driver: <span className="text-institutional-700">{data.driver_diagnosis.primary_driver}</span>
                </span>
                <div className="space-y-1.5 mt-2">
                  {(data.driver_diagnosis.factors || []).map((f, i) => (
                    <div key={i} className="flex items-start justify-between text-xs text-slate-600 gap-2">
                      <span className="font-medium text-slate-800">{f.factor}:</span>
                      <span className="text-slate-500 text-right flex-1">{f.evidence}</span>
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 shrink-0">
                        {f.impact} Impact
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Why? (Analytical Explanations) */}
          {data.why && data.why.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Why This Matters (Root Cause Analysis)
              </span>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {data.why.map((reason, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-institutional-600 shrink-0 mt-1.5" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Evidence Pills */}
          {data.evidence && data.evidence.length > 0 && (
            <div className="space-y-2 pt-1 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Evidence Traceability (Click to inspect source)
                </span>
                <span className="text-[10px] text-slate-400">12-Agent Synchronized</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.evidence.map((ev, i) => (
                  <AgentBadge key={i} source={ev} metric={ev.metric} />
                ))}
              </div>
            </div>
          )}

          {/* Authoritative Recommendations */}
          {data.recommendations && data.recommendations.length > 0 && (
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                Recommended Academic Interventions
              </span>
              <div className="space-y-2.5">
                {data.recommendations.map((rec, idx) => (
                  <div key={idx} className="bg-emerald-50/40 border border-emerald-200/70 rounded-2xl p-4 space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-xs font-bold text-slate-900 block">{rec.action}</span>
                          <p className="text-xs text-slate-600 mt-0.5">{rec.why}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 shrink-0">
                        {rec.feasibility || 'High'} Feasibility
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-emerald-100/80 text-[11px]">
                      <div>
                        <span className="text-slate-400 block">Expected Effect</span>
                        <span className="font-bold text-emerald-800">{rec.expected_effect}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Required Resources</span>
                        <span className="font-medium text-slate-700">{rec.resources_needed || 'Standard Faculty Load'}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Target Audience</span>
                        <span className="font-medium text-slate-700">{rec.target_group || 'At-risk Cohort'}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analytical Limitations & Assumptions */}
          {data.limitations && data.limitations.length > 0 && (
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/70 flex items-start gap-2 text-xs text-slate-500">
              <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-700">Analytical Limitations: </span>
                <span>{data.limitations.join(' ')}</span>
              </div>
            </div>
          )}

          {/* Action Bar (Record Decision / Export Brief / Scenario Simulator) */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => openDecisionModal({
                  title: data.recommendations?.[0]?.action || "Execute Academic Intervention",
                  issue: data.executive_answer,
                  chosen_action: data.recommendations?.[0]?.action || "Launch targeted remedial support."
                })}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-institutional-600 hover:bg-institutional-700 rounded-xl shadow-xs transition-all"
              >
                <Target className="w-3.5 h-3.5" />
                <span>Create Formal Decision</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/scenarios')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
              >
                <Sliders className="w-3.5 h-3.5 text-institutional-600" />
                <span>Simulate in Scenario Explorer</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => openBriefModal({
                question: message.question || "Academic Intelligence Analysis",
                executive_answer: data.executive_answer,
                confidence,
                priority_ranking: data.priority_ranking,
                recommendations: data.recommendations,
                evidence: data.evidence,
                limitations: data.limitations
              })}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              <span>Export Decision Brief</span>
            </button>
          </div>
        </div>

        {/* Suggested Follow-up Prompts */}
        {data.follow_up_questions && data.follow_up_questions.length > 0 && (
          <div className="space-y-1.5 pl-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Suggested Contextual Follow-up Inquiries
            </span>
            <div className="flex flex-wrap gap-2">
              {data.follow_up_questions.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onFollowUpSelect && onFollowUpSelect(q)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white text-institutional-800 border border-institutional-200 hover:border-institutional-400 hover:bg-institutional-50/60 shadow-2xs transition-all text-left"
                >
                  <span>{q}</span>
                  <ChevronRight className="w-3 h-3 text-institutional-400" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
