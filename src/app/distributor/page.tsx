import { CheckCircle2, Handshake, ShieldCheck, Star, TrendingUp, Users } from "lucide-react";
import Link from "next/link";

const productHighlights = [
  { title: "Furniture", icon: "🪑", desc: "Office & home essentials" },
  { title: "Office Products", icon: "🖥️", desc: "Workplace solutions" },
  { title: "Appliances", icon: "🏠", desc: "Reliable home appliances" },
  { title: "Fans & Lighting", icon: "💡", desc: "Modern & energy efficient" },
];

const reasons = [
  { icon: Users, title: "Trusted Brands", desc: "Work with leading and genuine brands" },
  { icon: TrendingUp, title: "High Demand", desc: "Get consistent customer demand" },
  { icon: Star, title: "Marketing Support", desc: "Get promotional and digital support" },
  { icon: ShieldCheck, title: "Attractive Margins", desc: "Competitive pricing and healthy returns" },
];

const benefits = [
  { label: "Easy Registration", desc: "Simple and quick onboarding" },
  { label: "Dedicated Support", desc: "Support from our business team" },
  { label: "Wide Coverage", desc: "Serve multiple markets and channels" },
];

export default function DistributorPage() {
  return (
    <main className="overflow-hidden bg-white">
        <section className="page-hero-background relative min-h-44 overflow-hidden sm:min-h-52">
          <div className="relative mx-auto flex min-h-44 max-w-7xl items-center px-6 py-6 sm:min-h-52 sm:py-8">
            <div>
              <p className="mb-3 text-xs font-semibold text-white/80">Home <span className="mx-2 text-accent">›</span> Sub-Dealer</p>
              <h1 className="max-w-xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Become a Meera Enterprises <span className="text-accent">Sub-Dealer</span>
              </h1>
              <p className="mt-3 max-w-lg text-sm font-medium leading-relaxed text-white/90">
                Grow your business with genuine products, trusted brands and qualified customer enquiries.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/distributor/application" className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-bold text-white transition hover:bg-accent-dark">
                  Apply Now
                </Link>
                <Link href="/distributor/login" className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/20">
                  Sub-Dealer Login
                </Link>
              </div>
            </div>
          </div>
      </section>

      <section className="bg-gray-50 py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-extrabold text-primary sm:text-4xl">Why Become Our <span className="text-accent">Sub-Dealer?</span></h2>
          <div className="mt-3 h-1 w-12 bg-accent" />
          <div className="mt-8 grid divide-y border border-gray-200 bg-white sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {reasons.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="px-5 py-6 text-center lg:px-4">
                <Icon className="mx-auto mb-4 text-accent" size={38} strokeWidth={1.8} />
                <h3 className="text-sm font-bold text-primary">{title}</h3>
                <p className="mt-2 text-xs leading-5 text-gray-500">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <h3 className="text-3xl font-extrabold text-primary sm:text-4xl">Products You Can <span className="text-accent">Deal In</span></h3>
            <div className="mt-3 h-1 w-12 bg-accent" />
            <div className="mt-8 grid grid-cols-2 border border-gray-200 bg-white md:grid-cols-4">
              {productHighlights.map(({ title, icon, desc }) => (
                <div key={title} className="border-b border-gray-200 px-4 py-6 text-center last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
                  <div className="mb-3 text-3xl" aria-hidden="true">{icon}</div>
                  <div className="text-sm font-bold text-primary">{title}</div>
                  <div className="mt-2 text-xs leading-5 text-gray-500">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 sm:py-16">
        <div className="mb-8 flex items-end justify-between gap-5">
          <div>
            <h2 className="text-3xl font-extrabold text-primary sm:text-4xl">Partner With <span className="text-accent">Confidence</span></h2>
            <div className="mt-3 h-1 w-12 bg-accent" />
          </div>
          <Handshake className="hidden text-accent sm:block" size={48} strokeWidth={1.5} />
        </div>
        <div className="grid border border-gray-200 bg-white sm:grid-cols-3 sm:divide-x">
            {benefits.map((item) => (
              <div key={item.label} className="px-5 py-6 text-center">
                <CheckCircle2 className="mx-auto mb-3 text-accent" size={30} strokeWidth={1.8} />
                <div className="text-sm font-bold text-primary">{item.label}</div>
                <div className="mt-2 text-xs leading-5 text-gray-500">{item.desc}</div>
              </div>
            ))}
        </div>
      </section>

      <section className="bg-accent px-6 py-7 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div><p className="text-xl font-extrabold">Ready to Grow With Us?</p><p className="text-sm text-white/85">Apply today and become part of the Meera Enterprises network.</p></div>
          <Link href="/distributor/application" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-accent transition hover:bg-gray-100">Apply Now <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </main>
  );
}
