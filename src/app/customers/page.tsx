"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  Star,
  Users,
  Building2,
  Save,
  X
} from "lucide-react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { useCustomers, Customer } from "@/hooks/use-api";


const customerTypeColors = {
  "ALICI": "bg-blue-100 text-blue-800",
  "SATICI": "bg-green-100 text-green-800", 
  "GAYRIMENKUL_DANISMANI": "bg-purple-100 text-purple-800"
};

const customerTypeLabels = {
  "ALICI": "Alıcı",
  "SATICI": "Satıcı",
  "GAYRIMENKUL_DANISMANI": "Gayrimenkul Danışmanı"
};

interface CustomerFormData {
  name: string;
  email: string;
  phone: string;
  type: 'ALICI' | 'SATICI' | 'GAYRIMENKUL_DANISMANI';
  address: string;
  city: string;
  district: string;
  notes: string;
  priorityScore: number;
  referredBy: string;
  isActive: boolean;
}

const initialFormData: CustomerFormData = {
  name: "",
  email: "",
  phone: "",
  type: "ALICI",
  address: "",
  city: "",
  district: "",
  notes: "",
  priorityScore: 0,
  referredBy: "",
  isActive: true,
};

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("list");
  const [formData, setFormData] = useState<CustomerFormData>(initialFormData);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // API hook
  const { customers, loading, error, createCustomer, updateCustomer, deleteCustomer } = useCustomers({
    search: searchQuery || undefined,
  });

  const getPriorityColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const handleAddCustomer = async () => {
    setIsSubmitting(true);
    setFormError("");

    try {
      await createCustomer(formData);
      setIsAddDialogOpen(false);
      setFormData(initialFormData);
    } catch (err: any) {
      setFormError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditCustomer = async () => {
    if (!selectedCustomer) return;

    setIsSubmitting(true);
    setFormError("");

    try {
      await updateCustomer(selectedCustomer.id, formData);
      setIsEditDialogOpen(false);
      setSelectedCustomer(null);
      setFormData(initialFormData);
    } catch (err: any) {
      setFormError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCustomer = async (customerId: string) => {
    if (confirm("Bu müşteriyi silmek istediğinizden emin misiniz?")) {
      try {
        await deleteCustomer(customerId);
      } catch (err: any) {
        alert("Müşteri silinirken hata oluştu: " + err.message);
      }
    }
  };

  const openEditDialog = (customer: Customer) => {
    setSelectedCustomer(customer);
    setFormData({
      name: customer.name,
      email: customer.email || "",
      phone: customer.phone || "",
      type: customer.type,
      address: customer.address || "",
      city: customer.city || "",
      district: customer.district || "",
      notes: customer.notes || "",
      priorityScore: customer.priorityScore,
      referredBy: customer.referredBy || "",
      isActive: customer.isActive,
    });
    setIsEditDialogOpen(true);
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setFormError("");
    setSelectedCustomer(null);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-50 to-violet-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-br from-purple-50 to-violet-50 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Müşteri Yönetimi</h1>
            <p className="text-gray-600 mt-2">Müşteri portföyünüzü yönetin ve takip edin</p>
          </div>

          {/* İstatistik Kartları */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Toplam Müşteri</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <>
                    <div className="text-2xl font-bold">{customers.length}</div>
                    <p className="text-xs text-muted-foreground">
                      {customers.filter(c => c.isActive).length} aktif müşteri
                    </p>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Alıcılar</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <>
                    <div className="text-2xl font-bold">
                      {customers.filter(c => c.type === "ALICI").length}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Alıcı müşteriler
                    </p>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Satıcılar</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <>
                    <div className="text-2xl font-bold">
                      {customers.filter(c => c.type === "SATICI").length}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Satıcı müşteriler
                    </p>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Danışmanlar</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <>
                    <div className="text-2xl font-bold">
                      {customers.filter(c => c.type === "GAYRIMENKUL_DANISMANI").length}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Gayrimenkul danışmanları
                    </p>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Müşteri Listesi */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Müşteri Listesi</CardTitle>
                  <CardDescription>Tüm müşterilerinizi görüntüleyin ve yönetin</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Müşteri ara..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
                    setIsAddDialogOpen(open);
                    if (!open) resetForm();
                  }}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Yeni Müşteri
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Yeni Müşteri Ekle</DialogTitle>
                        <DialogDescription>
                          Yeni bir müşteri eklemek için bilgileri doldurun.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        {formError && (
                          <Alert variant="destructive">
                            <AlertDescription>{formError}</AlertDescription>
                          </Alert>
                        )}
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Ad Soyad *</Label>
                            <Input
                              id="name"
                              value={formData.name}
                              onChange={(e) => setFormData({...formData, name: e.target.value})}
                              placeholder="Müşteri adı"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="type">Müşteri Türü *</Label>
                            <Select value={formData.type} onValueChange={(value: any) => setFormData({...formData, type: value})}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="ALICI">Alıcı</SelectItem>
                                <SelectItem value="SATICI">Satıcı</SelectItem>
                                <SelectItem value="GAYRIMENKUL_DANISMANI">Gayrimenkul Danışmanı</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="email">E-posta</Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({...formData, email: e.target.value})}
                              placeholder="ornek@email.com"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Telefon</Label>
                            <Input
                              id="phone"
                              value={formData.phone}
                              onChange={(e) => setFormData({...formData, phone: e.target.value})}
                              placeholder="+90 555 123 4567"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city">İl</Label>
                            <Input
                              id="city"
                              value={formData.city}
                              onChange={(e) => setFormData({...formData, city: e.target.value})}
                              placeholder="İstanbul"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="district">İlçe</Label>
                            <Input
                              id="district"
                              value={formData.district}
                              onChange={(e) => setFormData({...formData, district: e.target.value})}
                              placeholder="Beşiktaş"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="address">Adres</Label>
                          <Input
                            id="address"
                            value={formData.address}
                            onChange={(e) => setFormData({...formData, address: e.target.value})}
                            placeholder="Tam adres"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="priorityScore">Öncelik Skoru</Label>
                            <Input
                              id="priorityScore"
                              type="number"
                              min="0"
                              max="100"
                              value={formData.priorityScore}
                              onChange={(e) => setFormData({...formData, priorityScore: parseInt(e.target.value) || 0})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="referredBy">Referans</Label>
                            <Input
                              id="referredBy"
                              value={formData.referredBy}
                              onChange={(e) => setFormData({...formData, referredBy: e.target.value})}
                              placeholder="Referans veren kişi"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="notes">Notlar</Label>
                          <Textarea
                            id="notes"
                            value={formData.notes}
                            onChange={(e) => setFormData({...formData, notes: e.target.value})}
                            placeholder="Müşteri hakkında notlar"
                            rows={3}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                          <X className="h-4 w-4 mr-2" />
                          İptal
                        </Button>
                        <Button onClick={handleAddCustomer} disabled={isSubmitting}>
                          <Save className="h-4 w-4 mr-2" />
                          {isSubmitting ? "Kaydediliyor..." : "Kaydet"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <p className="text-red-600">Hata: {error}</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Müşteri</TableHead>
                      <TableHead>İletişim</TableHead>
                      <TableHead>Tür</TableHead>
                      <TableHead>Konum</TableHead>
                      <TableHead>Öncelik</TableHead>
                      <TableHead>Durum</TableHead>
                      <TableHead>İşlemler</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{customer.name}</div>
                            <div className="text-sm text-gray-500">
                              {customer.referredBy && `Referans: ${customer.referredBy}`}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center text-sm">
                              <Phone className="h-3 w-3 mr-1" />
                              {customer.phone}
                            </div>
                            {customer.email && (
                              <div className="flex items-center text-sm">
                                <Mail className="h-3 w-3 mr-1" />
                                {customer.email}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={customerTypeColors[customer.type]}>
                            {customerTypeLabels[customer.type]}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-sm">
                            <MapPin className="h-3 w-3 mr-1" />
                            {customer.city}, {customer.district}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 mr-1" />
                            <span className={`font-medium ${getPriorityColor(customer.priorityScore)}`}>
                              {customer.priorityScore}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={customer.isActive ? "default" : "secondary"}>
                            {customer.isActive ? "Aktif" : "Pasif"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => openEditDialog(customer)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDeleteCustomer(customer.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          {/* Edit Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={(open) => {
            setIsEditDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Müşteri Düzenle</DialogTitle>
                <DialogDescription>
                  Müşteri bilgilerini güncelleyin.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {formError && (
                  <Alert variant="destructive">
                    <AlertDescription>{formError}</AlertDescription>
                  </Alert>
                )}
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Ad Soyad *</Label>
                    <Input
                      id="edit-name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Müşteri adı"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-type">Müşteri Türü *</Label>
                    <Select value={formData.type} onValueChange={(value: any) => setFormData({...formData, type: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ALICI">Alıcı</SelectItem>
                        <SelectItem value="SATICI">Satıcı</SelectItem>
                        <SelectItem value="GAYRIMENKUL_DANISMANI">Gayrimenkul Danışmanı</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-email">E-posta</Label>
                    <Input
                      id="edit-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="ornek@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-phone">Telefon</Label>
                    <Input
                      id="edit-phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+90 555 123 4567"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-city">İl</Label>
                    <Input
                      id="edit-city"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      placeholder="İstanbul"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-district">İlçe</Label>
                    <Input
                      id="edit-district"
                      value={formData.district}
                      onChange={(e) => setFormData({...formData, district: e.target.value})}
                      placeholder="Beşiktaş"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-address">Adres</Label>
                  <Input
                    id="edit-address"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    placeholder="Tam adres"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-priorityScore">Öncelik Skoru</Label>
                    <Input
                      id="edit-priorityScore"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.priorityScore}
                      onChange={(e) => setFormData({...formData, priorityScore: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-referredBy">Referans</Label>
                    <Input
                      id="edit-referredBy"
                      value={formData.referredBy}
                      onChange={(e) => setFormData({...formData, referredBy: e.target.value})}
                      placeholder="Referans veren kişi"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-notes">Notlar</Label>
                  <Textarea
                    id="edit-notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    placeholder="Müşteri hakkında notlar"
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  <X className="h-4 w-4 mr-2" />
                  İptal
                </Button>
                <Button onClick={handleEditCustomer} disabled={isSubmitting}>
                  <Save className="h-4 w-4 mr-2" />
                  {isSubmitting ? "Güncelleniyor..." : "Güncelle"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
}