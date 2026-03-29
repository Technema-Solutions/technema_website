import dynamic from "next/dynamic";
import SectionTag from "@/components/ui/SectionTag";
import TypingText from "@/components/ui/TypingText";
import HeroCta from "@/components/sections/HeroCta";
import HeroDecorations from "@/components/sections/HeroDecorations";
import { cn } from "@/lib/utils";

// Code-split heavy client component (framer-motion, hidden on mobile)
const HeroVisual = dynamic(() => import("@/components/sections/HeroVisual"));

interface HeroSectionProps {
    heading?: string;
    subheading?: string;
    typingWords?: string[];
    heroVideoUrl?: string;
}

const DEFAULT_HEADING_PREFIX = "Bantu Bisnis";
const DEFAULT_HEADING_SUFFIX = "dengan Transformasi Digital yang Tepat.";
const DEFAULT_TYPING_WORDS = ["Berkembang", "Bertumbuh"];
const DEFAULT_SUBHEADING =
    "Technema merancang dan membangun sistem yang mendukung Proses Transformasi Digital guna meningkatkan efektivitas & efisiensi.";

export default function HeroSection({
    heading,
    subheading,
    typingWords,
    heroVideoUrl,
}: HeroSectionProps) {
    const words = typingWords && typingWords.length > 0 ? typingWords : DEFAULT_TYPING_WORDS;
    const description = subheading || DEFAULT_SUBHEADING;
    return (
        <section className="relative overflow-hidden px-[4%] pt-[80px]">
            {/* Dark hero container with rounded edges */}
            <div
                className={cn(
                    "relative overflow-hidden rounded-[20px] sm:min-h-[500px] lg:min-h-[600px]",
                    "bg-gradient-to-b from-dark via-[#0F3555] to-[#0C2D48]"
                )}
            >
                {/* Decorative SVGs — code-split to reduce initial bundle */}
                <HeroDecorations />

                {/* Content: left text + right image */}
                <div className="relative z-10 mx-auto flex max-w-7xl items-center px-4 sm:px-8 pb-14 sm:pb-16 pt-[32px] sm:pt-[60px]">
                    {/* Left text column — NO FadeIn wrapper to ensure h1 (LCP element) is immediately visible */}
                    <div className="flex-[0_0_100%] min-w-0 pr-0 lg:pr-10 lg:flex-[1_1_50%] hero-text-entrance">
                        <SectionTag variant="dark" className="mb-5 sm:mb-8">
                            PT. Cipta Inovasi Teknologi Unggul
                        </SectionTag>

                        {heading ? (
                            <h1 className="font-heading text-[26px] sm:text-[42px] lg:text-[55px] font-bold leading-[1.27] text-white mb-4 sm:mb-6">
                                {heading}
                            </h1>
                        ) : (
                            <h1 className="font-heading text-[26px] sm:text-[42px] lg:text-[55px] font-bold leading-[1.27] text-white mb-4 sm:mb-6">
                                <span className="whitespace-nowrap">
                                    {DEFAULT_HEADING_PREFIX}{" "}
                                    <TypingText words={words} />
                                </span>
                                <br />
                                {DEFAULT_HEADING_SUFFIX}
                            </h1>
                        )}

                        <p className="text-[16px] sm:text-[17px] lg:text-[19px] leading-[1.7] text-white/90 max-w-[700px] mb-6 sm:mb-10">
                            {description}
                        </p>

                        {/* CTA row */}
                        <HeroCta heroVideoUrl={heroVideoUrl} />
                    </div>

                    {/* Right side: visual — hidden on mobile, code-split */}
                    <div className="hidden lg:flex flex-[0_0_50%] justify-end relative">
                        <div className="relative w-[420px] h-[560px] overflow-visible">
                            <HeroVisual />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
