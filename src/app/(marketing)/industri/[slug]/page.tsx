import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getIndustryPageBySlug, getAllIndustryPageSlugs } from "@/lib/data";
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
  const industry = await getIndustryPageBySlug(slug);
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

export async function generateStaticParams() {
  const slugs = await getAllIndustryPageSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export default async function IndustryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const industry = await getIndustryPageBySlug(slug);
  if (!industry || !industry.isPublished) notFound();

  // Map case study from flat fields to object (or null)
  const caseStudy =
    industry.caseStudyTitle && industry.caseStudyNarrative
      ? {
          tag: industry.caseStudyTag || "Studi Kasus",
          title: industry.caseStudyTitle,
          partnerName: industry.caseStudyPartnerName || "",
          partnerLogo: industry.caseStudyPartnerLogo || "",
          narrative: industry.caseStudyNarrative,
          videoUrl: industry.caseStudyVideoUrl || undefined,
          results: (industry.caseStudyResults as { value: string; label: string }[]) || [],
        }
      : null;

  // Map testimonials from relation
  const testimonials = industry.testimonials.map((t) => ({
    content: t.content,
    name: t.name,
    role: t.role,
    company: t.company,
  }));

  // Map solutions: features from Json[] to string[]
  const solutions = industry.solutions.map((s) => ({
    icon: s.icon,
    title: s.title,
    description: s.description,
    features: (s.features as string[]) || [],
    image: s.image || undefined,
  }));

  // Map process steps
  const process = industry.process.map((p, i) => ({
    step: i + 1,
    icon: p.icon,
    title: p.title,
    description: p.description,
  }));

  return (
    <>
      <IndustryHero
        name={industry.name}
        icon={industry.icon}
        heading={industry.heroHeading}
        highlight={industry.heroHighlight}
        description={industry.heroDescription}
      />

      <IndustryChallenges
        industryName={industry.name}
        challenges={industry.challenges}
      />

      <IndustrySolutions
        industryName={industry.name}
        solutions={solutions}
      />

      {caseStudy && (
        <IndustryCaseStudy
          industryName={industry.name}
          caseStudy={caseStudy}
        />
      )}

      <IndustryProcess steps={process} />

      <IndustryFeatures features={industry.features} />

      <IndustryStats stats={industry.stats} />

      {testimonials.length > 0 && (
        <IndustryTestimonial testimonials={testimonials} />
      )}

      <IndustryFaq faqs={industry.faqs} />

      <IndustryCta industryName={industry.name} />

      <RelatedIndustries currentSlug={industry.slug} />
    </>
  );
}
