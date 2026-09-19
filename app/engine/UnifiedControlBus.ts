// app/engine/UnifiedControlBus.ts — V19.2.4 — cerveau lisseur
export type DmxPacket = number; // 0..1 normalisé
export type BusInput = { dmx: DmxPacket };

export type BusSignal = {
  flow: number; propulsion: number; sat: number;
  inner: number; bloom: number; glitch: boolean; dmx: number;
};

export class UnifiedControlBus {
  private target = { flow: 0.5, propulsion: 0.2, sat: 0.5, inner: 0.5, bloom: 0.3, dmx: 0 };
  private current = { flow: 0.5, propulsion: 0.2, sat: 0.5, inner: 0.5, bloom: 0.3, dmx: 0 };
  private smooth = 0.08;
  private glitchTimer = 0;

  ingest(input: BusInput) {
    // DMX 0..1 → map 0.1..0.9 pour éviter NaN
    const d = Math.min(Math.max(input.dmx, 0), 1);
    this.target.dmx = d;
    this.target.flow = 0.3 + d * 0.6;
    this.target.propulsion = d * 0.5;
    this.target.sat = 0.2 + d * 0.6;
    this.target.inner = 0.3 + d * 0.5;
    this.target.bloom = 0.1 + d * 0.8;
    if (d > 0.95) this.glitchTimer = 0.15;
  }

  update(): BusSignal {
    // lerp exponentiel — 0 boucle parallèle
    for (const k of Object.keys(this.current) as (keyof typeof this.current)[]) {
      this.current[k] += (this.target[k] - this.current[k]) * this.smooth;
    }
    if (this.glitchTimer > 0) this.glitchTimer -= 0.016;
    return {
      flow: this.current.flow,
      propulsion: this.current.propulsion,
      sat: this.current.sat,
      inner: this.current.inner,
      bloom: this.current.bloom,
      glitch: this.glitchTimer > 0,
      dmx: this.current.dmx,
    };
  }
}
