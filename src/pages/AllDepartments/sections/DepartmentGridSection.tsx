import React from 'react';
import DepartmentCard from '../../../components/DepartmentCard';
import DepartmentTable from '../../../components/DepartmentTable';
import AttentionPanel from '../../../components/AttentionPanel';

interface DepartmentGridSectionProps {
  filteredDepartments: any[];
  totalDepartments: number;
  setSelectedDepartment: (dept: any) => void;
}

const DepartmentGridSection: React.FC<DepartmentGridSectionProps> = ({
  filteredDepartments,
  totalDepartments,
  setSelectedDepartment,
}) => (
  <div className="space-y-10">
    {/* Intelligence Grid grouped by status */}
    {(['Elite', 'Good', 'Risk'] as const).map((status) => {
      const depts = filteredDepartments.filter((d) => d.status === status);
      if (depts.length === 0) return null;

      const sectionTitle =
        status === 'Elite'
          ? 'Elite readiness'
          : status === 'Good'
          ? 'Growth track'
          : 'Attention required';

      return (
        <div key={status} className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b-2 border-ink-black">
            <div className="flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  status === 'Elite'
                    ? 'bg-primary-container'
                    : status === 'Good'
                    ? 'bg-ink-black'
                    : 'bg-error'
                }`}
              />
              <h2 className="font-headline-sm text-xl uppercase tracking-tight text-ink-black m-0 [font-synthesis:none]">
                {sectionTitle}
              </h2>
            </div>
            <span className="rounded-full bg-pure-white text-ink-black border border-ink-black px-3 py-0.5 font-label-sm text-[10px] uppercase tracking-wider">
              {depts.length} {depts.length === 1 ? 'department' : 'departments'}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {depts.map((dept) => (
              <DepartmentCard
                key={dept.deptId}
                department={dept}
                onClick={() => setSelectedDepartment(dept)}
              />
            ))}
          </div>
        </div>
      );
    })}

    {/* Attention Panel */}
    <AttentionPanel departments={filteredDepartments} />

    {/* Organizational Table */}
    <div className="border-2 border-ink-black rounded-3xl bg-pure-white p-6 hidden md:block">
      <div className="flex justify-between items-center mb-4 pb-3 border-b border-ink-black/15">
        <h2 className="font-headline-sm text-xl uppercase tracking-tight text-ink-black m-0 flex items-center gap-2 [font-synthesis:none]">
          <span>Department overview</span>
          <span className="rounded-full bg-ink-black text-pure-white px-2.5 py-0.5 font-label-sm text-[10px] uppercase">
            {totalDepartments}
          </span>
        </h2>
      </div>
      <DepartmentTable
        data={filteredDepartments}
        onRowClick={(dept) => setSelectedDepartment(dept)}
      />
    </div>
  </div>
);

export default DepartmentGridSection;

