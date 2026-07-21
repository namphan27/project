"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import Image from "next/image";
import Cookies from "js-cookie";
import axiosInstance from "../services/axios";

interface ExtendedCheckoutItem {
  id: number;
  quantity: number;
  product?: {
    name: string;
    price: number;
    image: string;
  };
  name?: string;
  price?: number;
}

const MY_BANK = "MB";
const MY_ACCOUNT_NO = "0977604753";
const MY_ACCOUNT_NAME = "PHAN HAI NAM";

export default function CheckoutPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const subtotal = cartItems
    ? cartItems.reduce((sum, item) => {
        const extendedItem = item as unknown as ExtendedCheckoutItem;
        const price = extendedItem.product?.price || extendedItem.price || 0;
        return sum + price * extendedItem.quantity;
      }, 0)
    : 0;

  const shippingFee = 1000;
  const total = subtotal + shippingFee;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    note: "",
    paymentMethod: "COD",
  });

  const [loading, setLoading] = useState(false);

  const handleProcessOrder = async () => {
  if (!form.name || !form.phone || !form.address) {
    alert("Vui lòng nhập đầy đủ thông tin nhận hàng!");
    return;
  }

  const token = Cookies.get("accessToken");
  if (!token) {
    alert("Vui lòng đăng nhập để đặt hàng!");
    return;
  }

  setLoading(true);

  try {
    const formattedItems = cartItems.map((item) => {
      const extendedItem = item as unknown as ExtendedCheckoutItem;

      return {
        id: Number(extendedItem.id),
        quantity: Number(extendedItem.quantity),
        price: Number(extendedItem.product?.price || extendedItem.price || 0),
        name: String(
          extendedItem.product?.name || extendedItem.name || "Sản phẩm",
        ),
      };
    });

    const resOrder = await axiosInstance.post("/order", {
      ...form,
      items: formattedItems,
      subtotal,
      shippingFee,
      total,
      isPaid: false,
    });

    const orderResult = resOrder.data;

    if (form.paymentMethod === "BANK_TRANSFER") {
      const resPay = await axiosInstance.post("/create-payment", {
        orderId: orderResult.id,
        amount: total,
        description: `DH${orderResult.id}`,
      });

      const payData = resPay.data;

      if (payData.success && payData.data) {
        window.location.href = payData.data;
      } else {
        throw new Error(payData.message || "Lỗi tạo link thanh toán");
      }
    } else {
      alert("🎉 Đặt hàng COD thành công!");
      window.location.href = "/order";
    }
  } catch (error) {
    alert("Lỗi: " + (error as Error).message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-black">Thanh toán</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="border rounded-lg p-6 bg-white shadow-sm">
            <h2 className="font-bold text-xl mb-5 text-black">
              Thông tin nhận hàng
            </h2>
            <div className="grid gap-4">
              <input
                placeholder="Họ và tên"
                className="border p-3 rounded text-black bg-white"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                placeholder="Số điện thoại"
                className="border p-3 rounded text-black bg-white"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <input
                placeholder="Email"
                className="border p-3 rounded text-black bg-white"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <input
                placeholder="Địa chỉ giao hàng"
                className="border p-3 rounded text-black bg-white"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
              <textarea
                placeholder="Ghi chú"
                className="border p-3 rounded min-h-30 text-black bg-white"
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
              />
            </div>
          </div>

          <div className="border rounded-lg p-6 bg-white shadow-sm">
            <h2 className="font-bold text-xl mb-5 text-black">
              Phương thức thanh toán
            </h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  checked={form.paymentMethod === "COD"}
                  onChange={(e) =>
                    setForm({ ...form, paymentMethod: e.target.value })
                  }
                  className="w-4 h-4 text-red-600 focus:ring-red-500 cursor-pointer"
                />
                <div className="font-medium text-black text-sm">
                  Thanh toán khi nhận hàng (COD)
                </div>
              </label>

              <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="BANK_TRANSFER"
                  checked={form.paymentMethod === "BANK_TRANSFER"}
                  onChange={(e) =>
                    setForm({ ...form, paymentMethod: e.target.value })
                  }
                  className="w-4 h-4 text-red-600 focus:ring-red-500 cursor-pointer"
                />
                <div className="font-medium text-black text-sm">
                  Thanh toán Online (PayOS)
                </div>
              </label>
            </div>
          </div>
        </div>

        <div>
          <div className="border rounded-lg p-5 sticky top-5 bg-white shadow-sm">
            <h2 className="font-bold text-xl mb-5 text-black">
              Đơn hàng của bạn
            </h2>
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cartItems?.map((item) => {
                const extendedItem = item as unknown as ExtendedCheckoutItem;
                return (
                  <div
                    key={extendedItem.id}
                    className="flex justify-between text-sm items-center py-1"
                  >
                    <span className="text-gray-700 font-medium line-clamp-1">
                      {extendedItem.product?.name || extendedItem.name} x{" "}
                      {extendedItem.quantity}
                    </span>
                    <span className="text-black font-semibold">
                      {(
                        (extendedItem.product?.price ||
                          extendedItem.price ||
                          0) * extendedItem.quantity
                      ).toLocaleString("vi-VN")}
                      đ
                    </span>
                  </div>
                );
              })}
            </div>
            <hr className="my-4" />
            <div className="flex justify-between font-bold text-lg mt-4 border-t pt-4">
              <span className="text-black">Tổng cộng</span>
              <span className="text-red-600">
                {total.toLocaleString("vi-VN")}đ
              </span>
            </div>

            <button
              onClick={handleProcessOrder}
              disabled={loading}
              className="w-full mt-5 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 disabled:opacity-50 font-bold transition cursor-pointer text-center"
            >
              {loading
                ? "Đang xử lý..."
                : form.paymentMethod === "BANK_TRANSFER"
                  ? "Thanh toán qua PayOS"
                  : "Đặt hàng"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
