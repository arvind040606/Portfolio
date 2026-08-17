import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Bot, FileText, Sparkles } from "lucide-react";
import { SystemPanel } from "./SystemPanel";
import { arvindProfile } from "../../data/arvindProfile";
import { GithubIcon, LinkedinIcon } from "../UI/SocialIcons";

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial-gradient pointer-events-none blur-3xl" />

      {/* Floating Light Blobs */}
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -30, 20, 0],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-10 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          x: [0, -40, 20, 0],
          y: [0, 40, -30, 0],
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-purple-600/10 blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Bio & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Status Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-wider shadow-sm shadow-cyan-500/10"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>ARVIND MADAAN // AI & FULL-STACK DEVELOPER</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]"
            >
              Building{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                intelligent products
              </span>{" "}
              that solve real problems.
            </motion.h1>

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-300 max-w-2xl font-sans leading-relaxed"
            >
              I'm <strong className="text-white">{arvindProfile.name}</strong> ({arvindProfile.nickname}), a Computer Science Engineering student focused on AI, full-stack development, and building practical digital products that deliver real user value.
            </motion.p>

            {/* Primary & Secondary CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <a
                href="#work"
                className="group relative inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-mono text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 transition-all duration-200 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#arvind-ai"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-mono text-sm font-semibold text-cyan-300 bg-slate-900/90 border border-cyan-500/40 hover:border-cyan-400 hover:bg-slate-800 transition-all duration-200 shadow-sm shadow-cyan-500/10 hover:-translate-y-0.5"
              >
                <Bot className="w-4 h-4 mr-2 text-cyan-400" />
                <span>Talk to Arvind.AI</span>
              </a>
            </motion.div>

            {/* Quick Profile External Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center space-x-3 pt-4 border-t border-white/10 text-xs font-mono text-slate-400"
            >
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-white/10 hover:border-cyan-500/30 hover:text-cyan-300 transition"
              >
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                <span>Resume</span>
              </a>

              <a
                href={arvindProfile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-white/10 hover:border-cyan-500/30 hover:text-cyan-300 transition"
              >
                <GithubIcon className="w-3.5 h-3.5 text-slate-300" />
                <span>GitHub</span>
              </a>

              <a
                href={arvindProfile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-white/10 hover:border-cyan-500/30 hover:text-cyan-300 transition"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-blue-400" />
                <span>LinkedIn</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: Hero Interactive Developer System Panel */}
          <div className="lg:col-span-5">
            <SystemPanel />
          </div>
        </div>
      </div>
    </section>
  );
};
