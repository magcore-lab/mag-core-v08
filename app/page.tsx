'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js';
import { FilmShader } from 'three/examples/jsm/shaders/FilmShader.js';
import { VignetteShader } from 'three/examples/jsm/shaders/VignetteShader.js';

import { QuantumCore, QuantumSignal } from '@/engine/QuantumCore';
import { UnifiedControlBus } from '@/engine/UnifiedControlBus';
import { DmxEngine } from '@/engine/DmxEngine';
import { AiEngine } from '@/engine/AiEngine';

// CORE LOCK — SCELLÉ — NE JAMAIS MODIFIER SANS CONFLIT EXPLICITE
const CORE_LOCK = Object.freeze({
  cages: Object.freeze([0.62, 0.78, 0.92] as const),
  middle: Object.freeze({
    radius: 0.48,
    transmission: 0.995,
    ior: 2.33, // révision officielle 2.65 -> 2.33
    thickness: 0.52,
    roughness: 0.01,
    iridescence: 0.42,
  } as const),
  inner: Object.freeze([0.22, 0.11] as const),
  innerEmissive: Object.freeze([4.5, 6] as const),
  sat: Object.freeze({ count: 6, radius: 0.713, relation: '0.62*1.15' as const }),
  camera: Object.freeze({ z: 10.2, fov: 34 } as const),
  background: '#000000' as const,
});

