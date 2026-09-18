'use client'
import { useState, useRef, useEffect } from 'react';

export default function Page(){
  const [mode,setMode] = useState('MAGCORE');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({x:0.5,y:0.5});

  useEffect(()=>{
    const c = canvasRef.current!;
    const ctx = c.getContext('2d', { alpha: true })!;
    let raf = 0;
    const DPR = Math.min(window.devicePixelRatio, 2);

    function resize(){
      const r = c.getBoundingClientRect();
      c.width = r.width * DPR;
      c.height = r.height * DPR;
      ctx.setTransform(DPR,0,0,DPR,0,0);
    }
    resize();
    window.addEventListener('resize', resize);

    function draw(t: number){
      const w = c.getBoundingClientRect().width;
      const h = c.getBoundingClientRect().height;
      const cx = w/2, cy = h/2;
      const radius = Math.min(w,h)*0.42;

      ctx.clearRect(0,0,w,h);

      // Halo cyan
      const halo = ctx.createRadialGradient(cx,cy,radius*0.8,cx,cy,radius*1.6);
      halo.addColorStop(0,'rgba(0,255,255,0.35)');
      halo.addColorStop(1,'transparent');
      ctx.fillStyle = halo;
      ctx.beginPath(); ctx.arc(cx,cy,radius*1.6,0,Math.PI*2); ctx.fill();

      // Diamant base - dégradé fallback V11.2 (remplacé par /diamant-4k.webp quand dispo)
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx,cy,radius,0,Math.PI*2);
      ctx.clip();

      const grad = ctx.createRadialGradient(cx-radius*0.3,cy-radius*0.3,radius*0.1,cx,cy,radius);
      grad.addColorStop(0,'#ffffff');
      grad.addColorStop(0.3,'#eaffff');
      grad.addColorStop(0.7,'#a0ffff');
      grad.addColorStop(1,'#ffffff');
      ctx.fillStyle = grad;
      ctx.fillRect(cx-radius,cy-radius,radius*2,radius*2);

      // 120 facettes qui tournent
      const time = t * 0.0005;
      const mx = (mouse.current.x - 0.5) * 0.3;
      const my = (mouse.current.y - 0.5) * 0.3;

      for(let i=0;i<120;i++){
        const angle = (i/120)*Math.PI*2 + time + mx;
        const len = radius * (0.2 + Math.random()*0.8);
        const x2 = cx + Math.cos(angle)*len;
        const y2 = cy + Math.sin(angle + my)*len;
        ctx.beginPath();
        ctx.moveTo(cx,cy);
        ctx.lineTo(x2,y2);
        ctx.strokeStyle = `rgba(${200+Math.random()*55},255,255,${0.08 + (i%3)*0.05})`;
        ctx.lineWidth = mode==='PUR'? 1.2 : mode==='CŒUR'? 0.4 : 0.8;
        ctx.stroke();
      }

      // 24 sparkles
      for(let i=0;i<24;i++){
        const a = (i/24)*Math.PI*2 + time*1.8;
        const r = radius * (0.6 + Math.sin(time*2+i)*0.3);
        const sx = cx + Math.cos(a)*r;
        const sy = cy + Math.sin(a)*r;
        ctx.beginPath();
        ctx.arc(sx,sy,1.2,0,Math.PI*2);
        ctx.fillStyle = `rgba(255,255,255,${0.6+Math.sin(t*0.005+i)*0.4})`;
        ctx.fill();
      }
      ctx.restore();

      // Contour
      ctx.beginPath();
      ctx.arc(cx,cy,radius,0,Math.PI*2);
      ctx.strokeStyle = 'rgba(255,255,255,0.9)';
      ctx.lineWidth = 2;
      ctx.stroke();

      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);

    const onMove = (e: any)=>{
      const rect = c.getBoundingClientRect();
      const x = e.touches? e.touches[0].clientX : e.clientX;
      const y = e.touches? e.touches[0].clientY : e.clientY;
      mouse.current.x = (x-rect.left)/rect.width;
      mouse.current.y = (y-rect.top)/rect.height;
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove);
    return ()=>{
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
    }
  },[mode]);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 overflow-hidden">
      <div className="relative w-[min(380px,78vw)] h-[min(380px,78vw)] flex items-center justify-center">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        <div className="relative z-10 text-black font-black text-center pointer-events-none select-none">
          <div className="text-[10px] tracking-[0.55em] opacity-70">MAGCORE</div>
          <div className="text-[38px] mt-1 drop-shadow-[0_0_20px_white]">V12</div>
          <div className="text-[9px] tracking-[0.32em] mt-1 opacity-80">PUR 100% • 4K</div>
        </div>
      </div>

      <h1 className="mt-10 text-[11px] tracking-[0.3em] opacity-60 text-center">MAGCORE V12 — DIAMANT 4K CANVAS — FINAL</h1>

      <div className="mt-6 flex gap-2.5">
        {['CŒUR','PUR','MAGCORE'].map(m=>(
          <button key={m} onClick={()=>setMode(m)} className={`px-5 py-2 rounded-full text-[11px] border transition-all ${mode===m?'bg-white text-black border-white shadow-[0_0_30px_white]':'border-white/20 text-white/60 hover:border-white/40'}`}>{m}</button>
        ))}
      </div>

      <p className="mt-5 text-[9px] opacity-30 tracking-[0.3em]">ENTRER DANS LE NOYAU — {mode} — DIAMANT 4K — FINAL</p>
    </main>
  )
}
