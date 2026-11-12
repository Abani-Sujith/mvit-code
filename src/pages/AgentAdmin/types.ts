export type ProactiveAction = {
  timestamp: string;
  trigger: string;
  flows_run: string[];
  summary: string;
  trace: {step: string; text: string}[];
};

export type AgentTask = {
  id: string;
  member_name: string;
  description: string;
  difficulty: string;
  status: string; // 'assigned', 'pending', 'completed', 'failed'
  assigned_at: string;
  updated_at?: string;
  verification_log?: string;
};
