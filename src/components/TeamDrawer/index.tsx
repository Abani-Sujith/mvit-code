import React, { useEffect } from 'react';
import HeaderSection from './sections/HeaderSection';
import ContentBodySection from './sections/ContentBodySection';

interface TeamDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  team: any | null; // The exact team object being examined
}

const TeamDrawer: React.FC<TeamDrawerProps> = ({ isOpen, onClose, team }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen || !team) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fade-in"
        onClick={onClose}
      />

      {/* Sliding Drawer */}
      <div className={`fixed right-0 top-0 h-full w-full sm:w-[500px] bg-background border-l border-border shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} overflow-y-auto flex flex-col`}>
        <HeaderSection team={team} onClose={onClose} />
        <ContentBodySection team={team} />
      </div>
    </>
  );
};

export default TeamDrawer;
