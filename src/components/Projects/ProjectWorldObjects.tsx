import React, { useState } from "react";
import { ExternalLink, FileText, Cpu, Play } from "lucide-react";
import { projects, Project } from "../../data/projects";
import { CaseStudyModal } from "./CaseStudyModal";
import { LiveProjectPreview } from "./LiveProjectPreview";
import { demoAccounts } from "../../config/demoAccounts";

export const ProjectWorldObjects: React.FC = () => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);

  const bunkmate = projects.find((p) => p.id === "bunkmate")!;
  const cardioguard = projects.find((p) => p.id === "cardioguard")!;
  const atmosphere = projects.find((p) => p.id === "atmosphere")!;
  const campusbrain = projects.find((p) => p.id === "campusbrain")!;

  return (
    <div className="space-y-20 py-6">
      {/* 01 BUNK MATE - REAL LIVE DEPLOYED APP PREVIEW WITH DEMO ACCOUNT */}
      <div className="rounded-3xl glass-panel border border-cyan-500/40 p-6 sm:p-8 relative overflow-hidden shadow-2xl shadow-cyan-500/15">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Project Info & CTAs */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-mono font-extrabold text-cyan-400">01</span>
              <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold">
                FLAGSHIP AI PRODUCT
              </span>
            </div>

            <div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white">BunkMate</h3>
              <p className="text-cyan-400 font-mono text-xs mt-1">
                AI-powered student attendance & academic assistant
              </p>
            </div>

            <p className="text-slate-300 text-sm font-sans leading-relaxed">
              BunkMate simplifies academic life with AI timetable extraction, swipe-based attendance logging, offline-first local WebCrypto encryption, and automated assignment reminders.
            </p>

            <div className="flex flex-wrap gap-2 font-mono text-xs">
              {bunkmate.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-bold"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={bunkmate.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-mono text-xs font-extrabold transition shadow-lg shadow-cyan-500/25"
              >
                <Play className="w-4 h-4 mr-2 fill-current" />
                <span>TRY LIVE DEMO</span>
              </a>

              <button
                onClick={() => setSelectedCaseStudy(bunkmate)}
                className="inline-flex items-center px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-cyan-500/30 font-mono text-xs font-bold transition"
              >
                <FileText className="w-4 h-4 mr-2 text-cyan-400" />
                <span>CASE STUDY</span>
              </button>
            </div>
          </div>

          {/* Right Column: Embedded Real Deployed App Frame */}
          <div className="lg:col-span-7">
            <LiveProjectPreview
              url={demoAccounts.bunkmate.liveUrl}
              title="BunkMate AI Student Assistant"
              defaultMode="mobile"
              accentColor="cyan"
              demoAccount={demoAccounts.bunkmate}
            />
          </div>
        </div>
      </div>

      {/* 02 CARDIO GUARD AI - REAL LIVE DEPLOYED APP PREVIEW WITH DEMO ACCOUNT */}
      <div className="rounded-3xl glass-panel border border-emerald-500/40 p-6 sm:p-8 relative overflow-hidden shadow-2xl shadow-emerald-500/15">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-mono font-extrabold text-emerald-400">02</span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold">
                CLINICAL PREDICTIVE SUITE
              </span>
            </div>

            <div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white">CardioGuard AI</h3>
              <p className="text-emerald-400 font-mono text-xs mt-1">
                Cardiovascular risk scoring platform & dataset explainability pipeline
              </p>
            </div>

            <p className="text-slate-300 text-sm font-sans leading-relaxed">
              Clinical decision-support analytical suite engineered with FastAPI, Supervised ML scoring, SHAP explainability insights, and benchmark integrity verification.
            </p>

            <div className="flex flex-wrap gap-2 font-mono text-xs">
              {cardioguard.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 font-bold"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={cardioguard.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-mono text-xs font-extrabold transition shadow-lg shadow-emerald-500/25"
              >
                <Play className="w-4 h-4 mr-2 fill-current" />
                <span>TRY LIVE DEMO</span>
              </a>

              <button
                onClick={() => setSelectedCaseStudy(cardioguard)}
                className="inline-flex items-center px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-emerald-500/30 font-mono text-xs font-bold transition"
              >
                <FileText className="w-4 h-4 mr-2 text-emerald-400" />
                <span>CASE STUDY</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <LiveProjectPreview
              url={demoAccounts.cardioguard.liveUrl}
              title="CardioGuard AI Clinical Diagnostics Suite"
              defaultMode="desktop"
              accentColor="emerald"
              demoAccount={demoAccounts.cardioguard}
            />
          </div>
        </div>
      </div>

      {/* 03 ATMOSPHERE AI - REAL LIVE DEPLOYED APP PREVIEW */}
      <div className="rounded-3xl glass-panel border border-blue-500/40 p-6 sm:p-8 relative overflow-hidden shadow-2xl shadow-blue-500/15">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-mono font-extrabold text-blue-400">03</span>
              <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-mono font-bold">
                INTELLIGENT METEOROLOGICAL SEARCH
              </span>
            </div>

            <div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Atmosphere AI</h3>
              <p className="text-blue-400 font-mono text-xs mt-1">
                AI weather search engine with natural language queries
              </p>
            </div>

            <p className="text-slate-300 text-sm font-sans leading-relaxed">
              Atmosphere AI transforms raw weather metrics into natural language forecast summaries and predictive spatial alerts powered by React, TypeScript, and meteorological APIs.
            </p>

            <div className="flex flex-wrap gap-2 font-mono text-xs">
              {atmosphere.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg bg-blue-950/60 border border-blue-500/30 text-blue-300 font-bold"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={atmosphere.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-mono text-xs font-extrabold transition shadow-lg shadow-blue-500/25"
              >
                <Play className="w-4 h-4 mr-2 fill-current" />
                <span>TRY LIVE DEMO</span>
              </a>

              <button
                onClick={() => setSelectedCaseStudy(atmosphere)}
                className="inline-flex items-center px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-blue-500/30 font-mono text-xs font-bold transition"
              >
                <FileText className="w-4 h-4 mr-2 text-blue-400" />
                <span>CASE STUDY</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <LiveProjectPreview
              url={demoAccounts.atmosphere.liveUrl}
              title="Atmosphere AI Weather Search Engine"
              defaultMode="desktop"
              accentColor="blue"
              demoAccount={demoAccounts.atmosphere}
            />
          </div>
        </div>
      </div>

      {/* 04 CAMPUSBRAIN - PERSONAL PROJECT ARCHITECTURE */}
      <div className="rounded-3xl glass-panel border border-purple-500/40 p-6 sm:p-8 relative overflow-hidden shadow-2xl shadow-purple-500/15">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-mono font-extrabold text-purple-400">04</span>
              <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold">
                PERSONAL PROJECT // AI CAMPUS BRAIN
              </span>
            </div>

            <div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white">CampusBrain</h3>
              <p className="text-purple-400 font-mono text-xs mt-1">
                AI-powered campus & student workflow assistant
              </p>
            </div>

            <p className="text-slate-300 text-sm font-sans leading-relaxed">
              An intelligent campus platform enabling natural-language search across university documentation, schedules, and academic information.
            </p>

            <div className="flex flex-wrap gap-2 font-mono text-xs">
              {campusbrain.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg bg-purple-950/60 border border-purple-500/30 text-purple-300 font-bold"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => setSelectedCaseStudy(campusbrain)}
                className="inline-flex items-center px-6 py-3 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-mono text-xs font-extrabold transition shadow-lg shadow-purple-500/25"
              >
                <FileText className="w-4 h-4 mr-2" />
                <span>EXPLORE CASE STUDY</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-slate-950 border-2 border-purple-500/40 p-6 space-y-4 font-mono text-xs text-slate-300">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 text-purple-400 font-bold">
                <span className="flex items-center">
                  <Cpu className="w-4 h-4 mr-2 text-purple-400" />
                  CAMPUS BRAIN ARCHITECTURE NODE
                </span>
                <span className="text-[10px] text-slate-400">PERSONAL BUILD</span>
              </div>

              <div className="space-y-2 text-slate-300 text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-white/10">
                  <span className="text-purple-400 font-bold">● CONTEXTUAL QUERY ENGINE</span>
                  <p className="text-[11px] text-slate-400 mt-1">Indexes official university announcements, exam timetables, and department circulars for instant natural language lookup.</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-white/10">
                  <span className="text-purple-400 font-bold">● STUDENT RESOLUTION BACKEND</span>
                  <p className="text-[11px] text-slate-400 mt-1">FastAPI microservice handling real-time academic queries and automated notice board classification.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Case Study Modal */}
      {selectedCaseStudy && (
        <CaseStudyModal
          project={selectedCaseStudy}
          onClose={() => setSelectedCaseStudy(null)}
        />
      )}
    </div>
  );
};
