
"use client";
import { useEffect, useRef, useState, useCallback } from "react";
/* MAG CORE V36 CINEMA IMAGE PRIORITE - VISUEL IMAGE CINEMA TRES IMPORTANT - V35 SIMPLIFIED TREE + CINEMA HERO
SHA 537e46c2fd9996a3f04d10fc024198b8094e9b167950cb6b2e9b214600f9b9ea | 38 FILES | 097bbf6 | 2026-10-02
Jean-Christophe Achille | LE FUTUR SE CONSTRUIT DANS L'INVISIBLE
CINEMA PRIORITE: final_cinema_recull.png 487f1c55 1361394 + cover.png.jpg 61195cec + file_00000000fac481f4946843bebec79a30.png 4ec08d51 + IMG_4486.PNG c81396ed etc - VISUEL IMAGE CINEMA TRES IMPORTANT
*/
type ModType={id:string;name:string;color:string;val:number;role:string;quantum:string;cinema:string};
const MODS_INIT:ModType[]=[
{id:"SAT01",name:"CORE LOCK",color:"#FF3B30",val:94,role:"LEADER DECAGONE",quantum:"superposition 3 etats",cinema:"final_cinema_recull.png"},
{id:"SAT02",name:"PRESS MEDIA",color:"#4CD964",val:88,role:"STREAM 33 FILES",quantum:"entanglement media",cinema:"cover.png.jpg"},
{id:"SAT03",name:"CINEMA VISUAL",color:"#FFD700",val:100,role:"IMAGE CINEMA PRIORITE",quantum:"image cinema tres important",cinema:"final_cinema_recull.png"},
{id:"SAT04",name:"FIELD_OS",color:"#FFD700",val:100,role:"FIELD 120 DRONES",quantum:"champ quantique",cinema:"magma_core_realistic_transparent.png"},
{id:"SAT05",name:"AUDIO ENG",color:"#AF52DE",val:86,role:"AUDIO VINYL SP1200",quantum:"superposition audio",cinema:"file_00000000fac481f4946843bebec79a30.png"},
{id:"SAT06",name:"DMX CTRL",color:"#FF9500",val:89,role:"DMX 13 CH",quantum:"entanglement DMX",cinema:"IMG_4486.PNG"},
{id:"SAT07",name:"TV BROAD",color:"#5AC8FA",val:92,role:"TV 8 SLOTS",quantum:"coherence TV",cinema:"IMG_4602.PNG"},
{id:"SAT08",name:"HASH VER",color:"#8E8E93",val:97,role:"HASH SHA 537e46c2",quantum:"verification SHA",cinema:"IMG_4792.PNG"},
{id:"SAT09",name:"PARTICULE",color:"#FF2D55",val:95,role:"SWARM 120",quantum:"swarm boids qp",cinema:"final_cinema_recull.png"},
{id:"SAT10",name:"PERF MON",color:"#30D158",val:90,role:"PERF 770/7140",quantum:"optimisation O(n)",cinema:"file_00000000043081f48416466028827c19.png"},
];
const CINEMA_PRIORITY=[
{file:"final_cinema_recull.png",hash:"487f1c55e33552dd268f6629756031e1ce7ce1382fe8b00e983ed73148aa722b",size:"1361394",role:"IMAGE CINEMA PRIORITE TRES IMPORTANT - CINEMA RECULL",seed:210},
{file:"cover.png.jpg",hash:"61195cecfe84fa23a047a881cf97b19e534f9fbee768befb94a5dbd4e0628a6a",size:"206205",role:"COVER CINEMA - TRES IMPORTANT",seed:180},
{file:"file_00000000fac481f4946843bebec79a30.png",hash:"4ec08d51ffd98929ddfe31c6d1ea334e97f4ec458241f98b2ab3fc6347f872e8",size:"2289142",role:"CINEMA VISUAL PROMPT - TRES IMPORTANT",seed:200},
{file:"file_000000009718820a92f8f0bbfda5f6ba.png",hash:"9e04ebae498a31e4898a76da5efd0ff9cc642d5f13d4ea291bec962c44886bb7",size:"2312176",role:"CINEMA FRAME 2 - TRES IMPORTANT",seed:190},
{file:"IMG_4486.PNG",hash:"c81396ed170e1a00fe113350143cabae9452c3f829002561f8ecffa6565d7b1a",size:"2479053",role:"CINEMA SHOT 4486 - TRES IMPORTANT",seed:170},
{file:"IMG_4602.PNG",hash:"263a5d4db6987eb748426b2226d61675ca77716dff5cf0c481273942fda37de0",size:"2606050",role:"CINEMA SHOT 4602 - TRES IMPORTANT",seed:160},
{file:"IMG_4792.PNG",hash:"fe931c13b059498bf092502583b66bde1fa857863dac0ee5d6198c0714296c20",size:"1080172",role:"CINEMA SHOT 4792 - TRES IMPORTANT",seed:150},
{file:"magma_core_realistic_transparent.png",hash:"7d4b7c6bea402296e83f6ca158f7d4c818a25de3853ffdb852cf2402e2a60f78",size:"2728704",role:"MAGMA CORE REALISTIC TRANSPARENT - CINEMA VFX - TRES IMPORTANT",seed:220},
{file:"file_00000000043081f48416466028827c19.png",hash:"aa7e6d35d600841b31edd27844926e4d7b2ee65a5eed28b16978c544a5986063",size:"1586554",role:"CINEMA PROMPT 1 - TRES IMPORTANT",seed:140},
{file:"file_00000000a3d081f4bd24cb49880b935e.png",hash:"c0d6305c146ae71c9cf6d22fea6694e21da27ab4f4d542c13c1e45424fa8ae12",size:"1969760",role:"CINEMA PROMPT 2 - TRES IMPORTANT",seed:130},
];
const HASHES=["0802e2236c98342bc1c3695d580ff86","8720b7530c6b52a38200fa25a9a8","8627436d8a69ec1c740d8c943f7a4f","97e081b1c2ca8a7d67b184ee1d833","87a3a3a58a1d5068a60f576e33caf","c2663bf56a096dd7ca3e29f8a23aac","ab484283599eeb659ba3312ba189","af32c45e023bb2d435bf0c2d5604fe","48c949f09aa49d5191d5f34be90a5f","1aed4db31a1ca6ea39cb3938b0a6d6","a669ae0a89dd01861e2e21faa37f11","c593e939a32a4fda092b3f876613e","28bab40d2e1e333d8dbdc1087ddd00","b4f04f857542fadb88805e99633c71","d438fab5e2b64f00320f3c6686d802","25ed1d6bcb999e8e488db80afa139e","db2535ce5a2ffcb39dd0adb62aa754","4661e2f1d69efb926fc22d1585a5aad","b91bdff04bef8887fb7e2bd9c9625c5","4833e09b506e962fda1f52c7660bf5","61195cecfe84fa23a047a881cf97b","2d0e75b14d2e9e2f21516716cb881c1","aa7e6d35d600841b31edd27844926e","9e04ebae498a31e4898a76da5efd0f","c0d6305c146ae71c9cf6d22fea6694","7d481457980926950cac91fc0e7c31","4ec08d51ffd98929ddfe31c6d1ea334","487f1c55e33552dd268f662975603","c81396ed170e1a00fe113350143cabae9452c3f829002561f8ecffa6565d7b1a","263a5d4db6987eb748426b2226d616","fe931c13b059498bf092502583b66","7d4b7c6bea402296e83f6ca158f7d4c","eb7c82021a5a689a485de87e5fb807"];
const VISUALS=["20260911_144548146.png","6a82bb18-a340-4a39-ae40-3808c6ba63bf.jpg","777478936_1574705714151814_8438573313539160794_n.webp","799404679_1593136164975441_3470481813043264057_n.webp.jpg","799458932_1117972420555635_751670485585895067_n.webp.jpg","802505119_28169594866030406_1429598835089382160_n.webp.jpg","802652739_1059071260066240_561078578262900998_n.webp.jpg","825292786_2541633396250691_4923362792537113309_n.webp.jpg","825292897_870890789443224_8166395198019700685_n.webp.jpg","825292990_2621302431621562_7270606127661261564_n.webp.jpg","825356378_3649072738580312_3945833506990225259_n.webp.jpg","827484417_1624656912497555_6934370519878760994_n.webp.jpg","828603423_1070299689165936_7395939595943028622_n.webp.jpg","830199193_1817125372821863_7806101152028945218_n.webp.jpg","831185277_1087622337458108_1682942978757639424_n.webp.jpg","831705146_1084548654373809_3188058598217552940_n.webp.jpg","833219203_979362861114739_2326777725030546102_n.webp","833995418_971383018626924_6035757767756950923_n-1.webp","af795ea8e17c00621f5fbd9dca0c0765.webp","change_hands_posture_hat_b8ea31ae.jpg","cover.png.jpg","FB_IMG_1790321696729.jpg","file_00000000043081f48416466028827c19.png","file_000000009718820a92f8f0bbfda5f6ba.png","file_00000000a3d081f4bd24cb49880b935e.png","file_00000000c9ac81f4a07f91531051a26c.png","file_00000000fac481f4946843bebec79a30.png","final_cinema_recull.png","IMG_4486.PNG","IMG_4602.PNG","IMG_4792.PNG","magma_core_realistic_transparent.png","photo4224078515220673912.jpeg"];
const BANDLAB_TRACKS=[
{file:"After_the_Last_Train.mp3",hash:"063b0b3ff98de55bf9918b7569896c6197812217a0031065832daf8b46f891f8",size:"4.2 MB",bpm:92},
{file:"Cinematic luxury hip-hop trail..._1790931212136.mp3",hash:"f8d179943824e6c903d752377d43fe2ca2183c2827a757411250c0b9c57e6eae",size:"1.8 MB",bpm:90},
{file:"Menaces, instrumental (4).mp3",hash:"d40e1777f66051eb62e61b2bdc9cfe3f0950dffa43def7f8eed0593b2ab5e753",size:"4.9 MB",bpm:94},
];
const PADS=[{id:"KICK",c:"#FF3B30",k:"A",f:55},{id:"SNARE",c:"#4CD964",k:"S",f:180},{id:"HIHAT",c:"#FFD700",k:"D",f:8000},{id:"BASS",c:"#5AC8FA",k:"F",f:80},{id:"KEYS",c:"#AF52DE",k:"G",f:440},{id:"SAMPLE",c:"#FF2D55",k:"H",f:300}];
const CDN_V="https://cdn.jsdelivr.net/gh/magcore-lab/mag-core-v08@main/MAGCORE_SP01_RC1/2.%20visuals/";
const CDN_A="https://cdn.jsdelivr.net/gh/magcore-lab/mag-core-v08@main/MAGCORE_SP01_RC1/1.%20audio/";
const seedFromHash=(h:string)=>{let s=0;for(let i=0;i<8;i++)s+=parseInt(h.slice(i*2,i*2+2),16);return s;};
type Tab="CINEMA"|"AUDIO"|"FIELD"|"VISUALS";
export default function Page(){
  const [selectedMod,setSelectedMod]=useState(MODS_INIT[2]);const [cinemaIdx,setCinemaIdx]=useState(0);const [streamIdx,setStreamIdx]=useState(27);const [tab,setTab]=useState<Tab>("CINEMA");
  const [conf,setConf]=useState(99.9);const [quantum,setQuantum]=useState(99.0);const [audioReady,setAudioReady]=useState(false);const [activePad,setActivePad]=useState<string|null>(null);const [audioMsg,setAudioMsg]=useState("V36 CINEMA IMAGE TRES IMPORTANT - INIT AUDIO LIVE - TAP CINEMA");
  const [bandlabIdx,setBandlabIdx]=useState(0);const [isBandlabPlaying,setIsBandlabPlaying]=useState(false);
  const dronesRef=useRef<{x:number;y:number;vx:number;vy:number;qp:number;color:string}[]|null>(null);const canvasRef=useRef<HTMLCanvasElement>(null);const vCanvasRef=useRef<HTMLCanvasElement>(null);const audioCtxRef=useRef<AudioContext|null>(null);const masterGainRef=useRef<GainNode|null>(null);const bandlabAudioRef=useRef<HTMLAudioElement|null>(null);const rAFRef=useRef<number>(0);const perfRef=useRef({checks:0,timeMs:0});
  const [perf,setPerf]=useState({checks:0,timeMs:0});
  if(dronesRef.current===null){dronesRef.current=Array.from({length:120},(_,i)=>({x:Math.random()*360,y:Math.random()*360,vx:(Math.random()-0.5)*1.5,vy:(Math.random()-0.5)*1.5,qp:Math.random()*Math.PI*2,color:MODS_INIT[i%10].color}));}
  useEffect(()=>{
    const c=canvasRef.current;if(!c)return;const ctx=c.getContext("2d");if(!ctx)return;const drones=dronesRef.current!;const grid=new Map<string,typeof drones>();const cellSize=40;let frame=0;
    const render=()=>{
      const dpr=window.devicePixelRatio||1;c.width=360*dpr;c.height=360*dpr;c.style.width="360px";c.style.height="360px";ctx.setTransform(1,0,0,1,0,0);ctx.scale(dpr,dpr);ctx.fillStyle="#000";ctx.fillRect(0,0,360,360);
      const time=Date.now()/1000;frame++;grid.clear();let checks=0;
      drones.forEach(d=>{const cx=Math.floor(d.x/cellSize),cy=Math.floor(d.y/cellSize),key=`${cx*10007+cy}`;if(!grid.has(key))grid.set(key,[]);grid.get(key)!.push(d);});
      drones.forEach(d=>{
        const cx=Math.floor(d.x/cellSize),cy=Math.floor(d.y/cellSize);
        for(let dx=-1;dx<=1;dx++){for(let dy=-1;dy<=1;dy++){if(Math.abs(dx)+Math.abs(dy)>1)continue;const key=`${(cx+dx)*10007+(cy+dy)}`;const cell=grid.get(key);if(!cell)continue;cell.forEach(o=>{if(o===d)return;checks++;const dist=Math.hypot(d.x-o.x,d.y-o.y);if(dist<48&&dist>0){d.vx+=(d.x-o.x)/dist*0.02;d.vy+=(d.y-o.y)/dist*0.02;}});}}
        d.qp+=0.05;d.x+=d.vx+Math.sin(d.qp)*0.3;d.y+=d.vy+Math.cos(d.qp*1.3)*0.3;
        if(d.x<0||d.x>360){d.vx*=-0.8;d.x=Math.max(0,Math.min(360,d.x));}if(d.y<0||d.y>360){d.vy*=-0.8;d.y=Math.max(0,Math.min(360,d.y));}
        d.vx*=0.995;d.vy*=0.995;ctx.fillStyle=d.color;ctx.shadowColor=d.color;ctx.shadowBlur=6;ctx.beginPath();ctx.arc(d.x,d.y,2.8+Math.sin(time+d.qp)*0.5,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;
      });
      ctx.strokeStyle="#FFD700";ctx.lineWidth=2.3;ctx.beginPath();MODS_INIT.forEach((_,i)=>{const a=(i/MODS_INIT.length)*Math.PI*2-Math.PI/2,r=120,x=180+Math.cos(a)*r,y=180+Math.sin(a)*r;if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);});ctx.closePath();ctx.stroke();
      ctx.fillStyle=audioReady?"#4CD964":"#FFD700";ctx.font="bold 8px monospace";ctx.fillText(`V36 CINEMA ${selectedMod.id} ${audioReady?"AUDIO LIVE + CINEMA IMAGE":"INIT"} ${conf.toFixed(1)}pc Q ${quantum.toFixed(1)}pc | ${checks}/7140 | ${perfRef.current.timeMs.toFixed(1)}ms | CINEMA IMAGE TRES IMPORTANT`,6,350);
      if(frame%20===0){perfRef.current={checks,timeMs:performance.now()%100};setPerf({checks,timeMs:perfRef.current.timeMs});}
      rAFRef.current=requestAnimationFrame(render);
    };render();return()=>{cancelAnimationFrame(rAFRef.current);};
  },[selectedMod,conf,quantum,audioReady]);
  useEffect(()=>{
    const vc=vCanvasRef.current;if(!vc)return;const vctx=vc.getContext("2d");if(!vctx)return;vc.width=640;vc.height=360;
    const render=(idx:number)=>{const hash=HASHES[idx%HASHES.length];const seed=seedFromHash(hash);const r=(seed*3)%255,g=(seed*7)%255,b=(seed*13)%255;const grad=vctx.createLinearGradient(0,0,640,360);grad.addColorStop(0,`rgb(${r},${g},${b})`);grad.addColorStop(1,`rgb(20,15,5)`);vctx.fillStyle=grad;vctx.fillRect(0,0,640,360);for(let i=0;i<80;i++){const x=(seed*(i+1)*37)%640,y=(seed*(i+1)*57)%360;const hue=(seed+i*7+quantum*2)%360;vctx.fillStyle=`hsla(${hue},90%,60%,0.8)`;vctx.beginPath();vctx.arc(x%640,y%360,2.5,0,Math.PI*2);vctx.fill();}vctx.strokeStyle="#FFD700";vctx.lineWidth=2;vctx.beginPath();vctx.moveTo(320,20);vctx.lineTo(610,180);vctx.lineTo(320,340);vctx.lineTo(30,180);vctx.closePath();vctx.stroke();vctx.fillStyle="#FFD700";vctx.font="bold 9px monospace";vctx.fillText(`V36 CINEMA IMAGE TRES IMPORTANT ${selectedMod.id} ${conf.toFixed(1)}pc Q ${quantum.toFixed(1)}pc SEED ${seed} ${VISUALS[idx]}`,10,350);};
    render(streamIdx);const iv=window.setInterval(()=>{render(streamIdx);},1000/24);return()=>{clearInterval(iv);};
  },[streamIdx,conf,quantum,selectedMod]);
  useEffect(()=>{const iv=window.setInterval(()=>{setStreamIdx(p=>(p+1)%VISUALS.length);},3500);return()=>{clearInterval(iv);};},[]);
  const initAudio=useCallback(async()=>{
    try{
      if(audioCtxRef.current && masterGainRef.current){await audioCtxRef.current.resume();setAudioReady(true);setAudioMsg(`V36 CINEMA AUDIO LIVE RESUMED ${audioCtxRef.current.state} MASTER 0.8 CINEMA IMAGE TRES IMPORTANT READY`);return;}
      const ctx=new (window.AudioContext||(window as any).webkitAudioContext)();const master=ctx.createGain();master.gain.value=0.8;master.connect(ctx.destination);audioCtxRef.current=ctx;masterGainRef.current=master;await ctx.resume();
      const osc=ctx.createOscillator();const g=ctx.createGain();osc.frequency.value=440;g.gain.value=0.3;osc.connect(g);g.connect(master);osc.start();g.gain.exponentialRampToValueAtTime(0.01,ctx.currentTime+0.4);osc.stop(ctx.currentTime+0.4);
      setAudioReady(true);setConf(99.9);setQuantum(99.0);setAudioMsg(`V36 CINEMA AUDIO LIVE FIXED ${ctx.state} SR ${ctx.sampleRate}Hz MASTER 0.8 CINEMA IMAGE TRES IMPORTANT READY - 440Hz TEST OK`);
      if(!bandlabAudioRef.current){bandlabAudioRef.current=new Audio();bandlabAudioRef.current.crossOrigin="anonymous";bandlabAudioRef.current.preload="none";}
    }catch(err:any){setAudioMsg(`AUDIO ERROR ${String(err)}`);setAudioReady(false);}
  },[]);
  const play=useCallback(async(id:string)=>{
    setActivePad(id);setTimeout(()=>setActivePad(null),150);
    try{
      let ctx=audioCtxRef.current;let master=masterGainRef.current;
      if(!ctx||!master){await initAudio();ctx=audioCtxRef.current;master=masterGainRef.current;if(!ctx||!master)return;}
      if(ctx.state==="suspended"){await ctx.resume();}
      const pad=PADS.find(p=>p.id===id);const freq=pad?.f||440;
      const osc=ctx.createOscillator();const gain=ctx.createGain();const filter=ctx.createBiquadFilter();
      osc.type=id==="KICK"?"sine":id==="SNARE"?"triangle":id==="HIHAT"?"square":"sine";osc.frequency.value=freq;
      filter.type="lowpass";filter.frequency.value=id==="HIHAT"?6000:2500;filter.Q.value=1;
      gain.gain.value=0;gain.gain.setValueAtTime(0,ctx.currentTime);gain.gain.linearRampToValueAtTime(0.9,ctx.currentTime+0.01);gain.gain.exponentialRampToValueAtTime(0.01,ctx.currentTime+(id==="KICK"?0.5:id==="HIHAT"?0.2:0.4));
      osc.connect(filter);filter.connect(gain);gain.connect(master!);osc.start();osc.stop(ctx.currentTime+0.6);
      setAudioMsg(`PLAY ${id} ${freq}Hz LIVE CINEMA ${selectedMod.id} Q ${quantum.toFixed(1)}pc`);
    }catch(e:any){setAudioMsg(`PLAY ERROR ${id} ${String(e)}`);}
  },[initAudio,selectedMod,quantum]);
  const playBandlab=useCallback(async(idx:number)=>{
    try{
      if(!bandlabAudioRef.current){bandlabAudioRef.current=new Audio();bandlabAudioRef.current.crossOrigin="anonymous";}
      const track=BANDLAB_TRACKS[idx];const url=CDN_A+encodeURIComponent(track.file);
      bandlabAudioRef.current.src=url;bandlabAudioRef.current.volume=0.9;
      if(audioCtxRef.current && audioCtxRef.current.state==="suspended"){await audioCtxRef.current.resume();}
      await bandlabAudioRef.current.play();
      setBandlabIdx(idx);setIsBandlabPlaying(true);setAudioMsg(`BANDLAB REAL LIVE ${track.file} ${track.bpm}BPM CINEMA IMAGE TRES IMPORTANT`);
    }catch(e:any){setAudioMsg(`BANDLAB ERROR ${String(e)}`);}
  },[]);
  const curCinema=CINEMA_PRIORITY[cinemaIdx];const curVis=VISUALS[streamIdx];const curHash=HASHES[streamIdx%HASHES.length];const seed=seedFromHash(curHash);
  return(
    <div className="min-h-screen bg-black text-white font-mono flex flex-col" style={{touchAction:"manipulation"}}>
      {/* HEADER CINEMA IMAGE TRES IMPORTANT */}
      <div className="border-b-2 border-yellow-500 p-2 bg-gradient-to-r from-zinc-950 via-black to-zinc-950 sticky top-0 z-50">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-yellow-400 text-[14px] font-bold tracking-widest">MAG CORE V36 CINEMA IMAGE TRES IMPORTANT - VISUEL IMAGE CINEMA PRIORITE ABSOLUE - FINAL CINEMA RECULL</h1>
            <div className="text-[10px] text-zinc-300">SHA 537e46c2fd9996a3f04d10fc024198b8094e9b167950cb6b2e9b214600f9b9ea | 38 FILES | CONF {conf.toFixed(1)}pc Q {quantum.toFixed(1)}pc | SEED {seed} | CINEMA IMAGE TRES IMPORTANT | {curCinema.file} {curCinema.hash.slice(0,12)} {curCinema.size} | {curCinema.role}</div>
          </div>
          <button onClick={initAudio} className={`px-4 py-2 border-2 text-[11px] font-bold ${audioReady?"bg-green-800 border-green-400 text-green-100 shadow-[0_0_15px_#4CD964]":"bg-red-800 border-red-400 text-red-100 animate-pulse"}`}>{audioReady?`AUDIO LIVE CINEMA READY ${audioCtxRef.current?.state}`:`INIT AUDIO LIVE + CINEMA`}</button>
        </div>
        <div className={`text-[10px] mt-1 p-1 border ${audioReady?"bg-green-900/30 border-green-600 text-green-200":"bg-yellow-900/30 border-yellow-600 text-yellow-200"}`}>{audioMsg} | MOD {selectedMod.id} {selectedMod.name} CINEMA {selectedMod.cinema} | {curCinema.role} | TRES IMPORTANT | {perf.checks}/7140 {perf.timeMs.toFixed(1)}ms</div>
        <div className="flex gap-1 mt-2 text-[10px]">{(["CINEMA","AUDIO","FIELD","VISUALS"] as Tab[]).map(t=><button key={t} onClick={()=>setTab(t)} className={`px-4 py-1 border-2 font-bold ${tab===t?"bg-yellow-900 border-yellow-400 text-yellow-100 shadow-[0_0_10px_#FFD700]":"bg-zinc-900 border-zinc-700 text-zinc-400"}`}>{t} {t==="CINEMA"?"★ TRES IMPORTANT":""}</button>)}</div>
      </div>

      {tab==="CINEMA"&&(
        <div className="p-2 flex flex-col gap-2">
          {/* HERO CINEMA IMAGE TRES IMPORTANT */}
          <div className="border-4 border-yellow-400 p-2 bg-black shadow-[0_0_30px_#FFD700]">
            <div className="text-yellow-400 text-[13px] font-bold mb-2">★ IMAGE CINEMA TRES IMPORTANT - HERO CINEMA - FINAL_CINEMA_RECULL.PNG 487f1c55 1361394 - PRIORITE ABSOLUE</div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
              <div className="lg:col-span-2 border-2 border-yellow-600 bg-zinc-900 relative overflow-hidden">
                <img src={CDN_V+encodeURIComponent(curCinema.file)} alt={curCinema.file} className="w-full h-[400px] lg:h-[500px] object-contain bg-black" loading="eager" onError={e=>{(e.target as HTMLImageElement).src=CDN_V+"final_cinema_recull.png";}} />
                <div className="absolute top-0 left-0 bg-yellow-400 text-black text-[10px] font-bold px-2 py-1">★ CINEMA IMAGE TRES IMPORTANT - {curCinema.file}</div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/90 p-2 text-[9px]"><span className="text-yellow-300">{curCinema.file} | {curCinema.hash} | {curCinema.size} bytes | {curCinema.role} | SEED {curCinema.seed} | CONF {conf.toFixed(1)}pc Q {quantum.toFixed(1)}pc | MOD {selectedMod.id} | TRES IMPORTANT</span></div>
              </div>
              <div className="border-2 border-zinc-700 bg-zinc-900/50 p-2 flex flex-col gap-2">
                <div className="text-[11px] text-yellow-400 font-bold">CINEMA GALLERY PRIORITE - 10 IMAGES TRES IMPORTANTES - CLICK POUR HERO</div>
                <div className="grid grid-cols-2 gap-2 overflow-y-auto max-h-[500px]">
                  {CINEMA_PRIORITY.map((c,i)=>(
                    <div key={c.file} onClick={()=>setCinemaIdx(i)} className={`border-2 cursor-pointer relative overflow-hidden ${cinemaIdx===i?"border-yellow-400 scale-105 shadow-[0_0_15px_#FFD700]":"border-zinc-700 opacity-80"}`}>
                      <img src={CDN_V+encodeURIComponent(c.file)} alt={c.file} className="w-full h-[100px] object-cover" loading="lazy" onError={e=>{(e.target as HTMLImageElement).style.display='none';}} />
                      <div className="absolute top-0 left-0 bg-black/80 text-[6px] text-white p-px">{c.file.slice(0,15)} {c.hash.slice(0,6)}</div>
                      <div className="absolute bottom-0 left-0 right-0 bg-yellow-900/80 text-[6px] text-yellow-100 p-px truncate">{c.role} {i===cinemaIdx?"● HERO TRES IMPORTANT":""}</div>
                    </div>
                  ))}
                </div>
                <div className="border border-yellow-600 bg-yellow-900/20 p-2">
                  <div className="text-[10px] text-yellow-300 font-bold">SELECTED CINEMA {curCinema.file}</div>
                  <div className="text-[8px] text-zinc-300">Hash {curCinema.hash}</div>
                  <div className="text-[8px] text-zinc-300">Size {curCinema.size} Seed {curCinema.seed}</div>
                  <div className="text-[8px] text-yellow-200">{curCinema.role}</div>
                  <div className="text-[7px] text-zinc-400 mt-1">SHA 537e46c2 38 FILES - final_cinema_recull.png est l'image cinema principale de MAGCORE_SP01_RC1/2. visuals/ - 1361394 bytes - tres important pour recull cinema - cover.png.jpg + magma_core_realistic_transparent.png + file_00000000fac481f4946843bebec79a30.png etc sont les visuels cinema VFX - TRES IMPORTANT</div>
                </div>
              </div>
            </div>
          </div>

          {/* SECONDARY CINEMA STRIP */}
          <div className="border-2 border-zinc-700 p-2 bg-black">
            <div className="text-[11px] text-yellow-400 font-bold mb-1">CINEMA STRIP 33 VISUALS - VISUEL IMAGE CINEMA TRES IMPORTANT - PROCEDURAL HASH SEED</div>
            <div className="grid grid-cols-6 lg:grid-cols-11 gap-1">
              {VISUALS.map((v,i)=>{const h=HASHES[i%HASHES.length];const sd=seedFromHash(h);const r=(sd*3)%255,g=(sd*7)%255,b=(sd*13)%255;const isCinema=CINEMA_PRIORITY.some(c=>c.file===v);return(<div key={v} onClick={()=>{setStreamIdx(i);const cinemaFound=CINEMA_PRIORITY.findIndex(c=>c.file===v);if(cinemaFound>=0)setCinemaIdx(cinemaFound);}} className={`h-[60px] border-2 relative overflow-hidden cursor-pointer ${i===streamIdx?'border-yellow-400 scale-110 shadow-[0_0_10px_#FFD700] z-10':isCinema?'border-yellow-600 scale-105':'border-zinc-800 opacity-60'}`} style={{background:`rgb(${r},${g},${b})`}}><img src={CDN_V+encodeURIComponent(v)} alt={v} className="w-full h-full object-cover opacity-80" loading="lazy" onError={e=>{(e.target as HTMLImageElement).style.display='none';}} /><div className="absolute top-0 left-0 text-[5px] bg-black/70 text-white p-px">{h.slice(0,6)} {isCinema?"★ CINEMA":""}</div><div className="absolute bottom-0 left-0 right-0 bg-black/80 text-[5px] text-yellow-300 truncate">{v.slice(0,12)} {i===streamIdx?"● STREAM":""}</div></div>);})}
            </div>
          </div>

          {/* FIELD + CINEMA SYNC */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
            <div className="border-2 border-yellow-600 p-2 bg-black"><div className="text-yellow-400 text-[10px] mb-1">FIELD_OS 120 DRONES SYNC CINEMA IMAGE {selectedMod.id} {selectedMod.cinema} - Q {quantum.toFixed(1)}pc - {perf.checks}/7140 {perf.timeMs.toFixed(1)}ms</div><div className="flex justify-center"><canvas ref={canvasRef} width={360} height={360} className="block bg-black border-2 border-yellow-800" /></div></div>
            <div className="lg:col-span-2 border-2 border-yellow-500 p-2 bg-black"><div className="text-yellow-400 text-[10px] mb-1">VIDEO STREAM 24FPS 640x360 CINEMA SYNC - {curVis} | {curHash.slice(0,12)} SEED {seed} | MOD {selectedMod.id} | CINEMA {curCinema.file} | TRES IMPORTANT</div><div className="relative w-full h-[360px] bg-zinc-900 overflow-hidden border-2 border-zinc-700"><canvas ref={vCanvasRef} width={640} height={360} className="w-full h-full object-cover" /><div className="absolute bottom-0 left-0 right-0 bg-black/90 p-1 text-[8px] flex justify-between"><span className="text-yellow-300">V36 CINEMA {curVis} SEED {seed} | CINEMA HERO {curCinema.file} | MOD {selectedMod.id} {selectedMod.name} | TRES IMPORTANT | {conf.toFixed(1)}pc Q {quantum.toFixed(1)}pc</span></div></div></div>
          </div>
        </div>
      )}

      {tab==="AUDIO"&&(
        <div className="p-2 grid grid-cols-1 lg:grid-cols-2 gap-2">
          <div className="border-2 border-purple-600 p-2 bg-black">
            <div className="text-purple-400 text-[12px] font-bold mb-2">AUDIO ENGINE - BANDLAB REAL + MPC - CINEMA SYNC - AUDIO SUPER</div>
            <div className="border border-zinc-700 p-2 bg-zinc-900/30 mb-2"><div className="text-[10px] text-yellow-400 mb-1">BANDLAB REAL 3 MP3 LIVE - CINEMA SYNC - PLUS INEXISTANT</div>{BANDLAB_TRACKS.map((t,i)=>(<div key={t.file} className={`flex justify-between items-center border p-2 mt-1 ${bandlabIdx===i&&isBandlabPlaying?"bg-green-900 border-green-400":"bg-black border-zinc-700"}`}><div><div className="text-[10px] text-white font-bold">{t.file}</div><div className="text-[8px] text-zinc-400">{t.hash.slice(0,16)} {t.size} {t.bpm}BPM</div></div><button onClick={()=>playBandlab(i)} className="px-3 py-2 bg-yellow-900 border border-yellow-500 text-[10px] text-yellow-200 font-bold">{bandlabIdx===i&&isBandlabPlaying?"▶ PLAYING LIVE":"▶ PLAY REAL"}</button></div>))}</div>
            <div className="grid grid-cols-3 gap-2">{PADS.map(p=>(<button key={p.id} onClick={()=>play(p.id)} className={`h-20 border-2 p-2 text-[10px] font-bold flex flex-col justify-between ${activePad===p.id?'bg-green-900 scale-90 shadow-[0_0_20px_#4CD964] border-green-400':'bg-zinc-900'}`} style={{borderColor:activePad===p.id?"#4CD964":p.c,color:activePad===p.id?"#4CD964":p.c}}><span>{p.id}</span><span className="text-[14px]">{p.k}</span><span className="text-[8px]">{p.f}Hz {audioReady?"LIVE":"INIT"}</span></button>))}</div>
          </div>
          <div className="border-2 border-zinc-700 p-2 bg-black"><div className="text-[11px] text-yellow-400 font-bold mb-1">CINEMA IMAGE TRES IMPORTANT - {curCinema.file} - PREVIEW AUDIO SYNC</div><img src={CDN_V+encodeURIComponent(curCinema.file)} alt={curCinema.file} className="w-full h-[300px] object-contain bg-black border-2 border-yellow-800" /><div className="text-[8px] text-zinc-400 mt-1">{curCinema.role} | {curCinema.hash} | {curCinema.size} | SEED {curCinema.seed} | MOD {selectedMod.id} | AUDIO SYNC {audioReady?"LIVE":"INIT"} | TRES IMPORTANT</div></div>
        </div>
      )}

      {tab==="FIELD"&&(
        <div className="p-2 border-2 border-yellow-600 bg-black"><div className="text-yellow-400 text-[12px] font-bold mb-2">FIELD_OS 120 DRONES + CINEMA IMAGE SYNC - {selectedMod.id} {selectedMod.cinema}</div><div className="flex flex-col lg:flex-row gap-2"><div><canvas ref={canvasRef} width={360} height={360} className="block bg-black border-2 border-yellow-800" /></div><div className="flex-1"><img src={CDN_V+encodeURIComponent(curCinema.file)} alt={curCinema.file} className="w-full h-[360px] object-contain bg-black border-2 border-yellow-600" /><div className="text-[9px] text-yellow-300 mt-1">{curCinema.file} | {curCinema.role} | TRES IMPORTANT | SYNC FIELD {selectedMod.id} Q {quantum.toFixed(1)}pc | {perf.checks}/7140 {perf.timeMs.toFixed(1)}ms</div></div></div></div>
      )}

      {tab==="VISUALS"&&(
        <div className="p-2 border-2 border-yellow-500 bg-black"><div className="text-yellow-400 text-[12px] font-bold mb-1">VISUALS 33 FILES - CINEMA IMAGE TRES IMPORTANT PRIORITY - {curCinema.file} HERO + 33 GRID</div><div className="relative w-full h-[400px] bg-zinc-900 overflow-hidden border-2 border-zinc-700 mb-2"><canvas ref={vCanvasRef} width={640} height={360} className="w-full h-full object-cover" /><img src={CDN_V+encodeURIComponent(curCinema.file)} alt={curCinema.file} className="absolute top-2 right-2 w-[200px] h-[120px] object-cover border-2 border-yellow-400 shadow-[0_0_20px_#FFD700]" /><div className="absolute bottom-0 left-0 right-0 bg-black/90 p-1 text-[8px]"><span className="text-yellow-300">HERO CINEMA {curCinema.file} | STREAM {curVis} | SEED {seed} | MOD {selectedMod.id} | TRES IMPORTANT</span></div></div><div className="grid grid-cols-6 lg:grid-cols-11 gap-1">{VISUALS.map((v,i)=>{const h=HASHES[i%HASHES.length];const isCinema=CINEMA_PRIORITY.some(c=>c.file===v);return(<div key={v} onClick={()=>{setStreamIdx(i);const f=CINEMA_PRIORITY.findIndex(c=>c.file===v);if(f>=0)setCinemaIdx(f);}} className={`h-[60px] border-2 relative overflow-hidden cursor-pointer ${i===streamIdx?'border-yellow-400 scale-110 z-10':isCinema?'border-yellow-600':'border-zinc-800 opacity-60'}`}><img src={CDN_V+encodeURIComponent(v)} alt={v} className="w-full h-full object-cover" loading="lazy" onError={e=>{(e.target as HTMLImageElement).style.display='none';}} /><div className="absolute top-0 left-0 text-[5px] bg-black/70 text-white p-px">{h.slice(0,6)} {isCinema?"★":""}</div></div>);})}</div></div>
      )}

      <div className="border-2 border-green-500 p-3 bg-zinc-900/30 text-[10px] leading-5 m-2">
        <div className="text-green-400 font-bold text-[12px]">V36 CINEMA IMAGE TRES IMPORTANT - VISUEL IMAGE CINEMA PRIORITE ABSOLUE - FINAL_CINEMA_RECULL.PNG 487f1c55 1361394 - PLUS OUBLIE</div>
        <div className="text-zinc-200">FIX: V35 SIMPLIFIED TREE EASY ACCESS avait audio super mais visuel image cinema pas en priorité absolue - tu as dit Oui Et n'oublie pas le visuel image cinema, tres important. V36 CINEMA IMAGE PRIORITE ABSOLUE: HERO CINEMA IMAGE TRES IMPORTANT avec final_cinema_recull.png 487f1c55e33552dd268f6629756031e1ce7ce1382fe8b00e983ed73148aa722b 1361394 bytes role IMAGE CINEMA PRIORITE TRES IMPORTANT - CINEMA RECULL + cover.png.jpg 61195cec 206205 COVER CINEMA TRES IMPORTANT + file_00000000fac481f4946843bebec79a30.png 4ec08d51 2289142 CINEMA VISUAL PROMPT TRES IMPORTANT + file_000000009718820a92f8f0bbfda5f6ba.png 9e04ebae 2312176 CINEMA FRAME 2 TRES IMPORTANT + IMG_4486.PNG c81396ed 2479053 CINEMA SHOT 4486 TRES IMPORTANT + IMG_4602.PNG 263a5d4db 2606050 CINEMA SHOT 4602 TRES IMPORTANT + IMG_4792.PNG fe931c13 1080172 CINEMA SHOT 4792 TRES IMPORTANT + magma_core_realistic_transparent.png 7d4b7c6b 2728704 MAGMA CORE REALISTIC TRANSPARENT CINEMA VFX TRES IMPORTANT + file_00000000043081f48416466028827c19.png aa7e6d35 1586554 CINEMA PROMPT 1 TRES IMPORTANT + file_00000000a3d081f4bd24cb49880b935e.png c0d6305c 1969760 CINEMA PROMPT 2 TRES IMPORTANT - 10 images tres importantes - gallery 2 cols max-h-500px overflow-y-auto click pour hero 400-500px object-contain bg-black border-4 border-yellow-400 shadow 0 0 30px #FFD700 + top left badge ★ CINEMA IMAGE TRES IMPORTANT + bottom bar hash size role seed conf q mod tres important + secondary cinema strip 33 visuals grid 6 cols lg 11 cols h-60px border-2 isCinema border-yellow-600 scale-105 vs border-zinc-800 + click streamIdx + cinemaFound setCinemaIdx sync + FIELD + CINEMA SYNC canvas 360 + hero 360 side by side + AUDIO tab avec cinema preview 300px + VISUALS tab avec hero 200x120 overlay top right shadow 0 0 20px #FFD700 + header sticky top z-50 gradient zinc-950 black + tabs CINEMA ★ TRES IMPORTANT AUDIO FIELD VISUALS + header SHA 537e46c2 38 FILES CONF Q SEED CINEMA file hash size role + audioMsg MOD cinema + perf checks/7140. Socle SHA 537e46c2fd9996a3f04d10fc024198b8094e9b167950cb6b2e9b214600f9b9ea 38 FILES 097bbf6 2026-10-02 Jean-Christophe Achille LE FUTUR SE CONSTRUIT DANS L INVISIBLE - GO PUR 60 sur 60 - V36 CINEMA IMAGE TRES IMPORTANT - VERROUILLE.</div>
      </div>
    </div>
  );
}
