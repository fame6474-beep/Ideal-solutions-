import { Reveal } from '@/components/motion/Reveal';

export function Process() {
  const stages = [
    "CONSULTATION",
    "INSPECTION",
    "RECOMMENDATION",
    "INSTALLATION & COMPLETION"
  ];

  return (
    <section id="process" className="py-16 sm:py-24 md:py-32 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="text-center md:text-left mb-8 sm:mb-16">
            <span className="text-accent font-semibold tracking-widest text-xs sm:text-sm mb-2 block uppercase">
              WORKFLOW & EXECUTION
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight max-w-4xl leading-tight">
              FROM FIRST INSPECTION<br className="hidden sm:inline"/> TO FINAL DETAIL.
            </h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stages.map((stage, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="bg-surface/50 dark:bg-surface/40 backdrop-blur-md border border-border/40 p-5 sm:p-6 rounded-2xl shadow-xl h-full flex flex-col justify-between">
                <div>
                  <div className="text-accent font-mono text-xs sm:text-sm font-semibold mb-3 sm:mb-4">0{i + 1}</div>
                  <div className="h-0.5 bg-border w-full mb-4 sm:mb-6 relative overflow-hidden rounded-full">
                    <div className="absolute left-0 top-0 h-full w-8 bg-accent"></div>
                  </div>
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground">{stage}</h3>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
