"use client";
import { useEffect, useRef, useState } from "react";
/* V46 OPTIMISE ULTRA - ANALYSE OPTIMISEE - 20:14 y2nac0mq 59,8 Ko/s 39pc - FIX DEFINITIF 50 LIGNES - BUILD 100pc
SHA 537e46c2fd9996a3f04d10fc024198b8094e9b167950cb6b2e9b214600f9b9ea | 38 FILES | 097bbf6 | Jean-Christophe Achille | LE FUTUR SE CONSTRUIT DANS L INVISIBLE
*/
const CDN1="https://cdn.jsdelivr.net/gh/magcore-lab/mag-core-v08@main/MAGCORE_SP01_RC1/2.%20visuals/";
const CDN2="https://raw.githubusercontent.com/magcore-lab/mag-core-v08/main/MAGCORE_SP01_RC1/2.%20visuals/";
const HERO={f:"final_cinema_recull.png",h:"487f1c55",s:1361394};
const COVER={f:"cover.png.jpg",h:"61195c",s:206205};
const MAGMA={f:"magma_core_realistic_transparent.png",h:"7d4b7c6b",s:2728704};
const LIST=[HERO,COVER,MAGMA];
export default function Page(){
  const [i,setI]=useState(0);const [cdn,setCdn]=useState(0);const [err,setErr]=useState(false);
  const canvasRef=useRef<HTMLCanvasElement>(null);const dRef=useRef<{x:number;y:number;vx:number;vy:number}[]|null>(null);const raf=useRef<number>(0);
  if(dRef.current===null){dRef.current=Array.from({length:18},()=>({x:Math.random()*100,y:Math.random()*100,vx:(Math.random()-0.5)*0.25,vy:(Math.random()-0.5)*0.25}));}
  useEffect(()=>{
    const c=canvasRef.current;if(!c)return;const ctx=c.getContext("2d");if(!ctx)return;const d=dRef.current!;
    const r=()=>{
      const w=innerWidth,h=innerHeight;c.width=w;c.height=h;ctx.clearRect(0,0,w,h);
      d.forEach(p=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>100){p.vx*=-1;p.x=Math.max(0,Math.min(100,p.x));}if(p.y<0||p.y>100){p.vy*=-1;p.y=Math.max(0,Math.min(100,p.y));}ctx.fillStyle="#FFD700";ctx.beginPath();ctx.arc((p.x/100)*w,(p.y/100)*h,1.8,0,6.283);ctx.fill();});
      raf.current=requestAnimationFrame(r);
    };r();return()=>{cancelAnimationFrame(raf.current);};
  },[]);
  const cur=LIST[i];const src=(cdn===0?CDN1:CDN2)+encodeURIComponent(cur.f);
  return(
    <div className="min-h-screen bg-black text-white font-mono">
      <div className="relative w-full h-[80vh] bg-black border-b-4 border-yellow-400 overflow-hidden">
        {!err?(
          <img src={src} alt={cur.f} className="absolute inset-0 w-full h-full object-contain bg-black" onError={()=>{if(cdn===0){setCdn(1);}else{setErr(true);}}} />
        ):(
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-yellow-900 to-black"><div className="text-center"><div className="text-[36px] font-black">MAG CORE V46</div><div className="text-yellow-400 text-[11px] mt-2">OPTIMISE - {cur.h} - {cur.f}</div><div className="text-white/50 text-[8px] mt-1">SHA 537e46c2 38 FILES - FALLBACK PROCEDURAL</div></div></div>
        )}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-40" />
        <div className="absolute top-0 left-0 right-0 p-3 bg-gradient-to-b from-black to-transparent">
          <h1 className="text-[18px] font-black">MAG CORE V46 OPTIMISE ULTRA</h1>
          <div className="text-yellow-400 text-[8px] font-bold">V33 y2nac0mq 59,8 Ko/s 39pc FIX - 50 LIGNES - BUILD 100pc OK - OU EST L IMAGE TROUVEE</div>
          <div className="text-white/30 text-[6px] mt-1">SHA 537e46c2 38 FILES | {cur.f} | {cur.h} | {cur.s} | CDN{cdn+1}/2 {err?"FALLBACK":"OK"}</div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent">
          <div className="text-yellow-400 text-[8px] font-bold">★ {cur.f} - {cur.h} - {cur.s} - TRES IMPORTANTE - V46 OPTIMISE ULTRA - IMAGE CINEMA</div>
          <div className="mt-2 flex gap-2">
            {LIST.map((f,j)=><button key={f.h} onClick={()=>{setI(j);setCdn(0);setErr(false);}} className={`px-2 py-1 border text-[7px] ${i===j?"bg-yellow-500 border-yellow-400 text-black font-bold":"bg-black/60 border-white/20"}`}>{f.f.slice(0,10)} {f.h}</button>)}
            <button onClick={()=>{setCdn(c=>c===0?1:0);setErr(false);}} className="px-2 py-1 border border-yellow-600 bg-yellow-900/30 text-[6px]">CDN {cdn+1}/2</button>
          </div>
        </div>
      </div>
      <div className="p-2 bg-zinc-900 text-[7px] text-zinc-500">V46 OPTIMISE ULTRA 50 LIGNES ANALYSE OPTIMISEE - V33 y2nac0mq 59,8 Ko/s 39pc X casse final_cinema_recull.png top left noir points jaunes - Cause V38 build fail 146 fleche - img src relatif pas CDN - 2.%20visuals encoded - 80 onglets 7pc boucle - Fix V46 50 lignes CDN absolu CDN1 jsDelivr + CDN2 raw + onError cdn0 vers cdn1 vers fallback div - Drones 18 seulement - Hero 487f1c55 1361394 TRES IMPORTANTE - Socle SHA 537e46c2fd9996a3f04d10fc024198b8094e9b167950cb6b2e9b214600f9b9ea 38 FILES 097bbf6 VERROUILLE - Colle app/page.tsx Commit directly main vert Ready Latest remplace V33 noir par V46 avec image</div>
    </div>
  );
}
