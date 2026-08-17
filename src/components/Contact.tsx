import React from 'react';
import { Mail, Github, Linkedin, FileText, ArrowUpRight, MapPin, CheckCircle2 } from 'lucide-react';
import { arvindProfile } from '../data/arvindProfile';

export const Contact: React.FC = () => {
  const gmailSubject = encodeURIComponent("Portfolio Contact");
  const gmailBody = encodeURIComponent("Name: \nEmail: \nMessage: \n");
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${arvindProfile.email}&su=${gmailSubject}&body=${gmailBody}`;

  return (
    <section id="contact" className="relative py-28 px-6 md:px-12 bg-[#030304] border-b border-white/10 editorial-grain">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Section Header Tag */}
        <div className="flex items-center justify-between pb-8 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#00f0ff] tracking-widest">[ 08 // CONNECT ]</span>
            <span className="h-[1px] w-12 bg-[#00f0ff]" />
          </div>
          <span className="font-mono text-xs text-neutral-500 tracking-widest uppercase">OPEN FOR OPPORTUNITIES</span>
        </div>

        {/* Core Statement & Technical Contact Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Main Headline & Call to Action */}
          <div className="lg:col-span-7 space-y-8 pr-0 lg:pr-4">
            <h2 className="font-syne text-5xl sm:text-7xl font-extrabold text-white tracking-tighter leading-[0.95]">
              LET'S BUILD <br />
              <span className="text-gradient-cyan">SOMETHING</span> <br />
              INTELLIGENT.
            </h2>

            <p className="text-neutral-400 font-sans text-base sm:text-lg max-w-xl leading-relaxed font-light">
              Available for full-time Software Engineering roles, AI / Machine Learning projects, and high-impact technical collaborations.
            </p>

            {/* High Impact Contact Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href={gmailUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="EMAIL"
                className="px-8 py-4 rounded-full bg-[#00f0ff] text-black font-mono font-bold text-xs tracking-widest hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2 shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:shadow-[0_0_40px_rgba(0,240,255,0.8)] transform hover:-translate-y-0.5 hover:scale-105"
              >
                <Mail className="w-4 h-4" />
                <span>EMAIL ARVIND</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href={arvindProfile.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="GITHUB"
                className="px-8 py-4 rounded-full bg-transparent border border-white/20 text-white font-mono font-bold text-xs tracking-widest hover:border-[#00f0ff] hover:text-[#00f0ff] transition-all duration-300 flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                <span>GITHUB ↗</span>
              </a>

              <a
                href={arvindProfile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="LINKEDIN"
                className="px-8 py-4 rounded-full bg-transparent border border-white/20 text-white font-mono font-bold text-xs tracking-widest hover:border-[#00f0ff] hover:text-[#00f0ff] transition-all duration-300 flex items-center gap-2"
              >
                <Linkedin className="w-4 h-4" />
                <span>LINKEDIN ↗</span>
              </a>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="RESUME"
                className="px-8 py-4 rounded-full bg-white/5 border border-white/15 text-neutral-300 font-mono font-bold text-xs tracking-widest hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>DOWNLOAD RESUME</span>
              </a>
            </div>
          </div>

          {/* Technical Location HUD Card - Lifted Up & Properly Spaced */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end lg:pt-2">
            <div className="relative w-full max-w-sm rounded-2xl p-6 bg-[#07090e] border border-white/20 shadow-2xl space-y-6 font-mono transform hover:border-[#00f0ff]/40 transition-colors">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#00f0ff]" />
                  <span>LOCATION HUD</span>
                </span>
                <span className="text-[10px] text-emerald-400 font-bold tracking-wider">PUNJAB, INDIA</span>
              </div>

              <div className="space-y-3 text-xs text-neutral-300">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                  <span className="text-neutral-400">AVAILABILITY</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>OPEN FOR ROLES</span>
                  </span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                  <span className="text-neutral-400">PRIMARY FOCUS</span>
                  <span className="text-[#00f0ff] font-bold">AI × FULLSTACK</span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                  <span className="text-neutral-400">DEGREE</span>
                  <span className="text-white font-bold">CSE 2026</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 text-center text-[10px] text-neutral-500 tracking-widest">
                DIRECT INQUIRIES // ARVINDMADAAN27@GMAIL.COM
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="pt-16 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} ARVIND MADAAN. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-2 text-neutral-400">
            <span>DESIGNED WITH MAGAZINE PRECISION</span>
            <span>•</span>
            <span className="text-[#00f0ff]">CSE 2026</span>
          </div>
        </div>

      </div>
    </section>
  );
};
