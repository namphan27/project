"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/app/store/features/authSlice";
import { profileApi } from "../services/auth";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await profileApi();

        dispatch(
          loginSuccess({
            user,
          }),
        );
      } catch {}
    };

    loadUser();
  }, [dispatch]);

  return <>{children}</>;
}
