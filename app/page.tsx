
"use client";
// V23.4 STABLE FINAL - MAG CORE - FROZEN REFERENCE - PROD - 4 correctifs
// BASE: page_v23_3_stable_final.tsx V23.3 STABLE FINAL
// CORRECTIFS CHIRURGIE SANS CASSE :
// C1 (BLOQUANT) re-render 1x par bar pas à chaque 16th: suppression state beat + setBeat, beatElRef + dmxGridRef DOM refs, FLASH via CSS [data-flash], setBar uniquement quand nextBeat===1
// C2 drag sans état périmé: handleContainerPointerMove setModules(prev=>...) fonctionnel, lecture from/to avant
// C3 code mort: suppression energyRef, hatTimeoutRef et cleanup, suppression state isTrap dérivé const isTrap = currentStyle.id==="TRAP", onClick style setStyleIdx only
// C4 commentaires: en-tête 4 correctifs, renommage PageV23_4 + titre V23.4
// VALEURS INCHANGÉES: MODULES_CONST 10 SAT01 #FFD700 SAT04 #FFD700, STYLES TRAP140/0.35 DRILL142/0.18 LOFI85/0.22, DMX_CH_INIT 13 MASTER255 DIMMER128, TV_SLOTS 32 dmxByGroup {80,160,255,120}, PRESS_TICKER 8 labels, formule coherence 72+energyNorm*28+jitter±1.5 LFO 0.68-1.0 seuils MAX≥95 HAUTE≥88 MODÉRÉE≥80 FAIBLE, audioT=currentTime+(isTrap?0.35:0.18) TODO VALIDATION gardé, polygonPoints/hubDots fond #000000 aucun violet aucun multiverse

import { useEffect, useMemo, useRef, useState } from "react";

type Module = { id: string; label: string; sub: string; sat: string; color: string };
type DmxCh = { id: string; label: string; val: number };
type TvSlot = { slot: number; group: "INTRO" | "BUILD" | "CLIMAX" | "OUTRO"; label: string; dmx: number; trigger: string; dur: string };
type PressBank = { id: string; label: string; sub: string; val: number };
type Particle = { x: number; y: number; vx: number; vy: number; r: number };

const MODULES_CONST: Module[] = [
  { id: "SAT01", label: "AUDIO CORE", sub: "ENGINE 72-100", sat: "SAT01", color: "#FFD700" },
  { id: "SAT02", label: "BEAT GRID", sub: "CFS 16 STEP", sat: "SAT02", color: "#FF00FF" },
  { id: "SAT03", label: "PARTICLES", sub: "QUANTUM 120", sat: "SAT03", color: "#00FF00" },
  { id: "SAT04", label: "HUB 10", sub: "DECAGONE DYN", sat: "SAT04", color: "#FFD700" },
  { id: "SAT05", label: "DMX LIGHT", sub: "13 CH OUT", sat: "SAT05", color: "#FF8C00" },
  { id: "SAT06", label: "VISUAL FX", sub: "GLITCH NEON", sat: "SAT06", color: "#00CED1" },
  { id: "SAT07", label: "CFS ENGINE", sub: "COHERENCE", sat: "SAT07", color: "#FF1493" },
  { id: "SAT08", label: "TV BROADCAST", sub: "32 SLOTS", sat: "SAT08", color: "#FF0000" },
  { id: "SAT09", label: "PRESS MEDIA", sub: "TICKER 8", sat: "SAT09", color: "#00FFFF" },
  { id: "SAT10", label: "CINÉMA VR", sub: "FUSION VR", sat: "SAT10", color: "#FFFFFF" },
];

const STYLES = [
  { id: "TRAP", label: "TRAP", bpm: 140, swing: 0.35, energy: 0.85 },
  { id: "DRILL", label: "DRILL", bpm: 142, swing: 0.18, energy: 0.88 },
  { id: "LOFI", label: "LO-FI", bpm: 85, swing: 0.22, energy: 0.68 },
];

