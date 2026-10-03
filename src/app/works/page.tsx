import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WorksWeHaveDone } from "@/components/sections/WorksWeHaveDone";
import { Projects } from "@/components/sections/Projects";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FloatingActionWidget } from "@/components/ui/FloatingActionWidget";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Completed Works & Projects | Ideal Solutions Kerala",
  description: "Explore 87+ authentic project photos of luxury roofing shingles, structural steel PEB buildings, and false ceilings executed across Kerala by Ideal Solutions.",
  openGraph: {
    title: "Completed Works & Real Projects | Ideal Solutions",
    description: "100% authentic site photography of completed Kerala architectural roofing, PEB engineering, and false ceilings.",
  },
};

export default function WorksPage() {
  return (
    <>
      <Navbar />
      
      {/* Fixed Background Image */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-background">
        <img src="/images/products_unique/03_steel_truss.jpg" className="w-full h-full object-cover opacity-[0.12]" alt="Background" />
      </div>

      <main className="relative z-10 bg-transparent text-foreground pt-24 sm:pt-32">
        {/* Page Header Banner */}
        <section className="py-12 sm:py-16 md:py-20 bg-surface/40 border-b border-border/60 relative overflow-hidden">
          <div className="absolute inset-0 bg-blueprint-grid opacity-25 pointer-events-none" />
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
            <Reveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-3 text-xs font-mono">
                    <Link href="/" className="text-muted-foreground hover:text-accent transition-colors">
                      HOME
                    </Link>
                    <span className="text-border">/</span>
                    <span className="text-accent font-bold">OUR COMPLETED WORKS</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tight mb-3">
                    PROJECT ARCHIVE & REAL WORKS.
                  </h1>
                  <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
                    Browse our gallery of 87+ authentic site photographs from completed projects across Kerala, Tamil Nadu, and Karnataka.
                  </p>
                </div>

                {/* Key Metrics Strip */}
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 font-mono">
                  <span className="px-3.5 py-2 rounded-xl bg-surface/90 dark:bg-zinc-900/90 border border-border text-xs font-bold text-foreground shadow-sm flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    87 Authentic Records
                  </span>
                  <span className="px-3.5 py-2 rounded-xl bg-surface/90 dark:bg-zinc-900/90 border border-border text-xs font-bold text-foreground shadow-sm flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    1,500+ Commissioned Works
                  </span>
                  <span className="px-3.5 py-2 rounded-xl bg-accent/15 border border-accent/30 text-xs font-bold text-accent shadow-sm flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    30–50 Yr Warranty
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 1. Complete 87-Photo Gallery with Filters */}
        <WorksWeHaveDone />

        {/* 2. Featured Architectural Case Studies */}
        <Projects />

        {/* 3. Client Testimonials */}
        <Testimonials />

        {/* 4. Final Consultation CTA */}
        <FinalCTA />
      </main>

      <FloatingActionWidget />
      <Footer />
    </>
  );
}
