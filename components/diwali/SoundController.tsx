'use client';

import { Volume2, VolumeX } from 'lucide-react';

interface SoundControllerProps {
  soundOn: boolean;
  onToggle: () => void;
}

export function SoundController({ soundOn, onToggle }: SoundControllerProps) {
  const Icon = soundOn ? Volume2 : VolumeX;
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={soundOn}
      aria-label={soundOn ? 'Mute sound effects' : 'Unmute sound effects'}
      className="glass-button h-11 gap-2 !px-4"
    >
      <Icon className="h-4 w-4 text-diwali-gold-400" />
      <span className="hidden sm:inline">{soundOn ? 'Sound On' : 'Sound Off'}</span>
    </button>
  );
}
