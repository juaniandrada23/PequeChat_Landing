"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { IconType } from "react-icons";
import { FaReact, FaNodeJs, FaDocker } from "react-icons/fa";
import {
  SiVite,
  SiNextdotjs,
  SiTailwindcss,
  SiFirebase,
  SiExpress,
  SiFramer,
} from "react-icons/si";

const team = [
  {
    name: "Juan Ignacio Andrada Cabo",
    role: "FrontEnd & UX/UI",
    avatar: "/team/juani.jpeg",
  },
  {
    name: "Juan Cruz Chicco",
    role: "BackEnd & DevOps",
    avatar: "/team/chivo.jpeg",
  },
  {
    name: "Agustin Freytes Oviedo",
    role: "FrontEnd & Scrum Master",
    avatar: "/team/freytes.jpeg",
  },
  {
    name: "Antonio Ramon Toledo",
    role: "FrontEnd & QA",
    avatar: "/team/tony.jpeg",
  },
  { name: "Emiliano Morales", role: "BackEnd & DBA", avatar: "/team/emi.jpeg" },
];

type Tech = { name: string; Icon: IconType };
const techs: Tech[] = [
  { name: "React", Icon: FaReact },
  { name: "Vite", Icon: SiVite },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "Tailwind CSS", Icon: SiTailwindcss },
  { name: "Firebase", Icon: SiFirebase },
  { name: "Node.js", Icon: FaNodeJs },
  { name: "Express", Icon: SiExpress },
  { name: "Framer Motion", Icon: SiFramer },
  { name: "Docker", Icon: FaDocker },
];

