"use client";

import { motion } from "framer-motion";
import { Code, Database, Zap, Shield, Activity, Layers } from "lucide-react";

const architectureFeatures = [
  {
    title: "Arquitectura Modular",
    description: "Sistema de módulos independientes: UserModule, ChatModule, ActivityModule y FriendshipModule",
    icon: <Layers className="w-6 h-6" />,
    color: "from-azul4 to-azul3"
  },
  {
    title: "Real-time WebSocket",
    description: "Comunicación instantánea con Socket.IO, PresenceProvider y WebSocketProvider",
    icon: <Zap className="w-6 h-6" />,
    color: "from-azul5 to-azul4"
  },
  {
    title: "Error Boundaries",
    description: "Manejo robusto de errores con boundaries extensibles en toda la aplicación",
    icon: <Shield className="w-6 h-6" />,
    color: "from-azul3 to-azul2"
  },
  {
    title: "Context Management",
    description: "AuthProvider, LoadingProvider, ThemeProvider para gestión de estado global",
    icon: <Code className="w-6 h-6" />,
    color: "from-azul6 to-azul4"
  },
  {
    title: "MongoDB Integration",
    description: "Base de datos optimizada con Mongoose y configuración avanzada de conexión",
    icon: <Database className="w-6 h-6" />,
    color: "from-azul5 to-azul3"
  },
  {
    title: "Activity Tracking",
    description: "Middleware de seguimiento de actividades aplicado a todas las rutas",
    icon: <Activity className="w-6 h-6" />,
    color: "from-azul4 to-azul2"
  }
];

export default function ArchitectureShowcase() {
  return (
    <section className="py-24 bg-gradient-to-br from-azul8 to-white">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-azul2 mb-4"
          >
            Arquitectura Técnica Avanzada
          </motion.h2>
          <p className="text-lg text-azul2/90 max-w-2xl mx-auto">
            Construido con las mejores prácticas de desarrollo moderno y tecnologías de vanguardia
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {architectureFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ 
                y: -8, 
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl from-azul5/15 to-azul3/15" />
              
              <div className="relative bg-white rounded-2xl p-8 border border-azul7/60 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-bold text-azul2 mb-3 group-hover:text-azul2 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-azul2/90 leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Technical indicator */}
                <div className="mt-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-azul3" />
                  <span className="text-xs text-azul3 font-medium">Implementado</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Code Quality Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-azul3 to-azul1 rounded-2xl p-8 md:p-12 text-white"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            Calidad y Mejores Prácticas
          </h3>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">TypeScript</div>
              <div className="text-white/80">Tipado estático completo</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">Modular</div>
              <div className="text-white/80">Arquitectura escalable</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">Real-time</div>
              <div className="text-white/80">Conexiones instantáneas</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
