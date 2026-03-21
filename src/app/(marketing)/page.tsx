import HeroSection from "@/components/sections/HeroSection";
import ServicesStrip from "@/components/sections/ServicesStrip";
import ClientLogos from "@/components/sections/ClientLogos";
import StatsCounter from "@/components/sections/StatsCounter";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import ProductShowcase from "@/components/sections/ProductShowcase";
import WorkingProcess from "@/components/sections/WorkingProcess";
import ProjectsGallery from "@/components/sections/ProjectsGallery";
import FaqGuideSection from "@/components/sections/FaqGuideSection";
import Testimonials from "@/components/sections/Testimonials";
import AppointmentBooking from "@/components/sections/AppointmentBooking";
import BlogArticles from "@/components/sections/BlogArticles";
import CtaBanner from "@/components/sections/CtaBanner";
import {
  getServices,
  getClients,
  getProducts,
  getStats,
  getWhyChooseItems,
  getProcessSteps,
  getProjects,
  getFaqItems,
  getTestimonials,
  getBlogPosts,
  getSiteSettings,
} from "@/lib/data";

export default async function Home() {
  const [
    services,
    clients,
    products,
    stats,
    whyChooseItems,
    processSteps,
    projects,
    faqItems,
    testimonials,
    blogPosts,
    siteSettings,
  ] = await Promise.all([
    getServices(),
    getClients(),
    getProducts(),
    getStats(),
    getWhyChooseItems(),
    getProcessSteps(),
    getProjects(),
    getFaqItems(),
    getTestimonials(),
    getBlogPosts(),
    getSiteSettings(),
  ]);

  return (
    <>
      <HeroSection
        heading={siteSettings?.heroHeading || undefined}
        subheading={siteSettings?.heroSubheading || undefined}
        typingWords={
          Array.isArray(siteSettings?.heroTypingWords) && (siteSettings.heroTypingWords as string[]).length > 0
            ? (siteSettings.heroTypingWords as string[])
            : undefined
        }
        heroVideoUrl={siteSettings?.heroVideoUrl || undefined}
      />
      <ServicesStrip services={services} />
      <ClientLogos clients={clients} />
      <ProductShowcase products={products} />
      <StatsCounter stats={stats} />
      <WhyChooseUs whyChooseItems={whyChooseItems} />
      <WorkingProcess processSteps={processSteps} />
      <ProjectsGallery projects={projects} />
      <FaqGuideSection faqItems={faqItems} />
      <Testimonials testimonials={testimonials} />
      <AppointmentBooking />
      <BlogArticles blogPosts={blogPosts} />
      <CtaBanner />
    </>
  );
}
