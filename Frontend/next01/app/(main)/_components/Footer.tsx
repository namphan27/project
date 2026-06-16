import React from "react";
import Link from "next/link";
// import { Facebook, Instagram } from "lucide-react";
export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-auto text-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-4 text-black">PC Store</h3>
          <p className="text-sm mb-2">
            Cung cấp PC Gaming, Văn Phòng, Đồ Họa, Workstation, VGA TOP, Gaming
            Gear với nhiều ưu đãi hấp dẫn.
          </p>
          <p className="text-sm font-medium mb-1">MST: 0123210424</p>
          <p className="text-sm mb-1">Address</p>
          <p className="text-sm mb-1">Số điện thoại: 012345678</p>
          <p className="text-sm mb-4">Email: phanhainam03@gmail.com</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-blue-600">
              {/* <Facebook size={20} /> */}
            </Link>
            <Link href="#" className="hover:text-pink-600">
              {/* <Instagram size={20} /> */}
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-bold mb-4 text-black">Chính sách</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/guide" className="hover:underline">
                  Hướng dẫn mua hàng
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:underline">
                  Chính sách giao hàng
                </Link>
              </li>
              <li>
                <Link href="/payment" className="hover:underline">
                  Phương thức thanh toán
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="hover:underline">
                  Chính sách bảo hành/đổi trả hàng
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:underline">
                  Chính sách bảo mật
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-black">Hỗ trợ khách hàng</h3>
          </div>
        </div>

        <div>
          <h3 className="font-bold mb-4 text-black">Đăng ký nhận tin</h3>
          <div className="flex mb-4">
            <input
              type="email"
              placeholder="Nhập địa chỉ email"
              className="px-3 py-2 border rounded-l-md w-full focus:outline-none"
            />
            <button className="bg-gray-300 px-4 py-2 rounded-r-md hover:bg-gray-400">
              Đăng ký
            </button>
          </div>
          <div className="w-48">
           
          </div>
        </div>
      </div>

      <div className="border-t text-center py-4 text-xs text-gray-500">
        © Bản quyền thuộc về ...  since 2012
      </div>
    </footer>
  );
}
