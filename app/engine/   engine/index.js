// @ts-nocheck
export class QuantumCore{constructor(){this.device=null}async init(d){this.device=d||null;return null}tick(){}destroy(){}}
export class DmxEngine{constructor(){this.channels=new Array(512).fill(0)}async init(){return null}tick(){}destroy(){}}
export class UnifiedControlBus{constructor(){this.engines=[]}async init(){return null}register(e){this.engines.push(e)}tick(){this.engines.forEach(x=>x.tick&&x.tick())}destroy(){}}
export default {QuantumCore,DmxEngine,UnifiedControlBus}
