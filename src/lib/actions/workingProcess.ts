"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth-guard";

export async function getAdminProcessSteps() {
  await requireAdmin();
  return prisma.processStep.findMany({
    orderBy: { sortOrder: "asc" },
  });
}

export async function createProcessStep(data: {
  icon: string;
  title: string;
  description: string;
}) {
  await requireAdmin();
  const count = await prisma.processStep.count();
  const step = await prisma.processStep.create({
    data: {
      ...data,
      sortOrder: count,
    },
  });
  revalidatePath("/", "layout");
  return step;
}

export async function updateProcessStep(
  id: string,
  data: {
    icon?: string;
    title?: string;
    description?: string;
  }
) {
  await requireAdmin();
  await prisma.processStep.update({ where: { id }, data });
  revalidatePath("/", "layout");
}

export async function deleteProcessStep(id: string) {
  await requireAdmin();
  await prisma.processStep.delete({ where: { id } });
  revalidatePath("/", "layout");
}

export async function reorderProcessSteps(ids: string[]) {
  await requireAdmin();
  for (let i = 0; i < ids.length; i++) {
    await prisma.processStep.update({
      where: { id: ids[i] },
      data: { sortOrder: i },
    });
  }
  revalidatePath("/", "layout");
}
