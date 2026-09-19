// @ts-nocheck
export class AiEngine{
  t:any=null
  async init(d:any){
    const s:any=[256,256,1]
    this.t=d.createTexture({size:s,format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT})
    d.queue.writeTexture({texture:this.t},new Uint8Array(256*256*4),{bytesPerRow:1024},s)
    return this.t
  }
  tick(){}
  destroy(){try{this.t?.destroy()}catch{}}
}
