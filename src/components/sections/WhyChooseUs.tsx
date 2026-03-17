import { Users, TrendingUp, Headset, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
interface WhyChooseItem {
  icon: string;
  title: string;
  description: string;
}

const iconMap: Record<string, LucideIcon> = {
  Users, TrendingUp, Headset, ShieldCheck,
};

export default function WhyChooseUs({ whyChooseItems }: { whyChooseItems: WhyChooseItem[] }) {
  return (
    <section className="bg-white py-24 relative overflow-hidden">
      <Container>
        <FadeIn>
          <SectionHeading
            subtitle="MENGAPA KAMI"
            title="Mengapa Memilih Technema?"
            description="Kami berkomitmen memberikan solusi teknologi terbaik yang mendorong pertumbuhan bisnis Anda secara berkelanjutan."
            highlightWord="Technema"
          />
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChooseItems.map((item, i) => {
            const Icon = iconMap[item.icon];
            return (
              <FadeIn key={item.title} delay={i * 0.1}>
                <div className="relative bg-light-brand rounded-[16px] p-8 text-center h-full group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand/10 mb-5 group-hover:bg-brand/20 transition-colors duration-300">
                    {Icon && <Icon className="w-8 h-8 text-brand" strokeWidth={1.5} />}
                  </div>
                  <h3 className="font-heading text-[18px] font-bold text-[#0A2540] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-text-gray text-[14px] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
