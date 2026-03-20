"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createProduct } from "@/lib/actions/products";
import FormField from "@/components/admin/ui/FormField";
import ImageUpload from "@/components/admin/ui/ImageUpload";
import IconPicker from "@/components/admin/ui/IconPicker";

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [logo, setLogo] = useState("");
  const [icon, setIcon] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);

    try {
      const product = await createProduct({
        name: form.get("name") as string,
        tagline: form.get("tagline") as string,
        description: form.get("description") as string,
        icon: form.get("icon") as string,
        category: form.get("category") as string,
        features: (form.get("features") as string)
          .split("\n")
          .map((f) => f.trim())
          .filter(Boolean),
        logo: logo || undefined,
      });
      toast.success("Produk berhasil dibuat");
      router.push(`/admin/produk/${product.id}`);
    } catch {
      toast.error("Gagal membuat produk");
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Produk Baru</h1>

      <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border border-gray-200 bg-white p-6">
        <FormField label="Nama Produk" required>
          <input
            name="name"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-[#3D7EAA] focus:outline-none focus:ring-1 focus:ring-[#3D7EAA]"
            placeholder="Contoh: Arsip Pintar"
          />
        </FormField>

        <FormField label="Tagline" required>
          <input
            name="tagline"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-[#3D7EAA] focus:outline-none focus:ring-1 focus:ring-[#3D7EAA]"
            placeholder="Deskripsi singkat produk"
          />
        </FormField>

        <FormField label="Deskripsi" required>
          <textarea
            name="description"
            required
            rows={4}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-[#3D7EAA] focus:outline-none focus:ring-1 focus:ring-[#3D7EAA]"
            placeholder="Deskripsi lengkap produk"
          />
        </FormField>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Icon (Lucide)" required>
            <IconPicker value={icon} onChange={setIcon} name="icon" required />
          </FormField>

          <FormField label="Kategori" required>
            <select
              name="category"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-[#3D7EAA] focus:outline-none focus:ring-1 focus:ring-[#3D7EAA]"
            >
              <option value="">Pilih kategori</option>
              <option value="pos">POS</option>
              <option value="ai">AI</option>
              <option value="document-management">Manajemen Dokumen</option>
              <option value="analytics">Analitik</option>
            </select>
          </FormField>
        </div>

        <FormField label="Logo">
          <ImageUpload value={logo} onChange={setLogo} label="Upload logo produk" />
        </FormField>

        <FormField label="Fitur (satu per baris)" required>
          <textarea
            name="features"
            required
            rows={3}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-[#3D7EAA] focus:outline-none focus:ring-1 focus:ring-[#3D7EAA]"
            placeholder={"Fitur 1\nFitur 2\nFitur 3"}
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
            {loading ? "Menyimpan..." : "Buat Produk"}
          </button>
        </div>
      </form>
    </div>
  );
}
