import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Building2, AlertTriangle, Crown, Activity } from 'lucide-react';
import PerformanceBar from './ui/PerformanceBar';

interface DepartmentCardProps {
  department: any; // Mapped to the DepartmentComparison interface from dataProcessing
  onClick: () => void;
}

const DepartmentCard: React.FC<DepartmentCardProps> = ({ department, onClick }) => {
  let StatusBadge = (
    <span className="rounded-full bg-surface-container text-ink-black border border-ink-black px-3 py-0.5 font-label-sm text-[10px] uppercase">
      N/A
    </span>
  );

  if (department.status === 'Elite') {
    StatusBadge = (
      <span className="rounded-full bg-ink-black text-pure-white border border-ink-black px-3 py-0.5 font-label-sm text-[10px] uppercase tracking-wider">
        Elite
      </span>
    );
  } else if (department.status === 'Good') {
    StatusBadge = (
      <span className="rounded-full bg-primary-fixed text-ink-black border border-ink-black px-3 py-0.5 font-label-sm text-[10px] uppercase tracking-wider">
        Growth Track
      </span>
    );
  } else if (department.status === 'Risk') {
    StatusBadge = (
      <span className="rounded-full bg-error text-pure-white border border-ink-black px-3 py-0.5 font-label-sm text-[10px] uppercase tracking-wider">
        Attention
      </span>
    );
  }

  return (
    <div 
       className="border-2 border-ink-black rounded-3xl bg-pure-white p-5 flex flex-col justify-between select-none"
    >
      {/* Header: Identity */}
      <div 
        onClick={onClick}
        className="flex justify-between items-start mb-4 cursor-pointer"
      >
        <div className="min-w-0 pr-2">
           <h3 className="font-headline-sm text-xl uppercase tracking-tight text-ink-black hover:text-primary-container truncate m-0">
              {department.deptName}
           </h3>
           <div className="flex items-center gap-2 mt-1 font-label-sm text-[10px] text-secondary uppercase tracking-wider">
              <span className="flex items-center gap-1 shrink-0"><Building2 className="w-3 h-3"/> {department.totalTeams} Teams</span>
              <span className="w-1 h-1 rounded-full bg-ink-black shrink-0"></span>
              <span className="flex items-center gap-1 shrink-0"><Users className="w-3 h-3"/> {department.totalMembers} Students</span>
           </div>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          {StatusBadge}
          {department.isImbalanced && (
            <span className="font-label-sm text-[9px] uppercase px-2 py-0.5 rounded-full bg-surface-tint text-ink-black border border-ink-black flex items-center gap-1">
              <AlertTriangle className="w-2.5 h-2.5 text-primary-container" /> Gap
            </span>
          )}
        </div>
      </div>

      {/* Core Metrics Grid */}
      <div className="grid grid-cols-2 gap-3 mb-5">
         <div className="bg-surface border border-ink-black rounded-2xl p-3">
            <p className="font-label-sm text-[10px] text-secondary uppercase tracking-wider mb-1">Total Solved</p>
            <p className="font-headline-sm text-2xl text-primary-container leading-none tabular-nums">{department.totalSolved.toLocaleString()}</p>
         </div>
         <div className="bg-surface border border-ink-black rounded-2xl p-3">
            <p className="font-label-sm text-[10px] text-secondary uppercase tracking-wider mb-1 flex items-center justify-between">
               <span>Avg Score</span>
               {department.trend > 0 && <span className="text-ink-black font-bold text-[9px] shrink-0">+{department.trend}</span>}
            </p>
            <p className="font-headline-sm text-2xl text-ink-black leading-none tabular-nums">{department.avgPerMember.toLocaleString()}</p>
         </div>
      </div>

      {/* Visual Indicator */}
      <div className="mb-5 bg-surface rounded-2xl p-3 border border-ink-black">
         <p className="font-label-sm text-[10px] text-secondary uppercase tracking-wider mb-2 flex items-center gap-1.5">
           <Activity className="w-3 h-3 text-primary-container"/> Performance Velocity
         </p>
         <PerformanceBar value={department.avgPerMember} maxValue={800} />
      </div>

      {/* Intelligence Callouts */}
      <div className="space-y-2 pt-3 border-t border-ink-black/15">
         {department.topTeam ? (
            <Link to={`/team/${department.deptId}/${department.topTeam.sectionId}/${department.topTeam.id}`} className="flex justify-between items-center bg-surface px-3 py-1.5 rounded-full border border-ink-black hover:bg-surface-tint transition-none">
               <div className="flex items-center gap-1.5 min-w-0">
                  <Crown className="w-3 h-3 text-primary-container" />
                  <span className="font-label-sm text-[11px] text-ink-black truncate uppercase">Top: {department.topTeam.name}</span>
               </div>
               <span className="font-bold text-ink-black text-xs">→</span>
            </Link>
         ) : null}

         {department.weakestTeam ? (
            <Link to={`/team/${department.deptId}/${department.weakestTeam.sectionId}/${department.weakestTeam.id}`} className="flex justify-between items-center bg-surface px-3 py-1.5 rounded-full border border-ink-black hover:bg-surface-container transition-none">
               <div className="flex items-center gap-1.5 min-w-0">
                  <AlertTriangle className="w-3 h-3 text-primary" />
                  <span className="font-label-sm text-[11px] text-secondary truncate uppercase">Risk: {department.weakestTeam.name}</span>
               </div>
               <span className="font-bold text-secondary text-xs">→</span>
            </Link>
         ) : null}
      </div>
    </div>
  );
};

export default DepartmentCard;


