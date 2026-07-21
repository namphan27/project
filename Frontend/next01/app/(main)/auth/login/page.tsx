"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loginSuccess } from "@/app/store/features/authSlice";
import { useDispatch } from "react-redux";
import { loginApi, profileApi } from "../../services/auth";
import Cookies from "js-cookie";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);


  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await loginApi(email, password);

      // document.cookie = `accessToken=${res.data.accessToken}; path=/; max-age=86400; SameSite=Lax`;
      Cookies.set("accessToken", res.data.accessToken, {
        expires: 1,
        sameSite: "Lax",
      });

      Cookies.set("refreshToken", res.data.refreshToken, {
        expires: 7,
        sameSite: "Lax",
      });
      const user = await profileApi();
      dispatch(loginSuccess({ user }));

      if (user.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (error) {
      alert("Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const init = async () => {
      const token = Cookies.get("accessToken");
      // const token = localStorage.getItem("accessToken");
      if (!token) return;

      try {
        const user = await profileApi();
        dispatch(loginSuccess({ user }));
      } catch (err) {
        console.log("invalid token");
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
      }
    };

    init();
  }, [dispatch]);
  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
      <div className="w-125 bg-white p-8 rounded-md shadow-sm">
        <h1 className="text-2xl font-semibold text-center mb-2">
          ĐĂNG NHẬP TÀI KHOẢN
        </h1>

        <p className="text-center text-sm mb-6">
          Bạn chưa có tài khoản?{" "}
          <Link href="/auth/register" className="text-blue-600 underline">
            Đăng ký tại đây
          </Link>
        </p>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label>Email</label>
            <input
              type="email"
              className="w-full mt-1 border p-3 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label>Mật khẩu</label>
            <input
              type="password"
              className="w-full mt-1 border p-3 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-full bg-red-500 text-white font-semibold"
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>
      </div>
    </div>
  );
}
