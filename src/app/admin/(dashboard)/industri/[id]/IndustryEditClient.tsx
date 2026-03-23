"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  updateIndustryPage,
  saveIndustryChallenges,
  saveIndustrySolutions,
  saveIndustryProcessSteps,
  saveIndustryFeatures,
  saveIndustryStats,
  saveIndustryFaqs,
  saveIndustryTestimonials,
} from "@/lib/actions/industry-pages";
import FormField from "@/components/admin/ui/FormField";
import ImageUpload from "@/components/admin/ui/ImageUpload";
import IconPicker from "@/components/admin/ui/IconPicker";
import SubEntityEditor from "@/components/admin/ui/SubEntityEditor";
import type { Prisma } from "@prisma/client";

type FullIndustryPage = Prisma.IndustryPageGetPayload<{
  include: {
    challenges: true;
    solutions: true;
    process: true;
    features: true;
    stats: true;
    faqs: true;
    testimonials: true;
  };
}>;

// ── Local types for sub-entity editing ──
type ChallengeItem = { icon: string; title: string; description: string };
type SolutionItem = { icon: string; title: string; description: string; features: string[]; image: string };
type ProcessItem = { icon: string; title: string; description: string };
type FeatureItem = { icon: string; title: string; description: string };
type StatItem = { value: number; suffix: string; label: string; icon: string };
type FaqItem = { question: string; answer: string };
type TestimonialItem = { name: string; role: string; company: string; content: string };
type CaseStudyResult = { value: string; label: string };

const inputClass =
  "w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-[#3D7EAA] focus:outline-none focus:ring-1 focus:ring-[#3D7EAA]";

const tabs = [
  "Info Dasar",
  "Tantangan",
  "Solusi",
  "Studi Kasus",
  "Alur Kerja",
  "Fitur",
  "Statistik",
  "Testimoni",
  "FAQ",
];

