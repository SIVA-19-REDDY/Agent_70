import React, { useState } from 'react';
import { Settings, Cpu, Shield, Database, Sparkles, CheckCircle2, Lock, Check } from 'lucide-react';
import { useAI } from '../contexts/AIContext';
import { useAuth } from '../contexts/AuthContext';
import { useFilters } from '../contexts/FilterContext';

export function SettingsView() {
  const { provider, setProvider, providerStatus } = useAI();
  const { user } = useAuth();
  const { filters, updateFilter } = useFilters();

  const [temperature, setTemperature] = useState(0.2);
  const [responseStyle, setResponseStyle] = useState('detailed');
  const [streaming, setStreaming] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-institutional-600 block">
          Platform Configuration
        </span>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          System & AI Engine Settings
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Configure AI decision support model hyperparameters, backend provider routing, and institutional defaults.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* AI Engine & Provider Architecture */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/90 shadow-card space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-institutional-50 text-institutional-700 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">AI Intelligence Engine Routing</h3>
                <p className="text-xs text-slate-500">Select active provider or enable automatic failover</p>
              </div>
            </div>
            {providerStatus.demo_mode_active && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                Demo Mode Active
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'auto', title: 'Auto Router', desc: 'Graceful fallback across GPT, Gemini & Demo', badge: 'Recommended' },
              { id: 'gpt', title: 'OpenAI GPT', desc: `Backend status: ${providerStatus.openai.status}` },
              { id: 'gemini', title: 'Google Gemini', desc: `Backend status: ${providerStatus.gemini.status}` }
            ].map((opt) => (
              <div
                key={opt.id}
                onClick={() => setProvider(opt.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  provider === opt.id
                    ? 'border-institutional-500 bg-institutional-50/60 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-xs font-bold text-slate-900">{opt.title}</span>
                  {opt.badge && (
                    <span className="text-[10px] font-semibold text-institutional-700 bg-institutional-100 px-1.5 py-0.2 rounded">
                      {opt.badge}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500">{opt.desc}</p>
              </div>
            ))}
          </div>

          {/* Model Hyperparameters */}
          <div className="space-y-4 pt-4 border-t border-slate-100 text-xs">
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="font-semibold text-slate-700">Generation Temperature</span>
                <span className="font-mono font-bold text-institutional-700">{temperature}</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.05"
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="w-full accent-institutional-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>0.0 (Deterministic / Analytical)</span>
                <span>1.0 (Creative / Exploratory)</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Response Formulation Style</label>
                <select
                  value={responseStyle}
                  onChange={(e) => setResponseStyle(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-2 bg-slate-50 font-medium"
                >
                  <option value="detailed">Detailed (With full 10-step telemetry decomposition)</option>
                  <option value="balanced">Balanced (Executive summary first)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Telemetry Streaming UI</label>
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    checked={streaming}
                    onChange={(e) => setStreaming(e.target.checked)}
                    className="rounded border-slate-300 text-institutional-600 focus:ring-institutional-500"
                  />
                  <span className="text-slate-700 font-medium">Enable real-time typing simulation</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Institutional Defaults & Role Security */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/90 shadow-card space-y-4">
          <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
            Active Institutional Context & Security
          </h3>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px] font-semibold uppercase">Current Session Role</span>
              <span className="text-sm font-bold text-slate-900">{user?.role} ({user?.title})</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px] font-semibold uppercase">Department Scope</span>
              <span className="text-sm font-bold text-slate-900">{user?.department}</span>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs text-slate-600 space-y-1">
            <span className="font-bold text-slate-800 block">Active Security Permissions:</span>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {(user?.permissions || []).map((perm, i) => (
                <span key={i} className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] font-mono text-slate-700">
                  {perm}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          {savedSuccess && (
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
              <Check className="w-4 h-4" /> Preferences saved
            </span>
          )}
          <button
            type="submit"
            className="px-6 py-2.5 bg-institutional-600 hover:bg-institutional-700 text-white rounded-2xl text-xs font-semibold shadow-sm transition-all"
          >
            Save Configuration
          </button>
        </div>
      </form>
    </div>
  );
}
