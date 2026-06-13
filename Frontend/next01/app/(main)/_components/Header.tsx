"use client";

import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Nav from "./Nav";
import { Phone, User, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { RootState } from "@/app/store/store";
import { setCart } from "@/app/store/features/cartSlice";
import CartDropdown from "./DropDown";
import SearchBox from "./Search";
import { logout } from "@/app/store/features/authSlice";
import Cookies from "js-cookie";

export default function Header() {
  const [openCart, setOpenCart] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
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
      // const token = localStorage.getItem("accessToken");
      const token = Cookies.get("accessToken");
      if (!token) return;
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API}/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        dispatch(setCart(data.items || []));
      } catch (err) {
        console.error("Lỗi tải giỏ hàng:", err);
      }
    };
    loadCart();
  }, [dispatch]);

  return (
    <header className="bg-gray-600 text-white relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-3">
        <Link href="/" className="text-2xl font-bold">
          PC Store
        </Link>

        <div className="flex flex-1 mx-6">
          <SearchBox />
        </div>

        <div className="flex gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Phone size={18} />
            <div>
              <div>Hỗ trợ</div>
              <div className="font-bold">01234567890</div>
            </div>
          </div>

          <div className="relative" ref={userMenuRef}>
            <div
              className="flex items-center gap-2 cursor-pointer hover:text-yellow-300 transition"
              onClick={() => setOpenUserMenu(!openUserMenu)}
            >
              <User size={18} />
              <div>
                {user ? (
                  <>
                    <div className="text-[10px] uppercase">Xin chào</div>
                    <div className="font-bold">{user.name}</div>
                  </>
                ) : (
                  <>
                    <div>Tài khoản</div>
                    <Link href="/auth/login" className="font-bold">
                      Đăng nhập
                    </Link>
                  </>
                )}
              </div>
            </div>

            {openUserMenu && user && (
              <div className="absolute right-0 top-12 w-48 bg-white text-black shadow-xl rounded-lg z-50 py-2 border overflow-hidden">
                <Link
                  href="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setOpenUserMenu(false)}
                >
                  Thông tin cá nhân
                </Link>
                <Link
                  href="/orders"
                  className="block px-4 py-2 hover:bg-gray-100 font-bold text-red-600"
                  onClick={() => setOpenUserMenu(false)}
                >
                  Đơn hàng của tôi
                </Link>
                <button
                  onClick={() => {
                    dispatch(logout());
                    setOpenUserMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer"
                >
                  Đăng xuất
                </button>
              </div>
            )}
          </div>

          <div
            className="flex items-center gap-2 cursor-pointer relative hover:text-yellow-300 transition"
            onClick={() => setOpenCart(!openCart)}
          >
            <ShoppingCart size={18} />
            <div>
              Giỏ hàng
              {totalQty > 0 && (
                <span className="ml-1 font-bold text-yellow-300">
                  ({totalQty})
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white text-black">
        <div className="max-w-7xl mx-auto flex items-center gap-6 p-3">
          <Nav />
          <div className="flex gap-6 text-sm text-gray-600">
            <span className="hover:text-black cursor-pointer">
              Hướng dẫn trả góp
            </span>
            <span className="hover:text-black cursor-pointer">
              Chính sách vận chuyển
            </span>
            <span className="hover:text-black cursor-pointer">
              Đổi trả & bảo hành
            </span>
          </div>
        </div>
      </div>

      {openCart && <CartDropdown onClose={() => setOpenCart(false)} />}
    </header>
  );
}
