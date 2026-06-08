"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import { toast } from "sonner";
import FormField from "@/components/admin/ui/FormField";
import { updateAboutPage } from "@/lib/actions/about";

type AboutPage = {
  id: string;
  heroBadge: string;
  heroHeading: string;
  heroDescription: string;
  heroServiceNote: string;
  storyLabel: string;
  storyHeading: string;
  storyBody: string;
  visionLabel: string;
  visionHeading: string;
  visionBody: string;
  expertiseLabel: string;
  expertiseHeading: string;
  productsLabel: string;
  productsHeading: string;
  industriesLabel: string;
  industriesHeading: string;
  locationHeading: string;
  locationBody: string;
  locationCtaLabel: string;
  locationCtaHref: string;
  metaTitle: string;
  metaDescription: string;
} | null;

const inputClass =
  "w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-[#3D7EAA] focus:outline-none focus:ring-1 focus:ring-[#3D7EAA]";
const textareaClass =
  "w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-[#3D7EAA] focus:outline-none focus:ring-1 focus:ring-[#3D7EAA] min-h-[90px] resize-y";

export default function AboutClient({ about }: { about: AboutPage }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    heroBadge: about?.heroBadge ?? "Tentang Kami",
    heroHeading: about?.heroHeading ?? "",
    heroDescription: about?.heroDescription ?? "",
    heroServiceNote: about?.heroServiceNote ?? "Melayani seluruh Indonesia",
    storyLabel: about?.storyLabel ?? "Cerita Kami",
    storyHeading: about?.storyHeading ?? "",
    storyBody: about?.storyBody ?? "",
    visionLabel: about?.visionLabel ?? "Visi Kami",
    visionHeading: about?.visionHeading ?? "",
    visionBody: about?.visionBody ?? "",
    expertiseLabel: about?.expertiseLabel ?? "Bidang Keahlian",
    expertiseHeading: about?.expertiseHeading ?? "Apa saja yang kami kerjakan",
    productsLabel: about?.productsLabel ?? "Produk Kami",
    productsHeading: about?.productsHeading ?? "Solusi siap pakai buatan Technema",
    industriesLabel: about?.industriesLabel ?? "Industri yang Kami Layani",
    industriesHeading: about?.industriesHeading ?? "Pengalaman lintas sektor",
    locationHeading: about?.locationHeading ?? "",
    locationBody: about?.locationBody ?? "",
    locationCtaLabel: about?.locationCtaLabel ?? "Hubungi Kami",
    locationCtaHref: about?.locationCtaHref ?? "/kontak",
    metaTitle: about?.metaTitle ?? "Tentang Kami",
    metaDescription: about?.metaDescription ?? "",
  });

  type FormKey = keyof typeof form;
  const update = (key: FormKey, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  // Inline render-functions (NOT components) — avoids input remount/focus loss.
  const field = (label: string, k: FormKey, placeholder?: string) => (
    <FormField label={label}>
      <input
        type="text"
        value={form[k]}
        onChange={(e) => update(k, e.target.value)}
        className={inputClass}
        placeholder={placeholder}
      />
    </FormField>
  );
  const area = (label: string, k: FormKey, placeholder?: string) => (
    <FormField label={label}>
      <textarea
        value={form[k]}
        onChange={(e) => update(k, e.target.value)}
        className={textareaClass}
        placeholder={placeholder}
      />
    </FormField>
  );

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateAboutPage(form);
      toast.success("Halaman Tentang Kami berhasil disimpan");
      router.refresh();
    } catch {
      toast.error("Gagal menyimpan");
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Halaman Tentang Kami
          </h1>
          <p className="text-sm text-gray-500">
            Kelola seluruh teks di halaman /tentang-kami
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={loading}
          className="flex items-center gap-2 rounded-lg bg-[#3D7EAA] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#2D6890] disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {loading ? "Menyimpan..." : "Simpan"}
        </button>
      </div>

      <div className="space-y-8">
        {/* Hero */}
        <section className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Hero</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {field("Badge / Label kecil", "heroBadge")}
            {field(
              "Judul Hero (kosongkan → pakai Nama Situs)",
              "heroHeading",
              "Technema Solutions"
            )}
            <div className="sm:col-span-2">
              {area(
                "Deskripsi Hero (dipakai juga untuk SEO & schema)",
                "heroDescription"
              )}
            </div>
            {field(
              "Catatan Layanan (chip)",
              "heroServiceNote",
              "Melayani seluruh Indonesia"
            )}
          </div>
        </section>

        {/* Cerita & Visi */}
        <section className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Cerita &amp; Visi
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {field("Label Cerita", "storyLabel")}
            {field("Judul Cerita", "storyHeading")}
            <div className="sm:col-span-2">
              {area(
                "Isi Cerita (pisahkan paragraf dengan baris kosong)",
                "storyBody"
              )}
            </div>
            {field("Label Visi", "visionLabel")}
            {field("Judul Visi (opsional)", "visionHeading")}
            <div className="sm:col-span-2">{area("Isi Visi", "visionBody")}</div>
          </div>
        </section>

        {/* Judul Section */}
        <section className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-1 text-lg font-semibold text-gray-900">
            Judul Section
          </h2>
          <p className="mb-4 text-xs text-gray-400">
            Label &amp; judul untuk section yang datanya diatur di panel lain
            (Layanan, Produk, Industri).
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {field("Label Keahlian", "expertiseLabel")}
            {field("Judul Keahlian", "expertiseHeading")}
            {field("Label Produk", "productsLabel")}
            {field("Judul Produk", "productsHeading")}
            {field("Label Industri", "industriesLabel")}
            {field("Judul Industri", "industriesHeading")}
          </div>
        </section>

        {/* Lokasi */}
        <section className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Lokasi &amp; Area Layanan
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">{field("Judul", "locationHeading")}</div>
            <div className="sm:col-span-2">{area("Isi", "locationBody")}</div>
            {field("Label Tombol CTA", "locationCtaLabel")}
            {field("Link Tombol CTA", "locationCtaHref", "/kontak")}
          </div>
        </section>

        {/* SEO */}
        <section className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">SEO</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {field("Meta Title", "metaTitle")}
            <div className="sm:col-span-2">
              {area(
                "Meta Description (kosongkan → pakai Deskripsi Hero)",
                "metaDescription"
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
