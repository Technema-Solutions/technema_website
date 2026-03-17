"use client";

import { useInView } from "@/hooks/useInView";
import React from "react";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
  style?: React.CSSProperties;
}

export default function FadeIn({ children, delay = 0, direction = "up", className = "", style = {} }: FadeInProps) {
  const [ref, visible] = useInView();
  
  const transforms = { 
    up: "translateY(40px)", 
    down: "translateY(-40px)", 
    left: "translateX(40px)", 
    right: "translateX(-40px)" 
  };
  
  return (
    <div 
      ref={ref} 
      className={className} 
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate(0)" : transforms[direction],
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
        ...style
      }}
    >
      {children}
    </div>
  );
}
