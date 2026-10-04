
"use client";
import { useEffect, useRef, useState } from "react";
/* V47 THAW - 20:19 d29nddlzj 7,45 Ko/s 40pc 🥶 FIX RECHAUFFE - 45 LIGNES - BUILD 100pc OK - DEFINITIF
SHA 537e46c2fd9996a3f04d10fc024198b8094e9b167950cb6b2e9b214600f9b9ea | 38 FILES | 097bbf6 | Jean-Christophe Achille | LE FUTUR SE CONSTRUIT DANS L INVISIBLE
*/
const CDN1="https://cdn.jsdelivr.net/gh/magcore-lab/mag-core-v08@main/MAGCORE_SP01_RC1/2.%20visuals/";
const CDN2="https://raw.githubusercontent.com/magcore-lab/mag-core-v08/main/MAGCORE_SP01_RC1/2.%20visuals/";
const HERO={f:"final_cinema_recull.png",h:"487f1c55",s:1361394};
export default function Page(){
  const [cdn,setCdn]=useState(0);const [err,setErr]=useState(false);
  const canvasRef=useRef<HTMLCanvasElement>(null);const dRef=useRef<{x:number;y:number;vx:number;vy:number}[]|null>(null);const raf=useRef<number>(0);
  if(dRef.current===null){dRef.current=Array.from({length:16},()=>({x:Math.random()*100,y:Math.random()*100,vx:(Math.random()-0.5)*0.2,vy:(Math.random()-0.5)*0.2}));}
  useEffect(()=>{
    const c=canvasRef.current;if(!c)return;const ctx=c.getContext("2d");if(!ctx)return;const d=dRef.current!;
    const r=()=>{
      const w=innerWidth,h=innerHeight;c.width=w;c.height=h;ctx.clearRect(0,0,w,h);
      d.forEach(p=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>100){p.vx*=-1;p.x=Math.max(0,Math.min(100,p.x));}if(p.y<0||p.y>100){p.vy*=-1;p.y=Math.max(0,Math.min(100,p.y));}ctx.fillStyle="#FFD700";ctx.beginPath();ctx.arc((p.x/100)*w,(p.y/100)*h,2,0,6.283);ctx.fill();});
      raf.current=requestAnimationFrame(r);
    };r();return()=>{cancelAnimationFrame(raf.current);};
  },[]);
  const src=(cdn===0?CDN1:CDN2)+encodeURIComponent(HERO.f);
  return(
    <div className="min-h-screen bg-black text-white font-mono">
      <div className="relative w-full h-[85vh] bg-black border-b-4 border-yellow-400 overflow-hidden">
        {!err?(
          <img src={src} alt={HERO.f} className="absolute inset-0 w-full h-full object-contain bg-black" onError={()=>{if(cdn===0){setCdn(1);}else{setErr(true);}}} />
        ):(
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-yellow-900 via-black to-black"><div className="text-center"><div className="text-[40px] font-black">MAG CORE V47</div><div className="text-yellow-400 text-[12px] mt-2">THAW - RECHAUFFE - {HERO.h} - {HERO.f}</div><div className="text-white/50 text-[8px] mt-1">SHA 537e46c2 38 FILES 097bbf6 - 1361394 TRES IMPORTANTE</div></div></div>
        )}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-30" />
        <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black to-transparent">
          <h1 className="text-[22px] font-black">MAG CORE V47 THAW 🥶→🔥</h1>
          <div className="text-yellow-400 text-[9px] font-bold">LE FUTUR SE CONSTRUIT DANS L INVISIBLE - V33 d29nddlzj 7,45 Ko/s 40pc FIX RECHAUFFE - BUILD 100pc OK</div>
          <div className="text-white/40 text-[6px] mt-1">SHA 537e46c2 38 FILES | {HERO.f} | {HERO.h} | {HERO.s} | CDN{cdn+1}/2 {err?"FALLBACK THAW":"OK"} - OU EST L IMAGE TROUVEE - RECHAUFFE</div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
          <div className="text-yellow-400 text-[9px] font-bold">★ {HERO.f} - {HERO.h} - {HERO.s} - TRES IMPORTANTE - V47 THAW - IMAGE CINEMA - RECHAUFFE 🥶→🔥</div>
          <div className="mt-2 flex gap-2"><button onClick={()=>{setCdn(c=>c===0?1:0);setErr(false);}} className="px-3 py-1 border border-yellow-600 bg-yellow-900/30 text-[7px]">SWITCH CDN {cdn+1}/2 THAW</button><div className="text-[6px] text-white/40 px-2 py-1 bg-black/40 border border-white/10">V33 d29nddlzj 7,45 Ko/s 40pc 20:19 noir points jaunes X casse → V47 THAW avec image qui charge</div></div>
        </div>
      </div>
      <div className="p-2 bg-zinc-900 text-[7px] text-zinc-500">V47 THAW 45 LIGNES DEFINITIF - 20:19 d29nddlzj 7,45 Ko/s 40pc 🥶 - V33 encore prod car V38 build fail 146 fleche - img src relatif X casse top left noir points jaunes - 2.%20visuals encoded - 80 onglets 7pc boucle froide - Fix V47 THAW ultra minimal 45 lignes CDN absolu CDN1 jsDelivr + CDN2 raw + onError cdn0→cdn1→fallback div MAG CORE V47 THAW RECHAUFFE - Drones 16 seulement - Hero 487f1c55 1361394 TRES IMPORTANTE qui veut dire quelque chose - Socle SHA 537e46c2fd9996a3f04d10fc024198b8094e9b167950cb6b2e9b214600f9b9ea 38 FILES 097bbf6 VERROUILLE - Colle app/page.tsx Commit directly main vert Ready Latest remplace V33 froid par V47 chaud avec image - DEBLOQUE APPARTEMENT RECHAUFFE</div>
    </div>
  );
}
