"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Shield, Award, Home, LogIn, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "@/hooks/use-toast";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Hata",
        description: "Email ve şifre gerekli",
        variant: "destructive",
      });
      return;
    }

    setIsLoggingIn(true);
    try {
      const success = await login(email, password);
      if (success) {
        toast({
          title: "Başarılı",
          description: "Giriş yapıldı",
        });
        
        // Kullanıcı rolüne göre yönlendirme
        if (email.includes('admin')) {
          router.push('/admin');
        } else if (email.includes('danisman')) {
          router.push('/danisman');
        } else if (email.includes('musteri')) {
          router.push('/musteri');
        } else {
          router.push('/dashboard');
        }
      } else {
        toast({
          title: "Hata",
          description: "Geçersiz email veya şifre",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Hata",
        description: "Giriş yapılırken bir hata oluştu",
        variant: "destructive",
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  const quickLogin = (testEmail: string) => {
    setEmail(testEmail);
    setPassword("123456");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <Building2 className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Gayrimenkul CRM
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Hesabınıza giriş yapın
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Giriş Yap</CardTitle>
            <CardDescription>
              Email ve şifrenizi girerek sisteme giriş yapın
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ornek@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Şifre</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Şifrenizi girin"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoggingIn || isLoading}
              >
                {isLoggingIn ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Giriş yapılıyor...
                  </>
                ) : (
                  <>
                    <LogIn className="h-4 w-4 mr-2" />
                    Giriş Yap
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Test Kullanıcıları */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Test Kullanıcıları</CardTitle>
            <CardDescription>
              Hızlı test için aşağıdaki hesapları kullanabilirsiniz
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              onClick={() => quickLogin('admin@example.com')}
              className="w-full h-12 text-left justify-start"
              variant="outline"
            >
              <Shield className="h-5 w-5 mr-3 text-red-600" />
              <div>
                <div className="font-semibold">Admin</div>
                <div className="text-sm text-gray-500">admin@example.com</div>
              </div>
            </Button>

            <Button
              onClick={() => quickLogin('danisman@example.com')}
              className="w-full h-12 text-left justify-start"
              variant="outline"
            >
              <Award className="h-5 w-5 mr-3 text-blue-600" />
              <div>
                <div className="font-semibold">Danışman</div>
                <div className="text-sm text-gray-500">danisman@example.com</div>
              </div>
            </Button>

            <Button
              onClick={() => quickLogin('musteri@example.com')}
              className="w-full h-12 text-left justify-start"
              variant="outline"
            >
              <Home className="h-5 w-5 mr-3 text-green-600" />
              <div>
                <div className="font-semibold">Müşteri</div>
                <div className="text-sm text-gray-500">musteri@example.com</div>
              </div>
            </Button>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-gray-500">
          <p>Tüm test hesapları için şifre: <strong>123456</strong></p>
        </div>
      </div>
    </div>
  );
}
