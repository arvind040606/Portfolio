import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Bot, Mic, Cpu } from "lucide-react";
import { InteractiveNeuralNetwork } from "./InteractiveNeuralNetwork";
import { HardwareLab } from "./HardwareLab";

export const AILab: React.FC = () => {
  return (
    <section id="ai-lab" className="py-32 relative overflow-hidden bg-[#05070E] border-t border-white/5">
      {/* Background Volumetric Glow */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center space-x-3 text-cyan-400 font-mono text-xs tracking-[0.25em] uppercase font-bold"
          >
            <span className="text-2xl font-display font-black text-cyan-400">05</span>
            <span className="h-px w-8 bg-cyan-500/30" />
            <span>INTERACTIVE AI LABORATORY</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display text-white uppercase tracking-tight">
            AI <span className="shimmer-text">LAB.</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl font-sans">
            Experiments, neural network visualizers, systems, and hardware R&D prototypes. Move your cursor across the neural network graph to interact with active node connections.
          </p>
        </div>

        {/* Interactive Neural Network Visualizer */}
        <div className="mb-16">
          <InteractiveNeuralNetwork />
        </div>

        {/* Hardware & Voice R&D Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Experiment 01: Navi Voice Assistant */}
          <div className="rounded-3xl border border-white/10 bg-[#070A14] p-6 sm:p-8 space-y-6 shadow-2xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs">
                <span className="text-cyan-400 font-bold flex items-center">
                  <Mic className="w-4 h-4 mr-2" />
                  VOICE PIPELINE // NAVI R&D
                </span>
                <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-mono text-[10px] font-bold">
                  EXPERIMENTAL
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-bold font-display text-white uppercase">Navi Voice Assistant</h3>
                <p className="text-cyan-400 font-mono text-xs mt-1">
                  Continuous speech recognition & low-latency TTS memory engine
                </p>
              </div>

              <p className="text-slate-300 text-sm font-sans leading-relaxed">
                Navi is an experimental continuous voice interaction system designed to bridge real-time WebSockets, SpeechRecognition APIs, and contextual TTS audio synthesis.
              </p>

              <div className="grid grid-cols-2 gap-2 font-mono text-xs text-slate-300 pt-2">
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">▸ Continuous Listening</div>
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">▸ Memory State</div>
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">▸ WebSockets</div>
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">▸ Android Integration</div>
              </div>
            </div>
          </div>

          {/* Experiment 02: Hardware R&D */}
          <div className="rounded-3xl border border-white/10 bg-[#070A14] p-6 sm:p-8 space-y-6 shadow-2xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs">
                <span className="text-purple-400 font-bold flex items-center">
                  <Bot className="w-4 h-4 mr-2" />
                  EMBEDDED HARDWARE // ESP32 R&D
                </span>
                <span className="px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30 font-mono text-[10px] font-bold">
                  HARDWARE
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-bold font-display text-white uppercase">Autonomous ESP32 Voice Robot</h3>
                <p className="text-purple-400 font-mono text-xs mt-1">
                  Microcontroller I2S audio parsing & ultrasonic distance sensing
                </p>
              </div>

              <p className="text-slate-300 text-sm font-sans leading-relaxed">
                Hardware prototype integrating ESP32 microcontrollers with INMP441 microphones, OLED displays, and distance sensors for physical voice interaction.
              </p>
            </div>

            <HardwareLab />
          </div>
        </div>

      </div>
    </section>
  );
};
