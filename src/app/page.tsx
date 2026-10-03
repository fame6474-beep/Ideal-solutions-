"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ProductsCarousel } from "@/components/sections/ProductsCarousel";
import { Services } from "@/components/sections/Services";
import { FloatingActionWidget } from "@/components/ui/FloatingActionWidget";

export default function Home() {
  const [activePillar, setActivePillar] = useState<string | number>("peb");

  return (
    <>
      <Navbar />
      
      <main className="relative z-10 bg-background text-foreground">
        <Hero
          activePillar={activePillar}
          onPillarChange={(key) => setActivePillar(key)}
        />
        <ProductsCarousel />
        <Services />
      </main>
      
      {/* Floating Direct WhatsApp & Phone Widget */}
      <FloatingActionWidget />
      
      <Footer />
    </>
  );
}

