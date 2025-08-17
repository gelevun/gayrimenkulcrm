"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Heart,
  Search,
  MapPin,
  Phone,
  Mail,
  Star,
  Calendar,
  Clock,
  Eye,
  MessageSquare,
  Bookmark,
  TrendingUp,
  DollarSign,
  Home,
  Filter,
  ArrowRight
} from "lucide-react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

// Lazy load components
const LazyPropertyCard = ({ property }: { property: any }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
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
        <Badge className="absolute top-3 left-3 bg-blue-600 text-white">
          {property.status}
        </Badge>
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-3 right-3 bg-white/90 hover:bg-white text-gray-800 rounded-full w-8 h-8"
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
        </Button>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2">{property.title}</h3>
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-green-600">
            ₺{property.price.toLocaleString()}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{property.rating}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-1" />
            Detay
          </Button>
          <Button size="sm">
            <Phone className="h-4 w-4 mr-1" />
            Ara
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default function MusteriPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Mock data for müşteri-specific features
  const musteriStats = {
    savedProperties: 12,
    viewedProperties: 45,
    contactedAgents: 8,
    appointments: 3,
    favoriteAreas: 5,
    budgetRange: "₺2.000.000 - ₺5.000.000",
    lastSearch: "Kadıköy, 3+1, 150m²"
  };

  const savedProperties = [
    {
      id: 1,
      title: "Kadıköy Merkezi Daire",
      location: "Kadıköy, İstanbul",
      price: 2500000,
      status: "Satışta",
      rating: 4.8,
      type: "Daire",
      bedrooms: 3,
      area: 145
    },
    {
      id: 2,
      title: "Beşiktaş Lüks Villa",
      location: "Beşiktaş, İstanbul",
      price: 8500000,
      status: "Satışta",
      rating: 4.9,
      type: "Villa",
      bedrooms: 5,
      area: 280
    },
    {
      id: 3,
      title: "Şişli Ofis Katı",
      location: "Şişli, İstanbul",
      price: 3200000,
      status: "Satışta",
      rating: 4.6,
      type: "Ofis",
      bedrooms: 0,
      area: 120
    }
  ];

  const recentSearches = [
    "Kadıköy, 3+1, 150m²",
    "Beşiktaş, villa, 5+1",
    "Şişli, ofis, 100m²",
    "Üsküdar, 2+1, 80m²"
  ];

  const upcomingAppointments = [
    {
      id: 1,
      property: "Kadıköy Merkezi Daire",
      agent: "Mehmet Danışman",
      date: "2024-01-15",
      time: "14:00",
      type: "Görüntüleme"
    },
    {
      id: 2,
      property: "Beşiktaş Lüks Villa",
      agent: "Ayşe Danışman",
      date: "2024-01-17",
      time: "16:00",
      type: "Görüntüleme"
    }
  ];

  const recommendedProperties = [
    {
      id: 1,
      title: "Kadıköy Yeni Proje",
      location: "Kadıköy, İstanbul",
      price: 2800000,
      status: "Satışta",
      rating: 4.7,
      type: "Daire",
      bedrooms: 3,
      area: 155
    },
    {
      id: 2,
      title: "Beşiktaş Deniz Manzaralı",
      location: "Beşiktaş, İstanbul",
      price: 4200000,
      status: "Satışta",
      rating: 4.9,
      type: "Daire",
      bedrooms: 4,
      area: 180
    },
    {
      id: 3,
      title: "Şişli Merkezi Ofis",
      location: "Şişli, İstanbul",
      price: 1800000,
      status: "Satışta",
      rating: 4.5,
      type: "Ofis",
      bedrooms: 0,
      area: 85
    }
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-br from-green-50 to-emerald-50 p-6">
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-2">
              <Home className="h-8 w-8 text-green-600" />
              <h1 className="text-3xl font-bold text-gray-900">Müşteri Dashboard</h1>
            </div>
            <p className="text-gray-600">Hayalinizdeki evi bulun</p>
          </div>

          {/* Arama Çubuğu */}
          <Card className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Konum, emlak türü veya anahtar kelime ara..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="px-3 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="all">Tüm Türler</option>
                    <option value="Daire">Daire</option>
                    <option value="Villa">Villa</option>
                    <option value="Arsa">Arsa</option>
                    <option value="Ofis">Ofis</option>
                  </select>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-3 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="all">Tüm Durumlar</option>
                    <option value="Satışta">Satışta</option>
                    <option value="Kiralık">Kiralık</option>
                  </select>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Search className="h-4 w-4 mr-2" />
                    Ara
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Müşteri İstatistikleri */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-green-700">Kaydedilen İlanlar</CardTitle>
                <Bookmark className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{musteriStats.savedProperties}</div>
                <p className="text-xs text-green-600 mt-1">
                  <span className="text-blue-600">+3</span> bu hafta
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-700">Görüntülenen İlanlar</CardTitle>
                <Eye className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{musteriStats.viewedProperties}</div>
                <p className="text-xs text-blue-600 mt-1">
                  <span className="text-green-600">+12</span> bu ay
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-purple-700">İletişim Kurulan Danışman</CardTitle>
                <MessageSquare className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{musteriStats.contactedAgents}</div>
                <p className="text-xs text-purple-600 mt-1">
                  <span className="text-green-600">+2</span> bu hafta
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-orange-700">Yaklaşan Randevular</CardTitle>
                <Calendar className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{musteriStats.appointments}</div>
                <p className="text-xs text-orange-600 mt-1">
                  <span className="text-red-600">2</span> bu hafta
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Kaydedilen İlanlar ve Randevular */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-gray-50 to-slate-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-red-600" />
                  <span>Kaydedilen İlanlar</span>
                </CardTitle>
                <CardDescription>Favori gayrimenkulleriniz</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {savedProperties.map((property) => (
                  <div key={property.id} className="flex items-center space-x-4 p-3 bg-white rounded-lg border">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                      <Building2 className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{property.title}</h3>
                      <p className="text-sm text-gray-600">{property.location}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm font-medium text-green-600">₺{property.price.toLocaleString()}</span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs">{property.rating}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      Görüntüle
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-indigo-50 to-purple-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-indigo-600" />
                  <span>Yaklaşan Randevular</span>
                </CardTitle>
                <CardDescription>Planlanmış görüntülemeler</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center space-x-4 p-3 bg-white rounded-lg border">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{appointment.property}</h3>
                      <p className="text-sm text-gray-600">{appointment.agent}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-indigo-600">{appointment.date}</span>
                        <span className="text-sm text-indigo-600">{appointment.time}</span>
                        <Badge variant="secondary">{appointment.type}</Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4 mr-1" />
                      Ara
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Önerilen İlanlar */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span>Size Özel Öneriler</span>
              </CardTitle>
              <CardDescription>Tercihlerinize göre seçilen gayrimenkuller</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedProperties.map((property) => (
                  <LazyPropertyCard key={property.id} property={property} />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Son Aramalar ve Tercihler */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-yellow-50 to-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Search className="h-5 w-5 text-yellow-600" />
                  <span>Son Aramalar</span>
                </CardTitle>
                <CardDescription>Arama geçmişiniz</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentSearches.map((search, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <Search className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium">{search}</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-cyan-50 to-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="h-5 w-5 text-cyan-600" />
                  <span>Tercihleriniz</span>
                </CardTitle>
                <CardDescription>Kayıtlı arama kriterleriniz</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Bütçe Aralığı</span>
                    <span className="font-medium">{musteriStats.budgetRange}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tercih Edilen Bölgeler</span>
                    <span className="font-medium">{musteriStats.favoriteAreas}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Son Arama</span>
                    <span className="font-medium">{musteriStats.lastSearch}</span>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <Button className="w-full" variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Tercihleri Düzenle
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
