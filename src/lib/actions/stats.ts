"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getAdminStats() {
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
  await prisma.stat.update({ where: { id }, data });
  revalidatePath("/", "layout");
}
