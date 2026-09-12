import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';
import { useFilters } from '../../contexts/FilterContext';

export function FilterBar() {
  const { filters, updateFilter, resetFilters, activeFiltersCount } = useFilters();

  return (
    <div className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-6 py-2.5 sticky top-16 z-20 flex flex-wrap items-center justify-between gap-3 text-xs shadow-2xs">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1.5 text-slate-500 font-semibold shrink-0">
          <Filter className="w-3.5 h-3.5 text-institutional-600" />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-institutional-600 text-white font-bold text-[10px] flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </div>

        {/* Academic Year */}
        <div className="flex items-center gap-1">
          <span className="text-slate-400 font-medium">Year:</span>
          <select
            value={filters.academicYear}
            onChange={(e) => updateFilter('academicYear', e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-institutional-500"
          >
            <option value="2026–27">2026–27</option>
            <option value="2025–26">2025–26</option>
          </select>
        </div>

        {/* Semester */}
        <div className="flex items-center gap-1">
          <span className="text-slate-400 font-medium">Sem:</span>
          <select
            value={filters.semester}
            onChange={(e) => updateFilter('semester', e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-institutional-500"
          >
            <option value="Semester 1">Semester 1 (Fall)</option>
            <option value="Semester 2">Semester 2 (Spring)</option>
          </select>
        </div>

        {/* Department */}
        <div className="flex items-center gap-1">
          <span className="text-slate-400 font-medium">Dept:</span>
          <select
            value={filters.department}
            onChange={(e) => updateFilter('department', e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-institutional-500"
          >
            <option value="all">All Departments</option>
            <option value="CSE">CSE (Computer Science)</option>
            <option value="ECE">ECE (Electronics)</option>
            <option value="AI & DS">AI & DS (Data Science)</option>
            <option value="EEE">EEE (Electrical)</option>
            <option value="MECH">MECH (Mechanical)</option>
            <option value="CIVIL">CIVIL (Civil)</option>
          </select>
        </div>

        {/* Programme */}
        <div className="flex items-center gap-1">
          <span className="text-slate-400 font-medium">Prog:</span>
          <select
            value={filters.programme}
            onChange={(e) => updateFilter('programme', e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-institutional-500"
          >
            <option value="all">All</option>
            <option value="B.Tech">B.Tech</option>
            <option value="M.Tech">M.Tech</option>
          </select>
        </div>

        {/* Year Level */}
        <div className="flex items-center gap-1">
          <span className="text-slate-400 font-medium">Class Year:</span>
          <select
            value={filters.year}
            onChange={(e) => updateFilter('year', e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-institutional-500"
          >
            <option value="all">All Years</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
        </div>

        {/* Section */}
        <div className="flex items-center gap-1">
          <span className="text-slate-400 font-medium">Section:</span>
          <select
            value={filters.section}
            onChange={(e) => updateFilter('section', e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-institutional-500"
          >
            <option value="all">All Sections</option>
            <option value="A">Section A</option>
            <option value="B">Section B</option>
            <option value="C">Section C</option>
            <option value="D">Section D</option>
          </select>
        </div>
      </div>

      {activeFiltersCount > 0 && (
        <button
          type="button"
          onClick={resetFilters}
          className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      )}
    </div>
  );
}
