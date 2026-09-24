import { jsonError, logServerError } from "@/lib/api";
import { signDistributorToken, verifyPassword } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) return jsonError("Email and password required", 400);

    const distributor = await prisma.distributor.findUnique({ where: { email: String(email).trim().toLowerCase() } });
    if (!distributor || !distributor.isActive || !(await verifyPassword(String(password), distributor.password))) {
      return jsonError("Invalid credentials", 401);
    }

    const response = NextResponse.json({
      success: true,
      user: { id: distributor.id, email: distributor.email, name: distributor.name, company: distributor.company },
    });
    response.cookies.set("distributor_token", signDistributorToken({ id: distributor.id, email: distributor.email }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return response;
  } catch (error) {
    logServerError("api.distributor.login", error);
    return jsonError("Unable to sign in right now.", 500);
  }
}
