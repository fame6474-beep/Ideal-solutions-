"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export type TransitionKey =
  | "peb"
  | "truss"
  | "roofing"
  | "roof-shingles"
  | "roof-thatch"
  | "roof-polycarbonate"
  | "roof-arch"
  | "roof-stone-coated"
  | "roof-trafford"
  | "glazing"
  | "ceiling"
  | "residential"
  | "renovation";

export interface MaterialColorState {
  name: string;
  hex: string;
  textureLabel?: string;
  brandAssociation?: string;
}

export interface PillarTransitionAsset {
  id: TransitionKey;
  name: string;
  subtitle: string;
  badge: string;
  transitionType: string;
  effectDescription: string;
  beforeImg: string;
  afterImg: string;
  beforeAlt: string;
  afterAlt: string;
  accentColor: string;
  defaultColor?: MaterialColorState;
}

export const PILLAR_TRANSITION_SETS: Record<TransitionKey, PillarTransitionAsset> = {
  "roof-shingles": {
    id: "roof-shingles",
    name: "Architectural Roofing Shingles",
    subtitle: "Bare Timber Structure ➔ 100% Completed Luxury Designer Shingles",
    badge: "Roofing Shingles",
    transitionType: "Ridge-to-Eave Cascading Shingle Curtain",
    effectDescription: "Granular architectural shingle slope descent",
    beforeImg: "/images/construction/roof-001.jpg",
    afterImg: "/images/construction/roof-040.jpg",
    beforeAlt: "Bare Timber Structure & Underlayment for Roofing Shingles",
    afterAlt: "Completed Luxury Designer Shingle Roof - CertainTeed / TechnoNicol",
    accentColor: "#10B981",
    defaultColor: { name: "Charcoal Slate", hex: "#2D3748", textureLabel: "3D Granular Texture", brandAssociation: "CertainTeed Landmark (USA)" },
  },
  "roof-stone-coated": {
    id: "roof-stone-coated",
    name: "Stone Coated Metal Roof Tiles",
    subtitle: "Structural Battens ➔ Interlocking Volcanic Stone Tiles",
    badge: "Stone Coated",
    transitionType: "Volcanic Granule Matrix Reveal",
    effectDescription: "Stone-chip bonded corrosion resistant tile lock",
    beforeImg: "/images/construction/roof-001.jpg",
    afterImg: "/images/construction/roof-040.jpg",
    beforeAlt: "Roof Framing and Battens for Stone Coated Tiles",
    afterAlt: "Completed Volcanic Stone Coated Metal Roof - TechnoNicol Luxard",
    accentColor: "#F59E0B",
    defaultColor: { name: "Roman Terracotta", hex: "#A93226", textureLabel: "Mediterranean Granular", brandAssociation: "TechnoNicol Luxard" },
  },
  "roof-thatch": {
    id: "roof-thatch",
    name: "Synthetic Thatch Luxury Roofing",
    subtitle: "Timber Pavilion Rafters ➔ Authentic Weatherproof Reed Thatch",
    badge: "Resorts & Hospitality",
    transitionType: "Tropical Reed Cascade Sweep",
    effectDescription: "Eco-resort 100% fire retardant synthetic thatch",
    beforeImg: "/images/construction/roof-001.jpg",
    afterImg: "/images/construction/roof-040.jpg",
    beforeAlt: "Resort Roof Framing for Synthetic Thatch",
    afterAlt: "Completed Luxury Synthetic Thatch Roof for Pavilion & Villa",
    accentColor: "#D4A373",
    defaultColor: { name: "Bali Golden Straw", hex: "#D4A373", textureLabel: "Tropical Reed Texture", brandAssociation: "Resort Grade" },
  },
  "roof-polycarbonate": {
    id: "roof-polycarbonate",
    name: "Polycarbonate Canopies & Car Sheds",
    subtitle: "Tubular Steel Canopy ➔ Multiwall UV-Stabilized Glass Glow",
    badge: "Canopies & Car Sheds",
    transitionType: "Specular Light Refraction Wipe",
    effectDescription: "High-impact diffused daylight transmission",
    beforeImg: "/images/construction/roof-005.jpg",
    afterImg: "/images/construction/roof-040.jpg",
    beforeAlt: "Tubular Canopy Framework for Polycarbonate",
    afterAlt: "Completed UV-Stabilized Multiwall Polycarbonate Canopy",
    accentColor: "#06B6D4",
    defaultColor: { name: "Diamond Clear", hex: "#E0F2FE", textureLabel: "92% Light Transmission", brandAssociation: "Max Lite Multiwall" },
  },
  "roof-arch": {
    id: "roof-arch",
    name: "Truss-less Self-Supported Arch Roof",
    subtitle: "Base Purlin Anchors ➔ Clear-Span Curved Arch Metal Roof",
    badge: "Truss-less Arch",
    transitionType: "Curved Parabolic Arc Sweep",
    effectDescription: "100% column-free interior volume expansion",
    beforeImg: "/images/truss/truss-before-v2.jpg",
    afterImg: "/images/truss/truss-after-v2.jpg",
    beforeAlt: "Base Foundation Anchors for Truss-less Arch Roof",
    afterAlt: "Completed Self-Supported Curved Arch Steel Roof",
    accentColor: "#3B82F6",
    defaultColor: { name: "Glacier White", hex: "#F8FAFC", textureLabel: "Reflective Warehouse Span", brandAssociation: "Self-Supported Arch" },
  },
  "roof-trafford": {
    id: "roof-trafford",
    name: "Residential Trafford & Oralium Roofing",
    subtitle: "Rafter & Purlin Layout ➔ High-Grade Aluminium & GI Roof",
    badge: "Residential Trafford",
    transitionType: "Trafford Ribbed Wave Descent",
    effectDescription: "Anti-corrosion Oralium & Tata Colorplus install",
    beforeImg: "/images/construction/roof-001.jpg",
    afterImg: "/images/construction/roof-040.jpg",
    beforeAlt: "Purlin and Rafter Framework for Residential Roofing",
    afterAlt: "Completed Residential Aluminium & GI Trafford Sheet Roof",
    accentColor: "#1E3A8A",
    defaultColor: { name: "Royal Blue", hex: "#1E3A8A", textureLabel: "High Gloss Aluminium", brandAssociation: "Oralium Premium" },
  },
  "roofing": {
    id: "roofing",
    name: "Architectural Roofing Solutions",
    subtitle: "Timber Framing & Rafters ➔ Completed Architectural Roof",
    badge: "Roofing Systems",
    transitionType: "Ridge-to-Eave Cascading Shingle Curtain",
    effectDescription: "Top-to-bottom architectural roof descent",
    beforeImg: "/images/construction/roof-001.jpg",
    afterImg: "/images/construction/roof-040.jpg",
    beforeAlt: "Roof Construction - Bare Timber Structure & Framing",
    afterAlt: "Completed Architectural Roof - Precision Shingles & Waterproofing",
    accentColor: "#10B981",
    defaultColor: { name: "Charcoal Slate", hex: "#2D3748", textureLabel: "Architectural Finish", brandAssociation: "CertainTeed / TechnoNicol" },
  },
  "peb": {
    id: "peb",
    name: "Pre-Engineered Buildings (PEB)",
    subtitle: "Heavy Steel Portal Framing ➔ Finished Multi-Story Complex",
    badge: "PEB Engineering",
    transitionType: "Portal Erection & Horizontal Steel Split",
    effectDescription: "Horizontal structural portal beam expansion",
    beforeImg: "/images/peb/peb-before.jpg",
    afterImg: "/images/peb/peb-after.jpg",
    beforeAlt: "PEB Construction - Heavy Structural Steel Portal Frame & Rafters",
    afterAlt: "Completed Pre-Engineered Building - Modern Cladding & Architectural Facade",
    accentColor: "#3B82F6",
  },
  "truss": {
    id: "truss",
    name: "Structural Steel Truss Fabrication",
    subtitle: "Tubular Steel Truss Network ➔ Enclosed Convention Hall",
    badge: "Structural Truss",
    transitionType: "Diagonal Triangular Lattice & Arc Flash Reveal",
    effectDescription: "Angular geometric wireframe wipe",
    beforeImg: "/images/truss/truss-before-v2.jpg",
    afterImg: "/images/truss/truss-after-v2.jpg",
    beforeAlt: "Truss Fabrication - Bare Triangular Tubular Steel Framework & Cranes",
    afterAlt: "Completed Commercial Convention Hall - Enclosed Standing Seam Roof & Glass Facade",
    accentColor: "#F59E0B",
  },
  "glazing": {
    id: "glazing",
    name: "Glazing & Architectural Cladding",
    subtitle: "Structural Skeleton ➔ Spider Glazing & ACP Facade",
    badge: "Glass & Facades",
    transitionType: "Smart Glass Ionization & Specular Prismatic Wipe",
    effectDescription: "Electromagnetic privacy glass opacity sweep",
    beforeImg: "/images/about/about.jpg",
    afterImg: "/images/services/architecture.jpg",
    beforeAlt: "Architectural Glazing Construction - Structural Skeleton & Spider Mounts",
    afterAlt: "Completed Glass Facade - Spider Glazing & ACP Architectural Cladding",
    accentColor: "#06B6D4",
    defaultColor: { name: "Metallic Silver", hex: "#CBD5E1", textureLabel: "PVDF Exterior Grade", brandAssociation: "Aludecor / Saint-Gobain" },
  },
  "ceiling": {
    id: "ceiling",
    name: "Gypsum & Stretch Ceiling Systems",
    subtitle: "Metal GI Grid Framework ➔ Designer Acoustic False Ceiling",
    badge: "Gypsum Ceilings",
    transitionType: "Architectural Ceiling Grid Snap & Backlit Illumination",
    effectDescription: "Grid framework to completed designer false ceiling",
    beforeImg: "/images/drive_assets/ceiling_acoustic_grid.jpg",
    afterImg: "/images/drive_assets/ceiling_luxury_led.jpg",
    beforeAlt: "Ceiling Grid Framework & Electrical Layout",
    afterAlt: "Completed Designer Gypsum False Ceiling with Integrated Lighting",
    accentColor: "#EC4899",
  },
  "residential": {
    id: "residential",
    name: "Residential & Rapid Wall Partitions",
    subtitle: "Sub-Roof & Stud Framing ➔ Precision Architectural Residence",
    badge: "Panels & Partitions",
    transitionType: "Modular Rapid Wall Interlocking Slide & Snap",
    effectDescription: "Alternating precast panel alignment",
    beforeImg: "/images/construction/roof-001.jpg",
    afterImg: "/images/construction/roof-040.jpg",
    beforeAlt: "Residential Construction - Timber Sub-Roof & Framing",
    afterAlt: "Completed Modern Residential Architecture - Custom Architectural Cladding",
    accentColor: "#8B5CF6",
  },
  "renovation": {
    id: "renovation",
    name: "Ideal Renovation & Waterproofing",
    subtitle: "Unsealed Surface ➔ 100% Water-Tight Restored High-Performance Roof",
    badge: "Turnkey Renovation",
    transitionType: "Fluid Waterproofing Membrane Seal Wave",
    effectDescription: "Radial moisture-barrier restoration sweep",
    beforeImg: "/images/construction/roof-001.jpg",
    afterImg: "/images/construction/roof-040.jpg",
    beforeAlt: "Renovation & Waterproofing - Base Surface Treatment & Rafters",
    afterAlt: "Completed Turnkey Renovation - 100% Water-Tight High-Performance Commercial Roof",
    accentColor: "#EC4899",
  },
};
export const TRANSITION_KEYS: TransitionKey[] = [
  "roof-shingles",
  "roof-stone-coated",
  "roof-thatch",
  "roof-polycarbonate",
  "roof-arch",
  "roof-trafford",
  "roofing",
  "peb",
  "truss",
  "glazing",
  "ceiling",
  "residential",
  "renovation",
];

