import React from 'react';
import { X, LayoutDashboard } from 'lucide-react';

interface HeaderSectionProps {
  department: any;
  onClose: () => void;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ department, onClose }) => (
  <div className="p-6 border-b-2 border-ink-black bg-surface-tint sticky top-0 z-10 flex justify-between items-start">
    <div>
      <h2 className="text-3xl font-black text-ink-black tracking-tight mb-1 [font-synthesis:none] font-display uppercase">
        {department.deptName}
      </h2>
      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-secondary mt-2">
        <span className="px-2 py-0.5 border border-ink-black rounded-full flex items-center gap-1 bg-pure-white">
          <LayoutDashboard className="w-3 h-3" /> Department overview
        </span>
      </div>
    </div>
    <button
      onClick={onClose}
      className="p-2 bg-pure-white hover:bg-surface-container text-ink-black rounded-full transition-none border border-ink-black"
    >
      <X className="w-5 h-5" />
    </button>
  </div>
);

export default HeaderSection;
