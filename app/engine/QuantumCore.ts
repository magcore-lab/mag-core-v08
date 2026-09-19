// app/engine/QuantumCore.ts — V19.2.6 EMERGENCY BLACK PURE
export class QuantumCore{
  private dead=false; private raf=0; private device:GPUDevice|null=null;
  async init(canvas:HTMLCanvasElement){
    if(!navigator.gpu){canvas.style.background='#000'; return;}
    const adapter=await navigator.gpu.requestAdapter(); if(!adapter){canvas.style.background='#000'; return;}
    this.device=await adapter.requestDevice(); const ctx=canvas.getContext('webgpu') as GPUCanvasContext;
    const format=navigator.gpu.getPreferredCanvasFormat(); ctx.configure({device:this.device,format,alphaMode:'opaque'});
    const shader=this.device.createShaderModule({code:`
      @vertex fn vs(@builtin(vertex_index) i:u32)->@builtin(position) vec4f{
        var p=array(vec2f(-1,-1),vec2f(3,-1),vec2f(-1,3)); return vec4f(p[i],0,1);
      }
      @fragment fn fs()->@location(0) vec4f{ return vec4f(0.0,0.0,0.0,1.0); }`});
    const pipeline=this.device.createRenderPipeline({layout:'auto',vertex:{module:shader,entryPoint:'vs'},fragment:{module:shader,entryPoint:'fs',targets:[{format}]}});
    const loop=()=>{if(this.dead) return; const enc=this.device!.createCommandEncoder();
      const pass=enc.beginRenderPass({colorAttachments:[{view:ctx.getCurrentTexture().createView(),loadOp:'clear',clearValue:{r:0,g:0,b:0,a:1},storeOp:'store'}]});
      pass.setPipeline(pipeline); pass.draw(3); pass.end(); this.device!.queue.submit([enc.finish()]); this.raf=requestAnimationFrame(loop);};
    loop(); canvas.style.background='#000000';
  }
  destroy(){this.dead=true; cancelAnimationFrame(this.raf); try{this.device?.destroy();}catch{}}
}
