import { jsonError, logServerError } from "@/lib/api";
import { getSession } from "@/lib/auth";
import { brandApiError } from "@/lib/brandApi";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const brands = await prisma.brand.findMany({ orderBy: { createdAt: "asc" } });
    return NextResponse.json(brands);
  } catch (error) {
    logServerError("api.brands.GET", error);
    return brandApiError(error, "Unable to load brands.", 500);
  }
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await req.json();
    const name = typeof data.name === "string" ? data.name.trim() : "";
    const image = typeof data.image === "string" ? data.image.trim() : "";
    if (!name) return jsonError("Brand name is required.", 400);
    if (!image) return jsonError("Brand logo is required.", 400);

    const brand = await prisma.brand.create({ data: { name: name.slice(0, 120), image } });
    return NextResponse.json(brand, { status: 201 });
  } catch (error) {
    logServerError("api.brands.POST", error);
    return brandApiError(error, "Unable to create brand.");
  }
}