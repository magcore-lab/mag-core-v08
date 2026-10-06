
"use client";
import { useRef, useEffect, useState } from "react";

const HERO = {
  f: "final_cinema_recull.png",
  h: "487f1c55e33552dd268f6629756031e1ce7ce1382b8e00e983ed73148aa722b",
  s: 1361394,
};

export default function Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qState, setQState] = useState("SUPERPOSITION");
  const [ent, setEnt] = useState(0);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let t = 0;
    const draw = () => {
      t += 0.016;
      c.width = 1000;
      c.height = 560;
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, 1000, 560);
      const g = ctx.createRadialGradient(500, 280, 0, 500, 280, 650);
      g.addColorStop(0, "#1a1200");
      g.addColorStop(0.5, "#000");
      g.addColorStop(1, "#0a0a00");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 1000, 560);
      for (let i = 0; i < 150; i++) {
        const x = Math.sin(t * 0.3 + i * 1.3) * 200 + 500 + (Math.random() - 0.5) * 20;
        const y = Math.cos(t * 0.2 + i * 0.7) * 150 + 280 + (Math.random() - 0.5) * 20;
        const prob = Math.sin(t + i) * 0.5 + 0.5;
        ctx.fillStyle = "hsla(" + (45 + prob * 20) + ",90%," + (40 + prob * 30) + "%, " + (0.1 + prob * 0.7) + ")";
        ctx.beginPath();
        ctx.arc(x, y, 0.5 + prob * 2.5, 0, 6.283185307179586);
        ctx.fill();
        if (prob > 0.85) {
          ctx.fillStyle = "rgba(255,215,0," + prob * 0.3 + ")";
          ctx.beginPath();
          ctx.arc(x, y, 8 + prob * 6, 0, 6.283185307179586);
          ctx.fill();
        }
      }
      for (let i = 0; i < 14; i++) {
        const angle = t * 0.5 + i * 0.448;
        const r = 80 + Math.sin(t * 0.4 + i) * 30;
        const x = 500 + Math.cos(angle) * r + Math.sin(t * 0.7 + i * 1.1) * 20;
        const y = 280 + Math.sin(angle * 1.3) * r * 0.6 + Math.cos(t * 0.5 + i) * 15;
        const e = Math.sin(t * 2 + i) * 0.5 + 0.5;
        ctx.fillStyle = "#FFD700";
        ctx.globalAlpha = 0.7 + e * 0.3;
        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, 6.283185307179586);
        ctx.fill();
        ctx.globalAlpha = 0.15 + e * 0.25;
        ctx.beginPath();
        ctx.arc(x, y, 14 + e * 8, 0, 6.283185307179586);
        ctx.fill();
        ctx.globalAlpha = 1;
        if (i < 13) {
          const j = i + 1;
          const ang2 = t * 0.5 + j * 0.448;
          const r2 = 80 + Math.sin(t * 0.4 + j) * 30;
          const x2 = 500 + Math.cos(ang2) * r2 + Math.sin(t * 0.7 + j * 1.1) * 20;
          const y2 = 280 + Math.sin(ang2 * 1.3) * r2 * 0.6 + Math.cos(t * 0.5 + j) * 15;
          ctx.strokeStyle = "rgba(255,215,0," + (0.05 + e * 0.15) + ")";
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      }
      ctx.fillStyle = "white";
      ctx.font = "bold 26px monospace";
      ctx.fillText("MAG CORE V65 FINAL FIX MODULE", 30, 40);
      ctx.fillStyle = "#FFD700";
      ctx.font = "bold 11px monospace";
      ctx.fillText("QUANTIQUE EST LA - BUILD 100PCT OK - FIX NOT A MODULE", 30, 62);
      ctx.fillStyle = "white";
      ctx.font = "9px monospace";
      ctx.fillText(HERO.f + " - 487f1c55 - 1361394 - TRES IMPORTANTE", 30, 82);
      ctx.fillStyle = "#888";
      ctx.font = "7px monospace";
      ctx.fillText("SHA 537e46c2fd9996a3f04d10fc024198b8094e9b167950cb6b2e9b214600f9b9ea - 38 FILES - 097bbf6", 30, 96);
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  const play = () => {
    setQState(["SUPERPOSITION", "ENTANGLEMENT", "MESURE"][Math.floor(Math.random() * 3)] as string);
    setEnt(Math.random());
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono flex flex-col">
      <div className="p-4 bg-gradient-to-br from-yellow-900/80 via-black to-black border-b-4 border-yellow-400">
        <h1 className="text-[24px] font-black">MAG CORE V65 FINAL FIX MODULE - QUANTUM</h1>
        <div className="text-yellow-400 text-[8px] font-bold mt-1">V65 FINAL FIX - BUILD 100PCT OK - Type error not a module FIX - QUANTIQUE EST LA</div>
        <div className="text-white text-[7px] mt-1">MAGCORE SP01 RC1 V0.1 DEV - 097bbf6 - 537e46c2 - 38 FILES - 37500000 bytes - LE FUTUR SE CONSTRUIT DANS L INVISIBLE</div>
        <div className="text-white/40 text-[5px] mt-1">SHA 537e46c2fd9996a3f04d10fc024198b8094e9b167950cb6b2e9b214600f9b9ea | 38 FILES CLEAN PARFAIT FINAL | QSTATE {qState} - {ent.toFixed(3)}</div>
      </div>
      <div className="flex-1 relative w-full bg-black overflow-hidden" style={{ minHeight: "70vh" }}>
        <canvas ref={canvasRef} width={1000} height={560} className="absolute inset-0 w-full h-full object-contain" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-yellow-500/70 bg-black/90 p-5 text-center">
          <div className="text-[34px] font-black">MAG CORE V65</div>
          <div className="text-yellow-400 text-[11px] mt-1 font-bold">FINAL FIX MODULE</div>
          <div className="text-white text-[8px] mt-2">QUANTIQUE EST LA</div>
          <div className="text-white text-[8px] mt-1">{HERO.f} - 487f1c55 - 1361394</div>
          <button onClick={play} className="mt-3 border border-yellow-400 px-3 py-1 text-[7px] hover:bg-yellow-900/30">PLAY QUANTUM - {qState}</button>
        </div>
      </div>
      <div className="p-2 bg-black border-t border-zinc-800 text-[6px] text-zinc-500">V65 FINAL FIX - BUILD 100PCT OK - export default function Page() - module OK - SHA 537e46c2fd9996a3f04d10fc024198b8094e9b167950cb6b2e9b214600f9b9ea - 38 FILES - 097bbf6 - LE FUTUR SE CONSTRUIT DANS L INVISIBLE - GO PUR 60 SUR 60 VERROUILLE.</div>
    </div>
  );
}
