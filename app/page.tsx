'use client'
import { useState, useRef, useEffect } from 'react';

export default function Page(){
  const [mode,setMode]=useState('MAGCORE');
  const canvasRef=useRef<HTMLCanvasElement>(null);

  useEffect(()=>{
    const c=canvasRef.current!; const ctx=c.getContext('2d') as CanvasRenderingContext2D;
    let raf=0; const DPR=Math.min(window.devicePixelRatio||1,2);
    const resize=()=>{
      const p=c.parentElement as HTMLElement; if(!p) return;
      const s=p.clientWidth; c.width=s*DPR; c.height=s*DPR; c.style.width=s+'px'; c.style.height=s+'px';
      ctx.setTransform(DPR,0,0,DPR,0,0);
    }; resize(); addEventListener('resize',resize);

    const draw=(t:number)=>{
      const w=c.width/DPR, h=c.height/DPR, cx=w/2, cy=h/2, r=w*0.5;
      ctx.clearRect(0,0,w,h);
      const time=t*0.0002;

      // Base diamant photoréaliste centrée
      const g=ctx.createRadialGradient(cx-r*0.3,cy-r*0.3,r*0.15,cx,cy,r);
      g.addColorStop(0,'#fff'); g.addColorStop(0.4,'#eaffff'); g.addColorStop(0.7,'#8ef6ff'); g.addColorStop(1,'#fff');
      ctx.fillStyle=g; ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.fill();

      // Facettes V10.1 - TRIANGULAIRES SYMÉTRIQUES - CENTRÉES
      for(let i=0;i<180;i++){
        const a=(i/180)*Math.PI*2 + time;
        const a2=a+0.18;
        ctx.beginPath();
        ctx.moveTo(cx,cy);
        ctx.lineTo(cx+Math.cos(a)*r, cy+Math.sin(a)*r);
        ctx.lineTo(cx+Math.cos(a2)*r, cy+Math.sin(a2)*r);
        ctx.closePath();
        ctx.strokeStyle= i%3===0? 'rgba(255,255,255,0.9)' : 'rgba(0,210,255,0.35)';
        ctx.lineWidth= i%3===0? 0.6 : 0.22;
        ctx.stroke();
        if(i%9===0){ctx.fillStyle='rgba(255,255,255,0.12)'; ctx.fill();}
      }
      // Sparkles centraux symétriques
      for(let i=0;i<24;i++){
        const a=(i/24)*Math.PI*2 + time*1.5; const rr=r*(0.15+ (i%4)*0.18);
        ctx.beginPath(); ctx.arc(cx+Math.cos(a)*rr, cy+Math.sin(a)*rr, 1.1,0,Math.PI*2);
        ctx.fillStyle='rgba(255,255,255,0.95)'; ctx.fill();
      }
      raf=requestAnimationFrame(draw);
    };
    raf=requestAnimationFrame(draw);
    return()=>{cancelAnimationFrame(raf); removeEventListener('resize',resize);};
  },[]);

  return(
    <main className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-4 left-5 text-[10px] tracking-[0.32em]">
        <div className="border-l-2 border-cyan-400/70 pl-3 pt-1">STATUT : ACTIF</div>
        <div className="pl-3 mt-1 text-[9px] opacity-50">PUISSANCE : 100 % • STABLE</div>
        <div className="mt-3 text-[8px] opacity-25 tracking-widest">MAGMORE // V10.1 // NOYAU ACTIF // SYSTÈME EN LIGNE</div>
      </div>

      <div className="relative w-[min(560px,88vw)] h-[min(560px,88vw)] flex items-center justify-center">
        {/* ANNEAUX FIXES SYMÉTRIQUES - plus de rotate CSS qui wobble */}
        <div className="absolute inset-0 rounded-full" style={{border:'1px solid rgba(0,255,255,0.55)', boxShadow:'0 0 30px rgba(0,255,255,0.5)'}} />
        <div className="absolute w-[135%] h-[135%] rounded-full pointer-events-none" style={{border:'1px solid rgba(0,255,255,0.32)'}} />
        <div className="absolute w-[132%] h-[56%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none" style={{border:'1.6px solid rgba(100,255,255,0.9)', boxShadow:'0 0 40px rgba(0,255,255,0.85)'}} />
        <div className="absolute w-[124%] h-[52%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none" style={{border:'1px solid rgba(0,255,255,0.4)', transform:'translate(-50%,-50%) rotate(-18deg)'}} />

        {/* CERCLE BLANC */}
        <div className="relative w-[60%] h-[60%] rounded-full bg-white shadow-[0_0_90px_rgba(255,255,255,0.9),0_0_140px_rgba(0,255,255,0.65)] p-[2px]">
          <div className="w-full h-full rounded-full overflow-hidden bg-white relative">
            <canvas ref={canvasRef} className="w-full h-full block" />
          </div>
          {/* TEXTE DEVANT - CORRIGÉ */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[8px] tracking-[0.45em] text-cyan-900/70 font-bold drop-shadow-[0_0_8px_white]">MAGMORE V10.1</span>
            <span className="text-[9px] tracking-[0.2em] mt-1 text-cyan-900/70 font-bold drop-shadow-[0_0_8px_white]">NOYAU ACTIF 100%</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[6%] flex gap-3">
        {['CŒUR','PUR','MAGCORE'].map(m=>(
          <button key={m} onClick={()=>setMode(m)} className={`px-8 py-3 rounded-full text-[12px] tracking-[0.2em] border ${mode===m?'bg-white text-black border-white shadow-[0_0_40px_white]':'border-white/15 text-white/30'}`}>{m}</button>
        ))}
      </div>
    </main>
  );
}
