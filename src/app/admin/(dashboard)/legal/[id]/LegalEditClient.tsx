"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import FormField from "@/components/admin/ui/FormField";
import RichTextEditor from "@/components/admin/ui/RichTextEditor";
import { updateLegalPage } from "@/lib/actions/legal";

type LegalPage = {
  id: string;
  slug: string;
  title: string;
  body: string;
  updatedAt: Date;
};

const inputClass =
  "w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-[#3D7EAA] focus:outline-none focus:ring-1 focus:ring-[#3D7EAA]";

export default function LegalEditClient({ page }: { page: LegalPage }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(page.title);
  const [body, setBody] = useState(page.body);

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error("Judul wajib diisi");
      return;
    }
    setLoading(true);
    try {
      await updateLegalPage(page.id, { title, body });
      toast.success("Halaman berhasil disimpan");
      router.refresh();
    } catch {
      toast.error("Gagal menyimpan halaman");
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/legal"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:bg-gray-50"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit {page.title}</h1>
            <p className="text-sm text-gray-500">
              /{page.slug}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={`/${page.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
          >
            <ExternalLink className="h-4 w-4" />
            Preview
          </a>
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg bg-[#3D7EAA] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#2D6890] disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <section className="rounded-lg border border-gray-200 bg-white p-6">
          <FormField label="Judul Halaman" required>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputClass}
            />
          </FormField>
        </section>

        <section className="rounded-lg border border-gray-200 bg-white p-6">
          <FormField label="Konten">
            <RichTextEditor
              content={body}
              onChange={(html) => setBody(html)}
            />
          </FormField>
        </section>
      </div>
    </div>
  );
}
