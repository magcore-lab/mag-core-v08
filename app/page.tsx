
"use client";
import Link from "next/link";

const items = [
  { href: "/lab", t: "LAB", d: "Noyau Vantablack • Test des 7 ondes", tag: "V08 CORE", dot: "bg-emerald-400" },
  { href: "/drop", t: "DROP", d: "Black Edition • Stock 08/08", tag: "LIVE", dot: "bg-red-500" },
  { href: "/multiverse", t: "MULTIVERSE", d: "Portails • Archives V01-V08", tag: "∞", dot: "bg-white" },
];

export default function Home(){
  return(
    <main className="min-h-screen bg-black text-white p-4 flex flex-col items-center">
      <h1 className="text-[34px] font-black tracking-tighter mt-8">MAG CORE V08</h1>
      <p className="text-[10px] tracking-[0.4em] text-zinc-500 mt-2">BLACK EDITION — VANTABLACK CORE</p>
      <div className="w-full max-w-[420px] mt-10 grid gap-4">
        {items.map(i=>(
          <Link key={i.href} href={i.href} className="border border-zinc-800 bg-zinc-950/60 rounded-[24px] p-6 active:scale-[0.98] transition">
            <div className="flex justify-between"><span className="text-[9px] border border-zinc-700 rounded-full px-2.5 py-1">{i.tag}</span><span className="flex items-center gap-2"><span className={`w-2 h-2 rounded-full ${i.dot} animate-pulse`}/>→</span></div>
            <div className="text-[22px] font-bold mt-5">{i.t}</div>
            <div className="text-[13px] text-zinc-400 mt-1">{i.d}</div>
          </Link>
        ))}
      </div>
    </main>
  )
}
