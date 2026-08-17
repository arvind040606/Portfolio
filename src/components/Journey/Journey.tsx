import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Terminal } from "lucide-react";

interface TimelineItem {
  year: string;
  tagline: string;
  title: string;
  description: string;
  techs: string[];
  projects: string[];
}

const timelineData: TimelineItem[] = [
  {
    year: "2024",
    tagline: "FIRST BUILDS",
    title: "Algorithmic Foundations & Core Web Systems",
    description: "Built strong C++ algorithms and foundational DOM architectures. Developed problem-solving logic and explored client-side web interfaces.",
    techs: ["C++", "Python", "JavaScript", "HTML/CSS"],
    projects: ["Academic Benchmarks", "DOM Explorations"],
  },
  {
    year: "2025",
    tagline: "FULL-STACK + AI",
    title: "REST APIs, FastAPI & Predictive Machine Learning",
    description: "Scaled into full-stack development with React, TypeScript, and FastAPI. Engineered predictive clinical machine learning pipelines and SHAP explainability models.",
    techs: ["React", "TypeScript", "FastAPI", "Python ML", "Tailwind"],
    projects: ["CardioGuard AI", "CampusBrain Hackathon"],
  },
  {
    year: "2026",
    tagline: "INTELLIGENT PRODUCTS",
    title: "Local-First Architecture, Encryption & Speech AI",
    description: "Created privacy-first production apps featuring AES-GCM zero-knowledge client encryption, AI schedule parsing, and voice pipelines.",
    techs: ["PWA", "Web Crypto API", "Gemini API", "WebSockets"],
    projects: ["BunkMate", "Atmosphere AI", "Navi Voice Assistant"],
  },
  {
    year: "CURRENT",
    tagline: "BUILDING WHAT'S NEXT",
    title: "Computer Science Engineering Student & Product Builder",
    description: "Continuing to engineer high-performance full-stack applications, intelligent AI models, and user-centered products.",
    techs: ["AI Agents", "Full-Stack", "Hardware / ESP32"],
    projects: ["ARVIND.OS", "Next Gen Systems"],
  },
];

export const Journey: React.FC = () => {
  return (
    <section id="journey" className="py-32 relative overflow-hidden bg-[#030308] border-t border-white/5">
      {/* Background Volumetric Beam */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-radial-gradient blur-[140px] pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center space-x-3 text-cyan-400 font-mono text-xs tracking-[0.25em] uppercase font-bold"
          >
            <span className="text-2xl font-display font-black text-cyan-400">02</span>
            <span className="h-px w-8 bg-cyan-500/30" />
            <span>JOURNEY & EVOLUTION</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display text-white uppercase tracking-tight">
            ENGINEERING <span className="shimmer-text">TIMELINE.</span>
          </h2>
        </div>

        {/* Vertical Cinematic Timeline */}
        <div className="relative border-l border-white/10 ml-4 sm:ml-8 pl-6 sm:pl-12 space-y-16">
          {timelineData.map((item, idx) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative group"
            >
              {/* Timeline Node Dot */}
              <div className="absolute -left-[31px] sm:-left-[55px] top-1.5 w-4 h-4 rounded-full bg-[#030308] border-2 border-cyan-400 group-hover:scale-125 group-hover:bg-cyan-400 transition-all duration-300 shadow-[0_0_12px_rgba(0,240,255,0.6)]" />

              <div className="space-y-3 max-w-3xl">
                {/* Year Header & Tagline */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight">
                    {item.year}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs tracking-widest font-bold uppercase">
                    {item.tagline}
                  </span>
                </div>

                {/* Milestone Title */}
                <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-100">
                  {item.title}
                </h3>

                {/* Narrative */}
                <p className="text-slate-400 font-sans text-sm sm:text-base leading-relaxed">
                  {item.description}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 pt-2 font-mono text-xs">
                  {item.techs.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg bg-white/[0.03] border border-white/10 text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {item.projects.map((proj) => (
                    <span
                      key={proj}
                      className="px-3 py-1 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-300 font-bold"
                    >
                      ✦ {proj}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
