import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { DailyTotal } from '../../types';
import { API_BASE_URL } from '../../lib/apiConfig';

export const useIndividualDashboard = () => {
  const { memberId } = useParams<{ memberId: string }>();
  const { data: globalData, loading: globalLoading } = useData();
  const [memberData, setMemberData] = useState<DailyTotal[]>([]);
  const [loading, setLoading] = useState(true);
  const [memberInfo, setMemberInfo] = useState<DailyTotal | null>(null);
  const [agentTasks, setAgentTasks] = useState<any[]>([]);
  const [analysis, setAnalysis] = useState<any>(null);

  useEffect(() => {
    if (!memberInfo) return;
    let isMounted = true;
    const fetchTasks = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/all_tasks`);
        if (res.ok && isMounted) {
          const data = await res.json();

          // Cross-platform normalization to ensure Google Sheet names ('Agilesh.S') match Firebase ('Agilesh S')
          const normalize = (str: string) => (str || "").replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
          const targetName = normalize(memberInfo.memberName);

          const userTasks = (data.tasks || []).filter((t: any) => normalize(t.member_name) === targetName);

          // Deduplicate the tasks so users don't see the exact same problem multiply assigned by the AI bot
          const uniqueTasks = [];
          const seenDesc = new Set();
          for (const ut of userTasks) {
              const uniqueKey = `${ut.description}-${ut.difficulty}`;
              if (!seenDesc.has(uniqueKey)) {
                  uniqueTasks.push(ut);
                  seenDesc.add(uniqueKey);
              }
          }

          setAgentTasks(uniqueTasks);
        }
      } catch (err) {
        console.error("Error fetching agent tasks via API", err);
      }

      try {
         const normalize = (str: string) => (str || "").replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
         const targetName = normalize(memberInfo.memberName);
         const aRes = await fetch(`${API_BASE_URL}/student/${targetName}/analysis`);
         if (aRes.ok && isMounted) {
            const aData = await aRes.json();
            setAnalysis(aData.data);
         }
      } catch (err) {
         console.error("Error fetching analysis", err);
      }
    };
    fetchTasks();
    const interval = setInterval(fetchTasks, 30000); // Poll every 30 seconds
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [memberInfo]);

  useEffect(() => {
    if (globalLoading) {
      setLoading(true);
      return;
    }

    if (memberId && globalData) {
      const memberRecords = globalData.filter((record: any) => record.memberId === memberId || record.memberName === memberId);
      if (memberRecords.length > 0) {
        setMemberData(memberRecords);
        setMemberInfo(memberRecords[0]);
      }
    }
    setLoading(false);
  }, [globalData, globalLoading, memberId]);

  return { memberId, memberData, loading, memberInfo, agentTasks, analysis };
};
