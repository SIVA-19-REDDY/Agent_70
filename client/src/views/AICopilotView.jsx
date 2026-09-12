import React, { useState, useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  Send, Sparkles, Bot, Trash2, Sliders, Target, CheckCircle2,
  AlertTriangle, ChevronRight, PanelRightClose, PanelRightOpen,
  Layers, Database, ArrowRight, Gauge, AlertCircle, ShieldCheck,
  Maximize2, Cpu, Activity, Mic, Key
} from 'lucide-react';
import { ProviderSelector } from '../components/ai/ProviderSelector';
import { AIRobotAvatar } from '../components/ai/AIRobotAvatar';
import { AIResponseDashboard } from '../components/ai/AIResponseDashboard';
import { useAI } from '../contexts/AIContext';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';

export function AICopilotView() {
  const outletCtx = useOutletContext();
  const isSidebarOpen = outletCtx?.isSidebarOpen ?? true;
  const { provider, openDecisionModal, quickQuestion, setQuickQuestion } = useAI();
  const { user } = useAuth();

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [selectedEvidence, setSelectedEvidence] = useState(null);

  const messagesEndRef = useRef(null);

  const coreQuestions = [
    {
      id: 1,
      text: "Which courses require immediate intervention this semester?",
      subtitle: "Multi-factor deviation & priority ranking across departments"
    },
    {
      id: 2,
      text: "Which sections show declining performance compared to last semester?",
      subtitle: "Section-level pass rate, attendance, and timetable friction"
    },
    {
      id: 3,
      text: "Which faculty need additional support, and in what?",
      subtitle: "Workload rebalancing & instructional support (non-punitive)"
    },
    {
      id: 4,
      text: "If we add a remedial programme for the twenty weakest students in the second year, what improvement should we expect based on our own history?",
      subtitle: "Historical intervention outcome projection & confidence"
    }
  ];

  const containerClass = isSidebarOpen
    ? "max-w-5xl mx-auto transition-all duration-300"
    : "max-w-7xl w-full mx-auto transition-all duration-300";

  const questionsGridClass = isSidebarOpen
    ? "grid grid-cols-1 sm:grid-cols-2 gap-3"
    : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4";

  // Default initial message matching Image 2 (Buji Assistant Greeting)
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          sender: 'ai',
          content: "Hi, I'm Buji, your Agentic AI Day 2026 Academic Decision Support assistant. I'm here to guide you through diagnostic priority rankings, section-level syllabus delays, faculty workload rebalancing, and post-intervention outcome projections across our 72 autonomous agents. How can I assist your leadership team today?",
          timestamp: '10:30 AM',
          isWelcome: true
        }
      ]);
    }
  }, []);

  // Handle external trigger if any
  useEffect(() => {
    if (quickQuestion) {
      handleSend(quickQuestion);
      setQuickQuestion(null);
    }
  }, [quickQuestion]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isGenerating]);

  const handleSend = async (questionText) => {
    const q = (questionText || input).trim();
    if (!q || isGenerating) return;

    setInput('');

    // Add user message
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = {
      id: `user_${Date.now()}`,
      sender: 'user',
      content: q,
      timestamp: nowTime
    };

    setMessages(prev => [...prev, userMsg]);
    setIsGenerating(true);

    try {
      const response = await api.askAIChat({
        question: q,
        context: {
          role: user?.role,
          department: user?.department
        },
        provider
      });

      // If backend responded with structured output
      const aiMsg = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        content: response.executive_answer || response.answer,
        data: response,
        question: q,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        provider: response.provider || provider
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error('AIChat error:', err);
      // Fallback
      setMessages(prev => [
        ...prev,
        {
          id: `ai_err_${Date.now()}`,
          sender: 'ai',
          content: "I apologize, but I encountered an issue processing that query with our multi-agent telemetry engine. Please try selecting one of the 4 diagnostic questions above.",
          isError: true
        }
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([]);
    setSelectedEvidence(null);
  };

  return (
    <div className="flex-1 flex overflow-hidden select-none bg-white rounded-3xl border border-slate-200 shadow-sm transition-all duration-300">
      {/* Center Main Copilot Canvas */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC]">
        {/* Workspace Top Header Bar */}
        <div className="p-4.5 border-b border-slate-200/80 flex items-center justify-between bg-white shadow-2xs">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg md:text-xl font-extrabold text-slate-900 tracking-tight">
                Academic Decision Copilot
              </h1>
              <span className="text-xs font-mono font-bold tracking-wider text-blue-600 uppercase">
                Batch: Agent 70
              </span>
              <span className="text-slate-300">•</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200">
                AURA Intelligence Engine
              </span>
              {!isSidebarOpen && (
                <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 animate-pulse ml-2">
                  <Maximize2 className="w-3.5 h-3.5" /> Elaborate Widescreen Mode Active
                </span>
              )}
            </div>
            <p className="text-xs md:text-sm text-slate-500 mt-0.5">
              Evidence-backed diagnostic intelligence, priority rankings, and remedial simulations for academic leaders.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleClearHistory}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              title="Clear conversation history"
            >
              <Trash2 className="w-4.5 h-4.5" />
            </button>
            <button
              onClick={() => setRightPanelOpen(!rightPanelOpen)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 text-xs md:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs bg-white"
            >
              {rightPanelOpen ? <PanelRightClose className="w-4 h-4 text-slate-500" /> : <PanelRightOpen className="w-4 h-4 text-slate-500" />}
              <span>{rightPanelOpen ? 'Hide Evidence' : 'View Evidence'}</span>
            </button>
          </div>
        </div>

        {/* Scrollable Conversation Flow */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          {/* Provider selector at top */}
          <div className={containerClass}>
            <ProviderSelector />
          </div>

          {/* 4 Core Example Questions (Section 7) - Elaborate Widescreen Grid */}
          <div className={`${containerClass} bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3.5`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Core Diagnostic Inquiries (Click to Execute)
                </span>
                {!isSidebarOpen && (
                  <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                    Elaborate 4-Column Layout
                  </span>
                )}
              </div>
              <span className="text-xs font-bold text-blue-600">Autonomous 72-Agent Telemetry</span>
            </div>
            <div className={questionsGridClass}>
              {coreQuestions.map((q) => (
                <button
                  key={q.id}
                  disabled={isGenerating}
                  onClick={() => handleSend(q.text)}
                  className="p-4 rounded-2xl border border-slate-200 bg-white hover:bg-blue-50/70 hover:border-blue-300 text-left transition-all group cursor-pointer shadow-2xs flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-sm font-bold text-slate-900 group-hover:text-blue-700 leading-snug">
                      {q.text}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 shrink-0 mt-0.5 transition-all" />
                  </div>
                  <span className="text-xs text-slate-500 block mt-2 leading-relaxed">
                    {q.subtitle}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Messages Container (Expands in Elaborate Mode) */}
          <div className={`${containerClass} space-y-6`}>
            {messages.map((msg) => (
              <React.Fragment key={msg.id}>
                {msg.sender === 'user' ? (
                  <div className="flex justify-end">
                    <div className="bg-blue-600 text-white rounded-3xl rounded-tr-xs px-6 py-4 max-w-2xl text-sm md:text-base font-semibold leading-relaxed shadow-md shadow-blue-500/20">
                      {msg.content}
                    </div>
                  </div>
                ) : msg.isWelcome ? (
                  <div className="space-y-4">
                    {/* Floating 3D Buji Robot Mascot over Soft Blue Constellation Network (matching Image 2) */}
                    <div className="relative rounded-3xl overflow-hidden border border-blue-200/90 bg-gradient-to-b from-[#E0F2FE] via-[#EFF6FF] to-white p-6 md:p-8 text-center shadow-xs">
                      {/* Geometric Constellation Network SVG */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id="buji-constellation" width="70" height="70" patternUnits="userSpaceOnUse">
                            <circle cx="15" cy="15" r="1.5" fill="#3B82F6" opacity="0.6" />
                            <circle cx="55" cy="25" r="2" fill="#2563EB" opacity="0.8" />
                            <circle cx="35" cy="55" r="1.5" fill="#3B82F6" opacity="0.6" />
                            <line x1="15" y1="15" x2="55" y2="25" stroke="#93C5FD" strokeWidth="0.8" opacity="0.5" />
                            <line x1="55" y1="25" x2="35" y2="55" stroke="#93C5FD" strokeWidth="0.8" opacity="0.5" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#buji-constellation)" />
                      </svg>

                      {/* 3D Floating Mascot Robot */}
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="w-36 h-36 md:w-44 md:h-44 rounded-3xl overflow-hidden border-2 border-white shadow-lg bg-white/70 p-2 animate-robot-float transition-all">
                          <img
                            src="/assets/buji_robot.jpg"
                            alt="Buji AI Decision Support Mascot"
                            className="w-full h-full object-contain select-none"
                          />
                        </div>
                        <div className="inline-flex items-center gap-2 mt-4 px-3.5 py-1 rounded-full bg-blue-100/90 text-blue-800 text-xs font-bold border border-blue-200 shadow-2xs">
                          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                          <span>BUJI • AGENT 70 • ACADEMIC DECISION SUPPORT</span>
                        </div>
                      </div>
                    </div>

                    {/* Assistant Dialogue Card matching Image 2 */}
                    <div className="bg-white rounded-2xl p-5 border border-blue-100/90 shadow-xs space-y-2 hover:border-blue-300 transition-all">
                      <div className="flex items-center justify-between text-xs pb-1.5 border-b border-slate-100">
                        <span className="font-extrabold text-blue-600 tracking-wider uppercase">ASSISTANT</span>
                        <span className="text-slate-400 font-mono text-[11px]">{msg.timestamp || '10:30 AM'}</span>
                      </div>
                      <p className="text-sm md:text-base text-slate-800 font-medium leading-relaxed">
                        {msg.content}
                      </p>
                    </div>
                  </div>
                ) : (
                  <StructuredAIResponseCard
                    data={msg.data}
                    provider={msg.provider}
                    isSidebarOpen={isSidebarOpen}
                    onSelectEvidence={(ev) => {
                      setSelectedEvidence(ev);
                      setRightPanelOpen(true);
                    }}
                    onSelectFollowUp={(text) => handleSend(text)}
                    onOpenDecision={(opt) => openDecisionModal({
                      issue: msg.question || "Academic Performance Issue",
                      selected_option: opt.action || opt.option,
                      expected_effect: opt.expected_effect
                    })}
                  />
                )}
              </React.Fragment>
            ))}

            {isGenerating && (
              <div className="bg-gradient-to-r from-white via-cyan-50/40 to-white rounded-3xl p-6 border-2 border-cyan-300/80 shadow-elevated flex items-center gap-5">
                <AIRobotAvatar size="lg" state="thinking" animate={true} />
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2.5">
                    <span className="font-bold text-base md:text-lg text-slate-900">
                      AURA AI is Analyzing Academic Telemetry & Generating Dashboards...
                    </span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 animate-pulse">
                      Gemini Live
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-slate-600">
                    Consulting Agent 34 (Results), Agent 11 (Attendance), Agent 6 (Syllabus), and computing interactive performance bar charts.
                  </p>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Bottom Input Form matching Image 2 */}
        <div className="bg-white border-t border-slate-200/80 p-4 shrink-0">
          <div className={containerClass}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2 bg-white border border-slate-200/90 rounded-2xl p-1.5 pl-4 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all shadow-xs"
            >
              <input
                type="text"
                disabled={isGenerating}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Start the assistant to start chatting"
                className="w-full bg-transparent text-sm md:text-base text-slate-800 placeholder-slate-400 focus:outline-none font-medium"
              />
              <button
                type="submit"
                disabled={!input.trim() || isGenerating}
                className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white flex items-center justify-center shrink-0 transition-colors shadow-xs cursor-pointer"
                title="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            {/* Status Footer matching Image 2 */}
            <div className="pt-2 px-1 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold text-slate-700 flex items-center gap-1">
                  <Key className="w-3.5 h-3.5 text-slate-400" />
                  Standby
                </span>
                <span className="text-slate-300 hidden sm:inline">•</span>
                <span className="font-semibold text-blue-700 hidden sm:inline">Engine: Google Gemini</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                <Mic className="w-3.5 h-3.5 text-blue-600" />
                <span>Voice + transcript (assistant & your speech)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Dedicated Collapsible Evidence Panel (Section 15, 31) */}
      {rightPanelOpen && (
        <aside className="w-80 lg:w-96 bg-white border-l border-slate-200/80 flex flex-col shrink-0 h-full overflow-hidden select-none">
          <div className="p-4.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
            <div className="flex items-center gap-2.5">
              <Database className="w-4.5 h-4.5 text-blue-600" />
              <span className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Active Evidence Panel
              </span>
            </div>
            <button
              onClick={() => setRightPanelOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <PanelRightClose className="w-4.5 h-4.5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {selectedEvidence ? (
              <>
                <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-4.5 space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block">
                    Source Agent
                  </span>
                  <h3 className="text-base font-bold text-slate-900">{selectedEvidence.source_agent}</h3>
                  <span className="text-xs text-slate-500">Autonomous telemetry feed</span>
                </div>

                <div className="border border-slate-200/80 rounded-2xl p-4.5 space-y-3.5 bg-white text-sm">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      Evaluated Metric
                    </span>
                    <span className="font-bold text-slate-800 text-base">{selectedEvidence.metric}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2.5 border-t border-slate-100 text-xs">
                    <div>
                      <span className="text-slate-400 block font-medium">Current</span>
                      <span className="font-bold text-slate-800 text-sm font-mono">{selectedEvidence.current}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Baseline</span>
                      <span className="font-bold text-slate-800 text-sm font-mono">{selectedEvidence.previous}</span>
                    </div>
                  </div>

                  <div className="pt-2.5 border-t border-slate-100">
                    <span className="text-xs text-slate-400 block font-medium">Net Change</span>
                    <span className="text-base font-bold text-red-700 font-mono">{selectedEvidence.change}</span>
                  </div>

                  <div className="pt-2.5 border-t border-slate-100">
                    <span className="text-xs text-slate-400 block font-medium">Target Population</span>
                    <span className="font-semibold text-slate-800 text-sm">{selectedEvidence.population}</span>
                  </div>

                  {selectedEvidence.period && (
                    <div className="pt-2.5 border-t border-slate-100">
                      <span className="text-xs text-slate-400 block font-medium">Academic Period</span>
                      <span className="font-semibold text-slate-800 text-sm">{selectedEvidence.period}</span>
                    </div>
                  )}
                </div>

                {/* How this evidence was used (Section 15) */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4.5 space-y-2 text-sm text-slate-700">
                  <span className="font-bold uppercase tracking-wider text-xs text-blue-700 block">
                    How This Evidence Was Used:
                  </span>
                  <p className="leading-relaxed text-xs md:text-sm">
                    {selectedEvidence.how_used || "Current course performance was compared with the historical course norm to identify whether the observed decline represents an unusual institutional anomaly."}
                  </p>
                </div>
              </>
            ) : (
              <div className="p-8 text-center text-sm text-slate-400 space-y-3">
                <Database className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="leading-relaxed">Click any evidence badge in the conversation to inspect its verified telemetry and metric parameters.</p>
              </div>
            )}
          </div>
        </aside>
      )}
    </div>
  );
}

/**
 * Structured AI Response Card conforming to Sections 13, 14, 15, 16, 17, 18, 19, 20
 */
function StructuredAIResponseCard({ data, provider, isSidebarOpen, onSelectEvidence, onSelectFollowUp, onOpenDecision }) {
  const [scopeExpanded, setScopeExpanded] = useState(false);

  // Scenario state (Section 18)
  const [scenarioStudents, setScenarioStudents] = useState(data?.scenario?.students_targeted || 20);
  const [scenarioWeeks, setScenarioWeeks] = useState(data?.scenario?.duration_weeks || 4);
  const [scenarioHours, setScenarioHours] = useState(data?.scenario?.hours_per_week || 2);
  const [scenarioAttendance, setScenarioAttendance] = useState(data?.scenario?.attendance_boost_pct || 8);

  // Live Scenario Calculation (Section 18)
  const basePass = data?.scenario?.current_pass_rate || 61;
  const calculatedGain = Math.min(18, Math.round((scenarioWeeks * scenarioHours) * 1.3 + (scenarioAttendance * 0.35)));
  const calculatedProjected = Math.min(94, basePass + calculatedGain);
  const calculatedBenefited = Math.min(scenarioStudents, Math.round(scenarioStudents * 0.75));

  if (!data) return null;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card p-6 md:p-8 space-y-7">
      {/* Top Attribution Bar with Animated AI Robot */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <AIRobotAvatar size="xs" animate={true} />
          <span className="font-extrabold text-slate-900 text-sm md:text-base tracking-tight">
            AURA Decision Support
          </span>
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-institutional-50 text-institutional-700 border border-institutional-200">
            Agent 70
          </span>
        </div>
        <div className="flex items-center gap-3 text-slate-500 text-xs md:text-sm font-medium">
          <span>Answered by <strong className="text-slate-800">{provider}</strong></span>
          <span className="text-slate-300">•</span>
          <span className="text-institutional-700 font-bold">{data.confidence || 82}% Confidence</span>
        </div>
      </div>

      {/* 1. Executive Answer (Section 13, 14) */}
      <div className="bg-slate-50/90 rounded-2xl p-6 border border-slate-200/80 space-y-1.5">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
          Executive Answer
        </span>
        <h2 className="text-lg md:text-xl font-bold text-slate-900 leading-relaxed">
          {data.executive_answer}
        </h2>
      </div>

      {/* Visual Bar Graph Dashboard Embedded in Every Response */}
      <AIResponseDashboard data={data} />

      {/* 2. Analysis Scope / Question Decomposition (Section 10, 16) */}
      {data.analysis_scope && (
        <div className="border border-slate-200/80 rounded-2xl p-5 bg-white text-sm space-y-3">
          <div
            onClick={() => setScopeExpanded(!scopeExpanded)}
            className="flex items-center justify-between cursor-pointer select-none"
          >
            <div className="flex items-center gap-2.5 font-bold text-slate-800 text-sm">
              <Layers className="w-4.5 h-4.5 text-institutional-600" />
              <span>How I Analysed This (Analysis Scope)</span>
            </div>
            <span className="text-institutional-600 font-bold hover:underline text-xs md:text-sm">
              {scopeExpanded ? 'Hide Scope' : 'View Scope'}
            </span>
          </div>

          {scopeExpanded && (
            <div className="pt-3 border-t border-slate-100 space-y-3.5">
              <div className="space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Decomposition Checklist</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(data.analysis_scope.checklist || []).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-slate-700 text-xs md:text-sm font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">Source Agents Consulted</span>
                <div className="flex flex-wrap gap-2">
                  {(data.analysis_scope.source_agents_consulted || []).map((agent, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700">
                      {agent}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. Ranked Findings (Section 12, 13, 14) */}
      {data.ranked_findings && data.ranked_findings.length > 0 && (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-700">
              Ranked Findings (Prioritised by Impact & Actionability)
            </span>
            <span className="text-xs text-slate-400 font-medium">Explainable Multi-Agent Scoring</span>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-xs">
                <tr>
                  <th className="p-3.5">Rank</th>
                  <th className="p-3.5">Course / Issue</th>
                  <th className="p-3.5 text-center">Impact</th>
                  <th className="p-3.5 text-center">Actionability</th>
                  <th className="p-3.5 text-center">Priority</th>
                  <th className="p-3.5">Main Reason</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.ranked_findings.map((f, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900 font-mono">#{f.rank}</td>
                    <td className="p-3.5 font-bold text-slate-800">{f.course_or_issue}</td>
                    <td className="p-3.5 text-center font-medium">
                      <span className="px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold">
                        {f.impact}
                      </span>
                    </td>
                    <td className="p-3.5 text-center font-medium">
                      <span className="px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold">
                        {f.actionability}
                      </span>
                    </td>
                    <td className="p-3.5 text-center font-mono font-black text-red-600 text-base">
                      {f.priority_score}
                    </td>
                    <td className="p-3.5 text-slate-600 text-xs md:text-sm leading-relaxed">{f.main_reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. Why these were prioritised (Section 13, 14) */}
      {data.why_prioritised && data.why_prioritised.length > 0 && (
        <div className="space-y-2.5">
          <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-700 block">
            Why These Were Prioritised:
          </span>
          <ul className="space-y-2 text-xs md:text-sm text-slate-700">
            {data.why_prioritised.map((r, idx) => (
              <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                <span className="w-2 h-2 rounded-full bg-institutional-600 shrink-0 mt-1.5" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 5. Driver Diagnosis: Difficult Paper vs Teaching vs Student Preparedness (Section 11) */}
      {data.driver_diagnosis && (
        <div className="bg-blue-50/60 border border-blue-200/90 rounded-2xl p-5 space-y-2.5 text-xs md:text-sm">
          <div className="flex items-center justify-between">
            <span className="font-bold text-blue-900 uppercase tracking-wider text-xs block">
              Cross-Domain Driver Diagnosis:
            </span>
            <span className="font-bold text-blue-800 bg-white px-3 py-1 rounded-full border border-blue-200 text-xs shadow-2xs">
              {data.driver_diagnosis.confidence}% Confidence
            </span>
          </div>
          <span className="text-base font-black text-slate-900 block">
            {data.driver_diagnosis.primary_driver}
          </span>
          <p className="text-slate-700 leading-relaxed">
            {data.driver_diagnosis.explanation}
          </p>
        </div>
      )}

      {/* 6. Evidence Used (Section 13, 14, 15) - Expands to 3 columns in Elaborate View */}
      {data.evidence_used && data.evidence_used.length > 0 && (
        <div className="space-y-2.5 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-700">
              Evidence Used (Click to open in Right Panel)
            </span>
            <span className="text-xs text-slate-400 font-medium">Audit-Grade Traceability</span>
          </div>
          <div className={isSidebarOpen ? "grid grid-cols-1 sm:grid-cols-2 gap-2.5" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5"}>
            {data.evidence_used.map((ev, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectEvidence && onSelectEvidence(ev)}
                className="p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/40 hover:bg-blue-50/60 hover:border-blue-300 text-left transition-all cursor-pointer shadow-2xs"
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="font-bold text-slate-900 text-xs md:text-sm">{ev.source_agent}</span>
                  <span className="font-bold text-red-600 font-mono text-xs md:text-sm">{ev.change}</span>
                </div>
                <span className="text-xs text-slate-500 block">{ev.metric} • {ev.current} (prev {ev.previous})</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 7. Recommended Options (Section 13, 14, 17) - Expands to 2-column comparative grid in Elaborate View */}
      {data.recommended_options && data.recommended_options.length > 0 && (
        <div className="space-y-3.5 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-700 block">
              Recommended Options
            </span>
            {!isSidebarOpen && (
              <span className="text-xs text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded-md">
                Side-by-Side Comparison Grid
              </span>
            )}
          </div>
          <div className={isSidebarOpen ? "space-y-3.5" : "grid grid-cols-1 lg:grid-cols-2 gap-4"}>
            {data.recommended_options.map((opt, idx) => (
              <div key={idx} className="bg-emerald-50/50 border border-emerald-200/80 rounded-2xl p-5 space-y-3 text-xs md:text-sm shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-black text-slate-900 text-base block">{opt.option}</span>
                    <button
                      type="button"
                      onClick={() => onOpenDecision && onOpenDecision(opt)}
                      className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shrink-0 flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                    >
                      <Target className="w-3.5 h-3.5" />
                      <span>Record Decision</span>
                    </button>
                  </div>
                  <p className="text-slate-700 mt-1 leading-relaxed">{opt.action}</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 border-t border-emerald-100 text-xs">
                  <div>
                    <span className="text-slate-500 block font-medium">Expected Effect:</span>
                    <span className="font-bold text-emerald-800 text-xs md:text-sm">{opt.expected_effect}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block font-medium">Resources:</span>
                    <span className="font-semibold text-slate-800">{opt.resources}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block font-medium">Lead Time:</span>
                    <span className="font-semibold text-slate-800">{opt.lead_time}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block font-medium">Confidence:</span>
                    <span className="font-bold text-blue-700">{opt.confidence}</span>
                  </div>
                </div>

                {opt.evidence_basis && (
                  <p className="text-xs text-slate-500 italic pt-1">
                    Basis: {opt.evidence_basis}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 8. Inline Scenario Exploration: "WHAT IF?" (Section 18) */}
      <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 space-y-4 text-xs md:text-sm">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <Sliders className="w-4.5 h-4.5 text-institutional-600" />
            <span className="font-bold text-slate-900 uppercase tracking-wider text-xs md:text-sm">
              WHAT IF? (Inline Scenario Exploration)
            </span>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
            Dynamic Live Recalculation
          </span>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="space-y-1.5">
            <div className="flex justify-between font-medium text-xs md:text-sm">
              <span>Target Students:</span>
              <span className="font-bold text-institutional-700 font-mono text-sm">{scenarioStudents}</span>
            </div>
            <input
              type="range"
              min="10"
              max="60"
              step="5"
              value={scenarioStudents}
              onChange={(e) => setScenarioStudents(Number(e.target.value))}
              className="w-full accent-institutional-600 cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between font-medium text-xs md:text-sm">
              <span>Duration:</span>
              <span className="font-bold text-institutional-700 font-mono text-sm">{scenarioWeeks} wks</span>
            </div>
            <input
              type="range"
              min="2"
              max="8"
              step="1"
              value={scenarioWeeks}
              onChange={(e) => setScenarioWeeks(Number(e.target.value))}
              className="w-full accent-institutional-600 cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between font-medium text-xs md:text-sm">
              <span>Contact Hours / Wk:</span>
              <span className="font-bold text-institutional-700 font-mono text-sm">{scenarioHours} hrs</span>
            </div>
            <input
              type="range"
              min="1"
              max="4"
              step="1"
              value={scenarioHours}
              onChange={(e) => setScenarioHours(Number(e.target.value))}
              className="w-full accent-institutional-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Calculated Results */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-2xs">
          <div>
            <span className="text-xs text-slate-400 block uppercase font-bold">Current Pass Rate</span>
            <span className="font-mono font-bold text-slate-700 text-lg">{basePass}%</span>
          </div>
          <div>
            <span className="text-xs text-institutional-700 block uppercase font-bold">Projected Pass</span>
            <span className="font-mono font-black text-institutional-700 text-lg">{calculatedProjected}%</span>
          </div>
          <div>
            <span className="text-xs text-emerald-700 block uppercase font-bold">Estimated Gain</span>
            <span className="font-mono font-black text-emerald-700 text-lg">+{calculatedGain} points</span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block uppercase font-bold">Students Helped</span>
            <span className="font-mono font-bold text-slate-800 text-lg">{calculatedBenefited}</span>
          </div>
        </div>
      </div>

      {/* 9. Limitations & Confidence (Section 13, 14) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs md:text-sm">
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-1">
          <span className="font-bold text-slate-800 block text-xs md:text-sm">Model Confidence: {data.confidence || 82}%</span>
          <p className="text-slate-600 leading-relaxed">
            Based on multi-agent consistency and empirical intervention archives.
          </p>
        </div>
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-1">
          <span className="font-bold text-slate-800 block text-xs md:text-sm">Analytical Limitations:</span>
          <p className="text-slate-600 leading-relaxed">
            {Array.isArray(data.limitations) ? data.limitations.join(' ') : (data.limitations || "Assumes minimum 80% attendance throughout remedial support.")}
          </p>
        </div>
      </div>

      {/* 10. Suggested Follow-ups (Section 20) */}
      {data.suggested_follow_ups && data.suggested_follow_ups.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            Suggested Follow-up Inquiries (Context Preserved)
          </span>
          <div className="flex flex-wrap gap-2.5">
            {data.suggested_follow_ups.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectFollowUp && onSelectFollowUp(q)}
                className="px-4 py-2 rounded-full text-xs md:text-sm font-semibold bg-slate-50 hover:bg-institutional-50 text-slate-700 hover:text-institutional-700 border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <span>{q}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
