import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { BrandCurve } from "@/components/ui/SvgDecorations";
interface RelatedProductItem {
  slug: string;
  name: string;
  tagline: string;
  logo?: string | null;
}

interface RelatedProductsProps {
  products: RelatedProductItem[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <section className="relative overflow-hidden bg-[#f4f7f9] py-24 sm:py-32">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-white via-transparent to-transparent opacity-60 pointer-events-none" />
      <BrandCurve className="absolute -top-10 -right-10 opacity-[0.05] hidden lg:block text-brand w-[600px] h-[600px] pointer-events-none" />

      <Container className="relative z-10">
        <FadeIn className="text-center max-w-2xl mx-auto mb-16 sm:mb-24">
          <SectionHeading
            subtitle="EKSPLORASI EKOSISTEM"
            title="Lengkapi Infrastruktur Digital Anda"
            description="Temukan rangkaian solusi Technema yang dirancang untuk saling terintegrasi dan memperkuat performa bisnis Anda secara komprehensif."
          />
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {products.map((product, index) => (
            <FadeIn key={product.slug} delay={index * 0.1} className="h-full">
              <Link
                href={`/produk/${product.slug}`}
                className="relative group block bg-white border border-border-gray rounded-3xl p-8 sm:p-10 h-full hover:border-brand/40 hover:shadow-2xl hover:shadow-brand/[0.06] hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              >
                {/* Subtle Hover Glow Inside */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Animated Top Border */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand to-brand-light transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />

                <div className="relative z-10 flex flex-col h-full">
                   {/* Logo / Icon Area */}
                   {product.logo ? (
                     <div className="w-16 h-16 rounded-2xl bg-[#f8fcfd] border border-brand/10 flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-500 overflow-hidden">
                       <Image
                         src={product.logo}
                         alt={product.name}
                         width={48}
                         height={48}
                         className="w-10 h-10 object-contain"
                       />
                     </div>
                   ) : (
                     <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand/5 to-brand-light/10 border border-brand/10 flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-500" />
                   )}
                   
                   <h3 className="font-heading text-xl font-bold text-dark mb-3 group-hover:text-brand transition-colors duration-300">
                     {product.name}
                   </h3>
                   
                   <p className="text-text-gray/90 text-[15px] leading-relaxed mb-8 flex-1 font-light">
                     {product.tagline}
                   </p>
                   
                   {/* Interactive Footer */}
                   <div className="mt-auto pt-5 border-t border-border-gray/50 group-hover:border-brand/20 flex items-center justify-between transition-colors duration-300">
                     <span className="text-xs font-bold text-brand uppercase tracking-widest opacity-0 transform -translate-x-4 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                       Eksplorasi Solusi
                     </span>
                     <div className="w-10 h-10 rounded-full bg-brand/5 flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all duration-500">
                       <ArrowRight className="w-4 h-4 transform group-hover:-rotate-45 transition-transform duration-500" strokeWidth={2} />
                     </div>
                   </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
