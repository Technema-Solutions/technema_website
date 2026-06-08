import {
  getSiteSettings,
  getProducts,
  getServices,
  getBlogPosts,
  getIndustryPages,
} from "@/lib/data";
import { SITE_URL, SITE_NAME, COMPANY_LEGAL_NAME } from "@/lib/constants";

// Regenerate at most once per day.
export const revalidate = 86400;

/**
 * /llms.txt — a curated, machine-readable map of the site for AI agents &
 * assistants (the "agentic web"). Follows the llms.txt convention:
 * H1 title → blockquote summary → sectioned lists of links with descriptions.
 */
export async function GET() {
  const [settings, products, services, posts, industries] = await Promise.all([
    getSiteSettings(),
    getProducts(),
    getServices(),
    getBlogPosts(),
    getIndustryPages(),
  ]);

  const base = (settings?.siteUrl || SITE_URL).replace(/\/$/, "");
  const name = settings?.siteName || SITE_NAME;
  const legalName = settings?.legalName || COMPANY_LEGAL_NAME;
  const description =
    settings?.siteDescription ||
    "Perusahaan teknologi informasi yang menyediakan pengembangan aplikasi web & mobile, integrasi AI, ERP Odoo, integrasi data, dan konsultasi transformasi digital.";

  const locality = settings?.addressLocality || "Kabupaten Berau";
  const region = settings?.addressRegion || "Kalimantan Timur";

  const lines: string[] = [];

  // ── Title + summary ──
  lines.push(`# ${name} (${legalName})`);
  lines.push("");
  lines.push(
    `> ${description} Berbasis di ${locality}, ${region}, Indonesia.`
  );
  lines.push("");

  // ── Products ──
  if (products.length) {
    lines.push("## Produk Unggulan");
    for (const p of products) {
      const tagline = p.tagline ? ` — ${p.tagline}` : "";
      lines.push(`- [${p.name}](${base}/produk/${p.slug})${tagline}`);
    }
    lines.push("");
  }

  // ── Services ──
  if (services.length) {
    lines.push("## Layanan");
    for (const s of services) {
      lines.push(`- ${s.title}`);
    }
    lines.push("");
  }

  // ── Industries ──
  if (industries.length) {
    lines.push("## Solusi per Industri");
    for (const i of industries) {
      const tagline = i.tagline ? ` — ${i.tagline}` : "";
      lines.push(`- [${i.name}](${base}/industri/${i.slug})${tagline}`);
    }
    lines.push("");
  }

  // ── Articles (most recent first) ──
  if (posts.length) {
    lines.push("## Artikel & Panduan");
    for (const post of posts.slice(0, 25)) {
      lines.push(`- [${post.title}](${base}/artikel/${post.slug})`);
    }
    lines.push("");
  }

  // ── Key pages ──
  lines.push("## Halaman Penting");
  lines.push(`- [Tentang Kami](${base}/tentang-kami)`);
  lines.push(`- [Kontak](${base}/kontak)`);
  lines.push(`- [Semua Artikel](${base}/artikel)`);
  lines.push("");

  // ── Contact ──
  lines.push("## Kontak");
  lines.push(`- Website: ${base}`);
  if (settings?.contactPhone) lines.push(`- Telepon: ${settings.contactPhone}`);
  if (settings?.contactEmail) lines.push(`- Email: ${settings.contactEmail}`);
  if (settings?.contactAddress)
    lines.push(`- Alamat: ${settings.contactAddress}`);
  lines.push("");

  const body = lines.join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400",
    },
  });
}