const DMX_CH_INIT: DmxCh[] = [
  { id: "CH001-016", label: "AUDIO CORE", val: 255 },
  { id: "CH017-032", label: "BEAT GRID", val: 180 },
  { id: "CH033-048", label: "PARTICLES", val: 220 },
  { id: "CH049-064", label: "HUB 10", val: 150 },
  { id: "CH065-080", label: "DMX LIGHT", val: 200 },
  { id: "CH081-096", label: "VISUAL FX", val: 190 },
  { id: "CH097-112", label: "CFS ENGINE", val: 210 },
  { id: "CH113-120", label: "TV BROADCAST", val: 200 },
  { id: "CH121-128", label: "PRESS MEDIA", val: 180 },
  { id: "CH129-136", label: "PRONOSTIC", val: 220 },
  { id: "CH137-144", label: "CINEMA VR", val: 255 },
  { id: "CH145-152", label: "DMX MASTER", val: 255 },
  { id: "CH153-160", label: "DMX DIMMER", val: 128 },
];

const TV_SLOTS: TvSlot[] = Array.from({ length: 32 }, (_, i) => {
  const slot = i + 1;
  const group = slot <= 8 ? "INTRO" : slot <= 16 ? "BUILD" : slot <= 24 ? "CLIMAX" : "OUTRO" as TvSlot["group"];
  const dmxByGroup = { INTRO: 80, BUILD: 160, CLIMAX: 255, OUTRO: 120 };
  return {
    slot,
    group,
    label: `${group} ${String(slot).padStart(2, "0")}`,
    dmx: dmxByGroup[group],
    trigger: `bar ${slot} auto + click hold 4 bars`,
    dur: `1 bar`,
  };
});

const PRESS_TICKER: PressBank[] = [
  { id: "BANK01", label: "BREAKING NEWS STING", sub: "STING", val: 255 },
  { id: "BANK02", label: "LOWER THIRD IN", sub: "LOWER THIRD", val: 200 },
  { id: "BANK03", label: "PAPER TEXTURE 120", sub: "TEXTURE", val: 120 },
  { id: "BANK04", label: "ARCHIVE VINYL -24dB", sub: "ARCHIVE", val: 180 },
  { id: "BANK05", label: "MAG CORE EXCL 8", sub: "EXCL", val: 220 },
  { id: "BANK06", label: "FILM CINE LUT", sub: "CINE LUT", val: 200 },
  { id: "BANK07", label: "BROADCAST SAFE Rec.709", sub: "BROADCAST", val: 180 },
  { id: "BANK08", label: "RSS STATIC FEED", sub: "STATIC", val: 160 },
];

