"use client";

import type { MouseEvent } from "react";
import { useRef, useEffect } from "react";
import { useMotionValue, useTransform, useSpring, useScroll, useMotionTemplate, m } from "framer-motion";
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
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }
};

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Scroll parallax
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);
  const orb1Y = useTransform(scrollYProgress, [0, 1], [0, 64]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [0, 96]);

  // Mouse parallax + spotlight
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const sX = useSpring(mvX, { stiffness: 110, damping: 16, mass: 0.25 });
  const sY = useSpring(mvY, { stiffness: 110, damping: 16, mass: 0.25 });
  const ctaX = useTransform(sX, [-0.5, 0.5], [6, -6]);
  const ctaY = useTransform(sY, [-0.5, 0.5], [5, -5]);
  const orbDriftX = useTransform(sX, [-0.5, 0.5], [-8, 8]);

  const mouseXPx = useSpring(useMotionValue(0), { stiffness: 120, damping: 20, mass: 0.3 });
  const mouseYPx = useSpring(useMotionValue(0), { stiffness: 120, damping: 20, mass: 0.3 });
  const spotlightBg = useMotionTemplate`radial-gradient(480px 480px at ${mouseXPx}px ${mouseYPx}px, rgba(255,255,255,0.10), transparent 60%)`;

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
      className="relative flex min-h-screen items-center justify-center overflow-hidden transform-gpu py-[20vh]"
      aria-label="Hero PequeChat"
    >
      {/* Background with parallax */}
      <m.div className="absolute inset-0 will-change-transform" style={{ y: bgY, scale: bgScale }}>
        <Image
          src="/pequecelu.jpg"
          alt="Niños utilizando la aplicación de manera segura"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-azul1/85 via-azul2/75 to-azul3/70" />

        {/* Grain - Reducido en móvil */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-5 sm:opacity-10 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Mouse spotlight overlay - Deshabilitado en móvil */}
        <m.div 
          aria-hidden 
          className="absolute inset-0 pointer-events-none mix-blend-soft-light motion-reduce:hidden hidden sm:block" 
          style={{ background: spotlightBg }} 
        />
      </m.div>

      {/* Subtle gradient blobs - Ajustados para móvil */}
      <div className="absolute inset-0 pointer-events-none">
        <m.div
          className="absolute top-[10%] sm:top-[15%] left-[5%] sm:left-[12%] w-[20rem] sm:w-[26rem] h-[20rem] sm:h-[26rem] rounded-full bg-azul6/15 sm:bg-azul6/20 blur-3xl will-change-transform"
          style={{ y: orb1Y, x: orbDriftX }}
          animate={{ scale: [1, 1.06, 1], opacity: [0.3, 0.45, 0.3] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <m.div
          className="absolute bottom-[8%] sm:bottom-[12%] right-[8%] sm:right-[14%] w-[18rem] sm:w-[22rem] h-[18rem] sm:h-[22rem] rounded-full bg-azul5/15 sm:bg-azul5/20 blur-3xl will-change-transform"
          style={{ y: orb2Y, x: orbDriftX }}
          animate={{ scale: [1.04, 0.96, 1.04], opacity: [0.25, 0.38, 0.25] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Content - Mejorado para móvil */}
      <m.div 
        variants={container} 
        initial="hidden" 
        animate="show" 
        className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 text-center text-white"
      >
        {/* Heading - Responsive mejorado */}
        <m.div variants={fadeUp} className="mb-4 sm:mb-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6">
          <Image 
            src="/PequeLogoSinTexto.png" 
            alt="PequeChat Logo" 
            width={72} 
            height={72} 
            priority 
            className="drop-shadow-2xl sm:w-24 sm:h-24" 
          />
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
            <m.span
              className="bg-gradient-to-r from-white via-azul8 to-azul9 bg-clip-text text-transparent"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% 200%" }}
            >
              PequeChat
            </m.span>
          </h1>
        </m.div>

        {/* Decorative line - Ajustada para móvil */}
        <m.div variants={fadeUp} className="mb-6 sm:mb-8">
          <m.div
            className="h-0.5 mx-auto max-w-xs sm:max-w-md bg-gradient-to-r from-transparent via-azul6 to-transparent"
            initial={{ width: 0, opacity: 0.7 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </m.div>

        {/* Subtitle - Mejor legibilidad en móvil */}
        <m.h2 
          variants={fadeUp} 
          className="mb-4 sm:mb-6 text-base sm:text-lg md:text-2xl lg:text-3xl font-medium text-azul9 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed"
        >
          Construimos confianza y protección en cada mensaje
        </m.h2>

        {/* Description - Optimizada para móvil */}
        <m.p 
          variants={fadeUp} 
          className="mx-auto mb-8 sm:mb-10 max-w-xl sm:max-w-2xl text-sm sm:text-base md:text-lg text-azul7 leading-relaxed px-2 sm:px-0"
        >
          PequeChat ofrece control parental inteligente, supervisión respetuosa y protección activa para que los niños exploren y se comuniquen con total seguridad.
        </m.p>

        {/* CTAs - Completamente rediseñadas para móvil */}
        <m.div
          variants={fadeUp}
          className="flex flex-col items-center justify-center gap-4 sm:gap-6 will-change-transform"
          style={{ x: ctaX, y: ctaY }}
        >
          <m.a
            href="#features"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 bg-white text-azul2 px-8 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg shadow-2xl hover:shadow-azul5/25 transition-all duration-300 overflow-hidden w-full max-w-xs sm:max-w-none sm:w-auto"
          >
            <span className="relative z-10">Ver características</span>
            <m.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" />
            </m.div>
            {/* Sheen */}
            <m.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              initial={{ x: "-120%" }}
              whileHover={{ x: "120%" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </m.a>

          <m.a
            href="http://localhost:5173/login"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="relative inline-flex items-center justify-center gap-2 sm:gap-3 bg-white/15 backdrop-blur-sm text-white px-8 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg border-2 border-white/30 hover:bg-white/25 transition-all duration-300 overflow-hidden w-full max-w-xs sm:max-w-none sm:w-auto"
          >
            <span className="relative z-10">Iniciar sesión</span>
            <m.div
              className="absolute inset-0 opacity-20 sm:opacity-25"
              animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{ 
                backgroundImage: "radial-gradient(circle at 30% 50%, rgba(0,180,216,0.35) 0%, transparent 45%), radial-gradient(circle at 70% 50%, rgba(0,180,216,0.25) 0%, transparent 45%)", 
                backgroundSize: "200% 200%" 
              }}
            />
          </m.a>

          {/* Indicador de scroll para móvil */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="mt-8 sm:mt-12 flex flex-col items-center gap-2 sm:hidden"
          >
            <p className="text-xs text-azul8/80 font-medium">Desliza para explorar</p>
            <m.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center"
            >
              <m.div
                animate={{ y: [0, 12, 0], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-3 bg-white/60 rounded-full mt-2"
              />
            </m.div>
          </m.div>
        </m.div>
      </m.div>
    </section>
  );
}
