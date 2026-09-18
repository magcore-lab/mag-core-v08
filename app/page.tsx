
'use client'
import { useRef, useEffect, useState } from 'react';

export default function Page(){
  const [mode,setMode]=useState('MAGCORE');
  const ref=useRef<HTMLCanvasElement>(null);

  useEffect(()=>{
    const c=ref.current!; const ctx=c.getContext('2d')!;
    let raf=0; const DPR=Math.min(devicePixelRatio||1,1.5);
    const resize=()=>{
      const p=c.parentElement as HTMLElement;
      const s=p.clientWidth; c.width=s*DPR; c.height=s*DPR;
      c.style.width=s+'px'; c.style.height=s+'px';
      ctx.setTransform(DPR,0,0,DPR,0,0);
    }; resize(); addEventListener('resize',resize);

    const draw=(t:number)=>{
      const w=c.width/DPR, cx=w/2, cy=w/2, r=w*0.48;
      ctx.clearRect(0,0,w,w);
      const time=t*0.00015;

      // Fond blanc diamant
      const g=ctx.createRadialGradient(cx-r*0.25,cy-r*0.25,r*0.2,cx,cy,r);
      g.addColorStop(0,'#ffffff'); g.addColorStop(0.6,'#eaffff'); g.addColorStop(1,'#a0e8ff');
      ctx.fillStyle=g; ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.fill();

      // 128 facettes triangulaires V10.1 - sans overlap
      for(let i=0;i<128;i++){
        const a1=(i/128)*Math.PI*2 + time;
        const a2=((i+1)/128)*Math.PI*2 + time;
        ctx.beginPath();
        ctx.moveTo(cx,cy);
        ctx.lineTo(cx+Math.cos(a1)*r, cy+Math.sin(a1)*r);
        ctx.lineTo(cx+Math.cos(a2)*r, cy+Math.sin(a2)*r);
        ctx.closePath();
        ctx.strokeStyle = i%2===0? 'rgba(255,255,255,0.85)' : 'rgba(0,200,255,0.32)';
        ctx.lineWidth = i%8===0? 0.6 : 0.18;
        ctx.stroke();
        if(i%8===0){
          ctx.fillStyle='rgba(255,255,255,0.08)'; ctx.fill();
        }
      }
      raf=requestAnimationFrame(draw);
    };
    raf=requestAnimationFrame(draw);
    return()=>{cancelAnimationFrame(raf); removeEventListener('resize',resize);};
  },[]);

  return(
    <main className="min-h-screen bg-black flex items-center justify-center relative">
      <div className="absolute top-6 left-6 text-[10px] tracking-[0.3em] text-white/60">
        <div className="border-l-2 border-cyan-400 pl-3">STATUT : ACTIF</div>
        <div className="pl-3 mt-1 text-[9px] opacity-60">PUISSANCE : 100% • STABLE</div>
      </div>

      <div className="relative w-[min(460px,82vw)] h-[min(460px,82vw)] rounded-full bg-white shadow-[0_0_90px_rgba(255,255,255,0.6)]">
        <div className="w-full h-full rounded-full overflow-hidden"><canvas ref={ref} className="w-full h-full block" /></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[9px] tracking-[0.4em] text-cyan-900/60 font-bold">MAGMORE V10.1</span>
          <span className="text-[10px] mt-1.5 text-cyan-900/70 font-bold tracking-[0.2em]">NOYAU ACTIF 100%</span>
        </div>
      </div>

      <div className="absolute bottom-6 flex gap-3">
        {['CŒUR','PUR','MAGCORE'].map(m=>(
          <button key={m} onClick={()=>setMode(m)} className={`px-8 py-3 rounded-full text-[12px] tracking-[0.2em] border ${mode===m?'bg-white text-black':'border-white/15 text-white/30'}`}>{m}</button>
        ))}
      </div>
    </main>
  );
}
