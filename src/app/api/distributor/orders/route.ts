import { jsonError, logServerError } from "@/lib/api";
import { getDistributorSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getDistributorSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const orders = await prisma.order.findMany({
      where: { distributorId: session.id },
      include: { inquiry: { include: { product: { select: { name: true } } } } },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(orders);
  } catch (error) {
    logServerError("api.distributor.orders.GET", error);
    return jsonError("Unable to load orders.", 500);
  }
}