export const dynamic = "force-dynamic";

import {
  BarChart3,
  Users,
  Eye,
  MousePointerClick,
  Timer,
  TrendingUp,
  Search,
  Gauge,
  ArrowUpRight,
  UserPlus,
  Activity,
} from "lucide-react";
import { isAnalyticsConfigured } from "@/lib/analytics/google-auth";
import { getOverviewStats, getDailyVisitors, getTopPages, getDeviceBreakdown } from "@/lib/analytics/ga4";
import { getSearchPerformance, getTopQueries, getTopSearchPages } from "@/lib/analytics/search-console";
import { getCoreWebVitals } from "@/lib/analytics/pagespeed";
import { getSiteSettings } from "@/lib/data";
import VisitorChart from "@/components/admin/analytics/VisitorChart";
import DeviceChart from "@/components/admin/analytics/DeviceChart";
import TopPagesChart from "@/components/admin/analytics/TopPagesChart";
import WebVitalsGauge from "@/components/admin/analytics/WebVitalsGauge";
import { QueryTable, PageTable } from "@/components/admin/analytics/SearchTable";

function GuideSection({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <div className="flex items-start gap-3 mb-4">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#3D7EAA] text-sm font-bold text-white">
          {number}
        </span>
        <h3 className="text-base font-bold text-gray-900 pt-0.5">{title}</h3>
      </div>
      <div className="ml-11 space-y-3 text-sm text-gray-600 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

function StepItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#3D7EAA]" />
      <div>{children}</div>
    </div>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="mt-2 mb-1 rounded-lg bg-gray-900 p-4 text-xs text-gray-200 overflow-x-auto">
      {children}
    </pre>
  );
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-xs text-blue-800">
      <strong>Tip:</strong> {children}
    </div>
  );
}

function Warning({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-800">
      <strong>Peringatan:</strong> {children}
    </div>
  );
}

