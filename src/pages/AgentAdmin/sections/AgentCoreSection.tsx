import React from 'react';
import { Activity, Bot, BrainCircuit } from 'lucide-react';

interface AgentCoreSectionProps {
  isLoopTriggered: boolean;
  onTriggerLoop: () => Promise<void>;
}

const AgentCoreSection: React.FC<AgentCoreSectionProps> = ({
  isLoopTriggered,
  onTriggerLoop,
}) => (
  <>
    {/* Header section with gradient glassmorphism */}
    <div className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-r from-gray-900 to-indigo-950 shadow-2xl border border-indigo-500/20">
      <div className="absolute top-0 right-0 p-12 opacity-10">
         <Bot className="w-64 h-64 text-indigo-400" />
      </div>
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <BrainCircuit className="text-indigo-400 h-10 w-10 animate-pulse" />
            <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 drop-shadow-lg">
              Autonomous AI Core
            </h1>
          </div>
          <p className="text-indigo-200/80 max-w-lg text-lg">
            Live deterministic verification, logistic ELO orchestration, and proactive micro-interventions globally across the campus network.
          </p>
        </div>
        <button
          onClick={onTriggerLoop}
          disabled={isLoopTriggered}
          className={`px-8 py-4 rounded-xl font-bold text-white shadow-xl transition-all duration-300 flex items-center gap-3 
            ${isLoopTriggered 
                ? 'bg-gray-700 cursor-not-allowed border border-gray-600' 
                : 'bg-gradient-to-r from-indigo-500 hover:from-indigo-400 hover:to-purple-500 to-purple-600 hover:scale-105 border border-indigo-400/50'}`}
        >
          {isLoopTriggered ? (
            <><span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></span> Orchestrating...</>
          ) : (
            <><Activity className="h-5 w-5" /> Force Run Loop NOW</>
          )}
        </button>
      </div>
    </div>
  </>
);

export default AgentCoreSection;
