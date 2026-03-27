"use client";

import { useEffect, useRef, useState } from "react";
import { getLucideIcon } from "@/lib/icons";
import { useInView } from "@/hooks/useInView";
import Container from "@/components/ui/Container";
interface StatItem {
  value: number;
  suffix: string;
  label: string;
  icon: string;
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
    <span className="font-heading text-[40px] sm:text-[48px] font-bold text-white">
      {display}{suffix}
    </span>
  );
}

export default function StatsCounter({ stats }: { stats: StatItem[] }) {
  const [ref, visible] = useInView();

  return (
    <section ref={ref} className="bg-dark py-16 sm:py-20 relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 relative z-10">
          {stats.map((stat, i) => {
            const Icon = getLucideIcon(stat.icon);
            return (
              <div
                key={stat.label}
                className="text-center"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(30px)",
                  transition: `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`,
                }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand/20 mb-4">
                  {Icon && <Icon className="w-7 h-7 text-brand-light" strokeWidth={1.5} />}
                </div>
                <div className="mb-2">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} inView={visible} />
                </div>
                <p className="text-white/60 text-[14px] sm:text-[16px] font-medium">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
