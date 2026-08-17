import React from "react";
import { ExternalLink, Code } from "lucide-react";
import { arvindProfile } from "../../data/arvindProfile";
import { GlowCard } from "../UI/GlowCard";
import { GithubIcon, LinkedinIcon } from "../UI/SocialIcons";

export const GithubSection: React.FC = () => {
  const featuredRepos = [
    {
      name: "BunkMate",
      desc: "AI-powered student attendance & academic assistant with local-first encrypted storage.",
      lang: "TypeScript",
      langColor: "bg-blue-400",
      url: "https://bunkmate-lilac.vercel.app/",
      stars: "Live",
    },
    {
      name: "CardioGuard-AI",
      desc: "Clinical cardiovascular risk scoring platform with FastAPI & SHAP explainability.",
      lang: "Python",
      langColor: "bg-emerald-400",
      url: "https://cardioguard20.vercel.app/",
      stars: "Live",
    },
    {
      name: "Atmosphere-AI",
      desc: "AI weather search engine with natural language atmospheric forecast queries.",
      lang: "TypeScript",
      langColor: "bg-cyan-400",
      url: "https://atmosphere-ai-intelligent-search.vercel.app/",
      stars: "Live",
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: GitHub Card */}
          <div className="lg:col-span-7">
            <GlowCard glowColor="rgba(0, 240, 255, 0.15)" className="h-full flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-xl bg-slate-900 border border-white/10 text-white">
                      <GithubIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-mono text-base font-bold text-white">GITHUB PROFILE</h3>
                      <span className="text-xs text-slate-400 font-mono">@arvind040606</span>
                    </div>
                  </div>

                  <a
                    href={arvindProfile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 hover:border-cyan-500/40 text-cyan-300 font-mono text-xs transition"
                  >
                    <span>OPEN GITHUB</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                  </a>
                </div>

                {/* Stat Grid */}
                <div className="grid grid-cols-3 gap-3 text-center font-mono text-xs">
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5">
                    <div className="text-slate-400 text-[10px]">REPOSITORIES</div>
                    <div className="text-xl font-bold text-cyan-400 mt-1">15+</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5">
                    <div className="text-slate-400 text-[10px]">PRIMARY LANG</div>
                    <div className="text-xl font-bold text-purple-400 mt-1">TS / PY</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5">
                    <div className="text-slate-400 text-[10px]">COMMITS</div>
                    <div className="text-xl font-bold text-emerald-400 mt-1">ACTIVE</div>
                  </div>
                </div>

                {/* Featured Repositories List */}
                <div className="space-y-2">
                  <div className="text-xs font-mono text-slate-400 font-bold tracking-wider">
                    RECENT PUBLIC REPOSITORIES
                  </div>
                  {featuredRepos.map((repo) => (
                    <a
                      key={repo.name}
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 rounded-xl bg-slate-900/60 border border-white/5 hover:border-cyan-500/30 transition group"
                    >
                      <div className="flex items-center justify-between font-mono text-xs">
                        <div className="flex items-center space-x-2">
                          <Code className="w-3.5 h-3.5 text-cyan-400" />
                          <span className="font-bold text-slate-200 group-hover:text-cyan-300">
                            {repo.name}
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 text-[10px]">
                          {repo.stars}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 font-sans line-clamp-1">
                        {repo.desc}
                      </p>
                    </a>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-white/10 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <span>SYSTEM CODE SYNC: OPERATIONAL</span>
                <span className="text-cyan-400">● LIVE REPO MATRIX</span>
              </div>
            </GlowCard>
          </div>

          {/* Right Column: LinkedIn Social Card */}
          <div className="lg:col-span-5">
            <GlowCard glowColor="rgba(59, 130, 246, 0.2)" className="h-full flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-xl bg-blue-950 border border-blue-500/30 text-blue-400">
                      <LinkedinIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-mono text-base font-bold text-white">LINKEDIN</h3>
                      <span className="text-xs text-slate-400 font-mono">PROFESSIONAL PROFILE</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/90 border border-blue-500/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xl font-bold text-white">{arvindProfile.name}</h4>
                      <p className="text-cyan-400 font-mono text-xs mt-0.5">{arvindProfile.title}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[10px] font-mono font-bold">
                      OPEN TO OPPORTUNITIES
                    </span>
                  </div>

                  <p className="text-slate-300 text-sm font-sans leading-relaxed pt-2">
                    Connect with Arvind on LinkedIn for software engineering roles, hackathon collaborations, and product discussions.
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6">
                <a
                  href={arvindProfile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-mono text-xs font-bold transition shadow-lg shadow-blue-500/20"
                >
                  <span>OPEN LINKEDIN PROFILE</span>
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
            </GlowCard>
          </div>
        </div>
      </div>
    </section>
  );
};
