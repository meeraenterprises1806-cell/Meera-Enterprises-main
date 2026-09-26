import Image from "next/image";

export default function PageHero({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative min-h-60 overflow-hidden bg-primary sm:min-h-72">
      <Image src="/images/meet.jpg" alt="" fill priority sizes="100vw" className="object-cover object-center" />
      <div className="absolute inset-0 bg-linear-to-r from-[#071827]/90 via-[#071827]/72 to-[#071827]/35" />
      {children}
    </section>
  );
}