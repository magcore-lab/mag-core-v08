'use client'
import dynamic from 'next/dynamic'

const CoreVR = dynamic(() => import('./CoreVR'), { ssr: false })

export default function Page(){
  return (
    <div style={{background:'#000',width:'100vw',height:'100vh',margin:0,overflow:'hidden'}}>
      <CoreVR />
    </div>
  )
}
