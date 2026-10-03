"use client";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";

// MAGCORE V23.3 STABLE FINAL - SYSTEME USINE
// SHA 537e46c2fd9996a3f04d10fc024198b8094e9b167950cb6b2e9b214600f9b9ea
// 38 FILES - 097bbf6 - LE FUTUR SE CONSTRUIT DANS L'INVISIBLE

const MODULES_CONST = [
  { id: "SAT01", name: "CORE LOCK", color: "#FF3B30", val: 94 },
  { id: "SAT02", name: "PRESS MEDIA", color: "#4CD964", val: 88 },
  { id: "SAT03", name: "ATLAS MAP", color: "#007AFF", val: 91 },
  { id: "SAT04", name: "FIELD_OS", color: "#FFD700", val: 100 },
  { id: "SAT05", name: "AUDIO ENG", color: "#AF52DE", val: 86 },
  { id: "SAT06", name: "DMX CTRL", color: "#FF9500", val: 89 },
  { id: "SAT07", name: "TV BROAD", color: "#5AC8FA", val: 92 },
  { id: "SAT08", name: "HASH VER", color: "#8E8E93", val: 97 },
  { id: "SAT09", name: "PARTICULE", color: "#FF2D55", val: 95 },
  { id: "SAT10", name: "PERF MON", color: "#30D158", val: 90 },
] as const;

const STYLES = {
  TRAP: { bpm: 140, swing: 0.35, label: "TRAP 140" },
  DRILL: { bpm: 142, swing: 0.18, label: "DRILL 142" },
  LOFI: { bpm: 85, swing: 0.12, label: "LOFI 85" },
} as const;

const DMX_CH_INIT = [1, 13, 25, 37, 49, 61, 73, 85, 97, 109, 121, 133, 145];

type StyleKey = keyof typeof STYLES;

const TV_SLOTS = [
  { id: 1, label: "SLOT 01 PAPER", dmx: 80 },
  { id: 2, label: "SLOT 02 VINYL", dmx: 160 },
  { id: 3, label: "SLOT 03 EXCL", dmx: 255 },
  { id: 4, label: "SLOT 04 SAFE", dmx: 120 },
  { id: 5, label: "SLOT 05 ATLAS", dmx: 80 },
  { id: 6, label: "SLOT 06 CORE", dmx: 160 },
  { id: 7, label: "SLOT 07 FIELD", dmx: 255 },
  { id: 8, label: "SLOT 08 HASH", dmx: 120 },
];

