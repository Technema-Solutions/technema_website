"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth-guard";

export async function getAdminAboutPage() {
  await requireAdmin();
  return prisma.aboutPage.findFirst({ where: { id: "default" } });
}

export async function updateAboutPage(data: {
  heroBadge?: string;
  heroHeading?: string;
  heroDescription?: string;
  heroServiceNote?: string;
  storyLabel?: string;
  storyHeading?: string;
  storyBody?: string;
  visionLabel?: string;
  visionHeading?: string;
  visionBody?: string;
  expertiseLabel?: string;
  expertiseHeading?: string;
  productsLabel?: string;
  productsHeading?: string;
  industriesLabel?: string;
  industriesHeading?: string;
  locationHeading?: string;
  locationBody?: string;
  locationCtaLabel?: string;
  locationCtaHref?: string;
  metaTitle?: string;
  metaDescription?: string;
}) {
  await requireAdmin();
  await prisma.aboutPage.upsert({
    where: { id: "default" },
    update: data,
    create: { id: "default", ...data },
  });
  revalidatePath("/", "layout");
}
