"use client";
import { m } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { CheckCircle2, Clock, Circle } from "lucide-react";

interface RoadmapItem {
  title: string;
  status: "completed" | "in-progress" | "planned";
  quarter: string;
  description: string;
}

const items: RoadmapItem[] = [
  {
    title: "Inicio del proyecto",
    status: "completed",
    quarter: "Abr 2025",
    description:
      "Puesta en marcha del repositorio, definición del stack y base de configuración para frontend, backend y landing.",
  },
  {
    title: "Backend base en NestJS",
    status: "completed",
    quarter: "May 2025",
    description:
      "Módulos User, Chat, Friendship y Activity; conexión a MongoDB (Mongoose); Firebase Admin para verificación de tokens; Cache global con Redis; middleware de tracking de actividad.",
  },
  {
    title: "App principal (Vite + React)",
    status: "completed",
    quarter: "Jun 2025",
    description:
      "Infra de providers: Router, Theme, TanStack Query; ErrorBoundary y GlobalSpinner; capa Realtime condicional con WebSocket + Presence.",
  },
  {
    title: "Landing Next.js (SSR)",
    status: "completed",
    quarter: "Jul 2025",
    description:
      "Landing con App Router, secciones informativas y animaciones compatibles con SSR/hidratación.",
  },
  {
    title: "Estabilidad e hidratación",
    status: "in-progress",
    quarter: "Ago 2025",
    description:
      "Ajustes de hidratación (Footer/Hero), eliminación de aleatoriedad en SSR, afinado de scroll offset y mejoras de rendimiento visual.",
  },
  {
    title: "Dashboard analítico",
    status: "planned",
    quarter: "Q4 2025",
    description:
      "Panel de métricas para padres con insights, reportes y visualizaciones de actividad.",
  },
  {
    title: "IA de moderación",
    status: "planned",
    quarter: "Q4 2025",
    description:
      "Modelos para detección proactiva de riesgos (bullying, grooming, contenido inapropiado) en tiempo real.",
  },
];

const statusConfig = {
  completed: {
    icon: CheckCircle2,
    bgColor: "bg-azul2",
    textColor: "text-azul2",
    bgLight: "bg-azul8",
    borderColor: "border-azul7/60",
    label: "Completado",
  },
  "in-progress": {
    icon: Clock,
    bgColor: "bg-azul3",
    textColor: "text-azul3",
    bgLight: "bg-azul8",
    borderColor: "border-azul7/60",
    label: "En Progreso",
  },
  planned: {
    icon: Circle,
    bgColor: "bg-azul4",
    textColor: "text-azul4",
    bgLight: "bg-azul8",
    borderColor: "border-azul7/60",
    label: "Planeado",
  },
};

export default function Roadmap() {
  return (
    <section
      className="container mx-auto px-4 md:px-6 py-24 max-w-6xl"
      aria-label="Roadmap PequeChat"
    >
      <SectionHeading
        eyebrow="Roadmap de Desarrollo"
        title={
          <>
            <span className="text-azul2">Evolución continua del</span>
            <br />
            <span className="bg-gradient-to-r from-azul3 to-azul1 bg-clip-text text-transparent">
              ecosistema PequeChat
            </span>
          </>
        }
        description="Hitos completados y próximos desarrollos para fortalecer la seguridad familiar y mejorar la experiencia de usuario."
      />

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-azul4 via-azul3 to-azul2" />

        <div className="space-y-12">
          {items.map((item, index) => {
            const config = statusConfig[item.status];
            const Icon = config.icon;

            return (
              <m.div
                key={item.title}
                className="relative pl-20"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                {/* Timeline icon */}
                <div
                  className={`absolute left-0 top-2 flex h-16 w-16 items-center justify-center rounded-full ${config.bgColor} shadow-lg`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Content card */}
                <div
                  className={`rounded-2xl ${config.bgLight} border ${config.borderColor} p-8 hover:shadow-lg transition-all duration-300`}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-bold text-azul2 mb-2 leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-azul2/90 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Status badge */}
                    <div className="flex flex-col items-start md:items-end gap-2">
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${config.borderColor} ${config.bgLight}`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${config.bgColor}`}
                        />
                        <span
                          className={`text-sm font-medium ${config.textColor}`}
                        >
                          {config.label}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-azul3 bg-white px-3 py-1 rounded-full border border-azul7/60">
                        {item.quarter}
                      </span>
                    </div>
                  </div>

                  {/* Progress bar for in-progress items */}
                  {item.status === "in-progress" && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-azul2">
                          Progreso
                        </span>
                        <span className="text-sm text-azul3">75%</span>
                      </div>
                      <div className="w-full bg-azul7/40 rounded-full h-2">
                        <m.div
                          className="bg-gradient-to-r from-azul4 to-azul2 h-2 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: "75%" }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1,
                            delay: 0.5,
                            ease: "easeOut",
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </m.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
