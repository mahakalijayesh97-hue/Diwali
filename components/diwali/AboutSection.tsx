'use client';

import { Flame, Sparkles, Star } from 'lucide-react';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

const TRADITIONS = [
  {
    icon: Flame,
    title: 'The Diya',
    text: 'Clay lamps lit across every doorway, welcoming prosperity and chasing away the darkness.',
  },
  {
    icon: Sparkles,
    title: 'Rangoli',
    text: 'Colored patterns drawn at the threshold to greet guests and invite good fortune into the home.',
  },
  {
    icon: Star,
    title: 'Fireworks',
    text: 'A night sky filled with light and sound, a celebration of victory of light over darkness.',
  },
];

export function AboutSection() {
  return (
    <section id="about" className="relative px-5 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="About the festival"
          title="A festival of light over darkness"
          description="Diwali is five days of lamps, family, sweets and stories. Every flame is a small promise that good will always find its way home."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {TRADITIONS.map(({ icon: Icon, title, text }, index) => (
            <Reveal key={title} delay={index * 0.12}>
              <article className="glass-panel group h-full p-8 transition duration-500 hover:-translate-y-1.5 hover:border-diwali-gold-400/40">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-diwali-gold-300/30 to-diwali-rose/20 ring-1 ring-diwali-gold-400/30">
                  <Icon className="h-6 w-6 text-diwali-gold-300" />
                </span>
                <h3 className="mt-6 font-display text-2xl font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
