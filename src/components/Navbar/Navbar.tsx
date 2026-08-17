import React, { useState, useEffect } from "react";
import { Command, Menu, X, Terminal, FileText, Sparkles } from "lucide-react";
import { CommandPalette } from "./CommandPalette";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Active section highlighting
      const sections = ["hero", "work", "about", "skills", "journey", "ai-lab", "arvind-ai", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "WORK", href: "#work", id: "work" },
    { name: "ABOUT", href: "#about", id: "about" },
    { name: "SKILLS", href: "#skills", id: "skills" },
    { name: "JOURNEY", href: "#journey", id: "journey" },
    { name: "AI LAB", href: "#ai-lab", id: "ai-lab" },
    { name: "ARVIND.AI", href: "#arvind-ai", id: "arvind-ai" },
    { name: "CONTACT", href: "#contact", id: "contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#07090E]/85 backdrop-blur-xl border-b border-white/10 py-3 shadow-xl shadow-black/40"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Sub-label */}
          <a
            href="#hero"
            className="flex items-center space-x-3 group text-left focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono font-bold text-lg group-hover:border-cyan-400 group-hover:shadow-lg group-hover:shadow-cyan-500/20 transition-all duration-300">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-mono font-bold tracking-widest text-slate-100 text-base group-hover:text-cyan-300 transition">
                  ARVIND.OS
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping mr-1"></span>
                  ONLINE
                </span>
              </div>
              <span className="text-[10px] font-mono tracking-wider text-slate-400 block uppercase">
                AI + FULL-STACK DEVELOPER
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1 glass-panel px-3 py-1.5 rounded-full border border-white/10">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-200 ${
                    isActive
                      ? "bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40 shadow-sm shadow-cyan-500/20"
                      : "text-slate-400 hover:text-slate-100 hover:bg-white/5"
                  }`}
                >
                  [ {link.name} ]
                </a>
              );
            })}
          </nav>

          {/* Right Action Items: Command Palette Trigger & Resume */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-white/10 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 text-xs font-mono transition-all duration-200 group"
              title="Open Command Palette (Ctrl+K)"
            >
              <Command className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition" />
              <span>⌘K</span>
            </button>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-medium transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/10"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>RESUME</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center space-x-2">
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className="p-2 rounded-lg bg-slate-900 border border-white/10 text-cyan-400"
            >
              <Command className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-white/10 text-slate-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="sm:hidden glass-panel border-b border-white/10 px-4 pt-3 pb-6 space-y-2 mt-2 bg-[#07090E]/95 backdrop-blur-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs font-mono text-slate-400">
              <span>● SYSTEM ONLINE</span>
              <span className="text-cyan-400">ARVIND.OS NAVIGATION</span>
            </div>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-xs font-mono tracking-wider text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-300 transition border border-transparent hover:border-cyan-500/20"
              >
                [ {link.name} ]
              </a>
            ))}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 font-mono text-xs font-semibold border border-cyan-500/40 flex items-center justify-center space-x-2"
              >
                <FileText className="w-4 h-4" />
                <span>VIEW RESUME</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectAction={() => setIsCommandPaletteOpen(false)}
      />
    </>
  );
};
