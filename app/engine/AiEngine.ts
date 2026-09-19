// app/engine/AiEngine.ts — V19.2.4 GPU->GPU no readback
export class AiEngine{
  private device:GPUDevice|null=null; private texture:GPUTexture|null=null; private time=0; private dead=false;
  async init(device:GPUDevice){this.device=device; this.texture=device.createTexture({size:[256,256,1],format:'rgba8unorm',usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.STORAGE_BINDING}); const black=new Uint8Array(256*256*4); device.queue.writeTexture({texture:this.texture},black,{bytesPerRow:256*4},[256,256,1]); return this.texture;}
  compute(s:any,d:number){if(!this.device||!this.texture||this.dead) return; this.time+=d; if(Math.random()<0.1){const y=Math.floor(Math.random()*256); const row=new Uint8Array(256*4); const intensity=Math.floor(10+s.bloom*50+Math.sin(this.time*2)*10); for(let x=0;x<256;x++){row[x*4]=intensity; row[x*4+1]=intensity; row[x*4+2]=intensity+20; row[x*4+3]=255;} this.device.queue.writeTexture({texture:this.texture,origin:[0,y,0]},row,{bytesPerRow:256*4},[256,1,1]);}}
  destroy(){this.dead=true; try{this.texture?.destroy();}catch{}}
}
