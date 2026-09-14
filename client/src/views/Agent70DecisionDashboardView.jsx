import React, { useState, useEffect } from 'react';
import { 
  Database, ShieldCheck, Layers, ArrowRight, Activity, RefreshCw, Zap, 
  CheckCircle2, AlertTriangle, AlertCircle, FileText, BarChart3, TrendingDown,
  TrendingUp, Users, Cpu, Clock, Send, Sparkles, BookOpen, Compass, Check
} from 'lucide-react';
import { api } from '../services/api';
import { useAI } from '../contexts/AIContext';

export function Agent70DecisionDashboardView() {
  const { openEvidenceDrawer, openDecisionModal } = useAI();
  const [loading, setLoading] = useState(true);
  const [pipelineData, setPipelineData] = useState(null);
  const [activeTab, setActiveTab] = useState('executive'); // 'executive' | 'priorities' | 'subagents' | 'correlations' | 'scenarios' | 'history' | 'dataset'
  const [selectedAgentId, setSelectedAgentId] = useState('agent_6');
  const [queryInput, setQueryInput] = useState('');
  const [queryLoading, setQueryLoading] = useState(false);
  const [queryConversation, setQueryConversation] = useState([
    {
      question: "Why is CS201 Data Structures ranked P1?",
      answer: "CS201 (Data Structures & Algorithms) is ranked P1 — Critical with a score of 94/100 because it represents the highest compound academic risk in the institution.\nEvidence from 5 sub-agents proves:\n1. Agent 6: Syllabus coverage is 18% delayed (67% vs 85% planned) in Dynamic Programming & Trees.\n2. Agent 11: Section B attendance has plummeted to 62%, placing 14 students below the statutory detention threshold.\n3. Agent 34: Section B failure rate reached 36%, with an 18% performance gap against Section A.\n4. Agent 59: Lead faculty Prof. Sunita Deshmukh carries an excessive 21 contact hours/week plus NBA coordination without teaching assistants.\n5. Agent 46: 9 grievances were filed regarding ambiguous lab evaluation rubrics.\nAgent 70 recommends deploying 2 PG Teaching Assistants and mobilizing a 6-hour weekend remedial problem-solving track, projected to restore pass rates to 82% (rescuing 22 students).",
      source: "Agent 70 Multi-Agent Reasoning Engine",
      sub_agents: ["Agent 6", "Agent 11", "Agent 34", "Agent 59", "Agent 46"]
    }
  ]);

  useEffect(() => {
    runPipeline();
  }, []);

  const runPipeline = async () => {
    setLoading(true);
    try {
      const res = await api.executePipeline();
      setPipelineData(res);
    } catch (err) {
      console.error('Failed to run pipeline:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAskQuestion = async (presetQuestion = null) => {
    const q = presetQuestion || queryInput;
    if (!q || !q.trim()) return;

    setQueryLoading(true);
    try {
      const res = await api.askAgent70DrillDown(q);
      setQueryConversation(prev => [
        {
          question: q,
          answer: res.answer,
          source: res.source,
          sub_agents: res.sub_agents_consulted
        },
        ...prev
      ]);
      if (!presetQuestion) setQueryInput('');
    } catch (err) {
      alert(`Query failed: ${err.message}`);
    } finally {
      setQueryLoading(false);
    }
  };

  const decision = pipelineData?.agent_70_decision_intelligence;
  const subAgents = pipelineData?.sub_agent_evidence || {};

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans pb-16">
      
      {/* 1. End-to-End Visual Data Flow Header */}
      <div className="bg-white rounded-3xl p-6 md:p-7 border border-slate-200/90 shadow-card space-y-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                End-to-End Orchestration Architecture
              </span>
              <span className="text-xs text-slate-400">• Part C.1 Detect-Decide-Act-Measure</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              Agent 70: Academic Decision Support Agent
            </h1>
            <p className="text-xs md:text-sm text-slate-500 mt-1 max-w-3xl leading-relaxed">
              Consolidated academic intelligence synthesized from the 100-entry dataset processed across 12 autonomous source sub-agents (Agents 6 through 69).
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={runPipeline}
              disabled={loading}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>{loading ? 'Processing Dataset...' : 'Re-Run Multi-Agent Pipeline'}</span>
            </button>
          </div>
        </div>

        {/* 5-Stage Visual Stepper */}
        <div className="pt-2 border-t border-slate-100">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5 text-center">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Stage 1</span>
              <span className="text-xs font-extrabold text-slate-800 block">100-Entry Dataset</span>
              <span className="text-[10px] text-slate-500">31 Extracted Columns</span>
            </div>

            <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 space-y-0.5">
              <span className="text-[10px] font-bold text-blue-600 uppercase">Stage 2</span>
              <span className="text-xs font-extrabold text-blue-900 block">12 Sub-Agents</span>
              <span className="text-[10px] text-blue-600">Scoped Domain Analysis</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Stage 3</span>
              <span className="text-xs font-extrabold text-slate-800 block">Evidence Registry</span>
              <span className="text-[10px] text-slate-500">Consolidated Outputs</span>
            </div>

            <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-200 space-y-0.5">
              <span className="text-[10px] font-bold text-indigo-600 uppercase">Stage 4</span>
              <span className="text-xs font-extrabold text-indigo-900 block">Agent 70 Engine</span>
              <span className="text-[10px] text-indigo-600">Cross-Agent Reasoning</span>
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-0.5 col-span-2 md:col-span-1">
              <span className="text-[10px] font-bold text-emerald-600 uppercase">Stage 5</span>
              <span className="text-xs font-extrabold text-emerald-900 block">Decision Dashboard</span>
              <span className="text-[10px] text-emerald-700">P1-P4 Action Queue</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200">
        {[
          { id: 'executive', label: 'Executive Decision' },
          { id: 'priorities', label: 'P1–P4 Ranked Priorities' },
          { id: 'subagents', label: '12 Sub-Agent Outputs' },
          { id: 'correlations', label: 'Cross-Agent Correlations' },
          { id: 'scenarios', label: 'Scenario Simulator (A–E)' },
          { id: 'history', label: 'Historical Learning' },
          { id: 'query', label: 'Follow-Up Q&A Terminal' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 2. TAB: EXECUTIVE DECISION */}
      {activeTab === 'executive' && decision && (
        <div className="space-y-6 animate-fadeIn">
          {/* Executive Overview Banner */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-card space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-red-100 text-red-700 border border-red-200">
                {decision.risk_level}
              </span>
              <span className="text-xs font-bold text-slate-400">
                Confidence: {decision.confidence_level}%
              </span>
            </div>

            <h2 className="text-xl md:text-2xl font-black text-slate-900 leading-snug">
              {decision.decision_question}
            </h2>

            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100 font-medium">
              <strong>Executive Summary:</strong> {decision.executive_summary}
            </p>

            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-900 space-y-1">
              <span className="text-[11px] font-extrabold uppercase tracking-wider block text-amber-800">
                Key Diagnostic Finding
              </span>
              <p className="text-xs leading-relaxed font-semibold">
                {decision.key_finding}
              </p>
            </div>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-sm text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Target Entity</span>
                <span className="text-sm font-black text-slate-900">{decision.affected_entities.primary_course}</span>
                <span className="text-[10px] text-slate-500 block">{decision.affected_entities.primary_section}</span>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-sm text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Students Affected</span>
                <span className="text-xl font-black text-red-600">{decision.affected_entities.total_students_affected}</span>
                <span className="text-[10px] text-slate-500 block">12 at severe risk</span>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-sm text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Expected Pass Gain</span>
                <span className="text-xl font-black text-emerald-600">+21 pp</span>
                <span className="text-[10px] text-slate-500 block">61% → 82%</span>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-sm text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Lead Time</span>
                <span className="text-sm font-black text-blue-600">48 Hours</span>
                <span className="text-[10px] text-slate-500 block">Immediate Mobilization</span>
              </div>
            </div>

            {/* Recommended Action Box */}
            <div className="bg-blue-50/80 border-2 border-blue-200 rounded-2xl p-5 space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-blue-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                Primary Recommended Intervention
              </span>
              <p className="text-sm font-bold text-slate-900">
                {decision.recommended_action.primary}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-blue-900 pt-1">
                <div><strong>Resources:</strong> {decision.recommended_action.resource_requirement}</div>
                <div><strong>Timeline:</strong> {decision.recommended_action.expected_implementation_time}</div>
                <div><strong>Projected Impact:</strong> {decision.recommended_action.expected_impact}</div>
              </div>
            </div>

            {/* Part C.5 Human Approval Gate Button */}
            <div className="pt-2 flex items-center justify-between flex-wrap gap-3">
              <div className="text-xs text-slate-500">
                <span>Approval Authority: <strong>{decision.human_decision_required.approval_authority}</strong></span>
              </div>
              <button
                onClick={() => openDecisionModal({
                  course_name: decision.affected_entities.primary_course,
                  department: decision.affected_entities.department,
                  priority_level: decision.risk_level,
                  recommended_action: decision.recommended_action.primary
                })}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Execute Human Approval Gate (Part C.5)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. TAB: P1 TO P4 RANKED PRIORITIES */}
      {activeTab === 'priorities' && decision && (
        <div className="space-y-4 animate-fadeIn">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-slate-900">Ranked Priority Action Queue (P1–P4)</h2>
              <p className="text-xs text-slate-500">Ordered by multi-factor score: Academic Impact (25%), Affected Cohort (20%), Severity (15%), Urgency (10%), Feasibility (10%).</p>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              {decision.ranked_priorities.length} Ranked Issues
            </span>
          </div>

          <div className="space-y-4">
            {decision.ranked_priorities.map((item, idx) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-4 hover:border-blue-400 transition-all"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-slate-900 text-white font-black text-sm flex items-center justify-center">
                      #{idx + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-extrabold text-slate-900">{item.title}</h3>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                          item.priority_level.includes('P1') ? 'bg-red-100 text-red-700 border border-red-200' :
                          item.priority_level.includes('P2') ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                          'bg-slate-100 text-slate-700 border border-slate-200'
                        }`}>
                          {item.priority_level}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500">{item.target_entity} • {item.department}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Priority Score</span>
                      <span className="text-xl font-black text-blue-600">{item.priority_score}/100</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-400 uppercase text-[10px] block">Primary Risk Driver</span>
                    <p className="font-semibold text-slate-800">{item.primary_driver}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200 space-y-1">
                    <span className="font-bold text-blue-800 uppercase text-[10px] block">Recommended Intervention</span>
                    <p className="font-semibold text-slate-900">{item.recommended_action}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 flex-wrap gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-semibold text-slate-400">Detected By:</span>
                    {item.detected_by_agents.map((ag, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold text-[10px]">
                        {ag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <span>Students Affected: <strong className="text-slate-900">{item.students_affected_count}</strong></span>
                    <span>Timeline: <strong className="text-blue-700">{item.implementation_time}</strong></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. TAB: 12 SUB-AGENTS EVIDENCE GRID */}
      {activeTab === 'subagents' && (
        <div className="space-y-5 animate-fadeIn">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-slate-900">12 Autonomous Sub-Agents Evidence Registry</h2>
              <p className="text-xs text-slate-500">Each sub-agent analyzed only its scoped fields from the 100-entry dataset, outputting verified metrics for Agent 70.</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              12/12 Agents Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Object.values(subAgents).map((ag) => (
              <div
                key={ag.agent_id}
                className="bg-white rounded-3xl p-5 border border-slate-200 shadow-card flex flex-col justify-between space-y-4 hover:border-blue-400 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wider block">{ag.domain}</span>
                      <h3 className="text-sm font-extrabold text-slate-900">{ag.agent_name}</h3>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {ag.pdf_reference}
                    </span>
                  </div>

                  {/* Scoped Fields Analyzed */}
                  <div className="py-2 space-y-1 text-xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Analyzed Fields (Scoped)</span>
                    <div className="flex flex-wrap gap-1">
                      {(ag.analyzed_fields || []).slice(0, 4).map((f, i) => (
                        <span key={i} className="text-[10px] font-mono px-1.5 py-0.5 bg-slate-50 border border-slate-200 rounded text-slate-600">
                          {f}
                        </span>
                      ))}
                      {ag.analyzed_fields?.length > 4 && (
                        <span className="text-[10px] text-slate-400">+{ag.analyzed_fields.length - 4} more</span>
                      )}
                    </div>
                  </div>

                  {/* Key Finding Snippet */}
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed font-medium">
                    {ag.findings?.[0] || 'Autonomous evidence captured and synchronized.'}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => openEvidenceDrawer({
                    agentId: ag.agent_id,
                    source_agent: ag.agent_name,
                    metric: ag.domain,
                    current_value: 'Active',
                    confidence: 94
                  })}
                  className="w-full py-2 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-bold text-xs rounded-xl border border-slate-200 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Inspect Telemetry Drawer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. TAB: CROSS-AGENT CORRELATIONS */}
      {activeTab === 'correlations' && decision && (
        <div className="space-y-4 animate-fadeIn">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-base font-extrabold text-slate-900">Cross-Agent Multi-Signal Correlation Matrix</h2>
            <p className="text-xs text-slate-500">Agent 70 synthesizes intersecting signals across sub-agents to discover systemic institutional bottlenecks that no single agent can detect alone.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {decision.cross_agent_analysis.map((corr) => (
              <div
                key={corr.correlation_id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-3"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="font-extrabold text-xs text-blue-600 uppercase">{corr.correlation_id}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                    corr.severity === 'CRITICAL' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {corr.severity}
                  </span>
                </div>

                <h3 className="text-sm font-extrabold text-slate-900">{corr.title}</h3>
                <p className="text-xs text-slate-700 leading-relaxed">{corr.description}</p>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <span className="font-bold text-slate-400 text-[10px] uppercase block">Synthesized Root Cause</span>
                  <span className="font-semibold text-slate-900">{corr.root_cause_driver}</span>
                </div>

                <div className="flex items-center gap-1.5 pt-1">
                  <span className="text-[10px] text-slate-400 font-bold">Sub-Agents:</span>
                  {corr.sub_agents_involved.map((a, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. TAB: SCENARIOS SIMULATOR (A THROUGH E) */}
      {activeTab === 'scenarios' && decision && (
        <div className="space-y-4 animate-fadeIn">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-slate-900">5-Scenario Comparative Analysis Engine</h2>
              <p className="text-xs text-slate-500">Evaluates Scenarios A through E across pass rate deltas, students rescued, resource requirements, and implementation risk.</p>
            </div>
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Scenario E Recommended
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {decision.scenario_comparison.map((sc) => (
              <div
                key={sc.scenario_id}
                className={`bg-white rounded-3xl p-6 border shadow-card flex flex-col justify-between space-y-4 transition-all ${
                  sc.scenario_id === 'E' ? 'border-2 border-blue-500 ring-2 ring-blue-500/20' : 'border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-slate-900 text-white">
                      Scenario {sc.scenario_id}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      sc.expected_pass_rate_delta_pp > 0 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                      {sc.expected_pass_rate_delta_pp > 0 ? `+${sc.expected_pass_rate_delta_pp} pp` : `${sc.expected_pass_rate_delta_pp} pp`}
                    </span>
                  </div>

                  <h3 className="text-sm font-extrabold text-slate-900 mt-2">{sc.name}</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{sc.description}</p>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-3">
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <span className="text-slate-400 text-[10px] uppercase font-bold block">Projected Pass Rate</span>
                      <span className="text-base font-black text-slate-900">{sc.projected_pass_rate_pct}%</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <span className="text-slate-400 text-[10px] uppercase font-bold block">Students Saved</span>
                      <span className="text-base font-black text-emerald-600">{sc.students_saved}</span>
                    </div>
                  </div>

                  <div className="space-y-1 text-[11px] text-slate-600 pt-2">
                    <div><strong>Resources:</strong> {sc.resource_requirement}</div>
                    <div><strong>Timeline:</strong> {sc.implementation_time}</div>
                    <div><strong>Risk:</strong> <span className="font-bold">{sc.risk_level}</span></div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-700">
                  <strong>Outcome:</strong> {sc.expected_outcome}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. TAB: HISTORICAL LEARNING */}
      {activeTab === 'history' && decision && (
        <div className="space-y-4 animate-fadeIn">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-base font-extrabold text-slate-900">Historical Learning & Intervention Effectiveness Hub</h2>
            <p className="text-xs text-slate-500">Institutional memory from previous cohorts validating what interventions succeeded in practice.</p>
          </div>

          <div className="space-y-4">
            {decision.historical_evidence.map((hist) => (
              <div
                key={hist.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-3"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-xs text-blue-600">{hist.course}</span>
                    <span className="text-xs text-slate-400">• {hist.applied_cohort}</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {hist.effectiveness_rating}
                  </span>
                </div>

                <h3 className="text-sm font-extrabold text-slate-900">{hist.previous_intervention}</h3>

                <div className="grid grid-cols-3 gap-3 text-xs text-center py-1">
                  <div className="p-2 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Pre-Intervention</span>
                    <span className="text-base font-black text-slate-800">{hist.before_intervention_pass_rate}%</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Post-Intervention</span>
                    <span className="text-base font-black text-emerald-600">{hist.after_intervention_pass_rate}%</span>
                  </div>
                  <div className="p-2 bg-emerald-50 rounded-xl border border-emerald-200">
                    <span className="text-emerald-700 text-[10px] uppercase font-bold block">Measured Gain</span>
                    <span className="text-base font-black text-emerald-700">+{hist.improvement_delta_pp} pp</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-200 text-xs text-blue-900">
                  <strong>Institutional Lesson Learned:</strong> {hist.lessons_learned}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 8. TAB: INTERACTIVE FOLLOW-UP Q&A TERMINAL */}
      {activeTab === 'query' && (
        <div className="space-y-5 animate-fadeIn">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-card space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <h2 className="text-base font-extrabold text-slate-900">Agent 70 Interactive Drill-Down Terminal</h2>
            </div>
            <p className="text-xs text-slate-500">
              Ask follow-up questions to examine the evidence, root causes, affected student cohorts, or simulate what-if scenarios.
            </p>

            {/* 1-Click Suggested Questions */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Suggested Decision Inquiries
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  "Why is this course ranked P1?",
                  "Show the students affected.",
                  "Which sub-agent provided this evidence?",
                  "Why do you recommend this intervention?",
                  "What if we improve attendance to 80%?",
                  "What if we conduct remedial classes?",
                  "Show historical interventions for this course."
                ].map((sq, i) => (
                  <button
                    key={i}
                    onClick={() => handleAskQuestion(sq)}
                    className="px-3 py-1.5 rounded-full bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-semibold text-xs border border-slate-200 transition-colors cursor-pointer"
                  >
                    {sq}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <div className="flex gap-2 pt-2">
              <input
                type="text"
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAskQuestion()}
                placeholder="Type your inquiry for Agent 70 (e.g., Why is Section B attendance collapsing?)..."
                className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => handleAskQuestion()}
                disabled={queryLoading}
                className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{queryLoading ? 'Reasoning...' : 'Ask Agent 70'}</span>
              </button>
            </div>
          </div>

          {/* Conversation Stream */}
          <div className="space-y-4">
            {queryConversation.map((conv, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs">
                    Q
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm">{conv.question}</h3>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-800 leading-relaxed whitespace-pre-line font-medium">
                  {conv.answer}
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-100">
                  <span>Reasoning Engine: <strong>{conv.source}</strong></span>
                  {conv.sub_agents && (
                    <div className="flex items-center gap-1">
                      <span>Evidence:</span>
                      {conv.sub_agents.map((ag, i) => (
                        <span key={i} className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                          {ag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

export default Agent70DecisionDashboardView;
