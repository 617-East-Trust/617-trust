'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { useMemo, useRef, useState, useEffect } from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { ButtonLink } from './ui/Button';
import { SITE } from '@/lib/siteData';
import { NCBackground } from './NCBackground';

// Theme 2: Evolving Topography of Trust
// Toggle between original (NCBackground) and Theme 2 (EvolvingTopography)

// Original ParticleField (kept for fallback Theme 1)
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
    <h1 className="text-balance" aria-label={text}>
      {/* Visually hidden clean text for crawlers + screen readers */}
      <span className="sr-only">{text}</span>
      {/* Animated spans for visual presentation */}
      <span aria-hidden="true">
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
      </span>
    </h1>
  );
}

// THEME TOGGLE: Set to 'theme2' for Evolving Topography, 'theme1' for original
const ACTIVE_THEME: 'theme1' | 'theme2' = 'theme2';

export function Hero3D() {
  const [Theme2Component, setTheme2Component] = useState<React.ComponentType | null>(null);
  
  useEffect(() => {
    // Lazy load Theme 2 component after initial render
    if (ACTIVE_THEME === 'theme2') {
      import('./EvolvingTopography').then((mod) => {
        setTheme2Component(() => mod.EvolvingTopography);
      });
    }
  }, []);

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[var(--color-void)] pt-16">
      {/* Theme 2: Evolving Topography (wireframe city + morphing particles) */}
      {ACTIVE_THEME === 'theme2' && Theme2Component && (
        <Theme2Component />
      )}
      
      {/* Theme 1: Original (NCBackground + Particle Field) */}
      {ACTIVE_THEME === 'theme1' && (
        <>
          <NCBackground variant="hero" intensity={0.75} />
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
        </>
      )}

      {/* Show fallback while Theme 2 loads */}
      {ACTIVE_THEME === 'theme2' && !Theme2Component && (
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[var(--color-void)] via-[var(--color-carbon)] to-[var(--semantic-bg-card)]" aria-hidden="true" />
      )}

      {/* Content overlay for readability */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(10,9,8,0.15)_0%,rgba(10,9,8,0.7)_65%)] z-[2]" />

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <div className="mb-4 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs tracking-[0.12em] text-[var(--color-brass)] uppercase backdrop-blur-sm">
            {SITE.preHeader}
          </div>
        </div>

        <AnimatedHeadline text="Form. Grow. Maintain." />

        <p className="mx-auto mt-6 max-w-2xl text-xl text-[var(--semantic-text-secondary)] tracking-tight">
          {SITE.thesis}
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
            className="min-w-[220px] border-white/20 text-[var(--semantic-text-primary)] hover:border-[var(--color-brass)] hover:text-[var(--color-brass)]"
          >
            <Phone className="mr-2 h-4 w-4" />
            {SITE.phone} — We answer.
          </ButtonLink>
        </div>
      </div>

      {/* Trust signals — moved below the hero per taste-skill stack discipline */}
      <div className="absolute bottom-8 left-0 right-0 z-10 hidden sm:flex justify-center gap-6 px-6">
        {SITE.heroTrustSignals.map((signal, index) => (
          <div key={index} className="text-xs text-[var(--color-chalk)]/60 italic max-w-[200px] text-center">
            "{signal.quote}"
          </div>
        ))}
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050505] to-transparent z-[3]" />
    </section>
  );
}

// Support default export
export default Hero3D;