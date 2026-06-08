import {
  SITE_NAME,
  SITE_URL,
  SITE_DESCRIPTION,
  COMPANY_LEGAL_NAME,
} from "@/lib/constants";

/* ──────────────────────────────────────────────
   Shared helpers
   ────────────────────────────────────────────── */

type JsonLdNode = Record<string, unknown>;

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const DEFAULT_LOGO = `${SITE_URL}/images/logo_technema.png`;

const DEFAULT_KNOWS_ABOUT = [
  "Software Development",
  "Web Development",
  "Mobile App Development",
  "Artificial Intelligence",
  "ERP Odoo",
  "POS Systems",
  "Document Management",
  "Digital Transformation",
  "Data Integration",
];

export type SiteSettingsLike = {
  siteName?: string | null;
  siteDescription?: string | null;
  siteUrl?: string | null;
  logo?: string | null;
  legalName?: string | null;
  foundingYear?: string | null;
  contactPhone?: string | null;
  contactEmail?: string | null;
  contactAddress?: string | null;
  addressLocality?: string | null;
  addressRegion?: string | null;
  addressCountry?: string | null;
  postalCode?: string | null;
  latitude?: string | null;
  longitude?: string | null;
} | null;

type SocialLinkLike = { href: string };

function absoluteUrl(base: string, value?: string | null): string | undefined {
  if (!value) return undefined;
  if (value.startsWith("http")) return value;
  return `${base}${value.startsWith("/") ? "" : "/"}${value}`;
}

