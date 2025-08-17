"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileUpload } from "@/components/ui/file-upload";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Image,
  Video,
  FileText,
  Download,
  Eye,
  Filter,
  Grid,
  List,
  Play,
  Pause
} from "lucide-react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

const mockMedia = [
  {
    id: "1",
    title: "İstanbul Beylikdüzü Arsa - Ana Görsel",
    type: "FOTOGRAF",
    propertyId: "1",
    propertyTitle: "İstanbul Beylikdüzü Arsa",
    filePath: "/uploads/images/sample1.jpg",
    fileSize: "2.5 MB",
    uploadDate: "2024-08-15",
    isPrimary: true,
    uploadedBy: "Ahmet Yılmaz"
  },
  {
    id: "2",
    title: "Ankara Çankaya Arazi - Video Tur",
    type: "VIDEO",
    propertyId: "2",
    propertyTitle: "Ankara Çankaya Arazi",
    filePath: "/uploads/videos/sample1.mp4",
    fileSize: "15.2 MB",
    uploadDate: "2024-08-10",
    isPrimary: true,
    uploadedBy: "Ahmet Yılmaz"
  },
  {
    id: "3",
    title: "İzmir Karşıyaka Arsa - Panoramik",
    type: "PANORAMIK",
    propertyId: "3",
    propertyTitle: "İzmir Karşıyaka Arsa",
    filePath: "/uploads/images/sample2.jpg",
    fileSize: "8.7 MB",
    uploadDate: "2024-08-05",
    isPrimary: false,
    uploadedBy: "Ahmet Yılmaz"
  },
  {
    id: "4",
    title: "İstanbul Beylikdüzü Arsa - Detay 1",
    type: "FOTOGRAF",
    propertyId: "1",
    propertyTitle: "İstanbul Beylikdüzü Arsa",
    filePath: "/uploads/images/sample3.jpg",
    fileSize: "1.8 MB",
    uploadDate: "2024-08-15",
    isPrimary: false,
    uploadedBy: "Ahmet Yılmaz"
  },
  {
    id: "5",
    title: "İstanbul Beylikdüzü Arsa - Detay 2",
    type: "FOTOGRAF",
    propertyId: "1",
    propertyTitle: "İstanbul Beylikdüzü Arsa",
    filePath: "/uploads/images/sample4.jpg",
    fileSize: "2.1 MB",
    uploadDate: "2024-08-15",
    isPrimary: false,
    uploadedBy: "Ahmet Yılmaz"
  },
  {
    id: "6",
    title: "Ankara Çankaya Arazi - Belge",
    type: "DOKUMAN",
    propertyId: "2",
    propertyTitle: "Ankara Çankaya Arazi",
    filePath: "/uploads/documents/sample1.pdf",
    fileSize: "3.2 MB",
    uploadDate: "2024-08-10",
    isPrimary: false,
    uploadedBy: "Ahmet Yılmaz"
  }
];

