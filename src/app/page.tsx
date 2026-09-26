import EnquiryButton from "@/components/EnquiryButton";
import InquiryForm from "@/components/InquiryForm";
import RatingSummary from "@/components/RatingSummary";
import { companyInfo } from "@/data/company";
import { getRecentPublishedBlogs, parseBlogImages } from "@/lib/publicBlogs";
import { getPublicProjectImages } from "@/lib/publicGalleries";
import {
    getPublicCategories,
    getPublicFeaturedProducts,
    getPublicNewArrivals,
} from "@/lib/publicProducts";
import {
    ArrowRight,
    Award,
    Calendar,
    CheckCircle,
    ChevronRight,
    Clock,
    Factory,
    Phone,
    Shield,
    Star,
    Tag,
    Truck,
    Users,
    Wrench,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const dynamic = "force-dynamic";

const iconMap: Record<string, React.ReactNode> = {
  shield: <Shield size={28} />,
  clock: <Clock size={28} />,
  tag: <Tag size={28} />,
  users: <Users size={28} />,
  truck: <Truck size={28} />,
  calendar: <Calendar size={28} />,
};

export default async function HomePage() {
  const [
    categories,
    newArrivals,
    featuredProducts,
    projectImages,
    recentBlogs,
  ] = await Promise.all([
    getPublicCategories(),
    getPublicNewArrivals(8),
    getPublicFeaturedProducts(8),
    getPublicProjectImages(),
    getRecentPublishedBlogs(3),
  ]);

  return (
    <main>
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative overflow-hidden bg-gray-50">
        {/* BACKGROUND: Kept as requested */}
        <div className="absolute inset-0">
          <Image
            src="/images/H1-photoaidcom-blur (1).jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gray-900/40" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* LEFT: Headline + USPs (Placement Preserved) */}
            <div className="text-white pt-2 sm:pt-4">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-sm mb-6 text-white font-medium">
                <Award size={16} className="text-accent" />
                <span>Furniture &amp; Home Appliances in Hyderabad</span>
              </div>
              <h1 className="max-w-xl text-3xl font-extrabold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl xl:text-5xl">
                <span className="block lg:whitespace-nowrap">Your Trusted Furniture</span>
                <span className="block lg:whitespace-nowrap"><span className="text-accent">Supplier &amp; Dealer</span></span>
                <span className="block text-accent lg:whitespace-nowrap">in Hyderabad</span>
              </h1>
              <ul className="space-y-3 mb-8">
                {[
                  "Genuine Products from Trusted Brands",
                  "Home Furniture & Office Furniture",
                  "Home Appliances, Electric Fans & Lighting",
                  "Competitive Prices & Reliable Service",
                  "Residential & Commercial Supply",
                  "Serving Hyderabad, Secunderabad & Tirumalagiri",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-gray-100 font-medium"
                  >
                    <CheckCircle size={20} className="text-accent shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT: Quick Enquiry Form + buttons (Placement Preserved) */}
            <div>
              <div className="bg-white/90 backdrop-blur-xl border border-white/20 shadow-2xl p-5 sm:p-7 rounded-3xl">
                <div className="mb-5">
                  <h2 className="text-xl font-bold text-gray-900">
                    Get a Free Quote
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    Fill in your requirement and we&apos;ll respond within 2
                    hours.
                  </p>
                </div>
                <InquiryForm compact />
                <p className="text-center text-xs text-gray-400 mt-4 uppercase tracking-wider font-medium">
                  Privacy Protected
                </p>
              </div>

              {/* Quick Contact Buttons (Placement Preserved) */}
              <div className="flex flex-wrap gap-2 sm:gap-3 mt-6">
                <a
                  href={`tel:${companyInfo.contact.phoneHref}`}
                  className="order-1 inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 sm:px-6 py-3 rounded-xl text-sm font-bold transition-all flex-1 sm:flex-none shadow-lg shadow-primary/20"
                >
                  <Phone size={16} /> Call Now
                </a>
                <a
                  href={`https://wa.me/${companyInfo.contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="order-2 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1eb858] text-white px-5 sm:px-6 py-3 rounded-xl text-sm font-bold transition-all flex-1 sm:flex-none shadow-lg shadow-[#25D366]/20"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
                <Link
                  href="/products"
                  className="order-3 inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white px-5 sm:px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-lg w-full sm:w-auto"
                >
                  View Products <ArrowRight size={16} />
                </Link>
              </div>

              {/* Rating badges (Placement Preserved) */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-5 bg-white/60 p-3 rounded-xl backdrop-blur-sm border border-white">
                <a
                  href={companyInfo.social.indiamart}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:opacity-70 transition-opacity"
                >
                  <div className="flex text-amber-400">
                    {[1, 2, 3, 4].map((s) => (
                      <Star key={s} size={16} className="fill-current" />
                    ))}
                    <Star size={16} className="text-gray-300" />
                  </div>
                  <span className="text-gray-900 text-sm font-bold">
                    4.0 on GeM Portal
                  </span>
                </a>
                <div className="text-gray-900 text-sm font-bold flex items-center gap-1">
                  <Factory size={14} /> Since 2026
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== ABOUT SECTION ==================== */}
      <section className="bg-white py-14 sm:py-20" id="about">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-1 w-12 bg-accent" />
              <span className="text-sm font-bold uppercase tracking-[0.16em] text-primary">About Company</span>
            </div>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight text-primary sm:text-4xl">
              Quality, Comfort and <span className="text-accent">Style</span> for Every Space
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-7 text-gray-600 sm:text-base">
              <p><strong className="text-primary">Meera Enterprises</strong> was established with a simple vision - to bring quality, comfort and style to every home and workplace.</p>
              <p>We are a trusted destination for furniture, chairs, tables, home appliances, fans, lighting and more, offering genuine products from trusted brands at the best prices.</p>
            </div>
            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {["Genuine products", "Trusted brands", "Best prices", "Friendly support"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <CheckCircle size={18} className="shrink-0 text-accent" />
                  {item}
                </div>
              ))}
            </div>
            <Link href="/about" className="mt-8 inline-flex items-center gap-2 bg-accent px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-accent-dark">
              Learn More About Us <ArrowRight size={18} />
            </Link>
          </div>

          <div className="relative h-72 overflow-hidden sm:h-88">
            <Image src="/images%20(14).png" alt="Meera Enterprises chair and furniture" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            <div className="absolute bottom-0 right-0 bg-white/95 px-6 py-4 text-right shadow-lg">
              <span className="block text-2xl font-extrabold text-accent">Better Homes</span>
              <span className="text-sm font-bold text-primary">Happier You</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== PRODUCT CATEGORIES ==================== */}
      <section className="py-20 sm:py-28 bg-white" id="products">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-0.5 bg-primary" />
              <span className="text-primary font-bold text-sm uppercase tracking-[0.2em]">
                Our Collection
              </span>
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Our Product Range
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Chairs, tables, home furniture, office furniture, home appliances,
              electric fans and lighting products for every space.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <div
                key={cat.slug}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col"
              >
                <Link
                  href={`/products/${cat.slug}`}
                  className="relative h-60 overflow-hidden block"
                >
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-white text-xl font-bold">{cat.name}</h3>
                    <span className="text-white/80 text-sm font-medium">
                      {cat.productCount} Available Products
                    </span>
                  </div>
                </Link>

                <div className="p-6 flex flex-col flex-1">
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-2">
                    {cat.description}
                  </p>

                  <div className="mt-auto flex items-center gap-3">
                    <Link
                      href={`/products/${cat.slug}`}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white px-4 py-3 rounded-xl text-xs font-bold transition-all"
                    >
                      View <ChevronRight size={14} />
                    </Link>
                    <EnquiryButton
                      productName={cat.name}
                      className="flex-[1.5] inline-flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-900 hover:border-primary hover:text-primary px-4 py-3 rounded-xl text-xs font-bold transition-all"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-lg hover:shadow-xl"
            >
              View All Products <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== NEW ARRIVALS ==================== */}
      <section className="py-20 sm:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-0.5 bg-primary" />
              <span className="text-primary font-bold text-sm uppercase tracking-[0.2em]">
                Latest Additions
              </span>
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              New Arrivals
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Explore our latest additions to the product range, featuring
              innovative designs and enhanced performance.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {newArrivals.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col"
              >
                <Link
                  href={`/products/${product.categorySlug}/${product.id}`}
                  className="relative h-40 sm:h-56 overflow-hidden block"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-accent text-white text-[10px] font-extrabold px-3 py-1 rounded-full tracking-widest uppercase">
                      New
                    </span>
                  </div>
                </Link>

                <div className="p-4 sm:p-5 flex flex-col flex-1">
                  <Link
                    href={`/products/${product.categorySlug}/${product.id}`}
                    className="font-bold text-gray-900 text-sm mb-4 line-clamp-2 group-hover:text-primary transition-colors"
                  >
                    {product.name}
                  </Link>

                  <div className="mt-auto grid grid-cols-1 gap-2">
                    <Link
                      href={`/products/${product.categorySlug}/${product.id}`}
                      className="inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all"
                    >
                      View Product
                    </Link>
                    <EnquiryButton
                      productName={product.name}
                      label="Ask for Details"
                      className="inline-flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-900 hover:border-primary hover:text-primary px-4 py-2.5 rounded-xl text-xs font-bold transition-all"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FEATURED PRODUCTS ==================== */}
      <section className="py-20 sm:py-28 bg-white" id="featured">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-0.5 bg-primary" />
              <span className="text-primary font-bold text-sm uppercase tracking-[0.2em]">
                Our Best
              </span>
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Our most popular PPR-C piping products trusted by industries
              across India.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col"
              >
                <Link
                  href={`/products/${product.categorySlug}/${product.id}`}
                  className="relative h-40 sm:h-56 overflow-hidden block"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-white text-[10px] font-extrabold px-3 py-1 rounded-full tracking-widest uppercase">
                      Featured
                    </span>
                  </div>
                </Link>

                <div className="p-4 sm:p-5 flex flex-col flex-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    {product.category}
                  </span>
                  <Link
                    href={`/products/${product.categorySlug}/${product.id}`}
                    className="font-bold text-gray-900 text-sm mb-4 mt-1 line-clamp-2 group-hover:text-primary transition-colors"
                  >
                    {product.name}
                  </Link>

                  <div className="mt-auto grid grid-cols-1 gap-2">
                    <Link
                      href={`/products/${product.categorySlug}/${product.id}`}
                      className="inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all"
                    >
                      View Product
                    </Link>
                    <EnquiryButton
                      productName={product.name}
                      label="Ask for Details"
                      className="inline-flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-900 hover:border-primary hover:text-primary px-4 py-2.5 rounded-xl text-xs font-bold transition-all"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-lg hover:shadow-xl"
            >
              Explore All Products <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== WHY CHOOSE US ==================== */}
      <section className="py-20 sm:py-28 bg-gray-50" id="why-choose-us">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-0.5 bg-primary" />
              <span className="text-primary font-bold text-sm uppercase tracking-[0.2em]">
                Our Advantage
              </span>
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Genuine products, trusted brands, helpful guidance, and reliable service for every home and workplace.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">
            {companyInfo.whyChooseUs.map((item) => (
              <div
                key={item.title}
                className="bg-white p-6 lg:p-5 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 text-center group"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  {iconMap[item.icon] ? (
                    React.cloneElement(
                      iconMap[
                        item.icon as keyof typeof iconMap
                      ] as React.ReactElement<Record<string, unknown>>,
                      { size: 32 },
                    )
                  ) : (
                    <Shield size={32} />
                  )}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== STATS SECTION ==================== */}
      <section className="py-12 sm:py-16 bg-linear-to-r from-primary-dark via-primary to-primary-light relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-40 h-40 bg-white rounded-full" />
          <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-white rounded-full" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {companyInfo.statsItems.map((stat) => (
              <div key={stat.label} className="text-center text-white">
                <div className="text-4xl lg:text-5xl font-bold mb-2 text-accent">
                  {stat.value}
                </div>
                <div className="text-blue-200 text-sm lg:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== WORK PROCESS ==================== */}
      <section className="py-20 sm:py-28 bg-white" id="process">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-0.5 bg-primary" />
              <span className="text-primary font-bold text-sm uppercase tracking-[0.2em]">
                Our Methodology
              </span>
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Our Work Process
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              From understanding your needs to ongoing support, we follow a clear,
              helpful process to make every purchase simple and reliable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                step: "01",
                title: "Understand Your Requirement",
                desc: "Tell us what you need for your home, office, commercial space or project.",
                icon: <Phone size={32} />,
              },
              {
                step: "02",
                title: "Product Selection",
                desc: "Our team helps you choose the right furniture, appliances, fans, lighting and other products according to your requirements and budget.",
                icon: <Wrench size={32} />,
              },
              {
                step: "03",
                title: "Get the Best Quote",
                desc: "We provide clear product details and competitive pricing with no unnecessary complications.",
                icon: <Tag size={32} />,
              },
              {
                step: "04",
                title: "Delivery & Support",
                desc: "We coordinate the delivery of your products and provide reliable customer support throughout the process.",
                icon: <Truck size={32} />,
              },
              {
                step: "05",
                title: "Customer Satisfaction",
                desc: "Our relationship does not end after delivery. We remain available for assistance and future requirements.",
                icon: <Users size={32} />,
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:shadow-xl transition-all duration-300 group"
              >
                {/* Step Indicator */}
                <div className="absolute top-6 left-6 text-2xl font-black text-primary/10 group-hover:text-primary/20 transition-colors">
                  {item.step}
                </div>

                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 text-primary shadow-sm group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PROJECT SHOWCASE ==================== */}
      {/* <section className="py-20 sm:py-28 bg-gray-50" id="projects">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-0.5 bg-primary" />
              <span className="text-primary font-bold text-sm uppercase tracking-[0.2em]">
                PORTFOLIO
              </span>
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Our Projects
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Showcasing our expertise in industrial piping installations across
              process industries.
            </p>
          </div>

          <ExpandableGallery images={projectImages} initialLimit={6} />
        </div>
      </section> */}

      {/* ==================== APPLICATIONS ==================== */}
      <section className="py-20 sm:py-28 bg-white" id="applications">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-0.5 bg-primary" />
              <span className="text-primary font-bold text-sm uppercase tracking-[0.2em]">
                Products for Every Space
              </span>
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Fields of Application
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Our wide range of quality products is suitable for homes, offices,
              commercial spaces, institutions, and everyday requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
            {[
              {
                title: "Home & Residential",
                items: [
                  "Living Room Furniture",
                  "Bedroom Furniture",
                  "Dining Furniture",
                  "Home Appliances",
                  "Fans & Lighting",
                  "Home Utility Products",
                ],
                color: "border-blue-200",
              },
              {
                title: "Office & Commercial",
                items: [
                  "Office Chairs",
                  "Office Tables & Workstations",
                  "Reception & Waiting Area Furniture",
                  "Storage Solutions",
                  "Commercial Furniture",
                  "Lighting Solutions",
                ],
                color: "border-green-200",
              },
              {
                title: "Education & Institutions",
                items: [
                  "School Furniture",
                  "Classroom Chairs & Tables",
                  "College & Institute Furniture",
                  "Institutional Seating",
                  "Office & Staff Furniture",
                ],
                color: "border-orange-200",
              },
              {
                title: "Business & Workplace",
                items: [
                  "Corporate Offices",
                  "Shops & Showrooms",
                  "Hotels & Restaurants",
                  "Commercial Establishments",
                  "Workspaces & Meeting Rooms",
                  "New Office Setup",
                ],
                color: "border-purple-200",
              },
              {
                title: "Everyday Solutions",
                items: [
                  "Fans & Electrical Products",
                  "Lighting Products",
                  "Furniture Accessories",
                  "Utility Products",
                  "Comfort & Workspace Solutions",
                ],
                color: "border-yellow-200",
              },
            ].map((app) => (
              <div
                key={app.title}
                className={`p-8 bg-white border-t-[6px] ${app.color} rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300`}
              >
                <h3 className="font-extrabold text-lg text-gray-900 mb-6">
                  {app.title}
                </h3>
                <ul className="space-y-3">
                  {app.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-sm text-gray-600 font-medium"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== RATINGS & REVIEWS ==================== */}
      <section className="py-20 sm:py-28 bg-gray-50" id="reviews">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-0.5 bg-primary" />
              <span className="text-primary font-bold text-sm uppercase tracking-[0.2em]">
                IndiaMART Verified
              </span>
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Ratings & Reviews
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              See what our customers say about us on IndiaMART.
            </p>
          </div>

          <RatingSummary />
        </div>
      </section>

      {/* ==================== TRUSTED CLIENTS ==================== */}
      <section className="py-20 sm:py-28 bg-white" id="clients">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-0.5 bg-primary" />
              <span className="text-primary font-bold text-sm uppercase tracking-[0.2em]">
                Our Brands
              </span>
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Trusted <span className="text-primary">Brands</span>
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              We deal in trusted and well-known brands, offering genuine products
              across furniture, home appliances, fans, lighting and commercial
              solutions.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
            {companyInfo.clientLogos.map((client) => (
              <div
                key={client.name}
                className="flex items-center justify-center h-32 bg-white rounded-2xl border border-gray-100 hover:border-primary/20 hover:shadow-xl transition-all duration-300 group"
              >
                <Image
                  src={client.image}
                  alt={client.name}
                  width={140}
                  height={60}
                  className="max-h-16 w-auto object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300 grayscale group-hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== BLOG / INSIGHTS ==================== */}
      <section className="py-20 sm:py-28 bg-white" id="blogs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-0.5 bg-primary" />
              <span className="text-primary font-bold text-sm uppercase tracking-[0.2em]">
                Latest News
              </span>
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
               Insights & Updates
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Stay informed with the latest product updates, buying guides, home & office ideas, and trends in furniture, appliances, fans and lighting solutions.
            </p>
          </div>

          {recentBlogs.length === 0 ? (
            <div className="border border-dashed border-gray-200 bg-gray-50 rounded-3xl px-5 py-16 text-center text-sm text-gray-500">
              No blog posts published yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentBlogs.map((post) => {
                const thumbnail =
                  post.coverImage ||
                  parseBlogImages(post.images)[0] ||
                  "/images/projects/WhatsApp Image 2026-04-17 at 12.17.21 PM.jpeg";
                return (
                  <Link
                    key={post.id}
                    href={`/blogs/${post.slug}`}
                    className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={thumbnail}
                        alt={post.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 block">
                        {new Date(
                          post.publishedAt || post.createdAt,
                        ).toLocaleDateString("en-IN", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <h3 className="font-bold text-gray-900 text-lg mb-3 leading-snug group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-6">
                        {post.excerpt}
                      </p>
                      <div className="mt-auto text-primary text-sm font-bold flex items-center gap-2">
                        Read Article <ArrowRight size={16} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          <div className="text-center mt-16">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-lg hover:shadow-xl"
            >
              View All Articles <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== CTA / INQUIRY SECTION ==================== */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/sendenquiry.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-[2px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="text-white">
              <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
                Ready to Upgrade Your{" "}
                <span className="text-accent">Home or Workplace?</span>
              </h2>
              <p className="text-blue-100 mb-8 text-lg">
                Looking for quality furniture, office essentials, home appliances,
                fans or lighting products? <strong>Meera Enterprises</strong> offers
                genuine products from trusted brands at competitive prices. Contact
                us today for product details, pricing and assistance in choosing
                the right solution.
              </p>
              <div className="space-y-4">
                {[
                  "Wide Range of Furniture & Home Products",
                  "Genuine Products from Trusted Brands",
                  "Competitive Prices with Reliable Service",
                  "Quick Response to Your Enquiry",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-white font-medium"
                  >
                    <div className="p-1 rounded-full bg-accent/20">
                      <CheckCircle size={16} className="text-accent" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 sm:p-10 rounded-3xl shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">
                Send Your Inquiry
              </h3>
              <InquiryForm compact onDark />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
