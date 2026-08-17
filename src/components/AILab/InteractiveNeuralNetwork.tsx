import React, { useEffect, useRef, useState } from "react";
import { Cpu, Zap, Activity } from "lucide-react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  layer: number;
  pulse: number;
}

export const InteractiveNeuralNetwork: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeInference, setActiveInference] = useState("LLM Multimodal Schedule Parsing");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = 360);

    const mouse = { x: width / 2, y: height / 2, active: false };

    // Generate Neural Network Nodes across layers
    const layerCount = 5;
    const nodesPerLayer = [6, 8, 10, 8, 4];
    const nodes: Node[] = [];

    for (let l = 0; l < layerCount; l++) {
      const layerX = (width / (layerCount + 1)) * (l + 1);
      const count = nodesPerLayer[l];
      for (let n = 0; n < count; n++) {
        const layerY = (height / (count + 1)) * (n + 1);
        nodes.push({
          x: layerX + (Math.random() - 0.5) * 30,
          y: layerY + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2.5 + 3,
          layer: l,
          pulse: Math.random() * Math.PI * 2,
        });
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 360;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    let animationId: number;

    const render = () => {
      animationId = requestAnimationFrame(render);
      ctx.clearRect(0, 0, width, height);

      // Draw background grid line details
      ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Update & Render connections between layer nodes
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];

        // Move nodes slightly
        n1.x += n1.vx;
        n1.y += n1.vy;
        n1.pulse += 0.03;

        if (n1.x < 30 || n1.x > width - 30) n1.vx *= -1;
        if (n1.y < 30 || n1.y > height - 30) n1.vy *= -1;

        // Check mouse proximity
        const dxMouse = mouse.x - n1.x;
        const dyMouse = mouse.y - n1.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];

          // Connect adjacent or next layers
          if (Math.abs(n2.layer - n1.layer) <= 1) {
            const dx = n2.x - n1.x;
            const dy = n2.y - n1.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 140) {
              const alpha = (1 - dist / 140) * 0.25;
              ctx.strokeStyle = distMouse < 120 ? `rgba(0, 240, 255, ${alpha * 2})` : `rgba(139, 92, 246, ${alpha})`;
              ctx.lineWidth = distMouse < 120 ? 1.5 : 1;
              ctx.beginPath();
              ctx.moveTo(n1.x, n1.y);
              ctx.lineTo(n2.x, n2.y);
              ctx.stroke();

              // Animated data packet along edge
              const packetPos = (Math.sin(n1.pulse) + 1) / 2;
              const px = n1.x + dx * packetPos;
              const py = n1.y + dy * packetPos;
              ctx.fillStyle = distMouse < 120 ? "#00F0FF" : "#A855F7";
              ctx.beginPath();
              ctx.arc(px, py, 1.8, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }

        // Draw node
        const isHovered = distMouse < 90;
        ctx.fillStyle = isHovered ? "#00F0FF" : n1.layer === 0 ? "#22D3EE" : n1.layer === 4 ? "#EC4899" : "#8B5CF6";
        ctx.beginPath();
        ctx.arc(n1.x, n1.y, isHovered ? n1.radius * 1.6 : n1.radius, 0, Math.PI * 2);
        ctx.fill();

        if (isHovered) {
          ctx.strokeStyle = "rgba(0, 240, 255, 0.5)";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(n1.x, n1.y, n1.radius * 2.8, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="rounded-3xl border border-white/10 bg-[#070A14] p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center space-x-3">
          <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
          <span className="font-mono text-xs font-bold text-cyan-300 tracking-widest uppercase">
            NEURAL NETWORK GRAPH // MOVE CURSOR TO INTERACT
          </span>
        </div>

        {/* Dynamic Model Selector Chips */}
        <div className="flex flex-wrap gap-2 text-[10px] font-mono">
          {["LLM Multimodal Schedule Parsing", "SHAP Feature Explainer", "Voice Pipeline Speech Recognition"].map((model) => (
            <button
              key={model}
              onClick={() => setActiveInference(model)}
              className={`px-3 py-1 rounded-full border transition ${
                activeInference === model
                  ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold"
                  : "bg-white/[0.03] border-white/10 text-slate-400 hover:text-slate-200"
              }`}
            >
              {model}
            </button>
          ))}
        </div>
      </div>

      {/* Canvas Viewport */}
      <div className="relative w-full h-[360px] rounded-2xl bg-[#030308] border border-white/10 overflow-hidden" data-cursor="NEURAL GRAPH">
        <canvas ref={canvasRef} className="w-full h-full block cursor-crosshair" />

        {/* Live Metrics HUD Badge */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] text-slate-400 bg-black/70 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
          <span className="text-cyan-400 font-bold flex items-center">
            <Zap className="w-3.5 h-3.5 mr-1.5" />
            MODEL INFERENCE: {activeInference}
          </span>
          <span className="text-emerald-400 font-bold">LATENCY: 42ms // ACTIVE NODES: 36</span>
        </div>
      </div>
    </div>
  );
};
