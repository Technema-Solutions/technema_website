import { getAdminFaqItems } from "@/lib/actions/faq";
import FaqListClient from "./FaqListClient";

export default async function AdminFaqPage() {
  const faqItems = await getAdminFaqItems();
  return <FaqListClient faqItems={faqItems} />;
}
