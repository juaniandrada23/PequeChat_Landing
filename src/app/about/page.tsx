"use client";

import { m } from "framer-motion";
import Image from "next/image";
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
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

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
  // Configuración del carousel con autoplay
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: 'start',
      containScroll: 'trimSnaps',
      dragFree: false,
      skipSnaps: false,
      duration: 60
    },
    [Autoplay({ delay: 2500, stopOnInteraction: false, stopOnMouseEnter: false, playOnInit: true })]
  );

  // Reiniciar autoplay cuando el mouse sale del carousel
  const handleMouseLeave = () => {
    if (emblaApi) {
      emblaApi.plugins().autoplay?.play();
    }
  };

  return (
    <main className="min-h-screen  bg-gradient-to-br from-azul8 via-white to-azul8/50 overflow-x-hidden">
      {/* Fondo moderno y dinámico */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        {/* Gradientes radiales base */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-azul9/30 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-azul7/20 via-transparent to-transparent" />

        {/* Scrim superior para contraste con el Header */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-azul9/80 via-azul8/50 to-transparent" />

        {/* Mesh gradient animado optimizado (4 blobs) */}
        <div className="absolute inset-0 overflow-hidden motion-reduce:hidden">
          <m.div
            aria-hidden
            className="absolute w-[42rem] h-[42rem] -top-40 -left-40 rounded-full blur-3xl will-change-transform max-sm:hidden"
            style={{
              background:
                "radial-gradient(closest-side, rgba(59,130,246,0.22), transparent 65%)",
            }}
            animate={{ x: [0, 36, 0], y: [0, -24, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 40, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
          />
          <m.div
            aria-hidden
            className="absolute w-[36rem] h-[36rem] top-1/3 -right-40 rounded-full blur-3xl will-change-transform max-sm:hidden"
            style={{
              background:
                "radial-gradient(closest-side, rgba(56,189,248,0.20), transparent 65%)",
            }}
            animate={{ x: [0, -40, 0], y: [0, 18, 0], scale: [1, 0.98, 1] }}
            transition={{
              duration: 45,
              delay: 5,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "reverse"
            }}
          />
          <m.div
            aria-hidden
            className="absolute w-[38rem] h-[38rem] bottom-[-10rem] left-1/4 rounded-full blur-3xl will-change-transform max-sm:hidden"
            style={{
              background:
                "radial-gradient(closest-side, rgba(14,165,233,0.16), transparent 65%)",
            }}
            animate={{ x: [0, 24, 0], y: [0, -12, 0], scale: [1, 1.02, 1] }}
            transition={{
              duration: 50,
              delay: 10,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "reverse"
            }}
          />
          <m.div
            aria-hidden
            className="absolute w-[40rem] h-[40rem] bottom-[-12rem] right-1/3 rounded-full blur-3xl will-change-transform max-sm:hidden"
            style={{
              background:
                "radial-gradient(closest-side, rgba(99,102,241,0.14), transparent 65%)",
            }}
            animate={{ x: [0, -22, 0], y: [0, 14, 0], scale: [1, 1.02, 1] }}
            transition={{
              duration: 55,
              delay: 2,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "reverse"
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

      <div className="relative z-10 space-y-24 pt-[20vh] pb-16">
        {/* Hero Section optimizado */}
        <header className="text-center space-y-6 relative overflow-hidden">
          <m.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative z-10 text-4xl md:text-6xl font-black bg-gradient-to-r from-azul1 via-azul2 to-azul3 bg-clip-text text-transparent will-change-transform"
          >
            Quiénes Somos
          </m.h1>
          <m.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
            className="relative z-10 mx-auto max-w-3xl text-lg md:text-xl text-azul2/90 px-[5vh] will-change-transform"
          >
            Somos un equipo de estudiantes de Ingeniería en Sistemas de
            Información en la UTN – FRC, construyendo PequeChat, la plataforma
            de mensajería más segura para niños.
          </m.p>
        </header>

        {/* Nuestro Equipo optimizado */}
        <section className="container mx-auto px-6 max-w-7xl">
          <m.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="text-center text-3xl md:text-4xl font-black mb-12 bg-gradient-to-r from-azul1 to-azul3 bg-clip-text text-transparent will-change-transform"
          >
            Nuestro Equipo
          </m.h2>

          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {team.map(({ name, role, avatar }, index) => (
              <m.article
                key={name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{
                  delay: index * 0.05,
                  duration: 0.3,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -3,
                  scale: 1.01,
                  transition: { duration: 0.15, ease: "easeOut" },
                }}
                className="group flex flex-col items-center rounded-3xl bg-white/90 backdrop-blur-sm border border-azul5/20 p-6 space-y-4 shadow-lg hover:shadow-xl transition-shadow duration-200 will-change-transform"
              >
                <div className="relative overflow-hidden rounded-full ring-4 ring-azul8/50 group-hover:ring-azul4/50 transition-colors duration-200">
                  <Image
                    src={avatar}
                    alt={name}
                    width={120}
                    height={120}
                    className="rounded-full object-cover transition-transform duration-300 group-hover:scale-105 will-change-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-azul3/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full" />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-base md:text-lg font-bold text-azul1 group-hover:text-azul2 transition-colors duration-200">
                    {name}
                  </h3>
                  <p className="text-sm text-azul3 font-semibold bg-azul8/30 px-3 py-1 rounded-full">
                    {role}
                  </p>
                </div>
              </m.article>
            ))}
          </div>
        </section>

        {/* Stack Tecnológico - Carousel Infinito con Embla */}
        <section className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center text-2xl sm:text-3xl md:text-4xl font-black mb-8 sm:mb-12 bg-gradient-to-r from-azul1 via-azul2 to-azul3 bg-clip-text text-transparent"
          >
            Stack Tecnológico
          </m.h2>

            {/* Embla Carousel Container */}
            <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 md:w-24 bg-gradient-to-r from-azul8/40 via-azul8/15 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 md:w-24 bg-gradient-to-l from-azul8/40 via-azul8/15 to-transparent z-10 pointer-events-none" />

            <div className="overflow-hidden" ref={emblaRef} onMouseLeave={handleMouseLeave}>
              <div className="flex">
              {/* Duplicamos las tecnologías para efecto infinito */}
              {[...techs, ...techs].map(({ name, Icon }, index) => (
              <div
              key={`tech-${index}`}
              className="flex-[0_0_auto] min-w-0 mr-3 sm:mr-6 md:mr-8"
              >
              <m.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: (index % techs.length) * 0.1,
                  duration: 0.4,
                  ease: "easeOut"
                }}
                whileHover={{
                  y: -8,
                  scale: 1.05,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                className="group relative flex flex-col items-center justify-center rounded-xl sm:rounded-2xl md:rounded-3xl bg-gradient-to-br from-white/80 via-white/70 to-white/60 backdrop-blur-xl border border-azul5/15 hover:border-azul4/30 p-4 sm:p-8 md:p-12 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer h-[16vh] min-h-[140px] sm:h-[18vh] sm:min-h-[160px] w-32 sm:w-44 md:w-56 will-change-transform"
              >
                {/* Efecto de brillo animado */}
                <div className="absolute inset-0 bg-gradient-to-br from-azul8/3 via-azul7/6 to-azul9/8 rounded-xl sm:rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                
                {/* Overlay con gradiente dinámico más sutil */}
                <div className="absolute inset-0 bg-gradient-to-t from-azul3/3 via-transparent to-azul2/3 rounded-xl sm:rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Icono con animación mejorada */}
                <m.div
                  whileHover={{ 
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.4, ease: "easeInOut" }
                  }}
                  className="relative z-10 mb-2 sm:mb-4 md:mb-5"
                >
                  <Icon
                    className="text-azul2 group-hover:text-azul1 transition-all duration-300 w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 drop-shadow-sm"
                    aria-label={name}
                  />
                </m.div>
                
                {/* Texto con tipografía mejorada */}
                <span className="relative z-10 text-azul2/90 group-hover:text-azul1 text-sm sm:text-base md:text-lg font-semibold text-center leading-tight transition-colors duration-300 px-1">
                  {name}
                </span>
                
                {/* Indicador de interacción sutil */}
                <div className="absolute bottom-2 sm:bottom-3 left-1/2 transform -translate-x-1/2 w-4 sm:w-8 h-0.5 bg-gradient-to-r from-transparent via-azul4/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
              </m.div>
              </div>
              ))}
              </div>
            </div>
            </div>

          {/* Descripción adicional */}
          <m.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
            className="text-center text-sm sm:text-base text-azul2/80 mt-8 sm:mt-12 max-w-2xl mx-auto px-4"
          >
            Utilizamos tecnologías modernas y robustas para garantizar la mejor experiencia de usuario y la máxima seguridad en nuestra plataforma.
          </m.p>
        </section>

        {/* Sección de seguimiento eliminada para aligerar la página */}
      </div>
    </main>
  );
}
