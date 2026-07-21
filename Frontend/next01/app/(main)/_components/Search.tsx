"use client";

import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { Product } from "@/app/type/product.type";
import axios from "axios";
import axiosInstance from "../services/axios";

export default function SearchBox() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Product[]>([]);

  const router = useRouter();
  const abortRef = useRef<AbortController | null>(null);

  const handleClick = (id: number) => {
    router.push(`/products/${id}`);
    setQ("");
    setResults([]);
  };

  const searchProducts = async (keyword: string) => {
    try {
      abortRef.current?.abort();

      const controller = new AbortController();
      abortRef.current = controller;

      const res = await axiosInstance.get("/products/search", {
        params: {
          q: keyword,
        },
        signal: controller.signal,
      });

      setResults(Array.isArray(res.data?.data) ? res.data.data : []);
    } catch (error: unknown) {
      if (axios.isCancel(error)) {
        return;
      }

      console.error(error);
      setResults([]);
    }
  };

  useEffect(() => {
    const keyword = q.trim();
    console.log("Input changed, q is:", q);
    if (!keyword) {
      console.log("Keyword rỗng, dừng lại");
      return;
    }

    const timer = setTimeout(() => {
      searchProducts(keyword);
    }, 300);

    return () => clearTimeout(timer);
  }, [q]);

  return (
    <div className="relative w-full max-w-xl">
      <div className="flex">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Tìm sản phẩm..."
          className="w-full rounded-full border bg-white p-2 text-black outline-none"
        />

        <button type="button" className="rounded-r absolute top-3 right-0 cursor-pointer bg-white px-4 text-gray-600">
          <Search size={18} />
        </button>
      </div>

      {results.length > 0 && (
        <div className="absolute left-0 right-0 z-50 mt-1 max-h-60 overflow-auto rounded bg-white text-black shadow-lg">
          {results.map((p) => (
            <div
              key={p.id}
              onClick={() => handleClick(p.id)}
              className="cursor-pointer p-2 hover:bg-gray-100"
            >
              <div className="font-medium">{p.name}</div>

              <div className="text-sm text-red-500">
                {Number(p.price).toLocaleString("vi-VN")}đ
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
