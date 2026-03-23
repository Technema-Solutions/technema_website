"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import { toast } from "sonner";
import FormField from "@/components/admin/ui/FormField";
import ImageUpload from "@/components/admin/ui/ImageUpload";
import { updateSiteSettings } from "@/lib/actions/settings";

type SiteSettings = {
  id: string;
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  logo: string;
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
  contactMapEmbed: string;
  heroHeading: string;
  heroSubheading: string;
  heroTypingWords: string[] | unknown;
  heroVideoUrl: string;
  gaTrackingId: string;
  gscSiteUrl: string;
  createdAt: Date;
  updatedAt: Date;
} | null;

const inputClass =
  "w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-[#3D7EAA] focus:outline-none focus:ring-1 focus:ring-[#3D7EAA]";

const textareaClass =
  "w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-[#3D7EAA] focus:outline-none focus:ring-1 focus:ring-[#3D7EAA] min-h-[80px] resize-y";

export default function SettingsClient({
  settings,
}: {
  settings: SiteSettings;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const typingWords = Array.isArray(settings?.heroTypingWords)
    ? (settings.heroTypingWords as string[])
    : [];

  const [form, setForm] = useState({
    siteName: settings?.siteName ?? "Technema Solutions",
    siteDescription: settings?.siteDescription ?? "",
    siteUrl: settings?.siteUrl ?? "",
    logo: settings?.logo ?? "",
    contactEmail: settings?.contactEmail ?? "",
    contactPhone: settings?.contactPhone ?? "",
    contactAddress: settings?.contactAddress ?? "",
    contactMapEmbed: settings?.contactMapEmbed ?? "",
    heroHeading: settings?.heroHeading ?? "",
    heroSubheading: settings?.heroSubheading ?? "",
    heroTypingWords: typingWords.join(", "),
    heroVideoUrl: settings?.heroVideoUrl ?? "",
    gaTrackingId: settings?.gaTrackingId ?? "",
    gscSiteUrl: settings?.gscSiteUrl ?? "",
  });

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const typingWordsArray = form.heroTypingWords
        .split(",")
        .map((w) => w.trim())
        .filter(Boolean);

      await updateSiteSettings({
        siteName: form.siteName,
        siteDescription: form.siteDescription,
        siteUrl: form.siteUrl,
        logo: form.logo,
        contactEmail: form.contactEmail,
        contactPhone: form.contactPhone,
        contactAddress: form.contactAddress,
        contactMapEmbed: form.contactMapEmbed,
        heroHeading: form.heroHeading,
        heroSubheading: form.heroSubheading,
        heroTypingWords: typingWordsArray,
        heroVideoUrl: form.heroVideoUrl,
        gaTrackingId: form.gaTrackingId,
        gscSiteUrl: form.gscSiteUrl,
      });
      toast.success("Pengaturan berhasil disimpan");
      router.refresh();
    } catch {
      toast.error("Gagal menyimpan pengaturan");
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pengaturan Situs</h1>
          <p className="text-sm text-gray-500">
            Kelola pengaturan umum website
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={loading}
          className="flex items-center gap-2 rounded-lg bg-[#3D7EAA] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#2D6890] disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {loading ? "Menyimpan..." : "Simpan Pengaturan"}
        </button>
      </div>

      <div className="space-y-8">
        {/* Informasi Umum */}
        <section className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Informasi Umum
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Nama Situs" required>
              <input
                type="text"
                value={form.siteName}
                onChange={(e) => update("siteName", e.target.value)}
                className={inputClass}
              />
            </FormField>
            <FormField label="URL Situs">
              <input
                type="text"
                value={form.siteUrl}
                onChange={(e) => update("siteUrl", e.target.value)}
                className={inputClass}
                placeholder="https://technema.com"
              />
            </FormField>
            <div className="sm:col-span-2">
              <FormField label="Deskripsi Situs">
                <textarea
                  value={form.siteDescription}
                  onChange={(e) => update("siteDescription", e.target.value)}
                  className={textareaClass}
                  rows={3}
                />
              </FormField>
            </div>
            <FormField label="Logo">
              <ImageUpload
                value={form.logo}
                onChange={(url) => update("logo", url)}
                label="Upload logo situs"
              />
            </FormField>
          </div>
        </section>

        {/* Kontak */}
        <section className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Informasi Kontak
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Email">
              <input
                type="email"
                value={form.contactEmail}
                onChange={(e) => update("contactEmail", e.target.value)}
                className={inputClass}
                placeholder="info@technema.com"
              />
            </FormField>
            <FormField label="Telepon">
              <input
                type="text"
                value={form.contactPhone}
                onChange={(e) => update("contactPhone", e.target.value)}
                className={inputClass}
                placeholder="+62 812 3456 7890"
              />
            </FormField>
            <div className="sm:col-span-2">
              <FormField label="Alamat">
                <textarea
                  value={form.contactAddress}
                  onChange={(e) => update("contactAddress", e.target.value)}
                  className={textareaClass}
                  rows={2}
                />
              </FormField>
            </div>
            <div className="sm:col-span-2">
              <FormField label="Google Maps Embed URL">
                <input
                  type="text"
                  value={form.contactMapEmbed}
                  onChange={(e) => update("contactMapEmbed", e.target.value)}
                  className={inputClass}
                  placeholder="https://www.google.com/maps/embed?..."
                />
              </FormField>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Hero Section
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <FormField label="Judul Hero">
                <input
                  type="text"
                  value={form.heroHeading}
                  onChange={(e) => update("heroHeading", e.target.value)}
                  className={inputClass}
                />
              </FormField>
            </div>
            <div className="sm:col-span-2">
              <FormField label="Subjudul Hero">
                <textarea
                  value={form.heroSubheading}
                  onChange={(e) => update("heroSubheading", e.target.value)}
                  className={textareaClass}
                  rows={2}
                />
              </FormField>
            </div>
            <div className="sm:col-span-2">
              <FormField label="Kata-kata Typing (pisahkan dengan koma)">
                <textarea
                  value={form.heroTypingWords}
                  onChange={(e) => update("heroTypingWords", e.target.value)}
                  className={textareaClass}
                  rows={2}
                  placeholder="Solusi Digital, Website Modern, Aplikasi Bisnis"
                />
              </FormField>
              <p className="mt-1 text-xs text-gray-400">
                Contoh: Solusi Digital, Website Modern, Aplikasi Bisnis
              </p>
            </div>
            <div className="sm:col-span-2">
              <FormField label="Link Video YouTube">
                <input
                  type="text"
                  value={form.heroVideoUrl}
                  onChange={(e) => update("heroVideoUrl", e.target.value)}
                  className={inputClass}
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </FormField>
              <p className="mt-1 text-xs text-gray-400">
                URL video YouTube untuk tombol &quot;Tonton Video&quot; di Hero
              </p>
            </div>
          </div>
        </section>
        {/* Integrasi Analytics */}
        <section className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Integrasi Analytics
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Google Analytics 4 — Measurement ID">
              <input
                type="text"
                value={form.gaTrackingId}
                onChange={(e) => update("gaTrackingId", e.target.value)}
                className={inputClass}
                placeholder="G-XXXXXXXXXX"
              />
            </FormField>
            <FormField label="Google Search Console — Site URL">
              <input
                type="text"
                value={form.gscSiteUrl}
                onChange={(e) => update("gscSiteUrl", e.target.value)}
                className={inputClass}
                placeholder="https://technema.com"
              />
            </FormField>
            <div className="sm:col-span-2">
              <p className="text-xs text-gray-400">
                Masukkan Measurement ID dari Google Analytics 4 (format: G-XXXXXXXXXX) untuk mengaktifkan tracking pengunjung.
                Cookie consent banner akan otomatis ditampilkan kepada pengunjung.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
