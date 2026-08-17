import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on non-touch devices
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('a, button, input, textarea, select, [role="button"], [data-cursor], .interactive');
      if (interactive) {
        setIsHovered(true);
        const text = interactive.getAttribute('data-cursor');
        setCursorText(text || '');
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[2147483647] transition-transform duration-75 ease-out"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      <div
        className={`-translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all duration-300 pointer-events-none ${
          isHovered
            ? 'w-12 h-12 bg-[#00f0ff] text-black shadow-[0_0_25px_rgba(0,240,255,0.8)] scale-110'
            : 'w-3.5 h-3.5 bg-white/90 shadow-[0_0_10px_rgba(255,255,255,0.7)]'
        }`}
      >
        {isHovered && cursorText && (
          <span className="text-[9px] font-extrabold tracking-widest font-mono uppercase text-center leading-none px-1 pointer-events-none">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
};
