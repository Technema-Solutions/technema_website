"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import slugify from "slugify";
import { requireAdmin } from "@/lib/auth-guard";

export async function getAdminIndustryPages() {
  await requireAdmin();
  return prisma.industryPage.findMany({
    orderBy: { sortOrder: "asc" },
    select: {
      id: true,
      slug: true,
      name: true,
      icon: true,
      isPublished: true,
      sortOrder: true,
      updatedAt: true,
    },
  });
}

export async function getAdminIndustryPage(id: string) {
  await requireAdmin();
  return prisma.industryPage.findUnique({
    where: { id },
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
}

export async function toggleIndustryPagePublish(id: string, isPublished: boolean) {
  await requireAdmin();
  await prisma.industryPage.update({
    where: { id },
    data: { isPublished },
  });
  revalidatePath("/", "layout");
}

export async function deleteIndustryPage(id: string) {
  await requireAdmin();
  await prisma.industryPage.delete({ where: { id } });
  revalidatePath("/", "layout");
}

export async function createIndustryPage(data: {
  name: string;
  tagline: string;
  icon: string;
  heroHeading: string;
  heroHighlight: string;
  heroDescription: string;
}) {
  await requireAdmin();
  const slug = slugify(data.name, { lower: true, strict: true });
  const count = await prisma.industryPage.count();
  const page = await prisma.industryPage.create({
    data: {
      ...data,
      slug,
      sortOrder: count,
    },
  });
  revalidatePath("/", "layout");
  return page;
}

export async function updateIndustryPage(
  id: string,
  data: {
    name?: string;
    tagline?: string;
    icon?: string;
    heroHeading?: string;
    heroHighlight?: string;
    heroDescription?: string;
    isPublished?: boolean;
    metaTitle?: string | null;
    metaDescription?: string | null;
    // Case Study fields
    caseStudyTag?: string | null;
    caseStudyTitle?: string | null;
    caseStudyPartnerName?: string | null;
    caseStudyPartnerLogo?: string | null;
    caseStudyNarrative?: string | null;
    caseStudyVideoUrl?: string | null;
    caseStudyResults?: { value: string; label: string }[];
  }
) {
  await requireAdmin();
  await prisma.industryPage.update({ where: { id }, data });
  revalidatePath("/", "layout");
}

// ── Sub-entity CRUD ──

export async function saveIndustryChallenges(
  industryPageId: string,
  items: { icon: string; title: string; description: string }[]
) {
  await requireAdmin();
  await prisma.industryChallenge.deleteMany({ where: { industryPageId } });
  for (let i = 0; i < items.length; i++) {
    await prisma.industryChallenge.create({
      data: { ...items[i], industryPageId, sortOrder: i },
    });
  }
  revalidatePath("/", "layout");
}

export async function saveIndustrySolutions(
  industryPageId: string,
  items: { icon: string; title: string; description: string; features: string[]; image?: string }[]
) {
  await requireAdmin();
  await prisma.industrySolutionItem.deleteMany({ where: { industryPageId } });
  for (let i = 0; i < items.length; i++) {
    await prisma.industrySolutionItem.create({
      data: {
        icon: items[i].icon,
        title: items[i].title,
        description: items[i].description,
        features: items[i].features,
        image: items[i].image || null,
        industryPageId,
        sortOrder: i,
      },
    });
  }
  revalidatePath("/", "layout");
}

export async function saveIndustryProcessSteps(
  industryPageId: string,
  items: { icon: string; title: string; description: string }[]
) {
  await requireAdmin();
  await prisma.industryProcessStep.deleteMany({ where: { industryPageId } });
  for (let i = 0; i < items.length; i++) {
    await prisma.industryProcessStep.create({
      data: { ...items[i], industryPageId, sortOrder: i },
    });
  }
  revalidatePath("/", "layout");
}

export async function saveIndustryFeatures(
  industryPageId: string,
  items: { icon: string; title: string; description: string }[]
) {
  await requireAdmin();
  await prisma.industryFeatureItem.deleteMany({ where: { industryPageId } });
  for (let i = 0; i < items.length; i++) {
    await prisma.industryFeatureItem.create({
      data: { ...items[i], industryPageId, sortOrder: i },
    });
  }
  revalidatePath("/", "layout");
}

export async function saveIndustryStats(
  industryPageId: string,
  items: { value: number; suffix: string; label: string; icon: string }[]
) {
  await requireAdmin();
  await prisma.industryStatItem.deleteMany({ where: { industryPageId } });
  for (let i = 0; i < items.length; i++) {
    await prisma.industryStatItem.create({
      data: { ...items[i], industryPageId, sortOrder: i },
    });
  }
  revalidatePath("/", "layout");
}

export async function saveIndustryFaqs(
  industryPageId: string,
  items: { question: string; answer: string }[]
) {
  await requireAdmin();
  await prisma.industryFaqItem.deleteMany({ where: { industryPageId } });
  for (let i = 0; i < items.length; i++) {
    await prisma.industryFaqItem.create({
      data: { ...items[i], industryPageId, sortOrder: i },
    });
  }
  revalidatePath("/", "layout");
}

export async function saveIndustryTestimonials(
  industryPageId: string,
  items: { name: string; role: string; company: string; content: string }[]
) {
  await requireAdmin();
  await prisma.industryTestimonial.deleteMany({ where: { industryPageId } });
  for (let i = 0; i < items.length; i++) {
    await prisma.industryTestimonial.create({
      data: { ...items[i], industryPageId, sortOrder: i },
    });
  }
  revalidatePath("/", "layout");
}
