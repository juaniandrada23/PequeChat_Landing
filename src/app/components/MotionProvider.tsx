"use client";

import { ReactNode } from "react";
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";

interface Props {
  children: ReactNode;
}

export default function MotionProvider({ children }: Props) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
