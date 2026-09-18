
'use client'
import { useState, useRef, useEffect } from 'react';

export default function Page(){
  const [mode,setMode]=useState('MAGCORE');
  const canvasRef=useRef<HTMLCanvasElement>(null);

  useEffect(()=>{
    const c=canvasRef.current!;
    const ctx=c.getContext('2d') as CanvasRenderingContext2D;
    let raf=0;
    const DPR=Math.min(devicePixelRatio||1,1.8);

    const resize=()=>{
      const p=c.parentElement as HTMLElement; if(!p) return;
      const s=p.clientWidth; c.width=s*DPR; c.height=s*DPR;
      c.style.width=s+'px'; c.style.height=s+'px';
      ctx.setTransform(DPR,0,0,DPR,0,0);
    };
    resize(); window.addEventListener('resize',resize);

    const draw=(t:number)=>{
      const w=c.width/DPR, h=c.height/DPR, cx=w/2, cy=h/2, r=w*0.49;
      ctx.clearRect(0,0,w,h);
      const time=t*0.00012;

      // Base
      const base=ctx.createRadialGradient(cx-r*0.2,cy-r*0.25,r*0.2,cx,cy,r);
      base.addColorStop(0,'#ffffff');
      base.addColorStop(0.5,'#e8feff');
      base.addColorStop(1,'#8ae8ff');
      ctx.fillStyle=base; ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.fill();

      // DIAMANT - facettes triangulaires réalistes
      const facets=64;
      for(let i=0;i<facets;i++){
        const a1=(i/facets)*Math.PI*2 + time;
        const a2=((i+1)/facets)*Math.PI*2 + time;
        const aMid=(a1+a2)/2;

        // Triangle extérieur
        ctx.beginPath();
        ctx.moveTo(cx,cy);
        ctx.lineTo(cx+Math.cos(a1)*r, cy+Math.sin(a1)*r);
        ctx.lineTo(cx+Math.cos(aMid)*r*0.62, cy+Math.sin(aMid)*r*0.62);
        ctx.closePath();
        ctx.fillStyle = i%2===0? 'rgba(255,255,255,0.18)' : 'rgba(0,200,255,0.10)';
        ctx.fill();
        ctx.strokeStyle = i%4===0? 'rgba(255,255,255,0.85)' : 'rgba(0,210,255,0.22)';
        ctx.lineWidth = i%4===0? 0.55 : 0.18;
        ctx.stroke();

        // Éclat sur arête
        if(i%8===0){
          ctx.beginPath();
          ctx.arc(cx+Math.cos(aMid)*r*0.92, cy+Math.sin(aMid)*r*0.92, 1.2,0,Math.PI*2);
          ctx.fillStyle='rgba(255,255,255,0.95)';
          ctx.fill();
        }
      }

      // Halo interne doux
      const inner=ctx.createRadialGradient(cx,cy,0,cx,cy,r*0.3);
      inner.addColorStop(0,'rgba(255,255,255,0.9)');
      inner.addColorStop(1,'transparent');
      ctx.fillStyle=inner; ctx.beginPath(); ctx.arc(cx,cy,r*0.3,0,Math.PI*2); ctx.fill();

      raf=requestAnimationFrame(draw);
    };
    raf=requestAnimationFrame(draw);
    return()=>{cancelAnimationFrame(raf); window.removeEventListener('resize',resize);};
  },[]);

  return(
    <main className="min-h-screen bg-black flex items-center justify-center relative">
      <div className="absolute top-6 left-6 text-[10px] tracking-[0.32em] text-white/70">
        <div className="border-l-2 border-cyan-400/70 pl-3">STATUT : ACTIF</div>
        <div className="pl-3 mt-1 text-[9px] opacity-50">PUISSANCE : 100 % • STABLE</div>
      </div>

      {/* SEUL LE NOYAU - SANS CERCLES */}
      <div className="relative w-[min(460px,82vw)] h-[min(460px,82vw)] rounded-full shadow-[0_0_90px_rgba(255,255,255,0.7),0_0_160px_rgba(0,220,255,0.4)]">
        <div className="w-full h-full rounded-full overflow-hidden bg-white">
          <canvas ref={canvasRef} className="w-full h-full block" />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[9px] tracking-[0.42em] text-cyan-900/60 font-bold">MAGMORE V10.1</span>
          <span className="text-[10px] tracking-[0.2em] mt-1.5 text-cyan-900/70 font-bold">NOYAU ACTIF 100%</span>
        </div>
      </div>

      <div className="absolute bottom-[6%] flex gap-3">
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
