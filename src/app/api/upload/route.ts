import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";

import { auth } from "@/lib/auth";
import { createMediaRecord } from "@/lib/actions/media";
import { prisma } from "@/lib/prisma";

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  "video/mp4",
  "video/webm",
];

const MAX_SIZE = 20 * 1024 * 1024; // 20MB

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          error:
            "Invalid file type. Allowed: jpg, jpeg, png, gif, webp, svg, mp4, webm",
        },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 20MB" },
        { status: 400 }
      );
    }

    // Generate unique filename
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const timestamp = Date.now();
    const ext = path.extname(file.name) || ".png";
    const safeName = file.name
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .substring(0, 50);
    const uniqueFilename = `${timestamp}-${safeName}${ext}`;

    // Create upload directory
    // Use UPLOAD_DIR env for persistent storage (VPS), fallback to public/uploads (dev)
    const baseUploadDir =
      process.env.UPLOAD_DIR || path.join(process.cwd(), "public", "uploads");
    const uploadDir = path.join(baseUploadDir, String(year), month);
    await mkdir(uploadDir, { recursive: true });

    // Write file to disk
    const buffer = Buffer.from(await file.arrayBuffer());
    const filePath = path.join(uploadDir, uniqueFilename);
    await writeFile(filePath, buffer);

    // Get image dimensions (skip for SVG and video)
    let width: number | undefined;
    let height: number | undefined;

    if (file.type !== "image/svg+xml" && !file.type.startsWith("video/")) {
      try {
        const sharp = (await import("sharp")).default;
        const metadata = await sharp(buffer).metadata();
        width = metadata.width;
        height = metadata.height;
      } catch {
        // Sharp not available or failed — continue without dimensions
      }
    }

    // Build public URL
    const url = `/uploads/${year}/${month}/${uniqueFilename}`;

    // Create database record
    const media = await createMediaRecord({
      filename: file.name,
      url,
      mimeType: file.type,
      size: file.size,
      width,
      height,
    });

    return NextResponse.json(
      { url, id: media.id, filename: file.name },
      { status: 201 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Internal server error during upload" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { url } = await request.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      );
    }

    // Only allow deleting files from /uploads/
    if (!url.startsWith("/uploads/")) {
      return NextResponse.json(
        { error: "Invalid file URL" },
        { status: 400 }
      );
    }

    // Prevent path traversal — validate resolved path stays within uploads dir
    const baseUploadDir =
      process.env.UPLOAD_DIR || path.join(process.cwd(), "public", "uploads");
    // url is like "/uploads/2026/03/file.png" — strip leading "/uploads/" to get relative path
    const relativePath = url.replace(/^\/uploads\//, "");
    const resolved = path.resolve(baseUploadDir, relativePath);
    const resolvedBase = path.resolve(baseUploadDir);
    if (!resolved.startsWith(resolvedBase)) {
      return NextResponse.json(
        { error: "Invalid file path" },
        { status: 400 }
      );
    }

    // Delete file from disk
    const filePath = resolved;
    try {
      await unlink(filePath);
    } catch {
      // File may already be deleted, continue with DB cleanup
    }

    // Delete database record
    await prisma.mediaFile.deleteMany({ where: { url } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Internal server error during delete" },
      { status: 500 }
    );
  }
}
