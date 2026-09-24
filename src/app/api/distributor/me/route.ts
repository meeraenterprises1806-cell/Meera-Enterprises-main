import { getDistributorSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getDistributorSession();
  if (!session) return NextResponse.json({ authenticated: false }, { status: 401 });

  const user = await prisma.distributor.findUnique({
    where: { id: session.id },
    select: { id: true, email: true, name: true, company: true, phone: true, isActive: true },
  });
  if (!user || !user.isActive) return NextResponse.json({ authenticated: false }, { status: 401 });
  return NextResponse.json({ authenticated: true, user });
}
