'use client';

const STARS = Array.from({ length: 90 }, (_, i) => ({
  left: (i * 37 + 13) % 100,
  top: (i * 23 + 7) % 65,
  size: 1 + (i % 3) * 0.7,
  delay: (i % 11) * 0.35,
  opacity: 0.4 + (i % 5) * 0.15,
}));

export function NightSky() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden bg-gradient-to-b from-[#040316] via-[#0d0724] to-[#1a0a2e]"
    >
      {/* Deep Celestial Nebula Radiance */}
      <div className="absolute left-1/2 top-10 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-diwali-rose/10 blur-[150px]" />
      <div className="absolute left-1/4 top-1/3 h-[400px] w-[500px] rounded-full bg-diwali-gold-500/10 blur-[130px]" />

      {/* Twinkling Stars */}
      {STARS.map((star, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white animate-twinkle shadow-[0_0_6px_rgba(255,255,255,0.7)]"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            animationDelay: `${star.delay}s`,
            animationDuration: `${3 + (i % 4) * 0.8}s`,
          }}
        />
      ))}

      {/* Horizon Warm Radiance (Where fireworks emerge) */}
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-[radial-gradient(ellipse_at_bottom,rgba(245,180,60,0.22)_0%,rgba(255,100,50,0.08)_50%,transparent_80%)]" />

      {/* Decorative Indian Festive City/Temple Silhouette at the Horizon */}
      <div className="absolute inset-x-0 bottom-0 h-16 sm:h-20 opacity-40">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="h-full w-full fill-[#0a0518]"
        >
          {/* Temple Domes, Chhatris, Minarets & Havelis */}
          <path d="M0,120 L0,90 Q40,88 60,75 Q80,50 90,45 Q100,50 120,75 Q140,88 180,90 L210,90 L210,65 Q230,40 240,35 Q250,40 270,65 L270,90 L340,90 L340,75 Q370,55 385,50 Q400,55 430,75 L430,90 L510,90 L510,55 Q535,28 550,22 Q565,28 590,55 L590,90 L670,90 L670,70 Q700,50 715,45 Q730,50 760,70 L760,90 L840,90 L840,60 Q865,35 880,30 Q895,35 920,60 L920,90 L980,90 L980,72 Q1005,52 1020,48 Q1035,52 1060,72 L1060,90 L1130,90 Q1165,70 1180,65 Q1195,70 1200,80 L1200,120 Z" />
        </svg>

        {/* Lit Diyas along the rooftops of the silhouette */}
        <div className="absolute inset-x-0 bottom-6 sm:bottom-8 flex justify-around px-4 opacity-75">
          {Array.from({ length: 18 }, (_, i) => (
            <span
              key={i}
              className="anim-glow-pulse h-1.5 w-1.5 rounded-full bg-amber-300 shadow-[0_0_8px_3px_rgba(255,200,80,0.85)]"
              style={{ animationDelay: `${(i * 0.3) % 2.5}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
