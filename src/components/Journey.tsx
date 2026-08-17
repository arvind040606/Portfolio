import React from 'react';
import { motion } from 'framer-motion';

export const Journey: React.FC = () => {
  const milestones = [
    {
      year: '2024',
      title: 'FIRST BUILDS',
      subtitle: 'Core Web Foundations & Algorithmic Logic',
      description: 'Mastered JavaScript, TypeScript, React, and fundamental Computer Science Engineering principles. Built foundational web apps and responsive UI systems.',
      tags: ['React', 'TypeScript', 'Data Structures', 'REST APIs'],
      highlight: false,
    },
    {
      year: '2025',
      title: 'FULL-STACK DEVELOPMENT',
      subtitle: 'Progressive Web Apps & Cryptographic Architectures',
      description: 'Architected BunkMate—an AI-powered local-first student assistant with AES-GCM client-side encryption and PWA offline persistence. Built Python microservices with FastAPI.',
      tags: ['BunkMate PWA', 'FastAPI', 'Web Crypto API', 'IndexedDB'],
      highlight: false,
    },
    {
      year: '2026',
      title: 'AI + INTELLIGENT PRODUCTS',
      subtitle: 'Machine Learning & Explainable AI Platforms',
      description: 'Created CardioGuard AI featuring clinical predictive models with SHAP feature explainability. Built Atmosphere AI natural language weather search.',
      tags: ['CardioGuard AI', 'Atmosphere AI', 'SHAP ML', 'LLM Search'],
      highlight: true,
    },
    {
      year: 'NOW',
      title: "BUILDING WHAT'S NEXT",
      subtitle: 'Autonomous Systems & Advanced Product Engineering',
      description: 'Actively engineering production-grade software, refining AI lab prototypes, and preparing for high-impact software engineering roles.',
      tags: ['AI Agents', 'Production Deployment', 'CSE 2026'],
      highlight: false,
    },
  ];

  return (
    <section id="journey" className="relative py-28 px-6 md:px-12 bg-[#030304] border-b border-white/10 editorial-grain">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Tag */}
        <div className="flex items-center justify-between pb-8 border-b border-white/10 mb-16">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#00f0ff] tracking-widest">[ 02 // EVOLUTION ]</span>
            <span className="h-[1px] w-12 bg-[#00f0ff]" />
          </div>
          <span className="font-mono text-xs text-neutral-500 tracking-widest uppercase">CHRONOLOGICAL MILESTONES</span>
        </div>

        {/* Section Title */}
        <div className="space-y-4 mb-20">
          <h2 className="font-syne text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
            JOURNEY
          </h2>
          <p className="font-mono text-sm text-neutral-400 max-w-md uppercase tracking-wider">
            TRUTHFUL EVOLUTION OF ENGINEERING CAPABILITIES & BUILDS.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-6xl mx-auto space-y-12">
          {/* Continuous Vertical Timeline Track Line */}
          <div className="absolute left-[75px] sm:left-[98px] md:left-[140px] top-4 bottom-6 w-[1px] bg-gradient-to-b from-white/20 via-[#00f0ff]/40 to-white/10 pointer-events-none" />

          {milestones.map((item, idx) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative flex items-start group"
            >
              {/* 1. Year Column (Balanced, close to line without overlap) */}
              <div className="w-[70px] sm:w-[90px] md:w-[130px] shrink-0 text-right pr-4 sm:pr-5 md:pr-6 pt-1 sm:pt-1.5 md:pt-2 font-syne font-black text-lg sm:text-2xl md:text-3xl text-neutral-400 group-hover:text-[#00f0ff] transition-colors tracking-tight select-none leading-none">
                {item.year}
              </div>

              {/* 2. Timeline Node Dot (Centered directly on the vertical line) */}
              <div
                className={`absolute left-[75px] sm:left-[98px] md:left-[140px] top-6 w-5 h-5 rounded-full border-2 bg-[#030304] flex items-center justify-center transition-all duration-300 z-10 -translate-x-1/2 ${
                  item.highlight
                    ? 'border-[#00f0ff] shadow-[0_0_20px_#00f0ff]'
                    : 'border-white/40 group-hover:border-[#00f0ff] group-hover:shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${item.highlight ? 'bg-[#00f0ff]' : 'bg-white/60 group-hover:bg-[#00f0ff]'}`} />
              </div>

              {/* 3. Card Content */}
              <div
                data-cursor="TIMELINE"
                className={`flex-1 ml-6 sm:ml-7 md:ml-8 p-6 sm:p-8 rounded-2xl border transition-all duration-300 space-y-4 ${
                  item.highlight
                    ? 'bg-gradient-to-r from-[#00f0ff]/10 via-transparent to-transparent border-[#00f0ff]/40 shadow-[0_0_30px_rgba(0,240,255,0.08)]'
                    : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-syne text-xl sm:text-2xl font-bold text-white group-hover:text-[#00f0ff] transition-colors">
                    {item.title}
                  </h3>
                  <span className="font-mono text-xs text-neutral-400 font-medium">
                    {item.subtitle}
                  </span>
                </div>

                <p className="text-neutral-300 text-sm leading-relaxed font-light">
                  {item.description}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-md bg-white/5 border border-white/10 font-mono text-[11px] text-neutral-300"
                    >
                      {tag}
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
