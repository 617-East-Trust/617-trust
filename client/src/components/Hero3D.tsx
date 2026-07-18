'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useMemo, useRef, useState, useEffect, lazy, Suspense } from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { ButtonLink } from './ui/Button';
import { SITE } from '@/lib/siteData';
// NCBackground is only used in the inactive theme1 branch; lazy-load so it stays out of the main bundle.
const NCBackground = lazy(() => import('./NCBackground'));

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
            {char === ' ' ? ' ' : char}
          </motion.span>
        ))}
      </span>
    </h1>
  );
}

// Branded loader shown while the 3D bundle streams in
function HeroLoadingShimmer() {
  return (
    <div className="absolute inset-0 z-0 bg-gradient-to-b from-[var(--color-void)] via-[var(--color-carbon)] to-[var(--semantic-bg-card)]">
      <div className="absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_50%_40%,rgba(184,151,94,0.12)_0%,transparent_60%)]" />
    </div>
  );
}

// Static, performant fallback for mobile / no-WebGL devices
function StaticHeroFallback() {
  return (
    <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0a0908] via-[#11100f] to-[#161514]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(184,151,94,0.18)_0%,transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(195,175,120,0.08)_0%,transparent_50%)]" />
    </div>
  );
}

// THEME TOGGLE: Set to 'theme2' for Evolving Topography, 'theme1' for original
const ACTIVE_THEME: 'theme1' | 'theme2' = 'theme2';

export function Hero3D() {
  const [Theme2Component, setTheme2Component] = useState<React.ComponentType | null>(null);
  const [isLowPower, setIsLowPower] = useState(false);
  const prefersReduced = useReducedMotion();
  const { scrollY } = useScroll();
  // Hero 3D layer recedes + fades as the user scrolls past the first viewport
  const layerY = useTransform(scrollY, [0, 800], [0, prefersReduced ? 0 : -160]);
  const layerOpacity = useTransform(scrollY, [0, 700], [1, prefersReduced ? 1 : 0.15]);
  const layerScale = useTransform(scrollY, [0, 800], [1, prefersReduced ? 1 : 1.08]);

  useEffect(() => {
    // Device capability detection — keep 3D off phones / no-WebGL contexts
    const noWebGL = typeof window !== 'undefined' &&
      !(window.WebGLRenderingContext && document.createElement('canvas').getContext('webgl'));
    const smallScreen = window.matchMedia('(max-width: 768px)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsLowPower(Boolean(noWebGL || (smallScreen && reduced)));

    if (ACTIVE_THEME === 'theme2' && !noWebGL) {
      import('./EvolvingTopography').then((mod) => {
        setTheme2Component(() => mod.EvolvingTopography);
      });
    }
  }, []);

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[var(--color-void)] pt-16">
      {/* Scroll-linked parallax wrapper: the 3D layer dollys up + fades as you scroll */}
      <motion.div
        style={{ y: layerY, opacity: layerOpacity, scale: layerScale }}
        className="absolute inset-0"
        aria-hidden="true"
      >
      {/* Theme 2: Evolving Topography (wireframe city + morphing particles) */}
      {ACTIVE_THEME === 'theme2' && Theme2Component && !isLowPower && (
        <Theme2Component />
      )}

      {/* Low-power / mobile fallback */}
      {ACTIVE_THEME === 'theme2' && (isLowPower || !Theme2Component) && (
        <HeroLoadingShimmer />
      )}

      {/* Theme 1: Original (NCBackground + Particle Field) */}
      {ACTIVE_THEME === 'theme1' && (
        <>
          <Suspense fallback={null}>
            <NCBackground variant="hero" intensity={0.75} />
          </Suspense>
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
      </motion.div>

      {/* Content overlay for readability */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(10,9,8,0.15)_0%,rgba(10,9,8,0.7)_65%)] z-[2]" />

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.21, 0.92, 0.26, 1] }}
          className="mb-4 flex justify-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs tracking-[0.12em] text-[var(--color-brass)] uppercase backdrop-blur-sm">
            {SITE.preHeader}
          </div>
        </motion.div>

        <AnimatedHeadline text="The most important thing we do is tell you what not to do." />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.21, 0.92, 0.26, 1] }}
          className="mx-auto mt-6 max-w-2xl text-xl text-[var(--semantic-text-secondary)] tracking-tight"
        >
          {SITE.preHeader} Most advisors sell you the next step. We protect the one you shouldn't take.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.21, 0.92, 0.26, 1] }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
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
        </motion.div>
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
