"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import slugify from "slugify";
import { requireAdmin } from "@/lib/auth-guard";

export async function getAdminProducts() {
  await requireAdmin();
  return prisma.product.findMany({
    orderBy: { sortOrder: "asc" },
    select: {
      id: true,
      slug: true,
      name: true,
      category: true,
      isPublished: true,
      sortOrder: true,
      updatedAt: true,
    },
  });
}

export async function getAdminProduct(id: string) {
  await requireAdmin();
  return prisma.product.findUnique({
    where: { id },
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
}

export async function toggleProductPublish(id: string, isPublished: boolean) {
  await requireAdmin();
  await prisma.product.update({
    where: { id },
    data: { isPublished },
  });
  revalidatePath("/", "layout");
}

export async function deleteProduct(id: string) {
  await requireAdmin();
  await prisma.product.delete({ where: { id } });
  revalidatePath("/", "layout");
}

export async function createProduct(data: {
  name: string;
  tagline: string;
  description: string;
  icon: string;
  category: string;
  logo?: string;
  heroImage?: string;
}) {
  await requireAdmin();
  const slug = slugify(data.name, { lower: true, strict: true });
  const count = await prisma.product.count();
  const product = await prisma.product.create({
    data: {
      ...data,
      slug,
      sortOrder: count,
    },
  });
  revalidatePath("/", "layout");
  return product;
}

export async function updateProduct(
  id: string,
  data: {
    name?: string;
    tagline?: string;
    description?: string;
    icon?: string;
    logo?: string;
    heroImage?: string | null;
    heroVideoUrl?: string | null;
    category?: string;
    isPublished?: boolean;
    metaTitle?: string | null;
    metaDescription?: string | null;
    relatedSlugs?: string[];
  }
) {
  await requireAdmin();
  await prisma.product.update({ where: { id }, data });
  revalidatePath("/", "layout");
}

// ── Product Sub-entities CRUD ──

export async function saveProductFeatureHighlights(
  productId: string,
  items: { icon: string; title: string; description: string; image?: string }[]
) {
  await requireAdmin();
  await prisma.productFeatureHighlight.deleteMany({ where: { productId } });
  for (let i = 0; i < items.length; i++) {
    await prisma.productFeatureHighlight.create({
      data: { ...items[i], productId, sortOrder: i },
    });
  }
  revalidatePath("/", "layout");
}

export async function saveProductCapabilities(
  productId: string,
  items: { icon: string; title: string; description: string }[]
) {
  await requireAdmin();
  await prisma.productCapability.deleteMany({ where: { productId } });
  for (let i = 0; i < items.length; i++) {
    await prisma.productCapability.create({
      data: { ...items[i], productId, sortOrder: i },
    });
  }
  revalidatePath("/", "layout");
}

export async function saveProductSteps(
  productId: string,
  items: { step: number; icon: string; title: string; description: string }[]
) {
  await requireAdmin();
  await prisma.productStep.deleteMany({ where: { productId } });
  for (let i = 0; i < items.length; i++) {
    await prisma.productStep.create({
      data: { ...items[i], productId, sortOrder: i },
    });
  }
  revalidatePath("/", "layout");
}

export async function saveProductUseCases(
  productId: string,
  items: { icon: string; title: string; description: string }[]
) {
  await requireAdmin();
  await prisma.productUseCase.deleteMany({ where: { productId } });
  for (let i = 0; i < items.length; i++) {
    await prisma.productUseCase.create({
      data: { ...items[i], productId, sortOrder: i },
    });
  }
  revalidatePath("/", "layout");
}

export async function saveProductStats(
  productId: string,
  items: { value: string; label: string }[]
) {
  await requireAdmin();
  await prisma.productStat.deleteMany({ where: { productId } });
  for (let i = 0; i < items.length; i++) {
    await prisma.productStat.create({
      data: { ...items[i], productId, sortOrder: i },
    });
  }
  revalidatePath("/", "layout");
}

export async function saveProductPricingPlans(
  productId: string,
  items: {
    name: string;
    price: string | null;
    currency: string;
    period: string;
    description: string;
    features: string[];
    isPopular: boolean;
    ctaLabel: string;
    ctaHref: string;
  }[]
) {
  await requireAdmin();
  await prisma.productPricingPlan.deleteMany({ where: { productId } });
  for (let i = 0; i < items.length; i++) {
    await prisma.productPricingPlan.create({
      data: { ...items[i], productId, sortOrder: i },
    });
  }
  revalidatePath("/", "layout");
}

export async function saveProductTestimonials(
  productId: string,
  items: {
    name: string;
    role: string;
    company: string;
    avatar?: string;
    content: string;
  }[]
) {
  await requireAdmin();
  await prisma.productTestimonial.deleteMany({ where: { productId } });
  for (let i = 0; i < items.length; i++) {
    await prisma.productTestimonial.create({
      data: { ...items[i], productId, sortOrder: i },
    });
  }
  revalidatePath("/", "layout");
}

export async function saveProductIntegrations(
  productId: string,
  items: { name: string; logo?: string; icon?: string }[]
) {
  await requireAdmin();
  await prisma.productIntegration.deleteMany({ where: { productId } });
  for (let i = 0; i < items.length; i++) {
    await prisma.productIntegration.create({
      data: { ...items[i], productId, sortOrder: i },
    });
  }
  revalidatePath("/", "layout");
}

export async function saveProductFaqs(
  productId: string,
  items: { question: string; answer: string }[]
) {
  await requireAdmin();
  await prisma.productFaq.deleteMany({ where: { productId } });
  for (let i = 0; i < items.length; i++) {
    await prisma.productFaq.create({
      data: { ...items[i], productId, sortOrder: i },
    });
  }
  revalidatePath("/", "layout");
}
