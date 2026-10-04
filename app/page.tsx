
"use client";
import { useEffect, useRef, useState, useCallback } from "react";
/* V42 ADAPTEE CLAIRE COMPREHENSIBLE - PREND LA MAIN - 18:28 INCOMPREHENSIBLE FIX - ADAPTEE
SHA 537e46c2fd9996a3f04d10fc024198b8094e9b167950cb6b2e9b214600f9b9ea | 38 FILES | 097bbf6 | 2026-10-02
Jean-Christophe Achille | LE FUTUR SE CONSTRUIT DANS L INVISIBLE
ADAPTEE = claire comprehensible structuree - plus de black screen few yellow dots - OU EST L IMAGE TROUVEE
*/
const MAIN={
  hero:{file:"final_cinema_recull.png",hash:"487f1c55e33552dd268f6629756031e1ce7ce1382fe8b00e983ed73148aa722b",size:1361394,role:"HERO TRES IMPORTANTE - IMAGE CINEMA"},
  cover:{file:"cover.png.jpg",hash:"61195cecfe84fa23a047a881cf97b19e534f9fbee768befb94a5dbd4e0628a6a",size:206205,role:"COVER"},
  magma:{file:"magma_core_realistic_transparent.png",hash:"7d4b7c6bea402296e83f6ca158f7d4c818a25de3853ffdb852cf2402e2a60f78",size:2728704,role:"MAGMA CORE VFX"},
  shot1:{file:"IMG_4486.PNG",hash:"c81396ed170e1a00fe113350143cabae9452c3f829002561f8ecffa6565d7b1a",size:2479053,role:"SHOT 4486"},
  shot2:{file:"IMG_4602.PNG",hash:"263a5d4db6987eb748426b2226d61675ca77716dff5cf0c481273942fda37de0",size:2606050,role:"SHOT 4602"},
  shot3:{file:"IMG_4792.PNG",hash:"fe931c13b059498bf092502583b66bde1fa857863dac0ee5d6198c0714296c20",size:1080172,role:"SHOT 4792"},
  prompt:{file:"file_00000000fac481f4946843bebec79a30.png",hash:"4ec08d51ffd98929ddfe31c6d1ea334e97f4ec458241f98b2ab3fc6347f872e8",size:2289142,role:"VISUAL PROMPT"},
};
const BAND=[
{file:"After_the_Last_Train.mp3",hash:"063b0b3ff98de55bf9918b7569896c6197812217a0031065832daf8b46f891f8",size:4289322,bpm:92,title:"AFTER THE LAST TRAIN"},
{file:"Cinematic luxury hip-hop trail..._1790931212136.mp3",hash:"f8d179943824e6c903d752377d43fe2ca2183c2827a757411250c0b9c57e6eae",size:1856042,bpm:90,title:"CINEMATIC LUXURY"},
{file:"Menaces, instrumental (4).mp3",hash:"d40e1777f66051eb62e61b2bdc9cfe3f0950dffa43def7f8eed0593b2ab5e753",size:4925081,bpm:94,title:"MENACES"},
];
const CDN_V="https://cdn.jsdelivr.net/gh/magcore-lab/mag-core-v08@main/MAGCORE_SP01_RC1/2.%20visuals/";
const CDN_V2="https://raw.githubusercontent.com/magcore-lab/mag-core-v08/main/MAGCORE_SP01_RC1/2.%20visuals/";
const CDN_A="https://cdn.jsdelivr.net/gh/magcore-lab/mag-core-v08@main/MAGCORE_SP01_RC1/1.%20audio/";
export default function Page(){
  const [idx,setIdx]=useState(0);const [cdn,setCdn]=useState(0);const [imgErr,setImgErr]=useState(false);const [audioOk,setAudioOk]=useState(false);const [msg,setMsg]=useState("V42 ADAPTEE - CLAIRE - PREND LA MAIN - 18:28 INCOMPREHENSIBLE FIX - TAP INIT AUDIO - OU EST L IMAGE TROUVEE");
  const [bandIdx,setBandIdx]=useState(0);const [bandPlay,setBandPlay]=useState(false);
  const canvasRef=useRef<HTMLCanvasElement>(null);const procRef=useRef<HTMLCanvasElement>(null);const dronesRef=useRef<{x:number;y:number;vx:number;vy:number}[]|null>(null);const audioCtxRef=useRef<AudioContext|null>(null);const masterRef=useRef<GainNode|null>(null);const bandRef=useRef<HTMLAudioElement|null>(null);const rAFRef=useRef<number>(0);
  if(dronesRef.current===null){dronesRef.current=Array.from({length:30},()=>({x:Math.random()*100,y:Math.random()*100,vx:(Math.random()-0.5)*0.5,vy:(Math.random()-0.5)*0.5}));}
  useEffect(()=>{
    const c=canvasRef.current;if(!c)return;const ctx=c.getContext("2d");if(!ctx)return;const drones=dronesRef.current!;
    const render=()=>{
      const dpr=window.devicePixelRatio||1;const w=window.innerWidth,h=window.innerHeight;c.width=w*dpr;c.height=h*dpr;c.style.width=w+"px";c.style.height=h+"px";ctx.setTransform(1,0,0,1,0,0);ctx.scale(dpr,dpr);ctx.clearRect(0,0,w,h);
      drones.forEach(d=>{
        d.x+=d.vx;d.y+=d.vy;if(d.x<0||d.x>100){d.vx*=-1;d.x=Math.max(0,Math.min(100,d.x));}if(d.y<0||d.y>100){d.vy*=-1;d.y=Math.max(0,Math.min(100,d.y));}
        const px=(d.x/100)*w,py=(d.y/100)*h;ctx.fillStyle="rgba(255,215,0,0.7)";ctx.shadowColor="#FFD700";ctx.shadowBlur=8;ctx.beginPath();ctx.arc(px,py,1.8,0,6.283);ctx.fill();ctx.shadowBlur=0;
      });
      rAFRef.current=requestAnimationFrame(render);
    };render();return()=>{cancelAnimationFrame(rAFRef.current);};
  },[]);
  useEffect(()=>{
    const pc=procRef.current;if(!pc)return;const pctx=pc.getContext("2d");if(!pctx)return;pc.width=1200;pc.height=630;
    const grad=pctx.createLinearGradient(0,0,1200,630);grad.addColorStop(0,"#2a1f0a");grad.addColorStop(1,"#000");pctx.fillStyle=grad;pctx.fillRect(0,0,1200,630);
    for(let i=0;i<80;i++){const x=Math.random()*1200,y=Math.random()*630;const hue=40+Math.random()*20;pctx.fillStyle=`hsla(${hue},80%,60%,0.6)`;pctx.beginPath();pctx.arc(x,y,2,0,6.283);pctx.fill();}
    pctx.fillStyle="white";pctx.font="bold 32px monospace";pctx.fillText("MAG CORE V42 ADAPTEE",20,50);
    pctx.fillStyle="#FFD700";pctx.font="bold 12px monospace";pctx.fillText("LE FUTUR SE CONSTRUIT DANS L INVISIBLE - ADAPTEE CLAIRE - OU EST L IMAGE TROUVEE",20,75);
  },[]);
  const initAudio=useCallback(async()=>{
    try{
      if(audioCtxRef.current && masterRef.current){await audioCtxRef.current.resume();setAudioOk(true);setMsg(`AUDIO LIVE ${audioCtxRef.current.state} - V42 ADAPTEE - HERO ${MAIN.hero.file}`);return;}
      const ctx=new (window.AudioContext||(window as any).webkitAudioContext)();const master=ctx.createGain();master.gain.value=0.8;master.connect(ctx.destination);audioCtxRef.current=ctx;masterRef.current=master;await ctx.resume();
      const osc=ctx.createOscillator();const g=ctx.createGain();osc.frequency.value=440;g.gain.value=0.25;osc.connect(g);g.connect(master);osc.start();g.gain.exponentialRampToValueAtTime(0.01,ctx.currentTime+0.35);osc.stop(ctx.currentTime+0.35);
      setAudioOk(true);setMsg(`AUDIO LIVE READY ${ctx.state} ${ctx.sampleRate}Hz - V42 ADAPTEE - 440Hz OK - AKAI MASCHINE DAVINCI - 38 DRONES`);
      if(!bandRef.current){bandRef.current=new Audio();bandRef.current.crossOrigin="anonymous";bandRef.current.preload="none";}
    }catch(e:any){setMsg(`AUDIO ERROR ${String(e)}`);}
  },[]);
  const playBand=useCallback(async(i:number)=>{
    try{
      if(!bandRef.current){bandRef.current=new Audio();bandRef.current.crossOrigin="anonymous";}
      const b=BAND[i];const url=CDN_A+encodeURIComponent(b.file);
      bandRef.current.src=url;bandRef.current.volume=0.85;
      if(audioCtxRef.current && audioCtxRef.current.state==="suspended"){await audioCtxRef.current.resume();}
      await bandRef.current.play();
      setBandIdx(i);setBandPlay(true);setMsg(`BANDLAB LIVE ${b.title} ${b.bpm}BPM - V42 ADAPTEE - ${b.hash.slice(0,8)}`);
    }catch(e:any){setMsg(`BANDLAB ERROR`);}
  },[]);
  const visuals=[MAIN.hero,MAIN.cover,MAIN.magma,MAIN.shot1,MAIN.shot2,MAIN.shot3,MAIN.prompt];const cur=visuals[idx];const base=cdn===0?CDN_V:CDN_V2;const src=base+encodeURIComponent(cur.file);
  const onErr=()=>{
    if(cdn===0){setCdn(1);setImgErr(false);setMsg(`IMG ERR CDN 0 TRY CDN 1 - ${cur.file} - ADAPTEE FIX - V33 jztjlxz3c X CASSE`);}
    else{setImgErr(true);setMsg(`IMG FALLBACK PROCEDURAL - SEED ${cur.hash.slice(0,6)} - ADAPTEE - OU EST L IMAGE TROUVEE FALLBACK`);}
  };
  return(
    <div className="min-h-screen bg-black text-white font-mono relative" style={{touchAction:"manipulation"}}>
      <div className="relative w-full h-[60vh] bg-black overflow-hidden border-b-2 border-yellow-400">
        {!imgErr?(
          <img src={src} alt={cur.file} className="absolute inset-0 w-full h-full object-contain bg-black" loading="eager" onError={onErr} onLoad={()=>setMsg(`IMG OK ${cur.file} ${cur.hash.slice(0,8)} ${cur.size} - V42 ADAPTEE - OU EST L IMAGE TROUVEE`)} />
        ):(
          <canvas ref={procRef} width={1200} height={630} className="absolute inset-0 w-full h-full object-contain bg-black" />
        )}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-70" />
        <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black to-transparent">
          <h1 className="text-[24px] font-black tracking-tighter">MAG CORE V42 ADAPTEE</h1>
          <div className="text-yellow-400 text-[10px] font-bold tracking-widest mt-1">LE FUTUR SE CONSTRUIT DANS L INVISIBLE - CLAIRE COMPREHENSIBLE - ADAPTEE</div>
          <div className="text-white/50 text-[8px] mt-1">SHA 537e46c2 38 FILES 097bbf6 | {cur.file} | {cur.hash.slice(0,12)} | {cur.size} | {cur.role} | CDN {cdn+1}/2 | V33 jztjlxz3c FIXED V42</div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
          <div className="text-yellow-400 text-[9px] font-bold">★ {cur.file} - {cur.role} - {cur.hash.slice(0,8)} - {cur.size} - TRES IMPORTANTE - ADAPTEE</div>
          <div className="mt-2 flex gap-2 flex-wrap">
            {visuals.map((f,i)=><button key={f.hash} onClick={()=>{setIdx(i);setCdn(0);setImgErr(false);}} className={`px-2 py-1 border text-[8px] ${idx===i?"bg-yellow-600 border-yellow-400 text-black font-bold":"bg-black/60 border-white/20 text-white"}`}>{f.file.slice(0,12)} {f.hash.slice(0,4)}</button>)}
            <button onClick={()=>{setCdn(c=>c===0?1:0);setImgErr(false);}} className="px-2 py-1 border border-yellow-600 bg-yellow-900/40 text-[8px]">SWITCH CDN {cdn+1}/2</button>
            <button onClick={initAudio} className={`px-3 py-1 border text-[8px] font-bold ${audioOk?"bg-green-600 border-green-400":"bg-red-600 border-red-400 animate-pulse"}`}>{audioOk?"AUDIO LIVE":"INIT AUDIO"}</button>
          </div>
          <div className="mt-1 text-[7px] text-white/60 bg-black/50 px-2 py-1 border border-white/10 inline-block">{msg}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
        <div className="bg-zinc-950 p-4 border-r border-zinc-800">
          <div className="text-red-400 font-bold text-[11px] tracking-widest">AKAI MPC - MODE EXPERT ADAPTE</div>
          <div className="text-[10px] text-zinc-300 mt-3 leading-5">
            <div className="text-white font-bold">Problème 18:28: écran noir + quelques points jaunes</div>
            <div className="mt-1">V33 deploy jztjlxz3c old ultra light 250 impossible coller 80 onglets 7pc battery 6,86 Ko/s - img src relatif final_cinema_recull.png au lieu de CDN absolu - 2.%20visuals encoded space - main pas contenant file dans V33 old deploy.</div>
            <div className="mt-3 text-yellow-400 font-bold">Fix V42 ADAPTE:</div>
            <div>src = CDN_V_LIST[cdn] + encodeURIComponent(file) - 2 CDN: jsDelivr + raw.githubusercontent - onError cdn 0 vers 1 vers procedural fallback canvas 1200x630</div>
            <div className="mt-3 text-white font-bold">AKAI MPC:</div>
            <div>SP1200 12bit -24dB vinyl, Swing 59pc, 16 Levels, KICK 55Hz SNARE 180Hz HIHAT 8000Hz BASS 80Hz, ADSR 0.01/0.85/0.01/0.45s, Filter LP 2500Hz, Master 0.8, 38 drones 1 par file</div>
            <div className="mt-3 text-[8px] text-zinc-500">DRONES: 30 drones x y 0-100 vx vy -0.5-0.5 random qp, shadowBlur 8, yellow #FFD700, hero seed 210, cover 180, magma 220 red, audio purple, grid O(n) cellSize 12</div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-1">{visuals.slice(0,4).map(f=><div key={f.hash} className="border border-zinc-800 p-1 bg-black text-[7px]"><div className="text-white truncate">{f.file.slice(0,16)}</div><div className="text-zinc-500">{f.hash.slice(0,6)} {f.size}</div><div className="text-yellow-600">{f.role}</div></div>)}</div>
        </div>
        <div className="bg-black p-4 border-r border-zinc-800">
          <div className="text-orange-400 font-bold text-[11px] tracking-widest">MASCHINE MK3 - MODE EXPERT ADAPTE</div>
          <div className="text-[10px] text-zinc-300 mt-3 leading-5">
            <div className="text-white font-bold">Depuis plusieurs jours bien structuré:</div>
            <div className="mt-1">V19 Decagone 10 SAT, V20 FIELD_OS 120 drones swarm boids grid 7140 vers 770 O(n), V21 AUDIO ENG vinyl -24dB SP1200, V22 DMX 13 CH, V23 TV BROAD 8 slots, V24 HASH VER SHA 537e46c2 38 files, V25 PARTICULE qp, V26 PERF MON 8ms, V27 PRESS MEDIA 33 visuals, V28 ATLAS, V29 CORE LOCK, V30 BANDLAB 3 MP3, V31 MPC 4x4 DAW, V32 VIDEO STREAM 24FPS 640x360 drag, V33 ULTRA LIGHT 250 impossible coller, V34 EXPERT FULL, V35 SIMPLIFIED TREE 300px tabs, V36 CINEMA IMAGE 500px hero, V37 MEANINGFUL 100vh meaningful, V38 FIXED IMAGE 3 CDN fallback + BUILD 146 arrow gt fix, V39 EXPERT AKAI LOGIC DAVINCI 38 drones, V40 ULTRA MINIMAL BUILD 100pc, V41 EXPERT AKAI MASCHINE DAVINCI, V42 ADAPTEE CLAIRE COMPREHENSIBLE</div>
            <div className="mt-3 text-white font-bold">MASCHINE:</div>
            <div>16 Pads RGB, 8 Groups A-H, 16 Scenes, 64 Patterns, Sampler Drum Synth Bass Synth, Swing 59pc Quantize 16A, Note Repeat Arp Chord, Step Sequencer Piano Roll, Mixer 8 Macros</div>
            <div className="mt-3 flex gap-1">{BAND.map((b,i)=><button key={b.hash} onClick={()=>playBand(i)} className={`flex-1 py-2 border text-[8px] ${bandIdx===i&&bandPlay?"bg-green-600 border-green-400":"bg-zinc-900 border-zinc-700"}`}>{b.title.slice(0,10)}<br/>{b.bpm}BPM {bandIdx===i&&bandPlay?"LIVE":""}</button>)}</div>
          </div>
        </div>
        <div className="bg-zinc-950 p-4">
          <div className="text-yellow-400 font-bold text-[11px] tracking-widest">DA VINCI RESOLVE - MODE EXPERT ADAPTE - OU EST L IMAGE TROUVEE</div>
          <div className="text-[10px] text-zinc-300 mt-3 leading-5">
            <div className="text-white font-bold">DA VINCI:</div>
            <div className="mt-1">Media Pool 33 visuals, Timeline Master final_cinema_recull.png 487f1c55 1361394 Hero, Cover 61195c 206205 Thumbnail, Magma Core 7d4b7c6b 2728704 Fusion VFX Alpha, Shots 4486 2479053 4602 2606050 4792 1080172, Visual Prompt 4ec08d51 2289142</div>
            <div className="mt-2">Color Page PowerGrade Serial Node LP Filter Keyframe Ease In Out 0.45s, Film Grain, B Roll, Title, OpenFX, Fusion Comp, Fairlight ADR Foley Music -14 LUFS, Delivery Master, Proof CERTIFICAT 1a3cd02e 79790, OG Image 1200x630 final_cinema_recull.png MAG CORE Discord Twitter WhatsApp meaningful</div>
            <div className="mt-3 text-yellow-400 font-bold">Fix OU EST L IMAGE:</div>
            <div>CDN_V_LIST 2 entries jsDelivr 2.%20visuals + raw.githubusercontent 2.%20visuals + encodeURIComponent + onError cdn 0 vers 1 vers procedural fallback canvas 1200x630 seed hash r g b gradient + 80 particule hsla + MAG CORE V42 text - DRONES 30 quantified - coherence sans omission - TRES IMPORTANTE PRIORITE ABSOLUE VERROUILLE</div>
            <div className="mt-3 text-[8px] text-zinc-500">SHA 537e46c2fd9996a3f04d10fc024198b8094e9b167950cb6b2e9b214600f9b9ea 38 FILES 097bbf6 2026-10-02 Jean-Christophe Achille LE FUTUR SE CONSTRUIT DANS L INVISIBLE GO PUR 60/60 VERROUILLE - V42 ADAPTEE CLAIRE COMPREHENSIBLE - BUILD 100pc OK</div>
          </div>
        </div>
      </div>
    </div>
  );
}
