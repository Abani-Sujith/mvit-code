import React from 'react';
import { LayoutGrid, Database, Building2, ChevronDown } from 'lucide-react';
import { Hierarchy } from '../../../types';
import { cn } from '../../../utils/cn';

interface TabSwitcherSectionProps {
  viewMode: 'intelligence' | 'data';
  setViewMode: (mode: 'intelligence' | 'data') => void;
  setIntelligenceFilter: (filter: string | null) => void;
  selectedDept: string;
  setSelectedDept: (dept: string) => void;
  departments: string[];
  hierarchy: Hierarchy;
}

export const TabSwitcherSection: React.FC<TabSwitcherSectionProps> = ({
  viewMode,
  setViewMode,
  setIntelligenceFilter,
  selectedDept,
  setSelectedDept,
  departments,
  hierarchy,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-pure-white p-3 sm:p-4 rounded-3xl border-2 border-ink-black select-none">
       {/* Overview vs Data Pills */}
       <div className="flex items-center gap-1 bg-surface p-1 rounded-full border border-ink-black w-full md:w-auto">
          <button 
             onClick={() => { setViewMode('intelligence'); setIntelligenceFilter(null); }} 
             className={cn(
               'flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-1.5 rounded-full font-label-lg text-xs uppercase tracking-wider transition-none',
               viewMode === 'intelligence' 
                 ? 'bg-ink-black text-pure-white border border-ink-black' 
                 : 'text-secondary hover:text-ink-black border border-transparent'
             )}
          >
             <LayoutGrid className="w-3.5 h-3.5" /> Overview
          </button>
          <button 
             onClick={() => setViewMode('data')} 
             className={cn(
               'flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-1.5 rounded-full font-label-lg text-xs uppercase tracking-wider transition-none',
               viewMode === 'data' 
                 ? 'bg-ink-black text-pure-white border border-ink-black' 
                 : 'text-secondary hover:text-ink-black border border-transparent'
             )}
          >
             <Database className="w-3.5 h-3.5" /> Data
          </button>
       </div>

       {/* Department Selector Pill */}
       <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex items-center border border-ink-black rounded-full bg-pure-white px-3 py-1.5 flex-1 md:flex-none">
             <Building2 className="w-4 h-4 text-ink-black mr-2 shrink-0" />
             <select 
               value={selectedDept} 
               onChange={(e) => setSelectedDept(e.target.value)} 
               className="appearance-none bg-transparent font-label-lg text-xs uppercase tracking-wider text-ink-black pr-6 focus:outline-none cursor-pointer w-full"
             >
               <option value="">System Wide</option>
               {departments.map((id) => (
                 <option key={id} value={id}>{hierarchy?.[id]?.name || id}</option>
               ))}
             </select>
             <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink-black pointer-events-none" />
          </div>
       </div>
    </div>
  );
};

export default TabSwitcherSection;
