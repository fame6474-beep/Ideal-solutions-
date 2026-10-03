"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function RoofConstructionDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isReducedMotion = useReducedMotion();

  // Production Sequence Architecture
  const frameCount = 90;
  const currentFrame = useRef({ index: 0 });
  const sequenceRef = useRef<HTMLImageElement[]>([]);
  
  // Temporary fallback asset (completed house) to provide the realistic cinematic background
  const fallbackImageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (isReducedMotion || typeof window === "undefined") return;

    // 1. Load the fallback visual background
    const fallbackImg = new window.Image();
    fallbackImg.src = "/images/construction/demo/demo-005.jpg";
    fallbackImg.onload = () => {
      fallbackImageRef.current = fallbackImg;
      // Draw immediately once fallback is ready
      drawFrame(0);
    };

    // 2. Load the production sequence (frame-001.webp to frame-090.webp)
    // If they exist, they will populate sequenceRef and be drawn.
    for (let i = 1; i <= frameCount; i++) {
      const img = new window.Image();
      const paddedIndex = i.toString().padStart(3, "0");
      img.src = `/images/construction/sequence/frame-${paddedIndex}.webp`;
      
      img.onload = () => {
        sequenceRef.current[i - 1] = img;
        if (i === 1) drawFrame(0);
      };
      
      img.onerror = () => {
        // Leave undefined in the array if missing
        sequenceRef.current[i - 1] = null as unknown as HTMLImageElement;
      };
    }
  }, [isReducedMotion]);

  const drawFrame = (index: number) => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const canvas = canvasRef.current;
    
    // Choose the best available asset: the specific frame, or the fallback image
    const frameImg = sequenceRef.current[index];
    const imageToDraw = (frameImg && frameImg.complete && frameImg.naturalWidth > 0) 
      ? frameImg 
      : fallbackImageRef.current;

    if (!imageToDraw) return;

    // Calculate object-fit: cover logic to fill the entire Canvas viewport
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = imageToDraw.width / imageToDraw.height;
    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      // Canvas is wider than image
      drawHeight = canvas.width / imgRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      // Canvas is taller than image
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imageToDraw, offsetX, offsetY, drawWidth, drawHeight);
  };

  useGSAP(() => {
    if (isReducedMotion || !containerRef.current) return;

    const handleResize = () => {
      if (canvasRef.current && containerRef.current) {
        // Canvas must precisely match the container's 100vw/100vh dimensions
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        drawFrame(Math.round(currentFrame.current.index));
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=500%", // Pin section for a long cinematic scroll
        pin: true,
        scrub: 0.5, // Smooth normalized interpolation
      },
    });

    // Scrub the frame index from 0 to 89
    tl.to(currentFrame.current, {
      index: frameCount - 1,
      snap: "index",
      ease: "none",
      onUpdate: () => drawFrame(Math.round(currentFrame.current.index)),
    });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, { scope: containerRef, dependencies: [isReducedMotion] });

  // Reduced motion fallback simply renders the background statically
  if (isReducedMotion) {
    return (
      <section className="relative w-full h-[100svh] bg-background overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <img src="/images/construction/demo/demo-005.jpg" className="w-full h-full object-cover" alt="Roof Construction" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10 pointer-events-none" />
        <div className="container mx-auto px-6 md:px-12 relative z-20">
          <div className="w-full max-w-[500px] md:max-w-[600px]">
            <h2 className="text-xs md:text-sm font-bold tracking-[0.2em] text-accent mb-4 uppercase">Engineered Precision</h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-white text-balance">BUILT TO LAST<br/>A LIFETIME.</h3>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-[100svh] bg-background overflow-hidden"
    >
      
      {/* 
        BACKGROUND LAYER 
        Canvas spans the absolute full viewport (100vw x 100vh).
        It renders the cinematic construction scene.
      */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <canvas
          ref={canvasRef}
          className="block w-full h-full object-cover"
        />
      </div>

      {/* 
        CINEMATIC READABILITY LAYER 
        A subtle gradient mapping from left to right, providing 
        just enough contrast for the foreground typography without 
        darkening or hiding the architectural scene.
      */}
      <div className="absolute inset-0 z-10 pointer-events-none" style={{
        background: "linear-gradient(90deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.05) 100%)"
      }} />

      {/* 
        FOREGROUND CONTENT 
        Absolutely positioned within the cinematic environment.
      */}
      <div className="relative z-20 w-full h-full">
        {/* Absolute positioning to precisely place the text block inside the environment */}
        <div className="absolute left-[8%] md:left-[12%] top-1/2 -translate-y-1/2 w-full max-w-[500px] md:max-w-[600px] pr-6">
          
          <span className="block text-xs md:text-sm font-bold tracking-[0.2em] text-accent mb-4 uppercase">
            ENGINEERED PRECISION
          </span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-white text-balance leading-tight">
            BUILT TO LAST<br/>
            A LIFETIME.
          </h2>
          
          <p className="text-lg text-white/90 leading-relaxed font-medium">
            Every layer of an Ideal Solutions roof is meticulously engineered and installed. 
            From structural framing to premium architectural shingles, we don&apos;t cut corners. 
          </p>

        </div>
      </div>

    </section>
  );
}
