export default function PageHero({ children }: { children: React.ReactNode }) {
  return (
    <section className="page-hero-background relative min-h-44 overflow-hidden sm:min-h-52">
      {children}
    </section>
  );
}