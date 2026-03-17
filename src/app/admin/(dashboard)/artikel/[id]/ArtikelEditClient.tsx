"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import slugify from "slugify";
import { updateBlogPost } from "@/lib/actions/blog";
import FormField from "@/components/admin/ui/FormField";
import ImageUpload from "@/components/admin/ui/ImageUpload";
import Badge from "@/components/admin/ui/Badge";
import RichTextEditor from "@/components/admin/ui/RichTextEditor";

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  author: string;
  authorRole: string | null;
  readTime: string;
  body: unknown;
  isPublished: boolean;
  publishedAt: Date | null;
  metaTitle: string | null;
  metaDescription: string | null;
  ogImage: string | null;
  createdAt: Date;
  updatedAt: Date;
};

interface ArticleSection {
  id: string;
  heading: string;
  content: string;
}

const inputClass =
  "w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-[#3D7EAA] focus:outline-none focus:ring-1 focus:ring-[#3D7EAA]";

function calcReadTime(html: string): string {
  const text = html.replace(/<[^>]*>/g, "").trim();
  const words = text.split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min`;
}

function convertSectionsToHtml(sections: ArticleSection[]): string {
  return sections
    .map(
      (s) =>
        `<h2 id="${s.id}">${s.heading}</h2>${s.content
          .split("\n\n")
          .map((p) => `<p>${p}</p>`)
          .join("")}`
    )
    .join("");
}

export default function ArtikelEditClient({
  post,
}: {
  post: BlogPost;
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [slug, setSlug] = useState(post.slug);
  const [slugManual, setSlugManual] = useState(true);
  const [image, setImage] = useState(post.image);

  const initialHtml = useMemo(() => {
    if (typeof post.body === "string") return post.body;
    if (Array.isArray(post.body)) return convertSectionsToHtml(post.body as ArticleSection[]);
    return "";
  }, [post.body]);

  const [bodyHtml, setBodyHtml] = useState(initialHtml);

  useEffect(() => {
    if (!slugManual) {
      setSlug(slugify(title, { lower: true, strict: true }));
    }
  }, [title, slugManual]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    const form = new FormData(e.currentTarget);

    try {
      const updateData: Parameters<typeof updateBlogPost>[1] = {
        title: form.get("title") as string,
        category: form.get("category") as string,
        excerpt: form.get("excerpt") as string,
        image,
        author: form.get("author") as string,
        readTime: calcReadTime(bodyHtml),
        body: bodyHtml as unknown as Parameters<typeof updateBlogPost>[1]["body"],
        isPublished: form.get("isPublished") === "on",
        metaTitle: (form.get("metaTitle") as string) || undefined,
        metaDescription: (form.get("metaDescription") as string) || undefined,
      };
      await updateBlogPost(post.id, updateData);
      toast.success("Artikel berhasil diperbarui");
      router.refresh();
    } catch {
      toast.error("Gagal menyimpan artikel");
    }
    setSaving(false);
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-900">Edit Artikel</h1>
          <Badge variant={post.isPublished ? "success" : "default"}>
            {post.isPublished ? "Published" : "Draft"}
          </Badge>
        </div>
        <p className="text-sm text-gray-500">/{post.slug}</p>
      </div>

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

        <FormField label="Slug">
          <input
            name="slug"
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value);
              setSlugManual(true);
            }}
            className={inputClass}
            placeholder="judul-artikel"
            disabled
          />
          <p className="mt-1 text-xs text-gray-400">
            Slug otomatis di-generate dari judul saat disimpan.
          </p>
        </FormField>

        <FormField label="Kategori" required>
          <input
            name="category"
            required
            defaultValue={post.category}
            className={inputClass}
            placeholder="Contoh: Teknologi"
          />
        </FormField>

        <FormField label="Excerpt" required>
          <textarea
            name="excerpt"
            required
            rows={3}
            defaultValue={post.excerpt}
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
            defaultValue={post.author}
            className={inputClass}
            placeholder="Nama penulis"
          />
        </FormField>

        <FormField label="Isi Artikel">
          <RichTextEditor content={initialHtml} onChange={setBodyHtml} />
        </FormField>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="isPublished"
              defaultChecked={post.isPublished}
              className="rounded border-gray-300"
            />
            Published
          </label>
        </div>

        <h3 className="border-t pt-4 text-lg font-semibold text-gray-900">SEO</h3>

        <FormField label="Meta Title">
          <input
            name="metaTitle"
            defaultValue={post.metaTitle || ""}
            className={inputClass}
            placeholder="Judul untuk mesin pencari"
          />
        </FormField>

        <FormField label="Meta Description">
          <textarea
            name="metaDescription"
            rows={2}
            defaultValue={post.metaDescription || ""}
            className={inputClass}
            placeholder="Deskripsi untuk mesin pencari"
          />
        </FormField>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => router.push("/admin/artikel")}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Kembali
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-[#3D7EAA] px-6 py-2 text-sm font-medium text-white hover:bg-[#2D6890] disabled:opacity-50"
          >
            {saving ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  );
}
