import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import {
  getAllProductSlugs,
  getAllBlogSlugs,
  getAllIndustryPageSlugs,
  getAllLegalSlugs,
} from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/tentang-kami`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/artikel`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/kontak`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const [productSlugs, blogSlugs, industrySlugs, legalSlugs] =
    await Promise.all([
      getAllProductSlugs(),
      getAllBlogSlugs(),
      getAllIndustryPageSlugs(),
      getAllLegalSlugs(),
    ]);

  const productPages: MetadataRoute.Sitemap = productSlugs.map((p) => ({
    url: `${SITE_URL}/produk/${p.slug}`,
    lastModified: p.updatedAt ?? now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const industryPages: MetadataRoute.Sitemap = industrySlugs.map((i) => ({
    url: `${SITE_URL}/industri/${i.slug}`,
    lastModified: i.updatedAt ?? now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const articlePages: MetadataRoute.Sitemap = blogSlugs.map((b) => ({
    url: `${SITE_URL}/artikel/${b.slug}`,
    lastModified: b.updatedAt ?? now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const legalPages: MetadataRoute.Sitemap = legalSlugs.map((l) => ({
    url: `${SITE_URL}/${l.slug}`,
    lastModified: l.updatedAt ?? now,
    changeFrequency: "yearly",
    priority: 0.3,
  }));

  return [
    ...staticPages,
    ...productPages,
    ...industryPages,
    ...articlePages,
    ...legalPages,
  ];
}
