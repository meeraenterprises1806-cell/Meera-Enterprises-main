import { jsonError, logServerError } from "@/lib/api";
import { getSession, hashPassword } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

const requiredFields = [
  "businessName", "ownerName", "mobile", "email", "gstNumber", "panNumber", "state", "city", "address", "businessType", "yearsInBusiness", "brandFocus",
] as const;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const values = Object.fromEntries(requiredFields.map((field) => [field, String(formData.get(field) || "").trim()]));
    const missing = requiredFields.find((field) => !values[field]);
    if (missing) return jsonError(`${missing} is required.`, 400);

    if (!/^[6-9]\d{9}$/.test(values.mobile)) return jsonError("Enter a valid 10-digit Indian mobile number.", 400);
    if (!/^[\w.%+-]+@gmail\.com$/i.test(values.email)) return jsonError("Enter a valid Gmail address.", 400);

    const document = formData.get("documents");
    if (!(document instanceof File) || document.size === 0) return jsonError("A document is required.", 400);
    if (document.size > 5 * 1024 * 1024) return jsonError("Document must be smaller than 5 MB.", 400);

    const application = await prisma.distributorApplication.create({
      data: {
        businessName: values.businessName,
        ownerName: values.ownerName,
        mobile: values.mobile,
        email: values.email,
        gstNumber: values.gstNumber,
        panNumber: values.panNumber,
        state: values.state,
        city: values.city,
        address: values.address,
        businessType: values.businessType,
        yearsInBusiness: values.yearsInBusiness,
        brandFocus: values.brandFocus,
        documentsName: document.name.slice(0, 200),
      },
      select: { id: true, businessName: true, ownerName: true, status: true, createdAt: true },
    });

    return NextResponse.json({ success: true, application }, { status: 201 });
  } catch (error) {
    logServerError("api.distributor.applications.POST", error);
    if (error && typeof error === "object" && "code" in error && error.code === "P2021") {
      return jsonError("Sub-Dealer application table is not available. Run the database migration first.", 503);
    }
    if (error instanceof TypeError && error.message.includes("distributorApplication")) {
      return jsonError("The server database client is stale. Restart the application and try again.", 503);
    }
    return jsonError("Unable to submit your application right now.", 500);
  }
}

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const applications = await prisma.distributorApplication.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(applications);
}

export async function PUT(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id, status } = await request.json();
    const allowedStatuses = ["pending", "hold", "approve", "reject"];
    if (!id || !allowedStatuses.includes(status)) return jsonError("Invalid application status.", 400);

    const application = await prisma.distributorApplication.findUnique({ where: { id: String(id) } });
    if (!application) return jsonError("Application not found.", 404);

    if (status !== "approve") {
      const updated = await prisma.distributorApplication.update({ where: { id: application.id }, data: { status: String(status) } });
      return NextResponse.json({ application: updated });
    }

    const sharedPassword = "adminme26";
    const hashedSharedPassword = await hashPassword(sharedPassword);
    const distributor = await prisma.$transaction(async (transaction) => {
      const updatedApplication = await transaction.distributorApplication.update({ where: { id: application.id }, data: { status: "approve" } });
      const account = await transaction.distributor.upsert({
        where: { email: application.email.toLowerCase() },
        update: { name: application.ownerName, company: application.businessName, phone: application.mobile, password: hashedSharedPassword, isActive: true },
        create: { name: application.ownerName, company: application.businessName, phone: application.mobile, email: application.email.toLowerCase(), password: hashedSharedPassword, isActive: true },
        select: { id: true, name: true, email: true, company: true, phone: true },
      });
      return { application: updatedApplication, account };
    });

    return NextResponse.json({ ...distributor, credentials: { email: distributor.account.email, password: sharedPassword } });
  } catch (error) {
    logServerError("api.distributor.applications.PUT", error);
    return jsonError("Unable to update application status.", 500);
  }
}
