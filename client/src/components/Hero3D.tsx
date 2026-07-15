'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Environment, Float, Sparkles } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, DepthOfField } from '@react-three/postprocessing';
import * as THREE from 'three';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Suspense, useMemo, useRef, useState, useEffect } from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { ButtonLink } from './ui/Button';
import { SITE } from '@/lib/siteData';

// ========================================================
// BRAND CONSTANTS — pulled from your design system
// ========================================================
const BRAND = {
 void: '#0a0908',
 carbon: '#11100f',
 obsidian: '#161514',
 brass: '#b8975e',
 brassGlow: '#d4b87a',
 brassDim: '#8a6640',
 draftingBlue: '#5a8ab8',
 sage: '#6b8f6b',
 chalk: '#e8e4dc',
 fog: '#b8b2a7',
};

// ========================================================
// 3D KEYSTONE LOGO — three interlocking blocks
// Represents Form (blue) → Grow (brass) → Maintain (sage)
// ========================================================
function KeystoneLogo({ scrollProgress }: { scrollProgress: any }) {
 const groupRef = useRef<THREE.Group>(null!);
 const block1Ref = useRef<THREE.Mesh>(null!); // Form — navy
 const block2Ref = useRef<THREE.Mesh>(null!); // Grow — brass
 const block3Ref = useRef<THREE.Mesh>(null!); // Maintain — sage

 // Materials
 const blueMat = useMemo(() => new THREE.MeshStandardMaterial({
 color: BRAND.draftingBlue,
 roughness: 0.35,
 metalness: 0.6,
 emissive: BRAND.draftingBlue,
 emissiveIntensity: 0.08,
 }), []);

 const brassMat = useMemo(() => new THREE.MeshStandardMaterial({
 color: BRAND.brass,
 roughness: 0.2,
 metalness: 0.9,
 emissive: BRAND.brassDim,
 emissiveIntensity: 0.12,
 }), []);

 const sageMat = useMemo(() => new THREE.MeshStandardMaterial({
 color: BRAND.sage,
 roughness: 0.4,
 metalness: 0.5,
 emissive: BRAND.sage,
 emissiveIntensity: 0.06,
 }), []);

 useFrame((state, delta) => {
 if (groupRef.current) {
 // Slow auto-rotation
 groupRef.current.rotation.y += delta * 0.15;
 
 // Subtle float
 groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
 
 // Scroll-linked tilt
 const sp = scrollProgress?.get() ?? 0;
 groupRef.current.rotation.x = sp * 0.3;
 groupRef.current.position.z = sp * 2;
 }
 
 // Individual block micro-animations
 if (block1Ref.current) {
 block1Ref.current.position.y = -1.2 + Math.sin(state.clock.elapsedTime * 0.6) * 0.03;
 }
 if (block2Ref.current) {
 block2Ref.current.position.y = 0 + Math.sin(state.clock.elapsedTime * 0.6 + 1) * 0.03;
 }
 if (block3Ref.current) {
 block3Ref.current.position.y = 1.2 + Math.sin(state.clock.elapsedTime * 0.6 + 2) * 0.03;
 }
 });

 return (
 <group ref={groupRef} position={[0, 0, 0]} scale={1.2}>
 {/* Block 1 — Foundation (widest, bottom) */}
 <mesh ref={block1Ref} position={[0, -1.2, 0]} castShadow receiveShadow material={blueMat}>
 <boxGeometry args={[2.4, 0.8, 1.6]} />
 </mesh>

 {/* Block 2 — Growth (medium, center, slightly offset) */}
 <mesh ref={block2Ref} position={[0.15, 0, 0.1]} castShadow receiveShadow material={brassMat}>
 <boxGeometry args={[1.8, 0.8, 1.3]} />
 </mesh>

 {/* Block 3 — Stability (narrowest, top) */}
 <mesh ref={block3Ref} position={[-0.05, 1.2, -0.05]} castShadow receiveShadow material={sageMat}>
 <boxGeometry args={[1.2, 0.8, 1.0]} />
 </mesh>

 {/* Connecting rods — brass accent */}
 <mesh position={[0, -0.6, 0]} material={brassMat}>
 <cylinderGeometry args={[0.04, 0.04, 0.6, 8]} />
 </mesh>
 <mesh position={[0.1, 0.6, 0.05]} material={brassMat}>
 <cylinderGeometry args={[0.04, 0.04, 0.6, 8]} />
 </mesh>
 </group>
 );
}