export function resolveTransitionKey(val: number | string): TransitionKey {
  if (typeof val === "number") {
    return TRANSITION_KEYS[val % TRANSITION_KEYS.length] || "peb";
  }
  const normalized = val.toLowerCase().trim();
  if (normalized in PILLAR_TRANSITION_SETS) {
    return normalized as TransitionKey;
  }
  if (normalized.includes("shingle")) return "roof-shingles";
  if (normalized.includes("stone") || normalized.includes("coated") || normalized.includes("luxard")) return "roof-stone-coated";
  if (normalized.includes("thatch") || normalized.includes("resort")) return "roof-thatch";
  if (normalized.includes("polycarbon") || normalized.includes("shed") || normalized.includes("canopy")) return "roof-polycarbonate";
  if (normalized.includes("arch") || normalized.includes("curved") || normalized.includes("truss-less")) return "roof-arch";
  if (normalized.includes("trafford") || normalized.includes("oralium")) return "roof-trafford";
  if (normalized.includes("ceiling") || normalized.includes("gypsum") || normalized.includes("stretch")) return "ceiling";
  if (normalized.includes("roof")) return "roofing";
  if (normalized.includes("peb") || normalized.includes("pre-engineered")) return "peb";
  if (normalized.includes("truss") || normalized.includes("structural") || normalized.includes("fabricat")) return "truss";
  if (normalized.includes("glass") || normalized.includes("glazing") || normalized.includes("acp") || normalized.includes("facade") || normalized.includes("railing") || normalized.includes("smart")) return "glazing";
  if (normalized.includes("partition") || normalized.includes("panel") || normalized.includes("floor") || normalized.includes("rapid")) return "residential";
  if (normalized.includes("renovat") || normalized.includes("waterproof") || normalized.includes("membrane") || normalized.includes("repair")) return "renovation";
  return "peb";
}

