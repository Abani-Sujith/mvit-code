import React from 'react';
import { Palette } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface AppearanceSectionProps {
  appTheme: 'light' | 'dark' | 'auto';
  setAppTheme: (theme: 'light' | 'dark' | 'auto') => void;
}

const AppearanceSection: React.FC<AppearanceSectionProps> = ({ appTheme, setAppTheme }) => (
  <div className="border-2 border-ink-black rounded-3xl bg-pure-white p-6 sm:p-8">
    <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-ink-black">
      <Palette className="h-5 w-5 text-ink-black" />
      <h2 className="font-headline-sm font-normal [font-synthesis:none] text-2xl uppercase tracking-tight text-ink-black m-0">
        Appearance
      </h2>
    </div>

    <div className="space-y-4">
      <div>
        <label className="block font-label-sm text-xs uppercase tracking-wider text-secondary mb-3">
          Theme Preference
        </label>
        <div className="grid grid-cols-3 gap-3 max-w-md">
          {(['light', 'dark', 'auto'] as const).map((themeOption) => {
            const active = appTheme === themeOption;
            return (
              <button
                key={themeOption}
                type="button"
                onClick={() => setAppTheme(themeOption)}
                className={cn(
                  'py-2.5 px-4 rounded-full border border-ink-black font-label-lg text-xs uppercase tracking-wider transition-none flex items-center justify-center gap-2',
                  active
                    ? 'bg-ink-black text-pure-white'
                    : 'bg-surface text-ink-black hover:bg-surface-container'
                )}
              >
                <span
                  className={cn(
                    'w-2 h-2 rounded-full border border-ink-black',
                    active ? 'bg-primary-container' : 'bg-transparent'
                  )}
                />
                <span>{themeOption}</span>
              </button>
            );
          })}
        </div>
        <p className="font-body-md text-xs text-ink-black mt-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary-container"></span>
          Currently using <span className="font-bold uppercase">{appTheme}</span> theme
        </p>
      </div>
    </div>
  </div>
);

export default AppearanceSection;
