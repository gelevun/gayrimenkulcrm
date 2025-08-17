import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    // Mock data for now - in real app, calculate from database
    const stats = {
      totalSales: 27000000,
      totalCommissions: 810000,
      pendingPayments: 125000,
      monthlyTarget: 85,
      monthlySales: 27000000,
      monthlyCommissions: 810000,
      totalRevenue: 810000,
      avgCommissionRate: 3.0,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Financial stats error:', error);
    return NextResponse.json(
      { error: 'Finansal istatistikler yüklenirken hata oluştu' },
      { status: 500 }
    );
  }
}
