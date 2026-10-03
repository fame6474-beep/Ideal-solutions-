"use client";

import { useState } from "react";
import Link from "next/link";

export interface PillarData {
  id: string;
  tabTitle: string;
  badge: string;
  heading: string;
  subtitle: string;
  description: string;
  highlights: string[];
  applications: string[];
  partnerBrands: string[];
  divisionType: string;
}

export const PILLARS: PillarData[] = [
  {
    id: "peb",
    tabTitle: "1. PEB (PRE-ENGINEERED BUILDINGS)",
    badge: "HEAVY INDUSTRIAL & COMMERCIAL",
    heading: "Pre-Engineered Buildings (PEB)",
    subtitle: "Total Turnkey PEB Structural Fabrication & Construction",
    description:
      "As PEB Structural Fabricators & Contractors, our dedicated structural division handles large-scale industrial, commercial, and institutional projects with precision engineering, supply, fabrication, and rapid on-site erection across India.",
    highlights: [
      "Custom Portal Frames & Rafters",
      "Insulated Sandwich Panel Roofing",
      "Trafford Wall Cladding Systems",
      "Rapid Construction & High Wind Resistance",
    ],
    applications: [
      "Multi-Story Buildings",
      "Industrial Godowns & Warehouses",
      "Hospitals & Healthcare Facilities",
      "Stadiums & Sports Arenas",
      "Shopping Malls & Commercial Complexes",
    ],
    partnerBrands: ["TATA", "SAIL", "GSW - JINDAL", "Everest"],
    divisionType: "PEB Construction",
  },
  {
    id: "truss",
    tabTitle: "2. TRUSS (STRUCTURAL FABRICATION)",
    badge: "PRECISION STEEL FABRICATION",
    heading: "Heavy & Light Structural Truss Systems",
    subtitle: "Engineered Tubular & Metal Frameworks",
    description:
      "Specialized in heavy and light structural steel truss fabrication using prime tubular sections (Round, Square, and Rectangular) incorporating modern engineering for large spans, architectural roofs, and truss-less arch systems.",
    highlights: [
      "Heavy Metal & Sheet Metal Fabrication",
      "Round, Square & Rectangular Tubular Sections",
      "Truss-less Arch Roof Technology",
      "Anti-Corrosion Primed & Powder-Coated Steel",
    ],
    applications: [
      "Auditoriums & Conference Halls",
      "Educational Institutions & Schools",
      "Luxury Resorts & Beach Pavilions",
      "Commercial Showrooms & Canopy Structures",
      "Industrial Sheds & Factory Frameworks",
    ],
    partnerBrands: ["APL Apollo", "TATA", "GSW Jindal", "Visak"],
    divisionType: "Truss Fabrication",
  },
  {
    id: "roofing",
    tabTitle: "3. ROOFING (TOTAL ROOFING SOLUTIONS)",
    badge: "ARCHITECTURAL & RESIDENTIAL",
    heading: "Advanced Architectural Roofing Systems",
    subtitle: "Shingles, Metal Tiles, Synthetic Thatch & Waterproofing",
    description:
      "Collaborating with world-leading international brands to provide complete roofing solutions — from premium architectural shingles and stone-coated metal tiles to synthetic thatch for resorts and heavy-duty TechnoNicol waterproofing systems.",
    highlights: [
      "Architectural Shingles (USA / Canada / Russia)",
      "Stone Coated Steel Roofing Tiles",
      "Synthetic Thatch for Luxury Beach Resorts",
      "TechnoNicol Multi-Layer Membrane Waterproofing",
    ],
    applications: [
      "Luxury Villas & Residential Homes",
      "Beachfront Resorts & Eco-Lodges",
      "Commercial Complex Roof Replacements",
      "Terrace Waterproofing & Insulation",
      "GI & Aluminum Trafford Sheet Roofing",
    ],
    partnerBrands: [
      "CertainTeed (USA)",
      "TechnoNicol™",
      "Saint-Gobain",
      "BP Canada",
      "IKO (USA)",
      "Oralium",
    ],
    divisionType: "Roofing Installation",
  },
];

