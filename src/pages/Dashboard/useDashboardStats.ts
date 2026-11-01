import { useMemo } from 'react';
import { DailyTotal, Hierarchy } from '../../types';
import { getLatestByMember } from '../../utils/dataProcessing';

export interface DynamicIntervention {
  id: string | null;
  name: string;
  action: string;
  time: string;
  type: string;
}

export interface UseDashboardStatsParams {
  data: DailyTotal[];
  selectedDept: string;
  intelligenceFilter: string | null;
  hierarchy: Hierarchy;
}

export function useDashboardStats({
  data,
  selectedDept,
  intelligenceFilter,
  hierarchy,
}: UseDashboardStatsParams) {
  // Filter logic
  const filtered = useMemo(() => {
    let base = (data || []).filter((d) => {
      if (!d) return false;
      const deptOk = !selectedDept || d.deptId === selectedDept;
      return deptOk;
    });

    if (intelligenceFilter === 'inactive') {
      base = base.filter(m => m.totalDailyIncrease === 0);
    } else if (intelligenceFilter === 'trial') {
      base = base.filter(m => m.leetcodeDailyIncrease > 5 && m.totalDailyIncrease < 2);
    } else if (intelligenceFilter === 'rapid') {
      base = base.filter(m => m.totalDailyIncrease >= 15);
    }

    return base;
  }, [data, selectedDept, intelligenceFilter]);

  const departments = hierarchy ? Object.keys(hierarchy) : [];
  
  // Heuristics for Intelligence Mode
  const latestData = useMemo(() => getLatestByMember(filtered || []), [filtered]);
  const baseLatest = useMemo(() => {
    const baseList = (data || []).filter((d) => {
      if (!d) return false;
      const deptOk = !selectedDept || d.deptId === selectedDept;
      return deptOk;
    });
    return getLatestByMember(baseList);
  }, [data, selectedDept]);

  const activeCount = latestData.filter(m => m.totalDailyIncrease > 0).length;
  const avgScore = latestData.length > 0 ? Math.round(latestData.reduce((acc, m) => acc + (m.totalSolved || 0), 0) / latestData.length) : 0;
  
  const inactiveStudents = baseLatest.filter(m => m.totalDailyIncrease === 0);
  const trialAndErrorCandidates = baseLatest.filter(m => m.leetcodeDailyIncrease > 5 && m.totalDailyIncrease < 2);
  const rapidImprovers = baseLatest.filter(m => m.totalDailyIncrease >= 15);
  
  const inactiveCount = inactiveStudents.length;
  const trialCount = trialAndErrorCandidates.length;
  const rapidCount = rapidImprovers.length;
  
  const topPerformers = [...baseLatest].sort((a,b) => (b.totalSolved || 0) - (a.totalSolved || 0)).slice(0, 5);

  const dynamicInterventions = useMemo(() => {
     const sortedByIncrease = [...baseLatest].sort((a,b) => (b.totalDailyIncrease || 0) - (a.totalDailyIncrease || 0));
     const sortedByRank = [...baseLatest].sort((a,b) => (b.totalSolved || 0) - (a.totalSolved || 0));
     
     const activities: DynamicIntervention[] = [];
     
     if (sortedByIncrease[0] && sortedByIncrease[0].totalDailyIncrease > 0) {
        activities.push({
           id: sortedByIncrease[0].memberId,
           name: sortedByIncrease[0].memberName,
           action: `${sortedByIncrease[0].memberName} solved +${sortedByIncrease[0].totalDailyIncrease} problems today!`,
           time: "Just Now",
           type: 'success'
        });
     }
     
     if (sortedByRank[0]) {
        activities.push({
           id: sortedByRank[0].memberId,
           name: sortedByRank[0].memberName,
           action: `🏆 ${sortedByRank[0].memberName} is leading with ${sortedByRank[0].totalSolved} pts`,
           time: "Top Rank",
           type: 'badge'
        });
     }
     
     const activeUsers = baseLatest.filter(m => m.totalDailyIncrease > 0 && m.memberId !== sortedByIncrease[0]?.memberId);
     if (activeUsers.length > 0) {
        activities.push({
           id: activeUsers[0].memberId,
           name: activeUsers[0].memberName,
           action: `📈 ${activeUsers[0].deptId} is improving fast`,
           time: "Active",
           type: 'trend'
        });
     }
     
     if (inactiveCount > 0) {
        activities.push({
           id: null,
           name: "System",
           action: `⚠️ ${inactiveCount} students haven't coded today`,
           time: "System",
           type: 'alert'
        });
     }
     
     return activities.slice(0, 4);
  }, [baseLatest, inactiveCount]);

  return {
    filtered,
    departments,
    latestData,
    baseLatest,
    activeCount,
    avgScore,
    inactiveStudents,
    trialAndErrorCandidates,
    rapidImprovers,
    inactiveCount,
    trialCount,
    rapidCount,
    topPerformers,
    dynamicInterventions,
  };
}
