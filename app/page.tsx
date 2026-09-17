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
          <div className="text-black font-black text-center">
            <div className="text-[12px] tracking-[0.5em] opacity-60">MAGMORE</div>
            <div className="text-4xl mt-1">V10.1</div>
            <div className="text-[11px] tracking-[0.3em] mt-2">NOYAU ACTIF 100%</div>
          </div>
        </div>
      </div>
      <h1 className="mt-12 text-[12px] tracking-[0.3em] opacity-70 text-center">MAGMORE V10.1 — NOYAU ACTIF 100%</h1>
      <div className="mt-8 flex gap-3">
        {['CORE','TRON','MAGMORE'].map(m=>(
          <button key={m} onClick={()=>setMode(m)} className={`px-6 py-2 rounded-full text-xs border ${mode===m?'bg-white text-black':'border-white/20 text-white/60'}`}>{m}</button>
        ))}
      </div>
      <p className="mt-6 text-[10px] opacity-30">ENTER THE CORE — {mode} MODE</p>
    </main>
  )
}
