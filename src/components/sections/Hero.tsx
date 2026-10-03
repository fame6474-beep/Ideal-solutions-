"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Reveal } from "@/components/motion/Reveal";
import { HeroProductsSlideshow } from "@/components/sections/HeroProductsSlideshow";
import { TopPillarsTabs } from "@/components/sections/TopPillarsTabs";
import { PartnerLogosMarquee } from "@/components/sections/PartnerLogosMarquee";
import { useReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 80;
const FRAME_PATH = (idx: number) =>
  `/hero/roof-sequence/ezgif-frame-${String(idx + 1).padStart(3, "0")}.jpg`;

interface HeroProps {
  activePillar?: number | string;
  onPillarChange?: (transition: string | number) => void;
}

export function Hero({ activePillar = 0, onPillarChange }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isReducedMotion = useReducedMotion();

  const targetProgress = useRef(0);
  const currentProgress = useRef(0);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const isLoadedRef = useRef<boolean[]>(new Array(TOTAL_FRAMES).fill(false));
  const lastRenderedIndexRef = useRef<number>(-1);

  // High-performance canvas drawing with full-bleed ambient background + sharp primary master layer
  const drawFrame = (progress: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const targetIndex = Math.min(
      TOTAL_FRAMES - 1,
      Math.max(0, Math.floor(progress * (TOTAL_FRAMES - 0.01)))
    );

    // Find the closest available loaded frame to guarantee zero flicker
    let imgToDraw: HTMLImageElement | null = null;
    if (isLoadedRef.current[targetIndex] && imagesRef.current[targetIndex]) {
      imgToDraw = imagesRef.current[targetIndex];
    } else {
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const prev = targetIndex - offset;
        const next = targetIndex + offset;
        if (prev >= 0 && isLoadedRef.current[prev] && imagesRef.current[prev]) {
          imgToDraw = imagesRef.current[prev];
          break;
        }
        if (next < TOTAL_FRAMES && isLoadedRef.current[next] && imagesRef.current[next]) {
          imgToDraw = imagesRef.current[next];
          break;
        }
      }
    }

    if (!imgToDraw) return;

    const canvasW = canvas.width;
    const canvasH = canvas.height;
    const imgW = imgToDraw.naturalWidth || imgToDraw.width || 2560;
    const imgH = imgToDraw.naturalHeight || imgToDraw.height || 1440;
    const canvasRatio = canvasW / canvasH;

    // Mobile / portrait viewports (< 1.25 ratio) use a full-bleed cover with optimal roof/house focal-point
    const isPortraitOrNarrow = canvasRatio < 1.25;

    if (isPortraitOrNarrow) {
      // =========================================================================
      // MOBILE & TABLET PORTRAIT: FULL-BLEED COVER WITH FOCAL-POINT POSITIONING
      // Covers 100% of the mobile viewport with zero distortion and zero black bars.
      // Focal point factor 0.38 centers the house structure and roof in the visible screen.
      // =========================================================================
      const scale = Math.max(canvasW / imgW, canvasH / imgH);
      const drawW = Math.round(imgW * scale);
      const drawH = Math.round(imgH * scale);
      const offsetX = Math.round((canvasW - drawW) / 2);
      const offsetY = Math.round((canvasH - drawH) * 0.38);

      ctx.save();
      ctx.filter = "none";
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(imgToDraw, 0, 0, imgW, imgH, offsetX, offsetY, drawW, drawH);
      ctx.restore();
    } else {
      // =========================================================================
      // DESKTOP & WIDESCREEN: TWO-LAYER FULL-BLEED CINEMATIC COMPOSITION
      // (100% UNCHANGED: Ambient full-bleed cover + sharp contained master image)
      // =========================================================================
      const coverScale = Math.max(canvasW / imgW, canvasH / imgH) * 1.08;
      const coverW = Math.round(imgW * coverScale);
      const coverH = Math.round(imgH * coverScale);
      const coverX = Math.round((canvasW - coverW) / 2);
      const coverY = Math.round((canvasH - coverH) / 2);

      ctx.save();
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.filter = "blur(18px) brightness(0.82) saturate(1.15)";
      ctx.drawImage(imgToDraw, 0, 0, imgW, imgH, coverX, coverY, coverW, coverH);
      ctx.restore();

      // Subtle atmospheric wash to enhance depth while preserving rich colors
      ctx.fillStyle = "rgba(10, 13, 20, 0.25)";
      ctx.fillRect(0, 0, canvasW, canvasH);

      // Primary sharp master image
      const scale = Math.min(canvasW / imgW, canvasH / imgH);
      const drawW = Math.round(imgW * scale);
      const drawH = Math.round(imgH * scale);
      const offsetX = Math.round((canvasW - drawW) / 2);
      const offsetY = Math.round((canvasH - drawH) / 2);

      ctx.filter = "none";
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // Soft edge blending when margin areas exist at extreme wide aspect ratios
      if (drawW < canvasW || drawH < canvasH) {
        ctx.save();
        ctx.shadowColor = "rgba(0, 0, 0, 0.45)";
        ctx.shadowBlur = 28;
        ctx.drawImage(imgToDraw, 0, 0, imgW, imgH, offsetX, offsetY, drawW, drawH);
        ctx.restore();
      }

      ctx.drawImage(imgToDraw, 0, 0, imgW, imgH, offsetX, offsetY, drawW, drawH);
    }
    lastRenderedIndexRef.current = targetIndex;
  };

  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    const rect = canvas.getBoundingClientRect();
    const cssWidth = Math.round(rect.width || (typeof window !== "undefined" ? window.innerWidth : 1280));
    const cssHeight = Math.round(rect.height || (typeof window !== "undefined" ? window.innerHeight : 720));
    const targetW = Math.round(cssWidth * dpr);
    const targetH = Math.round(cssHeight * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
      if (canvas.style.width) canvas.style.removeProperty("width");
      if (canvas.style.height) canvas.style.removeProperty("height");
    }
    drawFrame(currentProgress.current);
  };

  // Progressive preloading of the 100-frame image sequence with high-performance decoding
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isReducedMotion) {
      const finalImg = new window.Image();
      finalImg.decoding = "async";
      finalImg.src = FRAME_PATH(TOTAL_FRAMES - 1);
      finalImg.onload = () => {
        imagesRef.current[TOTAL_FRAMES - 1] = finalImg;
        isLoadedRef.current[TOTAL_FRAMES - 1] = true;
        handleResize();
      };
      return;
    }

    // Step 1: Preload Keyframe milestones for immediate responsiveness
    const priorityIndices = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, TOTAL_FRAMES - 1];
    priorityIndices.forEach((idx) => {
      const img = new window.Image();
      img.decoding = "async";
      img.src = FRAME_PATH(idx);
      img.onload = () => {
        imagesRef.current[idx] = img;
        isLoadedRef.current[idx] = true;
        if (idx === 0 || lastRenderedIndexRef.current === -1) {
          handleResize();
        }
      };
    });

    // Step 2: Progressively load all remaining in-between frames
    const remainingIndices: number[] = [];
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      if (!priorityIndices.includes(i)) {
        remainingIndices.push(i);
      }
    }

    let currentBatch = 0;
    const batchSize = 12;
    let timer: NodeJS.Timeout | null = null;

    const loadNextBatch = () => {
      if (currentBatch >= remainingIndices.length) return;
      const slice = remainingIndices.slice(currentBatch, currentBatch + batchSize);
      slice.forEach((idx) => {
        const img = new window.Image();
        img.decoding = "async";
        img.src = FRAME_PATH(idx);
        img.onload = () => {
          imagesRef.current[idx] = img;
          isLoadedRef.current[idx] = true;
        };
      });
      currentBatch += batchSize;
      if (currentBatch < remainingIndices.length) {
        timer = setTimeout(loadNextBatch, 30);
      }
    };

    timer = setTimeout(loadNextBatch, 60);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isReducedMotion]);

  // GSAP ScrollTrigger Sequence Scrubbing & ResizeObserver
  useGSAP(
    () => {
      if (!containerRef.current || !canvasRef.current) return;

      handleResize();

      const resizeObserver = new ResizeObserver(() => {
        handleResize();
      });
      if (canvasRef.current) resizeObserver.observe(canvasRef.current);
      if (containerRef.current) resizeObserver.observe(containerRef.current);
      window.addEventListener("resize", handleResize);

      if (isReducedMotion) {
        return () => {
          resizeObserver.disconnect();
          window.removeEventListener("resize", handleResize);
        };
      }

      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true, // Use instant progress reporting so our custom ticker can handle 100% of the smoothing
        onUpdate: (self) => {
          targetProgress.current = self.progress;
        },
      });

      // Persistent smooth interpolation loop
      const tickerAction = () => {
        // Only update if there's a meaningful difference to save CPU
        if (Math.abs(targetProgress.current - currentProgress.current) > 0.00001) {
          // 0.09 factor provides premium cinematic inertia without feeling disconnected
          currentProgress.current += (targetProgress.current - currentProgress.current) * 0.09;
          drawFrame(currentProgress.current);
        }
      };

      gsap.ticker.add(tickerAction);
      
      // Refresh ScrollTrigger once DOM renders
      ScrollTrigger.refresh();

      return () => {
        resizeObserver.disconnect();
        window.removeEventListener("resize", handleResize);
        gsap.ticker.remove(tickerAction);
        st.kill();
      };
    },
    { scope: containerRef, dependencies: [isReducedMotion] }
  );

  const getNumericIndex = (val: number | string): number => {
    if (typeof val === "number") return val;
    if (val === "peb") return 0;
    if (val === "truss") return 1;
    if (val === "roofing") return 2;
    return 0;
  };

  const currentNumericTab = getNumericIndex(activePillar);

  const handlePillarSelect = (index: number) => {
    if (onPillarChange) {
      const keys = ["peb", "truss", "roofing"];
      onPillarChange(keys[index] || index);
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[120svh] lg:min-h-[480vh] bg-[#0a0d14] text-foreground"
    >
      {/* 1. AUTHENTIC ROOF CONSTRUCTION CANVAS BACKGROUND (STICKY BEHIND ENTIRE HERO STAGE) */}
      <div className="sticky top-0 left-0 w-full h-[100svh] min-h-[100svh] z-0 pointer-events-none overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block"
        />
        {/* SUBTLE CINEMATIC READABILITY VIGNETTE */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(10,13,20,0.12) 0%, rgba(10,13,20,0.65) 100%)",
          }}
        />
      </div>

      {/* 2. FOREGROUND HERO NARRATIVE CONTENT (PULLED OVER THE STICKY ROOF BACKGROUND) */}
      <div className="relative z-10 -mt-[100svh] container mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-24 flex flex-col justify-between min-h-[120svh] lg:min-h-[480vh] max-w-[94vw] sm:max-w-none">
        
        {/* STAGE 1: TOP HERO BANNER: COMPANY OVERVIEW */}
        <div className="min-h-[85svh] flex flex-col justify-center">
          <Reveal yOffset={25}>
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/40 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-md shadow-2xl p-4 sm:p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center relative z-10">
                
                {/* Left Column: Branding, Tagline & CTAs */}
                <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-between">
                  {/* Tagline removed per request */}

                  {/* Giant Prominent Company Title */}
                  <h1 className="text-3xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[0.95] text-foreground mb-3 sm:mb-4 drop-shadow-sm">
                    IDEAL<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-blue-600 to-slate-700 dark:from-blue-400 dark:via-blue-500 dark:to-slate-300">
                      SOLUTIONS.
                    </span>
                  </h1>

                  {/* Sub-heading from Official Logo */}
                  <p className="text-xs sm:text-lg md:text-xl font-extrabold tracking-tight text-foreground uppercase mb-5 sm:mb-8 leading-snug drop-shadow-sm">
                    STRUCTURAL FABRICATION · ROOFING · PEB SOLUTIONS
                  </p>

                  {/* Quick Action CTAs */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4 mb-5 sm:mb-6">
                    <Link
                      href="/contact"
                      className="bg-accent hover:bg-accent/90 text-white px-5 py-3 sm:px-7 sm:py-4 rounded-xl font-bold text-center tracking-wide transition-all shadow-lg hover:shadow-accent/25 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 text-xs sm:text-base"
                    >
                      <span>📋 CONTACT US</span>
                    </Link>
                    <Link
                      href="/works"
                      className="bg-surface hover:bg-surface/90 text-foreground border border-border/80 backdrop-blur-md px-5 py-3 sm:px-7 sm:py-4 rounded-xl font-bold text-center tracking-wide transition-all shadow-md hover:border-accent active:scale-95 text-xs sm:text-base"
                    >
                      OUR COMPLETED WORKS
                    </Link>
                    <a
                      href="https://wa.me/919567242157?text=Hi%20Ideal%20Solutions,%20I%20would%20like%20to%20consult%20with%20you%20regarding%20a%20construction%20project."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 text-white bg-[#25D366] hover:bg-[#20ba5a] font-bold text-xs sm:text-sm px-4 py-2.5 sm:py-3.5 rounded-xl shadow-md transition-all active:scale-95"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                      </svg>
                      <span>WhatsApp Us</span>
                    </a>
                  </div>

                  {/* Commercial Trust Signals Strip */}
                  <div className="pt-3 sm:pt-4 border-t border-border/50 flex items-center gap-2 sm:gap-6 flex-wrap text-[10px] sm:text-xs font-mono text-muted-foreground">
                    <span className="flex items-center gap-1 text-foreground font-semibold">
                      <span className="text-amber-400">★★★★★</span> 4.9/5 (1,500+ Projects)
                    </span>
                    
                    <span className="hidden sm:inline text-border">·</span>
                    <span className="text-foreground/90 font-medium truncate">
                      💧 100% Monolithic Seal
                    </span>
                  </div>
                </div>

                {/* Right Column: Products & Services Slideshow in Card (Desktop & Widescreen) */}
                <div className="hidden lg:block lg:col-span-6 xl:col-span-5 w-full">
                  <HeroProductsSlideshow />
                </div>

              </div>
            </div>
          </Reveal>
        </div>

        {/* STAGE 2: 3 TOP CORE SECTIONS: PEB, TRUSS, AND ROOFING TABS */}
        <div className="min-h-[85svh] flex flex-col justify-center my-16 sm:my-28 md:my-36">
          <Reveal delay={0.1} yOffset={30}>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-accent font-mono text-xs font-bold uppercase tracking-widest">
                  CORE DIVISIONS & CAPABILITIES
                </span>
              </div>
              <TopPillarsTabs activeTab={currentNumericTab} onTabSelect={handlePillarSelect} />
            </div>
          </Reveal>
        </div>

        {/* STAGE 3: FIRST WRITINGS: The Official "ABOUT US" directly from PDF Page 1 */}
        <div className="min-h-[95svh] flex flex-col justify-center my-16 sm:my-28 md:my-36">
          <Reveal delay={0.15} yOffset={30}>
            <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md border border-white/40 dark:border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-14 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/40 dark:border-white/10 mb-6 sm:mb-8">
                <div>
                  <span className="text-accent font-mono text-[11px] sm:text-xs uppercase tracking-widest font-bold block mb-1">
                    OFFICIAL COMPANY INTRODUCTION · PAGE 01
                  </span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
                    ABOUT US
                  </h2>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full bg-surface/80 text-foreground border border-border">
                    Trivandrum
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full bg-surface/80 text-foreground border border-border">
                    18+ Years Excellence
                  </span>
                </div>
              </div>

              {/* Official PDF Paragraphs */}
              <div className="space-y-4 sm:space-y-6 text-sm sm:text-base md:text-lg text-foreground/85 dark:text-foreground/90 leading-relaxed">
                <p className="font-medium text-foreground text-base sm:text-lg md:text-xl leading-relaxed">
                  We <strong className="text-accent font-bold">&quot;IDEAL SOLUTIONS&quot;</strong> — A group of trend setters in (Trading & Contracting), based in Trivandrum, commenced operations in 2007 to cater to the growing demands of the construction industry by introducing high-quality national and international brands incorporating the latest technologies. We offer the services of a trusted and integrated marketing and contracting company, supported by a strong distribution network across Kerala, Tamil Nadu, and Karnataka.
                </p>

                <p>
                  Initially, we undertook structural fabrication and roofing works for industrial, commercial, and residential projects in collaboration with leading roofing shingle companies such as <strong>GAS, CertainTeed Saint-Gobain, BP Canada, and TechnoNicol</strong>.
                </p>

                <p>
                  Subsequently, we expanded our operations to undertake heavy structural work for industrial and commercial structures in collaboration with leading suppliers and manufacturers such as <strong>TATA, GSW, SAIL, Apollo, JAW, Tindal</strong>, providing products including round, square, and rectangular sections, GI and Aluminum roofing sheets, and Sandwich panel roofing systems. Alongside our structural and roofing services, we also undertake specialized architectural cladding and rapid wall solutions to meet the diverse requirements of the construction sector.
                </p>

                <p>
                  We are involved in industrial, commercial, and residential projects, offering comprehensive services including the design, supply, fabrication, and construction of various structures, including <strong>Pre-Engineered Buildings (PEB)</strong>. As PEB Structural Fabricators & Contractors, we have successfully executed several prestigious structural fabrication projects. Our dedicated structural fabrication division is equipped to handle large-scale projects and provides quality services and products to clients across India.
                </p>

                <p>
                  In addition to heavy metal and sheet metal fabrication, we specialize in the supply and distribution of structural fabrication products and services. We are equipped to meet diverse application requirements while maintaining high standards of quality, precise design, and strict quality control in accordance with individual project specifications.
                </p>

                <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-accent/10 border border-accent/25 my-4 sm:my-6">
                  <p className="font-bold text-foreground text-base sm:text-lg md:text-xl">
                    At <span className="text-accent">IDEAL SOLUTIONS</span>, we bring together expertise, quality, technology, and dependable service to provide comprehensive <span className="underline decoration-accent decoration-2 underline-offset-4">&quot;Total Building Solutions&quot;</span> to our clients.
                  </p>
                </div>
              </div>

              {/* Partner / Associate Brands Continuously Circling Marquee from PDF */}
              <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-border/60">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <span className="text-[11px] sm:text-xs uppercase tracking-widest text-accent font-bold block">
                    ASSOCIATE MANUFACTURERS & NATIONAL / GLOBAL PARTNER BRANDS:
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground hidden sm:inline">
                    (CONTINUOUS LIVE STREAM)
                  </span>
                </div>
                <PartnerLogosMarquee />
              </div>

              {/* Official Social Links from PDF Page 1 */}
              <div className="mt-6 sm:mt-8 pt-6 border-t border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs sm:text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Official Channels:</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href="https://www.facebook.com/share/1BqjJXcDvu/?mibextid=wwXIfr"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] sm:text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-600/15 hover:bg-blue-600 text-blue-600 hover:text-white border border-blue-500/30 transition-all"
                  >
                    Facebook 1
                  </a>
                  <a
                    href="https://www.facebook.com/share/17ZPexs5kG/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] sm:text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-600/15 hover:bg-blue-600 text-blue-600 hover:text-white border border-blue-500/30 transition-all"
                  >
                    Facebook 2
                  </a>
                  <a
                    href="https://www.facebook.com/share/1ADTQMbaBN/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] sm:text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-600/15 hover:bg-blue-600 text-blue-600 hover:text-white border border-blue-500/30 transition-all"
                  >
                    Facebook 3
                  </a>
                  <a
                    href="https://www.facebook.com/share/1Gcesc2ZgU/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] sm:text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-600/15 hover:bg-blue-600 text-blue-600 hover:text-white border border-blue-500/30 transition-all"
                  >
                    Facebook 4
                  </a>
                  <a
                    href="https://www.instagram.com/_.ideal.solutions_?igsh=MTZ2OHFhN2Z4OTV0MA"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] sm:text-xs font-semibold px-3 py-1.5 rounded-lg bg-pink-600/15 hover:bg-pink-600 text-pink-600 hover:text-white border border-pink-500/30 transition-all"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* STAGE 4: CINEMATIC FINALE INDICATOR (FINAL BLACK ROOF CELEBRATION) */}
        <div className="min-h-[70svh] flex items-center justify-center py-12 px-3">
        </div>

      </div>
    </section>
  );
}