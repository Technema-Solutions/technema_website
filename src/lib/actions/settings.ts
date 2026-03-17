"use server";

import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import { revalidatePath } from "next/cache";

export async function getAdminSiteSettings() {
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
}) {
  await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: data,
    create: {
      id: "default",
      ...data,
    },
  });
  revalidateTag("site-settings", "max");
  revalidatePath("/", "layout");
}
