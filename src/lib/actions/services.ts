"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getAdminServices() {
  return prisma.service.findMany({
    orderBy: { sortOrder: "asc" },
  });
}

export async function createService(data: {
  icon: string;
  title: string;
  description: string;
}) {
  const count = await prisma.service.count();
  const service = await prisma.service.create({
    data: {
      ...data,
      sortOrder: count,
    },
  });
  revalidatePath("/", "layout");
  return service;
}

export async function updateService(
  id: string,
  data: {
    icon?: string;
    title?: string;
    description?: string;
  }
) {
  await prisma.service.update({ where: { id }, data });
  revalidatePath("/", "layout");
}

export async function deleteService(id: string) {
  await prisma.service.delete({ where: { id } });
  revalidatePath("/", "layout");
}

export async function reorderServices(ids: string[]) {
  for (let i = 0; i < ids.length; i++) {
    await prisma.service.update({
      where: { id: ids[i] },
      data: { sortOrder: i },
    });
  }
  revalidatePath("/", "layout");
}
