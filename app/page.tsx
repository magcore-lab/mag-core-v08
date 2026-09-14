
"use client";
import { useState } from "react";

export default function Page() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div style={{ background: "#000000", minHeight: "100vh", color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "monospace" }}>
      <div style={{ position: "absolute", top: 20, left: 20, fontSize: 10, letterSpacing: "0.4em", opacity: 0.5 }}>MAG-CORE // V08 BLACK EDITION - READY</div>
      <h1 style={{ fontSize: 48, fontWeight: 900 }}>MAG CORE V08</h1>
      <div style={{ marginTop: 24, display: "flex", gap: 10 }}>
        {["LAB", "PROJECTS", "DROP", "STATUS"].map((id) => (
          <button key={id} onClick={() => setOpen(id)} style={{ padding: "8px 16px", background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", cursor: "pointer" }}>{id}</button>
        ))}
      </div>
      {open && <div style={{ marginTop: 40, border: "1px solid #fff", padding: 20 }}>{open} • MAG CORE V08 BLACK EDITION • #000 VR CINEMA • PULSE • 1.5m</div>}
    </div>
  );
}
