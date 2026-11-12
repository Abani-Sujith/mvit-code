import React, { Dispatch, RefObject, SetStateAction } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Draggable from 'react-draggable';
import ChatHeaderSection from './ChatHeaderSection';
import MessageListSection from './MessageListSection';
import ChatFooterSection from './ChatFooterSection';
import { Message } from '../types';

interface ChatWindowSectionProps {
  isOpen: boolean;
  isMinimized: boolean;
  messages: Message[];
  isLoading: boolean;
  endOfMessagesRef: RefObject<HTMLDivElement>;
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  clearChat: () => void;
  handleSend: (overrideMsg?: string) => Promise<void>;
  onToggleMinimize: () => void;
  onClose: () => void;
}

const ChatWindowSection: React.FC<ChatWindowSectionProps> = ({
  isOpen,
  isMinimized,
  messages,
  isLoading,
  endOfMessagesRef,
  input,
  setInput,
  clearChat,
  handleSend,
  onToggleMinimize,
  onClose,
}) => (
  <AnimatePresence>
    {isOpen && (
      <Draggable handle=".chat-header" bounds="body" defaultPosition={{x: 0, y: 0}} cancel="button">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={isMinimized ? {
            opacity: 1, y: 0, scale: 1,
            height: '64px', width: '280px'
          } : {
            opacity: 1, y: 0, scale: 1,
            height: 'min(640px, calc(100% - 48px))',
            width: 'min(440px, calc(100vw - 32px))'
          }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          className={`fixed z-[110] bg-pure-white border-2 border-ink-black shadow-2xl flex flex-col overflow-hidden bottom-6 right-6
            ${isMinimized ? 'rounded-full' : 'rounded-3xl'}`}
        >
          <ChatHeaderSection
            isMinimized={isMinimized}
            onToggleMinimize={onToggleMinimize}
            onClose={onClose}
          />

          {!isMinimized && (
            <>
              <MessageListSection
                messages={messages}
                isLoading={isLoading}
                endOfMessagesRef={endOfMessagesRef}
                handleSend={handleSend}
              />
              <ChatFooterSection
                input={input}
                setInput={setInput}
                isLoading={isLoading}
                clearChat={clearChat}
                handleSend={handleSend}
              />
            </>
          )}
        </motion.div>
      </Draggable>
    )}
  </AnimatePresence>
);

export default ChatWindowSection;
