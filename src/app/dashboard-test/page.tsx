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
import { useDashboardStats } from "@/hooks/use-api";

export default function DashboardTestPage() {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Test</h1>
        <p className="text-gray-600 mt-2">Sidebar ve Header olmadan test</p>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Toplam Gayrimenkul</CardTitle>
            <Building2 className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{memoizedStats?.totalProperties || 0}</div>
            <p className="text-xs text-blue-600 mt-1">
              <span className="text-green-600">+20.1%</span> geçen aya göre
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Toplam Müşteri</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{memoizedStats?.totalCustomers || 0}</div>
            <p className="text-xs text-green-600 mt-1">
              <span className="text-green-600">+12.5%</span> geçen aya göre
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Aylık Satış</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{memoizedStats?.monthlySales || 0}</div>
            <p className="text-xs text-purple-600 mt-1">
              <span className="text-green-600">+8.2%</span> geçen aya göre
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Toplam Gelir</CardTitle>
            <DollarSign className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">₺{(memoizedStats?.totalRevenue || 0).toLocaleString()}</div>
            <p className="text-xs text-orange-600 mt-1">
              <span className="text-green-600">+15.3%</span> geçen aya göre
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Test Başarılı!</CardTitle>
          <CardDescription>Bu sayfa Sidebar ve Header olmadan çalışıyor</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Eğer bu sayfa çalışıyorsa, sorun Sidebar veya Header component'lerinde.</p>
        </CardContent>
      </Card>
    </div>
  );
}
