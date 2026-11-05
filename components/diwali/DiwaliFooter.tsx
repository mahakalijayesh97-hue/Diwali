'use client';

import { ArrowUp, Flame, Heart, Sparkles } from 'lucide-react';

interface DiwaliFooterProps {
  onCelebrate?: () => void;
}

export function DiwaliFooter({ onCelebrate }: DiwaliFooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative mt-20 border-t border-diwali-gold-400/20 bg-gradient-to-b from-diwali-night/95 via-diwali-plum-950 to-black text-white overflow-hidden content-auto">
      {/* Ambient background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-48 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-diwali-gold-500/15 blur-[100px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 xs:px-6 sm:px-8 pt-14 pb-10">
        {/* Top Section: Brand & Quick Links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-white/10 text-center md:text-left">
          {/* Brand Logo & Description */}
          <div className="flex flex-col items-center md:items-start gap-2.5 max-w-md">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-diwali-gold-300 to-diwali-saffron text-diwali-night shadow-[0_0_20px_rgba(245,201,106,0.45)]">
                <Flame className="h-5 w-5 fill-current" />
              </span>
              <span className="font-display text-2xl font-semibold tracking-wide text-white">
                Diwali <span className="text-diwali-gold-400">2026</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
              Celebrating the festival of lights with interactive fireworks, personalized greeting cards for Diwali, Dhanteras & Bhai Dooj, and heartfelt community blessings.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-7 text-xs sm:text-sm font-medium text-white/70">
            <a
              href="#home"
              className="transition hover:text-diwali-gold-300"
            >
              Home
            </a>
            <a
              href="#card-creator"
              className="transition hover:text-diwali-gold-300"
            >
              Create Card
            </a>
            <a
              href="#gallery"
              className="transition hover:text-diwali-gold-300"
            >
              Gallery
            </a>
            {onCelebrate && (
              <button
                type="button"
                onClick={onCelebrate}
                className="inline-flex items-center gap-1.5 text-diwali-gold-300 hover:text-diwali-gold-200 transition"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Celebrate</span>
              </button>
            )}
          </div>
        </div>

        {/* Center / Bottom Section: Copyright & Developer Link */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
            {/* Exact Copyright line requested */}
            <p className="text-xs sm:text-sm text-white/80">
              Copyright © 2026{' '}
              <a
                href="https://jayesh-dev.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-diwali-gold-300 hover:text-diwali-gold-200 underline decoration-diwali-gold-400/50 hover:decoration-diwali-gold-300 transition"
              >
                Jayesh Vanjara
              </a>
            </p>
          </div>

          {/* Right: Scroll to Top */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/50 flex items-center gap-1">
              Crafted with <Heart className="h-3 w-3 text-rose-400 fill-current" /> for Deepavali
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              title="Back to Top"
              aria-label="Back to top"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-diwali-gold-300 transition hover:border-diwali-gold-400/50 hover:bg-diwali-gold-400/20 hover:text-diwali-gold-200"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
