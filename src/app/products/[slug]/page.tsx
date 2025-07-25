import { products } from "@/data/products"; // adjust path as needed
import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/products/ProductDetailClient";


interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.id === params.slug);

  if (!product) return notFound();

  return <ProductDetailClient product={product} />
}
