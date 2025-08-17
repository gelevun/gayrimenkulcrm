import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const propertyUpdateSchema = z.object({
  title: z.string().min(1, "Başlık gerekli").optional(),
  description: z.string().optional(),
  propertyType: z.string().min(1, "Emlak türü gerekli").optional(),
  status: z.enum(["SATISTA", "REZERVE", "SATILDI", "BEKLEMEDE"]).optional(),
  
  // Lokasyon Bilgileri
  city: z.string().min(1, "Şehir gerekli").optional(),
  district: z.string().min(1, "İlçe gerekli").optional(),
  neighborhood: z.string().optional(),
  address: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  
  // Kadastral Bilgiler
  parcelNumber: z.string().optional(),
  blockNumber: z.string().optional(),
  
  // Alan Bilgileri
  netArea: z.number().positive("Net alan pozitif olmalı").optional(),
  grossArea: z.number().positive("Brüt alan pozitif olmalı").optional(),
  
  // İmar Durumu
  zoningStatus: z.enum(["IMARLI", "IMARSIZ", "KISMEN_IMARLI"]).optional(),
  zoningDetails: z.string().optional(),
  maxFloors: z.number().positive().optional(),
  kaks: z.number().positive().optional(),
  gabari: z.number().positive().optional(),
  
  // Altyapı Durumu
  hasElectricity: z.boolean().optional(),
  hasWater: z.boolean().optional(),
  hasGas: z.boolean().optional(),
  hasSewerage: z.boolean().optional(),
  
  // Ulaşım Bilgileri
  distanceToMainRoad: z.number().positive().optional(),
  publicTransportAccess: z.boolean().optional(),
  
  // Mülkiyet Durumu
  ownershipStatus: z.string().optional(),
  shareInfo: z.string().optional(),
  
  // Fiyat Bilgileri
  priceTL: z.number().positive("TL fiyatı pozitif olmalı").optional(),
  priceUSD: z.number().positive().optional(),
  priceEUR: z.number().positive().optional(),
  priceGoldGrams: z.number().positive().optional(),
  
  // Diğer Bilgiler
  constructionPermit: z.boolean().optional(),
  licenseInfo: z.string().optional(),
  
  // İlişkiler
  userId: z.string().optional(),
  customerId: z.string().optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const property = await db.property.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        customer: {
          select: {
            name: true,
            email: true,
            type: true,
          },
        },
        mediaFiles: {
          orderBy: { isPrimary: "desc" },
        },
        authorizations: {
          include: {
            mediaFiles: true,
          },
        },
        sales: {
          include: {
            customer: true,
            user: true,
          },
        },
        purchases: {
          include: {
            customer: true,
            user: true,
          },
        },
        priceHistory: {
          orderBy: { changedAt: "desc" },
        },
        zoningHistory: {
          orderBy: { changedAt: "desc" },
        },
        ownershipHistory: {
          orderBy: { changedAt: "desc" },
        },
      },
    });

    if (!property) {
      return NextResponse.json(
        { error: "Emlak bulunamadı" },
        { status: 404 }
      );
    }

    return NextResponse.json(property);
  } catch (error) {
    console.error("Error fetching property:", error);
    return NextResponse.json(
      { error: "Emlak getirilirken hata oluştu" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const validatedData = propertyUpdateSchema.parse(body);

    const property = await db.property.update({
      where: { id: params.id },
      data: validatedData,
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        customer: {
          select: {
            name: true,
            email: true,
            type: true,
          },
        },
      },
    });

    return NextResponse.json(property);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error updating property:", error);
    return NextResponse.json(
      { error: "Emlak güncellenirken hata oluştu" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await db.property.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Emlak başarıyla silindi" });
  } catch (error) {
    console.error("Error deleting property:", error);
    return NextResponse.json(
      { error: "Emlak silinirken hata oluştu" },
      { status: 500 }
    );
  }
}
