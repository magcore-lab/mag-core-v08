
'use client'
import { useState, useRef, useEffect } from 'react';
export default function Page(){
  const [mode,setMode]=useState('MAGCORE');
  const canvasRef=useRef<HTMLCanvasElement>(null);
  const mouse=useRef({x:0.5,y:0.5});
  const facets=useRef<{a:number,l:number}[]>([]);
  useEffect(()=>{facets.current=Array.from({length:140},(_,i)=>({a:(i/140)*Math.PI*2,l:0.35+Math.random()*0.65}));},[]);
  useEffect(()=>{
    const c=canvasRef.current!; const ctx=c.getContext('2d')!; let raf=0;
    const DPR=Math.min(window.devicePixelRatio||1,2);
    function resize(){
      const p=c.parentElement!; const s=Math.min(p.clientWidth,p.clientHeight);
      c.width=s*DPR; c.height=s*DPR; c.style.width=s+'px'; c.style.height=s+'px';
      ctx.setTransform(DPR,0,0,DPR,0,0);
    }
    resize(); window.addEventListener('resize',resize);
    function draw(t:number){
      const w=c.width/DPR, h=c.height/DPR, cx=w/2, cy=h/2, r=Math.min(w,h)*0.42;
      ctx.clearRect(0,0,w,h);
      const halo=ctx.createRadialGradient(cx,cy,r*0.9,cx,cy,r*1.7);
      halo.addColorStop(0,mode==='PUR'?'rgba(255,255,255,0.32)':'rgba(0,255,255,0.32)'); halo.addColorStop(1,'transparent');
      ctx.fillStyle=halo; ctx.beginPath(); ctx.arc(cx,cy,r*1.7,0,Math.PI*2); ctx.fill();
      ctx.save(); ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.clip();
      const g=ctx.createRadialGradient(cx-r*0.3,cy-r*0.3,r*0.15,cx,cy,r);
      g.addColorStop(0,'#fff'); g.addColorStop(0.2,'#eaffff'); g.addColorStop(0.5,'#8ef6ff'); g.addColorStop(1,'#fff');
      ctx.fillStyle=g; ctx.fillRect(cx-r,cy-r,r*2,r*2);
      const time=t*0.00035, mx=(mouse.current.x-0.5)*0.6, my=(mouse.current.y-0.5)*0.6;
      facets.current.forEach(f=>{
        const ang=f.a+time+mx; const len=r*f.l*(mode==='PUR'?1.1:mode==='CŒUR'?0.65:0.9);
        ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx+Math.cos(ang)*len, cy+Math.sin(ang+my)*len);
        ctx.strokeStyle=mode==='PUR'?'rgba(255,255,255,0.9)':mode==='CŒUR'?'rgba(0,180,180,0.5)':'rgba(0,220,220,0.7)';
        ctx.lineWidth=mode==='PUR'?1.3:mode==='CŒUR'?0.45:0.85; ctx.stroke();
      });
      for(let i=0;i<28;i++){const a=(i/28)*Math.PI*2+time*1.8; const rr=r*(0.6+Math.sin(time*2+i)*0.28); ctx.beginPath(); ctx.arc(cx+Math.cos(a)*rr, cy+Math.sin(a)*rr,1.2,0,Math.PI*2); ctx.fillStyle=mode==='PUR'?'white':'rgba(0,255,255,0.9)'; ctx.fill();}
      ctx.restore();
      ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.strokeStyle=mode==='PUR'?'white':'rgba(0,255,255,0.95)'; ctx.lineWidth=1.5; ctx.stroke();
      raf=requestAnimationFrame(draw);
    }
    raf=requestAnimationFrame(draw);
    const move=(e:any)=>{const rc=c.getBoundingClientRect(); const x=e.touches?e.touches[0].clientX:e.clientX; const y=e.touches?e.touches[0].clientY:e.clientY; mouse.current.x=(x-rc.left)/rc.width; mouse.current.y=(y-rc.top)/rc.height;};
    window.addEventListener('mousemove',move); window.addEventListener('touchmove',move,{passive:true});
    return()=>{cancelAnimationFrame(raf); window.removeEventListener('resize',resize); window.removeEventListener('mousemove',move); window.removeEventListener('touchmove',move);}
  },[mode]);
  return(
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <div className="relative w-[min(380px,82vw)] h-[min(380px,82vw)]"><canvas ref={canvasRef} className="absolute inset-0 rounded-full" /><div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"><span className="text-[10px] tracking-[0.6em] opacity-50">MAGCORE</span><span className="text-[36px] font-black">V12.3</span></div></div>
      <div className="mt-10 flex gap-3">{['CŒUR','PUR','MAGCORE'].map(m=><button key={m} onClick={()=>setMode(m)} className={`px-6 py-2.5 rounded-full text-[11px] tracking-[0.2em] border ${mode===m?'bg-white text-black border-white shadow-[0_0_35px_white]':'border-white/20 text-white/50'}`}>{m}</button>)}</div>
      <p className="mt-6 text-[9px] opacity-25 tracking-[0.35em]">V12.3 FIX DEFINITIF - {mode}</p>
    </main>
  )
}
