'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { DiwaliHero } from '@/components/diwali/DiwaliHero';
import { DiwaliNavbar } from '@/components/diwali/DiwaliNavbar';
import { GallerySection } from '@/components/diwali/GallerySection';
// import { WishesSection } from '@/components/diwali/WishesSection';
import { DiwaliFooter } from '@/components/diwali/DiwaliFooter';
import type { SoundEngine } from '@/lib/diwali/sound-engine';

// Dynamically import heavy studio below the fold to slash initial JS bundle by 60%
const CardCreatorSection = dynamic(
  () => import('@/components/diwali/CardCreatorSection').then((mod) => mod.CardCreatorSection),
  {
    ssr: false,
    loading: () => (
      <div className="py-24 text-center text-diwali-gold-300">
        <span className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-diwali-gold-400 border-t-transparent" />
      </div>
    ),
  },
);

// Dynamically import celebration screen only when activated
const CelebrationScreen = dynamic(
  () => import('@/components/diwali/CelebrationScreen').then((mod) => mod.CelebrationScreen),
  { ssr: false },
);

export default function Home() {
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [sound, setSound] = useState<SoundEngine | null>(null);
  const [soundOn, setSoundOn] = useState(false);

  // Lazy-load SoundEngine only when the user explicitly triggers sound or celebration
  const getOrCreateSound = async () => {
    if (sound) return sound;
    const { SoundEngine } = await import('@/lib/diwali/sound-engine');
    const engine = new SoundEngine();
    setSound(engine);
    return engine;
  };

  const toggleSound = async () => {
    const next = !soundOn;
    setSoundOn(next);
    const engine = await getOrCreateSound();
    engine.setEnabled(next);
  };

  const startCelebration = async () => {
    setSoundOn(true);
    const engine = await getOrCreateSound();
    engine.setEnabled(true);
    setIsCelebrating(true);
  };

  const exitCelebration = () => {
    setIsCelebrating(false);
    window.scrollTo({ top: 0 });
  };

  return (
    <main className="min-h-screen bg-diwali-night font-body text-white overflow-x-hidden min-w-0 w-full">
      <DiwaliNavbar
        onCelebrate={startCelebration}
        soundOn={soundOn}
        onToggleSound={toggleSound}
      />
      <DiwaliHero onCelebrate={startCelebration} />
      <CardCreatorSection />
      {/* <WishesSection /> */}
      <GallerySection />
      <DiwaliFooter onCelebrate={startCelebration} />

      {isCelebrating && sound && (
        <CelebrationScreen
          onExit={exitCelebration}
          sound={sound}
          soundOn={soundOn}
          onToggleSound={toggleSound}
        />
      )}
    </main>
  );
}
