"use client";

import { m } from "framer-motion";
import Image from "next/image";
import { Check, MessageCircle } from "lucide-react";

const easeConfig = [0.4, 0, 0.2, 1];

export default function CallToAction() {
  return (
    <section
      className="relative overflow-hidden py-20 md:py-32"
      aria-label="Llamado a la acción PequeChat"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/peques.jpg"
          alt="Familias conectadas de manera segura"
          fill
          className="object-cover"
          loading="lazy"
          sizes="100vw"
          quality={80}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-azul1/90 via-azul2/85 to-azul3/80" />
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <m.div
          className="absolute top-10 right-10 w-40 h-40 rounded-full border-2 border-white/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        />
        <m.div
          className="absolute bottom-10 left-10 w-32 h-32 rounded-full border border-white/10"
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />

        {/* Floating particles */}
        <m.div
          className="absolute top-1/4 left-20 w-2 h-2 bg-azul2/30 rounded-full"
          animate={{ y: [0, -30, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <m.div
          className="absolute bottom-1/3 right-32 w-3 h-3 bg-azul3/30 rounded-full"
          animate={{ y: [0, 25, 0], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative container mx-auto px-4 md:px-6 max-w-5xl text-center z-10">
        {/* Badge */}
        <m.div
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-8 border border-white/20"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: easeConfig }}
        >
          <MessageCircle className="w-4 h-4 text-azul7" />
          <span className="text-white text-sm font-medium">
            En desarrollo - Próximamente disponible
          </span>
        </m.div>

        {/* Main heading */}
        <m.h2
          className="mb-6 text-4xl md:text-6xl font-bold text-white leading-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6, ease: easeConfig }}
        >
          ¿Interesado en{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-azul6 to-white bg-clip-text text-transparent">
              PequeChat
            </span>
            <m.div
              className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-azul4 to-azul6 rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
            />
          </span>
          ?
        </m.h2>

        {/* Subtitle */}
        <m.p
          className="mb-10 text-lg md:text-xl text-azul7 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6, ease: easeConfig }}
        >
          Conoce más sobre nuestro proyecto y síguenos para estar al día con el
          desarrollo de la plataforma de comunicación infantil más segura.
        </m.p>

        {/* Benefits */}
        <m.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6, ease: easeConfig }}
        >
          {[
            "Configuración en 2 minutos",
            "Arquitectura moderna y escalable",
            "Open Source y transparente",
          ].map((benefit, index) => (
            <m.div
              key={benefit}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.4 + index * 0.1,
                duration: 0.4,
                ease: easeConfig,
              }}
            >
              <Check className="w-4 h-4 text-azul6" />
              <span className="text-white text-sm font-medium">{benefit}</span>
            </m.div>
          ))}
        </m.div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-b from-transparent to-azul3/60" />
    </section>
  );
}
