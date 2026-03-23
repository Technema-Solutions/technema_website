import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import { ArrowRight, HeartPulse, GraduationCap, ShoppingCart, Landmark, Factory, Building2, Truck, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { getIndustryPages } from "@/lib/data";

const iconMap: Record<string, LucideIcon> = {
  HeartPulse, GraduationCap, ShoppingCart, Landmark, Factory, Building2, Truck, Zap,
};

interface Props {
  currentSlug: string;
}

export default async function RelatedIndustries({ currentSlug }: Props) {
  const allPages = await getIndustryPages();
  const others = allPages.filter((i) => i.slug !== currentSlug);

  if (others.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <Container>
        <FadeIn>
          <SectionHeading
            subtitle="Industri Lainnya"
            title="Jelajahi Industri Lainnya"
          />
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {others.map((industry, i) => {
            const Icon = iconMap[industry.icon];
            return (
              <FadeIn key={industry.slug} delay={i * 0.1}>
                <a
                  href={`/industri/${industry.slug}`}
                  className="group block p-6 sm:p-8 rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-brand/15"
                >
                  <div className="w-14 h-14 rounded-xl bg-light-brand flex items-center justify-center mb-5 transition-colors duration-300 group-hover:bg-brand/15">
                    {Icon && <Icon className="w-7 h-7 text-brand" strokeWidth={1.5} />}
                  </div>

                  <h3 className="text-[18px] font-heading font-bold text-dark mb-2 group-hover:text-brand transition-colors">
                    {industry.name}
                  </h3>
                  <p className="text-[14px] text-text-gray leading-[1.6] mb-4">
                    {industry.tagline}
                  </p>

                  <span className="inline-flex items-center gap-1 text-[13px] font-bold text-brand uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Selengkapnya <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </a>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
