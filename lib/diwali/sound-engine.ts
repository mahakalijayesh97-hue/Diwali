export type SoundCue = 'launch' | 'explode' | 'crackle';

type Graph = {
  ctx: AudioContext;
  out: GainNode;
  noise: AudioBuffer;
};

export class SoundEngine {
  private graph: Graph | null = null;
  private enabled = true;
  private bgAudio: HTMLAudioElement | null = null;
  private audioSrc = '/audio/the_mountain-diwali-496551.mp3';

  constructor(audioSrc?: string) {
    if (audioSrc) this.audioSrc = audioSrc;
    if (typeof window !== 'undefined') {
      this.ensureMusic();
    }
  }

  private ensureMusic(): HTMLAudioElement | null {
    if (typeof window === 'undefined') return null;
    if (!this.bgAudio) {
      try {
        const audio = new Audio(this.audioSrc);
        audio.loop = true;
        audio.volume = 0.45;
        audio.preload = 'auto';
        this.bgAudio = audio;
      } catch {
        this.bgAudio = null;
      }
    }
    return this.bgAudio;
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
    if (this.graph) {
      const { ctx, out } = this.graph;
      out.gain.setTargetAtTime(enabled ? 0.7 : 0, ctx.currentTime, 0.05);
    }
    const audio = this.ensureMusic();
    if (audio) {
      if (enabled) {
        audio.play().catch(() => undefined);
      } else {
        audio.pause();
      }
    }
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  playMusic() {
    const audio = this.ensureMusic();
    if (audio) {
      audio.play().catch(() => undefined);
    }
  }

  pauseMusic() {
    this.bgAudio?.pause();
  }

  setMusicVolume(volume: number) {
    if (this.bgAudio) {
      this.bgAudio.volume = Math.max(0, Math.min(1, volume));
    }
  }

  getMusicVolume(): number {
    return this.bgAudio?.volume ?? 0.45;
  }

  play(cue: SoundCue) {
    if (!this.enabled) return;
    const graph = this.ensureGraph();
    if (!graph) return;
    if (this.bgAudio && this.bgAudio.paused) {
      this.bgAudio.play().catch(() => undefined);
    }
    if (cue === 'launch') this.whistle(graph);
    if (cue === 'explode') this.boom(graph);
    if (cue === 'crackle') this.crackle(graph);
  }

  dispose() {
    if (this.bgAudio) {
      this.bgAudio.pause();
      this.bgAudio.src = '';
      this.bgAudio = null;
    }
    this.graph?.ctx.close().catch(() => undefined);
    this.graph = null;
  }

  private ensureGraph(): Graph | null {
    if (typeof window === 'undefined') return null;
    if (!this.graph) {
      const AudioCtor =
        window.AudioContext ??
        (window as typeof window & { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioCtor) return null;
      const ctx = new AudioCtor();
      const out = ctx.createGain();
      out.gain.value = this.enabled ? 0.7 : 0;
      out.connect(ctx.destination);
      const noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
      const data = noise.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
      this.graph = { ctx, out, noise };
    }
    if (this.graph.ctx.state === 'suspended') void this.graph.ctx.resume();
    return this.graph;
  }

  private whistle({ ctx, out }: Graph) {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(380, now);
    osc.frequency.exponentialRampToValueAtTime(1300, now + 0.55);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.09, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);
    osc.connect(gain).connect(out);
    osc.start(now);
    osc.stop(now + 0.65);
  }

  private boom(graph: Graph) {
    const { ctx, out } = graph;
    const now = ctx.currentTime;
    this.burst(graph, now, 1.4, 0.9, 'lowpass', 1800, 180);

    const thump = ctx.createOscillator();
    const gain = ctx.createGain();
    thump.type = 'sine';
    thump.frequency.setValueAtTime(110, now);
    thump.frequency.exponentialRampToValueAtTime(38, now + 0.45);
    gain.gain.setValueAtTime(0.6, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
    thump.connect(gain).connect(out);
    thump.start(now);
    thump.stop(now + 0.55);
  }

  private crackle(graph: Graph) {
    const now = graph.ctx.currentTime;
    for (let i = 0; i < 6; i++) {
      const start = now + Math.random() * 0.4;
      this.burst(graph, start, 0.05, 0.12 + Math.random() * 0.2, 'highpass', 2400, 5200);
    }
  }

  private burst(
    { ctx, out, noise }: Graph,
    start: number,
    duration: number,
    peak: number,
    filterType: BiquadFilterType,
    fromHz: number,
    toHz: number,
  ) {
    const src = ctx.createBufferSource();
    src.buffer = noise;
    const filter = ctx.createBiquadFilter();
    filter.type = filterType;
    filter.frequency.setValueAtTime(fromHz, start);
    filter.frequency.exponentialRampToValueAtTime(toHz, start + duration);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(peak, start);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    src.connect(filter).connect(gain).connect(out);
    src.start(start, Math.random() * 0.5, duration);
    src.stop(start + duration + 0.05);
  }
}
