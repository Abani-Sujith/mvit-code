import React from 'react';
import { ChevronRight } from 'lucide-react';
import { AppSettings } from '../useSettings';

interface RefreshIntervalSectionProps {
  settings: AppSettings;
  onRefreshIntervalChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const RefreshIntervalSection: React.FC<RefreshIntervalSectionProps> = ({ settings, onRefreshIntervalChange }) => (
  <div>
    <label className="block font-label-sm text-xs uppercase tracking-wider text-secondary mb-2">
      Auto-Refresh Interval
    </label>
    <div className="relative max-w-xs">
      <select
        value={settings.refreshInterval}
        onChange={onRefreshIntervalChange}
        className="w-full appearance-none rounded-full border border-ink-black px-4 py-2 bg-surface text-ink-black font-label-sm text-xs uppercase tracking-wider focus:outline-none focus:border-primary-container cursor-pointer"
      >
        <option value="15">15 minutes</option>
        <option value="30">30 minutes</option>
        <option value="60">1 hour</option>
        <option value="180">3 hours</option>
        <option value="0">Disabled</option>
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-ink-black">
        <ChevronRight className="h-3.5 w-3.5 rotate-90" />
      </div>
    </div>
  </div>
);

export default RefreshIntervalSection;
