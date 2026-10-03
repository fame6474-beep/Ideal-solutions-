const fs = require('fs');
const path = require('path');

const components = {
  'layout/Navbar.tsx': `
import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="absolute top-0 w-full z-50 py-6">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight text-white">
          IDEAL SOLUTIONS
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/90">
          <Link href="#about" className="hover:text-accent transition-colors">ABOUT</Link>
          <Link href="#services" className="hover:text-accent transition-colors">SERVICES</Link>
          <Link href="#projects" className="hover:text-accent transition-colors">PROJECTS</Link>
          <Link href="#process" className="hover:text-accent transition-colors">PROCESS</Link>
          <Link href="#contact" className="hover:text-accent transition-colors">CONTACT</Link>
        </div>
        <div className="hidden md:flex items-center">
          <Link href="#contact" className="bg-accent hover:bg-accent/90 text-white px-6 py-2 rounded-sm font-medium transition-colors">
            GET A FREE QUOTE
          </Link>
        </div>
        <button className="md:hidden text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
        </button>
      </div>
    </nav>
  );
}`,
  'layout/Footer.tsx': `
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <span className="text-xl font-bold tracking-tight block mb-4">IDEAL SOLUTIONS</span>
          <p className="text-background/70 text-sm leading-relaxed">
            Premium roofing solutions engineered for durability, performance, and absolute peace of mind.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Navigation</h4>
          <ul className="space-y-2 text-sm text-background/70">
            <li><Link href="#about" className="hover:text-accent">About Us</Link></li>
            <li><Link href="#services" className="hover:text-accent">Services</Link></li>
            <li><Link href="#projects" className="hover:text-accent">Projects</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Services</h4>
          <ul className="space-y-2 text-sm text-background/70">
            <li>Roof Installation</li>
            <li>Roof Repair</li>
            <li>Commercial Roofing</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <ul className="space-y-2 text-sm text-background/70">
            <li>(555) 123-4567</li>
            <li>info@idealsolutions.example</li>
            <li>123 Premium Ave, Suite 100</li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-6 mt-16 pt-8 border-t border-background/10 text-sm text-background/50 flex flex-col md:flex-row justify-between items-center">
        <p>&copy; {new Date().getFullYear()} Ideal Solutions. All rights reserved.</p>
        <p>A Premium Architecture Brand</p>
      </div>
    </footer>
  );
}`,
  'sections/Hero.tsx': `
import Image from 'next/image';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/hero/hero.jpg" 
          alt="Premium architectural roofing" 
          fill 
          className="object-cover" 
          priority 
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="container mx-auto px-6 relative z-10 text-white mt-16">
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
          
          <div className="grid grid-cols-3 gap-8 max-w-2xl pt-8 border-t border-white/20">
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
      </div>
    </section>
  );
}`,
  'sections/Trust.tsx': `
export function Trust() {
  return (
    <section className="bg-surface border-b border-border py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="flex-1">
            <h3 className="text-foreground font-semibold tracking-wider text-sm mb-2">QUALITY MATERIALS</h3>
            <p className="text-muted-foreground text-sm">Engineered for absolute durability</p>
          </div>
          <div className="hidden md:block w-px h-12 bg-border"></div>
          <div className="flex-1">
            <h3 className="text-foreground font-semibold tracking-wider text-sm mb-2">PRECISION INSTALLATION</h3>
            <p className="text-muted-foreground text-sm">Flawless architectural execution</p>
          </div>
          <div className="hidden md:block w-px h-12 bg-border"></div>
          <div className="flex-1">
            <h3 className="text-foreground font-semibold tracking-wider text-sm mb-2">BUILT FOR THE LONG TERM</h3>
            <p className="text-muted-foreground text-sm">Decades of proven performance</p>
          </div>
        </div>
      </div>
    </section>
  );
}`,
  'sections/About.tsx': `
import Image from 'next/image';

export function About() {
  return (
    <section id="about" className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-surface">
            <Image 
              src="/images/about/about.jpg" 
              alt="Architectural craftsmanship" 
              fill 
              className="object-cover" 
            />
          </div>
          <div>
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
          </div>
        </div>
      </div>
    </section>
  );
}`,
  'sections/Services.tsx': `
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
    <section id="services" className="py-32 bg-surface">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-20 text-center">
          ROOFING, DONE PROPERLY.
        </h2>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 max-w-5xl mx-auto">
          {services.map((service, i) => (
            <div key={i} className="group flex items-start gap-6 border-b border-border pb-8 cursor-pointer hover:border-accent transition-colors">
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
          ))}
        </div>
      </div>
    </section>
  );
}`,
  'sections/Projects.tsx': `
import Image from 'next/image';

export function Projects() {
  return (
    <section id="projects" className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-20">
          SELECTED WORK
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-24 gap-x-8">
          <div className="md:col-span-8">
            <div className="relative aspect-[4/3] mb-6 bg-surface overflow-hidden">
              <Image src="/images/projects/project1.jpg" alt="Residential Project" fill className="object-cover" />
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-3xl font-bold text-foreground mb-2">Modern Residence</h3>
                <p className="text-muted-foreground">Architectural Roof Installation</p>
              </div>
              <span className="text-sm font-semibold tracking-widest text-accent uppercase">Residential</span>
            </div>
          </div>
          
          <div className="md:col-span-6 md:col-start-7">
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
          </div>
        </div>
      </div>
    </section>
  );
}`,
  'sections/WhyUs.tsx': `
export function WhyUs() {
  const principles = [
    { title: "PRECISION", desc: "Every angle, every seam, engineered with absolute exactness." },
    { title: "QUALITY", desc: "We source only premium, industry-leading materials." },
    { title: "ACCOUNTABILITY", desc: "Transparent communication and dedicated project management." },
    { title: "LONG-TERM PERFORMANCE", desc: "Built to withstand the elements for decades." }
  ];

  return (
    <section className="py-32 bg-foreground text-background">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-20">
          WHY IDEAL SOLUTIONS
        </h2>
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-20">
          {principles.map((p, i) => (
            <div key={i} className="border-t border-background/20 pt-8">
              <span className="text-accent font-mono text-sm block mb-6">0{i + 1}</span>
              <h3 className="text-3xl font-bold mb-4">{p.title}</h3>
              <p className="text-background/70 text-lg leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`,
  'sections/Process.tsx': `
export function Process() {
  const stages = [
    "CONSULTATION",
    "INSPECTION",
    "RECOMMENDATION",
    "INSTALLATION & COMPLETION"
  ];

  return (
    <section id="process" className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-20 max-w-4xl leading-tight">
          FROM FIRST INSPECTION<br/>TO FINAL DETAIL.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {stages.map((stage, i) => (
            <div key={i} className="relative">
              <div className="text-accent font-mono text-sm mb-4">0{i + 1}</div>
              <div className="h-px bg-border w-full mb-8 relative">
                <div className="absolute left-0 top-0 h-full w-4 bg-accent"></div>
              </div>
              <h3 className="text-xl font-bold text-foreground">{stage}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`,
  'sections/Testimonials.tsx': `
export function Testimonials() {
  return (
    <section className="py-32 bg-surface border-y border-border">
      <div className="container mx-auto px-6 text-center max-w-4xl">
        <span className="text-accent font-semibold tracking-widest text-sm mb-12 block">
          CLIENT PARTNERSHIPS
        </span>
        <blockquote className="text-3xl md:text-4xl lg:text-5xl font-medium text-foreground leading-tight mb-12 text-balance">
          "Client testimonial will appear here. The structure is prepared to elegantly showcase genuine feedback."
        </blockquote>
        <div className="text-muted-foreground font-medium tracking-wide">
          — CLIENT NAME PLACEHOLDER
        </div>
      </div>
    </section>
  );
}`,
  'sections/FinalCTA.tsx': `
import Image from 'next/image';
import Link from 'next/link';

export function FinalCTA() {
  return (
    <section className="relative py-40 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-surface">
        <Image 
          src="/images/cta/cta.jpg" 
          alt="Premium Architecture" 
          fill 
          className="object-cover" 
        />
        <div className="absolute inset-0 bg-foreground/90 mix-blend-multiply" />
      </div>
      <div className="container mx-auto px-6 relative z-10 text-center">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-background tracking-tight mb-12 leading-tight">
          YOUR NEXT ROOF<br />STARTS WITH A CONVERSATION.
        </h2>
        <Link href="#contact" className="bg-accent hover:bg-accent/90 text-white px-10 py-5 font-bold tracking-wide transition-colors inline-block">
          GET A FREE QUOTE
        </Link>
      </div>
    </section>
  );
}`,
  'sections/Contact.tsx': `
export function Contact() {
  return (
    <section id="contact" className="py-32 bg-background">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-8">
              LET'S TALK ABOUT YOUR ROOF.
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              Reach out to our architectural roofing experts to discuss your property's needs.
            </p>
            
            <div className="space-y-8 text-foreground">
              <div>
                <span className="block text-sm tracking-widest text-muted-foreground font-semibold mb-2 uppercase">Email</span>
                <a href="#" className="text-xl font-medium hover:text-accent transition-colors">inquiries@idealsolutions.example</a>
              </div>
              <div>
                <span className="block text-sm tracking-widest text-muted-foreground font-semibold mb-2 uppercase">Phone</span>
                <a href="#" className="text-xl font-medium hover:text-accent transition-colors">(555) 123-4567</a>
              </div>
            </div>
          </div>
          
          <div className="bg-surface p-8 md:p-12 border border-border">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">Name</label>
                  <input type="text" className="w-full bg-background border border-border px-4 py-3 focus:outline-none focus:border-accent text-foreground" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">Phone</label>
                  <input type="tel" className="w-full bg-background border border-border px-4 py-3 focus:outline-none focus:border-accent text-foreground" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">Email</label>
                  <input type="email" className="w-full bg-background border border-border px-4 py-3 focus:outline-none focus:border-accent text-foreground" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">Project Type</label>
                  <select className="w-full bg-background border border-border px-4 py-3 focus:outline-none focus:border-accent text-foreground appearance-none">
                    <option>Residential</option>
                    <option>Commercial</option>
                    <option>Industrial</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">Location</label>
                <input type="text" className="w-full bg-background border border-border px-4 py-3 focus:outline-none focus:border-accent text-foreground" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">Message</label>
                <textarea rows={4} className="w-full bg-background border border-border px-4 py-3 focus:outline-none focus:border-accent text-foreground"></textarea>
              </div>
              <button className="w-full bg-foreground text-background hover:bg-accent hover:text-white px-8 py-4 font-bold tracking-wide transition-colors mt-4">
                REQUEST A FREE QUOTE
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}`
};

for (const [filepath, content] of Object.entries(components)) {
  fs.writeFileSync(path.join(__dirname, 'src', 'components', filepath), content.trim());
}
console.log('Successfully generated all components.');
