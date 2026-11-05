import React from 'react';
import { useData } from '../contexts/DataContext';
import MemberTable from '../components/MemberTable';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { Database } from 'lucide-react';

const StudentData: React.FC = () => {
  const { data, loading } = useData();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
        <span className="ml-3 font-label-lg uppercase tracking-wider text-secondary text-xs">
          Loading student matrix...
        </span>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 sm:space-y-8 select-none">
      {/* Neo-brutalist Header Banner */}
      <div className="border-2 border-ink-black rounded-3xl bg-pure-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="text-left max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-ink-black text-pure-white px-3.5 py-1 rounded-full border border-ink-black font-label-sm text-[11px] tracking-wider uppercase mb-3">
            <Database className="w-3.5 h-3.5 text-primary-fixed" />
            <span>Student Performance Nexus</span>
          </div>
          <h1 className="font-headline-md text-3xl sm:text-5xl uppercase tracking-tight text-ink-black m-0 leading-tight">
            Student Coding Matrix
          </h1>
          <p className="font-body-md text-on-surface-variant text-sm sm:text-base mt-2 max-w-xl">
            Complete performance records, multi-platform submissions, and placement readiness telemetry for all registered students.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="border border-ink-black bg-surface rounded-2xl px-5 py-3 flex flex-col items-center min-w-[120px]">
            <span className="font-headline-sm text-3xl text-primary-container leading-none tabular-nums">
              {data.length}
            </span>
            <span className="font-label-sm text-[10px] text-secondary uppercase tracking-wider mt-1">
              Total Records
            </span>
          </div>
          <div className="border border-ink-black bg-surface rounded-2xl px-5 py-3 flex flex-col items-center min-w-[120px]">
            <span className="font-headline-sm text-2xl text-ink-black leading-none uppercase">
              Live
            </span>
            <span className="font-label-sm text-[10px] text-secondary uppercase tracking-wider mt-1">
              Sync Active
            </span>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="border-2 border-ink-black rounded-3xl bg-pure-white overflow-hidden shadow-sm">
        <MemberTable data={data} />
      </div>
    </div>
  );
};

export default StudentData;

