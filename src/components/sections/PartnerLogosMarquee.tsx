"use client";

import React, { useRef } from "react";
import Image from "next/image";

export interface LogoItem {
  id: string;
  name: string;
  src: string;
  width: number;
  height: number;
}

export const SCROLLING_LOGOS: LogoItem[] = [
  { id: "tata", name: "TATA", src: "/images/partners/tata-v2.png", width: 100, height: 48 },
  { id: "saint-gobain", name: "Saint-Gobain", src: "/images/partners/saint-gobain-v2.png", width: 140, height: 48 },
  { id: "certainteed", name: "CertainTeed", src: "/images/partners/certainteed-v3.png", width: 150, height: 50 },
  { id: "technonicol", name: "TechnoNICOL", src: "/images/partners/technonicol-v3.png", width: 60, height: 48 },
  { id: "sail", name: "SAIL", src: "/images/partners/sail-v2.png", width: 100, height: 48 },
  { id: "jsw", name: "JSW Steel", src: "/images/partners/jsw-v3.png", width: 120, height: 50 },
  { id: "apollo", name: "APL Apollo", src: "/images/partners/apollo-v2.png", width: 130, height: 48 },
  { id: "bp-canada", name: "BP Canada", src: "/images/partners/bp-canada-v3.png", width: 150, height: 50 },
  { id: "iko", name: "IKO", src: "/images/partners/iko-v3.png", width: 110, height: 48 },
  { id: "oralium", name: "Oralium", src: "/images/partners/oralium-v2.png", width: 140, height: 48 },
  { id: "everest", name: "Everest", src: "/images/partners/everest-v3.png", width: 130, height: 48 },
  { id: "aludecor", name: "Aludecor", src: "/images/partners/aludecor-v3.png", width: 130, height: 50 },
  { id: "cronoswiss", name: "Kronoswiss", src: "/images/partners/kronoswiss-v3.png", width: 120, height: 50 },
  { id: "ramco", name: "Ramco", src: "/images/partners/ramco-v3.png", width: 130, height: 50 },
  { id: "oxyroof", name: "Oxy Roof", src: "/images/partners/oxyroof-v2.png", width: 60, height: 48 },
];

export function PartnerLogosMarquee() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  // Triple array for seamless infinite looping
  const infiniteLogos = [
    ...SCROLLING_LOGOS,
    ...SCROLLING_LOGOS,
    ...SCROLLING_LOGOS,
  ];

  return (
    <div className="w-full relative overflow-hidden py-4 sm:py-6">
      {/* Side Edge Fade Gradients for Seamless Blending */}
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-surface via-surface/70 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-surface via-surface/70 to-transparent z-10 pointer-events-none" />

      {/* Pure Logo Scrolling Stream */}
      <div
        ref={scrollerRef}
        className="flex items-center gap-10 sm:gap-16 md:gap-20 w-max animate-marquee hover:[animation-play-state:paused]"
        style={{
          animation: "marquee 32s linear infinite",
        }}
      >
        {infiniteLogos.map((logo, idx) => (
          <div
            key={`${logo.id}-${idx}`}
            className="flex-shrink-0 flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer p-2 select-none"
            title={logo.name}
          >
            <div className="relative h-10 sm:h-12 md:h-14 flex items-center justify-center">
              <Image
                src={logo.src}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                className="h-full w-auto max-h-12 md:max-h-14 object-contain filter drop-shadow-sm brightness-100 hover:brightness-105 transition-all"
                priority={idx < 10}
                unoptimized
              />
            </div>
          </div>
        ))}
      </div>

      {/* 60fps Smooth Marquee Animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
      `}</style>
    </div>
  );
}
