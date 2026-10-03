"use client";
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export function About() {
  const container = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    gsap.fromTo(".about-image", 
      { clipPath: isReduced ? "inset(0 0 0 0)" : "inset(0 30% 0 0)", scale: isReduced ? 1 : 1.08 },
      { 
        clipPath: "inset(0 0% 0 0)", 
        scale: 1, 
        duration: 1.5, 
        ease: "power4.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
        }
      }
    );

    gsap.fromTo(".about-text",
      { y: 30, opacity: 0 },
      { 
        y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 60%",
        }
      }
    );
  }, { scope: container });

  return (
    <section ref={container} id="about" className="py-24 bg-surface overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[3/4] w-full max-w-md mx-auto lg:mx-0 overflow-hidden rounded-sm about-image-container">
            <div className="about-image w-full h-full relative will-change-transform">
              <Image src="/images/about_architecture_1786441189165.jpg" alt="Architectural roof" fill className="object-cover" />
            </div>
          </div>
          <div>
            <span className="about-text text-copper font-semibold tracking-widest text-sm mb-4 block">ABOUT IDEAL SOLUTIONS</span>
            <div className="overflow-hidden mb-8"><h2 className="about-text text-4xl md:text-5xl font-bold text-foreground tracking-tight">More Than a Roof.<br/>It's Protection.</h2></div>
            <p className="about-text text-lg text-muted-foreground mb-6 leading-relaxed">
              At Ideal Solutions, we believe a roof is more than a structure above your head. It is the first line of protection for your home, business, and everything inside it.
            </p>
            <p className="about-text text-lg text-muted-foreground mb-10 leading-relaxed">
              We combine quality materials, skilled workmanship, and attention to detail to deliver roofing solutions designed for lasting performance.
            </p>
            <Link href="#services" className="about-text inline-flex items-center gap-2 text-foreground hover:text-copper transition-colors font-medium group border-b border-copper/30 pb-1">
              LEARN MORE <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
