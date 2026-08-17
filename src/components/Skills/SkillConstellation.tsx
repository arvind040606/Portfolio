import React, { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Sparkles, Layers, CheckCircle2 } from "lucide-react";

interface NodeData {
  id: string;
  name: string;
  category: "AI" | "FULLSTACK" | "PRODUCT";
  projects: string[];
  x: number; // percentage pos
  y: number; // percentage pos
}

export const SkillConstellation: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);

  const nodes: NodeData[] = [
    { id: "ml", name: "Machine Learning", category: "AI", projects: ["CardioGuard AI"], x: 20, y: 25 },
    { id: "gemini", name: "Gemini API", category: "AI", projects: ["BunkMate", "Atmosphere AI", "Navi"], x: 35, y: 15 },
    { id: "speech", name: "Speech & Voice AI", category: "AI", projects: ["Navi", "ESP32 Robot"], x: 18, y: 55 },
    { id: "react", name: "React & TypeScript", category: "FULLSTACK", projects: ["BunkMate", "CardioGuard AI", "Atmosphere AI", "CampusBrain"], x: 80, y: 20 },
    { id: "fastapi", name: "Python & FastAPI", category: "FULLSTACK", projects: ["CardioGuard AI", "CampusBrain"], x: 82, y: 55 },
    { id: "sql", name: "SQL & Encryption", category: "FULLSTACK", projects: ["BunkMate", "CardioGuard AI"], x: 75, y: 80 },
    { id: "pwa", name: "PWA & Offline-First", category: "PRODUCT", projects: ["BunkMate"], x: 40, y: 85 },
    { id: "edge", name: "Deployment & Architecture", category: "PRODUCT", projects: ["BunkMate", "Atmosphere AI"], x: 60, y: 85 },
  ];

  return (
    <div className="rounded-2xl glass-panel border border-cyan-500/30 p-6 sm:p-10 text-center space-y-8 my-12 relative overflow-hidden shadow-2xl shadow-cyan-500/10">
      <div className="flex items-center justify-between border-b border-white/10 pb-4 text-xs font-mono">
        <div className="flex items-center space-x-2 text-cyan-400 font-bold">
          <Cpu className="w-4 h-4" />
          <span>3D KERNEL SKILL CONSTELLATION</span>
        </div>
        <span className="text-slate-400">CLICK ANY NODE TO INSPECT PRODUCT PROOF</span>
      </div>

      {/* Constellation Canvas Container */}
      <div className="relative w-full h-[420px] bg-[#05070D]/80 rounded-xl border border-white/5 overflow-hidden">
        {/* SVG Connecting Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {nodes.map((node) => {
            const isSelected = selectedNode?.id === node.id;
            return (
              <line
                key={node.id}
                x1="50%"
                y1="50%"
                x2={`${node.x}%`}
                y2={`${node.y}%`}
                stroke={isSelected ? "#00D9FF" : "rgba(255, 255, 255, 0.12)"}
                strokeWidth={isSelected ? "2.5" : "1"}
                strokeDasharray={isSelected ? "none" : "4 4"}
              />
            );
          })}
        </svg>

        {/* Central Core Node */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-slate-950 border-2 border-cyan-400 shadow-2xl shadow-cyan-500/40 flex flex-col items-center justify-center cursor-pointer z-20 group"
          onClick={() => setSelectedNode(null)}
        >
          <span className="text-[10px] font-mono text-cyan-400 font-bold">CORE</span>
          <span className="text-base font-extrabold text-white font-mono group-hover:text-cyan-300">
            ARVIND
          </span>
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping absolute -top-1 right-2"></span>
        </motion.div>

        {/* Orbiting Tech Nodes */}
        {nodes.map((node) => {
          const isSelected = selectedNode?.id === node.id;
          return (
            <motion.button
              key={node.id}
              whileHover={{ scale: 1.15 }}
              onClick={() => setSelectedNode(node)}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full font-mono text-xs font-bold border transition-all duration-200 shadow-lg ${
                isSelected
                  ? "bg-cyan-400 text-slate-950 border-white shadow-cyan-500/50 scale-110 z-30"
                  : node.category === "AI"
                  ? "bg-purple-950/80 text-purple-300 border-purple-500/40 hover:border-purple-400"
                  : node.category === "FULLSTACK"
                  ? "bg-cyan-950/80 text-cyan-300 border-cyan-500/40 hover:border-cyan-400"
                  : "bg-emerald-950/80 text-emerald-300 border-emerald-500/40 hover:border-emerald-400"
              }`}
            >
              {node.name}
            </motion.button>
          );
        })}
      </div>

      {/* Selected Node Proof Card */}
      {selectedNode ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-400/40 font-mono text-xs text-left flex items-center justify-between"
        >
          <div>
            <div className="text-cyan-400 font-bold text-sm">{selectedNode.name}</div>
            <div className="text-slate-300 mt-1 flex items-center space-x-2">
              <span className="text-slate-400">ACTIVELY UTILIZED IN:</span>
              <span className="font-extrabold text-white">
                {selectedNode.projects.join(" • ")}
              </span>
            </div>
          </div>
          <button
            onClick={() => setSelectedNode(null)}
            className="px-3 py-1 rounded bg-slate-900 border border-white/10 text-slate-400 hover:text-white"
          >
            Clear
          </button>
        </motion.div>
      ) : (
        <div className="text-xs font-mono text-slate-400">
          SELECT ANY NODE ON THE CONSTELLATION TO VERIFY REAL PROJECT USAGE
        </div>
      )}
    </div>
  );
};
