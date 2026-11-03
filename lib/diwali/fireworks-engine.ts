import type { SoundCue } from './sound-engine';

export type CrackerKind = 'phuljhari' | 'chakri' | 'anar';

type ShellKind = 'peony' | 'ring' | 'willow' | 'chrysanthemum';

type Point = { x: number; y: number };

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  gravity: number;
  drag: number;
  trail: Point[] | null;
  twinkle: boolean;
}

interface Rocket {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetY: number;
  shell: ShellKind;
  palette: string[];
  trail: Point[];
}

interface Flash {
  x: number;
  y: number;
  life: number;
  maxLife: number;
  color: string;
}

interface Cracker {
  kind: CrackerKind;
  x: number;
  y: number;
  elapsed: number;
  crackleIn: number;
  angle: number;
}

interface BurstOptions {
  count: number;
  minSpeed: number;
  maxSpeed: number;
  ring?: boolean;
  drag: number;
  gravity: number;
  life: [number, number];
  size: [number, number];
  trail: boolean;
}

const GRAVITY = 0.045;
const MAX_PARTICLES = 2400;
const TAU = Math.PI * 2;
const CHAKRI_SPIN = 0.14;
const CHAKRI_RADIUS = 22;

const CRACKERS: Record<CrackerKind, { groundRatio: number; duration: number }> = {
  phuljhari: { groundRatio: 0.58, duration: 3200 },
  chakri: { groundRatio: 0.68, duration: 4200 },
  anar: { groundRatio: 0.76, duration: 3600 },
};

const CRACKER_KINDS = Object.keys(CRACKERS) as CrackerKind[];
const SHELL_KINDS: ShellKind[] = ['peony', 'ring', 'willow', 'chrysanthemum'];

const PALETTES: string[][] = [
  ['#ffd36b', '#fff1b8'],
  ['#ff7a45', '#ffb35c'],
  ['#ff5fa2', '#ffc2dc'],
  ['#8fe3ff', '#ffffff'],
  ['#ffe08a'],
  ['#ff9f43', '#ffd36b', '#ff5fa2'],
  ['#7cf5c8', '#ffffff'],
];
const GOLD_PALETTE = ['#ffe08a', '#f5c96a', '#fff3cc'];
const SPARK_COLORS = ['#fff3c4', '#ffd36b', '#ffb35c', '#ff8a3d'];
const ANAR_COLORS = ['#ff5fa2', '#ff8a3d', '#ffe08a', '#ffc2dc'];

const SHELL_BURSTS: Record<ShellKind, BurstOptions> = {
  peony: {
    count: 120, minSpeed: 2, maxSpeed: 5.5, drag: 0.955, gravity: 0.035,
    life: [60, 90], size: [1.6, 2.6], trail: false,
  },
  ring: {
    count: 72, minSpeed: 4.5, maxSpeed: 4.5, ring: true, drag: 0.94, gravity: 0.03,
    life: [55, 70], size: [2, 2.8], trail: false,
  },
  willow: {
    count: 80, minSpeed: 1.2, maxSpeed: 3.6, drag: 0.952, gravity: 0.05,
    life: [130, 170], size: [1.4, 2.2], trail: true,
  },
  chrysanthemum: {
    count: 100, minSpeed: 2, maxSpeed: 6.5, drag: 0.94, gravity: 0.03,
    life: [80, 105], size: [1.5, 2.4], trail: true,
  },
};

const random = (min: number, max: number) => min + Math.random() * (max - min);
const pick = <T,>(items: T[]): T => items[Math.floor(Math.random() * items.length)];

