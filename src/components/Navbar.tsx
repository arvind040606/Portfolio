import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, FileText, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenAI: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAI }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'WORK', href: '#work' },
    { name: 'ABOUT', href: '#about' },
    { name: 'SKILLS', href: '#skills' },
    { name: 'LIVE', href: '#live' },
    { name: 'AI LAB', href: '#ailab' },
    { name: 'CONTACT', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-[#030304]/80 backdrop-blur-xl border-b border-white/10 shadow-2xl'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo / Brand identity */}
          <a
            href="#"
            data-cursor="HOME"
            className="flex items-center gap-3 group"
          >
            <div className="w-8 h-8 rounded-full bg-white text-black font-extrabold font-syne flex items-center justify-center text-sm group-hover:bg-[#00f0ff] transition-colors duration-300">
              A
            </div>
            <div className="flex flex-col">
              <span className="font-syne font-extrabold text-base md:text-lg tracking-wider text-white group-hover:text-[#00f0ff] transition-colors duration-300">
                ARVIND MADAAN
              </span>
              <span className="text-[9px] font-mono tracking-widest text-neutral-400 uppercase -mt-1">
                AI × FULL-STACK
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                data-cursor="GOTO"
                className="text-xs font-mono tracking-widest text-neutral-300 hover:text-[#00f0ff] transition-colors duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#00f0ff] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action buttons */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={onOpenAI}
              data-cursor="AI"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#00f0ff]/30 bg-[#00f0ff]/10 text-[#00f0ff] text-xs font-mono tracking-wider hover:bg-[#00f0ff]/20 transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.15)]"
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>ARVIND.AI</span>
            </button>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="RESUME"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-black font-mono text-xs font-semibold hover:bg-[#00f0ff] hover:text-black transition-all duration-300"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>RESUME</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>

          {/* Mobile Hamburger toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-white hover:text-[#00f0ff] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-30 bg-[#030304]/98 backdrop-blur-2xl flex flex-col justify-between p-8 pt-28 lg:hidden animate-in fade-in duration-300">
          <div className="flex flex-col gap-6">
            <span className="text-xs font-mono text-[#00f0ff] tracking-widest">NAVIGATE</span>
            {navLinks.map((link, idx) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-syne text-3xl font-bold tracking-tight text-white hover:text-[#00f0ff] transition-colors flex items-center justify-between"
              >
                <span>{link.name}</span>
                <span className="text-sm font-mono text-neutral-500">0{idx + 1}</span>
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-4 pt-8 border-t border-white/10">
            <button
              onClick={() => {
                setMobileOpen(false);
                onOpenAI();
              }}
              className="w-full py-3 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/40 text-[#00f0ff] font-mono text-sm font-semibold flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>ASK ARVIND.AI ASSISTANT</span>
            </button>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-full bg-white text-black font-mono text-sm font-semibold text-center flex items-center justify-center gap-2"
            >
              <span>DOWNLOAD RESUME</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </>
  );
};
