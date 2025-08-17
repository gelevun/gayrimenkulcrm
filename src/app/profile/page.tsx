"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building2,
  Award,
  Activity,
  Settings,
  Camera,
  Save,
  Edit,
  Shield,
  Bell
} from "lucide-react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

const mockUser = {
  id: "1",
  name: "Ahmet Yılmaz",
  email: "ahmet.yilmaz@gayrimenkulcrm.com",
  phone: "+90 532 123 4567",
  position: "Gayrimenkul Danışmanı",
  department: "Satış Departmanı",
  avatar: "/avatars/ahmet.jpg",
  joinDate: "2023-01-15",
  address: "İstanbul, Türkiye",
  bio: "10+ yıllık gayrimenkul deneyimi ile müşterilerimize en iyi hizmeti sunuyorum.",
  stats: {
    totalSales: 156,
    totalRevenue: "₺27.000.000",
    customerCount: 234,
    successRate: "92%"
  },
  skills: ["Satış Teknikleri", "Müşteri İlişkileri", "Pazarlama", "Analiz"],
  achievements: [
    "2024 Yılın Satış Danışmanı",
    "En Çok Satış Yapan Danışman (2023)",
    "Müşteri Memnuniyeti Ödülü"
  ]
};

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: mockUser.name,
    email: mockUser.email,
    phone: mockUser.phone,
    address: mockUser.address,
    bio: mockUser.bio
  });

  const handleSave = () => {
    console.log("Profil güncellendi:", formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: mockUser.name,
      email: mockUser.email,
      phone: mockUser.phone,
      address: mockUser.address,
      bio: mockUser.bio
    });
    setIsEditing(false);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-br from-indigo-50 to-blue-50 p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Profil</h1>
                <p className="text-gray-600 mt-2">Kişisel bilgilerinizi yönetin</p>
              </div>
              <div className="flex items-center space-x-2">
                {isEditing ? (
                  <>
                    <Button variant="outline" onClick={handleCancel}>
                      İptal
                    </Button>
                    <Button onClick={handleSave}>
                      <Save className="h-4 w-4 mr-2" />
                      Kaydet
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Düzenle
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sol Kolon - Profil Bilgileri */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profil Kartı */}
              <Card>
                <CardHeader>
                  <CardTitle>Kişisel Bilgiler</CardTitle>
                  <CardDescription>
                    Temel bilgilerinizi güncelleyin
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                        {mockUser.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <Button size="sm" className="absolute -bottom-1 -right-1 rounded-full w-8 h-8">
                        <Camera className="h-3 w-3" />
                      </Button>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{mockUser.name}</h3>
                      <p className="text-gray-600">{mockUser.position}</p>
                      <p className="text-sm text-gray-500">{mockUser.department}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Ad Soyad</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-posta</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Adres</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Hakkımda</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => setFormData({...formData, bio: e.target.value})}
                      disabled={!isEditing}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* İstatistikler */}
              <Card>
                <CardHeader>
                  <CardTitle>Performans İstatistikleri</CardTitle>
                  <CardDescription>
                    Bu yılki performansınız
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{mockUser.stats.totalSales}</div>
                      <p className="text-sm text-gray-600">Toplam Satış</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{mockUser.stats.totalRevenue}</div>
                      <p className="text-sm text-gray-600">Toplam Ciro</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{mockUser.stats.customerCount}</div>
                      <p className="text-sm text-gray-600">Müşteri Sayısı</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{mockUser.stats.successRate}</div>
                      <p className="text-sm text-gray-600">Başarı Oranı</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Yetenekler */}
              <Card>
                <CardHeader>
                  <CardTitle>Yetenekler</CardTitle>
                  <CardDescription>
                    Uzmanlık alanlarınız
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {mockUser.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Başarılar */}
              <Card>
                <CardHeader>
                  <CardTitle>Başarılar ve Ödüller</CardTitle>
                  <CardDescription>
                    Kariyerinizdeki önemli başarılar
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockUser.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Award className="h-5 w-5 text-yellow-500" />
                        <span className="text-sm">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sağ Kolon - Ek Bilgiler */}
            <div className="space-y-6">
              {/* Hızlı İstatistikler */}
              <Card>
                <CardHeader>
                  <CardTitle>Hızlı Bakış</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium">İşe Başlama</p>
                      <p className="text-xs text-gray-500">
                        {new Date(mockUser.joinDate).toLocaleDateString('tr-TR')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Building2 className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium">Departman</p>
                      <p className="text-xs text-gray-500">{mockUser.department}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <User className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium">Pozisyon</p>
                      <p className="text-xs text-gray-500">{mockUser.position}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Hızlı Erişim */}
              <Card>
                <CardHeader>
                  <CardTitle>Hızlı Erişim</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-2" />
                    Ayarlar
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Bell className="h-4 w-4 mr-2" />
                    Bildirimler
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Shield className="h-4 w-4 mr-2" />
                    Güvenlik
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Activity className="h-4 w-4 mr-2" />
                    Aktivite Geçmişi
                  </Button>
                </CardContent>
              </Card>

              {/* Son Aktiviteler */}
              <Card>
                <CardHeader>
                  <CardTitle>Son Aktiviteler</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">Yeni müşteri eklendi</p>
                      <p className="text-xs text-gray-500">2 saat önce</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">Satış tamamlandı</p>
                      <p className="text-xs text-gray-500">1 gün önce</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">Belge yüklendi</p>
                      <p className="text-xs text-gray-500">3 gün önce</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
