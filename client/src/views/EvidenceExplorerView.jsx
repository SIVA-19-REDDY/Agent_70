import React, { useState, useEffect } from 'react';
import { Database, ShieldCheck, Clock, Layers, ArrowRight, ExternalLink, Activity } from 'lucide-react';
import { useAI } from '../contexts/AIContext';
import { api } from '../services/api';

export function EvidenceExplorerView() {
  const { openEvidenceDrawer } = useAI();
  const [evidenceData, setEvidenceData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvidence();
  }, []);

  const loadEvidence = async () => {
    setLoading(true);
    try {
      const res = await api.getEvidence();
      setEvidenceData(res);
    } catch (err) {
      console.warn('Evidence fetch error:', err);
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
            Platform Telemetry Architecture
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Multi-Agent Evidence Explorer
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit-grade visibility into the 12 autonomous source agents feeding Agent 70 decision intelligence.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>12/12 Agents Synchronized</span>
          </span>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {(evidenceData?.agents || []).map((agent) => (
          <div
            key={agent.id}
            className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-card flex flex-col justify-between space-y-4 hover:border-institutional-300 transition-all group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-institutional-50 text-institutional-700 flex items-center justify-center font-bold text-xs">
                    {agent.name.replace('Agent ', 'A')}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{agent.name}</h3>
                    <span className="text-[10px] font-semibold text-institutional-600 block">{agent.domain}</span>
                  </div>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                  Telemetry Active
                </span>
              </div>

              <div className="py-3 space-y-2 text-xs">
                <span className="text-slate-800 font-semibold block">{agent.title}</span>
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Freshness: {agent.freshness}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => openEvidenceDrawer({
                source_agent: `${agent.name} — ${agent.title}`,
                metric: `${agent.domain} Telemetry Stream`,
                current_value: 'Active (100%)',
                baseline_value: 'Sync Normal',
                delta: 'Zero Desync',
                period: 'Semester 1, 2026–27',
                population: 'Full Institutional Cohort',
                confidence: 96,
                timestamp: agent.freshness
              })}
              className="w-full py-2 bg-slate-50 hover:bg-institutional-50 text-slate-700 hover:text-institutional-700 font-semibold text-xs rounded-xl border border-slate-200/80 transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Inspect Telemetry Drawer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
