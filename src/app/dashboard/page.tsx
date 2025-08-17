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
  MapPin
} from "lucide-react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { useDashboardStats } from "@/hooks/use-api";
import { ProtectedRoute } from "@/components/auth/protected-route";

// Lazy load components
const LazyPropertyCard = ({ property }: { property: any }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <div className="aspect-video bg-gray-200">
          {!imageLoaded && (
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              <Building2 className="h-8 w-8 text-gray-400" />
            </div>
          )}
        </div>
        <Badge className="absolute top-2 left-2">
          {property.status}
        </Badge>
        <Badge variant="secondary" className="absolute top-2 right-2">
          {property.propertyType}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-2">{property.title}</h3>
        <div className="space-y-1 text-sm text-gray-600">
          <div className="flex items-center">
            <MapPin className="h-3 w-3 mr-1" />
            {property.city}, {property.district}
          </div>
          <div className="flex items-center">
            <Building2 className="h-3 w-3 mr-1" />
            {property.netArea} m²
          </div>
          <div className="font-semibold text-lg text-green-600">
            ₺{property.priceTL?.toLocaleString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

function DashboardContent() {
  const { stats, loading, error } = useDashboardStats();
  const [recentProperties, setRecentProperties] = useState([]);

  // Memoize expensive calculations
  const memoizedStats = useMemo(() => {
    if (!stats) return null;
    return {
      totalProperties: stats.totalProperties || 0,
      totalCustomers: stats.totalCustomers || 0,
      monthlySales: stats.monthlySales || 0,
      totalRevenue: stats.totalRevenue || 0,
    };
  }, [stats]);

  // Optimize property rendering
  const renderPropertyCards = useMemo(() => {
    if (!recentProperties.length) {
      return Array.from({ length: 3 }, (_, i) => (
        <Card key={i} className="overflow-hidden">
          <div className="aspect-video bg-gray-200 animate-pulse" />
          <CardContent className="p-4">
            <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-3 bg-gray-200 rounded animate-pulse mb-1" />
            <div className="h-3 bg-gray-200 rounded animate-pulse mb-3" />
            <div className="h-6 bg-gray-200 rounded animate-pulse" />
          </CardContent>
        </Card>
      ));
    }

    return recentProperties.slice(0, 3).map((property: any) => (
      <LazyPropertyCard key={property.id} property={property} />
    ));
  }, [recentProperties]);

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Gayrimenkul CRM</h1>
            <p className="text-gray-600 mt-2">Portföy yönetimi ve müşteri takip sisteminize hoş geldiniz</p>
          </div>

          {/* İstatistik Kartları */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Toplam Emlak</CardTitle>
                <Building2 className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="h-8 bg-gray-200 rounded animate-pulse" />
                ) : (
                  <div className="text-2xl font-bold text-blue-600">
                    {memoizedStats?.totalProperties || 0}
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  Portföydeki emlaklar
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Müşteriler</CardTitle>
                <Users className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="h-8 bg-gray-200 rounded animate-pulse" />
                ) : (
                  <div className="text-2xl font-bold text-green-600">
                    {memoizedStats?.totalCustomers || 0}
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  Kayıtlı müşteriler
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Aylık Satış</CardTitle>
                <TrendingUp className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="h-8 bg-gray-200 rounded animate-pulse" />
                ) : (
                  <div className="text-2xl font-bold text-purple-600">
                    {memoizedStats?.monthlySales || 0}
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  Bu ay tamamlanan
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Toplam Ciro</CardTitle>
                <DollarSign className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="h-8 bg-gray-200 rounded animate-pulse" />
                ) : (
                  <div className="text-2xl font-bold text-orange-600">
                    ₺{memoizedStats?.totalRevenue?.toLocaleString() || 0}
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  Bu yıl toplam ciro
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Portföy Yönetimi */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Portföy Yönetimi</CardTitle>
                  <CardDescription>Ofis portföyündeki emlaklar</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Building2 className="h-4 w-4 mr-2" />
                    Filtrele
                  </Button>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Yeni Emlak
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {renderPropertyCards}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}