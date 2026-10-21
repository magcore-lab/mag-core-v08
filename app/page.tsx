
"use client";
import { useRef, useEffect, useState } from "react";

export default function Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qState, setQState] = useState("TOROIDAL CONTAINMENT");
  const [ent, setEnt] = useState(92.4);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let t = 0;
    const draw = () => {
      t += 0.016;
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, 1000, 560);
      // 150 étoiles probabilité - bleu retro-plexus
      for (let i = 0; i < 150; i++) {
        const x = 500 + Math.sin(t * 0.3 + i * 0.13) * 480 + Math.cos(t * 0.7 + i) * 20;
        const y = 280 + Math.sin(t * 0.5 + i * 0.17) * 260 + Math.cos(t * 0.4 + i * 0.23) * 20;
        const prob = Math.sin(t + i * 0.1) * 0.5 + 0.5;
        ctx.fillStyle = "rgba(0,212,255," + prob * 0.5 + ")";
        ctx.beginPath();
        ctx.arc(x, y, 8 + prob * 6, 0, 6.28);
        ctx.fill();
      }
      // 14 drones - plexus bleu
      for (let i = 0; i < 14; i++) {
        const angle = t * 0.5 + i * 0.44;
        const r = 80 + Math.sin(t * 0.4 + i) * 30;
        const x = 500 + Math.cos(angle) * r + Math.sin(t * 0.7 + i * 1.1) * 20;
        const y = 280 + Math.sin(angle * 1.3) * r * 0.6 + Math.cos(t * 0.5 + i) * 15;
        const e = Math.sin(t * 2 + i) * 0.5 + 0.5;
        ctx.fillStyle = "#00D4FF";
        ctx.globalAlpha = 0.7 + e * 0.3;
        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, 6.28);
        ctx.fill();
        ctx.globalAlpha = 0.15 + e * 0.25;
        ctx.beginPath();
        ctx.arc(x, y, 14 + e * 8, 0, 6.28);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 24px monospace";
      ctx.fillText("MAG CORE V19 BLACK EDITION RETRO-PLEXUS", 20, 40);
      ctx.fillStyle = "#00D4FF";
      ctx.font = "bold 14px monospace";
      ctx.fillText("DEZOOM -30% - ENERGY MASTERED MODE ON - POWER 92.4% STABILIZER", 20, 65);
      ctx.fillStyle = "#888888";
      ctx.font = "9px monospace";
      ctx.fillText("TOROIDAL CONTAINMENT - 33 VISUALS - 120 DRONES - COHERENT LAB QUANTIQUE", 20, 82);
      ctx.fillStyle = "#444444";
      ctx.font = "7px monospace";
      ctx.fillText("V19 BLACK EDITION - RETRO-PLEXUS COHERENT - BUILD 100PCT OK - FOND NOIR FIX - 38 FILES", 20, 96);
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div style={{ background: "black", minHeight: "100vh" }}>
      <canvas ref={canvasRef} width={1000} height={560} style={{ width: "100%" }} />
    </div>
  );
}
