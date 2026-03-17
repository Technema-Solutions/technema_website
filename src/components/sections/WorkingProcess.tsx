import { Fragment } from "react";
import { ClipboardList, Palette, Smartphone, Code } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import Container from "@/components/ui/Container";
import SectionTag from "@/components/ui/SectionTag";
interface ProcessStepItem {
  icon: string;
  title: string;
  description: string;
}
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  ClipboardList, Palette, Smartphone, Code,
};

/* Circuit board decorative SVG pattern */
function CircuitPattern() {
  return (
    <svg
      className="absolute top-0 left-0 w-[500px] h-[400px] opacity-[0.07]"
      viewBox="0 0 500 400"
      fill="none"
    >
      {/* Horizontal lines */}
      <line x1="40" y1="60" x2="200" y2="60" stroke="#0C2D48" strokeWidth="1.5" />
      <line x1="60" y1="120" x2="300" y2="120" stroke="#0C2D48" strokeWidth="1.5" />
      <line x1="100" y1="180" x2="250" y2="180" stroke="#0C2D48" strokeWidth="1.5" />
      <line x1="30" y1="240" x2="180" y2="240" stroke="#0C2D48" strokeWidth="1.5" />
      <line x1="80" y1="300" x2="320" y2="300" stroke="#0C2D48" strokeWidth="1.5" />
      {/* Vertical lines */}
      <line x1="120" y1="40" x2="120" y2="200" stroke="#0C2D48" strokeWidth="1.5" />
      <line x1="200" y1="60" x2="200" y2="180" stroke="#0C2D48" strokeWidth="1.5" />
      <line x1="250" y1="120" x2="250" y2="300" stroke="#0C2D48" strokeWidth="1.5" />
      <line x1="80" y1="180" x2="80" y2="340" stroke="#0C2D48" strokeWidth="1.5" />
      {/* Nodes / dots */}
      <circle cx="120" cy="60" r="4" fill="#0C2D48" />
      <circle cx="200" cy="60" r="4" fill="#0C2D48" />
      <circle cx="120" cy="120" r="4" fill="#0C2D48" />
      <circle cx="200" cy="120" r="6" fill="none" stroke="#0C2D48" strokeWidth="1.5" />
      <circle cx="250" cy="120" r="4" fill="#0C2D48" />
      <circle cx="120" cy="180" r="4" fill="#0C2D48" />
      <circle cx="200" cy="180" r="4" fill="#0C2D48" />
      <circle cx="250" cy="180" r="6" fill="none" stroke="#0C2D48" strokeWidth="1.5" />
      <circle cx="80" cy="240" r="4" fill="#0C2D48" />
      <circle cx="80" cy="300" r="4" fill="#0C2D48" />
      <circle cx="250" cy="300" r="4" fill="#0C2D48" />
      <circle cx="300" cy="120" r="6" fill="none" stroke="#0C2D48" strokeWidth="1.5" />
      {/* Right angle connectors */}
      <path d="M200 60 L200 40 L280 40" stroke="#0C2D48" strokeWidth="1.5" fill="none" />
      <path d="M300 120 L340 120 L340 200" stroke="#0C2D48" strokeWidth="1.5" fill="none" />
      <path d="M80 300 L80 340 L160 340" stroke="#0C2D48" strokeWidth="1.5" fill="none" />
      <circle cx="280" cy="40" r="4" fill="#0C2D48" />
      <circle cx="340" cy="200" r="4" fill="#0C2D48" />
      <circle cx="160" cy="340" r="4" fill="#0C2D48" />
    </svg>
  );
}

/* Brand decorative curve on the right */
function BrandCurve() {
  return (
    <svg
      className="absolute -top-4 -right-4 w-[280px] h-[320px] opacity-20"
      viewBox="0 0 280 320"
      fill="none"
    >
      <path
        d="M180 0 C220 80, 260 160, 240 240 C220 300, 160 320, 120 320"
        stroke="#3D7EAA"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M220 0 C260 60, 280 140, 270 220 C260 280, 200 310, 160 320"
        stroke="#3D7EAA"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
}

/* Arrow connector between cards */
function ArrowConnector() {
  return (
    <div className="hidden lg:flex items-center justify-center">
      <div className="flex items-center gap-0.5">
        <div className="w-2.5 h-2.5 rounded-full bg-brand" />
        <div className="w-6 h-[2px] bg-brand" />
        <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
          <path d="M0 0L10 6L0 12V0Z" fill="#3D7EAA" />
        </svg>
      </div>
    </div>
  );
}

export default function WorkingProcess({ processSteps }: { processSteps: ProcessStepItem[] }) {
  return (
    <section className="bg-[#f4f4f4] py-24 relative overflow-hidden">
      {/* Decorative backgrounds */}
      <CircuitPattern />
      <BrandCurve />

      <Container>
        {/* Header Row */}
        <FadeIn className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-14">
          <div className="lg:max-w-[480px]">
            <div className="mb-5">
              <SectionTag>PROSES KERJA KAMI</SectionTag>
            </div>
            <h2 className="font-heading text-[32px] md:text-[40px] font-bold text-[#0A2540] leading-[1.2]">
              Inti dari Proses Kerja Kami yang Mudah
            </h2>
          </div>
          <p className="text-text-gray text-[16px] leading-relaxed lg:max-w-[400px]">
            Kami mengikuti proses yang terstruktur untuk memberikan hasil terbaik. Dari analisis kebutuhan awal hingga pengembangan akhir, setiap langkah dirancang untuk kejelasan dan efisiensi.
          </p>
        </FadeIn>

        {/* Process Steps */}
        <div className="relative z-10 flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:gap-6 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:gap-0 items-stretch">
          {processSteps.map((step, index) => {
            const Icon = iconMap[step.icon];
            return (
              <Fragment key={step.title}>
                <FadeIn delay={index * 0.12}>
                  <div className="relative bg-white rounded-[12px] p-6 text-center h-full flex flex-col items-center">
                    <span className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-brand to-brand-light text-white text-[13px] font-bold flex items-center justify-center shadow-md">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="mb-4">
                      {Icon && <Icon className="w-[48px] h-[48px] text-brand" strokeWidth={1.5} />}
                    </div>
                    <h3 className="font-heading text-[18px] font-bold text-[#0A2540] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-text-gray text-[14px] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </FadeIn>
                {index < processSteps.length - 1 && (
                  <>
                    <div className="flex justify-center sm:hidden">
                      <div className="w-[2px] h-6 bg-brand/20 rounded-full" />
                    </div>
                    <ArrowConnector />
                  </>
                )}
              </Fragment>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
