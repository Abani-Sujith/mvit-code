import React from 'react';
import { BrainCircuit } from 'lucide-react';
import { AgentTask } from '../types';
import AgentTaskListSection from './AgentTaskListSection';

interface TaskControlPanelSectionProps {
  allTasks: AgentTask[];
  expandedTask: string | null;
  setExpandedTask: React.Dispatch<React.SetStateAction<string | null>>;
}

const TaskControlPanelSection: React.FC<TaskControlPanelSectionProps> = ({
  allTasks,
  expandedTask,
  setExpandedTask,
}) => (
  <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-indigo-800/40 shadow-xl dark:shadow-2xl overflow-hidden mt-8">
    <div className="bg-gray-50 dark:bg-gradient-to-r dark:from-gray-900 dark:to-indigo-900 border-b border-gray-200 dark:border-indigo-800/40 p-5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-indigo-100 dark:bg-indigo-500/20 rounded-lg">
          <BrainCircuit className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <h2 className="text-gray-900 dark:text-white font-bold tracking-wide text-lg">AI Task Control Panel</h2>
          <p className="text-gray-500 dark:text-indigo-300 text-xs">Full history of autonomous assignments & verifications</p>
        </div>
      </div>
      <div className="flex gap-2">
        <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 border border-yellow-300 dark:border-yellow-700/50 rounded-full text-xs font-bold">🟡 Assigned</span>
        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-700/50 rounded-full text-xs font-bold">🔵 In Progress</span>
        <span className="px-3 py-1 bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300 border border-green-300 dark:border-green-700/50 rounded-full text-xs font-bold">🟢 Completed</span>
        <span className="px-3 py-1 bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-700/50 rounded-full text-xs font-bold">🔴 Failed</span>
      </div>
    </div>

    <AgentTaskListSection allTasks={allTasks} expandedTask={expandedTask} setExpandedTask={setExpandedTask} />
  </div>
);

export default TaskControlPanelSection;
