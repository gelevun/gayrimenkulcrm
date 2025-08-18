import { useState, useEffect } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  type: 'ALICI' | 'SATICI' | 'GAYRIMENKUL_DANISMANI';
  address?: string;
  city?: string;
  district?: string;
  notes?: string;
  priorityScore: number;
  referredBy?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  user?: {
    name: string;
    email: string;
  };
}

export interface Property {
  id: string;
  title: string;
  description?: string;
  propertyType: string;
  status: 'SATISTA' | 'REZERVE' | 'SATILDI' | 'BEKLEMEDE';
  city: string;
  district: string;
  neighborhood?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  parcelNumber?: string;
  blockNumber?: string;
  netArea: number;
  grossArea?: number;
  zoningStatus?: 'IMARLI' | 'IMARSIZ' | 'KISMEN_IMARLI';
  zoningDetails?: string;
  maxFloors?: number;
  kaks?: number;
  gabari?: number;
  hasElectricity: boolean;
  hasWater: boolean;
  hasGas: boolean;
  hasSewerage: boolean;
  distanceToMainRoad?: number;
  publicTransportAccess: boolean;
  ownershipStatus?: string;
  shareInfo?: string;
  priceTL: number;
  priceUSD?: number;
  priceEUR?: number;
  priceGoldGrams?: number;
  constructionPermit: boolean;
  licenseInfo?: string;
  isPublished?: boolean;
  userId?: string;
  customerId?: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    name: string;
    email: string;
  };
  customer?: {
    name: string;
    email: string;
    type: string;
  };
  mediaFiles?: Array<{
    id: string;
    filename: string;
    filePath: string;
    fileType: string;
    isPrimary: boolean;
  }>;
}

export interface FinancialTransaction {
  id: string;
  type: 'SALE' | 'PURCHASE' | 'COMMISSION';
  amount: number;
  currency: 'TRY' | 'USD' | 'EUR';
  propertyId?: string;
  customerId?: string;
  userId?: string;
  description?: string;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
  commissionRate?: number;
  commissionAmount?: number;
  transactionDate: string;
  dueDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  property?: {
    title: string;
    city: string;
    district: string;
  };
  customer?: {
    name: string;
    email: string;
  };
  user?: {
    name: string;
    email: string;
  };
}

export interface FinancialStats {
  totalSales: number;
  totalCommissions: number;
  pendingPayments: number;
  monthlyTarget: number;
  monthlySales: number;
  monthlyCommissions: number;
  totalRevenue: number;
  avgCommissionRate: number;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
  details?: any;
}

// Customers API
export const useCustomers = (filters?: {
  search?: string;
  type?: string;
  isActive?: boolean;
}) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams();
      if (filters?.search) params.append('search', filters.search);
      if (filters?.type) params.append('type', filters.type);
      if (filters?.isActive !== undefined) params.append('isActive', filters.isActive.toString());

      const response = await api.get<Customer[]>(`/customers?${params.toString()}`);
      setCustomers(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Müşteriler yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const createCustomer = async (customerData: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await api.post<Customer>('/customers', customerData);
      setCustomers(prev => [response.data, ...prev]);
      return response.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.error || 'Müşteri oluşturulurken hata oluştu');
    }
  };

  const updateCustomer = async (id: string, customerData: Partial<Customer>) => {
    try {
      const response = await api.put<Customer>(`/customers/${id}`, customerData);
      setCustomers(prev => prev.map(c => c.id === id ? response.data : c));
      return response.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.error || 'Müşteri güncellenirken hata oluştu');
    }
  };

  const deleteCustomer = async (id: string) => {
    try {
      await api.delete(`/customers/${id}`);
      setCustomers(prev => prev.filter(c => c.id !== id));
    } catch (err: any) {
      throw new Error(err.response?.data?.error || 'Müşteri silinirken hata oluştu');
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [filters?.search, filters?.type, filters?.isActive]);

  return {
    customers,
    loading,
    error,
    refetch: fetchCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
  };
};

