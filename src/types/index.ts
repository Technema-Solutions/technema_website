export interface MegaMenuProduct {
  name: string;
  tagline: string;
  icon: string; // lucide icon name
  logo?: string;
  href: string;
}

export interface MegaMenuIndustry {
  name: string;
  icon: string; // lucide icon name
  href: string;
}

export interface NavLink {
  label: string;
  href: string;
  megaMenu?: "products" | "industries";
}

export interface Service {
  icon: string;
  title: string;
  description: string;
}

export interface ServiceDetail {
  icon: string;
  title: string;
  description: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
}

export interface Product {
  name: string;
  tagline: string;
  features: string[];
  icon: string;
  logo?: string;
  href: string;
}

export interface ProcessStep {
  title: string;
  description: string;
  icon: string;
}

export interface Client {
  name: string;
  icon: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface ArticleSection {
  id: string;
  heading: string;
  content: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  slug: string;
  authorRole?: string;
  body?: ArticleSection[];
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  platform: string;
  href: string;
  icon: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: string;
}

export interface WhyChooseItem {
  icon: string;
  title: string;
  description: string;
}

// === Product Detail Types ===

export interface ProductFeatureHighlight {
  icon: string;
  title: string;
  description: string;
  image?: string;
}

export interface ProductCapability {
  icon: string;
  title: string;
  description: string;
}

export interface ProductStep {
  step: number;
  icon: string;
  title: string;
  description: string;
}

export interface ProductUseCase {
  icon: string;
  title: string;
  description: string;
}

export interface ProductStat {
  value: string;
  label: string;
}

export interface ProductIntegration {
  name: string;
  logo?: string;
  icon?: string;
}

export interface ProductFaq {
  question: string;
  answer: string;
}

export interface ProductPricingPlan {
  name: string;
  price: string | null;
  currency?: string;
  period?: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
}

export interface ProductTestimonial {
  name: string;
  role: string;
  company: string;
  avatar?: string;
  content: string;
}

export interface ProductDetail extends Product {
  slug: string;
  description: string;
  heroImage?: string;
  heroVideoUrl?: string;
  category: "pos" | "analytics" | "document-management" | "ai";
  clientLogos?: string[];
  featureHighlights?: ProductFeatureHighlight[];
  capabilities?: ProductCapability[];
  howItWorks?: ProductStep[];
  useCases?: ProductUseCase[];
  impactStats?: ProductStat[];
  pricingPlans?: ProductPricingPlan[];
  testimonials?: ProductTestimonial[];
  integrations?: ProductIntegration[];
  faqs?: ProductFaq[];
  relatedProducts?: string[];
}
