import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Building2, Target, Sparkles, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import CtaBanner from "@/components/sections/CtaBanner";
import { getLucideIcon } from "@/lib/icons";
import {
  getSiteSettings,
  getAboutPage,
  getServices,
  getProducts,
  getStats,
  getIndustryPages,
} from "@/lib/data";
import { SITE_NAME, SITE_URL, COMPANY_LEGAL_NAME } from "@/lib/constants";
import { JsonLdGraph, buildBreadcrumbNode } from "@/components/seo/JsonLd";

const ABOUT_URL = `${SITE_URL}/tentang-kami`;
const FALLBACK_DESCRIPTION =
  "Technema Solutions (PT. Cipta Inovasi Teknologi Unggul) adalah perusahaan teknologi informasi asal Kabupaten Berau, Kalimantan Timur, yang membangun aplikasi web & mobile, mengintegrasikan AI, dan mendampingi transformasi digital bisnis serta instansi di Indonesia.";

const paragraphs = (text?: string | null) =>
  (text ?? "").split(/\n\n+/).map((p) => p.trim()).filter(Boolean);

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAboutPage();
  const description =
    about?.metaDescription || about?.heroDescription || FALLBACK_DESCRIPTION;
  const title = about?.metaTitle || "Tentang Kami";
  return {
    title,
    description,
    alternates: { canonical: ABOUT_URL },
    openGraph: {
      title: `${title} — ${SITE_NAME}`,
      description,
      url: ABOUT_URL,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${SITE_NAME}`,
      description,
    },
  };
}

export default async function TentangKamiPage() {
  const [settings, about, services, products, stats, industries] =
    await Promise.all([
      getSiteSettings(),
      getAboutPage(),
      getServices(),
      getProducts(),
      getStats(),
      getIndustryPages(),
    ]);

  const legalName = settings?.legalName || COMPANY_LEGAL_NAME;
  const locality = settings?.addressLocality || "Kabupaten Berau";
  const region = settings?.addressRegion || "Kalimantan Timur";

  const heroHeading = about?.heroHeading || settings?.siteName || SITE_NAME;
  const heroDescription = about?.heroDescription || FALLBACK_DESCRIPTION;
  const storyParas = paragraphs(about?.storyBody);
  const visionParas = paragraphs(about?.visionBody);
  const locationParas = paragraphs(about?.locationBody);

  const aboutPageNode = {
    "@type": "AboutPage",
    "@id": `${ABOUT_URL}/#aboutpage`,
    url: ABOUT_URL,
    name: `Tentang ${SITE_NAME}`,
    description: about?.metaDescription || heroDescription,
    inLanguage: "id-ID",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntity: { "@id": `${SITE_URL}/#organization` },
  };

  return (
    <>
      <JsonLdGraph
        nodes={[
          aboutPageNode,
          buildBreadcrumbNode([
            { name: "Beranda", url: SITE_URL },
            { name: about?.metaTitle || "Tentang Kami", url: ABOUT_URL },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-dark pt-28 pb-20 sm:pt-32 sm:pb-24">
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark2 to-dark3" />
        <Container className="relative">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[13px] font-semibold text-brand-light">
              <Sparkles className="h-4 w-4" />
              {about?.heroBadge || "Tentang Kami"}
            </span>
            <h1 className="mt-5 font-heading text-[32px] sm:text-[44px] lg:text-[52px] font-bold leading-[1.15] text-white">
              {heroHeading}
            </h1>
            <p className="mt-3 text-[15px] font-medium text-brand-light">
              {legalName}
            </p>
            {/* Direct-answer-first paragraph for AI extraction */}
            <p className="mt-6 text-[17px] sm:text-[19px] leading-[1.7] text-white/85">
              {heroDescription}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-[14px] text-white/70">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand-light" />
                {locality}, {region}
              </span>
              {about?.heroServiceNote && (
                <span className="inline-flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-brand-light" />
                  {about.heroServiceNote}
                </span>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Cerita & Visi */}
      <section className="bg-white py-16 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <FadeIn>
              <span className="text-[13px] font-semibold uppercase tracking-wider text-brand">
                {about?.storyLabel || "Cerita Kami"}
              </span>
              <h2 className="mt-3 font-heading text-[26px] sm:text-[34px] font-bold leading-[1.25] text-dark">
                {about?.storyHeading ||
                  "Mitra teknologi untuk bisnis & instansi yang siap bertumbuh"}
              </h2>
              <div className="mt-6 space-y-4 text-[16px] leading-[1.8] text-text-gray">
                {storyParas.length > 0 ? (
                  storyParas.map((p, i) => <p key={i}>{p}</p>)
                ) : (
                  <p>{settings?.siteDescription}</p>
                )}
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="rounded-2xl border border-brand/10 bg-light-brand/50 p-7">
                <div className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand text-white">
                    <Target className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-heading text-[18px] font-semibold text-dark">
                      {about?.visionHeading || about?.visionLabel || "Visi Kami"}
                    </h3>
                    <div className="mt-2 space-y-2 text-[15px] leading-[1.7] text-text-gray">
                      {visionParas.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  </div>
                </div>
                {stats.length > 0 && (
                  <div className="mt-6 grid grid-cols-2 gap-4 border-t border-brand/10 pt-6">
                    {stats.slice(0, 4).map((s) => (
                      <div key={s.id}>
                        <p className="font-heading text-[26px] font-bold text-brand">
                          {Number.isInteger(s.value)
                            ? s.value
                            : s.value.toFixed(1)}
                          {s.suffix}
                        </p>
                        <p className="text-[13px] text-text-gray">{s.label}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Keahlian / Layanan */}
      {services.length > 0 && (
        <section className="bg-light-brand/40 py-16 sm:py-24">
          <Container>
            <FadeIn className="max-w-2xl">
              <span className="text-[13px] font-semibold uppercase tracking-wider text-brand">
                {about?.expertiseLabel || "Bidang Keahlian"}
              </span>
              <h2 className="mt-3 font-heading text-[26px] sm:text-[34px] font-bold leading-[1.25] text-dark">
                {about?.expertiseHeading || "Apa saja yang kami kerjakan"}
              </h2>
            </FadeIn>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, i) => {
                const Icon = getLucideIcon(service.icon);
                return (
                  <FadeIn key={service.id} delay={i * 0.06}>
                    <div className="h-full rounded-2xl border border-gray-100 bg-white p-6 transition hover:border-brand/30 hover:shadow-sm">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand/10 text-brand">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className="mt-4 font-heading text-[17px] font-semibold text-dark">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-[14px] leading-[1.7] text-text-gray">
                        {service.description}
                      </p>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {/* Produk */}
      {products.length > 0 && (
        <section className="bg-white py-16 sm:py-24">
          <Container>
            <FadeIn className="max-w-2xl">
              <span className="text-[13px] font-semibold uppercase tracking-wider text-brand">
                {about?.productsLabel || "Produk Kami"}
              </span>
              <h2 className="mt-3 font-heading text-[26px] sm:text-[34px] font-bold leading-[1.25] text-dark">
                {about?.productsHeading || "Solusi siap pakai buatan Technema"}
              </h2>
            </FadeIn>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {products.map((p, i) => {
                const Icon = getLucideIcon(p.icon);
                const features = (p.features as string[]) ?? [];
                return (
                  <FadeIn key={p.id} delay={i * 0.08}>
                    <Link
                      href={`/produk/${p.slug}`}
                      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.12)]"
                    >
                      <span className="absolute inset-x-6 top-0 h-[3px] rounded-b-full bg-brand opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="flex items-center gap-4">
                        {p.logo ? (
                          <Image
                            src={p.logo}
                            alt={p.name}
                            width={52}
                            height={52}
                            className="h-[52px] w-[52px] shrink-0 rounded-xl object-contain"
                          />
                        ) : (
                          <span className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
                            <Icon className="h-6 w-6" />
                          </span>
                        )}
                        <div className="min-w-0">
                          <h3 className="font-heading text-[19px] font-bold text-dark group-hover:text-brand">
                            {p.name}
                          </h3>
                          <p className="text-[14px] font-medium text-brand">
                            {p.tagline}
                          </p>
                        </div>
                      </div>
                      {p.description && (
                        <p className="mt-4 line-clamp-2 text-[14px] leading-[1.7] text-text-gray">
                          {p.description}
                        </p>
                      )}
                      {features.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {features.slice(0, 3).map((f) => (
                            <span
                              key={f}
                              className="rounded-full bg-light-brand px-3 py-1 text-[12px] font-medium text-brand"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      )}
                      <span className="mt-5 inline-flex items-center gap-1 text-[13px] font-semibold text-brand">
                        Selengkapnya
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  </FadeIn>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {/* Industri yang Dilayani */}
      {industries.length > 0 && (
        <section className="bg-light-brand/40 py-16 sm:py-24">
          <Container>
            <FadeIn className="max-w-2xl">
              <span className="text-[13px] font-semibold uppercase tracking-wider text-brand">
                {about?.industriesLabel || "Industri yang Kami Layani"}
              </span>
              <h2 className="mt-3 font-heading text-[26px] sm:text-[34px] font-bold leading-[1.25] text-dark">
                {about?.industriesHeading || "Pengalaman lintas sektor"}
              </h2>
            </FadeIn>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {industries.map((ind, i) => {
                const Icon = getLucideIcon(ind.icon);
                return (
                  <FadeIn key={ind.slug} delay={i * 0.07}>
                    <Link
                      href={`/industri/${ind.slug}`}
                      className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.15)]"
                    >
                      <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brand to-brand-light text-white">
                        <Icon className="h-6 w-6" />
                      </span>
                      <h3 className="mt-4 font-heading text-[18px] font-semibold text-dark group-hover:text-brand">
                        {ind.name}
                      </h3>
                      {ind.tagline && (
                        <p className="mt-1.5 flex-1 text-[14px] leading-[1.7] text-text-gray">
                          {ind.tagline}
                        </p>
                      )}
                      <span className="mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-brand">
                        Lihat solusi
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  </FadeIn>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {/* Lokasi & Area Layanan */}
      <section className="bg-dark py-16 sm:py-20">
        <Container>
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <h2 className="font-heading text-[24px] sm:text-[30px] font-bold text-white">
                {about?.locationHeading ||
                  `Berbasis di ${locality}, melayani Indonesia`}
              </h2>
              <div className="mt-3 space-y-3 text-[15px] leading-[1.8] text-white/70">
                {locationParas.length > 0 ? (
                  locationParas.map((p, i) => <p key={i}>{p}</p>)
                ) : (
                  <p>
                    Berkantor di {locality}, {region}, kami bekerja dengan klien
                    di berbagai kota secara remote maupun on-site.
                  </p>
                )}
              </div>
            </div>
            <Button
              href={about?.locationCtaHref || "/kontak"}
              variant="lightBrand"
              size="lg"
            >
              {about?.locationCtaLabel || "Hubungi Kami"}
            </Button>
          </div>
        </Container>
      </section>

      <CtaBanner contactPhone={settings?.contactPhone || ""} bgClassName="bg-dark" />
    </>
  );
}
