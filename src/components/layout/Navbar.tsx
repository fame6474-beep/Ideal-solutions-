"use client";

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion) return;

    ScrollTrigger.create({
      start: "top -60",
      onUpdate: (self) => {
        setIsScrolled(self.scroll() > 60);
      }
    });
  }, { dependencies: [prefersReducedMotion] });

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname?.startsWith(path)) return true;
    return false;
  };

  return (
    <nav 
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "py-2.5 bg-surface/90 dark:bg-[#060a14]/90 backdrop-blur-xl border-b border-border/80 shadow-[0_10px_30px_rgba(0,0,0,0.35)]" 
          : "py-4 bg-gradient-to-b from-background/90 via-background/40 to-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
        
        {/* Brand Identity & Architectural Wordmark */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white p-1 border border-white/20 shadow-md group-hover:scale-105 group-hover:border-accent transition-all duration-300 flex-shrink-0 flex items-center justify-center overflow-hidden">
            <Image
              src="/images/logo.png"
              alt="Ideal Solutions Official Architectural Logo"
              width={48}
              height={48}
              priority
              className="object-contain w-full h-full"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-base sm:text-xl font-black tracking-tight text-foreground leading-none group-hover:text-accent transition-colors truncate">
              IDEAL SOLUTIONS
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs font-bold tracking-wider text-accent uppercase leading-none truncate">
                STRUCTURAL · ROOFING · PEB
              </span>
            </div>
          </div>
        </Link>
        
        {/* Desktop Navigation Links (Floating Glass Pill) */}
        <div className="hidden md:flex items-center gap-1 p-1.5 rounded-full bg-surface/70 dark:bg-zinc-950/60 backdrop-blur-lg border border-border/60 shadow-inner">
          <Link
            href="/"
            className={`px-4 py-2 rounded-full text-sm font-semibold tracking-wide transition-all ${
              pathname === '/' 
                ? "bg-accent text-white shadow-md shadow-accent/25 font-bold" 
                : "text-muted-foreground hover:text-foreground hover:bg-surface/50"
            }`}
          >
            HOME
          </Link>
          <Link
            href="/about"
            className={`px-4 py-2 rounded-full text-sm font-semibold tracking-wide transition-all ${
              pathname?.startsWith('/about') 
                ? "bg-accent text-white shadow-md shadow-accent/25 font-bold" 
                : "text-muted-foreground hover:text-foreground hover:bg-surface/50"
            }`}
          >
            ABOUT
          </Link>
          <Link
            href="/services"
            className={`px-4 py-2 rounded-full text-sm font-semibold tracking-wide transition-all ${
              pathname?.startsWith('/services') 
                ? "bg-accent text-white shadow-md shadow-accent/25 font-bold" 
                : "text-muted-foreground hover:text-foreground hover:bg-surface/50"
            }`}
          >
            SERVICES
          </Link>
          <Link
            href="/works"
            className={`px-4 py-2 rounded-full text-sm font-semibold tracking-wide transition-all ${
              pathname?.startsWith('/works') 
                ? "bg-accent text-white shadow-md shadow-accent/25 font-bold" 
                : "text-muted-foreground hover:text-foreground hover:bg-surface/50"
            }`}
          >
            OUR WORKS
          </Link>
          <Link
            href="/contact"
            className={`px-4 py-2 rounded-full text-sm font-semibold tracking-wide transition-all ${
              pathname?.startsWith('/contact') 
                ? "bg-accent text-white shadow-md shadow-accent/25 font-bold" 
                : "text-muted-foreground hover:text-foreground hover:bg-surface/50"
            }`}
          >
            CONTACT
          </Link>
        </div>

        {/* Right Action Island */}
        <div className="hidden md:flex items-center gap-3.5">
          <ThemeToggle />
          
          <Link
            href="/contact"
            className="relative group overflow-hidden bg-accent hover:bg-accent/90 text-white px-5 py-2.5 rounded-xl font-bold text-sm uppercase tracking-wide transition-all shadow-md shadow-accent/20 hover:shadow-accent/40 active:scale-95 flex items-center gap-1.5"
          >
            <span>CONSULT ENGINEER</span>
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </div>
        
        {/* Mobile Header Quick Actions */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <a
            href="tel:9567242157"
            aria-label="Call Ideal Solutions"
            className="w-9 h-9 rounded-xl bg-accent/15 text-accent border border-accent/30 flex items-center justify-center active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </a>
          <button 
            className="p-2 -mr-1 rounded-xl text-foreground hover:bg-surface/80 transition-colors border border-border/60"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface/95 dark:bg-[#080d18]/95 backdrop-blur-2xl border-b border-border shadow-2xl px-6 py-6 flex flex-col gap-3.5 text-sm font-semibold animate-in slide-in-from-top-3 duration-200">
          <div className="flex items-center gap-2 pb-3 border-b border-border/50 text-[10px] font-mono text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>ACCEPTING PROJECTS ACROSS KERALA</span>
          </div>
          
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`py-2 px-3 rounded-lg transition-colors flex items-center justify-between ${
              pathname === '/' ? "bg-accent/15 text-accent font-bold" : "hover:bg-surface text-foreground"
            }`}
          >
            <span>HOME</span>
            <span className="text-xs text-muted-foreground font-mono">01</span>
          </Link>
          <Link
            href="/about"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`py-2 px-3 rounded-lg transition-colors flex items-center justify-between ${
              pathname?.startsWith('/about') ? "bg-accent/15 text-accent font-bold" : "hover:bg-surface text-foreground"
            }`}
          >
            <span>ABOUT US</span>
            <span className="text-xs text-muted-foreground font-mono">02</span>
          </Link>
          <Link
            href="/services"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`py-2 px-3 rounded-lg transition-colors flex items-center justify-between ${
              pathname?.startsWith('/services') ? "bg-accent/15 text-accent font-bold" : "hover:bg-surface text-foreground"
            }`}
          >
            <span>PRODUCTS & SERVICES (22 ITEMS)</span>
            <span className="text-xs text-muted-foreground font-mono">03</span>
          </Link>
          <Link
            href="/works"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`py-2 px-3 rounded-lg transition-colors flex items-center justify-between ${
              pathname?.startsWith('/works') ? "bg-accent/15 text-accent font-bold" : "hover:bg-surface text-foreground"
            }`}
          >
            <span>OUR WORKS (87+ PROJECTS)</span>
            <span className="text-xs text-muted-foreground font-mono">04</span>
          </Link>
          <Link
            href="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`py-2 px-3 rounded-lg transition-colors flex items-center justify-between ${
              pathname?.startsWith('/contact') ? "bg-accent/15 text-accent font-bold" : "hover:bg-surface text-foreground"
            }`}
          >
            <span>CONTACT & CONSULTATION</span>
            <span className="text-xs text-muted-foreground font-mono">05</span>
          </Link>
          
          <a
            href="https://wa.me/919567242157?text=Hi%20Ideal%20Solutions,%20I%20would%20like%20to%20consult%20with%20you%20regarding%20my%20roofing/construction%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full mt-2 py-3 rounded-xl bg-[#25D366] text-white text-center font-bold text-xs shadow-md flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
            <span>Direct WhatsApp Desk (+91 95672 42157)</span>
          </a>
        </div>
      )}
    </nav>
  );
}