import type { Metadata } from "next";
import ContactHero from "@/components/sections/ContactHero";
import ContactInfoCards from "@/components/sections/ContactInfoCards";
import ContactForm from "@/components/sections/ContactForm";
import CtaBanner from "@/components/sections/CtaBanner";
import { getSiteSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Kontak — Technema Solutions",
  description:
    "Hubungi Technema Solutions untuk konsultasi gratis tentang solusi teknologi terbaik untuk bisnis Anda.",
};

export default async function KontakPage() {
  const siteSettings = await getSiteSettings();

  return (
    <>
      <ContactHero />
      <ContactInfoCards
        phone={siteSettings?.contactPhone || ""}
        email={siteSettings?.contactEmail || ""}
        address={siteSettings?.contactAddress || ""}
      />
      <ContactForm mapEmbedUrl={siteSettings?.contactMapEmbed || ""} />
      <CtaBanner />
    </>
  );
}
