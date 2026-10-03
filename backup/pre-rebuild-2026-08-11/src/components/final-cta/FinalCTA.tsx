"use client";
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export function FinalCTA() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    gsap.fromTo(".cta-bg", { scale: 1.1 }, { 
      scale: 1, 
      ease: "none",
      scrollTrigger: { trigger: container.current, start: "top bottom", end: "bottom top", scrub: true }
    });

    gsap.fromTo(".cta-content", { y: 50, opacity: 0 }, {
      y: 0, opacity: 1, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: container.current, start: "top 70%" }
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative py-32 flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="cta-bg w-full h-full relative will-change-transform">
          <Image src="/images/cta_roofing_1786441208695.jpg" alt="Roofing CTA" fill className="object-cover grayscale" />
        </div>
        <div className="absolute inset-0 bg-background/80 mix-blend-multiply" />
      </div>
      <div className="cta-content container mx-auto px-6 relative z-10 max-w-4xl">
        <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">Your Property Deserves<br/>Better Protection.</h2>
        <p className="text-xl text-muted-foreground mb-12">Whether you need a new roof, a repair, waterproofing, or professional maintenance, we're ready to help.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="#contact" className="bg-copper hover:bg-copper-light text-foreground px-8 py-4 rounded-sm font-medium transition-colors hover:scale-105 inline-block">
            GET YOUR FREE QUOTE →
          </Link>
          <button className="text-foreground border border-white/20 hover:bg-white/10 px-8 py-4 rounded-sm font-medium transition-colors">CALL US</button>
          <button className="text-foreground border border-white/20 hover:bg-white/10 px-8 py-4 rounded-sm font-medium transition-colors">WHATSAPP US</button>
        </div>
      </div>
    </section>
  );
}
