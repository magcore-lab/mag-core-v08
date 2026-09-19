// app/engine/DmxEngine.ts — V19.2.7 LOCAL_ONLY
// @ts-nocheck
export class DmxEngine{
  private ws:WebSocket|null=null; private last=0; private target=0; private dead=false;
  connect(url:string){if(this.dead) return; if(url.includes('?token=')&&!url.includes('LOCAL_ONLY')) return; try{this.ws=new WebSocket(url); this.ws.onmessage=(e)=>{try{const d=JSON.parse(e.data); const v=typeof d.value==='number'?d.value:typeof d.dmx==='number'?d.dmx:0; this.target=Math.min(Math.max(v,0),1);}catch{}}; this.ws.onclose=()=>{if(!this.dead) setTimeout(()=>this.connect(url),2000);};}catch{this.target=0;}}
  getNormalized(){this.last+=(this.target-this.last)*0.05; return this.last;}
  destroy(){this.dead=true; try{this.ws?.close();}catch{}}
}
