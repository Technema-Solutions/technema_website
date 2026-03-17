import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import Container from "@/components/ui/Container";
import SectionTag from "@/components/ui/SectionTag";
import { Icons } from "@/components/ui/Icons";
interface BlogPostItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  author: string;
  readTime: string;
  publishedAt: Date | null;
}

const CalendarIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ClockIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export default function BlogArticles({ blogPosts }: { blogPosts: BlogPostItem[] }) {
  const sorted = [...blogPosts].sort((a, b) => parseInt(b.readTime) - parseInt(a.readTime));
  const featured = sorted[0];
  const sidePosts = sorted.slice(1, 3);

  return (
    <section className="bg-gray-bg py-24">
      <Container>
        {/* Header */}
        <FadeIn>
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-14 gap-6">
            <div>
              <SectionTag variant="light">ARTIKEL KAMI</SectionTag>
              <h2 className="font-heading text-[28px] sm:text-[36px] md:text-[42px] font-bold text-[#0A2540] leading-[1.31] mt-4">
                Mengeksplorasi Potensinya di Berbagai{" "}
                <span className="text-brand">Industri.</span>
              </h2>
            </div>
            <Link
              href="/artikel"
              className="bg-brand text-white font-bold text-[14px] tracking-wider uppercase px-8 py-4 rounded-full border-none cursor-pointer transition-all duration-300 hover:bg-[#2D6890] whitespace-nowrap h-fit inline-block"
            >
              LIHAT SEMUA ARTIKEL
            </Link>
          </div>
        </FadeIn>

        {/* Blog Grid: 1 large + 2 stacked */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Large card - left */}
          <FadeIn className="h-full">
            <div className="bg-white rounded-[16px] overflow-hidden transition-transform duration-300 cursor-pointer hover:-translate-y-1 group h-full flex flex-col">
              <div className="relative overflow-hidden">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  width={800}
                  height={600}
                  className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Brand date bar overlaid at bottom of image */}
                <div className="absolute bottom-0 left-0 right-0 bg-brand text-white flex items-center px-5 py-3 text-[13px] font-medium">
                  <span className="flex items-center gap-2">
                    <CalendarIcon /> {featured.publishedAt ? new Date(featured.publishedAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : ""}
                  </span>
                  <span className="mx-auto w-[2px] h-4 bg-white/40" />
                  <span className="flex items-center gap-2">
                    <ClockIcon /> {featured.readTime}
                  </span>
                </div>
              </div>
              <div className="p-5 sm:p-7 flex flex-col flex-1">
                <h3 className="font-heading text-[22px] font-bold text-[#0A2540] leading-[1.4] mb-3 group-hover:text-brand transition-colors">
                  {featured.title}
                </h3>
                <p className="text-[15px] text-text-gray leading-[1.625] mb-5">
                  {featured.excerpt}
                </p>
                <Link
                  href={`/artikel/${featured.slug}`}
                  className="inline-flex items-center gap-2 text-[#0A2540] text-[14px] font-bold uppercase tracking-wider no-underline mt-auto"
                >
                  BACA SELENGKAPNYA {Icons.arrow}
                </Link>
              </div>
            </div>
          </FadeIn>

          {/* Right - 2 stacked cards */}
          <div className="flex flex-col gap-6">
            {sidePosts.map((p, i) => (
              <FadeIn className="flex-1" key={p.id} delay={(i + 1) * 0.1}>
                <div className="bg-white rounded-[16px] overflow-hidden transition-transform duration-300 cursor-pointer hover:-translate-y-1 group flex flex-col sm:flex-row h-full">
                  <div className="overflow-hidden sm:w-[220px] md:w-[260px] flex-shrink-0">
                    <Image
                      src={p.image}
                      alt={p.title}
                      width={800}
                      height={600}
                      className="w-full aspect-[4/3] sm:h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex flex-col justify-center">
                    <div className="inline-flex items-center gap-3 border border-border-gray rounded-full px-4 py-2 text-[13px] text-text-gray mb-3 w-fit">
                      <span className="flex items-center gap-2">
                        <CalendarIcon /> {p.publishedAt ? new Date(p.publishedAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : ""}
                      </span>
                      <span className="w-[2px] h-4 bg-brand" />
                      <span className="flex items-center gap-2">
                        <ClockIcon /> {p.readTime}
                      </span>
                    </div>
                    <h4 className="font-heading text-[18px] font-bold text-[#0A2540] leading-[1.4] mb-3 group-hover:text-brand transition-colors">
                      {p.title}
                    </h4>
                    <p className="text-[15px] text-text-gray leading-[1.625] mb-4">
                      {p.excerpt}
                    </p>
                    <Link
                      href={`/artikel/${p.slug}`}
                      className="inline-flex items-center gap-2 text-[#0A2540] text-[14px] font-bold uppercase tracking-wider no-underline"
                    >
                      BACA SELENGKAPNYA {Icons.arrow}
                    </Link>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