// Properties API
export const useProperties = (filters?: {
  search?: string;
  status?: string;
  propertyType?: string;
  city?: string;
  customerId?: string;
  isOffice?: boolean;
}) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams();
      if (filters?.search) params.append('search', filters.search);
      if (filters?.status) params.append('status', filters.status);
      if (filters?.propertyType) params.append('propertyType', filters.propertyType);
      if (filters?.city) params.append('city', filters.city);
      if (filters?.customerId) params.append('customerId', filters.customerId);
      if (filters?.isOffice !== undefined) params.append('isOffice', filters.isOffice.toString());

      const response = await api.get<Property[]>(`/properties?${params.toString()}`);
      setProperties(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Emlaklar yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const createProperty = async (propertyData: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await api.post<Property>('/properties', propertyData);
      setProperties(prev => [response.data, ...prev]);
      return response.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.error || 'Emlak oluşturulurken hata oluştu');
    }
  };

  const updateProperty = async (id: string, propertyData: Partial<Property>) => {
    try {
      const response = await api.put<Property>(`/properties/${id}`, propertyData);
      setProperties(prev => prev.map(p => p.id === id ? response.data : p));
      return response.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.error || 'Emlak güncellenirken hata oluştu');
    }
  };

  const deleteProperty = async (id: string) => {
    try {
      await api.delete(`/properties/${id}`);
      setProperties(prev => prev.filter(p => p.id !== id));
    } catch (err: any) {
      throw new Error(err.response?.data?.error || 'Emlak silinirken hata oluştu');
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [filters?.search, filters?.status, filters?.propertyType, filters?.city, filters?.customerId, filters?.isOffice]);

  return {
    properties,
    loading,
    error,
    refetch: fetchProperties,
    createProperty,
    updateProperty,
    deleteProperty,
  };
};

// Dashboard stats
export const useDashboardStats = () => {
  const [stats, setStats] = useState({
    totalProperties: 0,
    activeProperties: 0,
    totalCustomers: 0,
    monthlySales: 0,
    totalRevenue: 0,
    avgCommission: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);

      // Paralel olarak verileri çek
      const [customersRes, propertiesRes] = await Promise.all([
        api.get<Customer[]>('/customers'),
        api.get<Property[]>('/properties'),
      ]);

      const customers = customersRes.data;
      const properties = propertiesRes.data;

      // İstatistikleri hesapla
      const totalProperties = properties.length;
      const activeProperties = properties.filter(p => p.status === 'SATISTA').length;
      const totalCustomers = customers.length;
      const monthlySales = properties.filter(p => p.status === 'SATILDI').length; // Basit hesaplama
      const totalRevenue = properties.reduce((sum, p) => sum + p.priceTL, 0);
      const avgCommission = 3.5; // Sabit değer

      setStats({
        totalProperties,
        activeProperties,
        totalCustomers,
        monthlySales,
        totalRevenue,
        avgCommission,
      });
    } catch (err: any) {
      setError(err.response?.data?.error || 'İstatistikler yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  };
};

// Financial Transactions API
export const useFinancialTransactions = (filters?: {
  type?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
}) => {
  const [transactions, setTransactions] = useState<FinancialTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams();
      if (filters?.type) params.append('type', filters.type);
      if (filters?.status) params.append('status', filters.status);
      if (filters?.startDate) params.append('startDate', filters.startDate);
      if (filters?.endDate) params.append('endDate', filters.endDate);

      const response = await api.get<FinancialTransaction[]>(`/financial/transactions?${params.toString()}`);
      setTransactions(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Finansal işlemler yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const createTransaction = async (transactionData: Omit<FinancialTransaction, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await api.post<FinancialTransaction>('/financial/transactions', transactionData);
      setTransactions(prev => [response.data, ...prev]);
      return response.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.error || 'İşlem oluşturulurken hata oluştu');
    }
  };

  const updateTransaction = async (id: string, transactionData: Partial<FinancialTransaction>) => {
    try {
      const response = await api.put<FinancialTransaction>(`/financial/transactions/${id}`, transactionData);
      setTransactions(prev => prev.map(t => t.id === id ? response.data : t));
      return response.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.error || 'İşlem güncellenirken hata oluştu');
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      await api.delete(`/financial/transactions/${id}`);
      setTransactions(prev => prev.filter(t => t.id !== id));
    } catch (err: any) {
      throw new Error(err.response?.data?.error || 'İşlem silinirken hata oluştu');
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [filters?.type, filters?.status, filters?.startDate, filters?.endDate]);

  return {
    transactions,
    loading,
    error,
    refetch: fetchTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  };
};

// Financial Stats API
export const useFinancialStats = () => {
  const [stats, setStats] = useState<FinancialStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get<FinancialStats>('/financial/stats');
      setStats(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Finansal istatistikler yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  };
};

export { api };