export default function Page() {
  const [modules, setModules] = useState([...MODULES_CONST]);
  const [styleKey, setStyleKey] = useState<StyleKey>("TRAP");
  const [beat, setBeat] = useState(1);
  const [bar, setBar] = useState(1);
  const [tvSlot, setTvSlot] = useState(1);
  const [tvHoldDisplay, setTvHoldDisplay] = useState(0);
  const [confidence, setConfidence] = useState(88);
  const [perf, setPerf] = useState({ checks: 0, theoretical: 7140, timeMs: 0 });
  const [audioReady, setAudioReady] = useState(false);

  const beatRef = useRef(1);
  const barRef = useRef(1);
  const energyRef = useRef(0.85);
  const tvHoldBarsRef = useRef(0);
  const dragIdxRef = useRef<number | null>(null);
  const particlesRef = useRef<{ x: number; y: number; vx: number; vy: number }[] | null>(null);
  const perfRef = useRef({ checks: 0, theoretical: 7140, timeMs: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const rAFRef = useRef<number>(0);
  const tickIntervalRef = useRef<number | null>(null);

  const currentStyle = STYLES[styleKey];
  const isTrap = styleKey === "TRAP";

  if (particlesRef.current === null) {
    particlesRef.current = Array.from({ length: 120 }, () => ({
      x: Math.random() * 320,
      y: Math.random() * 320,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
    }));
  }

  const polygonPoints = useMemo(() => {
    return modules.map((_, i) => {
      const angle = (i / modules.length) * Math.PI * 2 - Math.PI / 2;
      const r = 110;
      return `${160 + Math.cos(angle) * r},${160 + Math.sin(angle) * r}`;
    }).join(" ");
  }, [modules.length]);

  const hubDots = useMemo(() => {
    return modules.map((m, i) => {
      const angle = (i / modules.length) * Math.PI * 2 - Math.PI / 2;
      const r = 110;
      return { x: 160 + Math.cos(angle) * r, y: 160 + Math.sin(angle) * r, color: m.color, id: m.id };
    });
  }, [modules]);

  useEffect(() => {
    const handleWindowUp = () => { dragIdxRef.current = null; };
    window.addEventListener("pointerup", handleWindowUp);
    window.addEventListener("pointercancel", handleWindowUp);
    return () => {
      window.removeEventListener("pointerup", handleWindowUp);
      window.removeEventListener("pointercancel", handleWindowUp);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const render = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = 320 * dpr;
      canvas.height = 320 * dpr;
      canvas.style.width = "320px";
      canvas.style.height = "320px";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, 320, 320);
      const particles = particlesRef.current!;
      const t0 = performance.now();
      const cellSize = 40;
      const grid = new Map<number, number[]>();
      particles.forEach((p, idx) => {
        p.x += p.vx; p.y += p.vy;
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
      let checks = 0;
      const offsets = [[0,0],[1,0],[0,1],[1,1],[-1,1]];
      grid.forEach((indices, key) => {
        const cx = Math.floor(key / 10007);
        const cy = key % 10007;
        offsets.forEach(([ox, oy]) => {
          const nKey = (cx + ox) * 10007 + (cy + oy);
          const other = grid.get(nKey);
          if (!other) return;
          const sameCell = nKey === key;
          for (let i = 0; i < indices.length; i++) {
            for (let j = sameCell? i + 1 : 0; j < other.length; j++) {
              if (sameCell && j <= i) continue;
              checks++;
              const a = particles[indices[i]];
              const b = particles[other[j]];
              const dx = a.x - b.x;
              const dy = a.y - b.y;
              if (dx*dx + dy*dy < 900) {
                ctx.strokeStyle = "rgba(255,215,0,0.15)";
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.stroke();
              }
            }
          }
        });
      });
      particles.forEach(p => {
        ctx.fillStyle = "#FFD700";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI*2);
        ctx.fill();
      });
      ctx.strokeStyle = "#FFD700";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(160, 20);
      ctx.lineTo(280, 160);
      ctx.lineTo(160, 300);
      ctx.lineTo(40, 160);
      ctx.closePath();
      ctx.stroke();
      const n = particles.length;
      const theoretical = (n * (n - 1)) / 2;
      const t1 = performance.now();
      perfRef.current = { checks, theoretical, timeMs: t1 - t0 };
      rAFRef.current = requestAnimationFrame(render);
    };
    rAFRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rAFRef.current);
  }, []);

  useEffect(() => {
    if (!audioReady) return;
    const bpm = currentStyle.bpm;
    const intervalMs = (60 / bpm / 4) * 1000;
    tickIntervalRef.current = window.setInterval(() => {
      const nextBeat = beatRef.current % 32 + 1;
      const nextBar = nextBeat === 1? (barRef.current % 32 + 1) : barRef.current;
      beatRef.current = nextBeat;
      barRef.current = nextBar;
      if (nextBeat === 1) {
        if (tvHoldBarsRef.current > 0) {
          tvHoldBarsRef.current--;
          setTvHoldDisplay(tvHoldBarsRef.current);
        } else {
          setTvSlot(nextBar % 8 + 1);
        }
        const t = Date.now() / 1000;
        energyRef.current = 0.84 + Math.sin(t * 0.3) * 0.16 + Math.sin(t * 0.07) * 0.16;
        energyRef.current = Math.min(1, Math.max(0.68, energyRef.current));
        const energyNorm = (energyRef.current - 0.68) / 0.32;
        const jitter = (Math.random() - 0.5) * 3;
        const coh = 72 + energyNorm * 28 + jitter;
        setConfidence(Math.min(100, Math.max(72, coh)));
        setPerf({...perfRef.current });
        setBeat(nextBeat);
        setBar(nextBar);
      } else {
        setBeat(nextBeat);
      }
      if (nextBeat % 2 === 1 && audioCtxRef.current) {
        const audioT = audioCtxRef.current.currentTime + (isTrap? 0.35 : 0.18);
        const bufferSize = audioCtxRef.current.sampleRate * 0.08;
        const buffer = audioCtxRef.current.createBuffer(1, bufferSize, audioCtxRef.current.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        const src = audioCtxRef.current.createBufferSource();
        src.buffer = buffer;
        const filter = audioCtxRef.current.createBiquadFilter();
        filter.type = "highpass";
        filter.frequency.value = 7000;
        const gain = audioCtxRef.current.createGain();
        gain.gain.setValueAtTime(0.12, audioT);
        gain.gain.exponentialRampToValueAtTime(0.001, audioT + 0.08);
        src.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtxRef.current.destination);
        src.start(audioT);
      }
    }, intervalMs);
    return () => {
      if (tickIntervalRef.current) clearInterval(tickIntervalRef.current);
    };
  }, [audioReady, currentStyle.bpm, isTrap]);

  const handleInitAudio = useCallback(async () => {
    if (audioCtxRef.current) return;
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    audioCtxRef.current = ctx;
    await ctx.resume();
    setAudioReady(true);
    if (navigator.vibrate) navigator.vibrate(30);
  }, []);

  const handleTvClick = useCallback((slot: number) => {
    setTvSlot(slot);
    tvHoldBarsRef.current = 4;
    setTvHoldDisplay(4);
    if (navigator.vibrate) navigator.vibrate(30);
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent, idx: number) => {
    dragIdxRef.current = idx;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    if (navigator.vibrate) navigator.vibrate(30);
  }, []);

  const handleContainerPointerMove = useCallback((e: React.PointerEvent) => {
    if (dragIdxRef.current === null) return;
    const el = document.elementFromPoint(e.clientX, e.clientY)?.closest("[data-idx]") as HTMLElement | null;
    if (!el) return;
    const to = Number(el.dataset.idx);
    if (isNaN(to) || to === dragIdxRef.current) return;
    setModules(prev => {
      const next = [...prev];
      const [moved] = next.splice(dragIdxRef.current!, 1);
      next.splice(to, 0, moved);
      return next;
    });
    dragIdxRef.current = to;
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    dragIdxRef.current = null;
    if (navigator.vibrate) navigator.vibrate([30, 40, 30]);
  }, []);

  const coherenceLabel = confidence >= 95? "MAX" : confidence >= 88? "HAUTE" : confidence >= 80? "MODEREE" : "FAIBLE";

  return (
    <div className="min-h-screen bg-black text-white font-mono p-2 md:p-4">
      <div className="border border-yellow-500 p-3 mb-3 flex flex-wrap gap-3 items-center justify-between">
        <h1 className="text-yellow-400 text-xl md:text-2xl">MAG CORE FULL V23.3 STABLE FINAL - BLACK EDITION</h1>
        <div className="text-xs text-zinc-400">SHA 537e46c2fd9996a3f04d10fc024198b8094e9b167950cb6b2e9b214600f9b9ea | 38 FILES | 097bbf6</div>
      </div>
      <div className="text-center text-zinc-500 text-sm mb-2">LE FUTUR SE CONSTRUIT DANS L INVISIBLE - OPERATOR Jean-Christophe Achille</div>
      <div className="border border-zinc-800 p-2 mb-2 bg-zinc-900/50 text-xs">
        PAPER TEXTURE 120 | ARCHIVE VINYL -24dB | MAG CORE EXCL 8 | BROADCAST SAFE Rec.709 | LOWER THIRD FIELD_OS SP01 FILM PILOTE GO PUR 60/60 ATLAS CLEAN VERIFIED BEAT {beat} BAR {bar
