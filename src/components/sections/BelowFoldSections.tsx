import dynamic from "next/dynamic";
import ServicesStrip from "@/components/sections/ServicesStrip";
import ClientLogos from "@/components/sections/ClientLogos";
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
} from "@/lib/data";

const ProductShowcase = dynamic(() => import("@/components/sections/ProductShowcase"));
const StatsCounter = dynamic(() => import("@/components/sections/StatsCounter"));
const WhyChooseUs = dynamic(() => import("@/components/sections/WhyChooseUs"));
const WorkingProcess = dynamic(() => import("@/components/sections/WorkingProcess"));
const ProjectsGallery = dynamic(() => import("@/components/sections/ProjectsGallery"));
const FaqGuideSection = dynamic(() => import("@/components/sections/FaqGuideSection"));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));
const AppointmentBooking = dynamic(() => import("@/components/sections/AppointmentBooking"));
const BlogArticles = dynamic(() => import("@/components/sections/BlogArticles"));
const CtaBanner = dynamic(() => import("@/components/sections/CtaBanner"));

interface BelowFoldSectionsProps {
  contactPhone: string;
}

export default async function BelowFoldSections({ contactPhone }: BelowFoldSectionsProps) {
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
  ]);

  return (
    <>
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
      <CtaBanner contactPhone={contactPhone} />
    </>
  );
}
