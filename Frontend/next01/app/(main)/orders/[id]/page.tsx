"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";
import axiosInstance from "../../services/axios";

interface Product {
  name: string;
  image: string;
  description: string;
}

interface OrderItem {
  id: number;
  quantity: number;
  price: number;
  product?: Product;
}

interface OrderDetail {
  id: number;
  total: number;
  isPaid: boolean;
  createdAt: string;
  items: OrderItem[];
}

export default function OrderDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    const fetchDetail = async () => {
      try {
        const response = await axiosInstance.get(`/order/${id}`);

        const result: { success: boolean; data: OrderDetail } = response.data;

        if (result.success) {
          setOrder(result.data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết đơn hàng:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (loading)
    return <p className="text-center mt-10">Đang tải thông tin đơn hàng...</p>;
  if (!order)
    return (
      <p className="text-center mt-10 text-red-500">Không tìm thấy đơn hàng.</p>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8">
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-4 border-b pb-4">
          Đơn hàng #{order.id}
        </h1>

        <div className="grid grid-cols-2 gap-4 text-sm mb-6">
          <p>
            <strong>Ngày đặt:</strong>{" "}
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
          <p>
            <strong>Trạng thái:</strong>
            <span
              className={
                order.isPaid
                  ? "text-green-600 font-bold ml-2"
                  : "text-amber-600 font-bold ml-2"
              }
            >
              {order.isPaid ? "Đã thanh toán" : "Chờ thanh toán"}
            </span>
          </p>
        </div>

        <h2 className="text-lg font-semibold mb-4">Danh sách sản phẩm</h2>
        <div className="space-y-4">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition"
            >
              <Image
                src={item.product?.image || "/placeholder-image.png"}
                alt={item.product?.name || "Sản phẩm"}
                height={64}
                width={64}
                className="w-16 h-16 object-cover rounded-md border"
              />
              <div className="flex-1">
                <h3 className="font-bold text-md">
                  {item.product?.name || "Sản phẩm không xác định"}
                </h3>
                <p className="text-xs text-gray-500">
                  {item.product?.description || "Không có mô tả"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm">SL: {item.quantity}</p>
                <p className="font-bold text-red-600">
                  {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-right border-t pt-4">
          <p className="text-xl font-bold">
            Tổng cộng:{" "}
            <span className="text-red-600">
              {order.total.toLocaleString("vi-VN")}đ
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
