import FadeIn from "@/components/ui/FadeIn";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { CircuitPatternDark, DotGrid, HexagonOutline, ConcentricRings } from "@/components/ui/SvgDecorations";

interface ProductCtaProps {
  productName: string;
}

export default function ProductCta({ productName }: ProductCtaProps) {
  return (
    <section className="bg-dark relative overflow-hidden py-24 sm:py-32 lg:py-40">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a192f] via-dark to-[#0F3555] opacity-95" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] opacity-20" />

      {/* Circuit pattern — left */}
      <CircuitPatternDark className="absolute top-[5%] left-[2%] opacity-[0.1] z-[1] w-[600px] h-[600px] text-brand-light" />

      {/* Dot grid — right text-brand */}
      <DotGrid className="absolute bottom-[10%] right-[5%] opacity-[0.15] z-[1] hidden lg:block text-brand" />

      {/* Hexagon outlines — scattered */}
      <HexagonOutline className="absolute top-[10%] right-[10%] opacity-[0.05] z-[1] hidden lg:block" width={300} height={300} stroke="#8BC6EC" />
      <HexagonOutline className="absolute bottom-[20%] left-[8%] opacity-[0.03] z-[1] hidden lg:block" width={120} height={120} stroke="#3D7EAA" />

      {/* Floating code symbols */}
      <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden hidden lg:block">
         <span className="absolute top-[15%] left-[10%] text-[80px] font-mono text-brand-light opacity-[0.03] select-none leading-none">&lt;/&gt;</span>
         <span className="absolute bottom-[20%] right-[12%] text-[70px] font-mono text-brand opacity-[0.03] select-none leading-none">&#123; &#125;</span>
      </div>

      {/* Gradient glow orbs */}
      <div className="absolute top-[10%] right-[20%] w-[400px] h-[400px] rounded-full bg-brand-light opacity-[0.1] blur-[120px] pointer-events-none z-[1]" />
      <div className="absolute bottom-[-10%] left-[15%] w-[350px] h-[350px] rounded-full bg-brand opacity-[0.15] blur-[100px] pointer-events-none z-[1]" />

      <Container className="relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Subtle badge */}
          <FadeIn>
             <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
               <span className="w-1.5 h-1.5 rounded-full bg-brand-light animate-pulse" />
               <span className="text-xs font-semibold text-brand-light tracking-widest uppercase">
                 Langkah Selanjutnya
               </span>
             </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="font-heading text-[36px] sm:text-[48px] lg:text-[56px] font-bold text-white leading-tight mb-6 tracking-tight">
              Siap Mentransformasi Bisnis Anda dengan <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-brand">{productName}</span>?
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-gray-300 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl mx-auto font-light border-l-2 border-brand/50 pl-4">
              Jadwalkan sesi demo eksklusif dan pelajari bagaimana solusi kami dirancang khusus untuk memenuhi standar operasional enterprise Anda.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
              <Button href="/kontak" variant="primary" size="lg" className="w-full sm:w-auto text-base px-8 h-14 bg-gradient-to-r from-brand to-brand-light hover:shadow-lg hover:shadow-brand-light/30 border-0">
                Jadwalkan Demo Gratis
              </Button>
              <Button href="/kontak" variant="outlineDark" size="lg" className="w-full sm:w-auto text-base px-8 h-14 border-white/20 text-white hover:bg-white/10">
                Hubungi Tim Sales
              </Button>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
