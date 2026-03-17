"use client";

import { Quote } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import FadeIn from "@/components/ui/FadeIn";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import type { ProductTestimonial } from "@/types";

interface ProductTestimonialsProps {
  testimonials: ProductTestimonial[];
  productName: string;
}

function TestimonialCard({ t }: { t: ProductTestimonial }) {
  const initials = t.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="group bg-white rounded-2xl p-6 sm:p-8 border border-border-gray h-full flex flex-col hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/5 transition-all duration-300">
      {/* Inner quote area */}
      <div className="bg-light-brand rounded-xl p-5 flex-1 flex flex-col mb-5">
        <Quote className="w-10 h-10 text-brand/30 mb-4 group-hover:scale-110 transition-transform duration-300" />
        <p className="text-text-gray text-base leading-relaxed flex-1 italic">
          &ldquo;{t.content}&rdquo;
        </p>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-border-gray my-5" />

      {/* Avatar + gradient flanking lines */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent to-brand/20" />
        {t.avatar ? (
          <img
            src={t.avatar}
            alt={t.name}
            className="w-11 h-11 rounded-full object-cover ring-2 ring-brand/30"
          />
        ) : (
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-brand to-brand-light flex items-center justify-center text-white font-bold text-sm ring-2 ring-brand/30">
            {initials}
          </div>
        )}
        <div className="flex-1 h-[2px] bg-gradient-to-l from-transparent to-brand/20" />
      </div>

      {/* Author info */}
      <div className="text-center mt-3">
        <p className="font-heading text-sm font-bold text-dark">{t.name}</p>
        <p className="text-text-gray text-xs">
          {t.role}, {t.company}
        </p>
      </div>
    </div>
  );
}

export default function ProductTestimonials({ testimonials, productName }: ProductTestimonialsProps) {
  return (
    <section className="relative overflow-hidden bg-light-brand py-20 sm:py-24">
      {/* Scoped pagination styles */}
      <style>{`
        .product-testi-swiper .swiper-pagination {
          position: relative;
          margin-top: 32px;
        }
        .product-testi-swiper .swiper-pagination-bullet {
          background: #c4d5e0;
          opacity: 1;
          width: 10px;
          height: 10px;
          transition: all 0.3s ease;
        }
        .product-testi-swiper .swiper-pagination-bullet-active {
          background: var(--color-brand);
          width: 24px;
          border-radius: 5px;
        }
        @media (min-width: 768px) {
          .product-testi-swiper .swiper-pagination {
            display: none;
          }
        }
      `}</style>

      {/* Dot pattern background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1200 600"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern id="product-testi-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1.5" fill="#0C2D48" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#product-testi-dots)" />
        </svg>
      </div>

      {/* Radial gradient overlay */}
      <div
        className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(61,126,170,0.04), transparent 70%)",
        }}
      />

      <Container className="relative z-10">
        <FadeIn>
          <SectionHeading
            subtitle="TESTIMONI"
            title={`Apa Kata Pengguna ${productName}`}
            description="Pengalaman nyata dari bisnis yang sudah menggunakan produk kami"
          />
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="product-testi-swiper max-w-4xl mx-auto">
            <Swiper
              modules={[Pagination]}
              slidesPerView={1.1}
              spaceBetween={16}
              pagination={{ clickable: true }}
              breakpoints={{
                768: { slidesPerView: 2, spaceBetween: 24 },
                1024: { slidesPerView: 2, spaceBetween: 32 },
              }}
            >
              {testimonials.map((t) => (
                <SwiperSlide key={t.name} className="!h-auto pb-1">
                  <TestimonialCard t={t} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
