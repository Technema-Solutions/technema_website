"use client";

import * as LucideIcons from "lucide-react";
import { ArrowRight } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { ConcentricRings } from "@/components/ui/SvgDecorations";
import type { ProductUseCase } from "@/types";

interface ProductUseCasesProps {
  useCases: ProductUseCase[];
  productName: string;
}

function getIcon(name: string) {
  const icons = LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>>;
  return icons[name] || LucideIcons.Star;
}

export default function ProductUseCases({ useCases, productName }: ProductUseCasesProps) {
  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32">
      {/* Decorative Elements */}
      <ConcentricRings className="absolute top-[5%] -left-[10%] opacity-[0.03] hidden lg:block" stroke="#3D7EAA" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <Container className="relative z-10">
        <FadeIn className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <SectionHeading
            subtitle="USE CASES"
            title={`Solusi untuk Setiap Industri`}
            description={`${productName} dirancang fleksibel untuk mendukung operasional berbagai sektor bisnis secara optimal.`}
          />
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {useCases.map((uc, index) => {
            const Icon = getIcon(uc.icon);
            return (
              <FadeIn key={uc.title} delay={0.05 + (index * 0.1)}>
                <div className="group relative block h-full outline-none">
                  <div className="relative h-full overflow-hidden bg-white rounded-2xl p-8 border border-border-gray hover:border-brand/40 hover:shadow-2xl hover:shadow-brand/[0.08] transition-all duration-500 flex flex-col z-10">
                    
                    {/* Hover Glow Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Icon Container */}
                    <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-[#f8fcfd] to-white border border-brand/10 flex items-center justify-center mb-6 overflow-hidden shadow-sm group-hover:shadow hover:scale-105 transition-all duration-500">
                      <div className="absolute inset-0 bg-brand/5 scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-in-out" />
                      <Icon className="w-6 h-6 text-brand relative z-10" strokeWidth={1.5} />
                    </div>

                    {/* Text Content */}
                    <div className="relative z-10 flex-1 flex flex-col">
                      <h3 className="font-heading text-xl font-bold text-dark mb-3 group-hover:text-brand transition-colors duration-300">
                        {uc.title}
                      </h3>
                      <p className="text-text-gray/90 text-sm leading-relaxed mb-6 font-light">
                        {uc.description}
                      </p>
                      
                      {/* Interaction Area */}
                      <div className="mt-auto flex items-center justify-between pt-4 border-t border-border-gray/50 group-hover:border-brand/20 transition-colors duration-300">
                         <span className="text-xs font-semibold text-brand tracking-wide uppercase opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                           Pelajari
                         </span>
                         <div className="w-8 h-8 rounded-full bg-light-brand flex items-center justify-center group-hover:bg-brand group-hover:text-white text-brand/50 transition-all duration-500">
                           <ArrowRight className="w-4 h-4 transform group-hover:rotate-[-45deg] transition-transform duration-500" strokeWidth={2} />
                         </div>
                      </div>
                    </div>
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
