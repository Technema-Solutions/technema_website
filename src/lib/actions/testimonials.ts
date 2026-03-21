"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getAdminTestimonials() {
  return prisma.testimonial.findMany({
    orderBy: { sortOrder: "asc" },
  });
}

export async function createTestimonial(data: {
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}) {
  const count = await prisma.testimonial.count();
  const testimonial = await prisma.testimonial.create({
    data: {
      ...data,
      sortOrder: count,
    },
  });
  revalidatePath("/", "layout");
  return testimonial;
}

export async function updateTestimonial(
  id: string,
  data: {
    name?: string;
    role?: string;
    company?: string;
    avatar?: string;
    content?: string;
    rating?: number;
  }
) {
  await prisma.testimonial.update({ where: { id }, data });
  revalidatePath("/", "layout");
}

export async function deleteTestimonial(id: string) {
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/", "layout");
}
