import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Terminal, ArrowRight, X, ExternalLink, Code, User, Cpu, Mail, FileText, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction?: (actionId: string) => void;
}

interface CommandItem {
  id: string;
  label: string;
  command: string;
  category: "Navigation" | "Social" | "AI / Terminal";
  icon: React.ReactNode;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectAction,
}) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [easterEggMessage, setEasterEggMessage] = useState<string | null>(null);

  const scrollToSection = (id: string) => {
    onClose();
    onSelectAction?.(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const commands: CommandItem[] = [
    {
      id: "projects",
      label: "View Featured Projects",
      command: "> projects",
      category: "Navigation",
      icon: <Code className="w-4 h-4 text-cyan-400" />,
      action: () => scrollToSection("work"),
    },
    {
      id: "about",
      label: "About Arvind & Core Philosophy",
      command: "> about",
      category: "Navigation",
      icon: <User className="w-4 h-4 text-purple-400" />,
      action: () => scrollToSection("about"),
    },
    {
      id: "skills",
      label: "Explore Tech Stack & Skills",
      command: "> skills",
      category: "Navigation",
      icon: <Cpu className="w-4 h-4 text-blue-400" />,
      action: () => scrollToSection("skills"),
    },
    {
      id: "journey",
      label: "Developer Journey Timeline",
      command: "> journey",
      category: "Navigation",
      icon: <Terminal className="w-4 h-4 text-emerald-400" />,
      action: () => scrollToSection("journey"),
    },
    {
      id: "ai-lab",
      label: "AI Lab & Hardware Experiments",
      command: "> ai-lab",
      category: "Navigation",
      icon: <Sparkles className="w-4 h-4 text-amber-400" />,
      action: () => scrollToSection("ai-lab"),
    },
    {
      id: "ask-ai",
      label: "Talk to Arvind.AI Assistant",
      command: "> ask ai",
      category: "AI / Terminal",
      icon: <Sparkles className="w-4 h-4 text-cyan-400" />,
      action: () => scrollToSection("arvind-ai"),
    },
    {
      id: "contact",
      label: "Send Email & Connect",
      command: "> contact",
      category: "Navigation",
      icon: <Mail className="w-4 h-4 text-purple-400" />,
      action: () => scrollToSection("contact"),
    },
    {
      id: "resume",
      label: "View / Download Resume (PDF)",
      command: "> resume",
      category: "Social",
      icon: <FileText className="w-4 h-4 text-cyan-400" />,
      action: () => {
        onClose();
        window.open("/resume.pdf", "_blank");
      },
    },
    {
      id: "github",
      label: "Visit GitHub Profile",
      command: "> github",
      category: "Social",
      icon: <ExternalLink className="w-4 h-4 text-slate-300" />,
      action: () => {
        onClose();
        window.open("https://github.com/arvind040606", "_blank");
      },
    },
    {
      id: "linkedin",
      label: "Visit LinkedIn Profile",
      command: "> linkedin",
      category: "Social",
      icon: <ExternalLink className="w-4 h-4 text-blue-400" />,
      action: () => {
        onClose();
        window.open("https://www.linkedin.com/in/arvindmadaan2704", "_blank");
      },
    },
  ];

  const filteredCommands = commands.filter(
    (c) =>
      c.label.toLowerCase().includes(query.toLowerCase()) ||
      c.command.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          setQuery("");
          setEasterEggMessage(null);
        }
      }

      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredCommands.length || 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev === 0 ? (filteredCommands.length || 1) - 1 : prev - 1
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (query.trim().toLowerCase() === "sudo arvind") {
          setEasterEggMessage("ACCESS GRANTED. Welcome to Arvind.OS Kernel Mode!");
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
          return;
        }

        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, query, filteredCommands, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl glass-panel border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 text-slate-100"
        >
          {/* Input Header */}
          <div className="flex items-center px-4 py-3.5 border-b border-white/10 bg-slate-900/50">
            <Search className="w-5 h-5 text-cyan-400 mr-3" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
                setEasterEggMessage(null);
              }}
              placeholder="Type a command or search... (Try 'sudo arvind')"
              className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-400 focus:outline-none font-mono"
            />
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Easter Egg Notice */}
          {easterEggMessage && (
            <div className="p-3 mx-4 mt-3 bg-cyan-950/60 border border-cyan-400/40 rounded-xl text-cyan-300 font-mono text-xs flex items-center justify-between animate-pulse">
              <span>⚡ {easterEggMessage}</span>
              <span className="text-[10px] text-cyan-400/70">PROD-ENV :: PRIVILEGED ACCESS</span>
            </div>
          )}

          {/* Command List */}
          <div className="max-h-80 overflow-y-auto p-2 space-y-1 font-sans">
            {filteredCommands.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-sm">
                No matching commands found for "{query}".
                <div className="mt-2 text-xs text-slate-500 font-mono">
                  Tip: Type 'projects', 'skills', or 'ask ai'
                </div>
              </div>
            ) : (
              filteredCommands.map((cmd, idx) => (
                <div
                  key={cmd.id}
                  onClick={cmd.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition text-sm ${
                    idx === selectedIndex
                      ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30"
                      : "text-slate-300 hover:bg-slate-800/50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-1.5 rounded-lg bg-slate-900/80 border border-white/5">
                      {cmd.icon}
                    </div>
                    <div>
                      <div className="font-medium text-slate-200">{cmd.label}</div>
                      <div className="text-[11px] font-mono text-slate-400">{cmd.category}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-white/10 font-mono text-xs text-cyan-400">
                      {cmd.command}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Shortcuts Info */}
          <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/10 bg-slate-950/70 text-[11px] font-mono text-slate-400">
            <div className="flex items-center space-x-3">
              <span><kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">↑</kbd> <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">↓</kbd> Navigate</span>
              <span><kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">↵</kbd> Select</span>
              <span><kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">ESC</kbd> Close</span>
            </div>
            <div className="text-cyan-400/80">ARVIND.OS COMMAND KERNEL</div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
