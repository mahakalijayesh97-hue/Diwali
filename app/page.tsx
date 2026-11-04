'use client';

import { useEffect, useState } from 'react';
import { CardCreatorSection } from '@/components/diwali/CardCreatorSection';
import { CelebrationScreen } from '@/components/diwali/CelebrationScreen';
import { DiwaliHero } from '@/components/diwali/DiwaliHero';
import { DiwaliNavbar } from '@/components/diwali/DiwaliNavbar';
import { GallerySection } from '@/components/diwali/GallerySection';
import { WishesSection } from '@/components/diwali/WishesSection';
import { SoundEngine } from '@/lib/diwali/sound-engine';

export default function Home() {
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [sound, setSound] = useState<SoundEngine | null>(null);
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    const engine = new SoundEngine();
    setSound(engine);
    return () => {
      engine.dispose();
    };
  }, []);

  useEffect(() => {
    if (sound) {
      sound.setEnabled(soundOn);
    }
  }, [sound, soundOn]);

  const toggleSound = () => {
    setSoundOn((prev) => !prev);
  };

  const startCelebration = () => {
    setSoundOn(true);
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
      <WishesSection />
      <GallerySection />

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
