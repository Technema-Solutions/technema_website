import { notFound } from "next/navigation";
import { getLegalPageById } from "@/lib/actions/legal";
import LegalEditClient from "./LegalEditClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function LegalEditPage({ params }: PageProps) {
  const { id } = await params;
  const page = await getLegalPageById(id);
  if (!page) notFound();

  return <LegalEditClient page={page} />;
}
