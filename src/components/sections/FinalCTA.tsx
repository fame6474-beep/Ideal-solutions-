import Link from 'next/link';
import Image from 'next/image';
import { Reveal } from '@/components/motion/Reveal';

export function FinalCTA() {
  return (
    <section className="relative py-16 sm:py-24 md:py-32 bg-transparent overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center max-w-5xl">
        <Reveal>
          <div className="relative rounded-3xl overflow-hidden border border-border/80 shadow-2xl p-8 sm:p-14 md:p-20 bg-zinc-950">
            {/* Background Image */}
            <Image
              src="/images/web/cta_background.jpg"
              alt="Ideal Solutions Architectural Landmark"
              fill
              sizes="100vw"
              className="object-cover object-center opacity-30 scale-105"
              unoptimized
            />
            
            {/* Ambient Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />

            <div className="relative z-10">
              <span className="text-accent font-semibold tracking-widest text-xs sm:text-sm mb-3 sm:mb-4 block uppercase font-mono">
                ENGINEERING EXCELLENCE IN EVERY DETAIL
              </span>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4 sm:mb-6 leading-tight">
                YOUR NEXT PROJECT STARTS<br className="hidden sm:inline"/> WITH A CONVERSATION.
              </h2>
              
              <p className="text-zinc-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
                Transform your residential villa, commercial PEB complex, or interior space with authorized brand warranties and Kerala&apos;s most trusted contracting team.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-white px-8 py-4 font-bold text-xs uppercase tracking-wider transition-all rounded-xl shadow-xl hover:shadow-accent/25 active:scale-95 text-center"
                >
                  SCHEDULE SITE INSPECTION
                </Link>
                
                <a
                  href="https://wa.me/919567242157?text=Hi%20Ideal%20Solutions,%20I%20would%20like%20to%20consult%20with%20you%20regarding%20a%20construction%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto py-4 px-6 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
