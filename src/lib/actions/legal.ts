"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth-guard";

export async function getLegalPages() {
  await requireAdmin();
  return prisma.legalPage.findMany({
    orderBy: { createdAt: "asc" },
  });
}

export async function getLegalPageById(id: string) {
  await requireAdmin();
  return prisma.legalPage.findUnique({ where: { id } });
}

export async function updateLegalPage(id: string, data: { title: string; body: string }) {
  await requireAdmin();
  await prisma.legalPage.update({
    where: { id },
    data: {
      title: data.title,
      body: data.body,
    },
  });
  revalidatePath("/", "layout");
}
