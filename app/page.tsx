
"use client";
import { useState, useRef, useEffect } from "react";

export default function Page(){
  const [isRec,setIsRec]=useState(false);
  const [pos,setPos]=useState({x:0,y:0});
  const dragRef=useRef({drag:false,startX:0,startY:0,origX:0,origY:0,moved:false});
  const canvasRef=useRef<HTMLCanvasElement>(null);
  const audioRef=useRef<any>(null);
  const seqRef=useRef(0);
  const [step,setStep]=useState(0);

  useEffect(()=>{
    const AudioContext = (window as any).AudioContext || (window as any).webkitAudioContext;
    if(!AudioContext) return;
    const ctx = new AudioContext();
    const master = ctx.createGain(); master.gain.value=0.85; master.connect(ctx.destination);
    const tape = ctx.createWaveShaper();
    const amount=12, samples=44100, curve=new Float32Array(samples);
    for(let i=0;i<samples;i++){ const x=i*2/samples-1; curve[i]=(3+amount)*x*20*(Math.PI/180)/(Math.PI+amount*Math.abs(x)); }
    tape.curve=curve; tape.connect(master);
    audioRef.current={ctx,master:tape};
    return ()=>{ try{ctx.close()}catch{} }
  },[]);

  function play(sound:string){
    const a=audioRef.current; if(!a) return;
    const {ctx,master}=a;
    if(ctx.state==='suspended') ctx.resume();
    const now=ctx.currentTime;
    const gain=ctx.createGain(); gain.connect(master);
    const osc=ctx.createOscillator();
    const filt=ctx.createBiquadFilter();
    if(sound==='KICK'){
      osc.frequency.setValueAtTime(180,now); osc.frequency.exponentialRampToValueAtTime(48,now+0.12);
      gain.gain.setValueAtTime(1,now); gain.gain.exponentialRampToValueAtTime(0.001,now+0.45);
      filt.type='lowpass'; filt.frequency.value=120; osc.connect(filt); filt.connect(gain);
    } else if(sound==='SNARE'){
      const noise=ctx.createBufferSource(); const buf=ctx.createBuffer(1,ctx.sampleRate*0.2,ctx.sampleRate);
      const d=buf.getChannelData(0); for(let i=0;i<d.length;i++) d[i]=(Math.random()*2-1)*Math.pow(1-i/d.length,2);
      noise.buffer=buf; noise.connect(gain);
      gain.gain.setValueAtTime(0.9,now); gain.gain.exponentialRampToValueAtTime(0.001,now+0.25);
      noise.start(now); return;
    } else if(sound==='HAT'){
      osc.type='square'; osc.frequency.value=9000; filt.type='highpass'; filt.frequency.value=7000;
      gain.gain.setValueAtTime(0.18,now); gain.gain.exponentialRampToValueAtTime(0.001,now+0.08);
      osc.connect(filt); filt.connect(gain);
    } else {
      osc.type='sine'; osc.frequency.value=sound==='BASS'?55:220;
      gain.gain.setValueAtTime(0.3,now); gain.gain.exponentialRampToValueAtTime(0.001,now+0.6);
      osc.connect(gain);
    }
    osc.start(now); osc.stop(now+0.6);
  }

  useEffect(()=>{
    if(!isRec) return;
    const id=setInterval(()=>{
      seqRef.current=(seqRef.current+1)%16;
      setStep(seqRef.current);
      if([0,4,8,12].includes(seqRef.current)) play('KICK');
      if([4,12].includes(seqRef.current)) play('SNARE');
      if(seqRef.current%2===1) play('HAT');
      if(seqRef.current%8===0) play('BASS');
    },60000/92/4);
    return ()=>clearInterval(id);
  },[isRec]);

  useEffect(()=>{
    const c=canvasRef.current; if(!c) return;
    const ctx=c.getContext('2d'); if(!ctx) return;
    let w=c.clientWidth, h=c.clientHeight, dpr=window.devicePixelRatio||1;
    const resize=()=>{ w=c.clientWidth; h=c.clientHeight; c.width=w*dpr; c.height=h*dpr; ctx.setTransform(dpr,0,0,dpr,0,0); };
    resize(); window.addEventListener('resize',resize);
    const parts=Array.from({length:88}).map(()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-0.5)*0.6,vy:(Math.random()-0.5)*0.6,r:Math.random()*1.5+0.3,a:Math.random()*0.6+0.2}));
    let t=0, raf=0;
    const loop=()=>{
      t+=0.016; ctx.clearRect(0,0,w,h);
      ctx.save(); ctx.globalAlpha=0.08;
      for(let i=0;i<3;i++){ const ang=t*0.2+i*2.09; ctx.beginPath(); ctx.moveTo(w/2,h/2); ctx.lineTo(w/2+Math.cos(ang)*w, h/2+Math.sin(ang)*h); ctx.strokeStyle='#FF0033'; ctx.lineWidth=40; ctx.stroke(); }
      ctx.restore();
      parts.forEach(p=>{
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0||p.x>w) p.vx*=-1;
        if(p.y<0||p.y>h) p.vy*=-1;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle='rgba(255,0,51,'+p.a+')'; ctx.fill();
        parts.forEach(q=>{
          const dx=p.x-q.x, dy=p.y-q.y, dist=Math.sqrt(dx*dx+dy*dy);
          if(dist<110){ ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y); ctx.strokeStyle='rgba(255,0,51,'+(0.08*(1-dist/110))+')'; ctx.lineWidth=0.5; ctx.stroke(); }
        });
      });
      raf=requestAnimationFrame(loop);
    };
    loop();
    return ()=>{ cancelAnimationFrame(raf); window.removeEventListener('resize',resize); };
  },[]);

  const onPointerDown=(e:any)=>{ const p=e.touches?e.touches[0]:e; dragRef.current={drag:true,startX:p.clientX,startY:p.clientY,origX:pos.x,origY:pos.y,moved:false}; };
  const onPointerMove=(e:any)=>{ if(!dragRef.current.drag) return; const p=e.touches?e.touches[0]:e; const dx=p.clientX-dragRef.current.startX; const dy=p.clientY-dragRef.current.startY; if(Math.abs(dx)>3||Math.abs(dy)>3) dragRef.current.moved=true; setPos({x:dragRef.current.origX+dx,y:dragRef.current.origY+dy}); };
  const onPointerUp=()=>{ dragRef.current.drag=false; };

  return(
    <>
      <main style={{position:"fixed",inset:0,width:"100vw",height:"100dvh",background:"#000",display:"grid",placeItems:"center",margin:0,overflow:"hidden",cursor:"grab",userSelect:"none",touchAction:"none"}}
        onMouseMove={onPointerMove} onMouseUp={onPointerUp} onTouchMove={onPointerMove} onTouchEnd={onPointerUp}
        onClick={()=>{ if(dragRef.current.moved) return; setIsRec(!isRec); if(!isRec){ play('KICK'); setTimeout(()=>play('SNARE'),150); } }}
      >
        <canvas ref={canvasRef} style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:0.38}} />
        <div onMouseDown={onPointerDown} onTouchStart={onPointerDown}
          style={{width:"min(62vw,336px)",height:"min(62vw,336px)",borderRadius:"9999px",background:isRec?"#FF0022":"#FF0033",boxShadow:isRec?"0 0 40px 10px rgba(255,0,34,0.9)":"0 0 80px 20px rgba(255,0,51,0.55)",position:"relative",transform:`translate(${pos.x}px, ${pos.y}px)`,animation:isRec?"pulseRec 0.9s ease-in-out infinite":"pulseOff 3s ease-in-out infinite",zIndex:10}}
        >
          <div style={{position:"absolute",inset:"19%",borderRadius:"9999px",background:"radial-gradient(circle at 50% 45%, #ff2a4d 0%, #FF0033 62%, #d40027 100%)"}}/>
          {isRec&&<div style={{position:"absolute",top:"50%",left:"50%",width:"18%",height:"18%",transform:"translate(-50%,-50%)",borderRadius:"9999px",background:"#fff",boxShadow:"0 0 20px #fff",animation:"blinkRec 0.9s step-end infinite"}}/>}
          <div style={{position:"absolute",inset:"-14px",borderRadius:"9999px",pointerEvents:"none"}}>
            {Array.from({length:16}).map((_,i)=>{const ang=i*22.5-90; const active=step===i&&isRec; return <div key={i} style={{position:"absolute",left:"50%",top:"50%",width:active?"6px":"3px",height:active?"16px":"8px",background:active?"#fff":"rgba(255,0,51,0.5)",borderRadius:"2px",transform:`translate(-50%,-50%) rotate(${ang}deg) translateY(calc(-1 * (min(62vw,336px)/2 + 10px)))`}}/>})}
          </div>
        </div>
        <div style={{position:"absolute",left:"50%",bottom:"calc(50% - min(62vw, 336px)/2 - 62px)",transform:`translateX(calc(-50% + ${pos.x}px)) translateY(${pos.y+ (isRec?0:12)}px)`,display:"flex",alignItems:"center",gap:"10px",opacity:isRec?1:0,color:"#FF1A2F",fontFamily:"monospace",fontSize:"14px",fontWeight:700,letterSpacing:"0.32em",pointerEvents:"none",zIndex:11}}>
          <span style={{width:"11px",height:"11px",borderRadius:"50%",background:"#FF1A2F",animation:"blinkRec 0.9s step-end infinite"}}/>REC • 92 BPM • {isRec?"LIVE":""}
        </div>
        <div style={{position:"absolute",bottom:"12px",left:"50%",transform:"translateX(-50%)",color:"rgba(255,255,255,0.22)",fontFamily:"monospace",fontSize:"9px",letterSpacing:"0.18em",textAlign:"center",zIndex:20}}>
          © 2026 MAGCORE-LAB — All Rights Reserved | Patent Pending | FIELD_OS V08 BLACK EDITION
        </div>
      </main>
      <style>{`html,body{margin:0!important;background:#000!important;height:100dvh;overflow:hidden!important}@keyframes pulseOff{0%,100%{transform:scale(0.985)}50%{transform:scale(1.03)}}@keyframes pulseRec{0%,100%{transform:scale(0.96)}50%{transform:scale(1.08)}}@keyframes blinkRec{0%,50%{opacity:1}51%,100%{opacity:0.15}}`}</style>
    </>
  );
}
