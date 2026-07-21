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

export default function FeaturedSSD({ products }: { products: Product[] }) {
  const ssdProducts = products
    .filter(
      (item) =>
        item.name.toLowerCase().includes("ssd") ||
        item.name.toLowerCase().includes("nvme") ||
        item.name.toLowerCase().includes("sata") ||
        item.name.toLowerCase().includes("m.2") ||
        item.name.toLowerCase().includes("kingston") ||
        item.name.toLowerCase().includes("samsung") ||
        item.name.toLowerCase().includes("wd") ||
        item.name.toLowerCase().includes("western digital"),
    )
    .slice(0, 4);

  return (
    <section className="mx-auto mt-10 max-w-7xl">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-1 rounded bg-red-600" />

          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              SSD Nổi Bật
            </h2>

            <p className="text-gray-500">
              Những ổ cứng SSD tốc độ cao được quan tâm nhiều nhất
            </p>
          </div>
        </div>

        <Link
          href="/products?category=ssd"
          className="rounded-lg border border-red-600 px-5 py-2 font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
        >
          Xem tất cả
        </Link>
      </div>

      {ssdProducts.length === 0 ? (
        <div className="rounded-xl bg-white p-10 text-center shadow">
          <p className="text-gray-500">Chưa có sản phẩm SSD.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ssdProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}