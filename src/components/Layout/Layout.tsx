import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface-tint text-on-surface flex flex-col w-full overflow-x-hidden font-sans relative">
      {/* Fixed thin yellow border around the whole viewport */}
      <div
        className="fixed inset-0 pointer-events-none border-2 border-yellow z-[9999]"
        aria-hidden="true"
      />

      {/* Mobile drawer backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-ink-black/40 xl:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Stitch Top-Nav Header */}
      <Header onMenuClick={() => setSidebarOpen(true)} />

      {/* Main Content Area with proper margin padding so content never touches edges */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 overflow-x-hidden">
        {children}
      </main>

      {/* Stitch Neo-Brutalist Footer */}
      <footer className="w-full bg-surface border-t border-ink-black py-space-xl mt-auto">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-space-xs text-center">
          <p className="font-headline-sm text-headline-sm uppercase tracking-wider text-on-surface">
            That's enough dashboard.
          </p>
          <div className="flex items-center gap-space-md text-on-surface-variant font-label-sm text-label-sm uppercase tracking-widest mt-space-xs flex-wrap justify-center">
            <span>MVIT CODE</span>
            <span>•</span>
            <span>TRACKER RUNTIME</span>
            <span>•</span>
            <span>TERMINAL VERIFIED</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;