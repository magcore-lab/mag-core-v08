// @ts-nocheck
export class QuantumCore{constructor(){this.device=null}async init(){return null}tick(){return null}destroy(){}}
export class DmxEngine{constructor(){this.channels=new Array(512).fill(0)}async init(){return null}tick(){return null}destroy(){}}
export class UnifiedControlBus{constructor(){this.engines=[]}async init(){return null}register(e){}tick(){}destroy(){}}
export default {}