// ========================================================
// PARTICLE FIELD — upgraded with depth and color variation
// ========================================================
function ParticleField({ count = 2000 }: { count?: number }) {
 const pointsRef = useRef<THREE.Points>(null!);

 const { positions, colors } = useMemo(() => {
 const pos = new Float32Array(count * 3);
 const col = new Float32Array(count * 3);
 const brassColor = new THREE.Color(BRAND.brass);
 const blueColor = new THREE.Color(BRAND.draftingBlue);
 const sageColor = new THREE.Color(BRAND.sage);

 for (let i = 0; i < count; i++) {
 // Spherical distribution
 const radius = 8 + Math.random() * 18;
 const theta = Math.random() * Math.PI * 2;
 const phi = Math.acos(2 * Math.random() - 1);
 
 pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
 pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
 pos[i * 3 + 2] = radius * Math.cos(phi);
 
 // Color mix — mostly brass, some blue and sage
 const rand = Math.random();
 let c;
 if (rand < 0.6) c = brassColor;
 else if (rand < 0.8) c = blueColor;
 else c = sageColor;
 
 col[i * 3] = c.r;
 col[i * 3 + 1] = c.g;
 col[i * 3 + 2] = c.b;
 }

 return { positions: pos, colors: col };
 }, [count]);

 useFrame((state) => {
 if (pointsRef.current) {
 pointsRef.current.rotation.y = state.clock.elapsedTime * 0.015;
 pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.008) * 0.05;
 
 // Subtle mouse parallax
 const mouseX = state.mouse.x * 0.1;
 const mouseY = state.mouse.y * 0.1;
 pointsRef.current.position.x += (mouseX - pointsRef.current.position.x) * 0.02;
 pointsRef.current.position.y += (mouseY - pointsRef.current.position.y) * 0.02;
 }
 });

 return (
 <Points ref={pointsRef} positions={positions} colors={colors} stride={3}>
 <PointMaterial transparent vertexColors size={0.04} sizeAttenuation depthWrite={false} opacity={0.5} />
 </Points>
 );
}

// ========================================================
// SCROLL-LINKED CAMERA RIG
// ========================================================
function CameraRig({ scrollProgress }: { scrollProgress: any }) {
 const { camera } = useThree();

 useFrame(() => {
 const sp = scrollProgress?.get() ?? 0;
 // Camera pulls back and slightly down as user scrolls
 camera.position.z = 14 + sp * 6;
 camera.position.y = 0 - sp * 2;
 camera.lookAt(0, 0, 0);
 });

 return null;
}

// ========================================================
// ANIMATED HEADLINE — character-by-character reveal
// ========================================================
function AnimatedHeadline({ text }: { text: string }) {
 return (
 <h1 className="text-balance" aria-label={text}>
 <span className="sr-only">{text}</span>
 <span aria-hidden="true">
 {text.split('').map((char, index) => (
 <motion.span
 key={index}
 initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
 animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
 transition={{ duration: 0.7, delay: 0.06 * index, ease: [0.21, 0.92, 0.26, 1] }}
 className="inline-block"
 >
 {char === ' ' ? '\u00A0' : char}
 </motion.span>
 ))}
 </span>
 </h1>
 );
}

