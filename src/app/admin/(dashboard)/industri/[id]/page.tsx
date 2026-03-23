import { notFound } from "next/navigation";
import { getAdminIndustryPage } from "@/lib/actions/industry-pages";
import IndustryEditClient from "./IndustryEditClient";

export default async function EditIndustryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const page = await getAdminIndustryPage(id);
  if (!page) notFound();
  return <IndustryEditClient page={page} />;
}
