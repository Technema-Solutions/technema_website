"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth-guard";

export async function getAdminProjects() {
  await requireAdmin();
  return prisma.project.findMany();
}

export async function createProject(data: {
  title: string;
  category: string;
  image: string;
  description: string;
}) {
  await requireAdmin();
  const project = await prisma.project.create({ data });
  revalidatePath("/", "layout");
  return project;
}

export async function updateProject(
  id: string,
  data: {
    title?: string;
    category?: string;
    image?: string;
    description?: string;
  }
) {
  await requireAdmin();
  await prisma.project.update({ where: { id }, data });
  revalidatePath("/", "layout");
}

export async function deleteProject(id: string) {
  await requireAdmin();
  await prisma.project.delete({ where: { id } });
  revalidatePath("/", "layout");
}
