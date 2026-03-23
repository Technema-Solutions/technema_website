"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth-guard";

// ── Navigation Links ──

export async function getAdminNavigationLinks() {
  await requireAdmin();
  return prisma.navigationLink.findMany({
    orderBy: { sortOrder: "asc" },
  });
}

export async function createNavigationLink(data: {
  label: string;
  href: string;
  megaMenu?: string;
}) {
  await requireAdmin();
  const count = await prisma.navigationLink.count();
  const link = await prisma.navigationLink.create({
    data: {
      ...data,
      sortOrder: count,
    },
  });
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
  await requireAdmin();
  await prisma.navigationLink.update({ where: { id }, data });
  revalidatePath("/", "layout");
}

export async function deleteNavigationLink(id: string) {
  await requireAdmin();
  await prisma.navigationLink.delete({ where: { id } });
  revalidatePath("/", "layout");
}

export async function reorderNavigationLinks(ids: string[]) {
  await requireAdmin();
  for (let i = 0; i < ids.length; i++) {
    await prisma.navigationLink.update({
      where: { id: ids[i] },
      data: { sortOrder: i },
    });
  }
  revalidatePath("/", "layout");
}

// ── Industries ──

export async function getAdminIndustries() {
  await requireAdmin();
  return prisma.industry.findMany({
    orderBy: { sortOrder: "asc" },
  });
}

export async function createIndustry(data: {
  name: string;
  icon: string;
  href?: string;
}) {
  await requireAdmin();
  const count = await prisma.industry.count();
  const industry = await prisma.industry.create({
    data: {
      ...data,
      sortOrder: count,
    },
  });
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
  await requireAdmin();
  await prisma.industry.update({ where: { id }, data });
  revalidatePath("/", "layout");
}

export async function deleteIndustry(id: string) {
  await requireAdmin();
  await prisma.industry.delete({ where: { id } });
  revalidatePath("/", "layout");
}

export async function reorderIndustries(ids: string[]) {
  await requireAdmin();
  for (let i = 0; i < ids.length; i++) {
    await prisma.industry.update({
      where: { id: ids[i] },
      data: { sortOrder: i },
    });
  }
  revalidatePath("/", "layout");
}
