'use client'
import { useState, useRef, useEffect } from 'react';

export default function Page(){
  const [mode,setMode]=useState('MAGCORE');
  const canvasRef=useRef<HTMLCanvasElement>(null);
  const mouse=useRef({x:0.5,y:0.5});
  const facets=useRef<{a:number,l:number,d:number}[]>([]);

  useEffect(()=>{
    facets.current=Array.from({length:320},(_,i)=>({
      a:(i/320)*Math.PI*2 + (Math.random()-0.5)*0.3,
      l:0.2+Math.random()*0.8,
      d:0.85+Math.random()*0.3
    }));
  },[]);

  useEffect(()=>{
    const c=canvasRef.current!; const ctx=c.getContext('2d',{alpha:true})!;
    let raf=0; const DPR=Math.min(devicePixelRatio||1,2);
    function resize(){
      const p=c.parentElement!; const s=Math.min(p.clientWidth,p.clientHeight);
      c.width=s*DPR; c.height=s*DPR; c.style.width=s+'px'; c.style.height=s+'px';
      ctx.setTransform(DPR,0,0,DPR,0,0);
    }
    resize(); addEventListener('resize',resize);
    function draw(t:number){
      const w=c.width/DPR, h=c.height/DPR, cx=w/2, cy=h/2, r=Math.min(w,h)*0.38;
      ctx.clearRect(0,0,w,h);
      const time=t*0.00025, mx=(mouse.current.x-0.5)*0.3, my=(mouse.current.y-0.5)*0.3;

      // Corps diamant photoréaliste
      ctx.save(); ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.clip();
      const grad=ctx.createRadialGradient(cx-r*0.4,cy-r*0.4,r*0.2,cx,cy,r);
      grad.addColorStop(0,'#ffffff'); grad.addColorStop(0.25,'#e6ffff'); grad.addColorStop(0.55,'#aef0ff'); grad.addColorStop(0.8,'#ffffff'); grad.addColorStop(1,'#7ae6ff');
      ctx.fillStyle=grad; ctx.fillRect(cx-r,cy-r,r*2,r*2);

      // Facettes V10.1 - 320 traits + profondeur
      facets.current.forEach((f,i)=>{
        const ang=f.a+time*0.6+mx+i*0.001; const len=r*f.l*f.d;
        const x2=cx+Math.cos(ang)*len; const y2=cy+Math.sin(ang+my)*len;
        ctx.beginPath(); ctx.moveTo(cx+Math.cos(ang)*r*0.15, cy+Math.sin(ang)*r*0.15); ctx.lineTo(x2,y2);
        const alpha = mode==='PUR'?0.95:mode==='CŒUR'?0.28:0.55 - (f.d*0.2);
        ctx.strokeStyle=mode==='PUR'?`rgba(255,255,255,${alpha})`:`rgba(0,220,255,${alpha})`;
        ctx.lineWidth=mode==='PUR'?0.9:mode==='CŒUR'?0.35:0.6; ctx.stroke();
        // Brillance facette
        if(i%12===0){ ctx.beginPath(); ctx.arc(x2,y2,0.9,0,Math.PI*2); ctx.fillStyle='rgba(255,255,255,0.9)'; ctx.fill(); }
      });
      ctx.restore();

      // Contour + glow interne
      ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2);
      ctx.strokeStyle='rgba(255,255,255,0.95)'; ctx.lineWidth=1.2; ctx.stroke();
      ctx.beginPath(); ctx.arc(cx,cy,r*1.02,0,Math.PI*2);
      ctx.strokeStyle='rgba(0,255,255,0.6)'; ctx.lineWidth=0.6; ctx.stroke();

      raf=requestAnimationFrame(draw);
    }
    raf=requestAnimationFrame(draw);
    const move=(e:any)=>{const rc=c.getBoundingClientRect(); const x=e.touches?e.touches[0].clientX:e.clientX; const y=e.touches?e.touches[0].clientY:e.clientY; mouse.current.x=(x-rc.left)/rc.width; mouse.current.y=(y-rc.top)/rc.height;};
    addEventListener('mousemove',move); addEventListener('touchmove',move,{passive:true});
    return()=>{cancelAnimationFrame(raf); removeEventListener('resize',resize); removeEventListener('mousemove',move); removeEventListener('touchmove',move);}
  },[mode]);

  return(
    <main className="min-h-screen bg-black text-white overflow-hidden relative flex items-center justify-center">
      {/* HUD V10.1 */}
      <div className="absolute top-4 left-4 text-[9px] tracking-[0.3em] leading-tight opacity-80">
        <div className="border-l border-t border-cyan-400/60 pl-3 pt-2">STATUS: ACTIVE</div>
        <div className="pl-3 text-[7px] opacity-50">POWER: 100% • STABLE</div>
        <div className="mt-1 text-[7px] tracking-[0.2em] opacity-30">MAGMORE // V10.1 // NOYAU ACTIF // SYSTEM ONLINE</div>
      </div>
      <div className="absolute bottom-4 left-4 flex items-end gap-3 text-[8px]">
        <div className="border border-cyan-400/30 px-3 py-2 bg-cyan-950/20">CORE ENERGY <div className="flex gap-[1px] mt-1">{Array.from({length:12}).map((_,i)=><div key={i} className="w-[2px] h-3 bg-cyan-400" style={{opacity:0.3+i*0.06}} />)}<span className="ml-2">100%</span></div></div>
      </div>
      <div className="absolute bottom-4 right-4 text-[8px] text-right opacity-70 leading-tight">
        TEMP: 342K<br/>STABILIZATION:<br/>OPTIMAL
      </div>

      {/* Moteur Central - diamant + anneaux */}
      <div className="relative w-[min(520px,88vw)] h-[min(520px,88vw)] flex items-center justify-center">
        {/* Anneaux orbitaux V10.1 */}
        <div className="absolute w-[105%] h-[105%] rounded-full border border-cyan-300/40 shadow-[0_0_30px_rgba(0,255,255,0.6)] animate-[spin_12s_linear_infinite]" style={{borderTopColor:'transparent', borderBottomColor:'transparent'}} />
        <div className="absolute w-[125%] h-[42%] rounded-[100%] border border-cyan-200/80 shadow-[0_0_40px_rgba(0,255,255,0.8)] rotate-12 animate-[spin_8s_linear_infinite_reverse]" />
        <div className="absolute w-[118%] h-[38%] rounded-[100%] border border-cyan-100/50 shadow-[0_0_20px_rgba(0,255,255,0.5)] -rotate-12 opacity-60" />

        {/* Diamant Canvas */}
        <div className="relative w-[72%] h-[72%] rounded-full bg-white/5 backdrop-blur-[1px] shadow-[inset_0_0_80px_rgba(255,255,255,0.8),0_0_120px_rgba(0,255,255,0.6)]">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full rounded-full" />
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[9px] tracking-[0.6em] text-cyan-200/80 drop-shadow-[0_0_10px_cyan]">MAGMORE V10.1</span>
            <span className="text-[11px] tracking-[0.3em] mt-1 text-white/90">NOYAU ACTIF 100%</span>
            <div className="mt-2 w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white] animate-pulse" />
          </div>
        </div>
      </div>

      {/* Modes */}
      <div className="absolute bottom-[12%] flex gap-3">
        {['CŒUR','PUR','MAGCORE'].map(m=>(
          <button key={m} onClick={()=>setMode(m)} className={`px-7 py-2.5 rounded-full text-[11px] tracking-[0.25em] border transition-all ${mode===m?'bg-white text-black border-white shadow-[0_0_40px_white]':'border-white/15 text-white/40 hover:border-cyan-400/40 hover:text-cyan-200/80'}`}>{m}</button>
        ))}
      </div>

      <style>{`@keyframes spin{to{transform:rotate(360deg)}} @keyframes spin_reverse{to{transform:rotate(-360deg)}}`}</style>
    </main>
  )
}
