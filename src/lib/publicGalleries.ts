import { markPublicDbAvailable, markPublicDbUnavailable, shouldSkipPublicDbRead } from "@/lib/dbHealth";

type PrismaClientInstance = typeof import("@/lib/db")["prisma"];

export type PublicGalleryImage = {
  id: string;
  title: string;
  image: string;
  sortOrder: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export type PublicBrand = {
  id: string;
  name: string;
  image: string;
  createdAt?: Date;
};

const fallbackProjectImages: PublicGalleryImage[] = [
];

const fallbackInfrastructureImages: PublicGalleryImage[] = [
];

const galleryOrder = [{ sortOrder: "asc" as const }, { createdAt: "asc" as const }];

async function queryPublicGallery<T>(query: (client: PrismaClientInstance) => Promise<T>, fallback: T) {
  if (shouldSkipPublicDbRead()) return fallback;

  try {
    const { prisma } = await import("@/lib/db");
    const result = await query(prisma);
    markPublicDbAvailable();
    return result;
  } catch (error) {
    markPublicDbUnavailable(error);
    return fallback;
  }
}

export async function getPublicProjectImages() {
  return queryPublicGallery(
    (client) => client.projectImage.findMany({ orderBy: galleryOrder }),
    fallbackProjectImages,
  );
}

export async function getPublicInfrastructureImages() {
  return queryPublicGallery(
    (client) => client.infrastructureImage.findMany({ orderBy: galleryOrder }),
    fallbackInfrastructureImages,
  );
}

export async function getPublicCertifications() {
  return queryPublicGallery(
    (client) => client.certification.findMany({ orderBy: galleryOrder }),
    [],
  );
}

export async function getPublicBrands() {
  return queryPublicGallery(
    (client) => client.brand.findMany({ orderBy: { createdAt: "asc" } }),
    [] as PublicBrand[],
  );
}