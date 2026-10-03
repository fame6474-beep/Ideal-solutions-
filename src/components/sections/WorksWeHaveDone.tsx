"use client";

import { useState } from "react";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import worksData from "./worksData.json";

export interface WorkItem {
  id: number;
  src: string;
  title: string;
  category: string;
  categoryLabel: string;
  location: string;
}

export function WorksWeHaveDone() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedPhoto, setSelectedPhoto] = useState<WorkItem | null>(null);
  const [displayLimit, setDisplayLimit] = useState<number>(18);

  const filterTabs = [
    { id: "all", label: "All Completed Works", count: worksData.length },
    { id: "shingles", label: "Roofing Shingles & Villas", count: worksData.filter((w) => w.category === "shingles").length },
    { id: "roofing", label: "Structural Roofing & Steel", count: worksData.filter((w) => w.category === "roofing").length },
    { id: "ceiling", label: "Gypsum False Ceilings", count: worksData.filter((w) => w.category === "ceiling").length },
  ];

  const filteredItems = activeFilter === "all"
    ? worksData
    : worksData.filter((item) => item.category === activeFilter);

  const displayedItems = filteredItems.slice(0, displayLimit);
  const hasMore = displayLimit < filteredItems.length;

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
    setDisplayLimit(18);
  };

  // Keyboard navigation for lightbox
  const handlePrevPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!selectedPhoto) return;
    const currentIndex = filteredItems.findIndex((item) => item.id === selectedPhoto.id);
    if (currentIndex > 0) {
      setSelectedPhoto(filteredItems[currentIndex - 1]);
    } else {
      setSelectedPhoto(filteredItems[filteredItems.length - 1]);
    }
  };

  const handleNextPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!selectedPhoto) return;
    const currentIndex = filteredItems.findIndex((item) => item.id === selectedPhoto.id);
    if (currentIndex < filteredItems.length - 1) {
      setSelectedPhoto(filteredItems[currentIndex + 1]);
    } else {
      setSelectedPhoto(filteredItems[0]);
    }
  };

  return (
    <section id="works" className="py-16 sm:py-24 md:py-32 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tight mb-4">
              WORKS WE HAVE DONE.
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">
              Explore our complete gallery of authentic completed Kerala luxury residences, structural steel roofs, PEB complexes, and designer gypsum false ceilings executed by Ideal Solutions.
            </p>
          </div>

          {/* Filter Tabs with Live Project Counters */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-10 sm:mb-12">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleFilterChange(tab.id)}
                className={`px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all border ${
                  activeFilter === tab.id
                    ? "bg-accent text-white border-accent shadow-lg shadow-accent/25 scale-105"
                    : "bg-surface/80 dark:bg-zinc-900/80 text-muted-foreground border-border/70 hover:text-foreground hover:border-accent/40"
                }`}
              >
                {tab.label} <span className="ml-1 opacity-75 font-mono">({tab.count})</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {displayedItems.map((item, idx) => (
            <Reveal key={item.id} delay={Math.min(idx * 0.025, 0.25)}>
              <div
                onClick={() => setSelectedPhoto(item)}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-950 border border-border/60 dark:border-white/10 shadow-md hover:shadow-2xl hover:border-accent transition-all duration-300 cursor-pointer"
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover group-hover:scale-108 transition-transform duration-500"
                  unoptimized
                />
                
                {/* Specular overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4">
                  <span className="text-[9px] sm:text-[10px] font-mono font-bold text-accent uppercase tracking-wider block mb-0.5">
                    {item.categoryLabel}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-white leading-tight drop-shadow truncate">
                    {item.title}
                  </h4>
                  <span className="text-[10px] text-white/80 font-mono mt-1 flex items-center gap-1.5">
                    <svg className="w-3 h-3 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Inspect Full Site Photo
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center mt-10 sm:mt-14">
            <button
              type="button"
              onClick={() => setDisplayLimit((prev) => prev + 24)}
              className="px-8 py-3.5 sm:px-10 sm:py-4 rounded-2xl bg-surface hover:bg-surface-secondary border border-border/80 text-foreground font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg hover:border-accent active:scale-95"
            >
              Load More Projects ({filteredItems.length - displayLimit} remaining) ↓
            </button>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* FULL-SCREEN PHOTO LIGHTBOX MODAL WITH ARROW NAVIGATION */}
      {/* ========================================================================= */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/90 backdrop-blur-xl animate-fadeIn"
          onClick={() => setSelectedPhoto(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-5xl w-full bg-zinc-950 border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              aria-label="Close image lightbox"
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 hover:bg-accent text-white flex items-center justify-center transition-all shadow-lg active:scale-95 border border-white/20"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Left Nav Arrow */}
            <button
              onClick={handlePrevPhoto}
              aria-label="Previous project photo"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/70 hover:bg-accent text-white flex items-center justify-center transition-all shadow-xl active:scale-95 border border-white/20"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Right Nav Arrow */}
            <button
              onClick={handleNextPhoto}
              aria-label="Next project photo"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/70 hover:bg-accent text-white flex items-center justify-center transition-all shadow-xl active:scale-95 border border-white/20"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* High-res Image View */}
            <div className="relative w-full h-[58vh] sm:h-[68vh] bg-black">
              <Image
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                fill
                sizes="100vw"
                className="object-contain"
                unoptimized
              />
            </div>

            {/* Modal Footer & Direct WhatsApp CTA */}
            <div className="p-4 sm:p-6 bg-surface dark:bg-zinc-900 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-accent uppercase tracking-widest block mb-1">
                  {selectedPhoto.categoryLabel} · Verified Kerala Installation
                </span>
                <h3 className="text-base sm:text-lg font-bold text-foreground">
                  {selectedPhoto.title}
                </h3>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={`https://wa.me/919567242157?text=Hi%20Ideal%20Solutions,%20I%20am%20interested%20in%20the%20roofing/construction%20specifications%20shown%20in%20project%20photo%20(${encodeURIComponent(selectedPhoto.title)}).`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto py-3 px-5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md active:scale-95"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  <span>Inquire About This Project</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
