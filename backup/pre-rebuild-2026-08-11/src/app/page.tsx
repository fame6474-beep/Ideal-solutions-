import { Navbar } from "@/components/navbar/Navbar";
import { Hero } from "@/components/hero/Hero";
import { RoofConstruction } from "@/components/construction/RoofConstruction";
import { TrustBar } from "@/components/trust-bar/TrustBar";
import { About } from "@/components/about/About";
import { Services } from "@/components/services/Services";
import { Projects } from "@/components/projects/Projects";
import { WhyUs } from "@/components/why-us/WhyUs";
import { Process } from "@/components/process/Process";
import { FinalCTA } from "@/components/final-cta/FinalCTA";
import { Contact } from "@/components/contact/Contact";
import { Footer } from "@/components/footer/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <RoofConstruction />
        <TrustBar />
        <About />
        <Services />
        <Projects />
        <WhyUs />
        <Process />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-charcoal border-t border-white/10 flex gap-2 z-50 pb-safe">
        <a href="tel:#" className="flex-1 bg-white/10 text-white py-3 text-center rounded-sm text-sm font-medium">CALL</a>
        <a href="#contact" className="flex-[2] bg-copper text-white py-3 text-center rounded-sm text-sm font-medium">FREE QUOTE</a>
      </div>
    </>
  );
}
