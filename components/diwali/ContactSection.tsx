'use client';

import { useEffect, useState } from 'react';
import { Check, Copy, Flame, Share2 } from 'lucide-react';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

const SHARE_TITLE = 'Happy Diwali 2026';
const SHARE_TEXT = 'Come light up Diwali with me: diyas, rangoli and fireworks.';

type ShareStatus = 'idle' | 'copied' | 'failed';

export function ContactSection() {
  const [shareStatus, setShareStatus] = useState<ShareStatus>('idle');

  useEffect(() => {
    if (shareStatus === 'idle') return;
    const timer = window.setTimeout(() => setShareStatus('idle'), 2500);
    return () => window.clearTimeout(timer);
  }, [shareStatus]);

  const handleShare = async () => {
    const url = window.location.href;
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ title: SHARE_TITLE, text: SHARE_TEXT, url });
      } catch {
        // The share sheet was dismissed or unavailable; nothing to report.
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setShareStatus('copied');
    } catch {
      setShareStatus('failed');
    }
  };

  return (
    <section id="contact" className="relative bg-diwali-plum-950 px-5 pb-12 pt-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Contact"
          title="Share the light"
          description="Celebrate with the people you love. Send this site to friends and family so they can light up their own Diwali."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="glass-panel flex h-full flex-col gap-5 p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-diwali-gold-300/30 to-diwali-saffron/20 ring-1 ring-diwali-gold-400/30">
                <Share2 className="h-6 w-6 text-diwali-gold-300" />
              </span>
              <div>
                <h3 className="font-display text-2xl font-semibold text-white">Share with family</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  Send this celebration to someone special. It opens straight into the fireworks.
                </p>
              </div>
              <div className="mt-auto flex flex-col items-start gap-2">
                <button type="button" onClick={() => void handleShare()} className="glass-button">
                  {shareStatus === 'copied' ? <Check className="h-4 w-4 text-diwali-gold-300" /> : <Copy className="h-4 w-4" />}
                  {shareStatus === 'copied' ? 'Link copied' : 'Share this site'}
                </button>
                {shareStatus === 'failed' && (
                  <p role="alert" className="anim-fade-down text-xs text-rose-200">
                    Could not copy the link. Please copy it from the address bar.
                  </p>
                )}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="glass-panel flex h-full flex-col gap-5 p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-diwali-gold-300/30 to-diwali-rose/20 ring-1 ring-diwali-gold-400/30">
                <Flame className="h-6 w-6 text-diwali-gold-300" />
              </span>
              <div>
                <h3 className="font-display text-2xl font-semibold text-white">Leave a wish</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  Post a Diwali blessing that every visitor can read on the wishes board.
                </p>
              </div>
              <a href="#wishes" className="glass-button mt-auto w-fit">
                Write a wish
              </a>
            </div>
          </Reveal>
        </div>

        <footer className="mt-24 flex flex-col items-center gap-3 border-t border-white/10 pt-8 text-center">
          <p className="font-display text-2xl font-semibold text-white">
            Happy Diwali <span className="gold-text">2026</span>
          </p>
          <p className="text-xs text-white/50">Wishing you light, love and prosperity.</p>
        </footer>
      </div>
    </section>
  );
}
