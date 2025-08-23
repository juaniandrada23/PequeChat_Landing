"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "center" | "left";
  className?: string;
  id?: string;
}

const ease = [0.4, 0, 0.2, 1];

export default function SectionHeading({ 
  eyebrow, 
  title, 
  description, 
  align = "center", 
  className = "", 
  id 
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div 
      id={id} 
      className={`mb-16 md:mb-20 ${isCenter ? "text-center" : "text-left"} ${className}`}
    >      
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium tracking-wide mb-6 ${isCenter ? "mx-auto" : ""}`}
        >
          <div className="w-2 h-2 rounded-full bg-blue-500" />
          {eyebrow}
        </motion.div>
      )}
      
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.1, ease }}
        className="text-3xl md:text-5xl lg:text-6xl font-bold text-blue-900 tracking-tight leading-tight"
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className={`mt-6 text-lg md:text-xl text-blue-700/80 leading-relaxed max-w-3xl ${isCenter ? "mx-auto" : ""}`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
