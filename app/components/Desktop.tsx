"use client";
import { useState } from "react";

export default function Page() {
  const [isOn, setIsOn] = useState(false);

  return (
    <div style={{ background: "#000000", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      
      <div onClick={() => setIsOn(!isOn)} style={{ cursor: "pointer", textAlign: "center" }}>
        <img 
          src={isOn ? "/core-on-white-pur.png" : "/mag-core-engine-1k.webp"} 
          alt="CORE" 
          style={{ width: "80vw", maxWidth: "600px", height: "auto", filter: isOn ? "drop-shadow(0 0 120px white)" : "none" }} 
        />
        <div style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.2em", color: isOn ? "#fff" : "rgba(255,255,255,0.5)", marginTop: 16 }}>
          {isOn ? "CORE ON • 7 ONDES • FIELD ACTIF" : "CORE OFF • FIELD EN VEILLE"}
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, fontFamily: "monospace", fontSize: 10, letterSpacing: "0.2em", marginTop: 40 }}>
        {["LAB", "PROJECTS", "DROP", "STATUS"].map((id) => (
          <button key={id} style={{ padding: "8px 16px", background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", cursor: "pointer", borderRadius: "4px", backdropFilter: "blur(4px)" }}>
            {id}
          </button>
        ))}
      </div>

    </div>
  );
}
