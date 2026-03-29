import { Suspense } from "react";
import dynamic from "next/dynamic";
import HeroSection from "@/components/sections/HeroSection";
import { getSiteSettings } from "@/lib/data";

// Below-fold sections — lazy loaded for faster initial page load
const BelowFoldSections = dynamic(() => import("@/components/sections/BelowFoldSections"));

export default async function Home() {
  // Only fetch what the hero needs — below-fold data loads in parallel via Suspense
  const siteSettings = await getSiteSettings();

  return (
    <>
      <HeroSection
        heading={siteSettings?.heroHeading || undefined}
        subheading={siteSettings?.heroSubheading || undefined}
        typingWords={
          Array.isArray(siteSettings?.heroTypingWords) && (siteSettings.heroTypingWords as string[]).length > 0
            ? (siteSettings.heroTypingWords as string[])
            : undefined
        }
        heroVideoUrl={siteSettings?.heroVideoUrl || undefined}
      />
      <Suspense fallback={<div className="min-h-screen" />}>
        <BelowFoldSections contactPhone={siteSettings?.contactPhone || ""} />
      </Suspense>
    </>
  );
}
