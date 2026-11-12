import React from 'react';
import { FileJson } from 'lucide-react';
import { DailyTotal, Hierarchy } from '../../../types';

interface DataSummarySectionProps {
  data: DailyTotal[];
  hierarchy: Hierarchy;
}

const DataSummarySection: React.FC<DataSummarySectionProps> = ({ data, hierarchy }) => (
  <div className="bg-surface border border-ink-black rounded-2xl p-4">
    <p className="font-label-sm text-xs uppercase tracking-wider text-secondary mb-3 flex items-center gap-2">
      <FileJson className="h-3.5 w-3.5 text-primary-container" />
      <span>Current Data Summary</span>
    </p>
    <div className="grid grid-cols-3 gap-4">
      <div className="text-center">
        <div className="font-headline-sm text-2xl text-primary-container tabular-nums">
          {data?.length?.toLocaleString() || 0}
        </div>
        <div className="font-label-sm text-[10px] text-secondary uppercase tracking-wider mt-1">
          Total Records
        </div>
      </div>
      <div className="text-center">
        <div className="font-headline-sm text-2xl text-ink-black tabular-nums">
          {hierarchy ? Object.keys(hierarchy).length : 0}
        </div>
        <div className="font-label-sm text-[10px] text-secondary uppercase tracking-wider mt-1">
          Departments
        </div>
      </div>
      <div className="text-center">
        <div className="font-headline-sm text-2xl text-ink-black tabular-nums">
          {new Set((data || []).map(d => d?.memberId).filter(Boolean)).size}
        </div>
        <div className="font-label-sm text-[10px] text-secondary uppercase tracking-wider mt-1">
          Unique Members
        </div>
      </div>
    </div>
  </div>
);

export default DataSummarySection;
