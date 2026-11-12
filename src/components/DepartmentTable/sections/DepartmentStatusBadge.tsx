import React from 'react';

interface DepartmentStatusBadgeProps {
  status: string;
}

const DepartmentStatusBadge: React.FC<DepartmentStatusBadgeProps> = ({ status }) => {
  let StatusBadge = (
    <span className="text-[10px] uppercase font-bold px-2.5 py-1 rounded-full bg-surface-container text-secondary border border-ink-black/20">
      N/A
    </span>
  );
  if (status === 'Elite')
    StatusBadge = (
      <span className="text-[10px] uppercase font-bold px-2.5 py-1 rounded-full bg-ink-black text-pure-white border border-ink-black">
        Elite
      </span>
    );
  if (status === 'Good')
    StatusBadge = (
      <span className="text-[10px] uppercase font-bold px-2.5 py-1 rounded-full bg-primary-fixed text-ink-black border border-ink-black">
        Good
      </span>
    );
  if (status === 'Risk')
    StatusBadge = (
      <span className="text-[10px] uppercase font-bold px-2.5 py-1 rounded-full bg-error-container text-error border border-ink-black">
        Risk
      </span>
    );

  return StatusBadge;
};

export default DepartmentStatusBadge;
