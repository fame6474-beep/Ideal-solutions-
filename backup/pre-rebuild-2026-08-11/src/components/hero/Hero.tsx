"use client";
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export function Hero() {
  const container = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    // Initial Load Sequence
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    
    tl.fromTo(bgRef.current, { scale: 1.08 }, { scale: 1, duration: 1.5, ease: "power3.out" })
      .fromTo(".hero-stagger", 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, stagger: 0.15, duration: 1 }, 
        "-=1.0"
      );

    // Scroll Parallax and Fade
    if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
      gsap.to(bgRef.current, {
        y: "20%",
        scale: 1.12,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      gsap.to(contentRef.current, {
        y: -100,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
    }
  }, { scope: container });

  return (
    <section ref={container} className="relative h-screen min-h-[600px] flex items-center justify-center pt-20 overflow-hidden">
      <div ref={bgRef} className="absolute inset-0 z-0 will-change-transform">
        <Image 
          src="/images/project_1_1786441230010.jpg" 
          alt="Premium architectural roofing" 
          fill 
          className="object-cover" 
          priority 
        />
        <div className="absolute inset-0 bg-background/50 dark:bg-background/70 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div ref={contentRef} className="container mx-auto px-6 relative z-10 text-center will-change-transform">
        <span className="hero-stagger text-copper font-semibold tracking-widest text-sm md:text-base mb-4 block">IDEAL SOLUTIONS</span>
        <div className="max-w-4xl">
          <h1 className="hero-stagger text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-tight">Built to Protect<br />What Matters.</h1>
          <p className="hero-stagger text-xl md:text-2xl text-white/90 mt-6 max-w-2xl mx-auto mb-10 text-balance">
            Premium roofing solutions engineered for durability, performance, and peace of mind. From new roof installations to repairs, maintenance, waterproofing, and complete roofing systems.
          </p>
        </div>
        <div className="hero-stagger flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="#contact" className="group bg-copper hover:bg-copper-light text-white px-8 py-4 rounded-sm font-medium transition-all flex items-center gap-2">
            GET A FREE QUOTE <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="#services" className="text-white hover:text-copper px-8 py-4 font-medium transition-colors flex items-center gap-2">
            EXPLORE SERVICES <ChevronDown className="w-4 h-4" />
          </Link>
        </div>
        <div className="hero-stagger mt-16 flex items-center justify-center gap-8 text-sm font-medium tracking-wider text-muted-foreground">
          <span>RESIDENTIAL</span>
          <span className="w-1.5 h-1.5 rounded-full bg-copper/50" />
          <span>COMMERCIAL</span>
          <span className="w-1.5 h-1.5 rounded-full bg-copper/50" />
          <span>INDUSTRIAL</span>
        </div>
      </div>
    </section>
  );
}
