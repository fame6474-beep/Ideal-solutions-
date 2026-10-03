"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/lib/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface StageItem {
  id: "roofing" | "truss" | "peb";
  tabNumber: string;
  tabTitle: string;
  category: string;
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
  tags: string[];
  ctaLink: string;
}

const TRANSFORMATION_STAGES: StageItem[] = [
  {
    id: "roofing",
    tabNumber: "01",
    tabTitle: "ROOFING TRANSFORMATION",
    category: "ARCHITECTURAL RESIDENTIAL ROOFING",
    title: "UNFINISHED BARE FRAMING TO LUXURY SHINGLES ROOF",
    description:
      "Witness the complete structural evolution: from raw timber and steel purlins with high-grade waterproofing underlayment to multi-tier CertainTeed architectural shingles.",
    beforeImage: "/images/roof/roof-before.jpg",
    afterImage: "/images/roof/roof-after.jpg",
    beforeLabel: "RAW FRAMING & WATERPROOF UNDERLAYMENT",
    afterLabel: "COMPLETED ARCHITECTURAL SHINGLES ROOF",
    tags: ["CertainTeed Landmark USA", "100% Water-Tight", "50-Yr Warranty"],
    ctaLink: "#contact",
  },
  {
    id: "truss",
    tabNumber: "02",
    tabTitle: "STEEL TRUSS TRANSFORMATION",
    category: "PRECISION HEAVY & LIGHT FABRICATION",
    title: "UNFINISHED TUBULAR SKELETON TO LARGE-SPAN ARENA",
    description:
      "Watch the engineering transition from raw structural steel tubular portal truss erection to fully cladded, acoustically insulated auditoriums and commercial complexes.",
    beforeImage: "/images/truss/truss-before.jpg",
    afterImage: "/images/truss/truss-after.jpg",
    beforeLabel: "RAW TUBULAR STEEL PORTAL TRUSS FRAME",
    afterLabel: "FINISHED LARGE CLEAR-SPAN STRUCTURE",
    tags: ["TATA & APL Apollo Steel", "Anti-Corrosion Primed", "Zero Column Clutter"],
    ctaLink: "#contact",
  },
  {
    id: "peb",
    tabNumber: "03",
    tabTitle: "PEB INDUSTRIAL TRANSFORMATION",
    category: "PRE-ENGINEERED STEEL BUILDINGS",
    title: "UNFINISHED STEEL COLUMNS TO TURNKEY WAREHOUSE",
    description:
      "Experience the fast-track transformation from heavy steel foundation portal columns to an operational, insulated commercial warehouse logistics center.",
    beforeImage: "/images/peb/peb-before.jpg",
    afterImage: "/images/peb/peb-after.jpg",
    beforeLabel: "UNFINISHED HEAVY STEEL PORTAL COLUMNS",
    afterLabel: "FINISHED TURNKEY LOGISTICS WAREHOUSE",
    tags: ["High Wind-Load Rated", "Standing Seam Panels", "Multi-Story Commercial"],
    ctaLink: "#contact",
  },
];

