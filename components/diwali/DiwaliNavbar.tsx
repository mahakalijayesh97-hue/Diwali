'use client';

import { useEffect, useState } from 'react';
import { Flame, Menu, Volume2, VolumeX, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Create Card', href: '#card-creator' },
  { label: 'Wishes', href: '#wishes' },
  { label: 'Gallery', href: '#gallery' },
];

interface DiwaliNavbarProps {
  onCelebrate: () => void;
  soundOn?: boolean;
  onToggleSound?: () => void;
}

export function DiwaliNavbar({ onCelebrate, soundOn, onToggleSound }: DiwaliNavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      const sectionIds = ['gallery', 'wishes', 'card-creator', 'home'];
      const scrollPos = window.scrollY + 160;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(`#${id}`);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'border-b border-white/10 bg-diwali-plum-950/85 py-3 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] backdrop-blur-xl'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        <a
          href="#home"
          onClick={() => setActiveSection('#home')}
          className="flex items-center gap-3"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-diwali-gold-300 to-diwali-saffron shadow-[0_0_20px_rgba(245,201,106,0.45)]">
            <Flame className="h-5 w-5 text-diwali-plum-950" />
          </span>
          <span className="font-display text-xl font-semibold tracking-wide text-white">
            Diwali <span className="gold-text">2026</span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setActiveSection(link.href)}
                  className={`group relative py-1 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'text-diwali-gold-300 font-semibold drop-shadow-[0_0_10px_rgba(245,201,106,0.35)]'
                      : 'text-white/80 hover:text-diwali-gold-300'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute inset-x-0 -bottom-0.5 h-0.5 origin-left bg-gradient-to-r from-diwali-gold-400 to-diwali-saffron transition-all duration-300 ${
                      isActive
                        ? 'scale-x-100 shadow-[0_0_8px_rgba(245,201,106,0.6)]'
                        : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          {onToggleSound && (
            <button
              type="button"
              onClick={onToggleSound}
              aria-label={soundOn ? 'Mute festive music' : 'Play festive music'}
              className="glass-button !px-3.5 !py-2 text-xs flex items-center gap-2"
              title={soundOn ? 'Mute festive music' : 'Play festive music'}
            >
              {soundOn ? (
                <>
                  <Volume2 className="h-4 w-4 text-diwali-gold-300 animate-pulse" />
                  <span>Music On</span>
                </>
              ) : (
                <>
                  <VolumeX className="h-4 w-4 text-white/60" />
                  <span>Music Off</span>
                </>
              )}
            </button>
          )}
          <button type="button" onClick={onCelebrate} className="glass-button">
            Celebrate
          </button>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          className="glass-button !p-2.5 md:hidden"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {menuOpen && (
        <div className="anim-fade-down mx-4 mt-3 rounded-2xl border border-white/10 bg-diwali-plum-950/95 p-4 shadow-2xl backdrop-blur-xl md:hidden">
          <ul className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => {
                      setActiveSection(link.href);
                      setMenuOpen(false);
                    }}
                    className={`block rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-diwali-gold-400/15 text-diwali-gold-300 font-semibold border-l-2 border-diwali-gold-400 pl-3.5'
                        : 'text-white/85 hover:bg-white/5 hover:text-diwali-gold-300'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
          {onToggleSound && (
            <button
              type="button"
              onClick={onToggleSound}
              className="glass-button mt-2 w-full justify-center gap-2 py-2.5 text-sm"
            >
              {soundOn ? (
                <>
                  <Volume2 className="h-4 w-4 text-diwali-gold-300 animate-pulse" />
                  <span>Diwali Music: On</span>
                </>
              ) : (
                <>
                  <VolumeX className="h-4 w-4 text-white/60" />
                  <span>Diwali Music: Off</span>
                </>
              )}
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              onCelebrate();
            }}
            className="glass-button mt-3 w-full"
          >
            Celebrate
          </button>
        </div>
      )}
    </header>
  );
}
