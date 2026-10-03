export const metadata = {
  title: "MAG CORE FULL V08 — SP02 FIELD_OS ACTIVATION | GO PUR 60/60",
  description: "MAG CORE FULL V08 BLACK EDITION SP02 FIELD_OS ACTIVATION GO PUR 60/60 ATLAS CLEAN VERIFIED SHA 537e46c2fd9996a3f04d10fc024198b8094e9b167950cb6b2e9b214600f9b9ea SP01 38 files + SP02 expansion Built 100% mobile - LE FUTUR SE CONSTRUIT DANS L'INVISIBLE",
};

export default function Page(){
  const sha = "537e46c2fd9996a3f04d10fc024198b8094e9b167950cb6b2e9b214600f9b9ea";
  const cdnBase = "https://cdn.jsdelivr.net/gh/magcore-lab/mag-core-v08@main/";
  return (
    <main style={{background:"#000", color:"#fff", minHeight:"100vh", fontFamily:"monospace"}}>
      <div style={{padding:"40px 20px", borderBottom:"1px solid #FFD700", textAlign:"center"}}>
        <h1 style={{color:"#FFD700", fontSize:"28px", letterSpacing:"4px"}}>MAG CORE FULL V08 — SP02</h1>
        <h2 style={{color:"#fff", fontSize:"14px", marginTop:8, opacity:0.8}}>FIELD_OS ACTIVATION | GO PUR 60/60 | SP01 LOCKED {sha.slice(0,8)}</h2>
        <p style={{color:"#FFD700", fontSize:"11px", marginTop:12, wordBreak:"break-all"}}>SP01 SHA {sha}</p>
        <p style={{fontSize:"10px", opacity:0.5, marginTop:4}}>SP01 38 FILES • 097bbf6 • SP02 EXPANSION • READY FOR PRODUCTION</p>
        <p style={{fontSize:"12px", marginTop:12, fontStyle:"italic", color:"#aaa"}}>LE FUTUR SE CONSTRUIT DANS L&apos;INVISIBLE — SP02 ACTIVATION</p>
      </div>

      <div style={{padding:20, maxWidth:900, margin:"0 auto"}}>
        <div style={{border:"1px solid #FFD700", padding:16, background:"#0a0a0a"}}>
          <h3 style={{color:"#FFD700", fontSize:12}}>SP01 → SP02 TRANSITION — After_the_Last_Train → FIELD_OS ACTIVE</h3>
          <audio controls style={{width:"100%", marginTop:8}} src={`${cdnBase}MAGCORE_SP01_RC1/1.%20audio/After_the_Last_Train.mp3`} />
          <div style={{fontSize:10, opacity:0.5, marginTop:8}}>063b0b3f — 4.2MB — SP01 PILOTE VERIFIED</div>
        </div>
        <div style={{border:"1px dashed #333", padding:16, background:"#050505", marginTop:12}}>
          <h3 style={{color:"#888", fontSize:12}}>SP02 NEW TRACKS [2] — A VENIR</h3>
          <div style={{fontSize:10, opacity:0.4, marginTop:8}}>FIELD_OS boot sound + Activation 148 BPM TRAP — slots réservés</div>
        </div>
      </div>

      <div style={{padding:20, maxWidth:1100, margin:"0 auto"}}>
        <h3 style={{color:"#FFD700", fontSize:14, marginBottom:12}}>SP02 VISUALS EXPANSION — BASE SP01 33 + 7 NEW</h3>
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(180px,1fr))", gap:12}}>
          {["SP01_locked_final_cinema_recull.png","SP02_FIELD_OS_activation.png","SP02_magma_core_active.png","SP02_new_posture_hat.png","SP02_cover_black_gold.png","SP02_proof_atlas_60_60.png","SP02_timeline_sp01_sp02.png","SP02_doctrine_invisible.png"].map((f,i)=>(
            <div key={i} style={{border:"1px solid #222", background:"#111", padding:8}}>
              <div style={{fontSize:9, color:"#FFD700", wordBreak:"break-all"}}>{f}</div>
              <div style={{height:80, background:"#0a0a0a", marginTop:8, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, opacity:0.5}}>{i===0?"LOCKED":"NEW SLOT"}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{textAlign:"center", padding:30, opacity:0.3, fontSize:10}}>
        SP01 FULL LOCKED 4e15dcb Ready Latest 41s — SP02 FULL STACK INCOMING — BUILT 100% ON MOBILE — @MagcoreMagnus
      </div>
    </main>
  );
}
