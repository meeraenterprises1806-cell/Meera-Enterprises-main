import ExpandableGallery from "@/components/ExpandableGallery";
import { companyInfo } from "@/data/company";
import { getPublicInfrastructureImages } from "@/lib/publicGalleries";
import { CheckCircle } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "Infrastructure - Meera Enterprises",
  description: "Explore our sourcing, storage, testing, and installation capabilities equipped with modern tools and quality processes.",
};

export const dynamic = "force-dynamic";

export default async function InfrastructurePage() {
  const facilityImages = await getPublicInfrastructureImages();

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="bg-primary py-5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-6">Our Infrastructure</h1>
          <p className="text-blue-100 text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            Modern sourcing, storage, testing, and installation capabilities equipped with reliable technology.
          </p>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            {/* Content Side */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 text-center lg:text-left">
                World-Class Supply Capabilities
              </h2>
              <p className="text-gray-600 mb-10 text-lg leading-relaxed text-center lg:text-left">
                Our facilities are designed for reliable sourcing and handling of PPR-C pipes and fittings, 
                with dedicated areas for testing, warehousing, and dispatch to ensure optimal product integrity.
              </p>
              <div className="space-y-4">
                {companyInfo.infrastructure.map((item) => (
                  <div key={item} className="flex items-center gap-4 bg-gray-50 p-5 rounded-xl border border-gray-100 transition-all hover:shadow-sm">
                    <CheckCircle size={24} className="text-accent shrink-0" />
                    <span className="text-gray-800 font-semibold text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Side */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src="/ourinframainimg.png" 
                alt="Meera Enterprises Facility"
                width={700} 
                height={500} 
                className="w-full h-[500px] object-cover" 
              />
            </div>
          </div>

          {/* Gallery Section */}
          <div className="border-t border-gray-100 pt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Facility Gallery</h2>
            <ExpandableGallery 
              images={facilityImages} 
              initialLimit={9} 
              gridClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
              imageClassName="h-72 rounded-2xl shadow-sm hover:shadow-md transition-shadow" 
            />
          </div>
        </div>
      </section>
    </main>
  );
}