interface TopPillarsTabsProps {
  activeTab: number;
  onTabSelect: (index: number) => void;
}

export function TopPillarsTabs({ activeTab, onTabSelect }: TopPillarsTabsProps) {
  const current = PILLARS[activeTab] || PILLARS[0];

  return (
    <div className="w-full">
      {/* 3 Prominent Top Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 p-1.5 sm:p-2 rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-2xl mb-6">
        {PILLARS.map((pillar, idx) => {
          const isActive = activeTab === idx;
          return (
            <button
              key={pillar.id}
              onClick={() => onTabSelect(idx)}
              className={`relative px-4 py-3.5 sm:py-4 rounded-xl text-left transition-all duration-300 flex flex-col justify-between ${
                isActive
                  ? "bg-accent text-white shadow-xl shadow-accent/25 scale-[1.02] border border-accent/40"
                  : "bg-transparent text-foreground/80 hover:text-foreground hover:bg-white/40 dark:hover:bg-white/10 border border-transparent"
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span
                  className={`text-xs sm:text-sm font-bold tracking-wider uppercase ${
                    isActive ? "text-white/90" : "text-accent"
                  }`}
                >
                  PILLAR 0{idx + 1}
                </span>
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse flex-shrink-0" />
                )}
              </div>
              <span className="text-sm sm:text-base md:text-lg font-bold tracking-tight leading-snug line-clamp-1">
                {pillar.heading.split(" (")[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Tab Detailed Showcase Card */}
      <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md border border-white/40 dark:border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl transition-all duration-500">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/40 dark:border-white/10 mb-6">
          <div>
            <span className="text-accent text-sm font-bold uppercase tracking-wider block mb-1">
              {current.badge}
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground tracking-tight">
              {current.heading}
            </h3>
            <p className="text-base sm:text-lg font-medium text-foreground/80 mt-1">
              {current.subtitle}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/contact"
              className="bg-accent hover:bg-accent/90 text-white px-5 py-2.5 rounded-xl text-sm sm:text-base font-bold tracking-wide transition-all shadow-md active:scale-95 flex-shrink-0"
            >
              INQUIRE ABOUT {current.divisionType.toUpperCase()}
            </Link>
          </div>
        </div>

        <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-6">
          {current.description}
        </p>

        {/* Highlights & Applications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Key Engineering Features */}
          <div className="bg-white/80 dark:bg-white/5 p-4 sm:p-5 rounded-2xl border border-white/40 dark:border-white/10">
            <span className="text-sm font-bold text-accent uppercase tracking-wider block mb-3">
              Key Engineering Features:
            </span>
            <ul className="space-y-2.5 text-sm sm:text-base text-foreground/90 font-medium">
              {current.highlights.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <svg
                    className="w-4 h-4 text-accent flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Primary Applications */}
          <div className="bg-white/80 dark:bg-white/5 p-4 sm:p-5 rounded-2xl border border-white/40 dark:border-white/10">
            <span className="text-sm font-bold text-accent uppercase tracking-wider block mb-3">
              Sector Applications (from PDF):
            </span>
            <ul className="space-y-2.5 text-sm sm:text-base text-foreground/90 font-medium">
              {current.applications.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Associated Brands Ribbon */}
        <div className="mt-6 pt-4 border-t border-white/40 dark:border-white/10 flex flex-wrap items-center gap-2">
          <span className="text-xs sm:text-sm font-semibold text-foreground/70 dark:text-white/70 uppercase tracking-wider mr-2">
            Associate Partner Brands:
          </span>
          {current.partnerBrands.map((brand) => (
            <span
              key={brand}
              className="text-xs sm:text-sm font-bold px-3 py-1.5 rounded-lg bg-white/80 dark:bg-white/10 border border-white/40 dark:border-white/10 text-foreground dark:text-white shadow-sm backdrop-blur-md"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
