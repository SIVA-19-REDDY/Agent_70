import React from 'react';

export function PriorityBadge({ status, score, size = 'md' }) {
  const normalized = (status || '').toLowerCase();

  let styles = 'bg-slate-100 text-slate-700 border-slate-200';
  let dotColor = 'bg-slate-400';

  if (normalized.includes('critical')) {
    styles = 'bg-red-50 text-red-700 border-red-200';
    dotColor = 'bg-red-500';
  } else if (normalized.includes('urgent')) {
    styles = 'bg-amber-50 text-amber-800 border-amber-200';
    dotColor = 'bg-amber-500';
  } else if (normalized.includes('high')) {
    styles = 'bg-orange-50 text-orange-700 border-orange-200';
    dotColor = 'bg-orange-500';
  } else if (normalized.includes('moderate')) {
    styles = 'bg-blue-50 text-blue-700 border-blue-200';
    dotColor = 'bg-blue-500';
  } else if (normalized.includes('monitor') || normalized.includes('stable')) {
    styles = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    dotColor = 'bg-emerald-500';
  }

  const sizeClasses = size === 'sm' 
    ? 'text-xs px-2 py-0.5' 
    : size === 'lg'
    ? 'text-sm px-3.5 py-1.5'
    : 'text-xs px-2.5 py-1';

  return (
    <span className={`inline-flex items-center gap-1.5 font-semibold rounded-full border ${styles} ${sizeClasses}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      <span>{status || 'Standard'}</span>
      {score !== undefined && (
        <span className="opacity-70 font-mono text-[11px] ml-0.5">({score})</span>
      )}
    </span>
  );
}