/**
 * Standard, natural photometric color styling without artificial contrast or brightness boosting
 */
function getRecolorShader(hex?: string, key?: TransitionKey) {
  if (key === "peb" || key === "truss" || !hex) {
    return {
      cssFilter: "none",
      blendMode: "normal",
      opacity: 0,
      color: "transparent",
    };
  }

  const h = hex.toLowerCase();

  // 1. Royal Blue / Sky Blue (Oralium / Tata / Polycarbonate Blue)
  if (h === "#1e3a8a" || h === "#0369a1" || h === "#0284c7" || h === "#2b6cb0") {
    return {
      cssFilter: "sepia(0.5) hue-rotate(185deg) saturate(2.0)",
      blendMode: "color",
      opacity: 0.30,
      color: hex,
    };
  }

  // 2. Terracotta / Crimson Red / Oxide (Luxard / Oralium / Shingles)
  if (h === "#991b1b" || h === "#a93226" || h === "#9c4221" || h === "#9a3412" || h === "#c05621") {
    return {
      cssFilter: "sepia(0.6) hue-rotate(-25deg) saturate(1.8)",
      blendMode: "color",
      opacity: 0.30,
      color: hex,
    };
  }

  // 3. Forest Green / Evergreen / Mist Green / Tropical Moss
  if (h === "#166534" || h === "#234e52" || h === "#3e5638" || h === "#047857" || h === "#4f6d48" || h === "#22543d") {
    return {
      cssFilter: "sepia(0.5) hue-rotate(85deg) saturate(1.8)",
      blendMode: "color",
      opacity: 0.30,
      color: hex,
    };
  }

  // 4. Charcoal Slate / Volcanic Basalt / Midnight Black / Graphite
  if (h === "#2d3748" || h === "#1f2421" || h === "#1a202c" || h === "#374151" || h === "#0f172a") {
    return {
      cssFilter: "grayscale(0.8)",
      blendMode: "color",
      opacity: 0.20,
      color: hex,
    };
  }

  // 5. Bali Golden Straw / Palm Bronze / Desert Sand Gold / Oak / Teak
  if (h === "#d4a373" || h === "#8c5835" || h === "#b7791f" || h === "#a16207" || h === "#d69e2e") {
    return {
      cssFilter: "sepia(0.6) hue-rotate(15deg) saturate(1.6)",
      blendMode: "color",
      opacity: 0.25,
      color: hex,
    };
  }

  // 6. Polar White / Glacier White / Alabaster / Opal / Diamond Clear / Carrara
  if (h === "#ffffff" || h === "#f8fafc" || h === "#f3f4f6" || h === "#edf2f7" || h === "#e0f2fe") {
    return {
      cssFilter: "grayscale(0.3)",
      blendMode: "overlay",
      opacity: 0.20,
      color: hex,
    };
  }

  // 7. Coffee Brown / Dark Swiss Walnut
  if (h === "#4a2e18" || h === "#5c4033" || h === "#78350f") {
    return {
      cssFilter: "sepia(0.6) hue-rotate(-15deg) saturate(1.5)",
      blendMode: "color",
      opacity: 0.30,
      color: hex,
    };
  }

  // 8. Metallic Silver / Brushed SS
  if (h === "#cbd5e1" || h === "#a0aec0" || h === "#e2e8f0" || h === "#9ca3af") {
    return {
      cssFilter: "grayscale(0.7)",
      blendMode: "overlay",
      opacity: 0.20,
      color: hex,
    };
  }

  // 9. Champagne Gold / PVD Rose Gold
  if (h === "#d4af37" || h === "#be185d" || h === "#b45309") {
    return {
      cssFilter: "sepia(0.6) hue-rotate(20deg) saturate(1.8)",
      blendMode: "color",
      opacity: 0.25,
      color: hex,
    };
  }

  return {
    cssFilter: "none",
    blendMode: "color",
    opacity: 0.20,
    color: hex,
  };
}

