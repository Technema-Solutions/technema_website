import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

// ── Site Settings ──
export const getSiteSettings = unstable_cache(
  async () => {
    const settings = await prisma.siteSettings.findFirst({
      where: { id: "default" },
    });
    return settings;
  },
  ["site-settings"],
  { tags: ["site-settings"] }
);

// ── Products ──
export const getProducts = unstable_cache(
  async () => {
    return prisma.product.findMany({
      where: { isPublished: true },
      orderBy: { sortOrder: "asc" },
    });
  },
  ["products"],
  { tags: ["products"] }
);

export const getProductBySlug = unstable_cache(
  async (slug: string) => {
    return prisma.product.findUnique({
      where: { slug },
      include: {
        featureHighlights: { orderBy: { sortOrder: "asc" } },
        capabilities: { orderBy: { sortOrder: "asc" } },
        steps: { orderBy: { sortOrder: "asc" } },
        useCases: { orderBy: { sortOrder: "asc" } },
        stats: { orderBy: { sortOrder: "asc" } },
        pricingPlans: { orderBy: { sortOrder: "asc" } },
        testimonials: { orderBy: { sortOrder: "asc" } },
        integrations: { orderBy: { sortOrder: "asc" } },
        faqs: { orderBy: { sortOrder: "asc" } },
      },
    });
  },
  ["product-by-slug"],
  { tags: ["products"] }
);

export const getAllProductSlugs = unstable_cache(
  async () => {
    return prisma.product.findMany({
      where: { isPublished: true },
      select: { slug: true },
    });
  },
  ["product-slugs"],
  { tags: ["products"] }
);

// ── Blog Posts ──
export const getBlogPosts = unstable_cache(
  async () => {
    return prisma.blogPost.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: "desc" },
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        category: true,
        image: true,
        author: true,
        readTime: true,
        publishedAt: true,
        ogImage: true,
      },
    });
  },
  ["blog-posts"],
  { tags: ["blog-posts"] }
);

export const getBlogPostBySlug = unstable_cache(
  async (slug: string) => {
    return prisma.blogPost.findUnique({
      where: { slug },
    });
  },
  ["blog-post-by-slug"],
  { tags: ["blog-posts"] }
);

export const getAllBlogSlugs = unstable_cache(
  async () => {
    return prisma.blogPost.findMany({
      where: { isPublished: true },
      select: { slug: true },
    });
  },
  ["blog-slugs"],
  { tags: ["blog-posts"] }
);

export const getRelatedPosts = unstable_cache(
  async (category: string, excludeSlug: string, limit = 5) => {
    return prisma.blogPost.findMany({
      where: {
        isPublished: true,
        category,
        NOT: { slug: excludeSlug },
      },
      orderBy: { publishedAt: "desc" },
      take: limit,
    });
  },
  ["related-posts"],
  { tags: ["blog-posts"] }
);

// ── Services ──
export const getServices = unstable_cache(
  async () => {
    return prisma.service.findMany({
      orderBy: { sortOrder: "asc" },
    });
  },
  ["services"],
  { tags: ["services"] }
);

// ── Testimonials ──
export const getTestimonials = unstable_cache(
  async () => {
    return prisma.testimonial.findMany({
      orderBy: { sortOrder: "asc" },
    });
  },
  ["testimonials"],
  { tags: ["testimonials"] }
);

// ── Projects ──
export const getProjects = unstable_cache(
  async () => {
    return prisma.project.findMany({
      orderBy: { sortOrder: "asc" },
      select: {
        id: true,
        title: true,
        category: true,
        image: true,
        description: true,
        sortOrder: true,
      },
    });
  },
  ["projects"],
  { tags: ["projects"] }
);

// ── Clients ──
export const getClients = unstable_cache(
  async () => {
    return prisma.client.findMany({
      orderBy: { sortOrder: "asc" },
      select: {
        id: true,
        name: true,
        icon: true,
        logo: true,
        sortOrder: true,
      },
    });
  },
  ["clients"],
  { tags: ["clients"] }
);

