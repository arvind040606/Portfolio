import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ArrowUpRight, RefreshCw, Maximize2, ExternalLink, Smartphone, Monitor, Lock } from 'lucide-react';
import { Project, projects } from '../data/projects';

interface SelectedWorkProps {
  onSelectCaseStudy: (project: Project) => void;
  onTryLive: (project: Project) => void;
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({ onSelectCaseStudy, onTryLive }) => {
  const bunkmate = projects.find((p) => p.id === 'bunkmate') || projects[0];
  const cardioguard = projects.find((p) => p.id === 'cardioguard') || projects[1];
  const atmosphere = projects.find((p) => p.id === 'atmosphere') || projects[2];

  // State for viewport modes (desktop vs mobile frame view) per project
  const [deviceModes, setDeviceModes] = useState<Record<string, 'desktop' | 'mobile'>>({
    bunkmate: 'mobile', // Default mobile frame for BunkMate
    cardioguard: 'desktop',
    atmosphere: 'desktop',
  });

  // State for iframe refresh counters
  const [refreshKeys, setRefreshKeys] = useState<Record<string, number>>({
    bunkmate: 0,
    cardioguard: 0,
    atmosphere: 0,
  });

  const toggleDevice = (id: string, mode: 'desktop' | 'mobile') => {
    setDeviceModes((prev) => ({ ...prev, [id]: mode }));
  };

  const handleRefresh = (id: string) => {
    setRefreshKeys((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const featuredProjects = [
    { project: bunkmate, fallbackUrl: 'https://bunkmate-lilac.vercel.app/' },
    { project: cardioguard, fallbackUrl: 'https://cardioguard20.vercel.app/demo' },
    { project: atmosphere, fallbackUrl: 'https://atmosphere-ai-intelligent-search.vercel.app/demo' },
  ];

  return (
    <section id="work" className="relative py-20 px-6 md:px-12 bg-[#030304] border-b border-white/10 editorial-grain [perspective:1200px]">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* Section Header Tag */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#00f0ff] tracking-widest">[ 04 // FEATURED BUILDS ]</span>
            <span className="h-[1px] w-12 bg-[#00f0ff]" />
          </div>
          <span className="font-mono text-xs text-neutral-500 tracking-widest uppercase">INTERACTIVE PRODUCT PREVIEWS</span>
        </div>

        {/* Section Title */}
        <div className="space-y-3">
          <h2 className="font-syne text-4xl sm:text-6xl font-extrabold text-white tracking-tight drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
            SELECTED WORK
          </h2>
          <p className="font-syne text-xl text-[#00f0ff] font-bold">
            "Real deployed software. Test live below."
          </p>
        </div>

        {/* RENDER FEATURED PROJECTS WITH COMPACT, BALANCED PREVIEW WINDOWS */}
        {featuredProjects.map(({ project, fallbackUrl }, idx) => {
          const rawUrl = project.liveUrl || fallbackUrl;
          const cleanUrl = rawUrl.replace(/^https?:\/\//, '');
          const isMobileMode = deviceModes[project.id] === 'mobile';
          const refreshKey = refreshKeys[project.id] || 0;

          return (
            <div key={project.id} className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${idx > 0 ? 'pt-16 border-t border-white/10' : 'pt-2'}`}>
              
              {/* Left Column: Balanced Technical Info (45% Width) */}
              <div className="lg:col-span-5 space-y-5">
                <div className="flex items-center gap-3 font-mono text-xs">
                  <span className="px-3 py-0.5 rounded-full bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30 font-bold">
                    PROJECT {project.number}
                  </span>
                  <span className="text-neutral-400 uppercase tracking-wider text-[11px]">
                    {project.category}
                  </span>
                </div>

                <h3 className="font-syne text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {project.title.toUpperCase()}
                </h3>

                <p className="font-mono text-xs text-[#00f0ff] font-semibold">
                  {project.tagline}
                </p>

                <p className="text-neutral-300 text-sm leading-relaxed font-light">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-0.5 rounded border border-white/10 bg-white/[0.03] font-mono text-[10px] text-neutral-300 shadow-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Viewport Frame Mode Toggle (Desktop / Mobile) */}
                <div className="flex items-center gap-3 pt-1">
                  <span className="font-mono text-[10px] text-neutral-500 uppercase">VIEWPORT:</span>
                  <div className="inline-flex rounded-full bg-white/5 border border-white/10 p-1 font-mono text-[10px]">
                    <button
                      onClick={() => toggleDevice(project.id, 'desktop')}
                      className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full transition-all ${
                        !isMobileMode ? 'bg-[#00f0ff] text-[#030304] font-bold' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      <Monitor className="w-3 h-3" />
                      <span>DESKTOP</span>
                    </button>
                    <button
                      onClick={() => toggleDevice(project.id, 'mobile')}
                      className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full transition-all ${
                        isMobileMode ? 'bg-[#00f0ff] text-[#030304] font-bold' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      <Smartphone className="w-3 h-3" />
                      <span>MOBILE</span>
                    </button>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href={rawUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="OPEN"
                    className="px-6 py-2.5 rounded-full bg-[#00f0ff] text-black font-mono font-bold text-xs tracking-wider hover:bg-white transition-all duration-300 flex items-center gap-2 shadow-[0_8px_20px_rgba(0,240,255,0.3)] transform hover:-translate-y-0.5"
                  >
                    <span>OPEN LIVE ↗</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => onSelectCaseStudy(project)}
                    data-cursor="STUDY"
                    className="px-6 py-2.5 rounded-full bg-transparent border border-white/20 text-white font-mono font-bold text-xs tracking-wider hover:border-white hover:text-white transition-all duration-300 flex items-center gap-2 backdrop-blur-sm"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#00f0ff]" />
                    <span>CASE STUDY</span>
                  </button>
                </div>
              </div>

              {/* Right Column: COMPACT, BALANCED PREVIEW WINDOW (55% Width) */}
              <div className="lg:col-span-7 flex justify-center items-center relative">
                
                {/* Floor Ambient Reflection */}
                <div className="absolute -bottom-6 w-[70%] h-[25px] rounded-full bg-[#00f0ff]/10 blur-2xl pointer-events-none" />

                {/* Compact Device Container Frame */}
                <div
                  className={`relative w-full rounded-xl bg-[#090b10] border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(0,240,255,0.15)] overflow-hidden transition-all duration-500 ${
                    isMobileMode 
                      ? 'max-w-[340px] h-[520px]' 
                      : 'w-full max-w-[600px] h-[400px] sm:h-[420px]'
                  }`}
                >
                  {/* Top Compact Browser Chrome Header (Height: ~38px) */}
                  <div className="flex items-center justify-between bg-black/90 px-3 py-2 border-b border-white/10 font-mono text-[10px]">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-red-500/80" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
                        <div className="w-2 h-2 rounded-full bg-emerald-500/80" />
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-300 max-w-[180px] sm:max-w-[240px] truncate">
                        <Lock className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{cleanUrl}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleRefresh(project.id)}
                        title="Reload Live App"
                        className="p-1 rounded hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                      >
                        <RefreshCw className="w-3 h-3" />
                      </button>
                      <a
                        href={rawUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Open in new tab"
                        className="p-1 rounded hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                      >
                        <ExternalLink className="w-3 h-3 text-[#00f0ff]" />
                      </a>
                    </div>
                  </div>

                  {/* REAL EMBEDDED IFRAME WEBSITES */}
                  <div className="w-full h-[calc(100%-38px)] bg-black relative">
                    <iframe
                      key={`${project.id}-${refreshKey}-${deviceModes[project.id]}`}
                      src={rawUrl}
                      title={`Live Application — ${project.title}`}
                      className="w-full h-full border-none bg-black pointer-events-auto"
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
                    />
                  </div>

                </div>

              </div>

            </div>
          );
        })}

        {/* OTHER REAL BUILDS SECTION */}
        <div className="pt-12 border-t border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-syne text-xl sm:text-2xl font-extrabold text-white">
              OTHER REAL BUILDS
            </h3>
            <span className="font-mono text-xs text-neutral-400 uppercase">HACKATHONS & EXPERIMENTAL R&D</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* CampusBrain Card */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#00f0ff]/40 transition-all duration-300 space-y-3 group shadow-xl">
              <div className="flex justify-between items-start">
                <span className="px-2 py-0.5 rounded bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30 font-mono text-[9px] font-bold uppercase">
                  ⚡ PERSONAL PROJECT
                </span>
                <span className="font-mono text-[10px] text-neutral-500">2026</span>
              </div>
              <h4 className="font-syne text-lg font-bold text-white group-hover:text-[#00f0ff] transition-colors">
                CampusBrain
              </h4>
              <p className="text-neutral-400 text-xs leading-relaxed font-light">
                An intelligent campus platform enabling natural-language search across university documentation, schedules, and academic information.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {['React', 'Python Backend', 'Vector AI Search', 'REST API'].map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded bg-white/5 font-mono text-[9px] text-neutral-400">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Navi Voice Pipeline Card */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-purple-500/40 transition-all duration-300 space-y-3 group shadow-xl">
              <div className="flex justify-between items-start">
                <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-mono text-[9px] font-bold uppercase">
                  🎙️ VOICE AI R&D
                </span>
                <span className="font-mono text-[10px] text-neutral-500">2026</span>
              </div>
              <h4 className="font-syne text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                Navi Continuous Voice Pipeline
              </h4>
              <p className="text-neutral-400 text-xs leading-relaxed font-light">
                Cross-platform hands-free voice assistant engine built with WebSockets streaming, low-latency SpeechRecognition, and TTS synthesis.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {['FastAPI', 'WebSockets', 'Speech Recognition', 'Android'].map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded bg-white/5 font-mono text-[9px] text-neutral-400">
                    {t}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
