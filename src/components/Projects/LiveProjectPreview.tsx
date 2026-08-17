import React, { useState, useRef } from "react";
import { RefreshCw, ExternalLink, Maximize2, Smartphone, Monitor, ShieldCheck, Lock, Key, Copy, Check, Play } from "lucide-react";
import { DemoAccountConfig } from "../../config/demoAccounts";

interface LiveProjectPreviewProps {
  url: string;
  title: string;
  defaultMode?: "desktop" | "mobile";
  accentColor?: "cyan" | "emerald" | "blue";
  demoAccount?: DemoAccountConfig;
}

export const LiveProjectPreview: React.FC<LiveProjectPreviewProps> = ({
  url,
  title,
  defaultMode = "desktop",
  accentColor = "cyan",
  demoAccount,
}) => {
  const [deviceMode, setDeviceMode] = useState<"desktop" | "mobile">(defaultMode);
  const [isLoading, setIsLoading] = useState(true);
  const [key, setKey] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const colorStyles = {
    cyan: {
      border: "border-cyan-500/40",
      glow: "shadow-cyan-500/15",
      accentText: "text-cyan-400",
      bgActive: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
      demoBanner: "bg-cyan-950/90 border-cyan-500/40 text-cyan-200",
      buttonBg: "bg-cyan-400 text-slate-950 hover:bg-cyan-300",
    },
    emerald: {
      border: "border-emerald-500/40",
      glow: "shadow-emerald-500/15",
      accentText: "text-emerald-400",
      bgActive: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
      demoBanner: "bg-emerald-950/90 border-emerald-500/40 text-emerald-200",
      buttonBg: "bg-emerald-400 text-slate-950 hover:bg-emerald-300",
    },
    blue: {
      border: "border-blue-500/40",
      glow: "shadow-blue-500/15",
      accentText: "text-blue-400",
      bgActive: "bg-blue-500/20 text-blue-300 border-blue-500/40",
      demoBanner: "bg-blue-950/90 border-blue-500/40 text-blue-200",
      buttonBg: "bg-blue-500 text-white hover:bg-blue-400",
    },
  }[accentColor];

  const handleReload = () => {
    setIsLoading(true);
    setKey((prev) => prev + 1);
  };

  const handleCopyText = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const displayUrl = url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const loginId = demoAccount?.username || demoAccount?.email;

  return (
    <div
      className={`rounded-2xl bg-slate-950 border ${colorStyles.border} shadow-2xl ${colorStyles.glow} overflow-hidden font-mono transition-all duration-300 ${
        isFullscreen ? "fixed inset-4 z-50 flex flex-col bg-[#05070D]" : "w-full"
      }`}
    >
      {/* OFFICIAL PORTFOLIO DEMO ACCESS PANEL */}
      {demoAccount && (
        <div className={`p-3 border-b ${colorStyles.demoBanner} font-mono text-xs flex items-center justify-between`}>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${colorStyles.buttonBg} animate-pulse`}></div>
            <span className="font-extrabold tracking-wider text-white">DEMO SESSION ACTIVE</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                if (iframeRef.current) {
                  iframeRef.current.src = iframeRef.current.src;
                }
              }}
              className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-300 font-bold transition text-[10px]"
            >
              <RefreshCw className="w-3 h-3" />
              <span>RESET DEMO</span>
            </button>
            <a
              href={url.replace('/demo', '')}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center px-3 py-1 rounded-lg font-extrabold text-[10px] transition shadow-md ${colorStyles.buttonBg}`}
            >
              <ExternalLink className="w-3 h-3 mr-1.5" />
              <span>OPEN PROJECT</span>
            </a>
          </div>
        </div>
      )}

      {/* Futuristic Browser HUD Topbar */}
      <div className="bg-slate-900/90 border-b border-white/10 px-4 py-2.5 flex items-center justify-between gap-3 text-xs">
        {/* Window Controls */}
        <div className="flex items-center space-x-2 shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
        </div>

        {/* Address Bar */}
        <div className="flex-1 max-w-md bg-slate-950/80 rounded-xl px-3 py-1 border border-white/10 flex items-center space-x-2 text-[11px] text-slate-300 truncate">
          <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
          <span className="truncate text-slate-200">{displayUrl}</span>
        </div>

        {/* HUD Controls */}
        <div className="flex items-center space-x-2 shrink-0">
          {/* Device Switcher */}
          <div className="hidden sm:flex items-center bg-slate-950 rounded-lg p-0.5 border border-white/10 text-[10px]">
            <button
              onClick={() => setDeviceMode("desktop")}
              className={`px-2 py-1 rounded flex items-center space-x-1 font-bold transition ${
                deviceMode === "desktop" ? colorStyles.bgActive : "text-slate-400 hover:text-slate-200"
              }`}
              title="Desktop View"
            >
              <Monitor className="w-3 h-3" />
              <span>DESKTOP</span>
            </button>
            <button
              onClick={() => setDeviceMode("mobile")}
              className={`px-2 py-1 rounded flex items-center space-x-1 font-bold transition ${
                deviceMode === "mobile" ? colorStyles.bgActive : "text-slate-400 hover:text-slate-200"
              }`}
              title="Mobile View"
            >
              <Smartphone className="w-3 h-3" />
              <span>MOBILE</span>
            </button>
          </div>

          {/* Reload Button */}
          <button
            onClick={handleReload}
            className="p-1.5 rounded-lg bg-slate-950 border border-white/10 text-slate-400 hover:text-white transition"
            title="Reload Frame"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-cyan-400" : ""}`} />
          </button>

          {/* Pop-Out Live Window */}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg bg-slate-950 border border-white/10 text-slate-400 hover:text-white transition"
            title="Open in New Window"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-lg bg-slate-950 border border-white/10 text-slate-400 hover:text-white transition"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen View"}
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Frame Container */}
      <div
        className={`relative bg-[#05070D] flex justify-center items-center overflow-hidden ${
          isFullscreen ? "flex-1 w-full" : "h-[460px] sm:h-[520px]"
        }`}
      >
        {/* Skeleton Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-10 bg-slate-950/90 flex flex-col items-center justify-center space-y-3 font-mono text-xs text-slate-300">
            <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin"></div>
            <div className="text-cyan-400 font-bold">CONNECTING TO LIVE APP ENGINE...</div>
            <div className="text-[10px] text-slate-500">{url}</div>
          </div>
        )}

        {/* Real Live Website Iframe */}
        <div
          className={`h-full transition-all duration-300 ${
            deviceMode === "mobile"
              ? "w-[360px] max-w-full my-2 border-x-2 border-slate-800 rounded-2xl shadow-2xl overflow-hidden"
              : "w-full"
          }`}
        >
          <iframe
            key={key}
            ref={iframeRef}
            src={url}
            title={title}
            onLoad={() => setIsLoading(false)}
            className="w-full h-full border-0 bg-white"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
            loading="lazy"
          />
        </div>
      </div>

      {/* Footer Info Strip */}
      <div className="bg-slate-950 border-t border-white/10 px-4 py-1.5 flex items-center justify-between text-[10px] text-slate-400">
        <span className="flex items-center text-emerald-400 font-bold">
          <ShieldCheck className="w-3.5 h-3.5 mr-1" />
          LIVE INTERACTIVE APPLICATION
        </span>
        <span className="hidden sm:inline text-slate-500">INTERACT DIRECTLY INSIDE EMBEDDED FRAME</span>
      </div>
    </div>
  );
};
