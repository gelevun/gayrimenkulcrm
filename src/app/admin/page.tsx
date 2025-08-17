"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Users,
  TrendingUp,
  DollarSign,
  Plus,
  ArrowRight,
  Calendar,
  MapPin,
  Shield,
  Settings,
  BarChart3,
  UserCheck,
  Eye,
  Database
} from "lucide-react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { useDashboardStats } from "@/hooks/use-api";
import { ProtectedRoute } from "@/components/auth/protected-route";

// Lazy load components
const LazyPropertyCard = ({ property }: { property: any }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return (
      <Card className="animate-pulse">
        <div className="h-48 bg-gray-200 rounded-t-lg" />
        <CardContent className="p-4 space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
          <div className="h-3 bg-gray-200 rounded w-2/3" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
      <div className="relative">
        <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-t-lg flex items-center justify-center">
          <Building2 className="h-12 w-12 text-blue-600" />
        </div>
        <Badge className="absolute top-3 right-3 bg-blue-600 text-white">
          {property.status}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2">{property.title}</h3>
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-green-600">
            ₺{property.price.toLocaleString()}
          </span>
          <Button variant="ghost" size="sm">
            <Eye className="h-4 w-4 mr-1" />
            Detay
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

function AdminContent() {
  const { stats, loading, error } = useDashboardStats();
  const [recentProperties, setRecentProperties] = useState([]);

  // Memoize expensive calculations
  const memoizedStats = useMemo(() => {
    if (!stats) return null;
    
    return {
      totalProperties: stats.totalProperties || 0,
      totalCustomers: stats.totalCustomers || 0,
      totalSales: stats.totalSales || 0,
      totalRevenue: stats.totalRevenue || 0,
      monthlyGrowth: stats.monthlyGrowth || 0,
      activeListings: stats.activeListings || 0,
      pendingDeals: stats.pendingDeals || 0,
      systemHealth: stats.systemHealth || 'excellent'
    };
  }, [stats]);

  // Optimize property rendering
  const renderPropertyCards = useMemo(() => {
    return recentProperties.slice(0, 6).map((property: any, index: number) => (
      <LazyPropertyCard key={property.id || index} property={property} />
    ));
  }, [recentProperties]);

  // Mock data for admin-specific features
  const adminStats = {
    totalUsers: 45,
    activeAgents: 23,
    systemUptime: "99.9%",
    databaseSize: "2.4 GB",
    lastBackup: "2 saat önce",
    securityScore: 95,
    pendingApprovals: 7,
    systemAlerts: 2
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-red-50 to-pink-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-br from-red-50 to-pink-50 p-6">
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-2">
              <Shield className="h-8 w-8 text-red-600" />
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <p className="text-gray-600">Sistem yönetimi ve genel bakış</p>
          </div>

          {/* Admin İstatistikleri */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-red-50 to-pink-50 border-red-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-red-700">Toplam Kullanıcı</CardTitle>
                <Users className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{adminStats.totalUsers}</div>
                <p className="text-xs text-red-600 mt-1">
                  <span className="text-green-600">+12%</span> geçen aya göre
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-700">Aktif Danışmanlar</CardTitle>
                <UserCheck className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{adminStats.activeAgents}</div>
                <p className="text-xs text-blue-600 mt-1">
                  <span className="text-green-600">+5%</span> geçen aya göre
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-green-700">Sistem Sağlığı</CardTitle>
                <BarChart3 className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{adminStats.securityScore}%</div>
                <p className="text-xs text-green-600 mt-1">
                  Mükemmel durumda
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-purple-700">Bekleyen Onaylar</CardTitle>
                <Settings className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{adminStats.pendingApprovals}</div>
                <p className="text-xs text-purple-600 mt-1">
                  İnceleme gerekiyor
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sistem Durumu */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-gray-50 to-slate-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5 text-gray-600" />
                  <span>Sistem Durumu</span>
                </CardTitle>
                <CardDescription>Teknik detaylar ve performans</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Sistem Uptime</span>
                      <span className="font-medium text-green-600">{adminStats.systemUptime}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Veritabanı Boyutu</span>
                      <span className="font-medium">{adminStats.databaseSize}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Son Yedekleme</span>
                      <span className="font-medium">{adminStats.lastBackup}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Güvenlik Skoru</span>
                      <span className="font-medium text-green-600">{adminStats.securityScore}/100</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Sistem Uyarıları</span>
                      <span className="font-medium text-orange-600">{adminStats.systemAlerts}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Aktif Oturumlar</span>
                      <span className="font-medium">18</span>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <Button className="w-full" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Sistem Ayarları
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-amber-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-orange-600" />
                  <span>Hızlı İşlemler</span>
                </CardTitle>
                <CardDescription>Yönetim işlemleri</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Kullanıcı Yönetimi
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Shield className="h-4 w-4 mr-2" />
                  Yetki Ayarları
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Database className="h-4 w-4 mr-2" />
                  Veritabanı Yönetimi
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Raporlar
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Sistem Konfigürasyonu
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Genel İstatistikler */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Genel Sistem İstatistikleri</CardTitle>
              <CardDescription>Portföy ve satış verileri</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {memoizedStats?.totalProperties || 0}
                  </div>
                  <div className="text-sm text-gray-600">Toplam Gayrimenkul</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {memoizedStats?.totalCustomers || 0}
                  </div>
                  <div className="text-sm text-gray-600">Toplam Müşteri</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {memoizedStats?.totalSales || 0}
                  </div>
                  <div className="text-sm text-gray-600">Toplam Satış</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    ₺{(memoizedStats?.totalRevenue || 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Toplam Gelir</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <ProtectedRoute requiredRole="ADMIN">
      <AdminContent />
    </ProtectedRoute>
  );
}
