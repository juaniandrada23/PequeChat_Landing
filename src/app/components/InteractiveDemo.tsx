"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Monitor, Smartphone, Code2, ExternalLink, MessageCircle, Shield, Users } from "lucide-react";

export default function InteractiveDemo() {
  const [activeView, setActiveView] = useState<"desktop" | "mobile">("desktop");

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
      className="text-3xl md:text-4xl font-bold text-azul2 mb-4"
          >
            PequeChat en Funcionamiento
          </motion.h2>
    <p className="text-lg text-azul2/90 max-w-2xl mx-auto mb-8">
            Explora nuestra aplicación real con interfaz moderna y funcionalidades avanzadas
          </p>

          {/* Device Toggle */}
    <div className="inline-flex items-center gap-1 p-1 bg-azul7/30 rounded-xl">
            <button
              onClick={() => setActiveView("desktop")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeView === "desktop" 
      ? "bg-white text-azul2 shadow-sm" 
      : "text-azul3 hover:text-azul2"
              }`}
            >
              <Monitor className="w-4 h-4" />
              Desktop
            </button>
            <button
              onClick={() => setActiveView("mobile")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeView === "mobile" 
      ? "bg-white text-azul2 shadow-sm" 
      : "text-azul3 hover:text-azul2"
              }`}
            >
              <Smartphone className="w-4 h-4" />
              Mobile
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Product Screenshots */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className={`relative ${
              activeView === "mobile" ? "max-w-sm mx-auto" : ""
            }`}>
              {/* Device Frame */}
              <div className={`relative bg-gray-900 rounded-2xl shadow-2xl overflow-hidden ${
                activeView === "mobile" 
                  ? "p-2" 
                  : "p-4"
              }`}>
                {/* Browser/App Chrome */}
                <div className={`flex items-center gap-2 mb-4 ${
                  activeView === "mobile" ? "px-4 py-2" : "px-4 py-3"
                }`}>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="flex-1 text-center text-gray-400 text-sm">
                    localhost:5173 - PequeChat
                  </div>
                </div>

                {/* Product Screenshot Placeholder */}
                <motion.div
                  key={activeView}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`bg-gradient-to-br from-azul8 to-azul7/60 rounded-lg overflow-hidden ${
                    activeView === "mobile" 
                      ? "aspect-[9/16]" 
                      : "aspect-[16/10]"
                  }`}
                >
                  {/* Aquí irían las imágenes reales de tu producto */}
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-azul8 to-white">
                    <div className="w-16 h-16 rounded-full bg-azul3 flex items-center justify-center mb-4">
                      <MessageCircle className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-azul2 mb-2">
                      {activeView === "desktop" ? "Interfaz Desktop" : "Interfaz Mobile"}
                    </h3>
                    <p className="text-azul2/90 text-center text-sm">
                      {activeView === "desktop" 
                        ? "Dashboard completo con todas las funcionalidades"
                        : "App móvil optimizada para padres e hijos"
                      }
                    </p>
                    
                    {/* Mock UI Elements */}
                    <div className="mt-6 w-full space-y-3">
                      <div className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm">
                        <Shield className="w-4 h-4 text-azul3" />
                        <span className="text-sm text-gray-700">Conexión Segura</span>
                      </div>
                      <div className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm">
                        <Users className="w-4 h-4 text-azul4" />
                        <span className="text-sm text-gray-700">WebSocket Activo</span>
                      </div>
                      <div className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm">
                        <MessageCircle className="w-4 h-4 text-azul2" />
                        <span className="text-sm text-gray-700">Chat en Tiempo Real</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Device Shadow */}
              <div className="absolute inset-0 bg-black/10 rounded-2xl transform translate-y-2 translate-x-2 -z-10" />
            </div>
          </motion.div>

          {/* Features Description */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Code2 className="w-6 h-6 text-azul3 mt-1" />
                <div>
                  <h3 className="font-semibold text-azul2 mb-1">
                    Arquitectura React + TypeScript
                  </h3>
                  <p className="text-azul2/90 text-sm">
                    Frontend moderno con Context Providers, Error Boundaries y routing optimizado
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageCircle className="w-6 h-6 text-azul3 mt-1" />
                <div>
                  <h3 className="font-semibold text-azul2 mb-1">
                    WebSocket en Tiempo Real
                  </h3>
                  <p className="text-azul2/90 text-sm">
                    Comunicación instantánea con Socket.IO y sistema de presencia de usuarios
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-azul3 mt-1" />
                <div>
                  <h3 className="font-semibold text-azul2 mb-1">
                    Backend NestJS Modular
                  </h3>
                  <p className="text-azul2/90 text-sm">
                    API robusta con módulos independientes: User, Chat, Activity y Friendship
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Monitor className="w-6 h-6 text-azul3 mt-1" />
                <div>
                  <h3 className="font-semibold text-azul2 mb-1">
                    Responsive Design
                  </h3>
                  <p className="text-azul2/90 text-sm">
                    Interfaz adaptativa que funciona perfectamente en desktop y mobile
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <motion.a
                href="http://localhost:5173/login"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-azul2 text-white px-6 py-3 rounded-xl font-medium hover:bg-azul1 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Probar App
              </motion.a>
              
              <motion.a
                href="https://github.com/Agustin-98/Proyecto-Final-PequeChat"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 border border-azul2 text-azul2 px-6 py-3 rounded-xl font-medium hover:bg-azul8 transition-colors"
              >
                <Code2 className="w-4 h-4" />
                Ver Código
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
