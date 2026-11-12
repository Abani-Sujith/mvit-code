import React, { Dispatch, SetStateAction } from 'react';

interface PaginationFooterSectionProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  filteredMemberCount: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const PaginationFooterSection: React.FC<PaginationFooterSectionProps> = ({
  currentPage,
  totalPages,
  itemsPerPage,
  filteredMemberCount,
  setCurrentPage,
}) => (
  <>
    {totalPages > 1 && (
      <div className="p-4 border-t border-ink-black bg-pure-white flex items-center justify-between flex-wrap gap-2 font-label-sm text-xs uppercase">
        <div className="text-secondary">
          Showing {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredMemberCount)} of {filteredMemberCount}
        </div>
        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            className="rounded-full border border-ink-black px-4 py-1.5 bg-pure-white text-ink-black hover:bg-surface disabled:opacity-40 transition-none"
          >
            Prev
          </button>
          <span className="font-bold text-ink-black px-2">
            Page {currentPage} / {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            className="rounded-full border border-ink-black px-4 py-1.5 bg-ink-black text-pure-white hover:bg-primary-container disabled:opacity-40 transition-none"
          >
            Next
          </button>
        </div>
      </div>
    )}
  </>
);

export default PaginationFooterSection;
