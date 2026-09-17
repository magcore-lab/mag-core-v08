
'use client'
import { useState } from 'react';
export default function Page(){
  const [mode,setMode] = useState('MAGMORE');
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center">
        <div className="tron-ring"></div>
        <div className="tron-ring-2"></div>
        <div className="core-420">
          <div className="text-black font-black text-center z-10 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
            <div className="text-[11px] tracking-[0.55em] opacity-70">MAGMORE</div>
            <div className="text-[42px] mt-1 tracking-tight">V10.3</div>
            <div className="text-[10px] tracking-[0.32em] mt-1 opacity-80">FACETTE 100%</div>
          </div>
        </div>
      </div>
      <h1 className="mt-12 text-[12px] tracking-[0.35em] opacity-70 text-center">MAGMORE V10.3 — DIAMANT FACETTÉ 100%</h1>
      <div className="mt-8 flex gap-3">
        {['CORE','TRON','MAGMORE'].map(m=>(
          <button key={m} onClick={()=>setMode(m)} className={`px-6 py-2 rounded-full text-xs border transition-all ${mode===m?'bg-white text-black border-white shadow-[0_0_35px_white] scale-105':'border-white/20 text-white/60'}`}>{m}</button>
        ))}
      </div>
      <p className="mt-6 text-[10px] opacity-30 tracking-[0.3em]">ENTER THE CORE — {mode} MODE — 58 FACETTES</p>
    </main>
  )
}
