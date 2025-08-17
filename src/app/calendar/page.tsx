"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Calendar,
  Plus,
  Clock,
  MapPin,
  User,
  Building2,
  Phone,
  Mail,
  AlertCircle,
  CheckCircle,
  XCircle
} from "lucide-react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

const mockEvents = [
  {
    id: "1",
    title: "İstanbul Beylikdüzü Arsa Görüşmesi",
    type: "GORUSME",
    date: "2024-08-20",
    time: "14:00",
    duration: 60,
    customer: "Ayşe Kaya",
    property: "İstanbul Beylikdüzü Arsa",
    location: "Ofis",
    status: "PLANLANDI",
    notes: "Müşteri arsa hakkında detaylı bilgi almak istiyor."
  },
  {
    id: "2",
    title: "Ankara Çankaya Arazi Satış İmzası",
    type: "SATIS",
    date: "2024-08-22",
    time: "10:00",
    duration: 120,
    customer: "Mehmet Demir",
    property: "Ankara Çankaya Arazi",
    location: "Noter",
    status: "TAMAMLANDI",
    notes: "Satış sözleşmesi imzalanacak."
  },
  {
    id: "3",
    title: "İzmir Karşıyaka Arsa Keşif",
    type: "KESIF",
    date: "2024-08-25",
    time: "16:00",
    duration: 90,
    customer: "Mustafa Öztürk",
    property: "İzmir Karşıyaka Arsa",
    location: "Arsa Lokasyonu",
    status: "PLANLANDI",
    notes: "Müşteri ile birlikte arsa keşfi yapılacak."
  }
];

const eventTypes = {
  "GORUSME": { label: "Görüşme", color: "bg-blue-500" },
  "SATIS": { label: "Satış", color: "bg-green-500" },
  "KESIF": { label: "Keşif", color: "bg-purple-500" },
  "TOPLANTI": { label: "Toplantı", color: "bg-orange-500" },
  "DIGER": { label: "Diğer", color: "bg-gray-500" }
};

const eventStatus = {
  "PLANLANDI": { label: "Planlandı", color: "bg-yellow-500" },
  "TAMAMLANDI": { label: "Tamamlandı", color: "bg-green-500" },
  "IPTAL": { label: "İptal", color: "bg-red-500" }
};

