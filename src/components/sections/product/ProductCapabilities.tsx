"use client";

import * as LucideIcons from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import Container from "@/components/ui/Container";
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
      {/* ── Background layers ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#071a2f] via-dark to-[#0a2540]" />

      {/* Mesh gradient blobs */}
      <div className="absolute top-[15%] left-[10%] w-[400px] h-[400px] bg-brand/[0.06] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[15%] w-[350px] h-[350px] bg-brand-light/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand/[0.03] rounded-full blur-[160px] pointer-events-none" />

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Decorative code symbols */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden lg:block">
        <span className="absolute bottom-[8%] right-[6%] text-[80px] font-mono text-brand-light/[0.03] select-none leading-none">&lt;/&gt;</span>
        <span className="absolute top-[12%] left-[4%] text-[60px] font-mono text-brand/[0.03] select-none leading-none">&#123;&#125;</span>
      </div>

      <Container className="relative z-10">
        {/* ── Section Header ── */}
        <FadeIn className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-lg mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-light animate-pulse" />
            <span className="text-xs font-bold tracking-widest text-brand-light uppercase">
              Kemampuan Lengkap
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6">
            Sistem yang Dapat Diandalkan
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Dibangun dengan arsitektur modern untuk mendukung skalabilitas dan reliabilitas bisnis Anda di setiap tahap.
          </p>
        </FadeIn>

        {/* ── Row 1: Hero capabilities (top 4) — uniform 4-column grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mb-4 lg:mb-5">
          {heroItems.map((cap, index) => {
            const Icon = getIcon(cap.icon);
            return (
              <FadeIn key={cap.title} delay={0.05 + index * 0.08}>
                <div className="group relative h-full rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1">
                  {/* Animated gradient border */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.08] via-transparent to-white/[0.04] p-px">
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[conic-gradient(from_var(--angle),transparent_30%,#3D7EAA_50%,transparent_70%)]" style={{ "--angle": "0deg" } as React.CSSProperties} />
                  </div>

                  {/* Card inner */}
                  <div className="relative h-full rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.06] group-hover:border-brand/20 group-hover:bg-white/[0.07] transition-all duration-500 p-7 sm:p-8">
                    {/* Top accent line */}
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Corner glow dot */}
                    <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-brand-light/0 group-hover:bg-brand-light/60 blur-[2px] transition-all duration-700" />

                    {/* Icon + number row */}
                    <div className="flex justify-between items-start mb-5">
                      <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-brand/20 to-brand-light/10 border border-brand/15 flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-brand/20 transition-all duration-500">
                        <div className="absolute inset-0 rounded-2xl bg-brand/0 group-hover:bg-brand transition-colors duration-500" />
                        <Icon className="relative z-10 w-7 h-7 text-brand-light group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                      </div>
                      <span className="text-[40px] font-heading font-black text-white/[0.03] group-hover:text-brand/[0.08] transition-colors duration-700 select-none leading-none">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-heading text-lg font-bold text-white mb-2 group-hover:text-brand-light transition-colors duration-300">
                      {cap.title}
                    </h3>

                    {/* Gradient line */}
                    <div className="flex gap-1 mb-3">
                      <div className="h-[2px] w-8 bg-gradient-to-r from-brand to-brand-light rounded-full opacity-50 group-hover:opacity-100 group-hover:w-12 transition-all duration-500" />
                      <div className="h-[2px] w-2 bg-brand-light/30 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100" />
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      {cap.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* ── Row 2+: Compact capabilities — horizontal layout ── */}
        {compactItems.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            {compactItems.map((cap, index) => {
              const Icon = getIcon(cap.icon);
              return (
                <FadeIn key={cap.title} delay={0.1 + index * 0.04}>
                  <div className="group relative h-full rounded-xl overflow-hidden transition-all duration-400 hover:-translate-y-0.5">
                    <div className="relative h-full rounded-xl bg-white/[0.03] border border-white/[0.05] group-hover:bg-white/[0.06] group-hover:border-brand/20 transition-all duration-400 p-4 flex items-start gap-4">
                      {/* Top accent */}
                      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-light/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                      {/* Icon */}
                      <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center flex-shrink-0 group-hover:bg-brand group-hover:border-brand group-hover:shadow-md group-hover:shadow-brand/20 transition-all duration-400">
                        <Icon className="w-[18px] h-[18px] text-brand-light/60 group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                      </div>

                      {/* Text */}
                      <div className="min-w-0 flex-1">
                        <h3 className="font-heading text-[15px] font-bold text-white/90 mb-1 group-hover:text-brand-light transition-colors duration-300">
                          {cap.title}
                        </h3>
                        <p className="text-gray-500 text-[13px] leading-relaxed group-hover:text-gray-400 transition-colors duration-300">
                          {cap.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
}
