
"use client";
import { useState } from "react";
import Window from "./Window";

export default function Desktop() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div style={{ background: "#000000", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <button onClick={() => setOpen(null)} style={{ zIndex: 20, background: "transparent", border: "none", cursor: "pointer" }}>
        <div style={{ zIndex: 20, marginTop: 24, display: "flex", gap: 10, fontFamily: "monospace", fontSize: 10, letterSpacing: "0.2em" }}>
          {["LAB", "PROJECTS", "DROP", "STATUS"].map((id) => (
            <button
              key={id}
              onClick={() => setOpen(id)}
              style={{ padding: "8px 16px", background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", cursor: "pointer", borderRadius: "4px" }}
            >
              {id}
            </button>
          ))}
        </div>
      </button>
      
      {open && (
        <Window 
          title={`${open} • MAG CORE V08 BLACK EDITION • #000 VR CINEMA • PULSE • 1.5m`} 
          onClose={() => setOpen(null)}
        >
          <div style={{ position: "absolute", bottom: 20, fontFamily: "monospace", fontSize: 8, letterSpacing: "0.2em", color: "rgba(255,255,255,0.5)" }}>
            PULSE SYSTEM ACTIVE
          </div>
        </Window>
      )}
    </div>
  );
}z
