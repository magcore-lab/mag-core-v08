'use client'
import { useState } from 'react';

export default function Page(){
  const [mode,setMode]=useState('MAGCORE');

  return(
    <main className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-6 left-6 text-[10px] tracking-[0.32em] text-white/60">
        <div className="border-l-2 border-cyan-400/70 pl-3">STATUT : ACTIF</div>
        <div className="pl-3 mt-1 text-[9px] opacity-50">PUISSANCE : 100 % • STABLE</div>
      </div>

      {/* NOYAU SEUL - DIAMANT RÉALISTE 4K SANS CANVAS */}
      <div className="relative w-[min(480px,84vw)] h-[min(480px,84vw)]">
        <div className="absolute inset-0 rounded-full bg-white shadow-[0_0_80px_rgba(255,255,255,0.8),0_0_160px_rgba(0,220,255,0.45)]"
          style={{
            background: `
              radial-gradient(circle at 30% 30%, #ffffff 0%, #eaffff 25%, #7de6ff 55%, #ffffff 85%),
              conic-gradient(from 0deg at 50% 50%,
                rgba(255,255,255,0.9) 0deg, rgba(0,210,255,0.3) 15deg, rgba(255,255,255,0.8) 30deg,
                rgba(0,210,255,0.25) 45deg, rgba(255,255,255,0.9) 60deg, rgba(0,210,255,0.3) 75deg,
                rgba(255,255,255,0.85) 90deg, rgba(0,210,255,0.2) 105deg, rgba(255,255,255,0.9) 120deg,
                rgba(0,210,255,0.3) 135deg, rgba(255,255,255,0.8) 150deg, rgba(0,210,255,0.25) 165deg,
                rgba(255,255,255,0.9) 180deg, rgba(0,210,255,0.3) 195deg, rgba(255,255,255,0.85) 210deg,
                rgba(0,210,255,0.2) 225deg, rgba(255,255,255,0.9) 240deg, rgba(0,210,255,0.3) 255deg,
                rgba(255,255,255,0.8) 270deg, rgba(0,210,255,0.25) 285deg, rgba(255,255,255,0.9) 300deg,
                rgba(0,210,255,0.3) 315deg, rgba(255,255,255,0.85) 330deg, rgba(0,210,255,0.2) 345deg
              )
            `,
            filter: mode==='PUR'?'brightness(1.15) contrast(1.1)':'brightness(1) contrast(1.05)'
          }}
        >
          {/* Facettes diamant - texture overlay */}
          <div className="absolute inset-[3%] rounded-full opacity-70"
            style={{
              background: `repeating-conic-gradient(from 0deg at 50% 50%, transparent 0deg 4.5deg, rgba(255,255,255,0.9) 4.5deg 5deg, transparent 5deg 9deg)`,
              mixBlendMode:'overlay'
            }}
          />
          {/* Reflet central */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28%] h-[28%] rounded-full bg-white blur-[2px] shadow-[0_0_30px_white]" />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[9px] tracking-[0.45em] text-cyan-900/60 font-bold drop-shadow-[0_0_10px_white]">MAGMORE V10.1</span>
          <span className="text-[10px] tracking-[0.22em] mt-1.5 text-cyan-900/70 font-bold drop-shadow-[0_0_10px_white]">NOYAU ACTIF 100%</span>
        </div>
      </div>

      <div className="absolute bottom-6 flex gap-3">
        {['CŒUR','PUR','MAGCORE'].map(m=>(
          <button key={m} onClick={()=>setMode(m)} className={`px-8 py-3 rounded-full text-[12px] tracking-[0.2em] border transition-all ${mode===m?'bg-white text-black border-white shadow-[0_0_40px_white]':'border-white/15 text-white/30 hover:border-white/30'}`}>{m}</button>
        ))}
      </div>
    </main>
  );
}
