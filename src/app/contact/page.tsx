import InquiryForm from "@/components/InquiryForm";
import { companyInfo } from "@/data/company";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "Contact Us - Meera Enterprises",
  description: "Get in touch with Meera Enterprises for PPR-C pipes, fittings, and industrial piping solutions.",
};

export default function ContactPage() {
  return (
    <main className="bg-white">
      <section className="relative min-h-60 overflow-hidden bg-primary sm:min-h-72">
        <Image src="/images/aboutus.png" alt="Meera Enterprises products" fill priority className="object-cover object-right opacity-80" />
        <div className="absolute inset-0 bg-linear-to-r from-[#071827] via-[#071827]/85 to-transparent" />
        <div className="relative mx-auto flex min-h-60 max-w-7xl items-center px-6 py-10 sm:min-h-72 sm:py-12">
          <div>
            <p className="mb-3 text-xs font-semibold text-white/80">Home <span className="mx-2 text-accent">›</span> Contact Us</p>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Contact <span className="text-accent">Us</span></h1>
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
                  { icon: Mail, label: "Email", value: companyInfo.contact.email, href: `mailto:${companyInfo.contact.email}` },
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

          <div className="border border-gray-200 bg-gray-50 p-6 sm:p-10">
            <h2 className="text-3xl font-extrabold text-primary sm:text-4xl">Send Us a <span className="text-accent">Message</span></h2>
            <div className="mt-3 h-1 w-12 bg-accent" />
            <div className="mt-8"><InquiryForm /></div>
          </div>

          <div className="mt-14 h-100 overflow-hidden border border-gray-200 shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14010.323299611075!2d77.3944027!3d28.6123494!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cef4ac7007baf%3A0x1c29dd89f7f9b075!2sRadiatech%20Electra!5e0!3m2!1sen!2sin!4v1782324890802!5m2!1sen!2sin"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              title="Meera Enterprises Location"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
