"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bell,
  CheckCircle,
  AlertCircle,
  Info,
  XCircle,
  Trash2,
  Settings,
  Filter,
  Search
} from "lucide-react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

const mockNotifications = [
  {
    id: "1",
    title: "Yeni Müşteri Kaydı",
    message: "Ayşe Kaya adlı yeni müşteri sisteme kayıt oldu.",
    type: "INFO",
    category: "CUSTOMER",
    isRead: false,
    timestamp: "2024-08-19T10:30:00Z",
    action: "Müşteri profilini görüntüle"
  },
  {
    id: "2",
    title: "Satış Tamamlandı",
    message: "İstanbul Beylikdüzü Arsa satışı başarıyla tamamlandı.",
    type: "SUCCESS",
    category: "SALE",
    isRead: false,
    timestamp: "2024-08-19T09:15:00Z",
    action: "Satış detaylarını görüntüle"
  },
  {
    id: "3",
    title: "Belge Süresi Doluyor",
    message: "Ankara Çankaya Arazi vekaletnamesi 5 gün içinde sona erecek.",
    type: "WARNING",
    category: "DOCUMENT",
    isRead: true,
    timestamp: "2024-08-18T16:45:00Z",
    action: "Belgeyi yenile"
  },
  {
    id: "4",
    title: "Sistem Güncellemesi",
    message: "Yeni özellikler eklendi. Değişiklikleri görmek için tıklayın.",
    type: "INFO",
    category: "SYSTEM",
    isRead: true,
    timestamp: "2024-08-18T14:20:00Z",
    action: "Güncellemeleri görüntüle"
  },
  {
    id: "5",
    title: "Yeni Emlak Eklendi",
    message: "İzmir Karşıyaka Arsa portföye eklendi.",
    type: "SUCCESS",
    category: "PROPERTY",
    isRead: true,
    timestamp: "2024-08-18T11:30:00Z",
    action: "Emlak detaylarını görüntüle"
  }
];

const notificationTypes = {
  "SUCCESS": { label: "Başarılı", color: "bg-green-500", icon: CheckCircle },
  "WARNING": { label: "Uyarı", color: "bg-yellow-500", icon: AlertCircle },
  "ERROR": { label: "Hata", color: "bg-red-500", icon: XCircle },
  "INFO": { label: "Bilgi", color: "bg-blue-500", icon: Info }
};

const notificationCategories = {
  "CUSTOMER": "Müşteri",
  "SALE": "Satış",
  "DOCUMENT": "Belge",
  "PROPERTY": "Emlak",
  "SYSTEM": "Sistem"
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showRead, setShowRead] = useState(true);

  const filteredNotifications = notifications.filter(notification => {
    const matchesType = selectedType === "all" || notification.type === selectedType;
    const matchesCategory = selectedCategory === "all" || notification.category === selectedCategory;
    const matchesRead = showRead || !notification.isRead;
    
    return matchesType && matchesCategory && matchesRead;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, isRead: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - notificationTime.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Az önce";
    if (diffInMinutes < 60) return `${diffInMinutes} dakika önce`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} saat önce`;
    return `${Math.floor(diffInMinutes / 1440)} gün önce`;
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-lime-50 to-green-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-br from-lime-50 to-green-50 p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Bildirimler</h1>
                <p className="text-gray-600 mt-2">Sistem bildirimlerinizi yönetin</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" onClick={markAllAsRead}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Tümünü Okundu İşaretle
                </Button>
                <Button variant="outline" onClick={clearAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Tümünü Temizle
                </Button>
              </div>
            </div>
          </div>

          {/* İstatistik Kartları */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Toplam Bildirim</CardTitle>
                <Bell className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{notifications.length}</div>
                <p className="text-xs text-muted-foreground">
                  Tüm bildirimler
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Okunmamış</CardTitle>
                <AlertCircle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{unreadCount}</div>
                <p className="text-xs text-muted-foreground">
                  Yeni bildirimler
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bugün</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">3</div>
                <p className="text-xs text-muted-foreground">
                  Bugün gelen
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bu Hafta</CardTitle>
                <Bell className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">12</div>
                <p className="text-xs text-muted-foreground">
                  Bu hafta gelen
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Filtreler */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Tür:</span>
                  <select 
                    value={selectedType} 
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="px-3 py-1 border rounded-md text-sm"
                  >
                    <option value="all">Tüm Türler</option>
                    <option value="SUCCESS">Başarılı</option>
                    <option value="WARNING">Uyarı</option>
                    <option value="ERROR">Hata</option>
                    <option value="INFO">Bilgi</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Kategori:</span>
                  <select 
                    value={selectedCategory} 
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-1 border rounded-md text-sm"
                  >
                    <option value="all">Tüm Kategoriler</option>
                    <option value="CUSTOMER">Müşteri</option>
                    <option value="SALE">Satış</option>
                    <option value="DOCUMENT">Belge</option>
                    <option value="PROPERTY">Emlak</option>
                    <option value="SYSTEM">Sistem</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="showRead"
                    checked={showRead}
                    onChange={(e) => setShowRead(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="showRead" className="text-sm">Okunmuş bildirimleri göster</label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bildirim Listesi */}
          <Card>
            <CardHeader>
              <CardTitle>Bildirimler</CardTitle>
              <CardDescription>
                {filteredNotifications.length} bildirim bulundu
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredNotifications.length === 0 ? (
                  <div className="text-center py-8">
                    <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Bildirim bulunamadı</p>
                  </div>
                ) : (
                  filteredNotifications.map((notification) => {
                    const typeConfig = notificationTypes[notification.type as keyof typeof notificationTypes];
                    const Icon = typeConfig.icon;
                    
                    return (
                      <div 
                        key={notification.id} 
                        className={`p-4 border rounded-lg transition-colors ${
                          notification.isRead ? 'bg-white' : 'bg-blue-50 border-blue-200'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3 flex-1">
                            <div className={`p-2 rounded-full ${typeConfig.color} text-white`}>
                              <Icon className="h-4 w-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <h3 className="font-medium">{notification.title}</h3>
                                {!notification.isRead && (
                                  <Badge className="bg-blue-500 text-white text-xs">Yeni</Badge>
                                )}
                                <Badge variant="outline" className="text-xs">
                                  {notificationCategories[notification.category as keyof typeof notificationCategories]}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-500">
                                  {getTimeAgo(notification.timestamp)}
                                </span>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => markAsRead(notification.id)}
                                  disabled={notification.isRead}
                                >
                                  {notification.isRead ? 'Okundu' : 'Okundu İşaretle'}
                                </Button>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              {notification.action}
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => deleteNotification(notification.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
