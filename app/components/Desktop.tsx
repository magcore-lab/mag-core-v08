
"use client";
import { useState } from "react";
import Window from "./Window";
import CoreVR from "../CoreVR";

export default function Desktop() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div style={{ 
      background: "#000000", 
      minHeight: "100vh", 
      position: "relative", 
      overflow: "hidden", 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center" 
    }}>
      
      {/* Core en arrière-plan */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }}>
        <CoreVR />
      </div>

      {/* Interface par-dessus */}
      <div style={{ zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ marginTop: 24, display: "flex", gap: 10, fontFamily: "monospace", fontSize: 10, letterSpacing: "0.2em" }}>
          {["LAB", "PROJECTS", "DROP", "STATUS"].map((id) => (
            <button
              key={id}
              onClick={() => setOpen(id)}
              style={{ 
                padding: "8px 16px", 
                background: "rgba(0,0,0,0.5)", 
                border: "1px solid rgba(255,255,255,0.2)", 
                color: "#fff", 
                cursor: "pointer", 
                borderRadius: "4px",
                backdropFilter: "blur(4px)"
              }}
            >
              {id}
            </button>
          ))}
        </div>
      </div>
      
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
}
