"use client";
import { useMemo } from "react";
type Props = { isActive: boolean; beat: number; modules: { id: string; label: string; color: string }[]; dmxValues: number[]; tvSlot: { slot: number; group: string; label: string }; particles: { x: number; y: number; r: number }[]; };
export default function ScreenX270({ isActive, beat, modules, dmxValues, tvSlot, particles }: Props) {
  const side = useMemo(() => ({ intensity: (dmxValues[4]??200)/255, opacity: (dmxValues[11]??128)/255*0.35 }), [dmxValues]);
  if (!isActive) return null;
  const activeColor = modules.find(m=>m.id==="SAT03")?.color?? "#00FF00";
  const fxColor = modules.find(m=>m.id==="SAT06")?.color?? "#00CED1";
  const isClimax = tvSlot.group==="CLIMAX";
  return (
    <div className="fixed inset-0 z-[5] pointer-events-none flex w-screen h-screen bg-black">
      <div className="relative w-[20%] h-full overflow-hidden" style={{opacity: side.opacity, filter: `blur(${isClimax?1:3}px) brightness(${side.intensity})`, background: `linear-gradient(90deg, ${activeColor}11, transparent)`}}>
        {particles.slice(0,30).map((p,i)=><div key={`L-${i}`} className="absolute rounded-full" style={{left:`${p.x}%`, top:`${p.y}%`, width:`${p.r*2}px`, height:`${p.r*2}px`, background:activeColor, opacity:0.4}}/>)}
        <div className="absolute bottom-2 left-2 text-[8px] font-mono text-white/30">SAT03 QUANTUM 120 | LOFI SIDE</div>
      </div>
      <div className="relative w-[60%] h-full border-x border-white/10">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded bg-white/10 text-[9px] font-mono text-white/50">{tvSlot.group} {tvSlot.label} • BEAT {beat}</div>
      </div>
      <div className="relative w-[20%] h-full overflow-hidden" style={{opacity: side.opacity, filter: `blur(${isClimax?1:3}px) brightness(${side.intensity})`, background: `linear-gradient(-90deg, ${fxColor}11, transparent)`}}>
        {particles.slice(30,60).map((p,i)=><div key={`R-${i}`} className="absolute rounded-full" style={{left:`${p.x}%`, top:`${p.y}%`, width:`${p.r*1.5}px`, height:`${p.r*1.5}px`, background:fxColor, opacity:0.3}}/>)}
        <div className="absolute bottom-2 right-2 text-[8px] font-mono text-white/30 text-right">SAT06 GLITCH NEON</div>
      </div>
    </div>
  );
}
