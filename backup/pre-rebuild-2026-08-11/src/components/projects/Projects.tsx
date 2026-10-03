"use client";
import { useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { motion } from 'framer-motion';

export function Projects() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(isReduced) return;

    gsap.fromTo(".project-image", 
      { scale: 1.1, clipPath: "inset(10% 0 0 0)" },
      { 
        scale: 1, clipPath: "inset(0% 0 0 0)", duration: 1.2, ease: "expo.out", stagger: 0.2,
        scrollTrigger: { trigger: container.current, start: "top 70%" }
      }
    );
  }, { scope: container });

  return (
    <section ref={container} id="projects" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-16 tracking-tight text-center">Work We're Proud Of.</h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div className="relative aspect-[4/3] overflow-hidden rounded-sm cursor-pointer group" whileHover="hover" initial="initial">
            <div className="project-image w-full h-full relative">
              <motion.div variants={{ hover: { scale: 1.05 } }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="w-full h-full relative">
                <Image src="/images/project_1_1786441230010.jpg" alt="Residential Project" fill className="object-cover" />
              </motion.div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-80" />
            <motion.div className="absolute bottom-0 left-0 p-8" variants={{ hover: { y: -10 } }} transition={{ duration: 0.4, ease: "easeOut" }}>
              <span className="text-copper font-semibold tracking-wider text-xs mb-2 block">PROJECT 01</span>
              <h3 className="text-2xl font-bold text-foreground">Residential Roof Installation</h3>
            </motion.div>
          </motion.div>
          
          <div className="project-image relative aspect-[4/3] overflow-hidden rounded-sm bg-background-lighter flex items-center justify-center">
            <span className="text-muted-foreground font-medium">PROJECT 02</span>
          </div>
          <div className="project-image relative aspect-[4/3] overflow-hidden rounded-sm bg-background-lighter flex items-center justify-center">
            <span className="text-muted-foreground font-medium">PROJECT 03</span>
          </div>
          <div className="project-image relative aspect-[4/3] overflow-hidden rounded-sm bg-background-lighter flex items-center justify-center">
            <span className="text-muted-foreground font-medium">PROJECT 04</span>
          </div>
        </div>
      </div>
    </section>
  );
}
