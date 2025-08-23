"use client";

import type { MouseEvent } from "react";
import { useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring, useScroll, useMotionTemplate } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

// Clean, reliable reveal variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.25 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }
};

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Scroll parallax
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const orb1Y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [0, 120]);

  // Mouse parallax + spotlight
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const sX = useSpring(mvX, { stiffness: 120, damping: 16, mass: 0.25 });
  const sY = useSpring(mvY, { stiffness: 120, damping: 16, mass: 0.25 });
  const ctaX = useTransform(sX, [-0.5, 0.5], [8, -8]);
  const ctaY = useTransform(sY, [-0.5, 0.5], [6, -6]);
  const orbDriftX = useTransform(sX, [-0.5, 0.5], [-10, 10]);

  const mouseXPx = useSpring(useMotionValue(0), { stiffness: 120, damping: 20, mass: 0.3 });
  const mouseYPx = useSpring(useMotionValue(0), { stiffness: 120, damping: 20, mass: 0.3 });
  const spotlightBg = useMotionTemplate`radial-gradient(520px 520px at ${mouseXPx}px ${mouseYPx}px, rgba(255,255,255,0.10), transparent 60%)`;

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mvX.set((e.clientX - rect.left) / rect.width - 0.5);
    mvY.set((e.clientY - rect.top) / rect.height - 0.5);
    mouseXPx.set(e.clientX - rect.left);
    mouseYPx.set(e.clientY - rect.top);
  };

  const onMouseLeave = () => {
    mvX.set(0);
    mvY.set(0);
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      mouseXPx.set(rect.width / 2);
      mouseYPx.set(rect.height / 2);
    }
  };

  // Center spotlight on mount
  useEffect(() => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      mouseXPx.set(rect.width / 2);
      mouseYPx.set(rect.height / 2);
    }
  }, [mouseXPx, mouseYPx]);

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative flex min-h-screen items-center justify-center overflow-hidden transform-gpu"
      aria-label="Hero PequeChat"
    >
      {/* Background with parallax */}
      <motion.div className="absolute inset-0 will-change-transform" style={{ y: bgY, scale: bgScale }}>
        <Image
          src="/pequecelu.jpg"
          alt="Niños utilizando la aplicación de manera segura"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-azul1/80 via-azul2/70 to-azul3/60" />

        {/* Grain */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Mouse spotlight overlay */}
        <motion.div aria-hidden className="absolute inset-0 pointer-events-none mix-blend-soft-light" style={{ background: spotlightBg }} />
      </motion.div>

      {/* Subtle gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-[15%] left-[12%] w-[26rem] h-[26rem] rounded-full bg-azul6/20 blur-3xl will-change-transform"
          style={{ y: orb1Y, x: orbDriftX }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.55, 0.4] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[12%] right-[14%] w-[22rem] h-[22rem] rounded-full bg-azul5/20 blur-3xl will-change-transform"
          style={{ y: orb2Y, x: orbDriftX }}
          animate={{ scale: [1.04, 0.96, 1.04], opacity: [0.35, 0.48, 0.35] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Content */}
      <motion.div variants={container} initial="hidden" animate="show" className="relative z-10 mx-auto max-w-4xl px-6 text-center text-white">
        {/* Heading */}
        <motion.div variants={fadeUp} className="mb-6 flex items-center justify-center gap-4 md:gap-6">
          <Image src="/PequeLogoSinTexto.png" alt="PequeChat Logo" width={96} height={96} priority className="drop-shadow-2xl" />
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
            <motion.span
              className="bg-gradient-to-r from-white via-azul8 to-azul9 bg-clip-text text-transparent"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% 200%" }}
            >
              PequeChat
            </motion.span>
          </h1>
        </motion.div>

        {/* Decorative line */}
        <motion.div variants={fadeUp} className="mb-8">
          <motion.div
            className="h-0.5 mx-auto max-w-md bg-gradient-to-r from-transparent via-azul6 to-transparent"
            initial={{ width: 0, opacity: 0.7 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />
        </motion.div>

        {/* Subtitle */}
        <motion.h2 variants={fadeUp} className="mb-6 text-lg md:text-2xl lg:text-3xl font-medium text-azul9 max-w-3xl mx-auto">
          Construimos confianza y protección en cada mensaje
        </motion.h2>

        {/* Description */}
        <motion.p variants={fadeUp} className="mx-auto mb-10 max-w-2xl text-base md:text-lg text-azul7 leading-relaxed">
          PequeChat ofrece control parental inteligente, supervisión respetuosa y protección activa para que los niños exploren y se comuniquen con total seguridad.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 will-change-transform"
          style={{ x: ctaX, y: ctaY }}
        >
          <motion.a
            href="#features"
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="group relative inline-flex items-center gap-3 bg-white text-azul2 px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-azul5/25 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10">Ver características</span>
            <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
              <ArrowRight className="w-5 h-5 relative z-10" />
            </motion.div>
            {/* Sheen */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              initial={{ x: "-120%" }}
              whileHover={{ x: "120%" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </motion.a>

          <motion.a
            href="http://localhost:5173/login"
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="relative inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white px-10 py-5 rounded-2xl font-semibold text-lg border-2 border-white/20 hover:bg-white/20 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10">Iniciar sesión</span>
            <motion.div
              className="absolute inset-0 opacity-25"
              animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{ backgroundImage: "radial-gradient(circle at 30% 50%, rgba(0,180,216,0.35) 0%, transparent 45%), radial-gradient(circle at 70% 50%, rgba(0,180,216,0.25) 0%, transparent 45%)", backgroundSize: "200% 200%" }}
            />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
