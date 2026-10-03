"use client";
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { constructionConfig } from './constructionConfig';

export function RoofConstruction() {
  const container = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // State for image preloading
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  
  const frameCount = constructionConfig.sequence.frameCount;

  // Preload sequence images
  useEffect(() => {
    imagesRef.current = [];
    let loaded = 0;

    for (let i = 1; i <= frameCount; i++) {
      const img = new window.Image();
      img.src = constructionConfig.sequence.framePath(i);
      img.onload = () => {
        loaded++;
        setImagesLoaded(loaded);
        // Force a draw of the first frame as soon as it's available
        if (i === 1 && canvasRef.current) {
          drawFrame(1);
        }
      };
      imagesRef.current.push(img);
    }
  }, [frameCount]);

  // Canvas Drawing Logic (object-fit: cover equivalent)
  const drawFrame = (index: number) => {
    if (!canvasRef.current || imagesRef.current.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Zero-indexed array mapping (frame 1 -> index 0)
    const imgIndex = Math.max(0, Math.min(index - 1, frameCount - 1));
    const img = imagesRef.current[imgIndex];

    // Development visibility logging requested by user
    if (process.env.NODE_ENV === 'development') {
      console.log('RoofConstruction Frame Draw:', {
        currentFrame: index,
        loadedFrames: imagesLoaded,
        totalFrames: frameCount,
        imageSrc: img?.src
      });
    }

    if (img && img.complete && img.naturalWidth !== 0) {
      // Handle High-DPI displays
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      // Only resize canvas if its physical dimensions change to prevent thrashing
      if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
      }
      
      const cW = canvas.width;
      const cH = canvas.height;
      const iW = img.width;
      const iH = img.height;

      // Calculate object-fit: cover dimensions
      const scale = Math.max(cW / iW, cH / iH);
      const w = iW * scale;
      const h = iH * scale;
      const x = (cW - w) / 2;
      const y = (cH - h) / 2;

      ctx.clearRect(0, 0, cW, cH);
      ctx.drawImage(img, x, y, w, h);
    }
  };

  // Re-draw on resize
  useEffect(() => {
    const handleResize = () => {
      // Draw whatever the current frame is (from GSAP if available, or frame 1)
      const playhead = { frame: 1 };
      drawFrame(Math.round(playhead.frame));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // GSAP Orchestration
  useGSAP(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // For reduced motion, just show the foreground content statically.
    if(isReduced) {
      gsap.set(contentRef.current, { opacity: 1, y: 0 });
      drawFrame(frameCount); // Draw final frame
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "+=350%", // Long cinematic scroll
        pin: true,
        scrub: 1,
      }
    });

    // 1. Scrub Canvas Frames
    const playhead = { frame: 1 };
    
    tl.to(playhead, {
      frame: frameCount,
      snap: "frame",
      ease: "none",
      duration: 1,
      onUpdate: () => {
        drawFrame(Math.round(playhead.frame));
      }
    }, 0);

    // 2. Extremely subtle camera scale on the canvas container
    tl.fromTo(canvasRef.current,
      { scale: 1.0 },
      { scale: 1.025, ease: "none", duration: 1 },
      0
    );

    // Foreground Content Reveal (Stable)
    tl.fromTo(contentRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.15, ease: "power2.out" },
      0
    );

  }, { scope: container, dependencies: [imagesLoaded] }); // Re-run GSAP when images load so onUpdate draws

  return (
    <section ref={container} className="relative h-screen bg-background overflow-hidden flex items-center justify-center">
      
      {/* Background - Canvas Image Sequence ONLY */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full will-change-transform"
          style={{ display: 'block', width: '100%', height: '100%' }}
        />

        {/* Cinematic Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40 mix-blend-multiply z-10 pointer-events-none" />
        <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.9)] z-10 pointer-events-none" />
      </div>

      {/* Foreground Content - Completely Stable Editorial Focus */}
      <div ref={contentRef} className="container mx-auto px-6 relative z-20 text-center max-w-3xl will-change-transform opacity-0 pointer-events-none">
        <span className="text-copper font-semibold tracking-widest text-sm md:text-base mb-6 block">
          BUILT TO PROTECT
        </span>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight mb-8">
          Built to Protect<br />What Matters.
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground mb-12 text-balance leading-relaxed">
          Premium roofing solutions engineered for durability, performance and absolute peace of mind.
        </p>
        <div className="flex items-center justify-center pointer-events-auto">
          <Link href="#contact" className="group bg-copper hover:bg-copper-light text-white px-8 py-4 rounded-sm font-medium transition-all flex items-center gap-2">
            GET A FREE QUOTE <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

    </section>
  );
}
