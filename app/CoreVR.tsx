
'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function Rings() {
  const gRef = useRef<THREE.Group>(null);
  useFrame((_, d) => {
    if (gRef.current) {
      gRef.current.rotation.y = d * 0.15;
      gRef.current.rotation.x = d * 0.05;
    }
  });

  const rings = [
    { r: 1.8, c: '#A51205' }, // Magma
    { r: 2.1, c: '#FFFFFF' }, // Blanc pur
    { r: 2.5, c: '#A51205' },
    { r: 3.0, c: '#FFFFFF' },
    { r: 3.6, c: '#A51205' },
    { r: 4.2, c: '#FFFFFF' },
  ];

  return (
    <group ref={gRef}>
      {rings.map((k, i) => (
        <mesh key={i} rotation={[i * 0.2, 0, 0]}>
          <torusGeometry args={[k.r, 0.02, 16, 200]} />
          <meshStandardMaterial
            color={k.c}
            emissive={k.c}
            emissiveIntensity={1.3}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

function Pearl() {
  const mRef = useRef<THREE.Mesh>(null);
  useFrame((_, d) => {
    if (mRef.current) mRef.current.rotation.y = d * 0.08;
  });

  return (
    <mesh
      ref={mRef}
      onClick={(e) => {
        e.stopPropagation();
        if (mRef.current) mRef.current.scale.set(1.2, 1.2, 1.2);
      }}
    >
      <sphereGeometry args={[1.2, 64, 64]} />
      <meshPhysicalMaterial
        color="#A51205" // Magma
        emissive="#550000"
        emissiveIntensity={0.4}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
}

export default function CoreVR() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      style={{ background: '#000000', width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 0, 0]} intensity={4} color="#A51205" />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
      <Pearl />
      <Rings />
      <OrbitControls enablePan={false} minDistance={3} maxDistance={10} />
    </Canvas>
  );
}
