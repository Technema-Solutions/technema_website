import { notFound } from "next/navigation";
import { getAdminProduct } from "@/lib/actions/products";
import ProductEditClient from "./ProductEditClient";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getAdminProduct(id);
  if (!product) notFound();
  return <ProductEditClient product={product} />;
}
