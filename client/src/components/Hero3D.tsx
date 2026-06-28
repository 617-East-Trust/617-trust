'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { useMemo, useRef } from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { Button, ButtonLink } from './ui/Button';
import { SITE } from '@/lib/siteData';
import { NCBackground } from './NCBackground';

/**
 * Hero3D Component
 * Re-enabled NCBackground (Charlotte + Pinehurst focused)
 */

// Existing ParticleField (kept and slightly enhanced)
function ParticleField({ count = 1800 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 28;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.012;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.008) * 0.08;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#b8975e"
        size={0.035}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.65}
      />
    </Points>
  );
}

function AnimatedHeadline({ text }: { text: string }) {
  return (
    <h1 className="text-balance">
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.08 * index,
            ease: [0.21, 0.92, 0.26, 1],
          }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </h1>
  );
}

export function Hero3D() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#050505] pt-16">
      {/* NCBackground - Charlotte skyline + Pinehurst golf most visible */}
      <NCBackground variant="hero" intensity={0.75} />

      {/* Three.js Particle Layer (tech depth) */}
      <div className="absolute inset-0 z-[1]">
        <Canvas
          camera={{ position: [0, 0, 14], fov: 52 }}
          style={{ background: 'transparent' }}
          gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
          dpr={[1, 1.6]}
        >
          <ParticleField count={1600} />
          <ambientLight intensity={0.4} />
        </Canvas>
      </div>

      {/* Strong content overlay for readability */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(5,5,5,0.25)_0%,rgba(5,5,5,0.75)_65%)] z-[2]" />

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <div className="mb-4 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs tracking-[0.12em] text-[#b8975e] uppercase">
            {SITE.preHeader}
          </div>
        </div>

        <AnimatedHeadline text="Form. Grow. Maintain." />

        <p className="mx-auto mt-6 max-w-2xl text-xl text-[#f4f1eb]/90 tracking-tight">
          Technology builds fast. People build trust.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <ButtonLink href="/contact" size="lg" className="group min-w-[220px]">
            Book a Free Consultation
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </ButtonLink>

          <ButtonLink
            href={SITE.phoneHref}
            variant="ghost"
            size="lg"
            className="min-w-[220px] border-white/20 text-[#f4f1eb] hover:border-[#b8975e] hover:text-[#b8975e]"
          >
            <Phone className="mr-2 h-4 w-4" />
            {SITE.phone} — We answer.
          </ButtonLink>
        </div>

        {/* Trust signals */}
        <div className="mt-16 grid grid-cols-1 gap-4 text-left sm:grid-cols-3">
          {SITE.heroTrustSignals.map((signal, index) => (
            <div key={index} className="card-cinematic p-5 text-sm">
              <div className="flex items-center gap-1 text-[#b8975e]">
                {'\u2605'.repeat(5)}
              </div>
              <p className="mt-3 text-[#f4f1eb]/90">"{signal.quote}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050505] to-transparent z-[3]" />
    </section>
  );
}

// Support default import for Home.tsx while keeping named export
export default Hero3D;
