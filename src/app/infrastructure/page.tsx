import { companyInfo } from "@/data/company";
import { getPublicCertifications } from "@/lib/publicGalleries";
import { ArrowUpRight, Award, CheckCircle, FileText } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "Certificates - Meera Enterprises",
  description: "View Meera Enterprises' business profile credentials, quality standards, and certificate documents.",
};

export const dynamic = "force-dynamic";

export default async function InfrastructurePage() {
  const certifications = await getPublicCertifications();

  return (
    <main className="overflow-hidden bg-white">
      <section className="page-hero-background relative min-h-44 overflow-hidden sm:min-h-52">
        <div className="relative mx-auto flex min-h-44 max-w-7xl items-center px-6 py-6 sm:min-h-52 sm:py-8">
          <div>
            <p className="mb-3 text-xs font-semibold text-white/80">Home <span className="mx-2 text-accent">›</span> Certificates</p>
            <h1 className="text-3xl font-extrabold text-white sm:text-4xl">Business <span className="text-accent">Certificates</span></h1>
            <p className="mt-3 max-w-lg text-sm font-medium leading-relaxed text-white/90">Company credentials and supporting documents for {companyInfo.name}.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <section aria-labelledby="business-profile-title" className="border border-gray-200 bg-gray-50 p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">Business profile</p>
            <h2 id="business-profile-title" className="mt-2 text-2xl font-extrabold text-primary">{companyInfo.name}</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              {companyInfo.name} was established with a simple vision: to bring <strong className="font-semibold text-gray-800">quality, comfort and style</strong> to every home and workplace. Based in <strong className="font-semibold text-gray-800">Tirumalagiri, Secunderabad, Hyderabad, Telangana</strong>, we deal in a wide range of products including <strong className="font-semibold text-gray-800">furniture, chairs, tables, home appliances, fans, lighting and more</strong>. We are committed to providing genuine products from trusted brands at competitive prices, backed by reliable service and customer satisfaction.
            </p>
            <dl className="mt-6 divide-y divide-gray-200 border-y border-gray-200">
              <div className="flex justify-between gap-4 py-3 text-sm"><dt className="text-gray-500">Established</dt><dd className="font-semibold text-gray-900">2026</dd></div>
              <div className="flex justify-between gap-4 py-3 text-sm"><dt className="text-gray-500">Experience</dt><dd className="font-semibold text-gray-900">1 Years</dd></div>
              <div className="flex justify-between gap-4 py-3 text-sm"><dt className="text-gray-500">Location</dt><dd className="max-w-[65%] text-right font-semibold text-gray-900">Tirumalagiri, Secunderabad, Hyderabad, Telangana – 500015</dd></div>
              <div className="flex justify-between gap-4 py-3 text-sm"><dt className="text-gray-500">Website</dt><dd className="text-right font-semibold text-gray-900"><a href="http://www.meeraenterprise.in/" target="_blank" rel="noreferrer" className="break-all text-primary hover:text-accent">www.meeraenterprise.in</a></dd></div>
            </dl>
          </section>

          <section aria-labelledby="profile-credentials-title">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">Business credentials</p>
            <h2 id="profile-credentials-title" className="mt-2 text-2xl font-extrabold text-primary">Quality &amp; Business Standards</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                { title: "Genuine Products", description: "Products sourced from trusted and established brands." },
                { title: "Trusted Brands", description: "A carefully selected range of furniture, appliances, fans, lighting and other products." },
                { title: "Quality Assurance", description: "Focus on product quality, reliability and customer satisfaction." },
                { title: "Competitive Pricing", description: "Best-value products for homes, offices, businesses and institutions." },
                { title: "Customer Service", description: "Dedicated support from enquiry to product delivery and after-sales assistance." },
              ].map((credential) => (
                <article key={credential.title} className="flex min-h-24 items-start gap-3 border border-gray-200 bg-white px-4 py-4">
                  <CheckCircle size={19} className="mt-0.5 shrink-0 text-accent" />
                  <div>
                    <h3 className="text-sm font-bold leading-5 text-gray-900">{credential.title}</h3>
                    <p className="mt-1 text-sm leading-5 text-gray-600">{credential.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        <section aria-labelledby="documents-title" className="mt-14 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-12">
          <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">Documents</p>
              <h2 id="documents-title" className="mt-2 text-2xl font-extrabold text-primary">Certificate documents</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-gray-600">View or open the supporting certificates and documents published by {companyInfo.name}.</p>
          </div>
          {certifications.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {certifications.map((certification) => {
                const extension = certification.fileUrl.split(/[?#]/)[0].split(".").pop()?.toLowerCase() ?? "";
                const isImage = ["jpg", "jpeg", "png", "webp", "gif"].includes(extension);
                const isPdf = extension === "pdf";

                return (
                  <article key={certification.id} className="overflow-hidden border border-gray-200 bg-white">
                    <div className="relative h-64 bg-gray-50">
                      {isImage ? (
                        <Image src={certification.fileUrl} alt={certification.title} fill sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw" unoptimized className="object-contain" />
                      ) : isPdf ? (
                        <iframe src={certification.fileUrl} title={`${certification.title} certificate preview`} className="h-full w-full border-0 bg-white" />
                      ) : (
                        <div className="flex h-full flex-col items-center justify-center gap-3 text-gray-600">
                          <FileText size={42} strokeWidth={1.5} />
                          <span className="text-xs font-bold uppercase tracking-wider">{extension || "Document"} file</span>
                        </div>
                      )}
                    </div>
                    <div className="flex min-h-20 items-center justify-between gap-4 border-t border-gray-100 px-5 py-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <Award size={19} className="shrink-0 text-accent" />
                        <h3 className="font-semibold leading-5 text-gray-900">{certification.title}</h3>
                      </div>
                      <a href={certification.fileUrl} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:text-accent">
                        View <ArrowUpRight size={16} />
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <p className="border border-dashed border-gray-300 px-5 py-12 text-center text-sm text-gray-500">Supporting certificate documents will appear here.</p>
          )}
        </section>
      </section>
    </main>
  );
}
