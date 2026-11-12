import React from 'react';
import { Activity, Terminal as TermIcon } from 'lucide-react';

interface LiveTerminalSectionProps {
  logs: string[];
  isLoopTriggered: boolean;
  logEndRef: React.RefObject<HTMLDivElement>;
  logContainerRef: React.RefObject<HTMLDivElement>;
}

const LiveTerminalSection: React.FC<LiveTerminalSectionProps> = ({
  logs,
  isLoopTriggered,
  logEndRef,
  logContainerRef,
}) => (
  <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-3xl shadow-xl dark:shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col h-[500px]">
    <div className="bg-gray-100 dark:bg-black/40 border-b border-gray-200 dark:border-gray-800 p-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
         <TermIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
         <h2 className="text-sm font-mono font-bold text-gray-800 dark:text-gray-300 tracking-wider">AGENT_CORE_TERMINAL_V2.0</h2>
      </div>
      <div className="flex gap-2">
         <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
         <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
         <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
      </div>
    </div>
    
    <div ref={logContainerRef} className="p-5 font-mono text-sm overflow-y-auto flex-1 bg-gray-50 dark:bg-[#0a0f18]">
      {logs.length === 0 ? (
         <div className="h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-600 space-y-4">
            <Activity className="h-10 w-10 opacity-40 dark:opacity-20 text-gray-400 dark:text-gray-600" />
            <p className="text-gray-500 dark:text-gray-500">Awaiting intervention initialization...</p>
         </div>
      ) : (
         <div className="space-y-3">
           {logs.map((log, i) => {
              let colorClass = "text-gray-700 dark:text-gray-300";
              if (log.includes("[Trigger]")) colorClass = "text-yellow-600 dark:text-yellow-400 font-semibold";
              if (log.includes("[Plan]")) colorClass = "text-blue-600 dark:text-blue-400";
              if (log.includes("[Review]") || log.includes("SUCCESS")) colorClass = "text-green-600 dark:text-green-400 font-bold";
              if (log.includes("[Update]")) colorClass = "text-purple-600 dark:text-purple-400";
              if (log.includes("[Escalate]") || log.includes("Failed")) colorClass = "text-red-500 dark:text-red-400 font-bold dark:drop-shadow-[0_0_5px_rgba(248,113,113,0.8)]";
              
              return (
                  <div key={i} className={`flex items-start gap-3 opacity-0 animate-in fade-in slide-in-from-left-4 duration-300 fill-mode-forwards`} style={{ animationDelay: `${i * 50}ms` }}>
                      <span className="text-emerald-500/80 dark:text-emerald-500/50 shrink-0">➜</span>
                      <span className={`${colorClass} leading-relaxed`}>{log}</span>
                  </div>
              );
           })}
           {isLoopTriggered && (
              <div className="flex items-center gap-2 text-indigo-400 mt-4 animate-pulse">
                 <span className="font-bold">_</span> Processing Neural Algorithms...
              </div>
           )}
           <div ref={logEndRef} />
         </div>
      )}
    </div>
  </div>
);

export default LiveTerminalSection;
