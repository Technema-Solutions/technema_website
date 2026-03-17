"use server";

import { prisma } from "@/lib/prisma";

export async function getAdminMedia() {
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
  const media = await prisma.mediaFile.create({ data });
  return media;
}

export async function deleteMedia(id: string) {
  await prisma.mediaFile.delete({ where: { id } });
}
