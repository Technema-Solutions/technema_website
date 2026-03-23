import { getAdminIndustryPages } from "@/lib/actions/industry-pages";
import IndustryListClient from "./IndustryListClient";

export default async function AdminIndustriPage() {
  const pages = await getAdminIndustryPages();
  return <IndustryListClient pages={pages} />;
}
