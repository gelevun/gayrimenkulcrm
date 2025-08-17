"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  MapPin,
  Bed,
  Bath,
  Square,
  Car,
  Heart,
  Share2,
  Phone,
  Mail,
  Building2,
  Users,
  Star,
  Filter,
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
  Home,
  Menu,
  User,
  LogIn
} from "lucide-react";

// Mock gayrimenkul verileri
const mockProperties = [
  {
    id: "1",
    title: "Merkezi Konut - Kadıköy",
    description: "Deniz manzaralı, yeni yapılmış lüks daire",
    price: 2500000,
    priceUSD: 85000,
    location: "Kadıköy, İstanbul",
    address: "Fenerbahçe Mahallesi, Kadıköy",
    bedrooms: 3,
    bathrooms: 2,
    area: 145,
    type: "Daire",
    status: "Satışta",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560448204-5c9a89c0b0b0?w=800&h=600&fit=crop"
    ],
    features: ["Deniz Manzarası", "Yeni Yapı", "Asansör", "Otopark"],
    rating: 4.8,
    reviews: 24,
    agent: {
      name: "Mehmet Danışman",
      phone: "+90 555 123 4567",
      email: "mehmet@example.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    }
  },
  {
    id: "2",
    title: "Villa - Beşiktaş",
    description: "Bahçeli, havuzlu lüks villa",
    price: 8500000,
    priceUSD: 290000,
    location: "Beşiktaş, İstanbul",
    address: "Levent Mahallesi, Beşiktaş",
    bedrooms: 5,
    bathrooms: 4,
    area: 320,
    type: "Villa",
    status: "Satışta",
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1613977257363-707ba9348228?w=800&h=600&fit=crop"
    ],
    features: ["Havuz", "Bahçe", "Güvenlik", "Akıllı Ev"],
    rating: 4.9,
    reviews: 18,
    agent: {
      name: "Ayşe Danışman",
      phone: "+90 555 234 5678",
      email: "ayse@example.com",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    }
  },
  {
    id: "3",
    title: "Arsa - Çekmeköy",
    description: "İmarlı, yatırıma uygun arsa",
    price: 3500000,
    priceUSD: 120000,
    location: "Çekmeköy, İstanbul",
    address: "Merkez Mahallesi, Çekmeköy",
    bedrooms: 0,
    bathrooms: 0,
    area: 500,
    type: "Arsa",
    status: "Satışta",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop"
    ],
    features: ["İmarlı", "Yatırıma Uygun", "Ana Yola Yakın"],
    rating: 4.5,
    reviews: 12,
    agent: {
      name: "Ali Danışman",
      phone: "+90 555 345 6789",
      email: "ali@example.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    }
  }
];

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    // Eğer kullanıcı giriş yapmışsa, rolüne göre yönlendir
    if (isAuthenticated && user) {
      if (user.role === 'ADMIN') {
        router.push('/admin');
      } else if (user.role === 'DANISMAN') {
        router.push('/danisman');
      } else if (user.role === 'MUSTERI') {
        router.push('/musteri');
      } else {
        router.push('/dashboard');
      }
    }
  }, [isAuthenticated, user, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Gayrimenkul CRM</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => router.push('/login')}>
                <LogIn className="h-4 w-4 mr-2" />
                Giriş Yap
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Profesyonel Gayrimenkul Yönetim Sistemi
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Müşteri takibi, portföy yönetimi, finansal işlemler ve daha fazlası için 
            kapsamlı CRM çözümü. Gayrimenkul danışmanları için özel olarak tasarlandı.
          </p>
          
          <div className="flex justify-center space-x-4">
            <Button size="lg" onClick={() => router.push('/login')}>
              <LogIn className="h-5 w-5 mr-2" />
              Hemen Başla
            </Button>
            <Button size="lg" variant="outline">
              <Phone className="h-5 w-5 mr-2" />
              İletişim
            </Button>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center p-6">
            <div className="flex justify-center mb-4">
              <Users className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Müşteri Yönetimi</h3>
            <p className="text-gray-600">
              Müşteri bilgilerini, iletişim geçmişini ve tercihlerini kolayca takip edin.
            </p>
          </Card>
          
          <Card className="text-center p-6">
            <div className="flex justify-center mb-4">
              <Building2 className="h-12 w-12 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Portföy Yönetimi</h3>
            <p className="text-gray-600">
              Emlak portföyünüzü organize edin, fotoğraflar ve detayları yönetin.
            </p>
          </Card>
          
          <Card className="text-center p-6">
            <div className="flex justify-center mb-4">
              <Star className="h-12 w-12 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Finansal Takip</h3>
            <p className="text-gray-600">
              Satış, komisyon ve gelir takibini yapın, raporlar oluşturun.
            </p>
          </Card>
        </div>
      </div>

      {/* Sample Properties */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Örnek Portföy</h2>
          <p className="text-gray-600">Sistemimizde yönetilen örnek gayrimenkul portföyü</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProperties.map((property) => (
            <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                <Building2 className="h-12 w-12 text-blue-600" />
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{property.type}</Badge>
                  <Badge>{property.status}</Badge>
                </div>
                <h3 className="font-semibold text-lg mb-2">{property.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{property.description}</p>
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  {property.location}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-600">
                    ₺{property.price.toLocaleString()}
                  </span>
                  <Button variant="outline" size="sm">
                    Detay
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Building2 className="h-8 w-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Gayrimenkul CRM</h3>
            <p className="text-gray-400 mb-4">
              Profesyonel gayrimenkul danışmanları için kapsamlı yönetim sistemi
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="outline" size="sm">
                <Mail className="h-4 w-4 mr-2" />
                İletişim
              </Button>
              <Button variant="outline" size="sm">
                <Phone className="h-4 w-4 mr-2" />
                Destek
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
