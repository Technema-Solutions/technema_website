import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import { ArrowRight } from "lucide-react";
import { getLucideIcon } from "@/lib/icons";
import type { IndustryProcessStep } from "@/data/industries";

interface Props {
  steps: IndustryProcessStep[];
}

export default function IndustryProcess({ steps }: Props) {
  if (steps.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <Container>
        <FadeIn>
          <SectionHeading
            subtitle="Alur Kerja"
            title="Bagaimana Kami Bekerja"
            description="Proses implementasi yang terstruktur untuk memastikan hasil yang optimal."
          />
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden lg:block absolute top-[60px] left-[12.5%] right-[12.5%] h-[2px] bg-gradient-to-r from-brand/20 via-brand/40 to-brand/20 z-0" />

          {steps.map((step, i) => {
            const Icon = getLucideIcon(step.icon);
            return (
              <FadeIn key={step.title} delay={i * 0.12}>
                <div className="relative text-center group">
                  {/* Step badge */}
                  <div className="relative z-10 mx-auto mb-6">
                    <div className="w-[80px] h-[80px] mx-auto rounded-2xl bg-gradient-to-br from-brand to-brand-light flex items-center justify-center shadow-[0_8px_30px_rgba(61,126,170,0.25)] group-hover:shadow-[0_12px_40px_rgba(61,126,170,0.4)] transition-shadow duration-300">
                      {Icon && <Icon className="w-8 h-8 text-white" strokeWidth={1.5} />}
                    </div>
                    {/* Step number */}
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-dark text-white text-[12px] font-bold flex items-center justify-center">
                      {String(step.step).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="text-[17px] font-heading font-bold text-dark mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[14px] text-text-gray leading-[1.7]">
                    {step.description}
                  </p>

                  {/* Arrow to next (desktop, not last) */}
                  {i < steps.length - 1 && (
                    <ArrowRight className="hidden lg:block absolute top-[38px] -right-[20px] w-5 h-5 text-brand/30 z-10" />
                  )}
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