export default function CalendarPage() {
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    date: "",
    time: "",
    duration: 60,
    customer: "",
    property: "",
    location: "",
    notes: ""
  });

  const today = new Date();
  const currentDate = today.toLocaleDateString('tr-TR', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const upcomingEvents = mockEvents.filter(event => 
    new Date(event.date) >= today
  ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const handleAddEvent = () => {
    // Etkinlik ekleme işlemi
    setIsAddEventOpen(false);
    setFormData({
      title: "",
      type: "",
      date: "",
      time: "",
      duration: 60,
      customer: "",
      property: "",
      location: "",
      notes: ""
    });
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case "GORUSME":
        return <User className="h-4 w-4" />;
      case "SATIS":
        return <Building2 className="h-4 w-4" />;
      case "KESIF":
        return <MapPin className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-teal-50 to-cyan-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-br from-teal-50 to-cyan-50 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Takvim</h1>
            <p className="text-gray-600 mt-2">Etkinliklerinizi planlayın ve takip edin</p>
          </div>

          {/* Bugünün Özeti */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bugün</CardTitle>
                <Calendar className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{currentDate}</div>
                <p className="text-xs text-muted-foreground">
                  {upcomingEvents.filter(e => e.date === today.toISOString().split('T')[0]).length} etkinlik
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bu Hafta</CardTitle>
                <Clock className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">8</div>
                <p className="text-xs text-muted-foreground">
                  Planlanan etkinlik
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bu Ay</CardTitle>
                <Calendar className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">32</div>
                <p className="text-xs text-muted-foreground">
                  Toplam etkinlik
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tamamlanan</CardTitle>
                <CheckCircle className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">24</div>
                <p className="text-xs text-muted-foreground">
                  Bu ay tamamlanan
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Takvim ve Etkinlikler */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Takvim */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Ağustos 2024</CardTitle>
                      <CardDescription>Etkinlik takviminiz</CardDescription>
                    </div>
                    <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          Etkinlik Ekle
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Yeni Etkinlik Ekle</DialogTitle>
                          <DialogDescription>
                            Yeni bir etkinlik planlamak için bilgileri doldurun.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="title">Etkinlik Başlığı *</Label>
                              <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                                placeholder="Etkinlik başlığı"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="type">Etkinlik Türü *</Label>
                              <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="GORUSME">Görüşme</SelectItem>
                                  <SelectItem value="SATIS">Satış</SelectItem>
                                  <SelectItem value="KESIF">Keşif</SelectItem>
                                  <SelectItem value="TOPLANTI">Toplantı</SelectItem>
                                  <SelectItem value="DIGER">Diğer</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="date">Tarih *</Label>
                              <Input
                                id="date"
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({...formData, date: e.target.value})}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="time">Saat *</Label>
                              <Input
                                id="time"
                                type="time"
                                value={formData.time}
                                onChange={(e) => setFormData({...formData, time: e.target.value})}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="duration">Süre (dk)</Label>
                              <Input
                                id="duration"
                                type="number"
                                value={formData.duration}
                                onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value) || 60})}
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="customer">Müşteri</Label>
                              <Input
                                id="customer"
                                value={formData.customer}
                                onChange={(e) => setFormData({...formData, customer: e.target.value})}
                                placeholder="Müşteri adı"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="property">Emlak</Label>
                              <Input
                                id="property"
                                value={formData.property}
                                onChange={(e) => setFormData({...formData, property: e.target.value})}
                                placeholder="Emlak adı"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="location">Konum</Label>
                            <Input
                              id="location"
                              value={formData.location}
                              onChange={(e) => setFormData({...formData, location: e.target.value})}
                              placeholder="Etkinlik konumu"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="notes">Notlar</Label>
                            <Textarea
                              id="notes"
                              value={formData.notes}
                              onChange={(e) => setFormData({...formData, notes: e.target.value})}
                              placeholder="Etkinlik notları"
                              rows={3}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsAddEventOpen(false)}>
                            İptal
                          </Button>
                          <Button onClick={handleAddEvent}>
                            Kaydet
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">Takvim görünümü</p>
                      <p className="text-sm text-gray-400">Calendar component entegrasyonu</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Yaklaşan Etkinlikler */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Yaklaşan Etkinlikler</CardTitle>
                  <CardDescription>Önümüzdeki etkinlikleriniz</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingEvents.slice(0, 5).map((event) => (
                      <div key={event.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {getEventIcon(event.type)}
                            <h3 className="font-medium text-sm">{event.title}</h3>
                          </div>
                          <Badge className={eventStatus[event.status as keyof typeof eventStatus].color}>
                            {eventStatus[event.status as keyof typeof eventStatus].label}
                          </Badge>
                        </div>
                        
                        <div className="space-y-1 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{new Date(event.date).toLocaleDateString('tr-TR')} - {event.time}</span>
                          </div>
                          {event.customer && (
                            <div className="flex items-center space-x-1">
                              <User className="h-3 w-3" />
                              <span>{event.customer}</span>
                            </div>
                          )}
                          {event.property && (
                            <div className="flex items-center space-x-1">
                              <Building2 className="h-3 w-3" />
                              <span>{event.property}</span>
                            </div>
                          )}
                          {event.location && (
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-3 w-3" />
                              <span>{event.location}</span>
                            </div>
                          )}
                        </div>

                        {event.notes && (
                          <p className="text-xs text-gray-600 mt-2">{event.notes}</p>
                        )}
                      </div>
                    ))}
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
