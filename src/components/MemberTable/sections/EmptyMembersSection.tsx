import React from 'react';
import { Search } from 'lucide-react';

interface EmptyMembersSectionProps {
  isEmpty: boolean;
}

const EmptyMembersSection: React.FC<EmptyMembersSectionProps> = ({ isEmpty }) => (
  <>
    {isEmpty && (
      <div className="p-16 text-center text-secondary">
        <Search className="w-10 h-10 mx-auto mb-3 opacity-30 text-ink-black" />
        <p className="font-label-lg uppercase tracking-wider text-xs">No records found matching query</p>
      </div>
    )}
  </>
);

export default EmptyMembersSection;
