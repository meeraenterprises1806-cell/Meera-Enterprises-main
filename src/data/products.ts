export interface Product {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  description: string;
  specifications?: Record<string, string>;
  applications?: string[];
  image: string;
  images?: string[];
  isNewArrival?: boolean;
}

export interface ProductCategory {
  slug: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

export const categories: ProductCategory[] = [
 
];

export const products: Product[] = [
];

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.isNewArrival);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
