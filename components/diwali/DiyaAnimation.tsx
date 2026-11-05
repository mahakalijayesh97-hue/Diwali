'use client';

interface DiyaAnimationProps {
  size?: number;
  delay?: number;
}

export function DiyaAnimation({ size = 72, delay = 0 }: DiyaAnimationProps) {
  const bowlHeight = size * 0.35;
  const flameWidth = size * 0.22;
  const flameHeight = size * 0.52;
  const glowSize = size * 2.1;

  return (
    <div
      className="relative flex flex-col items-center select-none"
      style={{
        width: size,
        height: size * 0.95,
      }}
    >
      {/* 1. Large Ambient Radiance Halo */}
      <span
        aria-hidden
        className="anim-glow-pulse pointer-events-none absolute rounded-full bg-[radial-gradient(circle,rgba(255,225,120,0.85)_0%,rgba(255,140,50,0.35)_45%,rgba(255,80,120,0.1)_70%,transparent_85%)] blur-md"
        style={{
          width: glowSize,
          height: glowSize,
          left: '50%',
          bottom: bowlHeight * 0.45,
          marginLeft: -glowSize / 2,
          animationDelay: `${delay}s`,
        }}
      />

      {/* 2. Realistic Multi-layered Dancing Flame */}
      {/* Outer Flame (Fiery Orange/Saffron) */}
      <span
        aria-hidden
        className="absolute origin-bottom animate-flicker bg-gradient-to-t from-orange-600 via-amber-400 to-yellow-100 shadow-[0_0_18px_6px_rgba(255,180,60,0.7)]"
        style={{
          width: flameWidth,
          height: flameHeight,
          left: '50%',
          bottom: bowlHeight * 0.72,
          marginLeft: -flameWidth / 2,
          borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
          animationDelay: `${delay * 0.5}s`,
        }}
      >
        {/* Inner Luminous White Wick Core */}
        <span
          className="absolute inset-x-[22%] bottom-1 top-2.5 rounded-full bg-gradient-to-t from-amber-200 via-white to-white shadow-[0_0_8px_rgba(255,255,255,0.9)]"
        />
      </span>

      {/* 3. Terracotta & Brass Sculpted Bowl */}
      <span
        aria-hidden
        className="absolute bottom-0 left-0 border-t border-diwali-gold-300/80 bg-gradient-to-b from-[#d99032] via-[#8c4815] to-[#4a1e06] shadow-[0_8px_20px_rgba(0,0,0,0.65)]"
        style={{
          width: size,
          height: bowlHeight,
          borderRadius: `0 0 ${size}px ${size}px / 0 0 ${bowlHeight * 1.7}px ${bowlHeight * 1.7}px`,
        }}
      >
        {/* Decorative golden rim highlight */}
        <span className="absolute inset-x-2 top-0.5 h-[1.5px] bg-gradient-to-r from-transparent via-diwali-gold-200 to-transparent opacity-90" />
      </span>

      {/* 4. Ground Warm Reflection Pool */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-1.5 h-2 rounded-full bg-amber-400/40 blur-[3px]"
        style={{ width: size * 0.75 }}
      />
    </div>
  );
}
