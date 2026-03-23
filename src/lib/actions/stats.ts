"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth-guard";

export async function getAdminStats() {
  await requireAdmin();
  return prisma.stat.findMany();
}

export async function updateStat(
  id: string,
  data: {
    value?: number;
    suffix?: string;
    label?: string;
    icon?: string;
  }
) {
  await requireAdmin();
  await prisma.stat.update({ where: { id }, data });
  revalidatePath("/", "layout");
}
