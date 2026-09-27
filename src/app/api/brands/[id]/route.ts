import { jsonError, logServerError } from "@/lib/api";
import { getSession } from "@/lib/auth";
import { brandApiError } from "@/lib/brandApi";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    const data = await req.json();
    const name = typeof data.name === "string" ? data.name.trim() : "";
    const image = typeof data.image === "string" ? data.image.trim() : "";
    if (!name) return jsonError("Brand name is required.", 400);
    if (!image) return jsonError("Brand logo is required.", 400);

    const brand = await prisma.brand.update({ where: { id }, data: { name: name.slice(0, 120), image } });
    return NextResponse.json(brand);
  } catch (error) {
    logServerError("api.brands.id.PUT", error);
    return brandApiError(error, "Unable to update brand.");
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    await prisma.brand.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    logServerError("api.brands.id.DELETE", error);
    return brandApiError(error, "Unable to delete brand.");
  }
}