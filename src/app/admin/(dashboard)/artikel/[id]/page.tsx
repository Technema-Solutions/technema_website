import { notFound } from "next/navigation";
import { getAdminBlogPost } from "@/lib/actions/blog";
import ArtikelEditClient from "./ArtikelEditClient";

export default async function EditArtikelPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getAdminBlogPost(id);
  if (!post) notFound();
  return <ArtikelEditClient post={post} />;
}
