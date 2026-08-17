import React from 'react';
import { X, CheckCircle, Cpu, Layers, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { Project } from '../data/projects';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  onTryLive: (project: Project) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose, onTryLive }) => {
  if (!project) return null;

  const { caseStudy } = project;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#08090d] border border-white/15 rounded-2xl shadow-2xl p-6 sm:p-10 space-y-8 editorial-grain">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          data-cursor="CLOSE"
          className="absolute top-6 right-6 p-2.5 rounded-full bg-white/10 text-white hover:bg-[#00f0ff] hover:text-black transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Metadata */}
        <div className="space-y-3 border-b border-white/10 pb-6">
          <div className="flex items-center gap-3 font-mono text-xs text-[#00f0ff]">
            <span>CASE STUDY // PROJECT {project.number}</span>
            <span>•</span>
            <span className="uppercase">{project.category}</span>
          </div>
          <h2 className="font-syne text-3xl sm:text-5xl font-extrabold text-white">
            {project.title}
          </h2>
          <p className="font-mono text-sm text-neutral-300">
            {project.tagline}
          </p>
        </div>

        {/* Problem & Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 space-y-3">
            <span className="font-mono text-xs text-red-400 font-bold uppercase tracking-wider">[ THE PROBLEM ]</span>
            <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed font-light">
              {caseStudy.problem}
            </p>
          </div>

          <div className="p-6 rounded-xl bg-gradient-to-b from-[#00f0ff]/10 to-transparent border border-[#00f0ff]/30 space-y-3">
            <span className="font-mono text-xs text-[#00f0ff] font-bold uppercase tracking-wider">[ THE SOLUTION ]</span>
            <p className="text-neutral-200 text-xs sm:text-sm leading-relaxed font-light">
              {caseStudy.solution}
            </p>
          </div>
        </div>

        {/* Architecture & Implementation */}
        <div className="space-y-4">
          <h3 className="font-syne text-xl font-bold text-[#00f0ff] flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#00f0ff]" />
            <span>SYSTEM ARCHITECTURE & LAYERS</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
            {caseStudy.architecture.map((layer, idx) => (
              <div key={idx} className="p-3.5 rounded-lg bg-white/5 border border-white/10 text-neutral-200 flex items-center gap-3">
                <span className="text-[#00f0ff] font-bold">0{idx + 1}.</span>
                <span>{layer}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Key Implementation Accomplishments */}
        <div className="space-y-4">
          <h3 className="font-syne text-xl font-bold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-[#00f0ff]" />
            <span>KEY IMPLEMENTATION HIGHLIGHTS</span>
          </h3>
          <div className="space-y-2">
            {caseStudy.implementation.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300">
                <CheckCircle className="w-4 h-4 text-[#00f0ff] shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="p-6 rounded-xl bg-white/[0.03] border border-white/15 space-y-2">
          <span className="font-mono text-xs text-[#00f0ff] font-bold uppercase tracking-wider">[ VERIFIED RESULT ]</span>
          <p className="text-white text-sm leading-relaxed font-light">
            {caseStudy.results}
          </p>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <span key={t} className="px-2.5 py-1 rounded bg-white/5 font-mono text-[10px] text-neutral-400">
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                onClose();
                onTryLive(project);
              }}
              className="px-6 py-2.5 rounded-full bg-[#00f0ff] text-black font-mono font-bold text-xs hover:bg-white transition-colors flex items-center gap-2"
            >
              <span>TRY LIVE DEMO</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
