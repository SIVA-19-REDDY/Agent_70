import React from 'react';
import { OfficialAgentEmblem } from '../common/OfficialAgentEmblem';

export function InstitutionalOfficialHeader() {
  return (
    <header className="w-full bg-white border-b border-slate-200 shadow-xs px-4 md:px-8 py-2.5 flex items-center justify-between gap-4 select-none sticky top-0 z-50">
      {/* Left: Vignan's University Official Crest & Brand */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Official Star Emblem (Image 4) */}
        <div className="p-0.5 rounded-full border border-blue-200 bg-white flex items-center justify-center shadow-2xs hover:scale-105 transition-transform">
          <OfficialAgentEmblem size={44} />
        </div>

        {/* Text Details */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-xl md:text-2xl font-black text-[#DC2626] tracking-tight leading-none">
              VIGNAN'S
            </span>
            <div className="hidden sm:flex flex-col text-[8px] font-bold text-slate-500 leading-tight border-l border-slate-300 pl-1.5">
              <span className="text-emerald-700 font-extrabold">NAAC A+</span>
              <span className="text-blue-700 font-extrabold">NIRF 70th</span>
            </div>
          </div>
          <span className="text-[9px] md:text-[10px] font-extrabold text-slate-700 tracking-tight uppercase leading-tight mt-0.5">
            Foundation for Science, Technology & Research
          </span>
          <span className="inline-block bg-blue-700 text-white text-[8px] md:text-[9px] font-bold px-1.5 py-0.2 rounded-xs mt-0.5 max-w-fit leading-tight">
            (Deemed to be University) • Estd. u/s 3 of UGC Act 1956
          </span>
        </div>
      </div>

      {/* Center: Agent 70 Main Title */}
      <div className="flex-1 text-center px-2">
        <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-slate-500 block mb-0.5">
          CSE PRESENTS • AGENTIC AI DAY 2026
        </span>
        <h1 className="text-xl md:text-3xl lg:text-4xl font-black tracking-tight text-[#0F1E4A] leading-none">
          AGENT 70
        </h1>
        <div className="flex items-center justify-center gap-2 mt-1">
          <span className="text-[10px] md:text-xs font-extrabold px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
            Academic Decision Support Agent
          </span>
          <span className="text-slate-300 hidden sm:inline">•</span>
          <span className="text-[10px] md:text-xs font-bold text-slate-600 hidden sm:inline">
            AURA Intelligence Engine
          </span>
        </div>
      </div>

      {/* Right: Circular Official Accreditation Badges */}
      <div className="hidden lg:flex items-center gap-2.5 shrink-0">
        {/* NAAC A+ Badge */}
        <div className="w-10 h-10 rounded-full border-2 border-red-500 bg-white flex flex-col items-center justify-center text-center shadow-2xs">
          <span className="text-[7px] font-bold text-slate-400 uppercase leading-none">NAAC</span>
          <span className="text-[11px] font-black text-red-600 leading-none">A+</span>
        </div>

        {/* NIRF Badge */}
        <div className="w-10 h-10 rounded-full border-2 border-indigo-600 bg-white flex flex-col items-center justify-center text-center shadow-2xs">
          <span className="text-[7px] font-bold text-slate-400 uppercase leading-none">nirf</span>
          <span className="text-[10px] font-black text-indigo-700 leading-none">70th</span>
        </div>

        {/* NBA Badge */}
        <div className="w-10 h-10 rounded-full border-2 border-amber-500 bg-white flex flex-col items-center justify-center text-center shadow-2xs">
          <span className="text-[7px] font-bold text-slate-400 uppercase leading-none">NBA</span>
          <span className="text-[8px] font-black text-amber-700 leading-none">TIER 1</span>
        </div>

        {/* QS Diamond Badge */}
        <div className="w-10 h-10 rounded-full border-2 border-yellow-500 bg-white flex flex-col items-center justify-center text-center shadow-2xs">
          <span className="text-[7px] font-bold text-slate-400 uppercase leading-none">QS</span>
          <span className="text-[8px] font-black text-yellow-700 leading-none">DIAMOND</span>
        </div>

        {/* UGC 12(B) Badge */}
        <div className="w-10 h-10 rounded-full border-2 border-purple-600 bg-white flex flex-col items-center justify-center text-center shadow-2xs">
          <span className="text-[7px] font-bold text-slate-400 uppercase leading-none">UGC</span>
          <span className="text-[8px] font-black text-purple-700 leading-none">12(B)</span>
        </div>

        {/* AICTE Badge */}
        <div className="w-10 h-10 rounded-full border-2 border-blue-600 bg-white flex flex-col items-center justify-center text-center shadow-2xs">
          <span className="text-[7px] font-bold text-slate-400 uppercase leading-none">AICTE</span>
          <span className="text-[8px] font-black text-blue-700 leading-none">APPRVD</span>
        </div>

        {/* ABET Badge */}
        <div className="w-10 h-10 rounded-full border-2 border-rose-500 bg-white flex flex-col items-center justify-center text-center shadow-2xs">
          <span className="text-[8px] font-black text-rose-700 leading-none">ABET</span>
        </div>
      </div>
    </header>
  );
}

export default InstitutionalOfficialHeader;
