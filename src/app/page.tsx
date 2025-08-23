"use client";

import { useRef, Suspense } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import Hero from "./components/Hero";
import SectionHeading from "./components/SectionHeading";
import { 
  ShieldCheck, Lock, Search, Bot, FileText, Users, 
  Activity, Shield, Sparkles, Zap, Phone, MessageSquare
} from "lucide-react";
import type { ReactNode } from "react";

// Lazy load heavy components for better performance
const CallToAction = dynamic(() => import("./components/CallToAction"), {
  loading: () => <div className="h-96 bg-azul8 animate-pulse rounded-2xl" />
});
const DevelopmentProgress = dynamic(() => import("./components/DevelopmentProgress"), {
  loading: () => <div className="h-64 bg-azul8 animate-pulse rounded-2xl" />
});
const InteractiveDemo = dynamic(() => import("./components/InteractiveDemo"), {
  loading: () => <div className="h-96 bg-azul8 animate-pulse rounded-2xl" />
});
const DeveloperFAQ = dynamic(() => import("./components/DeveloperFAQ"), {
  loading: () => <div className="h-64 bg-azul8 animate-pulse rounded-2xl" />
});
const ArchitectureShowcase = dynamic(() => import("./components/ArchitectureShowcase"), {
  loading: () => <div className="h-64 bg-azul8 animate-pulse rounded-2xl" />
});
const Roadmap = dynamic(() => import("./components/Roadmap"), {
  loading: () => <div className="h-64 bg-azul8 animate-pulse rounded-2xl" />
});

// Optimized animation configurations
const EASE_SMOOTH = [0.4, 0, 0.2, 1] as const;

interface AnimatedCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

