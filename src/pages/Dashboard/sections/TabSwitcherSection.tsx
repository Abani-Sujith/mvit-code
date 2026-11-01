import React from 'react';
import { BrainCircuit, Database, Building2, ChevronRight } from 'lucide-react';
import { Hierarchy } from '../../../types';

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
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-surface p-3 sm:p-4 rounded-3xl border border-border transition-all">
       <div className="flex items-center gap-2 bg-background p-1.5 rounded-2xl border border-border w-full md:w-auto">
          <button 
             onClick={() => { setViewMode('intelligence'); setIntelligenceFilter(null); }} 
             className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${viewMode === 'intelligence' ? 'bg-brand-500 text-white shadow-xl' : 'text-textMuted hover:text-textMain'}`}
          >
             <BrainCircuit className="w-4 h-4" /> Intelligence
          </button>
          <button 
             onClick={() => setViewMode('data')} 
             className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${viewMode === 'data' ? 'bg-brand-500 text-white shadow-xl' : 'text-textMuted hover:text-textMain'}`}
          >
             <Database className="w-4 h-4" /> Data
          </button>
       </div>

       <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative group flex-1 md:flex-none">
             <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-textMuted" />
             <select value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)} className="appearance-none pl-9 pr-10 py-2.5 bg-background border border-border rounded-xl focus:ring-2 focus:ring-brand-500/50 text-textMain text-xs sm:text-sm font-bold w-full outline-none">
               <option value="">System Wide</option>
               {departments.map((id) => (
                 <option key={id} value={id}>{hierarchy?.[id]?.name || id}</option>
               ))}
             </select>
             <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textMuted rotate-90" />
          </div>
       </div>
    </div>
  );
};

export default TabSwitcherSection;
