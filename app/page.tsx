
'use client'
export default function Page(){
  return(
    <main className="min-h-screen bg-black flex items-center justify-center">
      <div className="absolute top-6 left-6 text-[10px] tracking-[0.32em] text-white/50">
        <div className="border-l-2 border-cyan-400/60 pl-3">STATUT : ACTIF</div>
      </div>

      <div className="relative w-[min(500px,86vw)] h-[min(500px,86vw)] rounded-full"
        style={{
          background: `radial-gradient(circle at 32% 28%, #fff 0% 12%, #e6fbff 22%, #6fdfff 48%, #aef0ff 82%, #d8f9ff 100%)`,
          boxShadow: `0 0 0 1px rgba(255,255,255,0.9), 0 0 90px rgba(255,255,255,0.65), 0 0 160px rgba(0,220,255,0.5), inset 0 0 50px rgba(255,255,255,0.95)`
        }}
      >
        {/* FACETTES SHARP CRYSTAL - 72 facettes nettes */[STRIPPED 23 bytes]"0 0 100 100" className="absolute inset-0 w-full h-full rounded-full">
          {Array.from({length:72}).map((_,i)=>{
            const a1=(i/72)*360;
            const mid=a1+2.5;
            const x1=50+Math.cos(a1*Math.PI/180)*50;
            const y1=50+Math.sin(a1*Math.PI/180)*50;
            const x2=50+Math.cos(mid*Math.PI/180)*22;
            const y2=50+Math.sin(mid*Math.PI/180)*22;
            const isBright=i%6===0;
            return(
              <g key={i}>
                <path d={`M50 50 L${x1} ${y1} L${x2} ${y2} Z`}
                  fill={isBright?'rgba(255,255,255,0.22)':'rgba(255,255,255,0.06)'}
                  stroke={isBright?'rgba(255,255,255,1)':'rgba(255,255,255,0.55)'}
                  strokeWidth={isBright?0.8:0.22}
                  strokeLinejoin="round"
                />
              </g>
            )
          })}
          <circle cx="50" cy="50" r="9" fill="white" opacity="0.98" style={{filter:'drop-shadow(0 0 8px white)'}}/>
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[9px] tracking-[0.45em] text-cyan-900/55 font-bold drop-shadow-[0_0_12px_white]">MAGMORE V10.1</span>
          <span className="text-[10px] mt-1.5 tracking-[0.22em] text-cyan-900/70 font-bold drop-shadow-[0_0_12px_white]">NOYAU ACTIF 100%</span>
        </div>
      </div>
    </main>
  )
}
