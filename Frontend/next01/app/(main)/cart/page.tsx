"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/app/store/store";
import { decreaseQuantity, increaseQuantity, removeFromCart } from "@/app/store/features/cartSlice";
// import {
//   removeFromCart,
//   increaseQuantity,
//   decreaseQuantity,
// } from "@/app/store/features/cartSlice";

export default function CartPage() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const shippingFee = subtotal > 0 ? 30000 : 0;

  const total = subtotal + shippingFee;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center">
          <ShoppingCart size={90} className="mx-auto text-gray-300" />

          <h1 className="text-3xl font-bold mt-5">Giỏ hàng trống</h1>

          <Link
            href="/"
            className="inline-block mt-6 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Giỏ hàng ({totalItems})</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-4 border-b last:border-b-0"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={120}
                  height={120}
                  className="w-28 h-28 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.name}</h3>

                  <p className="text-red-600 font-bold mt-2">
                    {item.price.toLocaleString("vi-VN")}đ
                  </p>

                  <div className="flex items-center gap-3 mt-4">
                    <button
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                      className="w-8 h-8 border rounded hover:bg-gray-100"
                    >
                      -
                    </button>

                    <span className="font-semibold">{item.quantity}</span>

                    <button
                      onClick={() => dispatch(increaseQuantity(item.id))}
                      className="w-8 h-8 border rounded hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-col justify-between items-end">
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>

                  <div className="font-bold">
                    {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="border rounded-lg p-5 sticky top-5 bg-white">
            <h2 className="text-xl font-bold mb-5">Tóm tắt đơn hàng</h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Số sản phẩm</span>
                <span>{totalItems}</span>
              </div>

              <div className="flex justify-between">
                <span>Tạm tính</span>
                <span>{subtotal.toLocaleString("vi-VN")}đ</span>
              </div>

              <div className="flex justify-between">
                <span>Phí vận chuyển</span>
                <span>{shippingFee.toLocaleString("vi-VN")}đ</span>
              </div>
            </div>

            <hr className="my-5" />

            <div className="flex justify-between text-lg font-bold">
              <span>Tổng cộng</span>

              <span className="text-red-600">
                {total.toLocaleString("vi-VN")}đ
              </span>
            </div>

            <button className="w-full mt-5 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition">
              Thanh toán
            </button>

            <Link
              href="/"
              className="block text-center mt-3 border py-3 rounded-lg hover:bg-gray-50"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
