import React from 'react';
import { MessageCircle } from 'lucide-react';

interface FloatingToggleButtonProps {
  isOpen: boolean;
  isMinimized: boolean;
  onOpen: () => void;
}

const FloatingToggleButton: React.FC<FloatingToggleButtonProps> = ({
  isOpen,
  isMinimized,
  onOpen,
}) => (
  <button
    onClick={onOpen}
    className={`fixed bottom-6 right-6 p-3.5 bg-ink-black text-pure-white rounded-full border-2 border-ink-black shadow-2xl hover:bg-primary-container transition-none z-[100] flex items-center justify-center ${isOpen && !isMinimized ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
    aria-label="Open AI Assistant"
  >
    <MessageCircle size={26} />
  </button>
);

export default FloatingToggleButton;
