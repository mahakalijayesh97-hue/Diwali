interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-2xl text-center px-2">
      <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-diwali-gold-400">
        {eyebrow}
      </p>
      <h2 className="mt-3 sm:mt-4 font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-semibold leading-[1.2] text-white">
        {title}
      </h2>
      <p className="mt-2.5 sm:mt-4 text-xs xs:text-sm sm:text-base leading-relaxed text-white/75 max-w-xl mx-auto">
        {description}
      </p>
    </div>
  );
}
