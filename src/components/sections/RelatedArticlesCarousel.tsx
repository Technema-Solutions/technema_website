"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";
interface RelatedPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  slug: string;
  readTime: string;
  publishedAt: Date | null;
}

interface RelatedArticlesCarouselProps {
  posts: RelatedPost[];
}

export default function RelatedArticlesCarousel({ posts }: RelatedArticlesCarouselProps) {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [showArrows, setShowArrows] = useState(false);

  const updateNavState = useCallback((swiper: SwiperClass) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
    const perView = typeof swiper.params.slidesPerView === "number"
      ? swiper.params.slidesPerView
      : 1;
    setShowArrows(swiper.slides.length > perView);
  }, []);

  const handlePrev = () => swiperRef.current?.slidePrev();
  const handleNext = () => swiperRef.current?.slideNext();

  return (
    <div className="relative">
      {/* Navigation arrows */}
      {showArrows && (
        <div className="flex gap-3 justify-end mb-6">
          <button
            onClick={handlePrev}
            disabled={isBeginning}
            className={`flex h-[52px] w-[52px] items-center justify-center rounded-full transition-all ${
              isBeginning
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-brand text-white hover:opacity-90 hover:scale-105 active:scale-95"
            }`}
            aria-label="Artikel sebelumnya"
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
            disabled={isEnd}
            className={`flex h-[52px] w-[52px] items-center justify-center rounded-full transition-all ${
              isEnd
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-brand text-white hover:opacity-90 hover:scale-105 active:scale-95"
            }`}
            aria-label="Artikel berikutnya"
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
      )}

      <Swiper
        modules={[Navigation]}
        slidesPerView={1}
        spaceBetween={24}
        loop={false}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          updateNavState(swiper);
        }}
        onSlideChange={(swiper) => updateNavState(swiper)}
        onResize={(swiper) => updateNavState(swiper)}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {posts.map((rp) => (
          <SwiperSlide key={rp.id}>
            <Link
              href={`/artikel/${rp.slug}`}
              className="group block border border-gray-200 rounded-[20px] p-4 hover:border-brand-light transition-all duration-300 h-full"
            >
              <div className="relative overflow-hidden rounded-[16px] aspect-[4/3] mb-5">
                <Image
                  src={rp.image}
                  alt={rp.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <span className="text-brand text-[13px] font-semibold uppercase tracking-wider">
                {rp.category}
              </span>
              <h3 className="font-heading text-[17px] sm:text-[20px] font-bold text-dark leading-[1.4] mt-2 mb-3 group-hover:text-brand transition-colors">
                {rp.title}
              </h3>
              <div className="flex items-center gap-3 text-[13px] text-text-gray">
                <span>{rp.readTime}</span>
                {rp.publishedAt && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-text-gray" />
                    <span>
                      {new Date(rp.publishedAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </>
                )}
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
