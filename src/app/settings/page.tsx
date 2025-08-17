"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { 
  Settings,
  User,
  Bell,
  Shield,
  Database,
  Palette,
  Globe,
  Mail,
  Phone,
  MapPin,
  Save,
  Trash2
} from "lucide-react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    companyName: "Gayrimenkul CRM",
    email: "info@gayrimenkulcrm.com",
    phone: "+90 212 555 0123",
    address: "İstanbul, Türkiye",
    website: "https://gayrimenkulcrm.com",
    timezone: "Europe/Istanbul",
    language: "tr",
    currency: "TRY",
    notifications: {
      email: true,
      sms: false,
      push: true
    },
    theme: "light"
  });

  const tabs = [
    { id: "profile", label: "Profil", icon: User },
    { id: "notifications", label: "Bildirimler", icon: Bell },
    { id: "security", label: "Güvenlik", icon: Shield },
    { id: "appearance", label: "Görünüm", icon: Palette },
    { id: "system", label: "Sistem", icon: Settings }
  ];

  const handleSave = () => {
    console.log("Ayarlar kaydedildi:", formData);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-br from-slate-50 to-gray-50 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Ayarlar</h1>
            <p className="text-gray-600 mt-2">Sistem ayarlarınızı yönetin</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sol Menü */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-4">
                  <nav className="space-y-2">
                    {tabs.map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                            activeTab === tab.id
                              ? "bg-blue-50 text-blue-700 border border-blue-200"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          <span className="text-sm font-medium">{tab.label}</span>
                        </button>
                      );
                    })}
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Sağ İçerik */}
            <div className="lg:col-span-3">
              {activeTab === "profile" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Şirket Profili</CardTitle>
                    <CardDescription>
                      Şirket bilgilerinizi güncelleyin
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="companyName">Şirket Adı</Label>
                        <Input
                          id="companyName"
                          value={formData.companyName}
                          onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">E-posta</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefon</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">Web Sitesi</Label>
                        <Input
                          id="website"
                          value={formData.website}
                          onChange={(e) => setFormData({...formData, website: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Adres</Label>
                      <Textarea
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        rows={3}
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={handleSave}>
                        <Save className="h-4 w-4 mr-2" />
                        Kaydet
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === "notifications" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Bildirim Ayarları</CardTitle>
                    <CardDescription>
                      Bildirim tercihlerinizi yönetin
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>E-posta Bildirimleri</Label>
                          <p className="text-sm text-gray-500">
                            Önemli güncellemeler için e-posta alın
                          </p>
                        </div>
                        <Switch
                          checked={formData.notifications.email}
                          onCheckedChange={(checked) => 
                            setFormData({
                              ...formData, 
                              notifications: {...formData.notifications, email: checked}
                            })
                          }
                        />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>SMS Bildirimleri</Label>
                          <p className="text-sm text-gray-500">
                            Acil durumlar için SMS alın
                          </p>
                        </div>
                        <Switch
                          checked={formData.notifications.sms}
                          onCheckedChange={(checked) => 
                            setFormData({
                              ...formData, 
                              notifications: {...formData.notifications, sms: checked}
                            })
                          }
                        />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Push Bildirimleri</Label>
                          <p className="text-sm text-gray-500">
                            Tarayıcı push bildirimleri alın
                          </p>
                        </div>
                        <Switch
                          checked={formData.notifications.push}
                          onCheckedChange={(checked) => 
                            setFormData({
                              ...formData, 
                              notifications: {...formData.notifications, push: checked}
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={handleSave}>
                        <Save className="h-4 w-4 mr-2" />
                        Kaydet
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === "security" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Güvenlik Ayarları</CardTitle>
                    <CardDescription>
                      Hesap güvenliğinizi yönetin
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Mevcut Şifre</Label>
                        <Input id="currentPassword" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">Yeni Şifre</Label>
                        <Input id="newPassword" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Şifre Tekrar</Label>
                        <Input id="confirmPassword" type="password" />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={handleSave}>
                        <Save className="h-4 w-4 mr-2" />
                        Şifre Değiştir
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === "appearance" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Görünüm Ayarları</CardTitle>
                    <CardDescription>
                      Uygulama görünümünü özelleştirin
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="theme">Tema</Label>
                        <Select value={formData.theme} onValueChange={(value) => setFormData({...formData, theme: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Açık Tema</SelectItem>
                            <SelectItem value="dark">Koyu Tema</SelectItem>
                            <SelectItem value="auto">Otomatik</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="language">Dil</Label>
                        <Select value={formData.language} onValueChange={(value) => setFormData({...formData, language: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tr">Türkçe</SelectItem>
                            <SelectItem value="en">English</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={handleSave}>
                        <Save className="h-4 w-4 mr-2" />
                        Kaydet
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === "system" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Sistem Ayarları</CardTitle>
                    <CardDescription>
                      Sistem ve veritabanı ayarları
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Saat Dilimi</Label>
                        <Select value={formData.timezone} onValueChange={(value) => setFormData({...formData, timezone: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Europe/Istanbul">İstanbul (UTC+3)</SelectItem>
                            <SelectItem value="Europe/London">Londra (UTC+0)</SelectItem>
                            <SelectItem value="America/New_York">New York (UTC-5)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="currency">Para Birimi</Label>
                        <Select value={formData.currency} onValueChange={(value) => setFormData({...formData, currency: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="TRY">Türk Lirası (₺)</SelectItem>
                            <SelectItem value="USD">Amerikan Doları ($)</SelectItem>
                            <SelectItem value="EUR">Euro (€)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-medium">Veritabanı Yedekleme</h3>
                          <p className="text-sm text-gray-500">Son yedekleme: 2 saat önce</p>
                        </div>
                        <Button variant="outline">Yedekle</Button>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-medium">Sistem Güncellemeleri</h3>
                          <p className="text-sm text-gray-500">Güncel sürüm: v1.0.0</p>
                        </div>
                        <Button variant="outline">Kontrol Et</Button>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={handleSave}>
                        <Save className="h-4 w-4 mr-2" />
                        Kaydet
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
