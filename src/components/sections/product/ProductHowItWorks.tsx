"use client";

import { Fragment } from "react";
import * as LucideIcons from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { BrandCurve } from "@/components/ui/SvgDecorations";
import type { ProductStep } from "@/types";

interface ProductHowItWorksProps {
  steps: ProductStep[];
}

function getIcon(name: string) {
  const icons = LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>>;
  return icons[name] || LucideIcons.Star;
}

/* Arrow connector between cards (desktop) */
function ArrowConnector() {
  return (
    <div className="hidden lg:flex items-center justify-center relative w-full h-full">
      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex items-center">
        <div className="w-full h-px bg-gradient-to-r from-brand/10 via-brand/40 to-brand/10" />
      </div>
      <div className="relative z-10 w-8 h-8 rounded-full bg-white border border-brand/20 shadow-sm flex items-center justify-center text-brand">
         <LucideIcons.ChevronRight className="w-4 h-4" strokeWidth={2} />
      </div>
    </div>
  );
}

export default function ProductHowItWorks({ steps }: ProductHowItWorksProps) {
  return (
    <section className="relative overflow-hidden bg-[#f4f7f9] py-24 sm:py-32">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000004_1px,transparent_1px),linear-gradient(to_bottom,#00000004_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      {/* Brand curve — top right */}
      <BrandCurve className="absolute -top-10 -right-10 opacity-[0.05] hidden lg:block text-brand" />
      <BrandCurve className="absolute -bottom-20 -left-20 opacity-[0.05] hidden lg:block text-brand rotate-180" />

      <Container className="relative z-10">
        <FadeIn className="text-center max-w-2xl mx-auto mb-16 sm:mb-24">
          <SectionHeading
            subtitle="IMPLEMENTASI"
            title="Integrasi Tanpa Hambatan"
            description="Proses onboarding dan implementasi yang terstruktur, dirancang khusus untuk memenuhi standar deployment skala enterprise."
          />
        </FadeIn>

        {/* Desktop: grid with arrow connectors; Mobile: vertical list with lines */}
        <div className="relative z-10 flex flex-col gap-6 sm:grid sm:grid-cols-2 sm:gap-8 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:gap-0 items-center">
          {steps.map((step, index) => {
            const Icon = getIcon(step.icon);
            return (
              <Fragment key={step.step}>
                <FadeIn delay={index * 0.1}>
                  <div className="relative bg-white rounded-2xl p-8 text-center h-full flex flex-col items-center group border border-transparent hover:border-brand/20 hover:shadow-2xl hover:shadow-brand/[0.05] transition-all duration-300 w-full sm:w-auto">
                    
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-gradient-to-b from-brand/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 pointer-events-none" />

                    {/* Step Number Top */}
                    <div className="mb-6 relative">
                       <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand/10 to-brand-light/10 border border-brand/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative z-10">
                         <Icon className="w-7 h-7 text-brand" strokeWidth={1.5} />
                       </div>
                       
                       {/* Floating number */}
                       <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white border-2 border-brand/20 shadow-md flex items-center justify-center text-sm font-bold text-brand z-20 group-hover:bg-brand group-hover:text-white group-hover:border-brand transition-colors duration-300">
                         {String(step.step).padStart(2, "0")}
                       </div>
                    </div>

                    <h3 className="font-heading text-xl font-bold text-dark mb-3">
                      {step.title}
                    </h3>
                    <p className="text-text-gray text-sm leading-relaxed max-w-[200px] mx-auto">
                      {step.description}
                    </p>
                  </div>
                </FadeIn>
                {index < steps.length - 1 && (
                  <>
                    {/* Mobile/Tablet vertical connector */}
                    <div className="flex justify-center lg:hidden py-2">
                       <div className="w-[2px] h-10 bg-gradient-to-b from-brand/30 via-brand/10 to-transparent rounded-full" />
                    </div>
                    {/* Desktop arrow connector */}
                    <div className="hidden lg:block self-stretch mx-4">
                       <ArrowConnector />
                    </div>
                  </>
                )}
              </Fragment>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
