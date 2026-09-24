import { DATABASE_UNAVAILABLE_MESSAGE, isDatabaseUnavailableError, jsonError, logServerError } from "@/lib/api";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const data = await req.json();

  try {
    const updateData: { isRead?: boolean; distributorId?: string | null; assignedAt?: Date | null; status?: string } = {};
    if (typeof data.isRead === "boolean") updateData.isRead = data.isRead;
    if (data.distributorId !== undefined) {
      updateData.distributorId = data.distributorId || null;
      updateData.assignedAt = data.distributorId ? new Date() : null;
      if (data.distributorId) updateData.status = "new";
    }
    if (typeof data.status === "string" && ["new", "follow-up", "accepted", "converted", "rejected"].includes(data.status)) updateData.status = data.status;
    const inquiry = await prisma.inquiry.update({ where: { id }, data: updateData });
    return NextResponse.json(inquiry);
  } catch (error) {
    logServerError("api.inquiries.id.PUT", error);
    const status = isDatabaseUnavailableError(error) ? 503 : 400;
    return jsonError(status === 503 ? DATABASE_UNAVAILABLE_MESSAGE : "Unable to update inquiry.", status);
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    await prisma.inquiry.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    logServerError("api.inquiries.id.DELETE", error);
    const status = isDatabaseUnavailableError(error) ? 503 : 400;
    return jsonError(status === 503 ? DATABASE_UNAVAILABLE_MESSAGE : "Unable to delete inquiry.", status);
  }
}
