import React from "react";
import { Cpu, Radio, Zap, Volume2, Monitor, Navigation } from "lucide-react";

export const HardwareLab: React.FC = () => {
  return (
    <div className="p-6 rounded-2xl glass-panel border border-cyan-500/30 font-mono text-xs space-y-6 relative overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center space-x-2 text-amber-400 font-bold tracking-wider">
          <Zap className="w-4 h-4" />
          <span>HARDWARE SCHEMATIC // ESP32 VOICE ROBOT</span>
        </div>
        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px]">
          R&D PROTOTYPE
        </span>
      </div>

      {/* Hardware Node Diagram */}
      <div className="space-y-4 py-2">
        {/* Center Controller */}
        <div className="p-4 rounded-xl bg-slate-900 border-2 border-cyan-400 text-center relative group">
          <div className="flex items-center justify-center space-x-2 text-cyan-300 font-bold text-sm">
            <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>ESP32 MICROCONTROLLER</span>
          </div>
          <span className="text-[10px] text-slate-400 block mt-1">Dual-Core 240MHz • Wi-Fi + Bluetooth</span>
        </div>

        {/* Signal Lines */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3 rounded-lg bg-slate-950 border border-cyan-500/30 hover:border-cyan-400 transition">
            <div className="flex items-center justify-center space-x-1 text-cyan-400 font-bold mb-1">
              <Radio className="w-3.5 h-3.5" />
              <span>INMP441</span>
            </div>
            <div className="text-[10px] text-slate-400">I2S Mic</div>
            <div className="text-[9px] text-cyan-400/80 mt-1">Voice Input</div>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-purple-500/30 hover:border-purple-400 transition">
            <div className="flex items-center justify-center space-x-1 text-purple-400 font-bold mb-1">
              <Volume2 className="w-3.5 h-3.5" />
              <span>DFPlayer</span>
            </div>
            <div className="text-[10px] text-slate-400">UART Audio</div>
            <div className="text-[9px] text-purple-400/80 mt-1">TTS Playback</div>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-blue-500/30 hover:border-blue-400 transition">
            <div className="flex items-center justify-center space-x-1 text-blue-400 font-bold mb-1">
              <Monitor className="w-3.5 h-3.5" />
              <span>SSD1306</span>
            </div>
            <div className="text-[10px] text-slate-400">I2C OLED</div>
            <div className="text-[9px] text-blue-400/80 mt-1">Status Eyes</div>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-emerald-500/30 hover:border-emerald-400 transition">
            <div className="flex items-center justify-center space-x-1 text-emerald-400 font-bold mb-1">
              <Navigation className="w-3.5 h-3.5" />
              <span>HC-SR04</span>
            </div>
            <div className="text-[10px] text-slate-400">Ultrasonic</div>
            <div className="text-[9px] text-emerald-400/80 mt-1">Obstacle Sensing</div>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
        <span>COMM PROTOCOLS: I2S • I2C • UART</span>
        <span className="text-cyan-400">STATUS: BENCH TESTING</span>
      </div>
    </div>
  );
};
