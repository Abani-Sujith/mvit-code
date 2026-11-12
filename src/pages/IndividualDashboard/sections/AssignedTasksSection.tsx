import React from 'react';
import { Bot, CheckCircle, Clock } from 'lucide-react';
import Card, { CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';

interface AssignedTasksSectionProps {
  agentTasks: any[];
}

const AssignedTasksSection: React.FC<AssignedTasksSectionProps> = ({ agentTasks }) => (
  <Card hover className="border-border/50">
    <CardHeader className="border-b border-white/5 pb-4">
      <CardTitle className="text-lg flex items-center gap-2"><Bot className="h-5 w-5 text-indigo-400" /> AI Assigned Tasks</CardTitle>
    </CardHeader>
    <CardContent className="pt-6">
      {agentTasks.length === 0 ? (
         <p className="text-textMuted text-sm">No tasks assigned by the AI Agent yet.</p>
      ) : (
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {agentTasks.map(task => {
             const renderDescription = (text: string) => {
                 if (!text) return null;
                 const urlRegex = /(https?:\/\/[^\s]+)/g;
                 const parts = text.split(urlRegex);
                 return parts.map((part, i) => {
                     if (part.match(urlRegex)) {
                         return <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 underline decoration-indigo-500/30 underline-offset-2 break-all" onClick={(e) => e.stopPropagation()}>{part}</a>;
                     }
                     return part;
                 });
             };

             return (
             <div key={task.id} className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl relative overflow-hidden group">
               <div className="flex justify-between items-start mb-3">
                 <span className={`px-2 py-1 text-xs font-semibold rounded ${task.difficulty === 'Hard' ? 'bg-red-500/20 text-red-400' : task.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-green-500/20 text-green-400'}`}>{task.difficulty || 'Task'}</span>
                 <span className="text-xs text-textMuted font-mono">
                     {task.assigned_at?.split(' ')[0] || "Just now"}
                 </span>
               </div>
               <p className="text-sm text-ink-black font-medium mb-4 line-clamp-3 leading-relaxed" title={task.description}>
                 {renderDescription(task.description)}
               </p>

               <div className="flex items-center gap-2 text-xs font-semibold mb-3">
                 {task.status === 'completed' ? (
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-green-500/20 text-green-400 border border-green-500/20">
                      <CheckCircle className="h-3 w-3" /> COMPLETED
                    </span>
                 ) : task.status === 'failed' ? (
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-500/20 text-red-400 border border-red-500/20">
                      <Clock className="h-3 w-3" /> FAILED
                    </span>
                 ) : (
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-400 border border-blue-500/20">
                      <Clock className="h-3 w-3 animate-pulse" /> IN PROGRESS
                    </span>
                 )}
                 <span className="text-textMuted ml-auto text-[10px] uppercase tracking-wider bg-black/30 px-2 py-1 rounded">Assigned by AutoAgent</span>
               </div>

               {/* Verification Log rendering for users to see AI actions */}
               {task.verification_log && (
                 <div className="mt-2 text-[10px] font-mono p-2 bg-black/40 rounded border border-white/5 text-emerald-400/80 leading-relaxed">
                   {task.verification_log}
                 </div>
               )}
             </div>
             );
           })}
         </div>
      )}
    </CardContent>
  </Card>
);

export default AssignedTasksSection;
