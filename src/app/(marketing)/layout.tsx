import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import { SITE_NAME, CONTACT_PHONE } from "@/lib/constants";
import {
  getNavigationLinks,
  getMegaMenuProducts,
  getIndustries,
  getFooterColumns,
  getSocialLinks,
  getSiteSettings,
} from "@/lib/data";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [navLinks, megaMenuProducts, industries, footerColumns, socialLinks, siteSettings] =
    await Promise.all([
      getNavigationLinks(),
      getMegaMenuProducts(),
      getIndustries(),
      getFooterColumns(),
      getSocialLinks(),
      getSiteSettings(),
    ]);

  const companyTagline =
    siteSettings?.siteDescription ??
    "Menghadirkan solusi TI inovatif yang memberdayakan bisnis untuk berkembang di era digital.";

  return (
    <>
      <OrganizationJsonLd />
      <Navbar
        navLinks={navLinks.map((l) => ({ label: l.label, href: l.href, megaMenu: l.megaMenu }))}
        megaMenuProducts={megaMenuProducts}
        megaMenuIndustries={industries.map((i) => ({ name: i.name, icon: i.icon, href: i.href }))}
        contactPhone={CONTACT_PHONE}
      />
      <main>{children}</main>
      <Footer
        siteName={siteSettings?.siteName ?? SITE_NAME}
        companyTagline={companyTagline}
        footerColumns={footerColumns.map((c) => ({
          id: c.id,
          title: c.title,
          links: c.links.map((l) => ({ id: l.id, label: l.label, href: l.href })),
        }))}
        socialLinks={socialLinks.map((s) => ({
          id: s.id,
          platform: s.platform,
          href: s.href,
          icon: s.icon,
        }))}
      />
    </>
  );
}
