import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';
import { useAI } from '../../contexts/AIContext';

export function AgentBadge({ source, metric = null, interactive = true }) {
  const { openEvidenceDrawer } = useAI();

  // Parse source agent title if formatted like "Agent 34" or "Agent 34 — Result Analysis"
  const agentText = typeof source === 'string' ? source : (source?.source_agent || 'Academic Source');

  const handleClick = (e) => {
    if (!interactive) return;
    e.stopPropagation();
    openEvidenceDrawer({
      source_agent: agentText,
      metric: metric || source?.metric || 'Institutional Academic Metric',
      current_value: source?.current_value || 'Verified',
      baseline_value: source?.baseline_value || 'Historical Baseline',
      delta: source?.delta || 'Computed',
      period: source?.period || 'Semester 1, 2026–27',
      population: source?.population || 'Institutional Cohort',
      confidence: source?.confidence || 90,
      timestamp: source?.timestamp || 'Today, 08:40 AM'
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-institutional-50 text-institutional-800 border border-institutional-200 transition-all ${
        interactive ? 'hover:bg-institutional-100 hover:border-institutional-300 hover:shadow-sm cursor-pointer' : 'cursor-default'
      }`}
      title="Click to view verified institutional evidence trace"
    >
      <ShieldCheck className="w-3.5 h-3.5 text-institutional-600 shrink-0" />
      <span className="font-semibold">{agentText}</span>
      {interactive && <Info className="w-3 h-3 text-institutional-400 ml-0.5" />}
    </button>
  );
}
