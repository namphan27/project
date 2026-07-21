"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { profileApi } from "../services/auth";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await profileApi();

        setUser(data);
      } catch (error) {
        console.error("Lỗi lấy profile:", error);
        router.push("/auth/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <p>Đang tải...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold mb-6">
        Thông tin cá nhân
      </h1>

      <div className="space-y-4">
        <div>
          <p className="text-gray-500">Họ tên</p>
          <p className="font-semibold">
            {user.name}
          </p>
        </div>

        <div>
          <p className="text-gray-500">Email</p>
          <p className="font-semibold">
            {user.email}
          </p>
        </div>

        <div>
          <p className="text-gray-500">Vai trò</p>
          <p className="font-semibold">
            {user.role}
          </p>
        </div>
      </div>
    </div>
  );
}