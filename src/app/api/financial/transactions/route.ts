import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

// Validation schema
const transactionSchema = z.object({
  type: z.enum(["SALE", "PURCHASE", "COMMISSION"]),
  amount: z.number().positive("Tutar pozitif olmalı"),
  currency: z.enum(["TRY", "USD", "EUR"]).default("TRY"),
  propertyId: z.string().optional(),
  customerId: z.string().optional(),
  userId: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(["PENDING", "COMPLETED", "CANCELLED"]).default("PENDING"),
  commissionRate: z.number().min(0).max(100).optional(),
  commissionAmount: z.number().min(0).optional(),
  transactionDate: z.string().optional(),
  dueDate: z.string().optional(),
  notes: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const status = searchParams.get("status");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    let where: any = {};

    if (type) where.type = type;
    if (status) where.status = status;
    if (startDate || endDate) {
      where.transactionDate = {};
      if (startDate) where.transactionDate.gte = new Date(startDate);
      if (endDate) where.transactionDate.lte = new Date(endDate);
    }

    // Mock data for now
    const transactions = [
      {
        id: "1",
        type: "SALE",
        amount: 1500000,
        currency: "TRY",
        propertyId: "1",
        customerId: "1",
        userId: "1",
        description: "Konut satışı",
        status: "COMPLETED",
        commissionRate: 3,
        commissionAmount: 45000,
        transactionDate: "2024-01-15",
        dueDate: "2024-01-15",
        notes: "Başarılı satış",
        createdAt: "2024-01-15T10:00:00Z",
        updatedAt: "2024-01-15T10:00:00Z",
        property: {
          title: "Merkezi Konut",
          city: "İstanbul",
          district: "Kadıköy",
        },
        customer: {
          name: "Ahmet Yılmaz",
          email: "ahmet@example.com",
        },
        user: {
          name: "Mehmet Danışman",
          email: "mehmet@example.com",
        },
      },
      {
        id: "2",
        type: "COMMISSION",
        amount: 45000,
        currency: "TRY",
        propertyId: "1",
        customerId: "1",
        userId: "1",
        description: "Satış komisyonu",
        status: "PENDING",
        commissionRate: 3,
        commissionAmount: 45000,
        transactionDate: "2024-01-15",
        dueDate: "2024-01-30",
        notes: "Bekleyen ödeme",
        createdAt: "2024-01-15T10:00:00Z",
        updatedAt: "2024-01-15T10:00:00Z",
        property: {
          title: "Merkezi Konut",
          city: "İstanbul",
          district: "Kadıköy",
        },
        customer: {
          name: "Ahmet Yılmaz",
          email: "ahmet@example.com",
        },
        user: {
          name: "Mehmet Danışman",
          email: "mehmet@example.com",
        },
      },
    ];

    return NextResponse.json(transactions);
  } catch (error) {
    console.error('Financial transactions error:', error);
    return NextResponse.json(
      { error: 'Finansal işlemler yüklenirken hata oluştu' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = transactionSchema.parse(body);

    // Mock response for now
    const newTransaction = {
      id: Date.now().toString(),
      ...validatedData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(newTransaction, { status: 201 });
  } catch (error) {
    console.error('Create transaction error:', error);
    return NextResponse.json(
      { error: 'İşlem oluşturulurken hata oluştu' },
      { status: 400 }
    );
  }
}
