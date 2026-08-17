import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Bot, FileText, Sparkles, ChevronDown } from "lucide-react";
import { arvindProfile } from "../../data/arvindProfile";
import { CinematicCharacterCanvas } from "./CinematicCharacterCanvas";
import { GithubIcon, LinkedinIcon } from "../UI/SocialIcons";

export const HeroSpaceUniverse: React.FC = () => {
  const [isHoveredScene, setIsHoveredScene] = useState(false);

  return (
    <section id="hero" className="relative min-h-[92vh] flex flex-col justify-between pt-24 pb-12 overflow-hidden bg-[#030308]">
      {/* Background Volumetric Glow & Ambient Stars */}
      <div className="absolute inset-0 bg-grid-subtle opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-cyan-500/10 via-purple-500/10 to-transparent blur-[140px] pointer-events-none rounded-full" />

      {/* Top Hover-to-Reveal Header Banner */}
      <div className="w-full text-center px-4 mb-4 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center space-x-3 px-5 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md text-xs font-mono tracking-[0.2em] text-slate-300 uppercase shadow-2xl"
          data-cursor="✦ EXPLORE"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>BUILDING THE FUTURE // ARVIND.OS</span>
        </motion.div>
      </div>

      {/* Main Cinematic Hero Grid (Typography + 3D Realistic Character Canvas) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[550px]">
          
          {/* Left Column: Editorial Typography & Positioning */}
          <div className="lg:col-span-7 space-y-6 text-left relative z-20">
            {/* System Title Tag */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center space-x-2 text-cyan-400 font-mono text-xs tracking-widest uppercase font-semibold"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>{arvindProfile.title}</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">CSE ENGINEERING</span>
            </motion.div>

            {/* Giant Editorial Typography Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="space-y-1"
            >
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black font-display tracking-tight text-white uppercase leading-[0.92] select-none">
                BUILDING
                <br />
                <span className="shimmer-text">INTELLIGENT</span>
                <br />
                PRODUCTS.
              </h1>
            </motion.div>

            {/* Sub-Headline & Bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="space-y-3 max-w-xl"
            >
              <p className="text-xl sm:text-2xl font-light text-slate-200 tracking-wide font-sans">
                <span className="font-bold text-white">{arvindProfile.name.toUpperCase()}</span> ({arvindProfile.nickname})
              </p>
              <p className="text-sm sm:text-base text-slate-400 font-sans leading-relaxed">
                Computer Science Engineering student crafting intelligent digital systems, privacy-first local applications, and clinical predictive ML platforms.
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <a
                href="#work"
                data-cursor="EXPLORE"
                className="group relative inline-flex items-center justify-center px-8 py-4 rounded-full font-mono text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-white hover:opacity-95 transition-all duration-300 shadow-[0_0_30px_rgba(0,240,255,0.3)] hover:shadow-[0_0_45px_rgba(0,240,255,0.5)] hover:scale-[1.02]"
              >
                <span>EXPLORE WORK</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1.5 transition-transform" />
              </a>

              <a
                href="#arvind-ai"
                data-cursor="ARVIND.AI"
                className="inline-flex items-center justify-center px-7 py-4 rounded-full font-mono text-xs font-bold text-cyan-300 bg-white/[0.04] border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-500/10 transition-all duration-300 backdrop-blur-md shadow-lg"
              >
                <Bot className="w-4 h-4 mr-2 text-cyan-400" />
                <span>TALK TO ARVIND.AI</span>
              </a>
            </motion.div>

            {/* Editorial Metadata Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="flex items-center space-x-6 pt-4 text-xs font-mono text-slate-400 border-t border-white/5"
            >
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="VIEW CV"
                className="flex items-center space-x-2 hover:text-cyan-300 transition"
              >
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                <span>[ RESUME ]</span>
              </a>

              <a
                href={arvindProfile.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="GITHUB"
                className="flex items-center space-x-2 hover:text-cyan-300 transition"
              >
                <GithubIcon className="w-3.5 h-3.5 text-slate-300" />
                <span>[ GITHUB ]</span>
              </a>

              <a
                href={arvindProfile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="LINKEDIN"
                className="flex items-center space-x-2 hover:text-cyan-300 transition"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-blue-400" />
                <span>[ LINKEDIN ]</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: Interactive 3D Photorealistic Character Scene with Mask Reveal */}
          <div
            className="lg:col-span-5 h-[460px] sm:h-[540px] relative rounded-3xl overflow-hidden border border-white/10 group bg-space-deep/80 shadow-2xl"
            onMouseEnter={() => setIsHoveredScene(true)}
            onMouseLeave={() => setIsHoveredScene(false)}
            data-cursor="MOVE TO REVEAL"
          >
            {/* 3D Realistic Character Canvas */}
            <CinematicCharacterCanvas />

            {/* Hover Spotlight Overlay Mask */}
            <div
              className={`absolute inset-0 pointer-events-none transition-opacity duration-700 bg-gradient-to-t from-[#030308] via-transparent to-transparent ${
                isHoveredScene ? "opacity-30" : "opacity-70"
              }`}
            />

            {/* Dynamic Status HUD Overlay */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between font-mono text-[11px] text-cyan-300 bg-black/60 backdrop-blur-xl px-4 py-2.5 rounded-2xl border border-white/10 pointer-events-none">
              <span className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping mr-2" />
                ARVIND AVATAR // MOUSE TRACKING ACTIVE
              </span>
              <span className="text-slate-400">3D REAL-TIME</span>
            </div>
          </div>

        </div>
      </div>

      {/* Down Scroll Indicator */}
      <div className="w-full text-center relative z-20 pt-4">
        <a
          href="#about"
          className="inline-flex flex-col items-center space-y-1 text-slate-500 hover:text-cyan-400 transition font-mono text-[10px] uppercase tracking-widest"
          data-cursor="SCROLL"
        >
          <span>DISCOVER STORY</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-cyan-400" />
        </a>
      </div>
    </section>
  );
};
