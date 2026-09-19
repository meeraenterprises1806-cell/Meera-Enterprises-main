import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// 1. Create a standard pg connection pool using your transaction URL
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

// 2. Wrap it inside the native Prisma 7 driver adapter
const adapter = new PrismaPg(pool);

// 3. Initialize Prisma Client with the driver adapter directly
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
