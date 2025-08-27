"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { X, ArrowRight } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";

const navItems = [
  { href: "/about", label: "Nosotros" },
];

// Componente para el menú hamburguesa animado
const HamburgerIcon = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div className="relative w-6 h-6 flex flex-col justify-center items-center">
      <m.span
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 0 : -4,
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="absolute w-5 h-0.5 bg-current origin-center"
      />
      <m.span
        animate={{
          opacity: isOpen ? 0 : 1,
          x: isOpen ? -10 : 0,
        }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        className="absolute w-5 h-0.5 bg-current"
      />
      <m.span
        animate={{
          rotate: isOpen ? -45 : 0,
          y: isOpen ? 0 : 4,
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="absolute w-5 h-0.5 bg-current origin-center"
      />
    </div>
  );
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [mounted, setMounted] = useState(false);
  const lastY = useRef(0);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  // Prevenir problemas de hidratación
  useEffect(() => {
    setMounted(true);
  }, []);

  // Efecto para detectar scroll con throttle mejorado
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        setScrolled(y > 20);

        // Mejores transiciones de header
        if (y < 20) {
          setShowHeader(true);
        } else {
          const goingDown = y > lastY.current;
          const scrollDelta = Math.abs(y - lastY.current);
          
          if (goingDown && y > 100 && scrollDelta > 5) {
            setShowHeader(false);
          } else if (!goingDown && scrollDelta > 10) {
            setShowHeader(true);
          }
        }
        lastY.current = y;
        ticking = false;
      });
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cerrar menú con Escape y clicks fuera - Mejorado
  useEffect(() => {
    if (!mounted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        e.preventDefault();
        setOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (open && menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
      // Prevenir scroll del body
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [open, mounted]);

  // Cerrar menú cuando cambia la ruta
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Función segura para alternar el menú
  const toggleMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(!open);
  };

  // No renderizar hasta que esté montado para evitar hidratación
  if (!mounted) {
    return (
      <header className="fixed top-0 z-50 w-full bg-gradient-to-r from-azul1/90 via-azul2/90 to-azul3/90 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-4 md:px-6 lg:py-5">
          <div className="flex items-center gap-3">
            <Image
              src="/PequeLogo.png"
              alt="Logo PequeChat"
              width={40}
              height={40}
              priority
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white">
                PequeChat
              </span>
              <span className="text-xs font-medium text-white/70">
                Chat Seguro
              </span>
            </div>
          </div>
          <button className="lg:hidden p-3 rounded-xl text-white">
            <div className="relative w-6 h-6 flex flex-col justify-center items-center">
              <span className="absolute w-5 h-0.5 bg-current -translate-y-1" />
              <span className="absolute w-5 h-0.5 bg-current" />
              <span className="absolute w-5 h-0.5 bg-current translate-y-1" />
            </div>
          </button>
        </div>
      </header>
    );
  }

  return (
    <>
      <m.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: showHeader ? 0 : -100, 
          opacity: showHeader ? 1 : 0 
        }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 30,
          opacity: { duration: 0.2 }
        }}
        className={`
          fixed top-0 z-50 w-full transition-all duration-300 ease-out
          ${(scrolled || open)
            ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200/50" 
            : "bg-gradient-to-r from-azul1/90 via-azul2/90 to-azul3/90 backdrop-blur-md"
          }
        `}
        role="banner"
      >
        <div className="container mx-auto flex items-center justify-between px-4 py-4 md:px-6 lg:py-5">
          {/* Logo mejorado */}
          <m.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Link 
              href="/" 
              aria-label="Inicio PequeChat" 
              className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azul4/60 rounded-lg p-1"
            >
              <div className="relative">
                <Image
                  src="/PequeLogo.png"
                  alt="Logo PequeChat"
                  width={40}
                  height={40}
                  priority
                  className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-azul2/20 to-azul3/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="flex flex-col">
                <span className={`
                  text-xl font-bold tracking-tight transition-all duration-300
                  ${scrolled ? "text-azul1" : "text-white"}
                  group-hover:text-azul3
                `}>
                  PequeChat
                </span>
                <span className={`
                  text-xs font-medium transition-all duration-300
                  ${scrolled ? "text-gray-500" : "text-white/70"}
                `}>
                  Chat Seguro
                </span>
              </div>
            </Link>
          </m.div>

          {/* Desktop Navigation mejorada */}
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegación principal">
            {navItems.map(({ href, label }, index) => (
              <m.div
                key={href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.1 + 0.2,
                  duration: 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileHover={{ y: -2 }}
              >
                <Link
                  href={href}
                  className={`
                    relative px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-lg
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azul4/60
                    ${scrolled 
                      ? "text-gray-700 hover:text-azul3 hover:bg-azul1/10" 
                      : "text-white/90 hover:text-white hover:bg-white/10"
                    }
                  `}
                  aria-current={pathname === href ? "page" : undefined}
                >
                  {label}
                  {pathname === href && (
                    <m.div
                      layoutId="desktop-active-indicator"
                      className="absolute inset-0 bg-azul3/20 rounded-lg border-2 border-azul3/40"
                      transition={{ type: "spring", stiffness: 500, damping: 40 }}
                    />
                  )}
                </Link>
              </m.div>
            ))}

            {/* CTA Button mejorado */}
            <m.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="http://localhost:5173/login"
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  group inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold
                  transition-all duration-300 shadow-lg hover:shadow-xl
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azul4/60 focus-visible:ring-offset-2
                  ${scrolled 
                    ? "bg-gradient-to-r from-azul3 to-azul2 text-white hover:from-azul2 hover:to-azul1" 
                    : "bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 border border-white/20"
                  }
                `}
                aria-label="Iniciar sesión en PequeChat"
              >
                <span>Iniciar Sesión</span>
                <ArrowRight 
                  size={16} 
                  className="transition-transform duration-300 group-hover:translate-x-1" 
                />
              </a>
            </m.div>
          </nav>

          {/* Mobile Menu Button mejorado */}
          <button
            type="button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={toggleMenu}
            className={`
              lg:hidden relative p-3 rounded-xl transition-all duration-300 z-[60]
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azul4/60
              ${scrolled 
                ? "text-gray-700 hover:bg-gray-100 hover:text-azul3" 
                : "text-white hover:bg-white/20"
              }
              ${open ? "bg-white text-azul3 shadow-lg" : ""}
            `}
          >
            <HamburgerIcon isOpen={open} />
          </button>
        </div>

        {/* Gradient border mejorado */}
        {scrolled && (
          <m.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-azul3/60 to-transparent"
          />
        )}
      </m.header>

      {/* Mobile Menu Overlay mejorado */}
      <AnimatePresence mode="wait">
        {open && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[45] lg:hidden"
            onClick={() => setOpen(false)}
            style={{ touchAction: 'none' }}
          />
        )}
      </AnimatePresence>

      {/* Mobile Navigation mejorada */}
      <AnimatePresence mode="wait">
        {open && (
          <m.div
            ref={menuRef}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              opacity: { duration: 0.2 }
            }}
            className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white/98 backdrop-blur-xl shadow-2xl z-[55] lg:hidden overflow-y-auto"
            style={{ touchAction: 'pan-y' }}
          >
            {/* Header del menú móvil */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200/50 bg-white/50">
              <div className="flex items-center gap-3">
                <Image
                  src="/PequeLogo.png"
                  alt="Logo PequeChat"
                  width={32}
                  height={32}
                  className="rounded-lg"
                />
                <div>
                  <h2 className="text-lg font-bold text-azul1">PequeChat</h2>
                  <p className="text-sm text-gray-500">Menú de navegación</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-2 rounded-lg text-gray-500 hover:text-azul3 hover:bg-gray-100 transition-colors"
                aria-label="Cerrar menú"
              >
                <X size={20} />
              </button>
            </div>

            {/* Contenido del menú */}
            <nav className="flex-1 px-6 py-8" aria-label="Menú móvil">
              <ul className="space-y-2">
                {navItems.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={() => setOpen(false)}
                      className={`
                        relative group flex items-center gap-4 px-4 py-4 rounded-xl text-base font-semibold
                        transition-all duration-300 hover:bg-azul1/10 hover:text-azul3
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azul4/60
                        ${pathname === href 
                          ? "text-azul3 bg-azul1/10 shadow-sm" 
                          : "text-gray-700"
                        }
                      `}
                      aria-current={pathname === href ? "page" : undefined}
                    >
                      <div className={`
                        w-2 h-2 rounded-full transition-all duration-300
                        ${pathname === href ? "bg-azul3" : "bg-gray-300 group-hover:bg-azul3"}
                      `} />
                      <span className="flex-1">{label}</span>
                      <ArrowRight 
                        size={16} 
                        className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" 
                      />
                      {pathname === href && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-azul3 rounded-r-full" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* CTA en menú móvil */}
              <div className="mt-8 pt-6 border-t border-gray-200/50">
                <a
                  href="http://localhost:5173/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="group flex items-center justify-center gap-3 w-full rounded-xl bg-gradient-to-r from-azul3 to-azul2 px-6 py-4 text-base font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azul4/60"
                  aria-label="Iniciar sesión en PequeChat"
                >
                  <span>Iniciar Sesión</span>
                  <ArrowRight 
                    size={18} 
                    className="transition-transform duration-300 group-hover:translate-x-1" 
                  />
                </a>
                
                {/* Info adicional */}
                <p className="mt-4 text-center text-sm text-gray-500">
                  ¿Nuevo en PequeChat?{" "}
                  <button 
                    type="button"
                    className="text-azul3 font-medium hover:underline focus:outline-none focus:underline"
                    onClick={() => setOpen(false)}
                  >
                    Conoce más
                  </button>
                </p>
              </div>
            </nav>

            {/* Footer del menú móvil */}
            <div className="p-6 border-t border-gray-200/50 bg-gray-50/50">
              <p className="text-xs text-center text-gray-500">
                © 2025 PequeChat. Chat seguro para niños.
              </p>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
