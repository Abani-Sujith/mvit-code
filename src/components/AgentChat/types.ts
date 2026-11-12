export type Message = {
  role: 'user' | 'agent';
  text: string;
  suggestions?: string[];
  mode?: string;
  timestamp: Date;
};
