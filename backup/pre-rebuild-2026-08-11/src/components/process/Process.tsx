"use client";
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const steps = [
    { id: "01", title: "INSPECT", desc: "Assess the roof and identify the problem." },
    { id: "02", title: "RECOMMEND", desc: "Explain the options and recommend the right solution." },
    { id: "03", title: "BUILD", desc: "Execute the project with professional workmanship." },
    { id: "04", title: "PROTECT", desc: "Deliver a roofing system designed for long-term performance." }
  ];

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 768) return;

    const cards = gsap.utils.toArray('.process-card');
    
    // Desktop pinned scroll sequence
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=200%",
      pin: true,
      animation: gsap.timeline()
        .to(cards, {
          opacity: (i) => i === 0 ? 1 : 0.3,
          stagger: 0.5,
          ease: "none"
        })
        .to('.process-progress', { scaleX: 1, ease: "none", duration: 1.5 }, 0),
      scrub: 1,
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="process" className="py-24 bg-surface h-screen flex flex-col justify-center">
      <div className="container mx-auto px-6 w-full">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-16 tracking-tight">From Problem to Protection.</h2>
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10 hidden md:block">
            <div className="process-progress h-full bg-copper transform origin-left scale-x-0" />
          </div>
          {steps.map((s, i) => (
             <div key={i} className="process-card relative pt-4 md:pt-8 opacity-100 md:opacity-30 transition-opacity duration-300">
               <div className="text-copper font-mono text-sm mb-4">{s.id} — {s.title}</div>
               <p className="text-muted-foreground text-lg">{s.desc}</p>
             </div>
          ))}
        </div>
      </div>
    </section>
  );
}
