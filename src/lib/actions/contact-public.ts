"use server";

import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { checkRateLimit } from "@/lib/rate-limit";

export async function submitContactForm(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}): Promise<{ success: true } | { success: false; error: string }> {
  try {
    // Rate limit: 3 submissions per 10 minutes per IP
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(`contact:${ip}`, 3, 10 * 60 * 1000)) {
      return { success: false, error: "Terlalu banyak pengiriman. Silakan coba lagi nanti." };
    }

    // Validate required fields
    if (!data.name || !data.name.trim()) {
      return { success: false, error: "Nama wajib diisi" };
    }
    if (!data.email || !data.email.trim()) {
      return { success: false, error: "Email wajib diisi" };
    }
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return { success: false, error: "Format email tidak valid" };
    }
    if (!data.subject || !data.subject.trim()) {
      return { success: false, error: "Subjek wajib diisi" };
    }
    if (!data.message || !data.message.trim()) {
      return { success: false, error: "Pesan wajib diisi" };
    }

    await prisma.contactSubmission.create({
      data: {
        name: data.name.trim(),
        email: data.email.trim(),
        phone: data.phone?.trim() ?? "",
        subject: data.subject.trim(),
        message: data.message.trim(),
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Contact form submission error:", error);
    return { success: false, error: "Terjadi kesalahan. Silakan coba lagi." };
  }
}
