import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Settings as SettingsIcon } from 'lucide-react';

const SettingsHeaderSection: React.FC = () => (
  <>
    {/* Breadcrumb Navigation */}
    <nav className="flex items-center space-x-2 text-xs font-label-sm uppercase tracking-wider text-secondary bg-pure-white w-fit px-4 py-1.5 rounded-full border border-ink-black">
      <Link to="/" className="hover:text-primary-container transition-none">Dashboard</Link>
      <ChevronRight className="h-3.5 w-3.5 text-secondary" />
      <span className="font-bold text-ink-black flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-primary-container"></span>
        Settings
      </span>
    </nav>

    {/* Header Banner */}
    <div className="border-2 border-ink-black rounded-3xl bg-pure-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
      <div className="text-left max-w-2xl">
        <div className="inline-flex items-center gap-2 bg-ink-black text-pure-white px-3.5 py-1 rounded-full border border-ink-black font-label-sm text-[11px] tracking-wider uppercase mb-3">
          <SettingsIcon className="w-3.5 h-3.5 text-primary-fixed" />
          <span>System Configuration</span>
        </div>
        <h1 className="font-headline-md font-normal [font-synthesis:none] text-3xl sm:text-5xl uppercase tracking-tight text-ink-black m-0 leading-tight">
          Application Settings
        </h1>
        <p className="font-body-md text-ink-black text-sm sm:text-base mt-2 max-w-xl">
          Configure your MVIT Code preferences, appearance, and data management options.
        </p>
      </div>
    </div>
  </>
);

export default SettingsHeaderSection;
