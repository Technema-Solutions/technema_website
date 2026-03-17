"use server";

import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import { revalidatePath } from "next/cache";

// ── Navigation Links ──

export async function getAdminNavigationLinks() {
  return prisma.navigationLink.findMany({
    orderBy: { sortOrder: "asc" },
  });
}

export async function createNavigationLink(data: {
  label: string;
  href: string;
  megaMenu?: string;
}) {
  const count = await prisma.navigationLink.count();
  const link = await prisma.navigationLink.create({
    data: {
      ...data,
      sortOrder: count,
    },
  });
  revalidateTag("navigation", "max");
  revalidatePath("/", "layout");
  return link;
}

export async function updateNavigationLink(
  id: string,
  data: {
    label?: string;
    href?: string;
    megaMenu?: string | null;
  }
) {
  await prisma.navigationLink.update({ where: { id }, data });
  revalidateTag("navigation", "max");
  revalidatePath("/", "layout");
}

export async function deleteNavigationLink(id: string) {
  await prisma.navigationLink.delete({ where: { id } });
  revalidateTag("navigation", "max");
  revalidatePath("/", "layout");
}

export async function reorderNavigationLinks(ids: string[]) {
  for (let i = 0; i < ids.length; i++) {
    await prisma.navigationLink.update({
      where: { id: ids[i] },
      data: { sortOrder: i },
    });
  }
  revalidateTag("navigation", "max");
  revalidatePath("/", "layout");
}

// ── Industries ──

export async function getAdminIndustries() {
  return prisma.industry.findMany({
    orderBy: { sortOrder: "asc" },
  });
}

export async function createIndustry(data: {
  name: string;
  icon: string;
  href?: string;
}) {
  const count = await prisma.industry.count();
  const industry = await prisma.industry.create({
    data: {
      ...data,
      sortOrder: count,
    },
  });
  revalidateTag("navigation", "max");
  revalidatePath("/", "layout");
  return industry;
}

export async function updateIndustry(
  id: string,
  data: {
    name?: string;
    icon?: string;
    href?: string;
  }
) {
  await prisma.industry.update({ where: { id }, data });
  revalidateTag("navigation", "max");
  revalidatePath("/", "layout");
}

export async function deleteIndustry(id: string) {
  await prisma.industry.delete({ where: { id } });
  revalidateTag("navigation", "max");
  revalidatePath("/", "layout");
}

export async function reorderIndustries(ids: string[]) {
  for (let i = 0; i < ids.length; i++) {
    await prisma.industry.update({
      where: { id: ids[i] },
      data: { sortOrder: i },
    });
  }
  revalidateTag("navigation", "max");
  revalidatePath("/", "layout");
}
