import React, { useState } from 'react';
import { getLatestByMember } from '../../utils/dataProcessing';
import TableControlsSection from './sections/TableControlsSection';
import DesktopMemberTableSection from './sections/DesktopMemberTableSection';
import MobileMemberListSection from './sections/MobileMemberListSection';
import EmptyMembersSection from './sections/EmptyMembersSection';
import PaginationFooterSection from './sections/PaginationFooterSection';
import { MemberSort, MemberTableProps, MemberTableRow } from './types';

const MemberTable: React.FC<MemberTableProps> = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<MemberSort>('performance');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const ITEMS_PER_PAGE = 15;

  const latestData = getLatestByMember(data || []);

  const filteredMembers = (latestData || [])
    .filter(m => {
      if (!m) return false;
      return (m.memberName || '').toLowerCase().includes(searchTerm.toLowerCase()) || (m.teamId || '').toLowerCase().includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => {
      if (!a || !b) return 0;
      return sortBy === 'name' ? (a.memberName || '').localeCompare(b.memberName || '') : (b.totalSolved || 0) - (a.totalSolved || 0);
    });

  const totalPages = Math.ceil(filteredMembers.length / ITEMS_PER_PAGE);
  const currentMembers = filteredMembers.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const toggleExpand = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const getLevel = (score: number) => {
    if (score >= 500) return 'Advanced';
    if (score >= 200) return 'Intermediate';
    if (score >= 50) return 'Beginner';
    return 'Novice';
  };

  const currentMembersWithDetails: MemberTableRow[] = currentMembers.map((member, index) => ({
    member,
    rank: (currentPage - 1) * ITEMS_PER_PAGE + index + 1,
    level: getLevel(member.totalSolved),
  }));

  return (
    <div className="bg-pure-white overflow-hidden select-none">
      <TableControlsSection
        filteredMemberCount={filteredMembers.length}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
        setCurrentPage={setCurrentPage}
      />

      <div className="w-full overflow-hidden">
        <DesktopMemberTableSection
          currentMembers={currentMembersWithDetails}
          expandedRow={expandedRow}
          toggleExpand={toggleExpand}
        />
        <MobileMemberListSection
          currentMembers={currentMembersWithDetails}
          expandedRow={expandedRow}
          toggleExpand={toggleExpand}
        />
        <EmptyMembersSection isEmpty={currentMembers.length === 0} />
      </div>

      <PaginationFooterSection
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={ITEMS_PER_PAGE}
        filteredMemberCount={filteredMembers.length}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default MemberTable;
