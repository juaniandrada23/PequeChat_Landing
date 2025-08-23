// components/Spinner.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

interface SpinnerProps {
  /** Tamaño del spinner en clases Tailwind (p. ej. "w-20 h-20") */
  sizeClass?: string;
  /** Color de la parte superior animada (p. ej. "border-t-blue-400") */
  colorClass?: string;
}

const textContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const letterVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const Spinner: React.FC<SpinnerProps> = ({
  sizeClass = "w-16 h-16",
  colorClass = "border-t-azul4",
}) => {
  const text = "Cargando";

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Spinner circular optimizado */}
      <div
        className={`
          ${sizeClass}
          border-4
          border-gray-200/40
          ${colorClass}
          rounded-full
          animate-spin
          drop-shadow-md
        `}
        aria-hidden="true"
      />

      {/* Texto animado letra a letra */}
      <motion.div
        className="flex mt-4"
        variants={textContainer}
        initial="hidden"
        animate="visible"
        aria-live="polite"
      >
        {text.split("").map((char, idx) => (
          <motion.span
            key={idx}
            className="text-lg font-medium text-white drop-shadow-md"
            variants={letterVariants}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};

export default Spinner;
