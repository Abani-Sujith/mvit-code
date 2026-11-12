import React from 'react';
import { ChevronDown, ChevronUp, Clock } from 'lucide-react';
import { AgentTask } from '../types';

interface AgentTaskCardProps {
  task: AgentTask;
  expandedTask: string | null;
  setExpandedTask: React.Dispatch<React.SetStateAction<string | null>>;
}

const AgentTaskCard: React.FC<AgentTaskCardProps> = ({ task, expandedTask, setExpandedTask }) => {
  let statusColor = "bg-yellow-50 dark:bg-yellow-500/10 border-yellow-200 dark:border-yellow-700/30 text-yellow-700 dark:text-yellow-500/90";
  let dotColor = "bg-yellow-500 dark:bg-yellow-400";
  let statusLabel = "Assigned";
  
  if (task.status === 'completed') {
    statusColor = "bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-700/30 text-green-700 dark:text-green-400";
    dotColor = "bg-green-500 dark:bg-green-400";
    statusLabel = "Completed";
  } else if (task.status === 'failed') {
    statusColor = "bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-700/30 text-red-700 dark:text-red-400";
    dotColor = "bg-red-500 dark:bg-red-400";
    statusLabel = "Failed";
  } else if (task.status === 'pending') {
    statusColor = "bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-700/30 text-blue-700 dark:text-blue-400";
    dotColor = "bg-blue-500 dark:bg-blue-400";
    statusLabel = "In Progress";
  }

  const isExpanded = expandedTask === task.id;

  const renderDescription = (text: string) => {
      if (!text) return null;
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const parts = text.split(urlRegex);
      return parts.map((part, i) => {
          if (part.match(urlRegex)) {
              return <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-blue-400 hover:text-indigo-500 dark:hover:text-blue-300 underline decoration-indigo-500/30 dark:decoration-blue-500/30 underline-offset-2" onClick={(e) => e.stopPropagation()}>{part}</a>;
          }
          return part;
      });
  };

  return (
    <div key={task.id} className={`p-4 rounded-2xl border transition-all ${statusColor} hover:bg-opacity-80 dark:hover:bg-opacity-20`}>
      <div className="flex justify-between items-start mb-2">
        <div className="font-bold text-gray-900 dark:text-gray-200">{task.member_name}</div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/5 dark:bg-black/40 text-xs font-semibold capitalize border border-black/10 dark:border-white/5">
          <span className={`w-1.5 h-1.5 rounded-full ${dotColor} animate-pulse`}></span>
          {statusLabel}
        </div>
      </div>
      
      <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3 mb-3 leading-relaxed" title={task.description}>
        {renderDescription(task.description)}
      </p>
      
      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500 mb-3">
        <span className="flex items-center gap-1">
          <Clock size={12}/>{task.assigned_at?.split(' ')[0] || "Unknown Date"}
        </span>
        <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">{task.difficulty}</span>
      </div>

      <div className="pt-3 border-t border-gray-200 dark:border-white/10">
        <button 
          onClick={() => setExpandedTask(isExpanded ? null : task.id)}
          className="w-full flex items-center justify-between text-xs font-mono text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition"
        >
          {isExpanded ? 'Hide Verification' : 'View AI Verification'}
          {isExpanded ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
        </button>
        
        {isExpanded && (
           <div className="mt-3 p-3 bg-gray-50 dark:bg-black/50 rounded-xl border border-gray-200 dark:border-white/5 text-xs font-mono text-emerald-600 dark:text-emerald-400/80 leading-relaxed overflow-x-auto">
             {task.verification_log ? (
               <div className="text-emerald-400 leading-relaxed">➜ {task.verification_log}</div>
             ) : (
               <div className="text-amber-500/80 italic animate-pulse">Waiting for next loop verifying LeetCode profile...</div>
             )}
           </div>
        )}
      </div>
    </div>
  );
};

export default AgentTaskCard;
