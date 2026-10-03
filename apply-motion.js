const fs = require('fs');
const path = require('path');

const files = {
  'src/components/sections/Hero.tsx': `
import Link from 'next/link';
import { ParallaxImage } from '@/components/motion/ParallaxImage';
import { Reveal } from '@/components/motion/Reveal';

export function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ParallaxImage 
          src="/images/hero/hero.jpg" 
          alt="Premium architectural roofing" 
          priority 
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="container mx-auto px-6 relative z-10 text-white mt-16">
        <Reveal yOffset={40}>
          <div className="max-w-4xl">
            <span className="text-accent font-semibold tracking-widest text-sm mb-6 block">
              IDEAL SOLUTIONS
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-8">
              BUILT TO PROTECT<br />WHAT MATTERS.
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl text-balance leading-relaxed mb-10">
              Premium roofing solutions engineered for durability, performance, and peace of mind.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Link href="#contact" className="bg-accent hover:bg-accent/90 text-white px-8 py-4 font-medium transition-colors text-center">
                GET A FREE QUOTE
              </Link>
              <Link href="#services" className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 font-medium transition-colors backdrop-blur-sm text-center">
                EXPLORE SERVICES
              </Link>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 max-w-2xl pt-8 border-t border-white/20">
              <div>
                <p className="text-sm tracking-widest font-medium text-white/80">RESIDENTIAL</p>
              </div>
              <div>
                <p className="text-sm tracking-widest font-medium text-white/80">COMMERCIAL</p>
              </div>
              <div>
                <p className="text-sm tracking-widest font-medium text-white/80">INDUSTRIAL</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
`,
  'src/components/sections/About.tsx': `
import Image from 'next/image';
import { Reveal } from '@/components/motion/Reveal';

export function About() {
  return (
    <section id="about" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <Reveal className="relative aspect-[3/4] w-full overflow-hidden bg-surface">
            <Image 
              src="/images/about/about.jpg" 
              alt="Architectural craftsmanship" 
              fill 
              className="object-cover" 
            />
          </Reveal>
          <Reveal delay={0.2}>
            <span className="text-accent font-semibold tracking-widest text-sm mb-6 block">
              BUILT WITH INTENTION
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-tight mb-8">
              Ideal Solutions approaches roofing as a complete building system, not simply a surface above a building.
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Every project is defined by a commitment to craftsmanship, superior materials, and precision engineering.
              </p>
              <p>
                Our philosophy prioritizes long-term durability and clear communication, ensuring the most vital structural element of your property performs flawlessly for decades.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
`,
  'src/components/sections/Services.tsx': `
import { Reveal } from '@/components/motion/Reveal';

export function Services() {
  const services = [
    "ROOF INSTALLATION",
    "ROOF REPLACEMENT",
    "ROOF REPAIR",
    "WATERPROOFING",
    "ROOF MAINTENANCE",
    "COMMERCIAL & INDUSTRIAL ROOFING"
  ];

  return (
    <section id="services" className="py-20 md:py-32 bg-surface">
      <div className="container mx-auto px-6">
        <Reveal>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-20 text-center">
            ROOFING, DONE PROPERLY.
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 max-w-5xl mx-auto">
          {services.map((service, i) => (
            <Reveal key={i} delay={i * 0.1} yOffset={20}>
              <div className="group flex items-start gap-6 border-b border-border pb-8 cursor-pointer hover:border-accent transition-colors">
                <span className="text-muted-foreground font-mono text-sm pt-1">
                  0{i + 1}
                </span>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                    {service}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Precision-engineered architectural solutions designed for structural integrity and aesthetic excellence.
                  </p>
                </div>
                <div className="text-accent opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 transform duration-300">
                  →
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
`,
  'src/components/sections/Projects.tsx': `
import { Reveal } from '@/components/motion/Reveal';
import { ParallaxImage } from '@/components/motion/ParallaxImage';

export function Projects() {
  return (
    <section id="projects" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <Reveal>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-20">
            SELECTED WORK
          </h2>
        </Reveal>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-y-24 gap-x-8">
          <div className="md:col-span-8">
            <Reveal>
              <div className="relative aspect-[4/3] mb-6 bg-surface overflow-hidden">
                <ParallaxImage src="/images/projects/project1.jpg" alt="Residential Project" />
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-3xl font-bold text-foreground mb-2">Modern Residence</h3>
                  <p className="text-muted-foreground">Architectural Roof Installation</p>
                </div>
                <span className="text-sm font-semibold tracking-widest text-accent uppercase">Residential</span>
              </div>
            </Reveal>
          </div>
          
          <div className="md:col-span-6 md:col-start-7">
            <Reveal delay={0.2}>
              <div className="relative aspect-[3/4] mb-6 bg-surface overflow-hidden">
                 {/* Placeholder for project 2 */}
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Commercial Headquarters</h3>
                  <p className="text-muted-foreground">Premium Waterproofing System</p>
                </div>
                <span className="text-sm font-semibold tracking-widest text-accent uppercase">Commercial</span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
`,
  'src/components/sections/FinalCTA.tsx': `
import Link from 'next/link';
import { Reveal } from '@/components/motion/Reveal';
import { ParallaxImage } from '@/components/motion/ParallaxImage';

export function FinalCTA() {
  return (
    <section className="relative py-24 md:py-40 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-surface">
        <ParallaxImage 
          src="/images/cta/cta.jpg" 
          alt="Premium Architecture" 
        />
        <div className="absolute inset-0 bg-foreground/90 mix-blend-multiply" />
      </div>
      <div className="container mx-auto px-6 relative z-10 text-center">
        <Reveal>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-background tracking-tight mb-12 leading-tight">
            YOUR NEXT ROOF<br />STARTS WITH A CONVERSATION.
          </h2>
          <Link href="#contact" className="bg-accent hover:bg-accent/90 text-white px-10 py-5 font-bold tracking-wide transition-colors inline-block">
            GET A FREE QUOTE
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
`
};

for (const [filepath, content] of Object.entries(files)) {
  const fullPath = path.join(__dirname, filepath);
  fs.writeFileSync(fullPath, content.trim());
}
console.log('Successfully applied motion to components.');
