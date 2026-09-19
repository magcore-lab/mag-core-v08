// app/engine/QuantumCore.ts — V19.2.4 FIELD_OS
// CORE LOCK: safeNormalize + dt 350ms + ping-pong + device partagé

export type QuantumSignal = {
  flow: number;
  propulsion: number;
  sat: number;
  inner: number;
  bloom: number;
  glitch: boolean;
  dmx: number;
};

const WGSL = /* wgsl */`
@group(0) @binding(0) var<storage, read> signal: array<f32, 8>;
@group(0) @binding(1) var<storage, read_write> stateA: array<f32, 128>;
@group(0) @binding(2) var<storage, read_write> stateB: array<f32, 128>;
@group(0) @binding(3) var<uniform> dt: f32;

fn safeNormalize(v: vec3<f32>) -> vec3<f32> {
  let l = length(v);
  if (l < 1e-6) { return vec3<f32>(0.0,0.0,1.0); }
  return v / l;
}

@compute @workgroup_size(64)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  let i = gid.x;
  if (i >= 64u) { return; }
  let flow = signal[0];
  let prop = signal[1];
  let s = stateA[i] * 0.998 + flow * 0.002;
  stateB[i] = s + prop * 0.0005 * sin(f32(i) * 0.1 + dt * 2.0);
}
`;

export class QuantumCore {
  private device: GPUDevice | null = null;
  private pipeline: GPUComputePipeline | null = null;
  private bindA: GPUBindGroup | null = null;
  private bindB: GPUBindGroup | null = null;
  private signalBuf: GPUBuffer | null = null;
  private stateA: GPUBuffer | null = null;
  private stateB: GPUBuffer | null = null;
  private dtBuf: GPUBuffer | null = null;
  private ping = true;
  private destroyed = false;

  async init(device: GPUDevice, opts: { seed: number }): Promise<boolean> {
    if (this.device) return true;
    this.device = device;
    const module = device.createShaderModule({ code: WGSL });
    this.signalBuf = device.createBuffer({ size: 32, usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST });
    this.stateA = device.createBuffer({ size: 512, usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST | GPUBufferUsage.COPY_SRC });
    this.stateB = device.createBuffer({ size: 512, usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST | GPUBufferUsage.COPY_SRC });
    this.dtBuf = device.createBuffer({ size: 4, usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST });
    const initState = new Float32Array(128);
    for (let i = 0; i < 128; i++) initState[i] = Math.sin((i / 128) * Math.PI * 2 + opts.seed * 0.001);
    device.queue.writeBuffer(this.stateA, 0, initState);
    device.queue.writeBuffer(this.stateB, 0, initState);
    const bgl = device.createBindGroupLayout({
      entries: [
        { binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'read-only-storage' } },
        { binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },
        { binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },
        { binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } },
      ],
    });
    this.pipeline = device.createComputePipeline({
      layout: device.createPipelineLayout({ bindGroupLayouts: [bgl] }),
      compute: { module, entryPoint: 'main' },
    });
    this.bindA = device.createBindGroup({
      layout: bgl,
      entries: [
        { binding: 0, resource: { buffer: this.signalBuf } },
        { binding: 1, resource: { buffer: this.stateA } },
        { binding: 2, resource: { buffer: this.stateB } },
        { binding: 3, resource: { buffer: this.dtBuf } },
      ],
    });
    this.bindB = device.createBindGroup({
      layout: bgl,
      entries: [
        { binding: 0, resource: { buffer: this.signalBuf } },
        { binding: 1, resource: { buffer: this.stateB } },
        { binding: 2, resource: { buffer: this.stateA } },
        { binding: 3, resource: { buffer: this.dtBuf } },
      ],
    });
    return true;
  }

  compute(signal: QuantumSignal, delta: number) {
    if (!this.device ||!this.pipeline || this.destroyed) return;
    const dt = Math.min(Math.max(delta, 0.0001), 0.35);
    const arr = new Float32Array([signal.flow, signal.propulsion, signal.sat, signal.inner, signal.bloom, signal.glitch?1:0, signal.dmx, 0]);
    this.device.queue.writeBuffer(this.signalBuf!, 0, arr);
    this.device.queue.writeBuffer(this.dtBuf!, 0, new Float32Array([dt]));
    const encoder = this.device.createCommandEncoder();
    const pass = encoder.beginComputePass();
    pass.setPipeline(this.pipeline);
    pass.setBindGroup(0, this.ping? this.bindA! : this.bindB!);
    pass.dispatchWorkgroups(1);
    pass.end();
    this.device.queue.submit([encoder.finish()]);
    this.ping =!this.ping;
  }

  destroy() {
    if (this.destroyed) return;
    this.destroyed = true;
    try { this.signalBuf?.destroy(); } catch {}
    try { this.stateA?.destroy(); } catch {}
    try { this.stateB?.destroy(); } catch {}
    try { this.dtBuf?.destroy(); } catch {}
    this.device = null;
  }
}
