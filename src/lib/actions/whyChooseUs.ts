"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth-guard";

export async function getAdminWhyChooseItems() {
  await requireAdmin();
  return prisma.whyChooseItem.findMany({
    orderBy: { sortOrder: "asc" },
  });
}

export async function createWhyChooseItem(data: {
  icon: string;
  title: string;
  description: string;
}) {
  await requireAdmin();
  const count = await prisma.whyChooseItem.count();
  const item = await prisma.whyChooseItem.create({
    data: {
      ...data,
      sortOrder: count,
    },
  });
  revalidatePath("/", "layout");
  return item;
}

export async function updateWhyChooseItem(
  id: string,
  data: {
    icon?: string;
    title?: string;
    description?: string;
  }
) {
  await requireAdmin();
  await prisma.whyChooseItem.update({ where: { id }, data });
  revalidatePath("/", "layout");
}

export async function deleteWhyChooseItem(id: string) {
  await requireAdmin();
  await prisma.whyChooseItem.delete({ where: { id } });
  revalidatePath("/", "layout");
}

export async function reorderWhyChooseItems(ids: string[]) {
  await requireAdmin();
  for (let i = 0; i < ids.length; i++) {
    await prisma.whyChooseItem.update({
      where: { id: ids[i] },
      data: { sortOrder: i },
    });
  }
  revalidatePath("/", "layout");
}
