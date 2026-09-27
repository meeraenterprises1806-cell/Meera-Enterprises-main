import InquiryForm from "@/components/InquiryForm";
import { companyInfo } from "@/data/company";
import { Clock, ExternalLink, Mail, MapPin, Phone } from "lucide-react";

export const metadata = {
  title: "Contact Us - Meera Enterprises",
  description: "Get in touch with Meera Enterprises for chairs, tables, home furniture, office furniture, home appliances, electric fans and lighting products solutions.",
};

export default function ContactPage() {
  return (
    <main className="bg-white">
      <section className="page-hero-background relative min-h-44 overflow-hidden sm:min-h-52">
        <div className="relative mx-auto flex min-h-44 max-w-7xl items-center px-6 py-6 sm:min-h-52 sm:py-8">
          <div>
            <p className="mb-3 text-xs font-semibold text-white/80">Home <span className="mx-2 text-accent">›</span> Contact Us</p>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Contact <span className="text-accent">Us</span></h1>
            <p className="mt-3 max-w-md text-sm font-medium leading-relaxed text-white/90">Have a question or need a quote? Reach out and our team will get back to you promptly.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <h2 className="text-3xl font-extrabold text-primary sm:text-4xl">Get In <span className="text-accent">Touch</span></h2>
            <div className="mt-3 h-1 w-12 bg-accent" />
            <p className="mt-6 text-sm leading-7 text-gray-600 sm:text-base">We are here to help you find the right products for your home or workplace. Contact our team for product guidance, pricing, or a quote.</p>
            <div className="mt-8 space-y-6">
                {[
                  { icon: Phone, label: "Phone-1", value: companyInfo.contact.phone1, href: `tel:${companyInfo.contact.phone1}` },
                  { icon: Phone, label: "Phone-2", value: companyInfo.contact.phone2, href: `tel:${companyInfo.contact.phone2}` },
                ].map((item) => (
                  <div key={item.label} className="flex gap-4 border-b border-gray-100 pb-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-accent/10">
                      <item.icon size={20} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-primary">{item.label}</h3>
                      <a href={item.href} className="mt-1 block text-sm text-gray-600 transition-colors hover:text-accent">{item.value}</a>
                    </div>
                  </div>
                ))}

                <div className="flex gap-4 border-b border-gray-100 pb-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-accent/10">
                    <Mail size={20} className="text-accent" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-primary">Email</h3>
                    <div className="mt-1 flex flex-wrap items-center gap-x-2 text-sm">
                      <a href={`mailto:${companyInfo.contact.email}`} className="text-gray-600 transition-colors hover:text-accent">{companyInfo.contact.email}</a>
                      <span className="text-gray-400" aria-hidden="true">|</span>
                      <a href="mailto:sales@meeraenterprise.in" className="text-gray-600 transition-colors hover:text-accent">sales@meeraenterprise.in</a>
                    </div>
                  </div>
                </div>
                
                {companyInfo.addresses.map((addr) => (
                  <div key={addr.label} className="flex gap-4 border-b border-gray-100 pb-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-accent/10">
                      <MapPin size={20} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-primary">{addr.label}</h3>
                      <p className="mt-1 text-sm leading-6 text-gray-600">{addr.address}</p>
                    </div>
                  </div>
                ))}

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-accent/10">
                    <Clock size={20} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-primary">Business Hours</h3>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Monday - Saturday: 10:00 AM - 7:00 PM</p>
                  </div>
                </div>
              </div>
          </div>

          <div className="space-y-8">
            <div className="border border-gray-200 bg-gray-50 p-6 sm:p-10">
              <h2 className="text-3xl font-extrabold text-primary sm:text-4xl">Send Us a <span className="text-accent">Message</span></h2>
              <div className="mt-3 h-1 w-12 bg-accent" />
              <div className="mt-8"><InquiryForm /></div>
            </div>
          </div>
        </div>

        <section aria-labelledby="location-title" className="mt-12 sm:mt-14">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 id="location-title" className="text-xl font-bold text-primary">Our Location</h2>
            <a
              href="https://www.google.com/maps/place/Sikandrabad,+Uttar+Pradesh+203205/@28.4494224,77.6759846,5891m/data=!3m2!1e3!4b1!4m6!3m5!1s0x390cbda68bb95089:0x619bd79cb5f04e01!8m2!3d28.4511246!4d77.6954889!16zL20vMGY2OWgy?entry=ttu&g_ep=EgoyMDI2MDkyMy4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-accent-dark"
            >
              Open in Google Maps <ExternalLink size={15} />
            </a>
          </div>
          <div className="aspect-[4/3] overflow-hidden border border-gray-200 shadow-sm sm:aspect-[16/7]">
            <iframe
              src="https://www.google.com/maps?q=28.4511246,77.6954889&z=14&output=embed"
              className="h-full w-full border-0"
              allowFullScreen
              loading="lazy"
              title="Sikandrabad, Uttar Pradesh location map"
            />
          </div>
        </section>
      </section>
    </main>
  );
}
