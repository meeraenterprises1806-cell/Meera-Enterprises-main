import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, CheckCircle, Phone, MessageSquare } from "lucide-react";
import { companyInfo } from "@/data/company";
import { getPublicCategoryBySlug, getPublicProductBySlugOrId, getPublicProducts } from "@/lib/publicProducts";
import InquiryForm from "@/components/InquiryForm";
import ProductImageGallery from "@/components/ProductImageGallery";

// ... (Metadata and Params logic remain the same)

export default async function ProductPage({ params }: { params: Promise<{ category: string; product: string }> }) {
  const { category, product: productId } = await params;
  const product = await getPublicProductBySlugOrId(productId, category);
  if (!product) notFound();

  const cat = await getPublicCategoryBySlug(category);
  const galleryImages = product.images?.length ? [product.image, ...product.images] : [product.image];

  return (
    <main className="bg-white">
      {/* Refined Breadcrumb & Header */}
      <section className="bg-gray-50 border-b border-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-widest font-semibold mb-4">
            <Link href="/products" className="hover:text-accent">Products</Link>
            <ChevronRight size={14} />
            <Link href={`/products/${category}`} className="hover:text-accent">{cat?.name}</Link>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">{product.name}</h1>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            
            {/* Left: Gallery & Specs */}
            <div className="space-y-10">
              <ProductImageGallery images={galleryImages} productName={product.name} />

              {product.specifications && (
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4 border-b pb-2">Technical Specifications</h3>
                  <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                    {Object.entries(product.specifications).map(([key, value], i) => (
                      <div key={key} className={`grid grid-cols-[140px_1fr] ${i > 0 ? "border-t border-gray-100" : ""}`}>
                        <div className="px-4 py-3 text-sm font-bold text-gray-500 bg-gray-100/50">{key}</div>
                        <div className="px-4 py-3 text-sm text-gray-700 font-medium">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Info & Inquiry */}
            <div className="lg:sticky lg:top-28">
              <div className="space-y-6">
                <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>

                {product.pricePerMeter && (
                  <div className="bg-accent/5 border border-accent/10 p-5 rounded-xl">
                    <span className="text-xs font-bold uppercase tracking-wider text-accent">Best Price</span>
                    <div className="text-3xl font-bold text-gray-900 mt-1">{product.pricePerMeter}</div>
                  </div>
                )}

                {product.applications && (
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4">Applications</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.applications.map((app) => (
                        <span key={app} className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 text-sm font-semibold px-4 py-2 rounded-lg">
                          <CheckCircle size={16} className="text-accent" /> {app}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Modernized Contact Buttons */}
                <div className="grid grid-cols-2 gap-4">
                  <a href={`tel:${companyInfo.contact.phoneHref}`} className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white py-4 rounded-xl font-bold transition-all">
                    <Phone size={18} /> Call Now
                  </a>
                  <a href={`https://wa.me/${companyInfo.contact.whatsapp}`} target="_blank" className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white py-4 rounded-xl font-bold transition-all">
                    <MessageSquare size={18} /> WhatsApp
                  </a>
                </div>

                <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Request a Quote</h3>
                  <InquiryForm productName={product.name} minimal />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
