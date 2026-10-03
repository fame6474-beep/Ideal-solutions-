"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export interface ServiceSlide {
  id: number;
  title: string;
  category: string;
  tagline: string;
  image: string;
  partners: string;
}

export const TOP_SERVICE_SLIDES: ServiceSlide[] = [
  {
    id: 1,
    title: "Pre-Engineered Buildings (PEB)",
    category: "PEB CONSTRUCTION",
    tagline: "Heavy Industrial Godowns, Hospitals, Stadiums & Multi-Story Commercial Structures",
    image: "/images/web/hero_peb.jpg",
    partners: "TATA · JSW · SAIL",
  },
  {
    id: 2,
    title: "Structural Steel Truss Fabrication",
    category: "TRUSS & FABRICATION",
    tagline: "Heavy & Light Tubular Portal Frames for Auditoriums, Schools & Resorts",
    image: "/images/web/hero_truss.jpg",
    partners: "Tata · APL Apollo · JSW Jindal",
  },
  {
    id: 3,
    title: "Architectural Roofing Solutions",
    category: "ROOFING SYSTEMS",
    tagline: "Designer Shingles, Stone Coated Tiles, Synthetic Thatch & Waterproofing",
    image: "/images/web/hero_roofing.jpg",
    partners: "CertainTeed (USA) · TechnoNicol™ · Saint-Gobain",
  },
  {
    id: 4,
    title: "Modern Residential Architecture",
    category: "RESIDENTIAL & COMMERCIAL",
    tagline: "Custom Architectural Metal Roofs, Shingles & Precision Engineering",
    image: "/images/web/hero_villa.jpg",
    partners: "Ideal Solutions Engineering",
  },
  {
    id: 5,
    title: "Designer Gypsum False Ceilings",
    category: "INTERIORS & CEILINGS",
    tagline: "Acoustic Gypsum Ceilings with Integrated Ambient Warm LED Channels",
    image: "/images/web/hero_ceiling.jpg",
    partners: "Saint-Gobain Gyproc · Gypsum Acoustic",
  },
];

interface TopServicesVideoReelProps {
  activePillarIndex?: number;
  onPillarChange?: (index: number) => void;
}

export function TopServicesVideoReel({ activePillarIndex }: TopServicesVideoReelProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (activePillarIndex !== undefined && activePillarIndex < TOP_SERVICE_SLIDES.length) {
      setCurrentSlide(activePillarIndex);
    }
  }, [activePillarIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % TOP_SERVICE_SLIDES.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
      {TOP_SERVICE_SLIDES.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? "opacity-100 scale-105" : "opacity-0 scale-100"
          }`}
          style={{ transitionProperty: "opacity, transform", transitionDuration: "1200ms" }}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={idx === 0}
            sizes="100vw"
            className="object-cover object-center brightness-[1.02] contrast-[1.02]"
            unoptimized
          />
        </div>
      ))}

      {/* Ambient Gradient Overlays for optimal readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/50 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />

      {/* Floating Active Pillar Badge */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-xs font-mono font-bold shadow-lg">
        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <span className="truncate max-w-[200px]">{TOP_SERVICE_SLIDES[currentSlide].category}</span>
      </div>
    </div>
  );
}
