import FadeIn from "@/components/ui/FadeIn";
import SectionTag from "@/components/ui/SectionTag";
import TypingText from "@/components/ui/TypingText";
import HeroVisual from "@/components/sections/HeroVisual";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
    heading?: string;
    subheading?: string;
    typingWords?: string[];
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
}: HeroSectionProps) {
    const words = typingWords && typingWords.length > 0 ? typingWords : DEFAULT_TYPING_WORDS;
    const description = subheading || DEFAULT_SUBHEADING;
    return (
        <section className="relative px-[4%] pt-[80px]">
            {/* Dark hero container with rounded edges */}
            <div
                className={cn(
                    "relative overflow-hidden rounded-[20px] sm:min-h-[500px] lg:min-h-[600px]",
                    "bg-gradient-to-b from-dark via-[#0F3555] to-[#0C2D48]"
                )}
            >
                {/* Circuit board SVG pattern overlay */}
                <svg
                    className="absolute top-[10%] left-[3%] opacity-10 pointer-events-none z-[1]"
                    width="440"
                    height="500"
                    viewBox="0 0 440 500"
                    fill="none"
                >
                    <line x1="0" y1="40" x2="200" y2="40" stroke="#6BB8D6" strokeWidth="1.2" />
                    <line x1="0" y1="100" x2="320" y2="100" stroke="#6BB8D6" strokeWidth="1.2" />
                    <line x1="40" y1="160" x2="280" y2="160" stroke="#6BB8D6" strokeWidth="1.2" />
                    <line x1="0" y1="220" x2="350" y2="220" stroke="#6BB8D6" strokeWidth="1.2" />
                    <line x1="60" y1="280" x2="240" y2="280" stroke="#6BB8D6" strokeWidth="1.2" />
                    <line x1="0" y1="340" x2="300" y2="340" stroke="#6BB8D6" strokeWidth="1.2" />
                    <line x1="20" y1="400" x2="180" y2="400" stroke="#6BB8D6" strokeWidth="1.2" />
                    <line x1="60" y1="0" x2="60" y2="280" stroke="#6BB8D6" strokeWidth="1.2" />
                    <line x1="140" y1="40" x2="140" y2="400" stroke="#6BB8D6" strokeWidth="1.2" />
                    <line x1="200" y1="0" x2="200" y2="340" stroke="#6BB8D6" strokeWidth="1.2" />
                    <line x1="280" y1="100" x2="280" y2="340" stroke="#6BB8D6" strokeWidth="1.2" />
                    <line x1="350" y1="60" x2="350" y2="220" stroke="#6BB8D6" strokeWidth="1.2" />
                    <line x1="200" y1="40" x2="230" y2="70" stroke="#6BB8D6" strokeWidth="1.2" />
                    <line x1="280" y1="160" x2="310" y2="190" stroke="#6BB8D6" strokeWidth="1.2" />
                    <line x1="140" y1="280" x2="170" y2="310" stroke="#6BB8D6" strokeWidth="1.2" />
                    {[
                        [60, 40], [140, 40], [200, 40], [60, 100], [140, 100], [200, 100],
                        [280, 100], [320, 100], [60, 160], [140, 160], [200, 160], [280, 160],
                        [60, 220], [140, 220], [200, 220], [280, 220], [350, 220],
                        [60, 280], [140, 280], [200, 280], [240, 280], [140, 340], [200, 340],
                        [280, 340], [300, 340], [60, 400], [140, 400], [180, 400],
                        [230, 70], [310, 190], [170, 310],
                    ].map(([cx, cy], i) => (
                        <circle key={i} cx={cx} cy={cy} r="3.5" fill="#6BB8D6" />
                    ))}
                    {[[200, 100], [140, 220], [280, 160], [60, 280], [200, 340]].map(([cx, cy], i) => (
                        <g key={`ring-${i}`}>
                            <circle cx={cx} cy={cy} r="7" fill="none" stroke="#6BB8D6" strokeWidth="1.2" />
                            <circle cx={cx} cy={cy} r="3" fill="#6BB8D6" />
                        </g>
                    ))}
                </svg>

                {/* Dot Grid Pattern — bottom right */}
                <svg
                    className="absolute bottom-[5%] right-[5%] opacity-[0.15] pointer-events-none z-[1] hidden sm:block"
                    width="260"
                    height="260"
                    viewBox="0 0 260 260"
                    fill="#6BB8D6"
                >
                    {Array.from({ length: 13 }).flatMap((_, row) =>
                        Array.from({ length: 13 }).map((_, col) => (
                            <circle key={`${row}-${col}`} cx={col * 20 + 10} cy={row * 20 + 10} r="2" />
                        ))
                    )}
                </svg>

                {/* Hexagon Outlines — scattered */}
                <svg
                    className="absolute top-[12%] right-[18%] opacity-[0.15] pointer-events-none z-[1] hidden lg:block"
                    width="150"
                    height="130"
                    viewBox="0 0 120 104"
                    fill="none"
                    stroke="#6BB8D6"
                    strokeWidth="1.8"
                >
                    <polygon points="60,2 113,28 113,76 60,102 7,76 7,28" />
                </svg>
                <svg
                    className="absolute bottom-[22%] right-[32%] opacity-[0.12] pointer-events-none z-[1] hidden lg:block"
                    width="100"
                    height="87"
                    viewBox="0 0 120 104"
                    fill="none"
                    stroke="#6BB8D6"
                    strokeWidth="1.8"
                >
                    <polygon points="60,2 113,28 113,76 60,102 7,76 7,28" />
                </svg>
                <svg
                    className="absolute top-[55%] left-[42%] opacity-[0.1] pointer-events-none z-[1] hidden lg:block"
                    width="75"
                    height="65"
                    viewBox="0 0 120 104"
                    fill="none"
                    stroke="#6BB8D6"
                    strokeWidth="1.8"
                >
                    <polygon points="60,2 113,28 113,76 60,102 7,76 7,28" />
                </svg>
                <svg
                    className="absolute bottom-[10%] right-[55%] opacity-[0.08] pointer-events-none z-[1] hidden lg:block"
                    width="55"
                    height="48"
                    viewBox="0 0 120 104"
                    fill="none"
                    stroke="#6BB8D6"
                    strokeWidth="2"
                >
                    <polygon points="60,2 113,28 113,76 60,102 7,76 7,28" />
                </svg>

                {/* Concentric Circle Rings — bottom left */}
                <svg
                    className="absolute bottom-[6%] left-[6%] opacity-[0.14] pointer-events-none z-[1] hidden sm:block"
                    width="220"
                    height="220"
                    viewBox="0 0 220 220"
                    fill="none"
                    stroke="#6BB8D6"
                >
                    <circle cx="110" cy="110" r="105" strokeWidth="1.5" strokeDasharray="8 5" />
                    <circle cx="110" cy="110" r="75" strokeWidth="1.5" strokeDasharray="5 7" />
                    <circle cx="110" cy="110" r="45" strokeWidth="1.5" strokeDasharray="4 6" />
                    <circle cx="110" cy="110" r="4" fill="#6BB8D6" />
                </svg>

                {/* Floating Code Symbols — scattered watermarks */}
                <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden hidden lg:block">
                    <span className="absolute top-[58%] left-[10%] text-[100px] font-mono text-[#6BB8D6] opacity-[0.1] select-none leading-none">&lt;/&gt;</span>
                    <span className="absolute top-[18%] right-[6%] text-[90px] font-mono text-[#6BB8D6] opacity-[0.1] select-none leading-none">&#123; &#125;</span>
                    <span className="absolute bottom-[12%] left-[52%] text-[75px] font-mono text-[#6BB8D6] opacity-[0.08] select-none leading-none">/ /</span>
                    <span className="absolute top-[40%] right-[42%] text-[65px] font-mono text-[#6BB8D6] opacity-[0.07] select-none leading-none">**</span>
                </div>

                {/* Gradient Glow Spots */}
                <div className="absolute top-[8%] right-[25%] w-[400px] h-[400px] rounded-full bg-[#6BB8D6] opacity-[0.12] blur-[120px] pointer-events-none z-[1]" />
                <div className="absolute bottom-[0%] left-[25%] w-[350px] h-[350px] rounded-full bg-[#6BB8D6] opacity-[0.1] blur-[100px] pointer-events-none z-[1]" />
                <div className="absolute top-[40%] left-[50%] w-[200px] h-[200px] rounded-full bg-[#3D7EAA] opacity-[0.08] blur-[80px] pointer-events-none z-[1]" />

                {/* Content: left text + right image */}
                <div className="relative z-10 mx-auto flex max-w-7xl items-center px-4 sm:px-8 pb-14 sm:pb-16 pt-[32px] sm:pt-[60px]">
                    {/* Left text column */}
                    <FadeIn className="flex-[0_0_100%] min-w-0 pr-0 lg:pr-10 lg:flex-[1_1_50%]">
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
                        <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
                            <button className="bg-brand text-white rounded-full py-[17px] px-[28px] text-[14px] font-bold uppercase tracking-[1px] cursor-pointer transition-all duration-300 shadow-[0_8px_30px_rgba(61,126,170,0.25)] hover:-translate-y-[2px] hover:shadow-[0_12px_40px_rgba(61,126,170,0.4)]">
                                JELAJAHI LEBIH LANJUT
                            </button>

                            <div className="flex items-center gap-4 cursor-pointer group">
                                {/* Play button with outer ring */}
                                <div className="relative flex items-center justify-center">
                                    {/* Outer ring */}
                                    <div className="absolute w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] rounded-full border-2 border-[#2A6080]" />
                                    {/* Inner blue circle */}
                                    <div className="w-[44px] h-[44px] sm:w-[55px] sm:h-[55px] rounded-full bg-brand flex items-center justify-center shadow-[0_4px_20px_rgba(61,126,170,0.3)] group-hover:scale-110 transition-transform">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                </div>
                                <span className="text-white/90 text-[15px] font-semibold uppercase tracking-[0.5px]">
                                    TONTON VIDEO
                                </span>
                            </div>
                        </div>
                    </FadeIn>

                    {/* Right side: man image */}
                    <FadeIn
                        delay={0.2}
                        direction="right"
                        className="hidden lg:flex flex-[0_0_50%] justify-end relative"
                    >
                        <div className="relative w-[420px] h-[560px] overflow-visible">
                            <HeroVisual />
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}
