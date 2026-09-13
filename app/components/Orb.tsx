 
"use client";
type OrbProps = { variant?: "red" | "blue" };
export default function Orb({ variant = "red" }: OrbProps) {
  const isBlue = variant === "blue";
  return (
    <div style={{ position: "relative", width: 140, height: 140, animation: "pulse 4s ease-in-out infinite" }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: isBlue ? "#00D4FF" : "#A51205", filter: "blur(28px)", opacity: 0.2 }} />
      <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: "50%", background: isBlue ? "radial-gradient(at 32% 28%, #7DDFFF 0%, #00A8CC 28%, #0A4A5A 68%, #041E26 100%)" : "radial-gradient(at 32% 28%, #C41E0F 0%, #A51205 38%, #7A0E04 62%, #3A0702 92%)", boxShadow: "inset 0 0 18px rgba(255,255,255,0.45), inset 0 0 0 1px rgba(255,255,255,0.08)" }}>
        <div style={{ position: "absolute", top: "20%", left: "24%", width: "28%", height: "28%", background: "radial-gradient(white, rgba(255,255,255,0) 72%)", opacity: 0.7, borderRadius: "50%", filter: "blur(0.5px)" }} />
      </div>
      <div style={{ position: "absolute", inset: -6, borderRadius: "50%", opacity: 0.035, background: "repeating-linear-gradient(0deg, rgba(255,255,255,0.8) 0px, transparent 1px, transparent 2px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: -14, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.07)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: -28, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.03)", pointerEvents: "none" }} />
    </div>
  );
}
