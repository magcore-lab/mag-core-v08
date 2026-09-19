'use client'
import { useEffect, useRef } from 'react'

export default function Page(){
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(()=>{
    let core:any = null
    let dead = false
    
    const init = async ()=>{
      if(dead) return
      try{
        const mod = await import('./engine/QuantumCore')
        if(dead || !canvasRef.current) return
        core = new mod.QuantumCore()
        await core.init(canvasRef.current)
      }catch(e){
        console.warn('FIELD_OS fallback black:', e)
        if(canvasRef.current){
          canvasRef.current.style.background = '#000000'
        }
      }
    }
    init()
    return ()=>{
      dead = true
      try{ core?.destroy() }catch{}
    }
  },[])

  return(
    <main style={{
      width:'100vw',
      height:'100vh',
      background:'#000000',
      margin:0,
      padding:0,
      overflow:'hidden',
      position:'relative'
    }}>
      <canvas
        ref={canvasRef}
        style={{
          width:'100%',
          height:'100%',
          display:'block',
          background:'#000000'
        }}
      />
      {/* FIELD_OS Core - invisible but keeps layout */}
      <div style={{
        position:'absolute',
        top:'50%',left:'50%',
        transform:'translate(-50%,-50%)',
        width:'1px',height:'1px',
        background:'#111',
        boxShadow:'0 0 400px 200px rgba(255,255,255,0.03)',
        borderRadius:'50%',
        pointerEvents:'none',
        opacity:0.5
      }}/>
    </main>
  )
}
