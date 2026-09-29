"use client";

import type { PublicGalleryImage } from "@/lib/publicGalleries";
import { Pause, Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function TrendingCarousel({ images }: { images: PublicGalleryImage[] }) {
  const [paused, setPaused] = useState(false);

  if (images.length === 0) return null;

  const isLooping = images.length > 1;
  const animationDuration = `${Math.max(images.length * 7, 20)}s`;

  const renderCards = (duplicate = false) => (
    <div className="flex shrink-0 gap-4 pr-4">
      {images.map((image, index) => (
        <article key={`${duplicate ? "duplicate-" : ""}${image.id}`} className="w-[78vw] shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm sm:w-80 lg:w-[340px]">
          <div className="relative aspect-16/10 bg-gray-100">
            <Image
              src={image.image}
              alt={image.title}
              fill
              priority={!duplicate && index === 0}
              sizes="(min-width: 1024px) 340px, (min-width: 640px) 320px, 78vw"
              className="object-contain"
            />
          </div>
          <div className="flex min-h-16 items-center px-4 py-3">
            <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-gray-900">{image.title}</h3>
          </div>
        </article>
      ))}
    </div>
  );

  return (
    <section className="overflow-hidden bg-gray-50 py-10 sm:py-12" aria-label="Trending images">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-6 flex items-center justify-between gap-4 sm:mb-8">
          <h2 className="text-2xl font-extrabold text-primary sm:text-3xl">Our Trending Products</h2>
          {isLooping && (
            <button type="button" onClick={() => setPaused((current) => !current)} aria-label={paused ? "Resume trending marquee" : "Pause trending marquee"} aria-pressed={paused} title={paused ? "Resume scrolling" : "Pause scrolling"} className="flex h-10 w-10 shrink-0 items-center justify-center border border-gray-300 bg-white text-gray-700 transition hover:border-primary hover:text-primary">
              {paused ? <Play size={16} /> : <Pause size={16} />}
            </button>
          )}
        </div>

        <div className="relative overflow-hidden">
          <div
            className={`flex w-max ${isLooping ? "animate-marquee motion-reduce:animate-none" : ""}`}
            style={{ animationDuration, animationPlayState: paused ? "paused" : "running" }}
          >
            {renderCards()}
            {isLooping && <div aria-hidden="true">{renderCards(true)}</div>}
          </div>
        </div>
      </div>
    </section>
  );
}