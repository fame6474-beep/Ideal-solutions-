const fs = require('fs');
const path = require('path');

const files = {
  'src/components/sections/WhyUs.tsx': `
import { Reveal } from '@/components/motion/Reveal';

export function WhyUs() {
  const principles = [
    { title: "PRECISION", desc: "Every angle, every seam, engineered with absolute exactness." },
    { title: "QUALITY", desc: "We source only premium, industry-leading materials." },
    { title: "ACCOUNTABILITY", desc: "Transparent communication and dedicated project management." },
    { title: "LONG-TERM PERFORMANCE", desc: "Built to withstand the elements for decades." }
  ];

  return (
    <section className="py-20 md:py-32 bg-foreground text-background">
      <div className="container mx-auto px-6">
        <Reveal>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-20">
            WHY IDEAL SOLUTIONS
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-12 md:gap-y-20">
          {principles.map((p, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="border-t border-background/20 pt-8">
                <span className="text-accent font-mono text-sm block mb-6">0{i + 1}</span>
                <h3 className="text-3xl font-bold mb-4">{p.title}</h3>
                <p className="text-background/70 text-lg leading-relaxed">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
`,
  'src/components/sections/Process.tsx': `
import { Reveal } from '@/components/motion/Reveal';

export function Process() {
  const stages = [
    "CONSULTATION",
    "INSPECTION",
    "RECOMMENDATION",
    "INSTALLATION & COMPLETION"
  ];

  return (
    <section id="process" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <Reveal>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-20 max-w-4xl leading-tight">
            FROM FIRST INSPECTION<br/>TO FINAL DETAIL.
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {stages.map((stage, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="relative">
                <div className="text-accent font-mono text-sm mb-4">0{i + 1}</div>
                <div className="h-px bg-border w-full mb-8 relative">
                  <div className="absolute left-0 top-0 h-full w-4 bg-accent"></div>
                </div>
                <h3 className="text-xl font-bold text-foreground">{stage}</h3>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
`,
  'src/components/sections/Testimonials.tsx': `
import { Reveal } from '@/components/motion/Reveal';

export function Testimonials() {
  return (
    <section className="py-20 md:py-32 bg-surface border-y border-border">
      <div className="container mx-auto px-6 text-center max-w-4xl">
        <Reveal>
          <span className="text-accent font-semibold tracking-widest text-sm mb-12 block">
            CLIENT PARTNERSHIPS
          </span>
          <blockquote className="text-3xl md:text-4xl lg:text-5xl font-medium text-foreground leading-tight mb-12 text-balance">
            "Client testimonial will appear here. The structure is prepared to elegantly showcase genuine feedback."
          </blockquote>
          <div className="text-muted-foreground font-medium tracking-wide">
            — CLIENT NAME PLACEHOLDER
          </div>
        </Reveal>
      </div>
    </section>
  );
}
`,
  'src/components/sections/Contact.tsx': `
"use client";
import { Reveal } from '@/components/motion/Reveal';

export function Contact() {
  return (
    <section id="contact" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-20">
          <Reveal>
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
          </Reveal>
          
          <Reveal delay={0.2}>
            <div className="bg-surface p-8 md:p-12 border border-border">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">Name</label>
                    <input type="text" className="w-full bg-transparent border-0 border-b-2 border-border px-2 py-4 focus:outline-none focus:border-accent focus:ring-0 text-foreground transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">Phone</label>
                    <input type="tel" className="w-full bg-transparent border-0 border-b-2 border-border px-2 py-4 focus:outline-none focus:border-accent focus:ring-0 text-foreground transition-colors" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">Email</label>
                    <input type="email" className="w-full bg-transparent border-0 border-b-2 border-border px-2 py-4 focus:outline-none focus:border-accent focus:ring-0 text-foreground transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">Project Type</label>
                    <select className="w-full bg-transparent border-0 border-b-2 border-border px-2 py-4 focus:outline-none focus:border-accent focus:ring-0 text-foreground appearance-none transition-colors">
                      <option>Residential</option>
                      <option>Commercial</option>
                      <option>Industrial</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">Location</label>
                  <input type="text" className="w-full bg-transparent border-0 border-b-2 border-border px-2 py-4 focus:outline-none focus:border-accent focus:ring-0 text-foreground transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">Message</label>
                  <textarea rows={4} className="w-full bg-transparent border-0 border-b-2 border-border px-2 py-4 focus:outline-none focus:border-accent focus:ring-0 text-foreground transition-colors"></textarea>
                </div>
                <button className="w-full bg-foreground text-background hover:bg-accent hover:text-white px-8 py-4 font-bold tracking-wide transition-colors mt-4">
                  REQUEST A FREE QUOTE
                </button>
              </form>
            </div>
          </Reveal>
        </div>
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
console.log('Successfully applied motion to remaining components.');
