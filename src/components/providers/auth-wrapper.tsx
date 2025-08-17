"use client";

import { usePathname } from "next/navigation";
import { AuthProvider } from "@/contexts/auth-context";
import { ReactNode } from "react";

// Auth gerektirmeyen public sayfalar
const publicPages = ["/"];

interface AuthWrapperProps {
  children: ReactNode;
}

export function AuthWrapper({ children }: AuthWrapperProps) {
  const pathname = usePathname();
  
  // Public sayfalar için AuthProvider kullanma
  if (pathname === "/") {
    return <>{children}</>;
  }

  // Diğer sayfalar için AuthProvider kullan
  return <AuthProvider>{children}</AuthProvider>;
}
