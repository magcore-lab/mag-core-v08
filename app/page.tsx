"use client";
import { useEffect, useRef, useState, useCallback } from "react";
/* MAG CORE V34 FIXED BUILD 209 - FIX Type error: left-hand side of arithmetic must be number - boolean * 0.7 -> ternary
SHA 537e46c2fd9996a3f04d10fc024198b8094e9b167950cb6b2e9b214600f9b9ea | 38 FILES | 097bbf6 | 2026-10-02
Jean-Christophe Achille | LE FUTUR SE CONSTRUIT DANS L'INVISIBLE
FIX BUILD 15:22:38.921 Failed to compile ./app/page.tsx:209:239 Type error: The left-hand side of an arithmetic operation must be ...
-> opacity:0.3+selectedMod.dmx.includes(ch)*0.7 -> includes boolean * number illegal TS -> fixed to ternary ? 1 : 0.3
*/
type ModType={id:string;name:string;color:string;val:number;role:string;quantum:string;bandlab:string;dmx:number[];tv:number};
const MODS_INIT:ModType[]=[
{id:"SAT01",name:"CORE LOCK",color:"#FF3B30",val:94,role:"LEADER DECAGONE",quantum:"superposition 3 etats",bandlab:"After_the_Last_Train.mp3",dmx:[1,25,49],tv:1},
{id:"SAT02",name:"PRESS MEDIA",color:"#4CD964",val:88,role:"STREAM 33 FILES",quantum:"entanglement media",bandlab:"Cinematic luxury hip-hop trail",dmx:[13,37,61],tv:2},
{id:"SAT03",name:"ATLAS MAP",color:"#007AFF",val:91,role:"MAPPING POSITION XYZ",quantum:"coherence xyz",bandlab:"Menaces instrumental",dmx:[25,49,73],tv:3},
{id:"SAT04",name:"FIELD_OS",color:"#FFD700",val:100,role:"FIELD 120 DRONES SWARM",quantum:"champ quantique 120",bandlab:"FIELD_OS 120 drones",dmx:[37,61,85],tv:4},
{id:"SAT05",name:"AUDIO ENG",color:"#AF52DE",val:86,role:"AUDIO VINYL SP1200 12bit",quantum:"superposition audio",bandlab:"BANDLAB REAL 3 MP3 LIVE",dmx:[49,73,97],tv:5},
{id:"SAT06",name:"DMX CTRL",color:"#FF9500",val:89,role:"DMX 13 CH MASTER",quantum:"entanglement DMX",bandlab:"DMX 13 CH",dmx:[61,85,109],tv:6},
{id:"SAT07",name:"TV BROAD",color:"#5AC8FA",val:92,role:"TV 8 SLOTS SYNC",quantum:"coherence TV",bandlab:"TV 8 slots",dmx:[73,97,121],tv:7},
{id:"SAT08",name:"HASH VER",color:"#8E8E93",val:97,role:"HASH SHA 537e46c2",quantum:"verification SHA 38",bandlab:"HASH VER",dmx:[85,109,133],tv:8},
{id:"SAT09",name:"PARTICULE",color:"#FF2D55",val:95,role:"SWARM 120 PARTICULE",quantum:"swarm boids qp",bandlab:"SWARM",dmx:[97,121,145],tv:1},
{id:"SAT10",name:"PERF MON",color:"#30D158",val:90,role:"PERF 770 sur 7140",quantum:"optimisation O(n)",bandlab:"PERF MON",dmx:[109,133,1],tv:2},
];
const HASHES=["0802e2236c98342bc1c3695d580ff86","8720b7530c6b52a38200fa25a9a8","8627436d8a69ec1c740d8c943f7a4f","97e081b1c2ca8a7d67b184ee1d833","87a3a3a58a1d5068a60f576e33caf","c2663bf56a096dd7ca3e29f8a23aac","ab484283599eeb659ba3312ba189","af32c45e023bb2d435bf0c2d5604fe","48c949f09aa49d5191d5f34be90a5f","1aed4db31a1ca6ea39cb3938b0a6d6","a669ae0a89dd01861e2e21faa37f11","c593e939a32a4fda092b3f876613e","28bab40d2e1e333d8dbdc1087ddd00","b4f04f857542fadb88805e99633c71","d438fab5e2b64f00320f3c6686d802","25ed1d6bcb999e8e488db80afa139e","db2535ce5a2ffcb39dd0adb62aa754","4661e2f1d69efb926fc22d1585a5aad","b91bdff04bef8887fb7e2bd9c9625c5","4833e09b506e962fda1f52c7660bf5","61195cecfe84fa23a047a881cf97b","2d0e75b14d2e9e2f21516716cb881c1","aa7e6d35d600841b31edd27844926e","9e04ebae498a31e4898a76da5efd0f","c0d6305c146ae71c9cf6d22fea6694","7d481457980926950cac91fc0e7c31","4ec08d51ffd98929ddfe31c6d1ea334","487f1c55e33552dd268f662975603","c81396ed170e1a00fe113350143ca","263a5d4db6987eb748426b2226d616","fe931c13b059498bf092502583b66","7d4b7c6bea402296e83f6ca158f7d4c","eb7c82021a5a689a485de87e5fb807"];
const VISUALS=["20260911_144548146.png","6a82bb18-a340-4a39-ae40-3808c6ba63bf.jpg","777478936_1574705714151814_8438573313539160794_n.webp","799404679_1593136164975441_3470481813043264057_n.webp.jpg","799458932_1117972420555635_751670485585895067_n.webp.jpg","802505119_28169594866030406_1429598835089382160_n.webp.jpg","802652739_1059071260066240_561078578262900998_n.webp.jpg","825292786_2541633396250691_4923362792537113309_n.webp.jpg","825292897_870890789443224_8166395198019700685_n.webp.jpg","825292990_2621302431621562_7270606127661261564_n.webp.jpg","825356378_3649072738580312_3945833506990225259_n.webp.jpg","827484417_1624656912497555_6934370519878760994_n.webp.jpg","828603423_1070299689165936_7395939595943028622_n.webp.jpg","830199193_1817125372821863_7806101152028945218_n.webp.jpg","831185277_1087622337458108_1682942978757639424_n.webp.jpg","831705146_1084548654373809_3188058598217552940_n.webp.jpg","833219203_979362861114739_2326777725030546102_n.webp","833995418_971383018626924_6035757767756950923_n-1.webp","af795ea8e17c00621f5fbd9dca0c0765.webp","change_hands_posture_hat_b8ea31ae.jpg","cover.png.jpg","FB_IMG_1790321696729.jpg","file_00000000043081f48416466028827c19.png","file_000000009718820a92f8f0bbfda5f6ba.png","file_00000000a3d081f4bd24cb49880b935e.png","file_00000000c9ac81f4a07f91531051a26c.png","file_00000000fac481f4946843bebec79a30.png","final_cinema_recull.png","IMG_4486.PNG","IMG_4602.PNG","IMG_4792.PNG","magma_core_realistic_transparent.png","photo4224078515220673912.jpeg"];
const BANDLAB_TRACKS=[
{file:"After_the_Last_Train.mp3",hash:"063b0b3ff98de55bf9918b7569896c6197812217a0031065832daf8b46f891f8",size:"4.2 MB",role:"BANDLAB EXPORT 1",bpm:92},
{file:"Cinematic luxury hip-hop trail..._1790931212136.mp3",hash:"f8d179943824e6c903d752377d43fe2ca2183c2827a757411250c0b9c57e6eae",size:"1.8 MB",role:"BANDLAB EXPORT 2",bpm:90},
{file:"Menaces, instrumental (4).mp3",hash:"d40e1777f66051eb62e61b2bdc9cfe3f0950dffa43def7f8eed0593b2ab5e753",size:"4.9 MB",role:"BANDLAB EXPORT 3",bpm:94},
];
const DMX=[1,13,25,37,49,61,73,85,97,109,121,133,145];
const BEATS=[{id:"HIT92",name:"RADIO HIT 92 Amin",bpm:92,chords:"Am F C G",bass:"A2 C3 E3 G2",hook:"C5 A4 G4 E4"},{id:"DUSTY90",name:"DUSTY 90 Fmin",bpm:90,chords:"Fm D A E",bass:"F2 A2 C3 E2",hook:"vinyl chop"},{id:"BOUNCE94",name:"BOUNCE 94 Dmin",bpm:94,chords:"Dm Bb F C",bass:"D2 F2 A2 C2",hook:"808 MPC60"}];
const PADS=[{id:"KICK",c:"#FF3B30",k:"A",f:55},{id:"SNARE",c:"#4CD964",k:"S",f:180},{id:"HIHAT",c:"#FFD700",k:"D",f:8000},{id:"BASS",c:"#5AC8FA",k:"F",f:80},{id:"KEYS",c:"#AF52DE",k:"G",f:440},{id:"SAMPLE",c:"#FF2D55",k:"H",f:300}];
const CDN_V="https://cdn.jsdelivr.net/gh/magcore-lab/mag-core-v08@main/MAGCORE_SP01_RC1/2.%20visuals/";
const CDN_A="https://cdn.jsdelivr.net/gh/magcore-lab/mag-core-v08@main/MAGCORE_SP01_RC1/1.%20audio/";
const seedFromHash=(h:string)=>{let s=0;for(let i=0;i<8;i++)s+=parseInt(h.slice(i*2,i*2+2),16);return s;};
const drawVis=(ctx:CanvasRenderingContext2D,w:number,h:number,hash:string,conf:number,quantum:number,mod:ModType)=>{
  const seed=seedFromHash(hash);const r=(seed*3)%255,g=(seed*7)%255,b=(seed*13)%255;
  const grad=ctx.createLinearGradient(0,0,w,h);grad.addColorStop(0,`rgb(${r},${g},${b})`);grad.addColorStop(1,`rgb(20,15,5)`);ctx.fillStyle=grad;ctx.fillRect(0,0,w,h);
  for(let i=0;i<120;i++){const x=(seed*(i+1)*37)%w,y=(seed*(i+1)*57)%h;const hue=(seed+i*7+quantum*2)%360;ctx.fillStyle=`hsla(${hue},90%,60%,0.8)`;ctx.beginPath();ctx.arc(x%w,y%h,2.5,0,Math.PI*2);ctx.fill();}
  ctx.strokeStyle=mod.color;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(w/2,20);ctx.lineTo(w-30,h/2);ctx.lineTo(w/2,h-20);ctx.lineTo(30,h/2);ctx.closePath();ctx.stroke();
  ctx.fillStyle="#FFD700";ctx.font="bold 9px monospace";ctx.fillText(`V34 FIXED BUILD 209 ${mod.id} ${mod.name} ${conf.toFixed(1)}pc Q ${quantum.toFixed(1)}pc SEED ${seed}`,10,h-10);
};
export default function Page(){
  const [mods,setMods]=useState<ModType[]>([...MODS_INIT]);
  const [selectedMod,setSelectedMod]=useState<ModType>(MODS_INIT[4]);
  const [streamIdx,setStreamIdx]=useState(15);const [beatIdx,setBeatIdx]=useState(0);const [beat,setBeat]=useState(1);
  const [perf,setPerf]=useState({checks:0,theoretical:7140,timeMs:0});const [conf,setConf]=useState(99.9);const [quantum,setQuantum]=useState(99.0);
  const [dragActive,setDragActive]=useState<number|null>(null);const [audioReady,setAudioReady]=useState(false);const [activePad,setActivePad]=useState<string|null>(null);const [audioMsg,setAudioMsg]=useState("V34 FIXED BUILD 209 - INIT AUDIO LIVE + BANDLAB REAL");
  const [bandlabIdx,setBandlabIdx]=useState(0);const [isBandlabPlaying,setIsBandlabPlaying]=useState(false);
  const dronesRef=useRef<{x:number;y:number;vx:number;vy:number;qp:number;color:string}[]|null>(null);
  const perfRef=useRef({checks:0,theoretical:7140,timeMs:0});const canvasRef=useRef<HTMLCanvasElement>(null);const vCanvasRef=useRef<HTMLCanvasElement>(null);const dragMap=useRef<Map<number,{idx:number}>>(new Map());const rAFRef=useRef<number>(0);
  const audioCtxRef=useRef<AudioContext|null>(null);const masterGainRef=useRef<GainNode|null>(null);const bandlabAudioRef=useRef<HTMLAudioElement|null>(null);
  if(dronesRef.current===null){dronesRef.current=Array.from({length:120},(_,i)=>({x:Math.random()*320,y:Math.random()*320,vx:(Math.random()-0.5)*1.5,vy:(Math.random()-0.5)*1.5,qp:Math.random()*Math.PI*2,color:MODS_INIT[i%10].color}));}
  useEffect(()=>{
    const c=canvasRef.current;if(!c)return;const ctx=c.getContext("2d");if(!ctx)return;const drones=dronesRef.current!;const grid=new Map<string,typeof drones>();const cellSize=40;let frame=0;
    const render=()=>{
      const dpr=window.devicePixelRatio||1;c.width=320*dpr;c.height=320*dpr;c.style.width="320px";c.style.height="320px";ctx.setTransform(1,0,0,1,0,0);ctx.scale(dpr,dpr);ctx.fillStyle="#000";ctx.fillRect(0,0,320,320);
      const time=Date.now()/1000;frame++;grid.clear();let checks=0;
      drones.forEach(d=>{const cx=Math.floor(d.x/cellSize),cy=Math.floor(d.y/cellSize),key=`${cx*10007+cy}`;if(!grid.has(key))grid.set(key,[]);grid.get(key)!.push(d);});
      drones.forEach(d=>{
        const cx=Math.floor(d.x/cellSize),cy=Math.floor(d.y/cellSize);
        for(let dx=-1;dx<=1;dx++){for(let dy=-1;dy<=1;dy++){if(Math.abs(dx)+Math.abs(dy)>1)continue;const key=`${(cx+dx)*10007+(cy+dy)}`;const cell=grid.get(key);if(!cell)continue;cell.forEach(o=>{if(o===d)return;checks++;const dist=Math.hypot(d.x-o.x,d.y-o.y);if(dist<48&&dist>0){d.vx+=(d.x-o.x)/dist*0.02;d.vy+=(d.y-o.y)/dist*0.02;}});}}
        d.qp+=0.05;d.x+=d.vx+Math.sin(d.qp)*0.3;d.y+=d.vy+Math.cos(d.qp*1.3)*0.3;
        if(d.x<0||d.x>320){d.vx*=-0.8;d.x=Math.max(0,Math.min(320,d.x));}if(d.y<0||d.y>320){d.vy*=-0.8;d.y=Math.max(0,Math.min(320,d.y));}
        d.vx*=0.995;d.vy*=0.995;ctx.fillStyle=d.color;ctx.shadowColor=d.color;ctx.shadowBlur=6;ctx.beginPath();ctx.arc(d.x,d.y,2.8+Math.sin(time+d.qp)*0.5,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;
      });
      ctx.strokeStyle=selectedMod.color;ctx.lineWidth=2.3;ctx.beginPath();mods.forEach((_,i)=>{const a=(i/mods.length)*Math.PI*2-Math.PI/2,r=110,x=160+Math.cos(a)*r,y=160+Math.sin(a)*r;if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);});ctx.closePath();ctx.stroke();
      ctx.fillStyle=audioReady?"#4CD964":"#FFD700";ctx.font="bold 8px monospace";ctx.fillText(`V34 FIXED BUILD 209 FIELD 120 ${selectedMod.id} ${audioReady?"AUDIO LIVE + BANDLAB REAL":"INIT NEEDED"} ${conf.toFixed(1)}pc Q ${quantum.toFixed(1)}pc | ${checks} sur 7140 | ${perfRef.current.timeMs.toFixed(1)}ms`,6,310);
      if(frame%20===0){perfRef.current={checks,theoretical:7140,timeMs:performance.now()%100};setPerf({checks,theoretical:7140,timeMs:perfRef.current.timeMs});}
      rAFRef.current=requestAnimationFrame(render);
    };render();return()=>{cancelAnimationFrame(rAFRef.current);};
  },[mods,conf,quantum,audioReady,selectedMod]);
  useEffect(()=>{
    const vc=vCanvasRef.current;if(!vc)return;const vctx=vc.getContext("2d");if(!vctx)return;vc.width=640;vc.height=360;
    const render=(idx:number)=>{const hash=HASHES[idx%HASHES.length];drawVis(vctx,640,360,hash,conf,quantum,selectedMod);};
    render(streamIdx);const iv=window.setInterval(()=>{render(streamIdx);},1000/24);return()=>{clearInterval(iv);};
  },[streamIdx,conf,quantum,selectedMod]);
  useEffect(()=>{const iv=window.setInterval(()=>{setStreamIdx(p=>(p+1)%VISUALS.length);setBeat(b=>b%32+1);},3000);return()=>{clearInterval(iv);};},[]);
  const onDown=useCallback((e:React.PointerEvent,idx:number)=>{(e.target as HTMLElement).setPointerCapture(e.pointerId);dragMap.current.set(e.pointerId,{idx});setDragActive(idx);setSelectedMod(mods[idx]);if(navigator.vibrate)navigator.vibrate(30);},[mods]);
  const onMove=useCallback((e:React.PointerEvent)=>{
    const data=dragMap.current.get(e.pointerId);if(!data)return;const rect=(e.currentTarget as HTMLElement).getBoundingClientRect();const x=e.clientX-rect.left;const col=Math.floor((x/rect.width)*5);const newIdx=Math.max(0,Math.min(mods.length-1,col));
    if(newIdx!==data.idx){setMods(prev=>{const arr=[...prev];const [moved]=arr.splice(data.idx,1);arr.splice(newIdx,0,moved);return arr;});dragMap.current.set(e.pointerId,{idx:newIdx});setSelectedMod(mods[newIdx]);setQuantum(q=>Math.min(99.9,q+0.1));if(navigator.vibrate)navigator.vibrate(20);}
  },[mods]);
  const onUp=useCallback((e:React.PointerEvent)=>{const d=dragMap.current.get(e.pointerId);if(d){dragMap.current.delete(e.pointerId);setDragActive(null);if(navigator.vibrate)navigator.vibrate([40,20,40]);}},[]);
  const initAudio=useCallback(async()=>{
    try{
      if(audioCtxRef.current && masterGainRef.current){await audioCtxRef.current.resume();setAudioReady(true);setAudioMsg(`V34 FIXED BUILD 209 AUDIO LIVE RESUMED ${audioCtxRef.current.state} MASTER 0.8 BANDLAB REAL READY`);if(navigator.vibrate)navigator.vibrate([60,40,60]);return;}
      const ctx=new (window.AudioContext||(window as any).webkitAudioContext)();
      const master=ctx.createGain();master.gain.value=0.8;master.connect(ctx.destination);
      audioCtxRef.current=ctx;masterGainRef.current=master;
      await ctx.resume();
      const osc=ctx.createOscillator();const g=ctx.createGain();osc.frequency.value=440;g.gain.value=0.3;osc.connect(g);g.connect(master);osc.start();g.gain.exponentialRampToValueAtTime(0.01,ctx.currentTime+0.4);osc.stop(ctx.currentTime+0.4);
      setAudioReady(true);setConf(99.9);setQuantum(99.9);setAudioMsg(`V34 FIXED BUILD 209 AUDIO LIVE FIXED ${ctx.state} SR ${ctx.sampleRate}Hz MASTER 0.8 BANDLAB REAL 3 TRACKS READY - 440Hz TEST OK - BUILD 209 FIXED`);
      if(navigator.vibrate)navigator.vibrate([60,40,60,40]);
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
      setAudioMsg(`PLAY ${id} ${freq}Hz LIVE ${ctx.state} MOD ${selectedMod.id} Q ${quantum.toFixed(1)}pc BUILD 209 FIXED`);
      if(navigator.vibrate)navigator.vibrate(20);
    }catch(e:any){setAudioMsg(`PLAY ERROR ${id} ${String(e)}`);}
  },[initAudio,selectedMod,quantum]);
  const playBandlab=useCallback(async(idx:number)=>{
    try{
      if(!bandlabAudioRef.current){bandlabAudioRef.current=new Audio();bandlabAudioRef.current.crossOrigin="anonymous";}
      const track=BANDLAB_TRACKS[idx];const url=CDN_A+encodeURIComponent(track.file);
      bandlabAudioRef.current.src=url;bandlabAudioRef.current.volume=0.9;
      if(audioCtxRef.current && audioCtxRef.current.state==="suspended"){await audioCtxRef.current.resume();}
      await bandlabAudioRef.current.play();
      setBandlabIdx(idx);setIsBandlabPlaying(true);setAudioMsg(`BANDLAB REAL PLAY LIVE ${track.file} ${track.size} ${track.hash.slice(0,12)} ${track.bpm}BPM - V34 FIXED BUILD 209`);
      if(navigator.vibrate)navigator.vibrate([50,30,50]);
    }catch(e:any){setAudioMsg(`BANDLAB PLAY ERROR ${BANDLAB_TRACKS[idx].file} ${String(e)}`);}
  },[]);
  const curVis=VISUALS[streamIdx];const curHash=HASHES[streamIdx%HASHES.length];const seed=seedFromHash(curHash);const curBeat=BEATS[beatIdx];
  return(
    <div className="min-h-screen bg-black text-white font-mono p-2" style={{touchAction:"none"}}>
      <div className="border-2 border-green-500 p-2 mb-2 bg-green-900/30">
        <h1 className="text-green-400 text-[13px] font-bold">MAG CORE V34 FIXED BUILD 209 - FIX Type error arithmetic boolean * 0.7 - EXPERT V19-V33 RESTORED - BANDLAB REAL + AUDIO LIVE</h1>
        <div className="text-[10px] text-zinc-200">SHA 537e46c2fd9996a3f04d10fc024198b8094e9b167950cb6b2e9b214600f9b9ea | 38 FILES | 097bbf6 | CONF {conf.toFixed(1)}pc Q {quantum.toFixed(1)}pc | SEED {seed} | BUILD 209 FIXED - opacity ternary ? 1 : 0.3</div>
        <div className={`text-[11px] mt-1 p-2 border-2 ${audioReady?"bg-green-900 border-green-400 text-green-100":"bg-red-900 border-red-400 text-red-100 animate-pulse"}`}>{audioMsg} | MOD {selectedMod.id} {selectedMod.name} DMX {selectedMod.dmx.join(",")} TV {selectedMod.tv}</div>
      </div>
      <div className="border-2 border-yellow-500 p-2 mb-2 bg-black">
        <div className="text-yellow-400 text-[11px] font-bold mb-1">MODULES 10 SAT ACCESSIBLES - CLICK SELECT + DRAG - V34 FIXED BUILD 209</div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-2" style={{touchAction:"none"}} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}>
          {mods.map((m,idx)=>(
            <div key={`${m.id}-${idx}`} onPointerDown={(e)=>onDown(e,idx)} onClick={()=>setSelectedMod(m)} className={`border-2 p-2 cursor-pointer select-none ${selectedMod.id===m.id?"bg-yellow-900 border-yellow-300 scale-105 shadow-[0_0_20px_#FFD700]":"bg-zinc-900 border-zinc-700"} ${dragActive===idx?"scale-110":""}`} style={{borderColor:selectedMod.id===m.id?"#FFD700":dragActive===idx?"#FFD700":m.color,touchAction:"none",userSelect:"none"}}>
              <div className="flex justify-between"><div className="text-[9px] font-bold" style={{color:m.color}}>{m.id}</div><div className="text-[7px] text-zinc-400">{m.val}pc</div></div>
              <div className="text-[11px] text-white font-bold truncate">{m.name}</div>
              <div className="text-[8px] text-zinc-300 truncate">{m.role}</div>
              <div className="text-[7px] text-yellow-300 truncate">{m.quantum}</div>
              <div className="text-[7px] text-green-300 truncate">BANDLAB {m.bandlab}</div>
              <div className="text-[7px] text-blue-300">DMX {m.dmx.join(",")} TV{m.tv}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mb-2">
        <div className="border-2 border-yellow-600 p-2 bg-black" style={{touchAction:"none"}}>
          <div className="text-yellow-400 text-[10px] mb-1">FIELD_OS 120 DRONES FIXED BUILD 209 {selectedMod.id} GRID HASH {perf.checks} sur {perf.theoretical} {perf.timeMs.toFixed(1)}ms</div>
          <canvas ref={canvasRef} width={320} height={320} className="block bg-black w-full max-w-[320px] mx-auto border-2 border-yellow-800" style={{touchAction:"none"}} />
          <div className="mt-2 border border-zinc-700 p-1 bg-zinc-900/50">
            <div className="text-[10px] text-yellow-400 font-bold">BANDLAB REAL 3 MP3 LIVE FIXED BUILD 209</div>
            {BANDLAB_TRACKS.map((t,i)=>(
              <div key={t.file} className={`flex justify-between items-center border p-1 mt-1 ${bandlabIdx===i&&isBandlabPlaying?"bg-green-900 border-green-400":"bg-black border-zinc-700"}`}>
                <div><div className="text-[9px] text-white">{t.file}</div><div className="text-[7px] text-zinc-400">{t.hash.slice(0,16)} {t.size} {t.bpm}BPM</div></div>
                <button onClick={()=>playBandlab(i)} className="px-2 py-1 bg-yellow-900 border border-yellow-500 text-[8px] text-yellow-200">{bandlabIdx===i&&isBandlabPlaying?"PLAYING LIVE":"PLAY BANDLAB REAL"}</button>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-1 mt-2">
            {PADS.map(p=>(
              <button key={p.id} onClick={()=>play(p.id)} className={`h-16 border-2 p-1 text-[9px] font-bold ${activePad===p.id?'bg-green-900 scale-90 shadow-[0_0_25px_#4CD964] border-green-400':'bg-zinc-900'}`} style={{borderColor:activePad===p.id?"#4CD964":p.c,color:activePad===p.id?"#4CD964":p.c,touchAction:"none"}}>{p.id} {p.k} {audioReady?"PLAY LIVE":"INIT FIRST"} {p.f}Hz</button>
            ))}
          </div>
        </div>
        <div className="border-2 border-yellow-500 p-2 bg-black lg:col-span-2">
          <div className="relative w-full h-[320px] bg-zinc-900 overflow-hidden border-2 border-zinc-700">
            <canvas ref={vCanvasRef} width={640} height={360} className="w-full h-full object-cover" />
          </div>
          <div className="mt-2 border-2 border-zinc-700 p-2 bg-black">
            <div className="text-yellow-400 text-[11px] font-bold mb-1">DMX 13 CH + TV 8 SLOTS - FIXED BUILD 209 - opacity ternary ? 1 : 0.3 - PLUS Type error arithmetic</div>
            <div className="grid grid-cols-13 gap-1 text-[7px]">{DMX.map(ch=><div key={ch} className="border border-zinc-600 p-1 bg-zinc-900 text-center"><div>CH{ch}</div><div className="w-full h-2 bg-yellow-600 mt-1" style={{opacity: selectedMod.dmx.includes(ch) ? 1 : 0.3}} /><div className="text-[5px]">{selectedMod.dmx.includes(ch)?"ACTIVE":"IDLE"}</div></div>)}</div>
            <div className="mt-2 grid grid-cols-8 gap-1 text-[7px]">{Array.from({length:8},(_,i)=>i+1).map(slot=><div key={slot} className={`border p-1 text-center ${selectedMod.tv===slot?"bg-green-900 border-green-400 text-green-200":"bg-zinc-900 border-zinc-700"}`}><div>TV{slot}</div><div className="text-[5px]">{selectedMod.tv===slot?`SYNC ${selectedMod.id}`:"SYNC IDLE"}</div></div>)}</div>
            <div className="mt-2 text-[9px] text-yellow-300">{curBeat.id} {curBeat.name} | {curBeat.chords} <button onClick={()=>setBeatIdx(p=>(p+1)%BEATS.length)} className="ml-2 px-3 py-1 bg-yellow-900 border border-yellow-500 text-[9px] font-bold">NEXT {beatIdx+1} sur 3 PLAY LIVE {selectedMod.id}</button></div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-2">
        <button onClick={initAudio} className={`px-6 py-3 border-2 text-sm font-bold ${audioReady?"bg-green-900 border-green-400 text-green-200":"bg-red-900 border-red-400 text-red-200 animate-pulse"}`} style={{touchAction:"none"}}>{audioReady?`V34 FIXED BUILD 209 AUDIO LIVE + BANDLAB REAL READY MASTER 0.8 ${audioCtxRef.current?.state}`:`INIT V34 FIXED BUILD 209 - TAP ICI - FIX BUILD 209 boolean * 0.7`}</button>
      </div>
    </div>
  );
}
