"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guard";

export async function submitContactForm(data: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}) {
  await requireAdmin();
  const submission = await prisma.contactSubmission.create({ data });
  return submission;
}

export async function getAdminMessages() {
  await requireAdmin();
  return prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function markMessageRead(id: string) {
  await requireAdmin();
  await prisma.contactSubmission.update({
    where: { id },
    data: { isRead: true },
  });
}

export async function deleteMessage(id: string) {
  await requireAdmin();
  await prisma.contactSubmission.delete({ where: { id } });
}
