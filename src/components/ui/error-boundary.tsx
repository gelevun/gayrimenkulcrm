"use client";

import React, { useEffect, useState } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "./button";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const handleError = (error: ErrorEvent) => {
      console.error("Error caught by boundary:", error);
      setError(error.error);
      setHasError(true);
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error("Unhandled promise rejection:", event);
      setError(new Error(event.reason));
      setHasError(true);
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleUnhandledRejection);
    };
  }, [isClient]);

  const resetError = () => {
    setHasError(false);
    setError(null);
  };

  // Server-side rendering sırasında sadece children'ı render et
  if (!isClient) {
    return <>{children}</>;
  }

  if (hasError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Bir hata oluştu
          </h2>
          <p className="text-gray-600 mb-6 max-w-md">
            Sayfa yüklenirken beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.
          </p>
          <div className="space-x-4">
            <Button onClick={resetError}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Tekrar Dene
            </Button>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Sayfayı Yenile
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
