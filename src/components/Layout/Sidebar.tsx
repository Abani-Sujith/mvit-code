import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Users,
  BarChart3,
  Trophy,
  Settings,
  X,
  Home,
  LayoutGrid,
  Database,
  Bot,
} from 'lucide-react';
import { cn } from '../../utils/cn';
import Button from '../ui/Button';
import { useData } from '../../contexts/DataContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { data } = useData();

  const { totalTeams, totalMembers } = useMemo(() => {
    return {
      totalTeams: new Set(data.map(d => d.teamId)).size,
      totalMembers: new Set(data.map(d => d.memberId)).size
    };
  }, [data]);

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Departments', href: '/all-departments', icon: LayoutGrid },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Leaderboard', href: '/leaderboard', icon: Trophy },
    { name: 'Teams', href: '/teams', icon: Users },
    { name: 'Student Data', href: '/student-data', icon: Database },
    { name: 'Agent Admin', href: '/agent-admin', icon: Bot },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Sidebar Drawer */}
      <div
        className={cn(
          'fixed top-0 left-0 z-50 w-72 h-full bg-pure-white border-r border-ink-black shadow-2xl transform transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-ink-black">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary-container text-pure-white flex items-center justify-center border border-ink-black font-headline-sm">
              M
            </div>
            <div>
              <h1 className="font-headline-sm uppercase text-ink-black tracking-tight leading-none">MVIT CODE</h1>
              <p className="font-label-sm text-secondary uppercase tracking-wider mt-1">Telemetry Runtime</p>
            </div>
          </div>

          {/* Close button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-ink-black hover:bg-surface-container rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-4">
          <div className="font-label-sm uppercase tracking-widest text-secondary mb-3 px-2">Navigation</div>
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className={cn(
                    'flex items-center px-4 py-2.5 rounded-full font-label-lg text-label-lg uppercase tracking-wider transition-none border',
                    isActive
                      ? 'bg-ink-black text-pure-white border-ink-black'
                      : 'text-on-surface-variant hover:text-ink-black hover:bg-surface-container border-transparent'
                  )}
                >
                  <Icon className={cn('h-4 w-4 mr-3 shrink-0', isActive ? 'text-primary-container' : 'text-secondary')} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* System telemetry stats */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-ink-black bg-surface-container-low">
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="p-2 border border-ink-black rounded-xl bg-pure-white">
              <div className="font-headline-sm text-primary-container leading-none">{totalTeams}</div>
              <div className="font-label-sm text-secondary uppercase mt-1">Teams</div>
            </div>
            <div className="p-2 border border-ink-black rounded-xl bg-pure-white">
              <div className="font-headline-sm text-ink-black leading-none">{totalMembers}</div>
              <div className="font-label-sm text-secondary uppercase mt-1">Students</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;