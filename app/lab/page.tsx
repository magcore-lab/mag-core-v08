
export default function Lab(){
  return (
    <main className="min-h-screen bg-black text-white p-6">
      <a href="/" className="text-xs text-zinc-500">← RETOUR</a>
      <h1 className="text-4xl font-black mt-6">LAB</h1>
      <p className="text-zinc-400 mt-2">Test des 7 ondes en temps réel.</p>
      <div className="mt-8 grid gap-3">
        {[1,2,3,4,5,6,7].map(i=>(
          <div key={i} className="h-14 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center px-4 justify-between">
            <span>ONDE 0{i}</span><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          </div>
        ))}
      </div>
    </main>
  )
}
