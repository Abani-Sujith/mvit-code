import React from 'react';
import { Activity, X } from 'lucide-react';
import MemberTable from '../../../components/MemberTable';
import { DailyTotal } from '../../../types';

interface DataTabSectionProps {
  filtered: DailyTotal[];
  intelligenceFilter: string | null;
  onResetFilter: () => void;
}

export const DataTabSection: React.FC<DataTabSectionProps> = ({
  filtered,
  intelligenceFilter,
  onResetFilter,
}) => {
  return (
    <div className="space-y-4 select-none">
       {intelligenceFilter && (
          <div className="flex items-center justify-between bg-surface-tint border-2 border-ink-black p-4 rounded-2xl">
             <div className="flex items-center gap-2 text-ink-black text-xs font-label-lg uppercase tracking-wider font-bold">
                <Activity className="w-4 h-4 text-primary-container" /> 
                <span>Filtered by: <strong>{intelligenceFilter}</strong></span>
             </div>
             <button 
               onClick={onResetFilter} 
               className="rounded-full bg-ink-black text-pure-white px-3.5 py-1 text-xs font-label-lg uppercase tracking-wider border border-ink-black hover:bg-primary-container transition-none inline-flex items-center gap-1"
             >
               <span>Reset</span>
               <X className="w-3 h-3" />
             </button>
          </div>
       )}
       <div className="border-2 border-ink-black rounded-3xl overflow-hidden bg-pure-white shadow-sm">
          <MemberTable data={filtered} />
       </div>
    </div>
  );
};

export default DataTabSection;
