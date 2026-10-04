import { ImageResponse } from 'next/og';
export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default async function Image() {
  const cinemaUrl = 'https://cdn.jsdelivr.net/gh/magcore-lab/mag-core-v08@main/MAGCORE_SP01_RC1/2.%20visuals/final_cinema_recull.png';
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', backgroundColor: 'black', backgroundImage: `url(${cinemaUrl})`, backgroundSize: 'cover', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.1))', display: 'flex' }} />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', padding: 32, zIndex: 10 }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ color: 'white', fontSize: 56, fontWeight: 900, letterSpacing: '-0.05em' }}>MAG CORE</div>
            <div style={{ color: '#FFD700', fontSize: 16, fontWeight: 700, letterSpacing: '0.2em', marginTop: 8 }}>LE FUTUR SE CONSTRUIT DANS L INVISIBLE</div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 10, marginTop: 6, fontFamily: 'monospace' }}>SHA 537e46c2fd9996a3f04d10fc024198b8094e9b167950cb6b2e9b214600f9b9ea | 38 FILES | final_cinema_recull.png 487f1c55</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ color: '#FFD700', fontSize: 12, fontWeight: 700 }}>★ FINAL CINEMA RECULL - IMAGE CINEMA TRES IMPORTANTE</div>
            <div style={{ color: 'white', fontSize: 18, fontWeight: 800 }}>33 VISUALS - 120 DRONES - 3 BANDLAB REAL - AUDIO LIVE - DMX 13 CH</div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