export class FireworksEngine {
  private width = 0;
  private height = 0;
  private particles: Particle[] = [];
  private rockets: Rocket[] = [];
  private flashes: Flash[] = [];
  private crackers: Cracker[] = [];
  private frameId: number | null = null;
  private lastTime = 0;
  private autoRunning = false;
  private autoTimer = 0;

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly ctx: CanvasRenderingContext2D,
    private readonly onCue?: (cue: SoundCue) => void,
  ) {}

  resize(width: number, height: number, dpr: number) {
    this.width = width;
    this.height = height;
    this.canvas.width = Math.round(width * dpr);
    this.canvas.height = Math.round(height * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  setAutoRunning(on: boolean) {
    this.autoRunning = on;
    this.autoTimer = 0;
    if (on) this.ensureLoop();
  }

  launchRocket(
    x: number = random(0.15, 0.85) * this.width,
    targetY: number = random(0.12, 0.45) * this.height,
  ) {
    const rise = Math.max(this.height - targetY, 40);
    this.rockets.push({
      x,
      y: this.height,
      vx: random(-0.15, 0.15),
      vy: -Math.sqrt(2 * GRAVITY * rise),
      targetY,
      shell: pick(SHELL_KINDS),
      palette: pick(PALETTES),
      trail: [],
    });
    this.onCue?.('launch');
    this.ensureLoop();
  }

  launchCracker(kind: CrackerKind, x: number = random(0.2, 0.8) * this.width) {
    this.crackers.push({
      kind,
      x,
      y: this.height * CRACKERS[kind].groundRatio,
      elapsed: 0,
      crackleIn: 0,
      angle: random(0, TAU),
    });
    this.onCue?.('crackle');
    this.ensureLoop();
  }

  clear() {
    this.particles = [];
    this.rockets = [];
    this.flashes = [];
    this.crackers = [];
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  destroy() {
    if (this.frameId !== null) cancelAnimationFrame(this.frameId);
    this.frameId = null;
    this.autoRunning = false;
    this.clear();
  }

  private ensureLoop() {
    if (this.frameId !== null) return;
    this.lastTime = performance.now();
    this.frameId = requestAnimationFrame(this.tick);
  }

  private hasActiveEntities() {
    return (
      this.rockets.length > 0 ||
      this.particles.length > 0 ||
      this.flashes.length > 0 ||
      this.crackers.length > 0
    );
  }

  private tick = (now: number) => {
    const dt = Math.min((now - this.lastTime) / 1000, 0.05);
    this.lastTime = now;
    const step = dt * 60;

    if (this.autoRunning) this.updateAuto(dt);
    this.updateCrackers(dt * 1000, step);
    this.updateRockets(step);
    this.updateParticles(step);
    this.updateFlashes(step);
    this.draw();

    this.frameId =
      this.autoRunning || this.hasActiveEntities()
        ? requestAnimationFrame(this.tick)
        : null;
  };

  private updateAuto(dt: number) {
    this.autoTimer -= dt;
    if (this.autoTimer > 0) return;
    this.autoTimer = random(0.6, 1.5);
    if (Math.random() < 0.2) {
      this.launchCracker(pick(CRACKER_KINDS), random(0.2, 0.8) * this.width);
    } else {
      this.launchRocket();
    }
  }

  private updateRockets(step: number) {
    const remaining: Rocket[] = [];
    for (const r of this.rockets) {
      r.trail.push({ x: r.x, y: r.y });
      if (r.trail.length > 8) r.trail.shift();
      r.x += r.vx * step;
      r.y += r.vy * step;
      r.vy += GRAVITY * step;

      if (Math.random() < 0.8) {
        this.addParticle(r.x, r.y, random(-0.3, 0.3), random(0.2, 0.8), r.palette[0], {
          life: random(18, 30), size: random(1, 1.8), gravity: 0.04, drag: 0.96,
          trail: false, twinkle: false,
        });
      }

      if (r.vy >= 0 || r.y <= r.targetY) {
        this.explodeShell(r.x, r.y, r.shell, r.palette);
      } else {
        remaining.push(r);
      }
    }
    this.rockets = remaining;
  }

  private explodeShell(x: number, y: number, shell: ShellKind, palette: string[]) {
    this.flashes.push({ x, y, life: 12, maxLife: 12, color: palette[0] });
    this.onCue?.('explode');
    this.burst(x, y, shell === 'willow' ? GOLD_PALETTE : palette, SHELL_BURSTS[shell]);
  }

  private burst(x: number, y: number, palette: string[], o: BurstOptions) {
    const offset = Math.random() * TAU;
    for (let i = 0; i < o.count; i++) {
      const angle = o.ring ? offset + (i / o.count) * TAU : random(0, TAU);
      const speed = random(o.minSpeed, o.maxSpeed);
      this.addParticle(x, y, Math.cos(angle) * speed, Math.sin(angle) * speed, pick(palette), {
        life: random(o.life[0], o.life[1]),
        size: random(o.size[0], o.size[1]),
        gravity: o.gravity,
        drag: o.drag,
        trail: o.trail,
        twinkle: false,
      });
    }
  }

  private updateCrackers(ms: number, step: number) {
    for (const c of this.crackers) {
      c.elapsed += ms;
      if (c.kind === 'phuljhari') this.emitPhuljhari(c, step);
      if (c.kind === 'chakri') this.emitChakri(c, step);
      if (c.kind === 'anar') this.emitAnar(c, step);

      c.crackleIn -= ms;
      if (c.crackleIn <= 0) {
        this.onCue?.('crackle');
        c.crackleIn = random(220, 480);
      }
    }
    this.crackers = this.crackers.filter((c) => c.elapsed < CRACKERS[c.kind].duration);
  }

  private emitPhuljhari(c: Cracker, step: number) {
    const count = Math.max(1, Math.round(3 * step));
    for (let i = 0; i < count; i++) {
      const angle = -Math.PI / 2 + random(-1, 1);
      const speed = random(0.6, 2.8);
      this.addParticle(c.x + random(-4, 4), c.y, Math.cos(angle) * speed, Math.sin(angle) * speed, pick(SPARK_COLORS), {
        life: random(30, 60), size: random(1, 2), gravity: 0.05, drag: 0.97,
        trail: false, twinkle: true,
      });
    }
  }

  private emitChakri(c: Cracker, step: number) {
    c.angle += CHAKRI_SPIN * step;
    for (let arm = 0; arm < 2; arm++) {
      const a = c.angle + arm * Math.PI;
      for (let k = 0; k < 2; k++) {
        const speed = CHAKRI_SPIN * CHAKRI_RADIUS * random(0.9, 1.3);
        this.addParticle(
          c.x + Math.cos(a) * CHAKRI_RADIUS,
          c.y + Math.sin(a) * CHAKRI_RADIUS,
          -Math.sin(a) * speed + random(-0.4, 0.4),
          Math.cos(a) * speed + random(-0.4, 0.4),
          pick(SPARK_COLORS),
          { life: random(30, 55), size: random(1.2, 2.2), gravity: 0.06, drag: 0.955, trail: true, twinkle: false },
        );
      }
    }
  }

  private emitAnar(c: Cracker, step: number) {
    const count = Math.max(1, Math.round(4 * step));
    for (let i = 0; i < count; i++) {
      const angle = -Math.PI / 2 + random(-0.35, 0.35);
      const speed = random(4, 9);
      this.addParticle(c.x + random(-3, 3), c.y, Math.cos(angle) * speed, Math.sin(angle) * speed, pick(ANAR_COLORS), {
        life: random(50, 90), size: random(1.6, 3), gravity: 0.11, drag: 0.985,
        trail: Math.random() < 0.4, twinkle: false,
      });
    }
  }

  private addParticle(
    x: number,
    y: number,
    vx: number,
    vy: number,
    color: string,
    o: { life: number; size: number; gravity: number; drag: number; trail: boolean; twinkle: boolean },
  ) {
    if (this.particles.length >= MAX_PARTICLES) return;
    this.particles.push({
      x, y, vx, vy, color,
      life: o.life,
      maxLife: o.life,
      size: o.size,
      gravity: o.gravity,
      drag: o.drag,
      trail: o.trail ? [] : null,
      twinkle: o.twinkle,
    });
  }

  private updateParticles(step: number) {
    const alive: Particle[] = [];
    for (const p of this.particles) {
      if (p.trail) {
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 5) p.trail.shift();
      }
      const damping = Math.pow(p.drag, step);
      p.vx *= damping;
      p.vy = p.vy * damping + p.gravity * step;
      p.x += p.vx * step;
      p.y += p.vy * step;
      p.life -= step;
      if (p.life > 0) alive.push(p);
    }
    this.particles = alive;
  }

  private updateFlashes(step: number) {
    for (const f of this.flashes) f.life -= step;
    this.flashes = this.flashes.filter((f) => f.life > 0);
  }

  private draw() {
    const { ctx, width, height } = this;
    ctx.clearRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'lighter';

    for (const f of this.flashes) {
      const alpha = f.life / f.maxLife;
      const gradient = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, 90);
      gradient.addColorStop(0, `rgba(255, 246, 220, ${0.85 * alpha})`);
      gradient.addColorStop(1, 'rgba(255, 200, 120, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(f.x, f.y, 90, 0, TAU);
      ctx.fill();
    }

    for (const r of this.rockets) {
      if (r.trail.length > 1) {
        ctx.globalAlpha = 0.6;
        ctx.strokeStyle = r.palette[0];
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(r.trail[0].x, r.trail[0].y);
        for (let i = 1; i < r.trail.length; i++) ctx.lineTo(r.trail[i].x, r.trail[i].y);
        ctx.lineTo(r.x, r.y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#fff8e1';
      ctx.beginPath();
      ctx.arc(r.x, r.y, 2.4, 0, TAU);
      ctx.fill();
    }

    for (const p of this.particles) {
      let alpha = Math.max(0, p.life / p.maxLife);
      if (p.twinkle) alpha *= 0.55 + Math.random() * 0.45;
      ctx.globalAlpha = alpha;
      if (p.trail && p.trail.length > 1) {
        ctx.strokeStyle = p.color;
        ctx.lineWidth = p.size;
        ctx.beginPath();
        ctx.moveTo(p.trail[0].x, p.trail[0].y);
        for (let i = 1; i < p.trail.length; i++) ctx.lineTo(p.trail[i].x, p.trail[i].y);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      }
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * (0.5 + 0.5 * alpha), 0, TAU);
      ctx.fill();
    }

    for (const c of this.crackers) this.drawCracker(c);

    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
  }

  private drawCracker(c: Cracker) {
    const { ctx } = this;
    const progress = c.elapsed / CRACKERS[c.kind].duration;
    const fade = progress > 0.85 ? (1 - progress) / 0.15 : 1;
    ctx.globalAlpha = Math.max(0, fade);

    if (c.kind === 'chakri') {
      ctx.strokeStyle = 'rgba(255, 190, 90, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(c.x, c.y, CHAKRI_RADIUS, 0, TAU);
      ctx.stroke();
    }

    const hubRadius = c.kind === 'chakri' ? 14 : 10;
    const hub = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, hubRadius);
    hub.addColorStop(0, 'rgba(255, 240, 200, 0.95)');
    hub.addColorStop(1, 'rgba(255, 170, 80, 0)');
    ctx.fillStyle = hub;
    ctx.beginPath();
    ctx.arc(c.x, c.y, hubRadius, 0, TAU);
    ctx.fill();
  }
}
