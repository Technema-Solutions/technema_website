"use client";

import { Phone, Mail, MapPin } from "lucide-react";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";

interface ContactInfoCardsProps {
  phone?: string;
  email?: string;
  address?: string;
}

export default function ContactInfoCards({
  phone = "",
  email = "",
  address = "",
}: ContactInfoCardsProps) {
  const cards = [
    {
      icon: Phone,
      title: "Telepon",
      value: phone,
      href: phone ? `tel:${phone.replace(/\s/g, "")}` : undefined,
    },
    {
      icon: Mail,
      title: "Email",
      value: email,
      href: email ? `mailto:${email}` : undefined,
    },
    {
      icon: MapPin,
      title: "Lokasi Kantor",
      value: address,
    },
  ];

  return (
    <section className="relative z-10 -mt-12 pb-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <FadeIn key={card.title} delay={i * 0.1}>
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full">
                <div className="w-[60px] h-[60px] rounded-full bg-brand/10 flex items-center justify-center mx-auto mb-5">
                  <card.icon className="w-[26px] h-[26px] text-brand" />
                </div>
                <h3 className="font-heading text-[18px] font-bold text-dark mb-2">
                  {card.title}
                </h3>
                {card.href ? (
                  <a
                    href={card.href}
                    className="text-text-gray text-[15px] leading-[1.6] hover:text-brand transition-colors"
                  >
                    {card.value}
                  </a>
                ) : (
                  <p className="text-text-gray text-[15px] leading-[1.6] m-0">
                    {card.value}
                  </p>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
