import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import { getLucideIcon } from "@/lib/icons";
import type { IndustryChallenge } from "@/data/industries";

interface Props {
  industryName: string;
  challenges: IndustryChallenge[];
}

export default function IndustryChallenges({ industryName, challenges }: Props) {
  if (challenges.length === 0) return null;

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-dark via-[#0F3555] to-dark overflow-hidden">
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
        backgroundSize: "50px 50px",
      }} />

      {/* Glow blobs */}
      <div className="absolute top-[10%] right-[15%] w-[350px] h-[350px] rounded-full bg-brand-light/[0.06] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[5%] left-[10%] w-[250px] h-[250px] rounded-full bg-brand/[0.05] blur-[100px] pointer-events-none" />

      <Container className="relative z-10">
        <FadeIn>
          <SectionHeading
            light
            subtitle="Tantangan"
            title={`Tantangan di Industri ${industryName}`}
            description="Permasalahan yang sering dihadapi dan bagaimana kami dapat membantu mengatasinya."
          />
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {challenges.map((item, i) => {
            const Icon = getLucideIcon(item.icon);
            const num = String(i + 1).padStart(2, "0");
            return (
              <FadeIn key={item.title} delay={i * 0.1}>
                <div className="group relative p-6 sm:p-8 rounded-2xl bg-white/[0.05] border border-white/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-light/30 hover:bg-white/[0.08] h-full">
                  {/* Top accent line */}
                  <div className="absolute top-0 left-6 right-6 h-[2px] rounded-b-full bg-gradient-to-r from-brand to-brand-light" />

                  {/* Large faded number */}
                  <span className="absolute top-4 right-6 font-heading text-[56px] sm:text-[64px] font-bold leading-none text-white/[0.04] select-none pointer-events-none">
                    {num}
                  </span>

                  {/* Icon */}
                  <div className="relative w-14 h-14 rounded-xl bg-brand-light/10 flex items-center justify-center mb-5 transition-colors duration-300 group-hover:bg-brand-light/20">
                    {Icon && <Icon className="w-7 h-7 text-brand-light" strokeWidth={1.5} />}
                  </div>

                  <h3 className="text-[18px] font-heading font-bold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-[15px] text-white/60 leading-[1.7]">
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
