import React from 'react';
import { Activity, ChevronDown, Search } from 'lucide-react';
import { TableControlsSectionProps } from '../types';

const TableControlsSection: React.FC<TableControlsSectionProps> = ({
  filteredMemberCount,
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  setCurrentPage,
}) => (
  <div className="p-4 sm:p-5 border-b border-ink-black flex flex-col md:flex-row justify-between items-center gap-4 bg-pure-white">
    <div className="flex items-center gap-2">
      <Activity className="w-5 h-5 text-primary-container" />
      <h2 className="font-headline-sm text-xl uppercase tracking-tight text-ink-black m-0">Student Coding Matrix</h2>
      <span className="rounded-full bg-ink-black text-pure-white px-3 py-0.5 font-label-sm text-[10px] uppercase tracking-wider border border-ink-black">
        {filteredMemberCount} records
      </span>
    </div>

    <div className="flex w-full md:w-auto items-center gap-2 sm:gap-3 flex-wrap">
      <div className="relative flex-1 md:w-64">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-secondary" />
        <input
          type="text"
          placeholder="Search student or team..."
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          className="pl-8 w-full pr-4 py-1.5 rounded-full border border-ink-black font-body-md text-xs bg-pure-white text-ink-black placeholder:text-secondary focus:outline-none focus:border-primary-container"
        />
      </div>
      <div className="relative">
        <select
          value={sortBy}
          onChange={(e) => { setSortBy(e.target.value as 'name' | 'performance'); setCurrentPage(1); }}
          className="appearance-none rounded-full border border-ink-black px-4 py-1.5 bg-pure-white text-ink-black font-label-sm text-xs uppercase tracking-wider pr-8 cursor-pointer focus:outline-none"
        >
          <option value="performance">By Performance</option>
          <option value="name">By Name</option>
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink-black pointer-events-none" />
      </div>
    </div>
  </div>
);

export default TableControlsSection;
