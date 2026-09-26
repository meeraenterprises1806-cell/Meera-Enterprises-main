import { DATABASE_UNAVAILABLE_MESSAGE, isDatabaseUnavailableError, jsonError, logServerError } from "@/lib/api";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

const orderBy = [{ sortOrder: "asc" as const }, { createdAt: "asc" as const }];

export async function GET(req: NextRequest) {
  if (new URL(req.url).searchParams.get("admin") === "true" && !(await getSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const certifications = await prisma.certification.findMany({ orderBy });
    return NextResponse.json(certifications);
  } catch (error) {
    logServerError("api.certifications.GET", error);
    const status = isDatabaseUnavailableError(error) ? 503 : 500;
    return jsonError(status === 503 ? DATABASE_UNAVAILABLE_MESSAGE : "Unable to load certifications.", status);
  }
}

export async function POST(req: NextRequest) {
  if (!(await getSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await req.json();
    if (!String(data.fileUrl || "").trim()) return jsonError("Certificate file is required.", 400);

    const certification = await prisma.certification.create({
      data: {
        title: String(data.title || "Certificate").trim(),
        fileUrl: String(data.fileUrl).trim(),
        sortOrder: Number.parseInt(String(data.sortOrder || 0), 10) || 0,
      },
    });
    return NextResponse.json(certification, { status: 201 });
  } catch (error) {
    logServerError("api.certifications.POST", error);
    const status = isDatabaseUnavailableError(error) ? 503 : 400;
    return jsonError(status === 503 ? DATABASE_UNAVAILABLE_MESSAGE : "Unable to create certification.", status);
  }
}