"use client";

import { useState } from "react";
import FadeIn from "@/components/ui/FadeIn";
import Container from "@/components/ui/Container";
import SectionTag from "@/components/ui/SectionTag";
import { cn } from "@/lib/utils";

interface FaqItemData {
  question: string;
  answer: string;
}

export default function FaqGuideSection({ faqItems }: { faqItems: FaqItemData[] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative bg-gradient-to-b from-[#f8fafc] to-white py-24 sm:py-32 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border-gray to-transparent" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-brand/[0.04] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-brand-light/[0.04] rounded-full blur-3xl pointer-events-none" />

      <Container>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left side — Sticky header */}
          <FadeIn className="w-full lg:w-[40%]">
            <div className="lg:sticky lg:top-32">
              <SectionTag variant="light">FAQ</SectionTag>
              <h2 className="font-heading text-[28px] sm:text-[36px] md:text-[42px] font-bold text-dark leading-[1.2] mt-5 mb-6">
                Pertanyaan yang Sering Diajukan.
              </h2>
              <p className="text-text-gray text-[16px] leading-relaxed mb-10">
                Temukan jawaban atas pertanyaan umum tentang layanan, produk, dan proses kerja kami.
              </p>

              {/* Visual stat */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-brand/5 to-brand-light/5 rounded-3xl blur-xl" />
                <div className="relative flex items-center gap-6 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                  <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-brand to-brand-light flex items-center justify-center">
                    <span className="text-2xl font-bold text-white font-heading">{faqItems.length}</span>
                  </div>
                  <div>
                    <p className="text-dark font-heading font-semibold text-lg">Pertanyaan Terjawab</p>
                    <p className="text-text-gray text-sm">Panduan lengkap untuk Anda</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Right side — Accordion */}
          <FadeIn delay={0.15} className="w-full lg:w-[60%]">
            <div className="flex flex-col gap-3" role="region" aria-label="Pertanyaan yang Sering Diajukan">
              {faqItems.map((f, i) => {
                const isOpen = openIndex === i;
                const panelId = `faq-panel-${i}`;
                const triggerId = `faq-trigger-${i}`;
                const num = String(i + 1).padStart(2, "0");

                return (
                  <div
                    key={i}
                    className={cn(
                      "rounded-2xl overflow-hidden transition-all duration-300 bg-white border",
                      isOpen
                        ? "border-brand/20 shadow-lg shadow-brand/5 border-l-[3px] border-l-brand"
                        : "border-gray-100 hover:border-gray-200 hover:shadow-sm"
                    )}
                  >
                    <button
                      id={triggerId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? -1 : i)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setOpenIndex(isOpen ? -1 : i);
                        }
                      }}
                      className="w-full px-6 py-5 flex items-center gap-4 group cursor-pointer bg-transparent border-none text-left"
                    >
                      {/* Number */}
                      <span className={cn(
                        "flex-shrink-0 text-sm font-mono font-bold transition-colors duration-300",
                        isOpen ? "text-brand" : "text-gray-300 group-hover:text-brand/50"
                      )}>
                        {num}
                      </span>

                      {/* Question */}
                      <span className={cn(
                        "flex-1 font-heading font-semibold text-[16px] transition-colors duration-300",
                        isOpen ? "text-brand" : "text-dark"
                      )}>
                        {f.question}
                      </span>

                      {/* Chevron icon */}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                          isOpen
                            ? "bg-brand text-white rotate-180"
                            : "bg-gray-50 text-gray-400 group-hover:bg-brand/10 group-hover:text-brand"
                        )}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </span>
                    </button>

                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={triggerId}
                      className={cn(
                        "overflow-hidden transition-all duration-300 ease-in-out",
                        isOpen
                          ? "max-h-[300px] px-6 pb-6"
                          : "max-h-0 px-6 py-0"
                      )}
                    >
                      <div className="pl-10 border-l-2 border-brand/10 ml-[2px]">
                        <p className="text-text-gray text-[15px] leading-[1.8] m-0">
                          {f.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
