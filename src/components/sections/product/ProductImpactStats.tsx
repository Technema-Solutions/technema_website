"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";
import Container from "@/components/ui/Container";
import { DotGrid } from "@/components/ui/SvgDecorations";
import type { ProductStat } from "@/types";

interface ProductImpactStatsProps {
  stats: ProductStat[];
  productName: string;
}

/** Parse a stat value string like "90%", "3x", "100+" into numeric + suffix */
function parseStatValue(value: string): { numeric: number; suffix: string } {
  const match = value.match(/^([\d.]+)(.*)$/);
  if (match) {
    return { numeric: parseFloat(match[1]), suffix: match[2] };
  }
  return { numeric: 0, suffix: value };
}

function AnimatedNumber({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [display, setDisplay] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(current + increment, value);
      setDisplay(Number.isInteger(value) ? Math.round(current) : parseFloat(current.toFixed(1)));
      if (step >= steps) {
        setDisplay(value);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span className="font-heading text-[52px] sm:text-[64px] font-bold text-white leading-none">
      {display}{suffix}
    </span>
  );
}

export default function ProductImpactStats({ stats, productName }: ProductImpactStatsProps) {
  const [ref, visible] = useInView();

  return (
    <section ref={ref} className="bg-dark relative overflow-hidden py-24 sm:py-32 border-y border-white/5">
      {/* Premium Dark Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a192f] via-dark to-[#0F3555] opacity-95" />

      {/* Grid pattern background */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      {/* Dot grid — bottom right & top left */}
      <DotGrid className="absolute bottom-[10%] right-[5%] opacity-[0.1] hidden lg:block text-brand-light" />
      <DotGrid className="absolute top-[10%] left-[5%] opacity-[0.05] hidden lg:block text-brand" />

      {/* Decorative Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] bg-[#3D7EAA]/15 rounded-full blur-[100px] pointer-events-none" />

      <Container className="relative z-10">
        <div className="flex flex-col items-center mb-16 sm:mb-20">
           <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
             <span className="w-1.5 h-1.5 rounded-full bg-brand-light animate-pulse" />
             <span className="text-xs font-semibold text-brand-light tracking-widest uppercase">
               Dampak Terukur
             </span>
           </div>
           <h2 className="text-center font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
             Performa Nyata bersama <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-brand">{productName}</span>
           </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative max-w-5xl mx-auto">
          {/* Subtle connecting line behind stats */}
          <div className="hidden md:block absolute top-[45%] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />

          {stats.map((stat, i) => {
            const { numeric, suffix } = parseStatValue(stat.value);
            return (
              <div
                key={stat.label}
                className="relative z-10 text-center py-8 px-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 group"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(30px)",
                  transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.15}s`,
                }}
              >
                {/* Top glow on hover */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-brand to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="mb-4">
                  <AnimatedNumber value={numeric} suffix={suffix} inView={visible} />
                </div>
                
                <p className="text-gray-300 font-medium text-lg lg:text-xl relative inline-block">
                  {stat.label}
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-[2px] bg-brand-light rounded-full opacity-50 group-hover:w-12 transition-all duration-300" />
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
