import Image from 'next/image';
import { Reveal } from '@/components/motion/Reveal';

export function About() {
  return (
    <section id="about" className="py-20 md:py-32 bg-transparent">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <Reveal className="relative aspect-[3/4] w-full overflow-hidden bg-surface/50 dark:bg-surface/40 backdrop-blur-md rounded-2xl border border-border/40 shadow-xl">
            <Image 
              src="/images/web/about_craftsmanship.jpg" 
              alt="Ideal Solutions Architectural Craftsmanship and Engineering" 
              fill 
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover" 
              unoptimized
            />
          </Reveal>
          <Reveal delay={0.2}>
            <div className="bg-surface/50 dark:bg-surface/40 backdrop-blur-md border border-border/40 p-8 md:p-12 rounded-2xl shadow-xl">
              <span className="text-accent font-semibold tracking-widest text-sm mb-6 block uppercase">
                ESTABLISHED 2007
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight leading-tight mb-8">
                A trusted integrated contracting company in Trivandrum.
              </h2>
              <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  Commencing operations in 2007, Ideal Solutions was founded to cater to the growing demands of the construction industry by introducing high-quality national and international brands. 
                </p>
                <p>
                  With 18 years of experience, we have evolved from structural fabrication and roofing into a comprehensive provider of Pre-Engineered Buildings, architectural roofing systems, and heavy structural engineering, supported by a strong distribution network across Kerala, Tamil Nadu, and Karnataka.
                </p>
                <p>
                  We collaborate with leading suppliers and manufacturers including TATA, SAIL, Saint-Gobain, and TechnoNicol to deliver precise design and strict quality control on every project.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