export function ConstructionTransformationScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [splitProgress, setSplitProgress] = useState(50); // 0 to 100%
  const [isManualDragging, setIsManualDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion || !sectionRef.current) return;

      const totalStages = TRANSFORMATION_STAGES.length;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: pinContainerRef.current,
        scrub: 0.5,
        onUpdate: (self) => {
          if (isManualDragging) return;

          const progress = self.progress; // 0 to 1
          const scaled = progress * totalStages;
          const stageIdx = Math.min(Math.floor(scaled), totalStages - 1);
          const stageLocalProgress = scaled - stageIdx; // 0 to 1 within this stage

          setActiveStageIndex(stageIdx);

          const revealPct = Math.max(5, Math.min(95, stageLocalProgress * 100));
          setSplitProgress(revealPct);
        },
      });
    },
    { dependencies: [prefersReducedMotion, isManualDragging] }
  );

  const currentStage = TRANSFORMATION_STAGES[activeStageIndex];

  const handleSliderDrag = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSplitProgress(pct);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsManualDragging(true);
    handleSliderDrag(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isManualDragging) return;
    handleSliderDrag(e.clientX);
  };

  const handleMouseUp = () => {
    setIsManualDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsManualDragging(true);
    handleSliderDrag(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isManualDragging) return;
    handleSliderDrag(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsManualDragging(false);
  };

  const jumpToStage = (idx: number) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const targetScroll =
      scrollTop +
      rect.top +
      (idx / TRANSFORMATION_STAGES.length) * (rect.height - window.innerHeight);

    window.scrollTo({
      top: targetScroll + 10,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="transformations"
      className="relative w-full bg-zinc-950 text-white"
      style={{ height: "340vh" }}
    >
      {/* Pinned Viewport Container */}
      <div
        ref={pinContainerRef}
        className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between"
      >
        {/* Top Floating Glassmorphic Header */}
        <div className="relative z-30 pt-20 sm:pt-24 px-4 sm:px-8 max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-black/75 backdrop-blur-xl border border-white/15 p-4 sm:p-6 rounded-2xl shadow-2xl">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-accent uppercase">
                  MONTFORT-GRADE SCROLL ARCHITECTURE · UNFINISHED TO FINISHED
                </span>
              </div>
              <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-white tracking-tight uppercase">
                {currentStage.title}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-2xl line-clamp-2">
                {currentStage.description}
              </p>
            </div>

            {/* Stage Selector Tabs */}
            <div className="flex items-center gap-2 flex-wrap">
              {TRANSFORMATION_STAGES.map((stg, i) => (
                <button
                  key={stg.id}
                  type="button"
                  onClick={() => jumpToStage(i)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
                    activeStageIndex === i
                      ? "bg-accent text-white border-accent shadow-lg shadow-accent/30 scale-105"
                      : "bg-white/10 text-zinc-400 border-white/10 hover:text-white hover:bg-white/20"
                  }`}
                >
                  {stg.tabNumber}. {stg.id.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Central Before/After Interactive Viewer */}
        <div
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="absolute inset-0 w-full h-full cursor-ew-resize select-none overflow-hidden"
        >
          {/* Layer 1: UNFINISHED / BEFORE IMAGE (Background full screen) */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={currentStage.beforeImage}
              alt={`${currentStage.title} - Unfinished`}
              fill
              priority
              unoptimized
              className="object-cover object-center brightness-90 filter contrast-105"
            />
            
            {/* Unfinished HUD Tag Overlay */}
            <div className="absolute top-48 sm:top-56 right-4 sm:right-10 z-10 bg-black/85 backdrop-blur-md border border-amber-500/50 px-4 py-2.5 rounded-xl text-amber-400 shadow-2xl">
              <span className="text-[10px] font-mono tracking-widest block uppercase font-bold text-amber-400">
                PHASE 01 · RAW STRUCTURAL ERECTION
              </span>
              <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider block mt-0.5">
                {currentStage.beforeLabel}
              </span>
            </div>
          </div>

          {/* Layer 2: FINISHED / AFTER IMAGE (Clipped curtain overlay) */}
          <div
            className="absolute inset-0 w-full h-full transition-[clip-path] duration-75 ease-out"
            style={{
              clipPath: `polygon(0 0, ${splitProgress}% 0, ${splitProgress}% 100%, 0 100%)`,
            }}
          >
            <Image
              src={currentStage.afterImage}
              alt={`${currentStage.title} - Finished`}
              fill
              priority
              unoptimized
              className="object-cover object-center brightness-100 filter contrast-105"
            />

            {/* Finished HUD Tag Overlay */}
            <div className="absolute top-48 sm:top-56 left-4 sm:left-10 z-10 bg-black/85 backdrop-blur-md border border-emerald-500/50 px-4 py-2.5 rounded-xl text-emerald-400 shadow-2xl">
              <span className="text-[10px] font-mono tracking-widest block uppercase font-bold text-emerald-400">
                PHASE 02 · 100% FINISHED WORK
              </span>
              <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider block mt-0.5">
                {currentStage.afterLabel}
              </span>
            </div>
          </div>

          {/* Vertical Divider Laser Line & Interactive Handle */}
          <div
            className="absolute top-0 bottom-0 z-20 pointer-events-none transition-transform duration-75 ease-out"
            style={{
              left: `${splitProgress}%`,
              transform: "translateX(-50%)",
            }}
          >
            {/* Laser Line */}
            <div className="w-1 h-full bg-gradient-to-b from-accent via-white to-accent shadow-[0_0_20px_#f97316]" />

            {/* Center Handle Badge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-11 rounded-full bg-black/95 backdrop-blur-xl border-2 border-accent shadow-2xl flex items-center justify-between px-3 text-[10px] font-mono font-bold text-white uppercase tracking-wider pointer-events-auto cursor-grab active:cursor-grabbing hover:scale-105 transition-transform">
              <span className="text-emerald-400">◀ FINISHED</span>
              <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
              <span className="text-amber-400">RAW ▶</span>
            </div>
          </div>
        </div>

        {/* Bottom Floating Telemetry & Metric Bar */}
        <div className="relative z-30 pb-6 sm:pb-8 px-4 sm:px-8 max-w-7xl mx-auto w-full">
          <div className="bg-black/80 backdrop-blur-xl border border-white/15 p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
            {/* Metric Pills */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <span className="text-[10px] font-mono font-bold px-3 py-1.5 rounded-lg bg-white/10 text-white border border-white/15 uppercase">
                TRANSFORMATION RATIO: {Math.round(splitProgress)}% FINISHED
              </span>
              {currentStage.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-lg bg-accent/15 text-accent border border-accent/30"
                >
                  ✓ {tag}
                </span>
              ))}
            </div>

            {/* CTA & Scroll Instruction */}
            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              <span className="text-[11px] font-mono text-zinc-400 hidden lg:inline">
                ↓ Scroll or Drag Slider to Transform
              </span>
              <Link
                href={currentStage.ctaLink}
                className="px-5 py-2.5 rounded-xl bg-accent hover:bg-accent/90 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95 text-center flex-1 sm:flex-initial"
              >
                Estimate This Project →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
