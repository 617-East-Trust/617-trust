'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Suspense, useMemo, useRef, useEffect } from 'react';
import { useReducedMotion } from './useReducedMotion';
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

// Simplex noise implementation (inline to avoid deps)
class SimplexNoise {
  private p: number[];
  constructor(seed = Math.random()) {
    this.p = new Array(512);
    const perm = new Array(256);
    for (let i = 0; i < 256; i++) perm[i] = i;
    let s = seed * 2147483647;
    for (let i = 255; i > 0; i--) {
      s = (s * 16807) % 2147483647;
      const j = s % (i + 1);
      [perm[i], perm[j]] = [perm[j], perm[i]];
    }
    for (let i = 0; i < 512; i++) this.p[i] = perm[i & 255];
  }
  noise2D(xin: number, yin: number) {
    const F2 = 0.5 * (Math.sqrt(3) - 1);
    const G2 = (3 - Math.sqrt(3)) / 6;
    const s = (xin + yin) * F2;
    const i = Math.floor(xin + s);
    const j = Math.floor(yin + s);
    const t = (i + j) * G2;
    const X0 = i - t, Y0 = j - t;
    const x0 = xin - X0, y0 = yin - Y0;
    const i1 = x0 > y0 ? 1 : 0;
    const j1 = x0 > y0 ? 0 : 1;
    const x1 = x0 - i1 + G2, y1 = y0 - j1 + G2;
    const x2 = x0 - 1 + 2 * G2, y2 = y0 - 1 + 2 * G2;
    const ii = i & 255, jj = j & 255;
    const grad = (hash: number, x: number, y: number) => {
      const h = hash & 7;
      const u = h < 4 ? x : y;
      const v = h < 4 ? y : x;
      return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
    };
    let n0 = 0, n1 = 0, n2 = 0;
    let t0 = 0.5 - x0 * x0 - y0 * y0;
    if (t0 >= 0) { t0 *= t0; n0 = t0 * t0 * grad(this.p[ii + this.p[jj]], x0, y0); }
    let t1 = 0.5 - x1 * x1 - y1 * y1;
    if (t1 >= 0) { t1 *= t1; n1 = t1 * t1 * grad(this.p[ii + i1 + this.p[jj + j1]], x1, y1); }
    let t2 = 0.5 - x2 * x2 - y2 * y2;
    if (t2 >= 0) { t2 *= t2; n2 = t2 * t2 * grad(this.p[ii + 1 + this.p[jj + 1]], x2, y2); }
    return 70 * (n0 + n1 + n2);
  }
}

const simplex = new SimplexNoise(42);

// Procedural Terrain Mesh with vertex displacement (represents financial terrain)
function ProceduralTerrain() {
  const meshRef = useRef<THREE.Mesh>(null!);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(60, 40, 120, 80);
    return geo;
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime * 0.08;
    if (!meshRef.current) return;
    const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      // Multi-octave noise for natural terrain
      const n1 = simplex.noise2D(x * 0.08 + time * 0.15, y * 0.06) * 2.5;
      const n2 = simplex.noise2D(x * 0.18, y * 0.14 + time * 0.08) * 1.2;
      const n3 = simplex.noise2D(x * 0.35, y * 0.28) * 0.4;
      positions[i + 2] = n1 + n2 + n3;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2.2, 0, 0]} position={[0, -8, -3]}>
      <meshBasicMaterial color="#b8975e" wireframe transparent opacity={0.14} />
    </mesh>
  );
}

// Floating geometric markers (guidance points through the terrain)
function FloatingMarkers() {
  const groupRef = useRef<THREE.Group>(null!);

  const markers = useMemo(() => {
    const items: { x: number; y: number; z: number; scale: number; type: number; speed: number; phase: number }[] = [];
    for (let i = 0; i < 18; i++) {
      items.push({
        x: (Math.random() - 0.5) * 25,
        y: (Math.random() - 0.5) * 12 - 2,
        z: (Math.random() - 0.5) * 18 - 4,
        scale: 0.15 + Math.random() * 0.35,
        type: Math.floor(Math.random() * 3),
        speed: 0.2 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
      });
    }
    return items;
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, i) => {
      const m = markers[i];
      child.position.x = m.x + Math.sin(time * m.speed * 0.3 + m.phase) * 0.8;
      child.position.y = m.y + Math.cos(time * m.speed * 0.25 + m.phase) * 0.6;
      child.rotation.x = time * 0.15 * m.speed;
      child.rotation.y = time * 0.2 * m.speed;
    });
  });

  return (
    <group ref={groupRef}>
      {markers.map((m, i) => {
        let geo: THREE.BufferGeometry;
        if (m.type === 0) geo = new THREE.OctahedronGeometry(m.scale, 0);
        else if (m.type === 1) geo = new THREE.IcosahedronGeometry(m.scale, 0);
        else geo = new THREE.TetrahedronGeometry(m.scale, 0);
        return (
          <mesh key={i} position={[m.x, m.y, m.z]}>
            <primitive object={geo} attach="geometry" />
            <meshBasicMaterial color="#d6b878" wireframe transparent opacity={0.4} />
          </mesh>
        );
      })}
    </group>
  );
}

