import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import FiltersSection from './sections/FiltersSection';
import HeaderSection from './sections/HeaderSection';
import WorkspacesGridSection from './sections/WorkspacesGridSection';
import { useRepositories } from './useRepositories';
import { PlatformBar, TeamWorkspace } from './types';

const Repositories: React.FC = () => {
    const navigate = useNavigate();
    const {
        hierarchy,
        loading,
        searchTerm,
        setSearchTerm,
        selectedDept,
        setSelectedDept,
        sortBy,
        setSortBy,
        filteredWorkspaces,
        summaryStats,
    } = useRepositories();

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    const departments = hierarchy ? Object.keys(hierarchy) : [];

    // Helper: get platform bar widths
    const getPlatformBar = (ws: TeamWorkspace): PlatformBar => {
        const total = ws.totalProblemsSolved || 1;
        return {
            lc: Math.round((ws.leetcodeTotal / total) * 100),
            sr: Math.round((ws.skillrackTotal / total) * 100),
            cc: Math.round((ws.codechefTotal / total) * 100),
            hr: Math.round((ws.hackerrankTotal / total) * 100),
        };
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-fade-in relative z-10">
            <HeaderSection summaryStats={summaryStats} />
            <FiltersSection
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedDept={selectedDept}
                setSelectedDept={setSelectedDept}
                sortBy={sortBy}
                setSortBy={setSortBy}
                departments={departments}
                hierarchy={hierarchy}
            />
            <WorkspacesGridSection
                filteredWorkspaces={filteredWorkspaces}
                getPlatformBar={getPlatformBar}
                navigate={navigate}
            />
        </div>
    );
};

export default Repositories;
