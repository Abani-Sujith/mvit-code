import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const HeaderSection: React.FC = () => (
  <>
    {/* Background decorative elements */}
    <div className="absolute top-0 right-0 -m-8 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>
    <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

    {/* Breadcrumb */}
    <nav className="flex items-center space-x-2 text-sm text-textMuted bg-surface/50 w-fit px-4 py-2 rounded-full border border-border">
      <Link to="/" className="hover:text-brand-400 transition-colors">Dashboard</Link>
      <ChevronRight className="h-4 w-4" />
      <span className="font-semibold text-textMain flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-accent-pink"></div> Analytics
      </span>
    </nav>

    {/* Hero Section */}
    <div className="glass-card rounded-2xl p-5 md:p-8 relative overflow-hidden group border border-white/5">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-500/10 to-accent-pink/10 opacity-50"></div>
      <div className="relative z-10 text-center md:text-left">
        <h1 className="text-2xl md:text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2 tracking-tight">
          📊 Performance Analytics
        </h1>
        <p className="text-textMuted max-w-xl">
          Deep insights and trends across your coding performance ecosystem. Discover platform preferences, performance growth, and strategic areas for improvement.
        </p>
      </div>
    </div>
  </>
);

export default HeaderSection;
