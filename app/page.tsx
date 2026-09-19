'use client'
import { useEffect, useRef } from 'react'

export default function Page(){
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(()=>{
    const c = ref.current
    if(!c) return
    c.style.background = '#000000'
    let raf = 0
    let dead = false
    const ctx = c.getContext('2d')
    if(!ctx) return
    const loop = ()=>{
      if(dead) return
      ctx.fillStyle = '#000000'
      ctx.fillRect(0,0,c.width,c.height)
      raf = requestAnimationFrame(loop)
    }
    loop()
    return ()=>{ dead = true; cancelAnimationFrame(raf) }
  },[])
  return(
    <main style={{width:'100vw',height:'100vh',background:'#000',margin:0,padding:0,overflow:'hidden'}}>
      <canvas ref={ref} width={1080} height={1920} style={{width:'100%',height:'100%',display:'block',background:'#000'}} />
    </main>
  )
}
