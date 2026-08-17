import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Bot, User, RefreshCw, ExternalLink, Github, Mail, AlertTriangle, Smartphone } from 'lucide-react';
import { fetchArvindAIResponse, ChatMessageItem } from '../services/arvindAIService';
import { ARVIND_PROJECTS_KNOWLEDGE, ARVIND_PROFILE_KNOWLEDGE } from '../data/arvindVerifiedKnowledge';

interface ArvindAIProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DisplayMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  isStreaming?: boolean;
  timestamp: string;
  isError?: boolean;
  actionLinks?: Array<{ label: string; url: string; icon?: 'external' | 'github' | 'mail' }>;
}

export const ArvindAI: React.FC<ArvindAIProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<DisplayMessage[]>([
    {
      id: 'init-1',
      sender: 'ai',
      text: "Hey! I'm ARVIND.AI — a virtual representation of Arvind Madaan. Ask me anything about his projects, technical stack, engineering choices, or background!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  
  // Session memory for LLM / local context
  const [sessionHistory, setSessionHistory] = useState<ChatMessageItem[]>([]);
  const [isThinking, setIsThinking] = useState(false);

  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const streamingTimerRef = useRef<NodeJS.Timeout | null>(null);

  const defaultSuggestions = [
    "hlo",
    "who is Arvind?",
    "how old is he?",
    "tell me about BunkMate",
    "where can I download the BunkMate APK?",
    "what is his best project?",
    "why did he build it?",
    "compare BunkMate and CardioGuard from an engineering perspective",
  ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isThinking]);

  useEffect(() => {
    return () => {
      if (streamingTimerRef.current) clearInterval(streamingTimerRef.current);
    };
  }, []);

  if (!isOpen) return null;

  const handleResetChat = () => {
    if (streamingTimerRef.current) clearInterval(streamingTimerRef.current);
    setSessionHistory([]);
    setIsThinking(false);
    setMessages([
      {
        id: `init-${Date.now()}`,
        sender: 'ai',
        text: "Session context reset. What would you like to know about Arvind's work?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  // Helper to attach interactive action badges based on answer content
  const extractActionLinks = (text: string) => {
    const links: Array<{ label: string; url: string; icon?: 'external' | 'github' | 'mail' }> = [];
    const lower = text.toLowerCase();

    if (lower.includes('bunkmate')) {
      links.push({ label: 'Try BunkMate Live', url: ARVIND_PROJECTS_KNOWLEDGE.bunkmate.liveDemoUrl!, icon: 'external' });
      if (ARVIND_PROJECTS_KNOWLEDGE.bunkmate.apkDownloadUrl) {
        links.push({ label: 'Download BunkMate APK 📲', url: ARVIND_PROJECTS_KNOWLEDGE.bunkmate.apkDownloadUrl, icon: 'external' });
      }
    }
    if (lower.includes('cardioguard')) {
      links.push({ label: 'Try CardioGuard AI Live', url: ARVIND_PROJECTS_KNOWLEDGE.cardioguard.liveDemoUrl!, icon: 'external' });
    }
    if (lower.includes('atmosphere')) {
      links.push({ label: 'Try Atmosphere AI Live', url: ARVIND_PROJECTS_KNOWLEDGE.atmosphere.liveDemoUrl!, icon: 'external' });
    }
    if (lower.includes('github') || lower.includes('repository')) {
      links.push({ label: 'GitHub Profile', url: ARVIND_PROFILE_KNOWLEDGE.contact.github, icon: 'github' });
    }
    if (lower.includes('contact') || lower.includes('email') || lower.includes('hire')) {
      links.push({ label: 'Email Arvind', url: `mailto:${ARVIND_PROFILE_KNOWLEDGE.contact.email}`, icon: 'mail' });
    }

    return links;
  };

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isThinking) return;

    const userMsgId = `user-${Date.now()}`;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMsg: DisplayMessage = {
      id: userMsgId,
      sender: 'user',
      text: query,
      timestamp,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsThinking(true);

    // Call hybrid AI service (Local Knowledge Router + Gemini 2.5 internally)
    const serviceResult = await fetchArvindAIResponse(query, sessionHistory);
    const rawAiResponse = serviceResult.text;

    // Update conversation memory
    const updatedHistory: ChatMessageItem[] = [
      ...sessionHistory,
      { role: 'user', content: query },
      { role: 'model', content: rawAiResponse },
    ];
    setSessionHistory(updatedHistory);

    // Stream response text word by word for a smooth conversational feel
    const words = rawAiResponse.split(' ');
    const aiMsgId = `ai-${Date.now()}`;
    const actionLinks = extractActionLinks(rawAiResponse);

    const initialAiMsg: DisplayMessage = {
      id: aiMsgId,
      sender: 'ai',
      text: '',
      isStreaming: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isError: !!serviceResult.error,
      actionLinks,
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
      }
    }, 18);
  };

  return (
    <div className="fixed inset-0 z-[999990] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl h-[620px] max-h-[90vh] bg-[#090b10] border border-white/15 rounded-2xl shadow-[0_0_60px_rgba(0,240,255,0.15)] flex flex-col overflow-hidden font-sans">
        
        {/* Sleek Professional Header */}
        <div className="flex items-center justify-between p-4 px-6 bg-[#040508] border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#00f0ff]/15 border border-[#00f0ff]/40 flex items-center justify-center text-[#00f0ff] shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-syne font-extrabold text-white text-base leading-none">
                  ARVIND.AI ASSISTANT
                </h3>
                <span className="w-2 h-2 rounded-full bg-emerald-400" title="Available" />
              </div>
              <p className="text-[11px] text-neutral-400 font-sans mt-0.5">
                Ask me about Arvind, his work, and projects.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetChat}
              title="Reset conversation"
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

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 font-sans">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-1 ${
                  msg.isError
                    ? 'bg-amber-500/20 border border-amber-400 text-amber-300'
                    : 'bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff]'
                }`}>
                  {msg.isError ? <AlertTriangle className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>
              )}

              <div
                className={`max-w-[85%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-white text-black font-medium rounded-tr-none shadow-md'
                    : msg.isError
                    ? 'bg-amber-950/30 border border-amber-500/30 text-amber-200 rounded-tl-none font-sans'
                    : 'bg-white/5 border border-white/10 text-neutral-200 rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-line font-sans">
                  {msg.text}
                  {msg.isStreaming && (
                    <span className="inline-block w-1.5 h-3.5 ml-1 bg-[#00f0ff] animate-pulse align-middle" />
                  )}
                </div>

                {/* Interactive Action Links */}
                {msg.sender === 'ai' && msg.actionLinks && msg.actionLinks.length > 0 && !msg.isStreaming && (
                  <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-wrap gap-2">
                    {msg.actionLinks.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black font-mono text-[11px] font-medium transition-all"
                      >
                        {link.icon === 'github' && <Github className="w-3 h-3" />}
                        {link.icon === 'mail' && <Mail className="w-3 h-3" />}
                        {link.icon === 'external' && <ExternalLink className="w-3 h-3" />}
                        <span>{link.label}</span>
                      </a>
                    ))}
                  </div>
                )}

                <div className="flex justify-end mt-1.5 font-sans text-[10px] text-neutral-400">
                  <span>{msg.timestamp}</span>
                </div>
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
              <div className="w-7 h-7 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 flex items-center justify-center text-[#00f0ff] shrink-0">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-neutral-400 text-xs font-sans animate-pulse flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-ping" />
                <span>Thinking...</span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-3 px-6 bg-[#040508]/80 border-t border-white/10 overflow-x-auto flex gap-2 no-scrollbar">
          {defaultSuggestions.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSend(prompt)}
              disabled={isThinking}
              data-cursor="ASK"
              className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-[#00f0ff] hover:text-[#00f0ff] text-neutral-300 font-sans text-[11px] whitespace-nowrap transition-colors cursor-pointer"
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
            placeholder="Ask about Arvind's projects, tech stack, or background..."
            className="flex-1 px-4 py-3 rounded-full bg-white/5 border border-white/15 text-white font-sans text-xs focus:outline-none focus:border-[#00f0ff] transition-colors"
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
