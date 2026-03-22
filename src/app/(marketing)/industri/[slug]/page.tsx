import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getIndustryBySlug, getAllIndustrySlugs } from "@/data/industries";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

import IndustryHero from "@/components/sections/industry/IndustryHero";
import IndustryChallenges from "@/components/sections/industry/IndustryChallenges";
import IndustrySolutions from "@/components/sections/industry/IndustrySolutions";
import IndustryCaseStudy from "@/components/sections/industry/IndustryCaseStudy";
import IndustryProcess from "@/components/sections/industry/IndustryProcess";
import IndustryFeatures from "@/components/sections/industry/IndustryFeatures";
import IndustryStats from "@/components/sections/industry/IndustryStats";
import IndustryTestimonial from "@/components/sections/industry/IndustryTestimonial";
import IndustryFaq from "@/components/sections/industry/IndustryFaq";
import IndustryCta from "@/components/sections/industry/IndustryCta";
import RelatedIndustries from "@/components/sections/industry/RelatedIndustries";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return { title: "Industri Tidak Ditemukan" };

  return {
    title: industry.metaTitle || `${industry.name} | ${SITE_NAME}`,
    description: industry.metaDescription || industry.heroDescription,
    alternates: { canonical: `${SITE_URL}/industri/${industry.slug}` },
    openGraph: {
      title: industry.metaTitle || `Solusi Digital ${industry.name} | ${SITE_NAME}`,
      description: industry.metaDescription || industry.heroDescription,
      url: `${SITE_URL}/industri/${industry.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: industry.metaTitle || `Solusi Digital ${industry.name} | ${SITE_NAME}`,
      description: industry.metaDescription || industry.heroDescription,
    },
  };
}

export function generateStaticParams() {
  return getAllIndustrySlugs().map((slug) => ({ slug }));
}

export default async function IndustryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  return (
    <>
      {/* 1. Hero */}
      <IndustryHero
        name={industry.name}
        icon={industry.icon}
        heading={industry.heroHeading}
        highlight={industry.heroHighlight}
        description={industry.heroDescription}
      />

      {/* 2. Challenges */}
      <IndustryChallenges
        industryName={industry.name}
        challenges={industry.challenges}
      />

      {/* 3. Solutions */}
      <IndustrySolutions
        industryName={industry.name}
        solutions={industry.solutions}
      />

      {/* 4. Case Study */}
      {industry.caseStudy && (
        <IndustryCaseStudy
          industryName={industry.name}
          caseStudy={industry.caseStudy}
        />
      )}

      {/* 5. Process */}
      <IndustryProcess steps={industry.process} />

      {/* 6. Features */}
      <IndustryFeatures features={industry.features} />

      {/* 7. Stats */}
      <IndustryStats stats={industry.stats} />

      {/* 8. Testimonial */}
      {industry.testimonial && (
        <IndustryTestimonial testimonial={industry.testimonial} />
      )}

      {/* 9. FAQ */}
      <IndustryFaq faqs={industry.faqs} />

      {/* 10. CTA */}
      <IndustryCta industryName={industry.name} />

      {/* 11. Related */}
      <RelatedIndustries currentSlug={industry.slug} />
    </>
  );
}