export default function AboutPage() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const autoplay = Autoplay({
    delay: 3000,
    stopOnInteraction: true,
    stopOnMouseEnter: true,
    playOnInit: true,
  });
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      dragFree: false,
      containScroll: "trimSnaps",
      skipSnaps: false,
    },
    [autoplay]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    const onResize = () => emblaApi.reInit();
    window.addEventListener("resize", onResize);
    return () => {
      emblaApi.off("select", onSelect);
      window.removeEventListener("resize", onResize);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  return (
    <main className="min-h-screen  bg-gradient-to-br from-azul8 via-white to-azul8/50 overflow-x-hidden">
      {/* Fondo moderno y dinámico */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        {/* Gradientes radiales base */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-azul9/30 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-azul7/20 via-transparent to-transparent" />

        {/* Scrim superior para contraste con el Header */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-azul9/80 via-azul8/50 to-transparent" />

        {/* Mesh gradient animado (4 blobs) */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            aria-hidden
            className="absolute w-[42rem] h-[42rem] -top-40 -left-40 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, rgba(59,130,246,0.22), transparent 65%)",
            }}
            animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.06, 1] }}
            transition={{ duration: 36, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="absolute w-[36rem] h-[36rem] top-1/3 -right-40 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, rgba(56,189,248,0.20), transparent 65%)",
            }}
            animate={{ x: [0, -45, 0], y: [0, 20, 0], scale: [1, 0.97, 1] }}
            transition={{
              duration: 34,
              delay: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            aria-hidden
            className="absolute w-[38rem] h-[38rem] bottom-[-10rem] left-1/4 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, rgba(14,165,233,0.16), transparent 65%)",
            }}
            animate={{ x: [0, 30, 0], y: [0, -15, 0], scale: [1, 1.03, 1] }}
            transition={{
              duration: 38,
              delay: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            aria-hidden
            className="absolute w-[40rem] h-[40rem] bottom-[-12rem] right-1/3 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, rgba(99,102,241,0.14), transparent 65%)",
            }}
            animate={{ x: [0, -25, 0], y: [0, 18, 0], scale: [1, 1.02, 1] }}
            transition={{
              duration: 42,
              delay: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Noise overlay sutil */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat",
          }}
        />

        {/* Vignette lateral para foco en el contenido */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-azul9/15 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-azul9/15 to-transparent" />
      </div>

      <div className="relative z-10 space-y-24 pt-24 pb-16">
        {/* Hero Section (mismo estilo de Home en tipografía/colores) */}
        <header className="text-center space-y-6 relative overflow-hidden">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            className="relative z-10 text-4xl md:text-6xl font-black bg-gradient-to-r from-azul1 via-azul2 to-azul3 bg-clip-text text-transparent"
          >
            Quiénes Somos
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
            className="relative z-10 mx-auto max-w-3xl text-lg md:text-xl text-azul2/90"
          >
            Somos un equipo de estudiantes de Ingeniería en Sistemas de
            Información en la UTN – FRC, construyendo PequeChat, la plataforma
            de mensajería más segura para niños.
          </motion.p>
        </header>

        {/* Nuestro Equipo (restaurado) */}
        <section className="container mx-auto px-6 max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center text-3xl md:text-4xl font-black mb-12 bg-gradient-to-r from-azul1 to-azul3 bg-clip-text text-transparent"
          >
            Nuestro Equipo
          </motion.h2>

          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {team.map(({ name, role, avatar }, index) => (
              <motion.article
                key={name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.06,
                  duration: 0.55,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -6,
                  rotate: -0.5,
                  scale: 1.02,
                  transition: { duration: 0.22, ease: "easeOut" },
                }}
                className="group flex flex-col items-center rounded-3xl bg-white/90 backdrop-blur-sm border border-azul5/20 p-6 space-y-4 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative overflow-hidden rounded-full ring-4 ring-azul8/50 group-hover:ring-azul4/50 transition-all duration-300">
                  <Image
                    src={avatar}
                    alt={name}
                    width={120}
                    height={120}
                    className="rounded-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-azul3/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-base md:text-lg font-bold text-azul1 group-hover:text-azul2 transition-colors duration-300">
                    {name}
                  </h3>
                  <p className="text-sm text-azul3 font-semibold bg-azul8/30 px-3 py-1 rounded-full">
                    {role}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Stack Tecnológico (restaurado con los mismos colores/typo de Home) */}
        <section className="container mx-auto px-6 max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center text-3xl md:text-4xl font-black mb-10 bg-gradient-to-r from-azul1 via-azul2 to-azul3 bg-clip-text text-transparent"
          >
            Stack Tecnológico
          </motion.h2>

          {/* Carrusel accesible con controles y paginación */}
          <div
            className="relative"
            role="region"
            aria-roledescription="carousel"
            aria-label="Stack Tecnológico"
          >
            <div
              ref={emblaRef}
              className="embla mx-auto w-full overflow-hidden focus:outline-none touch-pan-y select-none"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "ArrowLeft") scrollPrev();
                if (e.key === "ArrowRight") scrollNext();
              }}
            >
              <div className="embla__container flex gap-6 py-6 will-change-transform">
                {techs.map(({ name, Icon }, i) => (
                  <motion.div
                    key={name}
                    className="embla__slide flex-none min-w-[220px] sm:min-w-[260px] md:min-w-[280px] lg:min-w-[300px] p-3"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: i * 0.05,
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                  >
                    <motion.div
                      className="relative flex flex-col items-center justify-center rounded-2xl bg-white/75 backdrop-blur-sm border border-azul5/30 p-6 shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer"
                      whileHover={{
                        y: -4,
                        transition: { duration: 0.25, ease: "easeOut" },
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-azul8/15 to-azul9/15 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <Icon
                        size={56}
                        className="relative z-10 text-azul2 group-hover:text-azul1 transition-colors duration-300"
                        aria-label={name}
                      />
                      <span className="mt-3 text-azul2/90 text-sm font-medium">
                        {name}
                      </span>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Controles */}
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex items-center justify-between px-2 pointer-events-none z-20">
              <button
                type="button"
                aria-label="Anterior"
                onClick={scrollPrev}
                className="hidden sm:inline-flex pointer-events-auto items-center justify-center w-10 h-10 rounded-full bg-white/80 backdrop-blur border border-azul7/40 shadow hover:shadow-md text-azul2 hover:text-azul1 transition -ml-15"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                <span className="sr-only">Anterior</span>
              </button>
              <button
                type="button"
                aria-label="Siguiente"
                onClick={scrollNext}
                className="hidden sm:inline-flex pointer-events-auto items-center justify-center w-10 h-10 rounded-full bg-white/80 backdrop-blur border border-azul7/40 shadow hover:shadow-md text-azul2 hover:text-azul1 transition -mr-15"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
                <span className="sr-only">Siguiente</span>
              </button>
            </div>

            {/* Dots */}
            <div className="mt-4 flex justify-center gap-2">
              {scrollSnaps.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Ir al slide ${i + 1}`}
                  onClick={() => scrollTo(i)}
                  aria-current={selectedIndex === i ? "true" : undefined}
                  className={`h-2.5 rounded-full transition-all ${
                    selectedIndex === i ? "w-6 bg-azul3" : "w-2.5 bg-azul8"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Sección de seguimiento eliminada a pedido; la página queda más ligera y enfocada */}
      </div>
    </main>
  );
}
