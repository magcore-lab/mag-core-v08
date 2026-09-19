"use client"
import { useEffect, useRef } from 'react'

export default function Page(){
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(()=>{
    let core:any=null; let dead=false
    ;(async()=>{
      try{
        const { QuantumCore } = await import('./engine/QuantumCore')
        if(dead||!ref.current) return
        core=new QuantumCore()
        await core.init(ref.current)
      }catch(e){ if(ref.current) ref.current.style.background='#000' }
    })()
    return()=>{dead=true; try{core?.destroy()}catch{}}
  },[])
  return(
    <main style={{width:'100vw',height:'100vh',background:'#000',overflow:'hidden'}}>
      <canvas ref={ref} style={{width:'100%',height:'100%',display:'block',background:'#000'}} />
    </main>
  )
}
