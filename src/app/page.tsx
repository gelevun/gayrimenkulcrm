"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Search,
  MapPin,
  Square,
  Heart,
  Share2,
  Phone,
  Mail,
  Building2,
  Filter,
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
  Home,
  Menu,
  User,
  LogIn,
  Trees,
  Mountain,
  Car,
  Zap,
  Droplet,
  Flame,
  Waves,
  Star,
  Eye,
  Calendar,
  DollarSign,
  Loader2
} from "lucide-react";

// Property interface
interface Property {
  id: string;
  title: string;
  description?: string;
  propertyType: string;
  status: 'SATISTA' | 'REZERVE' | 'SATILDI' | 'BEKLEMEDE';
  city: string;
  district: string;
  neighborhood?: string;
  address?: string;
  netArea: number;
  grossArea?: number;
  zoningStatus?: 'IMARLI' | 'IMARSIZ' | 'KISMEN_IMARLI';
  zoningDetails?: string;
  maxFloors?: number;
  kaks?: number;
  gabari?: number;
  hasElectricity: boolean;
  hasWater: boolean;
  hasGas: boolean;
  hasSewerage: boolean;
  priceTL: number;
  priceUSD?: number;
  priceEUR?: number;
  priceGoldGrams?: number;
  createdAt: string;
  updatedAt: string;
  user?: {
    name: string;
    email: string;
  };
  customer?: {
    name: string;
    email: string;
    type: string;
  };
  mediaFiles?: Array<{
    id: string;
    filename: string;
    filePath: string;
    fileType: string;
    isPrimary: boolean;
  }>;
}

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Portföy verilerini yükle
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/properties?status=SATISTA&isPublished=true');
        if (!response.ok) {
          throw new Error('Portföy verileri yüklenemedi');
        }
        const data = await response.json();
        setProperties(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Filtreleme fonksiyonu
  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (property.description?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
                         property.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.district.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || property.propertyType === selectedType;
    const matchesLocation = selectedLocation === "all" || 
                           property.city.includes(selectedLocation) || 
                           property.district.includes(selectedLocation);
    
    return matchesSearch && matchesType && matchesLocation;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const PropertyCard = ({ property }: { property: Property }) => (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
      <div className="aspect-video bg-gradient-to-br from-green-100 to-emerald-100 relative overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
          <Trees className="h-16 w-16 text-green-600" />
        </div>
        <div className="absolute top-3 right-3 flex space-x-2">
          <Button size="sm" variant="secondary" className="rounded-full w-8 h-8 p-0">
            <Heart className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="secondary" className="rounded-full w-8 h-8 p-0">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
        <div className="absolute bottom-3 left-3">
          <Badge className="bg-green-600 text-white">
            {property.status === 'SATISTA' ? 'Satışta' : 
             property.status === 'REZERVE' ? 'Rezerve' : 
             property.status === 'SATILDI' ? 'Satıldı' : 'Beklemede'}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="text-green-700 border-green-300">
            {property.propertyType}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {property.zoningStatus || 'Belirtilmemiş'}
          </Badge>
        </div>
        
        {/* İmar Detayları */}
        {(property.maxFloors || property.kaks || property.gabari) && (
          <div className="flex flex-wrap gap-1 mb-2">
            {property.maxFloors && (
              <Badge variant="outline" className="text-xs">
                {property.maxFloors} Kat
              </Badge>
            )}
            {property.kaks && (
              <Badge variant="outline" className="text-xs">
                KAKS: {property.kaks}
              </Badge>
            )}
            {property.gabari && (
              <Badge variant="outline" className="text-xs">
                Hmaks: {property.gabari}m
              </Badge>
            )}
          </div>
        )}
        
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
          {property.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {property.description || 'Açıklama bulunmuyor'}
        </p>
        
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          {property.city}, {property.district}
          {property.neighborhood && `, ${property.neighborhood}`}
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-600">
            <Square className="h-4 w-4 inline mr-1" />
            {property.netArea.toLocaleString('tr-TR')} m²
          </span>
          <div className="flex items-center text-sm text-gray-500">
            <Eye className="h-4 w-4 mr-1" />
            {Math.floor(Math.random() * 200) + 50}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {property.hasElectricity && (
            <Badge variant="secondary" className="text-xs">
              <Zap className="h-3 w-3 mr-1" /> Elektrik
            </Badge>
          )}
          {property.hasWater && (
            <Badge variant="secondary" className="text-xs">
              <Droplet className="h-3 w-3 mr-1" /> Su
            </Badge>
          )}
          {property.hasGas && (
            <Badge variant="secondary" className="text-xs">
              <Flame className="h-3 w-3 mr-1" /> Doğalgaz
            </Badge>
          )}
          {property.hasSewerage && (
            <Badge variant="secondary" className="text-xs">
              <Waves className="h-3 w-3 mr-1" /> Kanalizasyon
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(property.priceTL)}
            </div>
            {property.priceUSD && (
              <div className="text-sm text-gray-500">
                ${property.priceUSD.toLocaleString()}
              </div>
            )}
          </div>
          <Button size="sm" className="bg-green-600 hover:bg-green-700">
            <Phone className="h-4 w-4 mr-1" />
            Ara
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Trees className="h-8 w-8 text-green-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">ArsaRazi</h1>
              <span className="ml-2 text-sm text-gray-500">Balıkesir'in En İyi Arsa ve Arazi Seçenekleri</span>
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
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              Balıkesir'in En Uygun Arsa ve Arazileri
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Edremit'ten Bandırma'ya, Ayvalık'tan Gönen'e kadar Balıkesir'in tüm ilçelerinde 
              yatırıma uygun arsa ve arazi seçenekleri. ArsaRazi ile hayalinizdeki yatırımı bulun.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-4xl mx-auto bg-white rounded-lg p-4 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Arsa veya arazi ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tür Seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tümü</SelectItem>
                    <SelectItem value="Arsa">Arsa</SelectItem>
                    <SelectItem value="Arazi">Arazi</SelectItem>
                    <SelectItem value="Daire">Daire</SelectItem>
                    <SelectItem value="Villa">Villa</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="İlçe Seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tümü</SelectItem>
                    <SelectItem value="Edremit">Edremit</SelectItem>
                    <SelectItem value="Ayvalık">Ayvalık</SelectItem>
                    <SelectItem value="Bandırma">Bandırma</SelectItem>
                    <SelectItem value="Gönen">Gönen</SelectItem>
                    <SelectItem value="İvrindi">İvrindi</SelectItem>
                    <SelectItem value="Susurluk">Susurluk</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Search className="h-4 w-4 mr-2" />
                  Ara
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Properties Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Balıkesir Arsa ve Arazileri
            </h2>
            <p className="text-gray-600">
              {loading ? 'Yükleniyor...' : `${filteredProperties.length} adet arsa ve arazi bulundu`}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-green-600" />
            <span className="ml-2 text-gray-600">Portföy yükleniyor...</span>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <Trees className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Hata oluştu
            </h3>
            <p className="text-gray-600">{error}</p>
          </div>
        ) : (
          <>
            <div className={viewMode === "grid" 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
            }>
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
            
            {filteredProperties.length === 0 && (
              <div className="text-center py-12">
                <Trees className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Aradığınız kriterlere uygun arsa bulunamadı
                </h3>
                <p className="text-gray-600">
                  Farklı arama kriterleri deneyebilir veya bizimle iletişime geçebilirsiniz.
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Features */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Neden ArsaRazi?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Balıkesir'in en güvenilir arsa ve arazi danışmanlık şirketi olarak 
              size en uygun yatırım fırsatlarını sunuyoruz.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6 border-green-200">
              <div className="flex justify-center mb-4">
                <MapPin className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Balıkesir Uzmanı</h3>
              <p className="text-gray-600">
                Balıkesir'in tüm ilçelerinde uzman kadromuzla hizmet veriyoruz.
              </p>
            </Card>
            
            <Card className="text-center p-6 border-green-200">
              <div className="flex justify-center mb-4">
                <Star className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Güvenilir Hizmet</h3>
              <p className="text-gray-600">
                10+ yıllık deneyimimizle güvenilir ve kaliteli hizmet sunuyoruz.
              </p>
            </Card>
            
            <Card className="text-center p-6 border-green-200">
              <div className="flex justify-center mb-4">
                <Phone className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">7/24 Destek</h3>
              <p className="text-gray-600">
                Müşterilerimiz için 7/24 danışmanlık ve destek hizmeti.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Trees className="h-8 w-8 text-green-400 mr-3" />
                <h3 className="text-xl font-semibold">ArsaRazi</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Balıkesir'in en güvenilir arsa ve arazi danışmanlık şirketi.
              </p>
              <div className="flex space-x-4">
                <Button variant="outline" size="sm">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Hizmetlerimiz</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Arsa Satışı</li>
                <li>Arazi Satışı</li>
                <li>Danışmanlık</li>
                <li>Değerleme</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">İlçelerimiz</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Edremit</li>
                <li>Ayvalık</li>
                <li>Bandırma</li>
                <li>Gönen</li>
                <li>İvrindi</li>
                <li>Susurluk</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">İletişim</h4>
              <div className="space-y-2 text-gray-400">
                <p>+90 266 123 4567</p>
                <p>info@arsarazi.com</p>
                <p>Balıkesir Merkez</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ArsaRazi. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
