"use client";

import { CheckCircle2, Handshake, ShieldCheck, Tag, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="overflow-hidden bg-white">
      <section className="relative min-h-60 overflow-hidden bg-primary sm:min-h-72">
        <Image src="/images/aboutus.png" alt="Meera Enterprises products" fill priority className="object-cover object-right opacity-80" />
        <div className="absolute inset-0 bg-linear-to-r from-[#071827] via-[#071827]/85 to-transparent" />
        <div className="relative mx-auto flex min-h-60 max-w-7xl items-center px-6 py-10 sm:min-h-72 sm:py-12">
          <div>
            <p className="mb-3 text-xs font-semibold text-white/80">Home <span className="mx-2 text-accent">›</span> About Us</p>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">About <span className="text-accent">Us</span></h1>
            <p className="mt-3 max-w-sm text-sm font-medium leading-relaxed text-white/90">Your Trusted Partner for Quality Furniture, Home Essentials &amp; More.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-14 lg:grid-cols-[1fr_1.05fr] lg:py-16">
        <div>
          <h2 className="text-3xl font-extrabold text-primary sm:text-4xl">Our <span className="text-accent">Story</span></h2>
          <div className="mt-3 h-1 w-12 bg-accent" />
          <div className="mt-6 space-y-4 text-sm leading-7 text-gray-600 sm:text-base">
            <p><strong className="text-primary">Meera Enterprises</strong> was established with a simple vision - to bring quality, comfort and style to every home and workplace.</p>
            <p>We started our journey in Secunderabad, Hyderabad, with a commitment to provide genuine products from trusted brands at the best prices. Today, we are proud to be a preferred destination for furniture, chairs, tables, home appliances, fans, lighting and more, serving customers with honesty, reliability and excellent service.</p>
          </div>
        </div>
        <div className="relative h-64 overflow-hidden sm:h-80">
          <Image src="/47.png" alt="Meera Enterprises furniture" fill className="object-cover" />
          <div className="absolute bottom-0 right-0 bg-white/95 px-5 py-3 text-right shadow-lg"><span className="block text-2xl font-extrabold text-accent">Better Homes</span><span className="text-sm font-bold text-primary">Happier You</span></div>
        </div>
      </section>

      <section className="bg-gray-50 py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-extrabold text-primary sm:text-4xl">Our <span className="text-accent">Values</span></h2>
          <div className="mt-3 h-1 w-12 bg-accent" />
          <div className="mt-8 grid divide-y border border-gray-200 bg-white sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {[
              { icon: ShieldCheck, title: "Quality First", desc: "We offer only genuine and durable products." },
              { icon: Handshake, title: "Customer Satisfaction", desc: "Your happiness is our success." },
              { icon: Tag, title: "Best Value", desc: "Competitive prices and great deals." },
              { icon: Users, title: "Long-Term Relationships", desc: "We build trust for a lifetime." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="px-5 py-6 text-center lg:px-4">
                <Icon className="mx-auto mb-4 text-accent" size={38} strokeWidth={1.8} />
                <h3 className="text-sm font-bold text-primary">{title}</h3>
                <p className="mt-2 text-xs leading-5 text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-14 sm:py-16 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <h2 className="text-3xl font-extrabold text-primary sm:text-4xl">Why <span className="text-accent">Choose Us?</span></h2>
          <div className="mt-3 h-1 w-12 bg-accent" />
          <ul className="mt-7 space-y-4 text-sm text-gray-600 sm:text-base">
            {[
              "Wide range of products from top brands (Supreme Furniture, Crompton, and more)",
              "Competitive prices & special offers",
              "Expert guidance & friendly support",
              "Fast & reliable delivery (wherever possible)",
              "After-sales support",
            ].map((item) => <li key={item} className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 shrink-0 text-accent" size={18} /> <span>{item}</span></li>)}
          </ul>
        </div>
        <div className="relative h-56 overflow-hidden sm:h-72">
          <Image src="/images/p4.jpg" alt="Meera Enterprises product range" fill className="object-cover" />
        </div>
      </section>

      <section className="bg-accent px-6 py-7 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div><p className="text-xl font-extrabold">Let&apos;s Make Your Space Beautiful</p><p className="text-sm text-white/85">Visit our store or get in touch with us today!</p></div>
          <Link href="/contact" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-accent transition hover:bg-gray-100">Contact Us <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </main>
  );
}
