"use client";
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { motion } from 'framer-motion';

export function Services() {
  const container = useRef<HTMLElement>(null);
  const services = [
    "Residential Roofing", "Commercial Roofing", "Roof Repair",
    "Waterproofing", "Roof Maintenance", "New Roof Installation"
  ];

  useGSAP(() => {
    gsap.fromTo(".service-card", 
      { opacity: 0, x: -20 },
      { 
        opacity: 1, x: 0, stagger: 0.1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: container.current, start: "top 70%" }
      }
    );
  }, { scope: container });

  return (
    <section ref={container} id="services" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-16 tracking-tight text-center">Roofing Solutions, Done Right.</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div 
              key={i} 
              className="service-card relative p-8 border border-border bg-charcoal cursor-pointer rounded-sm overflow-hidden"
              whileHover="hover"
              initial="initial"
            >
              <motion.div 
                className="absolute inset-0 bg-surface" 
                variants={{ initial: { opacity: 0 }, hover: { opacity: 1 } }} 
                transition={{ duration: 0.3 }}
              />
              <motion.span 
                className="text-copper/50 font-mono text-sm mb-4 block relative z-10"
                variants={{ hover: { x: 5, color: "var(--copper)" } }}
              >
                0{i + 1}
              </motion.span>
              <motion.h3 
                className="text-2xl font-semibold text-foreground mb-3 relative z-10"
                variants={{ hover: { x: 5 } }}
              >
                {s}
              </motion.h3>
              <p className="text-muted-foreground mb-6 relative z-10">Premium {s.toLowerCase()} tailored for durability and long-lasting protection.</p>
              <motion.div variants={{ initial: { opacity: 0, x: -10 }, hover: { opacity: 1, x: 0 } }}>
                <ArrowRight className="w-5 h-5 text-copper relative z-10" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
