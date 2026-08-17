import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Code, Layers, Sparkles, Terminal, Database, Server } from 'lucide-react';

export const About: React.FC = () => {
  const pillars = [
    {
      number: '01',
      title: 'ARTIFICIAL INTELLIGENCE',
      desc: 'Integrating predictive ML algorithms, SHAP explainability models, and real-time vision parsing into production software.',
      icon: Cpu,
    },
    {
      number: '02',
      title: 'FULL-STACK ARCHITECTURE',
      desc: 'Building responsive React/TypeScript PWAs paired with high-concurrency Python FastAPI services & REST microservices.',
      icon: Code,
    },
    {
      number: '03',
      title: 'LOCAL-FIRST CRYPTOGRAPHY',
      desc: 'Prioritizing user privacy with Web Crypto API, AES-GCM encryption, and zero-knowledge local storage.',
      icon: ShieldCheck,
    },
    {
      number: '04',
      title: 'PRODUCT DESIGN & UX',
      desc: 'Designing magazine-grade user interfaces with precise micro-interactions, responsive typography, and effortless touch gestures.',
      icon: Layers,
    },
  ];

  return (
    <section id="about" className="relative py-28 px-6 md:px-12 bg-[#030304] border-b border-white/10 editorial-grain">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header Tag */}
        <div className="flex items-center justify-between pb-8 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#00f0ff] tracking-widest">[ 01 // BIOGRAPHY ]</span>
            <span className="h-[1px] w-12 bg-[#00f0ff]" />
          </div>
          <span className="font-mono text-xs text-neutral-500 tracking-widest uppercase">COMPUTER SCIENCE ENGINEERING</span>
        </div>

        {/* Core Statement & Technical Graphics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Statement Typography */}
          <div className="lg:col-span-7 space-y-8">
            <h2 className="font-syne text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              "I'm Arvind Madaan, a Computer Science Engineering student focused on AI, full-stack development, and building practical digital products."
            </h2>

            <p className="text-neutral-400 font-sans text-base sm:text-lg leading-relaxed font-light">
              I bridge the gap between complex algorithmic backends and seamless, human-centric visual interfaces. My focus is on turning real-world friction into elegant software tools that people love to use every day.
            </p>

            {/* Editorial Badges */}
            <div className="flex flex-wrap gap-3 pt-2">
              {['CSE STUDENT', 'AI ENGINEERING', 'FULL-STACK', 'PRODUCT DEVELOPMENT', 'LOCAL-FIRST CRYPTO'].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full border border-white/15 bg-white/5 font-mono text-xs tracking-wider text-neutral-200 hover:border-[#00f0ff] hover:text-[#00f0ff] transition-all duration-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Abstract Engineering System Technical Graphic (No Photo) */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-sm aspect-[4/5] rounded-2xl overflow-hidden border border-white/20 bg-[#07090e] p-6 shadow-2xl space-y-6 flex flex-col justify-between font-mono">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 text-[#00f0ff]">
                  <Terminal className="w-4 h-4" />
                  <span className="text-xs font-bold">SYSTEM ARCHITECTURE</span>
                </div>
                <span className="text-[10px] text-emerald-400">STATUS: OPERATIONAL</span>
              </div>

              {/* Technical Code & Flow Diagrams */}
              <div className="space-y-4 text-xs text-neutral-300">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                  <div className="flex justify-between text-[10px] text-neutral-400">
                    <span>FRONTEND LAYER</span>
                    <span className="text-[#00f0ff]">REACT 19 / TS</span>
                  </div>
                  <div className="text-white font-bold">Client-Side AES-256 PWA Store</div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                  <div className="flex justify-between text-[10px] text-neutral-400">
                    <span>BACKEND AI CORE</span>
                    <span className="text-purple-400">FASTAPI / ML</span>
                  </div>
                  <div className="text-white font-bold">SHAP Explainable Inference API</div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                  <div className="flex justify-between text-[10px] text-neutral-400">
                    <span>HARDWARE & IOT</span>
                    <span className="text-emerald-400">ESP32 / I2S</span>
                  </div>
                  <div className="text-white font-bold">Real-time Acoustic Voice Pipeline</div>
                </div>
              </div>

              {/* Bottom System HUD */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[10px] text-neutral-400">
                <span>PUNJAB, INDIA</span>
                <span className="text-[#00f0ff]">GRADUATING 2026</span>
              </div>

            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-16 border-t border-white/10">
          {pillars.map((item) => {
            const IconComp = item.icon;
            return (
              <div
                key={item.number}
                data-cursor="PILLAR"
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#00f0ff]/50 hover:bg-white/[0.04] transition-all duration-300 space-y-4 group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#00f0ff] font-bold tracking-widest">{item.number}</span>
                  <IconComp className="w-5 h-5 text-neutral-500 group-hover:text-[#00f0ff] transition-colors" />
                </div>
                <h3 className="font-syne font-bold text-lg text-white group-hover:text-[#00f0ff] transition-colors">
                  {item.title}
                </h3>
                <p className="text-neutral-400 text-xs leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
