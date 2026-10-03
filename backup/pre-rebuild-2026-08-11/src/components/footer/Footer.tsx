"use client";
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export function Footer() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".footer-reveal", 
      { opacity: 0, y: 20 },
      { 
        opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: container.current, start: "top 95%" }
      }
    );
  }, { scope: container });

  return (
    <footer ref={container} className="bg-background border-t border-border py-12 overflow-hidden">
      <div className="container mx-auto px-6 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <span className="footer-reveal text-xl font-bold tracking-tight text-foreground block mb-2">IDEAL SOLUTIONS</span>
          <span className="footer-reveal text-muted-foreground text-sm block">Roofing • Protection • Craftsmanship</span>
        </div>
        <div className="footer-reveal text-muted-foreground text-sm">
          © 2026 Ideal Solutions. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
