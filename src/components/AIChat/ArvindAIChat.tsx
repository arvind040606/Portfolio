import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Bot, Send, User, RefreshCw } from "lucide-react";
import { queryArvindAI } from "../../data/arvindProfile";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

export const ArvindAIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      sender: "ai",
      text: "Hello! I am ARVIND.AI. Ask me anything about Arvind's work, applications, tech stack, or engineering philosophy.",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sampleQuestions = [
    "What has Arvind built?",
    "Tell me about BunkMate.",
    "What technologies does he use?",
    "Show me his strongest project.",
    "How can I contact him?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const queryText = textToSend || input;
    if (!queryText.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: queryText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const responseText = queryArvindAI(queryText);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 500);
  };

  return (
    <section id="arvind-ai" className="py-32 relative overflow-hidden bg-[#030308] border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center space-x-3 text-cyan-400 font-mono text-xs tracking-[0.25em] uppercase font-bold"
          >
            <span className="text-2xl font-display font-black text-cyan-400">06</span>
            <span className="h-px w-8 bg-cyan-500/30" />
            <span>PORTFOLIO INTELLIGENCE AGENT</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display text-white uppercase tracking-tight">
            ARVIND<span className="shimmer-text">.AI</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl font-sans">
            Ask me anything about my work.
          </p>
        </div>

        {/* Chat Console */}
        <div className="rounded-3xl border border-white/10 bg-[#070A14] shadow-2xl overflow-hidden flex flex-col h-[540px]">
          
          {/* Top Bar */}
          <div className="px-6 py-4 border-b border-white/10 bg-[#030308]/90 flex items-center justify-between font-mono text-xs">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-white tracking-wider flex items-center space-x-2">
                  <span>ARVIND.AI AGENT</span>
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                </div>
                <div className="text-[10px] text-slate-500">STRUCTURED PORTFOLIO KNOWLEDGE ENGINE</div>
              </div>
            </div>

            <button
              onClick={() => {
                setMessages([
                  {
                    id: "init",
                    sender: "ai",
                    text: "Conversation reset. What would you like to know about Arvind?",
                    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                  },
                ]);
              }}
              className="p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-slate-400 hover:text-white transition border border-white/5"
              title="Reset Chat"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 font-sans text-sm">
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-start space-x-3 ${
                  m.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center font-mono text-xs font-bold ${
                    m.sender === "user"
                      ? "bg-purple-600 text-white"
                      : "bg-cyan-500/10 border border-cyan-500/30 text-cyan-300"
                  }`}
                >
                  {m.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`max-w-[80%] p-4 rounded-2xl leading-relaxed text-sm ${
                    m.sender === "user"
                      ? "bg-purple-600 text-white rounded-tr-none"
                      : "bg-white/[0.03] border border-white/10 text-slate-200 rounded-tl-none"
                  }`}
                >
                  <div>{m.text}</div>
                  <div className="mt-1.5 text-[10px] font-mono text-slate-500 text-right opacity-70">
                    {m.timestamp}
                  </div>
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs pl-2">
                <Bot className="w-4 h-4 animate-spin" />
                <span>ARVIND.AI IS PROCESSING...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Chips */}
          <div className="px-6 py-2.5 bg-[#030308] border-t border-white/5 flex items-center space-x-2 overflow-x-auto no-scrollbar">
            <span className="text-[10px] font-mono text-slate-500 shrink-0 uppercase tracking-widest">SUGGESTED:</span>
            {sampleQuestions.map((q) => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                data-cursor="ASK"
                className="px-3 py-1.5 rounded-full bg-white/[0.03] hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-white/10 hover:border-cyan-500/30 text-xs font-mono shrink-0 transition"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-4 bg-[#030308] border-t border-white/10 flex items-center space-x-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask ARVIND.AI..."
              className="flex-1 bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-sans"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              data-cursor="SEND"
              className="p-3.5 rounded-2xl bg-cyan-400 hover:bg-cyan-300 disabled:opacity-40 text-slate-950 font-bold transition shadow-[0_0_20px_rgba(0,240,255,0.3)]"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      </div>
    </section>
  );
};
