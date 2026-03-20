"use client";

import * as LucideIcons from "lucide-react";
import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { DotGrid } from "@/components/ui/SvgDecorations";
import type { ProductFeatureHighlight } from "@/types";

interface ProductFeaturesProps {
  features: ProductFeatureHighlight[];
  productName: string;
}

function getIcon(name: string) {
  const icons = LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>>;
  return icons[name] || LucideIcons.Star;
}

export default function ProductFeatures({ features, productName }: ProductFeaturesProps) {
  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border-gray to-transparent" />
      <div className="absolute top-1/4 -right-64 w-96 h-96 bg-brand/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-64 w-96 h-96 bg-brand-light/[0.03] rounded-full blur-3xl pointer-events-none" />
      
      <DotGrid className="absolute top-10 right-10 opacity-[0.04] hidden lg:block text-brand" />

      <Container>
        <FadeIn className="max-w-3xl mx-auto text-center mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/5 border border-brand/10 mb-6">
             <span className="text-xs font-bold tracking-widest text-brand uppercase">Fitur Core</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-dark tracking-tight mb-6">
            Kenapa memilih <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-light">{productName}</span>?
          </h2>
          <p className="text-text-gray text-lg sm:text-xl leading-relaxed">
            Platform komprehensif yang dirancang untuk sekuritas dan performa skala enterprise.
          </p>
        </FadeIn>

        <div className="space-y-24 sm:space-y-32">
          {features.map((feature, index) => {
            const Icon = getIcon(feature.icon);
            const isReversed = index % 2 !== 0;

            return (
              <FadeIn key={feature.title} delay={0.1}>
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${isReversed ? "lg:direction-rtl" : ""}`}>
                  
                  {/* Content (Text Side) */}
                  <div className={`lg:col-span-5 ${isReversed ? "lg:order-2" : ""}`}>
                    <div className="relative">
                      {/* Section number watermark */}
                      <span className="absolute -top-10 -left-6 text-8xl font-heading font-bold text-light-brand opacity-50 select-none z-0">
                        0{index + 1}
                      </span>
                      
                      <div className="relative z-10 w-14 h-14 rounded-2xl bg-white shadow-lg shadow-brand/10 border border-brand/10 flex items-center justify-center mb-6 overflow-hidden group">
                        <div className="absolute inset-0 bg-brand/5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <Icon className="w-6 h-6 text-brand relative z-10" strokeWidth={1.5} />
                      </div>
                      
                      {/* Small gradient line indicator */}
                      <div className="flex px-1 mb-6">
                         <div className="h-1 w-8 bg-brand rounded-full" />
                         <div className="h-1 w-2 bg-brand-light rounded-full ml-1" />
                      </div>

                      <h3 className="relative z-10 font-heading text-2xl sm:text-3xl font-bold text-dark leading-tight mb-5">
                        {feature.title}
                      </h3>
                      <p className="relative z-10 text-text-gray/90 text-lg leading-relaxed font-light">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  {/* Visual Layout Container */}
                  <div className={`lg:col-span-7 ${isReversed ? "lg:order-1" : ""}`}>
                    <div className="relative group perspective-1000">
                      {/* Glow behind image container */}
                      <div className="absolute -inset-4 bg-gradient-to-tr from-brand/10 to-transparent opacity-0 group-hover:opacity-100 rounded-[2.5rem] blur-2xl transition-all duration-700 -z-10" />

                      {feature.image ? (
                        /* CMS Image */
                        <div className={`relative aspect-[16/10] rounded-3xl bg-white border border-border-gray shadow-xl overflow-hidden transform transition-all duration-700 ease-out ${isReversed ? 'hover:rotate-y-[2deg]' : 'hover:rotate-y-[-2deg]'}`}>
                          {feature.image.toLowerCase().endsWith(".svg") ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img
                              src={feature.image}
                              alt={feature.title}
                              className="w-full h-full object-contain p-6"
                            />
                          ) : (
                            <Image
                              src={feature.image}
                              alt={feature.title}
                              fill
                              className="object-contain p-6"
                              sizes="(max-width: 1024px) 100vw, 58vw"
                            />
                          )}
                        </div>
                      ) : (
                        /* Fallback: Mock UI */
                        <div className={`relative aspect-[16/10] rounded-3xl bg-white border border-border-gray shadow-xl flex flex-col overflow-hidden transform transition-all duration-700 ease-out ${isReversed ? 'hover:rotate-y-[2deg]' : 'hover:rotate-y-[-2deg]'}`}>
                          {/* Fake UI Header */}
                          <div className="h-10 bg-light-brand border-b border-border-gray flex items-center px-4 justify-between">
                            <div className="flex gap-1.5 opacity-60">
                              <div className="w-2.5 h-2.5 rounded-full bg-border-gray" />
                              <div className="w-2.5 h-2.5 rounded-full bg-border-gray" />
                              <div className="w-2.5 h-2.5 rounded-full bg-border-gray" />
                            </div>
                            <div className="hidden sm:flex h-4 w-32 bg-white rounded shadow-sm border border-border-gray" />
                          </div>

                          {/* Fake Content Area with subtle animations */}
                          <div className="flex-1 bg-gradient-to-br from-light-brand/30 via-white to-light-brand/50 relative overflow-hidden flex items-center justify-center p-8">
                            <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                              <defs>
                                <pattern id={`grid-${index}`} width="10" height="10" patternUnits="userSpaceOnUse">
                                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#3D7EAA" strokeWidth="0.5" />
                                </pattern>
                              </defs>
                              <rect width="100%" height="100%" fill={`url(#grid-${index})`} />
                            </svg>

                            <div className="relative w-full max-w-sm">
                              <div className="w-20 h-20 mx-auto rounded-3xl bg-white shadow-2xl border border-brand/5 flex items-center justify-center transform group-hover:-translate-y-4 group-hover:scale-105 transition-all duration-700 ease-out z-20 relative">
                                <Icon className="w-8 h-8 text-brand drop-shadow-sm" strokeWidth={1.5} />
                              </div>

                              <div className="absolute -left-4 top-10 w-24 h-16 bg-white/80 backdrop-blur border border-white rounded-xl shadow-lg transform -rotate-6 group-hover:-rotate-12 group-hover:-translate-x-2 transition-all duration-700 ease-out z-10 flex flex-col justify-center p-3">
                                <div className="w-full h-2 bg-light-brand rounded mb-2" />
                                <div className="w-2/3 h-2 bg-light-brand rounded" />
                              </div>

                              <div className="absolute -right-6 top-4 w-32 h-20 bg-white/80 backdrop-blur border border-white rounded-xl shadow-lg transform rotate-3 group-hover:rotate-6 group-hover:translate-x-4 transition-all duration-700 ease-out z-10 flex flex-col justify-center p-3 opacity-90">
                                <div className="flex items-center gap-2 mb-3">
                                  <div className="w-4 h-4 rounded-full bg-brand/20" />
                                  <div className="w-12 h-2 bg-border-gray rounded" />
                                </div>
                                <div className="w-full h-1.5 bg-brand-light/20 rounded mb-1.5" />
                                <div className="w-4/5 h-1.5 bg-brand-light/20 rounded" />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
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
