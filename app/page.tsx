'use client'
export default function Page(){
  return(
    <main className="min-h-screen bg-black flex items-center justify-center">
      <div className="absolute top-6 left-6 text-[10px] tracking-[0.3em] text-white/50">
        <div className="border-l-2 border-cyan-400/60 pl-3">STATUT : ACTIF</div>
      </div>

      <div className="relative w-[min(460px,84vw)] h-[min(460px,84vw)] rounded-full overflow-hidden"
        style={{
          background: `radial-gradient(circle at 30% 30%, #fff 0% 20%, #b8f1ff 35%, #5ad6ff 70%, #9ee9ff 100%)`,
          boxShadow: `inset 0 0 60px rgba(255,255,255,0.9), 0 0 80px rgba(255,255,255,0.5), 0 0 140px rgba(0,220,255,0.4)`
        }}
      >
        <div className="absolute inset-0 rounded-full"
          style={{
            background: `repeating-conic-gradient(from 0deg, transparent 0deg 5deg, rgba(255,255,255,0.85) 5deg 5.6deg, transparent 5.6deg 10deg)`,
            mixBlendMode: 'overlay', opacity: 0.9
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] rounded-full bg-white blur-[1px] shadow-[0_0_30px_white]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[9px] tracking-[0.42em] text-cyan-900/60 font-bold">MAGMORE V10.1</span>
          <span className="text-[10px] mt-1 tracking-[0.2em] text-cyan-900/70 font-bold">NOYAU ACTIF 100%</span>
        </div>
      </div>
    </main>
  )
}
