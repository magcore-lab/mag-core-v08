
// app/engine/AiEngine.ts — V19.2.5 BLACK_PURE
export class AiEngine{
  private device:GPUDevice|null=null; private texture:GPUTexture|null=null; private dead=false;
  async init(device:GPUDevice){
    this.device=device;
    this.texture=device.createTexture({
      size:[256,256,1],
      format:'rgba8unorm',
      usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT
    });
    const black=new Uint8Array(256*256*4);
    device.queue.writeTexture({texture:this.texture},black,{bytesPerRow:256*4},[256,256,1]);
    return this.texture;
  }
  compute(_s:any,_d:number){ return; }
  destroy(){this.dead=true; try{this.texture?.destroy();}catch{}}
}
