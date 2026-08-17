import React from "react";
import { ExternalLink, BookOpen, Sparkles, CheckCircle } from "lucide-react";
import { Project } from "../../data/projects";
import { GlowCard } from "../UI/GlowCard";

interface ProjectCardProps {
  project: Project;
  onOpenCaseStudy: (project: Project) => void;
  isPrimary?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpenCaseStudy,
  isPrimary = false,
}) => {
  return (
    <GlowCard
      glowColor={isPrimary ? "rgba(0, 240, 255, 0.25)" : "rgba(139, 92, 246, 0.2)"}
      className={`h-full flex flex-col justify-between ${
        isPrimary
          ? "border-cyan-500/40 bg-gradient-to-b from-slate-900/90 via-slate-900/70 to-cyan-950/20 shadow-xl shadow-cyan-500/10"
          : "border-white/10"
      }`}
    >
      <div className="space-y-4">
        {/* Number, Category & Status Badge */}
        <div className="flex items-center justify-between font-mono text-xs">
          <span className="text-3xl font-extrabold text-cyan-400 opacity-90">
            {project.number}
          </span>
          <div className="flex items-center space-x-2">
            {isPrimary && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-400 text-slate-950 flex items-center shadow-sm shadow-cyan-400/30">
                <Sparkles className="w-3 h-3 mr-1 animate-spin" />
                FLAGSHIP PRODUCT
              </span>
            )}
            <span className="px-2 py-0.5 rounded-full bg-slate-900 border border-white/10 text-slate-300 text-[11px]">
              {project.status}
            </span>
          </div>
        </div>

        {/* Title & Tagline */}
        <div>
          <h3 className="text-2xl font-extrabold text-white tracking-tight group-hover:text-cyan-300 transition">
            {project.title}
          </h3>
          <p className="text-cyan-400 font-mono text-xs font-semibold mt-1">
            {project.tagline}
          </p>
        </div>

        {/* Detailed Description */}
        <p className="text-slate-300 text-sm leading-relaxed font-sans">
          {project.description}
        </p>

        {/* Highlight Features Checklist */}
        <div className="space-y-1.5 pt-2">
          {project.features.slice(0, 3).map((feature, i) => (
            <div key={i} className="flex items-start text-xs text-slate-400">
              <CheckCircle className="w-3.5 h-3.5 text-cyan-400 mr-2 shrink-0 mt-0.5" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-lg bg-slate-900/90 text-slate-300 border border-white/10 font-mono text-[11px]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between gap-3 font-mono text-xs">
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 transition font-semibold"
          >
            <span>LIVE PROJECT</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
          </a>
        ) : (
          <span className="flex-1 text-center py-2.5 text-slate-400 border border-white/5 rounded-xl">
            DEMO ON REQUEST
          </span>
        )}

        <button
          onClick={() => onOpenCaseStudy(project)}
          className="flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/10 hover:border-white/20 transition font-semibold"
        >
          <BookOpen className="w-3.5 h-3.5 mr-1.5 text-purple-400" />
          <span>CASE STUDY</span>
        </button>
      </div>
    </GlowCard>
  );
};
