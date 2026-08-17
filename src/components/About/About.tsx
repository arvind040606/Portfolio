import React from "react";
import { motion } from "framer-motion";
import { Sparkles, MapPin, GraduationCap, Cpu, Code2 } from "lucide-react";
import { arvindProfile } from "../../data/arvindProfile";

export const About: React.FC = () => {
  const metaDetails = [
    { label: "LOCATION", value: "BASED IN INDIA", icon: <MapPin className="w-3.5 h-3.5 text-cyan-400" /> },
    { label: "DEGREE", value: "CSE STUDENT", icon: <GraduationCap className="w-3.5 h-3.5 text-purple-400" /> },
    { label: "FOCUS", value: "AI + FULL-STACK", icon: <Cpu className="w-3.5 h-3.5 text-blue-400" /> },
    { label: "IDENTITY", value: "PRODUCT BUILDER", icon: <Code2 className="w-3.5 h-3.5 text-emerald-400" /> },
  ];

  return (
    <section id="about" className="py-32 relative overflow-hidden bg-[#05070E] border-t border-white/5">
      {/* Volumetric background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Section Index */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center space-x-3 text-cyan-400 font-mono text-xs tracking-[0.25em] uppercase font-bold mb-8"
        >
          <span className="text-2xl font-display font-black text-cyan-400">01</span>
          <span className="h-px w-8 bg-cyan-500/30" />
          <span>WHO IS ARVIND?</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Editorial Text Column */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white leading-tight uppercase"
            >
              Computer Science Engineering student building{" "}
              <span className="shimmer-text">AI-powered</span> and{" "}
              <span className="shimmer-violet">full-stack products</span> that solve practical problems.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="space-y-4 text-slate-300 font-sans text-base sm:text-lg leading-relaxed border-l-2 border-cyan-500/40 pl-6"
            >
              <p>
                I am <strong className="text-white">{arvindProfile.name}</strong>, a product-focused developer building software from first principles. My work spans local-first encrypted web applications, machine learning clinical diagnostic tools, and voice pipelines.
              </p>
              <p className="text-slate-400 text-sm sm:text-base">
                Rather than creating basic static websites or demo templates, I engineer deployed applications like <strong className="text-cyan-300">BunkMate</strong> (local-first AES privacy attendance engine) and <strong className="text-purple-300">CardioGuard AI</strong> (FastAPI + SHAP predictive clinical analytics).
              </p>
            </motion.div>

            {/* Small Detail Tags Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10"
            >
              {metaDetails.map((detail) => (
                <div key={detail.label} className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="flex items-center space-x-1.5 font-mono text-[10px] text-slate-400 tracking-wider">
                    {detail.icon}
                    <span>{detail.label}</span>
                  </div>
                  <div className="font-mono text-xs font-bold text-white tracking-wide">
                    {detail.value}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Character Silhouette / Editorial Visual Column */}
          <div className="lg:col-span-5 relative flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full h-[450px] relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-space-deep/90 flex flex-col justify-end p-8 group"
            >
              {/* Silhouette Backdrop Image */}
              <img
                src="/futuristic_developer_workspace.png"
                alt="Arvind Silhouette"
                className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity grayscale group-hover:grayscale-0 group-hover:opacity-80 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030308] via-[#030308]/60 to-transparent" />

              {/* Editorial Character Quote Overlay */}
              <div className="relative z-10 space-y-2">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-[10px] uppercase">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  <span>IDENTITY STATEMENT</span>
                </div>
                <h3 className="text-xl font-bold font-display text-white uppercase tracking-tight">
                  "BUILDING INTELLECTUAL PRODUCTS, NOT JUST CODE."
                </h3>
                <p className="font-mono text-xs text-slate-400">
                  ARVIND MADAAN // ARVIND.OS
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
