import React from 'react';
import { Bot, TrendingUp } from 'lucide-react';

interface MentorAssessmentSectionProps {
  analysis: any;
}

const MentorAssessmentSection: React.FC<MentorAssessmentSectionProps> = ({ analysis }) => (
  <>
    {/* AI Mentor Engine Card */}
    {analysis && (
      <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border border-indigo-500/30 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
           <Bot className="w-48 h-48 text-indigo-400" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start">
           <div className="bg-surface/80 border border-border/50 p-6 rounded-xl shrink-0 text-center min-w-[150px]">
              <div className="text-xs text-indigo-300 font-semibold uppercase tracking-wider mb-2">Performance Score</div>
              <div className="text-5xl font-black text-ink-black">{analysis.performance_score || 0}</div>
              <div className="text-xs text-textMuted mt-2 font-mono bg-black/30 p-1 rounded">Score v1</div>
              {analysis.weekly_delta_msg && (
                <div className={`text-xs font-bold mt-2 px-2 py-1 rounded inline-block whitespace-nowrap ${analysis.weekly_delta_msg.startsWith('+') ? 'bg-green-500/20 text-green-400' : analysis.weekly_delta_msg.startsWith('-') ? 'bg-red-500/20 text-red-400' : 'bg-gray-500/20 text-gray-400'}`}>
                  {analysis.weekly_delta_msg}
                </div>
              )}
           </div>

           <div className="flex-1 w-full space-y-4">
              {analysis.level_change_msg && (
                 <div className="px-4 py-3 rounded-lg bg-green-500/20 border border-green-500/50 text-green-400 font-bold flex items-center gap-2 animate-bounce-slow shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                    <TrendingUp className="w-5 h-5" /> {analysis.level_change_msg}
                 </div>
              )}
              <h3 className="text-xl font-bold flex items-center gap-2 text-ink-black"><Bot className="text-indigo-400 h-6 w-6"/> AI Mentor Assessment</h3>
              <div className="space-y-3 font-mono text-sm">
                 {analysis.mentor_feedback ? (
                     analysis.mentor_feedback.split('\n').map((line: string, i: number) => {
                         if (!line.trim()) return null;
                         let labelColor = "text-indigo-400";
                         if (line.startsWith("Observation:")) labelColor = "text-blue-400";
                         else if (line.startsWith("Issue:")) labelColor = "text-yellow-400";
                         else if (line.startsWith("Recommendation:")) labelColor = "text-green-400";

                         const parts = line.split(":");
                         if (parts.length < 2) return <div key={i} className="text-gray-300">{line}</div>;

                         return (
                             <div key={i} className="bg-black/30 p-3 rounded-lg border border-white/5 flex flex-col md:flex-row gap-2 md:items-start">
                                <span className={`font-bold ${labelColor} shrink-0 w-32`}>{parts[0]}:</span>
                                <span className="text-gray-300">{parts.slice(1).join(":")}</span>
                             </div>
                         )
                     })
                 ) : (
                     <div className="text-gray-400 italic">No structured feedback generated yet.</div>
                 )}
              </div>

              {analysis.flags && analysis.flags.length > 0 && (
                 <div className="flex gap-2 mt-4">
                   {analysis.flags.map((f: string) => (
                       <span key={f} className="px-2 py-1 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-full uppercase tracking-wider font-bold">Flag: {f.replace('_', ' ')}</span>
                   ))}
                 </div>
              )}

              {/* Phase 3: Skill & Topic Accountability Progression */}
              {analysis.skill_breakdown && Object.keys(analysis.skill_breakdown).length > 0 && (
                 <div className="mt-6 pt-6 border-t border-white/10 w-full">
                   <div className="flex flex-col md:flex-row gap-6">
                     <div className="flex-1">
                       <h4 className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider mb-3">Topic Strengths Map</h4>
                       <div className="flex flex-wrap gap-2">
                          {Object.entries(analysis.skill_breakdown).map(([topic, strength]: [string, any]) => (
                            <div key={topic} className="px-3 py-1.5 bg-black/40 border border-white/5 rounded-md text-xs font-medium flex items-center gap-2">
                              <span className="text-gray-300">{topic}</span>
                              <span className={`font-bold uppercase text-[10px] tracking-wider px-1.5 py-0.5 rounded ${strength === 'Strong' ? 'bg-green-500/20 text-green-400' : strength === 'Moderate' ? 'bg-blue-500/20 text-blue-400' : strength === 'Emerging' ? 'bg-gray-500/20 text-gray-400' : 'bg-red-500/20 text-red-400'}`}>{strength}</span>
                            </div>
                          ))}
                       </div>
                     </div>
                     <div className="shrink-0">
                        <div className="text-[10px] text-textMuted uppercase tracking-wider font-bold mb-3">AI Intervention Loop Record</div>
                        <div className="text-xs font-mono text-white bg-black/50 p-3 rounded-lg border border-white/5">
                          {analysis.task_analytics || "No tasks recorded."}
                        </div>
                     </div>
                   </div>
                 </div>
              )}
           </div>
        </div>
      </div>
    )}
  </>
);

export default MentorAssessmentSection;
