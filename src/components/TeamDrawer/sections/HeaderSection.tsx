import React from 'react';
import { X } from 'lucide-react';

interface HeaderSectionProps {
  team: any;
  onClose: () => void;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ team, onClose }) => (
  <div className="p-6 border-b border-border bg-surface sticky top-0 z-10 flex justify-between items-start">
    <div>
      <h2 className="text-2xl font-black text-textMain tracking-tight mb-1">{team.teamName}</h2>
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-textMuted">
        <span className="w-2 h-2 rounded-full bg-brand-500"></span>
        {team.sectionName} • {team.deptName}
      </div>
    </div>
    <button
      onClick={onClose}
      className="p-2 bg-background hover:bg-border/50 text-textMuted hover:text-textMain rounded-full transition-colors border border-border"
    >
      <X className="w-5 h-5" />
    </button>
  </div>
);

export default HeaderSection;