export default function Page() {
  const mountRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    let renderer: THREE.WebGLRenderer | null = null;
    let composer: EffectComposer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    let quantum: QuantumCore | null = null;
    let ai: AiEngine | null = null;
    let dmx: DmxEngine | null = null;
    let bus: UnifiedControlBus | null = null;
    let device: GPUDevice | null = null;
    let destroyed = false;

    const clock = new THREE.Clock();

    (async () => {
      if (!mountRef.current) return;

      // 1. DEVICE PARTAGÉ UNIQUE
      const adapter = await navigator.gpu?.requestAdapter({ powerPreference: 'high-performance' });
      if (!adapter) {
        console.error('[MAG CORE] WebGPU adapter not available — fallback WebGL disabled in V19');
        return;
      }
      device = await adapter.requestDevice();
      device.lost.then((info) => {
        console.error('[MAG CORE] device.lost', info);
      });

      // 2. THREE SETUP
      scene = new THREE.Scene();
      scene.background = new THREE.Color(CORE_LOCK.background);

      camera = new THREE.PerspectiveCamera(
        CORE_LOCK.camera.fov,
        window.innerWidth / window.innerHeight,
        0.1,
        100
      );
      camera.position.z = CORE_LOCK.camera.z;

      const canvas = document.createElement('canvas');
      renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance' });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      mountRef.current!.appendChild(renderer.domElement);

      // 3. POSTFX ORDER LOCKED: Render → Bloom → Glitch → RGB → Scanline → Chroma → Vignette
      composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      composer.addPass(new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.35, 0.4, 0.1));

      const glitchPass = new GlitchPass();
      glitchPass.enabled = false;
      composer.addPass(glitchPass);

      const rgbPass = new ShaderPass(RGBShiftShader);
      (rgbPass.uniforms['amount'] as any).value = 0.0012;
      composer.addPass(rgbPass);

      const scanlinePass = new ShaderPass(FilmShader);
      (scanlinePass.uniforms['sIntensity'] as any).value = 0.15;
      (scanlinePass.uniforms['nIntensity'] as any).value = 0.1;
      composer.addPass(scanlinePass);

      const chromaPass = new ShaderPass({
        uniforms: {
          tDiffuse: { value: null },
          amount: { value: 0.0015 },
        },
        vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
        fragmentShader: `uniform sampler2D tDiffuse; varying vec2 vUv; uniform float amount; void main(){ vec4 c=texture2D(tDiffuse,vUv); c.r=texture2D(tDiffuse,vUv+vec2(amount,0.0)).r; c.b=texture2D(tDiffuse,vUv-vec2(amount,0.0)).b; gl_FragColor=c; }`,
      });
      composer.addPass(chromaPass);

      const vignettePass = new ShaderPass(VignetteShader);
      (vignettePass.uniforms['darkness'] as any).value = 0.45;
      composer.addPass(vignettePass);

      // 4. GEOMETRY CORE LOCK
      const middleMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transmission: CORE_LOCK.middle.transmission,
        ior: CORE_LOCK.middle.ior,
        thickness: CORE_LOCK.middle.thickness,
        roughness: CORE_LOCK.middle.roughness,
        iridescence: CORE_LOCK.middle.iridescence,
        transparent: true,
        transmissionMap: null,
      });

      const middle = new THREE.Mesh(new THREE.IcosahedronGeometry(CORE_LOCK.middle.radius, 4), middleMat);
      const inner1 = new THREE.Mesh(
        new THREE.IcosahedronGeometry(CORE_LOCK.inner[0], 3),
        new THREE.MeshStandardMaterial({
          color: 0x000000,
          emissive: 0xffffff,
          emissiveIntensity: CORE_LOCK.innerEmissive[0],
        })
      );
      const inner2 = new THREE.Mesh(
        new THREE.IcosahedronGeometry(CORE_LOCK.inner[1], 3),
        new THREE.MeshStandardMaterial({
          color: 0x000000,
          emissive: 0xffffff,
          emissiveIntensity: CORE_LOCK.innerEmissive[1],
        })
      );

      const cages = CORE_LOCK.cages.map(
        (r) =>
          new THREE.Mesh(
            new THREE.IcosahedronGeometry(r, 1),
            new THREE.MeshBasicMaterial({ wireframe: true, color: 0x222222, transparent: true, opacity: 0.12 })
          )
      );

      const satGroup = new THREE.Group();
      for (let i = 0; i < CORE_LOCK.sat.count; i++) {
        const a = (i / CORE_LOCK.sat.count) * Math.PI * 2;
        const s = new THREE.Mesh(
          new THREE.SphereGeometry(0.02, 8, 8),
          new THREE.MeshBasicMaterial({ color: 0xffffff })
        );
        s.position.set(Math.cos(a) * CORE_LOCK.sat.radius, Math.sin(a) * CORE_LOCK.sat.radius, 0);
        satGroup.add(s);
      }

      scene.add(middle, inner1, inner2,...cages, satGroup);

      const light = new THREE.PointLight(0xffffff, 2, 20);
      light.position.set(2, 2, 2);
      scene.add(light);

      // 5. ENGINES — DEVICE PARTAGÉ
      quantum = new QuantumCore();
      const ok = await quantum.init(device, { seed: 12345 });
      if (!ok) console.error('[QUANTUM] init failed');

      ai = new AiEngine();
      let aiTex: GPUTexture | null = null;
      try {
        aiTex = await ai.init(device);
        // GPU → GPU — PAS DE READBACK
        if (aiTex) {
          (middleMat as any).transmissionMap = aiTex;
          (middleMat as any).needsUpdate = true;
        }
      } catch (e) {
        console.error('[AI] init failed', e);
      }

      bus = new UnifiedControlBus();
      dmx = new DmxEngine();
      dmx.connect('ws://127.0.0.1:8080?token=LOCAL_ONLY');

      // 6. ANIMATION LOOP UNIQUE — 0 BOUCLE PARALLÈLE
      const animate = () => {
        if (destroyed) return;
        rafRef.current = requestAnimationFrame(animate);

        const delta = Math.min(clock.getDelta(), 0.033);
        const now = performance.now();

        const dmxNorm = dmx!.getNormalized();
        bus!.ingest({ dmx: dmxNorm });
        const signal = bus!.update() as QuantumSignal & any;

        // Principe: le moteur ne sait jamais d'où vient le signal
        quantum!.compute(signal, delta);
        ai!.compute(signal, delta, now);

        middle.rotation.y += signal.flow * 0.008;
        middle.rotation.x += signal.propulsion * 0.002;
        satGroup.rotation.z += signal.sat * 0.015;
        inner1.rotation.y -= signal.inner * 0.01;
        inner2.rotation.y += signal.inner * 0.008;

        (glitchPass as any).enabled =!!signal.glitch;
        (rgbPass.uniforms['amount'] as any).value = signal.glitch? 0.008 : 0.0012;
        (middleMat as any).emissiveIntensity = signal.bloom * 0.2;

        composer!.render();
      };

      animate();

      const onResize = () => {
        if (!camera ||!renderer ||!composer) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        composer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', onResize);
    })();

    return () => {
      destroyed = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      try { quantum?.destroy(); } catch {}
      try { ai?.destroy(); } catch {}
      try { dmx?.destroy(); } catch {}
      try { renderer?.dispose(); } catch {}
      if (mountRef.current && renderer?.domElement) {
        try { mountRef.current.removeChild(renderer.domElement); } catch {}
      }
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh', background: '#000', overflow: 'hidden' }} />;
}
