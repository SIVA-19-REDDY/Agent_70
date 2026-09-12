import React, { useState, useEffect } from 'react';
import { Activity, RefreshCw, Wifi, ShieldAlert, Cpu, CheckCircle2, Clock } from 'lucide-react';

const LIVE_AGENT_STREAM_EVENTS = [
  { id: 1, agent: "Agent 11 (Attendance)", text: "Section B CS201 attendance drop flagged (-8.4% WoW)", status: "warning", time: "Just now" },
  { id: 2, agent: "Agent 14 (Assessments)", text: "Mid-term 1 graded data synchronized for 126 students", status: "success", time: "18s ago" },
  { id: 3, agent: "Agent 69 (Accreditation)", text: "NBA Tier-1 outcome attainment metric aligned at 72.4%", status: "info", time: "42s ago" },
  { id: 4, agent: "Agent 22 (Course Feedback)", text: "Student feedback sentiment index: 3.4/5.0 across 4 sections", status: "warning", time: "1m ago" },
  { id: 5, agent: "Agent 7 (Curriculum)", text: "Prerequisite mapping verified for Algorithms CS301", status: "success", time: "2m ago" },
  { id: 6, agent: "Agent 31 (Faculty Workload)", text: "Workload distribution telemetry verified (16.2 hrs/wk avg)", status: "info", time: "3m ago" }
];

export function RealtimeInstitutionalBar({ onSync }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeEventIndex, setActiveEventIndex] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncText, setLastSyncText] = useState('Live Synchronized');
  const [syncCount, setSyncCount] = useState(0);

  // Live Precision Clock (updates every second)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Cycle streaming telemetry events
  useEffect(() => {
    const streamInterval = setInterval(() => {
      setActiveEventIndex((prev) => (prev + 1) % LIVE_AGENT_STREAM_EVENTS.length);
    }, 4500);
    return () => clearInterval(streamInterval);
  }, []);

  const handleManualSync = () => {
    if (isSyncing) return;
    setIsSyncing(true);
    
    // Play subtle audio cue using Web Audio API
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5 note
      osc.frequency.exponentialRampToValueAtTime(1320, audioCtx.currentTime + 0.08); // E6
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.12);
    } catch (e) {
      // Audio context might be restricted before user gesture
    }

    setTimeout(() => {
      setIsSyncing(false);
      const timeStr = new Date().toLocaleTimeString('en-US', { hour12: false });
      setLastSyncText(`Synced 72 Agents at ${timeStr}`);
      setSyncCount((c) => c + 1);
      if (onSync) onSync();
    }, 600);
  };

  const formattedDate = currentTime.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).toUpperCase();

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const activeEvent = LIVE_AGENT_STREAM_EVENTS[activeEventIndex];

  return (
    <div className="bg-slate-900 text-slate-100 border-b border-slate-800 px-4 py-2 text-xs select-none shadow-inner flex flex-wrap items-center justify-between gap-3 relative z-20">
      {/* Left: Live Precision Clock & Radar Beacon */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-800/90 border border-slate-700/80 font-mono text-cyan-400 shadow-xs">
          <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span className="font-bold tracking-wider">{formattedDate}</span>
          <span className="text-slate-500 font-bold">•</span>
          <span className="font-black text-cyan-300">{formattedTime}</span>
          <span className="text-[10px] text-cyan-500 font-bold uppercase">IST</span>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 font-bold">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] tracking-wider uppercase">Live Stream</span>
        </div>
      </div>

      {/* Middle: Real-Time Event Stream Ticker */}
      <div className="flex-1 min-w-[280px] max-w-2xl overflow-hidden bg-slate-950/60 rounded-lg px-3 py-1 border border-slate-800 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-hidden">
          <Activity className="w-3.5 h-3.5 text-indigo-400 shrink-0 animate-pulse" />
          <span className="font-mono text-[11px] text-indigo-300 font-bold shrink-0">
            {activeEvent.agent}:
          </span>
          <span className="text-[12px] text-slate-300 truncate font-medium transition-opacity duration-300">
            {activeEvent.text}
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-500 shrink-0 uppercase">
          {activeEvent.time}
        </span>
      </div>

      {/* Right: Telemetry Health Indicators & Live Sync Action */}
      <div className="flex items-center gap-2.5 shrink-0">
        <div className="hidden lg:flex items-center gap-3 text-[11px] text-slate-400 font-mono">
          <span className="flex items-center gap-1 text-emerald-400">
            <Wifi className="w-3 h-3" /> 14ms
          </span>
          <span className="text-slate-600">|</span>
          <span className="flex items-center gap-1 text-cyan-400">
            <Cpu className="w-3 h-3" /> 72/72 Agents
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300">99.8% Conf.</span>
        </div>

        <button
          type="button"
          onClick={handleManualSync}
          disabled={isSyncing}
          title="Force Synchronize Telemetry with Source Agents 6–69"
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-institutional-600 hover:bg-institutional-500 active:bg-institutional-700 text-white font-bold text-[11px] shadow-sm transition-all cursor-pointer disabled:opacity-60"
        >
          <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin text-cyan-200' : ''}`} />
          <span>{isSyncing ? 'Syncing...' : 'Sync Telemetry'}</span>
        </button>
      </div>
    </div>
  );
}

export default RealtimeInstitutionalBar;
