
'use client'
import { useState, useRef, useEffect } from 'react';
export default function Page(){
  const [mode,setMode]=useState('MAGCORE');
  const canvasRef=useRef<HTMLCanvasElement>(null);
  const mouse=useRef({x:0.5,y:0.5});
  const facets=useRef<{a:number,l:number}[]>([]);
  useEffect(()=>{
    facets.current=Array.from({length:120},(_,i)=>({a:(i/120)*Math.PI*2, l:0.25+Math.random()*0.75}));
  },[]);
  useEffect(()=>{
    const c=canvasRef.current!, ctx=c.getContext('2d')!;
    let raf=0; const DPR=Math.min(devicePixelRatio,2);
    function resize(){
      const r=c.getBoundingClientRect();
      c.width=r.width*DPR; c.height=r.height*DPR;
      ctx.setTransform(DPR,0,0,DPR,0,0);
    }
    resize(); addEventListener('resize',resize);
    function draw(t:number){
      const rect=c.getBoundingClientRect();
      const w=rect.width,h=rect.height,cx=w/2,cy=h/2,radius=Math.min(w,h)*0.42;
      ctx.clearRect(0,0,w,h);
      const halo=ctx.createRadialGradient(cx,cy,radius*0.8,cx,cy,radius*1.6);
      halo.addColorStop(0,'rgba(0,255,255,0.3)'); halo.addColorStop(1,'transparent');
      ctx.fillStyle=halo; ctx.beginPath(); ctx.arc(cx,cy,radius*1.6,0,Math.PI*2); ctx.fill();
      ctx.save(); ctx.beginPath(); ctx.arc(cx,cy,radius,0,Math.PI*2); ctx.clip();
      const g=ctx.createRadialGradient(cx-radius*0.3,cy-radius*0.3,radius*0.1,cx,cy,radius);
      g.addColorStop(0,'#fff'); g.addColorStop(0.4,'#d8ffff'); g.addColorStop(1,'#fff');
      ctx.fillStyle=g; ctx.fillRect(cx-radius,cy-radius,radius*2,radius*2);
      const time=t*0.0004, mx=(mouse.current.x-0.5)*0.4, my=(mouse.current.y-0.5)*0.4;
      facets.current.forEach(f=>{
        const ang=f.a+time+mx; const len=radius*f.l;
        ctx.beginPath(); ctx.moveTo(cx,cy);
        ctx.lineTo(cx+Math.cos(ang)*len, cy+Math.sin(ang+my)*len);
        ctx.strokeStyle='rgba(255,255,255,0.18)'; ctx.lineWidth=mode==='PUR'?1.2:mode==='CŒUR'?0.35:0.7; ctx.stroke();
      });
      for(let i=0;i<24;i++){
        const a=(i/24)*Math.PI*2+time*1.5, rr=radius*(0.65+Math.sin(time*2+i)*0.25);
        ctx.beginPath(); ctx.arc(cx+Math.cos(a)*rr, cy+Math.sin(a)*rr,1.2,0,Math.PI*2);
        ctx.fillStyle='rgba(255,255,255,0.8)'; ctx.fill();
      }
      ctx.restore();
      ctx.beginPath(); ctx.arc(cx,cy,radius,0,Math.PI*2); ctx.strokeStyle='rgba(255,255,255,0.9)'; ctx.lineWidth=1.5; ctx.stroke();
      raf=requestAnimationFrame(draw);
    }
    raf=requestAnimationFrame(draw);
    const move=(e:any)=>{const r=c.getBoundingClientRect(); const x=e.touches?e.touches[0].clientX:e.clientX; const y=e.touches?e.touches[0].clientY:e.clientY; mouse.current.x=(x-r.left)/r.width; mouse.current.y=(y-r.top)/r.height;};
    addEventListener('mousemove',move); addEventListener('touchmove',move);
    return()=>{cancelAnimationFrame(raf); removeEventListener('resize',resize); removeEventListener('mousemove',move); removeEventListener('touchmove',move);}
  },[mode]);
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <div className="relative w-[min(360px,80vw)] h-[min(360px,80vw)]"><canvas ref={canvasRef} className="absolute inset-0 w-full h-full rounded-full"/><div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"><span className="text-[10px] tracking-[0.5em] opacity-60">MAGCORE</span><span className="text-[32px] font-black">V12.1</span></div></div>
      <div className="mt-8 flex gap-2">{['CŒUR','PUR','MAGCORE'].map(m=><button key={m} onClick={()=>setMode(m)} className={`px-4 py-2 rounded-full text-xs border ${mode===m?'bg-white text-black':'border-white/20'}`}>{m}</button>)}</div>
      <p className="mt-4 text-[9px] opacity-30 tracking-[0.3em]">FIX GLITCH — FACETTES STABLES — {mode}</p>
    </main>
  )
}
