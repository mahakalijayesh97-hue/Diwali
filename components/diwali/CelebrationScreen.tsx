'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { SoundEngine } from '@/lib/diwali/sound-engine';
import type { CrackerKind } from '@/lib/diwali/fireworks-engine';
import { CelebrationControls, FullscreenToggle } from './CelebrationControls';
import { CrackersPanel } from './CrackersPanel';
import { DiwaliGreeting } from './DiwaliGreeting';
import { FireworksCanvas, type FireworksHandle } from './FireworksCanvas';
import { NightSky } from './NightSky';
import { SoundController } from './SoundController';

const EXIT_FADE_MS = 900;

interface CelebrationScreenProps {
  onExit: () => void;
  sound?: SoundEngine;
  soundOn?: boolean;
  onToggleSound?: () => void;
}

export function CelebrationScreen({
  onExit,
  sound: passedSound,
  soundOn: passedSoundOn,
  onToggleSound,
}: CelebrationScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fireworksRef = useRef<FireworksHandle>(null);
  const [internalSound] = useState(() => (passedSound ? null : new SoundEngine()));
  const sound = passedSound ?? internalSound!;
  const [internalSoundOn, setInternalSoundOn] = useState(true);
  const soundOn = passedSoundOn !== undefined ? passedSoundOn : internalSoundOn;
  const toggleSound = onToggleSound ?? (() => setInternalSoundOn((on) => !on));
  const [isRunning, setIsRunning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [canFullscreen, setCanFullscreen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [isDockExpanded, setIsDockExpanded] = useState(true);

  useEffect(() => {
    return () => {
      internalSound?.dispose();
    };
  }, [internalSound]);

  useEffect(() => {
    sound.setEnabled(soundOn);
  }, [sound, soundOn]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    setCanFullscreen(document.fullscreenEnabled);
    const handleChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', handleChange);
    return () => document.removeEventListener('fullscreenchange', handleChange);
  }, []);

  useEffect(() => {
    fireworksRef.current?.launchRocket();
  }, []);

  useEffect(() => {
    if (!closing) return;
    const timer = window.setTimeout(onExit, EXIT_FADE_MS);
    return () => window.clearTimeout(timer);
  }, [closing, onExit]);

  const handleStart = () => {
    fireworksRef.current?.setAutoRunning(true);
    setIsRunning(true);
  };

  const handleStop = () => {
    fireworksRef.current?.setAutoRunning(false);
    fireworksRef.current?.clear();
    setIsRunning(false);
  };

  const handleLaunch = () => {
    fireworksRef.current?.launchRocket();
  };

  const handleFinale = () => {
    for (let i = 0; i < 5; i++) {
      window.setTimeout(() => {
        fireworksRef.current?.launchRocket();
      }, i * 220);
    }
  };

  const handleClear = () => {
    fireworksRef.current?.clear();
  };

  const handleCracker = (kind: CrackerKind) => {
    fireworksRef.current?.launchCracker(kind);
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      void document.exitFullscreen().catch(() => undefined);
      return;
    }
    void containerRef.current?.requestFullscreen().catch(() => undefined);
  };

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label="Diwali celebration"
      className={`fixed inset-0 z-50 overflow-hidden bg-diwali-night ${
        closing ? 'anim-fade-out pointer-events-none' : 'anim-fade-in'
      }`}
    >
      {/* 1. Festive Animated Sky & City Silhouette */}
      <NightSky />

      {/* 2. Interactive Sky Fireworks Canvas */}
      <FireworksCanvas ref={fireworksRef} sound={sound} />

      {/* 3. Header Auspicious Greeting */}
      <div className="pointer-events-none absolute inset-x-0 top-12 xs:top-14 sm:top-18 z-10 px-2 sm:px-4">
        <DiwaliGreeting />
      </div>

      {/* 4. Top Navigation Bar */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-2 p-2.5 xs:p-3 sm:p-5">
        <button
          type="button"
          onClick={() => setClosing(true)}
          className="glass-button pointer-events-auto !py-1.5 !px-2.5 sm:!px-3 text-xs sm:text-sm hover:border-diwali-gold-400 active:scale-95"
        >
          <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Back to Home</span>
          <span className="sm:hidden">Home</span>
        </button>

        <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2">
          <SoundController soundOn={soundOn} onToggle={toggleSound} />
          {canFullscreen && (
            <FullscreenToggle isFullscreen={isFullscreen} onToggle={toggleFullscreen} />
          )}
        </div>
      </div>

      {/* 5. Bottom Interactive Launchpad (Compact & Properly Set) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-2.5 sm:bottom-5 z-20 px-2 xs:px-3 sm:px-4">
        {isDockExpanded ? (
          <div className="glass-panel pointer-events-auto mx-auto flex max-w-xl flex-col gap-2 rounded-2xl sm:rounded-3xl border border-diwali-gold-400/30 bg-black/55 p-2.5 sm:p-3.5 shadow-[0_15px_45px_rgba(0,0,0,0.85)] backdrop-blur-2xl transition-all duration-300">
            {/* Dock Header with Minimize Toggle */}
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5 px-1">
              <div className="flex items-center gap-1.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-diwali-gold-400/20 text-diwali-gold-300">
                  <Sparkles className="h-3 w-3" />
                </span>
                <span className="text-xs font-semibold text-white tracking-wide">
                  Fireworks Launchpad
                </span>
                <span className="text-[10px] text-white/50 hidden sm:inline">• Tap sky to burst</span>
              </div>
              <button
                type="button"
                onClick={() => setIsDockExpanded(false)}
                className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-white/70 hover:bg-white/10 hover:text-white transition active:scale-95"
                title="Minimize launchpad to view full sky"
              >
                <span>Hide</span>
                <ChevronDown className="h-3 w-3" />
              </button>
            </div>

            {/* Compact Crackers Selection Grid */}
            <CrackersPanel onLaunch={handleCracker} />

            {/* Compact Celebration Controls */}
            <div className="border-t border-white/10 pt-1.5">
              <CelebrationControls
                isRunning={isRunning}
                onStart={handleStart}
                onStop={handleStop}
                onLaunch={handleLaunch}
                onFinale={handleFinale}
                onClear={handleClear}
              />
            </div>
          </div>
        ) : (
          /* Minimized Floating Pill Button */
          <div className="pointer-events-auto mx-auto flex justify-center pb-1">
            <button
              type="button"
              onClick={() => setIsDockExpanded(true)}
              className="group inline-flex items-center gap-2 rounded-full border border-diwali-gold-400/50 bg-black/75 px-4 py-2 text-xs font-semibold text-white shadow-[0_0_25px_rgba(245,201,106,0.45)] backdrop-blur-xl transition duration-200 hover:scale-105 hover:border-diwali-gold-300 active:scale-95"
            >
              <Sparkles className="h-3.5 w-3.5 text-diwali-gold-300 animate-spin" />
              <span>Launchpad</span>
              <ChevronUp className="h-3.5 w-3.5 text-diwali-gold-400 transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
