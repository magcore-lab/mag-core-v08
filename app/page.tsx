'use client'
export default function Page(){
  return(
    <main style={{width:'100vw',height:'100vh',background:'#000000',margin:0,padding:0,overflow:'hidden'}}>
      <div style={{
        width:'100%',height:'100%',
        background:'radial-gradient(circle at 50% 50%, #0a0a0a 0%, #000000 70%)',
        display:'flex',alignItems:'center',justifyContent:'center'
      }}>
        <div style={{width:'1px',height:'1px',background:'#111',boxShadow:'0 0 200px 100px #11111120',borderRadius:'50%'}}/>
      </div>
    </main>
  )
}
