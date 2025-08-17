import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Geçerli email adresi gerekli"),
  password: z.string().min(1, "Şifre gerekli"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

    // Test kullanıcıları - gerçek uygulamada veritabanından çekilmeli
    const testUsers = [
      {
        id: "1",
        email: "admin@example.com",
        name: "Admin User",
        role: "ADMIN",
        isActive: true,
        phone: "+90 555 123 4567",
        avatar: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2",
        email: "danisman@example.com",
        name: "Mehmet Danışman",
        role: "DANISMAN",
        isActive: true,
        phone: "+90 555 234 5678",
        avatar: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "3",
        email: "musteri@example.com",
        name: "Ahmet Müşteri",
        role: "MUSTERI",
        isActive: true,
        phone: "+90 555 345 6789",
        avatar: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const user = testUsers.find(u => u.email === email);

    if (!user) {
      return NextResponse.json(
        { error: "Kullanıcı bulunamadı" },
        { status: 401 }
      );
    }

    // Basit şifre kontrolü - gerçek uygulamada bcrypt kullanılmalı
    if (password !== "123456") {
      return NextResponse.json(
        { error: "Geçersiz şifre" },
        { status: 401 }
      );
    }

    // Kullanıcı bilgilerini döndür (şifre hariç)
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      user: userWithoutPassword,
      message: "Giriş başarılı",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Giriş yapılırken hata oluştu" },
      { status: 500 }
    );
  }
}