export default function IndustryEditClient({
  page,
}: {
  page: FullIndustryPage;
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [saving, setSaving] = useState(false);
  const [icon, setIcon] = useState(page.icon);

  // Case study results state
  const [csResults, setCsResults] = useState<CaseStudyResult[]>(
    (page.caseStudyResults as CaseStudyResult[]) || []
  );

  // Item counts for tab badges
  const counts = [
    null, // Info Dasar
    page.challenges.length,
    page.solutions.length,
    null, // Studi Kasus (single)
    page.process.length,
    page.features.length,
    page.stats.length,
    page.testimonials.length,
    page.faqs.length,
  ];

  async function handleSaveBasic(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    const form = new FormData(e.currentTarget);
    try {
      await updateIndustryPage(page.id, {
        name: form.get("name") as string,
        tagline: form.get("tagline") as string,
        icon: form.get("icon") as string,
        heroHeading: form.get("heroHeading") as string,
        heroHighlight: form.get("heroHighlight") as string,
        heroDescription: form.get("heroDescription") as string,
        isPublished: form.get("isPublished") === "on",
        metaTitle: (form.get("metaTitle") as string) || null,
        metaDescription: (form.get("metaDescription") as string) || null,
      });
      toast.success("Info dasar berhasil disimpan");
      router.refresh();
    } catch {
      toast.error("Gagal menyimpan");
    }
    setSaving(false);
  }

  async function handleSaveCaseStudy(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    const form = new FormData(e.currentTarget);
    try {
      await updateIndustryPage(page.id, {
        caseStudyTag: (form.get("caseStudyTag") as string) || null,
        caseStudyTitle: (form.get("caseStudyTitle") as string) || null,
        caseStudyPartnerName: (form.get("caseStudyPartnerName") as string) || null,
        caseStudyPartnerLogo: (form.get("caseStudyPartnerLogo") as string) || null,
        caseStudyNarrative: (form.get("caseStudyNarrative") as string) || null,
        caseStudyVideoUrl: (form.get("caseStudyVideoUrl") as string) || null,
        caseStudyResults: csResults.filter((r) => r.value && r.label),
      });
      toast.success("Studi kasus berhasil disimpan");
      router.refresh();
    } catch {
      toast.error("Gagal menyimpan");
    }
    setSaving(false);
  }

  // Case study partner logo state
  const [csPartnerLogo, setCsPartnerLogo] = useState(page.caseStudyPartnerLogo || "");

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Edit: {page.name}
        </h1>
        <p className="text-sm text-gray-500">/{page.slug}</p>
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
          <FormField label="Nama Industri" required>
            <input name="name" defaultValue={page.name} required className={inputClass} />
          </FormField>

          <FormField label="Tagline" required>
            <input name="tagline" defaultValue={page.tagline} required className={inputClass} />
          </FormField>

          <FormField label="Icon (Lucide)" required>
            <IconPicker value={icon} onChange={setIcon} name="icon" required />
          </FormField>

          <FormField label="Hero Heading" required>
            <input name="heroHeading" defaultValue={page.heroHeading} required className={inputClass} />
          </FormField>

          <FormField label="Hero Highlight" required>
            <input name="heroHighlight" defaultValue={page.heroHighlight} required className={inputClass} />
          </FormField>

          <FormField label="Hero Description" required>
            <textarea name="heroDescription" defaultValue={page.heroDescription} required rows={4} className={inputClass} />
          </FormField>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="isPublished" defaultChecked={page.isPublished} className="rounded border-gray-300" />
              Published
            </label>
          </div>

          <h3 className="border-t pt-4 text-lg font-semibold text-gray-900">SEO</h3>

          <FormField label="Meta Title">
            <input name="metaTitle" defaultValue={page.metaTitle || ""} className={inputClass} />
          </FormField>

          <FormField label="Meta Description">
            <textarea name="metaDescription" defaultValue={page.metaDescription || ""} rows={2} className={inputClass} />
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

      {/* ═══ Tab 1: Tantangan ═══ */}
      {activeTab === 1 && (
        <SubEntityEditor<ChallengeItem>
          items={page.challenges.map((c) => ({
            icon: c.icon,
            title: c.title,
            description: c.description,
          }))}
          onSave={async (items) => {
            await saveIndustryChallenges(page.id, items);
            toast.success("Tantangan berhasil disimpan");
            router.refresh();
          }}
          createEmpty={() => ({ icon: "AlertTriangle", title: "", description: "" })}
          addLabel="Tambah Tantangan"
          emptyLabel="Belum ada tantangan"
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
                  <IconPicker value={item.icon} onChange={(v) => onChange("icon", v)} />
                </FormField>
                <FormField label="Judul" required>
                  <input value={item.title} onChange={(e) => onChange("title", e.target.value)} className={inputClass} placeholder="Judul tantangan" />
                </FormField>
              </div>
              <FormField label="Deskripsi" required>
                <textarea value={item.description} onChange={(e) => onChange("description", e.target.value)} rows={3} className={inputClass} placeholder="Deskripsi tantangan" />
              </FormField>
            </>
          )}
        />
      )}

      {/* ═══ Tab 2: Solusi ═══ */}
      {activeTab === 2 && (
        <SubEntityEditor<SolutionItem>
          items={page.solutions.map((s) => ({
            icon: s.icon,
            title: s.title,
            description: s.description,
            features: (s.features as string[]) || [],
            image: s.image || "",
          }))}
          onSave={async (items) => {
            await saveIndustrySolutions(
              page.id,
              items.map((i) => ({
                ...i,
                features: i.features.map((f) => f.trim()).filter(Boolean),
                image: i.image || undefined,
              }))
            );
            toast.success("Solusi berhasil disimpan");
            router.refresh();
          }}
          createEmpty={() => ({ icon: "Zap", title: "", description: "", features: [], image: "" })}
          addLabel="Tambah Solusi"
          emptyLabel="Belum ada solusi"
          renderPreview={(item) => (
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-xs font-medium text-[#3D7EAA]">
                {item.icon.slice(0, 2)}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-gray-900">{item.title || "Tanpa judul"}</p>
                <p className="text-xs text-gray-500">{item.features.length} fitur</p>
              </div>
            </div>
          )}
          renderForm={(item, onChange) => (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Icon (Lucide)" required>
                  <IconPicker value={item.icon} onChange={(v) => onChange("icon", v)} />
                </FormField>
                <FormField label="Judul" required>
                  <input value={item.title} onChange={(e) => onChange("title", e.target.value)} className={inputClass} placeholder="Judul solusi" />
                </FormField>
              </div>
              <FormField label="Deskripsi" required>
                <textarea value={item.description} onChange={(e) => onChange("description", e.target.value)} rows={3} className={inputClass} placeholder="Deskripsi solusi" />
              </FormField>
              <FormField label="Fitur (satu per baris)">
                <textarea
                  value={item.features.join("\n")}
                  onChange={(e) => onChange("features", e.target.value.split("\n"))}
                  rows={4}
                  className={inputClass}
                  placeholder={"Fitur 1\nFitur 2\nFitur 3"}
                />
              </FormField>
              <FormField label="Gambar / Video (opsional)">
                <ImageUpload value={item.image} onChange={(v) => onChange("image", v)} label="Upload gambar atau video solusi" />
              </FormField>
            </>
          )}
        />
      )}

      {/* ═══ Tab 3: Studi Kasus ═══ */}
      {activeTab === 3 && (
        <form
          onSubmit={handleSaveCaseStudy}
          className="space-y-5 rounded-xl border border-gray-200 bg-white p-4 sm:p-6"
        >
          <p className="text-sm text-gray-500">Studi kasus bersifat opsional. Kosongkan semua field jika tidak ada studi kasus.</p>

          <FormField label="Tag">
            <input name="caseStudyTag" defaultValue={page.caseStudyTag || ""} className={inputClass} placeholder="Contoh: Studi Kasus" />
          </FormField>

          <FormField label="Judul">
            <input name="caseStudyTitle" defaultValue={page.caseStudyTitle || ""} className={inputClass} placeholder="Judul studi kasus" />
          </FormField>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Nama Partner">
              <input name="caseStudyPartnerName" defaultValue={page.caseStudyPartnerName || ""} className={inputClass} placeholder="Nama partner" />
            </FormField>
            <FormField label="Logo Partner">
              <ImageUpload value={csPartnerLogo} onChange={(v) => setCsPartnerLogo(v)} label="Upload logo partner" />
              <input type="hidden" name="caseStudyPartnerLogo" value={csPartnerLogo} />
            </FormField>
          </div>

          <FormField label="Narasi">
            <textarea name="caseStudyNarrative" defaultValue={page.caseStudyNarrative || ""} rows={5} className={inputClass} placeholder="Cerita studi kasus" />
          </FormField>

          <FormField label="Video URL (opsional)">
            <input name="caseStudyVideoUrl" defaultValue={page.caseStudyVideoUrl || ""} className={inputClass} placeholder="URL YouTube embed" />
          </FormField>

          <FormField label="Hasil">
            <div className="space-y-3">
              {csResults.map((r, i) => (
                <div key={i} className="flex items-center gap-3">
                  <input
                    value={r.value}
                    onChange={(e) => {
                      const updated = [...csResults];
                      updated[i] = { ...updated[i], value: e.target.value };
                      setCsResults(updated);
                    }}
                    className={inputClass}
                    placeholder="Nilai (e.g. 2 Jam → 10 Detik)"
                  />
                  <input
                    value={r.label}
                    onChange={(e) => {
                      const updated = [...csResults];
                      updated[i] = { ...updated[i], label: e.target.value };
                      setCsResults(updated);
                    }}
                    className={inputClass}
                    placeholder="Label"
                  />
                  <button
                    type="button"
                    onClick={() => setCsResults(csResults.filter((_, j) => j !== i))}
                    className="text-red-400 hover:text-red-600 text-sm flex-shrink-0"
                  >
                    Hapus
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setCsResults([...csResults, { value: "", label: "" }])}
                className="text-sm font-medium text-[#3D7EAA] hover:underline"
              >
                + Tambah Hasil
              </button>
            </div>
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

      {/* ═══ Tab 4: Alur Kerja ═══ */}
      {activeTab === 4 && (
        <SubEntityEditor<ProcessItem>
          items={page.process.map((p) => ({
            icon: p.icon,
            title: p.title,
            description: p.description,
          }))}
          onSave={async (items) => {
            await saveIndustryProcessSteps(page.id, items);
            toast.success("Alur kerja berhasil disimpan");
            router.refresh();
          }}
          createEmpty={() => ({ icon: "Settings", title: "", description: "" })}
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
                  <IconPicker value={item.icon} onChange={(v) => onChange("icon", v)} />
                </FormField>
                <FormField label="Judul" required>
                  <input value={item.title} onChange={(e) => onChange("title", e.target.value)} className={inputClass} placeholder="Judul langkah" />
                </FormField>
              </div>
              <FormField label="Deskripsi" required>
                <textarea value={item.description} onChange={(e) => onChange("description", e.target.value)} rows={3} className={inputClass} placeholder="Deskripsi langkah" />
              </FormField>
            </>
          )}
        />
      )}

      {/* ═══ Tab 5: Fitur ═══ */}
      {activeTab === 5 && (
        <SubEntityEditor<FeatureItem>
          items={page.features.map((f) => ({
            icon: f.icon,
            title: f.title,
            description: f.description,
          }))}
          onSave={async (items) => {
            await saveIndustryFeatures(page.id, items);
            toast.success("Fitur berhasil disimpan");
            router.refresh();
          }}
          createEmpty={() => ({ icon: "Star", title: "", description: "" })}
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
                  <IconPicker value={item.icon} onChange={(v) => onChange("icon", v)} />
                </FormField>
                <FormField label="Judul" required>
                  <input value={item.title} onChange={(e) => onChange("title", e.target.value)} className={inputClass} placeholder="Judul fitur" />
                </FormField>
              </div>
              <FormField label="Deskripsi" required>
                <textarea value={item.description} onChange={(e) => onChange("description", e.target.value)} rows={3} className={inputClass} placeholder="Deskripsi fitur" />
              </FormField>
            </>
          )}
        />
      )}

      {/* ═══ Tab 6: Statistik ═══ */}
      {activeTab === 6 && (
        <SubEntityEditor<StatItem>
          items={page.stats.map((s) => ({
            value: s.value,
            suffix: s.suffix,
            label: s.label,
            icon: s.icon,
          }))}
          onSave={async (items) => {
            await saveIndustryStats(page.id, items);
            toast.success("Statistik berhasil disimpan");
            router.refresh();
          }}
          createEmpty={() => ({ value: 0, suffix: "+", label: "", icon: "TrendingUp" })}
          addLabel="Tambah Statistik"
          emptyLabel="Belum ada statistik"
          renderPreview={(item) => (
            <p className="text-sm">
              <span className="font-bold text-[#3D7EAA]">{item.value}{item.suffix}</span>
              <span className="ml-2 text-gray-600">{item.label || "Tanpa label"}</span>
            </p>
          )}
          renderForm={(item, onChange) => (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Nilai (angka)" required>
                  <input
                    type="number"
                    step="any"
                    value={item.value}
                    onChange={(e) => onChange("value", parseFloat(e.target.value) || 0)}
                    className={inputClass}
                    placeholder="100"
                  />
                </FormField>
                <FormField label="Suffix" required>
                  <input value={item.suffix} onChange={(e) => onChange("suffix", e.target.value)} className={inputClass} placeholder="+ atau % atau rb" />
                </FormField>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Label" required>
                  <input value={item.label} onChange={(e) => onChange("label", e.target.value)} className={inputClass} placeholder="Klien Puas" />
                </FormField>
                <FormField label="Icon (Lucide)" required>
                  <IconPicker value={item.icon} onChange={(v) => onChange("icon", v)} />
                </FormField>
              </div>
            </>
          )}
        />
      )}

      {/* ═══ Tab 7: Testimoni ═══ */}
      {activeTab === 7 && (
        <SubEntityEditor<TestimonialItem>
          items={page.testimonials.map((t) => ({
            name: t.name,
            role: t.role,
            company: t.company,
            content: t.content,
          }))}
          onSave={async (items) => {
            await saveIndustryTestimonials(page.id, items);
            toast.success("Testimoni berhasil disimpan");
            router.refresh();
          }}
          createEmpty={() => ({ name: "", role: "", company: "", content: "" })}
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
                  <input value={item.name} onChange={(e) => onChange("name", e.target.value)} className={inputClass} placeholder="Nama" />
                </FormField>
                <FormField label="Jabatan" required>
                  <input value={item.role} onChange={(e) => onChange("role", e.target.value)} className={inputClass} placeholder="Jabatan" />
                </FormField>
                <FormField label="Perusahaan/Instansi" required>
                  <input value={item.company} onChange={(e) => onChange("company", e.target.value)} className={inputClass} placeholder="Perusahaan" />
                </FormField>
              </div>
              <FormField label="Konten Testimoni" required>
                <textarea value={item.content} onChange={(e) => onChange("content", e.target.value)} rows={3} className={inputClass} placeholder="Isi testimoni" />
              </FormField>
            </>
          )}
        />
      )}

      {/* ═══ Tab 8: FAQ ═══ */}
      {activeTab === 8 && (
        <SubEntityEditor<FaqItem>
          items={page.faqs.map((f) => ({
            question: f.question,
            answer: f.answer,
          }))}
          onSave={async (items) => {
            await saveIndustryFaqs(page.id, items);
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
