'use client'
import { useState, useRef, useEffect } from 'react';

export default function Page(){
  const [mode,setMode]=useState('MAGCORE');
  const canvasRef=useRef<HTMLCanvasElement>(null);
  const mouse=useRef({x:0.5,y:0.5});
  const facets=useRef<{a:number,l:number}[]>([]);

  useEffect(()=>{
    facets.current=Array.from({length:1800},(_,i)=>({
      a:(i/1800)*Math.PI*2 + (Math.random()-0.5)*0.18,
      l:0.2+Math.random()*0.8
    }));
  },[]);

  useEffect(()=>{
    const c=canvasRef.current!;
    const ctx=c.getContext('2d') as CanvasRenderingContext2D;
    let raf=0; const DPR=Math.min(window.devicePixelRatio||1,2);
    const resize=()=>{
      const p=c.parentElement as HTMLElement; if(!p) return;
      const s=Math.min(p.clientWidth,p.clientHeight);
      c.width=s*DPR; c.height=s*DPR; c.style.width=s+'px'; c.style.height=s+'px';
      ctx.setTransform(DPR,0,0,DPR,0,0);
    };
    resize(); window.addEventListener('resize',resize);
    const draw=(t:number)=>{
      const w=c.width/DPR, h=c.height/DPR, cx=w/2, cy=h/2, r=Math.min(w,h)*0.42;
      ctx.clearRect(0,0,w,h);
      const time=t*0.00025, mx=(mouse.current.x-0.5)*0.5, my=(mouse.current.y-0.5)*0.5;

      ctx.save(); ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.clip();
      const g=ctx.createRadialGradient(cx-r*0.35,cy-r*0.35,r*0.2,cx,cy,r);
      g.addColorStop(0,'#ffffff'); g.addColorStop(0.3,'#eaffff'); g.addColorStop(0.6,'#9ef0ff'); g.addColorStop(1,'#ffffff');
      ctx.fillStyle=g; ctx.fillRect(cx-r,cy-r,r*2,r*2);
      facets.current.forEach((f,i)=>{
        const ang=f.a+time+mx; const len=r*f.l;
        ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx+Math.cos(ang)*len, cy+Math.sin(ang+my)*len);
        const bright=i%11===0;
        ctx.strokeStyle=bright?'rgba(255,255,255,0.9)': mode==='PUR'?'rgba(255,255,255,0.4)':'rgba(0,220,255,0.48)';
        ctx.lineWidth=bright?0.85:0.38; ctx.stroke();
        if(bright){ctx.beginPath(); ctx.arc(cx+Math.cos(ang)*len, cy+Math.sin(ang+my)*len,1.1,0,Math.PI*2); ctx.fillStyle='white'; ctx.fill();}
      });
      ctx.restore();
      ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.strokeStyle='rgba(255,255,255,0.9)'; ctx.lineWidth=1.1; ctx.stroke();
      raf=requestAnimationFrame(draw);
    };
    raf=requestAnimationFrame(draw);
    const move=(e:any)=>{const rc=c.getBoundingClientRect(); const x=e.touches?e.touches[0].clientX:e.clientX; const y=e.touches?e.touches[0].clientY:e.clientY; mouse.current.x=(x-rc.left)/rc.width; mouse.current.y=(y-rc.top)/rc.height;};
    window.addEventListener('mousemove',move); window.addEventListener('touchmove',move,{passive:true} as any);
    return()=>{cancelAnimationFrame(raf); window.removeEventListener('resize',resize); window.removeEventListener('mousemove',move); window.removeEventListener('touchmove',move);};
  },[mode]);

  return(
    <main className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-4 left-5 text-[10px] tracking-[0.32em] opacity-80">
        <div className="border-l-2 border-t border-cyan-400/70 pl-3 pt-2">STATUT : ACTIF</div>
        <div className="pl-3 mt-1 text-[9px] opacity-50">PUISSANCE : 100 % • STABLE</div>
        <div className="mt-3 text-[8px] tracking-[0.25em] opacity-30">MAGMORE // V10.1 // NOYAU ACTIF // SYSTÈME EN LIGNE</div>
      </div>

      <div className="relative w-[min(560px,90vw)] h-[min(560px,90vw)] flex items-center justify-center">
        {/* ANNEAUX V10.1 RESTAURÉS - visibles */}
        <div className="absolute w-[96%] h-[96%] rounded-full" style={{border:'1.5px solid rgba(0,255,255,0.55)', boxShadow:'0 0 25px rgba(0,255,255,0.7), inset 0 0 25px rgba(0,255,255,0.3)'}} />
        <div className="absolute w-[138%] h-[52%] rounded-full" style={{border:'1.5px solid rgba(120,255,255,0.9)', boxShadow:'0 0 35px rgba(0,255,255,0.9)', transform:'rotate(18deg)'}} />
        <div className="absolute w-[132%] h-[48%] rounded-full" style={{border:'1px solid rgba(0,255,255,0.5)', boxShadow:'0 0 20px rgba(0,255,255,0.5)', transform:'rotate(-16deg)', opacity:0.8}} />
        <div className="absolute w-[88%] h-[88%] rounded-full bg-cyan-500/10 blur-[1px]" style={{boxShadow:'0 0 90px rgba(0,255,255,0.4)'}} />

        {/* NOYAU DIAMANT + CERCLE BLANC */}
        <div className="relative w-[68%] h-[68%] rounded-full bg-white shadow-[0_0_100px_rgba(255,255,255,0.9),0_0_140px_rgba(0,255,255,0.6)] flex items-center justify-center">
          <div className="absolute inset-[14%] rounded-full overflow-hidden">
            <canvas ref={canvasRef} className="w-full h-full block" />
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mix-blend-overlay">
            <span className="text-[9px] tracking-[0.45em] text-cyan-950/70 font-bold">MAGMORE V10.1</span>
            <span className="text-[10px] tracking-[0.2em] mt-1 text-cyan-900/70 font-bold">NOYAU ACTIF 100%</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[8%] flex gap-3">
        {['CŒUR','PUR','MAGCORE'].map(m=>(
          <button key={m} onClick={()=>setMode(m)} className={`px-8 py-3 rounded-full text-[12px] tracking-[0.2em] border transition-all ${mode===m?'bg-white text-black border-white shadow-[0_0_40px_white]':'border-white/20 text-white/40 hover:border-cyan-400/50'}`}>{m}</button>
        ))}
      </div>
    </main>
  );
}
