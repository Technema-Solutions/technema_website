"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import FadeIn from "@/components/ui/FadeIn";
import Container from "@/components/ui/Container";
import SectionTag from "@/components/ui/SectionTag";
import { Icons } from "@/components/ui/Icons";
interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

export default function Testimonials({ testimonials }: { testimonials: TestimonialItem[] }) {
  return (
    <section className="relative overflow-hidden py-24 bg-dark">
      {/* Scoped pagination dot styles */}
      <style>{`
        .testimonials-swiper .swiper-pagination {
          position: relative;
          margin-top: 40px;
        }
        .testimonials-swiper .swiper-pagination-bullet {
          background: rgba(255,255,255,0.3);
          opacity: 1;
          width: 12px;
          height: 12px;
          transition: all 0.3s ease;
        }
        .testimonials-swiper .swiper-pagination-bullet-active {
          background: var(--color-brand);
          width: 28px;
          border-radius: 6px;
        }
      `}</style>

      {/* World map pattern background */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1200 600"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="dots"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="10" cy="10" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(61,126,170,0.06), transparent 70%)",
        }}
      />

      <Container className="relative z-10">
        <FadeIn>
          <div className="text-center mb-14">
            <SectionTag>TESTIMONI</SectionTag>
            <h2 className="font-heading text-[28px] sm:text-[36px] md:text-[42px] font-bold leading-[1.31] mt-5" style={{ color: '#ffffff' }}>
              Apa Kata Pelanggan Kami
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="testimonials-swiper">
            <Swiper
              modules={[Pagination]}
              slidesPerView={1}
              spaceBetween={24}
              loop={true}
              pagination={{ clickable: true }}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {testimonials.map((t) => (
                <SwiperSlide key={t.id}>
                  {/* Card */}
                  <div className="bg-dark2 rounded-2xl p-4 sm:p-6 min-h-[350px] sm:min-h-[420px] flex flex-col border border-white/[0.06] transition-all duration-300 hover:-translate-y-1">
                    {/* Inner quote box */}
                    <div className="bg-dark3 rounded-xl p-6 flex-1 flex flex-col">
                      {/* Quote icon */}
                      <div className="mb-4">{Icons.quote}</div>
                      {/* Quote text */}
                      <p className="text-white/90 text-[15px] leading-[1.8] flex-1">
                        {t.content}
                      </p>
                    </div>

                    {/* Divider */}
                    <div className="w-full h-px bg-white/10 my-5" />

                    {/* Stars */}
                    <div className="flex gap-1.5 mb-3">
                      {[...Array(t.rating)].map((_, j) => (
                        <svg key={j} width="18" height="18" viewBox="0 0 24 24" fill="var(--color-brand)" stroke="none">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      ))}
                    </div>

                    {/* Author: Name + Role inline */}
                    <div className="flex items-center gap-3">
                      <span className="text-white font-bold text-[16px] font-heading">{t.name}</span>
                      <span className="text-brand-light text-[12px] font-bold uppercase tracking-wider">{t.role}</span>
                    </div>
                  </div>

                  {/* Avatar + gradient lines below card */}
                  <div className="flex items-center justify-center mt-5 gap-3 px-4">
                    <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent to-brand" />
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      width={48}
                      height={48}
                      className="rounded-full object-cover ring-2 ring-brand/30"
                    />
                    <div className="flex-1 h-[2px] bg-gradient-to-l from-transparent to-brand" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
