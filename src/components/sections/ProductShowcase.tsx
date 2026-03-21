import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import Container from "@/components/ui/Container";
import SectionTag from "@/components/ui/SectionTag";

interface ProductItem {
  name: string;
  slug: string;
  tagline: string;
  features: unknown; // Json from Prisma
  icon: string;
  logo?: string | null;
}

export default function ProductShowcase({ products }: { products: ProductItem[] }) {
  return (
    <section id="products" className="bg-white py-24">
      <Container>
        {/* Header */}
        <FadeIn className="text-center mb-14">
          <div className="flex justify-center mb-5">
            <SectionTag variant="light">PRODUK TECHNEMA</SectionTag>
          </div>
          <h2 className="font-heading text-[28px] sm:text-[36px] md:text-[42px] font-bold text-[#0A2540] leading-[1.25] mb-4">
            Produk Digital Inovatif
            <br />
            untuk Bisnis Anda
          </h2>
          <p className="text-[16px] text-[#7a7a7a] leading-[1.7] max-w-2xl mx-auto">
            Tingkatkan operasional Anda dengan rangkaian solusi digital kami yang dirancang untuk menyederhanakan alur kerja dan mempercepat pertumbuhan.
          </p>
        </FadeIn>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <FadeIn key={product.name} delay={index * 0.1}>
              <div className="group relative bg-white border border-[#e1e1e1] rounded-[16px] p-5 sm:p-7 h-full flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.12)] hover:border-brand/30">
                {/* Top accent — hidden by default, visible on hover */}
                <div className="absolute top-0 left-6 right-6 h-[3px] bg-brand rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Logo */}
                {product.logo && (
                  <Image
                    src={product.logo}
                    alt={product.name}
                    width={56}
                    height={56}
                    className="w-[56px] h-[56px] object-contain rounded-[12px] mb-5"
                  />
                )}

                {/* Name */}
                <h3 className="font-heading text-[20px] font-bold text-[#0A2540] mb-2">
                  {product.name}
                </h3>

                {/* Tagline */}
                <p className="text-[14px] text-[#7a7a7a] leading-[1.6] mb-5">
                  {product.tagline}
                </p>

                {/* Features */}
                <ul className="space-y-2.5 mb-6 flex-1">
                  {(product.features as string[]).map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-[13.5px] text-[#555]">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
                        <circle cx="8" cy="8" r="8" fill="#3D7EAA" opacity="0.1" />
                        <path d="M5.5 8l2 2 3.5-3.5" stroke="#3D7EAA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Learn More */}
                <Link
                  href={`/produk/${product.slug}`}
                  className="inline-flex items-center gap-2 text-[13px] font-semibold text-brand uppercase tracking-wider group/link"
                >
                  Selengkapnya
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" />
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
