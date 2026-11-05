'use client';

import { Sparkles, Flame, Image as ImageIcon } from 'lucide-react';
import { DiyaAnimation } from './DiyaAnimation';
import { GoldenParticles, Lantern, Rangoli } from './FestiveDecor';

const DIYA_CRESCENT = [
  { size: 42, delay: 0.8 },
  { size: 54, delay: 0.95 },
  { size: 68, delay: 1.1 },
  { size: 88, delay: 0.7 }, // Grand Center Diya
  { size: 68, delay: 1.1 },
  { size: 54, delay: 0.95 },
  { size: 42, delay: 0.8 },
];

interface DiwaliHeroProps {
  onCelebrate: () => void;
}

export function DiwaliHero({ onCelebrate }: DiwaliHeroProps) {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col items-center justify-between overflow-hidden bg-gradient-to-b from-diwali-night via-diwali-plum-950 to-diwali-midnight px-3.5 xs:px-5 sm:px-8 pt-20 xs:pt-24 sm:pt-32 pb-6 sm:pb-12 scroll-mt-24"
    >
      {/* 1. Ambient Lighting Rays & Glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(245,201,106,0.22),transparent_60%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-20 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-diwali-rose/15 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 h-[350px] w-[800px] -translate-x-1/2 rounded-full bg-diwali-gold-500/15 blur-[120px]"
      />

      {/* Floating Golden Embers & Star Dust */}
      <GoldenParticles />

      {/* 2. Hanging Decorative Festive Lanterns (Staggered depths) */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-3 top-0 hidden sm:left-6 sm:block lg:left-14"
      >
        <Lantern size={60} delay={0} variant="gold" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute left-14 top-0 hidden md:left-24 md:block lg:left-36"
      >
        <Lantern size={44} delay={1.4} variant="rose" />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute right-14 top-0 hidden md:right-24 md:block lg:right-36"
      >
        <Lantern size={44} delay={0.9} variant="saffron" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute right-3 top-0 hidden sm:right-6 sm:block lg:right-14"
      >
        <Lantern size={60} delay={1.8} variant="gold" />
      </div>

      {/* 3. Central Hero Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        {/* Sanskrit Auspicious Invocation */}
        <div className="anim-fade-up inline-flex items-center gap-2 rounded-full border border-diwali-gold-400/40 bg-diwali-gold-400/10 px-4 py-1.5 backdrop-blur-md shadow-[0_0_20px_rgba(245,201,106,0.25)] max-w-full">
          <Sparkles className="h-3.5 w-3.5 text-diwali-gold-300 animate-pulse shrink-0" />
          <span className="font-semibold tracking-[0.16em] sm:tracking-[0.25em] text-diwali-gold-200 text-[11px] sm:text-xs uppercase truncate">
            ॥ शुभ दीपावली ॥ • FESTIVAL OF LIGHTS
          </span>
          <Sparkles className="h-3.5 w-3.5 text-diwali-gold-300 animate-pulse shrink-0" />
        </div>

        {/* Grand Headline with Shimmering Gold Elegance */}
        <h1 className="mt-5 sm:mt-8 font-display text-5xl xs:text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.08] text-center">
          <span className="block bg-gradient-to-r from-[#fff9e6] via-[#ffe08a] to-[#f5c96a] bg-clip-text text-transparent">
            Happy Diwali
          </span>
          <span className="gold-shimmer-text block mt-1">
            2026
          </span>
        </h1>

        {/* Sub-headline description */}
        <p
          className="anim-fade-up mt-4 sm:mt-6 max-w-xl text-sm xs:text-base sm:text-lg leading-relaxed text-white/85 font-light px-3"
          style={{ animationDelay: '0.6s' }}
        >
          May the divine glow of a thousand diyas fill your home with warmth, your heart with peace, and your year with boundless prosperity.
        </p>

        {/* Dual Call-to-Action Buttons */}
        <div
          className="anim-fade-up mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-xs sm:max-w-md px-2"
          style={{ animationDelay: '0.8s' }}
        >
          {/* Primary CTA: Celebrate with Fireworks */}
          <button
            type="button"
            onClick={onCelebrate}
            className="group relative w-full sm:flex-1 inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full border border-diwali-gold-300/40 bg-gradient-to-r from-diwali-gold-400 via-diwali-saffron to-diwali-gold-500 py-3 sm:py-3.5 px-6 sm:px-8 text-sm sm:text-base font-bold text-diwali-night shadow-[0_0_35px_-5px_rgba(245,201,106,0.7)] backdrop-blur-xl transition duration-300 hover:scale-[1.03] hover:shadow-[0_0_55px_rgba(245,201,106,0.9)] active:scale-[0.98]"
          >
            <span
              aria-hidden
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-1000 group-hover:translate-x-full"
            />
            <Flame className="h-4 w-4 sm:h-5 sm:w-5 text-diwali-night fill-current animate-bounce shrink-0" />
            <span>Celebrate Diwali 🪔</span>
          </button>

          {/* Secondary CTA: Create Greeting Card */}
          <a
            href="#card-creator"
            className="glass-button w-full sm:w-auto !py-3 sm:!py-3.5 !px-6 text-sm sm:text-base font-semibold border-white/20 hover:border-diwali-gold-400/60 hover:text-diwali-gold-300 transition justify-center"
          >
            <ImageIcon className="h-4 w-4 text-diwali-gold-300 shrink-0" />
            <span>Create Card</span>
          </a>
        </div>

        {/* Feature Highlights Pills */}
        <div
          className="anim-fade-up mt-5 sm:mt-7 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[11px] sm:text-xs text-white/70 px-2"
          style={{ animationDelay: '1s' }}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-diwali-gold-400 animate-pulse" />
            Interactive Fireworks
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-diwali-gold-400 animate-pulse" />
            Festive Sitar & Flute
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-diwali-gold-400 animate-pulse" />
            Card Creator HD
          </span>
        </div>
      </div>

      {/* 4. Altar of Lights: Radiant Rangoli Mandala & Crescent Diyas */}
      <div className="relative mt-8 sm:mt-12 w-full flex flex-col items-center justify-center pb-2 sm:pb-6">
        {/* Layer 1: Radiant Rangoli Mandala Backdrop (Softly Glowing & Unclipped) */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-20 sm:-bottom-28 opacity-50 filter drop-shadow-[0_0_40px_rgba(255,140,40,0.6)]"
        >
          <div className="scale-[0.62] xs:scale-[0.78] sm:scale-100 origin-center">
            <Rangoli size={480} />
          </div>
        </div>

        {/* Layer 2: Tiered Crescent Diyas with Organic Golden Halos */}
        <div className="relative z-10 flex items-end justify-center gap-2 xs:gap-3.5 sm:gap-6 lg:gap-8 scale-[0.78] xs:scale-[0.9] sm:scale-100 origin-bottom">
          {DIYA_CRESCENT.map((diya, i) => {
            const isOuter = i === 0 || i === DIYA_CRESCENT.length - 1;
            return (
              <div key={i} className={isOuter ? 'hidden xs:block' : 'block'}>
                <DiyaAnimation size={diya.size} delay={diya.delay} />
              </div>
            );
          })}
        </div>

        {/* Layer 3: Altar Golden Reflection Base */}
        <div
          aria-hidden
          className="relative z-10 -mt-1.5 h-2.5 sm:h-3 w-4/5 max-w-xl rounded-full bg-gradient-to-r from-transparent via-diwali-gold-400/50 to-transparent blur-[2px]"
        />
        <div
          aria-hidden
          className="relative z-10 -mt-2 h-6 sm:h-8 w-3/4 max-w-md rounded-full bg-gradient-to-r from-transparent via-diwali-saffron/25 to-transparent blur-lg"
        />
      </div>
    </section>
  );
}
