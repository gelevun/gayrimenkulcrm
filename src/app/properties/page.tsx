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
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  MapPin, 
  Home,
  Building2,
  Zap,
  Droplet,
  Flame,
  Waves,
  Car,
  Star,
  Filter,
  Grid,
  List,
  Calendar,
  DollarSign,
  FileText,
  Save,
  X,
  Upload
} from "lucide-react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { useProperties, Property, useCustomers } from "@/hooks/use-api";
import { useUpload } from "@/hooks/use-upload";
import { FileUpload } from "@/components/ui/file-upload";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { useAuth } from "@/contexts/auth-context";


const statusColors = {
  "SATISTA": "bg-green-500",
  "REZERVE": "bg-yellow-500",
  "SATILDI": "bg-red-500",
  "BEKLEMEDE": "bg-gray-500"
};

const statusLabels = {
  "SATISTA": "Satışta",
  "REZERVE": "Rezerve",
  "SATILDI": "Satıldı",
  "BEKLEMEDE": "Beklemede"
};

const propertyTypeLabels = {
  "Arsa": "Arsa",
  "Arazi": "Arazi",
  "Bina": "Bina",
  "Daire": "Daire",
  "Villa": "Villa"
};

const zoningStatusLabels = {
  "IMARLI": "İmarlı",
  "IMARSIZ": "İmarsız",
  "KISMEN_IMARLI": "Kısmen İmarlı"
};

interface PropertyFormData {
  title: string;
  description: string;
  propertyType: string;
  status: 'SATISTA' | 'REZERVE' | 'SATILDI' | 'BEKLEMEDE';
  city: string;
  district: string;
  neighborhood: string;
  address: string;
  netArea: number;
  grossArea: number;
  priceTL: number;
  priceUSD: number;
  priceEUR: number;
  zoningStatus: 'IMARLI' | 'IMARSIZ' | 'KISMEN_IMARLI';
  maxFloors: number;
  kaks: number;
  gabari: number;
  hasElectricity: boolean;
  hasWater: boolean;
  hasGas: boolean;
  hasSewerage: boolean;
  distanceToMainRoad: number;
  isPublished: boolean;
  publicTransportAccess: boolean;
  ownershipStatus: string;
  constructionPermit: boolean;
  parcelNumber: string;
  blockNumber: string;
  customerId: string;
}

const initialFormData: PropertyFormData = {
  title: "",
  description: "",
  propertyType: "Arsa",
  status: "BEKLEMEDE",
  city: "",
  district: "",
  neighborhood: "",
  address: "",
  netArea: 0,
  grossArea: 0,
  priceTL: 0,
  priceUSD: 0,
  priceEUR: 0,
  zoningStatus: "IMARLI",
  maxFloors: 0,
  kaks: 0,
  gabari: 0,
  hasElectricity: false,
  hasWater: false,
  hasGas: false,
  hasSewerage: false,
  distanceToMainRoad: 0,
  isPublished: false,
  publicTransportAccess: false,
  ownershipStatus: "",
  constructionPermit: false,
  parcelNumber: "",
  blockNumber: "",
  customerId: "",
};

function PropertiesContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState("cards");
  const [activeTab, setActiveTab] = useState("office");
  const [formData, setFormData] = useState<PropertyFormData>(initialFormData);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);

  // Auth context
  const { user, hasPermission } = useAuth();

  // API hooks
  const { properties, loading, error, createProperty, updateProperty, deleteProperty } = useProperties({
    search: searchQuery || undefined,
  });
  const { customers } = useCustomers();
  const { uploadFile, isUploading, uploadProgress, error: uploadError } = useUpload();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const officeProperties = properties.filter(p => !p.customerId);
  const customerProperties = properties.filter(p => p.customerId);

  // Yetki kontrolü
  const canReadProperties = hasPermission('properties:read');
  const canWriteProperties = hasPermission('properties:write');

  if (!canReadProperties) {
    return (
      <div className="flex h-screen bg-gradient-to-br from-green-50 to-emerald-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-br from-green-50 to-emerald-50 p-6">
            <div className="flex items-center justify-center h-full">
              <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <Building2 className="h-16 w-16 text-red-500" />
                  </div>
                  <CardTitle>Yetki Gerekli</CardTitle>
                  <CardDescription>
                    Bu sayfaya erişmek için gerekli yetkiye sahip değilsiniz.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="text-sm text-gray-500">
                    <p>Mevcut Rol: <span className="font-semibold">{user?.role}</span></p>
                    <p>Gerekli Yetki: <span className="font-semibold">properties:read</span></p>
                  </div>
                  <div className="flex space-x-2 justify-center">
                    <Button variant="outline" onClick={() => window.history.back()}>
                      Geri Dön
                    </Button>
                    <Button onClick={() => window.location.href = '/'}>
                      Ana Sayfa
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleAddProperty = async () => {
    setIsSubmitting(true);
    setFormError("");

    try {
      await createProperty(formData);
      setIsAddDialogOpen(false);
      setFormData(initialFormData);
    } catch (err: any) {
      setFormError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditProperty = async () => {
    if (!selectedProperty) return;

    setIsSubmitting(true);
    setFormError("");

    try {
      await updateProperty(selectedProperty.id, formData);
      setIsEditDialogOpen(false);
      setSelectedProperty(null);
      setFormData(initialFormData);
    } catch (err: any) {
      setFormError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProperty = async (propertyId: string) => {
    if (confirm("Bu emlağı silmek istediğinizden emin misiniz?")) {
      try {
        await deleteProperty(propertyId);
      } catch (err: any) {
        alert("Emlak silinirken hata oluştu: " + err.message);
      }
    }
  };

  const handleFileUpload = async (files: File[]) => {
    setUploadedFiles(prev => [...prev, ...files]);
    
    // Dosyaları yükle
    for (const file of files) {
      try {
        const result = await uploadFile(file, 'image', null);
        if (result) {
          console.log('Dosya yüklendi:', result);
        }
      } catch (error) {
        console.error('Dosya yükleme hatası:', error);
      }
    }
  };

  const handleFileRemove = (fileToRemove: File) => {
    setUploadedFiles(prev => prev.filter(file => file !== fileToRemove));
  };

  // Toplu seçim işlemleri
  const handleSelectProperty = (propertyId: string, checked: boolean) => {
    if (checked) {
      setSelectedProperties(prev => [...prev, propertyId]);
    } else {
      setSelectedProperties(prev => prev.filter(id => id !== propertyId));
    }
  };

  const handleBulkPublish = async () => {
    if (selectedProperties.length === 0) {
      alert("Lütfen yayınlanacak emlakları seçin");
      return;
    }

    try {
      setIsSubmitting(true);
      for (const propertyId of selectedProperties) {
        await updateProperty(propertyId, { 
          isPublished: true,
          status: 'SATISTA' // Yayınlanan emlakları otomatik olarak SATISTA yap
        });
      }
      setSelectedProperties([]);
      alert(`${selectedProperties.length} emlak başarıyla yayınlandı!`);
    } catch (error) {
      alert("Yayınlama işlemi sırasında hata oluştu");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEditDialog = (property: Property) => {
    setSelectedProperty(property);
    setFormData({
      title: property.title,
      description: property.description || "",
      propertyType: property.propertyType,
      status: property.status,
      city: property.city,
      district: property.district,
      neighborhood: property.neighborhood || "",
      address: property.address || "",
      netArea: property.netArea,
      grossArea: property.grossArea || 0,
      priceTL: property.priceTL,
      priceUSD: property.priceUSD || 0,
      priceEUR: property.priceEUR || 0,
      zoningStatus: property.zoningStatus || "IMARLI",
      maxFloors: property.maxFloors || 0,
      kaks: property.kaks || 0,
      gabari: property.gabari || 0,
      isPublished: property.isPublished || false,
      hasElectricity: property.hasElectricity,
      hasWater: property.hasWater,
      hasGas: property.hasGas,
      hasSewerage: property.hasSewerage,
      distanceToMainRoad: property.distanceToMainRoad || 0,
      publicTransportAccess: property.publicTransportAccess,
      ownershipStatus: property.ownershipStatus || "",
      constructionPermit: property.constructionPermit,
      parcelNumber: property.parcelNumber || "",
      blockNumber: property.blockNumber || "",
      customerId: property.customerId || "",
    });
    setIsEditDialogOpen(true);
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setFormError("");
    setSelectedProperty(null);
  };

  const PropertyCard = ({ property }: { property: Property }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video bg-gray-200 relative">
        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
          <Building2 className="h-16 w-16 text-gray-400" />
        </div>
        <div className="absolute top-2 right-2">
          <Badge className={`${statusColors[property.status]} text-white`}>
            {statusLabels[property.status]}
          </Badge>
        </div>
        <div className="absolute top-2 left-2">
          <Checkbox
            checked={selectedProperties.includes(property.id)}
            onCheckedChange={(checked) => handleSelectProperty(property.id, checked as boolean)}
            className="bg-white"
          />
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
          {property.title}
        </h3>
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          {property.city}, {property.district}
        </div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-600">
            {property.netArea.toLocaleString('tr-TR')} m²
          </span>
          <Badge variant="outline">{propertyTypeLabels[property.propertyType]}</Badge>
        </div>
        <div className="text-xl font-bold text-green-600 mb-3">
          {formatCurrency(property.priceTL)}
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
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" className="flex-1">
            Detaylar
          </Button>
          <Button 
            size="sm" 
            className="flex-1"
            onClick={() => openEditDialog(property)}
          >
            Düzenle
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-br from-green-50 to-emerald-50 p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Emlak Portföy Yönetimi</h1>
                <p className="text-gray-600 mt-2">Ofis ve müşteri portföylerinizi yönetin</p>
              </div>
              {selectedProperties.length > 0 && (
                <Button 
                  onClick={handleBulkPublish}
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Star className="h-4 w-4 mr-2" />
                  )}
                  {selectedProperties.length} Emlak Yayınla
                </Button>
              )}
            </div>
          </div>

          {/* İstatistik Kartları */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Toplam Emlak</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <>
                    <div className="text-2xl font-bold">{properties.length}</div>
                    <p className="text-xs text-muted-foreground">
                      {properties.filter(p => p.status === 'SATISTA').length} aktif portföy
                    </p>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ofis Portföyü</CardTitle>
                <Home className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <>
                    <div className="text-2xl font-bold">{officeProperties.length}</div>
                    <p className="text-xs text-muted-foreground">
                      Ofise ait emlaklar
                    </p>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Müşteri Portföyü</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <>
                    <div className="text-2xl font-bold">{customerProperties.length}</div>
                    <p className="text-xs text-muted-foreground">
                      Müşterilere ait emlaklar
                    </p>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Portföy Değeri</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <>
                    <div className="text-2xl font-bold">
                      {formatCurrency(properties.reduce((sum, p) => sum + p.priceTL, 0))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Toplam portföy değeri
                    </p>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Portföy Yönetimi */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Portföy Yönetimi</CardTitle>
                  <CardDescription>Ofis ve müşteri portföyleriniz</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Emlak ara..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant={viewMode === "cards" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("cards")}
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
                  {canWriteProperties && (
                    <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
                      setIsAddDialogOpen(open);
                      if (!open) resetForm();
                    }}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          Yeni Emlak
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Yeni Emlak Ekle</DialogTitle>
                          <DialogDescription>
                            Yeni bir emlak eklemek için bilgileri doldurun.
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
                              <Label htmlFor="title">Başlık *</Label>
                              <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                                placeholder="Emlak başlığı"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="propertyType">Emlak Türü *</Label>
                              <Select value={formData.propertyType} onValueChange={(value) => setFormData({...formData, propertyType: value})}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Arsa">Arsa</SelectItem>
                                  <SelectItem value="Arazi">Arazi</SelectItem>
                                  <SelectItem value="Bina">Bina</SelectItem>
                                  <SelectItem value="Daire">Daire</SelectItem>
                                  <SelectItem value="Villa">Villa</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="description">Açıklama</Label>
                            <Textarea
                              id="description"
                              value={formData.description}
                              onChange={(e) => setFormData({...formData, description: e.target.value})}
                              placeholder="Emlak açıklaması"
                              rows={3}
                            />
                          </div>

                          <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="city">İl *</Label>
                              <Input
                                id="city"
                                value={formData.city}
                                onChange={(e) => setFormData({...formData, city: e.target.value})}
                                placeholder="İstanbul"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="district">İlçe *</Label>
                              <Input
                                id="district"
                                value={formData.district}
                                onChange={(e) => setFormData({...formData, district: e.target.value})}
                                placeholder="Beşiktaş"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="neighborhood">Mahalle</Label>
                              <Input
                                id="neighborhood"
                                value={formData.neighborhood}
                                onChange={(e) => setFormData({...formData, neighborhood: e.target.value})}
                                placeholder="Mahalle"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="netArea">Net Alan (m²) *</Label>
                              <Input
                                id="netArea"
                                type="number"
                                value={formData.netArea}
                                onChange={(e) => setFormData({...formData, netArea: parseFloat(e.target.value) || 0})}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="grossArea">Brüt Alan (m²)</Label>
                              <Input
                                id="grossArea"
                                type="number"
                                value={formData.grossArea}
                                onChange={(e) => setFormData({...formData, grossArea: parseFloat(e.target.value) || 0})}
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="priceTL">Fiyat (TL) *</Label>
                              <Input
                                id="priceTL"
                                type="number"
                                value={formData.priceTL}
                                onChange={(e) => setFormData({...formData, priceTL: parseFloat(e.target.value) || 0})}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="priceUSD">Fiyat (USD)</Label>
                              <Input
                                id="priceUSD"
                                type="number"
                                value={formData.priceUSD}
                                onChange={(e) => setFormData({...formData, priceUSD: parseFloat(e.target.value) || 0})}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="priceEUR">Fiyat (EUR)</Label>
                              <Input
                                id="priceEUR"
                                type="number"
                                value={formData.priceEUR}
                                onChange={(e) => setFormData({...formData, priceEUR: parseFloat(e.target.value) || 0})}
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="status">Durum</Label>
                              <Select value={formData.status} onValueChange={(value: any) => setFormData({...formData, status: value})}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="SATISTA">Satışta</SelectItem>
                                  <SelectItem value="REZERVE">Rezerve</SelectItem>
                                  <SelectItem value="SATILDI">Satıldı</SelectItem>
                                  <SelectItem value="BEKLEMEDE">Beklemede</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="zoningStatus">İmar Durumu</Label>
                              <Select value={formData.zoningStatus} onValueChange={(value: any) => setFormData({...formData, zoningStatus: value})}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="IMARLI">İmarlı</SelectItem>
                                  <SelectItem value="IMARSIZ">İmarsız</SelectItem>
                                  <SelectItem value="KISMEN_IMARLI">Kısmen İmarlı</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="parcelNumber">Ada No</Label>
                              <Input
                                id="parcelNumber"
                                value={formData.parcelNumber}
                                onChange={(e) => setFormData({...formData, parcelNumber: e.target.value})}
                                placeholder="Ada numarası"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="isPublished">Ana Sayfada Yayınla</Label>
                              <div className="flex items-center space-x-2">
                                <Switch
                                  id="isPublished"
                                  checked={formData.isPublished}
                                  onCheckedChange={(checked) => setFormData({...formData, isPublished: checked})}
                                />
                                <Label htmlFor="isPublished" className="text-sm text-gray-600">
                                  {formData.isPublished ? "Yayınlanacak" : "Yayınlanmayacak"}
                                </Label>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="blockNumber">Parsel No</Label>
                              <Input
                                id="blockNumber"
                                value={formData.blockNumber}
                                onChange={(e) => setFormData({...formData, blockNumber: e.target.value})}
                                placeholder="Parsel numarası"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Altyapı Durumu</Label>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="hasElectricity"
                                  checked={formData.hasElectricity}
                                  onCheckedChange={(checked) => setFormData({...formData, hasElectricity: checked as boolean})}
                                />
                                <Label htmlFor="hasElectricity">Elektrik</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="hasWater"
                                  checked={formData.hasWater}
                                  onCheckedChange={(checked) => setFormData({...formData, hasWater: checked as boolean})}
                                />
                                <Label htmlFor="hasWater">Su</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="hasGas"
                                  checked={formData.hasGas}
                                  onCheckedChange={(checked) => setFormData({...formData, hasGas: checked as boolean})}
                                />
                                <Label htmlFor="hasGas">Doğalgaz</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="hasSewerage"
                                  checked={formData.hasSewerage}
                                  onCheckedChange={(checked) => setFormData({...formData, hasSewerage: checked as boolean})}
                                />
                                <Label htmlFor="hasSewerage">Kanalizasyon</Label>
                              </div>
                            </div>
                          </div>

                          {/* Dosya Yükleme Alanı */}
                          <div className="space-y-2">
                            <Label>Emlak Fotoğrafları ve Videoları</Label>
                            <FileUpload
                              onUpload={handleFileUpload}
                              onRemove={handleFileRemove}
                              acceptedTypes="all"
                              multiple={true}
                              maxFiles={10}
                              maxSize={50}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                            <X className="h-4 w-4 mr-2" />
                            İptal
                          </Button>
                          <Button onClick={handleAddProperty} disabled={isSubmitting}>
                            <Save className="h-4 w-4 mr-2" />
                            {isSubmitting ? "Kaydediliyor..." : "Kaydet"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="overflow-hidden">
                      <Skeleton className="aspect-video w-full" />
                      <CardContent className="p-4">
                        <Skeleton className="h-6 w-full mb-2" />
                        <Skeleton className="h-4 w-3/4 mb-3" />
                        <Skeleton className="h-4 w-1/2 mb-3" />
                        <Skeleton className="h-8 w-full mb-3" />
                        <div className="flex space-x-2">
                          <Skeleton className="h-8 flex-1" />
                          <Skeleton className="h-8 flex-1" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <p className="text-red-600">Hata: {error}</p>
                </div>
              ) : (
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="office">Ofis Portföyü ({officeProperties.length})</TabsTrigger>
                    <TabsTrigger value="customer">Müşteri Portföyleri ({customerProperties.length})</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="office" className="space-y-4">
                    {viewMode === "cards" ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {officeProperties.map((property) => (
                          <PropertyCard key={property.id} property={property} />
                        ))}
                      </div>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>
                              <Checkbox
                                checked={selectedProperties.length === officeProperties.length && officeProperties.length > 0}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setSelectedProperties(officeProperties.map(p => p.id));
                                  } else {
                                    setSelectedProperties([]);
                                  }
                                }}
                              />
                            </TableHead>
                            <TableHead>Emlak</TableHead>
                            <TableHead>Konum</TableHead>
                            <TableHead>Tür</TableHead>
                            <TableHead>Alan</TableHead>
                            <TableHead>Fiyat</TableHead>
                            <TableHead>Durum</TableHead>
                            <TableHead>İşlemler</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {officeProperties.map((property) => (
                            <TableRow key={property.id}>
                              <TableCell>
                                <Checkbox
                                  checked={selectedProperties.includes(property.id)}
                                  onCheckedChange={(checked) => handleSelectProperty(property.id, checked as boolean)}
                                />
                              </TableCell>
                              <TableCell>
                                <div>
                                  <div className="font-medium">{property.title}</div>
                                  <div className="text-sm text-gray-500">
                                    Ada: {property.parcelNumber}, Parsel: {property.blockNumber}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center text-sm">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {property.city}, {property.district}
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">
                                  {propertyTypeLabels[property.propertyType]}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {property.netArea.toLocaleString('tr-TR')} m²
                              </TableCell>
                              <TableCell>
                                <div className="text-green-600 font-medium">
                                  {formatCurrency(property.priceTL)}
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge className={`${statusColors[property.status]} text-white`}>
                                  {statusLabels[property.status]}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => openEditDialog(property)}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleDeleteProperty(property.id)}
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
                  </TabsContent>
                  
                  <TabsContent value="customer" className="space-y-4">
                    {viewMode === "cards" ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {customerProperties.map((property) => (
                          <PropertyCard key={property.id} property={property} />
                        ))}
                      </div>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>
                              <Checkbox
                                checked={selectedProperties.length === customerProperties.length && customerProperties.length > 0}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setSelectedProperties(customerProperties.map(p => p.id));
                                  } else {
                                    setSelectedProperties([]);
                                  }
                                }}
                              />
                            </TableHead>
                            <TableHead>Emlak</TableHead>
                            <TableHead>Müşteri</TableHead>
                            <TableHead>Konum</TableHead>
                            <TableHead>Tür</TableHead>
                            <TableHead>Alan</TableHead>
                            <TableHead>Fiyat</TableHead>
                            <TableHead>Durum</TableHead>
                            <TableHead>İşlemler</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {customerProperties.map((property) => (
                            <TableRow key={property.id}>
                              <TableCell>
                                <Checkbox
                                  checked={selectedProperties.includes(property.id)}
                                  onCheckedChange={(checked) => handleSelectProperty(property.id, checked as boolean)}
                                />
                              </TableCell>
                              <TableCell>
                                <div>
                                  <div className="font-medium">{property.title}</div>
                                  <div className="text-sm text-gray-500">
                                    Ada: {property.parcelNumber}, Parsel: {property.blockNumber}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="font-medium">{property.customer?.name || 'Ofis Portföyü'}</div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center text-sm">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {property.city}, {property.district}
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">
                                  {propertyTypeLabels[property.propertyType]}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {property.netArea.toLocaleString('tr-TR')} m²
                              </TableCell>
                              <TableCell>
                                <div className="text-green-600 font-medium">
                                  {formatCurrency(property.priceTL)}
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge className={`${statusColors[property.status]} text-white`}>
                                  {statusLabels[property.status]}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => openEditDialog(property)}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleDeleteProperty(property.id)}
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
                  </TabsContent>
                </Tabs>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <ProtectedRoute>
      <PropertiesContent />
    </ProtectedRoute>
  );
}