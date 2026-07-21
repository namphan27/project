"use client";

import { Toaster } from "react-hot-toast";
import Header from "./(main)/_components/Header";
import Cookies from "js-cookie";
import "./globals.css";
import Providers from "./provider";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { finishLoading, loginSuccess } from "@/app/store/features/authSlice";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

function AppInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const autoLogin = async () => {
      const token = Cookies.get("accessToken");
      console.log("TOKEN:", token);
      if (!token) {
        dispatch(finishLoading());
        return;
      }

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_API}/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log(res.status);
        if (res.ok) {
          const result = await res.json();

          dispatch(
            loginSuccess({
              user: result.data,
            }),
          );
          console.log("Dispatch xong");
        } else {
          localStorage.removeItem("accessToken");
        }
      } catch (err) {
        console.error("Lỗi tự động kết nối đăng nhập:", err);
      } finally {
        dispatch(finishLoading());
      }
    };

    autoLogin();
  }, [dispatch]);

  return <>{children}</>;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AppInitializer>
            <Toaster position="top-right" />
            {children}
          </AppInitializer>
        </Providers>
      </body>
    </html>
  );
}
