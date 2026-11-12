import React, { useState } from 'react';
import { ChevronRight, ChevronDown, CheckCircle, TrendingUp } from 'lucide-react';
import PerformanceBar from './ui/PerformanceBar';

interface DepartmentTableProps {
  data: any[]; // Accepts structured DepartmentComparison layout array
  onRowClick: (dept: any) => void;
}

const DepartmentTable: React.FC<DepartmentTableProps> = ({ data, onRowClick }) => {
  const [sortField, setSortField] = useState<string>('avgPerMember');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Track explicitly which departments are expanded to show internal squad hierarchies
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection(
        field === 'totalSolved' || field === 'avgPerMember' || field === 'trend' ? 'desc' : 'asc'
      );
    }
  };

  const toggleExpand = (deptId: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Avoid triggering the drawer click event natively
    setExpandedRows((prev) => ({ ...prev, [deptId]: !prev[deptId] }));
  };

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortField] as any;
    const bValue = b[sortField] as any;
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    return 0;
  });

  const thClass =
    'px-4 py-3 text-left font-label-lg text-xs text-secondary uppercase tracking-wider font-bold bg-surface-tint border-b border-ink-black';
  const thCenterClass =
    'px-4 py-3 text-center font-label-lg text-xs text-secondary uppercase tracking-wider font-bold bg-surface-tint border-b border-ink-black cursor-pointer group';

  return (
    <div className="overflow-x-auto rounded-2xl border border-ink-black">
      <table className="min-w-full divide-y divide-ink-black/10 text-sm">

        {/* Table Headings */}
        <thead>
          <tr>
            <th className={thClass + ' w-10'}></th>
            <th
              className={thCenterClass + ' text-left'}
              onClick={() => handleSort('deptName')}
            >
              <div className="flex items-center gap-1">
                Department <span className="opacity-0 group-hover:opacity-60 transition-opacity">↕</span>
              </div>
            </th>
            <th
              className={thCenterClass + ' hidden md:table-cell'}
              onClick={() => handleSort('totalTeams')}
            >
              <div className="flex justify-center items-center gap-1">
                Teams <span className="opacity-0 group-hover:opacity-60 transition-opacity">↕</span>
              </div>
            </th>
            <th
              className={thCenterClass + ' hidden md:table-cell'}
              onClick={() => handleSort('totalMembers')}
            >
              <div className="flex justify-center items-center gap-1">
                Members <span className="opacity-0 group-hover:opacity-60 transition-opacity">↕</span>
              </div>
            </th>
            <th
              className={thCenterClass + ' text-right'}
              onClick={() => handleSort('totalSolved')}
            >
              <div className="flex justify-end items-center gap-1">
                Total solved <span className="opacity-0 group-hover:opacity-60 transition-opacity">↕</span>
              </div>
            </th>
            <th
              className={thCenterClass}
              onClick={() => handleSort('avgPerMember')}
            >
              <div className="flex items-center gap-1">
                Average <span className="opacity-0 group-hover:opacity-60 transition-opacity">↕</span>
              </div>
            </th>
            <th
              className={thCenterClass + ' hidden lg:table-cell'}
              onClick={() => handleSort('trend')}
            >
              <div className="flex items-center justify-center gap-1">
                Trend <span className="opacity-0 group-hover:opacity-60 transition-opacity">↕</span>
              </div>
            </th>
            <th className={thClass + ' text-center hidden sm:table-cell'}>Status</th>
            <th className={thClass + ' hidden xl:table-cell'}>Top squad</th>
          </tr>
        </thead>

        {/* Render Rows */}
        <tbody className="divide-y divide-ink-black/10 bg-pure-white">
          {sortedData.map((dept, index) => {
            const isExpanded = expandedRows[dept.deptId];
            const isRank1 =
              index === 0 && sortField === 'avgPerMember' && sortDirection === 'desc';

            let StatusBadge = (
              <span className="text-[10px] uppercase font-bold px-2.5 py-1 rounded-full bg-surface-container text-secondary border border-ink-black/20">
                N/A
              </span>
            );
            if (dept.status === 'Elite')
              StatusBadge = (
                <span className="text-[10px] uppercase font-bold px-2.5 py-1 rounded-full bg-ink-black text-pure-white border border-ink-black">
                  Elite
                </span>
              );
            if (dept.status === 'Good')
              StatusBadge = (
                <span className="text-[10px] uppercase font-bold px-2.5 py-1 rounded-full bg-primary-fixed text-ink-black border border-ink-black">
                  Good
                </span>
              );
            if (dept.status === 'Risk')
              StatusBadge = (
                <span className="text-[10px] uppercase font-bold px-2.5 py-1 rounded-full bg-error-container text-error border border-ink-black">
                  Risk
                </span>
              );

            return (
              <React.Fragment key={dept.deptId}>
                {/* Master Department Row */}
                <tr
                  className={`hover:bg-surface-container/40 cursor-pointer group transition-none ${
                    isRank1 ? 'bg-primary-fixed/30' : ''
                  }`}
                  onClick={() => onRowClick(dept)}
                >
                  {/* Expansion Trigger */}
                  <td className="px-4 py-3 whitespace-nowrap text-center">
                    <button
                      onClick={(e) => toggleExpand(dept.deptId, e)}
                      className="p-1 rounded-full hover:bg-surface-container border border-transparent hover:border-ink-black/20 text-secondary hover:text-ink-black transition-none"
                      title="Expand teams"
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                  </td>

                  {/* Department Name */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="font-bold text-base text-ink-black group-hover:text-primary-container transition-none flex items-center gap-2">
                      {dept.deptName}
                      {isRank1 && (
                        <span className="text-[9px] uppercase tracking-widest bg-ink-black text-pure-white px-2 py-0.5 rounded-full border border-ink-black">
                          🥇 Top
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap text-center font-bold text-ink-black hidden md:table-cell tabular-nums">
                    {dept.totalTeams}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center text-secondary hidden md:table-cell tabular-nums">
                    {dept.totalMembers}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right font-mono font-black text-primary-container text-base tabular-nums">
                    {dept.totalSolved.toLocaleString()}
                  </td>

                  {/* Scale Progress Visualizations */}
                  <td className="px-4 py-3 whitespace-nowrap min-w-[140px]">
                    <PerformanceBar value={dept.avgPerMember} maxValue={800} />
                  </td>

                  {/* Trend Metrics */}
                  <td className="px-4 py-3 whitespace-nowrap text-center hidden lg:table-cell">
                    <div
                      className={`flex items-center justify-center gap-1 font-mono font-bold ${
                        dept.trend > 0 ? 'text-primary-container' : 'text-secondary'
                      }`}
                    >
                      {dept.trend > 0 ? <TrendingUp className="w-3.5 h-3.5" /> : ''}
                      {dept.trend > 0 ? `+${dept.trend}` : '—'}
                    </div>
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap text-center hidden sm:table-cell">
                    {StatusBadge}
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap hidden xl:table-cell">
                    {dept.topTeam ? (
                      <div
                        className="text-xs font-bold text-ink-black truncate max-w-[140px] flex items-center gap-1.5"
                        title={dept.topTeam.name}
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-primary-container shrink-0" />
                        {dept.topTeam.name}
                      </div>
                    ) : (
                      <span className="text-secondary">—</span>
                    )}
                  </td>
                </tr>

                {/* Sub-Rows Nested Expansion Panel */}
                {isExpanded && dept.nestedTeams?.length > 0 && (
                  <tr>
                    <td colSpan={9} className="px-0 py-0">
                      <div className="bg-surface-tint border-y border-ink-black/10 px-8 lg:px-16 py-5 relative">
                        <div className="absolute top-0 bottom-0 left-[3rem] lg:left-[4rem] border-l-2 border-ink-black/20 z-0" />

                        <h4 className="text-[10px] text-secondary font-bold uppercase tracking-widest flex items-center gap-2 mb-4 relative z-10 pl-4">
                          <div className="w-2 h-[2px] bg-ink-black/20 -ml-6" />
                          Teams ({dept.totalTeams})
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 ml-2 relative z-10">
                          {dept.nestedTeams
                            .sort((a: any, b: any) => b.totalSolved - a.totalSolved)
                            .map((t: any) => (
                              <div
                                key={t.teamName}
                                className="flex justify-between items-center p-3 rounded-2xl border border-ink-black bg-pure-white hover:bg-surface transition-none"
                              >
                                <div className="min-w-0 flex-1 pr-3">
                                  <div className="text-sm font-bold text-ink-black truncate mb-0.5">
                                    {t.teamName}
                                  </div>
                                  <div className="text-[10px] text-secondary font-bold uppercase tracking-wider">
                                    {t.sectionName} squad
                                  </div>
                                </div>
                                <div className="text-right shrink-0">
                                  <div className="text-xs font-mono font-black text-primary-container tabular-nums">
                                    {t.totalSolved}
                                  </div>
                                  <div className="text-[10px] font-mono text-secondary tabular-nums">
                                    {t.avgPerMember} avg
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentTable;
