import SiteFrame from "@/components/SiteFrame";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default:
      "Meera Enterprises - Quality, Comfort & Style for Every Space.",
    template: "%s | Meera Enterprises",
  },
  description:
    "Meera Enterprises is a trusted furniture store, furniture supplier and home appliances dealer in Secunderabad, Hyderabad. Shop quality home furniture, office furniture, chairs, tables, fans and lighting products at the best price.",
  keywords: [
    "Furniture Store", "Furniture Supplier", "Furniture Dealer", "Home Furniture", "Office Furniture", "Furniture in Hyderabad", "Furniture in Secunderabad", "Home Appliances", "Home Appliances Supplier", "Furniture & Home Appliances",
    "Chairs", "Office Chairs", "Plastic Chairs", "Dining Chairs", "Tables", "Office Tables", "Dining Tables", "Study Tables", "Electric Fans", "Ceiling Fans", "Lighting Products", "LED Lights", "Home Lighting", "Office Lighting",
    "Furniture Shop in Secunderabad", "Furniture Store in Secunderabad", "Furniture Supplier in Hyderabad", "Furniture Dealer in Hyderabad", "Office Furniture in Secunderabad", "Home Appliances in Hyderabad", "Furniture Near Tirumalagiri", "Furniture Shop Near Tirumalagiri",
    "Trusted Furniture Supplier", "Quality Furniture at Best Price", "Branded Furniture", "Affordable Furniture", "Furniture and Appliances Store", "Genuine Home Products", "Trusted Home Appliance Dealer", "Meera Enterprises",
  ],
  authors: [{ name: "Meera Enterprises" }],
  creator: "Meera Enterprises",
  publisher: "Meera Enterprises",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://radiatech.in",
  ),
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/Logo.png", type: "image/png" }],
    apple: [{ url: "/Logo.png", type: "image/png" }],
    shortcut: "/Logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Meera Enterprises",
    title: "Meera Enterprises - Quality, Comfort & Style for Every Space.",
    description:
      "Trusted furniture supplier and home appliance dealer serving Hyderabad, Secunderabad and Tirumalagiri with quality products at the best price.",
    images: [
      {
        url: "/Logo.png",
        width: 512,
        height: 512,
        alt: "Meera Enterprises Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Meera Enterprises | Furniture Supplier in Hyderabad",
    description:
      "Shop home furniture, office furniture, chairs, tables, fans and lighting products from Meera Enterprises.",
    images: ["/Logo.png"],
  },
  robots: { index: true, follow: true },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://radiatech.in";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "@id": `${siteUrl}/#organization`,
  name: "Meera Enterprises",
  url: siteUrl,
  logo: {
    "@type": "ImageObject",
    url: `${siteUrl}/Logo.png`,
    width: 512,
    height: 512,
  },
  image: `${siteUrl}/Logo.png`,
  description:
    "Trusted furniture supplier and home appliances dealer in Hyderabad and Secunderabad, offering genuine home products, office furniture and lighting solutions.",
  foundingDate: "2021",
  telephone: "+91-9030048871",
  email: "rajendrakushwaha366@gmail.com",
  priceRange: "$$",
  openingHours: "Mo-Sa 09:00-19:00",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-9030048871",
    contactType: "sales",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi"],
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Building No./Flat No.: 225/8, Floor No.: 2, 225 Road, Street-Patna Road, Nearby Landmark: Best Tea Point, Tirumalagiri",
    addressLocality: "Secunderabad, Hyderabad",
    addressRegion: "Telangana",
    postalCode: "500015",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 28.5706,
    longitude: 77.3219,
  },
  sameAs: [
    "https://www.facebook.com/Radiatechelectra/",
    "https://www.instagram.com/radia.tech?igsh=MTIwNzNkMG9tYmpvbg==",
    "https://www.indiamart.com/radiatechelectra/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  void children;
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full bg-white text-[#111] antialiased">
        {/* <div style={{ fontFamily: "sans-serif", color: "#111", textAlign: "center" }}>
          <p style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>Please contact to developer</p>
          <p style={{ fontSize: "1.5rem" }}>📞 7239066492</p>
        </div> */}
        <SiteFrame>
          {children}
        </SiteFrame>
      </body>
    </html>
  );
}
