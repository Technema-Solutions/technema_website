import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
import SectionTag from "@/components/ui/SectionTag";
import Button from "@/components/ui/Button";
import { ArrowRight, Handshake, TrendingUp, Play } from "lucide-react";
import type { IndustryCaseStudyData } from "@/data/industries";

interface Props {
  industryName: string;
  caseStudy: IndustryCaseStudyData;
}

function extractYouTubeId(url: string): string | null {
  // Handle youtu.be/ID and youtube.com/watch?v=ID
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (shortMatch) return shortMatch[1];
  const longMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (longMatch) return longMatch[1];
  return null;
}

export default function IndustryCaseStudy({ industryName, caseStudy }: Props) {
  const videoId = caseStudy.videoUrl ? extractYouTubeId(caseStudy.videoUrl) : null;

  return (
    <section
      id="case-study"
      className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-dark via-[#0F3555] to-dark relative"
    >
      {/* Decorative */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
        backgroundSize: "50px 50px",
      }} />
      <div className="absolute top-[10%] left-[10%] w-[300px] h-[300px] rounded-full bg-brand/[0.06] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[5%] right-[15%] w-[250px] h-[250px] rounded-full bg-brand-light/[0.05] blur-[100px] pointer-events-none" />

      <Container className="relative z-10">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-10 sm:mb-12">
            <SectionTag variant="dark" className="mb-6">
              {caseStudy.tag}
            </SectionTag>
            <h2 className="font-heading text-[26px] sm:text-[34px] lg:text-[40px] font-bold text-white leading-tight mb-5">
              {caseStudy.title}
            </h2>
            {/* Partner badge */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-sm">
              <Handshake className="w-4 h-4 text-brand-light" />
              <span className="text-[14px] text-white/70 font-medium">
                Bermitra dengan <strong className="text-brand-light">{caseStudy.partnerName}</strong>
              </span>
            </div>
          </div>
        </FadeIn>

        {/* Stats strip */}
        <FadeIn>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-12">
            {caseStudy.results.map((r, i) => (
              <div
                key={r.label}
                className="relative bg-white/[0.04] border border-white/10 rounded-xl p-4 sm:p-5 text-center backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.08] hover:border-brand-light/25 overflow-hidden"
              >
                <span className="absolute top-1.5 right-2.5 text-[32px] font-heading font-bold text-white/[0.03] leading-none select-none pointer-events-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-heading text-[22px] sm:text-[26px] font-bold text-brand-light mb-1 relative">
                  {r.value}
                </p>
                <p className="text-[12px] sm:text-[13px] text-white/55 font-medium relative">
                  {r.label}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Two-column content */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
          {/* Left — Narrative card (dynamic height) */}
          <FadeIn className="flex-1 w-full">
            <div className="relative bg-white/[0.04] border border-white/10 rounded-2xl backdrop-blur-sm overflow-hidden">
              {/* Left accent bar */}
              <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-brand via-brand-light to-brand/50 rounded-l-2xl" />

              <div className="p-6 sm:p-8 pl-8 sm:pl-10">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-brand-light/10 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-brand-light" />
                  </div>
                  <span className="text-[13px] font-bold uppercase tracking-wider text-brand-light">
                    Latar Belakang
                  </span>
                </div>

                <p className="text-[15px] sm:text-[16px] text-white/70 leading-[1.8] mb-8">
                  {caseStudy.narrative}
                </p>

                <Button
                  variant="primary"
                  href={`https://wa.me/6281234567890?text=${encodeURIComponent(`Halo Technema, saya ingin tahu lebih lanjut tentang solusi untuk industri ${industryName}.`)}`}
                >
                  Pelajari Lebih Lanjut <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </FadeIn>

          {/* Right — YouTube video (sticky like Solutions panel) */}
          <FadeIn delay={0.15} direction="right" className="flex-1 w-full">
            <div className="lg:sticky lg:top-[100px]">
            {videoId ? (
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.04] backdrop-blur-sm">
                {/* Video label */}
                <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.06]">
                  <Play className="w-4 h-4 text-brand-light" />
                  <span className="text-[13px] font-bold uppercase tracking-wider text-brand-light">
                    Video Solusi
                  </span>
                </div>

                {/* 16:9 iframe */}
                <div className="aspect-video">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
                    title={caseStudy.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </div>
            ) : (
              /* Fallback when no video — decorative placeholder */
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.04] backdrop-blur-sm aspect-video flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-brand/20 flex items-center justify-center mx-auto mb-4">
                    <Play className="w-8 h-8 text-brand-light ml-1" />
                  </div>
                  <p className="text-[14px] text-white/40 font-medium">Video segera hadir</p>
                </div>
              </div>
            )}
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
