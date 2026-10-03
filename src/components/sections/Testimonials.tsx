import { Reveal } from '@/components/motion/Reveal';

export function Testimonials() {
  return (
    <section id="testimonials" className="py-16 sm:py-24 md:py-32 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <Reveal>
          <div className="bg-surface/50 dark:bg-surface/40 backdrop-blur-md border border-border/40 p-6 sm:p-10 md:p-16 rounded-2xl sm:rounded-3xl shadow-xl text-center">
            <span className="text-accent font-semibold tracking-widest text-xs sm:text-sm mb-4 sm:mb-8 block uppercase">
              CLIENT PARTNERSHIPS
            </span>
            <blockquote className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-medium text-foreground leading-relaxed mb-6 sm:mb-8 text-balance">
              &quot;Client testimonial will appear here. The structure is prepared to elegantly showcase genuine feedback.&quot;
            </blockquote>
            <div className="text-muted-foreground font-medium text-xs sm:text-sm tracking-wide">
              — CLIENT NAME PLACEHOLDER
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
