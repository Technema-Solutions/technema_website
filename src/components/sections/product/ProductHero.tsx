import Image from "next/image";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import { CircuitPatternDark, DotGrid } from "@/components/ui/SvgDecorations";
import { CONTACT_PHONE } from "@/lib/constants";
import type { ProductDetail } from "@/types";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface ProductHeroProps {
  product: ProductDetail;
  breadcrumbItems?: BreadcrumbItem[];
}

export default function ProductHero({ product, breadcrumbItems }: ProductHeroProps) {
  return (
    <section className="bg-dark relative overflow-hidden pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 lg:pb-24 border-b border-white/5">
      {/* Dynamic Background Gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a192f] via-dark to-[#0F3555] opacity-90" />
        <div className="absolute top-0 right-[-10%] w-[50%] h-[50%] bg-brand/20 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#3D7EAA]/20 blur-[150px] rounded-full pointer-events-none" />
        
        {/* Subtle Grid Pattern — full width, fades out toward bottom */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
          }}
        />
      </div>

      {/* Futuristic Decorations */}
      <CircuitPatternDark className="absolute top-[10%] left-[2%] opacity-10 z-[1] hidden lg:block" />
      <DotGrid className="absolute bottom-[5%] right-[5%] opacity-[0.1] z-[1] hidden md:block" />
      
      <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden hidden xl:block">
        <span className="absolute top-[20%] right-[15%] text-[40px] font-mono text-brand/20 select-none opacity-50">{"{ }"}</span>
        <span className="absolute bottom-[25%] left-[25%] text-[50px] font-mono text-brand/10 select-none opacity-50">{"</>"}</span>
      </div>

      <Container className="relative z-10">
        {/* Breadcrumb */}
        {breadcrumbItems && (
          <div className="mb-8 sm:mb-10">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <FadeIn direction="up">
            <div className="max-w-2xl">
              
              {/* Overline Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/10 border border-brand/20 backdrop-blur-md mb-5">
                <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
                <span className="text-xs sm:text-sm font-semibold text-brand tracking-wide uppercase">
                  Enterprise Solution
                </span>
              </div>

              {/* Product Identity */}
              <div className="flex items-center gap-5 mb-6">
                {product.logo && (
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0">
                    <div className="absolute inset-0 bg-white/5 rounded-2xl backdrop-blur-xl border border-white/10 flex items-center justify-center p-3 shadow-2xl shadow-black/50 overflow-hidden transform group-hover:scale-105 transition-transform duration-500">
                      <Image
                        src={product.logo}
                        alt={product.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-contain"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-50 mix-blend-overlay" />
                    </div>
                  </div>
                )}
                <div>
                  <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl tracking-tight font-extrabold text-white mb-2 leading-[1.1]">
                    {product.name}
                  </h1>
                  <h2 className="text-xl sm:text-2xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-[#8BC6EC]">
                    {product.tagline}
                  </h2>
                </div>
              </div>

              {/* Clean separator */}
              <div className="w-12 h-1 bg-brand rounded-full mb-5 opacity-80" />

              {/* Description */}
              <p className="text-gray-300/90 text-lg sm:text-xl leading-relaxed mb-8 max-w-xl font-light">
                {product.description}
              </p>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                <Button
                  href={`https://wa.me/${CONTACT_PHONE.replace(/\D/g, "")}?text=${encodeURIComponent(`Halo Technema, saya tertarik dengan produk ${product.name}. Boleh minta demo?`)}`}
                  variant="primary"
                  size="lg"
                  className="shadow-lg shadow-brand/25 group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Minta Demo
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </Button>
              </div>

            </div>
          </FadeIn>

          {/* Right Column: High-end Visual Presentation */}
          <FadeIn direction="left" delay={0.2} className="relative hidden lg:block">
            {/* The main visual container */}
            <div className="relative w-full aspect-[4/3] preserve-3d perspective-1000 group">
              
              {/* Outer decorative glowing ring */}
              <div className="absolute inset-[-1.5rem] bg-gradient-to-tr from-brand/30 via-brand-light/20 to-transparent rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-700" />
              
              <div className="absolute inset-0 transform rotate-y-[-5deg] rotate-x-[5deg] group-hover:rotate-y-0 group-hover:rotate-x-0 transition-transform duration-700 ease-out z-10 bg-[#0c1a2c] rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
                
                {/* Browser/Window mockup header */}
                <div className="h-8 bg-white/5 backdrop-blur-md border-b border-white/10 flex items-center px-4 gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                  </div>
                  <div className="flex-1 px-4">
                    <div className="w-full h-4 bg-white/5 rounded mx-auto max-w-[200px]" />
                  </div>
                </div>

                {/* Content Area */}
                <div className="relative w-full h-[calc(100%-2rem)] bg-dark/50 p-1 flex mt-0">
                  {product.heroImage ? (
                    /\.(mp4|webm)$/i.test(product.heroImage) ? (
                      <video src={product.heroImage} autoPlay loop muted playsInline className="w-full h-full object-cover object-top rounded-b-xl" />
                    ) : /\.(svg|gif)$/i.test(product.heroImage) ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={product.heroImage} alt={`${product.name} interface`} className="w-full h-full object-cover object-top rounded-b-xl" />
                    ) : (
                      <Image
                        src={product.heroImage}
                        alt={`${product.name} interface`}
                        fill
                        className="object-cover object-top rounded-b-xl"
                      />
                    )
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0c1a2c] to-[#0A192F] opacity-90 relative overflow-hidden rounded-xl">
                       <CircuitPatternDark className="absolute opacity-5 size-full" />
                       <div className="relative z-10 flex flex-col items-center">
                          {product.logo && (
                            <Image
                              src={product.logo}
                              alt={product.name}
                              width={100}
                              height={100}
                              className="w-20 h-20 object-contain mx-auto mb-6 opacity-40 drop-shadow-2xl grayscale"
                            />
                          )}
                          <p className="text-white/30 text-xs tracking-[0.2em] font-medium uppercase font-mono">
                            System Interface
                          </p>
                       </div>
                    </div>
                  )}
                  {/* Subtle glare effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
                </div>
              </div>
              
              {/* Floating decorative UI elements */}
              <div className="absolute -right-8 top-1/4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-20 animate-float-slow hidden xl:flex items-center gap-2.5 px-4 py-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-white/90">Secure & Verified</div>
                  <div className="text-[9px] text-white/40 font-mono">Enterprise-grade</div>
                </div>
              </div>

              <div className="absolute -left-10 bottom-1/4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-20 animate-float-slower hidden xl:flex items-center gap-2.5 px-4 py-3">
                <div className="relative flex items-center justify-center w-8 h-8">
                  <span className="absolute w-3 h-3 rounded-full bg-emerald-400 animate-ping opacity-40" />
                  <span className="relative w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-white/90">Live System</div>
                  <div className="text-[9px] text-white/40 font-mono">Always running</div>
                </div>
              </div>

            </div>
          </FadeIn>

        </div>
      </Container>
    </section>
  );
}
