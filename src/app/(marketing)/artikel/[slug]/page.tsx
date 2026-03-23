import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import sanitizeHtml from "sanitize-html";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { StickyTableOfContents, CollapsibleTableOfContents } from "@/components/ui/TableOfContents";
import ShareButtons from "@/components/ui/ShareButtons";
import { getBlogPostBySlug, getAllBlogSlugs, getRelatedPosts } from "@/lib/data";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import RelatedArticlesCarousel from "@/components/sections/RelatedArticlesCarousel";

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface ArticleSection {
  id: string;
  heading: string;
  content: string;
}

function extractHeadingsFromHtml(html: string): { id: string; heading: string }[] {
  const headings: { id: string; heading: string }[] = [];
  const regex = /<h2[^>]*id="([^"]*)"[^>]*>(.*?)<\/h2>/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    headings.push({ id: match[1], heading: match[2].replace(/<[^>]*>/g, "") });
  }
  return headings;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Artikel Tidak Ditemukan" };

  const title = post.metaTitle || `${post.title} — ${SITE_NAME}`;
  const description = post.metaDescription || post.excerpt;
  const ogTitle = post.metaTitle || post.title;
  const images = post.ogImage ? [post.ogImage] : [post.image];

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/artikel/${post.slug}` },
    openGraph: {
      type: "article",
      title: ogTitle,
      description,
      images,
      url: `${SITE_URL}/artikel/${post.slug}`,
      publishedTime: post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images,
    },
  };
}

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((p) => ({ slug: p.slug }));
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const body = post.body;
  if (!body) notFound();

  const isHtml = typeof body === "string";
  const isLegacy = Array.isArray(body);

  if (!isHtml && !isLegacy) notFound();

  // Extract TOC headings based on format
  const legacySections = isLegacy ? (body as unknown as ArticleSection[]) : [];
  const tocSections = isHtml
    ? extractHeadingsFromHtml(body as string)
    : legacySections.map((s) => ({ id: s.id, heading: s.heading }));

  if (tocSections.length === 0 && isLegacy && legacySections.length === 0) notFound();

  const relatedPosts = await getRelatedPosts(post.category, post.slug, 5);
  const articleUrl = `${SITE_URL}/artikel/${post.slug}`;

  const initials = post.author
    .split(" ")
    .map((n) => n[0])
    .join("");

  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  const articleImage = post.ogImage ?? post.image;

  return (
    <>
      <ArticleJsonLd
        title={post.title}
        description={post.metaDescription ?? post.excerpt}
        image={articleImage ? (articleImage.startsWith("http") ? articleImage : `${SITE_URL}${articleImage}`) : undefined}
        url={articleUrl}
        author={post.author}
        datePublished={post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Beranda", url: SITE_URL },
          { name: "Artikel", url: `${SITE_URL}/artikel` },
          { name: post.category, url: `${SITE_URL}/artikel` },
          { name: post.title, url: articleUrl },
        ]}
      />
    <section className="bg-white pt-16 sm:pt-20 lg:pt-28 pb-12 sm:pb-16 lg:pb-24">
      <Container>
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb
            items={[
              { label: "Beranda", href: "/" },
              { label: "Artikel", href: "/artikel" },
              { label: post.category },
              { label: post.title },
            ]}
          />
        </div>

        {/* Article Header */}
        <div className="max-w-4xl">
          <span className="inline-block bg-brand/10 text-brand text-[13px] font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full mb-4">
            {post.category}
          </span>
          <h1 className="font-heading text-[28px] sm:text-[36px] lg:text-[42px] font-bold text-dark leading-[1.25] mb-6">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-[14px] text-text-gray mb-8">
            <div className="w-10 h-10 rounded-full bg-brand-light/40 flex items-center justify-center text-brand font-bold text-[13px]">
              {initials}
            </div>
            <div>
              <span className="font-semibold text-dark">{post.author}</span>
              <div className="text-[13px] text-text-gray">
                {publishedDate} · {post.readTime}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile ToC (< lg) */}
        {tocSections.length > 0 && (
          <div className="lg:hidden">
            <CollapsibleTableOfContents sections={tocSections} />
          </div>
        )}

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-12">
          {/* Left: Sticky ToC sidebar (desktop only) */}
          {tocSections.length > 0 && (
            <div className="hidden lg:block">
              <StickyTableOfContents sections={tocSections} />
            </div>
          )}

          {/* Right: Hero image + article body */}
          <div className={`min-w-0 ${tocSections.length === 0 ? "lg:col-span-2" : ""}`}>
            {/* Hero Image */}
            <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-[20px] overflow-hidden mb-6 sm:mb-10">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 720px"
                className="object-cover"
              />
            </div>

            {/* Article body */}
            <article>
              {isHtml ? (
                /* New HTML format from Tiptap */
                <div
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(body as string, {
                      allowedTags: sanitizeHtml.defaults.allowedTags.concat([
                        "img", "h1", "h2", "h3", "iframe", "figure", "figcaption",
                      ]),
                      allowedAttributes: {
                        ...sanitizeHtml.defaults.allowedAttributes,
                        img: ["src", "alt", "width", "height", "class", "loading"],
                        iframe: ["src", "width", "height", "allowfullscreen", "frameborder", "allow"],
                        "*": ["id", "class", "style"],
                      },
                      allowedIframeHostnames: ["www.youtube.com", "www.youtube-nocookie.com"],
                    }),
                  }}
                  className={
                    "article-body " +
                    "[&_h2]:font-heading [&_h2]:text-[22px] sm:[&_h2]:text-[26px] [&_h2]:font-bold [&_h2]:text-dark [&_h2]:leading-[1.35] [&_h2]:mb-4 [&_h2]:mt-8 [&_h2]:scroll-mt-24 sm:[&_h2]:scroll-mt-28 " +
                    "[&_h3]:font-heading [&_h3]:text-[18px] sm:[&_h3]:text-[20px] [&_h3]:font-semibold [&_h3]:text-dark [&_h3]:leading-[1.4] [&_h3]:mb-3 [&_h3]:mt-6 " +
                    "[&_p]:text-[16px] [&_p]:text-text-gray [&_p]:leading-[1.8] [&_p]:mb-4 " +
                    "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:text-text-gray [&_ul]:leading-[1.8] " +
                    "[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol]:text-text-gray [&_ol]:leading-[1.8] " +
                    "[&_li]:mb-1 " +
                    "[&_blockquote]:border-l-4 [&_blockquote]:border-brand [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-text-gray [&_blockquote]:my-6 " +
                    "[&_a]:text-brand [&_a]:underline [&_a]:hover:text-brand-light " +
                    "[&_img]:rounded-xl [&_img]:my-6 [&_img]:max-w-full " +
                    "[&_code]:bg-gray-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm " +
                    "[&_pre]:bg-gray-900 [&_pre]:text-gray-100 [&_pre]:p-4 [&_pre]:rounded-xl [&_pre]:overflow-x-auto [&_pre]:my-6 " +
                    "[&_hr]:my-8 [&_hr]:border-gray-200"
                  }
                />
              ) : (
                /* Legacy ArticleSection[] format */
                legacySections.map((section) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-24 sm:scroll-mt-28 mb-8 sm:mb-10"
                  >
                    <h2 className="font-heading text-[22px] sm:text-[26px] font-bold text-dark leading-[1.35] mb-4">
                      {section.heading}
                    </h2>
                    {section.content.split("\n\n").map((paragraph, i) => (
                      <p
                        key={i}
                        className="text-[16px] text-text-gray leading-[1.8] mb-4"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </section>
                ))
              )}

              {/* Share Bar */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="font-heading text-[18px] font-bold text-dark mb-4">
                  Bagikan Artikel
                </h3>
                <ShareButtons url={articleUrl} title={post.title} />
              </div>
            </article>
          </div>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <>
            <div className="border-t border-gray-200 my-8 sm:my-12" />
            <div>
              <h2 className="font-heading text-[28px] font-bold text-dark mb-8">
                Artikel Terkait
              </h2>
              <RelatedArticlesCarousel
                posts={relatedPosts.map((p) => ({
                  id: p.id,
                  title: p.title,
                  excerpt: p.excerpt,
                  category: p.category,
                  image: p.image,
                  slug: p.slug,
                  readTime: p.readTime,
                  publishedAt: p.publishedAt,
                }))}
              />
            </div>
          </>
        )}
      </Container>
    </section>
    </>
  );
}
