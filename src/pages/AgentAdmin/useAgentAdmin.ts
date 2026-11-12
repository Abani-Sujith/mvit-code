import { useEffect, useRef, useState } from 'react';
import { useToast } from '../../components/ui/Toaster';
import { API_BASE_URL } from '../../lib/apiConfig';
import { AgentTask, ProactiveAction } from './types';

export function useAgentAdmin() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoopTriggered, setIsLoopTriggered] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [proactiveActions, setProactiveActions] = useState<ProactiveAction[]>([]);
  const [allTasks, setAllTasks] = useState<AgentTask[]>([]);
  const [expandedTrace, setExpandedTrace] = useState<number | null>(null);
  const [expandedTask, setExpandedTask] = useState<string | null>(null);
  const { addToast } = useToast();
  const logEndRef = useRef<HTMLDivElement>(null);

  const logContainerRef = useRef<HTMLDivElement>(null);

  // Poll for loop logs
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoopTriggered) {
      interval = setInterval(async () => {
        try {
          const res = await fetch(`${API_BASE_URL}/logs`);
          if (res.ok) {
            const data = await res.json();
            setLogs(prev => {
              const next = data.logs || [];
              if (JSON.stringify(prev) === JSON.stringify(next)) return prev;
              return next;
            });
            if (data.logs && data.logs.length > 0 && data.logs[data.logs.length-1].includes("Loop execution complete")) {
               setIsLoopTriggered(false);
            }
          }
        } catch (e) { console.error("Failed to fetch logs"); }
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isLoopTriggered]);

  // Poll proactive status every 5s
  useEffect(() => {
    const poll = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/proactive-status`);
        if (res.ok) {
          const data = await res.json();
          setProactiveActions(prev => {
            const next = data.proactive_actions || [];
            if (JSON.stringify(prev) === JSON.stringify(next)) return prev;
            return next;
          });
        }
      } catch { /* silent */ }
    };
    poll();
    const interval = setInterval(poll, 5000);
    return () => clearInterval(interval);
  }, []);

  // Poll all agent tasks every 5s
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/all_tasks`);
        if (res.ok) {
          const data = await res.json();
          setAllTasks(prev => {
            const next = data.tasks || [];
            if (JSON.stringify(prev) === JSON.stringify(next)) return prev;
            return next;
          });
        }
      } catch { /* silent */ }
    };
    fetchTasks();
    const interval = setInterval(fetchTasks, 30000); // Poll every 30 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (logContainerRef.current) {
      const container = logContainerRef.current;
      // Only auto-scroll if we are currently reasonably close to the bottom
      const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;
      if (isNearBottom) {
        container.scrollTop = container.scrollHeight;
      }
    }
  }, [logs]);

  return {
    file,
    setFile,
    isUploading,
    setIsUploading,
    isLoopTriggered,
    setIsLoopTriggered,
    logs,
    setLogs,
    proactiveActions,
    allTasks,
    expandedTrace,
    setExpandedTrace,
    expandedTask,
    setExpandedTask,
    addToast,
    logEndRef,
    logContainerRef,
  };
}
