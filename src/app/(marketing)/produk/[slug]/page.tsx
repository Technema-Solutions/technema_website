import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug, getAllProductSlugs, getProducts } from "@/lib/data";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { ProductJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

import ProductHero from "@/components/sections/product/ProductHero";
import ProductFeatures from "@/components/sections/product/ProductFeatures";
import ProductCapabilities from "@/components/sections/product/ProductCapabilities";
import ProductHowItWorks from "@/components/sections/product/ProductHowItWorks";
import ProductUseCases from "@/components/sections/product/ProductUseCases";
import ProductImpactStats from "@/components/sections/product/ProductImpactStats";
import ProductPricing from "@/components/sections/product/ProductPricing";
import ProductTestimonials from "@/components/sections/product/ProductTestimonials";
import ProductIntegrations from "@/components/sections/product/ProductIntegrations";
import ProductFaqs from "@/components/sections/product/ProductFaqs";
import ProductCta from "@/components/sections/product/ProductCta";
import RelatedProducts from "@/components/sections/product/RelatedProducts";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Produk Tidak Ditemukan" };

  const title = product.metaTitle || `${product.name} — ${product.tagline} | ${SITE_NAME}`;
  const description = product.metaDescription || product.description;
  const ogTitle = product.metaTitle || `${product.name} — ${product.tagline}`;
  const images = product.ogImage
    ? [product.ogImage]
    : product.heroImage
      ? [product.heroImage]
      : product.logo
        ? [product.logo]
        : [];

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/produk/${product.slug}` },
    openGraph: {
      title: ogTitle,
      description,
      images,
      url: `${SITE_URL}/produk/${product.slug}`,
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
  const slugs = await getAllProductSlugs();
  return slugs.map((p) => ({ slug: p.slug }));
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  // Map DB model to the shape components expect (ProductDetail type)
  // Convert null to undefined for optional fields (Prisma uses null, TS types use undefined)
  const productDetail = {
    slug: product.slug,
    name: product.name,
    tagline: product.tagline,
    description: product.description,
    icon: product.icon,
    logo: product.logo ?? undefined,
    heroImage: product.heroImage ?? undefined,
    category: product.category as "pos" | "analytics" | "document-management" | "ai",
    href: `/produk/${product.slug}`,
    features: product.features as string[],
    clientLogos: product.clientLogos as string[],
    featureHighlights: product.featureHighlights.map((f) => ({
      icon: f.icon,
      title: f.title,
      description: f.description,
      image: f.image ?? undefined,
    })),
    capabilities: product.capabilities.map((c) => ({
      icon: c.icon,
      title: c.title,
      description: c.description,
    })),
    howItWorks: product.steps.map((s) => ({
      step: s.sortOrder,
      icon: s.icon,
      title: s.title,
      description: s.description,
    })),
    useCases: product.useCases.map((u) => ({
      icon: u.icon,
      title: u.title,
      description: u.description,
    })),
    impactStats: product.stats.map((s) => ({
      value: s.value,
      label: s.label,
    })),
    pricingPlans: product.pricingPlans.map((p) => ({
      name: p.name,
      price: p.price,
      currency: p.currency ?? undefined,
      period: p.period ?? undefined,
      description: p.description,
      features: p.features as string[],
      isPopular: p.isPopular ?? undefined,
      ctaLabel: p.ctaLabel ?? undefined,
      ctaHref: p.ctaHref ?? undefined,
    })),
    testimonials: product.testimonials.map((t) => ({
      name: t.name,
      role: t.role,
      company: t.company,
      avatar: t.avatar ?? undefined,
      content: t.content,
    })),
    integrations: product.integrations.map((i) => ({
      name: i.name,
      logo: i.logo ?? undefined,
      icon: i.icon ?? undefined,
    })),
    faqs: product.faqs.map((f) => ({
      question: f.question,
      answer: f.answer,
    })),
  };

  // Fetch related products
  const relatedSlugs = product.relatedSlugs as string[];
  let related: { name: string; tagline: string; slug: string; logo: string | null; features: string[]; icon: string; href: string }[] = [];
  if (relatedSlugs && relatedSlugs.length > 0) {
    const allProducts = await getProducts();
    related = allProducts
      .filter((p) => relatedSlugs.includes(p.slug))
      .map((p) => ({
        name: p.name,
        tagline: p.tagline,
        slug: p.slug,
        logo: p.logo,
        features: p.features as string[],
        icon: p.icon,
        href: `/produk/${p.slug}`,
      }));
  }

  const productUrl = `${SITE_URL}/produk/${product.slug}`;
  const productImage = product.ogImage ?? product.heroImage ?? product.logo ?? undefined;

  return (
    <>
      <ProductJsonLd
        name={product.name}
        description={product.description}
        image={productImage ? (productImage.startsWith("http") ? productImage : `${SITE_URL}${productImage}`) : undefined}
        url={productUrl}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Beranda", url: SITE_URL },
          { name: "Produk", url: `${SITE_URL}/#products` },
          { name: product.name, url: productUrl },
        ]}
      />

      {/* 1. Hero (breadcrumb included inside) */}
      <ProductHero
        product={productDetail}
        breadcrumbItems={[
          { label: "Beranda", href: "/" },
          { label: "Produk", href: "/#products" },
          { label: product.name },
        ]}
      />

      {/* 2. Key Features (zigzag) */}
      {productDetail.featureHighlights && productDetail.featureHighlights.length > 0 && (
        <ProductFeatures features={productDetail.featureHighlights} productName={product.name} />
      )}

      {/* 3. Full Capabilities (grid) */}
      {productDetail.capabilities && productDetail.capabilities.length > 0 && (
        <ProductCapabilities capabilities={productDetail.capabilities} />
      )}

      {/* 4. How It Works */}
      {productDetail.howItWorks && productDetail.howItWorks.length > 0 && (
        <ProductHowItWorks steps={productDetail.howItWorks} />
      )}

      {/* 5. Use Cases */}
      {productDetail.useCases && productDetail.useCases.length > 0 && (
        <ProductUseCases useCases={productDetail.useCases} productName={product.name} />
      )}

      {/* 6. Impact Stats */}
      {productDetail.impactStats && productDetail.impactStats.length > 0 && (
        <ProductImpactStats stats={productDetail.impactStats} productName={product.name} />
      )}

      {/* 7. Pricing Plans */}
      {productDetail.pricingPlans && productDetail.pricingPlans.length > 0 && (
        <ProductPricing plans={productDetail.pricingPlans} />
      )}

      {/* 8. Testimonials */}
      {productDetail.testimonials && productDetail.testimonials.length > 0 && (
        <ProductTestimonials testimonials={productDetail.testimonials} productName={product.name} />
      )}

      {/* 9. Integrations */}
      {productDetail.integrations && productDetail.integrations.length > 0 && (
        <ProductIntegrations integrations={productDetail.integrations} />
      )}

      {/* 10. FAQ */}
      {productDetail.faqs && productDetail.faqs.length > 0 && (
        <ProductFaqs faqs={productDetail.faqs} productName={product.name} />
      )}

      {/* 11. CTA Banner */}
      <ProductCta productName={product.name} />

      {/* 12. Related Products */}
      {related.length > 0 && (
        <RelatedProducts products={related} />
      )}
    </>
  );
}
