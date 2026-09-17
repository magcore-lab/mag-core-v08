'use client';
import { useState } from 'react';

export default function Page(){
  const [pulse,setPulse]=useState(0);
  return (
    <main style={{width:'100vw',height:'100vh',background:'#000',position:'relative',overflow:'hidden',fontFamily:'JetBrains Mono, monospace'}}>
      <div style={{position:'absolute',inset:0}}>
        {Array.from({length:48}).map((_,i)=><div key={i} style={{position:'absolute',left:`${(i*37)%100}%`,top:`${(i*57)%100}%`,width:1,height:1,background:'#fff',opacity:0.12+((i%5)/20),borderRadius:'50%'}}/>)}
      </div>
      <div style={{position:'absolute',top:68,left:'50%',transform:'translateX(-50%)',textAlign:'center',zIndex:10}}>
        <div onClick={()=>setPulse(p=>p+1)} style={{fontSize:28,letterSpacing:'0.6em',color:'#fff',textShadow:'0 0 12px rgba(255,255,255,0.8), 0 0 32px rgba(180,220,255,0.5), 0 0 60px rgba(255,255,255,0.25)',cursor:'pointer'}}>MAGMORE</div>
        <div style={{fontSize:9,letterSpacing:'0.28em',color:'rgba(255,255,255,0.25)',marginTop:10}}>V10.1 FINALE • NOYAU ACTIF 100% • NO TRIANGLE</div>
      </div>
      <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',display:'flex',gap:64,alignItems:'center'}}>
        <div style={{width:280,height:175,border:'1.2px solid rgba(120,190,255,0.45)',borderRadius:7,background:'rgba(10,22,40,0.94)',padding:12}}>
          <div style={{fontSize:7,color:'rgba(255,255,255,0.35)',display:'flex',justifyContent:'space-between'}}><span>SIGNAL / FLUX</span><span style={{color:'#00e0ff'}}>● ACTIVE 100[STRIPPED 38 bytes]'0 0 260 90' style={{width:'100%',height:90,marginTop:12}}><path d='M10 50 Q40 30 60 35 T100 25 T140 55 T180 35 T220 40 T250 30' fill='none' stroke='#fff' strokeWidth='1.1'/><path d='M10 55 Q50 45 80 50 T130 60 T190 50 T250 45' fill='none' stroke='#4a8aff' strokeWidth='0.7' opacity='0.6'/></svg>
        </div>
        <div style={{width:500,height:400,border:'2px solid rgba(100,180,255,0.6)',borderRadius:9,background:'radial-gradient(ellipse at center, #0d1e36 0%, #070f1e 100%)',boxShadow:'0 0 48px rgba(0,180,255,0.18)',position:'relative'}}>
          <div style={{position:'absolute',top:10,left:14,right:14,display:'flex',justifyContent:'space-between',fontSize:6,color:'rgba(255,255,255,0.35)'}}><span>MCE-CORE-007</span><span>ENTER THE CORE</span><span style={{color:'#00ffaa'}}>● NOYAU 100%</span></div>
          <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-58%)'}}>
            <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:160,height:160,borderRadius:'50%',background:'radial-gradient(circle, rgba(255,255,255,0.55) 0%, rgba(200,220,255,0.28) 40%, transparent 70%)',filter:'blur(8px)'}}/>
            <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:260,height:260,borderRadius:'50%',background:'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)',filter:'blur(16px)'[STRIPPED 28 bytes]'160' height='160' viewBox='0 0 160 160' style={{filter:'drop-shadow(0 0 32px rgba(255,255,255,0.5)) drop-shadow(0 0 72px rgba(180,200,255,0.3))'}}>
              <defs><radialGradient id='dw' cx='0.32' cy='0.28' r='0.8'><stop offset='0%' stopColor='#fff'/><stop offset='40%' stopColor='#d0e0ff'/><stop offset='100%' stopColor='#f8f8f8'/></radialGradient></defs>
              <polygon points='80,8 136,52 120,124 80,152 40,124 24,52' fill='url(#dw)' stroke='#fff' strokeWidth='0.9'/>
              <ellipse cx='62' cy='42' rx='12' ry='9' fill='#fff' opacity='0.98'/><circle cx='68' cy='46' r='3.5' fill='#fff'/>
            </svg>
            <div style={{position:'absolute',bottom:-28,left:'50%',transform:'translateX(-50%)',fontSize:7,letterSpacing:'0.32em',color:'#00e0ff',whiteSpace:'nowrap'}}>NOYAU ACTIF 100% • RETRO LUMINESCENCE</div>
          </div>
          <div style={{position:'absolute',bottom:0,left:0,right:0,height:62,background:'rgba(30,60,120,0.22)',borderTop:'1px solid rgba(100,180,255,0.18)',display:'flex'}}>
            <div style={{flex:1,padding:8}}><div style={{fontSize:5,color:'rgba(255,255,255,0.3)'}}>FLUX • 100[STRIPPED 27 bytes]'0 0 360 32' style={{width:'100%',height:32,marginTop:4}}><path d='M0 24 L20 20 L40 22 L70 10 L100 14 L130 6 L160 10 L190 16 L220 10 L260 18 L300 14 L340 18 L360 14' fill='none' stroke='#5ac8ff' strokeWidth='1'/><path d='M0 24 L0 32 L360 32 L360 14 L340 18 L300 14 L260 18 L220 10 L190 16 L160 10 L130 6 L100 14 L70 10 L40 22 L20 20 L0 24 Z' fill='rgba(70,160,200,0.28)'/></svg></div>
            <div style={{width:84,borderLeft:'1px solid rgba(255,255,255,0.08)',display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:42,height:42,borderRadius:'50%',border:'2px solid #00e0ff',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}><div style={{fontSize:10,color:'#fff',fontWeight:700}}>100%</div><div style={{fontSize:5,color:'#00e0ff'}}>STABLE</div></div></div>
          </div>
        </div>
        <div style={{width:280,height:175,border:'1.2px solid rgba(120,190,255,0.45)',borderRadius:7,background:'rgba(10,22,40,0.94)',padding:14,display:'flex',gap:12}}>
          <div style={{width:52,height:52,borderRadius:'50%',border:'1.2px solid rgba(255,255,255,0.7)',display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:8,height:8,borderRadius:'50%',background:'#fff',boxShadow:'0 0 8px #fff'}}/></div>
          <div style={{flex:1,display:'flex',flexDirection:'column',gap:8}}><div style={{height:16,border:'1px solid rgba(255,255,255,0.22)',borderRadius:3,background:'rgba(255,255,255,0.08)'}}/><div style={{height:16,border:'1px solid rgba(255,255,255,0.18)',borderRadius:3}}/><div style={{height:1,background:'rgba(255,255,255,0.15)',marginTop:6}}/></div>
        </div>
      </div>
      <div style={{position:'absolute',bottom:92,left:'50%',transform:'translateX(-50%)',width:620,height:1,background:'rgba(255,255,255,0.35)'}}/>
      <div style={{position:'absolute',bottom:20,left:20,fontSize:9,color:'rgba(255,255,255,0.28)'}}>MCE-CORE-007 v2.1 | MAGMORE | DIAMANT BLANC | FLUX 100% | RETRO LUMINESCENCE | NO TRIANGLE | ENTER THE CORE</div>
      <div style={{position:'absolute',bottom:44,left:'50%',transform:'translateX(-50%)',fontSize:12,letterSpacing:'0.38em',color:'rgba(255,255,255,0.9)'}}>NOYAU ENERGIE MAITRISE - MAGMORE - ENTER THE CORE - V10.1 - ACTIF 100%</div>
    </main>
  );
}
