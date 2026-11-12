import React from 'react';
import { Building2, RefreshCcw, Search } from 'lucide-react';

interface HeaderSectionProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  syncing: boolean;
  handleSync: () => void;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({
  searchQuery,
  setSearchQuery,
  syncing,
  handleSync,
}) => (
  <div className="border-2 border-ink-black rounded-3xl bg-pure-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
    <div className="text-left max-w-2xl">
      <div className="inline-flex items-center gap-2 bg-ink-black text-pure-white px-3.5 py-1 rounded-full border border-ink-black font-label-sm text-[11px] tracking-wider uppercase mb-3">
        <Building2 className="w-3.5 h-3.5 text-primary-fixed" />
        <span>All Departments</span>
      </div>
      <h1 className="font-headline-md text-3xl sm:text-5xl uppercase tracking-tight text-ink-black m-0 leading-tight [font-synthesis:none]">
        Department Performance
      </h1>
      <p className="font-body-md text-on-surface-variant text-sm sm:text-base mt-2 max-w-xl">
        Organizational performance metrics, eligibility tracking, and department-wise growth analytics.
      </p>
    </div>

    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
      <div className="relative flex-1 sm:w-64">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary pointer-events-none" />
        <input
          type="text"
          placeholder="Search departments..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2 rounded-full border border-ink-black bg-surface font-body-md text-xs text-ink-black placeholder:text-secondary focus:outline-none focus:border-primary-container"
        />
      </div>

      <button
        onClick={handleSync}
        disabled={syncing}
        className="rounded-full bg-ink-black text-pure-white px-5 py-2 font-label-lg text-xs uppercase tracking-wider border border-ink-black hover:bg-primary-container transition-none disabled:opacity-40 flex items-center gap-2"
      >
        <RefreshCcw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
        <span>{syncing ? 'Syncing...' : 'Sync data'}</span>
      </button>
    </div>
  </div>
);

export default HeaderSection;

