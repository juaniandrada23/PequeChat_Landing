"use client";

import { useRef, Suspense } from "react";
import {
  m,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import dynamic from "next/dynamic";
import Hero from "./components/Hero";
import SectionHeading from "./components/SectionHeading";
import {
  ShieldCheck,
  Lock,
  Search,
  Bot,
  FileText,
  Users,
  Phone,
  MessageSquare,
} from "lucide-react";
import type { ReactNode } from "react";

// Lazy load heavy components for better performance
const CallToAction = dynamic(() => import("./components/CallToAction"), {
  loading: () => <div className="h-96 bg-azul8/30 animate-pulse rounded-2xl" />,
  ssr: false,
});
const DevelopmentProgress = dynamic(
  () => import("./components/DevelopmentProgress"),
  {
    loading: () => (
      <div className="h-64 bg-azul8/30 animate-pulse rounded-2xl" />
    ),
    ssr: false,
  }
);
const InteractiveDemo = dynamic(() => import("./components/InteractiveDemo"), {
  loading: () => <div className="h-96 bg-azul8/30 animate-pulse rounded-2xl" />,
  ssr: false,
});
const DeveloperFAQ = dynamic(() => import("./components/DeveloperFAQ"), {
  loading: () => <div className="h-64 bg-azul8/30 animate-pulse rounded-2xl" />,
  ssr: false,
});
const ArchitectureShowcase = dynamic(
  () => import("./components/ArchitectureShowcase"),
  {
    loading: () => (
      <div className="h-64 bg-azul8/30 animate-pulse rounded-2xl" />
    ),
    ssr: false,
  }
);
const Roadmap = dynamic(() => import("./components/Roadmap"), {
  loading: () => <div className="h-64 bg-azul8/30 animate-pulse rounded-2xl" />,
  ssr: false,
});

// Optimized animation configurations
const EASE_SMOOTH = [0.4, 0, 0.2, 1] as const;

interface AnimatedCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

const AnimatedCard = ({
  children,
  delay = 0,
  className = "",
}: AnimatedCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.45,
        delay,
        ease: EASE_SMOOTH,
      }}
      whileHover={{
        y: -3,
        transition: { duration: 0.18, ease: "easeOut" },
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </m.div>
  );
};

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="group relative will-change-transform">
    <div className="absolute inset-0 bg-gradient-to-br from-azul5/10 to-azul3/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-azul7/60 shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-azul4 to-azul2 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 will-change-transform">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-azul2 mb-3">{title}</h3>
      <p className="text-azul2/90 leading-relaxed">{description}</p>
    </div>
  </div>
);

interface ProcessStepProps {
  icon: ReactNode;
  title: string;
  description: string;
  step: number;
}

const ProcessStep = ({ icon, title, description, step }: ProcessStepProps) => (
  <div className="relative will-change-transform">
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-azul7/60 hover:shadow-md transition-shadow duration-300">
      <div className="relative">
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-azul4 to-azul2 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
          {step}
        </div>
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-azul8 to-azul7/60 flex items-center justify-center mb-6">
          <div className="text-azul2">{icon}</div>
        </div>
        <h3 className="text-xl font-semibold text-azul2 mb-3">{title}</h3>
        <p className="text-azul2/90">{description}</p>
      </div>
    </div>
  </div>
);

// Core features data
const coreFeatures = [
  {
    title: "Control Parental Inteligente",
    description: "Sistema avanzado de permisos que aprende y se adapta.",
    icon: <ShieldCheck className="text-white w-6 h-6" />,
  },
  {
    title: "Chats Ultra Seguros",
    description: "Cifrado extremo a extremo con filtrado automático.",
    icon: <Lock className="text-white w-6 h-6" />,
  },
  {
    title: "Análisis Profundo",
    description: "Dashboard con métricas y recomendaciones personalizadas.",
    icon: <Search className="text-white w-6 h-6" />,
  },
  {
    title: "IA Protectora",
    description: "Detección proactiva de riesgos en tiempo real.",
    icon: <Bot className="text-white w-6 h-6" />,
  },
  {
    title: "Informes Inteligentes",
    description: "Reportes automáticos con insights y sugerencias.",
    icon: <FileText className="text-white w-6 h-6" />,
  },
  {
    title: "Multi-Familia",
    description: "Gestión centralizada para todos tus hijos.",
    icon: <Users className="text-white w-6 h-6" />,
  },
];

