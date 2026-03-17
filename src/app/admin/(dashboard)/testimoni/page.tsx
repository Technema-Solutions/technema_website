import { getAdminTestimonials } from "@/lib/actions/testimonials";
import TestimonialListClient from "./TestimonialListClient";

export default async function AdminTestimonialsPage() {
  const testimonials = await getAdminTestimonials();
  return <TestimonialListClient testimonials={testimonials} />;
}