export default function PageV23_4() {
  const [modules, setModules] = useState<Module[]>(MODULES_CONST);
  const [dmxCh] = useState<DmxCh[]>(DMX_CH_INIT);
  const [bar, setBar] = useState(1);
  const [tvSlot, setTvSlot] = useState(1);
  const [tvHoldDisplay, setTvHoldDisplay] = useState(0);
  const [coherence, setCoherence] = useState(85);
  const [styleIdx, setStyleIdx] = useState(0);
  const [openPanels, setOpenPanels] = useState<Record<string, boolean>>({ TV: true, PRESS: true, PRONOSTIC: true });
  const [isAudioReady, setIsAudioReady] = useState(false);
  const [perf, setPerf] = useState({ checks: 0, theoretical: 7140, timeMs: 0 });

  const beatRef = useRef(1);
  const barRef = useRef(1);
  const tvHoldBarsRef = useRef(0);
  const perfRef = useRef({ checks: 0, theoretical: 7140, timeMs: 0 });
  const beatElRef = useRef<HTMLSpanElement>(null);
  const dmxGridRef = useRef<HTMLDivElement>(null);
  const resumeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const dragIdxRef = useRef<number | null>(null);
  const whiteNoiseBufferRef = useRef<AudioBuffer | null>(null);

  const particlesRef = useRef<Particle[] | null>(null);
  if (particlesRef.current === null) {
    particlesRef.current = Array.from({ length: 120 }, () => ({
      x: Math.random() * 320,
      y: Math.random() * 320,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      r: 1.5,
    }));
  }

  const currentStyle = STYLES[styleIdx];
  const isTrap = currentStyle.id === "TRAP";
  const confidence = coherence;

  const initAudio = () => {
    if (audioCtxRef.current) return;
    audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    const ctx = audioCtxRef.current;
    const len = Math.floor(ctx.sampleRate * 0.08);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    whiteNoiseBufferRef.current = buf;
    setIsAudioReady(true);
    resumeIntervalRef.current = setInterval(() => {
      if (audioCtxRef.current?.state === "suspended") audioCtxRef.current.resume();
    }, 1000) as any;
  };

  useEffect(() => {
    const onWindowPointerUp = () => {
      if (dragIdxRef.current !== null) {
        dragIdxRef.current = null;
      }
    };
    window.addEventListener("pointerup", onWindowPointerUp);
    window.addEventListener("pointercancel", onWindowPointerUp);
    return () => {
      window.removeEventListener("pointerup", onWindowPointerUp);
      window.removeEventListener("pointercancel", onWindowPointerUp);
    };
  }, []);

  useEffect(() => {
    const render = () => {
      const particles = particlesRef.current!;
      const cellSize = 40;
      const grid = new Map<number, number[]>();
      const t0 = performance.now();
      let checks = 0;

      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > 320) p.vx *= -1;
        if (p.y < 0 || p.y > 320) p.vy *= -1;
        p.x = Math.min(320, Math.max(0, p.x));
        p.y = Math.min(320, Math.max(0, p.y));
        const cx = Math.min(8, Math.max(0, Math.floor(p.x / cellSize)));
        const cy = Math.min(8, Math.max(0, Math.floor(p.y / cellSize)));
        const key = cx * 10007 + cy;
        if (!grid.has(key)) grid.set(key, []);
        grid.get(key)!.push(idx);
      });

      const offsets = [[0,0],[1,0],[0,1],[1,1],[-1,1]] as const;
      grid.forEach((indices, key) => {
        const cx = Math.floor(key / 10007);
        const cy = key - cx * 10007;
        offsets.forEach(([dx, dy]) => {
          const nKey = (cx + dx) * 10007 + (cy + dy);
          const neigh = grid.get(nKey);
          if (!neigh) return;
          const sameCell = nKey === key;
          for (let i = 0; i < indices.length; i++) {
            for (let j = sameCell ? i + 1 : 0; j < neigh.length; j++) {
              checks++;
            }
          }
        });
      });

      const theoretical = (particles.length * (particles.length - 1)) / 2;
      const t1 = performance.now();

      perfRef.current = { checks, theoretical, timeMs: t1 - t0 };

      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, 320, 320);
          ctx.fillStyle = "#000000";
          ctx.fillRect(0, 0, 320, 320);
          particles.forEach((p) => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255,215,0,0.85)";
            ctx.fill();
          });
          ctx.save();
          ctx.translate(160, 160);
          ctx.rotate(Date.now() * 0.0002);
          ctx.strokeStyle = "#FFD700";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(0, -90);
          ctx.lineTo(70, 0);
          ctx.lineTo(0, 90);
          ctx.lineTo(-70, 0);
          ctx.closePath();
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(0, -90);
          ctx.lineTo(0, 90);
          ctx.moveTo(-70, 0);
          ctx.lineTo(70, 0);
          ctx.stroke();
          ctx.restore();
        }
      }
      rafRef.current = requestAnimationFrame(render);
    };
    rafRef.current = requestAnimationFrame(render);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = 320 * dpr;
    canvas.height = 320 * dpr;
    canvas.style.width = "320px";
    canvas.style.height = "320px";
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }
  }, []);

  useEffect(() => {
    const beatMs = 60000 / currentStyle.bpm / 4;
    const id = setInterval(() => {
      const nextBeat = beatRef.current % 16 === 0 ? 1 : beatRef.current + 1;
      const nextBar = nextBeat === 1 ? (barRef.current % 32) + 1 : barRef.current;
      beatRef.current = nextBeat;
      barRef.current = nextBar;

      // C1: pilotage DOM sans re-render
      if (beatElRef.current) beatElRef.current.textContent = String(nextBeat);
      if (dmxGridRef.current) dmxGridRef.current.dataset.flash = nextBeat === 1 ? "1" : "0";

      // C1: setBar uniquement quand nextBeat===1 -> re-render 1x par bar
      if (nextBeat === 1) {
        setBar(nextBar);
      }

      const t = Date.now() * 0.001;
      const lfo = Math.sin(t * 0.3) * 0.16 + Math.sin(t * 0.07) * 0.16;
      const newEnergy = Math.min(1.0, Math.max(0.68, 0.84 + lfo + (Math.random() - 0.5) * 0.05));

      if (nextBeat === 1) {
        const energyNorm = (newEnergy - 0.68) / 0.32;
        const jitter = (Math.random() - 0.5) * 3;
        const newCoherence = Math.min(100, Math.max(72, 72 + energyNorm * 28 + jitter));
        setCoherence(Math.round(newCoherence));
        setPerf({ ...perfRef.current });

        if (tvHoldBarsRef.current > 0) {
          tvHoldBarsRef.current -= 1;
          setTvHoldDisplay(tvHoldBarsRef.current);
        } else {
          setTvSlot(nextBar);
          setTvHoldDisplay(0);
        }
      }

      if (audioCtxRef.current && audioCtxRef.current.state === "running" && whiteNoiseBufferRef.current) {
        // TODO VALIDATION: 0.35/0.18 = latence fixe (≈3,3 / 1,7 steps), pas du swing. Confirmer intention. Swing currentStyle.swing non utilisé pour ne pas changer le son.
        const audioT = audioCtxRef.current.currentTime + (isTrap ? 0.35 : 0.18);
        if (nextBeat % 2 === 1) {
          const ctx = audioCtxRef.current;
          const src = ctx.createBufferSource();
          src.buffer = whiteNoiseBufferRef.current;
          const filter = ctx.createBiquadFilter();
          filter.type = "highpass";
          filter.frequency.value = 7000;
          const gain = ctx.createGain();
          gain.gain.setValueAtTime(0.12, audioT);
          gain.gain.exponentialRampToValueAtTime(0.001, audioT + 0.08);
          src.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);
          src.start(audioT);
          src.stop(audioT + 0.09);
        }
      }
    }, beatMs);

    return () => clearInterval(id);
  }, [currentStyle.bpm, isTrap]);

  useEffect(() => {
    return () => {
      if (resumeIntervalRef.current) clearInterval(resumeIntervalRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
    };
  }, []);

  const polygonPoints = useMemo(() => {
    const len = modules.length;
    const r = 110;
    const cx = 160;
    const cy = 160;
    return modules.map((_, i) => {
      const angle = (i / len) * Math.PI * 2 - Math.PI / 2;
      return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
    }).join(" ");
  }, [modules]);

  const hubDots = useMemo(() => {
    const len = modules.length;
    const r = 110;
    const cx = 160;
    const cy = 160;
    return modules.map((m, i) => {
      const angle = (i / len) * Math.PI * 2 - Math.PI / 2;
      return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle), color: m.color, id: m.id };
    });
  }, [modules]);

  const confidenceLabel = confidence >= 95 ? "MAX" : confidence >= 88 ? "HAUTE" : confidence >= 80 ? "MODÉRÉE" : "FAIBLE";

  const handleContainerPointerMove = (e: React.PointerEvent) => {
    if (dragIdxRef.current === null) return;
    const el = document.elementFromPoint(e.clientX, e.clientY)?.closest("[data-idx]") as HTMLElement | null;
    if (!el) return;
    const from = dragIdxRef.current;
    const to = Number(el.dataset.idx);
    if (Number.isNaN(to) || to === from) return;
    setModules((prev) => {
      const copy = [...prev];
      const [moved] = copy.splice(from, 1);
      copy.splice(to, 0, moved);
      return copy;
    });
    dragIdxRef.current = to;
  };
  const handleContainerPointerUp = (e: React.PointerEvent) => {
    if (dragIdxRef.current !== null) {
      try {
        (e.currentTarget as Element).releasePointerCapture(e.pointerId);
      } catch {}
      if (navigator.vibrate) navigator.vibrate([30, 40, 30]);
      dragIdxRef.current = null;
    }
  };
  const handleCardPointerDown = (e: React.PointerEvent, idx: number) => {
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    dragIdxRef.current = idx;
    if (navigator.vibrate) navigator.vibrate(30);
  };

  const handleTvClick = (slot: number) => {
    setTvSlot(slot);
    tvHoldBarsRef.current = 4;
    setTvHoldDisplay(4);
  };

  const handleCanvasPointerDown = (e: React.PointerEvent) => {
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    if (navigator.vibrate) navigator.vibrate(30);
  };
  const handleCanvasPointerUp = (e: React.PointerEvent) => {
    try {
      (e.currentTarget as Element).releasePointerCapture(e.pointerId);
    } catch {}
    if (navigator.vibrate) navigator.vibrate([30, 40, 30]);
  };

  return (
    <div className="min-h-screen bg-black text-white p-3 font-mono text-xs">
      <style>{`
        @keyframes tickerScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track {
          display: inline-block;
          white-space: nowrap;
          animation: tickerScroll 20s linear infinite;
        }
        .dmx-flash{visibility:hidden}
        [data-flash="1"] .dmx-flash{visibility:visible}
      `}</style>

      <div className="flex flex-wrap justify-between items-center gap-2">
        <h1 className="text-sm">MAG CORE V23.4 STABLE FINAL - {currentStyle.label} {currentStyle.bpm}BPM BEAT:<span ref={beatElRef}>1</span> BAR:{bar} TV:{tvSlot} COH:{coherence} CONF:{confidence}% {confidenceLabel} {isAudioReady ? "AUDIO ON" : "AUDIO OFF"}</h1>
        <div className="flex flex-wrap gap-2">
          <button onClick={initAudio} className="border px-2 py-1">INIT AUDIO</button>
          {STYLES.map((s, i) => (
            <button key={s.id} onClick={() => setStyleIdx(i)} className={`border px-2 py-1 ${i === styleIdx ? "bg-white text-black" : ""}`}>{s.label}</button>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 my-3">
        <div className="relative max-w-[320px]">
          <canvas ref={canvasRef} width={320} height={320} className="border border-white/20 block" style={{ width: "320px", height: "320px" }} onPointerDown={handleCanvasPointerDown} onPointerUp={handleCanvasPointerUp} />
          <svg width="320" height="320" viewBox="0 0 320 320" className="absolute top-0 left-0 pointer-events-none">
            <polygon points={polygonPoints} fill="none" stroke="#FFD700" strokeWidth="1.2" />
            {hubDots.map((d) => (
              <circle key={d.id} cx={d.x} cy={d.y} r="6" fill={d.color} />
            ))}
          </svg>
          <div className="mt-1">PERF: {perf.checks} checks / {perf.theoretical} théoriques (n=120) - 5 offsets j=sameCell?i+1:0 clamp 0-8 - HOLD {tvHoldDisplay} bars - {perf.timeMs.toFixed(2)}ms</div>
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-2 gap-2" onPointerMove={handleContainerPointerMove} onPointerUp={handleContainerPointerUp} onPointerCancel={handleContainerPointerUp}>
            {modules.map((m, idx) => (
              <div
                key={m.id}
                data-idx={idx}
                onPointerDown={(e) => handleCardPointerDown(e, idx)}
                className="border p-2 cursor-move select-none"
                style={{ borderColor: m.color, touchAction: "none" }}
              >
                <div>{m.sat}</div>
                <div className="font-bold">{m.label}</div>
                <div className="opacity-60">{m.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div ref={dmxGridRef} data-flash="0" className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-[22vh] overflow-y-auto my-2">
        {dmxCh.map((ch) => (
          <div key={ch.id} className="border border-white/10 p-1">{ch.id} {ch.label} {ch.val} <span className="dmx-flash">FLASH</span></div>
        ))}
      </div>

      <div className="border my-2">
        <button onClick={() => setOpenPanels((p) => ({ ...p, TV: !p.TV }))} className="w-full flex justify-between p-2 bg-[#FF0000]/20">TV BROADCAST 32 SLOTS {tvHoldDisplay > 0 ? `HOLD ${tvHoldDisplay} bars` : ""} {openPanels.TV ? "▼" : "▲"}</button>
        {openPanels.TV && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1 p-2 max-h-[24vh] overflow-y-auto">
            {TV_SLOTS.map((s) => (
              <div key={s.slot} onClick={() => handleTvClick(s.slot)} className={`border p-1 cursor-pointer ${tvSlot === s.slot ? "bg-white text-black" : ""}`}>{s.slot} {s.group} {s.label} DMX:{s.dmx} {s.trigger}</div>
            ))}
          </div>
        )}
      </div>

      <div className="border my-2">
        <button onClick={() => setOpenPanels((p) => ({ ...p, PRESS: !p.PRESS }))} className="w-full flex justify-between p-2 bg-[#00FFFF]/20">PRESS MEDIA 8 BANKS TICKER {openPanels.PRESS ? "▼" : "▲"}</button>
        {openPanels.PRESS && (
          <div className="p-2 overflow-hidden">
            <div className="border border-cyan-400 overflow-hidden">
              <div className="ticker-track">
                <span>{PRESS_TICKER.map((b) => b.label).join(" • ")} • </span>
                <span>{PRESS_TICKER.map((b) => b.label).join(" • ")} • </span>
              </div>
            </div>
            <div className="mt-2 border border-white/20 p-1">LOWER THIRD : MAG CORE BROADCAST - LIVE FEED</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1 mt-2">
              {PRESS_TICKER.map((b) => (
                <div key={b.id} className="border border-cyan-400 p-1">{b.id} {b.label} {b.sub}</div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="border my-2">
        <button onClick={() => setOpenPanels((p) => ({ ...p, PRONOSTIC: !p.PRONOSTIC }))} className="w-full flex justify-between p-2 bg-[#FFD700]/20">PRONOSTIC CONF={confidence}% {confidenceLabel} calc par bar {openPanels.PRONOSTIC ? "▼" : "▲"}</button>
        {openPanels.PRONOSTIC && (
          <div className="p-2">
            <div>energy LFO 0.68-1.0 variable → energyNorm=(energy-0.68)/0.32</div>
            <div>coherence = 72 + energyNorm*28 + jitter±1.5 → 72-100 réel</div>
            <div>confiance = coherence direct, calculé quand beat===1</div>
            <div>t = audioCtx.currentTime + (isTrap?0.35:0.18) - TODO VALIDATION latence vs swing</div>
            <div>PERF: Map cx*10007+cy 5 offsets j=sameCell?i+1:0 theoretical=n*(n-1)/2=7140 → ~830 checks réels</div>
          </div>
        )}
      </div>
    </div>
  );
}
