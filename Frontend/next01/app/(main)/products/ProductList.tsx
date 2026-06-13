"use client";

import Image from "next/image";
import { PlusIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import { setCart } from "@/app/store/features/cartSlice";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export default function ProductList({ products }: { products: Product[] }) {
  const dispatch = useDispatch();
  const getImageUrl = (image?: string) => {
    if (!image || image.trim() === "") return "/placeholder.png";

    if (image.startsWith("http")) return image;

    const baseUrl =
      process.env.NEXT_PUBLIC_SERVER_API || "http://localhost:3000";

    return `${baseUrl}/${image.replace(/^\/+/, "")}`;
  };
  const handleAddToCart = async (product: Product) => {
    // const token = localStorage.getItem("accessToken");
    const token = Cookies.get("accessToken");
    if (!token) {
      toast.error("Bạn chưa đăng nhập!");
      return;
    }

    const loadingToast = toast.loading("Đang thêm vào giỏ hàng...");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
        }),
      });

      if (!res.ok) {
        toast.dismiss(loadingToast);
        if (res.status === 401) {
          toast.error("Phiên đăng nhập hết hạn! Vui lòng F5 và đăng nhập lại.");
        } else {
          toast.error("Thêm thất bại! Vui lòng kiểm tra lại.");
        }
        return;
      }

      const data = await res.json();
      toast.dismiss(loadingToast);

      const updatedItems =
        data.items ||
        data.data?.items ||
        data.cart?.items ||
        (Array.isArray(data) ? data : []);

      dispatch(setCart(updatedItems));

      toast.success(`Đã thêm thành công "${product.name}" vào giỏ!`);
    } catch (err) {
      console.error(err);
      toast.dismiss(loadingToast);
      toast.error("Lỗi kết nối mạng!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="mb-6 text-3xl font-bold text-black">Product List</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="overflow-hidden rounded-xl bg-white shadow"
          >
            <img
              src={product.image}
              alt={product.name}
              width={400}
              height={300}
            />

            <div className="p-4">
              <p className="text-xs uppercase text-gray-400">NO BRAND</p>

              <h2 className="mt-2 text-lg font-semibold text-black">
                {product.name}
              </h2>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-2xl font-bold text-red-500">
                  {product.price.toLocaleString("vi-VN")}đ
                </span>

                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition"
                >
                  <PlusIcon />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
