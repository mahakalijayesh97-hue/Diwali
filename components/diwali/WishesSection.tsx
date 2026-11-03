'use client';

import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { Loader2, RefreshCw, Send } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SectionHeading } from './SectionHeading';

const NAME_MAX_LENGTH = 60;
const MESSAGE_MAX_LENGTH = 280;
const WISHES_LIMIT = 30;

interface Wish {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

type LoadStatus = 'loading' | 'ready' | 'error';

function parseWish(row: unknown): Wish | null {
  if (typeof row !== 'object' || row === null) return null;
  const { id, name, message, created_at } = row as Record<string, unknown>;
  if (
    typeof id !== 'string' ||
    typeof name !== 'string' ||
    typeof message !== 'string' ||
    typeof created_at !== 'string'
  ) {
    return null;
  }
  return { id, name, message, createdAt: created_at };
}

function formatWishDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

export function WishesSection() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loadStatus, setLoadStatus] = useState<LoadStatus>('loading');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [posted, setPosted] = useState(false);

  const loadWishes = useCallback(async () => {
    if (!supabase) {
      setLoadStatus('error');
      return;
    }
    setLoadStatus('loading');
    const { data, error } = await supabase
      .from('diwali_wishes')
      .select('id, name, message, created_at')
      .order('created_at', { ascending: false })
      .limit(WISHES_LIMIT);

    if (error || !Array.isArray(data)) {
      setLoadStatus('error');
      return;
    }
    setWishes(data.map(parseWish).filter((wish): wish is Wish => wish !== null));
    setLoadStatus('ready');
  }, []);

  useEffect(() => {
    void loadWishes();
  }, [loadWishes]);

  useEffect(() => {
    if (!posted) return;
    const timer = window.setTimeout(() => setPosted(false), 3000);
    return () => window.clearTimeout(timer);
  }, [posted]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedMessage) {
      setFormError('Please add your name and a wish before sending.');
      return;
    }
    if (!supabase) {
      setFormError('Wishes are unavailable right now. Please try again later.');
      return;
    }

    setSubmitting(true);
    setFormError(null);
    const { error } = await supabase
      .from('diwali_wishes')
      .insert({ name: trimmedName, message: trimmedMessage });
    setSubmitting(false);

    if (error) {
      setFormError('We could not send your wish. Please try again.');
      return;
    }
    setName('');
    setMessage('');
    setPosted(true);
    void loadWishes();
  };

  return (
    <section id="wishes" className="relative bg-diwali-plum-900/40 px-5 py-24 sm:px-8 lg:px-12 scroll-mt-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Diwali wishes"
          title="Send light to someone you love"
          description="Leave a message for family and friends. Every wish is shared with everyone who visits this celebration."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
          <form onSubmit={handleSubmit} className="glass-panel flex flex-col gap-5 p-6 sm:p-8">
            <div className="flex flex-col gap-2">
              <label htmlFor="wish-name" className="text-sm font-medium text-white/85">
                Your name
              </label>
              <Input
                id="wish-name"
                value={name}
                maxLength={NAME_MAX_LENGTH}
                onChange={(event) => setName(event.target.value)}
                placeholder="Priya"
                className="h-12 rounded-xl border-white/15 bg-white/5 text-white placeholder:text-white/40 focus-visible:ring-diwali-gold-400"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label htmlFor="wish-message" className="text-sm font-medium text-white/85">
                  Your wish
                </label>
                <span className="text-xs text-white/50">
                  {message.length}/{MESSAGE_MAX_LENGTH}
                </span>
              </div>
              <Textarea
                id="wish-message"
                value={message}
                maxLength={MESSAGE_MAX_LENGTH}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="May your home glow with happiness this Diwali."
                rows={5}
                className="rounded-xl border-white/15 bg-white/5 text-white placeholder:text-white/40 focus-visible:ring-diwali-gold-400"
              />
            </div>

            {formError && (
              <p
                role="alert"
                className="anim-fade-down rounded-xl border border-diwali-rose/40 bg-diwali-rose/10 px-4 py-3 text-sm text-rose-200"
              >
                {formError}
              </p>
            )}

            <div className="flex items-center justify-between gap-4">
              {posted && <span className="anim-fade-in text-sm text-diwali-gold-300">Your wish has been shared.</span>}
              <button
                type="submit"
                disabled={submitting}
                className="ml-auto inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-diwali-gold-300 via-diwali-gold-400 to-diwali-saffron px-6 py-3 text-sm font-semibold text-diwali-plum-950 shadow-[0_8px_30px_-6px_rgba(245,201,106,0.6)] transition duration-300 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                {submitting ? 'Sending...' : 'Send Wish'}
              </button>
            </div>
          </form>

          <div className="flex flex-col gap-4">
            {loadStatus === 'loading' && (
              <div className="flex flex-col gap-4">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="glass-panel h-28 animate-pulse p-6" />
                ))}
              </div>
            )}

            {loadStatus === 'error' && (
              <div className="glass-panel flex flex-col items-center gap-4 p-8 text-center">
                <p className="text-sm text-white/75">Wishes could not be loaded right now.</p>
                <button type="button" onClick={() => void loadWishes()} className="glass-button">
                  <RefreshCw className="h-4 w-4" />
                  Try again
                </button>
              </div>
            )}

            {loadStatus === 'ready' && wishes.length === 0 && (
              <div className="glass-panel p-8 text-center text-sm text-white/75">
                No wishes yet. Be the first to share a Diwali blessing.
              </div>
            )}

            {loadStatus === 'ready' &&
              wishes.map((wish, index) => (
                <article
                  key={wish.id}
                  style={{ animationDelay: `${Math.min(index, 6) * 0.06}s` }}
                  className="anim-fade-up glass-panel flex gap-4 p-5 sm:p-6"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-diwali-gold-300 to-diwali-rose font-display text-lg font-semibold text-diwali-plum-950">
                    {wish.name.charAt(0).toUpperCase()}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-3">
                      <h3 className="font-semibold text-white">{wish.name}</h3>
                      <time className="text-xs text-white/50" dateTime={wish.createdAt}>
                        {formatWishDate(wish.createdAt)}
                      </time>
                    </div>
                    <p className="mt-2 break-words text-sm leading-relaxed text-white/80">{wish.message}</p>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
