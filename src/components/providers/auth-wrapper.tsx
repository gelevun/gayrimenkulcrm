"use client";

import { usePathname } from "next/navigation";
import { AuthProvider } from "@/contexts/auth-context";

// Auth gerektirmeyen public sayfalar
const publicPages = ["/"];

interface AuthWrapperProps {
  children: React.ReactNode;
}

export function AuthWrapper({ children }: AuthWrapperProps) {
  const pathname = usePathname();
  const isPublicPage = publicPages.includes(pathname);

  // Public sayfalar için AuthProvider kullanma
  if (isPublicPage) {
    return <>{children}</>;
  }

  // Diğer sayfalar için AuthProvider kullan
  return <AuthProvider>{children}</AuthProvider>;
}
