'use client'
import { useState, useRef, useEffect } from 'react';

export default function Page(){
  const [mode,setMode]=useState('MAGCORE');
  const canvasRef=useRef<HTMLCanvasElement>(null);

  useEffect(()=>{
    const c=canvasRef.current!;
    const ctx=c.getContext('2d') as CanvasRenderingContext2D;
    let raf=0;
    const DPR=Math.min(window.devicePixelRatio||1,2);

    const resize=()=>{
      const p=c.parentElement as HTMLElement; if(!p) return;
      const s=Math.min(p.clientWidth,p.clientHeight);
      c.width=s*DPR; c.height=s*DPR; c.style.width=s+'px'; c.style.height=s+'px';
      ctx.setTransform(DPR,0,0,DPR,0,0);
    };
    resize();
    window.addEventListener('resize',resize);

    const draw=(t:number)=>{
      const w=c.width/DPR, h=c.height/DPR, cx=w/2, cy=h/2, r=w*0.5;
      ctx.clearRect(0,0,w,h);
      const time=t*0.00025;

      // Noyau pur - dégradé blanc / cyan V10.1
      const g=ctx.createRadialGradient(cx-r*0.25,cy-r*0.25,r*0.15,cx,cy,r);
      g.addColorStop(0,'#ffffff');
      g.addColorStop(0.35,'#e6ffff');
      g.addColorStop(0.65,'#7de9ff');
      g.addColorStop(1,'#ffffff');
      ctx.fillStyle=g;
      ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.fill();

      // Facettes diamant - rayonnantes depuis centre
      for(let i=0;i<360;i++){
        const ang=(i/360)*Math.PI*2 + time*0.15;
        const len = r*(0.35 + (i%7)*0.09);
        ctx.beginPath();
        ctx.moveTo(cx,cy);
        ctx.lineTo(cx+Math.cos(ang)*len, cy+Math.sin(ang)*len);
        const isMajor = i%12===0;
        ctx.strokeStyle = isMajor
         ? 'rgba(255,255,255,0.85)'
          : mode==='PUR'? 'rgba(255,255,255,0.35)' : 'rgba(0,210,255,0.55)';
        ctx.lineWidth = isMajor? 0.8 : 0.28;
        ctx.stroke();
      }

      // Cœur lumineux
      const inner=ctx.createRadialGradient(cx,cy,0,cx,cy,r*0.35);
      inner.addColorStop(0,'rgba(255,255,255,0.9)');
      inner.addColorStop(0.3,'rgba(160,240,255,0.35)');
      inner.addColorStop(1,'transparent');
      ctx.fillStyle=inner;
      ctx.beginPath(); ctx.arc(cx,cy,r*0.35,0,Math.PI*2); ctx.fill();

      raf=requestAnimationFrame(draw);
    };
    raf=requestAnimationFrame(draw);
    return()=>{cancelAnimationFrame(raf); window.removeEventListener('resize',resize);};
  },[mode]);

  return(
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* HUD MINIMAL - garde V10.1 */}
      <div className="absolute top-6 left-6 text-[10px] tracking-[0.32em] leading-relaxed opacity-80">
        <div className="border-l-2 border-cyan-400/80 pl-3">STATUT : ACTIF</div>
        <div className="pl-3 mt-1 text-[9px] opacity-60">PUISSANCE : 100 % • STABLE</div>
        <div className="mt-4 text-[8px] opacity-30 tracking-[0.25em]">MAGMORE // V10.1 // NOYAU ACTIF // SYSTÈME EN LIGNE</div>
      </div>

      {/* SEUL LE NOYAU */}
      <div className="relative w-[min(420px,78vw)] h-[min(420px,78vw)] rounded-full bg-white shadow-[0_0_80px_rgba(255,255,255,0.85),0_0_140px_rgba(0,220,255,0.5)] p-[1px]">
        <div className="w-full h-full rounded-full overflow-hidden bg-white relative">
          <canvas ref={canvasRef} className="w-full h-full block" />
        </div>
        {/* Texte centré DANS le noyau */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[10px] tracking-[0.42em] text-cyan-900/60 font-bold">MAGMORE V10.1</span>
          <span className="text-[11px] tracking-[0.22em] mt-1.5 text-cyan-900/70 font-bold">NOYAU ACTIF 100%</span>
        </div>
      </div>

      <div className="absolute bottom-[7%] flex gap-3">
        {['CŒUR','PUR','MAGCORE'].map(m=>(
          <button key={m} onClick={()=>setMode(m)}
            className={`px-8 py-3 rounded-full text-[12px] tracking-[0.22em] border transition-all
            ${mode===m?'bg-white text-black border-white shadow-[0_0_45px_white]':'border-white/15 text-white/35 hover:border-white/30'}`}>
            {m}
          </button>
        ))}
      </div>
    </main>
  );
}
