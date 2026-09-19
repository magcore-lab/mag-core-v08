'use client'
import { useEffect, useRef } from 'react'
import { QuantumCore, DmxEngine, UnifiedControlBus } from './engine'

export default function Page(){
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(()=>{
    let mounted = true
    ;(async()=>{
      const core = new QuantumCore()
      const dmx = new DmxEngine()
      const bus = new UnifiedControlBus()
      await core.init(null)
      await dmx.init()
      await bus.init()
      bus.register(core)
      bus.register(dmx)
      if(!mounted) return
      const canvas = canvasRef.current
      if(!canvas) return
      const ctx = canvas.getContext('2d')
      if(!ctx) return
      ctx.fillStyle = '#000'
      ctx.fillRect(0,0,canvas.width,canvas.height)
      const loop = () => {
        if(!mounted) return
        bus.tick()
        requestAnimationFrame(loop)
      }
      loop()
    })()
    return ()=>{ mounted=false }
  },[])

  return (
    <div style={{background:'#000',width:'100vw',height:'100vh',margin:0,overflow:'hidden'}}>
      <canvas ref={canvasRef} width={1920} height={1080} style={{width:'100%',height:'100%',display:'block',background:'#000'}} />
    </div>
  )
}
