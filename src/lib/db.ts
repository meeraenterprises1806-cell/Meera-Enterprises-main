import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient; prismaSchemaVersion?: string };

const prismaSchemaVersion = "distributor-applications-v1";

function createPrismaClient() {
	const connectionString = process.env.DATABASE_URL;

	if (!connectionString) {
		throw new Error("DATABASE_URL is required");
	}

	const adapter = new PrismaPg({ connectionString, ssl: { rejectUnauthorized: false } });
	return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prismaSchemaVersion === prismaSchemaVersion && globalForPrisma.prisma
  ? globalForPrisma.prisma
  : createPrismaClient();

if (process.env.NODE_ENV !== "production") {

	globalForPrisma.prisma = prisma;
	globalForPrisma.prismaSchemaVersion = prismaSchemaVersion;
}
