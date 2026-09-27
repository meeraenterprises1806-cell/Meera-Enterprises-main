import { getDistributorSession, hashPassword, verifyPassword } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { checkRateLimit, getClientIdentifier } from "@/lib/rateLimit";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const session = await getDistributorSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const distributor = await prisma.distributor.findUnique({
    where: { id: session.id },
    select: { id: true, name: true, email: true, company: true, phone: true, isActive: true, createdAt: true },
  });
  if (!distributor || !distributor.isActive) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(distributor);
}

export async function PUT(request: NextRequest) {
  const session = await getDistributorSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const limit = checkRateLimit({ key: `distributor-password:${session.id}:${getClientIdentifier(request)}`, limit: 5, windowMs: 15 * 60 * 1000 });
  if (!limit.allowed) return NextResponse.json({ error: "Too many attempts. Please try again later." }, { status: 429 });

  try {
    const { currentPassword, newPassword } = await request.json() as { currentPassword?: string; newPassword?: string };
    if (!currentPassword || !newPassword) return NextResponse.json({ error: "Current and new passwords are required." }, { status: 400 });
    if (newPassword.length < 8) return NextResponse.json({ error: "New password must be at least 8 characters." }, { status: 400 });
    if (currentPassword === newPassword) return NextResponse.json({ error: "New password must be different from the current password." }, { status: 400 });

    const distributor = await prisma.distributor.findUnique({ where: { id: session.id } });
    if (!distributor || !distributor.isActive) return NextResponse.json({ error: "Sub-Dealer account not found." }, { status: 404 });
    if (!(await verifyPassword(currentPassword, distributor.password))) return NextResponse.json({ error: "Current password is incorrect." }, { status: 401 });

    await prisma.distributor.update({ where: { id: distributor.id }, data: { password: await hashPassword(newPassword) } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Unable to change password right now." }, { status: 500 });
  }
}
