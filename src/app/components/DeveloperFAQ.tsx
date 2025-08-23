"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, Code, Shield, Zap } from "lucide-react";

const faqData = [
  {
    category: "desarrollo",
    icon: <Code className="w-5 h-5" />,
    questions: [
      {
        q: "¿En qué tecnologías está construido PequeChat?",
        a: "Backend en NestJS con TypeScript, MongoDB para base de datos, Socket.IO para tiempo real. Frontend en React + TypeScript con Framer Motion para animaciones y arquitectura modular con Context Providers."
      },
      {
        q: "¿Cuál es el estado actual del proyecto?",
        a: "Tenemos la arquitectura backend completada (85%), sistema de usuarios y autenticación funcionando (90%), WebSocket y tiempo real implementado (75%), y la base frontend establecida (80%). Actualmente trabajando en funcionalidades de chat avanzadas."
      },
      {
        q: "¿Es código abierto?",
        a: "Sí, PequeChat será open source. Creemos en la transparencia, especialmente en aplicaciones que manejan la seguridad infantil."
      }
    ]
  },
  {
    category: "seguridad",
    icon: <Shield className="w-5 h-5" />,
    questions: [
      {
        q: "¿Cómo garantizan la privacidad de los datos?",
        a: "Implementamos autenticación robusta con Firebase, validación de datos en tiempo real, y seguimos las mejores prácticas de seguridad. El proyecto será open source para total transparencia."
      },
      {
        q: "¿Qué medidas de seguridad tienen implementadas?",
        a: "Error boundaries para manejo robusto de errores, middleware de tracking de actividades, validación de datos en todas las capas, y arquitectura modular que facilita auditorías de seguridad."
      }
    ]
  },
  {
    category: "funcionalidades",
    icon: <Zap className="w-5 h-5" />,
    questions: [
      {
        q: "¿Cómo funciona el sistema de tiempo real?",
        a: "Utilizamos WebSocket con Socket.IO para conexiones instantáneas, Presence Provider para estado de usuarios en línea, y React Context optimizado para gestión de estado global."
      },
      {
        q: "¿Qué módulos están disponibles actualmente?",
        a: "UserModule, ChatModule, ActivityModule, FriendshipModule todos funcionando. Cada módulo es independiente y escalable siguiendo arquitectura de microservicios."
      }
    ]
  }
];

export default function DeveloperFAQ() {
  const [activeCategory, setActiveCategory] = useState("desarrollo");
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const currentFAQ = faqData.find(cat => cat.category === activeCategory);

  return (
    <section className="py-24 bg-gradient-to-br from-azul8 to-white">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-azul2 mb-4"
          >
            Preguntas Frecuentes
          </motion.h2>
          <p className="text-lg text-azul2/90">
            Todo lo que necesitas saber sobre el desarrollo de PequeChat
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
      {faqData.map((category) => (
            <button
              key={category.category}
              onClick={() => {
                setActiveCategory(category.category);
                setOpenQuestion(null);
              }}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                activeCategory === category.category
          ? "bg-azul2 text-white shadow-lg"
          : "bg-white text-azul3 border border-azul7/60 hover:bg-azul8"
              }`}
            >
              {category.icon}
              {category.category.charAt(0).toUpperCase() + category.category.slice(1)}
            </button>
          ))}
        </div>

        {/* Questions */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {currentFAQ?.questions.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl border border-azul7/60 overflow-hidden"
            >
              <button
                onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-azul8 transition-colors"
              >
                <h3 className="font-semibold text-azul2 pr-4">{item.q}</h3>
                <motion.div
                  animate={{ rotate: openQuestion === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-azul3" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openQuestion === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-azul2/90 leading-relaxed">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
