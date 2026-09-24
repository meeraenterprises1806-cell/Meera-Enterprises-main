import { jsonError, logServerError } from "@/lib/api";
import { getDistributorSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getDistributorSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const inquiries = await prisma.inquiry.findMany({
      where: { distributorId: session.id },
      include: { product: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(inquiries);
  } catch (error) {
    logServerError("api.distributor.inquiries.GET", error);
    return jsonError("Unable to load assigned inquiries.", 500);
  }
}

export async function PUT(request: Request) {
  const session = await getDistributorSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id, status } = await request.json();
    if (!id || !["new", "follow-up", "accepted", "converted", "rejected"].includes(status)) return jsonError("Invalid inquiry update.", 400);

    const inquiry = await prisma.inquiry.findFirst({ where: { id: String(id), distributorId: session.id } });
    if (!inquiry) return jsonError("Inquiry not found.", 404);

    const order = await prisma.$transaction(async (transaction) => {
      await transaction.inquiry.update({ where: { id: inquiry.id }, data: { status: String(status), isRead: true } });
      if (status === "accepted") {
        return transaction.order.upsert({
          where: { inquiryId: inquiry.id },
          update: { status: "pending" },
          create: { inquiryId: inquiry.id, distributorId: session.id, status: "pending" },
          include: { inquiry: { include: { product: { select: { name: true } } } } },
        });
      }
      return null;
    });
    return NextResponse.json({ success: true, order });
  } catch (error) {
    logServerError("api.distributor.inquiries.PUT", error);
    return jsonError(error instanceof Error ? `Unable to update inquiry: ${error.message}` : "Unable to update inquiry.", 500);
  }
}
