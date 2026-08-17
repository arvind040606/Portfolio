import React from "react";
import { motion } from "framer-motion";
import { ProjectWorldObjects } from "./ProjectWorldObjects";

export const Projects: React.FC = () => {
  return (
    <section id="work" className="py-32 relative overflow-hidden bg-[#030308] border-t border-white/5">
      {/* Volumetric background glow */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center space-x-3 text-cyan-400 font-mono text-xs tracking-[0.25em] uppercase font-bold"
          >
            <span className="text-2xl font-display font-black text-cyan-400">04</span>
            <span className="h-px w-8 bg-cyan-500/30" />
            <span>CINEMATIC PROJECT SHOWCASE</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display text-white uppercase tracking-tight">
            LIVE <span className="shimmer-text">APPLICATIONS.</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl font-sans">
            Every project below is deployed live and directly interactive inside physical viewport frames. Pre-authenticated demo accounts are enabled for instant recruiter testing.
          </p>
        </div>

        {/* Cinematic Projects Showcase */}
        <ProjectWorldObjects />

      </div>
    </section>
  );
};
