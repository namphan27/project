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

export default function FeaturedMainboard({
  products,
}: {
  products: Product[];
}) {
  const mainboardProducts = products
    .filter(
      (item) =>
        item.name.toLowerCase().includes("mainboard") ||
        item.name.toLowerCase().includes("main") ||
        item.name.toLowerCase().includes("b650") ||
        item.name.toLowerCase().includes("b760") ||
        item.name.toLowerCase().includes("z790") ||
        item.name.toLowerCase().includes("asus") ||
        item.name.toLowerCase().includes("gigabyte") ||
        item.name.toLowerCase().includes("msi") ||
        item.name.toLowerCase().includes("asrock"),
    )
    .slice(0, 4);

  return (
    <section className="mx-auto mt-10 max-w-7xl">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-1 rounded bg-red-600" />

          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Mainboard Nổi Bật
            </h2>

            <p className="text-gray-500">
              Những bo mạch chủ được quan tâm nhiều nhất
            </p>
          </div>
        </div>

        <Link
          href="/products?category=mainboard"
          className="rounded-lg border border-red-600 px-5 py-2 font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
        >
          Xem tất cả
        </Link>
      </div>

      {mainboardProducts.length === 0 ? (
        <div className="rounded-xl bg-white p-10 text-center shadow">
          <p className="text-gray-500">Chưa có sản phẩm Mainboard.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {mainboardProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
