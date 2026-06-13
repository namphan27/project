"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
interface Order {
  id: number | string;
  total: number;
  isPaid: boolean;
  createdAt: string;
  items: unknown[];
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // const token = localStorage.getItem("accessToken");
        const token = Cookies.get("accessToken");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_API}/order`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Lỗi tải đơn hàng:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-black">Đơn hàng của tôi</h1>
      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link href={`/orders/${order.id}`} key={order.id} className="block">
              <div className="border p-4 rounded-lg bg-white shadow-sm flex justify-between items-center hover:shadow-md transition-shadow">
                <div>
                  <p className="font-bold">
                    Đơn hàng #{String(order.id).slice(-6)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Ngày đặt: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-red-600">
                    {order.total.toLocaleString("vi-VN")}đ
                  </p>
                  <p
                    className={`text-xs font-bold ${order.isPaid ? "text-green-600" : "text-amber-600"}`}
                  >
                    {order.isPaid ? "Đã thanh toán" : "Chờ thanh toán"}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
