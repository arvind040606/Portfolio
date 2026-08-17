import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, ShieldAlert, CheckCircle2, Cpu, Wrench, AlertTriangle, Sparkles, Layers } from "lucide-react";
import { Project } from "../../data/projects";

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  const { caseStudy } = project;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl glass-panel border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 text-slate-100 p-6 sm:p-8 space-y-8"
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-white/10 pb-5">
            <div>
              <div className="flex items-center space-x-3">
                <span className="font-mono text-cyan-400 font-bold text-lg">
                  {project.number}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  {project.category}
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {project.status}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                {project.title} — Technical Case Study
              </h2>
              <p className="text-slate-300 text-sm mt-1">{project.tagline}</p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white hover:border-cyan-500/40 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Actions & Tech Badges */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/60 border border-white/5 font-mono text-xs">
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-200 border border-white/10"
                >
                  {tech}
                </span>
              ))}
            </div>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 rounded-lg bg-cyan-400 text-slate-950 font-bold hover:bg-cyan-300 transition shadow-lg shadow-cyan-500/20"
              >
                <span>VISIT LIVE SYSTEM</span>
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            )}
          </div>

          {/* Problem & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Problem */}
            <div className="p-5 rounded-xl bg-rose-950/20 border border-rose-500/20 space-y-2">
              <div className="flex items-center space-x-2 text-rose-400 font-mono text-xs font-bold tracking-wider">
                <ShieldAlert className="w-4 h-4" />
                <span>01. THE PROBLEM</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">{caseStudy.problem}</p>
            </div>

            {/* Solution */}
            <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-2">
              <div className="flex items-center space-x-2 text-emerald-400 font-mono text-xs font-bold tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>02. THE SOLUTION</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">{caseStudy.solution}</p>
            </div>
          </div>

          {/* Architecture Diagram Visualization (HTML/CSS) */}
          <div className="p-6 rounded-xl bg-slate-900/90 border border-cyan-500/20 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs text-cyan-300 font-bold tracking-wider">
              <div className="flex items-center space-x-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>SYSTEM ARCHITECTURE DIAGRAM</span>
              </div>
              <span className="text-[10px] text-slate-400">DATAFLOW SCHEMATIC</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs text-center py-2">
              {caseStudy.architecture.map((layer, index) => (
                <div
                  key={index}
                  className="p-3.5 rounded-lg bg-slate-950 border border-cyan-500/30 text-slate-200 relative group hover:border-cyan-400 transition"
                >
                  <div className="text-[10px] text-cyan-400 font-bold mb-1">LAYER {index + 1}</div>
                  <div className="text-slate-300 font-sans">{layer}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Implementation Highlights & Challenges */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-mono text-xs font-bold text-cyan-400 tracking-wider flex items-center">
                <Wrench className="w-4 h-4 mr-2" />
                KEY IMPLEMENTATION DETAILS
              </h4>
              <ul className="space-y-2 text-sm text-slate-300">
                {caseStudy.implementation.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-cyan-400 mr-2 font-mono">▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-mono text-xs font-bold text-purple-400 tracking-wider flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2" />
                ENGINEERING CHALLENGES OVERCOME
              </h4>
              <ul className="space-y-2 text-sm text-slate-300">
                {caseStudy.challenges.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-purple-400 mr-2 font-mono">▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Results & Future Scope */}
          <div className="p-5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 space-y-3 font-sans">
            <div>
              <span className="font-mono text-xs font-bold text-cyan-400 tracking-wider flex items-center mb-1">
                <Sparkles className="w-4 h-4 mr-2" />
                RESULTS & QUALITATIVE IMPACT
              </span>
              <p className="text-slate-200 text-sm">{caseStudy.results}</p>
            </div>

            {caseStudy.futureWork.length > 0 && (
              <div className="pt-3 border-t border-white/10">
                <span className="font-mono text-[11px] text-slate-400 tracking-wider font-semibold block mb-1.5">
                  FUTURE SCOPE & ROADMAP:
                </span>
                <div className="flex flex-wrap gap-2 font-mono text-xs">
                  {caseStudy.futureWork.map((fw, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded bg-slate-900 border border-white/10 text-cyan-300"
                    >
                      + {fw}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end border-t border-white/10 pt-4">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-slate-800 text-slate-200 font-mono text-xs hover:bg-slate-700 transition"
            >
              CLOSE CASE STUDY
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
