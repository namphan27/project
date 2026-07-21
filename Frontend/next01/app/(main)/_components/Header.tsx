"use client";

import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Nav from "./Nav";
import {
  Phone,
  User,
  ShoppingCart,
  Newspaper,
  Truck,
  Flame,
  ShieldCheck,
  Cpu,
} from "lucide-react";
import Link from "next/link";
import { RootState } from "@/app/store/store";
import { setCart } from "@/app/store/features/cartSlice";
import CartDropdown from "./DropDown";
import SearchBox from "./Search";
import { logout } from "@/app/store/features/authSlice";
import Cookies from "js-cookie";
import axiosInstance from "../services/axios";

export default function Header() {
  const [openCart, setOpenCart] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalQty = cartItems
    ? cartItems.reduce((sum, item) => sum + item.quantity, 0)
    : 0;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setOpenUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const loadCart = async () => {
      const token = Cookies.get("accessToken");

      if (!token) {
        return;
      }

      try {
        const res = await axiosInstance.get("/cart");
        const data = res.data;

        dispatch(setCart(data.items || []));
      } catch (err) {
        console.error("Lỗi tải giỏ hàng:", err);
      }
    };

    loadCart();
  }, [dispatch]);

  return (
    <header className="border-b bg-white shadow-sm mb-5">
      <div className="mx-auto flex h-20 max-w-375 items-center gap-6 px-6">
        <Link
          href="/"
          className="whitespace-nowrap text-4xl font-extrabold text-gray-900"
        >
          PC Store
        </Link>

        <Nav />

        <div className="flex-1">
          <SearchBox />
        </div>

        <div className="grid w-108 grid-cols-3">
          <div className="flex cursor-pointer items-center justify-center gap-3 transition hover:text-red-600">
            <Phone size={24} className="text-red-600" />

            <div className="leading-tight">
              <p className="text-xs text-gray-500">Hotline</p>
              <p className="font-semibold text-gray-800">01234567890</p>
            </div>
          </div>

          <div
            onClick={() => setOpenCart(!openCart)}
            className="relative flex cursor-pointer items-center justify-center gap-3 transition hover:text-red-600"
          >
            <ShoppingCart size={24} className="text-red-600" />

            <div>
              <p className="font-medium text-gray-800">Giỏ hàng</p>
            </div>

            {totalQty > 0 && (
              <span className="absolute right-6 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white">
                {totalQty}
              </span>
            )}
          </div>

          <div className="relative" ref={userMenuRef}>
            <div
              onClick={() => setOpenUserMenu(!openUserMenu)}
              className="flex cursor-pointer items-center justify-center gap-3 transition hover:text-red-600"
            >
              <User size={24} className="text-red-600" />

              <div className="leading-tight">
                {loading ? (
                  <div className="h-5 w-24 animate-pulse rounded bg-gray-200" />
                ) : user ? (
                  <>
                    <p className="text-[11px] uppercase text-gray-500">
                      Xin chào
                    </p>

                    <p className="font-semibold text-gray-800">{user.name}</p>
                  </>
                ) : (
                  <>
                    <p className="text-xs text-gray-500">Tài khoản</p>

                    <Link
                      href="/auth/login"
                      className="font-semibold text-gray-800"
                    >
                      Đăng nhập
                    </Link>
                  </>
                )}
              </div>
            </div>

            {openUserMenu && user && (
              <div className="absolute right-0 top-16 z-50 w-56 overflow-hidden rounded-xl border bg-white shadow-xl">
                <Link
                  href="/profile"
                  onClick={() => setOpenUserMenu(false)}
                  className="block px-4 py-3 hover:bg-gray-100"
                >
                  Thông tin cá nhân
                </Link>

                <Link
                  href="/orders"
                  onClick={() => setOpenUserMenu(false)}
                  className="block px-4 py-3 hover:bg-gray-100"
                >
                  Đơn hàng của tôi
                </Link>

                <button
                  onClick={() => {
                    dispatch(logout());
                    setOpenUserMenu(false);
                  }}
                  className="w-full cursor-pointer px-4 py-3 text-left text-red-500 hover:bg-gray-100"
                >
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-red-600 py-4">
        <div className="mx-auto flex max-w-375 gap-6 px-6">
          <button className="flex flex-1 items-center justify-center gap-2 rounded-full bg-white font-medium text-red-600 transition hover:bg-red-50 cursor-pointer">
            <Link
              href="/build-pc"
              className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-white py-3 font-medium text-red-600 transition hover:bg-red-50"
            >
              <Cpu size={18} />
              <span>Xây dựng cấu hình</span>
            </Link>
          </button>

          <button className="flex flex-1 items-center justify-center gap-2 rounded-full bg-white py-3 font-medium text-red-600 transition hover:bg-red-50 cursor-pointer">
            <ShieldCheck size={18} />
            <span>Thông tin bảo hành</span>
          </button>

          <button className="flex flex-1 items-center justify-center gap-2 rounded-full bg-white py-3 font-medium text-red-600 transition hover:bg-red-50 cursor-pointer">
            <Flame size={18} />
            <span>Sản phẩm đang hot</span>
          </button>

          <button className="flex flex-1 items-center justify-center gap-2 rounded-full bg-white py-3 font-medium text-red-600 transition hover:bg-red-50 cursor-pointer">
            <Truck size={18} />
            <span>Chính sách giao hàng</span>
          </button>

          <button className="flex flex-1 items-center justify-center gap-2 rounded-full bg-white py-3 font-medium text-red-600 transition hover:bg-red-50 cursor-pointer">
            <Newspaper size={18} />
            <span>Tin tức công nghệ</span>
          </button>
        </div>
      </div>

      {openCart && <CartDropdown onClose={() => setOpenCart(false)} />}
    </header>
  );
}
