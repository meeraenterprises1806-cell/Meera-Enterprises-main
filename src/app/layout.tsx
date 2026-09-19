import PopupModal from "@/components/PopupModal";
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
      "Meera Enterprises - Leading PPR-C Pipes & Fittings Supplier in India",
    template: "%s | Meera Enterprises",
  },
  description:
    "Meera Enterprises is a leading trader and supplier of PPR-C pipes and fittings for industrial applications. DIN 16962 compliant products with 50+ year service life. Serving businesses across India.",
  keywords: [
    "PPR pipes",
    "PPRC fittings",
    "industrial piping",
    "pipe supplier",
    "Meera Enterprises",
    "piping solutions India",
    "PPR-C pipes supplier",
    "DIN 16962 pipes",
    "industrial pipe fittings",
    "PPR valves",
    "pipe welding tools",
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
    title: "Meera Enterprises - Leading PPR-C Pipes & Fittings Supplier",
    description:
      "Leading trader and supplier of PPR-C pipes and fittings for industrial applications. DIN 16962 compliant. Trusted by 500+ businesses.",
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
    title: "Meera Enterprises - PPR-C Pipes Supplier",
    description:
      "Leading supplier of industrial PPR-C piping solutions in India.",
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
    "Leading trader and supplier of PPR-C pipes and fittings for industrial applications in India.",
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
          <PopupModal />
          {children}
        </SiteFrame>
      </body>
    </html>
  );
}
