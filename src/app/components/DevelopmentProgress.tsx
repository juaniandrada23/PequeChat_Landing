"use client";

import { m } from "framer-motion";
import { CheckCircle2, Code, Database, Shield, Zap } from "lucide-react";

const developmentStatus = [
  {
    module: "Backend Architecture",
    progress: 85,
    status: "completed",
    features: ["NestJS Modular Structure", "MongoDB Integration", "User Authentication", "Module System"],
    icon: <Database className="w-5 h-5" />
  },
  {
    module: "Frontend Core", 
    progress: 80,
    status: "in-progress",
    features: ["React + TypeScript", "Context Providers", "Error Boundaries", "Routing System"],
    icon: <Code className="w-5 h-5" />
  },
  {
    module: "Real-time Features",
    progress: 75,
    status: "in-progress", 
    features: ["WebSocket Integration", "Presence System", "Live Chat", "Real-time Updates"],
    icon: <Zap className="w-5 h-5" />
  },
  {
    module: "User Management",
    progress: 90,
    status: "completed",
    features: ["User Module", "Profile Management", "Friend System", "Activity Tracking"],
    icon: <Shield className="w-5 h-5" />
  }
];

export default function DevelopmentProgress() {
  return (
    <section className="py-24 bg-gradient-to-br from-azul8 to-white">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="text-center mb-16">
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-azul2 mb-4"
          >
            Estado Actual del Desarrollo
          </m.h2>
          <p className="text-lg text-azul2/90 max-w-2xl mx-auto">
            Progreso transparente de cada módulo y funcionalidad
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {developmentStatus.map((item, index) => (
            <m.div
              key={item.module}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-white rounded-2xl p-6 border border-azul7/60 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-azul7/40 flex items-center justify-center text-azul3">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-azul2">{item.module}</h3>
                    <span className="text-sm text-azul3 font-medium">{item.progress}% completado</span>
                  </div>
                </div>
                {item.status === "completed" && (
                  <CheckCircle2 className="w-5 h-5 text-azul3" />
                )}
              </div>

              <div className="mb-4">
                <div className="w-full bg-azul7/40 rounded-full h-2">
                  <m.div
                    className="bg-gradient-to-r from-azul4 to-azul2 h-2 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                {item.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-azul2/90">
                    <div className="w-1.5 h-1.5 rounded-full bg-azul4" />
                    {feature}
                  </div>
                ))}
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
