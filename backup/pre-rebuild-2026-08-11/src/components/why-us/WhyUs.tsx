"use client";
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export function WhyUs() {
  const container = useRef<HTMLElement>(null);
  const reasons = [
    { title: "QUALITY MATERIALS" },
    { title: "SKILLED WORKMANSHIP" },
    { title: "HONEST RECOMMENDATIONS" },
    { title: "LONG-TERM THINKING" }
  ];

  useGSAP(() => {
    gsap.fromTo(".why-number", 
      { opacity: 0, scale: 0.85, y: 40 },
      { 
        opacity: 1, scale: 1, y: 0, stagger: 0.2, duration: 1, ease: "power4.out",
        scrollTrigger: { trigger: container.current, start: "top 70%" }
      }
    );
  }, { scope: container });

  return (
    <section ref={container} className="py-24 bg-surface border-t border-border overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-16 tracking-tight">Built Different.<br/>Built to Last.</h2>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
          {reasons.map((r, i) => (
            <div key={i} className="flex gap-6 border-t border-border pt-6">
              <span className="why-number text-4xl font-bold text-copper/30 will-change-transform">0{i+1}</span>
              <h3 className="text-2xl font-semibold text-foreground pt-1">{r.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
