"use client";

import { usePathname } from "next/navigation";
import { AuthProvider } from "@/contexts/auth-context";
import { ReactNode, useEffect, useState } from "react";

interface AuthWrapperProps {
  children: ReactNode;
}

export function AuthWrapper({ children }: AuthWrapperProps) {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Server-side rendering sırasında AuthProvider kullan
  if (!isClient) {
    return <AuthProvider>{children}</AuthProvider>;
  }

  // Client-side'da pathname kontrolü yap
  if (pathname === "/") {
    return <>{children}</>;
  }

  // Diğer sayfalar için AuthProvider kullan
  return <AuthProvider>{children}</AuthProvider>;
}
