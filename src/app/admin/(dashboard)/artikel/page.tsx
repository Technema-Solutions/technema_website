import { getAdminBlogPosts } from "@/lib/actions/blog";
import ArtikelListClient from "./ArtikelListClient";

export default async function AdminArtikelPage() {
  const posts = await getAdminBlogPosts();
  return <ArtikelListClient posts={posts} />;
}