// ========================================================
// LOADING SHIMMER — branded loading state
// ========================================================
function LoadingShimmer() {
 return (
 <div className="absolute inset-0 z-0 flex items-center justify-center bg-[var(--color-void)]">
 <div className="flex flex-col items-center gap-6">
 <motion.div
 initial={{ opacity: 0, scale: 0.8 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ duration: 0.5 }}
 className="text-3xl font-serif tracking-[0.3em] text-[var(--color-brass)]"
 >
 617
 </motion.div>
 <div className="h-[2px] w-32 overflow-hidden rounded-full bg-[var(--color-steel)]">
 <motion.div
 initial={{ x: '-100%' }}
 animate={{ x: '100%' }}
 transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
 className="h-full w-full bg-gradient-to-r from-transparent via-[var(--color-brass)] to-transparent"
 />
 </div>
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ delay: 0.3 }}
 className="text-[10px] uppercase tracking-[0.4em] text-[var(--color-ash)]"
 >
 East Trust
 </motion.div>
 </div>
 </div>
 );
}

// ========================================================
// STATIC FALLBACK — for mobile / low-perf devices
// ========================================================
function StaticHeroFallback() {
 return (
 <div className="absolute inset-0 z-0">
 {/* Gradient background */}
 <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-void)] via-[var(--color-carbon)] to-[var(--color-obsidian)]" />
 
 {/* Faux 3D keystone using CSS */}
 <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
 <div className="relative">
 {/* Bottom block — blue */}
 <div className="mx-auto h-16 w-40 rounded-sm opacity-70"
 style={{ background: `linear-gradient(135deg, ${BRAND.draftingBlue}, ${BRAND.brassDim})`,
 transform: 'perspective(400px) rotateX(15deg)', }} />

 {/* Middle block — brass */}
 <div className="mx-auto -mt-2 h-16 w-32 rounded-sm opacity-80"
 style={{ background: `linear-gradient(135deg, ${BRAND.brass}, ${BRAND.brassGlow})`,
 transform: 'perspective(400px) rotateX(15deg)', }} />

 {/* Top block — sage */}
 <div className="mx-auto -mt-2 h-16 w-24 rounded-sm opacity-60"
 style={{ background: `linear-gradient(135deg, ${BRAND.sage}, ${BRAND.brassDim})`,
 transform: 'perspective(400px) rotateX(15deg)', }} />
 </div>
 </div>

 {/* Radial overlay for text legibility */}
 <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(10,9,8,0.2)_0%,rgba(10,9,8,0.8)_70%)]" />
 </div>
 );
}

