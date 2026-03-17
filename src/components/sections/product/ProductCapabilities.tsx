"use client";

import * as LucideIcons from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import Container from "@/components/ui/Container";
import { CircuitPatternDark } from "@/components/ui/SvgDecorations";
import type { ProductCapability } from "@/types";

interface ProductCapabilitiesProps {
  capabilities: ProductCapability[];
}

function getIcon(name: string) {
  const icons = LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>>;
  return icons[name] || LucideIcons.Star;
}

export default function ProductCapabilities({ capabilities }: ProductCapabilitiesProps) {
  const heroItems = capabilities.slice(0, 4);
  const compactItems = capabilities.slice(4);

  return (
    <section className="relative overflow-hidden bg-dark py-24 sm:py-32 border-y border-white/5">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a192f] via-dark to-[#0F3555] opacity-90" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Circuit pattern — top left */}
      <CircuitPatternDark className="absolute top-[5%] left-[2%] opacity-[0.06] hidden lg:block" />

      {/* Gradient glow orb — center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand opacity-[0.05] blur-[120px] rounded-full pointer-events-none" />

      {/* Floating code symbol */}
      <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden hidden lg:block">
        <span className="absolute bottom-[10%] right-[8%] text-[70px] font-mono text-[#6BB8D6] opacity-[0.04] select-none leading-none">&lt;/&gt;</span>
      </div>

      <Container className="relative z-10">
        {/* Section Header — dark variant */}
        <FadeIn className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-light animate-pulse" />
            <span className="text-xs font-bold tracking-widest text-brand-light uppercase">
              Kemampuan Lengkap
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6">
            Sistem yang Dapat Diandalkan
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Dibangun dengan arsitektur modern untuk mendukung skalabilitas dan reliabilitas bisnis Anda di setiap tahap.
          </p>
        </FadeIn>

        {/* Row 1: Hero capabilities (top 4) — larger cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 mb-5 lg:mb-6">
          {heroItems.map((cap, index) => {
            const Icon = getIcon(cap.icon);
            return (
              <FadeIn key={cap.title} delay={0.05 + index * 0.08}>
                <div className="group relative h-full rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/[0.08] p-7 sm:p-8 transition-all duration-300 hover:bg-white/[0.08] hover:border-brand/30 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand/[0.1]">
                  {/* Top glow on hover */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-brand to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Icon + number row */}
                  <div className="flex justify-between items-start mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-brand/15 border border-brand/20 flex items-center justify-center group-hover:bg-brand group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-7 h-7 text-brand-light group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                    </div>
                    <span className="text-[40px] font-heading font-black text-white/[0.04] group-hover:text-brand/10 transition-colors duration-500 select-none leading-none">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-lg font-bold text-white mb-2 group-hover:text-brand-light transition-colors duration-300">
                    {cap.title}
                  </h3>

                  {/* Gradient line */}
                  <div className="w-8 h-[2px] bg-gradient-to-r from-brand to-brand-light mb-3 opacity-40 group-hover:opacity-100 group-hover:w-12 transition-all duration-300" />

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Row 2-3: Compact capabilities (remaining 8) — horizontal layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {compactItems.map((cap, index) => {
            const Icon = getIcon(cap.icon);
            return (
              <FadeIn key={cap.title} delay={0.1 + index * 0.05}>
                <div className="group flex items-start gap-4 rounded-xl bg-white/[0.03] border border-white/[0.06] p-5 transition-all duration-300 hover:bg-white/[0.07] hover:border-brand/25 hover:-translate-y-0.5 h-full">
                  {/* Icon */}
                  <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center flex-shrink-0 group-hover:bg-brand group-hover:border-brand transition-all duration-300">
                    <Icon className="w-4 h-4 text-brand-light/70 group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                  </div>
                  {/* Text */}
                  <div className="min-w-0">
                    <h3 className="font-heading text-[15px] font-bold text-white/90 mb-1 group-hover:text-brand-light transition-colors duration-300">
                      {cap.title}
                    </h3>
                    <p className="text-gray-500 text-[13px] leading-relaxed">
                      {cap.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
