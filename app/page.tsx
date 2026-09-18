'use client'
import { useState, useRef, useEffect } from 'react';

export default function Page(){
  const [mode,setMode]=useState('MAGCORE');
  const canvasRef=useRef<HTMLCanvasElement>(null);

  useEffect(()=>{
    const c=canvasRef.current!; const ctx=c.getContext('2d') as CanvasRenderingContext2D;
    let raf=0; const DPR=Math.min(window.devicePixelRatio||1,1.8);
    const resize=()=>{
      const p=c.parentElement as HTMLElement; if(!p) return;
      const s=p.clientWidth; c.width=s*DPR; c.height=s*DPR;
      c.style.width=s+'px'; c.style.height=s+'px';
      ctx.setTransform(DPR,0,0,DPR,0,0);
    }; resize(); window.addEventListener('resize',resize);

    const draw=(t:number)=>{
      const w=c.width/DPR, h=c.height/DPR, cx=w/2, cy=h/2, r=w*0.5;
      ctx.clearRect(0,0,w,h);
      const time=t*0.00018;

      // Base diamant blanc pur
      const base=ctx.createRadialGradient(cx-r*0.3,cy-r*0.3,r*0.15,cx,cy,r);
      base.addColorStop(0,'#ffffff');
      base.addColorStop(0.45,'#f0feff');
      base.addColorStop(1,'#a8efff');
      ctx.fillStyle=base; ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.fill();

      // Facettes diamant V10.1 - 240 triangles qui se croisent
      for(let i=0;i<240;i++){
        const a=(i/240)*Math.PI*2 + time*0.4;
        const a2=a+0.22 + Math.sin(i)*0.05;
        const r1=r*0.18; const r2=r*(0.92+Math.sin(i*1.7)*0.08);
        ctx.beginPath();
        ctx.moveTo(cx+Math.cos(a)*r1, cy+Math.sin(a)*r1);
        ctx.lineTo(cx+Math.cos(a)*r2, cy+Math.sin(a)*r2);
        ctx.lineTo(cx+Math.cos(a2)*r2, cy+Math.sin(a2)*r2);
        ctx.closePath();
        const bright = i%5===0;
        ctx.fillStyle= bright? 'rgba(255,255,255,0.22)' : 'rgba(0,210,255,0.07)';
        ctx.fill();
        ctx.strokeStyle= bright? 'rgba(255,255,255,0.9)' : 'rgba(0,200,255,0.28)';
        ctx.lineWidth= bright?0.5:0.18;
        ctx.stroke();
      }

      // Reflet central
      const glow=ctx.createRadialGradient(cx,cy,0,cx,cy,r*0.32);
      glow.addColorStop(0,'rgba(255,255,255,0.85)');
      glow.addColorStop(0.5,'rgba(255,255,255,0.12)');
      glow.addColorStop(1,'transparent');
      ctx.fillStyle=glow; ctx.beginPath(); ctx.arc(cx,cy,r*0.32,0,Math.PI*2); ctx.fill();

      raf=requestAnimationFrame(draw);
    };
    raf=requestAnimationFrame(draw);
    return()=>{cancelAnimationFrame(raf); window.removeEventListener('resize',resize);};
  },[]);

  return(
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative">
      <div className="absolute top-6 left-6 text-[10px] tracking-[0.32em] opacity-70">
        <div className="border-l-2 border-cyan-400/70 pl-3">STATUT : ACTIF</div>
        <div className="pl-3 mt-1 text-[9px] opacity-50">PUISSANCE : 100 % • STABLE</div>
      </div>

      <div className="relative w-[min(440px,80vw)] h-[min(440px,80vw)] rounded-full shadow-[0_0_80px_rgba(255,255,255,0.6),0_0_140px_rgba(0,220,255,0.35)]">
        <div className="w-full h-full rounded-full overflow-hidden bg-white">
          <canvas ref={canvasRef} className="w-full h-full block" />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[9px] tracking-[0.42em] text-cyan-900/60 font-bold">MAGMORE V10.1</span>
          <span className="text-[10px] tracking-[0.2em] mt-1.5 text-cyan-900/70 font-bold">NOYAU ACTIF 100%</span>
        </div>
      </div>

      <div className="absolute bottom-[7%] flex gap-3">
        {['CŒUR','PUR','MAGCORE'].map(m=>(
          <button key={m} onClick={()=>setMode(m)}
            className={`px-8 py-3 rounded-full text-[12px] tracking-[0.2em] border ${mode===m?'bg-white text-black border-white shadow-[0_0_40px_white]':'border-white/15 text-white/30'}`}>
            {m}
          </button>
        ))}
      </div>
    </main>
  );
}