// ========================================================
// MAIN HERO COMPONENT
// ========================================================
export function Hero3D() {
 const [isMobile, setIsMobile] = useState(false);
 const [isLoaded, setIsLoaded] = useState(false);
 const containerRef = useRef<HTMLElement>(null!);

 // Scroll progress for camera and content parallax
 const { scrollYProgress } = useScroll({
 target: containerRef,
 offset: ['start start', 'end start'],
 });

 // Parallax transforms for content
 const contentY = useTransform(scrollYProgress, [0, 1], [0, 150]);
 const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
 const contentScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

 useEffect(() => {
 // Device capability detection
 const checkCapability = () => {
 const isMobileViewport = window.matchMedia('(max-width: 768px)').matches;
 const isLowPerf = !window.WebGL2RenderingContext || (navigator.hardwareConcurrency ?? 4) < 4;
 const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 setIsMobile(isMobileViewport || isLowPerf || prefersReducedMotion);
 };

 checkCapability();
 window.addEventListener('resize', checkCapability);
 return () => window.removeEventListener('resize', checkCapability);
 }, []);

 return (
 <section ref={containerRef} className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[var(--color-void)] pt-16">
 {/* === 3D SCENE === */}
 {!isMobile && (
 <div className="absolute inset-0 z-[1]">
 <Suspense fallback={<LoadingShimmer />}>
 <Canvas
 camera={{ position: [0, 0, 14], fov: 50 }}
 style={{ background: 'transparent' }}
 gl={{ 
 alpha: true, 
 antialias: true, 
 powerPreference: 'high-performance', 
 toneMapping: THREE.ACESFilmicToneMapping,
 toneMappingExposure: 1.1,
 }}
 dpr={[1, 2]}
 shadows
 onCreated={() => setIsLoaded(true)}
 >
 {/* Lighting */}
 <ambientLight intensity={0.3} />
 <directionalLight position={[8, 10, 5]} intensity={1.2} color="#ffd700" castShadow />
 <directionalLight position={[-8, 5, -5]} intensity={0.4} color={BRAND.draftingBlue} />
 <pointLight position={[0, -3, 4]} intensity={0.8} color={BRAND.brass} distance={10} />
 <spotLight position={[0, 8, 0]} angle={0.3} penumbra={0.5} intensity={0.6} color="#ffffff" />

 {/* 3D Content */}
 <KeystoneLogo scrollProgress={scrollYProgress} />
 <ParticleField count={isMobile ? 800 : 2000} />

 {/* Sparkles for depth */}
 <Sparkles count={60} scale={12} size={2} speed={0.3} color={BRAND.brassGlow} opacity={0.4} />

 {/* Environment for reflections */}
 <Environment preset="city" />

 {/* Scroll-linked camera */}
 <CameraRig scrollProgress={scrollYProgress} />

 {/* Post-processing */}
 <EffectComposer>
 <Bloom
 intensity={0.4}
 luminanceThreshold={0.6}
 luminanceSmoothing={0.9}
 mipmapBlur
 />
 <DepthOfField focusDistance={0.02} focalLength={0.05} bokehScale={2} />
 <Vignette eskil={false} offset={0.3} darkness={0.6} />
 </EffectComposer>
 </Canvas>
 </Suspense>
 </div>
 )}

 {/* === MOBILE / LOW-PERF FALLBACK === */}
 {isMobile && <StaticHeroFallback />}

 {/* === LOADING SHIMMER (desktop, before 3D hydrates) === */}
 {!isMobile && !isLoaded && <LoadingShimmer />}

 {/* === READABILITY OVERLAY === */}
 <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(10,9,8,0.12)_0%,rgba(10,9,8,0.65)_65%)] z-[2] pointer-events-none" />

 {/* === GRAIN OVERLAY === */}
 <div className="absolute inset-0 z-[3] pointer-events-none opacity-[0.025]"
 style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

 {/* === CONTENT LAYER === */}
 <motion.div 
 style={{ y: contentY, opacity: contentOpacity, scale: contentScale }}
 className="relative z-10 mx-auto max-w-5xl px-6 text-center"
 >
 {/* Pre-header badge */}
 <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mb-4 flex justify-center">
 <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs tracking-[0.12em] text-[var(--color-brass)] uppercase backdrop-blur-sm">
 {SITE.preHeader}
 </div>
 </motion.div>

 {/* Animated headline */}
 <AnimatedHeadline text="Form. Grow. Maintain." />

 {/* Thesis */}
 <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="mx-auto mt-6 max-w-2xl text-xl text-[var(--semantic-text-secondary)] tracking-tight">
 {SITE.thesis}
 </motion.p>

 {/* CTAs */}
 <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.0 }} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
 <ButtonLink href="/contact" size="lg" className="group min-w-[220px] magnetic-btn">
 Book a Free Consultation
 <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
 </ButtonLink>

 <ButtonLink href={SITE.phoneHref} variant="ghost" size="lg" className="min-w-[220px] border-white/20 text-[var(--semantic-text-primary)] hover:border-[var(--color-brass)] hover:text-[var(--color-brass)] magnetic-btn">
 <Phone className="mr-2 h-4 w-4" />
 {SITE.phone} — We answer.
 </ButtonLink>
 </motion.div>
 </motion.div>

 {/* === SCROLL INDICATOR === */}
 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} style={{ opacity: contentOpacity }} className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10">
 <div className="flex flex-col items-center gap-2">
 <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-ash)]">Scroll</span>
 <div className="h-8 w-[1px] bg-gradient-to-b from-[var(--color-brass)] to-transparent" />
 </div>
 </motion.div>

 {/* === BOTTOM FADE === */}
 <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050505] to-transparent z-[3] pointer-events-none" />
 </section>
 );
}

export default Hero3D;