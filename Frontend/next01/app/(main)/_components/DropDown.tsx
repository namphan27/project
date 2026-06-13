"use client";

import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { removeFromCart, setCart } from "@/app/store/features/cartSlice";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
type ExtendedCartItem = {
  id: number;
  quantity: number;
  product?: {
    name: string;
    price: number;
    image: string;
  };
};

export default function CartDropdown({ onClose }: { onClose: () => void }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalQty = cartItems
    ? cartItems.reduce((sum, item) => sum + item.quantity, 0)
    : 0;

  const totalPrice = cartItems
    ? cartItems.reduce((sum, item) => {
        const extendedItem = item as ExtendedCartItem;
        const price = extendedItem.product?.price || 0;
        return sum + price * extendedItem.quantity;
      }, 0)
    : 0;
  const handleRemove = async (id: number) => {
  const token = Cookies.get("accessToken");
  if (!token) return;

  // 1. Cập nhật UI ngay lập tức (Optimistic Update)
  dispatch(removeFromCart(id)); 
  toast.success("Đã xóa sản phẩm");

  // 2. Gọi API để xóa ở Backend
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API}/cart/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      // Nếu xóa server lỗi, cần báo cho người dùng và có thể load lại giỏ hàng
      throw new Error("Không thể xóa trên server");
    }
  } catch (err) {
    toast.error("Lỗi khi xóa trên server, vui lòng tải lại trang");
    console.error(err);
    // Ở đây bạn có thể dispatch lại hàm lấy giỏ hàng từ server để đồng bộ lại nếu lỗi
  }
};
  return (
    <div className="absolute right-10 top-20 w-96 bg-white text-black shadow-xl rounded-lg p-4 z-50 border">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-lg">Giỏ hàng ({totalQty})</h3>
        <button onClick={onClose} className="cursor-pointer">
          ✕
        </button>
      </div>

      {cartItems?.length === 0 ? (
        <div className="text-center py-6 text-gray-500">
          Giỏ hàng đang trống
        </div>
      ) : (
        <>
          <div className="max-h-72 overflow-y-auto">
            {cartItems?.map((item) => {
              const extendedItem = item as ExtendedCartItem;
              const productInfo = extendedItem.product || extendedItem;

              return (
                <div
                  key={item.id}
                  className="flex gap-3 items-center py-3 border-b"
                >
                  {"image" in productInfo && productInfo.image && (
                    <Image
                      src={productInfo.image as string}
                      alt={
                        "name" in productInfo
                          ? (productInfo.name as string)
                          : "Product"
                      }
                      width={80}
                      height={80}
                      className="w-14 h-14 rounded object-cover"
                    />
                  )}

                  <div className="flex-1">
                    <div className="font-medium line-clamp-2 text-black">
                      {"name" in productInfo
                        ? (productInfo.name as string)
                        : "Sản phẩm chưa có tên"}
                    </div>
                    <div className="text-red-600 text-sm font-semibold">
                      {"price" in productInfo && productInfo.price
                        ? (productInfo.price as number).toLocaleString("vi-VN")
                        : 0}
                      đ
                    </div>
                    <div className="text-xs text-gray-500">
                      Số lượng: {item.quantity}
                    </div>
                  </div>

                  <button
                    onClick={() => handleRemove(item.id)} 
                    className="text-red-500 text-sm font-medium hover:underline cursor-pointer"
                  >
                    Xóa
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-4 border-t pt-4">
            <div className="flex justify-between mb-4">
              <span>Tổng tiền:</span>
              <span className="text-red-600 font-bold">
                {totalPrice.toLocaleString("vi-VN")}đ
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/cart"
                className="text-center py-2 border rounded hover:bg-gray-50 transition"
                onClick={onClose}
              >
                Xem giỏ hàng
              </Link>
              <Link
                href="/checkout"
                className="text-center py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                onClick={onClose}
              >
                Thanh toán
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
