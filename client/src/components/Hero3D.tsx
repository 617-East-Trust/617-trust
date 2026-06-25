import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { SITE } from "@/lib/siteData";

/* ─── Particle Field ─── */
function ParticleField() {
  const ref = useRef<THREE.Points>(null!);

  const particles = useMemo(() => {
    const count = 2000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.04;
      ref.current.rotation.y = state.clock.elapsedTime * 0.06;
    }
  });

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#c8853a"
        size={0.018}
        sizeAttenuation
        depthWrite={false}
        opacity={0.5}
      />
    </Points>
  );
}

/* ─── Animated Headline ─── */
const line1 = "Technology Builds Fast.";
const line2 = "People Build Trust.";

function AnimatedHeadline() {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.025 } },
  };
  const charVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <motion.h1
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="text-balance"
      aria-label={`${line1} ${line2}`}
    >
      <span className="block text-[var(--color-chalk)]">
        {line1.split("").map((char, i) => (
          <motion.span key={`l1-${i}`} variants={charVariants} style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}>
            {char}
          </motion.span>
        ))}
      </span>
      <span className="block text-[var(--color-brass)]">
        {line2.split("").map((char, i) => (
          <motion.span key={`l2-${i}`} variants={charVariants} style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}>
            {char}
          </motion.span>
        ))}
      </span>
    </motion.h1>
  );
}

/* ─── Hero Section ─── */
export default function Hero3D() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[var(--color-void)]">
      {/* 3D Canvas — full bleed background */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 4], fov: 60 }}
          gl={{ antialias: false, alpha: true }}
          dpr={[1, 1.5]}
        >
          <ParticleField />
        </Canvas>
        {/* Radial gradient vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.95) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        {/* Pre-header */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="eyebrow mb-8"
        >
          Powered by Technology. Delivered by People.
        </motion.p>

        {/* Animated headline */}
        <div className="max-w-5xl">
          <AnimatedHeadline />
        </div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.4 }}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--color-fog)] text-pretty"
        >
          Based in Charlotte, North Carolina — from the banking towers of Uptown
          to the Sandhills where we call home. 617 East Trust combines modern
          technical expertise with old-fashioned human partnership to form, fund,
          and grow your business.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.7 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 items-start sm:items-center"
        >
          <ButtonLink href="/contact" size="lg">
            Start With a Conversation <ArrowRight size={18} />
          </ButtonLink>
          <div className="flex items-center gap-2 text-[var(--color-fog)]">
            <Phone size={16} className="text-[var(--color-brass)]" />
            <a
              href={SITE.phoneHref}
              className="text-sm font-medium hover:text-[var(--color-chalk)] transition-colors"
            >
              Or call us: {SITE.phone} — We answer.
            </a>
          </div>
        </motion.div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.0 }}
          className="mt-20 grid sm:grid-cols-3 gap-4"
        >
          {SITE.testimonials.slice(0, 3).map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.1 + i * 0.15 }}
              className="card-cinematic p-6"
            >
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, si) => (
                  <svg key={si} width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1L7.545 4.13L11 4.635L8.5 7.07L9.09 10.51L6 8.885L2.91 10.51L3.5 7.07L1 4.635L4.455 4.13L6 1Z" fill="#c8853a" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-[var(--color-fog)] italic leading-relaxed">"{t.quote}"</p>
              <p className="mt-3 font-mono text-[10px] tracking-[0.06em] text-[var(--color-ash)] uppercase">
                — {t.name}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 inset-x-0 h-32 pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, transparent, var(--color-void))" }}
      />
    </section>
  );
}
