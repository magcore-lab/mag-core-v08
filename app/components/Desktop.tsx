
"use client";
import { useState } from "react";
import Orb from "./Orb";
import Window from "./Window";

export default function Desktop() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div
      style={{
        background: "#000000",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        paddingBottom: 90,
      }}
    >
      <button
        onClick={() => setOpen(null)}
        style={{ zIndex: 20, background: "transparent", border: "none", cursor: "pointer", padding: 0 }}
        aria-label="Close window"
      >
        <Orb variant={open === "LAB" ? "blue" : "red"} />
      </button>
      <div style={{ zIndex: 20, marginTop: 24, display: "flex", gap: 10, fontFamily: "monospace", fontSize: 10, letterSpacing: "2px", flexWrap: "wrap", justifyContent: "center" }}>
        {["LAB", "PROJECTS", "DROP", "STATUS"].map((id) => (
          <button key={id} onClick={() => setOpen(id)} style={{ padding: "8px 16px", borderRadius: 9999, border: "1px solid rgba(255,255,255,0.2)", color: open === id ? "white" : "rgba(255,255,255,0.7)", background: open === id ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.05)", backdropFilter: "blur(4px)", cursor: "pointer" }}>{id}</button>
        ))}
      </div>
      {open && (
        <Window title={`${open} • MAG CORE V0.9 • #000 VR CINEMA • PULSE • 1.5m`} onClose={() => setOpen(null)}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ color: "white", fontSize: 16 }}>Module {open} — Quantum Fusion Pulse</div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, lineHeight: "1.6" }}>Fond #000 pur • Orb 140px pulse 4s • #A51205 maîtrisé • LAB = bleu glacier #00D4FF • bordure blanche 2px • safe zone ±15°</div>
          </div>
        </Window>
      )}
      <div style={{ position: "absolute", bottom: 20, fontFamily: "monospace", fontSize: 8, letterSpacing: "0.2em", color: "rgba(255,255,255,0.15)", textAlign: "center", padding: "0 12px" }}>MAG CORE ENGINE • V0.9 PULSE • #000 • VR CINEMA • #A51205 / LAB BLUE</div>
      <style>{`@keyframes pulse { 0%,100% { transform: scale(1); filter: brightness(1); } 50% { transform: scale(1.03); filter: brightness(1.08); } }`}</style>
    </div>
  );
}
