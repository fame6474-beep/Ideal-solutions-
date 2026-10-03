"use client";

import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingActionWidget } from "@/components/ui/FloatingActionWidget";
import { PartnerLogosMarquee } from "@/components/sections/PartnerLogosMarquee";
import { Reveal } from "@/components/motion/Reveal";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      {/* Fixed Background Image */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-background">
        <img src="/images/products_unique/02_peb_structure.jpg" className="w-full h-full object-cover opacity-[0.12]" alt="Background" />
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
                    <span className="text-accent font-bold">ABOUT OUR FIRM</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tight mb-3">
                    ABOUT IDEAL SOLUTIONS.
                  </h1>
                  <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
                    A group of trend setters in trading and contracting based in Trivandrum, delivering world-class structural engineering, PEB, and roofing solutions since 2007.
                  </p>
                </div>

                {/* Key Credentials Badges */}
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 font-mono">
                  <span className="px-3.5 py-2 rounded-xl bg-surface/90 dark:bg-zinc-900/90 border border-border text-xs font-bold text-foreground shadow-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    18+ Years Excellence
                  </span>
                  <span className="px-3.5 py-2 rounded-xl bg-accent/15 border border-accent/30 text-xs font-bold text-accent shadow-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    Trivandrum HQ
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Official Company Narrative Section */}
        <section className="py-16 sm:py-24 md:py-28">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
            <Reveal>
              <div className="glass-plaque rounded-3xl p-8 sm:p-12 md:p-16 shadow-2xl space-y-8">
                
                <div className="flex items-center justify-between pb-6 border-b border-border/60">
                  <span className="text-accent font-mono text-xs uppercase tracking-widest font-bold">
                    OFFICIAL COMPANY INTRODUCTION · COMMENCED 2007
                  </span>
                  <span className="text-[11px] font-mono text-muted-foreground">
                    SOUTH INDIA OPERATIONS
                  </span>
                </div>

                <div className="space-y-6 text-base sm:text-lg text-foreground/85 dark:text-foreground/90 leading-relaxed font-sans">
                  <p className="font-semibold text-foreground text-lg sm:text-xl leading-relaxed">
                    We <strong className="text-accent font-bold">&quot;IDEAL SOLUTIONS&quot;</strong> — A group of trend setters in (Trading &amp; Contracting), based in Trivandrum, commenced operations in 2007 to cater to the growing demands of the construction industry by introducing high-quality national and international brands incorporating the latest technologies. We offer the services of a trusted and integrated marketing and contracting company, supported by a strong distribution network across Kerala, Tamil Nadu, and Karnataka.
                  </p>

                  <p>
                    Initially, we undertook structural fabrication and roofing works for industrial, commercial, and residential projects in collaboration with leading roofing shingle companies such as <strong>GAS, CertainTeed Saint-Gobain, BP Canada, and TechnoNicol</strong>.
                  </p>

                  <p>
                    Subsequently, we expanded our operations to undertake heavy structural work for industrial and commercial structures in collaboration with leading suppliers and manufacturers such as <strong>TATA, JSW, SAIL, Apollo, and Jindal</strong>, providing products including round, square, and rectangular sections, GI and Aluminum roofing sheets, and Sandwich panel roofing systems. Alongside our structural and roofing services, we also undertake specialized architectural cladding and rapid wall solutions to meet the diverse requirements of the construction sector.
                  </p>

                  <p>
                    We are involved in industrial, commercial, and residential projects, offering comprehensive services including the design, supply, fabrication, and construction of various structures, including <strong>Pre-Engineered Buildings (PEB)</strong>. As PEB Structural Fabricators &amp; Contractors, we have successfully executed several prestigious structural fabrication projects. Our dedicated structural fabrication division is equipped to handle large-scale projects and provides quality services and products to clients across India.
                  </p>

                  <p>
                    In addition to heavy metal and sheet metal fabrication, we specialize in the supply and distribution of structural fabrication products and services. We are equipped to meet diverse application requirements while maintaining high standards of quality, precise design, and strict quality control in accordance with individual project specifications.
                  </p>

                  <div className="p-6 sm:p-8 rounded-2xl bg-accent/10 border border-accent/25 my-8">
                    <p className="font-bold text-foreground text-lg sm:text-xl leading-relaxed">
                      At <span className="text-accent">IDEAL SOLUTIONS</span>, we bring together expertise, quality, technology, and dependable service to provide comprehensive <span className="underline decoration-accent decoration-2 underline-offset-4">&quot;Total Building Solutions&quot;</span> to our clients.
                    </p>
                  </div>
                </div>

                {/* 3 Core Strengths Pillar Grid */}
                <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 pt-6 border-t border-border/60">
                  <div className="p-5 rounded-2xl bg-surface/60 border border-border/60">
                    <span className="text-xs font-mono font-bold text-accent uppercase tracking-wider block mb-1">
                      01 · PRECISION
                    </span>
                    <h3 className="text-base font-bold text-foreground mb-1">Structural Rigor</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      IS 2062 Grade certified structural steel engineering with sub-2mm fabrication tolerances.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-surface/60 border border-border/60">
                    <span className="text-xs font-mono font-bold text-accent uppercase tracking-wider block mb-1">
                      02 · INTEGRITY
                    </span>
                    <h3 className="text-base font-bold text-foreground mb-1">Monolithic Sealing</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      100% water-tight guarantees designed specifically for torrential Kerala monsoons.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-surface/60 border border-border/60">
                    <span className="text-xs font-mono font-bold text-accent uppercase tracking-wider block mb-1">
                      03 · PEDIGREE
                    </span>
                    <h3 className="text-base font-bold text-foreground mb-1">Global Partnerships</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Direct certified applicators for CertainTeed Saint-Gobain, TechnoNicol, and Tata Steel.
                    </p>
                  </div>
                </div>

                {/* Associate Brands Continuous Marquee */}
                <div className="pt-8 border-t border-border/60">
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <span className="text-xs uppercase tracking-widest text-accent font-mono font-bold block">
                      ASSOCIATE MANUFACTURERS & NATIONAL / GLOBAL PARTNER BRANDS:
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      (CONTINUOUS STREAM)
                    </span>
                  </div>
                  <PartnerLogosMarquee />
                </div>

                {/* Official Social Links from PDF Page 1 */}
                <div className="pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-sm text-muted-foreground font-mono">
                    <span className="font-semibold text-foreground">Official Channels:</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href="https://www.facebook.com/share/1BqjJXcDvu/?mibextid=wwXIfr"
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-600/15 hover:bg-blue-600 text-blue-500 hover:text-white border border-blue-500/30 transition-all"
                    >
                      Facebook 1
                    </a>
                    <a
                      href="https://www.facebook.com/share/17ZPexs5kG/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-600/15 hover:bg-blue-600 text-blue-500 hover:text-white border border-blue-500/30 transition-all"
                    >
                      Facebook 2
                    </a>
                    <a
                      href="https://www.facebook.com/share/1ADTQMbaBN/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-600/15 hover:bg-blue-600 text-blue-500 hover:text-white border border-blue-500/30 transition-all"
                    >
                      Facebook 3
                    </a>
                    <a
                      href="https://www.facebook.com/share/1Gcesc2ZgU/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-600/15 hover:bg-blue-600 text-blue-500 hover:text-white border border-blue-500/30 transition-all"
                    >
                      Facebook 4
                    </a>
                    <a
                      href="https://www.instagram.com/_.ideal.solutions_?igsh=MTZ2OHFhN2Z4OTV0MA"
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-pink-600/15 hover:bg-pink-600 text-pink-500 hover:text-white border border-pink-500/30 transition-all"
                    >
                      Instagram
                    </a>
                  </div>
                </div>

                {/* Direct Consultation Link */}
                <div className="pt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="text-lg font-bold text-foreground">Discuss Your Project With Us</h4>
                    <p className="text-xs text-muted-foreground">Laser site measurements and structural consultations across South India.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link
                      href="/services"
                      className="px-5 py-3 rounded-xl bg-surface border border-border hover:border-accent text-foreground text-xs font-bold uppercase tracking-wider transition-all"
                    >
                      Explore Services →
                    </Link>
                    <Link
                      href="/contact"
                      className="px-6 py-3 rounded-xl bg-accent hover:bg-accent/90 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95"
                    >
                      Schedule Consultation →
                    </Link>
                  </div>
                </div>

              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <FloatingActionWidget />
      <Footer />
    </>
  );
}
