import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { ArrowDown, FileText, Terminal, Cpu, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track mouse coordinates normalized (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Dynamic light coords in px for background spotlight
  const [lightPos, setLightPos] = useState({ x: 50, y: 50 });

  const springConfig = { damping: 25, stiffness: 90 };

  // =========================================================================
  // MULTI-PLANE PARALLAX MATH (Z-DEPTH SYSTEM)
  // Layer 0: Far Background (factor: 0.005, translateZ: -250px)
  // Layer 1: Architectural Grid & Giant Outline ARVIND (factor: 0.015, translateZ: -180px)
  // Layer 2: Main Headline & Typography (factor: 0.025, translateZ: -50px)
  // Layer 3: TRANSPARENT CUTOUT PORTRAIT (factor: 0.045, translateZ: 40px)
  // Layer 4: Floating Holographic Code Panel (factor: 0.070, translateZ: 100px)
  // Layer 5: Foreground Particles & UI (factor: 0.110, translateZ: 160px)
  // =========================================================================

  const bgX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);
  const bgY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-8, 8]), springConfig);

  const gridX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-18, 18]), springConfig);
  const gridY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-18, 18]), springConfig);

  const textX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-28, 28]), springConfig);
  const textY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-22, 22]), springConfig);

  const portraitX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-45, 45]), springConfig);
  const portraitY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-35, 35]), springConfig);
  const portraitRotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [2, -2]), springConfig);
  const portraitRotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), springConfig);

  const codeX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-70, 70]), springConfig);
  const codeY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-55, 55]), springConfig);
  const codeRotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);
  const codeRotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-9, 9]), springConfig);

  const fgX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-110, 110]), springConfig);
  const fgY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-90, 90]), springConfig);

  // Scroll parallax depth transformations
  const { scrollY } = useScroll();
  const textScrollY = useTransform(scrollY, [0, 700], [0, 240]);
  const portraitScrollY = useTransform(scrollY, [0, 700], [0, 120]);
  const portraitScale = useTransform(scrollY, [0, 600], [1, 0.94]);
  const codeScrollY = useTransform(scrollY, [0, 700], [0, 80]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { width, height, left, top } = containerRef.current.getBoundingClientRect();
    const relativeX = e.clientX - left;
    const relativeY = e.clientY - top;

    // Dynamic studio light spotlight coords
    const pctX = (relativeX / width) * 100;
    const pctY = (relativeY / height) * 100;
    setLightPos({ x: pctX, y: pctY });

    // Normalized -0.5 to 0.5 for parallax
    mouseX.set(relativeX / width - 0.5);
    mouseY.set(relativeY / height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen w-full bg-[#030304] overflow-hidden flex flex-col justify-between pt-28 pb-12 px-6 md:px-12 editorial-grain border-b border-white/10 [perspective:1200px] [transform-style:preserve-3d]"
    >
      {/* ==================================================================== */}
      {/* LAYER 0: FAR BACKGROUND & DYNAMIC STUDIO SPOTLIGHT (Z = -250px) */}
      {/* ==================================================================== */}
      <motion.div
        style={{
          x: bgX,
          y: bgY,
          transform: 'translateZ(-250px)',
          transformStyle: 'preserve-3d'
        }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        {/* Dynamic Studio Mouse Spotlight */}
        <div
          className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle 700px at ${lightPos.x}% ${lightPos.y}%, rgba(0, 240, 255, 0.13), rgba(138, 43, 226, 0.07) 55%, transparent 85%)`
          }}
        />

        {/* Ambient Deep Glow Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[600px] rounded-full bg-[#00f0ff]/10 blur-[150px] opacity-75" />
        <div className="absolute top-1/3 right-1/4 w-[550px] h-[550px] rounded-full bg-[#8a2be2]/12 blur-[160px]" />
      </motion.div>

      {/* ==================================================================== */}
      {/* LAYER 1: ARCHITECTURAL PERSPECTIVE GRID & LINES (Z = -180px) */}
      {/* ==================================================================== */}
      <motion.div
        style={{
          x: gridX,
          y: gridY,
          transform: 'translateZ(-180px)',
          transformStyle: 'preserve-3d'
        }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <div
          className="absolute inset-0 opacity-[0.06] filter blur-[0.5px]"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.9) 1px, transparent 1px)`,
            backgroundSize: '100px 100px',
            transform: 'perspective(600px) rotateX(30deg) translateY(-100px)',
            maskImage: 'linear-gradient(to bottom, transparent, rgba(0,0,0,1) 35%, transparent 90%)'
          }}
        />

        {/* Faint Oversized Outline Background Display Typography */}
        <div className="absolute -inset-x-20 top-1/2 -translate-y-1/2 text-center pointer-events-none select-none overflow-hidden opacity-15">
          <span className="font-syne text-[22vw] font-extrabold text-outline-thin tracking-tighter block uppercase leading-none filter blur-[1px]">
            ARVIND
          </span>
        </div>
      </motion.div>

      {/* Top Editorial Navigation Metadata Header */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-2 md:grid-cols-4 gap-4 pb-6 border-b border-white/10 text-[11px] font-mono tracking-widest text-neutral-400 uppercase">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
          <span className="text-white font-semibold">ARVIND MADAAN</span>
        </div>
        <div>CSE STUDENT • INDIA • 2026</div>
        <div className="hidden md:block">AI × FULL-STACK DEVELOPER</div>
        <div className="text-right text-[#00f0ff] font-bold">SPATIAL DIGITAL PORTFOLIO</div>
      </div>

      {/* ==================================================================== */}
      {/* MAIN SPATIAL SCENE CONTAINER */}
      {/* ==================================================================== */}
      <motion.div
        style={{ opacity: heroOpacity }}
        className="relative z-10 max-w-7xl mx-auto w-full my-auto py-8 [transform-style:preserve-3d]"
      >
        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-0 min-h-[520px]">

          {/* ================================================================== */}
          {/* LAYER 2: MIDGROUND MAIN TYPOGRAPHY (Z = -50px) */}
          {/* ================================================================== */}
          <motion.div
            style={{
              x: textX,
              y: textY,
              translateY: textScrollY,
              transform: 'translateZ(-50px)',
              transformStyle: 'preserve-3d'
            }}
            className="flex-1 z-10 space-y-6 max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#00f0ff]/30 bg-[#00f0ff]/5 text-[#00f0ff] font-mono text-xs tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.2)]">
              <Cpu className="w-3.5 h-3.5" />
              <span>COMPUTER SCIENCE ENGINEERING // 2026</span>
            </div>

            <h1 className="font-syne text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-[0.9] text-white drop-shadow-[0_15px_40px_rgba(0,0,0,0.9)]">
              AI <span className="text-outline-cyan font-light">×</span> FULL-STACK
            </h1>

            <p className="font-syne text-2xl sm:text-3xl font-bold tracking-tight text-neutral-200">
              BUILDING <span className="text-gradient-cyan">INTELLIGENT</span> PRODUCTS.
            </p>

            <p className="text-neutral-300 text-sm md:text-base max-w-lg leading-relaxed font-sans font-light">
              Engineering practical AI models, client-encrypted PWA tools, and explainable health analytics designed with spatial magazine precision.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#work"
                data-cursor="EXPLORE"
                className="px-8 py-3.5 rounded-full bg-white text-black font-mono font-bold text-xs tracking-widest hover:bg-[#00f0ff] hover:text-black transition-all duration-300 shadow-[0_15px_35px_rgba(255,255,255,0.3)] hover:shadow-[0_0_35px_rgba(0,240,255,0.6)] transform hover:-translate-y-0.5"
              >
                EXPLORE WORK ↓
              </a>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="RESUME"
                className="px-8 py-3.5 rounded-full bg-transparent border border-white/20 text-white font-mono font-bold text-xs tracking-widest hover:border-[#00f0ff] hover:text-[#00f0ff] transition-all duration-300 flex items-center gap-2 backdrop-blur-sm"
              >
                <FileText className="w-4 h-4 text-[#00f0ff]" />
                <span>DOWNLOAD RESUME</span>
              </a>
            </div>
          </motion.div>

          {/* ================================================================== */}
          {/* LAYER 3: TRANSPARENT CUTOUT PORTRAIT SUBJECT (Z = +40px) */}
          {/* USES NEW TRANSPARENT PNG DIRECTLY (NO PHOTO BOX / CARD CONTAINER) */}
          {/* ================================================================== */}
          <div className="relative flex-1 flex justify-center lg:justify-end items-center w-full max-w-xl min-h-[480px] sm:min-h-[580px] [transform-style:preserve-3d]">

            {/* Soft Cyan & Purple Studio Glow Halo behind torso */}
            <div className="absolute w-[360px] h-[450px] sm:w-[420px] sm:h-[520px] rounded-full bg-gradient-to-tr from-[#00f0ff]/30 via-[#8a2be2]/20 to-transparent blur-3xl opacity-90 pointer-events-none" />

            {/* Soft Floor Ambient Drop Shadow */}
            <div className="absolute -bottom-8 w-[320px] h-[30px] rounded-full bg-black/90 blur-2xl pointer-events-none" />

            {/* Seamless Transparent Portrait Subject Container */}
            <motion.div
              style={{
                x: portraitX,
                y: portraitY,
                translateY: portraitScrollY,
                scale: portraitScale,
                rotateX: portraitRotateX,
                rotateY: portraitRotateY,
                transform: 'translateZ(40px)',
                transformStyle: 'preserve-3d',
              }}
              data-cursor="ARVIND"
              className="relative z-20 w-[310px] sm:w-[400px] lg:w-[460px] max-h-[580px] flex items-end justify-center filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.95)]"
            >
              {/* Pure Transparent Cutout Image (arvind.png) */}
              <img
                src="/arvind.png"
                alt="Arvind Madaan — AI & Full-Stack Developer"
                className="w-full h-auto object-contain filter contrast-[108%] brightness-[98%] transition-transform duration-500"
              />

              {/* Dynamic Cyan Edge Rim Light Overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen"
                style={{
                  background: 'radial-gradient(circle at 30% 25%, rgba(0, 240, 255, 0.35), transparent 60%)'
                }}
              />

              {/* Minimalist Tech Status Chip */}
              <div className="absolute top-4 left-0 font-mono text-[9px] text-[#00f0ff] tracking-widest bg-black/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#00f0ff]/40 shadow-xl flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-ping" />
                <span>ARVIND MADAAN</span>
              </div>
            </motion.div>

            {/* ================================================================ */}
            {/* LAYER 4: FLOATING HOLOGRAPHIC CODE PANEL (Z = +100px, OVERLAPS PORTRAIT) */}
            {/* ================================================================ */}
            <motion.div
              style={{
                x: codeX,
                y: codeY,
                translateY: codeScrollY,
                rotateX: codeRotateX,
                rotateY: codeRotateY,
                transform: 'translateZ(100px)',
                transformStyle: 'preserve-3d',
              }}
              data-cursor="CODE"
              className="absolute bottom-6 left-0 sm:left-4 z-30 p-4.5 rounded-2xl bg-[#080a10]/95 backdrop-blur-2xl border border-[#00f0ff]/50 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(0,240,255,0.25)] space-y-2.5 font-mono max-w-[270px] hidden sm:block"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[10px]">
                <div className="flex items-center gap-1.5 text-[#00f0ff] font-bold">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>CRYPTO ENGINE</span>
                </div>
                <span className="text-emerald-400">AES-256 GCM</span>
              </div>
              <div className="text-[10px] text-neutral-300 leading-tight space-y-1.5">
                <p className="text-purple-400">const salt = crypto.getRandomValues();</p>
                <p className="text-[#00f0ff]">const key = await derivePBKDF2(pin);</p>
                <p className="text-emerald-400">// Client-side zero-knowledge store</p>
              </div>
            </motion.div>

          </div>
        </div>
      </motion.div>

      {/* ==================================================================== */}
      {/* LAYER 5: FOREGROUND ATMOSPHERE & BLURRED PARTICLES (Z = +160px) */}
      {/* PASSES PHYSICALLY IN FRONT OF PORTRAIT AND FLOATING PANELS */}
      {/* ==================================================================== */}
      <motion.div
        style={{
          x: fgX,
          y: fgY,
          transform: 'translateZ(160px)',
          transformStyle: 'preserve-3d'
        }}
        className="absolute inset-0 pointer-events-none z-40 overflow-hidden"
      >
        <div className="w-2.5 h-2.5 rounded-full bg-[#00f0ff] absolute top-1/3 left-1/4 filter blur-[1px] opacity-80 animate-pulse" />
        <div className="w-3 h-3 rounded-full bg-purple-400 absolute top-1/2 right-1/3 filter blur-[2px] opacity-70" />
        <div className="w-2 h-2 rounded-full bg-white absolute bottom-1/3 left-1/2 filter blur-[1px] opacity-90 animate-ping" />
      </motion.div>

      {/* LAYER 5: BOTTOM STATS & SCROLL INDICATOR */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
        <div className="flex flex-col">
          <span className="font-syne text-3xl font-extrabold text-white">04+</span>
          <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">MAJOR PROJECTS</span>
        </div>

        <div className="flex flex-col">
          <span className="font-syne text-3xl font-extrabold text-[#00f0ff]">10+</span>
          <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">TECHNOLOGIES</span>
        </div>

        <div className="flex flex-col">
          <span className="font-syne text-3xl font-extrabold text-white">100%</span>
          <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">LOCAL-FIRST & AI INTEGRATED</span>
        </div>

        <div
          className="flex items-center justify-end gap-3 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          onClick={() => {
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="font-mono text-xs tracking-widest">SCROLL TO DISCOVER</span>
          <ArrowDown className="w-4 h-4 text-[#00f0ff] animate-bounce" />
        </div>
      </div>
    </section>
  );
};
