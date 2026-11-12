import React, { Dispatch, SetStateAction } from 'react';
import { Send, Trash2 } from 'lucide-react';

interface ChatFooterSectionProps {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  clearChat: () => void;
  handleSend: () => void | Promise<void>;
}

const ChatFooterSection: React.FC<ChatFooterSectionProps> = ({
  input,
  setInput,
  isLoading,
  clearChat,
  handleSend,
}) => (
  <div className="p-3 bg-pure-white border-t border-ink-black flex flex-col gap-2">
    <div className="flex gap-2 items-center">
      <button
        onClick={clearChat}
        className="p-2 text-secondary hover:text-error rounded-full hover:bg-surface border border-transparent hover:border-ink-black transition-none"
        title="Clear Chat"
      >
        <Trash2 size={16} />
      </button>
      <div className="flex-1 relative flex items-center">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Type a query..."
          className="w-full bg-surface text-ink-black rounded-full pl-4 pr-10 py-2 text-sm border border-ink-black focus:outline-none focus:border-primary-container"
        />
        <button
          onClick={() => handleSend()}
          disabled={isLoading || !input.trim()}
          className="absolute right-1.5 p-1.5 bg-ink-black text-pure-white rounded-full hover:bg-primary-container transition-none disabled:opacity-40"
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  </div>
);

export default ChatFooterSection;
