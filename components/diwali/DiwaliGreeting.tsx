'use client';

import { Sparkles } from 'lucide-react';

export function DiwaliGreeting() {
  return (
    <div className="anim-blur-in pointer-events-none mx-auto flex max-w-3xl flex-col items-center text-center px-4">
      {/* Sanskrit Invocation Pill */}
      <div className="inline-flex items-center gap-2 rounded-full border border-diwali-gold-400/30 bg-black/30 px-3.5 py-1 backdrop-blur-md shadow-[0_0_15px_rgba(245,201,106,0.25)]">
        <Sparkles className="h-3.5 w-3.5 text-diwali-gold-300 animate-pulse" />
        <span className="text-[11px] font-semibold tracking-[0.25em] text-diwali-gold-300 uppercase sm:text-xs">
          ॥ शुभ दीपावली ॥ • CELEBRATION SKY
        </span>
        <Sparkles className="h-3.5 w-3.5 text-diwali-gold-300 animate-pulse" />
      </div>

      {/* Main Greeting */}
      <h2 className="mt-3 gold-shimmer-text font-display text-3xl font-extrabold leading-[1.1] drop-shadow-[0_0_30px_rgba(245,201,106,0.65)] sm:text-5xl lg:text-6xl">
        Happy Diwali 2026
      </h2>

      {/* Tagline */}
      <p className="mt-1.5 text-xs tracking-[0.2em] text-diwali-gold-100/90 uppercase sm:text-sm">
        May your year shine brighter than every firework
      </p>

      {/* Interactive Hint */}
      <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/70 backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
        <span>Tap or click anywhere in the sky to burst fireworks</span>
      </div>
    </div>
  );
}
