'use client'
import { useState } from 'react';

export default function Page(){
  const [m,setM]=useState('MAGCORE');

  return(
    <main className="min-h-screen bg-black flex items-center justify-center relative">
      <div className="absolute top-6 left-6 text-[10px] tracking-[0.32em] text-white/50">
        <div className="border-l-2 border-cyan-400/60 pl-3">STATUT : ACTIF</div>
        <div className="pl-3 mt-1 text-[8px] opacity-60">PUISSANCE : 100% • STABLE</div>
      </div>

      {/* NOYAU SEUL 4K - DIAMANT REALISTE SANS CANVAS LOURD */}
      <div className="relative w-[min(460px,82vw)] h-[min(460px,82vw)]">
        <div className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle at 35% 30%, #fff 0%, #eaffff 22%, #7fe8ff 52%, #b9f2ff 100%)',
            boxShadow: '0 0 70px rgba(255,255,255,0.6), 0 0 130px rgba(0,220,255,0.4), inset 0 0 35px rgba(255,255,255,0.9)'[STRIPPED 47 bytes]"0 0 100 100" className="absolute inset-0 w-full h-full">
            {Array.from({length:64}).map((_,i)=>{
              const a1=(i/64)*360;
              const a2=((i+1)/64)*360;
              const mid=(a1+a2)/2;
              const x1=50+Math.cos(a1*Math.PI/180)*50;
              const y1=50+Math.sin(a1*Math.PI/180)*50;
              const x2=50+Math.cos(mid*Math.PI/180)*28;
              const y2=50+Math.sin(mid*Math.PI/180)*28;
              const op=i%8===0?0.85:0.22;
              return(
                <path
                  key={i}
                  d={`M50 50 L${x1} ${y1} L${x2} ${y2} Z`}
                  fill={i%2===0?'rgba(255,255,255,0.14)':'rgba(0,200,255,0.06)'}
                  stroke={`rgba(255,255,255,${op})`}
                  strokeWidth={i%8===0?0.5:0.15}
                />
              )
            })}
            <circle cx="50" cy="50" r="11" fill="white" opacity="0.92"/>
          </svg>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[9px] tracking-[0.42em] text-cyan-900/55 font-bold">MAGMORE V10.1</span>
          <span className="text-[10px] mt-1.5 tracking-[0.2em] text-cyan-900/65 font-bold">NOYAU ACTIF 100%</span>
        </div>
      </div>

      <div className="absolute bottom-6 flex gap-2">
        {['CŒUR','PUR','MAGCORE'].map(n=>(
          <button key={n} onClick={()=>setM(n)} className={`px-7 py-2.5 rounded-full text-[11px] tracking-[0.18em] border ${m===n?'bg-white text-black border-white shadow-[0_0_30px_white]':'border-white/10 text-white/25'}`}>{n}</button>
        ))}
      </div>
    </main>
  );
}
