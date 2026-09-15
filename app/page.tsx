
"use client";
import Link from "next/link";

const cards = [
  { href: "/lab", title: "LAB", desc: "Noyau Vantablack • Test des 7 ondes", tag: "V08 CORE" },
  { href: "/drop", title: "DROP", desc: "Black Edition • Édition limitée", tag: "LIVE" },
  { href: "/multiverse", title: "MULTIVERSE", desc: "Portails • Archives • Versions", tag: "∞" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-4 flex flex-col items-center">
      <h1 className="text-3xl font-black tracking-tighter mt-8">MAG CORE V08</h1>
      <p className="text-zinc-500 text-xs tracking-[0.3em] mt-2">BLACK EDITION — NOYAU VANTABLACK</p>
      <div className="grid gap-4 w-full max-w-[420px] mt-10">
        {cards.map(c=>(
          <Link key={c.href} href={c.href} className="group border border-zinc-800 rounded-[24px] p-6 bg-zinc-950/50 active:scale-[0.98] transition">
            <div className="flex justify-between"><span className="text-[10px] border border-zinc-700 rounded-full px-2 py-0.5">{c.tag}</span><span className="text-zinc-600 group-active:text-white">→</span></div>
            <h2 className="text-2xl font-bold mt-4">{c.title}</h2>
            <p className="text-sm text-zinc-400 mt-1">{c.desc}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
