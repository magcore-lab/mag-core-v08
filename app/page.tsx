
    'use client'
import { useEffect, useRef } from 'react'
import { QuantumCore } from './engine/QuantumCore'

export default function Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const coreRef = useRef<QuantumCore | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const core = new QuantumCore()
    coreRef.current = core
    const canvas = canvasRef.current
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    core.init(canvas)
    const onResize = () => {
      if (!canvasRef.current) return
      canvasRef.current.width = window.innerWidth
      canvasRef.current.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      core.destroy()
    }
  }, [])

  return (
    <main className="min-h-screen bg-black overflow-hidden">
      <div className="relative w-[min(100vw,100vh)] h-[min(100vw,100vh)] mx-auto"
        style={{
          background: 'radial-gradient(circle at center, #0a0a0a 0%, #000000 70%)'
        }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ background: '#000000' }}
        />
      </div>
    </main>
  )
}
      
