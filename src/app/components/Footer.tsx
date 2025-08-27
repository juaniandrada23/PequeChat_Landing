// src/components/Footer.tsx
"use client";

import { Github, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-tr from-azul1 via-azul2 to-azul3 backdrop-blur-md py-14 text-white overflow-hidden">
      {/* Patrones decorativos simples */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-8 bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0)_100%)]"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        
        {/* Formas geométricas estáticas */}
        <div className="absolute top-10 right-10 w-40 h-40 border border-white/10 rounded-full"></div>
        <div className="absolute bottom-10 left-10 w-60 h-60 border border-white/10 rounded-full"></div>
      </div>
      
      {/* Contenido principal */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Columna 1: Logo e información */}
          <div>
            <Link href="/" className="inline-block mb-5">
              <div className="relative h-15 w-15">
                <Image
                  src="/PequeLogoSinTexto.png"
                  alt="PequeChat Logo"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 160px, 160px"
                  loading="lazy"
                />
              </div>
            </Link>
            <p className="text-sm text-white/80 mb-5 max-w-xs">
              Plataforma de comunicación segura diseñada específicamente para niños, con control parental avanzado.
            </p>
          </div>
          
          {/* Columna 2: Enlaces rápidos */}
          <div>
            <h3 className="text-sm font-bold mb-4 text-white uppercase tracking-wider">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/about"
                  className="text-white/80 hover:text-white text-sm flex items-center gap-2 transition-colors duration-200"
                >
                  <span>Nosotros</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="#"
                  className="text-white/80 hover:text-white text-sm flex items-center gap-2 transition-colors duration-200"
                >
                  <span>Términos de servicio</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="#"
                  className="text-white/80 hover:text-white text-sm flex items-center gap-2 transition-colors duration-200"
                >
                  <span>Políticas de privacidad</span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Columna 3: Contacto */}
          <div>
            <h3 className="text-sm font-bold mb-4 text-white uppercase tracking-wider">Contáctanos</h3>
            <p className="text-sm text-white/80 mb-5">
              ¿Tienes preguntas sobre PequeChat? Estamos aquí para ayudarte.
            </p>
            <Link 
              href="mailto:contacto@pequechat.com?subject=Consulta%20sobre%20PequeChat"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm text-white font-medium transition-colors duration-200"
            >
              <Mail className="w-4 h-4" />
              contacto@pequechat.com
            </Link>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10">
          <p className="text-xs text-white/70 mb-4 md:mb-0">
            &copy; 2024 <span className="font-bold text-white">PequeChat</span> Grupo 6 UTN FRC 5K4.
          </p>

          <nav className="flex items-center gap-6" aria-label="Redes y contacto">
            <a
              href="https://github.com/Agustin-98/Proyecto-Final-PequeChat"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="transition-colors hover:text-azul8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Github size={20} aria-hidden="true" />
            </a>
            <a
              href="mailto:contacto@pequechat.com?subject=Consulta%20sobre%20PequeChat"
              aria-label="Email"
              className="transition-colors hover:text-azul8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Mail size={20} aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
