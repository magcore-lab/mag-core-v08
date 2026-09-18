
'use client'
import { useState, useRef, useEffect } from 'react';

export default function Page(){
  const [mode,setMode] = useState('MAGCORE');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({x:0.5,y:0.5});
  const facets = useRef<{a:number,l:number,color:string}[]>([]);

  useEffect(()=>{
    facets.current = Array.from({length:140},(_,i)=>({
      a:(i/140)*Math.PI*2,
      l:0.3+Math.random()*0.7,
      color: i%3===0?'cyan':i%3===1?'white':'light'
    }));
  },[]);

  useEffect(()=>{
    const c = canvasRef.current!;
    const ctx = c.getContext('2d')!;
    let raf = 0;
    const DPR = Math.min(window.devicePixelRatio,2);

    function resize(){
      const r = c.getBoundingClientRect();
      c.width = r.width * DPR;
      c.height = r.height * DPR;
      ctx.setTransform(DPR,0,0,DPR,0,0);
    }
    resize();
    window.addEventListener('resize', resize);

    function draw(t:number){
      const rect = c.getBoundingClientRect();
      const w = rect.width, h = rect.height;
      const cx = w/2, cy = h/2;
      const radius = Math.min(w,h)*0.42;
      ctx.clearRect(0,0,w,h);

      // Halo externe
      const halo = ctx.createRadialGradient(cx,cy,radius*0.9,cx,cy,radius*1.8);
      halo.addColorStop(0, mode==='PUR'?'rgba(255,255,255,0.4)':'rgba(0,255,255,0.35)');
      halo.addColorStop(1,'transparent');
      ctx.fillStyle = halo;
      ctx.beginPath(); ctx.arc(cx,cy,radius*1.8,0,Math.PI*2); ctx.fill();

      // Corps diamant
      ctx.save();
      ctx.beginPath(); ctx.arc(cx,cy,radius,0,Math.PI*2); ctx.clip();
      const g = ctx.createRadialGradient(cx-radius*0.35,cy-radius*0.35,radius*0.15,cx,cy,radius);
      g.addColorStop(0,'#ffffff');
      g.addColorStop(0.15,'#eaffff');
      g.addColorStop(0.45,'#8ef6ff');
      g.addColorStop(0.85,'#ffffff');
      g.addColorStop(1,'#b8ffff');
      ctx.fillStyle = g;
      ctx.fillRect(cx-radius,cy-radius,radius*2,radius*2);

      const time = t*0.00035;
      const mx = (mouse.current.x-0.5)*0.5;
      const my = (mouse.current.y-0.5)*0.5;

      // Facettes visibles
      facets.current.forEach(f=>{
        const ang = f.a + time + mx*1.5;
        const len = radius * f.l * (mode==='PUR'?1.1:mode==='CŒUR'?0.7:0.9);
        ctx.beginPath();
        ctx.moveTo(cx,cy);
        ctx.lineTo(cx+Math.cos(ang)*len, cy+Math.sin(ang+my)*len);
        if(mode==='PUR'){
          ctx.strokeStyle='rgba(255,255,255,0.85)';
          ctx.lineWidth=1.4;
          ctx.shadowColor='white'; ctx.shadowBlur=6;
        } else if(mode==='CŒUR'){
          ctx.strokeStyle='rgba(0,180,180,0.45)';
          ctx.lineWidth=0.5;
          ctx.shadowColor='cyan'; ctx.shadowBlur=2;
        } else {
          ctx.strokeStyle='rgba(0,220,220,0.6)';
          ctx.lineWidth=0.9;
          ctx.shadowColor='cyan'; ctx.shadowBlur=4;
        }
        ctx.stroke();
        ctx.shadowBlur=0;
      });

      // Sparkles
      for(let i=0;i<32;i++){
        const a = (i/32)*Math.PI*2 + time*1.8;
        const rr = radius*(0.6+Math.sin(time*2.5+i)*0.3);
        ctx.beginPath();
        ctx.arc(cx+Math.cos(a)*rr, cy+Math.sin(a)*rr, mode==='PUR'?1.8:1.3, 0, Math.PI*2);
        ctx.fillStyle = mode==='PUR'?'rgba(255,255,255,1)':'rgba(0,255,255,0.9)';
        ctx.shadowColor = mode==='PUR'?'white':'cyan';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur=0;
      }

      ctx.restore();

      // Contour
      ctx.beginPath();
      ctx.arc(cx,cy,radius,0,Math.PI*2);
      ctx.strokeStyle = mode==='PUR'?'rgba(255,255,255,1)':'rgba(0,255,255,0.9)';
      ctx.lineWidth = mode==='PUR'?2:1.5;
      ctx.shadowColor = mode==='PUR'?'white':'cyan';
      ctx.shadowBlur = 12;
      ctx.stroke();
      ctx.shadowBlur=0;

      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);

    const move = (e:any)=>{
      const r = c.getBoundingClientRect();
      const x = e.touches? e.touches[0].clientX : e.clientX;
      const y = e.touches? e.touches[0].clientY : e.clientY;
      mouse.current.x = (x - r.left)/r.width;
      mouse.current.y = (y - r.top)/r.height;
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('touchmove', move, {passive:true});

    return ()=>{
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', move);
      window.removeEventListener('touchmove', move);
    }
  },[mode]);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center select-none">
      <div className="relative w-[min(380px,82vw)] h-[min(380px,82vw)]">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full rounded-full cursor-move" />
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[10px] tracking-[0.6em] opacity-50">MAGCORE</span>
          <span className="text-[36px] font-black tracking-tight drop-shadow-[0_0_30px_rgba(0,255,255,0.8)]">V12.2</span>
          <span className="text-[8px] tracking-[0.4em] opacity-30 mt-1">{mode}</span>
        </div>
      </div>

      <div className="mt-10 flex gap-3">
        {['CŒUR','PUR','MAGCORE'].map(m=>(
          <button key={m} onClick={()=>setMode(m)} className={`px-6 py-2.5 rounded-full text-[11px] tracking-[0.2em] border transition-all ${mode===m?'bg-white text-black border-white shadow-[0_0_40px_white] scale-105':'border-white/20 text-white/50 hover:border-white/40 hover:text-white/80'}`}>{m}</button>
        ))}
      </div>

      <p className="mt-6 text-[9px] opacity-25 tracking-[0.35em]">V12.2 - FACETTES CYAN VISIBLES - {mode}</p>
    </main>
  )
}
