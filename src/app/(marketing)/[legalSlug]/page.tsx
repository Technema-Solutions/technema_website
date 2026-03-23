import { notFound } from "next/navigation";
import type { Metadata } from "next";
import sanitizeHtml from "sanitize-html";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { getLegalPageBySlug } from "@/lib/data";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

const VALID_SLUGS = ["syarat-ketentuan", "kebijakan-privasi"];

interface PageProps {
  params: Promise<{ legalSlug: string }>;
}

export async function generateStaticParams() {
  return VALID_SLUGS.map((slug) => ({ legalSlug: slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { legalSlug } = await params;
  if (!VALID_SLUGS.includes(legalSlug)) return { title: "Halaman Tidak Ditemukan" };

  const page = await getLegalPageBySlug(legalSlug);
  if (!page) return { title: "Halaman Tidak Ditemukan" };

  return {
    title: `${page.title} — ${SITE_NAME}`,
    description: `${page.title} ${SITE_NAME}. Informasi lengkap tentang ${page.title.toLowerCase()} penggunaan layanan kami.`,
    alternates: { canonical: `${SITE_URL}/${legalSlug}` },
  };
}

export default async function LegalPage({ params }: PageProps) {
  const { legalSlug } = await params;
  if (!VALID_SLUGS.includes(legalSlug)) notFound();

  const page = await getLegalPageBySlug(legalSlug);
  if (!page) notFound();

  const updatedDate = new Date(page.updatedAt).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const cleanBody = sanitizeHtml(page.body, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      "img", "h1", "h2", "h3", "figure", "figcaption",
    ]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["src", "alt", "width", "height", "class", "loading"],
      "*": ["id", "class", "style"],
    },
  });

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Beranda", url: SITE_URL },
          { name: page.title, url: `${SITE_URL}/${legalSlug}` },
        ]}
      />

      {/* Hero Banner */}
      <section className="relative bg-dark overflow-hidden pt-28 sm:pt-32 lg:pt-36 pb-14 sm:pb-16 lg:pb-20">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full border border-white" />
          <div className="absolute bottom-10 right-20 w-96 h-96 rounded-full border border-white" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-dashed border-white" />
        </div>

        <Container>
          <div className="relative z-10 max-w-3xl">
            <Breadcrumb
              items={[
                { label: "Beranda", href: "/" },
                { label: page.title },
              ]}
              variant="dark"
            />
            <h1 className="font-heading text-[32px] sm:text-[40px] lg:text-[48px] font-bold text-white leading-[1.15] mt-6 mb-4">
              {page.title}
            </h1>
            <p className="text-white/50 text-[15px]">
              Terakhir diperbarui: {updatedDate}
            </p>
          </div>
        </Container>
      </section>

      {/* Content */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <Container>
          <div className="max-w-3xl mx-auto">
            <article>
              <div
                dangerouslySetInnerHTML={{ __html: cleanBody }}
                className={
                  "legal-body " +
                  "[&_h2]:font-heading [&_h2]:text-[22px] sm:[&_h2]:text-[26px] [&_h2]:font-bold [&_h2]:text-dark [&_h2]:leading-[1.35] [&_h2]:mb-4 [&_h2]:mt-10 [&_h2]:pt-6 [&_h2]:border-t [&_h2]:border-gray-100 first:[&_h2]:mt-0 first:[&_h2]:pt-0 first:[&_h2]:border-0 " +
                  "[&_h3]:font-heading [&_h3]:text-[18px] sm:[&_h3]:text-[20px] [&_h3]:font-semibold [&_h3]:text-dark [&_h3]:leading-[1.4] [&_h3]:mb-3 [&_h3]:mt-6 " +
                  "[&_p]:text-[16px] [&_p]:text-text-gray [&_p]:leading-[1.8] [&_p]:mb-4 " +
                  "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:text-text-gray [&_ul]:leading-[1.8] " +
                  "[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol]:text-text-gray [&_ol]:leading-[1.8] " +
                  "[&_li]:mb-1 " +
                  "[&_a]:text-brand [&_a]:underline [&_a]:hover:text-brand-light " +
                  "[&_strong]:text-dark [&_strong]:font-semibold"
                }
              />
            </article>

            {/* Back to home */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <a
                href="/"
                className="inline-flex items-center gap-2 text-brand text-[14px] font-semibold hover:text-[#2D6890] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5" />
                  <path d="m12 19-7-7 7-7" />
                </svg>
                Kembali ke Beranda
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
