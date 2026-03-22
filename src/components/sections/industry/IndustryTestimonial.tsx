import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
import { Quote } from "lucide-react";
import type { IndustryTestimonialData } from "@/data/industries";

interface Props {
  testimonial: IndustryTestimonialData;
}

export default function IndustryTestimonial({ testimonial }: Props) {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <Container>
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center">
            <Quote className="w-12 h-12 text-brand/20 mx-auto mb-6" strokeWidth={1.5} />

            <blockquote className="text-[18px] sm:text-[20px] lg:text-[22px] text-dark leading-[1.7] font-heading font-medium mb-8">
              &ldquo;{testimonial.content}&rdquo;
            </blockquote>

            <div className="flex items-center justify-center gap-4">
              {/* Avatar initials */}
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
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
