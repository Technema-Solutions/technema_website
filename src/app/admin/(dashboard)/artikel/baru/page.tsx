"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import slugify from "slugify";
import { createBlogPost } from "@/lib/actions/blog";
import { calcReadTime } from "@/lib/utils";
import FormField from "@/components/admin/ui/FormField";
import ImageUpload from "@/components/admin/ui/ImageUpload";
import RichTextEditor from "@/components/admin/ui/RichTextEditor";

const inputClass =
  "w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-[#3D7EAA] focus:outline-none focus:ring-1 focus:ring-[#3D7EAA]";

export default function NewArtikelPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugManual, setSlugManual] = useState(false);
  const [image, setImage] = useState("");
  const [bodyHtml, setBodyHtml] = useState("");

  useEffect(() => {
    if (!slugManual) {
      setSlug(slugify(title, { lower: true, strict: true }));
    }
  }, [title, slugManual]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);

    try {
      await createBlogPost({
        title: form.get("title") as string,
        slug: form.get("slug") as string,
        category: form.get("category") as string,
        excerpt: form.get("excerpt") as string,
        image,
        author: form.get("author") as string,
        readTime: calcReadTime(bodyHtml),
        body: bodyHtml as unknown as Parameters<typeof createBlogPost>[0]["body"],
        isPublished: form.get("isPublished") === "on",
        metaTitle: (form.get("metaTitle") as string) || undefined,
        metaDescription: (form.get("metaDescription") as string) || undefined,
      });
      toast.success("Artikel berhasil dibuat");
      router.push("/admin/artikel");
    } catch {
      toast.error("Gagal membuat artikel");
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Artikel Baru</h1>

      <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border border-gray-200 bg-white p-6">
        <FormField label="Judul" required>
          <input
            name="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputClass}
            placeholder="Judul artikel"
          />
        </FormField>

        <FormField label="Slug" required>
          <input
            name="slug"
            required
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value);
              setSlugManual(true);
            }}
            className={inputClass}
            placeholder="judul-artikel"
          />
          {slugManual && (
            <button
              type="button"
              onClick={() => {
                setSlugManual(false);
                setSlug(slugify(title, { lower: true, strict: true }));
              }}
              className="mt-1 text-xs text-[#3D7EAA] hover:underline"
            >
              Auto-generate dari judul
            </button>
          )}
        </FormField>

        <FormField label="Kategori" required>
          <input
            name="category"
            required
            className={inputClass}
            placeholder="Contoh: Teknologi"
          />
        </FormField>

        <FormField label="Excerpt" required>
          <textarea
            name="excerpt"
            required
            rows={3}
            className={inputClass}
            placeholder="Ringkasan singkat artikel"
          />
        </FormField>

        <FormField label="Gambar" required>
          <ImageUpload value={image} onChange={setImage} />
        </FormField>

        <FormField label="Penulis" required>
          <input
            name="author"
            required
            className={inputClass}
            placeholder="Nama penulis"
          />
        </FormField>

        <FormField label="Isi Artikel">
          <RichTextEditor content="" onChange={setBodyHtml} />
        </FormField>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="isPublished"
              className="rounded border-gray-300"
            />
            Publish sekarang
          </label>
        </div>

        <h3 className="border-t pt-4 text-lg font-semibold text-gray-900">SEO</h3>

        <FormField label="Meta Title">
          <input
            name="metaTitle"
            className={inputClass}
            placeholder="Judul untuk mesin pencari"
          />
        </FormField>

        <FormField label="Meta Description">
          <textarea
            name="metaDescription"
            rows={2}
            className={inputClass}
            placeholder="Deskripsi untuk mesin pencari"
          />
        </FormField>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-[#3D7EAA] px-6 py-2 text-sm font-medium text-white hover:bg-[#2D6890] disabled:opacity-50"
          >
            {loading ? "Menyimpan..." : "Buat Artikel"}
          </button>
        </div>
      </form>
    </div>
  );
}
