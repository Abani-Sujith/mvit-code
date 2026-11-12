import React from 'react';
import { Bot, Clock, Zap } from 'lucide-react';
import { ProactiveAction } from '../types';

interface ProactiveActionsSectionProps {
  proactiveActions: ProactiveAction[];
  expandedTrace: number | null;
  setExpandedTrace: React.Dispatch<React.SetStateAction<number | null>>;
}

const ProactiveActionsSection: React.FC<ProactiveActionsSectionProps> = ({
  proactiveActions,
  expandedTrace,
  setExpandedTrace,
}) => (
  <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-indigo-800/40 shadow-xl dark:shadow-2xl overflow-hidden mt-8">
    <div className="bg-gray-50 dark:bg-gradient-to-r dark:from-indigo-950 dark:to-purple-950 border-b border-gray-200 dark:border-indigo-800/40 p-5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Zap className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full animate-ping" />
        </div>
        <div>
          <h2 className="text-gray-900 dark:text-white font-bold tracking-wide">Proactive Intelligence Feed</h2>
          <p className="text-gray-500 dark:text-indigo-300 text-xs">System-initiated actions — no user input required</p>
        </div>
      </div>
      <span className="text-xs font-mono bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 border border-green-300 dark:border-green-700/50 px-3 py-1 rounded-full animate-pulse">
        ● LIVE
      </span>
    </div>

    <div className="p-5 space-y-4 max-h-96 overflow-y-auto">
      {proactiveActions.length === 0 ? (
        <div className="text-center py-10 text-gray-500 dark:text-gray-600 font-mono">
          <Bot className="h-10 w-10 mx-auto mb-3 opacity-30 dark:opacity-20 text-gray-400" />
          <p className="text-sm">Agent has not self-triggered yet.</p>
          <p className="text-xs mt-1">Click <span className="text-indigo-600 dark:text-indigo-400">Execute Agent Loop</span> to activate proactive monitoring.</p>
        </div>
      ) : (
        proactiveActions.map((action, idx) => (
          <div key={action.timestamp + idx} className="bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-xs rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700 font-bold">⚡ Autonomous Action</span>
                {action.flows_run.map(f => (
                  <span key={f} className="px-2 py-0.5 text-xs rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700/50">{f}</span>
                ))}
              </div>
              <div className="flex items-center gap-1 text-gray-400 dark:text-gray-500 text-xs shrink-0">
                <Clock size={10} />{action.timestamp}
              </div>
            </div>
            <p className="text-yellow-600 dark:text-yellow-400 text-xs font-mono">🔔 Trigger: {action.trigger}</p>
            <p className="text-gray-800 dark:text-gray-300 text-sm">{action.summary}</p>
            <button
              onClick={() => setExpandedTrace(expandedTrace === idx ? null : idx)}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition"
            >
              {expandedTrace === idx ? '▲ Hide trace' : '▼ Show reasoning trace'}
            </button>
            {expandedTrace === idx && (
              <div className="font-mono text-xs space-y-1 bg-white dark:bg-gray-900 border border-gray-100 dark:border-none rounded-xl p-3 mt-1">
                {action.trace.map((t, i) => (
                  <div key={i} className="flex gap-2">
                    <span className={`shrink-0 w-14 font-bold ${t.step === 'GOAL' ? 'text-blue-600 dark:text-blue-400' : t.step === 'PLAN' ? 'text-purple-600 dark:text-purple-400' : t.step === 'ACTION' ? 'text-yellow-600 dark:text-yellow-400' : t.step === 'RESULT' ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>{t.step}</span>
                    <span className="text-gray-700 dark:text-gray-300 break-all">{t.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  </div>
);

export default ProactiveActionsSection;