const processSteps = [
  {
    icon: <Phone className="w-6 h-6" />,
    title: "Descarga la App",
    description: "Disponible en iOS y Android con instalación guiada",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Crea Perfiles",
    description: "Configura cuentas para cada miembro de la familia",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Define Reglas",
    description: "Personaliza permisos y límites según edad",
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Chat Seguro",
    description: "Comunicación protegida con supervisión inteligente",
  },
];

export default function HomePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Softer spring for smoother parallax
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 28,
    restDelta: 0.001,
  });

  const heroParallax = useTransform(smoothProgress, [0, 1], [0, -90]);

  return (
    <main
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-br from-azul8 via-white to-azul8/50 overflow-x-hidden"
    >
      {/* Subtle animated background */}
      <div className="fixed inset-0 pointer-events-none motion-reduce:hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-azul9/30 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-azul7/20 via-transparent to-transparent" />

        {/* Floating elements */}
        <m.div
          className="absolute top-20 left-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-azul6/10 to-azul5/10 blur-3xl will-change-transform"
          animate={{
            y: [0, -16, 0],
            scale: [1, 1.06, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <m.div
          className="absolute bottom-20 right-1/4 w-48 h-48 rounded-full bg-gradient-to-tr from-azul7/10 to-azul3/10 blur-3xl will-change-transform"
          animate={{
            y: [0, 16, 0],
            scale: [1, 0.94, 1],
          }}
          transition={{
            duration: 26,
            delay: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Hero Section with Parallax */}
      <m.div style={{ y: heroParallax }}>
        <Hero />
      </m.div>

      {/* Main Content */}
      <div className="relative z-10 space-y-24 pt-5 pb-0">
        {/* Features Section */}
        <section
          id="features"
          className="container mx-auto px-4 md:px-6 max-w-7xl"
        >
          <SectionHeading
            title={
              <>
                <span className="bg-gradient-to-r from-azul3 to-azul1 bg-clip-text text-transparent">
                  Tecnología de vanguardia
                </span>
                <br />
                <span className="text-azul1">para proteger a tu familia</span>
              </>
            }
            description="Suite completa de herramientas diseñadas para la seguridad digital familiar"
          />

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-16">
            {coreFeatures.map((feature, index) => (
              <AnimatedCard key={feature.title} delay={index * 0.1}>
                <FeatureCard {...feature} />
              </AnimatedCard>
            ))}
          </div>
        </section>

        {/* Process Section */}
        <section className="container mx-auto px-4 md:px-6 max-w-7xl">
          <SectionHeading
            title="Comienza en 4 pasos sencillos"
            description="Configuración rápida y guiada para toda la familia en menos de 5 minutos"
          />

          <div className="relative mt-16">
            {/* Connection line for desktop */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-azul8 hidden lg:block">
              <m.div
                className="h-full bg-gradient-to-r from-azul4 to-azul3"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, ease: "easeInOut" }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {processSteps.map((step, index) => (
                <AnimatedCard key={step.title} delay={index * 0.12}>
                  <ProcessStep {...step} step={index + 1} />
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>

        {/* Lazy loaded sections */}
        <>
          <Suspense
            fallback={
              <div className="h-64 bg-azul8/30 animate-pulse rounded-2xl mx-4" />
            }
          >
            <ArchitectureShowcase />
          </Suspense>

          <Suspense
            fallback={
              <div className="h-64 bg-azul8/30 animate-pulse rounded-2xl mx-4" />
            }
          >
            <DevelopmentProgress />
          </Suspense>

          <Suspense
            fallback={
              <div className="h-96 bg-azul8/30 animate-pulse rounded-2xl mx-4" />
            }
          >
            <InteractiveDemo />
          </Suspense>

          <Suspense
            fallback={
              <div className="h-64 bg-azul8/30 animate-pulse rounded-2xl mx-4" />
            }
          >
            <DeveloperFAQ />
          </Suspense>

          <Suspense
            fallback={
              <div className="h-64 bg-azul8/30 animate-pulse rounded-2xl mx-4" />
            }
          >
            <Roadmap />
          </Suspense>

          <Suspense
            fallback={
              <div className="h-96 bg-azul8/30 animate-pulse rounded-2xl mx-4" />
            }
          >
            <CallToAction />
          </Suspense>
        </>
      </div>
    </main>
  );
}
