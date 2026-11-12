import { useState, useRef, useEffect } from 'react';
import { API_BASE_URL } from '../../lib/apiConfig';
import FloatingToggleButton from './sections/FloatingToggleButton';
import ChatWindowSection from './sections/ChatWindowSection';
import { Message } from './types';

const AgentChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'agent',
      text: '### Hi there! I am your **Campus AI Agent**.\n\nI can help you analyze **student performance**, identify **inactive members**, or check **team standings**. What would you like to know today?',
      suggestions: ['Who is the top performer?', 'Show me inactive members', 'Team standings'],
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const sessionId = useRef(`session_${Date.now()}`);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized, isLoading]);

  const handleSend = async (overrideMsg?: string) => {
    const userMsg = overrideMsg || input.trim();
    if (!userMsg) return;

    setMessages(prev => [...prev, { role: 'user', text: userMsg, timestamp: new Date() }]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, session_id: sessionId.current })
      });
      const data = await res.json();

      setMessages(prev => [...prev, {
        role: 'agent',
        text: data.reply || "Sorry, I couldn't process that.",
        suggestions: data.suggestions || [],
        mode: data.mode || 'llm_agent',
        timestamp: new Date()
      }]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'agent',
        text: "Error connecting to backend service.",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([{
      role: 'agent',
      text: 'Chat cleared. How can I help you now?',
      timestamp: new Date()
    }]);
    sessionId.current = `session_${Date.now()}`;
  };

  return (
    <>
      <FloatingToggleButton
        isOpen={isOpen}
        isMinimized={isMinimized}
        onOpen={() => {
          setIsOpen(true);
          setIsMinimized(false);
        }}
      />

      <ChatWindowSection
        isOpen={isOpen}
        isMinimized={isMinimized}
        messages={messages}
        isLoading={isLoading}
        endOfMessagesRef={endOfMessagesRef}
        input={input}
        setInput={setInput}
        clearChat={clearChat}
        handleSend={handleSend}
        onToggleMinimize={() => setIsMinimized(!isMinimized)}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

export default AgentChat;
