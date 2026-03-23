"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import slugify from "slugify";
import { requireAdmin } from "@/lib/auth-guard";

export async function getAdminBlogPosts() {
  await requireAdmin();
  return prisma.blogPost.findMany({
    orderBy: { publishedAt: "desc" },
    select: {
      id: true,
      slug: true,
      title: true,
      category: true,
      isPublished: true,
      publishedAt: true,
      updatedAt: true,
    },
  });
}

export async function getAdminBlogPost(id: string) {
  await requireAdmin();
  return prisma.blogPost.findUnique({ where: { id } });
}

export async function createBlogPost(data: {
  title: string;
  slug?: string;
  excerpt: string;
  category: string;
  image: string;
  author: string;
  authorRole?: string;
  readTime: string;
  body: string;
  isPublished: boolean;
  publishedAt?: Date;
  metaTitle?: string | null;
  metaDescription?: string | null;
}) {
  await requireAdmin();
  const slug = data.slug || slugify(data.title, { lower: true, strict: true });
  const { slug: _slug, ...rest } = data;
  const post = await prisma.blogPost.create({
    data: {
      ...rest,
      slug,
      publishedAt: data.publishedAt ?? (data.isPublished ? new Date() : null),
    },
  });
  revalidatePath("/", "layout");
  return post;
}

export async function updateBlogPost(
  id: string,
  data: {
    title?: string;
    excerpt?: string;
    category?: string;
    image?: string;
    author?: string;
    authorRole?: string;
    readTime?: string;
    body?: string;
    isPublished?: boolean;
    publishedAt?: Date | null;
    metaTitle?: string | null;
    metaDescription?: string | null;
  }
) {
  await requireAdmin();
  const updateData: Record<string, unknown> = { ...data };
  if (data.title) {
    updateData.slug = slugify(data.title, { lower: true, strict: true });
  }
  const post = await prisma.blogPost.update({ where: { id }, data: updateData });
  revalidatePath("/", "layout");
  return post;
}

export async function deleteBlogPost(id: string) {
  await requireAdmin();
  await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/", "layout");
}

export async function toggleBlogPostPublish(id: string, isPublished: boolean) {
  await requireAdmin();
  await prisma.blogPost.update({
    where: { id },
    data: {
      isPublished,
      publishedAt: isPublished ? new Date() : undefined,
    },
  });
  revalidatePath("/", "layout");
}
