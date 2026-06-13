"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerApi } from "../../services/auth";

export default function Register() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await registerApi(name, email, password);

      alert(res.message || "Đăng ký thành công");

      router.push("/auth/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Đăng ký thất bại");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
      <div className="w-125 bg-white p-8 rounded-md shadow-sm">
        <h1 className="text-2xl font-semibold text-center mb-2">
          ĐĂNG KÝ TÀI KHOẢN
        </h1>

        <p className="text-center text-sm mb-6">
          Đã có tài khoản?{" "}
          <Link href="/auth/login" className="text-blue-600 underline">
            Đăng nhập
          </Link>
        </p>

        <form className="space-y-4" onSubmit={handleRegister}>
          <div>
            <label className="text-sm font-medium">Tên</label>

            <input
              type="text"
              className="w-full mt-1 border p-3 rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>

            <input
              type="email"
              className="w-full mt-1 border p-3 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Mật khẩu</label>

            <input
              type="password"
              className="w-full mt-1 border p-3 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-full bg-red-500 text-white font-semibold text-lg"
          >
            {loading ? "Đang đăng ký..." : "Đăng ký"}
          </button>
        </form>
      </div>
    </div>
  );
}
