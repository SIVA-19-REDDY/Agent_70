import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

export function StatCard({
  title,
  value,
  trend,
  explanation,
  icon: Icon,
  variant = 'default',
  onClick
}) {
  const isPositive = trend && (trend.includes('+') || trend.toLowerCase().includes('improved') || trend.toLowerCase().includes('recoverable'));
  const isWarning = trend && (trend.includes('critical') || trend.includes('delay') || trend.includes('dip'));

  let iconBg = 'bg-institutional-50 text-institutional-600 border-institutional-100';
  if (variant === 'danger') iconBg = 'bg-red-50 text-red-600 border-red-100';
  if (variant === 'warning') iconBg = 'bg-amber-50 text-amber-600 border-amber-100';
  if (variant === 'success') iconBg = 'bg-emerald-50 text-emerald-600 border-emerald-100';

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl p-5 border border-slate-200/80 shadow-card transition-all duration-200 flex flex-col justify-between ${
        onClick ? 'cursor-pointer hover:border-institutional-300 hover:shadow-card-hover hover:-translate-y-0.5' : ''
      }`}
    >
      <div>
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</span>
          {Icon && (
            <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${iconBg}`}>
              <Icon className="w-5 h-5" />
            </div>
          )}
        </div>

        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-3xl font-bold font-sans tracking-tight text-slate-900">{value}</span>
        </div>
      </div>

      <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
        {trend && (
          <span className={`inline-flex items-center gap-1 font-medium ${
            isWarning ? 'text-amber-700' : isPositive ? 'text-emerald-700' : 'text-slate-600'
          }`}>
            {trend}
          </span>
        )}
        {explanation && (
          <span className="text-slate-400 truncate text-[11px] ml-auto">{explanation}</span>
        )}
      </div>
    </div>
  );
}
