import React from "react";
import { Mail, ArrowUp } from "lucide-react";
import { arvindProfile } from "../../data/arvindProfile";
import { GithubIcon, LinkedinIcon } from "../UI/SocialIcons";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#030308] border-t border-white/5 py-12 font-mono text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/5 pb-6">
          
          {/* Logo & Identity */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/15 flex items-center justify-center text-white font-display font-bold text-sm">
              A
            </div>
            <div>
              <span className="font-extrabold font-display tracking-widest text-white text-sm">
                ARVIND<span className="text-cyan-400">.OS</span>
              </span>
              <span className="text-[10px] text-slate-500 block">
                ARVIND MADAAN // AI & FULL-STACK DEVELOPER
              </span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-3">
            <a
              href={arvindProfile.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="GITHUB"
              className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/40 text-slate-300 hover:text-white transition"
              title="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={arvindProfile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="LINKEDIN"
              className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-blue-500/40 text-slate-300 hover:text-white transition"
              title="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${arvindProfile.email}`}
              data-cursor="EMAIL"
              className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-purple-500/40 text-slate-300 hover:text-white transition"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              data-cursor="TOP"
              className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-cyan-400 text-cyan-400 transition"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <div>© {new Date().getFullYear()} ARVIND MADAAN. ALL RIGHTS RESERVED.</div>
          <div className="text-cyan-400/80">
            CINEMATIC PORTFOLIO EXPERIENCE // ARVIND.OS
          </div>
        </div>
      </div>
    </footer>
  );
};
