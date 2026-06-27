'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface NCBackgroundProps {
  variant?: 'hero' | 'story';
  intensity?: number; // 0.3 - 1.0
}

/**
 * NCBackground
 * Elegant, noticeable animated background layers featuring NC identity.
 * - Charlotte skyline + Pinehurst/Sandhills golf most prominent
 * - Other cities and mountains more atmospheric
 * - Hybrid: Three.js particles (from parent) + crisp animated SVG layers
 * - Full reduced-motion support
 */
export function NCBackground({ variant = 'hero', intensity = 0.7 }: NCBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useRef(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.current = mediaQuery.matches;

    const handler = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches;
    };
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Subtle parallax for depth
  const mountainY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const golfY = useTransform(scrollYProgress, [0, 1], [10, -20]);
  const charlotteY = useTransform(scrollYProgress, [0, 1], [5, -40]);

  const isHero = variant === 'hero';

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    >
      {/* Base atmospheric gradient - light mode */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(0,0,0,0.3)_0%,rgba(5,5,5,0.85)_70%)]" />

      {/* === Distant Mountains (Blue Ridge / rural NC) - Atmospheric === */}
      <motion.div
        className="absolute inset-x-0 bottom-[35%] h-[45%] opacity-[0.25]"
        style={{ y: mountainY }}
        animate={prefersReducedMotion.current ? {} : { x: [0, -8, 0] }}
        transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox="0 0 1400 600" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="mountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f4f1eb" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#f4f1eb" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          {/* Layered mountain ridges */}
          <path d="M0,420 Q180,310 320,380 Q480,260 620,340 Q780,290 920,370 Q1080,310 1240,390 L1400,420 L1400,600 L0,600 Z" fill="url(#mountainGrad)" stroke="#f4f1eb" strokeWidth="1.5" strokeOpacity="0.15" />
          <path d="M0,460 Q220,380 380,430 Q560,340 720,410 Q900,360 1060,430 Q1220,380 1400,450 L1400,600 L0,600 Z" fill="none" stroke="#f4f1eb" strokeWidth="1" strokeOpacity="0.12" />
        </svg>
      </motion.div>

      {/* === Sandhills Golf Course (Pinehurst) - Most visible rural element === */}
      <motion.div
        className="absolute inset-x-0 bottom-[18%] h-[42%] opacity-[0.65]"
        style={{ y: golfY }}
        animate={prefersReducedMotion.current ? {} : { x: [0, 12, 0] }}
        transition={{ duration: 52, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox="0 0 1400 700" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="golfGrad" x1="0%" y1="40%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#b8975e" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#b8975e" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Rolling fairways */}
          <path d="M80,520 Q240,460 380,510 Q520,450 680,505 Q840,470 1000,520 Q1160,475 1320,530" fill="none" stroke="#b8975e" strokeWidth="2.5" strokeOpacity="0.65" />
          <path d="M120,560 Q280,510 420,555 Q580,505 740,555 Q900,515 1060,565 Q1220,520 1380,570" fill="none" stroke="#b8975e" strokeWidth="1.8" strokeOpacity="0.5" />

          {/* Pine clusters (stylized) */}
          <g stroke="#b8975e" strokeOpacity="0.55" strokeWidth="1.6" fill="none">
            {/* Left pines */}
            <path d="M160,540 L155,505 L148,540" />
            <path d="M175,545 L170,505 L163,545" />
            <path d="M195,538 L190,498 L183,538" />
            {/* Mid pines */}
            <path d="M620,515 L615,475 L608,515" />
            <path d="M645,520 L640,478 L633,520" />
            <path d="M670,512 L665,472 L658,512" />
            {/* Right pines */}
            <path d="M1080,530 L1075,490 L1068,530" />
            <path d="M1110,535 L1105,492 L1098,535" />
          </g>

          {/* Subtle sand bunker suggestion */}
          <ellipse cx="920" cy="535" rx="38" ry="12" fill="none" stroke="#f4f1eb" strokeOpacity="0.25" strokeWidth="1" />
        </svg>
      </motion.div>

      {/* === Charlotte Skyline - Most prominent urban element === */}
      <motion.div
        className="absolute inset-x-0 bottom-[22%] h-[55%] opacity-[0.75]"
        style={{ y: charlotteY }}
        animate={prefersReducedMotion.current ? {} : { x: [0, -6, 0] }}
        transition={{ duration: 44, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox="0 0 1400 800" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="charlotteGrad" x1="0%" y1="20%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f4f1eb" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#f4f1eb" stopOpacity="0.06" />
            </linearGradient>
          </defs>

          {/* Iconic Charlotte towers (Bank of America, Duke Energy, etc. simplified) */}
          <g stroke="#f4f1eb" strokeOpacity="0.85" strokeWidth="2.2" fill="none">
            {/* Tall central tower */}
            <rect x="620" y="280" width="38" height="320" rx="2" />
            <rect x="628" y="220" width="22" height="60" />
            {/* Second tall building */}
            <rect x="540" y="310" width="32" height="290" />
            <rect x="548" y="260" width="16" height="50" />
            {/* Right cluster */}
            <rect x="720" y="340" width="28" height="260" />
            <rect x="760" y="295" width="24" height="305" />
            {/* Left buildings */}
            <rect x="460" y="355" width="26" height="245" />
            <rect x="420" y="380" width="22" height="220" />
            {/* Smaller atmospheric buildings */}
            <rect x="360" y="400" width="18" height="200" />
            <rect x="800" y="370" width="20" height="230" />
          </g>

          {/* Subtle brass accent lines on key towers */}
          <g stroke="#b8975e" strokeOpacity="0.45" strokeWidth="1.5">
            <line x1="639" y1="280" x2="639" y2="600" />
            <line x1="556" y1="310" x2="556" y2="600" />
          </g>
        </svg>
      </motion.div>

      {/* === Atmospheric secondary cities (Raleigh, Greensboro, Winston-Salem) === */}
      <motion.div
        className="absolute inset-x-0 bottom-[28%] h-[38%] opacity-[0.35]"
        animate={prefersReducedMotion.current ? {} : { x: [0, 9, 0] }}
        transition={{ duration: 68, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox="0 0 1400 600" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <g stroke="#f4f1eb" strokeOpacity="0.6" strokeWidth="1.6" fill="none">
            {/* Raleigh-ish cluster (leftish) */}
            <rect x="180" y="380" width="22" height="160" />
            <rect x="210" y="355" width="16" height="185" />
            <rect x="240" y="395" width="14" height="145" />

            {/* Greensboro / Winston area (right) */}
            <rect x="980" y="375" width="20" height="165" />
            <rect x="1010" y="360" width="18" height="180" />
            <rect x="1040" y="390" width="15" height="150" />
          </g>
        </svg>
      </motion.div>

      {/* Strong bottom fade for text readability - light */}
      <div className="absolute bottom-0 left-0 right-0 h-[55%] bg-gradient-to-t from-[#050505] via-[#050505]/95 to-transparent" />

      {/* Subtle vignette - light */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(5,5,5,0.65)_85%)]" />
    </div>
  );
}
