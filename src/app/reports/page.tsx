"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Download,
  Calendar,
  DollarSign,
  Building2,
  Users,
  FileText,
  PieChart,
  LineChart,
  Activity
} from "lucide-react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedReport, setSelectedReport] = useState("sales");

  return (
    <div className="flex h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-br from-orange-50 to-red-50 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Raporlar</h1>
            <p className="text-gray-600 mt-2">Satış, müşteri ve portföy analizlerinizi görüntüleyin</p>
          </div>

          {/* Filtreler */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Rapor Türü:</span>
                  <Select value={selectedReport} onValueChange={setSelectedReport}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sales">Satış Raporu</SelectItem>
                      <SelectItem value="customers">Müşteri Analizi</SelectItem>
                      <SelectItem value="properties">Portföy Analizi</SelectItem>
                      <SelectItem value="financial">Finansal Rapor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Dönem:</span>
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">Bu Hafta</SelectItem>
                      <SelectItem value="month">Bu Ay</SelectItem>
                      <SelectItem value="quarter">Bu Çeyrek</SelectItem>
                      <SelectItem value="year">Bu Yıl</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Rapor İndir
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Özet Kartları */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Toplam Satış</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">₺27.000.000</div>
                <p className="text-xs text-muted-foreground">
                  +12.5% geçen aya göre
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Satış Adedi</CardTitle>
                <Building2 className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">156</div>
                <p className="text-xs text-muted-foreground">
                  +8.2% geçen aya göre
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ortalama Fiyat</CardTitle>
                <DollarSign className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">₺173.077</div>
                <p className="text-xs text-muted-foreground">
                  +4.1% geçen aya göre
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Komisyon</CardTitle>
                <TrendingDown className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">₺810.000</div>
                <p className="text-xs text-muted-foreground">
                  -2.3% geçen aya göre
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Grafikler */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Satış Trendi</CardTitle>
                <CardDescription>Aylık satış performansı</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <LineChart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Satış trendi grafiği</p>
                    <p className="text-sm text-gray-400">Recharts entegrasyonu</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Emlak Türü Dağılımı</CardTitle>
                <CardDescription>Portföydeki emlak türleri</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Emlak türü dağılımı</p>
                    <p className="text-sm text-gray-400">Pie chart grafiği</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detaylı Raporlar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>En Çok Satan Emlaklar</CardTitle>
                <CardDescription>Bu ay en çok ilgi gören emlaklar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">İstanbul Beylikdüzü Arsa</p>
                      <p className="text-sm text-gray-500">₺8.500.000</p>
                    </div>
                    <Badge className="bg-green-500">Satıldı</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Ankara Çankaya Arazi</p>
                      <p className="text-sm text-gray-500">₺12.000.000</p>
                    </div>
                    <Badge className="bg-yellow-500">Rezerve</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">İzmir Karşıyaka Arsa</p>
                      <p className="text-sm text-gray-500">₺6.500.000</p>
                    </div>
                    <Badge className="bg-green-500">Satıldı</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Müşteri Aktivitesi</CardTitle>
                <CardDescription>Son müşteri etkileşimleri</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Ayşe Kaya</p>
                      <p className="text-xs text-gray-500">Yeni emlak görüntüledi</p>
                    </div>
                    <span className="text-xs text-gray-400">2 saat önce</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Mehmet Demir</p>
                      <p className="text-xs text-gray-500">Satış tamamlandı</p>
                    </div>
                    <span className="text-xs text-gray-400">1 gün önce</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Mustafa Öztürk</p>
                      <p className="text-xs text-gray-500">Rezervasyon yaptı</p>
                    </div>
                    <span className="text-xs text-gray-400">3 gün önce</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performans Metrikleri</CardTitle>
                <CardDescription>Kilit performans göstergeleri</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Satış Oranı</span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '85%'}}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Müşteri Memnuniyeti</span>
                    <span className="text-sm font-medium">92%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '92%'}}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Ortalama Satış Süresi</span>
                    <span className="text-sm font-medium">45 gün</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{width: '75%'}}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
