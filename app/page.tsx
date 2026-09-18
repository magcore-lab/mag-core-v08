'use client'
import { useState, useRef, useEffect } from 'react';

export default function Page(){
  const [mode,setMode]=useState('MAGCORE');
  const canvasRef=useRef<HTMLCanvasElement>(null);
  const mouse=useRef({x:0.5,y:0.5});
  const facets=useRef<{a:number,l:number,d:number}[]>([]);

  useEffect(()=>{
    facets.current=Array.from({length:1200},(_,i)=>({
      a:(i/1200)*Math.PI*2 + (Math.random()-0.5)*0.2,
      l:0.18+Math.random()*0.82,
      d:0.6+Math.random()*0.6
    }));
  },[]);

  useEffect(()=>{
    const c=canvasRef.current!;
    const ctx=c.getContext('2d') as CanvasRenderingContext2D;
    let raf=0;
    const DPR=Math.min(window.devicePixelRatio||1,2);

    const resize=()=>{
      const p=c.parentElement as HTMLElement;
      if(!p) return;
      const s=Math.min(p.clientWidth,p.clientHeight);
      c.width=s*DPR; c.height=s*DPR;
      c.style.width=s+'px'; c.style.height=s+'px';
      ctx.setTransform(DPR,0,0,DPR,0,0);
    };
    resize();
    window.addEventListener('resize',resize);

    const draw=(t:number)=>{
      const w=c.width/DPR, h=c.height/DPR;
      const cx=w/2, cy=h/2, r=Math.min(w,h)*0.38;
      ctx.clearRect(0,0,w,h);
      const time=t*0.00022;
      const mx=(mouse.current.x-0.5)*0.4;
      const my=(mouse.current.y-0.5)*0.4;

      ctx.save();
      ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.clip();
      const g=ctx.createRadialGradient(cx-r*0.35,cy-r*0.35,r*0.18,cx,cy,r);
      g.addColorStop(0,'#ffffff');
      g.addColorStop(0.22,'#eaffff');
      g.addColorStop(0.52,'#8ef6ff');
      g.addColorStop(0.88,'#ffffff');
      g.addColorStop(1,'#7ae6ff');
      ctx.fillStyle=g;
      ctx.fillRect(cx-r,cy-r,r*2,r*2);

      facets.current.forEach((f,i)=>{
        const ang=f.a+time+mx;
        const len=r*f.l*f.d;
        const inner=r*0.12;
        ctx.beginPath();
        ctx.moveTo(cx+Math.cos(ang)*inner, cy+Math.sin(ang+my)*inner);
        ctx.lineTo(cx+Math.cos(ang)*len, cy+Math.sin(ang+my)*len);
        const bright=i%9===0;
        ctx.strokeStyle=bright
         ? 'rgba(255,255,255,0.95)'
          : mode==='PUR'? 'rgba(255,255,255,0.35)' : 'rgba(0,230,255,0.42)';
        ctx.lineWidth=bright?0.9:0.32;
        ctx.stroke();
        if(bright){
          ctx.beginPath();
          ctx.arc(cx+Math.cos(ang)*len, cy+Math.sin(ang+my)*len,1,0,Math.PI*2);
          ctx.fillStyle='rgba(255,255,255,1)';
          ctx.fill();
        }
      });
      ctx.restore();

      ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2);
      ctx.strokeStyle='rgba(255,255,255,0.9)'; ctx.lineWidth=1.2; ctx.stroke();
      raf=requestAnimationFrame(draw);
    };
    raf=requestAnimationFrame(draw);

    const move=(e:any)=>{
      const rc=c.getBoundingClientRect();
      const cx=e.touches?e.touches[0].clientX:e.clientX;
      const cy=e.touches?e.touches[0].clientY:e.clientY;
      mouse.current.x=(cx-rc.left)/rc.width;
      mouse.current.y=(cy-rc.top)/rc.height;
    };
    window.addEventListener('mousemove',move);
    window.addEventListener('touchmove',move,{passive:true} as any);
    return()=>{
      cancelAnimationFrame(raf);
      window.removeEventListener('resize',resize);
      window.removeEventListener('mousemove',move);
      window.removeEventListener('touchmove',move);
    };
  },[mode]);

  return(
    <main className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-3 left-3 text-[9px] tracking-[0.3em] opacity-70">
        <div className="border-l border-t border-cyan-400/60 pl-3 pt-2">STATUS: ACTIVE</div>
        <div className="pl-3 text-[7px] opacity-50 mt-1">POWER: 100% • STABLE</div>
        <div className="mt-2 text-[7px] opacity-30">MAGMORE // V10.1 // NOYAU ACTIF // SYSTEM ONLINE</div>
      </div>
      <div className="absolute bottom-3 left-3 text-[8px] opacity-60">CORE ENERGY 100%</div>
      <div className="absolute bottom-3 right-3 text-[8px] opacity-60 text-right">TEMP: 342K<br/>OPTIMAL</div>

      <div className="relative w-[min(520px,88vw)] h-[min(520px,88vw)] flex items-center justify-center">
        <div className="absolute w-[108%] h-[108%] rounded-full border border-cyan-300/30" />
        <div className="absolute w-[128%] h-[46%] rounded-full border border-cyan-200/70" style={{transform:'rotate(18deg)'}} />
        <div className="absolute w-[128%] h-[42%] rounded-full border border-cyan-100/40" style={{transform:'rotate(-14deg)'}} />
        <div className="relative w-[70%] h-[70%] rounded-full overflow-hidden bg-white shadow-[0_0_80px_rgba(0,255,255,0.5)]">
          <canvas ref={canvasRef} className="w-full h-full block" />
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[9px] tracking-[0.5em] text-cyan-900/60">MAGMORE V10.1</span>
            <span className="text-[10px] tracking-[0.2em] mt-1 text-cyan-900/80">NOYAU ACTIF 100%</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[10%] flex gap-3">
        {['CŒUR','PUR','MAGCORE'].map(m=>(
          <button key={m} onClick={()=>setMode(m)} className={`px-6 py-2 rounded-full text-[11px] tracking-widest border ${mode===m?'bg-white text-black border-white':'border-white/20 text-white/40'}`}>{m}</button>
        ))}
      </div>
    </main>
  );
}
