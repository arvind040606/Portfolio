import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, ShieldCheck, Activity, Cpu, Sparkles, Code2, Layers } from "lucide-react";
import { arvindProfile } from "../../data/arvindProfile";

export const SystemPanel: React.FC = () => {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((prev) => (prev + 1) % 100);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative w-full max-w-md mx-auto lg:max-w-none glass-panel rounded-2xl p-6 border border-cyan-500/30 shadow-2xl shadow-cyan-500/10 font-mono text-xs overflow-hidden"
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></div>
          <span className="font-bold tracking-wider text-slate-100 text-sm">
            ARVIND.OS KERNEL
          </span>
        </div>
        <div className="flex items-center space-x-1.5 text-[10px] text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-md border border-white/5">
          <Activity className="w-3 h-3 text-cyan-400 animate-pulse" />
          <span>v2.4.0-STABLE</span>
        </div>
      </div>

      {/* System Status Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-white/5">
          <span className="text-slate-400 font-semibold tracking-wider flex items-center">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 mr-2" />
            STATUS
          </span>
          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-ping"></span>
            {arvindProfile.status}
          </span>
        </div>

        <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-white/5">
          <span className="text-slate-400 font-semibold tracking-wider flex items-center">
            <Activity className="w-3.5 h-3.5 text-cyan-400 mr-2" />
            MODE
          </span>
          <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
            {arvindProfile.mode}
          </span>
        </div>

        <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-white/5">
          <span className="text-slate-400 font-semibold tracking-wider flex items-center">
            <Cpu className="w-3.5 h-3.5 text-purple-400 mr-2" />
            FOCUS
          </span>
          <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30">
            {arvindProfile.focus}
          </span>
        </div>
      </div>

      {/* Metrics Counter Grid */}
      <div className="grid grid-cols-2 gap-3 my-4">
        <div className="p-3 rounded-xl bg-slate-900/80 border border-cyan-500/20 text-center relative overflow-hidden group hover:border-cyan-500/40 transition">
          <div className="text-[10px] text-slate-400 tracking-wider">MAJOR PROJECTS</div>
          <div className="text-2xl font-bold text-cyan-300 mt-1 font-mono">
            {arvindProfile.stats.projectsCount}
          </div>
          <Code2 className="absolute bottom-1 right-2 w-7 h-7 text-cyan-500/10 group-hover:text-cyan-500/20 transition" />
        </div>

        <div className="p-3 rounded-xl bg-slate-900/80 border border-purple-500/20 text-center relative overflow-hidden group hover:border-purple-500/40 transition">
          <div className="text-[10px] text-slate-400 tracking-wider">TECHNOLOGIES</div>
          <div className="text-2xl font-bold text-purple-300 mt-1 font-mono">
            {arvindProfile.stats.techCount}
          </div>
          <Layers className="absolute bottom-1 right-2 w-7 h-7 text-purple-500/10 group-hover:text-purple-500/20 transition" />
        </div>
      </div>

      {/* Currently Building Indicator */}
      <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-950/40 via-purple-950/30 to-slate-900 border border-cyan-500/30">
        <div className="text-[10px] text-slate-400 font-semibold tracking-wider flex items-center">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 mr-1.5 animate-spin" />
          CURRENTLY BUILDING
        </div>
        <div className="text-sm font-semibold text-slate-100 mt-1 flex items-center">
          <span className="text-cyan-400 mr-2">▸</span>
          <span>{arvindProfile.stats.focusAreas}</span>
        </div>
        <div className="mt-2 text-[10px] text-slate-400 flex items-center justify-between">
          <span>Target Architecture</span>
          <span className="text-cyan-300">Local-First + AI</span>
        </div>
      </div>

      {/* Terminal Footer Indicator */}
      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
        <div className="flex items-center space-x-1.5">
          <Terminal className="w-3 h-3 text-cyan-400" />
          <span>SHELL: ZSH / OS-KERNEL</span>
        </div>
        <span className="text-slate-400">THREAD #{pulse} ACTIVE</span>
      </div>
    </motion.div>
  );
};
