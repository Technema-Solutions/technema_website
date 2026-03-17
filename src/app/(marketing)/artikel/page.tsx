import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
import { getBlogPosts } from "@/lib/data";
import DaftarArtikelSection from "@/components/sections/DaftarArtikelSection";

export const metadata: Metadata = {
  title: "Artikel — Technema Solutions",
  description:
    "Baca artikel terbaru seputar teknologi, bisnis digital, dan solusi TI dari Technema Solutions.",
};

export default async function ArtikelPage() {
  const blogPosts = await getBlogPosts();

  const featuredPost = blogPosts[0];
  const sidebarPosts = blogPosts.slice(1, 6);

  if (!featuredPost) {
    return (
      <section className="bg-white pt-20 pb-16 sm:pt-28 sm:pb-24">
        <Container>
          <p className="text-text-gray text-center">Belum ada artikel.</p>
        </Container>
      </section>
    );
  }

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <section className="bg-white pt-20 pb-16 sm:pt-28 sm:pb-24">
      <Container>
        {/* ── Section 1: Featured Hero ── */}
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] lg:items-stretch gap-6 lg:gap-8">
            {/* Featured Post — Left */}
            <Link href={`/artikel/${featuredPost.slug}`} className="group relative block overflow-hidden rounded-[20px] h-full min-h-[300px] lg:min-h-[450px]">
              <Image
                src={featuredPost.image}
                alt={featuredPost.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
                <span className="inline-block bg-dark text-white text-[12px] font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full mb-3">
                  {featuredPost.category}
                </span>
                <h2 className="font-heading text-[18px] sm:text-[28px] lg:text-[32px] font-bold text-white leading-[1.3]">
                  {featuredPost.title}
                </h2>
              </div>
            </Link>

            {/* Sidebar — Right */}
            <div className="lg:max-h-[450px] overflow-hidden flex flex-col h-full">
              <h3 className="font-heading text-[18px] font-bold text-dark mb-3">
                TOP 5 Artikel
              </h3>
              <div className="flex flex-col flex-1 overflow-hidden justify-between">
                {sidebarPosts.map((post, i) => (
                  <Link
                    key={post.id}
                    href={`/artikel/${post.slug}`}
                    className={`flex items-center gap-3 py-3 group ${
                      i !== sidebarPosts.length - 1
                        ? "border-b border-gray-200"
                        : ""
                    }`}
                  >
                    <span className="text-[18px] font-bold text-brand/30 flex-shrink-0 w-5 text-center">
                      {i + 1}
                    </span>
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h4 className="font-heading text-[13px] font-semibold text-dark leading-[1.4] group-hover:text-brand transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ── Section 2: Daftar Artikel ── */}
        <DaftarArtikelSection
          blogPosts={blogPosts.map((p) => ({
            id: p.id,
            title: p.title,
            excerpt: p.excerpt,
            category: p.category,
            image: p.image,
            author: p.author,
            readTime: p.readTime,
            slug: p.slug,
          }))}
        />
      </Container>
    </section>
  );
}
