import React from "react";
import { motion } from "framer-motion";
import { Cpu, Code2, Sparkles } from "lucide-react";
import { InteractiveSkillField } from "./InteractiveSkillField";

export const TechStack: React.FC = () => {
  return (
    <section id="skills" className="py-32 relative overflow-hidden bg-[#05070E] border-t border-white/5">
      {/* Background Volumetric Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-br from-cyan-600/10 via-purple-600/10 to-transparent blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center space-x-3 text-cyan-400 font-mono text-xs tracking-[0.25em] uppercase font-bold"
          >
            <span className="text-2xl font-display font-black text-cyan-400">03</span>
            <span className="h-px w-8 bg-cyan-500/30" />
            <span>INTERACTIVE SKILLS & REAL CODE</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display text-white uppercase tracking-tight">
            ENGINEERING <span className="shimmer-text">CAPABILITIES.</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl font-sans">
            Hover over any core skill to watch the environment react with actual production code snippets and pipeline logic used in Arvind's projects.
          </p>
        </div>

        {/* Large Interactive Skill Field with Live Environment Reaction */}
        <InteractiveSkillField />

      </div>
    </section>
  );
};
