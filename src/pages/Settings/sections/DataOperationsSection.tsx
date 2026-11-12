import React from 'react';
import { Download, RefreshCw, Trash2, Upload } from 'lucide-react';

interface DataOperationsSectionProps {
  onExportData: () => void;
  onImportData: () => void;
  onRefreshData: () => void;
  onClearCache: () => void;
}

const DataOperationsSection: React.FC<DataOperationsSectionProps> = ({
  onExportData,
  onImportData,
  onRefreshData,
  onClearCache,
}) => (
  <div>
    <label className="block font-label-sm text-xs uppercase tracking-wider text-secondary mb-3">
      Data Operations
    </label>
    <div className="flex flex-wrap gap-2.5">
      <button
        type="button"
        onClick={onExportData}
        className="rounded-full border border-ink-black px-4 py-2 bg-pure-white text-ink-black hover:bg-surface-container font-label-lg text-xs uppercase tracking-wider transition-none flex items-center gap-2"
      >
        <Download className="h-3.5 w-3.5 text-primary-container" />
        <span>Export Data</span>
      </button>
      <button
        type="button"
        onClick={onImportData}
        className="rounded-full border border-ink-black px-4 py-2 bg-pure-white text-ink-black hover:bg-surface-container font-label-lg text-xs uppercase tracking-wider transition-none flex items-center gap-2"
      >
        <Upload className="h-3.5 w-3.5 text-ink-black" />
        <span>Import Data</span>
      </button>
      <button
        type="button"
        onClick={onRefreshData}
        className="rounded-full border border-ink-black px-4 py-2 bg-pure-white text-ink-black hover:bg-surface-container font-label-lg text-xs uppercase tracking-wider transition-none flex items-center gap-2"
      >
        <RefreshCw className="h-3.5 w-3.5 text-primary-container" />
        <span>Refresh Data</span>
      </button>
      <button
        type="button"
        onClick={onClearCache}
        className="rounded-full border border-ink-black px-4 py-2 bg-pure-white text-ink-black hover:bg-surface-container font-label-lg text-xs uppercase tracking-wider transition-none flex items-center gap-2"
      >
        <Trash2 className="h-3.5 w-3.5 text-error" />
        <span>Clear Cache</span>
      </button>
    </div>
  </div>
);

export default DataOperationsSection;
