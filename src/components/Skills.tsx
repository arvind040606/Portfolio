import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Code2, Sparkles, CheckCircle2 } from 'lucide-react';

interface SkillItem {
  id: string;
  number: string;
  name: string;
  category: string;
  reveals: string[];
  projects: string[];
  summary: string;
}

export const Skills: React.FC = () => {
  const [activeSkill, setActiveSkill] = useState<SkillItem | null>(null);

  const skills: SkillItem[] = [
    {
      id: 'react',
      number: '01',
      name: 'REACT',
      category: 'FRONTEND ARCHITECTURE',
      reveals: ['State Management', 'PWA Lifecycle', 'Touch Gestures', 'Custom Hooks'],
      projects: ['BunkMate PWA', 'CardioGuard AI', 'Atmosphere AI'],
      summary: 'Building high-performance, mobile-first web applications with strict component design patterns and responsive state management.',
    },
    {
      id: 'typescript',
      number: '02',
      name: 'TYPESCRIPT',
      category: 'TYPE SAFETY & SCHEMAS',
      reveals: ['Strict Typing', 'Interface Schemas', 'Generics', 'API Contracts'],
      projects: ['BunkMate', 'Atmosphere AI', 'Portfolio System'],
      summary: 'Guaranteeing end-to-end type safety, reliable data models, and refactor-resilient enterprise codebase structure.',
    },
    {
      id: 'javascript',
      number: '03',
      name: 'JAVASCRIPT (ES6+)',
      category: 'CORE LANGUAGE ENGINE',
      reveals: ['Async/Await', 'DOM Manipulation', 'Event Loop', 'Web Cryptography'],
      projects: ['BunkMate Crypto Engine', 'Gesture Controller', 'WebSockets'],
      summary: 'Deep foundational mastery of modern ECMAScript standards, browser Web APIs, and asynchronous execution loops.',
    },
    {
      id: 'python',
      number: '04',
      name: 'PYTHON',
      category: 'BACKEND & DATA SCIENCE',
      reveals: ['FastAPI Backend', 'Machine Learning', 'Data Processing', 'SHAP Analysis'],
      projects: ['CardioGuard AI', 'CampusBrain API', 'AI Lab Engine'],
      summary: 'Developing concurrent web services, data preprocessing pipelines, and machine learning model training routines.',
    },
    {
      id: 'fastapi',
      number: '05',
      name: 'FASTAPI',
      category: 'HIGH-SPEED REST APIs',
      reveals: ['Pydantic Validation', 'Async Endpoints', 'OpenAPI Docs', 'Microservices'],
      projects: ['CardioGuard Clinical Backend', 'CampusBrain Vector Service'],
      summary: 'Architecting ultra-low latency REST endpoints with automated OpenAPI generation and strict request payload validation.',
    },
    {
      id: 'ai-ml',
      number: '06',
      name: 'AI / MACHINE LEARNING',
      category: 'INTELLIGENT MODELS',
      reveals: ['Supervised ML Models', 'SHAP Explainability', 'Vision AI Parsing', 'LLM Context Search'],
      projects: ['CardioGuard AI (Risk & SHAP)', 'BunkMate (AI Vision Timetable)', 'Atmosphere AI (LLM Search)'],
      summary: 'Applying machine learning algorithms to solve real-world problems with transparent feature explainability.',
    },
    {
      id: 'tailwind',
      number: '07',
      name: 'TAILWIND CSS',
      category: 'EDITORIAL DESIGN SYSTEM',
      reveals: ['Design Tokens', 'Dark Mode Systems', 'Custom Layout Grids', 'Micro-Animations'],
      projects: ['Atmosphere AI', 'CardioGuard Dashboard', 'BunkMate PWA'],
      summary: 'Crafting bespoke, magazine-grade visual design systems with flawless responsiveness and custom dark-mode styling.',
    },
    {
      id: 'databases',
      number: '08',
      name: 'DATABASES & STORAGE',
      category: 'DATA PERSISTENCE',
      reveals: ['Local-First IndexedDB', 'PostgreSQL / SQL', 'AES Encrypted Storage', 'Supabase'],
      projects: ['BunkMate Local Storage', 'CardioGuard Data Logs', 'CampusBrain Hub'],
      summary: 'Implementing privacy-centric local storage engines alongside production SQL database schemas.',
    },
    {
      id: 'rest-apis',
      number: '09',
      name: 'REST APIs & WEBSOCKETS',
      category: 'REAL-TIME NETWORK PROTOCOLS',
      reveals: ['RESTful Standards', 'JSON Protocols', 'WebSockets Pipeline', 'Axios Client'],
      projects: ['CardioGuard Backend', 'Navi Voice Pipeline', 'Weather API Gateway'],
      summary: 'Structuring resilient API integrations, optimistic caching layers, and continuous voice/audio WebSockets pipelines.',
    },
    {
      id: 'git-github',
      number: '10',
      name: 'GIT / GITHUB',
      category: 'VERSION CONTROL & DEPLOYMENT',
      reveals: ['Branching Workflows', 'CI/CD Pipelines', 'Vercel Deployments', 'Version Audits'],
      projects: ['BunkMate Vercel Live', 'CardioGuard Live', 'Atmosphere AI Live'],
      summary: 'Maintaining clean commit histories, modular feature branching, and automated continuous integration deployments.',
    },
  ];

  // Set default active skill
  const current = activeSkill || skills[0];

  return (
    <section id="skills" className="relative py-28 px-6 md:px-12 bg-[#030304] border-b border-white/10 editorial-grain">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Tag */}
        <div className="flex items-center justify-between pb-8 border-b border-white/10 mb-16">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#00f0ff] tracking-widest">[ 03 // CAPABILITIES ]</span>
            <span className="h-[1px] w-12 bg-[#00f0ff]" />
          </div>
          <span className="font-mono text-xs text-neutral-500 tracking-widest uppercase">TECHNICAL MATRIX</span>
        </div>

        {/* Section Title */}
        <div className="space-y-4 mb-16">
          <h2 className="font-syne text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
            TECHNICAL SKILLS
          </h2>
          <p className="font-mono text-sm text-neutral-400 max-w-lg uppercase tracking-wider">
            HOVER OVER ANY TECHNOLOGY TO REVEAL REAL PROJECT INTEGRATIONS & CAPABILITIES.
          </p>
        </div>

        {/* Editorial Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Magazine Numbered Skills List */}
          <div className="lg:col-span-7 divide-y divide-white/10 border-t border-b border-white/10">
            {skills.map((skill) => {
              const isSelected = current.id === skill.id;
              return (
                <div
                  key={skill.id}
                  onMouseEnter={() => setActiveSkill(skill)}
                  data-cursor="REVEAL"
                  className={`py-5 px-4 flex items-center justify-between group cursor-pointer transition-all duration-300 ${
                    isSelected ? 'bg-white/[0.04] pl-6' : 'hover:bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-center gap-6">
                    <span
                      className={`font-mono text-sm font-bold tracking-widest transition-colors ${
                        isSelected ? 'text-[#00f0ff]' : 'text-neutral-400 group-hover:text-white'
                      }`}
                    >
                      {skill.number}
                    </span>
                    <span
                      className={`font-syne text-xl sm:text-2xl font-bold tracking-wider transition-colors ${
                        isSelected ? 'text-[#00f0ff]' : 'text-white group-hover:text-[#00f0ff]'
                      }`}
                    >
                      {skill.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="hidden sm:inline font-mono text-[10px] text-neutral-400 tracking-widest uppercase">
                      {skill.category}
                    </span>
                    <ArrowRight
                      className={`w-5 h-5 transition-transform duration-300 ${
                        isSelected ? 'text-[#00f0ff] translate-x-1' : 'text-neutral-400 group-hover:text-white'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Editorial Reveal Panel */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="p-8 rounded-2xl bg-gradient-to-b from-neutral-900/90 to-[#030304] border border-[#00f0ff]/30 shadow-[0_0_40px_rgba(0,240,255,0.1)] space-y-6">
              
              {/* Header Badge */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="font-mono text-xs text-[#00f0ff] font-bold tracking-widest">
                  TECH MATRIX // {current.number}
                </span>
                <span className="font-mono text-xs text-neutral-400 uppercase">
                  {current.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-[#00f0ff] font-syne text-3xl font-extrabold text-white">
                {current.name}
              </h3>

              <p className="text-neutral-300 text-sm leading-relaxed font-light">
                {current.summary}
              </p>

              {/* Reveal Capabilities */}
              <div className="space-y-3 pt-2">
                <span className="font-mono text-xs text-neutral-400 tracking-widest uppercase block">
                  CAPABILITIES & SCOPE:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {current.reveals.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs font-mono text-neutral-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00f0ff] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Real Project Usages */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <span className="font-mono text-xs text-[#00f0ff] tracking-widest uppercase block">
                  VERIFIED REAL PROJECT USAGE:
                </span>
                <div className="flex flex-wrap gap-2">
                  {current.projects.map((proj) => (
                    <span
                      key={proj}
                      className="px-3 py-1 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 font-mono text-xs text-[#00f0ff] font-medium"
                    >
                      → {proj}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
