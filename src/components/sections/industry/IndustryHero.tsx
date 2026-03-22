import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
import SectionTag from "@/components/ui/SectionTag";
import Button from "@/components/ui/Button";
import Breadcrumb from "@/components/ui/Breadcrumb";
import {
  HeartPulse, GraduationCap, ShoppingCart, Landmark,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  HeartPulse, GraduationCap, ShoppingCart, Landmark,
};

interface IndustryHeroProps {
  name: string;
  icon: string;
  heading: string;
  highlight: string;
  description: string;
}

export default function IndustryHero({ name, icon, heading, highlight, description }: IndustryHeroProps) {
  const Icon = iconMap[icon];

  const renderHeading = () => {
    const idx = heading.indexOf(highlight);
    if (idx === -1) return heading;
    return (
      <>
        {heading.slice(0, idx)}
        <span className="text-brand">{highlight}</span>
        {heading.slice(idx + highlight.length)}
      </>
    );
  };

  return (
    <section className="relative pt-[80px] bg-white border-b border-gray-100 overflow-hidden">
      {/* Topographic contour lines — unique background texture */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none" preserveAspectRatio="xMidYMid slice" viewBox="0 0 800 600" fill="none" stroke="var(--color-brand)" strokeWidth="0.8">
        {/* Organic concentric contour curves */}
        <path d="M400,300 C380,260 340,240 300,250 C260,260 230,290 220,330 C210,370 230,410 270,430 C310,450 360,440 400,410 C440,380 460,340 440,300 Z" />
        <path d="M400,300 C370,240 310,210 250,230 C190,250 150,310 160,370 C170,430 230,480 300,480 C370,480 430,440 450,380 C470,320 440,270 400,300 Z" />
        <path d="M400,300 C360,210 270,170 190,200 C110,230 60,320 80,410 C100,500 190,560 300,550 C410,540 490,470 500,370 C510,270 460,220 400,300 Z" />
        <path d="M400,300 C350,180 230,120 130,170 C30,220 -30,350 10,460 C50,570 180,640 320,620 C460,600 560,500 560,360 C560,220 480,170 400,300 Z" />
        <path d="M400,300 C340,150 180,70 60,140 C-60,210 -110,380 -60,510 C-10,640 160,720 340,690 C520,660 630,530 620,360 C610,190 500,140 400,300 Z" />
        {/* Secondary cluster — right side */}
        <path d="M620,250 C600,220 570,210 540,220 C510,230 490,260 500,290 C510,320 540,340 570,330 C600,320 620,290 620,260 Z" />
        <path d="M620,250 C590,200 540,180 490,200 C440,220 410,270 430,320 C450,370 510,400 570,380 C630,360 660,300 640,250 Z" />
        <path d="M620,250 C580,170 500,140 430,170 C360,200 320,280 350,360 C380,440 480,480 580,440 C680,400 710,310 670,240 Z" />
      </svg>

      {/* Soft gradient accents */}
      <div className="absolute top-[20%] right-[5%] w-[300px] h-[300px] rounded-full bg-brand/[0.03] blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[10%] w-[200px] h-[200px] rounded-full bg-brand-light/[0.04] blur-[60px] pointer-events-none" />

      <Container className="relative z-10 py-12 sm:py-16 lg:py-20">
        {/* Breadcrumb */}
        <FadeIn>
          <div className="mb-6">
            <Breadcrumb items={[
              { label: "Beranda", href: "/" },
              { label: "Industri" },
              { label: name },
            ]} />
          </div>
        </FadeIn>

        <div className="flex items-center gap-10 lg:gap-16">
          {/* Left content */}
          <FadeIn className="flex-1 min-w-0">
            <SectionTag variant="light" className="mb-6">
              Industri {name}
            </SectionTag>

            <h1 className="font-heading text-[28px] sm:text-[38px] lg:text-[48px] font-bold leading-[1.2] text-dark mb-6">
              {renderHeading()}
            </h1>

            <p className="text-[16px] sm:text-[18px] leading-[1.7] text-text-gray max-w-[600px] mb-8">
              {description}
            </p>

            <div className="flex items-center gap-4 flex-wrap">
              <Button
                variant="primary"
                href={`https://wa.me/6281234567890?text=${encodeURIComponent(`Halo Technema, saya tertarik dengan solusi untuk industri ${name}.`)}`}
              >
                Konsultasi Gratis
              </Button>
              <Button variant="outlineDark" href="#case-study">
                Lihat Studi Kasus
              </Button>
            </div>
          </FadeIn>

          {/* Right decorative — Isometric 3D blocks with icon */}
          <FadeIn delay={0.2} direction="right" className="hidden lg:flex flex-shrink-0">
            <div className="relative w-[320px] h-[320px] flex items-center justify-center" style={{ perspective: "600px" }}>
              {/* Back block */}
              <div
                className="absolute w-[140px] h-[140px] rounded-3xl bg-gradient-to-br from-brand/[0.08] to-brand-light/[0.04] border border-brand/10"
                style={{ transform: "translate3d(50px, -40px, -30px) rotateX(8deg) rotateY(-12deg)" }}
              />
              {/* Middle block */}
              <div
                className="absolute w-[130px] h-[130px] rounded-2xl bg-gradient-to-br from-light-brand to-brand/[0.06] border border-brand/15 shadow-lg shadow-brand/5"
                style={{ transform: "translate3d(-30px, 30px, -15px) rotateX(5deg) rotateY(-8deg)" }}
              />
              {/* Front block */}
              <div
                className="absolute w-[120px] h-[120px] rounded-2xl bg-gradient-to-br from-brand/[0.12] to-brand-light/[0.08] border border-brand/20 shadow-xl shadow-brand/10"
                style={{ transform: "translate3d(20px, 50px, 0px) rotateX(3deg) rotateY(-5deg)" }}
              />
              {/* Top accent block */}
              <div
                className="absolute w-[80px] h-[80px] rounded-xl bg-gradient-to-br from-brand-light/10 to-transparent border border-brand-light/15"
                style={{ transform: "translate3d(-50px, -50px, 10px) rotateX(10deg) rotateY(-15deg)" }}
              />

              {/* Center icon — floating above blocks */}
              <div className="relative z-10 w-[100px] h-[100px] rounded-2xl bg-gradient-to-br from-brand to-brand-light flex items-center justify-center shadow-[0_12px_48px_rgba(61,126,170,0.3)]">
                {Icon && <Icon className="w-12 h-12 text-white" strokeWidth={1.5} />}
              </div>

              {/* Connecting lines from blocks to icon */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.12]" viewBox="0 0 320 320" fill="none" stroke="var(--color-brand)" strokeWidth="1" strokeDasharray="4 4">
                <line x1="210" y1="120" x2="170" y2="150" />
                <line x1="100" y1="190" x2="140" y2="170" />
                <line x1="180" y1="210" x2="170" y2="180" />
              </svg>

              {/* Small floating dots */}
              <div className="absolute top-6 left-10 w-2.5 h-2.5 rounded-full bg-brand/20" />
              <div className="absolute bottom-12 right-8 w-2 h-2 rounded-full bg-brand-light/25" />
              <div className="absolute top-1/2 left-0 w-1.5 h-1.5 rounded-full bg-brand/15" />
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
