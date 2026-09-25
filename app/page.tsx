"use client";
import { useRef, useEffect, useState } from "react";
const MODULES = ["LABORATOIRE","BAISSE","DROP","CFS","ENGINE","PROJECTS","STATUS"] as const;
export default function Page(){
  const canvasRef=useRef<HTMLCanvasElement>(null);
  const [order,setOrder]=useState<string[]>([...MODULES]);
  const dragIndex=useRef<number|null>(null);
  useEffect(()=>{
    const c=canvasRef.current; if(!c) return;
    const ctx=c.getContext("2d"); if(!ctx) return;
    let w=c.clientWidth,h=c.clientHeight;
    const dpr=window.devicePixelRatio||1;
    const resize=()=>{w=c.clientWidth;h=c.clientHeight;c.width=w*dpr;c.height=h*dpr;};
    resize(); window.addEventListener("resize",resize);
    const parts=Array.from({length:156}).map(()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-0.5)*0.4,vy:(Math.random()-0.5)*0.4,r:Math.random()*1.2+0.6}));
    let raf=0;
    const loop=()=>{ctx.clearRect(0,0,w*dpr,h*dpr);ctx.save();ctx.scale(dpr,dpr);parts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle="rgba(255,255,255,0.18)";ctx.fill();});ctx.restore();raf=requestAnimationFrame(loop);};
    loop();
    return()=>{cancelAnimationFrame(raf);window.removeEventListener("resize",resize);};
  },[]);
  const onDragStart=(i:number)=>{dragIndex.current=i;};
  const onDragOver=(e:React.DragEvent,i:number)=>{e.preventDefault();const from=dragIndex.current;if(from===null||from===i)return;const next=[...order];const [moved]=next.splice(from,1);next.splice(i,0,moved);setOrder(next);dragIndex.current=i;};
  return(
    <main className="relative min-h-screen bg-[#000000] text-white overflow-hidden select-none font-mono">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-[0.25]" />
      <div className="relative z-10 p-5 md:p-8">
        <div className="flex justify-between items-start"><div><h1 className="text-[22px] md:text-[32px] font-black tracking-[-0.04em] leading-none">MAG CORE V21.0 — QUANTIQUE PURGE</h1><p className="text-[9px] tracking-[0.35em] opacity-40 mt-2">CORE LOCK 0.62/0.78/0.92 • FOV34 Z10.2 R0.62 • DEZOOM LOCK • MULTIVERS BANNI • BLACK EDITION SUPPRIMEE</p></div><div className="text-[8px] opacity-30 border border-white/10 px-2 py-1">FIELD_OS • 156P • TSL • NEXT15</div></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-10 max-w-6xl">{order.map((name,i)=>(<div key={name} draggable onDragStart={()=>onDragStart(i)} onDragOver={(e)=>onDragOver(e,i)} onDragEnd={()=>{dragIndex.current=null}} className="group border border-white/[0.12] bg-white/[0.01] hover:bg-white hover:text-black transition-all duration-300 p-5 cursor-grab active:cursor-grabbing"><div className="flex justify-between"><span className="text-[8px] opacity-40">{String(i+1).padStart(2,"0")}</span><span className="text-[8px] opacity-20 group-hover:opacity-40">DRAG</span></div><div className="text-[18px] font-bold tracking-tighter mt-3">{name}</div><div className="text-[8px] opacity-30 mt-2 tracking-widest">{name==="LABORATOIRE"?"CORE_SCENE":name==="BAISSE"?"FLOW":name==="DROP"?"CODE_RAIN":name==="CFS"?"FILTRATION":name==="ENGINE"?"UNIFIED_BUS":name==="PROJECTS"?"BRIDGE":"MONITOR"}</div></div>))}</div>
        <div className="mt-14 flex gap-4 text-[8px] opacity-20 tracking-widest"><span>mag-core-v08.vercel.app</span><span>•</span><span>V21.0 PURGE</span><span>•</span><span>7 MODULES ISOLES</span><span>•</span><span>0% ERROR</span></div>
      </div>
    </main>
  );
}