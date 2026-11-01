import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Search, User, X, ArrowRight } from 'lucide-react';
import { useSearch } from '../../hooks/useSearch';
import { cn } from '../../utils/cn';

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { searchTerm: query, setSearchTerm: setQuery, results: members } = useSearch('members');
  const { setSearchTerm: setTeamQuery, results: teams } = useSearch('teams');

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sync search queries
  useEffect(() => {
    setTeamQuery(query);
  }, [query, setTeamQuery]);

  const handleNavigate = (path: string) => {
    navigate(path);
    setQuery('');
    setIsSearchOpen(false);
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Dashboard', path: '/' },
    { name: 'Departments', path: '/all-departments' },
    { name: 'Leaderboard', path: '/leaderboard' },
    { name: 'Teams', path: '/teams' },
    { name: 'Students', path: '/student-data' },
    { name: 'Analytics', path: '/analytics' },
    { name: 'Settings', path: '/settings' },
  ];

  const isLinkActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 left-0 w-full z-50 bg-surface border-b border-ink-black select-none">
      <div className="h-20 w-full px-4 sm:px-6 lg:px- margin flex items-center justify-between gap-2 sm:gap-4 max-w-7xl mx-auto">
        {/* Left: Mobile hamburger & Desktop Navigation Pills */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            type="button"
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
              if (onMenuClick) onMenuClick();
            }}
            className="xl:hidden p-2 rounded-full border border-ink-black bg-pure-white text-ink-black hover:bg-surface-container transition-none"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Desktop Navigation Pills */}
          <nav className="hidden xl:flex items-center gap-1 bg-pure-white p-1 border border-ink-black rounded-full shadow-sm">
            {navLinks.map((link) => {
              const active = isLinkActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    'px-3.5 py-1.5 rounded-full font-label-lg text-label-lg uppercase tracking-wider transition-none',
                    active
                      ? 'bg-ink-black text-pure-white border border-ink-black'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container border border-transparent'
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Center: Brand Wordmark */}
        <div className="flex items-center justify-center">
          <Link
            to="/"
            className="font-headline-md text-headline-md uppercase tracking-tight text-primary-container leading-none hover:text-primary transition-none"
          >
            MVIT CODE
          </Link>
        </div>

        {/* Right: Search, Add Student Action, and Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Trigger Button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-full border border-ink-black bg-pure-white text-ink-black hover:bg-surface-container transition-none flex items-center justify-center"
              title="Search students & teams"
            >
              <Search className="h-4 w-4" />
            </button>

            {/* Desktop Quick Search Popover */}
            {isSearchOpen && (
              <div className="absolute right-0 top-12 w-80 sm:w-96 bg-pure-white border border-ink-black rounded-2xl shadow-2xl p-3 z-50">
                <div className="relative mb-2">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-secondary" />
                  <input
                    type="text"
                    value={query}
                    autoFocus
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search student or roll no..."
                    className="w-full rounded-full border border-ink-black pl-9 pr-8 py-1.5 font-body-md text-body-md bg-pure-white text-ink-black placeholder:text-secondary focus:outline-none focus:border-primary-container"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery('')}
                      className="absolute right-3 top-2.5 text-secondary hover:text-ink-black"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* Search Results list */}
                {(members.length > 0 || teams.length > 0) && (
                  <div className="max-h-64 overflow-y-auto divide-y divide-ink-black/10 border-t border-ink-black/15 pt-2">
                    {teams.slice(0, 3).map((team) => (
                      <div
                        key={team.id}
                        onClick={() => handleNavigate(`/team/${team.deptId}/${team.sectionId}/${team.id}`)}
                        className="py-2 px-2 hover:bg-surface-container cursor-pointer rounded-lg flex items-center justify-between"
                      >
                        <div>
                          <div className="font-label-lg uppercase text-ink-black">{team.name}</div>
                          <div className="font-label-sm text-secondary uppercase">{team.deptId} • {team.sectionId}</div>
                        </div>
                        <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-surface border border-ink-black">Team</span>
                      </div>
                    ))}
                    {members.slice(0, 5).map((member) => (
                      <div
                        key={member.memberId || Math.random().toString()}
                        onClick={() => handleNavigate(`/individual/${member.memberId}`)}
                        className="py-2 px-2 hover:bg-surface-container cursor-pointer rounded-lg flex items-center justify-between"
                      >
                        <div>
                          <div className="font-title-md text-sm uppercase font-bold text-ink-black">{member.memberName || 'Student'}</div>
                          <div className="font-label-sm text-secondary uppercase">{member.teamId || 'No Team'}</div>
                        </div>
                        <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-surface-tint border border-ink-black font-bold text-primary">Student</span>
                      </div>
                    ))}
                  </div>
                )}
                {query && members.length === 0 && teams.length === 0 && (
                  <div className="py-4 text-center font-label-sm text-secondary uppercase">
                    No matching records found
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Add Student Pill Button */}
          <Link
            to="/onboard"
            className="hidden md:inline-flex rounded-full bg-ink-black text-pure-white pl-4 pr-1.5 py-1.5 font-label-lg text-label-lg uppercase tracking-wider border border-ink-black items-center gap-2 hover:bg-primary-container hover:text-pure-white transition-none"
          >
            <span className="leading-none text-xs">Add student</span>
            <span className="w-6 h-6 rounded-full bg-primary-container text-pure-white flex items-center justify-center border border-ink-black font-bold text-xs leading-none">
              <ArrowRight className="h-3 w-3" />
            </span>
          </Link>

          {/* Profile Circle Button */}
          <Link
            to="/settings"
            title="Settings & Profile"
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center border border-ink-black text-on-primary hover:opacity-90 transition-none"
          >
            <User className="h-4 w-4 text-pure-white" />
          </Link>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-surface border-t border-ink-black px-4 py-4 animate-fade-in">
          <nav className="flex flex-col gap-2 bg-pure-white p-3 border border-ink-black rounded-3xl">
            {navLinks.map((link) => {
              const active = isLinkActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'px-4 py-2 rounded-full font-label-lg text-label-lg uppercase tracking-wider transition-none flex items-center justify-between',
                    active
                      ? 'bg-ink-black text-pure-white border border-ink-black'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container border border-transparent'
                  )}
                >
                  <span>{link.name}</span>
                  {active && <span className="w-2 h-2 rounded-full bg-primary-container"></span>}
                </Link>
              );
            })}
            <div className="pt-2 border-t border-ink-black/15 flex items-center justify-between mt-1 px-1">
              <Link
                to="/onboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center rounded-full bg-primary-container text-pure-white py-2 font-label-lg text-label-lg uppercase tracking-wider border border-ink-black"
              >
                + Add Student
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;