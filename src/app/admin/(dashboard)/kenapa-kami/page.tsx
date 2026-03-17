import { getAdminWhyChooseItems } from "@/lib/actions/whyChooseUs";
import WhyChooseListClient from "./WhyChooseListClient";

export default async function AdminWhyChoosePage() {
  const items = await getAdminWhyChooseItems();
  return <WhyChooseListClient items={items} />;
}
