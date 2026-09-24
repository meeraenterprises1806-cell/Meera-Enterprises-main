"use client";

import useCategoryLinks from "@/components/useCategoryLinks";
import { companyInfo } from "@/data/company";
import { ChevronDown, Mail, MapPin, Menu, Phone, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type SearchProduct = {
  id: string;
  name: string;
  category: { name: string; slug: string };
};

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Catalogue", href: "/catalogue" },
  // { label: "Infrastructure", href: "/infrastructure" },
  { label: "Brands We Deal In", href: "/clients" },
  { label: "Distributor", href: "/distributor" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchProducts, setSearchProducts] = useState<SearchProduct[]>([]);
  const productLinks = useCategoryLinks();

  useEffect(() => {
    if (!searchOpen || searchProducts.length > 0) return;

    fetch("/api/products")
      .then((response) => (response.ok ? response.json() : []))
      .then((products: SearchProduct[]) => setSearchProducts(Array.isArray(products) ? products : []))
      .catch(() => setSearchProducts([]));
  }, [searchOpen, searchProducts.length]);

  const filteredProducts = searchProducts
    .filter((product) => `${product.name} ${product.category.name}`.toLowerCase().includes(searchQuery.trim().toLowerCase()))
    .slice(0, 6);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary text-white text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 sm:gap-4 flex-nowrap overflow-x-auto whitespace-nowrap scrollbar-none min-w-0">
            <span className="flex items-center gap-1 shrink-0">
              <MapPin size={14} />
              Tirumalagiri, Hyderabad, Telangana
            </span>
            <span className="flex">
              <a href={`tel:${companyInfo.contact.phoneHref}`} className="flex items-center gap-1 hover:text-accent transition-colors shrink-0">
              <Phone size={14} />
              {companyInfo.contact.phone1}
              
            </a>
            {" "}/{" "}
            <a href={`tel:${companyInfo.contact.phoneHref}`} className="flex items-center gap-1 hover:text-accent transition-colors shrink-0">
              
              {companyInfo.contact.phone2}
            </a>
            </span>
            <a href={`mailto:${companyInfo.contact.email}`} className="hidden sm:flex items-center gap-1 hover:text-accent transition-colors shrink-0">
              <Mail size={14} />
              {companyInfo.contact.email}
            </a>
          </div>
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {["facebook", "instagram", "indiamart"].map((s) => (
              <a key={s} href={companyInfo.social[s as keyof typeof companyInfo.social]} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label={s}>
                <SocialIcon name={s} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="bg-white/95 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-100">
  <div className="max-w-7xl mx-auto px-4">
    <div className="flex items-center justify-between h-20">
      
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 shrink-0">
        <Image src="/Logo.png" alt={companyInfo.name} width={96} height={52} className="h-13 w-24 object-contain" priority />
        <span className="flex flex-col text-xl font-extrabold leading-[0.95] tracking-tight">
          <span className="text-gray-700">Meera</span>
          <span className="text-accent">Enterprises</span>
        </span>
      </Link>

      {/* Desktop Nav */}
      {searchOpen ? (
        <div className="relative hidden min-w-0 flex-1 lg:block lg:mx-8">
          <div className="flex h-12 items-center rounded-full border border-gray-200 bg-gray-50 px-5 shadow-sm ring-1 ring-transparent transition focus-within:border-accent focus-within:bg-white focus-within:ring-accent/20">
            <Search size={20} className="mr-3 shrink-0 text-gray-400" />
            <input
              autoFocus
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search furniture, appliances, fans..."
              className="min-w-0 flex-1 bg-transparent text-sm font-medium text-gray-800 outline-none placeholder:text-gray-400"
              aria-label="Search products"
            />
            <button type="button" onClick={() => { setSearchOpen(false); setSearchQuery(""); }} className="ml-3 rounded-full p-1.5 text-gray-400 transition hover:bg-gray-200 hover:text-gray-700" aria-label="Close search">
              <X size={18} />
            </button>
          </div>
          {searchQuery.trim() && (
            <div className="absolute left-0 right-0 top-14 z-60 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl">
              {filteredProducts.length > 0 ? filteredProducts.map((product) => (
                <Link key={product.id} href={`/products/${product.category.slug}`} onClick={() => { setSearchOpen(false); setSearchQuery(""); }} className="block border-b border-gray-100 px-5 py-3 last:border-0 hover:bg-orange-50">
                  <span className="block text-sm font-bold text-gray-800">{product.name}</span>
                  <span className="block text-xs text-gray-500">{product.category.name}</span>
                </Link>
              )) : <p className="px-5 py-4 text-sm text-gray-500">No products found.</p>}
            </div>
          )}
        </div>
      ) : (
      <div className="hidden lg:flex items-center gap-1">
        {navLinks.map((link) =>
          link.href === "/products" ? (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <div className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-gray-700 hover:text-accent cursor-pointer transition-colors">
                {link.label}
                <ChevronDown size={14} className={`transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`} />
              </div>
              
              {dropdownOpen && (
                <div className="absolute top-full left-0 bg-white shadow-2xl border border-gray-100 py-3 min-w-[220px] rounded-b-xl animate-in fade-in slide-in-from-top-2">
                  {productLinks.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-6 py-2.5 text-sm text-gray-600 hover:text-accent hover:bg-gray-50 transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link
              key={link.label}
              href={link.href}
              className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-accent transition-colors"
            >
              {link.label}
            </Link>
          )
        )}
      </div>
      )}

      {/* CTA + Mobile Toggle */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => { setSearchOpen((open) => !open); setMobileOpen(false); }}
          className="hidden h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:border-accent hover:text-accent md:flex"
          aria-label={searchOpen ? "Close search" : "Search products"}
        >
          {searchOpen ? <X size={20} /> : <Search size={20} />}
        </button>
        <Link
          href="/contact"
          className="hidden md:flex bg-accent hover:bg-accent-dark text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-all shadow-lg shadow-accent/20"
        >
          Get Quote
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-gray-700"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </div>
  </div>

  {/* Mobile Nav */}
  {mobileOpen && (
    <div className="lg:hidden bg-white border-b border-gray-100 shadow-xl px-4 py-6 space-y-2 animate-in slide-in-from-top-4">
      <div className="mb-4 flex items-center rounded-full border border-gray-200 bg-gray-50 px-4 py-3 focus-within:border-accent">
        <Search size={18} className="mr-3 text-gray-400" />
        <input value={searchQuery} onChange={(event) => { setSearchQuery(event.target.value); setSearchOpen(true); }} placeholder="Search products..." className="min-w-0 flex-1 bg-transparent text-sm outline-none" aria-label="Search products" />
      </div>
      {navLinks.map((link) => (
        <div key={link.label}>
          <Link
            href={link.href}
            onClick={() => setMobileOpen(false)}
            className="block px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            {link.label}
          </Link>
          {link.href === "/products" && productLinks.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={() => setMobileOpen(false)}
              className="block pl-10 py-2 text-sm text-gray-500 hover:text-accent"
            >
              {child.label}
            </Link>
          ))}
        </div>
      ))}
    </div>
  )}
</nav>
    </>
  );
}

function SocialIcon({ name }: { name: string }) {
  const size = 16;
  switch (name) {
    case "facebook":
      return (
        <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      );
    case "twitter":
      return (
        <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
        </svg>
      );
    case "instagram":
      return (
        <svg width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      );
    case "youtube":
      return (
        <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
          <polygon points="9.75,15.02 15.5,11.75 9.75,8.48" fill="white" />
        </svg>
      );
    case "indiamart":
      return <span className="text-[11px] font-bold leading-none">IM</span>;
    default:
      return null;
  }
}
