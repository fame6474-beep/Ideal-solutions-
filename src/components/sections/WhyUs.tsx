import { Reveal } from '@/components/motion/Reveal';

export function WhyUs() {
  const principles = [
    { title: "PRECISION", desc: "Every angle, every seam, engineered with absolute exactness." },
    { title: "QUALITY", desc: "We source only premium, industry-leading materials." },
    { title: "ACCOUNTABILITY", desc: "Transparent communication and dedicated project management." },
    { title: "LONG-TERM PERFORMANCE", desc: "Built to withstand the elements for decades." }
  ];

  return (
    <section id="why-us" className="py-16 sm:py-24 md:py-32 bg-transparent text-foreground">
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="text-center md:text-left mb-8 sm:mb-16">
            <span className="text-accent font-semibold tracking-widest text-xs sm:text-sm mb-2 block uppercase">
              OUR COMMITMENT
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
              WHY CHOOSE US.
            </h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
          {principles.map((p, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="bg-surface/50 dark:bg-surface/40 backdrop-blur-md border border-border/40 p-6 sm:p-8 rounded-2xl shadow-xl h-full">
                <span className="text-accent font-mono text-xs sm:text-sm font-semibold block mb-3 sm:mb-5">0{i + 1}</span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4 text-foreground">{p.title}</h3>
                <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
