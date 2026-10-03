"use client";

import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingActionWidget } from "@/components/ui/FloatingActionWidget";
import { ProductsCarousel } from "@/components/sections/ProductsCarousel";
import { Services } from "@/components/sections/Services";
import { Reveal } from "@/components/motion/Reveal";

export default function ServicesPage() {
  return (
    <>
      <Navbar />

      {/* Fixed Background Image */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-background">
        <img src="/images/products_unique/07_arch_roof.jpg" className="w-full h-full object-cover opacity-[0.12]" alt="Background" />
      </div>

      <main className="relative z-10 bg-transparent text-foreground min-h-screen pt-24 sm:pt-28 md:pt-32">
        {/* Page Hero Header */}
        <section className="py-12 sm:py-16 md:py-20 relative overflow-hidden bg-blueprint-grid border-b border-border/60">
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
            <Reveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-3 text-xs font-mono">
                    <Link href="/" className="text-muted-foreground hover:text-accent transition-colors">
                      HOME
                    </Link>
                    <span className="text-border">/</span>
                    <span className="text-accent font-bold">SOLUTIONS & DIVISIONS</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tight mb-3">
                    PRODUCTS & SERVICES.
                  </h1>
                  <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
                    Engineering-grade building solutions across 6 master contracting divisions and 22 certified architectural products. Inspect technical tolerances, structural specs, and custom finishes.
                  </p>
                </div>

                {/* Key Metrics Strip */}
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 font-mono">
                  <span className="px-3.5 py-2 rounded-xl bg-surface/90 dark:bg-zinc-900/90 border border-border text-xs font-bold text-foreground shadow-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    22 Dedicated Products
                  </span>
                  <span className="px-3.5 py-2 rounded-xl bg-surface/90 dark:bg-zinc-900/90 border border-border text-xs font-bold text-foreground shadow-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    6 Master Divisions
                  </span>
                  <span className="px-3.5 py-2 rounded-xl bg-accent/15 border border-accent/30 text-xs font-bold text-accent shadow-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    IS 2062 Certified
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 1. Complete 22 Dedicated Solutions Swatch Catalog with modal */}
        <ProductsCarousel />

        {/* 2. 6 Master Contracting Divisions Dossier with technical tolerances */}
        <Services />
      </main>

      <FloatingActionWidget />
      <Footer />
    </>
  );
}
