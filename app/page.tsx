
'use client'
import { useState } from 'react';

export default function Page(){
  const [mode,setMode] = useState('MAGMORE');
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden">

      {/* NOYAU DIAMANT PULSATION */}
      <div className="relative flex items-center justify-center">
        <div className="tron-ring"></div>
        <div className="tron-ring-2"></div>
        <div className="core-420">
          <div className="text-black font-black text-center leading-none select-none">
            <div className="text-[12px] tracking-[0.55em] opacity-60">MAGMORE</div>
            <div className="text-[46px] mt-1 font-black drop-shadow-[0_0_20px_rgba(255,255,255,0.9)] tracking-tight">V10.1</div>
            <div className="text-[11px] tracking-[0.32em] mt-2 opacity-80">NOYAU ACTIF 100%</div>
          </div>
        </div>
      </div>

      <h1 className="mt-12 text-[12px] tracking-[0.35em] opacity-80 whitespace-nowrap text-center px-4">
        MAGMORE V10.1 — NOYAU ACTIF 100%
      </h1>

      <div className="mt-8 flex gap-3">
        {['CORE','TRON','MAGMORE'].map(m=>(
          <button key={m} onClick={()=>setMode(m)}
            className={`px-6 py-2.5 rounded-full text-[12px] tracking-[0.2em] border transition-all duration-300 ${mode===m?'bg-white text-black border-white shadow-[0_0_35px_rgba(255,255,255,0.9)] scale-105':'border-white/20 text-white/60 hover:border-white/40 hover:text-white/90'}`}>
            {m}
          </button>
        ))}
      </div>

      <p className="mt-8 text-[10px] tracking-[0.35em] opacity-30">ENTER THE CORE — {mode} MODE</p>
    </main>
  )
}