// Flow field particles (organic movement along noise-based flow lines)
function FlowFieldParticles() {
  const pointsRef = useRef<THREE.Points>(null!);

  const { positions, velocities } = useMemo(() => {
    const count = 1200;
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
      vel[i * 3] = 0;
      vel[i * 3 + 1] = 0;
      vel[i * 3 + 2] = 0;
    }
    return { positions: pos, velocities: vel };
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const scale = 0.04;
    const speed = 0.015;
    for (let i = 0; i < pos.length / 3; i++) {
      const angle = simplex.noise2D(pos[i * 3] * scale + time * 0.06, pos[i * 3 + 1] * scale + time * 0.04) * Math.PI * 4;
      velocities[i * 3] += Math.cos(angle) * speed;
      velocities[i * 3 + 1] += Math.sin(angle) * speed;
      pos[i * 3] += velocities[i * 3];
      pos[i * 3 + 1] += velocities[i * 3 + 1];
      // Damping
      velocities[i * 3] *= 0.96;
      velocities[i * 3 + 1] *= 0.96;
      // Wrap around bounds
      if (pos[i * 3] > 25) pos[i * 3] = -25;
      if (pos[i * 3] < -25) pos[i * 3] = 25;
      if (pos[i * 3 + 1] > 15) pos[i * 3 + 1] = -15;
      if (pos[i * 3 + 1] < -15) pos[i * 3 + 1] = 15;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        color="#c4a55a"
        transparent
        opacity={0.45}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Volumetric light shafts (subtle directional beams suggesting clarity)
function LightShafts() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(time * 0.03) * 0.15;
    groupRef.current.rotation.x = Math.cos(time * 0.025) * 0.05;
  });

  return (
    <group ref={groupRef}>
      {[0, 1, 2].map((i) => {
        const angle = (i / 3) * Math.PI * 2 + 0.5;
        const x = Math.cos(angle) * 4;
        const z = Math.sin(angle) * 4;
        return (
          <mesh key={i} position={[x, 5, z]} rotation={[0.4, angle, 0]}>
            <cylinderGeometry args={[0.08, 0.6, 25, 8, 1, true]} />
            <meshBasicMaterial color="#e8d4a0" transparent opacity={0.025} side={THREE.DoubleSide} />
          </mesh>
        );
      })}
    </group>
  );
}

// Enhanced camera controller (scroll-linked + mouse parallax)
function CameraController() {
  const { camera } = useThree();
  const mousePos = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mousePos.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const scrollFactor = Math.min(scrollRef.current / 800, 1);
    // Mouse parallax (subtle)
    const targetX = mousePos.current.x * 0.8 * (1 - scrollFactor);
    const targetY = mousePos.current.y * 0.5 * (1 - scrollFactor);
    camera.position.x += (targetX - camera.position.x) * 0.02;
    camera.position.y += (targetY - camera.position.y) * 0.02;
    // Cinematic breathing
    const baseZ = 10 + Math.sin(time * 0.08) * 0.4;
    camera.position.z += (baseZ - camera.position.z) * 0.015;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export function EvolvingTopography() {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0908] via-[#11100f] to-[#161514]" aria-hidden="true" />
    );
  }

  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 48 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.6]}
      >
        <fog attach="fog" args={['#050505', 15, 55]} />
        <Suspense fallback={null}>
          <ProceduralTerrain />
          <FloatingMarkers />
          <FlowFieldParticles />
          <LightShafts />
          <ambientLight intensity={0.25} />
          <CameraController />
          <EffectComposer multisampling={4}>
            <Bloom intensity={0.5} luminanceThreshold={0.25} luminanceSmoothing={0.9} mipmapBlur />
            <Vignette eskil={false} offset={0.3} darkness={0.65} />
            <Noise premultiply blendFunction={BlendFunction.OVERLAY} opacity={0.035} />
          </EffectComposer>
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_32%,rgba(5,5,5,0.1)_0%,rgba(5,5,5,0.78)_62%)]" />
    </div>
  );
}
