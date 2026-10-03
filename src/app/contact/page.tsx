import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Contact } from "@/components/sections/Contact";
import { FloatingActionWidget } from "@/components/ui/FloatingActionWidget";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Contact Us & Site Inspection | Ideal Solutions Kerala",
  description: "Get in touch with Ideal Solutions for architectural roofing, PEB engineering, truss fabrication, and false ceilings across Kerala, Tamil Nadu, and Karnataka.",
  openGraph: {
    title: "Contact Ideal Solutions | Direct Contractor Consultation",
    description: "Book a site inspection with our engineering team in Trivandrum, Ernakulam, or anywhere in Kerala.",
  },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      
      {/* Fixed Background Image */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-background">
        <img src="/images/products_unique/01_renovation.jpg" className="w-full h-full object-cover opacity-[0.12]" alt="Background" />
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
                    <span className="text-accent font-bold">CONTRACTOR CONSULTATION</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tight mb-3">
                    LET&apos;S TALK ABOUT YOUR PROJECT.
                  </h1>
                  <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
                    Connect directly with our engineering team for site measurements, structural load consultations, and architectural solutions across South India.
                  </p>
                </div>

                {/* Direct Contact Badges */}
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 font-mono">
                  <a
                    href="tel:9567242157"
                    className="px-4 py-2.5 rounded-xl bg-accent text-white text-xs font-bold shadow-md hover:bg-accent/90 transition-all flex items-center gap-2"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                    <span>+91 95672 42157</span>
                  </a>
                  <a
                    href="https://wa.me/919567242157?text=Hi%20Ideal%20Solutions,%20I%20would%20like%20to%20consult%20with%20you%20regarding%20my%20roofing/construction%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-bold shadow-md hover:bg-[#20ba5a] transition-all flex items-center gap-2"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                    <span>WhatsApp Direct</span>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Full Contact & Inquiry Section */}
        <Contact />
      </main>

      <FloatingActionWidget />
      <Footer />
    </>
  );
}
