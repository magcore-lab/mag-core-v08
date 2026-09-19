// app/engine/QuantumCore.ts — V19.2.4 FIELD_OS — lock 0.48 / ior 2.33
function safeNormalize(v:any,fb=0){const n=Number(v);return Number.isFinite(n)?n:fb;}
export class QuantumCore{
  private t=0;
  update(s:any,dt:number){
    this.t+=Math.min(Math.max(safeNormalize(dt,0.016),0),0.35);
    s.inner=0.48+Math.sin(this.t)*0.02;
    return s;
  }
}
