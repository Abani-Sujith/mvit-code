import React from 'react';
import { Search } from 'lucide-react';
import Button from '../../../components/ui/Button';
import { TeamsFilters } from '../types';

interface EmptyStateSectionProps {
  isEmpty: boolean;
  filters: TeamsFilters;
}

const EmptyStateSection: React.FC<EmptyStateSectionProps> = ({ isEmpty, filters }) => (
  <>
    {isEmpty && (
      <div className="glass-card rounded-2xl p-12 text-center border-dashed border-2 border-border/60">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-border">
          <Search className="h-10 w-10 text-textMuted" />
        </div>
        <h3 className="text-xl font-bold text-ink-black mb-2">No teams found</h3>
        <p className="text-textMuted max-w-md mx-auto">We couldn't find any teams matching your current search criteria or filters. Try adjusting them to see more results.</p>
        <Button variant="secondary" className="mt-6" onClick={() => { filters.setSearchTerm(''); filters.setSelectedDept(''); filters.setSelectedSection(''); filters.setShowOnlyLeaderTeams(false); }}>Clear Filters</Button>
      </div>
    )}
  </>
);

export default EmptyStateSection;
