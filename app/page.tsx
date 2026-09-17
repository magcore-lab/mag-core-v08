'use client'
import { useState } from 'react';

export default function Page(){
  const [mode,setMode] = useState('CORE');
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* NOYAU */}
      <div className="relative flex items-center justify-center">
        <div className="tron-ring"></div>
        <div className="tron-ring-2"></div>
        <div className="core-420 flex items-center justify-center relative">
          <div className="text-black font-black text-center leading-none">
            <div className="text-[11px] tracking-[0.4em] opacity-60">MAGMORE</div>
            <div className="text-3xl mt-1">V10.1</div>
            <div className="text-[10px] tracking-[0.3em] mt-2 opacity-80">NOYAU ACTIF 100%</div>
          </div>
        </div>
      </div>

      <h1 className="mt-12 text-[13px] tracking-[0.5em] opacity-80">MAGMORE V10.1 — NOYAU ACTIF 100%</h1>

      {/* BOUTONS */}
      <div className="mt-8 flex gap-3">
        {['CORE','TRON','MAGMORE'].map(m=>(
          <button key={m} onClick={()=>setMode(m)}
            className={`px-5 py-2 rounded-full text-[11px] tracking-widest border ${mode===m?'bg-white text-black border-white':'border-white/20 text-white/60'}`}>
            {m}
          </button>
        ))}
      </div>

      <p className="mt-6 text-[10px] tracking-widest opacity-30">ENTER THE CORE — {mode} MODE</p>
    </main>
  )
}
