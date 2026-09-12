import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { useAI } from '../../contexts/AIContext';
import { AIRobotAvatar } from './AIRobotAvatar';

export function ProviderSelector() {
  const { providerStatus } = useAI();
  const modelName = providerStatus?.gemini?.model || 'gemini-flash-latest';

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 px-5 py-4 shadow-card flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Animated AI Robot Avatar */}
        <AIRobotAvatar size="md" animate={true} />

        <div>
          <div className="flex items-center gap-2.5">
            <span className="text-sm font-bold uppercase tracking-wider text-slate-800">
              AI Intelligence Engine
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Active
            </span>
          </div>
          <p className="text-sm text-slate-700 font-semibold mt-0.5">
            Google Gemini <span className="font-normal text-slate-500">({modelName})</span>
          </p>
        </div>
      </div>

      <div className="hidden sm:block text-right">
        <span className="text-xs font-semibold text-slate-500 block">Dedicated Institutional Engine</span>
        <span className="text-xs text-institutional-700 font-bold">12 Source Agents Integrated</span>
      </div>
    </div>
  );
}
