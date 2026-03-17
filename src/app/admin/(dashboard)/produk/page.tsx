import { getAdminProducts, toggleProductPublish, deleteProduct } from "@/lib/actions/products";
import ProductListClient from "./ProductListClient";

export default async function AdminProductsPage() {
  const products = await getAdminProducts();
  return <ProductListClient products={products} />;
}
