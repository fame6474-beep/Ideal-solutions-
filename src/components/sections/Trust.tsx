export function Trust() {
  return (
    <section id="trust" className="py-8 sm:py-12 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="bg-surface/50 dark:bg-surface/40 backdrop-blur-md border border-border/40 rounded-2xl p-5 sm:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 text-center md:text-left">
            <div className="flex-1 w-full border-b border-border/40 pb-5 md:border-b-0 md:pb-0">
              <h3 className="text-foreground font-semibold tracking-wider text-xs sm:text-sm mb-1 sm:mb-2">QUALITY MATERIALS</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">Engineered for absolute durability</p>
            </div>
            <div className="hidden md:block w-px h-12 bg-border/60"></div>
            <div className="flex-1 w-full border-b border-border/40 pb-5 md:border-b-0 md:pb-0">
              <h3 className="text-foreground font-semibold tracking-wider text-xs sm:text-sm mb-1 sm:mb-2">PRECISION INSTALLATION</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">Flawless architectural execution</p>
            </div>
            <div className="hidden md:block w-px h-12 bg-border/60"></div>
            <div className="flex-1 w-full">
              <h3 className="text-foreground font-semibold tracking-wider text-xs sm:text-sm mb-1 sm:mb-2">BUILT FOR THE LONG TERM</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">Decades of proven performance</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
