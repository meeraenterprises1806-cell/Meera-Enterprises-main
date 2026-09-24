CREATE TABLE "Distributor" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "company" TEXT NOT NULL DEFAULT '',
    "phone" TEXT NOT NULL DEFAULT '',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Distributor_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Distributor_email_key" ON "Distributor"("email");

ALTER TABLE "Inquiry" ADD COLUMN "status" TEXT NOT NULL DEFAULT 'new';
ALTER TABLE "Inquiry" ADD COLUMN "distributorId" TEXT;
ALTER TABLE "Inquiry" ADD COLUMN "assignedAt" TIMESTAMP(3);

CREATE INDEX "Inquiry_distributorId_idx" ON "Inquiry"("distributorId");

ALTER TABLE "Inquiry" ADD CONSTRAINT "Inquiry_distributorId_fkey" FOREIGN KEY ("distributorId") REFERENCES "Distributor"("id") ON DELETE SET NULL ON UPDATE CASCADE;