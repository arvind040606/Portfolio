import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SystemLoaderProps {
  onComplete: () => void;
}

export const SystemLoader: React.FC<SystemLoaderProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 300);
    const timer2 = setTimeout(() => setStep(2), 600);
    const timer3 = setTimeout(() => setStep(3), 900);
    const timer4 = setTimeout(() => setStep(4), 1200);
    const timer5 = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 300);
    }, 1500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#07090E] font-mono text-xs sm:text-sm text-cyan-400 p-6 select-none"
        >
          <div className="max-w-md w-full glass-panel rounded-xl p-6 border border-cyan-500/20 shadow-2xl shadow-cyan-500/10">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
                <span className="font-semibold tracking-wider text-slate-200">
                  ARVIND.OS // SYSTEM BOOT
                </span>
              </div>
              <span className="text-slate-500 text-xs">v2.4.0</span>
            </div>

            <div className="space-y-2.5 text-slate-300">
              <div className="text-cyan-300 font-semibold tracking-wide">
                &gt; INITIALIZING ARVIND.OS ...
              </div>

              {step >= 1 && (
                <div className="flex justify-between items-center text-slate-400">
                  <span>AI MODULES</span>
                  <span className="text-emerald-400 font-bold">[ OK ]</span>
                </div>
              )}

              {step >= 2 && (
                <div className="flex justify-between items-center text-slate-400">
                  <span>FEATURED PROJECTS</span>
                  <span className="text-emerald-400 font-bold">[ OK ]</span>
                </div>
              )}

              {step >= 3 && (
                <div className="flex justify-between items-center text-slate-400">
                  <span>CORE SYSTEM & TELEMETRY</span>
                  <span className="text-emerald-400 font-bold">[ OK ]</span>
                </div>
              )}

              {step >= 4 && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 pt-3 border-t border-white/10 text-center text-cyan-300 font-bold tracking-widest text-sm"
                >
                  WELCOME TO ARVIND.OS
                </motion.div>
              )}
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-800/80 h-1.5 rounded-full mt-5 overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: `${(step / 4) * 100}%` }}
                transition={{ duration: 0.3 }}
                className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
