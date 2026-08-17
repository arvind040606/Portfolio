import React, { useState, useEffect } from 'react';
import { Maximize2, ExternalLink, RefreshCw, X, Smartphone, Monitor, Globe, Lock } from 'lucide-react';
import { Project, projects } from '../data/projects';

interface LiveProjectsProps {
  onSelectCaseStudy: (project: Project) => void;
}

export const LiveProjects: React.FC<LiveProjectsProps> = ({ onSelectCaseStudy }) => {
  const [fullscreenProject, setFullscreenProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<'bunkmate' | 'cardioguard' | 'atmosphere'>('bunkmate');
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const bunkmate = projects.find((p) => p.id === 'bunkmate') || projects[0];
  const cardioguard = projects.find((p) => p.id === 'cardioguard') || projects[1];
  const atmosphere = projects.find((p) => p.id === 'atmosphere') || projects[2];

  const liveList = [
    { project: bunkmate, icon: Smartphone, fallbackUrl: 'https://bunkmate-lilac.vercel.app/' },
    { project: cardioguard, icon: Monitor, fallbackUrl: 'https://cardioguard20.vercel.app/demo' },
    { project: atmosphere, icon: Globe, fallbackUrl: 'https://atmosphere-ai-intelligent-search.vercel.app/demo' },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setFullscreenProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const activeObj = liveList.find((l) => l.project.id === activeTab) || liveList[0];
  const currentProject = activeObj.project;
  const currentUrl = currentProject.liveUrl || activeObj.fallbackUrl;
  const cleanUrl = currentUrl.replace(/^https?:\/\//, '');

  return (
    <section id="live" className="relative py-20 px-6 md:px-12 bg-[#030304] border-b border-white/10 editorial-grain [perspective:1200px]">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header Tag */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#00f0ff] tracking-widest">[ 05 // INTERACTIVE DEMOS ]</span>
            <span className="h-[1px] w-12 bg-[#00f0ff]" />
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-wider">
              REAL DEPLOYMENTS
            </span>
          </div>
        </div>

        {/* Section Title */}
        <div className="space-y-2">
          <h2 className="font-syne text-3xl sm:text-5xl font-extrabold text-white tracking-tight drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
            LIVE PROJECTS
          </h2>
          <p className="font-syne text-xl text-[#00f0ff] font-bold">
            "Compact interactive product preview."
          </p>
        </div>

        {/* Tab Selection & Device Frame Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          
          {/* Project Tabs */}
          <div className="flex flex-wrap gap-2">
            {liveList.map(({ project, icon: IconComp }) => {
              const isActive = project.id === activeTab;
              return (
                <button
                  key={project.id}
                  onClick={() => {
                    setActiveTab(project.id as any);
                    setRefreshKey((k) => k + 1);
                  }}
                  data-cursor="SWITCH"
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs tracking-wider font-bold transition-all duration-300 ${
                    isActive
                      ? 'bg-[#00f0ff] text-black shadow-[0_0_20px_rgba(0,240,255,0.4)] scale-[1.02]'
                      : 'bg-white/5 border border-white/10 text-neutral-300 hover:border-white/30'
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  <span>{project.title.toUpperCase()}</span>
                </button>
              );
            })}
          </div>

          {/* Desktop vs Mobile Toggle Buttons */}
          <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 p-1 rounded-full font-mono text-xs">
            <button
              onClick={() => setDeviceMode('desktop')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all ${
                deviceMode === 'desktop' ? 'bg-[#00f0ff] text-[#030304] font-bold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>DESKTOP</span>
            </button>
            <button
              onClick={() => setDeviceMode('mobile')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all ${
                deviceMode === 'mobile' ? 'bg-[#00f0ff] text-[#030304] font-bold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>MOBILE</span>
            </button>
          </div>

        </div>

        {/* Physical 3D Spatial Compact Frame Container */}
        <div className="relative w-full flex justify-center">
          <div
            className={`relative rounded-xl bg-[#090b10] border border-white/25 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(0,240,255,0.15)] p-3 sm:p-4 space-y-3 transition-all duration-500 ${
              deviceMode === 'mobile' ? 'w-full max-w-[340px] h-[520px]' : 'w-full max-w-[700px] h-[440px]'
            }`}
          >
            
            {/* Frame Top HUD Chrome Bar */}
            <div className="flex items-center justify-between bg-black/90 px-3 py-2 rounded-lg border border-white/10 font-mono text-xs shadow-lg">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-500/80" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
                  <div className="w-2 h-2 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-neutral-300 max-w-[160px] sm:max-w-[240px] truncate">
                  <Lock className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{cleanUrl}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setRefreshKey((k) => k + 1)}
                  title="Refresh Live App"
                  className="p-1 rounded bg-white/5 border border-white/10 text-neutral-300 hover:text-white transition-all text-xs"
                >
                  <RefreshCw className="w-3 h-3" />
                </button>

                <button
                  onClick={() => setFullscreenProject(currentProject)}
                  data-cursor="FULLSCREEN"
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] hover:bg-[#00f0ff]/20 transition-all text-[10px] font-bold"
                >
                  <Maximize2 className="w-3 h-3" />
                  <span>FULLSCREEN</span>
                </button>

                <a
                  href={currentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="OPEN"
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-white text-black font-bold hover:bg-[#00f0ff] transition-all text-[10px] shadow-md"
                >
                  <span>OPEN ↗</span>
                </a>
              </div>
            </div>

            {/* REAL INTERACTIVE IFRAME VIEWPORT */}
            <div className="relative w-full h-[calc(100%-42px)] rounded-lg bg-black border border-white/10 overflow-hidden shadow-inner">
              <iframe
                key={`${activeTab}-${deviceMode}-${refreshKey}`}
                src={currentUrl}
                title={`Live Demo — ${currentProject.title}`}
                className="w-full h-full border-none bg-black pointer-events-auto"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
              />
            </div>

          </div>
        </div>

      </div>

      {/* Fullscreen Modal Overlay */}
      {fullscreenProject && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col animate-in fade-in duration-300">
          
          {/* Fullscreen Header */}
          <div className="flex items-center justify-between p-3.5 bg-[#08090d] border-b border-white/15 font-mono text-xs">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>● REAL LIVE DEMO MODE</span>
              </span>
              <span className="font-syne font-extrabold text-white text-sm">
                {fullscreenProject.title}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="hidden sm:inline text-neutral-400 text-xs">
                Press <kbd className="px-2 py-0.5 rounded bg-white/10 text-white">ESC</kbd> to exit
              </span>
              <button
                onClick={() => setFullscreenProject(null)}
                className="p-1.5 rounded-full bg-white/10 text-white hover:bg-[#00f0ff] hover:text-black transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Fullscreen Iframe */}
          <div className="flex-1 w-full bg-black">
            <iframe
              src={fullscreenProject.liveUrl || 'https://bunkmate-lilac.vercel.app/'}
              title={`Fullscreen — ${fullscreenProject.title}`}
              className="w-full h-full border-none pointer-events-auto"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
            />
          </div>
        </div>
      )}
    </section>
  );
};
