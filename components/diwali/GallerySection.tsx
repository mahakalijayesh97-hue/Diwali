'use client';

import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

const GALLERY_ITEMS = [
  {
    src: 'https://images.pexels.com/photos/8887279/pexels-photo-8887279.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Traditional oil lamps glowing on red and gold fabrics',
    category: 'Diyas',
    title: 'Warm glow on silk',
  },
  {
    src: 'https://images.pexels.com/photos/10182772/pexels-photo-10182772.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Traditional Diwali diyas casting a warm glow',
    category: 'Diyas',
    title: 'Festival of lights',
  },
  {
    src: 'https://images.pexels.com/photos/29422096/pexels-photo-29422096.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Rows of glowing oil lamps during a nighttime celebration',
    category: 'Diyas',
    title: 'Rows of light',
  },
  {
    src: 'https://images.pexels.com/photos/5491495/pexels-photo-5491495.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Hands creating a vibrant rangoli pattern with colored powder',
    category: 'Rangoli',
    title: 'Hands of color',
  },
  {
    src: 'https://images.pexels.com/photos/191077/pexels-photo-191077.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Geometric rangoli design on a textured surface',
    category: 'Rangoli',
    title: 'Geometric folk art',
  },
  {
    src: 'https://images.pexels.com/photos/34400039/pexels-photo-34400039.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Colorful rangoli design with a lit diya',
    category: 'Rangoli',
    title: 'Diya at the threshold',
  },
  {
    src: 'https://images.pexels.com/photos/1503520/pexels-photo-1503520.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Vibrant fireworks illuminating the night sky',
    category: 'Fireworks',
    title: 'Bursts of color',
  },
  {
    src: 'https://images.pexels.com/photos/6942352/pexels-photo-6942352.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Red and golden fireworks bursting into a dark sky',
    category: 'Fireworks',
    title: 'Golden night',
  },
  {
    src: 'https://images.pexels.com/photos/38128367/pexels-photo-38128367.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Colorful fireworks exploding in a dark night sky',
    category: 'Fireworks',
    title: 'Sky spectacle',
  },
];

export function GallerySection() {
  return (
    <section id="gallery" className="relative px-5 py-24 sm:px-8 lg:px-12 scroll-mt-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Gallery"
          title="Moments of Diwali"
          description="Glowing diyas, painted rangoli and nights lit up by fireworks."
        />

        <div className="mt-16 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {GALLERY_ITEMS.map((item, index) => (
            <Reveal key={item.src} delay={(index % 3) * 0.1}>
              <figure className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-diwali-plum-900 sm:aspect-[4/3]">
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-diwali-plum-950/90 via-diwali-plum-950/40 to-transparent p-4 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:p-5">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-diwali-gold-300">
                    {item.category}
                  </span>
                  <p className="mt-1 font-display text-lg font-semibold text-white">{item.title}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-white/45">Photos from Pexels contributors.</p>
      </div>
    </section>
  );
}
