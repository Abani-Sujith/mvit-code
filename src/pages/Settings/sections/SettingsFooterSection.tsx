import React from 'react';
import { RotateCcw, Save } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface SettingsFooterSectionProps {
  hasChanges: boolean;
  onResetDefaults: () => void;
  onSaveSettings: () => void;
}

const SettingsFooterSection: React.FC<SettingsFooterSectionProps> = ({
  hasChanges,
  onResetDefaults,
  onSaveSettings,
}) => (
  <div className="border-t border-ink-black pt-5 pb-8 flex items-center justify-between flex-wrap gap-4">
    <div>
      {hasChanges ? (
        <span className="font-label-sm text-xs uppercase tracking-wider text-primary-container font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
          You have unsaved changes
        </span>
      ) : (
        <span className="font-label-sm text-xs uppercase tracking-wider text-secondary">
          All settings are saved
        </span>
      )}
    </div>

    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onResetDefaults}
        className="rounded-full border border-ink-black px-5 py-2 font-label-lg text-xs uppercase tracking-wider bg-pure-white text-ink-black hover:bg-surface-container transition-none flex items-center gap-2"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        <span>Reset Defaults</span>
      </button>
      <button
        type="button"
        onClick={onSaveSettings}
        className={cn(
          'rounded-full border border-ink-black px-6 py-2 font-label-lg text-xs uppercase tracking-wider transition-none flex items-center gap-2',
          hasChanges
            ? 'bg-ink-black text-pure-white hover:bg-primary-container'
            : 'bg-surface-container text-secondary cursor-not-allowed'
        )}
        disabled={!hasChanges}
      >
        <Save className="h-3.5 w-3.5" />
        <span>Save Changes</span>
      </button>
    </div>
  </div>
);

export default SettingsFooterSection;
