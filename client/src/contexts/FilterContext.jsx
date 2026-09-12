import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export const INITIAL_FILTERS = {
  academicYear: '2026–27',
  semester: 'Semester 1',
  department: 'CSE',
  programme: 'B.Tech',
  year: 'all',
  section: 'all',
  priorityFilter: 'all'
};

export function FilterProvider({ children }) {
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  const activeFiltersCount = Object.entries(filters).filter(([k, v]) => {
    if (k === 'academicYear' || k === 'semester') return false;
    return v !== 'all' && v !== 'CSE';
  }).length;

  return (
    <FilterContext.Provider value={{ filters, updateFilter, resetFilters, activeFiltersCount }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  return useContext(FilterContext);
}
