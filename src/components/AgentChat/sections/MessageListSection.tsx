import React, { RefObject } from 'react';
import { ArrowRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Message } from '../types';

interface MessageListSectionProps {
  messages: Message[];
  isLoading: boolean;
  endOfMessagesRef: RefObject<HTMLDivElement>;
  handleSend: (overrideMsg?: string) => void | Promise<void>;
}

const MessageListSection: React.FC<MessageListSectionProps> = ({
  messages,
  isLoading,
  endOfMessagesRef,
  handleSend,
}) => (
  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface text-ink-black font-body-md text-sm">
    {messages.map((msg, i) => (
      <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
        <div className={`max-w-[85%] rounded-2xl px-4 py-3 border ${
          msg.role === 'user'
            ? 'bg-ink-black text-pure-white border-ink-black'
            : 'bg-pure-white text-ink-black border-ink-black'
        }`}>
          <div className="prose prose-sm max-w-none text-current">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {msg.text}
            </ReactMarkdown>
          </div>
        </div>

        {/* Suggestions */}
        {msg.suggestions && msg.suggestions.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {msg.suggestions.map((suggestion, sIdx) => (
              <button
                key={sIdx}
                onClick={() => handleSend(suggestion)}
                className="px-3 py-1 rounded-full bg-pure-white border border-ink-black text-ink-black font-label-sm text-[11px] uppercase tracking-wider hover:bg-primary-container hover:text-pure-white transition-none flex items-center gap-1"
              >
                {suggestion}
                <ArrowRight size={10} />
              </button>
            ))}
          </div>
        )}
      </div>
    ))}

    {isLoading && (
      <div className="flex justify-start">
        <div className="bg-pure-white border border-ink-black text-secondary rounded-2xl px-4 py-2.5 text-xs font-label-sm uppercase flex gap-2 items-center">
          <span className="w-2 h-2 rounded-full bg-primary-container animate-spin"></span>
          <span>Agent is analyzing...</span>
        </div>
      </div>
    )}
    <div ref={endOfMessagesRef} />
  </div>
);

export default MessageListSection;
