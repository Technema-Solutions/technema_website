"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import type { IndustryTestimonialData } from "@/data/industries";

interface Props {
  testimonials: IndustryTestimonialData[];
}

export default function IndustryTestimonial({ testimonials }: Props) {
  const [active, setActive] = useState(0);

  if (testimonials.length === 0) return null;

  const testimonial = testimonials[active];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <Container>
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center">
            <Quote className="w-12 h-12 text-brand/20 mx-auto mb-6" strokeWidth={1.5} />

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <blockquote className="text-[18px] sm:text-[20px] lg:text-[22px] text-dark leading-[1.7] font-heading font-medium mb-8">
                  &ldquo;{testimonial.content}&rdquo;
                </blockquote>

                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand to-brand-light flex items-center justify-center text-white font-bold text-[16px]">
                    {testimonial.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div className="text-left">
                    <p className="text-[16px] font-heading font-bold text-dark">
                      {testimonial.name}
                    </p>
                    <p className="text-[14px] text-text-gray">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            {testimonials.length > 1 && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={() => setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-text-gray hover:border-brand hover:text-brand transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                        i === active ? "bg-brand" : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setActive((prev) => (prev + 1) % testimonials.length)}
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-text-gray hover:border-brand hover:text-brand transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
