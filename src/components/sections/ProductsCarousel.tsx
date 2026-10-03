"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";

export interface MaterialColorOption {
  name: string;
  hex: string;
  textureLabel: string;
  brandAssociation?: string;
  sampleImage?: string;
}

export interface ProductServiceItem {
  id: number;
  title: string;
  category: "Roofing" | "Structural & PEB" | "Panels & Partitions" | "Architectural & Glass" | "Waterproofing & Renovation";
  description: string;
  image: string;
  associations?: string;
  badge?: string;
  availableColors?: MaterialColorOption[];
}

export const PRODUCTS_SERVICES: ProductServiceItem[] = [
  {
    id: 1,
    title: "IDEAL RENOVATION",
    category: "Waterproofing & Renovation",
    image: "/images/products_final/01.jpeg",
    description: "Premium quality ideal renovation solutions provided by Ideal Solutions.",
    badge: "IDEAL",
  },
  {
    id: 2,
    title: "IDEAL PEB",
    category: "Structural & PEB",
    image: "/images/products_final/02.jpeg",
    description: "Premium quality ideal peb solutions provided by Ideal Solutions.",
    badge: "IDEAL",
  },
  {
    id: 3,
    title: "IDEAL COMMERCIAL ROOFING",
    category: "Structural & PEB",
    image: "/images/products_final/03.jpg",
    description: "Premium quality ideal commercial roofing solutions provided by Ideal Solutions.",
    badge: "IDEAL",
  },
  {
    id: 4,
    title: "IDEAL ROOFING",
    category: "Roofing",
    image: "/images/products_final/04.jpeg",
    description: "Premium quality ideal roofing solutions provided by Ideal Solutions.",
    badge: "IDEAL",
  },
  {
    id: 5,
    title: "IDEAL RESIDENTIAL ROOFING",
    category: "Roofing",
    image: "/images/products_final/05.jpeg",
    description: "Premium quality ideal residential roofing solutions provided by Ideal Solutions.",
    badge: "IDEAL",
  },
  {
    id: 6,
    title: "THATCH ROOF SYSTEM",
    category: "Roofing",
    image: "/images/products_final/06.jpeg",
    description: "Premium quality thatch roof system solutions provided by Ideal Solutions.",
    badge: "THATCH",
  },
  {
    id: 7,
    title: "POLY CARBONATE SHEET ROOFING",
    category: "Roofing",
    image: "/images/products_final/07.jpeg",
    description: "Premium quality poly carbonate sheet roofing solutions provided by Ideal Solutions.",
    badge: "POLY",
  },
  {
    id: 8,
    title: "TRUSSLESS ARCH ROOF TECHNOLOGY",
    category: "Roofing",
    image: "/images/products_final/08.jpeg",
    description: "Premium quality trussless arch roof technology solutions provided by Ideal Solutions.",
    badge: "TRUSSLESS",
  },
  {
    id: 9,
    title: "SHINGLES ROOFING",
    category: "Roofing",
    image: "/images/products_final/09.jpeg",
    description: "Premium quality shingles roofing solutions provided by Ideal Solutions.",
    badge: "SHINGLES",
  },
  {
    id: 10,
    title: "STONE COATED METAL TILES ROOFING",
    category: "Roofing",
    image: "/images/products_final/10.jpeg",
    description: "Premium quality stone coated metal tiles roofing solutions provided by Ideal Solutions.",
    badge: "STONE",
  },
  {
    id: 11,
    title: "CEMENT FIBER BOARD WORK",
    category: "Panels & Partitions",
    image: "/images/products_final/11.jpeg",
    description: "Premium quality cement fiber board work solutions provided by Ideal Solutions.",
    badge: "CEMENT",
  },
  {
    id: 12,
    title: "MEMBRAINE WATER PROOFING",
    category: "Waterproofing & Renovation",
    image: "/images/products_final/12.jpeg",
    description: "Premium quality membraine water proofing solutions provided by Ideal Solutions.",
    badge: "MEMBRAINE",
  },
  {
    id: 13,
    title: "WALL PARTIONS",
    category: "Panels & Partitions",
    image: "/images/products_final/13.jpg",
    description: "Premium quality wall partions solutions provided by Ideal Solutions.",
    badge: "WALL",
  },
  {
    id: 14,
    title: "UV MARBLESHEET PANEL INTERIOR WALL COVERING",
    category: "Panels & Partitions",
    image: "/images/products_final/14.jpeg",
    description: "Premium quality uv marblesheet panel interior wall covering solutions provided by Ideal Solutions.",
    badge: "UV",
  },
  {
    id: 15,
    title: "GYPSUM CEILING",
    category: "Architectural & Glass",
    image: "/images/products_final/15.jpg",
    description: "Premium quality gypsum ceiling solutions provided by Ideal Solutions.",
    badge: "GYPSUM",
  },
  {
    id: 16,
    title: "ACP CLADING",
    category: "Architectural & Glass",
    image: "/images/products_final/16.jpeg",
    description: "Premium quality acp clading solutions provided by Ideal Solutions.",
    badge: "ACP",
  },
  {
    id: 17,
    title: "GLASS & GLAZING",
    category: "Architectural & Glass",
    image: "/images/products_final/17.jpeg",
    description: "Premium quality glass & glazing solutions provided by Ideal Solutions.",
    badge: "GLASS",
  },
];

