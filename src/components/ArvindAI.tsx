import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Bot, User, RefreshCw, Terminal } from 'lucide-react';
import {
  processArvindAIQuery,
  getContextualSuggestions,
  resetContextState,
  KnowledgeTopic
} from '../data/arvindKnowledgeEngine';

interface ArvindAIProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  isStreaming?: boolean;
  timestamp: string;
}

export const ArvindAI: React.FC<ArvindAIProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      sender: 'ai',
      text: "Hey! I'm ARVIND.AI — a virtual AI representation of Arvind Madaan. I can walk you through his flagship projects like BunkMate and CardioGuard AI, discuss his full-stack & ML architecture, or help you connect with him. What would you like to know?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const [statusText, setStatusText] = useState('GROUNDED KNOWLEDGE BASE ACTIVE');
  const [suggestionChips, setSuggestionChips] = useState<string[]>(getContextualSuggestions('general'));
  
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const streamingTimerRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isThinking]);

  // Clean up streaming timer on unmount
  useEffect(() => {
    return () => {
      if (streamingTimerRef.current) clearInterval(streamingTimerRef.current);
    };
  }, []);

  if (!isOpen) return null;

  const handleResetChat = () => {
    if (streamingTimerRef.current) clearInterval(streamingTimerRef.current);
    resetContextState();
    setIsThinking(false);
    setStatusText('GROUNDED KNOWLEDGE BASE ACTIVE');
    setSuggestionChips(getContextualSuggestions('general'));
    setMessages([
      {
        id: `init-${Date.now()}`,
        sender: 'ai',
        text: "Hey! Conversation memory reset. I'm ARVIND.AI — ask me about Arvind's projects, tech stack, or development experience!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isThinking) return;

    const userMsgId = `user-${Date.now()}`;
    const userMsg: Message = {
      id: userMsgId,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsThinking(true);
    setStatusText('Analyzing intent & project architecture...');

    // Process query through central persona & context engine
    const { response, topic, suggestions } = processArvindAIQuery(query);

    // Simulate thinking delay then stream text word by word
    setTimeout(() => {
      setStatusText(`Querying ${topic.toUpperCase()} domain...`);
      const words = response.split(' ');
      const aiMsgId = `ai-${Date.now()}`;
      
      const initialAiMsg: Message = {
        id: aiMsgId,
        sender: 'ai',
        text: '',
        isStreaming: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, initialAiMsg]);
      setIsThinking(false);

      let currentWordIdx = 0;
      if (streamingTimerRef.current) clearInterval(streamingTimerRef.current);

      streamingTimerRef.current = setInterval(() => {
        if (currentWordIdx < words.length) {
          const chunk = words.slice(0, currentWordIdx + 1).join(' ');
          setMessages((prev) =>
            prev.map((msg) => (msg.id === aiMsgId ? { ...msg, text: chunk } : msg))
          );
          currentWordIdx++;
          scrollToBottom();
        } else {
          if (streamingTimerRef.current) clearInterval(streamingTimerRef.current);
          setMessages((prev) =>
            prev.map((msg) => (msg.id === aiMsgId ? { ...msg, isStreaming: false } : msg))
          );
          setSuggestionChips(suggestions);
          setStatusText(`ACTIVE DOMAIN: ${topic.toUpperCase()}`);
        }
      }, 35); // 35ms per word streaming rate

    }, 350);
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl h-[620px] max-h-[90vh] bg-[#090b10] border border-[#00f0ff]/30 rounded-2xl shadow-[0_0_50px_rgba(0,240,255,0.2)] flex flex-col overflow-hidden font-sans">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 px-6 bg-[#040508] border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#00f0ff]/20 border border-[#00f0ff] flex items-center justify-center text-[#00f0ff] shrink-0">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-syne font-extrabold text-white text-base leading-none">
                  ARVIND.AI ASSISTANT
                </h3>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <span className="font-mono text-[10px] text-[#00f0ff] tracking-widest uppercase">
                GROUNDED VIRTUAL AI REPRESENTATION
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetChat}
              title="Reset Conversation Memory"
              data-cursor="RESET"
              className="p-2 rounded-full bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onClose}
              data-cursor="CLOSE"
              className="p-2 rounded-full bg-white/10 text-white hover:bg-[#00f0ff] hover:text-black transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Engine Status Bar */}
        <div className="px-6 py-1.5 bg-black/60 border-b border-white/5 flex items-center justify-between text-[10px] font-mono text-neutral-400">
          <span className="flex items-center gap-1.5">
            <Terminal className="w-3 h-3 text-[#00f0ff]" />
            <span>{statusText}</span>
          </span>
          <span className="text-emerald-400 font-bold">CONTEXT MEMORY ONLINE</span>
        </div>

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 font-sans">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-7 h-7 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/40 flex items-center justify-center text-[#00f0ff] shrink-0 mt-1">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}

              <div
                className={`max-w-[84%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-white text-black font-medium rounded-tr-none shadow-lg'
                    : 'bg-white/5 border border-white/10 text-neutral-200 rounded-tl-none'
                }`}
              >
                <p className="whitespace-pre-line font-sans">
                  {msg.text}
                  {msg.isStreaming && (
                    <span className="inline-block w-1.5 h-3.5 ml-1 bg-[#00f0ff] animate-pulse align-middle" />
                  )}
                </p>
                <span
                  className={`font-mono text-[9px] block mt-1.5 text-right ${
                    msg.sender === 'user' ? 'text-neutral-500' : 'text-neutral-400'
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs shrink-0 mt-1">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}

          {isThinking && (
            <div className="flex gap-3 justify-start">
              <div className="w-7 h-7 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/40 flex items-center justify-center text-[#00f0ff] shrink-0">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-neutral-400 text-xs font-mono animate-pulse flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-ping" />
                <span>Thinking...</span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Dynamic Contextual Suggestion Chips */}
        <div className="p-3 px-6 bg-[#040508]/80 border-t border-white/10 overflow-x-auto flex gap-2 no-scrollbar">
          {suggestionChips.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSend(prompt)}
              disabled={isThinking}
              data-cursor="ASK"
              className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-[#00f0ff] hover:text-[#00f0ff] text-neutral-300 font-mono text-[11px] whitespace-nowrap transition-colors cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-4 bg-[#040508] border-t border-white/10 flex items-center gap-3"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Arvind's projects, tech stack, or experience..."
            className="flex-1 px-4 py-3 rounded-full bg-white/5 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-[#00f0ff] transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim() || isThinking}
            data-cursor="SEND"
            className="p-3 rounded-full bg-[#00f0ff] text-black disabled:opacity-40 hover:bg-white transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
