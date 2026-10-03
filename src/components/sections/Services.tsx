"use client";

import { Reveal } from '@/components/motion/Reveal';
import Link from 'next/link';

const SERVICE_CATEGORIES = [
  {
    category: "ROOFING SYSTEMS",
    badge: "Architectural & Residential",
    code: "SEC-01",
    tolerance: "100% Monolithic Seal · Class-A Fire",
    description: "Comprehensive roofing solutions in association with leading global brands like CertainTeed Saint-Gobain, TechnoNicol, and Oralium.",
    items: [
      "Architectural Roofing Shingles (CertainTeed USA Certified)",
      "TechnoNicol Volcanic Stone Coated Metal Tiles",
      "Synthetic Thatch for Luxury Beach & Backwater Resorts",
      "High-Impact Polycarbonate Sheet Canopies & Sheds",
      "Truss-less Self-Supported Arch Roof Solutions",
      "Monsoon Leak-Proofing & Multi-Layer Membrane Waterproofing"
    ]
  },
  {
    category: "STRUCTURAL STEEL & TRUSS",
    badge: "Precision Steel Fabrication",
    code: "SEC-02",
    tolerance: "IS 2062 Grade Steel · Deflection < 2mm",
    description: "Heavy and light structural steel truss fabrication for auditoriums, schools, resorts, commercial complexes, and industrial plants.",
    items: [
      "Heavy & Light Tubular Portal Frame Fabrication",
      "Customized Architectural Large-Span Frameworks",
      "Round, Square & Rectangular Structural Steel Trusses",
      "Anti-Corrosion Primed & Powder-Coated Steel Systems",
      "Structural Engineering Load Analysis & Verification"
    ]
  },
  {
    category: "PRE-ENGINEERED BUILDINGS (PEB)",
    badge: "Heavy Industrial & Commercial",
    code: "SEC-03",
    tolerance: "Wind Load 180 km/h · Heavy Span",
    description: "End-to-end turnkey PEB construction for multi-story commercial complexes, hospitals, godowns, sports stadiums, and shopping malls.",
    items: [
      "Heavy Industrial Godowns & Logistics Warehouses",
      "Multi-Story Commercial Steel Landmark Complexes",
      "Insulated Sandwich Panel Roofing & Wall Cladding",
      "High Wind-Load Resistance Pre-Engineered Frames",
      "Overhead Crane-Supported Heavy Industrial Facilities"
    ]
  },
  {
    category: "ARCHITECTURAL FACADES & GLAZING",
    badge: "Glass & Exterior Systems",
    code: "SEC-04",
    tolerance: "Toughened Safety Glass · PVDF Coating",
    description: "Premium architectural finishes, spider glazing, and exterior cladding solutions for modern commercial and residential landmarks.",
    items: [
      "Structural & Spider Frameless Glass Glazing Systems",
      "Switchable Electronic Smart Privacy Glass Partitions",
      "Aluminium Composite Panel (ACP Architectural Cladding)",
      "Stainless Steel & Glass Balustrade Safety Railings",
      "Thermal Barrier Nano Ceramic Facade Treatments"
    ]
  },
  {
    category: "PANELS, PARTITIONS & CEILINGS",
    badge: "Interiors & Acoustic Ceilings",
    code: "SEC-05",
    tolerance: "Saint-Gobain Gyproc · NRC > 0.75",
    description: "Advanced interior systems including designer acoustic false ceilings, lightweight rapid wall partitions, and luxury wall panels.",
    items: [
      "Saint-Gobain Gyproc Acoustic Designer False Ceilings",
      "Seamless Stretch Membrane Backlit Lighting Ceilings",
      "Renacon Rapid Wall Precast Partition System",
      "UV Charcoal & Poly Marble Architectural Wall Panelling",
      "Swiss Hardwood & Interlocking Luxury Flooring"
    ]
  },
  {
    category: "IDEAL RENOVATION & WATERPROOFING",
    badge: "Turnkey Restoration",
    code: "SEC-06",
    tolerance: "10-Year Water-Tight Warranty",
    description: "Complete building renovation, leak-proofing, repainting, and structural maintenance solutions across Kerala.",
    items: [
      "Monsoon Leak-Proofing & Torch-on Membrane Waterproofing",
      "Old Roof Replacement & Structural Steel Re-Framing",
      "False Ceiling & Integrated Lighting Refurbishment",
      "High-Performance Exterior Weather Shield Painting",
      "Turnkey Commercial & Residential Deep Restoration"
    ]
  }
];

export function Services() {
  return (
    <section id="services" className="py-20 md:py-32 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        <Reveal>
          <div className="text-center mb-14 sm:mb-20 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tight">
              ENGINEERING DIVISIONS.
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg md:text-xl mt-3 leading-relaxed">
              18+ years of contracting excellence delivering certified materials, certified load tolerances, and lifetime structural durability across South India.
            </p>
          </div>
        </Reveal>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICE_CATEGORIES.map((cat, i) => (
            <Reveal key={i} delay={i * 0.06} yOffset={20}>
              <div className="glass-plaque p-6 sm:p-8 rounded-3xl h-full flex flex-col justify-between group hover:-translate-y-1.5 hover:border-accent/80 transition-all duration-300">
                <div>
                  <div className="flex justify-between items-start gap-2 mb-3">
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-accent/15 text-accent border border-accent/25">
                      {cat.badge}
                    </span>
                    <span className="font-mono text-xs sm:text-sm font-bold text-muted-foreground">
                      {cat.code}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-accent transition-colors mb-2.5 leading-snug">
                    {cat.category}
                  </h3>

                  {/* Technical Spec Tolerance Strip */}
                  <div className="inline-block px-3 py-1 rounded-lg bg-surface/90 border border-border/80 text-xs sm:text-sm font-medium text-muted-foreground mb-4">
                    ⚡ {cat.tolerance}
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed mb-6 text-sm sm:text-base">
                    {cat.description}
                  </p>
                  
                  <div className="border-t border-border/50 pt-4 mb-6">
                    <ul className="space-y-2.5 text-sm sm:text-base text-foreground/90 font-medium">
                      {cat.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-accent font-bold mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3.5 border-t border-border/40 flex items-center justify-between">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-sm sm:text-base font-bold text-accent group-hover:translate-x-1 transition-transform"
                  >
                    <span>Consult Engineering Team</span>
                    <span>→</span>
                  </Link>
                  <span className="text-xs sm:text-sm font-medium text-muted-foreground">South India</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

