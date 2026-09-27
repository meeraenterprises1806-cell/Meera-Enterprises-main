import EnquiryButton from "@/components/EnquiryButton";
import { getPublicCategories, getPublicNewArrivals } from "@/lib/publicProducts";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Products - Meera Enterprises",
  description: "Browse our complete range of Chairs, tables, home furniture, office furniture, home appliances, electric fans and lighting products for every solutions.",
};

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const [categories, newArrivals] = await Promise.all([
    getPublicCategories(),
    getPublicNewArrivals(12),
  ]);

  return (
    <main className="bg-white">
      {/* Header */}
      <section className="page-hero-background relative min-h-44 overflow-hidden sm:min-h-52">
        <div className="relative mx-auto flex min-h-44 max-w-7xl items-center px-6 py-6 sm:min-h-52 sm:py-8">
          <div>
            <p className="mb-3 text-xs font-semibold text-white/80">Home <span className="mx-2 text-accent">›</span> Products</p>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Our <span className="text-accent">Products</span></h1>
            <p className="mt-3 mb-6 max-w-2xl text-sm font-medium leading-relaxed text-white/90 sm:mb-7">Comprehensive range of chairs, tables, home furniture, office furniture, home appliances, electric fans and lighting products.</p>
            <div className="flex flex-wrap gap-3">
            <Link href="/catalogue" className="inline-flex items-center gap-2 bg-accent px-6 py-3 text-sm font-bold text-white transition hover:bg-accent-dark">
              View Catalogue <ArrowRight size={18} />
            </Link>
            <Link href="/catalogue" className="inline-flex items-center border border-white/40 bg-white/10 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/20">
              Download PDF
            </Link>
          </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Product Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <div key={cat.slug} className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all">
                <Link href={`/products/${cat.slug}`} className="relative h-64 overflow-hidden block">
                  <Image src={cat.image} alt={cat.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </Link>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{cat.name}</h3>
                  <p className="text-gray-500 text-sm mb-6 line-clamp-2">{cat.description}</p>
                  <div className="flex items-center gap-3">
                    <Link href={`/products/${cat.slug}`} className="flex-1 bg-gray-900 text-white text-center py-3 rounded-lg text-xs font-bold hover:bg-black transition-colors">
                      View Products
                    </Link>
                    <EnquiryButton productName={cat.name} className="inline-flex flex-1 items-center justify-center rounded-lg bg-accent py-3 text-xs font-bold text-white transition-colors hover:bg-accent-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">New Arrivals</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <div key={product.id} className="bg-white p-4 rounded-xl border border-gray-100 hover:shadow-md transition-all">
                <Link href={`/products/${product.categorySlug}/${product.id}`} className="relative h-48 mb-4 overflow-hidden rounded-lg block">
                  <Image src={product.image} alt={product.name} fill className="object-cover" />
                  <span className="absolute top-2 left-2 bg-accent text-white text-[10px] font-bold px-2 py-1 rounded">NEW</span>
                </Link>
                <Link href={`/products/${product.categorySlug}/${product.id}`} className="font-bold text-gray-900 text-sm mb-4 block hover:text-accent transition-colors">
                  {product.name}
                </Link>
                <EnquiryButton productName={product.name} label="Inquire" className="inline-flex w-full items-center justify-center rounded-lg bg-accent py-2 text-[11px] font-bold text-white transition-colors hover:bg-accent-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
