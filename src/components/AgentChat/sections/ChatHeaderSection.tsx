import React from 'react';
import { Bot, Maximize2, Minus, X } from 'lucide-react';

interface ChatHeaderSectionProps {
  isMinimized: boolean;
  onToggleMinimize: () => void;
  onClose: () => void;
}

const ChatHeaderSection: React.FC<ChatHeaderSectionProps> = ({
  isMinimized,
  onToggleMinimize,
  onClose,
}) => (
  <div className="chat-header cursor-move flex justify-between items-center px-5 flex-shrink-0 bg-surface-tint border-b border-ink-black h-16 select-none">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-primary-container text-pure-white flex items-center justify-center border border-ink-black">
        <Bot size={18} />
      </div>
      <div>
        <h3 className="font-title-md text-sm text-ink-black font-bold uppercase leading-none">Campus AI Agent</h3>
        <p className="font-label-sm text-[10px] text-secondary uppercase tracking-wider mt-0.5">Telemetry Assistant</p>
      </div>
    </div>

    <div className="flex items-center gap-1">
      <button
        onClick={onToggleMinimize}
        className="p-1.5 text-ink-black hover:bg-pure-white rounded-full border border-transparent hover:border-ink-black transition-none"
        title={isMinimized ? "Maximize" : "Minimize"}
      >
        {isMinimized ? <Maximize2 size={14} /> : <Minus size={14} />}
      </button>
      <button
        onClick={onClose}
        className="p-1.5 text-ink-black hover:bg-pure-white rounded-full border border-transparent hover:border-ink-black transition-none"
        title="Close"
      >
        <X size={14} />
      </button>
    </div>
  </div>
);

export default ChatHeaderSection;