interface DynamicConstructionTransitionProps {
  activeTransition: TransitionKey | number | string;
  activeColor?: MaterialColorState;
}

export function DynamicConstructionTransition({
  activeTransition,
  activeColor,
}: DynamicConstructionTransitionProps) {
  const currentKey = resolveTransitionKey(activeTransition);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [animatingKey, setAnimatingKey] = useState<string>(currentKey);

  // Trigger animation effect on service change without unmounting DOM nodes
  useEffect(() => {
    setAnimatingKey(currentKey);
    const timeout = setTimeout(() => {
      setAnimatingKey("");
    }, 900);
    return () => clearTimeout(timeout);
  }, [currentKey]);

  // Real-time scroll listener: smoothly transitions from Unfinished (0%) to Finished (100%) by ~40% scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const totalScrollable = (document.documentElement.scrollHeight - window.innerHeight) || 1;
      
      const transitionThreshold = Math.max(totalScrollable * 0.4, 600);
      const rawProgress = scrollY / transitionThreshold;
      const progress = Math.min(Math.max(rawProgress, 0), 1);
      
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const activeAsset = PILLAR_TRANSITION_SETS[currentKey] || PILLAR_TRANSITION_SETS.peb;
  const currentColor = activeColor || activeAsset.defaultColor;
  const shader = getRecolorShader(currentColor?.hex, currentKey);
  const progressPercent = Math.round(scrollProgress * 100);

  return (
    <div
      className="fixed inset-0 z-0 w-full h-full pointer-events-none overflow-hidden bg-background"
      aria-hidden="true"
    >
      <div className="absolute inset-0 w-full h-full">
        {TRANSITION_KEYS.map((key) => {
          const set = PILLAR_TRANSITION_SETS[key];
          const isSelected = currentKey === key;
          const isAnimatingThis = animatingKey === key;

          const getCustomAnimationClass = () => {
            if (!isAnimatingThis) return "";
            if (key.startsWith("roof")) return "animate-roof-cascade";
            switch (key) {
              case "peb":
                return "animate-peb-portal";
              case "truss":
                return "animate-truss-lattice";
              case "glazing":
                return "animate-glass-prismatic";
              case "ceiling":
                return "animate-panel-snap";
              case "residential":
                return "animate-panel-snap";
              case "renovation":
                return "animate-waterproof-wave";
              default:
                return "";
            }
          };

          return (
            <div
              key={set.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                isSelected ? "opacity-100" : "opacity-0 pointer-events-none"
              } ${getCustomAnimationClass()}`}
            >
              {/* Layer 1: UNFINISHED (Bare rafters, structural grid, trusses - Authentic Project Prep) */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={set.beforeImg}
                  alt={set.beforeAlt}
                  fill
                  priority={isSelected}
                  sizes="100vw"
                  className="object-cover object-center"
                  unoptimized
                />
              </div>

              {/* Layer 2: FINISHED (Scrubbed in smoothly by scroll - Authentic Drive Project Photos) */}
              <div
                className="absolute inset-0 w-full h-full will-change-[opacity]"
                style={{
                  opacity: scrollProgress,
                  transition: "opacity 0.12s ease-out",
                }}
              >
                <div
                  className="absolute inset-0 w-full h-full transition-all duration-700 ease-out"
                  style={{ filter: isSelected ? shader.cssFilter : undefined }}
                >
                  <Image
                    src={set.afterImg}
                    alt={set.afterAlt}
                    fill
                    priority={isSelected}
                    sizes="100vw"
                    className="object-cover object-center"
                    unoptimized
                  />
                </div>

                {/* Layer 2B: Realistic Natural Color Overlay */}
                {isSelected && currentColor && shader.opacity > 0 && (
                  <div
                    className="absolute inset-0 pointer-events-none transition-all duration-700 ease-out"
                    style={{
                      backgroundColor: shader.color,
                      mixBlendMode: shader.blendMode as any,
                      opacity: shader.opacity,
                    }}
                  />
                )}
              </div>

              {/* Service Animation Flash */}
              {isAnimatingThis && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-15 animate-pulse"
                    style={{ backgroundColor: currentColor?.hex || set.accentColor }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Dynamic Active Pillar Watermark Indicator with Live Material Color & Finish Details */}
      <div className="absolute bottom-6 left-6 hidden md:flex items-center gap-3 bg-surface/90 dark:bg-surface/80 backdrop-blur-xl border border-border/80 px-4 py-2.5 rounded-2xl shadow-2xl pointer-events-auto transition-all">
        <div className="relative flex items-center justify-center">
          <span
            className="w-3.5 h-3.5 rounded-full border border-white/50 shadow-md animate-pulse"
            style={{ backgroundColor: currentColor?.hex || activeAsset.accentColor }}
          />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span
              className="text-[9px] font-mono font-bold tracking-widest uppercase"
              style={{ color: activeAsset.accentColor }}
            >
              {activeAsset.badge}
            </span>
            <span className="text-[9px] font-mono text-muted-foreground uppercase">
              · {progressPercent === 100 ? "COMPLETED" : progressPercent === 0 ? "RAW STRUCTURE" : `BUILDING (${progressPercent}%)`}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-foreground truncate max-w-[260px]">
              {activeAsset.name}
            </span>
            {currentColor && (
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/30 truncate max-w-[150px]">
                {currentColor.name}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Keyframe Animations */}
      <style jsx>{`
        @keyframes pebPortal {
          0% {
            clip-path: inset(0 48% 0 48%);
            transform: scale(1.06);
          }
          100% {
            clip-path: inset(0 0% 0 0%);
            transform: scale(1);
          }
        }
        @keyframes trussLattice {
          0% {
            clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
            transform: scale(0.97);
          }
          100% {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            transform: scale(1);
          }
        }
        @keyframes roofCascade {
          0% {
            clip-path: inset(0 0 100% 0);
            transform: translateY(-30px);
          }
          100% {
            clip-path: inset(0 0 0 0);
            transform: translateY(0);
          }
        }
        @keyframes glassPrismatic {
          0% {
            filter: blur(10px) brightness(1.3);
            opacity: 0.4;
          }
          100% {
            filter: blur(0px) brightness(1);
            opacity: 1;
          }
        }
        @keyframes panelSnap {
          0% {
            clip-path: polygon(50% 0, 50% 0, 50% 100%, 50% 100%);
          }
          100% {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
          }
        }
        @keyframes waterproofWave {
          0% {
            clip-path: circle(0% at 50% 50%);
          }
          100% {
            clip-path: circle(100% at 50% 50%);
          }
        }
        @keyframes turbineVortex {
          0% {
            clip-path: circle(0% at 50% 50%);
            transform: rotate(-3deg);
          }
          100% {
            clip-path: circle(100% at 50% 50%);
            transform: rotate(0deg);
          }
        }

        .animate-peb-portal {
          animation: pebPortal 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-truss-lattice {
          animation: trussLattice 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .animate-roof-cascade {
          animation: roofCascade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-glass-prismatic {
          animation: glassPrismatic 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-panel-snap {
          animation: panelSnap 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-waterproof-wave {
          animation: waterproofWave 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-turbine-vortex {
          animation: turbineVortex 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}


