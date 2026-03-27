"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";
import Container from "@/components/ui/Container";
import { getLucideIcon } from "@/lib/icons";
import type { IndustryStat } from "@/data/industries";

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
    <span className="font-heading text-[36px] sm:text-[44px] font-bold text-dark">
      {display}{suffix}
    </span>
  );
}

interface Props {
  stats: IndustryStat[];
}

export default function IndustryStats({ stats }: Props) {
  const [ref, visible] = useInView();

  if (stats.length === 0) return null;

  return (
    <section ref={ref} className="py-16 sm:py-20 bg-light-brand relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand via-brand-light to-brand" />

      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
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
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-brand/10 mb-4">
                  {Icon && <Icon className="w-7 h-7 text-brand" strokeWidth={1.5} />}
                </div>
                <div className="mb-2">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} inView={visible} />
                </div>
                <p className="text-text-gray text-[14px] sm:text-[15px] font-medium">
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
