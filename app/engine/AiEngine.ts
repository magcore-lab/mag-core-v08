export class AiEngine{
  private t:GPUTexture|null=null
  async init(d:GPUDevice){
    this.t=d.createTexture({size:[256,256,1],format:'rgba8unorm',usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT})
    d.queue.writeTexture({texture:this.t},new Uint8Array(256*256*4),{bytesPerRow:1024},[256,256,1])
    return this.t
  }
  compute(){}
  destroy(){try{this.t?.destroy()}catch{}}
}
