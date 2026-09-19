import { getPublishedBlogsPage, parseBlogImages, parseBlogTags } from "@/lib/publicBlogs";
import { ArrowRight, Calendar, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Blog & Insights - Meera Enterprises",
  description: "Helpful ideas, buying guides, product information and the latest trends in furniture, home appliances, office solutions, fans and lighting.",
};

export const dynamic = "force-dynamic";

const pageSize = 9;

function pageHref(page: number) {
  return page <= 1 ? "/blogs" : `/blogs?page=${page}`;
}

export default async function BlogsPage({ searchParams }: { searchParams: Promise<{ page?: string | string[] }> }) {
  const resolvedSearchParams = await searchParams;
  const rawPage = Array.isArray(resolvedSearchParams.page) ? resolvedSearchParams.page[0] : resolvedSearchParams.page;
  const requestedPage = Math.max(1, Number.parseInt(rawPage || "1", 10) || 1);
  const { items: blogs, pagination } = await getPublishedBlogsPage(requestedPage, pageSize);
  const pages = Array.from({ length: pagination.totalPages }, (_, index) => index + 1).filter((item) => item === 1 || item === pagination.totalPages || Math.abs(item - pagination.page) <= 1);

  return (
    <main className="bg-white">
      <section className="relative min-h-60 overflow-hidden bg-primary sm:min-h-72">
        <Image src="/images/aboutus.jpg" alt="Meera Enterprises blog" fill priority className="object-cover object-right opacity-80" />
        <div className="absolute inset-0 bg-linear-to-r from-[#071827] via-[#071827]/85 to-transparent" />
        <div className="relative mx-auto flex min-h-60 max-w-7xl items-center px-6 py-10 sm:min-h-72 sm:py-12">
          <div>
            <p className="mb-3 text-xs font-semibold text-white/80">Home <span className="mx-2 text-accent">›</span> Blog &amp; Insights</p>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Blog <span className="text-accent">&amp; Insights</span></h1>
            <p className="mt-3 max-w-md text-sm font-medium leading-relaxed text-white/90">
              Helpful ideas, buying guides, product information and the latest trends in furniture, home appliances, office solutions, fans and lighting.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-5">
        <div className="max-w-7xl mx-auto px-6">
          {blogs.length === 0 ? (
            <div className="text-center py-20 text-gray-500">No blog posts published yet. Check back soon!</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => {
                const tags = parseBlogTags(blog.tags);
                const thumbnail = blog.coverImage || parseBlogImages(blog.images)[0] || "";
                return (
                  <Link key={blog.id} href={`/blogs/${blog.slug}`} className="group flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden">
                    <div className="relative h-60 overflow-hidden">
                      {thumbnail ? (
                        <Image src={thumbnail} alt={blog.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="h-full w-full bg-gray-100" />
                      )}
                      {tags[0] && <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{tags[0]}</span>}
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-4 text-gray-400 text-xs mb-4 font-medium uppercase tracking-wide">
                        <span className="flex items-center gap-1.5"><Calendar size={14} />{new Date(blog.publishedAt || blog.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}</span>
                        <span className="flex items-center gap-1.5"><User size={14} />{blog.author}</span>
                      </div>
                      <h3 className="font-bold text-gray-900 text-lg mb-3 group-hover:text-primary transition-colors line-clamp-2">{blog.title}</h3>
                      <p className="text-gray-600 text-sm mb-6 flex-grow line-clamp-3">{blog.excerpt}</p>
                      <span className="inline-flex items-center gap-2 text-primary font-bold text-sm group-hover:gap-3 transition-all">
                        Read Article <ArrowRight size={16} />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="mt-16 flex justify-center items-center gap-2">
              <Link href={pageHref(pagination.page - 1)} className={`px-4 py-2 border rounded-lg ${pagination.page === 1 ? "pointer-events-none text-gray-300" : "hover:border-primary hover:text-primary"}`}>Prev</Link>
              {pages.map((item) => (
                <Link key={item} href={pageHref(item)} className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold transition-all ${item === pagination.page ? "bg-primary text-white" : "border hover:border-primary"}`}>
                  {item}
                </Link>
              ))}
              <Link href={pageHref(pagination.page + 1)} className={`px-4 py-2 border rounded-lg ${pagination.page === pagination.totalPages ? "pointer-events-none text-gray-300" : "hover:border-primary hover:text-primary"}`}>Next</Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
