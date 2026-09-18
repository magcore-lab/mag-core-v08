
// Remplace ton useEffect facets par :
facets.current = Array.from({length:2000},(_,i)=>({
  a:(i/2000)*Math.PI*2 + (Math.random()-0.5)*0.15,
  l:0.15+Math.random()*0.85,
  d:0.7+Math.random()*0.5
}));

// Dans draw(), remplace la boucle facets par :
facets.current.forEach((f,i)=>{
  const ang=f.a+time*0.5+mx*0.8;
  const innerR = r*0.12 + Math.sin(i*0.3)*r*0.05;
  const outerR = r*f.l*f.d;
  ctx.beginPath();
  ctx.moveTo(cx+Math.cos(ang)*innerR, cy+Math.sin(ang+my)*innerR);
  ctx.lineTo(cx+Math.cos(ang)*outerR, cy+Math.sin(ang+my)*outerR);
  // Refraction V10.1
  const isBright = i % 7 === 0;
  ctx.strokeStyle = isBright
    ? `rgba(255,255,255,${mode==='PUR'?0.95:0.85})`
    : `rgba(${mode==='PUR'?'255,255,255': '0,240,255'},${0.25 + f.d*0.35})`;
  ctx.lineWidth = isBright ? 0.8 : 0.25 + f.d*0.4;
  ctx.stroke();
  if(isBright){
    ctx.beginPath(); ctx.arc(cx+Math.cos(ang)*outerR, cy+Math.sin(ang+my)*outerR, 1.1,0,Math.PI*2);
    ctx.fillStyle='rgba(255,255,255,1)'; ctx.shadowColor='white'; ctx.shadowBlur=6; ctx.fill(); ctx.shadowBlur=0;
  }
});
