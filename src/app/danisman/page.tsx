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
  Phone,
  Mail,
  Star,
  Award,
  Target,
  Clock,
  CheckCircle,
  MessageSquare
} from "lucide-react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { useDashboardStats } from "@/hooks/use-api";

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
            <ArrowRight className="h-4 w-4 mr-1" />
            Detay
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default function DanismanPage() {
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

  // Mock data for danışman-specific features
  const danismanStats = {
    totalProperties: 24,
    activeListings: 18,
    pendingDeals: 6,
    monthlyCommissions: 45000,
    customerSatisfaction: 4.8,
    responseTime: "2.3 saat",
    completedDeals: 12,
    totalCustomers: 35,
    averageRating: 4.9,
    totalReviews: 127
  };

  const recentActivities = [
    {
      id: 1,
      type: "property_view",
      title: "Kadıköy Dairesi görüntülendi",
      time: "2 saat önce",
      customer: "Ahmet Yılmaz"
    },
    {
      id: 2,
      type: "deal_progress",
      title: "Beşiktaş Villa satışı ilerledi",
      time: "4 saat önce",
      customer: "Fatma Demir"
    },
    {
      id: 3,
      type: "new_customer",
      title: "Yeni müşteri kaydı",
      time: "6 saat önce",
      customer: "Mehmet Kaya"
    },
    {
      id: 4,
      type: "commission_earned",
      title: "Komisyon kazancı",
      time: "1 gün önce",
      customer: "Ayşe Özkan"
    }
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-br from-blue-50 to-cyan-50 p-6">
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-2">
              <Award className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">Danışman Dashboard</h1>
            </div>
            <p className="text-gray-600">Portföyünüz ve müşteri takibiniz</p>
          </div>

          {/* Danışman İstatistikleri */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-700">Aktif Portföy</CardTitle>
                <Building2 className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{danismanStats.activeListings}</div>
                <p className="text-xs text-blue-600 mt-1">
                  <span className="text-green-600">+3</span> bu ay
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-green-700">Bekleyen Anlaşmalar</CardTitle>
                <Clock className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{danismanStats.pendingDeals}</div>
                <p className="text-xs text-green-600 mt-1">
                  <span className="text-orange-600">2</span> acil
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-purple-700">Aylık Komisyon</CardTitle>
                <DollarSign className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">₺{danismanStats.monthlyCommissions.toLocaleString()}</div>
                <p className="text-xs text-purple-600 mt-1">
                  <span className="text-green-600">+15%</span> geçen aya göre
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-orange-700">Müşteri Memnuniyeti</CardTitle>
                <Star className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{danismanStats.averageRating}</div>
                <p className="text-xs text-orange-600 mt-1">
                  {danismanStats.totalReviews} değerlendirme
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Hızlı İşlemler ve Son Aktiviteler */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-gray-50 to-slate-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-gray-600" />
                  <span>Hızlı İşlemler</span>
                </CardTitle>
                <CardDescription>Günlük işlemleriniz</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Yeni Gayrimenkul Ekle
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Müşteri Ekle
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Randevu Planla
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Mesaj Gönder
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Rapor Oluştur
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-indigo-50 to-purple-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-indigo-600" />
                  <span>Son Aktiviteler</span>
                </CardTitle>
                <CardDescription>Son işlemleriniz</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 bg-white rounded-lg border">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'property_view' ? 'bg-blue-500' :
                      activity.type === 'deal_progress' ? 'bg-green-500' :
                      activity.type === 'new_customer' ? 'bg-purple-500' :
                      'bg-orange-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.customer} • {activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Performans Özeti */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Tamamlanan İşlemler</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600 mb-2">{danismanStats.completedDeals}</div>
                <p className="text-sm text-gray-600">Bu ay tamamlanan satış</p>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Hedef</span>
                    <span>15</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: `${(danismanStats.completedDeals / 15) * 100}%` }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span>Müşteri Portföyü</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600 mb-2">{danismanStats.totalCustomers}</div>
                <p className="text-sm text-gray-600">Aktif müşteri sayısı</p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Alıcılar</span>
                    <span className="font-medium">24</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Satıcılar</span>
                    <span className="font-medium">11</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-violet-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-purple-600" />
                  <span>Performans</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600 mb-2">{danismanStats.customerSatisfaction}</div>
                <p className="text-sm text-gray-600">Müşteri memnuniyet skoru</p>
                <div className="mt-4">
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className={`h-4 w-4 ${star <= danismanStats.customerSatisfaction ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{danismanStats.totalReviews} değerlendirme</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Portföy Özeti */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Portföy Özeti</CardTitle>
              <CardDescription>Gayrimenkul portföyünüzün genel durumu</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {danismanStats.totalProperties}
                  </div>
                  <div className="text-sm text-gray-600">Toplam Gayrimenkul</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {danismanStats.activeListings}
                  </div>
                  <div className="text-sm text-gray-600">Aktif İlan</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {danismanStats.pendingDeals}
                  </div>
                  <div className="text-sm text-gray-600">Bekleyen Anlaşma</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    ₺{danismanStats.monthlyCommissions.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Aylık Komisyon</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
