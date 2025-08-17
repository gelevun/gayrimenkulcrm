"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Calculator,
  FileText,
  Calendar,
  Building2,
  Plus,
  Search,
  Filter,
  Download
} from "lucide-react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { useFinancialStats, useFinancialTransactions, FinancialTransaction } from "@/hooks/use-api";
import { useAppToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { EmptyState } from "@/components/ui/empty-state";


export default function FinancialPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  const toast = useAppToast();
  const { stats, loading: statsLoading, error: statsError } = useFinancialStats();
  const { transactions, loading: transactionsLoading, error: transactionsError, createTransaction } = useFinancialTransactions({
    status: statusFilter || undefined,
    type: typeFilter || undefined,
  });

  // Error handling
  useEffect(() => {
    if (statsError) {
      toast.error("Hata", "Finansal istatistikler yüklenirken hata oluştu");
    }
  }, [statsError, toast]);

  useEffect(() => {
    if (transactionsError) {
      toast.error("Hata", "Finansal işlemler yüklenirken hata oluştu");
    }
  }, [transactionsError, toast]);

  const filteredTransactions = transactions.filter(transaction =>
    transaction.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.property?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.customer?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED": return "bg-green-500";
      case "PENDING": return "bg-yellow-500";
      case "CANCELLED": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "SALE": return "bg-blue-500";
      case "PURCHASE": return "bg-purple-500";
      case "COMMISSION": return "bg-orange-500";
      default: return "bg-gray-500";
    }
  };

  const formatCurrency = (amount: number, currency: string = "TRY") => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  return (
    <div className="flex h-screen bg-gradient-to-br from-amber-50 to-yellow-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-br from-amber-50 to-yellow-50 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Finansal İşlemler</h1>
            <p className="text-gray-600 mt-2">Satış, alım ve komisyon işlemlerinizi yönetin</p>
          </div>

          {/* İstatistik Kartları */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Toplam Satış</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                {statsLoading ? (
                  <div className="flex items-center justify-center h-8">
                    <LoadingSpinner size="sm" />
                  </div>
                ) : (
                  <div className="text-2xl font-bold text-green-600">
                    {formatCurrency(stats?.totalSales || 0)}
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  Bu ay yapılan satışlar
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Toplam Komisyon</CardTitle>
                <Calculator className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                {statsLoading ? (
                  <div className="flex items-center justify-center h-8">
                    <LoadingSpinner size="sm" />
                  </div>
                ) : (
                  <div className="text-2xl font-bold text-blue-600">
                    {formatCurrency(stats?.totalCommissions || 0)}
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  %{stats?.avgCommissionRate || 0} ortalama komisyon
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bekleyen Ödemeler</CardTitle>
                <TrendingDown className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                {statsLoading ? (
                  <div className="flex items-center justify-center h-8">
                    <LoadingSpinner size="sm" />
                  </div>
                ) : (
                  <div className="text-2xl font-bold text-orange-600">
                    {formatCurrency(stats?.pendingPayments || 0)}
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  Bekleyen ödemeler
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Aylık Hedef</CardTitle>
                <DollarSign className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                {statsLoading ? (
                  <div className="flex items-center justify-center h-8">
                    <LoadingSpinner size="sm" />
                  </div>
                ) : (
                  <div className="text-2xl font-bold text-purple-600">
                    %{stats?.monthlyTarget || 0}
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  Hedef tamamlanma oranı
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Arama ve Filtreler */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="İşlem ara..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Durum Filtrele" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tümü</SelectItem>
                    <SelectItem value="COMPLETED">Tamamlandı</SelectItem>
                    <SelectItem value="PENDING">Beklemede</SelectItem>
                    <SelectItem value="CANCELLED">İptal</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Tür Filtrele" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tümü</SelectItem>
                    <SelectItem value="SALE">Satış</SelectItem>
                    <SelectItem value="PURCHASE">Alım</SelectItem>
                    <SelectItem value="COMMISSION">Komisyon</SelectItem>
                  </SelectContent>
                </Select>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Yeni İşlem
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Yeni Finansal İşlem</DialogTitle>
                      <DialogDescription>
                        Yeni bir finansal işlem ekleyin
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="type" className="text-right">
                          Tür
                        </Label>
                        <Select>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="İşlem türü seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="SALE">Satış</SelectItem>
                            <SelectItem value="PURCHASE">Alım</SelectItem>
                            <SelectItem value="COMMISSION">Komisyon</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="amount" className="text-right">
                          Tutar
                        </Label>
                        <Input
                          id="amount"
                          type="number"
                          placeholder="0.00"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                          Açıklama
                        </Label>
                        <Textarea
                          id="description"
                          placeholder="İşlem açıklaması..."
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                        İptal
                      </Button>
                      <Button onClick={() => setIsAddDialogOpen(false)}>
                        Kaydet
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          {/* İşlem Listesi */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Finansal İşlemler</CardTitle>
                  <CardDescription>Son finansal işlemleriniz</CardDescription>
                </div>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Rapor İndir
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {transactionsLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
                        <div className="space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
                          <div className="h-3 bg-gray-200 rounded w-24 animate-pulse" />
                          <div className="h-3 bg-gray-200 rounded w-20 animate-pulse" />
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
                        <div className="h-6 bg-gray-200 rounded w-16 animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredTransactions.length === 0 ? (
                <EmptyState
                  icon={FileText}
                  title="Henüz finansal işlem bulunmuyor"
                  description="Yeni bir finansal işlem ekleyerek başlayın"
                  action={{
                    label: "Yeni İşlem Ekle",
                    onClick: () => setIsAddDialogOpen(true)
                  }}
                />
              ) : (
                <div className="space-y-4">
                  {filteredTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          transaction.type === 'SALE' ? 'bg-green-100' :
                          transaction.type === 'PURCHASE' ? 'bg-purple-100' :
                          'bg-orange-100'
                        }`}>
                          {transaction.type === 'SALE' ? (
                            <TrendingUp className="h-6 w-6 text-green-600" />
                          ) : transaction.type === 'PURCHASE' ? (
                            <Building2 className="h-6 w-6 text-purple-600" />
                          ) : (
                            <Calculator className="h-6 w-6 text-orange-600" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold">{transaction.description}</h3>
                          <p className="text-sm text-gray-600">
                            {transaction.property?.title} - {transaction.property?.city}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(transaction.transactionDate).toLocaleDateString('tr-TR')}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-green-600">
                          {formatCurrency(transaction.amount, transaction.currency)}
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={`${getStatusColor(transaction.status)} text-white`}>
                            {transaction.status === 'COMPLETED' ? 'Tamamlandı' :
                             transaction.status === 'PENDING' ? 'Beklemede' : 'İptal'}
                          </Badge>
                          <Badge className={`${getTypeColor(transaction.type)} text-white`}>
                            {transaction.type === 'SALE' ? 'Satış' :
                             transaction.type === 'PURCHASE' ? 'Alım' : 'Komisyon'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
