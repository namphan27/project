"use client";

import { PlusIcon } from "lucide-react";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow transition hover:shadow-lg">
      <img
        src={product.image}
        alt={product.name}
        className="h-60 w-full object-contain p-4"
        onError={(e) => {
          e.currentTarget.src = "/placeholder.png";
        }}
      />

      <div className="p-4">
        <p className="text-xs uppercase text-gray-400">
          NO BRAND
        </p>

        <h2 className="mt-2 text-lg font-semibold">
          {product.name}
        </h2>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-2xl font-bold text-red-600">
            {product.price.toLocaleString("vi-VN")}đ
          </span>

          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white hover:bg-red-700">
            <PlusIcon size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}