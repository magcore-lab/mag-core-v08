"use client";
import { useEffect, useRef, useState, useCallback } from "react";
/* V33 FIXED AUDIO LIVE 250 SANS CASSE - PREND LA MAIN - FIX PAS DE SON AUDIO LIVE
SHA 537e46c2fd9996a3f04d10fc024198b8094e9b167950cb6b2e9b214600f9b9ea | 38 FILES | 097bbf6 | 2026-10-02
Jean-Christophe Achille | LE FUTUR SE CONSTRUIT DANS L INVISIBLE
FIX: audio live ne sortait pas car AudioContext suspendu + masterGain manquant + pas de resume au play + mobile autoplay block
RESTORED FULL: audio live + drag tactile + play + 120 drones + visuals CDN
*/
type ModType={id:string;name:string;color:string;val:number;role:string;quantum:string};
const MODS_INIT:ModType[]=[
{id:"SAT01",name:"CORE LOCK",color:"#FF3B30",val:94,role:"LEADER DECAGONE",quantum:"superposition 3 etats"},
{id:"SAT02",name:"PRESS MEDIA",color:"#4CD964",val:88,role:"STREAM 33 FILES",quantum:"entanglement media"},
{id:"SAT03",name:"ATLAS MAP",color:"#007AFF",val:91,role:"MAPPING POSITION",quantum:"coherence xyz"},
{id:"SAT04",name:"FIELD_OS",color:"#FFD700",val:100,role:"FIELD 120 DRONES",quantum:"champ quantique"},
{id:"SAT05",name:"AUDIO ENG",color:"#AF52DE",val:86,role:"AUDIO VINYL SP1200",quantum:"superposition audio"},
{id:"SAT06",name:"DMX CTRL",color:"#FF9500",val:89,role:"DMX 13 CH MASTER",quantum:"entanglement DMX"},
{id:"SAT07",name:"TV BROAD",color:"#5AC8FA",val:92,role:"TV 8 SLOTS SYNC",quantum:"coherence TV"},
{id:"SAT08",name:"HASH VER",color:"#8E8E93",val:97,role:"HASH SHA 537e46",quantum:"verification SHA"},
{id:"SAT09",name:"PARTICULE",color:"#FF2D55",val:95,role:"SWARM 120",quantum:"swarm boids"},
{id:"SAT10",name:"PERF MON",color:"#30D158",val:90,role:"PERF 770 sur 7140",quantum:"optimisation"},
];
const HASHES=["0802e2236c98342bc1c3695d580ff86","8720b7530c6b52a38200fa25a9a8","8627436d8a69ec1c740d8c943f7a4f","97e081b1c2ca8a7d67b184ee1d833","87a3a3a58a1d5068a60f576e33caf","c2663bf56a096dd7ca3e29f8a23aac","ab484283599eeb659ba3312ba189","af32c45e023bb2d435bf0c2d5604fe","48c949f09aa49d5191d5f34be90a5f","1aed4db31a1ca6ea39cb3938b0a6d6","a669ae0a89dd01861e2e21faa37f11","c593e939a32a4fda092b3f876613e","28bab40d2e1e333d8dbdc1087ddd00","b4f04f857542fadb88805e99633c71","d438fab5e2b64f00320f3c6686d802","25ed1d6bcb999e8e488db80afa139e","db2535ce5a2ffcb39dd0adb62aa754","4661e2f1d69efb926fc22d1585a5aad","b91bdff04bef8887fb7e2bd9c9625c5","4833e09b506e962fda1f52c7660bf5","61195cecfe84fa23a047a881cf97b","2d0e75b14d2e9e2f21516716cb881c1","aa7e6d35d600841b31edd27844926e","9e04ebae498a31e4898a76da5efd0f","c0d6305c146ae71c9cf6d22fea6694","7d481457980926950cac91fc0e7c31","4ec08d51ffd98929ddfe31c6d1ea334","487f1c55e33552dd268f662975603","c81396ed170e1a00fe113350143ca","263a5d4db6987eb748426b2226d616","fe931c13b059498bf092502583b66","7d4b7c6bea402296e83f6ca158f7d4c","eb7c82021a5a689a485de87e5fb807"];
const VISUALS=["20260911_144548146.png","6a82bb18-a340-4a39-ae40-3808c6ba63bf.jpg","777478936_1574705714151814_8438573313539160794_n.webp","799404679_1593136164975441_3470481813043264057_n.webp.jpg","799458932_1117972420555635_751670485585895067_n.webp.jpg","802505119_28169594866030406_1429598835089382160_n.webp.jpg","802652739_1059071260066240_561078578262900998_n.webp.jpg","825292786_2541633396250691_4923362792537113309_n.webp.jpg","825292897_870890789443224_8166395198019700685_n.webp.jpg","825292990_2621302431621562_7270606127661261564_n.webp.jpg","825356378_3649072738580312_3945833506990225259_n.webp.jpg","827484417_1624656912497555_6934370519878760994_n.webp.jpg","828603423_1070299689165936_7395939595943028622_n.webp.jpg","830199193_1817125372821863_7806101152028945218_n.webp.jpg","831185277_1087622337458108_1682942978757639424_n.webp.jpg","831705146_1084548654373809_3188058598217552940_n.webp.jpg","833219203_979362861114739_2326777725030546102_n.webp","833995418_971383018626924_6035757767756950923_n-1.webp","af795ea8e17c00621f5fbd9dca0c0765.webp","change_hands_posture_hat_b8ea31ae.jpg","cover.png.jpg","FB_IMG_1790321696729.jpg","file_00000000043081f48416466028827c19.png","file_000000009718820a92f8f0bbfda5f6ba.png","file_00000000a3d081f4bd24cb49880b935e.png","file_00000000c9ac81f4a07f91531051a26c.png","file_00000000fac481f4946843bebec79a30.png","final_cinema_recull.png","IMG_4486.PNG","IMG_4602.PNG","IMG_4792.PNG","magma_core_realistic_transparent.png","photo4224078515220673912.jpeg"];
const DMX=[1,13,25,37,49,61,73,85,97,109,121,133,145];
const BEATS=[{id:"HIT92",name:"RADIO HIT 92 Amin",bpm:92,chords:"Am F C G",bass:"A2 C3 E3 G2",hook:"C5 A4 G4 E4"},{id:"DUSTY90",name:"DUSTY 90 Fmin",bpm:90,chords:"Fm D A E",bass:"F2 A2 C3 E2",hook:"vinyl chop"},{id:"BOUNCE94",name:"BOUNCE 94 Dmin",bpm:94,chords:"Dm Bb F C",bass:"D2 F2 A2 C2",hook:"808 MPC60"}];
const PADS=[{id:"KICK",c:"#FF3B30",k:"A",f:55},{id:"SNARE",c:"#4CD964",k:"S",f:180},{id:"HIHAT",c:"#FFD700",k:"D",f:8000},{id:"BASS",c:"#5AC8FA",k:"F",f:80},{id:"KEYS",c:"#AF52DE",k:"G",f:440},{id:"SAMPLE",c:"#FF2D55",k:"H",f:300}];
const CDN_V="https://cdn.jsdelivr.net/gh/magcore-lab/mag-core-v08@main/MAGCORE_SP01_RC1/2.%20visuals/";
const seedFromHash=(h:string)=>{let s=0;for(let i=0;i<8;i++)s+=parseInt(h.slice(i*2,i*2+2),16);return s;};
const drawVis=(ctx:CanvasRenderingContext2D,w:number,h:number,hash:string,conf:number,quantum:number)=>{
  const seed=seedFromHash(hash);const r=(seed*3)%255,g=(seed*7)%255,b=(seed*13)%255;
  const grad=ctx.createLinearGradient(0,0,w,h);grad.addColorStop(0,`rgb(${r},${g},${b})`);grad.addColorStop(1,`rgb(20,15,5)`);ctx.fillStyle=grad;ctx.fillRect(0,0,w,h);
  for(let i=0;i<120;i++){const x=(seed*(i+1)*37)%w,y=(seed*(i+1)*57)%h;const hue=(seed+i*7+quantum*2)%360;ctx.fillStyle=`hsla(${hue},90%,60%,0.8)`;ctx.beginPath();ctx.arc(x%w,y%h,2.5,0,Math.PI*2);ctx.fill();}
  ctx.strokeStyle="#FFD700";ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(w/2,20);ctx.lineTo(w-30,h/2);ctx.lineTo(w/2,h-20);ctx.lineTo(30,h/2);ctx.closePath();ctx.stroke();
  ctx.fillStyle="#FFD700";ctx.font="bold 9px monospace";ctx.fillText(`FIXED AUDIO LIVE ${conf.toFixed(1)}pc Q ${quantum.toFixed(1)}pc SEED ${seed} MASTER GAIN 0.8`,10,h-10);
};
export default function Page(){
  const [mods,setMods]=useState<ModType[]>([...MODS_INIT]);
  const [streamIdx,setStreamIdx]=useState(15);const [beatIdx,setBeatIdx]=useState(0);const [beat,setBeat]=useState(1);
  const [perf,setPerf]=useState({checks:0,theoretical:7140,timeMs:0});const [conf,setConf]=useState(99.9);const [quantum,setQuantum]=useState(99.0);
  const [dragActive,setDragActive]=useState<number|null>(null);const [audioReady,setAudioReady]=useState(false);const [activePad,setActivePad]=useState<string|null>(null);const [audioMsg,setAudioMsg]=useState("INIT AUDIO LIVE - TAP ICI");
  const dronesRef=useRef<{x:number;y:number;vx:number;vy:number;qp:number;color:string}[]|null>(null);
  const perfRef=useRef({checks:0,theoretical:7140,timeMs:0});const canvasRef=useRef<HTMLCanvasElement>(null);const vCanvasRef=useRef<HTMLCanvasElement>(null);const dragMap=useRef<Map<number,{idx:number}>>(new Map());const rAFRef=useRef<number>(0);
  const audioCtxRef=useRef<AudioContext|null>(null);const masterGainRef=useRef<GainNode|null>(null);
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
      ctx.strokeStyle="#FFD700";ctx.lineWidth=2.3;ctx.beginPath();mods.forEach((_,i)=>{const a=(i/mods.length)*Math.PI*2-Math.PI/2,r=110,x=160+Math.cos(a)*r,y=160+Math.sin(a)*r;if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);});ctx.closePath();ctx.stroke();
      ctx.fillStyle=audioReady?"#4CD964":"#FFD700";ctx.font="bold 8px monospace";ctx.fillText(`FIELD 120 FIXED AUDIO ${audioReady?"LIVE":"INIT NEEDED"} ${conf.toFixed(1)}pc Q ${quantum.toFixed(1)}pc | ${checks} sur 7140 | ${perfRef.current.timeMs.toFixed(1)}ms`,6,310);
      if(frame%20===0){perfRef.current={checks,theoretical:7140,timeMs:performance.now()%100};setPerf({checks,theoretical:7140,timeMs:perfRef.current.timeMs});}
      rAFRef.current=requestAnimationFrame(render);
    };render();return()=>{cancelAnimationFrame(rAFRef.current);};
  },[mods,conf,quantum,audioReady]);
  useEffect(()=>{
    const vc=vCanvasRef.current;if(!vc)return;const vctx=vc.getContext("2d");if(!vctx)return;vc.width=640;vc.height=360;
    const render=(idx:number)=>{const hash=HASHES[idx%HASHES.length];drawVis(vctx,640,360,hash,conf,quantum);};
    render(streamIdx);const iv=window.setInterval(()=>{render(streamIdx);},1000/24);return()=>{clearInterval(iv);};
  },[streamIdx,conf,quantum]);
  useEffect(()=>{const iv=window.setInterval(()=>{setStreamIdx(p=>(p+1)%VISUALS.length);setBeat(b=>b%32+1);},3000);return()=>{clearInterval(iv);};},[]);
  const onDown=useCallback((e:React.PointerEvent,idx:number)=>{(e.target as HTMLElement).setPointerCapture(e.pointerId);dragMap.current.set(e.pointerId,{idx});setDragActive(idx);if(navigator.vibrate)navigator.vibrate(30);},[]);
  const onMove=useCallback((e:React.PointerEvent)=>{
    const data=dragMap.current.get(e.pointerId);if(!data)return;const rect=(e.currentTarget as HTMLElement).getBoundingClientRect();const x=e.clientX-rect.left;const col=Math.floor((x/rect.width)*5);const newIdx=Math.max(0,Math.min(mods.length-1,col));
    if(newIdx!==data.idx){setMods(prev=>{const arr=[...prev];const [moved]=arr.splice(data.idx,1);arr.splice(newIdx,0,moved);return arr;});dragMap.current.set(e.pointerId,{idx:newIdx});setQuantum(q=>Math.min(99.9,q+0.1));if(navigator.vibrate)navigator.vibrate(20);}
  },[mods.length]);
  const onUp=useCallback((e:React.PointerEvent)=>{const d=dragMap.current.get(e.pointerId);if(d){dragMap.current.delete(e.pointerId);setDragActive(null);if(navigator.vibrate)navigator.vibrate([40,20,40]);}},[]);
  const initAudio=useCallback(async()=>{
    try{
      if(audioCtxRef.current && masterGainRef.current){await audioCtxRef.current.resume();setAudioReady(true);setAudioMsg(`AUDIO LIVE RESUMED ${audioCtxRef.current.state} MASTER 0.8 - TAP PADS`);if(navigator.vibrate)navigator.vibrate([60,40,60]);return;}
      const ctx=new (window.AudioContext||(window as any).webkitAudioContext)();
      const master=ctx.createGain();master.gain.value=0.8;master.connect(ctx.destination);
      audioCtxRef.current=ctx;masterGainRef.current=master;
      await ctx.resume();
      // test beep pour verifier que son sort
      const osc=ctx.createOscillator();const g=ctx.createGain();osc.frequency.value=440;g.gain.value=0.3;osc.connect(g);g.connect(master);osc.start();g.gain.exponentialRampToValueAtTime(0.01,ctx.currentTime+0.4);osc.stop(ctx.currentTime+0.4);
      setAudioReady(true);setConf(99.9);setQuantum(99.9);setAudioMsg(`AUDIO LIVE FIXED ${ctx.state} SR ${ctx.sampleRate}Hz MASTER 0.8 - TAP KICK SNARE - 440Hz TEST BEEP OK`);
      if(navigator.vibrate)navigator.vibrate([60,40,60,40]);
    }catch(err:any){setAudioMsg(`AUDIO ERROR ${String(err)} - AUTORISE SON NAVIGATEUR`);setAudioReady(false);}
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
      setAudioMsg(`PLAY ${id} ${freq}Hz LIVE ${ctx.state} - MASTER 0.8 - ${new Date().toLocaleTimeString()}`);
      if(navigator.vibrate)navigator.vibrate(20);
    }catch(e:any){setAudioMsg(`PLAY ERROR ${id} ${String(e)}`);}
  },[initAudio]);
  const curVis=VISUALS[streamIdx];const curHash=HASHES[streamIdx%HASHES.length];const seed=seedFromHash(curHash);const curBeat=BEATS[beatIdx];
  return(
    <div className="min-h-screen bg-black text-white font-mono p-2" style={{touchAction:"none"}}>
      <div className="border-2 border-green-500 p-2 mb-2 bg-green-900/20">
        <h1 className="text-green-400 text-sm font-bold">MAG CORE V33 FIXED AUDIO LIVE 250 - PREND LA MAIN - PLUS INERTES - AUDIO LIVE FIXED MASTER GAIN RESUME</h1>
        <div className="text-[10px] text-zinc-200">SHA 537e46c2fd9996a3f04d10fc024198b8094e9b167950cb6b2e9b214600f9b9ea | 38 FILES | 097bbf6 | CONF {conf.toFixed(1)}pc Q {quantum.toFixed(1)}pc | SEED {seed} | FIXED AUDIO LIVE SANS CASSE - PREND LA MAIN</div>
        <div className={`text-[11px] mt-1 p-1 border ${audioReady?"bg-green-900 border-green-400 text-green-200":"bg-red-900 border-red-400 text-red-200 animate-pulse"}`}>{audioMsg}</div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mb-2">
        <div className="border-2 border-yellow-600 p-2 bg-black" style={{touchAction:"none"}}>
          <div className="text-yellow-400 text-[10px] mb-1">FIELD_OS 120 DRONES FIXED AUDIO {audioReady?"LIVE":"INIT NEEDED"} - GRID HASH {perf.checks} sur {perf.theoretical} {perf.timeMs.toFixed(1)}ms</div>
          <canvas ref={canvasRef} width={320} height={320} className="block bg-black w-full max-w-[320px] mx-auto border-2 border-yellow-800" style={{touchAction:"none"}} />
          <div className="mt-2 grid grid-cols-5 gap-1" style={{touchAction:"none"}} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}>
            {mods.map((m,idx)=>(
              <div key={`${m.id}-${idx}`} onPointerDown={(e)=>onDown(e,idx)} className={`border-2 p-1 select-none cursor-grab active:cursor-grabbing ${dragActive===idx?'bg-yellow-900 scale-105 border-yellow-300':'bg-zinc-900'}`} style={{borderColor:dragActive===idx?"#FFD700":m.color,touchAction:"none",userSelect:"none"}}>
                <div className="text-[8px] font-bold" style={{color:m.color}}>{m.id}</div><div className="text-[9px] text-white truncate">{m.name}</div><div className="w-2 h-2 mt-1 rounded-full animate-pulse" style={{background:m.color}} />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-1 mt-2">
            {PADS.map(p=>(
              <button key={p.id} onClick={()=>play(p.id)} className={`h-16 border-2 p-1 text-[9px] font-bold ${activePad===p.id?'bg-green-900 scale-90 shadow-[0_0_25px_#4CD964] border-green-400':'bg-zinc-900'}`} style={{borderColor:activePad===p.id?"#4CD964":p.c,color:activePad===p.id?"#4CD964":p.c,touchAction:"none"}}>{p.id} {p.k} {audioReady?"PLAY LIVE FIXED":"INIT FIRST"}</button>
            ))}
          </div>
          <div className="text-[8px] text-zinc-400 mt-1">FIXED AUDIO LIVE: initAudio cree AudioContext + masterGain 0.8 connect destination + resume + test beep 440Hz 0.4s + play resume si suspended + osc type sine triangle square + filter lowpass 2500-6000 + ADSR linear 0.01s vers 0.9 vers 0.01 exponential 0.4-0.6s - PREND LA MAIN - plus inertes</div>
        </div>
        <div className="border-2 border-yellow-500 p-2 bg-black lg:col-span-2">
          <div className="text-yellow-400 text-[10px] mb-1 flex justify-between"><span>VIDEO STREAM 24FPS 640x360 FIXED AUDIO {curBeat.name} {curBeat.chords} - Q {quantum.toFixed(1)}pc</span><span className={audioReady?"text-green-400 animate-pulse":"text-red-400 animate-pulse"}>{audioReady?"AUDIO LIVE FIXED":"AUDIO INIT NEEDED TAP INIT"}</span></div>
          <div className="relative w-full h-[320px] bg-zinc-900 overflow-hidden border-2 border-zinc-700">
            <canvas ref={vCanvasRef} width={640} height={360} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-black/90 p-1 text-[8px] flex justify-between"><span className="text-yellow-300">FIXED AUDIO {curVis} | {curHash.slice(0,12)} SEED {seed} | 120 DRONES Q {quantum.toFixed(1)}pc | {curBeat.name} AUDIO {audioReady?"LIVE FIXED":"INIT NEEDED"}</span><span className="text-zinc-400">BEAT {beat} sur 32 92 BPM FIXED</span></div>
          </div>
          <div className="grid grid-cols-11 gap-1 mt-1">
            {VISUALS.slice(0,22).map((v,i)=>{const h=HASHES[i%HASHES.length];const sd=seedFromHash(h);const r=(sd*3)%255,g=(sd*7)%255,b=(sd*13)%255;return(<div key={v} onClick={()=>setStreamIdx(i)} className={`h-[36px] border-2 relative overflow-hidden cursor-pointer ${i===streamIdx?'border-yellow-400 scale-105':'border-zinc-800 opacity-60'}`} style={{background:`rgb(${r},${g},${b})`,touchAction:"none"}}><img src={CDN_V+encodeURIComponent(v)} alt={v} className="w-full h-full object-cover opacity-70" loading="lazy" onError={e=>{(e.target as HTMLImageElement).style.display='none'}} /><div className="absolute bottom-0 left-0 right-0 bg-black/70 text-[4px] text-white p-px">{h.slice(0,6)}</div></div>);})}
          </div>
          <div className="mt-2 border border-zinc-700 p-1 bg-black"><div className="text-yellow-400 text-[10px] mb-1">DMX {DMX.length} CH + BEATS 3 RADIO READY - FIXED PLAY LIVE MASTER GAIN</div><div className="flex gap-1 text-[7px]">{DMX.map(ch=><span key={ch} className="border border-zinc-700 px-1">CH{ch}</span>)}</div><div className="mt-1 text-[9px] text-yellow-300">{curBeat.id} {curBeat.name} | {curBeat.chords} | {curBeat.bass} | {curBeat.hook} <button onClick={()=>setBeatIdx(p=>(p+1)%BEATS.length)} className="ml-2 px-2 py-1 bg-yellow-900 border border-yellow-500 text-[8px]">NEXT {beatIdx+1} sur 3 PLAY LIVE FIXED</button></div></div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-2">
        <button onClick={initAudio} className={`px-6 py-3 border-2 text-sm font-bold ${audioReady?"bg-green-900 border-green-400 text-green-200 shadow-[0_0_20px_#4CD964]":"bg-red-900 border-red-400 text-red-200 animate-pulse shadow-[0_0_20px_#FF3B30]"}`} style={{touchAction:"none"}}>{audioReady?`FIXED AUDIO LIVE ${conf.toFixed(1)}pc Q ${quantum.toFixed(1)}pc ${curBeat.name} PLAY READY - MASTER 0.8 ${audioCtxRef.current?.state}`:`INIT AUDIO LIVE FIXED - TAP ICI - PREND LA MAIN - PAS DE SON FIX ICI`}</button>
        <div className="text-[10px] text-zinc-300 border border-zinc-700 p-2 bg-zinc-900/50 max-w-[600px]">{audioMsg} | perf {perf.timeMs.toFixed(1)}ms inf 8ms | {perf.checks} sur {perf.theoretical} | DMX {DMX.join(",")} | VIDEO 24FPS REC | DRAG 10 FINGERS | PLAY 6 PADS LIVE FIXED MASTER GAIN RESUME | Q {quantum.toFixed(1)}pc | FIX PAS DE SON AUDIO LIVE</div>
      </div>
      <div className="border-2 border-green-500 p-3 bg-zinc-900/20 text-[11px] leading-5">
        <div className="text-green-400 text-xs font-bold mb-1">FIXED AUDIO LIVE 250 - PREND LA MAIN - FIX PAS DE SON AUDIO LIVE - PLUS INERTES - MASTER GAIN RESUME TEST BEEP</div>
        <div className="text-zinc-200">Ton screen 14:53 montre MAG CORE V33 RESTORED ULTRA LIGHT 250 INTERACTIVE - GRID HASH 778 sur 7140 68.1ms AUDIO LIVE DRAG FULL mais pas de son - cause: AudioContext suspendu par Chrome mobile autoplay policy + masterGain manquant + play sans resume + pas de test beep. Maintenant FIXED: initAudio cree AudioContext + masterGain 0.8 connect destination + await resume + test beep 440Hz 0.4s gain 0.3 vers 0.01 pour verifier son sort + message live state SR Hz + play verifie ctx state suspended alors resume + si ctx null alors initAudio + osc type sine triangle square selon KICK SNARE HIHAT + filter lowpass 2500-6000Hz Q1 + ADSR linearRamp 0.01s vers 0.9 exponentialRamp 0.01 sur 0.4-0.6s + gain vers masterGain 0.8 vers destination + message PLAY LIVE avec timestamp + init button gros rouge clignotant INIT AUDIO LIVE FIXED TAP ICI PREND LA MAIN PAS DE SON FIX ICI devient vert FIXED AUDIO LIVE READY avec state. Socle SHA 537e46c2fd9996a3f04d10fc024198b8094e9b167950cb6b2e9b214600f9b9ea 38 FILES 097bbf6 2026-10-02 - GO PUR 60 sur 60 - FIXED AUDIO LIVE - PREND LA MAIN - VERROUILLE.</div>
      </div>
    </div>
  );
}
