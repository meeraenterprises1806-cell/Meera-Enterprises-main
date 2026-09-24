CREATE TABLE "DistributorApplication" (
    "id" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "gstNumber" TEXT NOT NULL,
    "panNumber" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "businessType" TEXT NOT NULL,
    "yearsInBusiness" TEXT NOT NULL,
    "brandFocus" TEXT NOT NULL,
    "documentsName" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "DistributorApplication_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "DistributorApplication_status_idx" ON "DistributorApplication"("status");
CREATE INDEX "DistributorApplication_createdAt_idx" ON "DistributorApplication"("createdAt");