import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-surface/90 dark:bg-[#060a14] backdrop-blur-2xl border-t border-border/80 text-foreground py-14 sm:py-20 relative z-10 overflow-hidden">
      {/* Background Architectural Blueprint Lines */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-30 pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Top Credentials Strip */}
        <div className="pb-10 mb-10 border-b border-border/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/15 text-accent border border-accent/30 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <span className="text-base sm:text-lg font-bold text-foreground block tracking-tight">
                CONTRACTING & STRUCTURAL ENGINEERING EXCELLENCE
              </span>
              <span className="text-sm text-muted-foreground font-medium">
                1,500+ Projects Completed Across Kerala · Tamil Nadu · Karnataka
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm font-semibold">
            <span className="px-3.5 py-1.5 rounded-lg bg-surface dark:bg-zinc-900 border border-border text-foreground/80">
              CertainTeed USA Certified
            </span>
            <span className="px-3.5 py-1.5 rounded-lg bg-surface dark:bg-zinc-900 border border-border text-foreground/80">
              TechnoNicol Master Applicator
            </span>
            <span className="px-3.5 py-1.5 rounded-lg bg-accent/15 border border-accent/30 font-bold text-accent">
              30–50 Year Warranty
            </span>
          </div>
        </div>

        {/* 4-Column Architectural Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Column 1: Company Profile (4 cols) */}
          <div className="lg:col-span-4">
            <span className="text-2xl sm:text-3xl font-black tracking-tight block mb-1.5 text-foreground">
              IDEAL SOLUTIONS
            </span>
            <span className="text-xs sm:text-sm font-bold tracking-wider text-accent uppercase block mb-3.5">
              STRUCTURAL FABRICATION · ROOFING · PEB
            </span>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-5">
              Premier turnkey engineering contractor in South India specializing in CertainTeed Saint-Gobain architectural shingles, TechnoNicol stone-coated metal tiles, Pre-Engineered steel commercial complexes, and acoustic gypsum false ceilings.
            </p>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Headquarters: Trivandrum (695006)</span>
            </div>
          </div>

          {/* Column 2: Navigation (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-bold mb-4 text-sm sm:text-base uppercase tracking-wider text-accent">
              Platform Index
            </h4>
            <ul className="space-y-3 text-sm sm:text-base text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-accent transition-colors font-medium">
                  01. Home
                </Link>
              </li>
              <li>
                <Link href="/works" className="hover:text-accent transition-colors font-bold text-accent">
                  02. Our Works (87+ Photos)
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-accent transition-colors font-medium">
                  03. Products & Solutions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent transition-colors font-medium">
                  04. Contact & Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Core Engineering Divisions (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-bold mb-4 text-sm sm:text-base uppercase tracking-wider text-accent">
              Contracting Divisions
            </h4>
            <ul className="space-y-2.5 text-sm sm:text-base text-muted-foreground">
              <li className="hover:text-foreground transition-colors">• Luxury Villa Roofing Shingles</li>
              <li className="hover:text-foreground transition-colors">• Stone-Coated Volcanic Metal Tiles</li>
              <li className="hover:text-foreground transition-colors">• Pre-Engineered Buildings (PEB)</li>
              <li className="hover:text-foreground transition-colors">• Industrial & Villa Steel Truss Works</li>
              <li className="hover:text-foreground transition-colors">• Saint-Gobain Gypsum False Ceilings</li>
              <li className="hover:text-foreground transition-colors">• Architectural ACP Facades & Glazing</li>
              <li className="hover:text-foreground transition-colors">• 100% Water-Tight Monsoon Renovation</li>
            </ul>
          </div>

          {/* Column 4: Contact & Channels (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-bold mb-4 text-sm sm:text-base uppercase tracking-wider text-accent">
              Engineering Desk
            </h4>
            <ul className="space-y-3.5 text-sm sm:text-base text-muted-foreground">
              <li>
                <span className="text-muted-foreground text-xs sm:text-sm block font-medium">Senior Project Manager:</span>
                <span className="text-foreground font-bold text-base sm:text-lg">Sanjay · Ideal Solutions</span>
              </li>
              <li>
                <span className="text-muted-foreground text-xs sm:text-sm block font-medium">Direct Telephones:</span>
                <div className="flex flex-col gap-1 mt-0.5">
                  <a href="tel:9567242157" className="hover:text-accent font-bold text-foreground text-base sm:text-lg">
                    +91 95672 42157
                  </a>
                  <a href="tel:9074237480" className="hover:text-accent text-muted-foreground font-medium text-sm sm:text-base">
                    +91 90742 37480
                  </a>
                </div>
              </li>
              <li className="leading-relaxed text-sm sm:text-base">
                SRA-09, PTP Nagar, Thirumala-PO, Trivandrum – 695006
              </li>
              <li className="pt-1">
                <a
                  href="https://wa.me/919567242157?text=Hi%20Ideal%20Solutions,%20I%20would%20like%20to%20consult%20with%20you%20regarding%20my%20construction%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] text-white font-bold text-sm shadow-md hover:bg-[#20ba5a] transition-all active:scale-95"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  <span>Direct WhatsApp Desk</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright & Geospatial Metadata */}
        <div className="mt-12 sm:mt-16 pt-6 border-t border-border/40 text-sm text-muted-foreground flex flex-col sm:flex-row justify-between items-center gap-3 font-medium">
          <p>&copy; {new Date().getFullYear()} Ideal Solutions (Trading & Contracting). All rights reserved.</p>
          <p className="text-xs sm:text-sm text-muted-foreground">
            LAT 8.5066° N · LON 76.9856° E · Trivandrum, Kerala
          </p>
        </div>
      </div>
    </footer>
  );
}