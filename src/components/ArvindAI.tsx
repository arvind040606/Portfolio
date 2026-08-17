import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Bot, User, CornerDownLeft } from 'lucide-react';
import { queryArvindAI } from '../data/arvindProfile';

interface ArvindAIProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export const ArvindAI: React.FC<ArvindAIProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: "Hello! I am ARVIND.AI, an interactive assistant trained on Arvind Madaan's background, verified skills, and project architecture. What would you like to know?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const samplePrompts = [
    "Tell me about BunkMate's encryption",
    "How does CardioGuard AI use SHAP?",
    "What are Arvind's primary skills?",
    "What real projects has Arvind built?",
    "Is Arvind open for engineering roles?",
  ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const responseText = queryArvindAI(query);
      const aiMsg: Message = {
        sender: 'ai',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl h-[620px] max-h-[90vh] bg-[#090b10] border border-[#00f0ff]/30 rounded-2xl shadow-[0_0_50px_rgba(0,240,255,0.2)] flex flex-col overflow-hidden font-sans">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 px-6 bg-[#040508] border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#00f0ff]/20 border border-[#00f0ff] flex items-center justify-center text-[#00f0ff]">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <h3 className="font-syne font-extrabold text-white text-base leading-none">
                ARVIND.AI ASSISTANT
              </h3>
              <span className="font-mono text-[10px] text-[#00f0ff] tracking-widest uppercase">
                GROUNDED TRUTHFUL KNOWLEDGE BASE
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 text-white hover:bg-[#00f0ff] hover:text-black transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 font-sans">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-7 h-7 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/40 flex items-center justify-center text-[#00f0ff] shrink-0 mt-1">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}

              <div
                className={`max-w-[82%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-white text-black font-medium rounded-tr-none'
                    : 'bg-white/5 border border-white/10 text-neutral-200 rounded-tl-none'
                }`}
              >
                <p className="whitespace-pre-line">{msg.text}</p>
                <span
                  className={`font-mono text-[9px] block mt-1 text-right ${
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

          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="w-7 h-7 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/40 flex items-center justify-center text-[#00f0ff] shrink-0">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-neutral-400 text-xs font-mono animate-pulse">
                Querying verified knowledge base...
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Suggestion Chips */}
        <div className="p-3 px-6 bg-[#040508]/60 border-t border-white/10 overflow-x-auto flex gap-2 no-scrollbar">
          {samplePrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSend(prompt)}
              className="px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:border-[#00f0ff] hover:text-[#00f0ff] text-neutral-300 font-mono text-[11px] whitespace-nowrap transition-colors"
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
            disabled={!input.trim()}
            className="p-3 rounded-full bg-[#00f0ff] text-black disabled:opacity-40 hover:bg-white transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