export default function MediaPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedProperty, setSelectedProperty] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<any>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const filteredMedia = mockMedia.filter(media => {
    const matchesSearch = media.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         media.propertyTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || media.type === selectedType;
    const matchesProperty = selectedProperty === "all" || media.propertyId === selectedProperty;
    
    return matchesSearch && matchesType && matchesProperty;
  });

  const getMediaIcon = (type: string) => {
    switch (type) {
      case "FOTOGRAF":
      case "PANORAMIK":
        return <Image className="h-4 w-4" />;
      case "VIDEO":
        return <Video className="h-4 w-4" />;
      case "DOKUMAN":
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "FOTOGRAF":
        return "Fotoğraf";
      case "VIDEO":
        return "Video";
      case "PANORAMIK":
        return "Panoramik";
      case "DOKUMAN":
        return "Belge";
      default:
        return "Bilinmiyor";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "FOTOGRAF":
      case "PANORAMIK":
        return "bg-blue-500";
      case "VIDEO":
        return "bg-purple-500";
      case "DOKUMAN":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const handlePreview = (media: any) => {
    setSelectedMedia(media);
    setIsPreviewOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Bu medya dosyasını silmek istediğinizden emin misiniz?")) {
      console.log("Medya silindi:", id);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-pink-50 to-rose-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-br from-pink-50 to-rose-50 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Multimedia</h1>
            <p className="text-gray-600 mt-2">Emlak fotoğrafları, videoları ve belgelerinizi yönetin</p>
          </div>

          {/* İstatistik Kartları */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Toplam Medya</CardTitle>
                <Image className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">1,247</div>
                <p className="text-xs text-muted-foreground">
                  Tüm dosyalar
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Fotoğraflar</CardTitle>
                <Image className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">892</div>
                <p className="text-xs text-muted-foreground">
                  %71.5 oranında
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Videolar</CardTitle>
                <Video className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">156</div>
                <p className="text-xs text-muted-foreground">
                  %12.5 oranında
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Toplam Boyut</CardTitle>
                <FileText className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">2.4 GB</div>
                <p className="text-xs text-muted-foreground">
                  Depolama alanı
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
                    placeholder="Medya adı veya emlak ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Medya Türü" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tüm Türler</SelectItem>
                    <SelectItem value="FOTOGRAF">Fotoğraf</SelectItem>
                    <SelectItem value="VIDEO">Video</SelectItem>
                    <SelectItem value="PANORAMIK">Panoramik</SelectItem>
                    <SelectItem value="DOKUMAN">Belge</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedProperty} onValueChange={setSelectedProperty}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Emlak" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tüm Emlaklar</SelectItem>
                    <SelectItem value="1">İstanbul Beylikdüzü Arsa</SelectItem>
                    <SelectItem value="2">Ankara Çankaya Arazi</SelectItem>
                    <SelectItem value="3">İzmir Karşıyaka Arsa</SelectItem>
                  </SelectContent>
                </Select>

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

                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Medya Ekle
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Yeni Medya Ekle</DialogTitle>
                      <DialogDescription>
                        Emlak için yeni fotoğraf, video veya belge ekleyin.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label>Medya Dosyaları</Label>
                        <FileUpload
                          onUpload={(files) => console.log("Dosyalar yüklendi:", files)}
                          acceptedTypes="all"
                          multiple={true}
                          maxFiles={10}
                          maxSize={50}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                        İptal
                      </Button>
                      <Button onClick={() => setIsAddDialogOpen(false)}>
                        Yükle
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          {/* Medya Listesi */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMedia.map((media) => (
                <Card key={media.id} className="overflow-hidden">
                  <div className="relative">
                    <AspectRatio ratio={16 / 9}>
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        {media.type === "VIDEO" ? (
                          <div className="relative w-full h-full">
                            <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
                              <Play className="h-12 w-12 text-white" />
                            </div>
                          </div>
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                            {getMediaIcon(media.type)}
                          </div>
                        )}
                      </div>
                    </AspectRatio>
                    {media.isPrimary && (
                      <Badge className="absolute top-2 left-2 bg-green-500">
                        Ana Görsel
                      </Badge>
                    )}
                    <Badge className={`absolute top-2 right-2 ${getTypeColor(media.type)}`}>
                      {getTypeLabel(media.type)}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <h3 className="font-medium text-sm truncate">{media.title}</h3>
                      <p className="text-xs text-gray-500 truncate">{media.propertyTitle}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{media.fileSize}</span>
                        <span>{new Date(media.uploadDate).toLocaleDateString('tr-TR')}</span>
                      </div>
                      <div className="flex items-center space-x-2 pt-2">
                        <Button variant="ghost" size="sm" onClick={() => handlePreview(media)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDelete(media.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Medya Dosyaları</CardTitle>
                <CardDescription>
                  Toplam {filteredMedia.length} dosya bulundu
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {filteredMedia.map((media) => (
                    <div key={media.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        {getMediaIcon(media.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{media.title}</h3>
                        <p className="text-sm text-gray-500 truncate">{media.propertyTitle}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                          <span>{media.fileSize}</span>
                          <span>{new Date(media.uploadDate).toLocaleDateString('tr-TR')}</span>
                          <span>{media.uploadedBy}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getTypeColor(media.type)}>
                          {getTypeLabel(media.type)}
                        </Badge>
                        {media.isPrimary && (
                          <Badge className="bg-green-500">Ana</Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handlePreview(media)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDelete(media.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Önizleme Dialog */}
          <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
            <DialogContent className="sm:max-w-[800px]">
              <DialogHeader>
                <DialogTitle>{selectedMedia?.title}</DialogTitle>
                <DialogDescription>
                  {selectedMedia?.propertyTitle}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {selectedMedia && (
                  <div className="relative">
                    <AspectRatio ratio={16 / 9}>
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        {selectedMedia.type === "VIDEO" ? (
                          <div className="relative w-full h-full">
                            <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
                              <Play className="h-16 w-16 text-white" />
                            </div>
                          </div>
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                            {getMediaIcon(selectedMedia.type)}
                          </div>
                        )}
                      </div>
                    </AspectRatio>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Dosya Boyutu:</span> {selectedMedia?.fileSize}
                  </div>
                  <div>
                    <span className="font-medium">Yüklenme Tarihi:</span> {selectedMedia?.uploadDate}
                  </div>
                  <div>
                    <span className="font-medium">Yükleyen:</span> {selectedMedia?.uploadedBy}
                  </div>
                  <div>
                    <span className="font-medium">Tür:</span> {selectedMedia && getTypeLabel(selectedMedia.type)}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
}
