import React, { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Sparkles, Code2, Layers } from "lucide-react";

export const SkillNetwork: React.FC = () => {
  const [activeBranch, setActiveBranch] = useState<string | null>(null);

  const branches = [
    {
      id: "ai",
      title: "AI & ML",
      color: "text-cyan-400 border-cyan-400 bg-cyan-950/40",
      nodeColor: "bg-cyan-400",
      skills: ["Machine Learning", "Gemini API", "Speech & Voice AI", "AI Applications"],
    },
    {
      id: "fullstack",
      title: "FULL STACK",
      color: "text-purple-400 border-purple-400 bg-purple-950/40",
      nodeColor: "bg-purple-400",
      skills: ["React & TypeScript", "Python & FastAPI", "Node.js REST", "SQL Databases"],
    },
    {
      id: "product",
      title: "PRODUCT",
      color: "text-emerald-400 border-emerald-400 bg-emerald-950/40",
      nodeColor: "bg-emerald-400",
      skills: ["Local-First & Encryption", "PWA & Offline", "Edge Deployment", "System UX"],
    },
  ];

  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-cyan-500/30 text-center space-y-8 my-12">
      <div className="flex items-center justify-between border-b border-white/10 pb-4 text-xs font-mono">
        <div className="flex items-center space-x-2 text-cyan-400 font-bold">
          <Cpu className="w-4 h-4" />
          <span>INTERACTIVE KERNEL NETWORK</span>
        </div>
        <span className="text-slate-400">SELECT A CORE BRANCH</span>
      </div>

      {/* Network Nodes Representation */}
      <div className="relative max-w-2xl mx-auto py-8">
        {/* Center Node */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-28 h-28 rounded-full bg-slate-900 border-2 border-cyan-400 shadow-2xl shadow-cyan-500/30 mx-auto flex flex-col items-center justify-center cursor-pointer relative z-20 group"
        >
          <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider">CORE</span>
          <span className="text-base font-extrabold text-white font-mono group-hover:text-cyan-300">
            ARVIND
          </span>
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping absolute -top-1 right-3"></span>
        </motion.div>

        {/* Outer Branches */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {branches.map((b) => {
            const isActive = activeBranch === b.id;
            return (
              <motion.div
                key={b.id}
                onMouseEnter={() => setActiveBranch(b.id)}
                onMouseLeave={() => setActiveBranch(null)}
                className={`p-5 rounded-xl border transition-all duration-300 cursor-pointer ${
                  isActive || !activeBranch
                    ? b.color
                    : "border-white/10 bg-slate-900/40 text-slate-400 opacity-60"
                }`}
              >
                <div className="flex items-center justify-center space-x-2 font-mono font-bold text-sm mb-3">
                  <span className={`w-2.5 h-2.5 rounded-full ${b.nodeColor}`}></span>
                  <span>{b.title}</span>
                </div>

                <div className="space-y-1.5 font-mono text-xs text-slate-200">
                  {b.skills.map((s) => (
                    <div
                      key={s}
                      className="p-1.5 rounded bg-slate-900/80 border border-white/5"
                    >
                      ▸ {s}
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
