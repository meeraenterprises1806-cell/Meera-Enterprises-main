import { jsonError, logServerError } from "@/lib/api";
import { getSession, hashPassword } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const distributors = await prisma.distributor.findMany({
      where: { isActive: true },
      select: { id: true, name: true, email: true, company: true, phone: true },
      orderBy: { name: "asc" },
    });
    return NextResponse.json(distributors);
  } catch (error) {
    logServerError("api.admin.distributors.GET", error);
    return jsonError("Unable to load Sub-Dealers.", 500);
  }
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await request.json();
    if (!data.email || !data.password || !data.name) return jsonError("Name, email, and password are required.", 400);
    const distributor = await prisma.distributor.create({
      data: {
        name: String(data.name).slice(0, 120),
        email: String(data.email).trim().toLowerCase(),
        password: await hashPassword(String(data.password)),
        company: String(data.company || "").slice(0, 160),
        phone: String(data.phone || "").slice(0, 30),
      },
      select: { id: true, name: true, email: true, company: true, phone: true },
    });
    return NextResponse.json(distributor, { status: 201 });
  } catch (error) {
    logServerError("api.admin.distributors.POST", error);
    if (error && typeof error === "object" && "code" in error && error.code === "P2002") {
      return jsonError("A Sub-Dealer with this email already exists.", 409);
    }
    if (error && typeof error === "object" && "code" in error && error.code === "P2021") {
      return jsonError("Sub-Dealer tables are not available. Run the database migration first.", 503);
    }
    return jsonError("Unable to create Sub-Dealer.", 500);
  }
}
