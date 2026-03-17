import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import FadeIn from "@/components/ui/FadeIn";

export default function ContactHero() {
  return (
    <section className="bg-gradient-to-b from-dark to-dark3 pt-32 pb-24">
      <Container>
        <FadeIn>
          <Breadcrumb
            items={[
              { label: "Beranda", href: "/" },
              { label: "Kontak" },
            ]}
          />
          <h1 className="font-heading text-[32px] sm:text-[42px] md:text-[52px] font-bold text-white leading-[1.2] mt-6 mb-4">
            Hubungi Kami
          </h1>
          <p className="text-white/70 text-[16px] sm:text-[18px] leading-[1.7] max-w-[600px]">
            Kami siap membantu Anda. Hubungi tim kami untuk konsultasi gratis
            tentang solusi teknologi terbaik untuk bisnis Anda.
          </p>
        </FadeIn>
      </Container>
    </section>
  );
}
