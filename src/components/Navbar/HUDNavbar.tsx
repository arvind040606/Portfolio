import React, { useState, useEffect } from "react";
import { Command, FileText, Menu, X } from "lucide-react";
import { CommandPalette } from "./CommandPalette";

export const HUDNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "ABOUT", href: "#about" },
    { name: "WORK", href: "#work" },
    { name: "SKILLS", href: "#skills" },
    { name: "AI LAB", href: "#ai-lab" },
    { name: "ARVIND.AI", href: "#arvind-ai" },
    { name: "CONTACT", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#030308]/90 backdrop-blur-2xl border-b border-white/10 py-3 shadow-2xl"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between font-mono text-xs">
            
            {/* Minimal Brand Identifier */}
            <a
              href="#"
              data-cursor="ARVIND.OS"
              className="flex items-center space-x-3 group"
            >
              <div className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/15 flex items-center justify-center text-white font-display font-extrabold text-sm group-hover:border-cyan-400 group-hover:text-cyan-300 transition">
                A
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold font-display tracking-widest text-white text-sm">
                  ARVIND<span className="text-cyan-400">.OS</span>
                </span>
                <span className="text-[9px] text-slate-400 tracking-tighter uppercase font-mono">
                  AI + FULL-STACK
                </span>
              </div>
            </a>

            {/* Desktop Navigation Bar */}
            <nav className="hidden lg:flex items-center space-x-1 rounded-full px-5 py-2 bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-2xl">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  data-cursor={link.name}
                  className="px-4 py-1.5 rounded-full text-slate-300 hover:text-white font-mono text-xs tracking-wider transition hover:bg-white/[0.06]"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Action Group: Command Palette & Resume */}
            <div className="hidden sm:flex items-center space-x-3">
              <button
                onClick={() => setCommandPaletteOpen(true)}
                data-cursor="⌘K COMMAND"
                className="flex items-center space-x-2 px-3.5 py-2 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-slate-300 font-mono text-xs transition"
              >
                <Command className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-bold">⌘K</span>
              </button>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="RESUME"
                className="flex items-center space-x-2 px-5 py-2 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-mono text-xs font-black tracking-wider uppercase transition shadow-[0_0_20px_rgba(0,240,255,0.3)]"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>RESUME</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center space-x-2">
              <button
                onClick={() => setCommandPaletteOpen(true)}
                className="p-2 rounded-xl bg-white/[0.04] border border-white/10 text-cyan-300"
              >
                <Command className="w-4 h-4" />
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-white/[0.04] border border-white/10 text-white"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Overlay Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 p-5 rounded-3xl bg-[#070A14] border border-white/10 space-y-3 font-mono text-xs shadow-2xl">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2.5 rounded-2xl text-slate-200 hover:text-cyan-300 hover:bg-white/[0.04] border border-transparent hover:border-white/10"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-2 border-t border-white/10">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center py-3 rounded-2xl bg-cyan-400 text-slate-950 font-black"
                >
                  VIEW RESUME PDF
                </a>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </>
  );
};
