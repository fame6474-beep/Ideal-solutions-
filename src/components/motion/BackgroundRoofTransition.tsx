"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function BackgroundRoofTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const finishedRef = useRef<HTMLDivElement>(null);
  const bgScaleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !finishedRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Scrub the finished roof opacity from 0 to 1 completed by half of the page
      gsap.fromTo(
        finishedRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "45% top",
            scrub: 0.4,
          },
        }
      );

      // 2. Subtle architectural zoom/depth effect as user navigates down
      if (bgScaleRef.current) {
        gsap.fromTo(
          bgScaleRef.current,
          { scale: 1.06 },
          {
            scale: 1.0,
            ease: "none",
            scrollTrigger: {
              trigger: document.body,
              start: "top top",
              end: "bottom bottom",
              scrub: 1.0,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 w-full h-full pointer-events-none overflow-hidden bg-background"
      aria-hidden="true"
    >
      <div ref={bgScaleRef} className="absolute inset-0 w-full h-full">
        {/* Layer 1: Unfinished PEB Structural Steel Frame (Top of Page) */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/peb/peb-before.jpg"
            alt="PEB Construction - Heavy Structural Steel Portal Frame & Rafters"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-105 contrast-[1.06] saturate-105"
          />
        </div>

        {/* Layer 2: Completed / Finished PEB Building (Transitions in as you scroll down) */}
        <div
          ref={finishedRef}
          className="absolute inset-0 w-full h-full opacity-0 will-change-[opacity]"
        >
          <Image
            src="/images/peb/peb-after.jpg"
            alt="Completed Pre-Engineered Building - Modern Cladding & Architectural Facade"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-105 contrast-[1.06] saturate-105"
          />
        </div>
      </div>

      {/* Lighter, clearer atmospheric overlay so roof details pop in bright rooms */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/15 via-background/20 to-background/30 transition-colors duration-500" />

      {/* Subtle edge vignette with reduced opacity */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_65%,var(--background)_100%)] opacity-35" />
    </div>
  );
}
