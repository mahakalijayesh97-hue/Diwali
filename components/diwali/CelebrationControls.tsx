'use client';

import { Maximize, Minimize, Play, Square, Rocket, Sparkles, Trash2 } from 'lucide-react';

interface CelebrationControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onStop: () => void;
  onLaunch: () => void;
  onFinale?: () => void;
  onClear?: () => void;
}

export function CelebrationControls({
  isRunning,
  onStart,
  onStop,
  onLaunch,
  onFinale,
  onClear,
}: CelebrationControlsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
      {/* Auto Celebration Play/Stop Button */}
      {isRunning ? (
        <button
          type="button"
          onClick={onStop}
          className="inline-flex items-center justify-center gap-1.5 rounded-full border border-red-500/40 bg-red-500/20 px-3.5 sm:px-4 py-2 text-xs font-semibold text-red-200 shadow-[0_0_15px_rgba(239,68,68,0.35)] backdrop-blur-md transition hover:bg-red-500/30 active:scale-95"
        >
          <Square className="h-3.5 w-3.5 text-red-400 fill-current" />
          <span>Stop Show</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={onStart}
          className="group relative inline-flex items-center justify-center gap-1.5 overflow-hidden rounded-full border border-diwali-gold-300/40 bg-gradient-to-r from-diwali-gold-300 via-diwali-gold-400 to-diwali-saffron px-4 sm:px-5 py-2 text-xs font-bold text-diwali-night shadow-[0_4px_20px_rgba(245,201,106,0.5)] transition duration-200 hover:scale-105 active:scale-95"
        >
          <span
            aria-hidden
            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full"
          />
          <Play className="h-3.5 w-3.5 fill-current" />
          <span>Auto Show</span>
        </button>
      )}

      {/* Launch Single Rocket */}
      <button
        type="button"
        onClick={onLaunch}
        className="glass-button !py-2 !px-3 sm:!px-3.5 text-xs font-medium hover:border-diwali-gold-400/60 hover:text-diwali-gold-200 active:scale-95"
      >
        <Rocket className="h-3.5 w-3.5 text-diwali-gold-300" />
        <span>Rocket</span>
      </button>

      {/* Multi-Rocket Finale Barrage */}
      {onFinale && (
        <button
          type="button"
          onClick={onFinale}
          className="glass-button !py-2 !px-3 sm:!px-3.5 text-xs font-medium hover:border-diwali-gold-400/60 hover:text-diwali-gold-200 active:scale-95"
        >
          <Sparkles className="h-3.5 w-3.5 text-diwali-gold-300 animate-pulse" />
          <span>Finale (5x)</span>
        </button>
      )}

      {/* Clear Active Sparks */}
      {onClear && (
        <button
          type="button"
          onClick={onClear}
          title="Clear all active fireworks from the sky"
          className="glass-button !py-2 !px-2.5 text-xs text-white/50 hover:text-white hover:border-white/30 active:scale-95"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

interface FullscreenToggleProps {
  isFullscreen: boolean;
  onToggle: () => void;
}

export function FullscreenToggle({ isFullscreen, onToggle }: FullscreenToggleProps) {
  const Icon = isFullscreen ? Minimize : Maximize;
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
      title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
      className="glass-button h-9 w-9 sm:h-10 sm:w-10 !p-0"
    >
      <Icon className="h-4 w-4 text-diwali-gold-300" />
    </button>
  );
}
