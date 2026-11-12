import React from 'react';
import { Trophy } from 'lucide-react';
import { LeaderboardFilters } from '../types';

interface EmptyStateSectionProps {
  isEmpty: boolean;
  filters: LeaderboardFilters;
}

const EmptyStateSection: React.FC<EmptyStateSectionProps> = ({ isEmpty, filters }) => (
  <>
    {isEmpty && (
      <div className="border-2 border-dashed border-ink-black rounded-3xl p-12 text-center bg-pure-white">
        <div className="w-16 h-16 bg-surface-container rounded-full border border-ink-black flex items-center justify-center mx-auto mb-4">
          <Trophy className="h-8 w-8 text-secondary" />
        </div>
        <h3 className="font-headline-sm text-2xl uppercase tracking-tight text-ink-black mb-2">
          No records for this scope
        </h3>
        <p className="font-body-md text-secondary max-w-sm mx-auto mb-6 text-sm">
          No student performance records matched the selected filters.
        </p>
        <button
          onClick={() => {
            filters.setViewLevel('global');
            filters.setSelectedDept('');
            filters.setSelectedSection('');
            filters.setSelectedTeam('');
          }}
          className="rounded-full bg-ink-black text-pure-white px-6 py-2 font-label-lg text-xs uppercase tracking-wider border border-ink-black hover:bg-primary-container transition-none"
        >
          Reset to Global View
        </button>
      </div>
    )}
  </>
);

export default EmptyStateSection;
