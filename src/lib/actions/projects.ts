"use server";

import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";

export async function getAdminProjects() {
  return prisma.project.findMany();
}

export async function createProject(data: {
  title: string;
  category: string;
  image: string;
  description: string;
}) {
  const project = await prisma.project.create({ data });
  revalidateTag("projects", "page");
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
  await prisma.project.update({ where: { id }, data });
  revalidateTag("projects", "page");
}

export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } });
  revalidateTag("projects", "page");
}
