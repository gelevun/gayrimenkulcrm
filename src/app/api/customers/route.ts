import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

// Validation schema
const customerSchema = z.object({
  name: z.string().min(1, "İsim gerekli"),
  email: z.string().email("Geçerli email adresi gerekli").optional(),
  phone: z.string().optional(),
  type: z.enum(["ALICI", "SATICI", "GAYRIMENKUL_DANISMANI"]),
  address: z.string().optional(),
  city: z.string().optional(),
  district: z.string().optional(),
  notes: z.string().optional(),
  priorityScore: z.number().min(0).max(100).default(0),
  referredBy: z.string().optional(),
  isActive: z.boolean().default(true),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const type = searchParams.get("type");
    const isActive = searchParams.get("isActive");

    let where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { city: { contains: search, mode: "insensitive" } },
      ];
    }

    if (type) {
      where.type = type;
    }

    if (isActive !== null) {
      where.isActive = isActive === "true";
    }

    const customers = await db.customer.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    return NextResponse.json(
      { error: "Müşteriler getirilirken hata oluştu" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = customerSchema.parse(body);

    const customer = await db.customer.create({
      data: validatedData,
    });

    return NextResponse.json(customer, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error creating customer:", error);
    return NextResponse.json(
      { error: "Müşteri oluşturulurken hata oluştu" },
      { status: 500 }
    );
  }
}
