"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS_SERVICES } from "@/components/sections/ProductsCarousel";


export function HeroProductsSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = PRODUCTS_SERVICES.length;
  const current = PRODUCTS_SERVICES[currentIndex % PRODUCTS_SERVICES.length]; // Keep text from existing products, loop if needed

  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 3800);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, total]);


  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 8000);
  };


  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 8000);
  };


  const handleSelect = (idx: number) => {
    setCurrentIndex(idx);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 8000);
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-white/80 dark:bg-white/5 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-2xl transition-all">
      {/* Top Header Bar of Slideshow Card */}
      <div className="flex items-center justify-end px-4 sm:px-6 py-3 border-b border-white/40 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-sm">

        <div className="flex items-center gap-3">
          <span className="text-xs sm:text-sm font-bold text-foreground/80">
            <span className="text-accent">{String(currentIndex + 1).padStart(2, "0")}</span> / {String(total).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-xs sm:text-sm font-medium px-3 py-1 rounded-lg bg-surface border border-border/60 text-muted-foreground hover:text-foreground transition-all flex items-center gap-1.5"
            title={isPlaying ? "Pause slideshow" : "Resume slideshow"}
          >
            {isPlaying ? (
              <>
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
                <span>Pause</span>
              </>
            ) : (
              <>
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                <span>Play</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Image Slideshow Container */}
      <div className="relative h-64 sm:h-80 md:h-[360px] lg:h-[400px] w-full overflow-hidden bg-transparent group">
        {PRODUCTS_SERVICES.map((item, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={`hevo-slide-${idx}`}
              className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${
                isActive ? "opacity-100 scale-100 z-10" : "opacity-0 scale-105 z-0 pointer-events-none"
              }`}
            >
              <Image src={item.image}
                alt={current.title}
                fill
                priority={idx === 0 || idx === 1}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            </div>
          );
        })}

        <div className="absolute top-4 left-4 z-20">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 shadow-lg">
            {current.category}
          </span>
        </div>

        <div className="absolute inset-y-0 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous product"
            className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-accent text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all pointer-events-auto shadow-lg hover:scale-110 active:scale-95"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next product"
            className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-accent text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all pointer-events-auto shadow-lg hover:scale-110 active:scale-95"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 z-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div className="max-w-xl">
              <h3 className="text-lg sm:text-2xl md:text-3xl font-black text-white leading-tight drop-shadow-md">
                {current.title}
              </h3>
              <p className="text-sm sm:text-base text-white/90 line-clamp-2 mt-1 drop-shadow font-medium">
                {current.description}
              </p>
            </div>

            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-accent hover:bg-accent/90 text-white font-bold text-sm uppercase tracking-wide transition-all shadow-md active:scale-95 whitespace-nowrap self-start sm:self-auto"
            >
              <span>Inspect Details</span>
              <span>â†’</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Slide Thumbnails & Fast Scrubber Track */}
      <div className="p-3 sm:p-4 bg-white/80 dark:bg-white/5 backdrop-blur-md border-t border-white/40 dark:border-white/10 flex items-center gap-2 overflow-x-auto scrollbar-none">
        {PRODUCTS_SERVICES.map((item, idx) => {
          const isSelected = idx === currentIndex;
          const mappedProduct = item;
          return (
            <button
              key={`thumb-${idx}`}
              type="button"
              onClick={() => handleSelect(idx)}
              className={`flex-shrink-0 px-2.5 py-1.5 rounded-xl text-left transition-all border ${
                isSelected
                  ? "bg-accent text-white border-accent shadow-md scale-105 ring-2 ring-accent/30"
                  : "bg-surface text-muted-foreground border-border/60 hover:text-foreground hover:bg-surface-secondary"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[9px] font-bold opacity-80">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="text-[11px] font-bold truncate max-w-[120px]">
                  {mappedProduct.title.split(" (")[0]}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}


