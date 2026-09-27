import RatingSummary from "@/components/RatingSummary";
import { getPublicBrands } from "@/lib/publicGalleries";
import Image from "next/image";

export const metadata = {
  title: "Brands - Meera Enterprises",
  description: "Explore trusted brands offering genuine furniture, appliances, fans, lighting and commercial solutions.",
};

export default async function ClientsPage() {
  const brands = await getPublicBrands();

  return (
    <main className="bg-white">
      <section className="page-hero-background relative min-h-44 overflow-hidden sm:min-h-52">
        <div className="relative mx-auto flex min-h-44 max-w-7xl items-center px-6 py-6 sm:min-h-52 sm:py-8">
          <div>
            <p className="mb-3 text-xs font-semibold text-white/80">Home <span className="mx-2 text-accent">›</span> Brands</p>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">We Deal In <span className="text-accent">Brands</span></h1>
            <p className="mt-3 max-w-md text-sm font-medium leading-relaxed text-white/90">
              Trusted brands and genuine products for every home, office and commercial space.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 sm:py-16">
        <div className="mb-10">
          <h2 className="text-3xl font-extrabold text-primary sm:text-4xl">Trusted <span className="text-accent">Brands</span></h2>
          <div className="mt-3 h-1 w-12 bg-accent" />
          <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
            We deal in trusted and well-known brands, offering genuine products across furniture, home appliances, fans, lighting and commercial solutions.
          </p>
        </div>
          
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {brands.map((brand) => (
              <div 
                key={brand.id}
                className="group flex flex-col items-center justify-center gap-4 border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-accent hover:shadow-lg sm:p-8"
              >
                <div className="relative h-20 w-full flex items-center justify-center">
                  <Image 
                    src={brand.image}
                    alt={brand.name}
                    fill 
                    className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300" 
                  />
                </div>
                <span className="text-gray-700 text-sm font-semibold tracking-wide text-center">
                  {brand.name}
                </span>
              </div>
            ))}
          </div>
          {brands.length === 0 && <p className="text-sm text-gray-500">Our brand list is being updated.</p>}
      </section>

      {/* Ratings Section */}
      <section className="border-t border-gray-100 bg-gray-50 px-6 py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-primary sm:text-4xl">Ratings <span className="text-accent">&amp; Reviews</span></h2>
          <div className="mt-3 h-1 w-12 bg-accent" />
          
            <RatingSummary />
          
        </div>
      </section>
    </main>
  );
}
