"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateProduct } from "@/lib/actions/products";
import FormField from "@/components/admin/ui/FormField";
import ImageUpload from "@/components/admin/ui/ImageUpload";
import type { Prisma } from "@prisma/client";

type FullProduct = Prisma.ProductGetPayload<{
  include: {
    featureHighlights: true;
    capabilities: true;
    steps: true;
    useCases: true;
    stats: true;
    pricingPlans: true;
    testimonials: true;
    integrations: true;
    faqs: true;
  };
}>;

const tabs = [
  "Info Dasar",
  "Fitur",
  "Kapabilitas",
  "Cara Kerja",
  "Use Cases",
  "Harga",
  "Statistik",
  "Testimoni",
  "Integrasi",
  "FAQ",
  "SEO",
];

export default function ProductEditClient({
  product,
}: {
  product: FullProduct;
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [saving, setSaving] = useState(false);
  const [logo, setLogo] = useState(product.logo || "");

  async function handleSaveBasic(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    const form = new FormData(e.currentTarget);

    try {
      await updateProduct(product.id, {
        name: form.get("name") as string,
        tagline: form.get("tagline") as string,
        description: form.get("description") as string,
        icon: form.get("icon") as string,
        logo: logo || undefined,
        category: form.get("category") as string,
        features: (form.get("features") as string)
          .split("\n")
          .map((f) => f.trim())
          .filter(Boolean),
        isPublished: form.get("isPublished") === "on",
        metaTitle: (form.get("metaTitle") as string) || null,
        metaDescription: (form.get("metaDescription") as string) || null,
        relatedSlugs: (form.get("relatedSlugs") as string)
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      });
      toast.success("Produk berhasil diperbarui");
      router.refresh();
    } catch {
      toast.error("Gagal menyimpan");
    }
    setSaving(false);
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Edit: {product.name}
        </h1>
        <p className="text-sm text-gray-500">/{product.slug}</p>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-1 overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-1">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={`whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition ${
              activeTab === i
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 0 && (
        <form
          onSubmit={handleSaveBasic}
          className="space-y-5 rounded-xl border border-gray-200 bg-white p-6"
        >
          <FormField label="Nama Produk" required>
            <input
              name="name"
              defaultValue={product.name}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-[#3D7EAA] focus:outline-none focus:ring-1 focus:ring-[#3D7EAA]"
            />
          </FormField>

          <FormField label="Tagline" required>
            <input
              name="tagline"
              defaultValue={product.tagline}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-[#3D7EAA] focus:outline-none focus:ring-1 focus:ring-[#3D7EAA]"
            />
          </FormField>

          <FormField label="Deskripsi" required>
            <textarea
              name="description"
              defaultValue={product.description}
              required
              rows={4}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-[#3D7EAA] focus:outline-none focus:ring-1 focus:ring-[#3D7EAA]"
            />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Icon (Lucide)" required>
              <input
                name="icon"
                defaultValue={product.icon}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-[#3D7EAA] focus:outline-none focus:ring-1 focus:ring-[#3D7EAA]"
              />
            </FormField>

            <FormField label="Kategori" required>
              <select
                name="category"
                defaultValue={product.category}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-[#3D7EAA] focus:outline-none focus:ring-1 focus:ring-[#3D7EAA]"
              >
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

          <FormField label="Fitur (satu per baris)">
            <textarea
              name="features"
              defaultValue={(product.features as string[]).join("\n")}
              rows={3}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-[#3D7EAA] focus:outline-none focus:ring-1 focus:ring-[#3D7EAA]"
            />
          </FormField>

          <FormField label="Related Product Slugs (pisahkan koma)">
            <input
              name="relatedSlugs"
              defaultValue={(product.relatedSlugs as string[]).join(", ")}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-[#3D7EAA] focus:outline-none focus:ring-1 focus:ring-[#3D7EAA]"
            />
          </FormField>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="isPublished"
                defaultChecked={product.isPublished}
                className="rounded border-gray-300"
              />
              Published
            </label>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 pt-4 border-t">SEO</h3>

          <FormField label="Meta Title">
            <input
              name="metaTitle"
              defaultValue={product.metaTitle || ""}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-[#3D7EAA] focus:outline-none focus:ring-1 focus:ring-[#3D7EAA]"
            />
          </FormField>

          <FormField label="Meta Description">
            <textarea
              name="metaDescription"
              defaultValue={product.metaDescription || ""}
              rows={2}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-[#3D7EAA] focus:outline-none focus:ring-1 focus:ring-[#3D7EAA]"
            />
          </FormField>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-[#3D7EAA] px-6 py-2 text-sm font-medium text-white hover:bg-[#2D6890] disabled:opacity-50"
            >
              {saving ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      )}

      {activeTab >= 1 && activeTab <= 9 && (
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <p className="text-sm text-gray-500">
            Tab &quot;{tabs[activeTab]}&quot; — Data saat ini:{" "}
            {activeTab === 1 && `${product.featureHighlights.length} item`}
            {activeTab === 2 && `${product.capabilities.length} item`}
            {activeTab === 3 && `${product.steps.length} step`}
            {activeTab === 4 && `${product.useCases.length} item`}
            {activeTab === 5 && `${product.pricingPlans.length} plan`}
            {activeTab === 6 && `${product.stats.length} stat`}
            {activeTab === 7 && `${product.testimonials.length} testimoni`}
            {activeTab === 8 && `${product.integrations.length} integrasi`}
            {activeTab === 9 && `${product.faqs.length} FAQ`}
          </p>
          <p className="mt-2 text-xs text-gray-400">
            Editor detail sub-entity akan tersedia di versi berikutnya. Data existing dari seed sudah tersimpan di database.
          </p>
        </div>
      )}

      {activeTab === 10 && (
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <p className="text-sm text-gray-500">
            SEO fields sudah di tab Info Dasar.
          </p>
        </div>
      )}
    </div>
  );
}
