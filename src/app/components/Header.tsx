"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

const navItems = [
  { href: "/about", label: "Nosotros" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const lastY = useRef(0);
  const pathname = usePathname();

  // Efecto para detectar scroll con throttle para mejor performance
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        setScrolled(y > 10);

        // Hide on scroll down, show on scroll up (with small hysteresis)
        if (y < 10) {
          setShowHeader(true);
        } else {
          const goingDown = y > lastY.current;
          if (goingDown && y > 80) setShowHeader(false);
          if (!goingDown && lastY.current - y > 2) setShowHeader(true);
        }
        lastY.current = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cerrar menú con Escape y cuando cambia la ruta
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    const original = document.documentElement.style.overflow;
    if (open) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = original || "";
    }
    return () => {
      document.documentElement.style.overflow = original || "";
    };
  }, [open]);

  // active underline handled via framer-motion LayoutGroup; no helper needed

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: showHeader ? 0 : -80, opacity: 1 }}
      transition={{ y: { type: "spring", stiffness: 500, damping: 40, mass: 0.7 }, opacity: { duration: 0.3 } }}
      className={`
        fixed top-0 z-50 w-full transition-all duration-300 ease-out
        ${(scrolled || open)
          ? "bg-white/98 backdrop-blur-lg shadow-sm border-b border-gray-100" 
          : "bg-gradient-to-tr from-azul1 via-azul2 to-azul3 backdrop-blur-sm"
        }
      `}
      role="banner"
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3 md:px-6">
        {/* Logo - Diseño minimalista */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <Link 
            href="/" 
            aria-label="Inicio PequeChat" 
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azul4/50 rounded-md"
          >
            <Image
              src="/PequeLogo.png"
              alt="Logo PequeChat"
              width={32}
              height={32}
              priority
              className="transition-transform group-hover:scale-105"
            />
            <span className={`
              text-lg font-semibold tracking-tight transition-colors duration-200
              ${scrolled ? "text-azul1" : "text-white"}
            `}>
              PequeChat
            </span>
          </Link>
        </motion.div>

        {/* Desktop Navigation - Minimalista */}
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Navegación principal">
          <LayoutGroup id="desktop-nav">
            {navItems.map(({ href, label }, index) => (
              <motion.div
                key={href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.05 + 0.1,
                  duration: 0.3,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                <Link
                  href={href}
                  className={`
                    relative px-3 py-2 text-sm font-medium transition-colors duration-200 rounded
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azul4/50
                    ${scrolled ? "text-gray-600 hover:text-azul3" : "text-white/80 hover:text-white"}
                  `}
                  aria-current={pathname === href ? "page" : undefined}
                >
                  {label}
                  {pathname === href && (
                    <motion.span
                      layoutId="active-underline"
                      className="absolute left-2 right-2 -bottom-1 h-0.5 rounded-full bg-azul3"
                      transition={{ type: "spring", stiffness: 600, damping: 40 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </LayoutGroup>

          {/* CTA Button - Minimalista */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <a
              href="http://localhost:5173/login"
              rel="noopener noreferrer"
              className={`
                group inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium
                transition-all duration-200 hover:scale-105 focus-visible:outline-none 
                focus-visible:ring-2 focus-visible:ring-azul4/50 focus-visible:ring-offset-1
                ${scrolled 
                  ? "bg-azul3 text-white shadow-sm hover:bg-azul2 hover:shadow-md" 
                  : "bg-white/15 text-white backdrop-blur-sm hover:bg-white/25"
                }
              `}
              aria-label="Iniciar sesión en PequeChat"
            >
              <span>Iniciar Sesión</span>
              <ArrowRight 
                size={14} 
                className="transition-transform group-hover:translate-x-0.5" 
              />
            </a>
          </motion.div>
        </nav>

        {/* Mobile Menu Button - Minimalista */}
        <button
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className={`
            lg:hidden p-2 rounded-lg transition-all duration-200
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azul4/50
            ${scrolled 
              ? "text-gray-600 hover:bg-gray-50" 
              : "text-white hover:bg-white/10"
            }
          `}
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div
                key="close"
                initial={{ rotate: -45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 45, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X size={20} />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -45, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Menu size={20} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Subtle gradient bottom border when scrolled */}
      {scrolled && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-azul4/40 to-transparent"
        />
      )}

      {/* Dim overlay when mobile menu is open */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            aria-hidden
            className="fixed inset-0 bg-black/30 backdrop-blur-[1px] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Navigation - Minimalista */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:hidden overflow-hidden bg-white/98 backdrop-blur-lg border-t border-gray-100"
            style={{ maxHeight: "calc(100dvh - 64px)", overflowY: "auto" }}
            aria-label="Menú móvil"
          >
            <div className="container mx-auto px-4 py-4">
              <LayoutGroup id="mobile-nav">
              <ul className="space-y-2">
                {navItems.map(({ href, label }, index) => (
                  <motion.li
                    key={href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                  >
                    <Link
                      href={href}
                      onClick={() => setOpen(false)}
                      className={`
                        relative block px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
                        hover:bg-azul1/5 hover:text-azul3 focus-visible:outline-none 
                        focus-visible:ring-2 focus-visible:ring-azul4/50
                        ${pathname === href ? "text-azul3 bg-azul1/5" : "text-gray-600"}
                      `}
                      aria-current={pathname === href ? "page" : undefined}
                    >
                      {label}
                      {pathname === href && (
                        <motion.span
                          layoutId="active-underline"
                          className="absolute left-2 right-2 -bottom-1 h-0.5 rounded-full bg-azul3"
                          transition={{ type: "spring", stiffness: 600, damping: 40 }}
                        />
                      )}
                    </Link>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.2 }}
                  className="pt-2 mt-2 border-t border-gray-100"
                >
                  <a
                    href="http://localhost:5173/login"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-1.5 w-full rounded-lg bg-azul3 px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-azul2 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azul4/50"
                    aria-label="Iniciar sesión en PequeChat"
                  >
                    Iniciar Sesión
                    <ArrowRight size={14} />
                  </a>
                </motion.li>
              </ul>
              </LayoutGroup>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
