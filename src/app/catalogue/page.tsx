import { BookOpen, Download, ExternalLink } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "Catalogue - Meera Enterprises",
  description: "View and download the Meera Enterprises product catalogue and technical brochures.",
};

export default function CataloguePage() {
  const catalogues = [
    {
      title: "Home Appliances Catalogue",
      description: "Explore practical and reliable appliances for modern homes and workplaces.",
      file: "/Home_Appliances.pdf",
    },
    {
      title: "Crompton Fans Catalogue",
      description: "Browse Crompton fans and ventilation solutions for comfortable spaces.",
      file: "/PZ_Crompton_Fans_Catalogue_-_12_Feb.pdf",
    },
    {
      title: "Supreme Furniture Catalogue",
      description: "Discover furniture solutions for homes, offices, institutions and commercial spaces.",
      file: "/supreme.pdf",
    },
  ];

  return (
    <main className="bg-white">
      <section className="relative min-h-60 overflow-hidden bg-primary sm:min-h-72">
        <Image src="/images/aboutus.png" alt="Meera Enterprises catalogues" fill priority className="object-cover object-right opacity-80" />
        <div className="absolute inset-0 bg-linear-to-r from-[#071827] via-[#071827]/85 to-transparent" />
        <div className="relative mx-auto flex min-h-60 max-w-7xl items-center px-6 py-10 sm:min-h-72 sm:py-12">
          <div>
            <p className="mb-3 text-xs font-semibold text-white/80">Home <span className="mx-2 text-accent">›</span> Catalogue</p>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Product <span className="text-accent">Catalogue</span></h1>
            <p className="mt-3 max-w-md text-sm font-medium leading-relaxed text-white/90">
              Browse our latest catalogues for furniture, home appliances, fans and lighting products.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10 text-center">
            <div className="mx-auto flex items-center justify-center gap-2 text-accent">
              <BookOpen size={20} />
              <span className="text-xs font-bold uppercase tracking-widest">Company Resources</span>
            </div>
            <h2 className="mt-3 text-3xl font-extrabold text-gray-900">Our Catalogues</h2>
            <p className="mx-auto mt-3 max-w-2xl text-gray-600">Open a catalogue online or download it for offline reference.</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {catalogues.map((catalogue) => (
              <article key={catalogue.file} className="border border-gray-200 bg-white p-6 shadow-sm transition hover:border-accent hover:shadow-lg">
                <div className="flex h-14 w-14 items-center justify-center bg-accent/10 text-accent">
                  <BookOpen size={28} />
                </div>
                <h3 className="mt-6 text-xl font-bold text-primary">{catalogue.title}</h3>
                <p className="mt-3 min-h-14 text-sm leading-6 text-gray-600">{catalogue.description}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href={catalogue.file} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-accent px-4 py-2.5 text-sm font-bold text-white transition hover:bg-accent-dark">
                    <ExternalLink size={16} /> Open Catalogue
                  </a>
                  <a href={catalogue.file} download className="inline-flex items-center gap-2 border border-gray-300 px-4 py-2.5 text-sm font-bold text-gray-700 transition hover:border-primary hover:text-primary">
                    <Download size={16} /> Download
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 h-[70vh] overflow-hidden border border-gray-200 bg-white shadow-sm">
            <iframe src="/supreme.pdf#view=FitH" title="Supreme Furniture Catalogue" className="h-full w-full" />
          </div>
          <p className="mt-3 text-center text-sm text-gray-500">Supreme Furniture Catalogue preview. Use Open Catalogue to view any PDF in a new tab.</p>
        </div>
      </section>
    </main>
  );
}
