import React from 'react';
import { Activity } from 'lucide-react';
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
    <div className="space-y-4 animate-fade-in px-minus-2">
       {intelligenceFilter && (
          <div className="flex items-center justify-between bg-brand-500/10 border border-brand-500/30 p-4 rounded-2xl mx-2 sm:mx-0">
             <div className="flex items-center gap-3 text-brand-500 text-sm font-black uppercase tracking-widest">
                <Activity className="w-4 h-4" /> 
                {intelligenceFilter} filtered
             </div>
             <button onClick={onResetFilter} className="px-3 py-1 rounded-full bg-brand-500 text-white text-[10px] font-black uppercase tracking-widest shadow-lg">Reset</button>
          </div>
       )}
       <div className="bg-surface sm:rounded-3xl border sm:border border-border shadow-2xl overflow-hidden">
          <MemberTable data={filtered} />
       </div>
    </div>
  );
};

export default DataTabSection;
