'use client'
export default function Page(){
  return(
    <main className="min-h-screen bg-black flex items-center justify-center relative">
      <div className="absolute top-6 left-6 text-[10px] tracking-[0.32em] text-white/40">
        <div className="border-l-2 border-cyan-400/60 pl-3">STATUT : ACTIF</div>
      </div>

      <div className="relative w-[min(520px,88vw)] h-[min(520px,88vw)] rounded-full"
        style={{
          background: 'radial-gradient(circle at 30% 28%, #fff 0% 15%, #eaffff 24%, #7be8ff 52%, #b8f1ff 100%)',
          boxShadow: 'inset 0 0 45px rgba(255,255,255,1), 0 0 0 1px rgba(255,255,255,0.9), 0 0 80px rgba(255,255,255,0.55), 0 0 160px rgba(0,220,255,0.4)'[STRIPPED 41 bytes]"0 0 100 100" className="absolute inset-0 w-full h-full rounded-full">
          {Array.from({length:64}).map((_,i)=>{
            const a1=(i/64)*360;
            const a2=((i+1)/64)*360;
            const mid=(a1+a2)/2;
            const x1=50+Math.cos(a1*Math.PI/180)*50;
            const y1=50+Math.sin(a1*Math.PI/180)*50;
            const xm=50+Math.cos(mid*Math.PI/180)*30;
            const ym=50+Math.sin(mid*Math.PI/180)*30;
            const bright=i%4===0;
            return(
              <path key={i} d={`M50 50 L${x1} ${y1} L${xm} ${ym} Z`}
                fill={bright?'rgba(255,255,255,0.36)':'rgba(255,255,255,0.08)'}
                stroke={bright?'#ffffff':'rgba(255,255,255,0.48)'}
                strokeWidth={bright?1:0.28}
              />
            )
          })}
          <circle cx="50" cy="50" r="7" fill="white"/>
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[9px] tracking-[0.45em] text-cyan-900/45 font-bold">MAGMORE V10.1</span>
          <span className="text-[10px] mt-1.5 tracking-[0.22em] text-cyan-900/60 font-bold">NOYAU ACTIF 100%</span>
        </div>
      </div>
    </main>
  )
}
