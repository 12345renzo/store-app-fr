"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import useAuthStore from "@/hooks/useAuthStore";
import CargarComponet from "./CargarComponet";

export default function AuthRedirect({ children, allowedRoles }) {
  const router = useRouter();
  const pathname = usePathname();
  const token = localStorage.getItem("token");
  const { rol, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading) {
      if (!rol || !allowedRoles.includes(rol)) {
        router.replace("/store/home");
      }

      if (pathname.startsWith("/store/auth") && rol) {
        router.replace(rol === "Admin" ? "/store/dashboard" : "/store/home");
      }
    }
  }, [isLoading, rol, pathname]);

  if (isLoading || !rol || !allowedRoles.includes(rol)) {
    return <CargarComponet />;
  }

  return children;
}
