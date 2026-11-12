import React from 'react';
import { FileCode2 } from 'lucide-react';
import { AgentTask } from '../types';
import AgentTaskCard from './AgentTaskCard';

interface AgentTaskListSectionProps {
  allTasks: AgentTask[];
  expandedTask: string | null;
  setExpandedTask: React.Dispatch<React.SetStateAction<string | null>>;
}

const AgentTaskListSection: React.FC<AgentTaskListSectionProps> = ({
  allTasks,
  expandedTask,
  setExpandedTask,
}) => (
  <div className="p-5">
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {allTasks.length === 0 ? (
        <div className="col-span-full py-12 text-center text-gray-500 dark:text-gray-500 font-mono">
          <FileCode2 className="h-12 w-12 mx-auto mb-3 opacity-30 dark:opacity-20 text-gray-400" />
          <p>No autonomous tasks have been assigned yet.</p>
        </div>
      ) : (
        allTasks.map(task => (
          <AgentTaskCard key={task.id} task={task} expandedTask={expandedTask} setExpandedTask={setExpandedTask} />
        ))
      )}
    </div>
  </div>
);

export default AgentTaskListSection;
