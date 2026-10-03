const fs = require('fs');
const path = require('path');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const files = {
  'src/lib/useReducedMotion.ts': `
import { useState, useEffect } from 'react';

export function useReducedMotion() {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setMatches(mediaQuery.matches);
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  return matches;
}
`,
  'src/components/motion/Reveal.tsx': `
"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/lib/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  yOffset?: number;
}

export function Reveal({ children, delay = 0, className = "", yOffset = 30 }: RevealProps) {
  const container = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion) return;
    
    gsap.fromTo(
      container.current,
      { y: yOffset, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 85%",
          once: true,
        },
      }
    );
  }, { scope: container, dependencies: [prefersReducedMotion, delay, yOffset] });

  return (
    <div ref={container} className={\`\${className} \${prefersReducedMotion ? "" : "opacity-0"}\`}>
      {children}
    </div>
  );
}
`,
  'src/components/motion/ParallaxImage.tsx': `
"use client";
import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/lib/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface ParallaxImageProps {
  src: string;
  alt: string;
  priority?: boolean;
}

export function ParallaxImage({ src, alt, priority = false }: ParallaxImageProps) {
  const container = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || window.innerWidth < 768) return;

    gsap.to(imageRef.current, {
      yPercent: 15,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, { scope: container, dependencies: [prefersReducedMotion] });

  return (
    <div ref={container} className="relative w-full h-full overflow-hidden bg-surface">
      <Image
        ref={imageRef}
        src={src}
        alt={alt}
        fill
        className="object-cover scale-[1.15]"
        priority={priority}
      />
    </div>
  );
}
`,
  'src/components/layout/Navbar.tsx': `
"use client";
import Link from 'next/link';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useReducedMotion } from '@/lib/useReducedMotion';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion) return;

    ScrollTrigger.create({
      start: "top -100",
      onUpdate: (self) => {
        setIsScrolled(self.scroll() > 100);
      }
    });
  }, { dependencies: [prefersReducedMotion] });

  return (
    <nav 
      ref={navRef}
      className={\`fixed top-0 w-full z-50 transition-all duration-500 \${
        isScrolled 
          ? "py-4 bg-surface/95 backdrop-blur-md border-b border-border shadow-sm text-foreground" 
          : "py-6 bg-transparent text-white"
      }\`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">
          IDEAL SOLUTIONS
        </Link>
        <div className={\`hidden md:flex items-center gap-8 text-sm font-medium \${isScrolled ? "text-foreground/90" : "text-white/90"}\`}>
          <Link href="#about" className="hover:text-accent transition-colors">ABOUT</Link>
          <Link href="#services" className="hover:text-accent transition-colors">SERVICES</Link>
          <Link href="#projects" className="hover:text-accent transition-colors">PROJECTS</Link>
          <Link href="#process" className="hover:text-accent transition-colors">PROCESS</Link>
          <Link href="#contact" className="hover:text-accent transition-colors">CONTACT</Link>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <ThemeToggle />
          <Link href="#contact" className="bg-accent hover:bg-accent/90 text-white px-6 py-2 rounded-sm font-medium transition-colors">
            GET A FREE QUOTE
          </Link>
        </div>
        <button className="md:hidden">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
        </button>
      </div>
    </nav>
  );
}
`,
  'src/components/ui/ThemeToggle.tsx': `
"use client";

import * as React from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-8 h-8" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative flex items-center justify-center w-8 h-8 rounded-full border border-transparent hover:border-border transition-colors group focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
      aria-label="Toggle theme"
    >
      <svg
        className="w-4 h-4 transition-all duration-300 dark:-rotate-90 dark:opacity-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
      <svg
        className="absolute w-4 h-4 transition-all duration-300 rotate-90 opacity-0 dark:rotate-0 dark:opacity-100"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    </button>
  );
}
`
};

for (const [filepath, content] of Object.entries(files)) {
  const fullPath = path.join(__dirname, filepath);
  ensureDir(path.dirname(fullPath));
  fs.writeFileSync(fullPath, content.trim());
}
console.log('Successfully scaffolded motion architecture.');
