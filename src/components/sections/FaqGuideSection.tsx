"use client";

import { useState } from "react";
import Image from "next/image";
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
    <section className="bg-white py-24">
      <Container>
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Left side - Tag, heading, image */}
          <FadeIn className="w-full lg:w-[45%]">
            <div>
              <SectionTag variant="light">FAQ</SectionTag>
              <h2 className="font-heading text-[28px] sm:text-[36px] md:text-[42px] font-bold text-[#0A2540] leading-[1.31] mt-5 mb-6 sm:mb-8">
                Pertanyaan yang Sering Diajukan.
              </h2>

              {/* Image below heading */}
              <div className="rounded-[16px] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop"
                  alt="Tim TI sedang bekerja"
                  width={600}
                  height={400}
                  className="w-full h-[220px] sm:h-[300px] object-cover"
                />
              </div>
            </div>
          </FadeIn>

          {/* Right side - Subheading, description, accordion */}
          <FadeIn delay={0.15} className="w-full lg:w-[55%]">
            <div>
              <h3 className="font-heading text-[24px] font-semibold text-[#0A2540] mb-4">
                Panduan Lengkap.
              </h3>
              <p className="text-[16px] text-text-gray leading-[1.625] mb-8">
                Temukan jawaban atas pertanyaan umum tentang layanan, produk, dan
                proses kerja kami. Kami siap membantu Anda memahami solusi terbaik
                untuk kebutuhan bisnis Anda.
              </p>

              {/* Accordion */}
              <div className="flex flex-col gap-3" role="region" aria-label="Pertanyaan yang Sering Diajukan">
                {faqItems.map((f, i) => {
                  const isOpen = openIndex === i;
                  const panelId = `faq-panel-${i}`;
                  const triggerId = `faq-trigger-${i}`;
                  return (
                    <div
                      key={i}
                      className={cn(
                        "rounded-[15px] overflow-hidden transition-all duration-300",
                        "bg-[#f7f7f8]"
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
                        className="w-full px-6 py-5 flex justify-between items-center group cursor-pointer bg-transparent border-none text-left"
                      >
                        <span className="font-heading font-semibold text-[16px] text-[#0A2540] pr-4">
                          {f.question}
                        </span>
                        <span
                          aria-hidden="true"
                          className={cn(
                            "shrink-0 w-[32px] h-[32px] rounded-full flex items-center justify-center text-[20px] font-light transition-all duration-300",
                            isOpen
                              ? "bg-brand text-white rotate-45"
                              : "bg-transparent border-[1.5px] border-[#D1D5DB] text-[#0A2540] group-hover:border-brand"
                          )}
                        >
                          +
                        </span>
                      </button>

                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={triggerId}
                        className={cn(
                          "overflow-hidden transition-all duration-300 ease-in-out",
                          isOpen
                            ? "max-h-[300px] px-6 pb-5"
                            : "max-h-0 px-6 py-0"
                        )}
                      >
                        <p className="text-text-gray text-[15px] leading-[1.7] m-0">
                          {f.answer}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