export function ProductsCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedColors, setSelectedColors] = useState<Record<number, MaterialColorOption>>({});
  const [modalProduct, setModalProduct] = useState<ProductServiceItem | null>(null);
  const [modalViewMode, setModalViewMode] = useState<'sample' | 'installed'>('sample');
  
  // Drag handling state
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModalProduct(null);
      }
    };
    if (modalProduct) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [modalProduct]);

  const categories = [
    "All",
    "Roofing",
    "Structural & PEB",
    "Architectural & Glass",
    "Panels & Partitions",
    "Waterproofing & Renovation",
  ];

  const filteredItems = activeCategory === "All"
    ? PRODUCTS_SERVICES
    : PRODUCTS_SERVICES.filter((item) => item.category === activeCategory);

  const displayItems = filteredItems;

  const handleMouseDown = (e: React.MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    const el = containerRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    if (Math.abs(walk) > 5) {
      hasDraggedRef.current = true;
    }
    el.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const el = containerRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.touches[0].pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    const el = containerRef.current;
    if (!el) return;
    const x = e.touches[0].pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    if (Math.abs(walk) > 5) {
      hasDraggedRef.current = true;
    }
    el.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  const scrollByAmount = (offset: number) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const handleCardClick = (item: ProductServiceItem) => {
    if (hasDraggedRef.current) return;
    setModalProduct(item);
    setModalViewMode(item.availableColors && item.availableColors.length > 0 ? 'sample' : 'installed');
  };

  const handleColorChange = (itemId: number, colorOpt: MaterialColorOption) => {
    setSelectedColors((prev) => ({ ...prev, [itemId]: colorOpt }));
  };

  const modalActiveColor = modalProduct?.availableColors
    ? (selectedColors[modalProduct.id] || modalProduct.availableColors[0])
    : undefined;

  return (
    <section id="products" className="py-16 sm:py-24 md:py-32 bg-transparent overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 mb-8 sm:mb-12">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <span className="text-accent font-semibold tracking-widest text-xs sm:text-sm uppercase">
                  COMPLETE CATALOG · 22 DEDICATED SOLUTIONS & COLOR FINISHES
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-surface/80 border border-border text-foreground">
                  {displayItems.length} Solutions
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tight">
                PRODUCTS & SERVICES.
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mt-2 sm:mt-4">
                Click any product to inspect its detailed specifications, material grades, certified brand associations, and available color finishes.
              </p>
            </div>

            {/* Carousel Navigation Buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => scrollByAmount(-340)}
                aria-label="Scroll products left"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-border/80 bg-surface/80 backdrop-blur-md flex items-center justify-center text-foreground hover:bg-accent hover:text-white hover:border-accent transition-all shadow-md active:scale-95"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => scrollByAmount(340)}
                aria-label="Scroll products right"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-border/80 bg-surface/80 backdrop-blur-md flex items-center justify-center text-foreground hover:bg-accent hover:text-white hover:border-accent transition-all shadow-md active:scale-95"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Filter Category Chips */}
          <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-2 sm:pb-4 scrollbar-none touch-pan-x">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase whitespace-nowrap transition-all border ${
                  activeCategory === cat
                    ? "bg-accent text-white border-accent shadow-md scale-105"
                    : "bg-surface/60 backdrop-blur-md text-muted-foreground border-border/60 hover:text-foreground hover:border-accent/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Single, Non-Repeating Carousel Track */}
      <div className="relative w-full">
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="flex gap-4 sm:gap-6 overflow-x-auto py-4 sm:py-6 px-4 sm:px-6 md:px-12 cursor-grab active:cursor-grabbing select-none scrollbar-none touch-pan-x snap-x snap-mandatory scroll-smooth"
        >
          {displayItems.map((item) => {
            const hasColors = Boolean(item.availableColors && item.availableColors.length > 0);
            const activeColorForThisItem = hasColors
              ? (selectedColors[item.id] || item.availableColors![0])
              : undefined;

            return (
              <div
                key={`product-card-${item.id}`}
                onClick={() => handleCardClick(item)}
                className="flex-shrink-0 w-[85vw] max-w-[340px] sm:w-[360px] md:w-[390px] snap-center bg-surface/90 dark:bg-surface/80 backdrop-blur-xl border border-border/70 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-accent transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:-translate-y-1.5"
              >
                {/* Product Card Image Thumbnail */}
                <div className="relative h-50 sm:h-56 w-full overflow-hidden bg-zinc-950">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 310px, 390px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                  {/* Title overlay */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5">
                    <h3 className="text-lg sm:text-xl font-bold text-white leading-tight drop-shadow-md group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-3.5 line-clamp-2 font-normal">
                      {item.description}
                    </p>

                    </div>

                  <div>
                    {item.associations && (
                      <div className="mb-3">
                        <span className="block text-xs uppercase tracking-wider text-accent font-bold mb-1">
                          Brands:
                        </span>
                        <p className="text-xs sm:text-sm font-semibold text-foreground/85 truncate">
                          {item.associations}
                        </p>
                      </div>
                    )}

                    {/* Interactive Action Bar */}
                    <div className="pt-2.5 border-t border-border/40 flex items-center justify-between text-xs sm:text-sm font-bold text-accent/90 group-hover:text-accent">
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Inspect Specifications & Swatches
                      </span>
                      <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PRODUCT & SERVICE POPUP MODAL DIALOG */}
      {/* ========================================================================= */}
      {/* ========================================================================= */}
      {/* PRODUCT & SERVICE POPUP MODAL DIALOG */}
      {/* ========================================================================= */}
      {modalProduct && (() => {
        const modalActiveColor = modalProduct.availableColors
          ? (selectedColors[modalProduct.id] || modalProduct.availableColors[0])
          : undefined;
        const hasSample = Boolean(modalActiveColor?.sampleImage);
        const activeImageSrc = (modalViewMode === 'sample' && hasSample)
          ? modalActiveColor!.sampleImage!
          : modalProduct.image;

        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/80 backdrop-blur-md animate-fadeIn"
            onClick={() => setModalProduct(null)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="relative w-full max-w-3xl bg-surface dark:bg-zinc-900 border border-border/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] overflow-y-auto animate-scaleUp"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Close Button */}
              <button
                onClick={() => setModalProduct(null)}
                aria-label="Close product popup"
                className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-black/60 hover:bg-accent text-white flex items-center justify-center transition-all shadow-lg active:scale-95"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Left Column: Natural Single Shingle / Material Swatch or Installation View */}
              <div className="relative md:w-1/2 min-h-[280px] md:min-h-[440px] bg-zinc-950 flex flex-col justify-between p-6 overflow-hidden">
                {/* View Mode Switcher */}
                {hasSample && (
                  <div className="relative z-20 flex items-center gap-1 self-start bg-black/70 backdrop-blur-md p-1 rounded-xl border border-white/20 shadow-md">
                    <button
                      type="button"
                      onClick={() => setModalViewMode('sample')}
                      className={`px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold transition-all flex items-center gap-1.5 ${
                        modalViewMode === 'sample'
                          ? 'bg-accent text-white shadow-sm'
                          : 'text-white/80 hover:text-white'
                      }`}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      Specimen Swatch
                    </button>
                    <button
                      type="button"
                      onClick={() => setModalViewMode('installed')}
                      className={`px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold transition-all flex items-center gap-1.5 ${
                        modalViewMode === 'installed'
                          ? 'bg-accent text-white shadow-sm'
                          : 'text-white/80 hover:text-white'
                      }`}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      Installed View
                    </button>
                  </div>
                )}

                <Image
                  key={activeImageSrc}
                  src={activeImageSrc}
                  alt={modalProduct.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-opacity duration-300"
                  unoptimized
                />

                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

                {/* Bottom Image Tag */}
                <div className="relative z-10 mt-auto">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-accent px-2.5 py-1 rounded-md bg-black/60 border border-white/20 backdrop-blur-md">
                      {modalProduct.badge || modalProduct.category}
                    </span>
                    {modalViewMode === 'sample' && hasSample && (
                      <span className="text-[10px] font-mono font-bold text-white/90 px-2 py-0.5 rounded bg-black/50 border border-white/10">
                        Individual Specimen
                      </span>
                    )}
                  </div>

                  <h4 className="text-xl font-bold text-white leading-tight">
                    {modalProduct.title}
                  </h4>
                  {modalActiveColor && modalViewMode === 'sample' && (
                    <p className="text-xs text-white/90 font-mono mt-1">
                      Natural Shade: <span className="font-bold text-accent">{modalActiveColor.name}</span> ({modalActiveColor.textureLabel})
                    </p>
                  )}
                </div>
              </div>

              {/* Right Column: Product Specifications & Color Palette Controls */}
              <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono font-bold text-accent uppercase tracking-wider">
                      {modalProduct.category}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">
                      ID #{String(modalProduct.id).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-snug">
                    {modalProduct.title}
                  </h3>

                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-5">
                    {modalProduct.description}
                  </p>

                  {/* Brands / Partners Associated */}
                  {modalProduct.associations && (
                    <div className="p-3.5 rounded-xl bg-surface/80 border border-border/60 mb-5">
                      <span className="block text-xs font-bold uppercase tracking-wider text-accent mb-1.5">
                        Certified Brands & Material Associates:
                      </span>
                      <p className="text-sm sm:text-base font-semibold text-foreground">
                        {modalProduct.associations}
                      </p>
                    </div>
                  )}

                  </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-border/60 flex flex-col sm:flex-row items-center gap-3">
                  <a
                    href={`https://wa.me/919567242157?text=Hi%20Ideal%20Solutions,%20I%20am%20interested%20in%20*${encodeURIComponent(modalProduct.title)}*.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 text-center"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                    <span>Inquire on WhatsApp</span>
                  </a>

                  <a
                    href="/contact"
                    onClick={() => setModalProduct(null)}
                    className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-accent hover:bg-accent/90 text-white font-bold text-sm uppercase tracking-wider transition-all text-center shadow-md active:scale-95"
                  >
                    Schedule Site Visit →
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out forwards;
        }
        .animate-scaleUp {
          animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </section>
  );
}
