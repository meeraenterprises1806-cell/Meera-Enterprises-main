CREATE TABLE "Brand" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

INSERT INTO "Brand" ("id", "name", "image", "updatedAt") VALUES
    ('brand-ahuja', 'Ahuja', '/images/clients/AHUJA.png', CURRENT_TIMESTAMP),
    ('brand-crompton', 'Crompton', '/images/clients/CROMPTION.png', CURRENT_TIMESTAMP),
    ('brand-supreme-furniture', 'Supreme Furniture', '/images/clients/SUPREME FURNITURE.png', CURRENT_TIMESTAMP),
    ('brand-samsung', 'Samsung', '/images/clients/SAMSUNG.jpg', CURRENT_TIMESTAMP);