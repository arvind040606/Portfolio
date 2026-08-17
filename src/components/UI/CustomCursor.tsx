import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch / mobile device
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768) {
      setIsTouchDevice(true);
      return;
    }

    const updateMousePosition = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      setPosition({ x, y });

      // Update global CSS variables for mask-reveal spotlight effect
      document.documentElement.style.setProperty("--mouse-x", `${x}px`);
      document.documentElement.style.setProperty("--mouse-y", `${y}px`);

      const target = e.target as HTMLElement;
      const cursorAttr = target.closest("[data-cursor]")?.getAttribute("data-cursor");

      if (cursorAttr) {
        setCursorText(cursorAttr);
        setIsHovered(true);
      } else if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("button") ||
        target.closest("a") ||
        target.getAttribute("role") === "button" ||
        target.classList.contains("interactive")
      ) {
        setCursorText("INTERACT");
        setIsHovered(true);
      } else {
        setCursorText(null);
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Central glowing dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-cyan-400 rounded-full pointer-events-none z-[999999] mix-blend-difference"
        animate={{
          x: position.x - 5,
          y: position.y - 5,
          scale: isHovered ? 0.6 : 1,
        }}
        transition={{ type: "spring", stiffness: 900, damping: 40, mass: 0.1 }}
      />

      {/* Outer interactive follower ring with optional label pill */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border pointer-events-none z-[999998] flex items-center justify-center backdrop-blur-[2px]"
        animate={{
          x: cursorText ? position.x - 48 : position.y && position.x - 20,
          y: cursorText ? position.y - 18 : position.y - 20,
          width: cursorText ? "auto" : "40px",
          height: cursorText ? "36px" : "40px",
          paddingLeft: cursorText ? "16px" : "0px",
          paddingRight: cursorText ? "16px" : "0px",
          borderColor: isHovered ? "rgba(0, 240, 255, 0.7)" : "rgba(255, 255, 255, 0.2)",
          backgroundColor: isHovered ? "rgba(0, 240, 255, 0.1)" : "rgba(255, 255, 255, 0.02)",
          boxShadow: isHovered ? "0 0 20px rgba(0, 240, 255, 0.2)" : "none",
        }}
        transition={{ type: "spring", stiffness: 450, damping: 30 }}
      >
        <AnimatePresence mode="wait">
          {cursorText && (
            <motion.span
              key={cursorText}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-[10px] font-mono tracking-widest uppercase font-bold text-cyan-300 whitespace-nowrap"
            >
              {cursorText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};
