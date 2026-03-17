"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  updateProduct,
  saveProductFeatureHighlights,
  saveProductCapabilities,
  saveProductSteps,
  saveProductUseCases,
  saveProductStats,
  saveProductPricingPlans,
  saveProductTestimonials,
  saveProductIntegrations,
  saveProductFaqs,
} from "@/lib/actions/products";
import FormField from "@/components/admin/ui/FormField";
import ImageUpload from "@/components/admin/ui/ImageUpload";
import SubEntityEditor from "@/components/admin/ui/SubEntityEditor";
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

// ── Local types for sub-entity editing ──

type FeatureItem = { icon: string; title: string; description: string; image: string };
type CapabilityItem = { icon: string; title: string; description: string };
type StepItem = { step: number; icon: string; title: string; description: string };
type UseCaseItem = { icon: string; title: string; description: string };
type StatItem = { value: string; label: string };
type PricingItem = {
  name: string;
  price: string;
  currency: string;
  period: string;
  description: string;
  features: string[];
  isPopular: boolean;
  ctaLabel: string;
  ctaHref: string;
};
type TestimonialItem = { name: string; role: string; company: string; avatar: string; content: string };
type IntegrationItem = { name: string; icon: string; logo: string };
type FaqItem = { question: string; answer: string };

const inputClass =
  "w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-[#3D7EAA] focus:outline-none focus:ring-1 focus:ring-[#3D7EAA]";

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

  // Item counts for tab badges
  const counts = [
    null, // Info Dasar
    product.featureHighlights.length,
    product.capabilities.length,
    product.steps.length,
    product.useCases.length,
    product.pricingPlans.length,
    product.stats.length,
    product.testimonials.length,
    product.integrations.length,
    product.faqs.length,
  ];

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
            className={`flex items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition ${
              activeTab === i
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
            {counts[i] != null && (
              <span
                className={`inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-xs font-medium ${
                  activeTab === i
                    ? "bg-[#3D7EAA] text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {counts[i]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ═══ Tab 0: Info Dasar ═══ */}
      {activeTab === 0 && (
        <form
          onSubmit={handleSaveBasic}
          className="space-y-5 rounded-xl border border-gray-200 bg-white p-4 sm:p-6"
        >
          <FormField label="Nama Produk" required>
            <input name="name" defaultValue={product.name} required className={inputClass} />
          </FormField>

          <FormField label="Tagline" required>
            <input name="tagline" defaultValue={product.tagline} required className={inputClass} />
          </FormField>

          <FormField label="Deskripsi" required>
            <textarea name="description" defaultValue={product.description} required rows={4} className={inputClass} />
          </FormField>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Icon (Lucide)" required>
              <input name="icon" defaultValue={product.icon} required className={inputClass} />
            </FormField>
            <FormField label="Kategori" required>
              <select name="category" defaultValue={product.category} required className={inputClass}>
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
              className={inputClass}
            />
          </FormField>

          <FormField label="Related Product Slugs (pisahkan koma)">
            <input
              name="relatedSlugs"
              defaultValue={(product.relatedSlugs as string[]).join(", ")}
              className={inputClass}
            />
          </FormField>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="isPublished" defaultChecked={product.isPublished} className="rounded border-gray-300" />
              Published
            </label>
          </div>

          <h3 className="border-t pt-4 text-lg font-semibold text-gray-900">SEO</h3>

          <FormField label="Meta Title">
            <input name="metaTitle" defaultValue={product.metaTitle || ""} className={inputClass} />
          </FormField>

          <FormField label="Meta Description">
            <textarea name="metaDescription" defaultValue={product.metaDescription || ""} rows={2} className={inputClass} />
          </FormField>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={saving}
              className="min-h-[44px] rounded-lg bg-[#3D7EAA] px-6 py-2 text-sm font-medium text-white hover:bg-[#2D6890] disabled:opacity-50"
            >
              {saving ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      )}

      {/* ═══ Tab 1: Fitur (Feature Highlights) ═══ */}
      {activeTab === 1 && (
        <SubEntityEditor<FeatureItem>
          items={product.featureHighlights.map((f) => ({
            icon: f.icon,
            title: f.title,
            description: f.description,
            image: f.image || "",
          }))}
          onSave={async (items) => {
            await saveProductFeatureHighlights(
              product.id,
              items.map((i) => ({ ...i, image: i.image || undefined }))
            );
            toast.success("Fitur berhasil disimpan");
            router.refresh();
          }}
          createEmpty={() => ({ icon: "Star", title: "", description: "", image: "" })}
          addLabel="Tambah Fitur"
          emptyLabel="Belum ada fitur"
          renderPreview={(item) => (
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-xs font-medium text-[#3D7EAA]">
                {item.icon.slice(0, 2)}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-gray-900">{item.title || "Tanpa judul"}</p>
                <p className="truncate text-xs text-gray-500">{item.description.slice(0, 60)}</p>
              </div>
            </div>
          )}
          renderForm={(item, onChange) => (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Icon (Lucide)" required>
                  <input value={item.icon} onChange={(e) => onChange("icon", e.target.value)} className={inputClass} placeholder="Star" />
                </FormField>
                <FormField label="Judul" required>
                  <input value={item.title} onChange={(e) => onChange("title", e.target.value)} className={inputClass} placeholder="Judul fitur" />
                </FormField>
              </div>
              <FormField label="Deskripsi" required>
                <textarea value={item.description} onChange={(e) => onChange("description", e.target.value)} rows={3} className={inputClass} placeholder="Deskripsi fitur" />
              </FormField>
              <FormField label="Gambar (opsional)">
                <ImageUpload value={item.image} onChange={(v) => onChange("image", v)} label="Upload gambar fitur" />
              </FormField>
            </>
          )}
        />
      )}

      {/* ═══ Tab 2: Kapabilitas ═══ */}
      {activeTab === 2 && (
        <SubEntityEditor<CapabilityItem>
          items={product.capabilities.map((c) => ({
            icon: c.icon,
            title: c.title,
            description: c.description,
          }))}
          onSave={async (items) => {
            await saveProductCapabilities(product.id, items);
            toast.success("Kapabilitas berhasil disimpan");
            router.refresh();
          }}
          createEmpty={() => ({ icon: "Zap", title: "", description: "" })}
          addLabel="Tambah Kapabilitas"
          emptyLabel="Belum ada kapabilitas"
          renderPreview={(item) => (
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-xs font-medium text-[#3D7EAA]">
                {item.icon.slice(0, 2)}
              </span>
              <p className="truncate text-sm font-medium text-gray-900">{item.title || "Tanpa judul"}</p>
            </div>
          )}
          renderForm={(item, onChange) => (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Icon (Lucide)" required>
                  <input value={item.icon} onChange={(e) => onChange("icon", e.target.value)} className={inputClass} placeholder="Zap" />
                </FormField>
                <FormField label="Judul" required>
                  <input value={item.title} onChange={(e) => onChange("title", e.target.value)} className={inputClass} placeholder="Judul kapabilitas" />
                </FormField>
              </div>
              <FormField label="Deskripsi" required>
                <textarea value={item.description} onChange={(e) => onChange("description", e.target.value)} rows={3} className={inputClass} placeholder="Deskripsi kapabilitas" />
              </FormField>
            </>
          )}
        />
      )}

      {/* ═══ Tab 3: Cara Kerja (Steps) ═══ */}
      {activeTab === 3 && (
        <SubEntityEditor<StepItem>
          items={product.steps.map((s) => ({
            step: s.step,
            icon: s.icon,
            title: s.title,
            description: s.description,
          }))}
          onSave={async (items) => {
            const numbered = items.map((item, i) => ({ ...item, step: i + 1 }));
            await saveProductSteps(product.id, numbered);
            toast.success("Cara kerja berhasil disimpan");
            router.refresh();
          }}
          createEmpty={() => ({ step: 0, icon: "Settings", title: "", description: "" })}
          addLabel="Tambah Langkah"
          emptyLabel="Belum ada langkah"
          renderPreview={(item, index) => (
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#3D7EAA] text-xs font-bold text-white">
                {index + 1}
              </span>
              <p className="truncate text-sm font-medium text-gray-900">{item.title || "Tanpa judul"}</p>
            </div>
          )}
          renderForm={(item, onChange) => (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Icon (Lucide)" required>
                  <input value={item.icon} onChange={(e) => onChange("icon", e.target.value)} className={inputClass} placeholder="Settings" />
                </FormField>
                <FormField label="Judul" required>
                  <input value={item.title} onChange={(e) => onChange("title", e.target.value)} className={inputClass} placeholder="Judul langkah" />
                </FormField>
              </div>
              <FormField label="Deskripsi" required>
                <textarea value={item.description} onChange={(e) => onChange("description", e.target.value)} rows={3} className={inputClass} placeholder="Deskripsi langkah" />
              </FormField>
              <p className="text-xs text-gray-400">Nomor langkah otomatis berdasarkan urutan.</p>
            </>
          )}
        />
      )}

      {/* ═══ Tab 4: Use Cases ═══ */}
      {activeTab === 4 && (
        <SubEntityEditor<UseCaseItem>
          items={product.useCases.map((u) => ({
            icon: u.icon,
            title: u.title,
            description: u.description,
          }))}
          onSave={async (items) => {
            await saveProductUseCases(product.id, items);
            toast.success("Use cases berhasil disimpan");
            router.refresh();
          }}
          createEmpty={() => ({ icon: "Briefcase", title: "", description: "" })}
          addLabel="Tambah Use Case"
          emptyLabel="Belum ada use case"
          renderPreview={(item) => (
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-xs font-medium text-[#3D7EAA]">
                {item.icon.slice(0, 2)}
              </span>
              <p className="truncate text-sm font-medium text-gray-900">{item.title || "Tanpa judul"}</p>
            </div>
          )}
          renderForm={(item, onChange) => (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Icon (Lucide)" required>
                  <input value={item.icon} onChange={(e) => onChange("icon", e.target.value)} className={inputClass} placeholder="Briefcase" />
                </FormField>
                <FormField label="Judul" required>
                  <input value={item.title} onChange={(e) => onChange("title", e.target.value)} className={inputClass} placeholder="Judul use case" />
                </FormField>
              </div>
              <FormField label="Deskripsi" required>
                <textarea value={item.description} onChange={(e) => onChange("description", e.target.value)} rows={3} className={inputClass} placeholder="Deskripsi use case" />
              </FormField>
            </>
          )}
        />
      )}

      {/* ═══ Tab 5: Harga (Pricing Plans) ═══ */}
      {activeTab === 5 && (
        <SubEntityEditor<PricingItem>
          items={product.pricingPlans.map((p) => ({
            name: p.name,
            price: p.price || "",
            currency: p.currency,
            period: p.period,
            description: p.description,
            features: p.features as string[],
            isPopular: p.isPopular,
            ctaLabel: p.ctaLabel,
            ctaHref: p.ctaHref,
          }))}
          onSave={async (items) => {
            await saveProductPricingPlans(
              product.id,
              items.map((i) => ({ ...i, price: i.price || null }))
            );
            toast.success("Paket harga berhasil disimpan");
            router.refresh();
          }}
          createEmpty={() => ({
            name: "",
            price: "",
            currency: "Rp",
            period: "/bulan",
            description: "",
            features: [],
            isPopular: false,
            ctaLabel: "Mulai Sekarang",
            ctaHref: "/kontak",
          })}
          addLabel="Tambah Paket"
          emptyLabel="Belum ada paket harga"
          renderPreview={(item) => (
            <div className="flex items-center gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-medium text-gray-900">{item.name || "Tanpa nama"}</p>
                  {item.isPopular && (
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                      Populer
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  {item.price ? `${item.currency} ${item.price}${item.period}` : "Custom"}
                </p>
              </div>
            </div>
          )}
          renderForm={(item, onChange) => (
            <>
              <FormField label="Nama Paket" required>
                <input value={item.name} onChange={(e) => onChange("name", e.target.value)} className={inputClass} placeholder="Starter" />
              </FormField>
              <div className="grid gap-4 sm:grid-cols-3">
                <FormField label="Harga (kosong = Custom)">
                  <input value={item.price} onChange={(e) => onChange("price", e.target.value)} className={inputClass} placeholder="299.000" />
                </FormField>
                <FormField label="Mata Uang">
                  <input value={item.currency} onChange={(e) => onChange("currency", e.target.value)} className={inputClass} placeholder="Rp" />
                </FormField>
                <FormField label="Periode">
                  <input value={item.period} onChange={(e) => onChange("period", e.target.value)} className={inputClass} placeholder="/bulan" />
                </FormField>
              </div>
              <FormField label="Deskripsi">
                <textarea value={item.description} onChange={(e) => onChange("description", e.target.value)} rows={2} className={inputClass} placeholder="Deskripsi paket" />
              </FormField>
              <FormField label="Fitur (satu per baris)">
                <textarea
                  value={item.features.join("\n")}
                  onChange={(e) =>
                    onChange(
                      "features",
                      e.target.value.split("\n").map((f) => f.trim()).filter(Boolean)
                    )
                  }
                  rows={4}
                  className={inputClass}
                  placeholder={"Fitur 1\nFitur 2\nFitur 3"}
                />
              </FormField>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Label Tombol CTA">
                  <input value={item.ctaLabel} onChange={(e) => onChange("ctaLabel", e.target.value)} className={inputClass} placeholder="Mulai Sekarang" />
                </FormField>
                <FormField label="Link CTA">
                  <input value={item.ctaHref} onChange={(e) => onChange("ctaHref", e.target.value)} className={inputClass} placeholder="/kontak" />
                </FormField>
              </div>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={item.isPopular}
                    onChange={(e) => onChange("isPopular", e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  Tandai sebagai paket populer
                </label>
              </div>
            </>
          )}
        />
      )}

      {/* ═══ Tab 6: Statistik ═══ */}
      {activeTab === 6 && (
        <SubEntityEditor<StatItem>
          items={product.stats.map((s) => ({
            value: s.value,
            label: s.label,
          }))}
          onSave={async (items) => {
            await saveProductStats(product.id, items);
            toast.success("Statistik berhasil disimpan");
            router.refresh();
          }}
          createEmpty={() => ({ value: "", label: "" })}
          addLabel="Tambah Statistik"
          emptyLabel="Belum ada statistik"
          renderPreview={(item) => (
            <p className="text-sm">
              <span className="font-bold text-[#3D7EAA]">{item.value || "—"}</span>
              <span className="ml-2 text-gray-600">{item.label || "Tanpa label"}</span>
            </p>
          )}
          renderForm={(item, onChange) => (
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Nilai (e.g. 90%, 3x, 100+)" required>
                <input value={item.value} onChange={(e) => onChange("value", e.target.value)} className={inputClass} placeholder="90%" />
              </FormField>
              <FormField label="Label" required>
                <input value={item.label} onChange={(e) => onChange("label", e.target.value)} className={inputClass} placeholder="Customer Satisfaction" />
              </FormField>
            </div>
          )}
        />
      )}

      {/* ═══ Tab 7: Testimoni ═══ */}
      {activeTab === 7 && (
        <SubEntityEditor<TestimonialItem>
          items={product.testimonials.map((t) => ({
            name: t.name,
            role: t.role,
            company: t.company,
            avatar: t.avatar || "",
            content: t.content,
          }))}
          onSave={async (items) => {
            await saveProductTestimonials(
              product.id,
              items.map((i) => ({ ...i, avatar: i.avatar || undefined }))
            );
            toast.success("Testimoni berhasil disimpan");
            router.refresh();
          }}
          createEmpty={() => ({ name: "", role: "", company: "", avatar: "", content: "" })}
          addLabel="Tambah Testimoni"
          emptyLabel="Belum ada testimoni"
          renderPreview={(item) => (
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-gray-900">{item.name || "Tanpa nama"}</p>
              <p className="truncate text-xs text-gray-500">{item.role} — {item.company}</p>
            </div>
          )}
          renderForm={(item, onChange) => (
            <>
              <div className="grid gap-4 sm:grid-cols-3">
                <FormField label="Nama" required>
                  <input value={item.name} onChange={(e) => onChange("name", e.target.value)} className={inputClass} placeholder="John Doe" />
                </FormField>
                <FormField label="Jabatan" required>
                  <input value={item.role} onChange={(e) => onChange("role", e.target.value)} className={inputClass} placeholder="CEO" />
                </FormField>
                <FormField label="Perusahaan" required>
                  <input value={item.company} onChange={(e) => onChange("company", e.target.value)} className={inputClass} placeholder="PT Contoh" />
                </FormField>
              </div>
              <FormField label="Konten Testimoni" required>
                <textarea value={item.content} onChange={(e) => onChange("content", e.target.value)} rows={3} className={inputClass} placeholder="Isi testimoni" />
              </FormField>
              <FormField label="Avatar (opsional)">
                <ImageUpload value={item.avatar} onChange={(v) => onChange("avatar", v)} label="Upload foto" />
              </FormField>
            </>
          )}
        />
      )}

      {/* ═══ Tab 8: Integrasi ═══ */}
      {activeTab === 8 && (
        <SubEntityEditor<IntegrationItem>
          items={product.integrations.map((i) => ({
            name: i.name,
            icon: i.icon || "",
            logo: i.logo || "",
          }))}
          onSave={async (items) => {
            await saveProductIntegrations(
              product.id,
              items.map((i) => ({
                name: i.name,
                icon: i.icon || undefined,
                logo: i.logo || undefined,
              }))
            );
            toast.success("Integrasi berhasil disimpan");
            router.refresh();
          }}
          createEmpty={() => ({ name: "", icon: "", logo: "" })}
          addLabel="Tambah Integrasi"
          emptyLabel="Belum ada integrasi"
          renderPreview={(item) => (
            <p className="text-sm font-medium text-gray-900">{item.name || "Tanpa nama"}</p>
          )}
          renderForm={(item, onChange) => (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Nama" required>
                  <input value={item.name} onChange={(e) => onChange("name", e.target.value)} className={inputClass} placeholder="Slack" />
                </FormField>
                <FormField label="Icon (Lucide)">
                  <input value={item.icon} onChange={(e) => onChange("icon", e.target.value)} className={inputClass} placeholder="MessageSquare" />
                </FormField>
              </div>
              <FormField label="Logo (opsional)">
                <ImageUpload value={item.logo} onChange={(v) => onChange("logo", v)} label="Upload logo" />
              </FormField>
            </>
          )}
        />
      )}

      {/* ═══ Tab 9: FAQ ═══ */}
      {activeTab === 9 && (
        <SubEntityEditor<FaqItem>
          items={product.faqs.map((f) => ({
            question: f.question,
            answer: f.answer,
          }))}
          onSave={async (items) => {
            await saveProductFaqs(product.id, items);
            toast.success("FAQ berhasil disimpan");
            router.refresh();
          }}
          createEmpty={() => ({ question: "", answer: "" })}
          addLabel="Tambah FAQ"
          emptyLabel="Belum ada FAQ"
          renderPreview={(item) => (
            <p className="truncate text-sm font-medium text-gray-900">{item.question || "Tanpa pertanyaan"}</p>
          )}
          renderForm={(item, onChange) => (
            <>
              <FormField label="Pertanyaan" required>
                <input value={item.question} onChange={(e) => onChange("question", e.target.value)} className={inputClass} placeholder="Pertanyaan yang sering ditanyakan" />
              </FormField>
              <FormField label="Jawaban" required>
                <textarea value={item.answer} onChange={(e) => onChange("answer", e.target.value)} rows={4} className={inputClass} placeholder="Jawaban lengkap" />
              </FormField>
            </>
          )}
        />
      )}
    </div>
  );
}
