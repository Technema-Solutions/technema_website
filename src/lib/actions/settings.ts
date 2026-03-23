"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth-guard";

export async function getAdminSiteSettings() {
  await requireAdmin();
  return prisma.siteSettings.findFirst({
    where: { id: "default" },
  });
}

export async function updateSiteSettings(data: {
  siteName?: string;
  siteDescription?: string;
  siteUrl?: string;
  logo?: string;
  contactPhone?: string;
  contactEmail?: string;
  contactAddress?: string;
  contactMapEmbed?: string;
  heroHeading?: string;
  heroSubheading?: string;
  heroTypingWords?: string[];
  heroVideoUrl?: string;
  gaTrackingId?: string;
  gscSiteUrl?: string;
}) {
  await requireAdmin();
  await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: data,
    create: {
      id: "default",
      ...data,
    },
  });
  revalidatePath("/", "layout");
}
