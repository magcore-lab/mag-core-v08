// app/engine/QuantumCore.ts — MAG CORE V08 V19.2.4 FIELD_OS
// Core noir pur #000000 + GPU->GPU passthrough, pas de readback

import { UnifiedControlBus, BusSignal } from './UnifiedControlBus';
import { DmxEngine } from './DmxEngine';
import { AiEngine } from './AiEngine';

export type QuantumState = BusSignal & { time: number };

export class QuantumCore {
  private bus = new UnifiedControlBus();
  private dmx = new DmxEngine();
  private ai = new AiEngine();
  private device: GPUDevice | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private ctx: GPUCanvasContext | null = null;
  private format: GPUTextureFormat = 'bgra8unorm';
  private pipeline: GPURenderPipeline | null = null;
  private bindGroup: GPUBindGroup | null = null;
  private time = 0;
  private raf = 0;
  private dead = false;

  async init(canvas: HTMLCanvasElement, dmxUrl?: string) {
    this.canvas = canvas;
    if (!navigator.gpu) throw new Error('WebGPU not supported');
    const adapter = await navigator.gpu.requestAdapter({ powerPreference: 'high-performance' });
    if (!adapter) throw new Error('No adapter');
    this.device = await adapter.requestDevice();
    this.ctx = canvas.getContext('webgpu') as GPUCanvasContext;
    this.format = navigator.gpu.getPreferredCanvasFormat();
    this.ctx.configure({ device: this.device, format: this.format, alphaMode: 'opaque' });

    const aiTex = await this.ai.init(this.device);

    const shader = this.device.createShaderModule({ code: `
      struct U { flow:f32, prop:f32, sat:f32, inner:f32, bloom:f32, time:f32, glitch:f32, dmx:f32 }
      @group(0) @binding(0) var<uniform> u: U;
      @group(0) @binding(1) var aiTex: texture_2d<f32>;
      @group(0) @binding(2) var aiSamp: sampler;
      struct VSOut { @builtin(position) pos: vec4f, @location(0) uv: vec2f }
      @vertex fn vs(@builtin(vertex_index) i: u32) -> VSOut {
        var p = array(vec2f(-1,-1), vec2f(3,-1), vec2f(-1,3));
        var o: VS
