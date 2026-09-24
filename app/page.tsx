z"use client";
import { useRef, useEffect } from "react";

export default function Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dragRef = useRef({ drag: false });

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    let w = c.clientWidth;
    let h = c.clientHeight;
    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      w = c.clientWidth;
      h = c.clientHeight;
      c.width = w * dpr;
      c.height = h * dpr;
    };
    resize();
    window.addEventListener("resize", resize);
    const parts = Array.from({ length: 88 }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      r: Math.random() * 2 + 1.5,
    }));
    let t = 0;
    let raf = 0;
    const loop = () => {
      t += 0.016;
      ctx.clearRect(0, 0, w * dpr, h * dpr);
      ctx.save();
      ctx.scale(dpr, dpr);
      parts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${0.15 + Math.sin(t + p.x * 0.01) * 0.1})`;
        ctx.fill();
      });
      ctx.restore();
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const modules = ["LABORATOIRE","BAISSE","DROP","CFS","ENGINE","PROJECTS","STATUS","MULTIVERS"];

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden select-none">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-40" />
      <div className="relative z-10 p-6">
        <h1 className="text-4xl font-black tracking-tighter">MAG CORE V20.1 — DIAMOND EDITION</h1>
        <p className="opacity-60 mt-2 text-sm">FIELD_OS • Modules déplaçables • Mode Bureau GitHub Mobile OK</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          {modules.map((name) => (
            <a key={name} href={`/app/${name.toLowerCase()}`} className="group border border-white/20 p-6 hover:bg-white hover:text-black transition-all cursor-grab active:cursor-grabbing" draggable onDragStart={() => { dragRef.current.drag = true; }}>
              <div className="text-xs opacity-50">{name}</div>
              <div className="text-xl font-bold mt-2">{name}</div>
            </a>
          ))}
        </div>
        <div className="mt-20 text-xs opacity-30">mag-core-v08.vercel.app • Build V20.1 • Fixed: z typo + modules isolés</div>
      </div>
    </main>
  );
}