function JsonLdScript({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Emit several schema nodes in a single, entity-linked @graph block. */
export function JsonLdGraph({ nodes }: { nodes: JsonLdNode[] }) {
  return (
    <JsonLdScript data={{ "@context": "https://schema.org", "@graph": nodes }} />
  );
}

/** Minimal inline publisher/provider object (satisfies rich-result requirements
 *  even when a validator does not resolve @id references). */
function publisherObject(): JsonLdNode {
  return {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: DEFAULT_LOGO },
  };
}

/* ──────────────────────────────────────────────
   Organization + WebSite (site identity)
   ────────────────────────────────────────────── */

export function buildOrganizationNode(
  settings: SiteSettingsLike,
  socialLinks: SocialLinkLike[] = []
): JsonLdNode {
  const base = (settings?.siteUrl || SITE_URL).replace(/\/$/, "");
  const logo = absoluteUrl(base, settings?.logo) || DEFAULT_LOGO;

  const node: JsonLdNode = {
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: settings?.siteName || SITE_NAME,
    legalName: settings?.legalName || COMPANY_LEGAL_NAME,
    url: base,
    logo: { "@type": "ImageObject", url: logo },
    image: logo,
    description: settings?.siteDescription || SITE_DESCRIPTION,
    knowsAbout: DEFAULT_KNOWS_ABOUT,
    areaServed: { "@type": "Country", name: "Indonesia" },
  };

  const address: JsonLdNode = { "@type": "PostalAddress" };
  if (settings?.contactAddress) address.streetAddress = settings.contactAddress;
  if (settings?.addressLocality)
    address.addressLocality = settings.addressLocality;
  if (settings?.addressRegion) address.addressRegion = settings.addressRegion;
  if (settings?.addressCountry)
    address.addressCountry = settings.addressCountry;
  if (settings?.postalCode) address.postalCode = settings.postalCode;
  if (Object.keys(address).length > 1) node.address = address;

  if (settings?.latitude && settings?.longitude) {
    node.geo = {
      "@type": "GeoCoordinates",
      latitude: settings.latitude,
      longitude: settings.longitude,
    };
  }
  if (settings?.foundingYear) node.foundingDate = settings.foundingYear;
  if (settings?.contactPhone) node.telephone = settings.contactPhone;
  if (settings?.contactEmail) node.email = settings.contactEmail;

  if (settings?.contactPhone) {
    node.contactPoint = {
      "@type": "ContactPoint",
      telephone: settings.contactPhone,
      contactType: "customer service",
      areaServed: "ID",
      availableLanguage: ["Indonesian", "English"],
    };
  }

  // Only emit real, absolute URLs as sameAs (skip "#"/empty placeholders).
  const sameAs = socialLinks
    .map((s) => s.href)
    .filter((h) => /^https?:\/\//i.test(h));
  if (sameAs.length) node.sameAs = sameAs;

  return node;
}

export function buildWebSiteNode(settings: SiteSettingsLike): JsonLdNode {
  const base = (settings?.siteUrl || SITE_URL).replace(/\/$/, "");
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: base,
    name: settings?.siteName || SITE_NAME,
    description: settings?.siteDescription || SITE_DESCRIPTION,
    inLanguage: "id-ID",
    publisher: { "@id": ORG_ID },
  };
}

/** Global site identity: Organization + WebSite, rendered once (in layout). */
export function SiteIdentityJsonLd({
  settings,
  socialLinks = [],
}: {
  settings: SiteSettingsLike;
  socialLinks?: SocialLinkLike[];
}) {
  return (
    <JsonLdGraph
      nodes={[buildOrganizationNode(settings, socialLinks), buildWebSiteNode(settings)]}
    />
  );
}

/* ──────────────────────────────────────────────
   Article
   ────────────────────────────────────────────── */

interface ArticleJsonLdProps {
  title: string;
  description: string;
  images?: string[];
  url: string;
  author: string;
  datePublished?: string;
  dateModified?: string;
  section?: string;
}

export function buildArticleNode(props: ArticleJsonLdProps): JsonLdNode {
  const node: JsonLdNode = {
    "@type": "Article",
    headline: props.title,
    description: props.description,
    url: props.url,
    mainEntityOfPage: { "@type": "WebPage", "@id": props.url },
    inLanguage: "id-ID",
    isAccessibleForFree: true,
    author: { "@type": "Person", name: props.author },
    publisher: publisherObject(),
  };
  if (props.images && props.images.length) node.image = props.images;
  if (props.datePublished) node.datePublished = props.datePublished;
  node.dateModified = props.dateModified ?? props.datePublished;
  if (props.section) node.articleSection = props.section;
  return node;
}

export function ArticleJsonLd(props: ArticleJsonLdProps) {
  return (
    <JsonLdScript
      data={{ "@context": "https://schema.org", ...buildArticleNode(props) }}
    />
  );
}

/* ──────────────────────────────────────────────
   Product (SoftwareApplication)
   ────────────────────────────────────────────── */

interface ProductOfferInput {
  name?: string | null;
  price?: string | null;
  currency?: string | null;
}

interface ProductJsonLdProps {
  name: string;
  description: string;
  image?: string;
  url: string;
  features?: string[];
  offers?: ProductOfferInput[];
  screenshot?: string;
}

function parsePrice(raw?: string | null): string | undefined {
  if (!raw) return undefined;
  if (/hubungi|contact|custom|nego|gratis|free/i.test(raw)) return undefined;
  const digits = raw.replace(/[^0-9]/g, "");
  return digits || undefined;
}

function buildOffers(offers?: ProductOfferInput[]): JsonLdNode | undefined {
  if (!offers || !offers.length) return undefined;
  const valid = offers.flatMap((o) => {
    const price = parsePrice(o.price);
    if (!price) return [];
    const offer: JsonLdNode = {
      "@type": "Offer",
      price,
      priceCurrency: o.currency || "IDR",
    };
    if (o.name) offer.name = o.name;
    return [offer];
  });
  if (!valid.length) return undefined;
  if (valid.length === 1) return valid[0];

  const prices = valid.map((o) => Number(o.price));
  return {
    "@type": "AggregateOffer",
    priceCurrency: (valid[0].priceCurrency as string) || "IDR",
    lowPrice: Math.min(...prices),
    highPrice: Math.max(...prices),
    offerCount: valid.length,
    offers: valid,
  };
}

export function buildProductNode(props: ProductJsonLdProps): JsonLdNode {
  const node: JsonLdNode = {
    "@type": "SoftwareApplication",
    name: props.name,
    description: props.description,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: props.url,
    provider: publisherObject(),
  };
  if (props.image) node.image = props.image;
  if (props.screenshot) node.screenshot = props.screenshot;
  if (props.features && props.features.length)
    node.featureList = props.features;
  const offers = buildOffers(props.offers);
  if (offers) node.offers = offers;
  return node;
}

export function ProductJsonLd(props: ProductJsonLdProps) {
  return (
    <JsonLdScript
      data={{ "@context": "https://schema.org", ...buildProductNode(props) }}
    />
  );
}

/* ──────────────────────────────────────────────
   Service (industry pages)
   ────────────────────────────────────────────── */

interface ServiceJsonLdProps {
  name: string;
  description: string;
  url: string;
  serviceType?: string;
}

export function buildServiceNode(props: ServiceJsonLdProps): JsonLdNode {
  return {
    "@type": "Service",
    name: props.name,
    description: props.description,
    url: props.url,
    serviceType: props.serviceType ?? props.name,
    provider: publisherObject(),
    areaServed: { "@type": "Country", name: "Indonesia" },
  };
}

export function ServiceJsonLd(props: ServiceJsonLdProps) {
  return (
    <JsonLdScript
      data={{ "@context": "https://schema.org", ...buildServiceNode(props) }}
    />
  );
}

/* ──────────────────────────────────────────────
   Breadcrumb
   ────────────────────────────────────────────── */

interface BreadcrumbItem {
  name: string;
  url?: string;
}

export function buildBreadcrumbNode(items: BreadcrumbItem[]): JsonLdNode {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  };
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  return (
    <JsonLdScript
      data={{ "@context": "https://schema.org", ...buildBreadcrumbNode(items) }}
    />
  );
}

/* ──────────────────────────────────────────────
   FAQ Page
   ────────────────────────────────────────────── */

interface FaqItem {
  question: string;
  answer: string;
}

export function buildFaqNode(items: FaqItem[]): JsonLdNode {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function FaqPageJsonLd({ items }: { items: FaqItem[] }) {
  if (!items || !items.length) return null;
  return (
    <JsonLdScript
      data={{ "@context": "https://schema.org", ...buildFaqNode(items) }}
    />
  );
}
