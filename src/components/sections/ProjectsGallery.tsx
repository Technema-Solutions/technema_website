"use client";

import { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import FadeIn from "@/components/ui/FadeIn";
import SectionTag from "@/components/ui/SectionTag";
import Container from "@/components/ui/Container";
interface ProjectItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}


/* Decorative globe wireframe SVG */
function GlobeDecoration() {
  return (
    <svg
      className="absolute -top-10 -right-10 w-[520px] h-[520px] opacity-[0.12] pointer-events-none select-none"
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer circle */}
      <circle cx="250" cy="250" r="220" stroke="white" strokeWidth="0.8" />
      <circle cx="250" cy="250" r="180" stroke="white" strokeWidth="0.5" />
      {/* Latitude lines */}
      <ellipse cx="250" cy="250" rx="220" ry="80" stroke="white" strokeWidth="0.5" />
      <ellipse cx="250" cy="250" rx="220" ry="140" stroke="white" strokeWidth="0.5" />
      <ellipse cx="250" cy="200" rx="200" ry="60" stroke="white" strokeWidth="0.4" />
      <ellipse cx="250" cy="310" rx="190" ry="55" stroke="white" strokeWidth="0.4" />
      {/* Longitude lines */}
      <ellipse cx="250" cy="250" rx="80" ry="220" stroke="white" strokeWidth="0.5" />
      <ellipse cx="250" cy="250" rx="140" ry="220" stroke="white" strokeWidth="0.5" />
      <ellipse cx="250" cy="250" rx="40" ry="220" stroke="white" strokeWidth="0.4" />
      {/* Landmass hints */}
      <path
        d="M160 180 Q180 160 220 170 Q240 175 250 165 Q270 155 300 170 Q320 180 310 200 Q300 220 280 215 Q260 210 240 220 Q220 230 200 215 Q180 200 160 180Z"
        stroke="white"
        strokeWidth="0.6"
        opacity="0.6"
      />
      <path
        d="M280 260 Q310 250 330 270 Q340 290 320 310 Q300 320 290 300 Q280 280 280 260Z"
        stroke="white"
        strokeWidth="0.6"
        opacity="0.6"
      />
      <path
        d="M170 270 Q190 260 210 280 Q220 300 200 320 Q180 310 170 290Z"
        stroke="white"
        strokeWidth="0.5"
        opacity="0.5"
      />
      {/* Vertical and horizontal axis */}
      <line x1="250" y1="30" x2="250" y2="470" stroke="white" strokeWidth="0.4" />
      <line x1="30" y1="250" x2="470" y2="250" stroke="white" strokeWidth="0.4" />
    </svg>
  );
}

/* Decorative circuit dots pattern */
function CircuitDots() {
  return (
    <svg
      className="absolute top-0 left-0 w-[300px] h-full opacity-[0.08] pointer-events-none select-none"
      viewBox="0 0 300 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Dot grid */}
      {Array.from({ length: 8 }).map((_, row) =>
        Array.from({ length: 5 }).map((_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={30 + col * 50}
            cy={40 + row * 70}
            r="2"
            fill="white"
          />
        ))
      )}
      {/* Connection lines */}
      <path d="M30 40 L80 110 L130 110 L180 180" stroke="white" strokeWidth="0.8" />
      <path d="M130 180 L130 250 L80 320" stroke="white" strokeWidth="0.8" />
      <path d="M80 320 L130 390 L180 390 L230 460" stroke="white" strokeWidth="0.8" />
      <path d="M30 250 L80 250 L80 320" stroke="white" strokeWidth="0.6" />
    </svg>
  );
}

export default function ProjectsGallery({ projects }: { projects: ProjectItem[] }) {
  const swiperRef = useRef<SwiperClass | null>(null);

  const handlePrev = () => swiperRef.current?.slidePrev();
  const handleNext = () => swiperRef.current?.slideNext();

  return (
    <div className="px-4 sm:px-6 lg:px-10 bg-[#f4f4f4] py-10">
    <section className="relative bg-[#0C2D48] py-20 lg:py-28 rounded-[2rem] lg:rounded-[3rem] overflow-clip">
      {/* Background decorations */}
      <CircuitDots />
      <div className="absolute top-0 right-0 w-[550px] h-[550px]">
        <GlobeDecoration />
      </div>

      <Container className="relative z-10">
        <FadeIn>
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
            <div>
              <SectionTag variant="dark">PROYEK KAMI</SectionTag>
              <h2 className="font-heading text-[clamp(28px,3.5vw,46px)] font-bold leading-[1.15] mt-5" style={{ color: '#ffffff' }}>
                Evolusi Teknologi
                <br />
                Menuju Keunggulan
              </h2>
            </div>

            {/* Navigation arrows */}
            <div className="flex gap-3">
              <button
                onClick={handlePrev}
                className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-brand text-white transition-all hover:opacity-90 hover:scale-105 active:scale-95"
                aria-label="Proyek sebelumnya"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 12H5" />
                  <path d="M12 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-brand text-white transition-all hover:opacity-90 hover:scale-105 active:scale-95"
                aria-label="Proyek berikutnya"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </FadeIn>

        {/* Project cards carousel */}
        <div className="relative">
          <Swiper
            modules={[Navigation]}
            slidesPerView={1}
            spaceBetween={24}
            loop={true}
            onSwiper={(swiper) => { swiperRef.current = swiper; }}
            breakpoints={{
              768: { slidesPerView: 1.5 },
              1024: { slidesPerView: 2.3 },
            }}
          >
            {projects.map((project) => (
              <SwiperSlide key={project.id}>
                <div className="group flex flex-col rounded-2xl bg-[#0E3452] overflow-hidden transition-transform duration-300 hover:-translate-y-1">
                  {/* Image area */}
                  <div className="relative w-full aspect-square overflow-hidden">
                    {/* Brand accent bar */}
                    <div className="absolute top-0 left-6 z-10 w-[50px] h-[4px] bg-brand rounded-b-sm" />

                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                      className="object-contain transition-all duration-700 ease-out group-hover:brightness-110"
                    />

                    {/* Hover gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Info panel */}
                  <div className="h-[200px] p-5 lg:p-7 flex flex-col">
                    {/* Category badge */}
                    <span className="self-start rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand-light">
                      {project.category}
                    </span>

                    {/* Title */}
                    <h3
                      className="font-heading text-xl font-semibold leading-snug mt-3"
                      style={{ color: "#ffffff" }}
                    >
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 text-sm leading-relaxed text-gray-400 line-clamp-5">
                      {project.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Right fade gradient */}
          <div className="hidden lg:block absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-[#0C2D48] to-transparent z-10 pointer-events-none" />
        </div>
      </Container>
    </section>
    </div>
  );
}
