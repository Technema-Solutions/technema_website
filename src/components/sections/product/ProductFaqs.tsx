"use client";

import { useState } from "react";
import FadeIn from "@/components/ui/FadeIn";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import AccordionItem from "@/components/ui/AccordionItem";
import { CircuitPatternLight } from "@/components/ui/SvgDecorations";
import { cn } from "@/lib/utils";
import type { ProductFaq } from "@/types";

interface ProductFaqsProps {
  faqs: ProductFaq[];
  productName: string;
}

export default function ProductFaqs({ faqs, productName }: ProductFaqsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#f4f7f9]/50 pointer-events-none" />
      <CircuitPatternLight className="absolute top-[10%] right-[-5%] opacity-[0.03] hidden lg:block w-[400px] h-[400px]" />

      <Container className="relative z-10">
        <FadeIn className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <SectionHeading
            subtitle="FAQ"
            title={`Pertanyaan Umum tentang ${productName}`}
            description="Temukan jawaban cepat atas pertanyaan yang paling sering diajukan oleh pengguna kami."
          />
        </FadeIn>

        <div className="max-w-3xl mx-auto relative">
          {/* Subtle line container for FAQs */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border-gray to-transparent hidden sm:block" />

          {faqs.map((faq, index) => (
            <FadeIn key={index} delay={index * 0.05}>
              <div className="relative sm:pl-8">
                {/* Custom dot indicator for desktop */}
                <div className={cn(
                  "absolute left-[-4.5px] top-[26px] w-[10px] h-[10px] rounded-full sm:block hidden transition-all duration-300",
                  openIndex === index ? "bg-brand ring-4 ring-brand/20 shadow-sm" : "bg-gray-300"
                )} />
                
                <AccordionItem
                  index={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === index}
                  onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                />
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
