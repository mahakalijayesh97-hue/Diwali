'use client';

import { Sparkles } from 'lucide-react';

export function DiwaliGreeting() {
  return (
    <div className="anim-blur-in pointer-events-none mx-auto flex max-w-3xl flex-col items-center text-center px-3 xs:px-4">
      {/* Sanskrit Invocation Pill */}
      <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-diwali-gold-400/30 bg-black/40 px-3 py-1 backdrop-blur-md shadow-[0_0_15px_rgba(245,201,106,0.25)]">
        <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-diwali-gold-300 animate-pulse shrink-0" />
        <span className="text-[10px] xs:text-[11px] font-semibold tracking-[0.15em] sm:tracking-[0.25em] text-diwali-gold-300 uppercase sm:text-xs truncate">
          ॥ शुभ दीपावली ॥ • CELEBRATION SKY
        </span>
        <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-diwali-gold-300 animate-pulse shrink-0" />
      </div>

      {/* Main Greeting */}
      <h2 className="mt-2 sm:mt-3 gold-shimmer-text font-display text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] drop-shadow-[0_0_30px_rgba(245,201,106,0.65)]">
        Happy Diwali 2026
      </h2>

      {/* Tagline */}
      <p className="mt-1 sm:mt-1.5 text-[10px] xs:text-xs tracking-[0.1em] sm:tracking-[0.2em] text-diwali-gold-100/90 uppercase sm:text-sm">
        May your year shine brighter than every firework
      </p>

      {/* Interactive Hint */}
      <div className="mt-2 sm:mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] xs:text-[11px] font-medium text-white/70 backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
        <span>Tap or click anywhere in the sky to burst fireworks</span>
      </div>
    </div>
  );
}
