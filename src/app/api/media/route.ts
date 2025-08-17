import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

// Validation schema
const mediaFileSchema = z.object({
  filename: z.string().min(1, "Dosya adı gerekli"),
  originalName: z.string().min(1, "Orijinal dosya adı gerekli"),
  filePath: z.string().min(1, "Dosya yolu gerekli"),
  fileType: z.enum(["FOTOGRAF", "VIDEO", "DOKUMAN", "PANORAMIK"]),
  mimeType: z.string().min(1, "MIME türü gerekli"),
  size: z.number().positive("Dosya boyutu pozitif olmalı"),
  propertyId: z.string().optional(),
  authorizationId: z.string().optional(),
  isPrimary: z.boolean().default(false),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const propertyId = searchParams.get("propertyId");
    const fileType = searchParams.get("fileType");
    const isPrimary = searchParams.get("isPrimary");

    let whereClause: any = {};

    if (propertyId) {
      whereClause.propertyId = propertyId;
    }

    if (fileType) {
      whereClause.fileType = fileType;
    }

    if (isPrimary !== null) {
      whereClause.isPrimary = isPrimary === "true";
    }

    const mediaFiles = await db.mediaFile.findMany({
      where: whereClause,
      include: {
        property: {
          select: {
            id: true,
            title: true,
          },
        },
        authorization: {
          select: {
            id: true,
            type: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      data: mediaFiles,
    });
  } catch (error) {
    console.error("Medya dosyaları getirme hatası:", error);
    return NextResponse.json(
      { error: "Medya dosyaları getirilirken hata oluştu" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = mediaFileSchema.parse(body);

    const mediaFile = await db.mediaFile.create({
      data: validatedData,
      include: {
        property: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: mediaFile,
      message: "Medya dosyası başarıyla kaydedildi",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Geçersiz veri formatı", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Medya dosyası kaydetme hatası:", error);
    return NextResponse.json(
      { error: "Medya dosyası kaydedilirken hata oluştu" },
      { status: 500 }
    );
  }
}