const AnimatedCard = ({ children, delay = 0, className = "" }: AnimatedCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay,
        ease: EASE_SMOOTH,
      }}
      whileHover={{ 
        y: -4,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
};

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="group relative">
    <div className="absolute inset-0 bg-gradient-to-br from-azul5/10 to-azul3/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-azul7/60 shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-azul4 to-azul2 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
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
  <div className="relative">
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

// Data with blue-themed styling
const coreFeatures = [
  { 
    title: "Control Parental Inteligente", 
    description: "Sistema avanzado de permisos con IA que aprende patrones de uso seguros.", 
    icon: <ShieldCheck className="text-white w-6 h-6" />
  },
  { 
    title: "Chats Ultra Seguros", 
    description: "Cifrado de extremo a extremo con filtrado automático en tiempo real.", 
    icon: <Lock className="text-white w-6 h-6" />
  },
  { 
    title: "Análisis Profundo", 
    description: "Dashboard con métricas detalladas y recomendaciones personalizadas.", 
    icon: <Search className="text-white w-6 h-6" />
  },
  { 
    title: "IA Protectora", 
    description: "Detección proactiva de riesgos con modelos de aprendizaje continuo.", 
    icon: <Bot className="text-white w-6 h-6" />
  },
  { 
    title: "Informes Inteligentes", 
    description: "Reportes automáticos con insights y sugerencias de mejora.", 
    icon: <FileText className="text-white w-6 h-6" />
  },
  { 
    title: "Multi-Familia", 
    description: "Gestión centralizada para todos tus hijos con perfiles individuales.", 
    icon: <Users className="text-white w-6 h-6" />
  },
];

const processSteps = [
  {
    icon: <Phone className="w-6 h-6" />,
    title: "Descarga la App",
    description: "Disponible en iOS y Android con instalación guiada"
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Crea Perfiles",
    description: "Configura cuentas para cada miembro de la familia"
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Define Reglas",
    description: "Personaliza permisos y límites según edad"
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Chat Seguro",
    description: "Comunicación protegida con supervisión inteligente"
  }
];

export default function HomePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const heroParallax = useTransform(smoothProgress, [0, 1], [0, -100]);

  return (
    <main
      ref={containerRef}
  className="relative min-h-screen bg-gradient-to-br from-azul8 via-white to-azul8/50 overflow-x-hidden"
    >
      {/* Subtle animated background */}
      <div className="fixed inset-0 pointer-events-none">
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-azul9/30 via-transparent to-transparent" />
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-azul7/20 via-transparent to-transparent" />
        
        {/* Floating elements */}
        <motion.div
          className="absolute top-20 left-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-azul6/10 to-azul5/10 blur-3xl"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-20 right-1/4 w-48 h-48 rounded-full bg-gradient-to-tr from-azul7/10 to-azul3/10 blur-3xl"
          animate={{
            y: [0, 20, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 25,
            delay: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Hero Section with Parallax */}
      <motion.div style={{ y: heroParallax }}>
        <Hero />
      </motion.div>

      {/* Main Content */}
  <div className="relative z-10 space-y-24 pt-20 pb-0">
        
        {/* Features Section */}
        <section id="features" className="container mx-auto px-4 md:px-6 max-w-7xl">
          <SectionHeading
            eyebrow="Características Principales"
            title={
              <>
                <span className="bg-gradient-to-r from-azul3 to-azul1 bg-clip-text text-transparent">
                  Tecnología de vanguardia
                </span>
                <br />
                <span className="text-azul1">para proteger a tu familia</span>
              </>
            }
            description="Suite completa de herramientas diseñadas con IA y machine learning para la seguridad digital familiar"
          />
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-16">
            {coreFeatures.map((feature, index) => (
              <AnimatedCard key={feature.title} delay={index * 0.1}>
                <FeatureCard {...feature} />
              </AnimatedCard>
            ))}
          </div>
        </section>

        {/* Estado del Proyecto (basado en código actual) */}
  <section className="container mx-auto px-4 md:px-6 max-w-7xl">
          <SectionHeading
            eyebrow="Estado del Proyecto"
            title={
              <>
                <span className="bg-gradient-to-r from-azul3 to-azul1 bg-clip-text text-transparent">
                  Situación actual al 21 de agosto de 2025
                </span>
              </>
            }
            description="Resumen fiel de lo implementado hoy en PequeChat (según repositorio)"
          />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-10">
            <div className="bg-white rounded-2xl p-6 border border-azul7/60 shadow-sm">
              <h3 className="text-lg font-semibold text-azul2 mb-3">Frontend App (Vite + React)</h3>
              <ul className="list-disc list-inside text-azul2/90 space-y-1">
                <li>Router: React Router</li>
                <li>Data: TanStack Query con Devtools en desarrollo</li>
                <li>AuthProvider propio (cliente) + ThemeProvider</li>
                <li>Realtime: WebSocketProvider + PresenceProvider solo si hay usuario</li>
                <li>ErrorBoundary y GlobalSpinner integrados</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-azul7/60 shadow-sm">
              <h3 className="text-lg font-semibold text-azul2 mb-3">Backend (NestJS)</h3>
              <ul className="list-disc list-inside text-azul2/90 space-y-1">
                <li>Módulos: User, Chat, Friendship, Activity, Common</li>
                <li>MongoDB vía Mongoose (MONGO_URI)</li>
                <li>Cache global con Redis (cache-manager-redis-store, TTL 300s)</li>
                <li>Firebase Admin para verificación de tokens JWT</li>
                <li>Middleware de tracking de actividad aplicado a todas las rutas</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-azul7/60 shadow-sm">
              <h3 className="text-lg font-semibold text-azul2 mb-3">Landing (este sitio)</h3>
              <ul className="list-disc list-inside text-azul2/90 space-y-1">
                <li>Next.js App Router (SSR) para la landing</li>
                <li>Animaciones cuidadas para SSR/hidratación</li>
                <li>Secciones informativas en base al código real</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-azul3 to-azul2" />
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full bg-repeat" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='7'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }} />
          </div>
          
          <div className="relative container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE_SMOOTH }}
                className="text-3xl md:text-4xl font-bold text-white mb-4"
              >
                Tecnología que marca la diferencia
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6, ease: EASE_SMOOTH }}
                className="text-azul9 text-lg max-w-2xl mx-auto"
              >
                Construido con las mejores tecnologías para garantizar una experiencia segura y confiable
              </motion.p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {[
                { title: "Next.js", description: "Landing SSR", icon: <Zap className="w-5 h-5" /> },
                { title: "Vite + React", description: "App principal", icon: <Zap className="w-5 h-5" /> },
                { title: "NestJS", description: "Backend modular", icon: <Shield className="w-5 h-5" /> },
                { title: "MongoDB", description: "Persistencia", icon: <Activity className="w-5 h-5" /> },
                { title: "Socket.IO", description: "Tiempo real", icon: <Lock className="w-5 h-5" /> },
                { title: "Firebase Admin", description: "Auth server-side", icon: <ShieldCheck className="w-5 h-5" /> },
              ].map((tech, index) => (
                <motion.div
                  key={tech.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5, ease: EASE_SMOOTH }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm mb-4 border border-azul8/30">
                    <div className="text-white">{tech.icon}</div>
                  </div>
                  <div className="text-xl font-bold text-white mb-2">
                    {tech.title}
                  </div>
                  <div className="text-azul9 font-medium">{tech.description}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="container mx-auto px-4 md:px-6 max-w-7xl">
          <SectionHeading
            eyebrow="Proceso Simple"
            title="Comienza en 4 pasos sencillos"
            description="Configuración rápida y guiada para toda la familia en menos de 5 minutos"
          />
          
          <div className="relative mt-16">
            {/* Connection line for desktop */}
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-azul8 hidden lg:block">
              <motion.div
        className="h-full bg-gradient-to-r from-azul4 to-azul3"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {processSteps.map((step, index) => (
                <AnimatedCard key={step.title} delay={index * 0.15}>
                  <ProcessStep {...step} step={index + 1} />
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="relative py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="relative bg-gradient-to-br from-azul3 via-azul2 to-azul1 rounded-3xl p-12 md:p-20 overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="w-full h-full bg-repeat" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20z'/%3E%3C/g%3E%3C/svg%3E")`
                }} />
              </div>
              
              <motion.div
                className="relative z-10 text-center text-white"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE_SMOOTH }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5, ease: "backOut" }}
                >
                  <Sparkles className="w-12 h-12 mx-auto mb-6 text-azul9" />
                </motion.div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  La seguridad que tu familia merece
                </h2>
                <p className="text-xl text-azul9 max-w-3xl mx-auto mb-12 leading-relaxed">
                  Únete a miles de familias que ya confían en PequeChat para mantener 
                  a sus hijos seguros en el mundo digital
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-azul2 px-8 py-4 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    Comenzar Ahora
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold border border-azul8/40 hover:bg-white/30 transition-all duration-300"
                  >
                    Ver Demo
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Lazy loaded sections */}
  <Suspense fallback={<div className="h-64 bg-azul8 animate-pulse rounded-2xl mx-4" />}>
          <ArchitectureShowcase />
        </Suspense>

  <Suspense fallback={<div className="h-64 bg-azul8 animate-pulse rounded-2xl mx-4" />}>
          <DevelopmentProgress />
        </Suspense>

  <Suspense fallback={<div className="h-96 bg-azul8 animate-pulse rounded-2xl mx-4" />}>
          <InteractiveDemo />
        </Suspense>

  <Suspense fallback={<div className="h-64 bg-azul8 animate-pulse rounded-2xl mx-4" />}>
          <DeveloperFAQ />
        </Suspense>

  <Suspense fallback={<div className="h-64 bg-azul8 animate-pulse rounded-2xl mx-4" />}>
          <Roadmap />
        </Suspense>
        
  <Suspense fallback={<div className="h-96 bg-azul8 animate-pulse rounded-2xl mx-4" />}>
          <CallToAction />
        </Suspense>
      </div>
    </main>
  );
}
