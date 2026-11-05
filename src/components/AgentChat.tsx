import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Minus, Maximize2, Trash2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Draggable from 'react-draggable';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { API_BASE_URL } from '../lib/apiConfig';

type Message = { 
  role: 'user' | 'agent'; 
  text: string; 
  suggestions?: string[];
  mode?: string;
  timestamp: Date;
};

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
      {/* Floating Toggle Button */}
      <button
        onClick={() => {
          setIsOpen(true);
          setIsMinimized(false);
        }}
        className={`fixed bottom-6 right-6 p-3.5 bg-ink-black text-pure-white rounded-full border-2 border-ink-black shadow-2xl hover:bg-primary-container transition-none z-[100] flex items-center justify-center ${isOpen && !isMinimized ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        aria-label="Open AI Assistant"
      >
        <MessageCircle size={26} />
      </button>

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
              {/* Header */}
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
                    onClick={() => setIsMinimized(!isMinimized)} 
                    className="p-1.5 text-ink-black hover:bg-pure-white rounded-full border border-transparent hover:border-ink-black transition-none"
                    title={isMinimized ? "Maximize" : "Minimize"}
                  >
                    {isMinimized ? <Maximize2 size={14} /> : <Minus size={14} />}
                  </button>
                  <button 
                    onClick={() => setIsOpen(false)} 
                    className="p-1.5 text-ink-black hover:bg-pure-white rounded-full border border-transparent hover:border-ink-black transition-none"
                    title="Close"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>

              {/* Body */}
              {!isMinimized && (
                <>
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

                  {/* Footer */}
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
                </>
              )}
            </motion.div>
          </Draggable>
        )}
      </AnimatePresence>
    </>
  );
};

export default AgentChat;
