
'use client'
import { useState } from 'react';
export default function Page(){
  const [mode,setMode] = useState('MAGMORE');
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <div className="relative flex items-center justify-center scale-[0.9] md:scale-100">
        <div className="tron-ring"></div>
        <div className="tron-ring-2"></div>
        <div className="core-420">
          <div className="text-black font-black text-center z-10">
            <div className="text-[10px] tracking-[0.55em] opacity-70">MAGMORE</div>
            <div className="text-[36px] mt-1 tracking-tight">V10.3</div>
            <div className="text-[9px] tracking-[0.32em] mt-1 opacity-80">FACETTE 100%</div>
          </div>
        </div>
      </div>
      <h1 className="mt-10 text-[11px] tracking-[0.3em] opacity-60 text-center">MAGMORE V10.3 — DIAMANT FACETTÉ 100%</h1>
      <div className="mt-6 flex gap-2.5 scale-90 md:scale-100">
        {['CORE','TRON','MAGMORE'].map(m=>(
          <button key={m} onClick={()=>setMode(m)} className={`px-5 py-2 rounded-full text-[11px] border transition-all ${mode===m?'bg-white text-black border-white shadow-[0_0_25px_white]':'border-white/20 text-white/60'}`}>{m}</button>
        ))}
      </div>
      <p className="mt-5 text-[9px] opacity-30 tracking-[0.3em] text-center">ENTER THE CORE — {mode} — 58 FACETTES</p>
    </main>
  )
}
