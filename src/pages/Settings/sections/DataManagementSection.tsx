import React from 'react';
import { Database } from 'lucide-react';
import { DailyTotal, Hierarchy } from '../../../types';
import { AppSettings } from '../useSettings';
import DataOperationsSection from './DataOperationsSection';
import DataSummarySection from './DataSummarySection';
import RefreshIntervalSection from './RefreshIntervalSection';

interface DataManagementSectionProps {
  settings: AppSettings;
  onRefreshIntervalChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onExportData: () => void;
  onImportData: () => void;
  onRefreshData: () => void;
  onClearCache: () => void;
  data: DailyTotal[];
  hierarchy: Hierarchy;
}

const DataManagementSection: React.FC<DataManagementSectionProps> = ({
  settings,
  onRefreshIntervalChange,
  onExportData,
  onImportData,
  onRefreshData,
  onClearCache,
  data,
  hierarchy,
}) => (
  <div className="border-2 border-ink-black rounded-3xl bg-pure-white p-6 sm:p-8">
    <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-ink-black">
      <Database className="h-5 w-5 text-ink-black" />
      <h2 className="font-headline-sm font-normal [font-synthesis:none] text-2xl uppercase tracking-tight text-ink-black m-0">
        Data Management
      </h2>
    </div>

    <div className="space-y-6">
      <RefreshIntervalSection settings={settings} onRefreshIntervalChange={onRefreshIntervalChange} />
      <DataOperationsSection
        onExportData={onExportData}
        onImportData={onImportData}
        onRefreshData={onRefreshData}
        onClearCache={onClearCache}
      />
      <DataSummarySection data={data} hierarchy={hierarchy} />
    </div>
  </div>
);

export default DataManagementSection;
