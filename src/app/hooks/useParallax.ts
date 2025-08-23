"use client";
import { useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

export interface ParallaxLayerConfig {
  speed: number; // positive = moves faster on scroll, negative = slower
  start?: number; // start offset (0-1)
  end?: number;   // end offset (0-1)
}

export function useParallax<T extends HTMLElement>(config: ParallaxLayerConfig) {
  const ref = useRef<T | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end","end start"] });
  const { speed, start = 0, end = 1 } = config;
  const range: [number, number] = [start, end];
  const y: MotionValue<number> = useTransform(scrollYProgress, range, [0, speed * 120]);
  const opacity: MotionValue<number> = useTransform(scrollYProgress, range, [1, speed < 0 ? 0.9 : 0.6]);
  return { ref, y, opacity };
}
