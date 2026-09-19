import RatingSummary from "@/components/RatingSummary";
import { companyInfo } from "@/data/company";
import Image from "next/image";

export const metadata = {
  title: "Brands - Meera Enterprises",
  description: "Explore trusted brands offering genuine furniture, appliances, fans, lighting and commercial solutions.",
};

export default function ClientsPage() {
  return (
    <main className="bg-white">
      <section className="relative min-h-60 overflow-hidden bg-primary sm:min-h-72">
        <Image src="/images/aboutus.png" alt="Brands at Meera Enterprises" fill priority className="object-cover object-right opacity-80" />
        <div className="absolute inset-0 bg-linear-to-r from-[#071827] via-[#071827]/85 to-transparent" />
        <div className="relative mx-auto flex min-h-60 max-w-7xl items-center px-6 py-10 sm:min-h-72 sm:py-12">
          <div>
            <p className="mb-3 text-xs font-semibold text-white/80">Home <span className="mx-2 text-accent">›</span> Brands</p>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">We Deal In <span className="text-accent">Brands</span></h1>
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
            {companyInfo.clientLogos.map((client) => (
              <div 
                key={client.name} 
                className="group flex flex-col items-center justify-center gap-4 border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-accent hover:shadow-lg sm:p-8"
              >
                <div className="relative h-20 w-full flex items-center justify-center">
                  <Image 
                    src={client.image} 
                    alt={client.name} 
                    fill 
                    className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300" 
                  />
                </div>
                <span className="text-gray-700 text-sm font-semibold tracking-wide text-center">
                  {client.name}
                </span>
              </div>
            ))}
          </div>
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
