import { Check } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { HexagonOutline } from "@/components/ui/SvgDecorations";
import { cn } from "@/lib/utils";
import type { ProductPricingPlan } from "@/types";

interface ProductPricingProps {
  plans: ProductPricingPlan[];
}

export default function ProductPricing({ plans }: ProductPricingProps) {
  return (
    <section className="relative overflow-hidden bg-[#f4f7f9] py-24 sm:py-32">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-white to-transparent" />
      <HexagonOutline className="absolute top-[10%] left-[-5%] opacity-[0.04] hidden lg:block" stroke="#3D7EAA" width={300} height={300} />
      <HexagonOutline className="absolute bottom-[10%] right-[-5%] opacity-[0.04] hidden lg:block" stroke="#3D7EAA" width={400} height={400} />

      <Container className="relative z-10">
        <FadeIn className="text-center max-w-2xl mx-auto mb-16 sm:mb-24">
          <SectionHeading
            subtitle="PAKET HARGA"
            title="Investasi yang Menguntungkan"
            description="Pilih paket yang paling sesuai dengan skala dan kebutuhan operasional perusahaan Anda."
          />
        </FadeIn>

        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 lg:gap-10 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <FadeIn key={plan.name} delay={0.1 + (index * 0.1)} className="flex-1">
              <div
                className={cn(
                  "relative rounded-[2rem] p-8 sm:p-10 h-full flex flex-col transition-all duration-500",
                  plan.isPopular
                    ? "bg-dark text-white shadow-2xl shadow-brand/20 md:-mt-8 md:mb-8 border border-white/10"
                    : "bg-white text-dark shadow-xl shadow-brand/[0.04] border border-border-gray hover:border-brand/30 hover:-translate-y-2 lg:mt-4"
                )}
              >
                {/* Popular: Glow effect */}
                {plan.isPopular && (
                  <div className="absolute inset-0 bg-gradient-to-b from-brand/20 to-transparent rounded-[2rem] opacity-50 pointer-events-none" />
                )}

                {/* Popular badge */}
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-brand to-[#8BC6EC] text-white text-[11px] font-bold uppercase tracking-widest px-5 py-2 rounded-full shadow-lg shadow-brand/30 ring-4 ring-dark">
                      Paling Populer
                    </span>
                  </div>
                )}

                <div className="relative z-10 flex-1 flex flex-col">
                  {/* Plan Header */}
                  <div className="mb-8">
                    <h3 className={cn(
                      "font-heading text-2xl font-bold mb-3",
                      plan.isPopular ? "text-white" : "text-dark"
                    )}>
                      {plan.name}
                    </h3>
                    <p className={cn(
                      "text-sm leading-relaxed",
                      plan.isPopular ? "text-gray-300" : "text-text-gray"
                    )}>
                      {plan.description}
                    </p>
                  </div>

                  {/* Price Area */}
                  <div className="mb-10 pb-10 border-b border-opacity-20" style={{ borderColor: plan.isPopular ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
                    {plan.price ? (
                      <div className="flex items-baseline gap-1.5">
                        <span className={cn(
                          "text-lg font-semibold",
                          plan.isPopular ? "text-brand-light" : "text-text-gray"
                        )}>
                          {plan.currency || "Rp"}
                        </span>
                        <span className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tight">
                          {plan.price}
                        </span>
                        {plan.period && (
                          <span className={cn(
                            "text-sm font-medium ml-1",
                            plan.isPopular ? "text-gray-400" : "text-text-gray"
                          )}>
                            {plan.period}
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-baseline">
                        <span className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tight">
                          Custom
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Features List */}
                  <ul className="space-y-4 mb-10 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-4">
                        <div className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                          plan.isPopular ? "bg-brand/20 text-brand-light" : "bg-brand/10 text-brand"
                        )}>
                          <Check className="w-3.5 h-3.5" strokeWidth={3} />
                        </div>
                        <span className={cn(
                          "text-sm",
                          plan.isPopular ? "text-gray-200" : "text-text-gray/90"
                        )}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button
                    href={plan.ctaHref || "/kontak"}
                    variant={plan.isPopular ? "primary" : "outlineDark"}
                    size="lg"
                    className={cn(
                      "w-full justify-center transition-all duration-300",
                      plan.isPopular ? "shadow-lg shadow-brand/30 hover:shadow-brand/50" : "hover:bg-dark hover:text-white"
                    )}
                  >
                    {plan.ctaLabel || "Mulai Sekarang"}
                  </Button>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
