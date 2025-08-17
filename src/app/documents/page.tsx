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
import { Textarea } from "@/components/ui/textarea";
import { FileUpload } from "@/components/ui/file-upload";
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  FileText,
  Download,
  Eye,
  Filter,
  Calendar,
  User,
  Building2
} from "lucide-react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

const documentTypes = {
  "VEKALETNAME": "Vekaletname",
  "TAPU": "Tapu",
  "IMAR_DURUMU": "İmar Durumu",
  "EKSPERTIZ_RAPORU": "Ekspertiz Raporu",
  "SATIS_TALIMATI": "Satış Talimatı",
  "MAKBUZ": "Makbuz",
  "DIGER": "Diğer"
};

const mockDocuments = [
  {
    id: "1",
    title: "İstanbul Beylikdüzü Arsa Vekaletnamesi",
    type: "VEKALETNAME",
    propertyId: "1",
    propertyTitle: "İstanbul Beylikdüzü Arsa",
    customerName: "Ayşe Kaya",
    uploadDate: "2024-08-15",
    expiryDate: "2025-08-15",
    status: "AKTIF",
    fileSize: "2.5 MB",
    uploadedBy: "Ahmet Yılmaz"
  },
  {
    id: "2",
    title: "Ankara Çankaya Tapu Belgesi",
    type: "TAPU",
    propertyId: "2",
    propertyTitle: "Ankara Çankaya Arazi",
    customerName: "Mehmet Demir",
    uploadDate: "2024-08-10",
    expiryDate: null,
    status: "AKTIF",
    fileSize: "1.8 MB",
    uploadedBy: "Ahmet Yılmaz"
  },
  {
    id: "3",
    title: "İzmir Karşıyaka İmar Durumu",
    type: "IMAR_DURUMU",
    propertyId: "3",
    propertyTitle: "İzmir Karşıyaka Arsa",
    customerName: "Mustafa Öztürk",
    uploadDate: "2024-08-05",
    expiryDate: "2024-12-05",
    status: "SÜRESI_DOLMUŞ",
    fileSize: "3.2 MB",
    uploadedBy: "Ahmet Yılmaz"
  }
];

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    propertyId: "",
    customerId: "",
    description: "",
    expiryDate: ""
  });

  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || doc.type === selectedType;
    const matchesStatus = selectedStatus === "all" || doc.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleAddDocument = () => {
    // Belge ekleme işlemi
    setIsAddDialogOpen(false);
    setFormData({
      title: "",
      type: "",
      propertyId: "",
      customerId: "",
      description: "",
      expiryDate: ""
    });
  };

  const handleEditDocument = () => {
    // Belge düzenleme işlemi
    setIsEditDialogOpen(false);
    setSelectedDocument(null);
  };

  const handleDeleteDocument = (id: string) => {
    if (confirm("Bu belgeyi silmek istediğinizden emin misiniz?")) {
      // Belge silme işlemi
      console.log("Belge silindi:", id);
    }
  };

  const openEditDialog = (document: any) => {
    setSelectedDocument(document);
    setFormData({
      title: document.title,
      type: document.type,
      propertyId: document.propertyId,
      customerId: "",
      description: "",
      expiryDate: document.expiryDate || ""
    });
    setIsEditDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "AKTIF":
        return "bg-green-500";
      case "SÜRESI_DOLMUŞ":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "AKTIF":
        return "Aktif";
      case "SÜRESI_DOLMUŞ":
        return "Süresi Dolmuş";
      default:
        return "Bilinmiyor";
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-sky-50 to-blue-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-br from-sky-50 to-blue-50 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Belge Yönetimi</h1>
            <p className="text-gray-600 mt-2">Vekaletnameler, tapular ve diğer belgelerinizi yönetin</p>
          </div>

          {/* İstatistik Kartları */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Toplam Belge</CardTitle>
                <FileText className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">156</div>
                <p className="text-xs text-muted-foreground">
                  Tüm belgeler
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Aktif Belgeler</CardTitle>
                <FileText className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">142</div>
                <p className="text-xs text-muted-foreground">
                  Geçerli belgeler
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Süresi Dolmuş</CardTitle>
                <FileText className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">14</div>
                <p className="text-xs text-muted-foreground">
                  Yenilenmesi gereken
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bu Ay Eklenen</CardTitle>
                <FileText className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">23</div>
                <p className="text-xs text-muted-foreground">
                  Yeni belgeler
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Filtreler ve Arama */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Belge adı veya müşteri ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Belge Türü" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tüm Türler</SelectItem>
                    <SelectItem value="VEKALETNAME">Vekaletname</SelectItem>
                    <SelectItem value="TAPU">Tapu</SelectItem>
                    <SelectItem value="IMAR_DURUMU">İmar Durumu</SelectItem>
                    <SelectItem value="EKSPERTIZ_RAPORU">Ekspertiz Raporu</SelectItem>
                    <SelectItem value="SATIS_TALIMATI">Satış Talimatı</SelectItem>
                    <SelectItem value="MAKBUZ">Makbuz</SelectItem>
                    <SelectItem value="DIGER">Diğer</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Durum" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tüm Durumlar</SelectItem>
                    <SelectItem value="AKTIF">Aktif</SelectItem>
                    <SelectItem value="SÜRESI_DOLMUŞ">Süresi Dolmuş</SelectItem>
                  </SelectContent>
                </Select>

                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Yeni Belge
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Yeni Belge Ekle</DialogTitle>
                      <DialogDescription>
                        Yeni bir belge eklemek için bilgileri doldurun.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="title">Belge Başlığı *</Label>
                          <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            placeholder="Belge başlığı"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="type">Belge Türü *</Label>
                          <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="VEKALETNAME">Vekaletname</SelectItem>
                              <SelectItem value="TAPU">Tapu</SelectItem>
                              <SelectItem value="IMAR_DURUMU">İmar Durumu</SelectItem>
                              <SelectItem value="EKSPERTIZ_RAPORU">Ekspertiz Raporu</SelectItem>
                              <SelectItem value="SATIS_TALIMATI">Satış Talimatı</SelectItem>
                              <SelectItem value="MAKBUZ">Makbuz</SelectItem>
                              <SelectItem value="DIGER">Diğer</SelectItem>
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
                          placeholder="Belge açıklaması"
                          rows={3}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiryDate">Geçerlilik Tarihi</Label>
                          <Input
                            id="expiryDate"
                            type="date"
                            value={formData.expiryDate}
                            onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Belge Dosyası</Label>
                        <FileUpload
                          onUpload={(files) => console.log("Dosyalar yüklendi:", files)}
                          acceptedTypes="document"
                          multiple={false}
                          maxFiles={1}
                          maxSize={10}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                        İptal
                      </Button>
                      <Button onClick={handleAddDocument}>
                        Kaydet
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          {/* Belge Listesi */}
          <Card>
            <CardHeader>
              <CardTitle>Belgeler</CardTitle>
              <CardDescription>
                Toplam {filteredDocuments.length} belge bulundu
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Belge</TableHead>
                    <TableHead>Tür</TableHead>
                    <TableHead>Emlak</TableHead>
                    <TableHead>Müşteri</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead>Yüklenme Tarihi</TableHead>
                    <TableHead>İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{doc.title}</div>
                          <div className="text-sm text-gray-500">
                            {doc.fileSize} • {doc.uploadedBy}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {documentTypes[doc.type as keyof typeof documentTypes]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Building2 className="h-3 w-3 mr-1" />
                          {doc.propertyTitle}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <User className="h-3 w-3 mr-1" />
                          {doc.customerName}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(doc.status)}>
                          {getStatusLabel(doc.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(doc.uploadDate).toLocaleDateString('tr-TR')}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => openEditDialog(doc)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteDocument(doc.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
