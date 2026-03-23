"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guard";

export async function getAdminMedia() {
  await requireAdmin();
  return prisma.mediaFile.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function createMediaRecord(data: {
  filename: string;
  url: string;
  mimeType: string;
  size: number;
  width?: number;
  height?: number;
  alt?: string;
}) {
  await requireAdmin();
  const media = await prisma.mediaFile.create({ data });
  return media;
}

export async function deleteMedia(id: string) {
  await requireAdmin();
  await prisma.mediaFile.delete({ where: { id } });
}
