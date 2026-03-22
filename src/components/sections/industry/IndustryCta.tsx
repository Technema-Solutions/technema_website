import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";
import { ArrowRight, MessageCircle } from "lucide-react";

interface Props {
  industryName: string;
}

export default function IndustryCta({ industryName }: Props) {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-dark via-[#0F3555] to-dark relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />
      <div className="absolute top-[20%] right-[20%] w-[300px] h-[300px] rounded-full bg-brand/10 blur-[120px] pointer-events-none" />

      <Container className="relative z-10">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-heading text-[28px] sm:text-[36px] lg:text-[42px] font-bold text-white leading-tight mb-6">
              Siap Memulai Transformasi Digital {industryName}?
            </h2>
            <p className="text-[16px] sm:text-[18px] text-white/70 leading-[1.7] mb-10">
              Konsultasikan kebutuhan Anda dengan tim ahli kami. Kami siap membantu merancang solusi yang tepat untuk bisnis Anda.
            </p>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Button
                variant="primary"
                size="lg"
                href={`https://wa.me/6281234567890?text=${encodeURIComponent(`Halo Technema, saya ingin konsultasi mengenai solusi digital untuk industri ${industryName}.`)}`}
              >
                <MessageCircle className="w-5 h-5" />
                Konsultasi Gratis via WhatsApp
              </Button>
              <Button variant="outline" size="lg" href="/#industries">
                Jelajahi Industri Lainnya <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
