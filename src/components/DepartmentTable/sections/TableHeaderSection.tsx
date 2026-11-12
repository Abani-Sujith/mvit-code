import React from 'react';

interface TableHeaderSectionProps {
  thClass: string;
  thCenterClass: string;
  handleSort: (field: string) => void;
}

const TableHeaderSection: React.FC<TableHeaderSectionProps> = ({ thClass, thCenterClass, handleSort }) => (
  <>
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
  </>
);

export default TableHeaderSection;
