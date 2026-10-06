
"use client";
import { useRef, useEffect, useState } from "react";

export default function Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qState, setQState] = useState("SUPERPOSITION");
  const [ent, setEnt] = useState(0);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let t = 0;
    const draw = () => {
      t += 0.016;
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, 1000, 560);
      // 150 etoiles probabilite
      for (let i = 0; i < 150; i++) {
        const x = 500 + Math.sin(t * 0.3 + i * 0.13) * 480 + Math.cos(t * 0.7 + i) * 20;
        const y = 280 + Math.sin(t * 0.5 + i * 0.17) * 260 + Math.cos(t * 0.4 + i * 0.23) * 20;
        const prob = Math.sin(t + i * 0.1) * 0.5 + 0.5;
        ctx.fillStyle = "rgba(255,215,0," + prob * 0.3 + ")";
        ctx.beginPath();
        ctx.arc(x, y, 8 + prob * 6, 0, 6.283185307179586);
        ctx.fill();
      }
      // 14 drones FFD700 intrication
      for (let i = 0; i < 14; i++) {
        const angle = t * 0.5 + i * 0.44;
        const r = 80 + Math.sin(t * 0.4 + i) * 30;
        const x = 500 + Math.cos(angle) * r + Math.sin(t * 0.7 + i * 1.1) * 20;
        const y = 280 + Math.sin(angle * 1.3) * r * 0.6 + Math.cos(t * 0.5 + i) * 15;
        const e = Math.sin(t * 2 + i) * 0.5 + 0.5;
        ctx.fillStyle = "#FFD700";
        ctx.globalAlpha = 0.7 + e * 0.3;
        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, 6.283185307179586);
        ctx.fill();
        ctx.globalAlpha = 0.15 + e * 0.25;
        ctx.beginPath();
        ctx.arc(x, y, 14 + e * 8, 0, 6.283185307179586);
        ctx.fill();
        ctx.globalAlpha = 1;
        if (i < 13) {
          const j = i + 1;
          const ang2 = t * 0.5 + j * 0.44;
          const r2 = 80 + Math.sin(t * 0.4 + j) * 30;
          const x2 = 500 + Math.cos(ang2) * r2 + Math.sin(t * 0.7 + j * 1.1) * 20;
          const y2 = 280 + Math.sin(ang2 * 1.3) * r2 * 0.6 + Math.cos(t * 0.5 + j) * 15;
          ctx.strokeStyle = "rgba(255,215,0," + (0.05 + e * 0.15) + ")";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      }
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 24px monospace";
      ctx.fillText("MAG CORE V66 FINAL FIX MODULE", 20, 40);
      ctx.fillStyle = "#FFD700";
      ctx.font = "bold 14px monospace";
      ctx.fillText("QUANTIQUE EST LA - BUILD 100PCT OK - FOND NOIR FIX", 20, 65);
      ctx.fillStyle = "#888888";
      ctx.font = "9px monospace";
      ctx.fillText("HERO.f - 487f1c55 - 1361394 - TRES IMPORTANTE", 20, 82);
      ctx.fillStyle = "#444444";
      ctx.font = "7px monospace";
      ctx.fillText("SHA 537e46c2fd9996a3f04d10fc024198b8094e9b167950cb6b2e9b214600f9b9ea - 38 FILES - 097bbf6", 20, 96);
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  const play = () => {
    setQState(["SUPERPOSITION", "ENTANGLEMENT", "MESURE"][Math.floor(Math.random() * 3)] as string);
    setEnt(Math.random());
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#000", color: "#fff", fontFamily: "monospace", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "16px", background: "linear-gradient(to bottom right, rgba(113,63,18,0.8), #000, #000)", borderBottom: "4px solid #facc15" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 900, color: "#fff", margin: 0 }}>MAG CORE V66 FINAL FIX MODULE - QUANTUM</h1>
        <div style={{ color: "#facc15", fontSize: "8px", fontWeight: "bold", marginTop: "4px" }}>V66 FOND NOIR FIX - BUILD 100PCT OK - QUANTIQUE EST LA</div>
        <div style={{ color: "#fff", fontSize: "7px", marginTop: "4px" }}>MAGCORE SP01 RC1 V0.1 DEV - 097bbf6 - 537e46c2 - 38 FILES - 37500000 bytes - LE FUTUR SE CONSTRUIT DANS L INVISIBLE</div>
        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "5px", marginTop: "4px", wordBreak: "break-all" }}>SHA 537e46c2fd9996a3f04d10fc024198b8094e9b167950cb6b2e9b214600f9b9ea | 38 FILES CLEAN PARFAIT FINAL | QSTATE {qState} - {ent.toFixed(3)}</div>
      </div>
      <div style={{ flex: 1, position: "relative", width: "100%", backgroundColor: "#000", overflow: "hidden", minHeight: "70vh" }}>
        <canvas ref={canvasRef} width={1000} height={560} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", backgroundColor: "#000" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", border: "2px solid rgba(234,179,8,0.7)", backgroundColor: "rgba(0,0,0,0.8)", padding: "16px", textAlign: "center" }}>
          <div style={{ fontSize: "34px", fontWeight: 900, color: "#fff" }}>MAG CORE V66</div>
          <div style={{ color: "#facc15", fontSize: "11px", marginTop: "4px", fontWeight: "bold" }}>FINAL FIX MODULE</div>
          <div style={{ color: "#fff", fontSize: "8px", marginTop: "8px" }}>QUANTIQUE EST LA</div>
          <div style={{ color: "#fff", fontSize: "8px", marginTop: "4px" }}>{"{HERO.f} - 487f1c55 - 1361394"}</div>
          <button onClick={play} style={{ marginTop: "12px", border: "1px solid #facc15", padding: "4px 12px", fontSize: "7px", backgroundColor: "transparent", color: "#facc15", cursor: "pointer" }}>PLAY QUANTUM - {qState}</button>
        </div>
      </div>
      <div style={{ padding: "8px", backgroundColor: "#000", borderTop: "1px solid #27272a", fontSize: "6px", color: "#71717a" }}>V66 FOND NOIR FIX - BUILD 100PCT OK - export default function Page() - module OK - SHA 537e46c2fd9996a3f04d10fc024198b8094e9b167950cb6b2e9b214600f9b9ea - 38 FILES - 097bbf6 - LE FUTUR SE CONSTRUIT DANS L INVISIBLE - GO PUR 60 SUR 60 VERROUILLE.</div>
    </div>
  );
}
