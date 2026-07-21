"use client";

import Link from "next/link";
import ProductCard from "./ProductCard";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export default function FeaturedVGA({ products }: { products: Product[] }) {
  const vgaProducts = products
    .filter(
      (item) =>
        item.name.toLowerCase().includes("rtx") ||
        item.name.toLowerCase().includes("gtx") ||
        item.name.toLowerCase().includes("radeon") ||
        item.name.toLowerCase().includes("rx"),
    )
    .slice(0, 4);

  return (
    <section className="mx-auto mt-10 max-w-7xl">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-1 rounded bg-red-600" />

          <div>
            <h2 className="text-3xl font-bold text-gray-900">VGA Nổi Bật</h2>

            <p className="text-gray-500">
              Những card đồ họa được quan tâm nhiều nhất
            </p>
          </div>
        </div>

        <Link
          href="/products?category=vga"
          className="rounded-lg border border-red-600 px-5 py-2 font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
        >
          Xem tất cả
        </Link>
      </div>

      {vgaProducts.length === 0 ? (
        <div className="rounded-xl bg-white p-10 text-center shadow">
          <p className="text-gray-500">Chưa có sản phẩm VGA.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {vgaProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
