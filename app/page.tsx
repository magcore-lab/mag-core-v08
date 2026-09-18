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
      const rot=t*0.00012;

      // Base
      const base=ctx.createRadialGradient(cx-r*0.25,cy-r*0.3,r*0.2,cx,cy,r);
      base.addColorStop(0,'#ffffff'); base.addColorStop(0.5,'#eaffff'); base.addColorStop(1,'#7de3ff');
      ctx.fillStyle=base; ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.fill();

      // VRAI DIAMANT : 64 facettes triangulaires croisées
      const N=64;
      for(let i=0;i<N;i++){
        const a1=(i/N)*Math.PI*2 + rot;
        const a2=((i+1)/N)*Math.PI*2 + rot;
        const am=(a1+a2)/2;

        // Facette principale
        ctx.beginPath();
        ctx.moveTo(cx,cy);
        ctx.lineTo(cx+Math.cos(a1)*r, cy+Math.sin(a1)*r);
        ctx.lineTo(cx+Math.cos(am)*r*0.58, cy+Math.sin(am)*r*0.58);
        ctx.closePath();

        // Couleur selon angle pour effet 3D
        const light = Math.cos(am+rot*2)*0.5+0.5;
        ctx.fillStyle = `rgba(${220+light*35},${240+light*15},255,${0.12+light*0.18})`;
        ctx.fill();
        ctx.strokeStyle = light>0.7? 'rgba(255,255,255,0.92)' : `rgba(0,210,255,${0.25+light*0.2})`;
        ctx.lineWidth = light>0.7? 0.7 : 0.2;
        ctx.stroke();

        // Facette secondaire pour profondeur
        if(i%2===0){
          ctx.beginPath();
          ctx.moveTo(cx+Math.cos(a1)*r, cy+Math.sin(a1)*r);
          ctx.lineTo(cx+Math.cos(a2)*r, cy+Math.sin(a2)*r);
          ctx.lineTo(cx+Math.cos(am)*r*0.58, cy+Math.sin(am)*r*0.58);
          ctx.closePath();
          ctx.fillStyle=`rgba(255,255,255,${0.05+light*0.07})`;
          ctx.fill();
        }
      }

      // Éclats
      for(let i=0;i<8;i++){
        const a=(i/8)*Math.PI*2 + rot*1.5; const rr=r*0.82;
        ctx.beginPath(); ctx.arc(cx+Math.cos(a)*rr, cy+Math.sin(a)*rr, 1.5,0,Math.PI*2);
        ctx.fillStyle='rgba(255,255,255,0.95)'; ctx.shadowColor='white'; ctx.shadowBlur=8; ctx.fill(); ctx.shadowBlur=0;
      }

      raf=requestAnimationFrame(draw);
    };
    raf=requestAnimationFrame(draw);
    return()=>{cancelAnimationFrame(raf); removeEventListener('resize',resize);};
  },[]);

  return(
    <main className="min-h-screen bg-black flex items-center justify-center">
      <div className="absolute top-6 left-6 text-[10px] tracking-[0.32em] text-white/60">
        <div className="border-l-2 border-cyan-400 pl-3">STATUT : ACTIF</div>
      </div>

      <div className="relative w-[min(480px,84vw)] h-[min(480px,84vw)] rounded-full shadow-[0_0_90px_rgba(255,255,255,0.6),0_0_160px_rgba(0,220,255,0.4)]">
        <div className="w-full h-full rounded-full overflow-hidden"><canvas ref={ref} className="w-full h-full block" /></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[9px] tracking-[0.45em] text-cyan-900/60 font-bold drop-shadow-[0_0_10px_white]">MAGMORE V10.1</span>
          <span className="text-[10px] mt-1.5 text-cyan-900/70 font-bold tracking-[0.22em] drop-shadow-[0_0_10px_white]">NOYAU ACTIF 100%</span>
        </div>
      </div>
    </main>
  );
}
