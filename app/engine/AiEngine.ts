
// app/engine/UnifiedControlBus.ts — V19.2.7 FIELD_OS
export type BusSignal={flow:number;propulsion:number;sat:number;inner:number;bloom:number;glitch:boolean;dmx:number};
export class UnifiedControlBus{
  private target={flow:0.5,propulsion:0.2,sat:0.5,inner:0.5,bloom:0.3,dmx:0};
  private current={flow:0.5,propulsion:0.2,sat:0.5,inner:0.5,bloom:0.3,dmx:0};
  private smooth=0.08; private glitchTimer=0;
  ingest(i:{dmx:number}){const d=Math.min(Math.max(i.dmx,0),1); this.target.dmx=d; this.target.flow=0.3+d*0.6; this.target.propulsion=d*0.5; if(d>0.95) this.glitchTimer=0.15;}
  update():BusSignal{for(const k of Object.keys(this.current) as any){this.current[k]+=(this.target[k]-this.current[k])*this.smooth;} if(this.glitchTimer>0) this.glitchTimer-=0.016; return {...this.current,glitch:this.glitchTimer>0} as BusSignal;}
}
