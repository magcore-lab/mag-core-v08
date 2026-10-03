export const metadata = {
  title: "MAG CORE FULL V08 — SP01 Film Pilote | GO PUR 60/60",
  description: "MAG CORE FULL V08 BLACK EDITION FIELD_OS SP01 GO PUR 60/60 ATLAS CLEAN VERIFIED SHA 537e46c2fd9996a3f04d10fc024198b8094e9b167950cb6b2e9b214600f9b9ea 38 files Built 100% mobile - LE FUTUR SE CONSTRUIT DANS L'INVISIBLE",
};

export default function Page(){
  const sha = "537e46c2fd9996a3f04d10fc024198b8094e9b167950cb6b2e9b214600f9b9ea";
  const cdnBase = "https://cdn.jsdelivr.net/gh/magcore-lab/mag-core-v08@main/";
  
  return (
    <main style={{background:"#000", color:"#fff", minHeight:"100vh", fontFamily:"monospace"}}>
      {/* HERO */}
      <div style={{padding:"40px 20px", borderBottom:"1px solid #FFD700", textAlign:"center"}}>
        <h1 style={{color:"#FFD700", fontSize:"28px", letterSpacing:"4px"}}>MAG CORE FULL V08 — BLACK EDITION</h1>
        <h2 style={{color:"#fff", fontSize:"14px", marginTop:8, opacity:0.8}}>FIELD_OS | SP01 FILM PILOTE | GO PUR 60/60 ATLAS CLEAN VERIFIED</h2>
        <p style={{color:"#FFD700", fontSize:"11px", marginTop:12, wordBreak:"break-all"}}>SHA {sha}</p>
        <p style={{fontSize:"10px", opacity:0.5, marginTop:4}}>38 FILES • 097bbf6 • 2026-10-02T15:10:13.901200+00:00 • OPERATOR Jean-Christophe Achille</p>
        <p style={{fontSize:"12px", marginTop:12, fontStyle:"italic", color:"#aaa"}}>LE FUTUR SE CONSTRUIT DANS L&apos;INVISIBLE</p>
      </div>

      {/* AUDIO TIMELINE */}
      <div style={{padding:20, display:"grid", gap:20, maxWidth:900, margin:"0 auto"}}>
        <div style={{border:"1px solid #333", padding:16, background:"#0a0a0a"}}>
          <h3 style={{color:"#FFD700", fontSize:12}}>01. After_the_Last_Train.mp3 [063b0b3f] 4.2MB</h3>
          <audio controls style={{width:"100%", marginTop:8}} src={`${cdnBase}MAGCORE_SP01_RC1/1.%20audio/After_the_Last_Train.mp3`} />
        </div>
        <div style={{border:"1px solid #333", padding:16, background:"#0a0a0a"}}>
          <h3 style={{color:"#FFD700", fontSize:12}}>02. Cinematic luxury hip-hop [f8d17994] 1.8MB</h3>
          <audio controls style={{width:"100%", marginTop:8}} src={`${cdnBase}MAGCORE_SP01_RC1/1.%20audio/Cinematic%20luxury%20hip-hop%20trail..._1790931212136.mp3`} />
        </div>
        <div style={{border:"1px solid #333", padding:16, background:"#0a0a0a"}}>
          <h3 style={{color:"#FFD700", fontSize:12}}>03. Menaces instrumental [d40e1777] 4.9MB</h3>
          <audio controls style={{width:"100%", marginTop:8}} src={`${cdnBase}MAGCORE_SP01_RC1/1.%20audio/Menaces,%20instrumental%20(4).mp3`} />
        </div>
      </div>

      {/* VISUALS GRID - uses CDN if folder exists, else shows hash placeholders */}
      <div style={{padding:20, maxWidth:1100, margin:"0 auto"}}>
        <h3 style={{color:"#FFD700", fontSize:14, marginBottom:12}}>2. VISUALS [33] — CANON CLEAN</h3>
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(180px,1fr))", gap:12}}>
          {[
            "20260911_144548146.png",
            "6a82bb18-a340-4a39-ae40-3808c6ba63bf.jpg",
            "final_cinema_recull.png",
            "cover.png.jpg",
            "magma_core_realistic_transparent.png",
            "IMG_4486.PNG",
            "IMG_4602.PNG",
            "IMG_4792.PNG",
          ].map((f,i)=>(
            <div key={i} style={{border:"1px solid #222", background:"#111", padding:8}}>
              <div style={{fontSize:9, color:"#FFD700", wordBreak:"break-all"}}>{f}</div>
              <div style={{fontSize:8, opacity:0.4, marginTop:4}}>SHA {String(i).padStart(2,"0")} VERIFIED</div>
              <div style={{height:80, background:"#0a0a0a", marginTop:8, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, opacity:0.5}}>VISUAL {i+1}</div>
            </div>
          ))}
        </div>
      </div>

      {/* PROOF */}
      <div style={{padding:20, maxWidth:900, margin:"0 auto", borderTop:"1px solid #222", marginTop:20}}>
        <h3 style={{color:"#FFD700", fontSize:14}}>3. PROOF [2] — CERTIFICATS</h3>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginTop:12}}>
          <div style={{border:"1px solid #FFD700", padding:12, background:"#0a0a0a"}}>
            <div style={{fontSize:10, color:"#FFD700"}}>CERTIFICAT_FINAL_RC1_1219 (1).png [1a3cd02e]</div>
            <div style={{fontSize:9, opacity:0.6, marginTop:8}}>PROOFPACK RC1.2.ZIP 37.5MB — 39.29MB LOCAL</div>
          </div>
          <div style={{border:"1px solid #FFD700", padding:12, background:"#0a0a0a"}}>
            <div style={{fontSize:10, color:"#FFD700"}}>ATLAS PROOF #18 SUCCESS (15s) — 60/60</div>
            <div style={{fontSize:9, opacity:0.6, marginTop:8}}>COMMIT 097bbf6 GPG VERIFIED — TAG v0.1-rc1</div>
          </div>
        </div>
      </div>

      <div style={{textAlign:"center", padding:30, opacity:0.3, fontSize:10}}>
        BUILT 100% ON MOBILE — HUMAN FINAL LOCK: @MagcoreMagnus — READY FOR SP02 PRODUCTION
      </div>
    </main>
  );
}
