'use client'
export default function Page(){
return(
<main className="min-h-screen bg-black flex items-center justify-center">
<div className="relative w-[min(520px,88vw)] h-[min(520px,88vw)] rounded-full overflow-hidden"
style={{
background:'radial-gradient(circle at 32% 30%, #fff 0% 14%, #eaffff 24%, #7be8ff 52%, #aef0ff 100%)',
boxShadow:'inset 0 0 42px #fff, 0 0 0 1px #fff, 0 0 80px rgba(255,255,255,0.5), 0 0 160px rgba(0,220,255,0.35)'[STRIPPED 18 bytes]"0 0 100 100" className="absolute inset-0 w-full h-full">
{Array.from({length:48}).map((_,i)=>{
const a1=(i/48)*360; const m=a1+3.75;
const x1=50+Math.cos(a1*Math.PI/180)*50;
const y1=50+Math.sin(a1*Math.PI/180)*50;
const xm=50+Math.cos(m*Math.PI/180)*27;
const ym=50+Math.sin(m*Math.PI/180)*27;
return(<path key={i} d={`M50 50 L${x1} ${y1} L${xm} ${ym} Z`} fill={i%4===0?'rgba(255,255,255,0.38)':'rgba(255,255,255,0.07)'} stroke={i%4===0?'white':'rgba(255,255,255,0.5)'} strokeWidth={i%4===0?1:0.26}/>)
})}
</svg>
<div className="absolute inset-0 flex flex-col items-center justify-center">
<span className="text-[9px] tracking-[0.45em] text-cyan-900/45 font-bold">MAGMORE V10.1</span>
<span className="text-[10px] mt-1.5 tracking-[0.22em] text-cyan-900/60 font-bold">NOYAU ACTIF 100%</span>
</div>
</div>
</main>
)
}
