"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth-guard";

// ── Footer Columns ──

export async function getAdminFooterColumns() {
  await requireAdmin();
  return prisma.footerColumn.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      links: {
        orderBy: { sortOrder: "asc" },
      },
    },
  });
}

export async function createFooterColumn(data: { title: string }) {
  await requireAdmin();
  const count = await prisma.footerColumn.count();
  const column = await prisma.footerColumn.create({
    data: {
      ...data,
      sortOrder: count,
    },
  });
  revalidatePath("/", "layout");
  return column;
}

export async function deleteFooterColumn(id: string) {
  await requireAdmin();
  await prisma.footerColumn.delete({ where: { id } });
  revalidatePath("/", "layout");
}

// ── Footer Links ──

export async function createFooterLink(data: {
  columnId: string;
  label: string;
  href: string;
}) {
  await requireAdmin();
  const count = await prisma.footerLink.count({
    where: { columnId: data.columnId },
  });
  const link = await prisma.footerLink.create({
    data: {
      ...data,
      sortOrder: count,
    },
  });
  revalidatePath("/", "layout");
  return link;
}

export async function updateFooterLink(
  id: string,
  data: {
    label?: string;
    href?: string;
  }
) {
  await requireAdmin();
  await prisma.footerLink.update({ where: { id }, data });
  revalidatePath("/", "layout");
}

export async function deleteFooterLink(id: string) {
  await requireAdmin();
  await prisma.footerLink.delete({ where: { id } });
  revalidatePath("/", "layout");
}

// ── Social Links ──

export async function getAdminSocialLinks() {
  await requireAdmin();
  return prisma.socialLink.findMany({
    orderBy: { sortOrder: "asc" },
  });
}

export async function createSocialLink(data: {
  platform: string;
  href: string;
  icon: string;
}) {
  await requireAdmin();
  const count = await prisma.socialLink.count();
  const link = await prisma.socialLink.create({
    data: {
      ...data,
      sortOrder: count,
    },
  });
  revalidatePath("/", "layout");
  return link;
}

export async function updateSocialLink(
  id: string,
  data: {
    platform?: string;
    href?: string;
    icon?: string;
  }
) {
  await requireAdmin();
  await prisma.socialLink.update({ where: { id }, data });
  revalidatePath("/", "layout");
}

export async function deleteSocialLink(id: string) {
  await requireAdmin();
  await prisma.socialLink.delete({ where: { id } });
  revalidatePath("/", "layout");
}
