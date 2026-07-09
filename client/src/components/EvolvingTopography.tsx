'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Suspense, useMemo, useRef, useState, useEffect } from 'react';
import { useReducedMotion } from './useReducedMotion';

interface EvolvingTopographyProps {
  variant?: 'hero' | 'story';
}

// Theme 2: Evolving Topography of Trust
// Combines procedural wireframe cityscape + morphing particle "617" formation

// Procedural Wireframe Cityscape (Charlotte skyline)
function WireframeCityscape() {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const { size } = useThree();
  
  // Generate Charlotte-inspired skyline positions
  const buildings = useMemo(() => {
    const count = 350;
    const positions: [number, number, number][] = [];
    const heights: number[] = [];
    const widths: number[] = [];
    const depths: number[] = [];
    
    const randNormal = () => {
      let u = 0, v = 0;
      while (u === 0) u = Math.random();
      while (v === 0) v = Math.random();
      return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    };
    
    for (let i = 0; i < count; i++) {
      const x = randNormal() * 6 + (Math.random() - 0.5) * 2;
      const z = (Math.random() - 0.5) * 15;
      const height = Math.pow(Math.random(), 2.5) * 6 + 0.5;
      positions.push([x, height / 2, z]);
      heights.push(height);
      widths.push(0.3 + Math.random() * 0.7);
      depths.push(0.3 + Math.random() * 0.7);
    }
    
    return { positions, heights, widths, depths, count };
  }, []);
  
  // Set up instance matrices
  useMemo(() => {
    const dummy = new THREE.Object3D();
    if (!meshRef.current) return;
    
    for (let i = 0; i < buildings.count; i++) {
      const pos = buildings.positions[i];
      dummy.position.set(pos[0], pos[1], pos[2]);
      dummy.scale.set(buildings.widths[i], buildings.heights[i], buildings.depths[i]);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [buildings]);
  
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.006;
      meshRef.current.rotation.x = Math.sin(time * 0.003) * 0.02;
    }
  });
  
  return (
    <instancedMesh ref={meshRef} args={[new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({
      wireframe: true,
      color: '#b8975e',
      transparent: true,
      opacity: 0.35
    }), buildings.count]} />
  );
}

// Morphing Particle "617" System
function MorphingParticles() {
  const pointsRef = useRef<THREE.Points>(null!);
  
  const { positions, scattered, textShape } = useMemo(() => {
    const count = 1200;
    const scattered: [number, number, number][] = [];
    const textShape: [number, number, number][] = [];
    
    for (let i = 0; i < count; i++) {
      scattered.push([
        (Math.random() - 0.5) * 35,
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 25
      ]);
    }
    
    const glyphWidth = 5;
    const glyphHeight = 7;
    
    // "6" - left
    for (let i = 0; i < 150; i++) {
      const y = (i / 150 - 0.5) * glyphHeight;
      textShape.push([-glyphWidth, y + (Math.random() - 0.5) * 0.4, (Math.random() - 0.5) * 1]);
    }
    
    // "1" - center
    for (let i = 0; i < 150; i++) {
      const y = (i / 150 - 0.5) * glyphHeight;
      textShape.push([0, y + (Math.random() - 0.5) * 0.4, (Math.random() - 0.5) * 1]);
    }
    
    // "7" - right diagonal
    for (let i = 0; i < 150; i++) {
      const t = i / 150;
      textShape.push([
        glyphWidth * (t - 0.5),
        glyphHeight * (0.5 - t * 0.8),
        (Math.random() - 0.5) * 1
      ]);
    }
    
    // Fill remainder
    while (textShape.length < count) {
      textShape.push([
        (Math.random() - 0.5) * 35,
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 25
      ]);
    }
    
    const pos = new Float32Array(count * 3);
    scattered.forEach((p, i) => {
      pos[i * 3] = p[0];
      pos[i * 3 + 1] = p[1];
      pos[i * 3 + 2] = p[2];
    });
    
    return { positions: pos, scattered, textShape };
  }, []);
  
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const morphProgress = Math.min(1, time / 2.5);
    
    if (pointsRef.current) {
      const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < pos.length / 3; i++) {
        const sx = scattered[i][0];
        const sy = scattered[i][1];
        const sz = scattered[i][2];
        const tx = textShape[i][0];
        const ty = textShape[i][1];
        const tz = textShape[i][2];
        
        pos[i * 3] = sx + (tx - sx) * morphProgress;
        pos[i * 3 + 1] = sy + (ty - sy) * morphProgress;
        pos[i * 3 + 2] = sz + (tz - sz) * morphProgress;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      pointsRef.current.rotation.y = time * 0.015;
    }
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
        size={0.09}
        color="#b8975e"
        transparent
        opacity={0.45}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Low-Poly Terrain (Sandhills)
function LowPolyTerrain() {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  const geometry = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(50, 20, 80, 30);
    const positions = geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const z = positions[i + 1];
      const noise = Math.sin(x * 0.2) * Math.cos(z * 0.15) * 0.8 +
                  Math.sin(x * 0.35) * Math.cos(z * 0.25) * 0.4 +
                  Math.sin(x * 0.5) * 0.2;
      positions[i + 2] = noise * 1.5;
    }
    geometry.computeVertexNormals();
    return geometry;
  }, []);
  
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.position.z = Math.sin(time * 0.04) * 0.08;
    }
  });
  
  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2, 0, 0]} position={[0, -10, -5]}>
      <meshBasicMaterial
        color="#b8975e"
        transparent
        opacity={0.12}
        wireframe
      />
    </mesh>
  );
}

// Mouse parallax controller
function ParallaxController() {
  const { camera } = useThree();
  const mousePos = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mousePos.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  useFrame(() => {
    camera.position.x += (mousePos.current.x * 1.5 - camera.position.x) * 0.015;
    camera.position.y += (mousePos.current.y * 0.8 - camera.position.y) * 0.015;
  });
  
  return null;
}

export function EvolvingTopography({ variant = 'hero' }: EvolvingTopographyProps) {
  const prefersReduced = useReducedMotion();
  
  if (prefersReduced) {
    return (
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0908] via-[#11100f] to-[#161514]" aria-hidden="true" />
    );
  }
  
  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <LowPolyTerrain />
          <WireframeCityscape />
          <MorphingParticles />
          <ambientLight intensity={0.4} />
          <ParallaxController />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(5,5,5,0.15)_0%,rgba(5,5,5,0.75)_65%)]" />
    </div>
  );
}