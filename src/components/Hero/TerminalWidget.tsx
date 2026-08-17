import React, { useState, useEffect } from "react";
import { Terminal, CheckCircle2, Cpu } from "lucide-react";

export const TerminalWidget: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([
    "ARVIND@DEV-STATION ~ % npm run build",
    "✔ Compiling TypeScript & React Modules...",
    "✔ Initializing AI Local Knowledge Engine...",
    "✔ Security: WebCrypto & Local-First Verification OK",
    "SYSTEM STATUS: ONLINE & OPERATIONAL",
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const timestamps = ["SYNCED", "STABLE", "ACTIVE", "READY"];
      const randState = timestamps[Math.floor(Math.random() * timestamps.length)];
      setLogs((prev) => {
        const next = [...prev];
        next[next.length - 1] = `SYSTEM STATUS: ${randState} (KERNEL ID #${Math.floor(
          1000 + Math.random() * 9000
        )})`;
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-2xl glass-panel border border-emerald-500/30 font-mono text-xs overflow-hidden shadow-xl shadow-emerald-500/10">
      <div className="bg-slate-950/90 border-b border-white/10 px-4 py-2 flex items-center justify-between text-[11px]">
        <div className="flex items-center space-x-2 text-emerald-400 font-bold">
          <Terminal className="w-3.5 h-3.5" />
          <span>REAL-TIME TERMINAL KERNEL</span>
        </div>
        <div className="flex items-center space-x-1 text-emerald-400 text-[10px]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>LIVE</span>
        </div>
      </div>

      <div className="p-4 bg-[#05070D]/95 space-y-1 text-slate-300 text-[11px] leading-relaxed">
        {logs.map((log, index) => (
          <div
            key={index}
            className={`${
              index === 0
                ? "text-cyan-300 font-bold"
                : index === logs.length - 1
                ? "text-emerald-400 font-extrabold"
                : "text-slate-400"
            }`}
          >
            {log}
          </div>
        ))}
      </div>
    </div>
  );
};
