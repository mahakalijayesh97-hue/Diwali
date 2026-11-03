'use client';

interface LanternProps {
  size?: number;
  delay?: number;
  variant?: 'gold' | 'rose' | 'saffron';
}

export function Lantern({ size = 56, delay = 0, variant = 'gold' }: LanternProps) {
  const colorGradients = {
    gold: {
      body: 'from-amber-300 via-diwali-saffron to-amber-600',
      glow: 'rgba(255, 190, 80, 0.6)',
      accent: '#ffe08a',
    },
    rose: {
      body: 'from-pink-400 via-rose-500 to-diwali-rose',
      glow: 'rgba(255, 95, 162, 0.55)',
      accent: '#ffb8da',
    },
    saffron: {
      body: 'from-yellow-400 via-orange-500 to-amber-700',
      glow: 'rgba(255, 138, 61, 0.6)',
      accent: '#ffd280',
    },
  }[variant];

  return (
    <div
      className="flex origin-top animate-sway flex-col items-center"
      style={{ width: size, animationDelay: `${delay}s`, animationDuration: '4.5s' }}
    >
      {/* Hanging Chain with beads */}
      <div className="relative flex flex-col items-center">
        <div className="h-16 w-px bg-gradient-to-b from-transparent via-diwali-gold-400/80 to-diwali-gold-300" />
        <span className="absolute top-4 h-1.5 w-1.5 rounded-full bg-diwali-gold-300 shadow-[0_0_6px_rgba(245,201,106,0.8)]" />
        <span className="absolute top-10 h-1.5 w-1.5 rounded-full bg-diwali-gold-300 shadow-[0_0_6px_rgba(245,201,106,0.8)]" />
      </div>

      {/* Top Brass Cap */}
      <div
        className="h-2.5 rounded-t-lg bg-gradient-to-r from-diwali-gold-600 via-diwali-gold-300 to-diwali-gold-600 shadow-md"
        style={{ width: size * 0.58 }}
      />

      {/* Main Lantern Hexagonal Body */}
      <div
        className={`relative rounded-[42%] bg-gradient-to-b ${colorGradients.body} p-1`}
        style={{
          width: size,
          height: size * 1.35,
          boxShadow: `0 0 35px 8px ${colorGradients.glow}, inset 0 0 15px rgba(255,255,255,0.4)`,
        }}
      >
        {/* Intricate window cutouts */}
        <div className="absolute inset-x-2 inset-y-1.5 rounded-[38%] border border-white/40 bg-white/15 backdrop-blur-[2px]" />
        <div className="absolute inset-x-1/3 inset-y-0 border-x border-white/30" />
        <div className="absolute inset-y-1/3 inset-x-0 border-y border-white/30" />

        {/* Center glowing diya flame inside lantern */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="anim-breathe h-3 w-2 rounded-full bg-white shadow-[0_0_14px_6px_rgba(255,245,180,0.9)]" />
        </div>
      </div>

      {/* Bottom Brass Base */}
      <div
        className="h-2 rounded-b-lg bg-gradient-to-r from-diwali-gold-600 via-diwali-gold-300 to-diwali-gold-600 shadow-md"
        style={{ width: size * 0.58 }}
      />

      {/* Hanging Tassel */}
      <div className="relative flex flex-col items-center">
        <div className="h-6 w-px bg-diwali-gold-400" />
        <div className="anim-breathe h-2.5 w-2.5 rounded-full bg-diwali-gold-300 shadow-[0_0_12px_4px_rgba(245,201,106,0.8)]" />
      </div>
    </div>
  );
}

interface RangoliProps {
  size?: number;
}

const PETAL_COUNT = 12;
const OUTER_PETAL_COUNT = 16;
const DOT_COUNT = 24;

export function Rangoli({ size = 380 }: RangoliProps) {
  return (
    <div aria-hidden className="anim-spin-slow" style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 200 200"
        className="h-full w-full drop-shadow-[0_0_35px_rgba(255,160,50,0.45)]"
      >
        <defs>
          <radialGradient id="rangoliGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffe08a" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#ff8a3d" stopOpacity="0.6" />
            <stop offset="80%" stopColor="#ff5fa2" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ff5fa2" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Subtle glowing backdrop circle */}
        <circle cx="100" cy="100" r="96" fill="url(#rangoliGlow)" opacity="0.65" />

        {/* Outer Lotus Petals - Saffron & Gold */}
        <g fill="#ff7a1a" opacity="0.88">
          {Array.from({ length: OUTER_PETAL_COUNT }, (_, i) => (
            <ellipse
              key={i}
              cx="100"
              cy="22"
              rx="9"
              ry="24"
              transform={`rotate(${i * (360 / OUTER_PETAL_COUNT)} 100 100)`}
            />
          ))}
        </g>

        {/* Inner Rose Petals */}
        <g fill="#ff2e8c" opacity="0.92">
          {Array.from({ length: PETAL_COUNT }, (_, i) => (
            <ellipse
              key={i}
              cx="100"
              cy="44"
              rx="15"
              ry="32"
              transform={`rotate(${i * (360 / PETAL_COUNT)} 100 100)`}
            />
          ))}
        </g>

        {/* Decorative Golden Starburst Rays */}
        <g fill="none" stroke="#ffe08a" strokeWidth="1.5" opacity="0.85">
          {Array.from({ length: DOT_COUNT }, (_, i) => {
            const angle = (i * 2 * Math.PI) / DOT_COUNT;
            const x1 = 100 + Math.cos(angle) * 60;
            const y1 = 100 + Math.sin(angle) * 60;
            const x2 = 100 + Math.cos(angle) * 88;
            const y2 = 100 + Math.sin(angle) * 88;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
          })}
        </g>

        {/* Outer Golden Pearl Beads */}
        <g fill="#ffd269">
          {Array.from({ length: DOT_COUNT }, (_, i) => {
            const angle = (i * 2 * Math.PI) / DOT_COUNT;
            return (
              <circle
                key={i}
                cx={100 + Math.cos(angle) * 90}
                cy={100 + Math.sin(angle) * 90}
                r="3"
                className="drop-shadow-[0_0_4px_rgba(255,230,100,0.8)]"
              />
            );
          })}
        </g>

        {/* Concentric Golden Mandalas */}
        <g fill="none" stroke="#ffe08a" strokeWidth="1.5" opacity="0.8">
          <circle cx="100" cy="100" r="32" />
          <circle cx="100" cy="100" r="56" />
          <circle cx="100" cy="100" r="74" />
        </g>

        {/* Center Golden Core */}
        <circle cx="100" cy="100" r="18" fill="#ffd700" opacity="0.95" />
        <circle cx="100" cy="100" r="8" fill="#ffffff" />
      </svg>
    </div>
  );
}

const PARTICLES = Array.from({ length: 42 }, (_, i) => ({
  left: (i * 29) % 100,
  top: (i * 47) % 100,
  size: 2 + (i % 3) * 1.2,
  duration: 5 + (i % 6) * 1.5,
  delay: (i % 8) * 0.6,
}));

export function GoldenParticles() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {PARTICLES.map((particle, i) => (
        <span
          key={i}
          className="anim-particle absolute rounded-full bg-diwali-gold-300 shadow-[0_0_10px_3px_rgba(245,201,106,0.7)]"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: particle.size,
            height: particle.size,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
