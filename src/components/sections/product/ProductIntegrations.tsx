"use client";

import * as LucideIcons from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { ConcentricRings } from "@/components/ui/SvgDecorations";
import type { ProductIntegration } from "@/types";

interface ProductIntegrationsProps {
  integrations: ProductIntegration[];
}

function getIcon(name: string) {
  const icons = LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>>;
  return icons[name] || LucideIcons.Puzzle;
}

export default function ProductIntegrations({ integrations }: ProductIntegrationsProps) {
  return (
    <section className="relative overflow-hidden bg-[#f8fcfd] py-24 sm:py-32">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl" />
      <ConcentricRings className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] w-[800px] h-[800px]" stroke="#3D7EAA" />

      <Container className="relative z-10">
        <FadeIn className="text-center max-w-2xl mx-auto mb-16 sm:mb-24">
          <SectionHeading
            subtitle="INTEGRASI"
            title="Terhubung Tanpa Batas"
            description="Ekspansi kapabilitas sistem Anda melalui integrasi native dengan puluhan platform dan layanan terkemuka dunia."
          />
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {integrations.map((integration, index) => {
            const Icon = integration.icon ? getIcon(integration.icon) : LucideIcons.Puzzle;
            return (
              <FadeIn key={integration.name} delay={index * 0.05}>
                <div className="group relative bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/60 hover:border-brand/30 hover:bg-white hover:shadow-xl hover:shadow-brand/[0.05] hover:-translate-y-1 transition-all duration-300 flex flex-col items-center gap-4 text-center cursor-pointer">
                  {/* Subtle inner glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-b from-brand/[0.02] to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 pointer-events-none" />
                  
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#f4f7f9] to-white border border-border-gray shadow-sm flex items-center justify-center group-hover:scale-110 group-hover:border-brand/20 group-hover:shadow-md transition-all duration-300 relative z-10">
                    <Icon className="w-6 h-6 text-brand/70 group-hover:text-brand transition-colors duration-300" strokeWidth={1.5} />
                  </div>
                  <span className="font-heading text-[15px] font-semibold text-dark/90 group-hover:text-brand transition-colors duration-300 relative z-10">
                    {integration.name}
                  </span>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
