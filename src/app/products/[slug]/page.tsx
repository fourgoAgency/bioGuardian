import { products } from "@/data/products";
import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/products/ProductDetailClient";

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.id,
  }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // ✅ await before using params.slug
  const product = products.find((p) => p.id === slug);

  if (!product) return notFound();
  return <ProductDetailClient product={product} />;
}


