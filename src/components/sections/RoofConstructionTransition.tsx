"use client";
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
export interface RoofStage {
  id: number;
  stageNumber: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  badge: string;
  badgeColor: string;
}

export const ROOF_STAGES: RoofStage[] = [
  {
    id: 0,
    stageNumber: 'STAGE 01',
    title: 'Unfinished Structural Framework',
    subtitle: 'Heavy Tubular Steel Rafters and Purlin Truss',
    description: 'Anti-corrosion primed steel portal frame and tubular truss skeleton erected with high-precision engineering.',
    image: '/images/roof_transition/stage1_unfinished.jpg',
    badge: 'Bare Structure',
    badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
  },
  {
    id: 1,
    stageNumber: 'STAGE 02',
    title: 'Substrate and Waterproof Decking',
    subtitle: 'High-Strength Cement Board and Underlayment',
    description: 'Rigid cement fibre board decking fastened over steel purlins, topped with self-adhesive water-tight membrane underlayment.',
    image: '/images/roof_transition/stage2_underlayment.jpg',
    badge: 'Decking and Membrane',
    badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
  },
  {
    id: 2,
    stageNumber: 'STAGE 03',
    title: 'Precision Shingle Installation',
    subtitle: 'CertainTeed Architectural Shingle Layering',
    description: 'Progressive bottom-up installation of interlocking multi-layer shingles with chalk alignment and hurricane-proof fastening.',
    image: '/images/roof_transition/stage3_installing.jpg',
    badge: 'In Progress',
    badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/40',
  },
  {
    id: 3,
    stageNumber: 'STAGE 04',
    title: '100 Percent Finished Architectural Roof',
    subtitle: 'Flawless Luxury Kerala Residence',
    description: 'Monolithic leak-proof CertainTeed Landmark shingles with copper flashing, ridge ventilation, and 50-year warranty.',
    image: "/images/roof_transition/stage4_finished.jpg",
    badge: 'Finished Roof',
    badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
  },
];

export interface RoofConstructionTransitionProps {
  className?: string;
  showOverlayControls?: boolean;
  autoPlayIntervalMs?: number;
}

export function RoofConstructionTransition({
  className = '',
  showOverlayControls = true,
  autoPlayIntervalMs = 3800,
}: RoofConstructionTransitionProps) {
  const [activeStage, setActiveStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % ROOF_STAGES.length);
    }, autoPlayIntervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, autoPlayIntervalMs]);

  const handleStageSelect = (idx: number) => {
    setActiveStage(idx);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 7000);
  };

  const currentStageData = ROOF_STAGES[activeStage];

  return (
    <div className={'relative w-full h-full overflow-hidden ' + className}>
      {ROOF_STAGES.map((stage, idx) => {
        const isActive = idx === activeStage;
        return (
          <div
            key={stage.id}
            className={'absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ' + (isActive ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0 pointer-events-none')}
            style={{
              transitionProperty: 'opacity, transform',
              transitionDuration: '1000ms',
            }}
          >
            <Image
              src={stage.image}
              alt={stage.title}
              fill
              priority={idx === 0 || idx === 3}
              sizes='100vw'
              className='object-cover object-center brightness-105 contrast-105'
              unoptimized
            />
          </div>
        );
      })}

      <div className='absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/40 dark:from-black/85 dark:via-black/65 dark:to-black/35 pointer-events-none z-10' />


      {showOverlayControls && (
        <div className='absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 max-w-sm sm:max-w-md bg-surface/90 dark:bg-zinc-950/90 backdrop-blur-xl border border-border/80 rounded-2xl p3 sm:p-4 shadow-2xl transition-all'>
          <div className='flex items-center justify-between gap-2 mb-2.5'>
            <div className='flex items-center gap-2'>
              <span className={'text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ' + currentStageData.badgeColor}>
                {currentStageData.stageNumber} -  {currentStageData.badge}
              </span>
              <span className='w-2 h-2 rounded-full bg-accent animate-ping' />
            </div>


            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-[11px] font-mono text-muted-foreground hover:text-foreground px-2 py-0.5 rounded bg-surface border border-border/60 transition-colors"
              title={isPlaying ? "Pause autoplay" : "Resume autoplay"}
            >
              {isPlaying ? 'Pause' : 'Play'}
            </button>
          </div>

          <h4 className='text-xs sm:text-sm font-bold text-foreground truncate leading-tight'>
            {currentStageData.title}
          </h4>
          <p className='text-[11px] text-muted-foreground truncate mt-0.5'>
            {currentStageData.subtitle}
          </p>


          <div className='grid grid-cols-4 gap-1.5 mt-3 pt-2.5 border-t border-border/60'>
            {ROOF_STAGES.map((stg, idx) => {
              const isSelected = idx === activeStage;
              return (
                <button
                  key={stg.id}
                  type='button'
                  onClick={() => handleStageSelect(idx)}
                  className={'py-1.5 px-1 rounded-lg text-[10px] font-bold tracking-tight text-center transition-all ' + (isSelected ? 'bg-accent text-white shadow-md scale-105' : 'bg-surface/70 text-muted-foreground hover:text-foreground hover:bg-surface border border-border/50')}
                >
                  <span className='block font-mono text-[9px] opacity-80'>0{idx + 1}</span>
                  <span className='truncate block'>{stg.badge.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
