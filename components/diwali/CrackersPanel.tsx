'use client';

import { Flame, Sparkles, Wind } from 'lucide-react';
import type { CrackerKind } from '@/lib/diwali/fireworks-engine';

const CRACKERS: {
  kind: CrackerKind;
  name: string;
  sub: string;
  icon: typeof Flame;
  iconColor: string;
}[] = [
  {
    kind: 'phuljhari',
    name: 'Phuljhari',
    sub: 'Sparklers',
    icon: Sparkles,
    iconColor: 'text-amber-300',
  },
  {
    kind: 'chakri',
    name: 'Chakri',
    sub: 'Ground Spinner',
    icon: Wind,
    iconColor: 'text-orange-400',
  },
  {
    kind: 'anar',
    name: 'Anar',
    sub: 'Flowerpot',
    icon: Flame,
    iconColor: 'text-rose-400',
  },
];

interface CrackersPanelProps {
  onLaunch: (kind: CrackerKind) => void;
}

export function CrackersPanel({ onLaunch }: CrackersPanelProps) {
  return (
    <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5">
      {CRACKERS.map(({ kind, name, sub, icon: Icon, iconColor }) => (
        <button
          key={kind}
          type="button"
          onClick={() => onLaunch(kind)}
          className="group relative flex flex-col sm:flex-row items-center sm:items-center gap-1 sm:gap-2.5 rounded-xl border border-white/10 bg-white/[0.06] p-1.5 xs:p-2 sm:px-3 sm:py-2 text-center sm:text-left backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-diwali-gold-400/60 hover:bg-white/[0.12] hover:shadow-[0_4px_16px_rgba(245,201,106,0.25)] active:scale-95"
        >
          {/* Icon Badge */}
          <span className="flex h-6 w-6 xs:h-7 xs:w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 transition-transform group-hover:scale-110">
            <Icon className={`h-3 w-3 xs:h-3.5 xs:w-3.5 sm:h-4 sm:w-4 ${iconColor}`} />
          </span>

          <div className="min-w-0 flex-1 w-full">
            <p className="font-display text-[11px] xs:text-xs sm:text-sm font-bold text-white tracking-wide truncate">
              {name}
            </p>
            <p className="text-[9px] xs:text-[10px] text-diwali-gold-300/80 truncate">
              {sub}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}
