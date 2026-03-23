"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth-guard";

export async function getAdminFaqItems() {
  await requireAdmin();
  return prisma.faqItem.findMany({
    orderBy: { sortOrder: "asc" },
  });
}

export async function createFaqItem(data: {
  question: string;
  answer: string;
}) {
  await requireAdmin();
  const count = await prisma.faqItem.count();
  const item = await prisma.faqItem.create({
    data: {
      ...data,
      sortOrder: count,
    },
  });
  revalidatePath("/", "layout");
  return item;
}

export async function updateFaqItem(
  id: string,
  data: {
    question?: string;
    answer?: string;
  }
) {
  await requireAdmin();
  await prisma.faqItem.update({ where: { id }, data });
  revalidatePath("/", "layout");
}

export async function deleteFaqItem(id: string) {
  await requireAdmin();
  await prisma.faqItem.delete({ where: { id } });
  revalidatePath("/", "layout");
}

export async function reorderFaqItems(ids: string[]) {
  await requireAdmin();
  for (let i = 0; i < ids.length; i++) {
    await prisma.faqItem.update({
      where: { id: ids[i] },
      data: { sortOrder: i },
    });
  }
  revalidatePath("/", "layout");
}
