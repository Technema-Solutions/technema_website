import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import { getLucideIcon } from "@/lib/icons";
import type { IndustryFeature } from "@/data/industries";

interface Props {
  features: IndustryFeature[];
}

export default function IndustryFeatures({ features }: Props) {
  if (features.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#F8FAFB]">
      <Container>
        <FadeIn>
          <SectionHeading
            subtitle="Fitur"
            title="Fitur Unggulan"
            description="Teknologi terdepan yang mendukung solusi kami."
          />
        </FadeIn>

        <div className="space-y-0">
          {features.map((feat, i) => {
            const Icon = getLucideIcon(feat.icon);
            const isEven = i % 2 === 1;
            const isLast = i === features.length - 1;

            return (
              <FadeIn key={feat.title} delay={i * 0.08}>
                <div className={`group py-8 sm:py-10 ${!isLast ? "border-b border-gray-200/70" : ""}`}>
                  <div className={`flex flex-col sm:flex-row items-center gap-6 sm:gap-10 ${isEven ? "sm:flex-row-reverse" : ""}`}>
                    {/* Icon circle with gradient ring */}
                    <div className="relative flex-shrink-0">
                      {/* Outer gradient ring */}
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-[3px] bg-gradient-to-br from-brand to-brand-light transition-shadow duration-300 group-hover:shadow-[0_0_30px_rgba(61,126,170,0.25)]">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                          {Icon && <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-brand transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />}
                        </div>
                      </div>

                      {/* Decorative accent dot */}
                      <div className={`absolute w-3 h-3 rounded-full bg-brand-light/60 ${isEven ? "-left-1 top-2" : "-right-1 bottom-2"}`} />
                    </div>

                    {/* Text content */}
                    <div className={`flex-1 min-w-0 text-center sm:text-left ${isEven ? "sm:text-right" : ""}`}>
                      <h3 className="text-[18px] sm:text-[20px] font-heading font-bold text-dark mb-2 transition-colors duration-300 group-hover:text-brand">
                        {feat.title}
                      </h3>
                      <p className="text-[14px] sm:text-[15px] text-text-gray leading-[1.7] max-w-[520px] mx-auto sm:mx-0">
                        {feat.description}
                      </p>
                    </div>

                    {/* Side accent bar (desktop) */}
                    <div className={`hidden lg:block w-[4px] h-12 rounded-full transition-all duration-300 ${
                      isEven
                        ? "bg-gradient-to-b from-brand-light/30 to-brand/10 group-hover:from-brand-light/60 group-hover:to-brand/30"
                        : "bg-gradient-to-b from-brand/10 to-brand-light/30 group-hover:from-brand/30 group-hover:to-brand-light/60"
                    }`} />
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
