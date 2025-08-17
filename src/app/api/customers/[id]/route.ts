import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const customerUpdateSchema = z.object({
  name: z.string().min(1, "İsim gerekli").optional(),
  email: z.string().email("Geçerli email adresi gerekli").optional(),
  phone: z.string().optional(),
  type: z.enum(["ALICI", "SATICI", "GAYRIMENKUL_DANISMANI"]).optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  district: z.string().optional(),
  notes: z.string().optional(),
  priorityScore: z.number().min(0).max(100).optional(),
  referredBy: z.string().optional(),
  isActive: z.boolean().optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const customer = await db.customer.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        properties: true,
        sales: true,
        purchases: true,
        communications: {
          orderBy: { date: "desc" },
          take: 10,
        },
      },
    });

    if (!customer) {
      return NextResponse.json(
        { error: "Müşteri bulunamadı" },
        { status: 404 }
      );
    }

    return NextResponse.json(customer);
  } catch (error) {
    console.error("Error fetching customer:", error);
    return NextResponse.json(
      { error: "Müşteri getirilirken hata oluştu" },
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
    const validatedData = customerUpdateSchema.parse(body);

    const customer = await db.customer.update({
      where: { id: params.id },
      data: validatedData,
    });

    return NextResponse.json(customer);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error updating customer:", error);
    return NextResponse.json(
      { error: "Müşteri güncellenirken hata oluştu" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await db.customer.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Müşteri başarıyla silindi" });
  } catch (error) {
    console.error("Error deleting customer:", error);
    return NextResponse.json(
      { error: "Müşteri silinirken hata oluştu" },
      { status: 500 }
    );
  }
}
