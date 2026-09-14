import React, { useState, useEffect } from 'react';
import { 
  X, ShieldCheck, Database, Calendar, Users, TrendingDown, Clock, 
  ExternalLink, CheckCircle2, Play, RefreshCw, Cpu, FileText, AlertTriangle,
  Layers, ArrowRight, Zap, Code, BarChart3, Check
} from 'lucide-react';
import { useAI } from '../../contexts/AIContext';
import { api } from '../../services/api';

export function EvidenceDrawer() {
  const { isDrawerOpen, closeEvidenceDrawer, activeEvidence } = useAI();
  const [activeTab, setActiveTab] = useState('telemetry'); // 'telemetry' | 'specs' | 'ingest'
  const [agentDetail, setAgentDetail] = useState(null);
  const [loadingAgent, setLoadingAgent] = useState(false);
  const [selectedSampleIdx, setSelectedSampleIdx] = useState(0);
  const [jsonPayloadText, setJsonPayloadText] = useState('');
  const [isIngesting, setIsIngesting] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [ingestSuccess, setIngestSuccess] = useState(false);
  const [jsonError, setJsonError] = useState(null);

  const [subAgentDetail, setSubAgentDetail] = useState(null);

  // Extract agent ID
  const agentId = activeEvidence?.agentId || activeEvidence?.id || (activeEvidence?.agent && activeEvidence.agent.id);

  // Fetch full agent spec and live packets whenever drawer opens or agentId changes
  useEffect(() => {
    if (isDrawerOpen && agentId) {
      if (activeEvidence?.subAgent) {
        setSubAgentDetail(activeEvidence.subAgent);
      }
      loadAgentData(agentId);
    } else if (isDrawerOpen && activeEvidence) {
      // Fallback if generic evidence object
      setAgentDetail(null);
      setSubAgentDetail(activeEvidence?.subAgent || null);
      setAnalysisResult(null);
    }
  }, [isDrawerOpen, agentId, activeEvidence]);

  const loadAgentData = async (id) => {
    setLoadingAgent(true);
    try {
      const [res, subRes] = await Promise.allSettled([
        api.getAgentDetail(id),
        api.getSubAgentDetail(id)
      ]);
      if (res.status === 'fulfilled' && res.value?.agent) {
        setAgentDetail(res.value.agent);
        if (res.value.agent.sample_inputs && res.value.agent.sample_inputs.length > 0) {
          setSelectedSampleIdx(0);
          setJsonPayloadText(JSON.stringify(res.value.agent.sample_inputs[0].payload, null, 2));
        }
      }
      if (subRes.status === 'fulfilled' && subRes.value?.subAgent) {
        setSubAgentDetail(subRes.value.subAgent);
      }
    } catch (err) {
      console.warn('Could not fetch full agent spec:', err);
    } finally {
      setLoadingAgent(false);
    }
  };

  const handleSelectSample = (index) => {
    setSelectedSampleIdx(index);
    if (agentDetail?.sample_inputs?.[index]) {
      setJsonPayloadText(JSON.stringify(agentDetail.sample_inputs[index].payload, null, 2));
      setJsonError(null);
    }
  };

  const handleIngestTelemetry = async () => {
    let parsedPayload;
    try {
      parsedPayload = JSON.parse(jsonPayloadText);
      setJsonError(null);
    } catch (e) {
      setJsonError('Invalid JSON format. Please verify your payload syntax.');
      return;
    }

    setIsIngesting(true);
    setIngestSuccess(false);

    try {
      const sampleLabel = agentDetail?.sample_inputs?.[selectedSampleIdx]?.label || 'Manual Telemetry Ingestion';
      const targetAgentId = agentDetail?.id || agentId;
      
      const response = await api.ingestAgentTelemetry(targetAgentId, parsedPayload, sampleLabel);
      
      if (response?.success) {
        setAnalysisResult(response.analysis);
        setIngestSuccess(true);
        // Refresh agent data so latest metrics and packet history are updated
        await loadAgentData(targetAgentId);
      }
    } catch (err) {
      alert(`Telemetry ingestion failed: ${err.message}`);
    } finally {
      setIsIngesting(false);
    }
  };

  if (!isDrawerOpen) return null;

  // Render values from live agent detail if available, else from activeEvidence
  const agent = agentDetail || activeEvidence?.agent;
  const metrics = agent?.current_metrics || {};

  const sourceTitle = agent?.name 
    ? `${agent.name} — ${agent.title}` 
    : (activeEvidence?.source_agent || "Agent 70 Source Telemetry");

  const observedMetric = metrics.metric_name || activeEvidence?.metric || "Live Institutional Telemetry";
  const currentValue = metrics.current_value || activeEvidence?.current_value || "Active";
  const baselineValue = metrics.baseline_value || activeEvidence?.baseline_value || "Historical Norm";
  const deltaValue = metrics.delta || activeEvidence?.delta || "0%";
  const confidenceValue = metrics.confidence || activeEvidence?.confidence || 92;
  const freshnessText = agent?.freshness || activeEvidence?.timestamp || "Real-time sync";

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity animate-fadeIn"
        onClick={closeEvidenceDrawer}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-2xl bg-white shadow-2xl border-l border-slate-200 flex flex-col animate-slideLeft">
          
          {/* Top Header */}
          <div className="px-6 py-4 border-b border-slate-200 bg-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-black text-sm border border-blue-200">
                {agent?.name ? agent.name.replace('Agent ', 'A') : 'A70'}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-slate-900 text-base">{sourceTitle}</h3>
                  {agent?.pdf_page && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                      PDF p. {agent.pdf_page}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Agent 70 Telemetry Explorer • {agent?.domain || "Cross-Domain Intelligence"}</span>
                </p>
              </div>
            </div>

            <button
              onClick={closeEvidenceDrawer}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              title="Close Drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="px-6 border-b border-slate-200 bg-slate-50/70 flex items-center gap-2">
            <button
              onClick={() => setActiveTab('telemetry')}
              className={`py-3 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'telemetry'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <ActivityIcon className="w-4 h-4" />
              <span>Live Telemetry & Metrics</span>
            </button>

            <button
              onClick={() => setActiveTab('specs')}
              className={`py-3 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'specs'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>PDF Specification & Workflow</span>
            </button>

            <button
              onClick={() => setActiveTab('ingest')}
              className={`py-3 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'ingest'
                  ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Sample Ingestion & Real-Time Analysis</span>
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
            
            {/* Real-Time Analysis Result Card (shown prominently when analysis has executed) */}
            {analysisResult && (
              <div className="bg-blue-50/70 border-2 border-blue-300 rounded-2xl p-5 space-y-4 shadow-md animate-fadeIn">
                <div className="flex items-center justify-between pb-3 border-b border-blue-200">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping" />
                    <span className="font-extrabold text-blue-900 text-xs uppercase tracking-wider">
                      Real-Time Analysis Engine Output
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-blue-700 bg-white px-2.5 py-1 rounded-full border border-blue-200">
                    Packet #{analysisResult.packet_id}
                  </span>
                </div>

                {/* Score Shift & Target Course */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-white rounded-xl p-3.5 border border-blue-100 shadow-sm">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Affected Course & Section
                    </span>
                    <span className="text-sm font-bold text-slate-900">
                      {analysisResult.target_course} ({analysisResult.affected_section || 'All Sections'})
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-0.5">
                      Status: <span className="font-bold text-amber-700">{analysisResult.variance_shift?.status || metrics.status || 'Updated'}</span>
                    </span>
                  </div>

                  <div className="bg-white rounded-xl p-3.5 border border-blue-100 shadow-sm flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                        Priority Score Shift
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-black text-slate-400 line-through">
                          {analysisResult.priority_score_delta?.before || 91}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-blue-500" />
                        <span className="text-2xl font-black text-blue-600">
                          {analysisResult.priority_score_delta?.after || 94}
                        </span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 text-xs font-black rounded-lg bg-red-100 text-red-700 border border-red-200">
                      +{analysisResult.priority_score_delta?.shift || 3} Pts
                    </span>
                  </div>
                </div>

                {/* Executive Recommendation from PDF C.1/C.3 */}
                <div className="bg-white rounded-xl p-4 border border-blue-200 shadow-sm space-y-1.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-800 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    Agent 70 Executive Recommendation (Orchestration C.1)
                  </span>
                  <p className="text-xs font-semibold text-slate-800 leading-relaxed">
                    {analysisResult.agent_70_recommendation}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] text-blue-700 pt-1">
                  <span>Audit Trail: {analysisResult.audit_log}</span>
                  <span className="font-bold text-emerald-700 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> State Synchronized
                  </span>
                </div>
              </div>
            )}

            {/* TAB 1: LIVE TELEMETRY & METRICS */}
            {activeTab === 'telemetry' && (
              <div className="space-y-5 animate-fadeIn">
                {/* Status Indicator */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-emerald-900 text-xs">
                        {subAgentDetail ? `Sub-Agent ${subAgentDetail.agentId || agentId}: Execution Completed` : 'Autonomous Telemetry Feed Active'}
                      </h4>
                      <p className="text-xs text-emerald-700 mt-0.5">
                        {subAgentDetail ? `${subAgentDetail.recordsAnalyzed || 100} student records processed directly from academicDataset100.json.` : 'Continuous ingestion across institutional ERP, LMS, Biometric, and Examination logs.'}
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white text-emerald-800 border border-emerald-300">
                    {subAgentDetail ? 'Status: Completed' : 'Sync Normal'}
                  </span>
                </div>

                {/* Sub-Agent Execution Output Card (Real Pipeline Data) */}
                {subAgentDetail && (
                  <div className="border border-blue-200 bg-white rounded-2xl p-5 space-y-4 shadow-sm">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-blue-600" />
                        <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
                          Agent {subAgentDetail.agentId} Structured Output (Real Pipeline)
                        </h4>
                      </div>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                        {subAgentDetail.recordsAnalyzed || 100} Records Analyzed
                      </span>
                    </div>

                    {subAgentDetail.findings?.length > 0 && (
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                          Calculated Findings ({subAgentDetail.findings.length})
                        </span>
                        <div className="space-y-1">
                          {subAgentDetail.findings.map((f, i) => (
                            <div key={i} className="text-xs text-slate-700 font-medium flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                              <span className="text-blue-600 font-black shrink-0">•</span>
                              <span>{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {subAgentDetail.risks?.length > 0 && (
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700 block">
                          Identified Academic Risks ({subAgentDetail.risks.length})
                        </span>
                        <div className="space-y-1">
                          {subAgentDetail.risks.map((r, i) => (
                            <div key={i} className="text-xs text-amber-900 font-medium flex items-start gap-2 bg-amber-50/70 p-2.5 rounded-xl border border-amber-100">
                              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                              <span>{r}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {subAgentDetail.recommendations?.length > 0 && (
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 block">
                          Actionable Recommendations ({subAgentDetail.recommendations.length})
                        </span>
                        <div className="space-y-1">
                          {subAgentDetail.recommendations.map((rec, i) => (
                            <div key={i} className="text-xs text-emerald-900 font-medium flex items-start gap-2 bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-100">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{rec}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Main Metrics Card */}
                <div className="border border-slate-200 rounded-2xl p-5 space-y-4 bg-slate-50/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Observed Metric
                      </span>
                      <h4 className="text-base font-bold text-slate-900">{observedMetric}</h4>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Confidence
                      </span>
                      <span className="text-xs font-black text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        {confidenceValue}% Confidence
                      </span>
                    </div>
                  </div>

                  {/* 3 Metric Boxes */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm text-center">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Current Value</span>
                      <span className="text-lg font-black text-red-600">{currentValue}</span>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm text-center">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Baseline Norm</span>
                      <span className="text-lg font-bold text-slate-700">{baselineValue}</span>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm text-center">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Net Deviation</span>
                      <span className="text-lg font-black text-red-700">{deltaValue}</span>
                    </div>
                  </div>

                  {/* Context Items */}
                  <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                    <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                      <span className="text-slate-400 block text-[10px] font-bold uppercase">Target Entity</span>
                      <span className="font-bold text-slate-800">{metrics.target_course || "Institutional Cohort"}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                      <span className="text-slate-400 block text-[10px] font-bold uppercase">Diagnostic Status</span>
                      <span className="font-bold text-amber-700">{metrics.status || "Operational"}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-200">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Telemetry Freshness: {freshnessText}</span>
                    </div>
                    <span>Orchestration Layer: Agent 70</span>
                  </div>
                </div>

                {/* Packet Ingestion History */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <Database className="w-3.5 h-3.5 text-blue-600" />
                      Recent Ingested Telemetry Packets ({agentDetail?.history_logs?.length || 0})
                    </h4>
                  </div>

                  {(!agentDetail?.history_logs || agentDetail.history_logs.length === 0) ? (
                    <div className="text-center py-6 border border-dashed border-slate-200 rounded-xl bg-slate-50 text-slate-400 text-xs">
                      No external packets ingested yet for this agent. Switch to the Ingestion tab to simulate a sample packet!
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {agentDetail.history_logs.map((pkt) => (
                        <div key={pkt.packet_id} className="p-3 bg-white border border-slate-200 rounded-xl shadow-sm text-xs space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900">{pkt.label}</span>
                            <span className="text-[10px] text-slate-400 font-mono">{pkt.display_time}</span>
                          </div>
                          <pre className="text-[11px] bg-slate-50 p-2 rounded-lg text-slate-600 overflow-x-auto border border-slate-100 font-mono">
                            {JSON.stringify(pkt.payload, null, 2)}
                          </pre>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Action button to switch tab */}
                <div className="pt-2">
                  <button
                    onClick={() => setActiveTab('ingest')}
                    className="w-full py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-xl border border-blue-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <Zap className="w-4 h-4 text-amber-600" />
                    <span>Test Ingestion with Sample Inputs for {agent?.name || 'this Agent'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: PDF SPECIFICATIONS & WORKFLOW */}
            {activeTab === 'specs' && (
              <div className="space-y-5 animate-fadeIn text-xs">
                {/* PDF Citation Banner */}
                <div className="bg-slate-900 text-white rounded-2xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-400" />
                    <div>
                      <h4 className="font-bold text-white text-xs">Part B — Agent Catalogue (Page {agent?.pdf_page || 'N/A'})</h4>
                      <p className="text-[11px] text-slate-300">
                        Official specification extracted from institutional platform architecture documentation.
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-slate-800 text-[10px] font-bold text-blue-300 border border-slate-700">
                    Agent {agent?.number} Spec
                  </span>
                </div>

                {/* Purpose */}
                <div className="border border-slate-200 rounded-xl p-4 space-y-1.5 bg-slate-50/50">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Purpose</span>
                  <p className="text-slate-800 leading-relaxed font-medium">
                    {agent?.purpose || "Provides autonomous academic telemetry directly into the Agent 70 decision loop."}
                  </p>
                </div>

                {/* Primary Users */}
                <div className="border border-slate-200 rounded-xl p-4 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Primary Users</span>
                  <p className="text-slate-800 font-semibold">
                    {agent?.primary_users || "Heads of Department, Deans, Academic Council, Course Coordinators."}
                  </p>
                </div>

                {/* PDF Inputs & Outputs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border border-slate-200 rounded-xl p-4 space-y-2 bg-slate-50/30">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <Database className="w-3.5 h-3.5 text-blue-600" />
                      Document Inputs (PDF Spec)
                    </span>
                    <ul className="space-y-1.5 text-slate-700">
                      {(agent?.pdf_inputs || [
                        "Curriculum & Syllabus repositories",
                        "Departmental mark books & ERP submissions",
                        "Academic calendar milestones"
                      ]).map((inp, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-blue-500 font-bold">•</span>
                          <span>{inp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border border-slate-200 rounded-xl p-4 space-y-2 bg-slate-50/30">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-emerald-600" />
                      Outputs & Artefacts (PDF Spec)
                    </span>
                    <ul className="space-y-1.5 text-slate-700">
                      {(agent?.pdf_outputs || [
                        "Periodic progress dashboards & exception alerts",
                        "Variance reports against normative baseline",
                        "Accreditation-grade audit trail evidence"
                      ]).map((out, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-emerald-500 font-bold">•</span>
                          <span>{out}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Workflow Summary */}
                <div className="border border-slate-200 rounded-xl p-4 space-y-2 bg-blue-50/40">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-blue-600" />
                    Autonomous Workflow Engine Execution (PDF Process)
                  </span>
                  <p className="text-slate-800 leading-relaxed font-medium">
                    {agent?.workflow_summary || "Autonomous execution sequence conforming to Part C Detect-Decide-Act-Measure loop."}
                  </p>
                </div>
              </div>
            )}

            {/* TAB 3: SAMPLE INPUT & INGEST (INTERACTIVE) */}
            {activeTab === 'ingest' && (
              <div className="space-y-5 animate-fadeIn text-xs">
                {/* Instructional Card */}
                <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-2xl space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-600" />
                    <span className="font-extrabold text-amber-900 text-xs uppercase tracking-wider">
                      Interactive Real-Time Telemetry Ingestion
                    </span>
                  </div>
                  <p className="text-amber-800 leading-relaxed">
                    Select a sample scenario from the PDF specification below or modify the payload. Submitting stores the data into the canonical institutional state and triggers <strong>Agent 70 real-time cross-project recalculation</strong> (recomputing course priority scores, diagnostic flags, and executive recommendations).
                  </p>
                </div>

                {/* Scenario Selector */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                    1. Select PDF Sample Scenario
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {(agent?.sample_inputs || []).map((sample, idx) => (
                      <button
                        key={sample.id || idx}
                        type="button"
                        onClick={() => handleSelectSample(idx)}
                        className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                          selectedSampleIdx === idx
                            ? 'bg-blue-50/70 border-blue-500 shadow-sm ring-1 ring-blue-500 text-blue-900'
                            : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <div className="space-y-0.5">
                          <span className="font-bold text-xs block">{sample.label}</span>
                          <span className="text-[10px] text-slate-500">
                            Course: {sample.payload?.course_code || 'CS201'} • Section: {sample.payload?.section || 'CSE-B'}
                          </span>
                        </div>
                        {selectedSampleIdx === idx && (
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Payload Editor / Viewer */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                      <Code className="w-3.5 h-3.5 text-slate-500" />
                      2. Telemetry Payload (JSON)
                    </label>
                    <span className="text-[10px] text-slate-400">Editable before ingestion</span>
                  </div>

                  <div className="relative">
                    <textarea
                      rows={9}
                      value={jsonPayloadText}
                      onChange={(e) => setJsonPayloadText(e.target.value)}
                      className={`w-full p-3 font-mono text-xs rounded-xl border bg-slate-50 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                        jsonError ? 'border-red-400 ring-1 ring-red-400' : 'border-slate-300'
                      }`}
                      placeholder="Paste or modify JSON payload..."
                    />
                  </div>
                  {jsonError && (
                    <p className="text-red-600 font-medium text-[11px]">{jsonError}</p>
                  )}
                </div>

                {/* Submit / Ingest Action */}
                <div className="pt-2">
                  <button
                    type="button"
                    disabled={isIngesting}
                    onClick={handleIngestTelemetry}
                    className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-extrabold text-xs rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isIngesting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Processing Telemetry & Running Real-Time Analysis...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                        <span>Ingest Telemetry & Run Real-Time Analysis</span>
                      </>
                    )}
                  </button>
                </div>

                {ingestSuccess && (
                  <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 flex items-center gap-2 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Telemetry successfully recorded! Check the top output card for the recalculation report.</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Controls */}
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={closeEvidenceDrawer}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-300 rounded-xl hover:bg-white transition-colors"
            >
              Close Drawer
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  if (activeTab !== 'ingest') {
                    setActiveTab('ingest');
                  } else {
                    handleIngestTelemetry();
                  }
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-all"
              >
                <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                <span>{activeTab === 'ingest' ? 'Ingest & Recalculate' : 'Open Sample Ingestion'}</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function ActivityIcon(props) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}
