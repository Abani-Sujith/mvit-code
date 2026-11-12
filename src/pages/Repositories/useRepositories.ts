import { useMemo, useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { getLatestByMember, getTeamStats } from '../../utils/dataProcessing';
import { RepositorySortBy, TeamWorkspace } from './types';

export const useRepositories = () => {
    const { data, hierarchy, loading } = useData();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDept, setSelectedDept] = useState<string>('');
    const [sortBy, setSortBy] = useState<RepositorySortBy>('total');

    const workspaces: TeamWorkspace[] = useMemo(() => {
        if (!data || data.length === 0 || !hierarchy) return [];

        const results: TeamWorkspace[] = [];

        Object.entries(hierarchy).forEach(([deptId, dept]) => {
            Object.entries(dept.sections).forEach(([sectionId, section]) => {
                Object.entries(section.teams).forEach(([teamId, team]) => {
                    const teamData = data.filter(d => d.deptId === deptId && d.sectionId === sectionId && d.teamId === teamId);
                    if (teamData.length === 0) return;

                    const latestMembers = getLatestByMember(teamData);
                    const stats = getTeamStats(teamData);

                    // Aggregate platform totals from latest member data
                    const leetcodeTotal = latestMembers.reduce((s, m) => s + (m.leetcodeTotal || 0), 0);
                    const skillrackTotal = latestMembers.reduce((s, m) => s + (m.skillrackTotal || 0), 0);
                    const codechefTotal = latestMembers.reduce((s, m) => s + (m.codechefTotal || 0), 0);
                    const hackerrankTotal = latestMembers.reduce((s, m) => s + (m.hackerrankTotal || 0), 0);

                    // Find the most recent date across all members
                    const latestDate = latestMembers.reduce((latest, m) => {
                        const d = new Date(m.date);
                        return d > latest ? d : latest;
                    }, new Date(0));

                    results.push({
                        id: teamId,
                        name: team.name || teamId,
                        department: dept.name || deptId,
                        deptId,
                        section: section.name || sectionId,
                        sectionId,
                        teamLeadName: team.teamLeadName || stats.teamLeadName || '',
                        totalProblemsSolved: stats.totalProblems,
                        avgPerMember: stats.avgPerMember,
                        memberCount: stats.totalMembers,
                        topPerformer: stats.topPerformer,
                        topPerformerScore: stats.topPerformerScore,
                        leetcodeTotal,
                        skillrackTotal,
                        codechefTotal,
                        hackerrankTotal,
                        contributors: latestMembers,
                        lastUpdated: latestDate.toLocaleDateString()
                    });
                });
            });
        });

        return results;
    }, [data, hierarchy]);

    const filteredWorkspaces = useMemo(() => {
        let filtered = workspaces.filter(ws =>
            ws.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ws.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ws.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ws.teamLeadName.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (selectedDept) {
            filtered = filtered.filter(ws => ws.deptId === selectedDept);
        }

        // Sort
        switch (sortBy) {
            case 'avg':
                return filtered.sort((a, b) => b.avgPerMember - a.avgPerMember);
            case 'members':
                return filtered.sort((a, b) => b.memberCount - a.memberCount);
            default:
                return filtered.sort((a, b) => b.totalProblemsSolved - a.totalProblemsSolved);
        }
    }, [workspaces, searchTerm, selectedDept, sortBy]);

    // Summary stats
    const summaryStats = useMemo(() => {
        const totalProblems = workspaces.reduce((s, ws) => s + ws.totalProblemsSolved, 0);
        const totalMembers = workspaces.reduce((s, ws) => s + ws.memberCount, 0);
        const topWorkspace = workspaces.length > 0 ? workspaces.reduce((best, ws) => ws.totalProblemsSolved > best.totalProblemsSolved ? ws : best) : null;
        return { totalProblems, totalMembers, totalTeams: workspaces.length, topWorkspace };
    }, [workspaces]);

    return {
        hierarchy,
        loading,
        searchTerm,
        setSearchTerm,
        selectedDept,
        setSelectedDept,
        sortBy,
        setSortBy,
        workspaces,
        filteredWorkspaces,
        summaryStats,
    };
};
