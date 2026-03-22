"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import AccordionItem from "@/components/ui/AccordionItem";
import type { IndustryFaqItem } from "@/data/industries";

interface Props {
  faqs: IndustryFaqItem[];
}

export default function IndustryFaq({ faqs }: Props) {
  const [openIndex, setOpenIndex] = useState(0);

  if (faqs.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#F8FAFB]">
      <Container>
        <FadeIn>
          <SectionHeading
            subtitle="FAQ"
            title="Pertanyaan Umum"
            description="Jawaban untuk pertanyaan yang sering diajukan mengenai solusi kami."
          />
        </FadeIn>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <AccordionItem
                index={i}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