// ── Stats ──
export const getStats = unstable_cache(
  async () => {
    return prisma.stat.findMany({
      orderBy: { sortOrder: "asc" },
    });
  },
  ["stats"],
  { tags: ["stats"] }
);

// ── FAQ ──
export const getFaqItems = unstable_cache(
  async () => {
    return prisma.faqItem.findMany({
      orderBy: { sortOrder: "asc" },
    });
  },
  ["faq-items"],
  { tags: ["faq"] }
);

// ── Why Choose Us ──
export const getWhyChooseItems = unstable_cache(
  async () => {
    return prisma.whyChooseItem.findMany({
      orderBy: { sortOrder: "asc" },
    });
  },
  ["why-choose-items"],
  { tags: ["why-choose"] }
);

// ── Process Steps ──
export const getProcessSteps = unstable_cache(
  async () => {
    return prisma.processStep.findMany({
      orderBy: { sortOrder: "asc" },
    });
  },
  ["process-steps"],
  { tags: ["process-steps"] }
);

// ── Navigation ──
export const getNavigationLinks = unstable_cache(
  async () => {
    return prisma.navigationLink.findMany({
      orderBy: { sortOrder: "asc" },
    });
  },
  ["navigation-links"],
  { tags: ["navigation"] }
);

// Products for mega menu (published products with name, tagline, slug, logo)
export const getMegaMenuProducts = unstable_cache(
  async () => {
    return prisma.product.findMany({
      where: { isPublished: true },
      select: { name: true, tagline: true, slug: true, logo: true },
      orderBy: { sortOrder: "asc" },
    });
  },
  ["mega-menu-products"],
  { tags: ["products"] }
);

export const getIndustries = unstable_cache(
  async () => {
    return prisma.industry.findMany({
      orderBy: { sortOrder: "asc" },
    });
  },
  ["industries"],
  { tags: ["navigation"] }
);

// ── Industry Pages ──
export const getIndustryPages = unstable_cache(
  async () => {
    return prisma.industryPage.findMany({
      where: { isPublished: true },
      orderBy: { sortOrder: "asc" },
      select: {
        slug: true,
        name: true,
        icon: true,
        tagline: true,
      },
    });
  },
  ["industry-pages"],
  { tags: ["industry-pages"] }
);

export const getIndustryPageBySlug = unstable_cache(
  async (slug: string) => {
    return prisma.industryPage.findUnique({
      where: { slug },
      include: {
        challenges: { orderBy: { sortOrder: "asc" } },
        solutions: { orderBy: { sortOrder: "asc" } },
        process: { orderBy: { sortOrder: "asc" } },
        features: { orderBy: { sortOrder: "asc" } },
        stats: { orderBy: { sortOrder: "asc" } },
        faqs: { orderBy: { sortOrder: "asc" } },
        testimonials: { orderBy: { sortOrder: "asc" } },
      },
    });
  },
  ["industry-page-by-slug"],
  { tags: ["industry-pages"] }
);

export const getAllIndustryPageSlugs = unstable_cache(
  async () => {
    return prisma.industryPage.findMany({
      where: { isPublished: true },
      select: { slug: true },
    });
  },
  ["industry-page-slugs"],
  { tags: ["industry-pages"] }
);

// ── Footer ──
export const getFooterColumns = unstable_cache(
  async () => {
    return prisma.footerColumn.findMany({
      include: { links: { orderBy: { sortOrder: "asc" } } },
      orderBy: { sortOrder: "asc" },
    });
  },
  ["footer-columns"],
  { tags: ["footer"] }
);

export const getSocialLinks = unstable_cache(
  async () => {
    return prisma.socialLink.findMany({
      orderBy: { sortOrder: "asc" },
    });
  },
  ["social-links"],
  { tags: ["footer"] }
);
