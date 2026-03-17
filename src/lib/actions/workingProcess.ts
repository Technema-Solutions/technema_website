"use server";

import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import { revalidatePath } from "next/cache";

export async function getAdminProcessSteps() {
  return prisma.processStep.findMany({
    orderBy: { sortOrder: "asc" },
  });
}

export async function createProcessStep(data: {
  icon: string;
  title: string;
  description: string;
}) {
  const count = await prisma.processStep.count();
  const step = await prisma.processStep.create({
    data: {
      ...data,
      sortOrder: count,
    },
  });
  revalidateTag("process-steps", "max");
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
  await prisma.processStep.update({ where: { id }, data });
  revalidateTag("process-steps", "max");
  revalidatePath("/", "layout");
}

export async function deleteProcessStep(id: string) {
  await prisma.processStep.delete({ where: { id } });
  revalidateTag("process-steps", "max");
  revalidatePath("/", "layout");
}

export async function reorderProcessSteps(ids: string[]) {
  for (let i = 0; i < ids.length; i++) {
    await prisma.processStep.update({
      where: { id: ids[i] },
      data: { sortOrder: i },
    });
  }
  revalidateTag("process-steps", "max");
  revalidatePath("/", "layout");
}
