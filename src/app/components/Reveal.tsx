"use client";

import React, { useRef } from "react";
import { useIntersectionObserver } from "@/lib/hooks/useIntersectionObserver";
import styles from "./Reveal.module.css";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
}

export default function Reveal({ children, className, delayMs }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(
    ref as React.RefObject<HTMLElement>,
  );

  return (
    <div
      ref={ref}
      className={className ? `${styles.reveal} ${className}` : styles.reveal}
      data-visible={isVisible}
      style={
        delayMs !== undefined
          ? ({ "--reveal-delay": `${delayMs}ms` } as React.CSSProperties)
          : undefined
      }
    >
      {children}
    </div>
  );
}
