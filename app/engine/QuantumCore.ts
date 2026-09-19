// app/engine/QuantumCore.ts — V19.2.4 FIELD_OS BLACK
import { UnifiedControlBus } from './UnifiedControlBus';
import { DmxEngine } from './DmxEngine';
import { AiEngine } from './AiEngine';
export class QuantumCore{
  private bus=new UnifiedControlBus(); private dmx=new DmxEngine(); private ai=new AiEngine();
  private device:GPUDevice|null=null; private canvas:HTMLCanvasElement|null=null; private ctx:GPUCanvasContext|null=null;
  private format:GPUTextureFormat='bgra8unorm'; private pipeline:GPURenderPipeline|null=null; private bindGroup:GPUBindGroup|null=null;
  private time=0; private raf=0; private dead=false;
  async init(canvas:HTMLCanvasElement, dmxUrl?:string){
    this.canvas=canvas; if(!navigator.gpu) throw new Error('WebGPU not supported');
    const adapter=await navigator.gpu.requestAdapter({powerPreference:'high-performance'}); if(!adapter) throw new Error('No adapter');
    this.device=await adapter.requestDevice(); this.ctx=canvas.getContext('webgpu') as GPUCanvasContext;
    this.format=navigator.gpu.getPreferredCanvasFormat(); this.ctx.configure({device:this.device,format:this.format,alphaMode:'opaque'});
    const aiTex=await this.ai.init(this.device);
    const shader=this.device.createShaderModule({code:`
      struct U{flow:f32,prop:f32,sat:f32,inner:f32,bloom:f32,time:f32,glitch:f32,dmx:f32}
      @group(0) @binding(0) var<uniform> u:U; @group(0) @binding(1) var aiTex:texture_2d<f32>; @group(0) @binding(2) var aiSamp:sampler;
      struct VSOut{@builtin(position) pos:vec4f,@location(0) uv:vec2f}
      @vertex fn vs(@builtin(vertex_index) i:u32)->VSOut{var p=array(vec2f(-1,-1),vec2f(3,-1),vec2f(-1,3)); var o:VSOut; o.pos=vec4f(p[i],0,1); o.uv=(p[i]+1)*0.5; return o;}
      @fragment fn fs(@location(0) uv:vec2f)->@location(0) vec4f{
        let ai=textureSample(aiTex,aiSamp,uv).rgb; let center=length(uv-0.5); let core=1.0-smoothstep(0.0,0.5+u.bloom*0.5,center);
        let base=vec3f(0.0); let glow=vec3f(0.02,0.08,0.12)*core*(0.2+u.inner); let aiContrib=ai*0.15*u.sat;
        let gl=u.glitch*step(0.98,fract(uv.y*200.0+u.time*10.0))*0.3; return vec4f(base+glow+aiContrib+vec3f(gl),1.0);
      }`});
    const texView=aiTex.createView(); const sampler=this.device.createSampler({magFilter:'linear',minFilter:'linear'});
    const uniBuffer=this.device.createBuffer({size:32,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});
    this.pipeline=this.device.createRenderPipeline({layout:'auto',vertex:{module:shader,entryPoint:'vs'},fragment:{module:shader,entryPoint:'fs',targets:[{format:this.format}]},primitive:{topology:'triangle-list'}});
    this.bindGroup=this.device.createBindGroup({layout:this.pipeline.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:uniBuffer}},{binding:1,resource:texView},{binding:2,resource:sampler}]});
    const ud=new Float32Array(8); const loop=()=>{if(this.dead) return; const dmxVal=this.dmx.getNormalized(); this.bus.ingest({dmx:dmxVal}); const sig=this.bus.update(); this.time+=0.016; this.ai.compute(sig,0.016);
      ud[0]=sig.flow; ud[1]=sig.propulsion; ud[2]=sig.sat; ud[3]=sig.inner; ud[4]=sig.bloom; ud[5]=this.time; ud[6]=sig.glitch?1:0; ud[7]=sig.dmx;
      this.device!.queue.writeBuffer(uniBuffer,0,ud); const enc=this.device!.createCommandEncoder();
      const pass=enc.beginRenderPass({colorAttachments:[{view:this.ctx!.getCurrentTexture().createView(),loadOp:'clear',clearValue:{r:0,g:0,b:0,a:1},storeOp:'store'}]});
      pass.setPipeline(this.pipeline!); pass.setBindGroup(0,this.bindGroup!); pass.draw(3); pass.end(); this.device!.queue.submit([enc.finish()]); this.raf=requestAnimationFrame(loop);}; loop();
    if(dmxUrl) this.dmx.connect(dmxUrl); canvas.style.background='#000000';}
  destroy(){this.dead=true; cancelAnimationFrame(this.raf); this.dmx.destroy(); this.ai.destroy(); try{this.device?.destroy();}catch{}}
}
