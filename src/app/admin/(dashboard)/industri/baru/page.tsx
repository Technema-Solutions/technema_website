"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createIndustryPage } from "@/lib/actions/industry-pages";
import FormField from "@/components/admin/ui/FormField";
import IconPicker from "@/components/admin/ui/IconPicker";

const inputClass =
  "w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-[#3D7EAA] focus:outline-none focus:ring-1 focus:ring-[#3D7EAA]";

export default function NewIndustryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [icon, setIcon] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);

    try {
      const page = await createIndustryPage({
        name: form.get("name") as string,
        tagline: form.get("tagline") as string,
        icon: form.get("icon") as string,
        heroHeading: form.get("heroHeading") as string,
        heroHighlight: form.get("heroHighlight") as string,
        heroDescription: form.get("heroDescription") as string,
      });
      toast.success("Industri berhasil dibuat");
      router.push(`/admin/industri/${page.id}`);
    } catch {
      toast.error("Gagal membuat industri");
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Industri Baru</h1>

      <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border border-gray-200 bg-white p-6">
        <FormField label="Nama Industri" required>
          <input
            name="name"
            required
            className={inputClass}
            placeholder="Contoh: Kesehatan"
          />
        </FormField>

        <FormField label="Tagline" required>
          <input
            name="tagline"
            required
            className={inputClass}
            placeholder="Deskripsi singkat industri"
          />
        </FormField>

        <FormField label="Icon (Lucide)" required>
          <IconPicker value={icon} onChange={setIcon} name="icon" required />
        </FormField>

        <FormField label="Hero Heading" required>
          <input
            name="heroHeading"
            required
            className={inputClass}
            placeholder="Judul utama halaman hero"
          />
        </FormField>

        <FormField label="Hero Highlight" required>
          <input
            name="heroHighlight"
            required
            className={inputClass}
            placeholder="Kata yang di-highlight di heading"
          />
        </FormField>

        <FormField label="Hero Description" required>
          <textarea
            name="heroDescription"
            required
            rows={4}
            className={inputClass}
            placeholder="Deskripsi di halaman hero"
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
            {loading ? "Menyimpan..." : "Buat Industri"}
          </button>
        </div>
      </form>
    </div>
  );
}
