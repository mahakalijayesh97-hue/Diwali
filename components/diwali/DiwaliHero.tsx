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
      className="relative flex min-h-[105svh] flex-col justify-between overflow-hidden bg-gradient-to-b from-diwali-night via-diwali-plum-950 to-diwali-midnight px-5 pt-32 pb-16 sm:px-8 scroll-mt-24"
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
        <div className="anim-fade-up flex items-center gap-2.5 rounded-full border border-diwali-gold-400/35 bg-white/5 px-5 py-2 backdrop-blur-md shadow-[0_0_20px_rgba(245,201,106,0.2)]">
          <Sparkles className="h-4 w-4 text-diwali-gold-300 animate-pulse" />
          <span className="font-semibold tracking-[0.25em] text-diwali-gold-300 text-xs uppercase sm:text-sm">
            ॥ शुभ दीपावली ॥ • FESTIVAL OF LIGHTS
          </span>
          <Sparkles className="h-4 w-4 text-diwali-gold-300 animate-pulse" />
        </div>

        {/* Grand Headline with Shimmering Gold Elegance */}
        <h1 className="mt-8 font-display text-6xl font-bold tracking-tight leading-[1.05] sm:text-7xl lg:text-8xl">
          <span className="anim-fade-up block bg-gradient-to-r from-[#fff9e6] via-[#ffe08a] to-[#f5c96a] bg-clip-text text-transparent drop-shadow-[0_4px_35px_rgba(245,201,106,0.45)]">
            Happy Diwali
          </span>
          <span
            className="anim-scale-in gold-shimmer-text block mt-1 drop-shadow-[0_0_35px_rgba(245,201,106,0.5)]"
            style={{ animationDelay: '0.35s' }}
          >
            2026
          </span>
        </h1>

        {/* Sub-headline description */}
        <p
          className="anim-fade-up mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg lg:text-xl font-light"
          style={{ animationDelay: '0.6s' }}
        >
          May the divine glow of a thousand diyas fill your home with warmth, your heart with peace, and your year with boundless prosperity.
        </p>

        {/* Dual Call-to-Action Buttons */}
        <div
          className="anim-fade-up mt-9 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md"
          style={{ animationDelay: '0.8s' }}
        >
          {/* Primary CTA: Celebrate with Fireworks */}
          <button
            type="button"
            onClick={onCelebrate}
            className="group relative flex-1 w-full sm:w-auto inline-flex items-center justify-center gap-3 overflow-hidden rounded-full border border-diwali-gold-300/40 bg-gradient-to-r from-diwali-gold-400 via-diwali-saffron to-diwali-gold-500 px-8 py-4 text-base font-bold text-diwali-night shadow-[0_0_40px_-5px_rgba(245,201,106,0.7)] backdrop-blur-xl transition duration-500 hover:scale-[1.04] hover:shadow-[0_0_60px_rgba(245,201,106,0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-diwali-gold-300 active:scale-[0.98]"
          >
            <span
              aria-hidden
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-1000 group-hover:translate-x-full"
            />
            <Flame className="h-5 w-5 text-diwali-night fill-current animate-bounce" />
            <span className="relative">Celebrate Diwali 🪔</span>
          </button>

          {/* Secondary CTA: Create Greeting Card */}
          <a
            href="#card-creator"
            className="glass-button w-full sm:w-auto !py-4 !px-7 text-base font-semibold border-white/20 hover:border-diwali-gold-400/60 hover:text-diwali-gold-300 transition"
          >
            <ImageIcon className="h-4 w-4 text-diwali-gold-300" />
            <span>Create Card</span>
          </a>
        </div>

        {/* Feature Highlights Pills */}
        <div
          className="anim-fade-up mt-8 hidden sm:flex items-center justify-center gap-6 text-xs text-white/60"
          style={{ animationDelay: '1s' }}
        >
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-diwali-gold-400" />
            Interactive Sky Fireworks
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-diwali-gold-400" />
            Festive Sitar & Flute Music
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-diwali-gold-400" />
            Personalized Card Maker
          </span>
        </div>
      </div>

      {/* 4. Altar of Lights: Crescent Diyas & Radiant Rangoli */}
      <div className="relative mt-12 flex flex-col items-center justify-center">
        {/* Tiered Crescent Diyas */}
        <div className="relative z-10 flex items-end justify-center gap-3 sm:gap-7 lg:gap-10">
          {DIYA_CRESCENT.map((diya, i) => (
            <DiyaAnimation key={i} size={diya.size} delay={diya.delay} />
          ))}
        </div>

        {/* Altar Golden Base Reflection */}
        <div
          aria-hidden
          className="relative z-10 -mt-2 h-3 w-3/4 max-w-2xl rounded-full bg-gradient-to-r from-transparent via-diwali-gold-400/40 to-transparent blur-[2px]"
        />

        {/* Rotating Sacred Rangoli Mandala Backdrop */}
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-48 left-1/2 -translate-x-1/2 opacity-45 filter drop-shadow-[0_0_40px_rgba(255,160,50,0.5)] transition hover:opacity-60"
        >
          <Rangoli size={620} />
        </div>
      </div>
    </section>
  );
}
