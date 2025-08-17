import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

// Validation schema
const propertySchema = z.object({
  title: z.string().min(1, "Başlık gerekli"),
  description: z.string().optional(),
  propertyType: z.string().min(1, "Emlak türü gerekli"),
  status: z.enum(["SATISTA", "REZERVE", "SATILDI", "BEKLEMEDE"]).default("BEKLEMEDE"),
  
  // Lokasyon Bilgileri
  city: z.string().min(1, "Şehir gerekli"),
  district: z.string().min(1, "İlçe gerekli"),
  neighborhood: z.string().optional(),
  address: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  
  // Kadastral Bilgiler
  parcelNumber: z.string().optional(),
  blockNumber: z.string().optional(),
  
  // Alan Bilgileri
  netArea: z.number().positive("Net alan pozitif olmalı"),
  grossArea: z.number().positive("Brüt alan pozitif olmalı").optional(),
  
  // İmar Durumu
  zoningStatus: z.enum(["IMARLI", "IMARSIZ", "KISMEN_IMARLI"]).optional(),
  zoningDetails: z.string().optional(),
  maxFloors: z.number().positive().optional(),
  kaks: z.number().positive().optional(),
  gabari: z.number().positive().optional(),
  
  // Altyapı Durumu
  hasElectricity: z.boolean().default(false),
  hasWater: z.boolean().default(false),
  hasGas: z.boolean().default(false),
  hasSewerage: z.boolean().default(false),
  
  // Ulaşım Bilgileri
  distanceToMainRoad: z.number().positive().optional(),
  publicTransportAccess: z.boolean().default(false),
  
  // Mülkiyet Durumu
  ownershipStatus: z.string().optional(),
  shareInfo: z.string().optional(),
  
  // Fiyat Bilgileri
  priceTL: z.number().positive("TL fiyatı pozitif olmalı"),
  priceUSD: z.number().positive().optional(),
  priceEUR: z.number().positive().optional(),
  priceGoldGrams: z.number().positive().optional(),
  
  // Diğer Bilgiler
  constructionPermit: z.boolean().default(false),
  licenseInfo: z.string().optional(),
  
  // İlişkiler
  userId: z.string().optional(),
  customerId: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const status = searchParams.get("status");
    const propertyType = searchParams.get("propertyType");
    const city = searchParams.get("city");
    const customerId = searchParams.get("customerId");
    const isOffice = searchParams.get("isOffice");

    let where: any = {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { city: { contains: search, mode: "insensitive" } },
        { district: { contains: search, mode: "insensitive" } },
        { propertyType: { contains: search, mode: "insensitive" } },
      ];
    }

    if (status) {
      where.status = status;
    }

    if (propertyType) {
      where.propertyType = propertyType;
    }

    if (city) {
      where.city = city;
    }

    if (customerId) {
      where.customerId = customerId;
    }

    if (isOffice === "true") {
      where.customerId = null;
    } else if (isOffice === "false") {
      where.customerId = { not: null };
    }

    const properties = await db.property.findMany({
      where,
      orderBy: { createdAt: "desc" },
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
          where: { isPrimary: true },
          take: 1,
        },
      },
    });

    return NextResponse.json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    return NextResponse.json(
      { error: "Emlaklar getirilirken hata oluştu" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = propertySchema.parse(body);

    const property = await db.property.create({
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

    return NextResponse.json(property, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error creating property:", error);
    return NextResponse.json(
      { error: "Emlak oluşturulurken hata oluştu" },
      { status: 500 }
    );
  }
}
