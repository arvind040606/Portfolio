import React from "react";
import { motion } from "framer-motion";
import { Mail, Download } from "lucide-react";
import { arvindProfile } from "../../data/arvindProfile";
import { GithubIcon, LinkedinIcon } from "../UI/SocialIcons";

export const Contact: React.FC = () => {
  const gmailSubject = encodeURIComponent("Portfolio Contact");
  const gmailBody = encodeURIComponent("Name: \nEmail: \nMessage: \n");
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${arvindProfile.email}&su=${gmailSubject}&body=${gmailBody}`;

  return (
    <section id="contact" className="py-36 relative overflow-hidden bg-[#030308] border-t border-white/5">
      {/* Background Volumetric Darkness & Starfield */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030308] via-space-deep to-black pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-cyan-500/10 via-purple-500/10 to-transparent blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-12">
        
        {/* Cinematic Section Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center space-x-3 px-5 py-2 rounded-full bg-white/[0.03] border border-white/10 text-cyan-300 font-mono text-xs tracking-[0.25em] uppercase font-bold"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>FINAL SCENE // ARVIND.OS</span>
        </motion.div>

        {/* Large Editorial Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-2"
        >
          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black font-display text-white uppercase tracking-tight leading-[0.95] select-none">
            LET'S BUILD
            <br />
            <span className="shimmer-text">SOMETHING</span>
            <br />
            INTELLIGENT.
          </h2>
        </motion.div>

        {/* Identity Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-3 font-mono"
        >
          <p className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-wider uppercase">
            {arvindProfile.name.toUpperCase()}
          </p>
          <p className="text-sm sm:text-base text-cyan-400 font-semibold tracking-widest uppercase">
            {arvindProfile.title}
          </p>
          <p className="text-xs text-slate-400">
            {arvindProfile.email}
          </p>
        </motion.div>

        {/* Action Buttons Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="flex flex-wrap items-center justify-center gap-4 max-w-2xl mx-auto pt-6"
        >
          {/* EMAIL BUTTON */}
          <a
            href={gmailUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="EMAIL"
            className="flex items-center space-x-2.5 px-8 py-4 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-mono text-xs font-black tracking-widest uppercase transition shadow-[0_0_30px_rgba(0,240,255,0.3)] hover:scale-105"
          >
            <Mail className="w-4 h-4" />
            <span>EMAIL ARVIND</span>
          </a>

          {/* GITHUB BUTTON */}
          <a
            href={arvindProfile.github}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="OPEN"
            className="flex items-center space-x-2.5 px-7 py-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-cyan-500/40 text-slate-200 hover:text-white font-mono text-xs font-bold tracking-widest uppercase transition backdrop-blur-md hover:scale-105"
          >
            <GithubIcon className="w-4 h-4 text-slate-300" />
            <span>GITHUB</span>
          </a>

          {/* LINKEDIN BUTTON */}
          <a
            href={arvindProfile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="OPEN"
            className="flex items-center space-x-2.5 px-7 py-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-blue-500/40 text-slate-200 hover:text-white font-mono text-xs font-bold tracking-widest uppercase transition backdrop-blur-md hover:scale-105"
          >
            <LinkedinIcon className="w-4 h-4 text-blue-400" />
            <span>LINKEDIN</span>
          </a>

          {/* RESUME BUTTON */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="VIEW"
            className="flex items-center space-x-2.5 px-7 py-4 rounded-2xl bg-white/[0.04] border border-purple-500/30 hover:border-purple-400 text-purple-300 hover:text-purple-200 font-mono text-xs font-bold tracking-widest uppercase transition backdrop-blur-md hover:scale-105"
          >
            <Download className="w-4 h-4 text-purple-400" />
            <span>DOWNLOAD RESUME</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
};