function SetupGuide() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100">
            <BarChart3 className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              Konfigurasi Analytics Diperlukan
            </h2>
            <p className="text-sm text-gray-600">
              Ikuti 6 langkah di bawah ini untuk mengaktifkan SEO Analytics dashboard. Langkah ini dilakukan <strong>setelah website sudah di-hosting</strong> dengan domain aktif.
            </p>
          </div>
        </div>
      </div>

      {/* Step 1: GA4 */}
      <GuideSection number="1" title="Buat Akun Google Analytics 4 (GA4)">
        <StepItem>
          Buka{" "}
          <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer" className="text-[#3D7EAA] underline">
            analytics.google.com
          </a>
          {" "}dan login dengan akun Google Anda
        </StepItem>
        <StepItem>
          Klik tombol <strong>&quot;Start measuring&quot;</strong> atau <strong>&quot;Mulai mengukur&quot;</strong>
        </StepItem>
        <StepItem>
          <strong>Buat Account</strong> — isi Account name: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">Technema Solutions</code>, lalu klik Next
        </StepItem>
        <StepItem>
          <strong>Buat Property</strong> — isi Property name: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">Technema Website</code>,
          pilih Timezone: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">(GMT+07:00) Jakarta</code>,
          Currency: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">Indonesian Rupiah (IDR)</code>, lalu klik Next
        </StepItem>
        <StepItem>
          <strong>Business Details</strong> — pilih Industry: Technology, Business size: sesuai perusahaan. Klik Next
        </StepItem>
        <StepItem>
          <strong>Business Objectives</strong> — centang &quot;Generate leads&quot; dan &quot;Get baseline reports&quot;, klik Create
        </StepItem>
        <StepItem>
          Terima Terms of Service (pilih negara: Indonesia, centang, lalu klik I Accept)
        </StepItem>
        <StepItem>
          <strong>Buat Data Stream</strong> — pilih platform <strong>Web</strong>, isi Website URL: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">https://domain-anda.com</code>,
          Stream name: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">Technema Web Stream</code>, pastikan Enhanced measurement ON, lalu klik Create stream
        </StepItem>
        <StepItem>
          Setelah stream dibuat, Anda akan melihat <strong>Measurement ID</strong> dengan format <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">G-XXXXXXXXXX</code>.
          <strong> Salin dan simpan ID ini</strong> — akan dimasukkan di CMS Pengaturan nanti
        </StepItem>
        <Tip>
          Measurement ID (G-XXXXXXXXXX) untuk tracking di website. Property ID (angka numerik) untuk akses data via API. Keduanya berbeda — Anda butuh keduanya.
        </Tip>
        <StepItem>
          <strong>Cari Property ID</strong> — klik ikon gear (Admin) di kiri bawah, lalu klik <strong>&quot;Property details&quot;</strong>.
          Catat angka <strong>Property ID</strong> (contoh: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">123456789</code>). Atau lihat angka setelah <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">/p</code> di URL browser saat di halaman Analytics.
        </StepItem>
      </GuideSection>

      {/* Step 2: Search Console */}
      <GuideSection number="2" title="Setup Google Search Console">
        <StepItem>
          Buka{" "}
          <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer" className="text-[#3D7EAA] underline">
            search.google.com/search-console
          </a>
          {" "}dan login dengan akun Google yang sama
        </StepItem>
        <StepItem>
          Pilih metode <strong>&quot;URL prefix&quot;</strong> (lebih mudah untuk pemula), masukkan URL lengkap website:
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">https://domain-anda.com</code>, klik Continue
        </StepItem>
        <StepItem>
          <strong>Verifikasi kepemilikan</strong> — ada beberapa metode:
        </StepItem>
        <div className="ml-4 space-y-2">
          <StepItem>
            <strong>HTML Tag (paling mudah)</strong> — salin meta tag yang diberikan, pasang di metadata Next.js layout.tsx, deploy, lalu klik Verify
          </StepItem>
          <StepItem>
            <strong>Google Analytics</strong> — jika GA4 sudah terpasang di website, bisa langsung klik Verify
          </StepItem>
          <StepItem>
            <strong>DNS Record</strong> — tambahkan TXT record yang diberikan Google di panel DNS domain Anda (Cloudflare, Niagahoster, dll), tunggu propagasi, lalu Verify
          </StepItem>
        </div>
        <StepItem>
          Setelah verifikasi berhasil (centang hijau), klik <strong>&quot;Go to property&quot;</strong>
        </StepItem>
        <StepItem>
          <strong>(Opsional)</strong> Submit sitemap: di sidebar kiri klik <strong>Sitemaps</strong>, masukkan <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">sitemap.xml</code>, klik Submit
        </StepItem>
        <Tip>
          Google memerlukan beberapa hari untuk mulai mengumpulkan data setelah verifikasi.
        </Tip>
      </GuideSection>

      {/* Step 3: Google Cloud */}
      <GuideSection number="3" title="Buat Project di Google Cloud Console">
        <StepItem>
          Buka{" "}
          <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer" className="text-[#3D7EAA] underline">
            console.cloud.google.com
          </a>
          {" "}dan login dengan akun Google yang sama. Terima Terms of Service jika pertama kali
        </StepItem>
        <StepItem>
          <strong>Buat Project baru</strong> — klik dropdown project di atas halaman, klik <strong>&quot;New Project&quot;</strong>,
          isi nama: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">Technema Website</code>, klik Create. Setelah dibuat, pilih project tersebut
        </StepItem>
        <StepItem>
          <strong>Aktifkan 3 API</strong> — buka sidebar <strong>APIs &amp; Services → Library</strong>, cari dan klik <strong>Enable</strong> untuk masing-masing:
        </StepItem>
        <div className="ml-4 space-y-1">
          <StepItem><strong>Google Analytics Data API</strong> (bukan &quot;Reporting API&quot; yang lama)</StepItem>
          <StepItem><strong>Google Search Console API</strong></StepItem>
          <StepItem><strong>PageSpeed Insights API</strong></StepItem>
        </div>
        <Tip>
          Verifikasi di <strong>APIs &amp; Services → Enabled APIs</strong> bahwa ketiga API sudah muncul di daftar.
        </Tip>
      </GuideSection>

      {/* Step 4: Service Account */}
      <GuideSection number="4" title="Buat Service Account & Download Key">
        <StepItem>
          Di Google Cloud Console, buka sidebar <strong>IAM &amp; Admin → Service Accounts</strong>
        </StepItem>
        <StepItem>
          Klik <strong>&quot;+ Create Service Account&quot;</strong>
        </StepItem>
        <StepItem>
          <strong>Step 1:</strong> Isi nama: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">technema-analytics</code>.
          ID otomatis terisi (contoh: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">technema-analytics@project-id.iam.gserviceaccount.com</code>). Klik <strong>Create and Continue</strong>
        </StepItem>
        <StepItem>
          <strong>Step 2:</strong> Di dropdown role, pilih <strong>Viewer</strong> (kategori Basic). Klik Continue
        </StepItem>
        <StepItem>
          <strong>Step 3:</strong> Langsung klik <strong>Done</strong>
        </StepItem>
        <StepItem>
          <strong>Catat email Service Account</strong> yang baru dibuat (format: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">nama@project-id.iam.gserviceaccount.com</code>)
        </StepItem>
        <StepItem>
          <strong>Download JSON Key</strong> — klik nama service account → tab <strong>Keys</strong> → <strong>Add Key → Create new key</strong> → pilih <strong>JSON</strong> → klik Create. File JSON akan terdownload otomatis
        </StepItem>
        <Warning>
          File JSON ini berisi kredensial rahasia. JANGAN commit ke Git, upload ke tempat publik, atau share ke orang lain. Simpan di tempat aman.
        </Warning>
      </GuideSection>

      {/* Step 5: Connect Service Account */}
      <GuideSection number="5" title="Hubungkan Service Account ke GA4 & Search Console">
        <p className="font-semibold text-gray-800">Di Google Analytics 4:</p>
        <StepItem>
          Buka{" "}
          <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer" className="text-[#3D7EAA] underline">
            analytics.google.com
          </a>
          {" "}→ klik ikon gear (Admin) di kiri bawah
        </StepItem>
        <StepItem>
          Di bagian Property, klik <strong>&quot;Property access management&quot;</strong>
        </StepItem>
        <StepItem>
          Klik tombol <strong>&quot;+&quot;</strong> → <strong>&quot;Add users&quot;</strong> → masukkan email Service Account →
          pilih role: <strong>Viewer</strong> → hapus centang &quot;Notify new users by email&quot; → klik <strong>Add</strong>
        </StepItem>

        <p className="font-semibold text-gray-800 mt-4">Di Google Search Console:</p>
        <StepItem>
          Buka{" "}
          <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer" className="text-[#3D7EAA] underline">
            search.google.com/search-console
          </a>
          {" "}→ klik <strong>Settings</strong> di sidebar → <strong>&quot;Users and permissions&quot;</strong>
        </StepItem>
        <StepItem>
          Klik <strong>&quot;Add user&quot;</strong> → masukkan email Service Account → pilih permission: <strong>Full</strong> → klik Add
        </StepItem>
      </GuideSection>

      {/* Step 6: Environment Variables */}
      <GuideSection number="6" title="Pasang Environment Variables & CMS">
        <StepItem>
          Buka file JSON key yang sudah didownload. Di dalamnya terdapat field <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">client_email</code> dan <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">private_key</code>
        </StepItem>
        <StepItem>
          Tambahkan environment variables berikut di server hosting (atau file <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">.env</code> untuk lokal):
        </StepItem>
        <CodeBlock>
{`# Dari file JSON key
GOOGLE_SERVICE_ACCOUNT_EMAIL=technema-analytics@project-id.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\nISI_KEY_DISINI\\n-----END PRIVATE KEY-----\\n"

# Dari GA4 Admin > Property Details (angka numerik)
GA4_PROPERTY_ID=properties/123456789

# Opsional — untuk PageSpeed Insights
PAGESPEED_API_KEY=AIzaSy...`}
        </CodeBlock>
        <StepItem>
          Buka halaman{" "}
          <a href="/admin/pengaturan" className="text-[#3D7EAA] underline font-medium">
            CMS Pengaturan
          </a>
          , isi:
        </StepItem>
        <div className="ml-4 space-y-1">
          <StepItem><strong>GA4 Measurement ID</strong>: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">G-XXXXXXXXXX</code> (dari GA4 → Data Streams)</StepItem>
          <StepItem><strong>Google Search Console Site URL</strong>: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">https://domain-anda.com</code></StepItem>
        </div>
        <StepItem>
          Klik <strong>Simpan Pengaturan</strong>, lalu kembali ke halaman Analitik ini — data akan mulai muncul
        </StepItem>
        <Tip>
          Google memerlukan 24-48 jam setelah GA4 terpasang untuk mulai menampilkan data. Search Console memerlukan beberapa hari.
        </Tip>
      </GuideSection>

      {/* Checklist */}
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
        <h3 className="text-sm font-bold text-gray-900 mb-3">Checklist Akhir</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-600">
          {[
            "GA4 account & property sudah dibuat",
            "Measurement ID (G-XXXXXXXXXX) sudah dicatat",
            "Property ID (angka numerik) sudah dicatat",
            "Google Search Console sudah terverifikasi",
            "Google Cloud project sudah dibuat",
            "3 API sudah di-enable (Analytics Data, Search Console, PageSpeed)",
            "Service Account sudah dibuat",
            "JSON key sudah didownload & disimpan aman",
            "Service Account ditambahkan sebagai Viewer di GA4",
            "Service Account ditambahkan sebagai Full user di Search Console",
            "Environment variables sudah dipasang di server",
            "GA4 Measurement ID & Site URL sudah diisi di CMS Pengaturan",
          ].map((item) => (
            <label key={item} className="flex items-start gap-2 cursor-default">
              <span className="mt-0.5 h-4 w-4 shrink-0 rounded border border-gray-300 bg-white" />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color, suffix }: {
  label: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
  suffix?: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500">{label}</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">
            {typeof value === "number" ? value.toLocaleString("id-ID") : value}
            {suffix && <span className="text-sm font-normal text-gray-500 ml-1">{suffix}</span>}
          </p>
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${color}`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
      </div>
    </div>
  );
}

export default async function AnalyticsPage() {
  const configured = isAnalyticsConfigured();
  const settings = await getSiteSettings();
  const siteUrl = settings?.gscSiteUrl || settings?.siteUrl || "";

  // Fetch all data in parallel (gracefully returns null/empty if not configured)
  const [overview, dailyVisitors, topPages, devices, searchPerf, topQueries, topSearchPages, webVitals] =
    await Promise.all([
      configured ? getOverviewStats() : null,
      configured ? getDailyVisitors() : [],
      configured ? getTopPages() : [],
      configured ? getDeviceBreakdown() : [],
      configured && siteUrl ? getSearchPerformance(siteUrl) : null,
      configured && siteUrl ? getTopQueries(siteUrl) : [],
      configured && siteUrl ? getTopSearchPages(siteUrl) : [],
      siteUrl ? getCoreWebVitals(siteUrl) : null,
    ]);

  const hasGA4Data = overview !== null;
  const hasSearchData = searchPerf !== null;
  const hasWebVitals = webVitals !== null;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">SEO Analytics</h1>
        <p className="text-sm text-gray-500">
          Performa website 30 hari terakhir
        </p>
      </div>

      {!configured && <SetupGuide />}

      {configured && (
        <div className="space-y-8">
          {/* GA4 Overview Cards */}
          <div>
            <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-700 uppercase tracking-wider">
              <TrendingUp className="h-4 w-4" /> Traffic Overview
            </h2>
            {hasGA4Data ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
                <StatCard
                  label="Pengunjung"
                  value={overview.activeUsers}
                  icon={Users}
                  color="bg-blue-500"
                />
                <StatCard
                  label="Sesi"
                  value={overview.sessions}
                  icon={Activity}
                  color="bg-indigo-500"
                />
                <StatCard
                  label="Halaman Dilihat"
                  value={overview.pageViews}
                  icon={Eye}
                  color="bg-cyan-500"
                />
                <StatCard
                  label="Rasio Pentalan"
                  value={`${(overview.bounceRate * 100).toFixed(1)}%`}
                  icon={ArrowUpRight}
                  color="bg-amber-500"
                />
                <StatCard
                  label="Durasi Rata-rata"
                  value={`${Math.floor(overview.avgSessionDuration / 60)}m ${Math.floor(overview.avgSessionDuration % 60)}s`}
                  icon={Timer}
                  color="bg-purple-500"
                />
                <StatCard
                  label="Pengguna Baru"
                  value={overview.newUsers}
                  icon={UserPlus}
                  color="bg-emerald-500"
                />
              </div>
            ) : (
              <p className="text-sm text-gray-400 italic">
                Belum ada data GA4. Pastikan GA4 sudah dikonfigurasi dan sudah mengumpulkan data.
              </p>
            )}
          </div>

          {/* Charts */}
          {hasGA4Data && (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <VisitorChart data={dailyVisitors} />
              </div>
              <DeviceChart data={devices} />
            </div>
          )}

          {hasGA4Data && topPages.length > 0 && (
            <TopPagesChart data={topPages} />
          )}

          {/* Search Console */}
          <div>
            <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-700 uppercase tracking-wider">
              <Search className="h-4 w-4" /> Google Search Performance
            </h2>
            {hasSearchData ? (
              <>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-6">
                  <StatCard
                    label="Total Klik"
                    value={searchPerf.clicks}
                    icon={MousePointerClick}
                    color="bg-blue-500"
                  />
                  <StatCard
                    label="Total Impressi"
                    value={searchPerf.impressions}
                    icon={Eye}
                    color="bg-indigo-500"
                  />
                  <StatCard
                    label="CTR Rata-rata"
                    value={`${(searchPerf.ctr * 100).toFixed(1)}%`}
                    icon={TrendingUp}
                    color="bg-emerald-500"
                  />
                  <StatCard
                    label="Posisi Rata-rata"
                    value={searchPerf.position.toFixed(1)}
                    icon={BarChart3}
                    color="bg-amber-500"
                  />
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <QueryTable data={topQueries} />
                  <PageTable data={topSearchPages} />
                </div>
              </>
            ) : (
              <p className="text-sm text-gray-400 italic">
                Belum ada data Search Console. Pastikan Site URL sudah diatur di{" "}
                <a href="/admin/pengaturan" className="text-[#3D7EAA] underline">Pengaturan</a>
                {" "}dan Service Account memiliki akses.
              </p>
            )}
          </div>

          {/* Core Web Vitals */}
          <div>
            <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-700 uppercase tracking-wider">
              <Gauge className="h-4 w-4" /> Core Web Vitals
            </h2>
            {hasWebVitals ? (
              <WebVitalsGauge data={webVitals} />
            ) : (
              <p className="text-sm text-gray-400 italic">
                {siteUrl
                  ? "Tidak dapat mengambil data PageSpeed Insights. Coba lagi nanti."
                  : "Masukkan Site URL di Pengaturan untuk melihat Core Web Vitals."}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
