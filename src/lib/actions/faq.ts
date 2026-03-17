"use server";

import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";

export async function getAdminFaqItems() {
  return prisma.faqItem.findMany({
    orderBy: { sortOrder: "asc" },
  });
}

export async function createFaqItem(data: {
  question: string;
  answer: string;
}) {
  const count = await prisma.faqItem.count();
  const item = await prisma.faqItem.create({
    data: {
      ...data,
      sortOrder: count,
    },
  });
  revalidateTag("faq", "page");
  return item;
}

export async function updateFaqItem(
  id: string,
  data: {
    question?: string;
    answer?: string;
  }
) {
  await prisma.faqItem.update({ where: { id }, data });
  revalidateTag("faq", "page");
}

export async function deleteFaqItem(id: string) {
  await prisma.faqItem.delete({ where: { id } });
  revalidateTag("faq", "page");
}

export async function reorderFaqItems(ids: string[]) {
  for (let i = 0; i < ids.length; i++) {
    await prisma.faqItem.update({
      where: { id: ids[i] },
      data: { sortOrder: i },
    });
  }
  revalidateTag("faq", "page");
}
