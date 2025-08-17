"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle, Home, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <Card className="text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <AlertTriangle className="h-16 w-16 text-red-500" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Yetkisiz Erişim
            </CardTitle>
            <CardDescription className="text-gray-600">
              Bu sayfaya erişim yetkiniz bulunmuyor. Lütfen sistem yöneticinizle iletişime geçin.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-gray-500">
              <p>Hata Kodu: 403 - Forbidden</p>
              <p>Bu işlem için gerekli yetkiye sahip değilsiniz.</p>
            </div>
            
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                onClick={() => router.back()}
                className="flex-1"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Geri Dön
              </Button>
              <Button 
                onClick={() => router.push('/')}
                className="flex-1"
              >
                <Home className="h-4 w-4 mr-2" />
                Ana Sayfa
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
