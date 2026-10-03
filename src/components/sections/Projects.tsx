"use client";

import { useState } from "react";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";

interface ProjectCase {
  id: string;
  title: string;
  category: "Shingles" | "PEB & Heavy Structures" | "False Ceilings" | "Residential Roofing";
  location: string;
  area: string;
  material: string;
  image: string;
  description: string;
  highlightBadge: string;
}

const FEATURED_PROJECTS: ProjectCase[] = [
  {
    id: "villa-shingles",
    title: "Luxury Kerala Heritage Residence",
    category: "Shingles",
    location: "Ernakulam, Kochi",
    area: "3,800 Sq.Ft",
    material: "CertainTeed Landmark Architectural Shingles (USA)",
    image: "/images/drive_assets/villa_shingles_hero.jpg",
    description: "Multi-tiered traditional Kerala slope roof converted with high-wind resistance architectural shingles and 100% monolithic water-tight membrane underlayment.",
    highlightBadge: "CertainTeed Certified",
  },
  {
    id: "commercial-peb",
    title: "Multi-Span Commercial Hub & PEB Structure",
    category: "PEB & Heavy Structures",
    location: "Aluva Industrial Zone, Ernakulam",
    area: "14,500 Sq.Ft",
    material: "TATA Heavy Structural Steel & Insulated Sandwich Panels",
    image: "/images/peb/peb-after.jpg",
    description: "Column-free clear span industrial logistics complex engineered for maximum internal volume with crane support and solar-ready roof loading.",
    highlightBadge: "TATA Steel Verified",
  },
  {
    id: "convention-truss",
    title: "Grand Auditorium & Convention Hall",
    category: "PEB & Heavy Structures",
    location: "Trivandrum",
    area: "9,200 Sq.Ft",
    material: "APL Apollo Tubular Steel Trusses & Standing Seam Metal",
    image: "/images/truss/truss-after-v2.jpg",
    description: "Curved architectural tubular truss framing with acoustic insulation and spider glass facade entrance.",
    highlightBadge: "Heavy Fabrication",
  },
  {
    id: "luxury-ceiling",
    title: "Designer Acoustic Gypsum False Ceiling",
    category: "False Ceilings",
    location: "Kottayam Luxury Villa",
    area: "2,400 Sq.Ft",
    material: "Saint-Gobain Gyproc & Translucent Recessed LED Profiles",
    image: "/images/drive_assets/ceiling_luxury_led.jpg",
    description: "Zero-crack acoustic false ceiling with warm architectural lighting channels, sound absorption, and custom fluted wall integration.",
    highlightBadge: "Saint-Gobain Gyproc",
  },
  {
    id: "residential-oralium",
    title: "Contemporary Villa Roofing & Purlin System",
    category: "Residential Roofing",
    location: "Thrissur",
    area: "2,850 Sq.Ft",
    material: "Oralium High-Grade Aluminium & Tata Colorplus",
    image: "/images/drive_assets/villa_shingles_modern.jpg",
    description: "Corrosion-proof lightweight aluminium roofing system designed for coastal humid atmosphere with lifetime rust resistance.",
    highlightBadge: "Oralium Premium",
  },
  {
    id: "residence-stone-coated",
    title: "Executive Estate with Stone Coated Metal Tiles",
    category: "Shingles",
    location: "Kozhikode",
    area: "4,200 Sq.Ft",
    material: "TechnoNicol Luxard Volcanic Basalt Tiles (Russia)",
    image: "/images/drive_assets/villa_shingles_luxury.jpg",
    description: "Interlocking volcanic stone coated metal tiles with sound dampening against heavy monsoon rain and 50-year warranty.",
    highlightBadge: "TechnoNicol Luxard",
  },
  {
    id: "grand-estate-villa",
    title: "Hillside Architectural Villa Estate",
    category: "Residential Roofing",
    location: "Trivandrum",
    area: "5,100 Sq.Ft",
    material: "CertainTeed Shingles & Waterproof Underlayment",
    image: "/images/drive_assets/villa_shingles_estate.jpg",
    description: "Steep-slope multi-gable roof system with concealed gutter channels and extreme monsoon waterproofing.",
    highlightBadge: "Kerala Architecture",
  },
  {
    id: "cove-ceiling-living",
    title: "Architectural Cove False Ceiling & Panel Integration",
    category: "False Ceilings",
    location: "Ernakulam Luxury Penthouse",
    area: "1,900 Sq.Ft",
    material: "Saint-Gobain Acoustic Board & Dynamic CCT LED",
    image: "/images/drive_assets/ceiling_designer_cove.jpg",
    description: "High-spec multi-layer false ceiling with seamless perimeter cove lighting and sound isolation.",
    highlightBadge: "Saint-Gobain Gyproc",
  },
];

export function Projects() {
  const [activeTab, setActiveTab] = useState<string>("All");

  const tabs = ["All", "Shingles", "PEB & Heavy Structures", "False Ceilings", "Residential Roofing"];

  const filteredProjects = activeTab === "All"
    ? FEATURED_PROJECTS
    : FEATURED_PROJECTS.filter((p) => p.category === activeTab);

  return (
    <section id="projects" className="py-16 sm:py-24 md:py-32 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
            <div>
              <span className="text-accent font-semibold tracking-widest text-xs sm:text-sm uppercase block mb-2 sm:mb-3">
                VERIFIED CASE STUDIES · REAL KERALA INSTALLATIONS
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
                SELECTED WORK.
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mt-2 sm:mt-3">
                Over 1,500+ completed projects across Kerala — from luxury hillside residences to massive industrial PEB facilities.
              </p>
            </div>

            {/* Tab Filter Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition-all border ${
                    activeTab === tab
                      ? "bg-accent text-white border-accent shadow-md scale-105"
                      : "bg-surface/60 text-muted-foreground border-border/60 hover:text-foreground hover:border-accent/40"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, idx) => (
            <Reveal key={project.id} delay={idx * 0.08}>
              <div className="bg-surface/80 dark:bg-surface/60 backdrop-blur-xl border border-border/70 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-accent/70 transition-all duration-300 flex flex-col justify-between group h-full hover:-translate-y-1.5">
                <div>
                  {/* Image Showcase */}
                  <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-zinc-950">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Location Tag */}
                    <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-white text-xs">
                      <span className="flex items-center gap-1.5 font-semibold drop-shadow">
                        <svg className="w-3.5 h-3.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {project.location}
                      </span>
                      <span className="font-mono bg-black/50 px-2 py-0.5 rounded text-[11px] border border-white/10">
                        {project.area}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-mono font-bold text-accent uppercase tracking-widest">
                        {project.category}
                      </span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">
                        {project.highlightBadge}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Footer specs */}
                <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-border/40 flex items-center justify-between text-[11px]">
                  <span className="text-muted-foreground truncate max-w-[200px] flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="truncate">{project.material}</span>
                  </span>
                  <a
                    href="/contact"
                    className="font-bold text-accent hover:underline flex items-center gap-1 flex-shrink-0 font-mono text-[11px]"
                  >
                    Inquire Specification →
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
