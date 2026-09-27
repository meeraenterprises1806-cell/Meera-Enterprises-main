import { DATABASE_UNAVAILABLE_MESSAGE, isDatabaseUnavailableError, jsonError, logServerError } from "@/lib/api";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const [productCount, categoryCount, blogCount, activeDistributorCount, totalInquiries, unreadInquiries, recentInquiries, categoriesWithCounts] = await Promise.all([
      prisma.product.count({ where: { isActive: true } }),
      prisma.productCategory.count(),
      prisma.blogPost.count(),
      prisma.distributor.count({ where: { isActive: true } }),
      prisma.inquiry.count(),
      prisma.inquiry.count({ where: { isRead: false } }),
      prisma.inquiry.findMany({ orderBy: { createdAt: "desc" }, take: 5, include: { product: { select: { name: true } } } }),
      prisma.productCategory.findMany({
        select: { name: true, _count: { select: { products: true } } },
        orderBy: { sortOrder: "asc" },
      }),
    ]);

    return NextResponse.json({
      products: productCount,
      categories: categoryCount,
      blogs: blogCount,
      activeDistributors: activeDistributorCount,
      inquiries: { total: totalInquiries, unread: unreadInquiries },
      recentInquiries,
      categoriesWithCounts: categoriesWithCounts.map((c) => ({ name: c.name, products: c._count.products })),
    });
  } catch (error) {
    logServerError("api.admin.stats.GET", error);
    const status = isDatabaseUnavailableError(error) ? 503 : 500;
    return jsonError(status === 503 ? DATABASE_UNAVAILABLE_MESSAGE : "Unable to load dashboard statistics.", status);
  }
}
