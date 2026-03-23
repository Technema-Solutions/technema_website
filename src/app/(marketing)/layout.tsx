import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieConsentBanner from "@/components/CookieConsent";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import { SITE_NAME, CONTACT_PHONE } from "@/lib/constants";
import {
  getNavigationLinks,
  getMegaMenuProducts,
  getIndustryPages,
  getFooterColumns,
  getSocialLinks,
  getSiteSettings,
} from "@/lib/data";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [navLinks, megaMenuProducts, industryPages, footerColumns, socialLinks, siteSettings] =
    await Promise.all([
      getNavigationLinks(),
      getMegaMenuProducts(),
      getIndustryPages(),
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
        megaMenuIndustries={industryPages.map((i) => ({ name: i.name, icon: i.icon, href: `/industri/${i.slug}`, tagline: i.tagline }))}
        contactPhone={CONTACT_PHONE}
      />
      <main>{children}</main>
      {siteSettings?.gaTrackingId && (
        <GoogleAnalytics gaId={siteSettings.gaTrackingId} />
      )}
      <CookieConsentBanner />
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
