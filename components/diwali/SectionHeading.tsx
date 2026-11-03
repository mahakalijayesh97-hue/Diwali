interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-diwali-gold-400">{eyebrow}</p>
      <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.15] text-white sm:text-5xl">{title}</h2>
      <p className="mt-4 text-base leading-relaxed text-white/70">{description}</p>
    </div>
  );
}
