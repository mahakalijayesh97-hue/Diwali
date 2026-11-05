'use client';

import { useCallback, useEffect, useRef, useState, type ChangeEvent } from 'react';
import {
  Briefcase,
  Building2,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  Eye,
  Globe,
  Grid,
  Palette,
  RefreshCw,
  Share2,
  Sparkles,
  Trash2,
  Upload,
} from 'lucide-react';
import { SectionHeading } from './SectionHeading';

interface CardTheme {
  id: string;
  name: string;
  bgGradient: [string, string, string];
  accentColor: string;
  borderColor: string;
  glowColor: string;
  tagColor: string;
}

export type CardStyleId = 'royal' | 'arch' | 'mandala' | 'modern';

interface CardStyle {
  id: CardStyleId;
  name: string;
  badge: string;
  description: string;
  icon: string;
}

const CARD_STYLES: CardStyle[] = [
  {
    id: 'royal',
    name: 'Royal Filigree',
    badge: 'Classic Ornate',
    description: 'Hanging brass lanterns & royal gold corner flourishes',
    icon: '👑',
  },
  {
    id: 'arch',
    name: 'Temple Jharokha',
    badge: 'Palace Arch',
    description: 'Sacred cusped dome arch, temple bells & lotus finial',
    icon: '🏛️',
  },
  {
    id: 'mandala',
    name: 'Floral Mandala',
    badge: 'Sacred Bloom',
    description: 'Concentric lace mandala, lotus motifs & marigold toran',
    icon: '🌸',
  },
  {
    id: 'modern',
    name: 'Modern Luxe',
    badge: 'Minimal Gold',
    description: 'Sleek rounded double borders, diamond gems & ambient beam',
    icon: '✨',
  },
];

interface CardOccasion {
  id: string;
  name: string;
  badge: string;
  title: string;
  titleFontSize: number;
  year: string;
  tagline: string;
  icon: string;
  filenamePrefix: string;
  presetMessages: string[];
  defaultImage?: string;
  artworkLabel?: string;
}

const CARD_OCCASIONS: CardOccasion[] = [
  {
    id: 'diwali',
    name: 'Happy Diwali',
    badge: '✨ SHUBH DEEPAVALI ✨',
    title: 'Happy Diwali',
    titleFontSize: 64,
    year: '✦ 2082 ✦',
    tagline: 'MAY THE LIGHT OF DIYAS ILLUMINATE YOUR PATH WITH JOY & PROSPERITY',
    icon: '🪔',
    filenamePrefix: 'Diwali_Greeting_Card',
    artworkLabel: 'Grand Royal Diya',
    presetMessages: [
      'May the warm glow of diyas illuminate your home with boundless prosperity, health, and endless joy.',
      'Wishing you and your beloved family a sparkling, vibrant, and blessed Deepavali filled with sweet memories!',
      'May Goddess Lakshmi bless you with abundance and Lord Ganesha remove every obstacle from your path.',
      'Let this Festival of Lights kindle new beginnings, radiant hopes, and peaceful triumphs in your life.',
    ],
  },
  {
    id: 'dhanteras',
    name: 'Happy Dhanteras',
    badge: '✨ SHUBH DHANTERAS ✨',
    title: 'Happy Dhanteras',
    titleFontSize: 60,
    year: '✦ 2082 ✦',
    tagline: 'MAY GODDESS LAKSHMI BLESS YOU WITH PROSPERITY, WEALTH & GOOD HEALTH',
    icon: '🪙',
    filenamePrefix: 'Dhanteras_Greeting_Card',
    defaultImage: '/images/dhanteras_lakshmi.jpg?v=2',
    artworkLabel: 'Goddess Lakshmi & Gold Kalash',
    presetMessages: [
      'May Goddess Lakshmi bless you and your family with prosperity, happiness, and good health.',
      'Wishing you and your family immense joy, fortune, and golden prosperity on the auspicious occasion of Dhanteras.',
      'May the divine blessings of Lord Dhanvantari and Goddess Lakshmi bring supreme vitality, happiness, and success to your life.',
      'On this auspicious day of Dhanteras, may your home and life be blessed with endless abundance and joy!',
    ],
  },
  {
    id: 'new-year',
    name: 'Happy New Year',
    badge: '✨ SAAL MUBARAK & NEW YEAR ✨',
    title: 'Happy New Year',
    titleFontSize: 60,
    year: '✦ 2083 ✦',
    tagline: 'WISHING YOU ABUNDANT HEALTH, PEACE & BOUNDLESS SUCCESS IN THE NEW YEAR',
    icon: '🎉',
    filenamePrefix: 'Happy_New_Year_Card',
    artworkLabel: 'Grand Royal Diya',
    presetMessages: [
      'Wishing you and your loved ones a joyful, peaceful, and prosperous Happy New Year 2027!',
      'May the coming year unfold new opportunities, cherished blessings, and everlasting peace in your home. Saal Mubarak!',
      'Nutan Varshabhinandan! May this new chapter bring boundless success, laughter, and happiness into your home.',
      'Warmest wishes on this New Year! May every single day be filled with positivity, triumph, and abundance.',
    ],
  },
  {
    id: 'diwali-new-year',
    name: 'Diwali & New Year',
    badge: '✨ SHUBH DIWALI & SAAL MUBARAK ✨',
    title: 'Diwali & New Year',
    titleFontSize: 52,
    year: '✦ 2082-2083 ✦',
    tagline: 'CELEBRATING LIGHT, LOVE & PROSPEROUS NEW BEGINNINGS TOGETHER',
    icon: '🌟',
    filenamePrefix: 'Diwali_And_New_Year_Card',
    artworkLabel: 'Grand Royal Diya',
    presetMessages: [
      'Wishing you a sparkling Deepavali and a joyous, prosperous Happy New Year filled with sweet blessings!',
      'May the light of diyas brighten your life and the New Year usher in endless joy, peace, and good health.',
      'Happy Diwali & Saal Mubarak! May Goddess Lakshmi shower your home with abundance in the year ahead.',
      'Celebrating the triumph of light and welcoming a radiant New Year full of fresh hopes and grand achievements!',
    ],
  },
  {
    id: 'bhai-dooj',
    name: 'Happy Bhai Dooj',
    badge: '✨ SHUBH BHAI DOOJ ✨',
    title: 'Happy Bhai Dooj',
    titleFontSize: 60,
    year: '✦ 2082 ✦',
    tagline: 'MAY THE SACRED SIBLING BOND ALWAYS GROW STRONGER WITH LOVE & BLESSINGS',
    icon: '🌸',
    filenamePrefix: 'Bhai_Dooj_Greeting_Card',
    defaultImage: '/images/bhaidooj_sibling.jpg?v=2',
    artworkLabel: 'Brother & Sister Sacred Tilak',
    presetMessages: [
      'May the bond between brother and sister always grow stronger with love and blessings.',
      'Wishing a very Happy Bhai Dooj! May your bond be blessed with lifelong happiness, sweet memories, and endless joy.',
      'A sister’s heartfelt prayer and a brother’s eternal promise of care. Wishing you both a joyous and blessed Bhai Dooj!',
      'Praying for your happiness, long life, and triumphant success on this pious festival of Bhai Dooj. Stay blessed!',
    ],
  },
];

const CARD_THEMES: CardTheme[] = [
  {
    id: 'midnight-gold',
    name: 'Royal Midnight',
    bgGradient: ['#060517', '#120b33', '#050720'],
    accentColor: '#ffe08a',
    borderColor: '#f5c96a',
    glowColor: 'rgba(245, 201, 106, 0.25)',
    tagColor: 'from-amber-400 to-yellow-600',
  },
  {
    id: 'saffron-fire',
    name: 'Imperial Saffron',
    bgGradient: ['#1c041f', '#360b29', '#150314'],
    accentColor: '#ffb366',
    borderColor: '#ff8a3d',
    glowColor: 'rgba(255, 138, 61, 0.25)',
    tagColor: 'from-orange-400 to-amber-600',
  },
  {
    id: 'velvet-rose',
    name: 'Velvet Festive',
    bgGradient: ['#1a0316', '#320724', '#110210'],
    accentColor: '#ffb8da',
    borderColor: '#ff5fa2',
    glowColor: 'rgba(255, 95, 162, 0.25)',
    tagColor: 'from-pink-400 to-rose-600',
  },
  {
    id: 'royal-emerald',
    name: 'Emerald Darbar',
    bgGradient: ['#02140d', '#082a1d', '#01120b'],
    accentColor: '#a8f0cb',
    borderColor: '#4ade80',
    glowColor: 'rgba(74, 222, 128, 0.25)',
    tagColor: 'from-emerald-400 to-teal-600',
  },
  {
    id: 'heritage-bronze',
    name: 'Heritage Bronze',
    bgGradient: ['#140801', '#2c1405', '#0f0501'],
    accentColor: '#ffdf9e',
    borderColor: '#e6a93a',
    glowColor: 'rgba(230, 169, 58, 0.25)',
    tagColor: 'from-yellow-500 to-amber-700',
  },
  {
    id: 'peacock-teal',
    name: 'Peacock Sapphire',
    bgGradient: ['#02141c', '#06283d', '#010d14'],
    accentColor: '#67e8f9',
    borderColor: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.28)',
    tagColor: 'from-cyan-400 to-blue-600',
  },
  {
    id: 'ruby-maroon',
    name: 'Royal Ruby',
    bgGradient: ['#1f030a', '#3d0715', '#170207'],
    accentColor: '#fca5a5',
    borderColor: '#f43f5e',
    glowColor: 'rgba(244, 63, 94, 0.28)',
    tagColor: 'from-rose-500 to-red-700',
  },
  {
    id: 'amethyst-purple',
    name: 'Majestic Amethyst',
    bgGradient: ['#140221', '#280740', '#0f0219'],
    accentColor: '#d8b4fe',
    borderColor: '#c084fc',
    glowColor: 'rgba(192, 132, 252, 0.28)',
    tagColor: 'from-purple-400 to-indigo-600',
  },
];

// Pure canvas artwork helper functions
function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  if (typeof ctx.roundRect === 'function') {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
  } else {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }
}

function drawTempleBell(
  ctx: CanvasRenderingContext2D,
  bx: number,
  chainLen: number,
  scale: number,
  color: string,
) {
  ctx.save();
  ctx.translate(bx, 52 * scale);

  // Chain
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.6 * scale;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, chainLen);
  ctx.stroke();

  // Chain beads
  ctx.fillStyle = color;
  for (let y = 14 * scale; y < chainLen; y += 18 * scale) {
    ctx.beginPath();
    ctx.arc(0, y, 2 * scale, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.translate(0, chainLen);

  // Bell Dome
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(-16 * scale, 28 * scale);
  ctx.bezierCurveTo(-14 * scale, 6 * scale, -4 * scale, 0, 0, 0);
  ctx.bezierCurveTo(4 * scale, 0, 14 * scale, 6 * scale, 16 * scale, 28 * scale);
  ctx.lineTo(-16 * scale, 28 * scale);
  ctx.fill();

  // Bell Rim
  ctx.lineWidth = 2.5 * scale;
  ctx.strokeStyle = '#fff3cc';
  ctx.stroke();

  // Bell Clapper
  ctx.fillStyle = '#ffe08a';
  ctx.beginPath();
  ctx.arc(0, 33 * scale, 4.5 * scale, 0, Math.PI * 2);
  ctx.fill();

  // Sound vibrations aura
  ctx.strokeStyle = 'rgba(255, 224, 138, 0.4)';
  ctx.lineWidth = 1.2 * scale;
  ctx.beginPath();
  ctx.arc(0, 33 * scale, 10 * scale, 0.2 * Math.PI, 0.8 * Math.PI);
  ctx.stroke();

  ctx.restore();
}

function drawJharokhaArch(
  ctx: CanvasRenderingContext2D,
  width: number,
  scale: number,
  borderColor: string,
) {
  ctx.save();
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = 3 * scale;

  const leftX = 70 * scale;
  const rightX = width - 70 * scale;
  const archBaseY = 245 * scale;
  const apexY = 82 * scale;

  // Scalloped multi-cusp arch
  ctx.beginPath();
  ctx.moveTo(leftX, archBaseY);
  ctx.lineTo(leftX, 160 * scale);
  // 5 elegant cusps leading to apex
  ctx.quadraticCurveTo(leftX + 40 * scale, 135 * scale, leftX + 80 * scale, 145 * scale);
  ctx.quadraticCurveTo(leftX + 130 * scale, 110 * scale, leftX + 180 * scale, 120 * scale);
  ctx.quadraticCurveTo(width / 2 - 80 * scale, 75 * scale, width / 2, apexY);
  ctx.quadraticCurveTo(width / 2 + 80 * scale, 75 * scale, rightX - 180 * scale, 120 * scale);
  ctx.quadraticCurveTo(rightX - 130 * scale, 110 * scale, rightX - 80 * scale, 145 * scale);
  ctx.quadraticCurveTo(rightX - 40 * scale, 135 * scale, rightX, 160 * scale);
  ctx.lineTo(rightX, archBaseY);
  ctx.stroke();

  // Golden Lotus finial at apex
  ctx.fillStyle = borderColor;
  ctx.beginPath();
  ctx.moveTo(width / 2, apexY - 14 * scale);
  ctx.quadraticCurveTo(width / 2 + 7 * scale, apexY - 7 * scale, width / 2, apexY);
  ctx.quadraticCurveTo(width / 2 - 7 * scale, apexY - 7 * scale, width / 2, apexY - 14 * scale);
  ctx.fill();

  ctx.restore();
}

function drawMandalaLace(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  scale: number,
  color: string,
) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.strokeStyle = color;
  ctx.fillStyle = 'rgba(255, 224, 138, 0.05)';
  ctx.lineWidth = 1.2 * scale;

  // Concentric petal ring
  const count = 16;
  for (let i = 0; i < count; i++) {
    const a = (i * Math.PI * 2) / count;
    ctx.save();
    ctx.rotate(a);
    ctx.beginPath();
    ctx.ellipse(0, radius, 14 * scale, 28 * scale, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fill();
    ctx.restore();
  }

  // Radiating dots
  ctx.fillStyle = color;
  for (let i = 0; i < 32; i++) {
    const a = (i * Math.PI * 2) / 32;
    ctx.beginPath();
    ctx.arc(
      Math.cos(a) * (radius + 24 * scale),
      Math.sin(a) * (radius + 24 * scale),
      2 * scale,
      0,
      Math.PI * 2,
    );
    ctx.fill();
  }

  ctx.restore();
}

function drawDiamondCorner(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  scale: number,
  color: string,
) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.fillStyle = color;
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1.2 * scale;

  // Cut-diamond shape
  ctx.beginPath();
  ctx.moveTo(0, -11 * scale);
  ctx.lineTo(11 * scale, 0);
  ctx.lineTo(0, 11 * scale);
  ctx.lineTo(-11 * scale, 0);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Subtle diamond facet cross
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.beginPath();
  ctx.moveTo(0, -11 * scale);
  ctx.lineTo(0, 11 * scale);
  ctx.moveTo(-11 * scale, 0);
  ctx.lineTo(11 * scale, 0);
  ctx.stroke();

  ctx.restore();
}

function drawLotusCorner(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  rot: number,
  scale: number,
  color: string,
) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rot);
  ctx.fillStyle = color;
  ctx.strokeStyle = '#fff3cc';
  ctx.lineWidth = 1.2 * scale;

  // Center petal
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(12 * scale, 12 * scale, 30 * scale, 30 * scale);
  ctx.quadraticCurveTo(12 * scale, 12 * scale, 0, 0);
  ctx.fill();

  // Left petal
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(2 * scale, 18 * scale, 14 * scale, 32 * scale);
  ctx.quadraticCurveTo(10 * scale, 10 * scale, 0, 0);
  ctx.fill();

  // Right petal
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(18 * scale, 2 * scale, 32 * scale, 14 * scale);
  ctx.quadraticCurveTo(10 * scale, 10 * scale, 0, 0);
  ctx.fill();

  ctx.restore();
}

function drawOrnateDiya(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  scale: number,
  primaryColor: string,
) {
  ctx.save();
  ctx.translate(cx, cy);

  // 1. Back Mandala Rays / Petals
  const petalCount = 12;
  const petalRadius = 110 * scale;
  ctx.save();
  for (let i = 0; i < petalCount; i++) {
    ctx.rotate((Math.PI * 2) / petalCount);
    ctx.fillStyle = 'rgba(255, 224, 138, 0.16)';
    ctx.strokeStyle = 'rgba(255, 224, 138, 0.4)';
    ctx.lineWidth = 1 * scale;
    ctx.beginPath();
    ctx.ellipse(0, -petalRadius, 14 * scale, 32 * scale, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
  ctx.restore();

  // Concentric bead ring
  ctx.strokeStyle = 'rgba(245, 201, 106, 0.35)';
  ctx.lineWidth = 1.5 * scale;
  ctx.beginPath();
  ctx.arc(0, 0, 130 * scale, 0, Math.PI * 2);
  ctx.stroke();

  // Small dots around ring
  for (let i = 0; i < 24; i++) {
    const a = (i * Math.PI * 2) / 24;
    ctx.fillStyle = primaryColor;
    ctx.beginPath();
    ctx.arc(Math.cos(a) * 130 * scale, Math.sin(a) * 130 * scale, 2.5 * scale, 0, Math.PI * 2);
    ctx.fill();
  }

  // 2. Flame Aura Halo
  const halo = ctx.createRadialGradient(0, -25 * scale, 5 * scale, 0, -25 * scale, 120 * scale);
  halo.addColorStop(0, 'rgba(255, 245, 180, 0.98)');
  halo.addColorStop(0.3, 'rgba(255, 160, 60, 0.7)');
  halo.addColorStop(0.65, 'rgba(255, 80, 120, 0.25)');
  halo.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.arc(0, -25 * scale, 120 * scale, 0, Math.PI * 2);
  ctx.fill();

  // 3. Brass / Terracotta Diya Bowl
  const bowlGrad = ctx.createLinearGradient(-90 * scale, 0, 90 * scale, 70 * scale);
  bowlGrad.addColorStop(0, '#fff3cc');
  bowlGrad.addColorStop(0.25, '#ffe08a');
  bowlGrad.addColorStop(0.6, '#e6a93a');
  bowlGrad.addColorStop(1, '#662f0a');
  ctx.fillStyle = bowlGrad;

  // Sculpted Diya shape with curled rim
  ctx.beginPath();
  ctx.moveTo(-95 * scale, 5 * scale);
  ctx.quadraticCurveTo(-105 * scale, -8 * scale, -80 * scale, -5 * scale);
  ctx.quadraticCurveTo(0, 18 * scale, 80 * scale, -5 * scale);
  ctx.quadraticCurveTo(105 * scale, -8 * scale, 95 * scale, 5 * scale);
  ctx.quadraticCurveTo(80 * scale, 75 * scale, 0, 85 * scale);
  ctx.quadraticCurveTo(-80 * scale, 75 * scale, -95 * scale, 5 * scale);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = '#fff6d6';
  ctx.lineWidth = 3 * scale;
  ctx.stroke();

  // Diya rim engravings
  ctx.strokeStyle = 'rgba(102, 47, 10, 0.5)';
  ctx.lineWidth = 1.5 * scale;
  ctx.beginPath();
  ctx.moveTo(-65 * scale, 20 * scale);
  ctx.quadraticCurveTo(0, 35 * scale, 65 * scale, 20 * scale);
  ctx.stroke();

  // Small etched dots on bowl
  ctx.fillStyle = '#fff3cc';
  for (let x = -50 * scale; x <= 50 * scale; x += 18 * scale) {
    ctx.beginPath();
    ctx.arc(x, 42 * scale - Math.abs(x) * 0.15, 2.5 * scale, 0, Math.PI * 2);
    ctx.fill();
  }

  // 4. Multi-layer Sacred Flame
  const flameOuter = ctx.createLinearGradient(0, 10 * scale, 0, -115 * scale);
  flameOuter.addColorStop(0, '#ff4d00');
  flameOuter.addColorStop(0.4, '#ff9e24');
  flameOuter.addColorStop(0.85, '#ffe680');
  flameOuter.addColorStop(1, '#ffffff');
  ctx.fillStyle = flameOuter;
  ctx.beginPath();
  ctx.moveTo(0, 5 * scale);
  ctx.bezierCurveTo(-34 * scale, -25 * scale, -30 * scale, -75 * scale, 0, -115 * scale);
  ctx.bezierCurveTo(30 * scale, -75 * scale, 34 * scale, -25 * scale, 0, 5 * scale);
  ctx.fill();

  // Inner glowing core
  const flameInner = ctx.createLinearGradient(0, 5 * scale, 0, -75 * scale);
  flameInner.addColorStop(0, '#ffc04d');
  flameInner.addColorStop(0.5, '#fff4b8');
  flameInner.addColorStop(1, '#ffffff');
  ctx.fillStyle = flameInner;
  ctx.beginPath();
  ctx.moveTo(0, 2 * scale);
  ctx.bezierCurveTo(-16 * scale, -18 * scale, -14 * scale, -55 * scale, 0, -80 * scale);
  ctx.bezierCurveTo(14 * scale, -55 * scale, 16 * scale, -18 * scale, 0, 2 * scale);
  ctx.fill();

  ctx.restore();
}

function drawBottomDiyaTrio(
  ctx: CanvasRenderingContext2D,
  width: number,
  baseY: number,
  scaleFactor: number,
  primaryColor: string,
  scaleMultiplier: number = 1,
) {
  // Garland arch connecting them
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 224, 138, 0.4)';
  ctx.lineWidth = 1.5 * scaleFactor;
  ctx.setLineDash([4 * scaleFactor, 4 * scaleFactor]);
  ctx.beginPath();
  ctx.moveTo(width / 2 - 380 * scaleFactor * scaleMultiplier, baseY + 45 * scaleFactor * scaleMultiplier);
  ctx.quadraticCurveTo(
    width / 2 - 135 * scaleFactor * scaleMultiplier,
    baseY + 65 * scaleFactor * scaleMultiplier,
    width / 2,
    baseY + 55 * scaleFactor * scaleMultiplier,
  );
  ctx.quadraticCurveTo(
    width / 2 + 135 * scaleFactor * scaleMultiplier,
    baseY + 65 * scaleFactor * scaleMultiplier,
    width / 2 + 380 * scaleFactor * scaleMultiplier,
    baseY + 45 * scaleFactor * scaleMultiplier,
  );
  ctx.stroke();
  ctx.restore();

  // Center Diya
  drawOrnateDiya(ctx, width / 2, baseY, 0.65 * scaleFactor * scaleMultiplier, primaryColor);
  // Left flanking Diya
  drawOrnateDiya(
    ctx,
    width / 2 - 270 * scaleFactor * scaleMultiplier,
    baseY + 12 * scaleFactor * scaleMultiplier,
    0.45 * scaleFactor * scaleMultiplier,
    primaryColor,
  );
  // Right flanking Diya
  drawOrnateDiya(
    ctx,
    width / 2 + 270 * scaleFactor * scaleMultiplier,
    baseY + 12 * scaleFactor * scaleMultiplier,
    0.45 * scaleFactor * scaleMultiplier,
    primaryColor,
  );
}

interface MiniColorCardProps {
  theme: CardTheme;
  cardStyle: CardStyleId;
  isSelected: boolean;
  onSelect: () => void;
  onDownload: () => void;
  isGenerating: boolean;
  renderCardToCanvas: (
    canvas: HTMLCanvasElement,
    scaleFactor?: number,
    themeOverride?: CardTheme,
    styleOverride?: CardStyleId,
  ) => Promise<void>;
}

function MiniColorCard({
  theme,
  cardStyle,
  isSelected,
  onSelect,
  onDownload,
  isGenerating,
  renderCardToCanvas,
}: MiniColorCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      void renderCardToCanvas(canvasRef.current, 0.28, theme, cardStyle);
    }
  }, [renderCardToCanvas, theme, cardStyle]);

  return (
    <div
      className={`group flex flex-col rounded-2xl border p-2 sm:p-2.5 transition-all duration-300 ${
        isSelected
          ? 'border-diwali-gold-400 bg-diwali-gold-400/15 ring-2 ring-diwali-gold-400/60 shadow-[0_0_25px_rgba(245,201,106,0.35)]'
          : 'border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10'
      }`}
    >
      <div
        onClick={onSelect}
        className="cursor-pointer relative w-full aspect-[1080/1350] rounded-xl overflow-hidden bg-black/40 border border-white/10 group-hover:border-diwali-gold-400/50 transition"
      >
        <canvas ref={canvasRef} className="w-full h-full object-contain block" />
        {isSelected && (
          <span className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-diwali-gold-400 px-2 py-0.5 text-[10px] font-bold text-diwali-night shadow-md">
            <Check className="h-2.5 w-2.5 stroke-[3]" />
            Active
          </span>
        )}
      </div>

      <div className="mt-2.5 flex items-center justify-between gap-1.5">
        <p className="text-xs font-semibold text-white truncate min-w-0">{theme.name}</p>

        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={onSelect}
            className={`rounded-lg px-2.5 py-1 text-xs font-medium transition ${
              isSelected
                ? 'bg-diwali-gold-400 text-diwali-night font-semibold'
                : 'border border-white/15 bg-white/5 text-white/75 hover:bg-white/15 hover:text-white'
            }`}
          >
            {isSelected ? 'Active' : 'Select'}
          </button>
          <button
            type="button"
            onClick={onDownload}
            disabled={isGenerating}
            title={`Download ${theme.name} HD (PNG)`}
            className="rounded-lg border border-diwali-gold-400/40 bg-diwali-gold-400/10 p-1.5 text-diwali-gold-300 hover:bg-diwali-gold-400 hover:text-diwali-night transition"
          >
            <Download className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

interface MiniStyleCardProps {
  styleItem: CardStyle;
  theme: CardTheme;
  isSelected: boolean;
  onSelect: () => void;
  onDownload: () => void;
  isGenerating: boolean;
  renderCardToCanvas: (
    canvas: HTMLCanvasElement,
    scaleFactor?: number,
    themeOverride?: CardTheme,
    styleOverride?: CardStyleId,
  ) => Promise<void>;
}

function MiniStyleCard({
  styleItem,
  theme,
  isSelected,
  onSelect,
  onDownload,
  isGenerating,
  renderCardToCanvas,
}: MiniStyleCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      void renderCardToCanvas(canvasRef.current, 0.28, theme, styleItem.id);
    }
  }, [renderCardToCanvas, theme, styleItem.id]);

  return (
    <div
      className={`group flex flex-col rounded-2xl border p-2 sm:p-2.5 transition-all duration-300 ${
        isSelected
          ? 'border-diwali-gold-400 bg-diwali-gold-400/15 ring-2 ring-diwali-gold-400/60 shadow-[0_0_25px_rgba(245,201,106,0.35)]'
          : 'border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10'
      }`}
    >
      <div
        onClick={onSelect}
        className="cursor-pointer relative w-full aspect-[1080/1350] rounded-xl overflow-hidden bg-black/40 border border-white/10 group-hover:border-diwali-gold-400/50 transition"
      >
        <canvas ref={canvasRef} className="w-full h-full object-contain block" />
        {isSelected && (
          <span className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-diwali-gold-400 px-2 py-0.5 text-[10px] font-bold text-diwali-night shadow-md">
            <Check className="h-2.5 w-2.5 stroke-[3]" />
            Active
          </span>
        )}
        <span className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-black/75 backdrop-blur-sm px-2.5 py-1 text-[11px] font-semibold text-diwali-gold-200 border border-white/15">
          <span>{styleItem.icon}</span>
          <span>{styleItem.name}</span>
        </span>
      </div>

      <div className="mt-2.5 flex items-center justify-between gap-1.5">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-white truncate">{styleItem.name}</p>
          <p className="text-[10px] text-white/50 truncate">{styleItem.badge}</p>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={onSelect}
            className={`rounded-lg px-2.5 py-1 text-xs font-medium transition ${
              isSelected
                ? 'bg-diwali-gold-400 text-diwali-night font-semibold'
                : 'border border-white/15 bg-white/5 text-white/75 hover:bg-white/15 hover:text-white'
            }`}
          >
            {isSelected ? 'Active' : 'Apply'}
          </button>
          <button
            type="button"
            onClick={onDownload}
            disabled={isGenerating}
            title={`Download ${styleItem.name} HD (PNG)`}
            className="rounded-lg border border-diwali-gold-400/40 bg-diwali-gold-400/10 p-1.5 text-diwali-gold-300 hover:bg-diwali-gold-400 hover:text-diwali-night transition"
          >
            <Download className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function CardCreatorSection() {
  const [occasionId, setOccasionId] = useState<string>('diwali');
  const [cardStyle, setCardStyle] = useState<CardStyleId>('royal');
  const [senderName, setSenderName] = useState('The Sharma Family');
  const [recipientName, setRecipientName] = useState('Dearest Friends & Family');
  const [themeId, setThemeId] = useState<string>('midnight-gold');
  const [userImage, setUserImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [textCopied, setTextCopied] = useState(false);
  const [previewView, setPreviewView] = useState<'single' | 'styles' | 'colors'>('single');

  // Company / Corporate Branding Footer State
  const [companyName, setCompanyName] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [companyTagline, setCompanyTagline] = useState('');
  const [companyLogo, setCompanyLogo] = useState<string | null>(null);
  const [companyLogoSize, setCompanyLogoSize] = useState<'md' | 'lg' | 'xl'>('lg');
  const [companyFooterLayout, setCompanyFooterLayout] = useState<'crest' | 'banner'>('crest');
  const companyLogoInputRef = useRef<HTMLInputElement>(null);

  const currentThemeIndex = CARD_THEMES.findIndex((t) => t.id === themeId);

  const handlePrevTheme = () => {
    const nextIdx = (currentThemeIndex - 1 + CARD_THEMES.length) % CARD_THEMES.length;
    setThemeId(CARD_THEMES[nextIdx].id);
  };

  const handleNextTheme = () => {
    const nextIdx = (currentThemeIndex + 1) % CARD_THEMES.length;
    setThemeId(CARD_THEMES[nextIdx].id);
  };

  const currentOccasion =
    CARD_OCCASIONS.find((o) => o.id === occasionId) ?? CARD_OCCASIONS[0];
  const [message, setMessage] = useState(CARD_OCCASIONS[0].presetMessages[0]);

  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentTheme = CARD_THEMES.find((t) => t.id === themeId) ?? CARD_THEMES[0];

  const handleOccasionChange = (newOccasionId: string) => {
    setOccasionId(newOccasionId);
    const newOccasion =
      CARD_OCCASIONS.find((o) => o.id === newOccasionId) ?? CARD_OCCASIONS[0];
    const allPresets = CARD_OCCASIONS.flatMap((o) => o.presetMessages);
    if (!message || allPresets.includes(message)) {
      setMessage(newOccasion.presetMessages[0]);
    }
  };

  // Handle image upload
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setUserImage(result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setUserImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleCompanyLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPG, SVG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setCompanyLogo(result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveCompanyLogo = () => {
    setCompanyLogo(null);
    if (companyLogoInputRef.current) companyLogoInputRef.current.value = '';
  };

  const handleQuickFillCompany = () => {
    setCompanyName('Vanjata Jayesh');
    setCompanyWebsite('https://jayesh-dev.vercel.app/');
    setCompanyTagline('Web & Software Development');
  };

  // Cached image loader for smooth performance & instant canvas renders
  const imageCacheRef = useRef<Map<string, HTMLImageElement>>(new Map());

  const loadImage = useCallback((src: string): Promise<HTMLImageElement> => {
    if (imageCacheRef.current.has(src)) {
      return Promise.resolve(imageCacheRef.current.get(src)!);
    }
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        imageCacheRef.current.set(src, img);
        resolve(img);
      };
      img.onerror = (err) => reject(err);
      img.src = src;
    });
  }, []);

  // ==========================================
  // MASTER CANVAS RENDERER (1080 x 1350)
  // Supports 4 Distinct UI Creation Styles & 8 Royal Color Themes
  // ==========================================
  const renderCardToCanvas = useCallback(
    async (
      canvas: HTMLCanvasElement,
      scaleFactor: number = 1,
      themeOverride?: CardTheme,
      styleOverride?: CardStyleId,
    ) => {
      const activeTheme = themeOverride ?? currentTheme;
      const activeStyle = styleOverride ?? cardStyle;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = 1080 * scaleFactor;
      const height = 1350 * scaleFactor;
      canvas.width = width;
      canvas.height = height;

      // 1. Rich Background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, activeTheme.bgGradient[0]);
      bgGrad.addColorStop(0.5, activeTheme.bgGradient[1]);
      bgGrad.addColorStop(1, activeTheme.bgGradient[2]);
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Centerpiece geometry reference for backdrops & mandalas
      const photoCenterY = 415 * scaleFactor;

      // 2. Central ambient glowing aura
      const radialGlow = ctx.createRadialGradient(
        width / 2,
        photoCenterY,
        60 * scaleFactor,
        width / 2,
        photoCenterY,
        500 * scaleFactor,
      );
      radialGlow.addColorStop(0, 'rgba(255, 224, 138, 0.28)');
      radialGlow.addColorStop(0.4, activeTheme.glowColor);
      radialGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, width, height);

      // Bottom ambient glow for the bottom diyas
      const bottomGlow = ctx.createRadialGradient(
        width / 2,
        1080 * scaleFactor,
        40 * scaleFactor,
        width / 2,
        1080 * scaleFactor,
        400 * scaleFactor,
      );
      bottomGlow.addColorStop(0, 'rgba(255, 200, 100, 0.3)');
      bottomGlow.addColorStop(0.5, activeTheme.glowColor);
      bottomGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = bottomGlow;
      ctx.fillRect(0, 0, width, height);

      // Subtle twinkling starfield
      ctx.fillStyle = 'rgba(255, 245, 215, 0.45)';
      const seedStars = [
        { x: 0.12, y: 0.14, r: 2.2 },
        { x: 0.88, y: 0.13, r: 2.8 },
        { x: 0.08, y: 0.72, r: 1.8 },
        { x: 0.92, y: 0.74, r: 2.5 },
        { x: 0.15, y: 0.42, r: 1.6 },
        { x: 0.85, y: 0.44, r: 2.0 },
        { x: 0.5, y: 0.08, r: 2.2 },
        { x: 0.28, y: 0.22, r: 1.5 },
        { x: 0.72, y: 0.22, r: 1.5 },
        { x: 0.18, y: 0.92, r: 1.8 },
        { x: 0.82, y: 0.92, r: 1.8 },
      ];
      seedStars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x * width, star.y * height, star.r * scaleFactor, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Card UI Style Specific Borders, Corners & Architectural Accents
      const outerMargin = 38 * scaleFactor;
      const innerMargin = 52 * scaleFactor;

      if (activeStyle === 'modern') {
        // STYLE: Modern Luxe (Double rounded sleek borders + diamond cut corners + light rays)
        const outerR = 26 * scaleFactor;
        const innerR = 18 * scaleFactor;

        ctx.strokeStyle = activeTheme.borderColor;
        ctx.lineWidth = 3.5 * scaleFactor;
        drawRoundedRect(ctx, outerMargin, outerMargin, width - outerMargin * 2, height - outerMargin * 2, outerR);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(255, 240, 180, 0.4)';
        ctx.lineWidth = 1.5 * scaleFactor;
        drawRoundedRect(ctx, innerMargin, innerMargin, width - innerMargin * 2, height - innerMargin * 2, innerR);
        ctx.stroke();

        // 4 Diamond cut jewel corners
        drawDiamondCorner(ctx, innerMargin + 4 * scaleFactor, innerMargin + 4 * scaleFactor, scaleFactor, activeTheme.borderColor);
        drawDiamondCorner(ctx, width - innerMargin - 4 * scaleFactor, innerMargin + 4 * scaleFactor, scaleFactor, activeTheme.borderColor);
        drawDiamondCorner(ctx, width - innerMargin - 4 * scaleFactor, height - innerMargin - 4 * scaleFactor, scaleFactor, activeTheme.borderColor);
        drawDiamondCorner(ctx, innerMargin + 4 * scaleFactor, height - innerMargin - 4 * scaleFactor, scaleFactor, activeTheme.borderColor);

        // Ambient side vertical accent lines
        ctx.save();
        ctx.strokeStyle = activeTheme.borderColor;
        ctx.lineWidth = 1.2 * scaleFactor;
        ctx.setLineDash([4 * scaleFactor, 6 * scaleFactor]);
        ctx.beginPath();
        ctx.moveTo(innerMargin + 12 * scaleFactor, 220 * scaleFactor);
        ctx.lineTo(innerMargin + 12 * scaleFactor, height - 220 * scaleFactor);
        ctx.moveTo(width - innerMargin - 12 * scaleFactor, 220 * scaleFactor);
        ctx.lineTo(width - innerMargin - 12 * scaleFactor, height - 220 * scaleFactor);
        ctx.stroke();
        ctx.restore();

      } else if (activeStyle === 'arch') {
        // STYLE: Temple Jharokha (Palace Cusped Dome Arch + Sacred Temple Bells + Lotus Corners)
        ctx.strokeStyle = activeTheme.borderColor;
        ctx.lineWidth = 3.5 * scaleFactor;
        ctx.strokeRect(outerMargin, outerMargin, width - outerMargin * 2, height - outerMargin * 2);

        ctx.strokeStyle = 'rgba(255, 240, 180, 0.38)';
        ctx.lineWidth = 1.5 * scaleFactor;
        ctx.strokeRect(innerMargin, innerMargin, width - innerMargin * 2, height - innerMargin * 2);

        // 4 Lotus Corners
        drawLotusCorner(ctx, innerMargin, innerMargin, 0, scaleFactor, activeTheme.borderColor);
        drawLotusCorner(ctx, width - innerMargin, innerMargin, Math.PI * 0.5, scaleFactor, activeTheme.borderColor);
        drawLotusCorner(ctx, width - innerMargin, height - innerMargin, Math.PI, scaleFactor, activeTheme.borderColor);
        drawLotusCorner(ctx, innerMargin, height - innerMargin, Math.PI * 1.5, scaleFactor, activeTheme.borderColor);

        // Cusped Palace Jharokha Arch
        drawJharokhaArch(ctx, width, scaleFactor, activeTheme.borderColor);

        // Hanging sacred brass bells with sound vibrations
        drawTempleBell(ctx, 130 * scaleFactor, 130 * scaleFactor, 0.88 * scaleFactor, activeTheme.borderColor);
        drawTempleBell(ctx, width - 130 * scaleFactor, 130 * scaleFactor, 0.88 * scaleFactor, activeTheme.borderColor);
        drawTempleBell(ctx, 215 * scaleFactor, 85 * scaleFactor, 0.68 * scaleFactor, activeTheme.borderColor);
        drawTempleBell(ctx, width - 215 * scaleFactor, 85 * scaleFactor, 0.68 * scaleFactor, activeTheme.borderColor);

      } else if (activeStyle === 'mandala') {
        // STYLE: Floral Mandala (Fine Inset Beaded Border + Sacred Center Lace Mandala + Lotus Corners)
        ctx.strokeStyle = activeTheme.borderColor;
        ctx.lineWidth = 3.5 * scaleFactor;
        ctx.strokeRect(outerMargin, outerMargin, width - outerMargin * 2, height - outerMargin * 2);

        ctx.strokeStyle = 'rgba(255, 240, 180, 0.38)';
        ctx.lineWidth = 1.5 * scaleFactor;
        ctx.strokeRect(innerMargin, innerMargin, width - innerMargin * 2, height - innerMargin * 2);

        // Inset beaded dashed border
        ctx.save();
        ctx.strokeStyle = activeTheme.borderColor;
        ctx.lineWidth = 1.2 * scaleFactor;
        ctx.setLineDash([4 * scaleFactor, 5 * scaleFactor]);
        const midMargin = (outerMargin + innerMargin) / 2;
        ctx.strokeRect(midMargin, midMargin, width - midMargin * 2, height - midMargin * 2);
        ctx.restore();

        // 4 Lotus Corners
        drawLotusCorner(ctx, innerMargin, innerMargin, 0, scaleFactor, activeTheme.borderColor);
        drawLotusCorner(ctx, width - innerMargin, innerMargin, Math.PI * 0.5, scaleFactor, activeTheme.borderColor);
        drawLotusCorner(ctx, width - innerMargin, height - innerMargin, Math.PI, scaleFactor, activeTheme.borderColor);
        drawLotusCorner(ctx, innerMargin, height - innerMargin, Math.PI * 1.5, scaleFactor, activeTheme.borderColor);

        // Center Sacred Mandala Lace behind photo/diya
        drawMandalaLace(ctx, width / 2, photoCenterY, 185 * scaleFactor, scaleFactor, activeTheme.borderColor);

        // Top Brass Bells
        drawTempleBell(ctx, 140 * scaleFactor, 95 * scaleFactor, 0.75 * scaleFactor, activeTheme.borderColor);
        drawTempleBell(ctx, width - 140 * scaleFactor, 95 * scaleFactor, 0.75 * scaleFactor, activeTheme.borderColor);

        // Festive garland arc
        ctx.save();
        ctx.strokeStyle = 'rgba(255, 224, 138, 0.35)';
        ctx.lineWidth = 1.2 * scaleFactor;
        ctx.setLineDash([3 * scaleFactor, 3 * scaleFactor]);
        ctx.beginPath();
        ctx.moveTo(140 * scaleFactor, innerMargin + 30 * scaleFactor);
        ctx.quadraticCurveTo(
          width / 2,
          innerMargin + 65 * scaleFactor,
          width - 140 * scaleFactor,
          innerMargin + 30 * scaleFactor,
        );
        ctx.stroke();
        ctx.restore();

      } else {
        // STYLE: Royal Filigree (Default: Classic Ornate Brackets + Hanging Brass Lanterns)
        ctx.strokeStyle = activeTheme.borderColor;
        ctx.lineWidth = 3.5 * scaleFactor;
        ctx.strokeRect(outerMargin, outerMargin, width - outerMargin * 2, height - outerMargin * 2);

        ctx.strokeStyle = 'rgba(255, 240, 180, 0.38)';
        ctx.lineWidth = 1.5 * scaleFactor;
        ctx.strokeRect(innerMargin, innerMargin, width - innerMargin * 2, height - innerMargin * 2);

        // Royal corner filigree ornaments (all 4 corners)
        const drawRoyalCorner = (cx: number, cy: number, rot: number) => {
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(rot);
          ctx.strokeStyle = activeTheme.borderColor;
          ctx.fillStyle = activeTheme.borderColor;
          ctx.lineWidth = 2.5 * scaleFactor;

          // Outer corner bracket
          ctx.beginPath();
          ctx.moveTo(0, 48 * scaleFactor);
          ctx.lineTo(0, 0);
          ctx.lineTo(48 * scaleFactor, 0);
          ctx.stroke();

          // Curved flourish arc
          ctx.lineWidth = 1.8 * scaleFactor;
          ctx.beginPath();
          ctx.arc(30 * scaleFactor, 30 * scaleFactor, 30 * scaleFactor, Math.PI, 1.5 * Math.PI);
          ctx.stroke();

          // Leaf petal
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.quadraticCurveTo(18 * scaleFactor, 4 * scaleFactor, 26 * scaleFactor, 26 * scaleFactor);
          ctx.quadraticCurveTo(4 * scaleFactor, 18 * scaleFactor, 0, 0);
          ctx.fill();

          // Corner jewel
          ctx.beginPath();
          ctx.arc(14 * scaleFactor, 14 * scaleFactor, 3.5 * scaleFactor, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        };

        drawRoyalCorner(innerMargin, innerMargin, 0);
        drawRoyalCorner(width - innerMargin, innerMargin, Math.PI * 0.5);
        drawRoyalCorner(width - innerMargin, height - innerMargin, Math.PI);
        drawRoyalCorner(innerMargin, height - innerMargin, Math.PI * 1.5);

        // 4 Hanging Decorative Brass Lanterns
        const drawHangingLantern = (lx: number, chainLen: number, lScale: number) => {
          ctx.save();
          ctx.translate(lx, innerMargin);

          // Chain
          ctx.strokeStyle = 'rgba(255, 224, 138, 0.7)';
          ctx.lineWidth = 1.5 * scaleFactor;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(0, chainLen);
          ctx.stroke();

          // Chain beads
          ctx.fillStyle = activeTheme.borderColor;
          for (let y = 14 * scaleFactor; y < chainLen; y += 18 * scaleFactor) {
            ctx.beginPath();
            ctx.arc(0, y, 2 * scaleFactor, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.translate(0, chainLen);

          // Lantern cap
          ctx.fillStyle = activeTheme.borderColor;
          ctx.beginPath();
          ctx.moveTo(-16 * lScale, 0);
          ctx.lineTo(16 * lScale, 0);
          ctx.lineTo(11 * lScale, 8 * lScale);
          ctx.lineTo(-11 * lScale, 8 * lScale);
          ctx.closePath();
          ctx.fill();

          // Lantern glowing aura
          const lGlow = ctx.createRadialGradient(0, 24 * lScale, 2 * lScale, 0, 24 * lScale, 40 * lScale);
          lGlow.addColorStop(0, 'rgba(255, 240, 180, 0.95)');
          lGlow.addColorStop(0.4, 'rgba(255, 140, 50, 0.6)');
          lGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = lGlow;
          ctx.beginPath();
          ctx.arc(0, 24 * lScale, 40 * lScale, 0, Math.PI * 2);
          ctx.fill();

          // Glass Body
          ctx.fillStyle = 'rgba(255, 200, 100, 0.3)';
          ctx.strokeStyle = activeTheme.borderColor;
          ctx.lineWidth = 2 * lScale;
          ctx.beginPath();
          ctx.moveTo(-11 * lScale, 8 * lScale);
          ctx.lineTo(-18 * lScale, 26 * lScale);
          ctx.lineTo(0, 44 * lScale);
          ctx.lineTo(18 * lScale, 26 * lScale);
          ctx.lineTo(11 * lScale, 8 * lScale);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          // Inner glowing core
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(0, 24 * lScale, 4 * lScale, 0, Math.PI * 2);
          ctx.fill();

          // Bottom Tassel
          ctx.strokeStyle = activeTheme.borderColor;
          ctx.lineWidth = 1.5 * lScale;
          ctx.beginPath();
          ctx.moveTo(0, 44 * lScale);
          ctx.lineTo(0, 62 * lScale);
          ctx.stroke();

          ctx.fillStyle = activeTheme.borderColor;
          ctx.beginPath();
          ctx.arc(0, 64 * lScale, 3 * lScale, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        };

        drawHangingLantern(140 * scaleFactor, 100 * scaleFactor, 0.85 * scaleFactor);
        drawHangingLantern(width - 140 * scaleFactor, 100 * scaleFactor, 0.85 * scaleFactor);
        drawHangingLantern(225 * scaleFactor, 65 * scaleFactor, 0.65 * scaleFactor);
        drawHangingLantern(width - 225 * scaleFactor, 65 * scaleFactor, 0.65 * scaleFactor);

        // Top festoon garland arc
        ctx.save();
        ctx.strokeStyle = 'rgba(255, 224, 138, 0.35)';
        ctx.lineWidth = 1.2 * scaleFactor;
        ctx.setLineDash([3 * scaleFactor, 3 * scaleFactor]);
        ctx.beginPath();
        ctx.moveTo(140 * scaleFactor, innerMargin + 30 * scaleFactor);
        ctx.quadraticCurveTo(
          width / 2,
          innerMargin + 65 * scaleFactor,
          width - 140 * scaleFactor,
          innerMargin + 30 * scaleFactor,
        );
        ctx.stroke();
        ctx.restore();
      }

      // 5. Header: Occasion Badge
      ctx.textAlign = 'center';
      ctx.fillStyle = activeTheme.accentColor;
      ctx.font = `600 ${22 * scaleFactor}px 'Manrope', sans-serif`;
      ctx.fillText(currentOccasion.badge, width / 2, 110 * scaleFactor);

      // Top Title: Occasion (e.g. Happy Diwali / Happy New Year)
      const titleGrad = ctx.createLinearGradient(
        width / 2 - 220 * scaleFactor,
        0,
        width / 2 + 220 * scaleFactor,
        0,
      );
      titleGrad.addColorStop(0, '#ffffff');
      titleGrad.addColorStop(0.25, '#ffe08a');
      titleGrad.addColorStop(0.65, '#f5c96a');
      titleGrad.addColorStop(1, '#ff9e42');
      ctx.fillStyle = titleGrad;
      ctx.font = `bold ${currentOccasion.titleFontSize * scaleFactor}px 'Cormorant Garamond', Georgia, serif`;
      ctx.shadowColor = 'rgba(245, 201, 106, 0.45)';
      ctx.shadowBlur = 18 * scaleFactor;
      ctx.fillText(currentOccasion.title, width / 2, 178 * scaleFactor);
      ctx.shadowBlur = 0; // reset

      // Year badge
      ctx.fillStyle = 'rgba(255, 240, 200, 0.85)';
      ctx.font = `500 ${18 * scaleFactor}px 'Manrope', sans-serif`;
      ctx.fillText(currentOccasion.year, width / 2, 218 * scaleFactor);

      // 6. Centerpiece: User Uploaded Photo OR Festive Occasion Artwork OR Grand Royal Diya
      const isComboOccasion = !userImage && currentOccasion.id === 'dhanteras-bhai-dooj';

      if (userImage || currentOccasion.defaultImage) {
        const imageSrc = userImage || currentOccasion.defaultImage!;
        try {
          const img = await loadImage(imageSrc);

          if (isComboOccasion) {
            // Draw wide festive panorama for Dhanteras & Bhai Dooj combo
            const frameW = 590 * scaleFactor;
            const frameH = 345 * scaleFactor;
            const frameX = (width - frameW) / 2;
            const frameY = photoCenterY - frameH / 2;
            const frameR = 20 * scaleFactor;

            // Outer golden glow
            ctx.save();
            ctx.shadowColor = activeTheme.glowColor;
            ctx.shadowBlur = 24 * scaleFactor;

            // Outer gold border
            ctx.strokeStyle = activeTheme.borderColor;
            ctx.lineWidth = 4 * scaleFactor;
            drawRoundedRect(ctx, frameX, frameY, frameW, frameH, frameR);
            ctx.stroke();
            ctx.restore();

            // Clipped Artwork
            ctx.save();
            drawRoundedRect(ctx, frameX, frameY, frameW, frameH, frameR);
            ctx.clip();
            ctx.drawImage(img, frameX, frameY, frameW, frameH);
            ctx.restore();

            // Inner subtle gold rim
            ctx.save();
            ctx.strokeStyle = 'rgba(255, 240, 180, 0.65)';
            ctx.lineWidth = 1.8 * scaleFactor;
            const innerPad = 4 * scaleFactor;
            drawRoundedRect(
              ctx,
              frameX + innerPad,
              frameY + innerPad,
              frameW - innerPad * 2,
              frameH - innerPad * 2,
              Math.max(4, frameR - innerPad),
            );
            ctx.stroke();
            ctx.restore();

            // Decorative corner gold beads on the frame
            const beadCoords = [
              [frameX + 12 * scaleFactor, frameY + 12 * scaleFactor],
              [frameX + frameW - 12 * scaleFactor, frameY + 12 * scaleFactor],
              [frameX + frameW - 12 * scaleFactor, frameY + frameH - 12 * scaleFactor],
              [frameX + 12 * scaleFactor, frameY + frameH - 12 * scaleFactor],
            ];
            ctx.fillStyle = activeTheme.borderColor;
            beadCoords.forEach(([bx, by]) => {
              ctx.beginPath();
              ctx.arc(bx, by, 3.5 * scaleFactor, 0, Math.PI * 2);
              ctx.fill();
            });
          } else {
            // Circular royal medallion (User Photo, Dhanteras Lakshmi, or Bhai Dooj Sibling)
            const photoRadius = 140 * scaleFactor;

            // Outer radiating golden beads
            for (let i = 0; i < 28; i++) {
              const a = (i * Math.PI * 2) / 28;
              ctx.fillStyle = activeTheme.borderColor;
              ctx.beginPath();
              ctx.arc(
                width / 2 + Math.cos(a) * (photoRadius + 18 * scaleFactor),
                photoCenterY + Math.sin(a) * (photoRadius + 18 * scaleFactor),
                3 * scaleFactor,
                0,
                Math.PI * 2,
              );
              ctx.fill();
            }

            // Outer decorative glowing ring
            ctx.save();
            ctx.strokeStyle = activeTheme.borderColor;
            ctx.lineWidth = 4.5 * scaleFactor;
            ctx.shadowColor = 'rgba(245, 201, 106, 0.65)';
            ctx.shadowBlur = 22 * scaleFactor;
            ctx.beginPath();
            ctx.arc(width / 2, photoCenterY, photoRadius + 6 * scaleFactor, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();

            // Clip and draw image with aspect ratio fit
            ctx.save();
            ctx.beginPath();
            ctx.arc(width / 2, photoCenterY, photoRadius, 0, Math.PI * 2);
            ctx.clip();

            const imgAspect = img.width / img.height;
            let drawW = photoRadius * 2;
            let drawH = photoRadius * 2;
            let offsetX = width / 2 - photoRadius;
            let offsetY = photoCenterY - photoRadius;

            if (imgAspect > 1) {
              drawW = drawH * imgAspect;
              offsetX = width / 2 - drawW / 2;
            } else {
              drawH = drawW / imgAspect;
              offsetY = photoCenterY - drawH / 2;
            }

            ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
            ctx.restore();

            // Inner gold ring overlay
            ctx.save();
            ctx.strokeStyle = 'rgba(255, 240, 180, 0.75)';
            ctx.lineWidth = 2.5 * scaleFactor;
            ctx.beginPath();
            ctx.arc(width / 2, photoCenterY, photoRadius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
          }
        } catch {
          // Fallback to Diya if image fails to load
          drawOrnateDiya(ctx, width / 2, photoCenterY, scaleFactor, activeTheme.borderColor);
        }
      } else {
        // Grand Royal Diya for standard Diwali and New Year cards
        drawOrnateDiya(ctx, width / 2, photoCenterY, scaleFactor, activeTheme.borderColor);
      }

      // 7. Recipient Greeting
      let currentY = 605 * scaleFactor;
      if (recipientName.trim()) {
        ctx.fillStyle = activeTheme.accentColor;
        ctx.font = `italic 600 ${30 * scaleFactor}px 'Cormorant Garamond', Georgia, serif`;
        ctx.fillText(`Wishing ${recipientName},`, width / 2, currentY);
        currentY += 46 * scaleFactor;
      }

      // 8. Festive Message (with line wrapping & quotations)
      ctx.fillStyle = '#fff9eb';
      ctx.font = `${25 * scaleFactor}px 'Manrope', sans-serif`;
      const maxTextWidth = 780 * scaleFactor;
      const lineHeight = 38 * scaleFactor;

      const fullMessageText = `“${message.trim()}”`;
      const words = fullMessageText.split(' ');
      let line = '';
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxTextWidth && n > 0) {
          ctx.fillText(line.trim(), width / 2, currentY);
          line = words[n] + ' ';
          currentY += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line.trim(), width / 2, currentY);
      currentY += 50 * scaleFactor;

      // 9. Ornate Gold Divider with Lotus / Diya Motif
      ctx.save();
      const divWidth = 160 * scaleFactor;
      const gradDivL = ctx.createLinearGradient(width / 2 - divWidth, 0, width / 2 - 25 * scaleFactor, 0);
      gradDivL.addColorStop(0, 'rgba(245, 201, 106, 0)');
      gradDivL.addColorStop(1, 'rgba(245, 201, 106, 0.7)');
      ctx.strokeStyle = gradDivL;
      ctx.lineWidth = 1.5 * scaleFactor;
      ctx.beginPath();
      ctx.moveTo(width / 2 - divWidth, currentY);
      ctx.lineTo(width / 2 - 25 * scaleFactor, currentY);
      ctx.stroke();

      const gradDivR = ctx.createLinearGradient(width / 2 + 25 * scaleFactor, 0, width / 2 + divWidth, 0);
      gradDivR.addColorStop(0, 'rgba(245, 201, 106, 0.7)');
      gradDivR.addColorStop(1, 'rgba(245, 201, 106, 0)');
      ctx.strokeStyle = gradDivR;
      ctx.beginPath();
      ctx.moveTo(width / 2 + 25 * scaleFactor, currentY);
      ctx.lineTo(width / 2 + divWidth, currentY);
      ctx.stroke();

      // Center decorative diamond
      ctx.fillStyle = activeTheme.borderColor;
      ctx.beginPath();
      ctx.moveTo(width / 2, currentY - 5 * scaleFactor);
      ctx.lineTo(width / 2 + 7 * scaleFactor, currentY);
      ctx.lineTo(width / 2, currentY + 5 * scaleFactor);
      ctx.lineTo(width / 2 - 7 * scaleFactor, currentY);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      currentY += 46 * scaleFactor;

      // 10. Sender Signature ("With heartfelt wishes from:")
      ctx.fillStyle = 'rgba(255, 240, 200, 0.82)';
      ctx.font = `italic ${22 * scaleFactor}px 'Cormorant Garamond', Georgia, serif`;
      ctx.fillText('With heartfelt wishes & blessings from:', width / 2, currentY);
      currentY += 46 * scaleFactor;

      ctx.fillStyle = titleGrad;
      ctx.font = `bold ${48 * scaleFactor}px 'Cormorant Garamond', Georgia, serif`;
      ctx.shadowColor = 'rgba(245, 201, 106, 0.4)';
      ctx.shadowBlur = 12 * scaleFactor;
      ctx.fillText(senderName || 'Your Well-Wisher', width / 2, currentY);
      ctx.shadowBlur = 0;

      // 11. BOTTOM SECTION: Magnificent Row of Illuminated Diyas
      const hasCompanyBranding = Boolean(
        companyLogo || companyName.trim() || companyWebsite.trim() || companyTagline.trim(),
      );

      // Adjust diya vertical position & scale when company footer is enabled for perfect visual balance
      const bottomBaseY = hasCompanyBranding ? 965 * scaleFactor : 1070 * scaleFactor;
      const diyaScaleMultiplier = hasCompanyBranding ? 0.78 : 1;
      drawBottomDiyaTrio(ctx, width, bottomBaseY, scaleFactor, activeTheme.borderColor, diyaScaleMultiplier);

      // 12. COMPANY / BUSINESS BRANDING FOOTER (Prominent Logo & Crisp Typography)
      if (hasCompanyBranding) {
        const logoBaseSize = companyLogoSize === 'xl' ? 92 : companyLogoSize === 'md' ? 60 : 76;
        const logoSize = logoBaseSize * scaleFactor;

        if (companyFooterLayout === 'banner') {
          // ==========================================
          // STYLE: Horizontal Frosted Brand Plaque
          // ==========================================
          const bannerW = 760 * scaleFactor;
          const bannerH = 150 * scaleFactor;
          const bannerX = (width - bannerW) / 2;
          const bannerY = 1045 * scaleFactor;

          // Frosted glass plaque container
          ctx.save();
          ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
          ctx.shadowBlur = 20 * scaleFactor;
          ctx.fillStyle = 'rgba(12, 6, 26, 0.75)';
          drawRoundedRect(ctx, bannerX, bannerY, bannerW, bannerH, 18 * scaleFactor);
          ctx.fill();

          ctx.strokeStyle = activeTheme.borderColor;
          ctx.lineWidth = 1.8 * scaleFactor;
          ctx.stroke();

          // Inner gold highlight rim
          ctx.strokeStyle = 'rgba(255, 240, 180, 0.35)';
          ctx.lineWidth = 1 * scaleFactor;
          drawRoundedRect(
            ctx,
            bannerX + 3 * scaleFactor,
            bannerY + 3 * scaleFactor,
            bannerW - 6 * scaleFactor,
            bannerH - 6 * scaleFactor,
            15 * scaleFactor,
          );
          ctx.stroke();
          ctx.restore();

          if (companyLogo) {
            try {
              const logoImg = await loadImage(companyLogo);
              const logoCenterX = bannerX + 28 * scaleFactor + logoSize / 2;
              const logoCenterY = bannerY + bannerH / 2;

              // Framed circular logo badge with gold ring
              ctx.save();
              ctx.shadowColor = activeTheme.glowColor;
              ctx.shadowBlur = 14 * scaleFactor;
              ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
              ctx.strokeStyle = activeTheme.borderColor;
              ctx.lineWidth = 2.2 * scaleFactor;
              ctx.beginPath();
              ctx.arc(logoCenterX, logoCenterY, logoSize / 2 + 3 * scaleFactor, 0, Math.PI * 2);
              ctx.fill();
              ctx.stroke();

              // Clip and draw image
              ctx.beginPath();
              ctx.arc(logoCenterX, logoCenterY, logoSize / 2, 0, Math.PI * 2);
              ctx.clip();
              ctx.drawImage(
                logoImg,
                logoCenterX - logoSize / 2,
                logoCenterY - logoSize / 2,
                logoSize,
                logoSize,
              );
              ctx.restore();

              // Text aligned neatly to right of logo
              const textStartX = bannerX + 48 * scaleFactor + logoSize;
              ctx.textAlign = 'left';

              let textY = bannerY + 44 * scaleFactor;
              if (companyName.trim()) {
                ctx.fillStyle = activeTheme.accentColor;
                ctx.font = `bold ${28 * scaleFactor}px 'Manrope', sans-serif`;
                ctx.fillText(companyName.trim(), textStartX, textY);
                textY += 32 * scaleFactor;
              }

              if (companyWebsite.trim()) {
                ctx.fillStyle = '#fff4d1';
                ctx.font = `600 ${18 * scaleFactor}px 'Manrope', sans-serif`;
                ctx.fillText(companyWebsite.trim(), textStartX, textY);
                textY += 26 * scaleFactor;
              }

              if (companyTagline.trim()) {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
                ctx.font = `italic ${15 * scaleFactor}px 'Manrope', sans-serif`;
                ctx.fillText(companyTagline.trim(), textStartX, textY);
              }

              ctx.textAlign = 'center'; // reset
            } catch (err) {
              console.error('Failed to render company logo in banner mode', err);
            }
          } else {
            // No logo: Centered text inside banner
            let textY = bannerY + (companyTagline.trim() ? 44 : 54) * scaleFactor;
            if (companyName.trim()) {
              ctx.fillStyle = activeTheme.accentColor;
              ctx.font = `bold ${30 * scaleFactor}px 'Manrope', sans-serif`;
              ctx.fillText(companyName.trim(), width / 2, textY);
              textY += 34 * scaleFactor;
            }
            if (companyWebsite.trim()) {
              ctx.fillStyle = '#fff4d1';
              ctx.font = `600 ${19 * scaleFactor}px 'Manrope', sans-serif`;
              ctx.fillText(companyWebsite.trim(), width / 2, textY);
              textY += 28 * scaleFactor;
            }
            if (companyTagline.trim()) {
              ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
              ctx.font = `italic ${15 * scaleFactor}px 'Manrope', sans-serif`;
              ctx.fillText(companyTagline.trim(), width / 2, textY);
            }
          }
        } else {
          // ==========================================
          // STYLE: Centered Royal Crest (Default)
          // ==========================================
          let crestY = 1045 * scaleFactor;

          if (companyLogo) {
            try {
              const logoImg = await loadImage(companyLogo);
              const logoCenterY = crestY + logoSize / 2;

              // Outer golden emblem aura
              ctx.save();
              ctx.shadowColor = activeTheme.glowColor;
              ctx.shadowBlur = 18 * scaleFactor;
              ctx.fillStyle = 'rgba(10, 5, 22, 0.75)';
              ctx.strokeStyle = activeTheme.borderColor;
              ctx.lineWidth = 2.5 * scaleFactor;
              ctx.beginPath();
              ctx.arc(width / 2, logoCenterY, logoSize / 2 + 4 * scaleFactor, 0, Math.PI * 2);
              ctx.fill();
              ctx.stroke();

              // Inner gold highlight ring
              ctx.strokeStyle = 'rgba(255, 240, 180, 0.55)';
              ctx.lineWidth = 1.2 * scaleFactor;
              ctx.beginPath();
              ctx.arc(width / 2, logoCenterY, logoSize / 2 + 1.5 * scaleFactor, 0, Math.PI * 2);
              ctx.stroke();

              // Clipped logo image
              ctx.beginPath();
              ctx.arc(width / 2, logoCenterY, logoSize / 2, 0, Math.PI * 2);
              ctx.clip();
              ctx.drawImage(
                logoImg,
                width / 2 - logoSize / 2,
                logoCenterY - logoSize / 2,
                logoSize,
                logoSize,
              );
              ctx.restore();

              crestY = logoCenterY + logoSize / 2 + 26 * scaleFactor;
            } catch (err) {
              console.error('Failed to render crest logo', err);
            }
          }

          // Company Name (Centered & Bold)
          if (companyName.trim()) {
            ctx.fillStyle = activeTheme.accentColor;
            ctx.font = `bold ${30 * scaleFactor}px 'Manrope', sans-serif`;
            ctx.shadowColor = 'rgba(245, 201, 106, 0.45)';
            ctx.shadowBlur = 10 * scaleFactor;
            ctx.fillText(companyName.trim(), width / 2, crestY);
            ctx.shadowBlur = 0;
            crestY += 30 * scaleFactor;
          }

          // Company Website / Contact Link
          if (companyWebsite.trim()) {
            ctx.fillStyle = '#fff4d1';
            ctx.font = `600 ${18 * scaleFactor}px 'Manrope', sans-serif`;
            ctx.fillText(companyWebsite.trim(), width / 2, crestY);
            crestY += 25 * scaleFactor;
          }

          // Company Tagline
          if (companyTagline.trim()) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
            ctx.font = `italic ${15 * scaleFactor}px 'Manrope', sans-serif`;
            ctx.fillText(companyTagline.trim(), width / 2, crestY);
          }
        }

        // Bottom Festive Tagline
        ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.font = `600 ${13 * scaleFactor}px 'Manrope', sans-serif`;
        ctx.fillText(
          `✦  ${currentOccasion.tagline}  ✦`,
          width / 2,
          height - 52 * scaleFactor,
        );
      } else {
        // Standard Festive Footer without company branding
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = `600 ${15 * scaleFactor}px 'Manrope', sans-serif`;
        ctx.fillText(
          `✦  ${currentOccasion.tagline}  ✦`,
          width / 2,
          height - 68 * scaleFactor,
        );
      }
    },
    [
      currentTheme,
      cardStyle,
      currentOccasion,
      userImage,
      recipientName,
      message,
      senderName,
      loadImage,
      companyLogo,
      companyLogoSize,
      companyFooterLayout,
      companyName,
      companyWebsite,
      companyTagline,
    ],
  );

  // Live render on preview canvas whenever any state changes (deferred with rAF to protect TBT)
  useEffect(() => {
    const canvas = previewCanvasRef.current;
    if (!canvas) return;
    const rafId = requestAnimationFrame(() => {
      void renderCardToCanvas(canvas, 0.5); // 540x675 for crisp, fast live preview
    });
    return () => cancelAnimationFrame(rafId);
  }, [renderCardToCanvas]);

  // High-Resolution Download Generator (supports single theme/style or current selection)
  const handleDownloadCard = async (themeToDownload?: CardTheme, styleToDownload?: CardStyleId) => {
    const targetTheme = themeToDownload ?? currentTheme;
    const targetStyle = styleToDownload ?? cardStyle;
    setIsGenerating(true);
    try {
      const exportCanvas = document.createElement('canvas');
      // 1080 x 1350 px (HD standard aspect ratio for social media & print)
      await renderCardToCanvas(exportCanvas, 1, targetTheme, targetStyle);

      const dataUrl = exportCanvas.toDataURL('image/png');
      const link = document.createElement('a');
      const safeName = (senderName || 'Greetings').replace(/[^a-zA-Z0-9_-]/g, '_');
      const themeSlug = targetTheme.name.replace(/[^a-zA-Z0-9_-]/g, '_');
      const styleSlug = targetStyle;
      link.download = `${currentOccasion.filenamePrefix}_${safeName}_${styleSlug}_${themeSlug}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Failed to download card:', err);
      alert('Could not generate card image. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Batch download for all 4 Card UI styles in 1-click
  const handleDownloadAllStyles = async () => {
    setIsGenerating(true);
    try {
      const safeName = (senderName || 'Greetings').replace(/[^a-zA-Z0-9_-]/g, '_');
      const themeSlug = currentTheme.name.replace(/[^a-zA-Z0-9_-]/g, '_');
      for (let i = 0; i < CARD_STYLES.length; i++) {
        const styleItem = CARD_STYLES[i];
        const exportCanvas = document.createElement('canvas');
        await renderCardToCanvas(exportCanvas, 1, currentTheme, styleItem.id);

        const dataUrl = exportCanvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `${currentOccasion.filenamePrefix}_${safeName}_${styleItem.id}_${themeSlug}.png`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        await new Promise((resolve) => setTimeout(resolve, 250));
      }
    } catch (err) {
      console.error('Failed to download all card UI styles:', err);
      alert('Could not download all card styles. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Batch download for all 8 color options in 1-click
  const handleDownloadAllCards = async () => {
    setIsGenerating(true);
    try {
      const safeName = (senderName || 'Greetings').replace(/[^a-zA-Z0-9_-]/g, '_');
      const styleSlug = cardStyle;
      for (let i = 0; i < CARD_THEMES.length; i++) {
        const themeItem = CARD_THEMES[i];
        const exportCanvas = document.createElement('canvas');
        await renderCardToCanvas(exportCanvas, 1, themeItem, cardStyle);

        const dataUrl = exportCanvas.toDataURL('image/png');
        const link = document.createElement('a');
        const themeSlug = themeItem.name.replace(/[^a-zA-Z0-9_-]/g, '_');
        link.download = `${currentOccasion.filenamePrefix}_${safeName}_${styleSlug}_${themeSlug}.png`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        await new Promise((resolve) => setTimeout(resolve, 250));
      }
    } catch (err) {
      console.error('Failed to download all cards:', err);
      alert('Could not download all cards. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Web Share or Copy Link
  const handleShareCard = async () => {
    const shareText = `${currentOccasion.icon} ${currentOccasion.title}! "${message}" — Warm wishes from ${senderName}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${currentOccasion.title} Greeting Card`,
          text: shareText,
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Ignored
    }
  };

  const handleCopyTextOnly = async () => {
    const textToCopy = `${currentOccasion.icon} *${currentOccasion.title}*\n\nWishing ${recipientName},\n\n"${message}"\n\nWith heartfelt wishes from:\n*${senderName}*`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setTextCopied(true);
      setTimeout(() => setTextCopied(false), 3000);
    } catch {
      // Ignored
    }
  };

  const handleReset = () => {
    setOccasionId('diwali');
    setSenderName('The Sharma Family');
    setRecipientName('Dearest Friends & Family');
    setMessage(CARD_OCCASIONS[0].presetMessages[0]);
    setThemeId('midnight-gold');
    setUserImage(null);
    setCompanyName('');
    setCompanyWebsite('');
    setCompanyTagline('');
    setCompanyLogo(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (companyLogoInputRef.current) companyLogoInputRef.current.value = '';
  };

  return (
    <section id="card-creator" className="relative py-16 sm:py-24 px-3.5 xs:px-5 sm:px-8 scroll-mt-20 overflow-hidden content-auto">
      {/* Background glow highlights */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-10 h-[500px] w-[600px] -translate-x-1/2 rounded-full bg-diwali-gold-500/10 blur-[140px]"
      />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="FESTIVE GREETING CARD MAKER"
          title="Create & Download Your Card"
          description="Personalize your festive Diwali & Happy New Year greeting with your photo, name, and warm wishes. Download in high resolution to share with loved ones on WhatsApp, Instagram, or print."
        />

        <div className="mt-10 sm:mt-14 grid grid-cols-1 items-start gap-8 lg:gap-10 lg:grid-cols-12">
          {/* LEFT: Customization Form */}
          <div className="glass-panel p-4 xs:p-6 sm:p-8 lg:col-span-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 sm:pb-5">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg bg-diwali-gold-400/20 text-diwali-gold-300 shrink-0">
                  <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-white">
                  Customize Your Card
                </h3>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1.5 text-xs text-white/60 transition hover:text-diwali-gold-300"
                title="Reset to defaults"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Reset</span>
              </button>
            </div>

            <div className="mt-5 sm:mt-6 space-y-5 sm:space-y-6">
              {/* Occasion / Card Type Selector */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-diwali-gold-300">
                  <Sparkles className="h-3.5 w-3.5" />
                  Select Card Type / Occasion
                </label>
                <div className="mt-2.5 grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {CARD_OCCASIONS.map((occ) => {
                    const isSelected = occ.id === occasionId;
                    return (
                      <button
                        key={occ.id}
                        type="button"
                        onClick={() => handleOccasionChange(occ.id)}
                        className={`flex items-center justify-center gap-2 rounded-xl border p-2.5 text-center text-xs font-semibold transition ${
                          isSelected
                            ? 'border-diwali-gold-400 bg-diwali-gold-400/20 text-diwali-gold-200 shadow-[0_0_15px_rgba(245,201,106,0.3)]'
                            : 'border-white/10 bg-white/5 text-white/70 hover:border-white/25 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <span className="text-base shrink-0">{occ.icon}</span>
                        <span className="truncate">{occ.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Card Design / UI Style Selector (4 Distinct Artistic Themes) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-diwali-gold-300">
                    <Sparkles className="h-3.5 w-3.5" />
                    Card Design / UI Style
                  </label>
                  <span className="text-[11px] text-diwali-gold-300/80 bg-diwali-gold-400/10 px-2 py-0.5 rounded-full border border-diwali-gold-400/20 font-medium">
                    {CARD_STYLES.find((s) => s.id === cardStyle)?.badge}
                  </span>
                </div>
                <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {CARD_STYLES.map((style) => {
                    const isSelected = style.id === cardStyle;
                    return (
                      <button
                        key={style.id}
                        type="button"
                        onClick={() => setCardStyle(style.id)}
                        className={`group relative flex flex-col items-center justify-center gap-1 rounded-xl border p-2.5 text-center transition-all ${
                          isSelected
                            ? 'border-diwali-gold-400 bg-diwali-gold-400/20 text-diwali-gold-200 shadow-[0_0_18px_rgba(245,201,106,0.35)] ring-1 ring-diwali-gold-400/60 scale-[1.02]'
                            : 'border-white/10 bg-white/5 text-white/70 hover:border-diwali-gold-400/40 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <span className="text-xl group-hover:scale-110 transition">{style.icon}</span>
                        <span className="text-xs font-semibold truncate w-full">{style.name}</span>
                        <span className="text-[10px] text-white/50 truncate w-full">{style.badge}</span>
                        {isSelected && (
                          <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-diwali-gold-400 text-diwali-night">
                            <Check className="h-2.5 w-2.5 stroke-[3]" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sender Name */}
              <div>
                <label
                  htmlFor="senderName"
                  className="block text-xs font-semibold uppercase tracking-wider text-diwali-gold-300"
                >
                  Your Name / Family Name *
                </label>
                <input
                  id="senderName"
                  type="text"
                  value={senderName}
                  maxLength={50}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g. Rahul & Neha Sharma"
                  className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-base sm:text-sm text-white placeholder-white/40 backdrop-blur-sm transition focus:border-diwali-gold-400 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-diwali-gold-400"
                />
              </div>

              {/* Recipient Name */}
              <div>
                <label
                  htmlFor="recipientName"
                  className="block text-xs font-semibold uppercase tracking-wider text-diwali-gold-300"
                >
                  Wishing To (Optional)
                </label>
                <input
                  id="recipientName"
                  type="text"
                  value={recipientName}
                  maxLength={50}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="e.g. Dearest Friends & Family"
                  className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-base sm:text-sm text-white placeholder-white/40 backdrop-blur-sm transition focus:border-diwali-gold-400 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-diwali-gold-400"
                />
              </div>

              {/* Photo Upload */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-diwali-gold-300">
                    Your Photo / Family Portrait
                  </label>
                  {currentOccasion.artworkLabel && !userImage && (
                    <span className="inline-flex items-center gap-1 text-[11px] text-diwali-gold-300/90 bg-diwali-gold-400/10 px-2 py-0.5 rounded-full border border-diwali-gold-400/25">
                      <span className="text-white/60">Artwork:</span>
                      <span className="text-diwali-gold-200 font-medium truncate max-w-[150px]">
                        {currentOccasion.artworkLabel}
                      </span>
                    </span>
                  )}
                </div>
                <div className="mt-2">
                  {userImage ? (
                    <div className="flex flex-col xs:flex-row items-start xs:items-center gap-3 sm:gap-4 rounded-xl border border-diwali-gold-400/40 bg-white/5 p-3 backdrop-blur-sm">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={userImage}
                        alt="Uploaded preview"
                        className="h-14 w-14 sm:h-16 sm:w-16 rounded-full border-2 border-diwali-gold-400 object-cover shadow-md shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">Photo selected</p>
                        <p className="text-xs text-diwali-gold-300/80">
                          Framed in royal gold filigree (replaces default artwork)
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-end xs:self-auto shrink-0">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="glass-button !py-1.5 !px-3 text-xs"
                        >
                          Change
                        </button>
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="rounded-full p-2 text-white/60 transition hover:bg-red-500/20 hover:text-red-400"
                          title="Remove photo (revert to festive artwork)"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/20 bg-white/[0.03] p-5 sm:p-6 text-center transition hover:border-diwali-gold-400/70 hover:bg-white/[0.07]"
                    >
                      <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-diwali-gold-400/10 text-diwali-gold-300 transition group-hover:scale-110">
                        <Upload className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                      <p className="mt-2.5 sm:mt-3 text-sm font-medium text-white">
                        Click to upload your portrait photo
                      </p>
                      <p className="mt-1 text-xs text-white/50">
                        {currentOccasion.artworkLabel
                          ? `Optional: Replaces ${currentOccasion.artworkLabel} on the card`
                          : 'PNG, JPG or WebP (Or keep empty for Grand Royal Diya)'}
                      </p>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Card Theme Picker */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-diwali-gold-300">
                  <Palette className="h-3.5 w-3.5" />
                  Select Card Theme
                </label>
                <div className="mt-2.5 grid grid-cols-2 xs:grid-cols-4 sm:grid-cols-4 gap-2 sm:gap-2.5">
                  {CARD_THEMES.map((theme) => {
                    const isSelected = theme.id === themeId;
                    return (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => setThemeId(theme.id)}
                        className={`group relative flex flex-col items-center gap-2 rounded-xl border p-2.5 sm:p-3 text-left transition ${
                          isSelected
                            ? 'border-diwali-gold-400 bg-white/15 shadow-[0_0_20px_rgba(245,201,106,0.3)]'
                            : 'border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10'
                        }`}
                      >
                        <div
                          className="h-6 sm:h-7 w-full rounded-md shadow-inner"
                          style={{
                            background: `linear-gradient(135deg, ${theme.bgGradient[0]}, ${theme.bgGradient[1]})`,
                            border: `1px solid ${theme.borderColor}`,
                          }}
                        />
                        <span className="text-[11px] font-medium text-white group-hover:text-diwali-gold-300 text-center truncate w-full">
                          {theme.name}
                        </span>
                        {isSelected && (
                          <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-diwali-gold-400 text-diwali-night">
                            <Check className="h-2.5 w-2.5 stroke-[3]" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Wishes Message */}
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="cardMessage"
                    className="block text-xs font-semibold uppercase tracking-wider text-diwali-gold-300"
                  >
                    {currentOccasion.name} Wishes & Blessings
                  </label>
                  <span className="text-[11px] text-white/50">{message.length}/220</span>
                </div>
                <textarea
                  id="cardMessage"
                  rows={3}
                  maxLength={220}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={`Write your custom heartfelt ${currentOccasion.name} message...`}
                  className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 p-3 text-base sm:text-sm text-white placeholder-white/40 backdrop-blur-sm transition focus:border-diwali-gold-400 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-diwali-gold-400"
                />

                {/* Quick preset suggestions */}
                <div className="mt-2.5">
                  <p className="text-[11px] font-medium text-white/50">
                    Quick {currentOccasion.name} wishes:
                  </p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {currentOccasion.presetMessages.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setMessage(preset)}
                        className={`rounded-lg border px-2.5 py-1 text-xs transition ${
                          message === preset
                            ? 'border-diwali-gold-400 bg-diwali-gold-400/20 text-diwali-gold-300'
                            : 'border-white/10 bg-white/5 text-white/70 hover:border-diwali-gold-400/50 hover:text-white'
                        }`}
                      >
                        Wish #{idx + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Company / Business Branding & Card Footer */}
              <div className="rounded-2xl border border-diwali-gold-400/30 bg-gradient-to-b from-diwali-gold-400/10 via-white/[0.03] to-transparent p-4 sm:p-5 backdrop-blur-sm shadow-md">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-diwali-gold-400/20 text-diwali-gold-300 shrink-0">
                      <Briefcase className="h-4 w-4" />
                    </span>
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-diwali-gold-300">
                        Company Logo & Footer Branding
                      </h4>
                      <p className="text-[11px] text-white/50">
                        Add your logo, company name & website to the card footer
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleQuickFillCompany}
                    className="inline-flex items-center gap-1 rounded-lg border border-diwali-gold-400/35 bg-diwali-gold-400/15 px-2.5 py-1 text-[11px] font-semibold text-diwali-gold-200 hover:bg-diwali-gold-400 hover:text-diwali-night transition shadow-sm"
                    title="Quick fill with Vanjata Jayesh & website info"
                  >
                    <span>⚡ Quick Fill</span>
                  </button>
                </div>

                <div className="space-y-3.5">
                  {/* Company Logo Upload */}
                  <div>
                    <label className="block text-xs font-medium text-white/80 mb-1.5">
                      Company / Brand Logo
                    </label>
                    {companyLogo ? (
                      <div className="flex items-center gap-3 rounded-xl border border-diwali-gold-400/40 bg-white/5 p-2.5">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={companyLogo}
                          alt="Company logo preview"
                          className="h-10 w-10 rounded-lg border border-diwali-gold-400 object-contain bg-black/40 p-1 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-white truncate">Logo attached</p>
                          <p className="text-[10px] text-diwali-gold-300/80">
                            Rendered in festive footer next to company name
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => companyLogoInputRef.current?.click()}
                            className="glass-button !py-1 !px-2.5 text-xs"
                          >
                            Change
                          </button>
                          <button
                            type="button"
                            onClick={handleRemoveCompanyLogo}
                            className="rounded-full p-1.5 text-white/60 transition hover:bg-red-500/20 hover:text-red-400"
                            title="Remove company logo"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => companyLogoInputRef.current?.click()}
                        className="group flex cursor-pointer items-center justify-center gap-2.5 rounded-xl border border-dashed border-white/20 bg-white/[0.03] p-3 text-center transition hover:border-diwali-gold-400/70 hover:bg-white/[0.07]"
                      >
                        <Upload className="h-4 w-4 text-diwali-gold-300 transition group-hover:scale-110" />
                        <span className="text-xs font-medium text-white/90">
                          Click to upload company logo (PNG, JPG, SVG)
                        </span>
                      </div>
                    )}
                    <input
                      ref={companyLogoInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleCompanyLogoUpload}
                      className="hidden"
                    />
                  </div>

                  {/* Company Logo Size & Layout Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {/* Logo Size */}
                    <div>
                      <label className="block text-xs font-medium text-white/80 mb-1">
                        Logo Size on Card
                      </label>
                      <div className="grid grid-cols-3 gap-1">
                        {(
                          [
                            { id: 'md', label: 'Medium' },
                            { id: 'lg', label: 'Large' },
                            { id: 'xl', label: 'X-Large' },
                          ] as const
                        ).map((size) => (
                          <button
                            key={size.id}
                            type="button"
                            onClick={() => setCompanyLogoSize(size.id)}
                            className={`rounded-lg py-1.5 px-2 text-xs font-semibold transition ${
                              companyLogoSize === size.id
                                ? 'bg-diwali-gold-400 text-diwali-night shadow-sm'
                                : 'border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                            }`}
                          >
                            {size.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Footer Layout Style */}
                    <div>
                      <label className="block text-xs font-medium text-white/80 mb-1">
                        Footer Display Layout
                      </label>
                      <div className="grid grid-cols-2 gap-1">
                        <button
                          type="button"
                          onClick={() => setCompanyFooterLayout('crest')}
                          className={`rounded-lg py-1.5 px-2 text-xs font-semibold transition ${
                            companyFooterLayout === 'crest'
                              ? 'bg-diwali-gold-400 text-diwali-night shadow-sm'
                              : 'border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          👑 Centered
                        </button>
                        <button
                          type="button"
                          onClick={() => setCompanyFooterLayout('banner')}
                          className={`rounded-lg py-1.5 px-2 text-xs font-semibold transition ${
                            companyFooterLayout === 'banner'
                              ? 'bg-diwali-gold-400 text-diwali-night shadow-sm'
                              : 'border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          🏷️ Plaque
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Company Name */}
                  <div>
                    <label
                      htmlFor="companyName"
                      className="block text-xs font-medium text-white/80 mb-1"
                    >
                      Company / Business Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/40">
                        <Building2 className="h-4 w-4" />
                      </div>
                      <input
                        id="companyName"
                        type="text"
                        value={companyName}
                        maxLength={50}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. Vanjata Jayesh"
                        className="w-full rounded-xl border border-white/15 bg-white/5 pl-9 pr-3 py-2.5 text-base sm:text-xs text-white placeholder-white/40 backdrop-blur-sm transition focus:border-diwali-gold-400 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-diwali-gold-400"
                      />
                    </div>
                  </div>

                  {/* Company Website / URL */}
                  <div>
                    <label
                      htmlFor="companyWebsite"
                      className="block text-xs font-medium text-white/80 mb-1"
                    >
                      Website / Portfolio Link
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/40">
                        <Globe className="h-4 w-4" />
                      </div>
                      <input
                        id="companyWebsite"
                        type="text"
                        value={companyWebsite}
                        maxLength={60}
                        onChange={(e) => setCompanyWebsite(e.target.value)}
                        placeholder="e.g. https://jayesh-dev.vercel.app/"
                        className="w-full rounded-xl border border-white/15 bg-white/5 pl-9 pr-3 py-2.5 text-base sm:text-xs text-white placeholder-white/40 backdrop-blur-sm transition focus:border-diwali-gold-400 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-diwali-gold-400"
                      />
                    </div>
                  </div>

                  {/* Company Tagline / Designation (Optional) */}
                  <div>
                    <label
                      htmlFor="companyTagline"
                      className="block text-xs font-medium text-white/80 mb-1"
                    >
                      Company Tagline / Designation (Optional)
                    </label>
                    <input
                      id="companyTagline"
                      type="text"
                      value={companyTagline}
                      maxLength={60}
                      onChange={(e) => setCompanyTagline(e.target.value)}
                      placeholder="e.g. Web & Software Development"
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-base sm:text-xs text-white placeholder-white/40 backdrop-blur-sm transition focus:border-diwali-gold-400 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-diwali-gold-400"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <button
                  type="button"
                  onClick={() => handleDownloadCard()}
                  disabled={isGenerating}
                  className="group relative flex-1 inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full border border-diwali-gold-300/40 bg-gradient-to-r from-diwali-gold-400 via-diwali-saffron to-diwali-gold-500 py-3.5 px-6 font-semibold text-diwali-night shadow-[0_0_25px_rgba(245,201,106,0.5)] transition duration-300 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(245,201,106,0.7)] active:scale-[0.98] disabled:opacity-50 text-sm sm:text-base"
                >
                  <Download className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
                  <span>{isGenerating ? 'Rendering HD Card...' : 'Download HD Card (PNG)'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleShareCard}
                  className="glass-button !py-3.5 !px-6 text-sm sm:text-base justify-center"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="h-4 w-4 text-diwali-gold-300 shrink-0" />
                      <span>Share</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Live Interactive Preview & Multiple Card Options */}
          <div className="lg:col-span-6 flex flex-col items-center w-full">
            {/* Top Bar with View Mode Toggle */}
            <div className="w-full mb-3 flex flex-wrap items-center justify-between gap-2 px-1">
              <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-diwali-gold-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                Live Card Preview
              </span>

              {/* View Switcher: Single Focused vs 4 Card UIs vs All 8 Colors Grid */}
              <div className="flex items-center gap-1 rounded-xl border border-white/15 bg-white/5 p-1">
                <button
                  type="button"
                  onClick={() => setPreviewView('single')}
                  className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition ${
                    previewView === 'single'
                      ? 'bg-diwali-gold-400/25 text-diwali-gold-200 shadow-sm'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>Single Focus</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewView('styles')}
                  className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition ${
                    previewView === 'styles'
                      ? 'bg-diwali-gold-400/25 text-diwali-gold-200 shadow-sm'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>4 Card UIs</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewView('colors')}
                  className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition ${
                    previewView === 'colors'
                      ? 'bg-diwali-gold-400/25 text-diwali-gold-200 shadow-sm'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Palette className="h-3.5 w-3.5" />
                  <span>8 Colors</span>
                </button>
              </div>
            </div>

            {previewView === 'single' ? (
              /* FOCUSED SINGLE CARD WITH CAROUSEL CONTROLS & MINI-OPTIONS DOCKS */
              <div className="w-full flex flex-col items-center">
                {/* Main Card Frame with Left/Right Nav Arrows */}
                <div className="relative w-full max-w-[340px] xs:max-w-[380px] sm:max-w-[440px] rounded-2xl border border-diwali-gold-400/40 p-2 sm:p-2.5 bg-gradient-to-b from-white/15 via-white/5 to-black/40 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.9)] backdrop-blur-2xl transition hover:border-diwali-gold-400/70">
                  {/* Previous Color Button */}
                  <button
                    type="button"
                    onClick={handlePrevTheme}
                    title="Previous Color Option"
                    aria-label="Previous Color Option"
                    className="absolute -left-3.5 sm:-left-4 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-diwali-gold-400/60 bg-diwali-plum-950/90 text-diwali-gold-300 shadow-xl backdrop-blur-md transition hover:scale-110 hover:bg-diwali-gold-400 hover:text-diwali-night active:scale-95"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  {/* Next Color Button */}
                  <button
                    type="button"
                    onClick={handleNextTheme}
                    title="Next Color Option"
                    aria-label="Next Color Option"
                    className="absolute -right-3.5 sm:-right-4 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-diwali-gold-400/60 bg-diwali-plum-950/90 text-diwali-gold-300 shadow-xl backdrop-blur-md transition hover:scale-110 hover:bg-diwali-gold-400 hover:text-diwali-night active:scale-95"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>

                  <canvas
                    ref={previewCanvasRef}
                    className="w-full h-auto rounded-xl shadow-2xl block border border-white/10"
                    style={{ aspectRatio: '1080 / 1350' }}
                  />

                  {/* Active Card Details Bar */}
                  <div className="mt-3 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 px-1">
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="flex h-2.5 w-2.5 rounded-full bg-diwali-gold-400 shrink-0" />
                        <span className="text-xs text-diwali-gold-200 font-semibold truncate">
                          {CARD_STYLES.find((s) => s.id === cardStyle)?.name}
                        </span>
                        <span className="text-[10px] text-white/50 truncate">
                          ({currentTheme.name})
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 sm:gap-2 w-full xs:w-auto justify-end">
                      <button
                        type="button"
                        onClick={handleCopyTextOnly}
                        title="Copy greeting message text"
                        className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-white/70 transition hover:bg-white/10 hover:text-white"
                      >
                        {textCopied ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-400" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDownloadCard(currentTheme, cardStyle)}
                        disabled={isGenerating}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-diwali-gold-400/20 border border-diwali-gold-400/40 px-3 py-1.5 text-xs font-semibold text-diwali-gold-300 transition hover:bg-diwali-gold-400 hover:text-diwali-night"
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span>Save PNG</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* 1. DIFFERENT CARD UI OPTIONS (4 DISTINCT ARCHITECTURAL STYLES) */}
                <div className="mt-5 w-full max-w-[340px] xs:max-w-[380px] sm:max-w-[440px] rounded-2xl border border-diwali-gold-400/35 bg-gradient-to-b from-diwali-gold-400/10 via-white/[0.04] to-black/30 p-3 sm:p-4 backdrop-blur-xl shadow-lg">
                  <div className="flex items-center justify-between mb-2.5 px-0.5">
                    <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-diwali-gold-300">
                      <Sparkles className="h-3.5 w-3.5 text-diwali-gold-400" />
                      Different Card UI Designs (4 Styles)
                    </span>
                    <button
                      type="button"
                      onClick={() => setPreviewView('styles')}
                      className="text-[11px] text-diwali-gold-300 hover:text-diwali-gold-200 transition underline underline-offset-2"
                    >
                      Compare 4 UIs
                    </button>
                  </div>

                  {/* 4 Card UI Style Previews Grid */}
                  <div className="grid grid-cols-2 xs:grid-cols-4 gap-2">
                    {CARD_STYLES.map((style) => {
                      const isSelected = style.id === cardStyle;
                      return (
                        <button
                          key={style.id}
                          type="button"
                          onClick={() => setCardStyle(style.id)}
                          className={`group relative flex flex-col items-center rounded-xl p-2 sm:p-2.5 text-center transition-all duration-200 ${
                            isSelected
                              ? 'border border-diwali-gold-400 bg-diwali-gold-400/25 ring-2 ring-diwali-gold-400/60 shadow-[0_0_18px_rgba(245,201,106,0.35)] scale-105'
                              : 'border border-white/10 bg-white/5 hover:border-diwali-gold-400/40 hover:bg-white/10'
                          }`}
                        >
                          <span className="text-2xl mb-1 group-hover:scale-110 transition">{style.icon}</span>
                          <span className="text-xs font-bold text-white truncate w-full">{style.name}</span>
                          <span className="text-[10px] text-diwali-gold-300/80 truncate w-full">{style.badge}</span>
                          {isSelected && (
                            <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-diwali-gold-400 text-diwali-night shadow-sm">
                              <Check className="h-2.5 w-2.5 stroke-[3]" />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Batch Download 4 Styles Button */}
                  <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-white/60">Want all 4 card layouts?</span>
                    <button
                      type="button"
                      onClick={handleDownloadAllStyles}
                      disabled={isGenerating}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-diwali-gold-400/40 bg-diwali-gold-400/10 px-3 py-1.5 text-xs font-semibold text-diwali-gold-300 transition hover:bg-diwali-gold-400 hover:text-diwali-night"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Download 4 UIs</span>
                    </button>
                  </div>
                </div>

                {/* 2. CARD COLOR PALETTE OPTIONS (8 THEMES) */}
                <div className="mt-3.5 w-full max-w-[340px] xs:max-w-[380px] sm:max-w-[440px] rounded-2xl border border-white/10 bg-white/5 p-3 sm:p-4 backdrop-blur-xl shadow-lg">
                  <div className="flex items-center justify-between mb-2.5 px-0.5">
                    <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-diwali-gold-300">
                      <Palette className="h-3.5 w-3.5" />
                      Card Color Palettes ({CARD_THEMES.length})
                    </span>
                    <button
                      type="button"
                      onClick={() => setPreviewView('colors')}
                      className="text-[11px] text-diwali-gold-300 hover:text-diwali-gold-200 transition underline underline-offset-2"
                    >
                      View All 8 Colors
                    </button>
                  </div>

                  {/* 8 Card Color Options Dock */}
                  <div className="grid grid-cols-4 xs:grid-cols-8 gap-1.5 sm:gap-2">
                    {CARD_THEMES.map((theme) => {
                      const isSelected = theme.id === themeId;
                      return (
                        <button
                          key={theme.id}
                          type="button"
                          onClick={() => setThemeId(theme.id)}
                          title={`${theme.name} palette`}
                          className={`group relative flex flex-col items-center rounded-xl p-1 sm:p-1.5 text-center transition-all duration-200 ${
                            isSelected
                              ? 'border border-diwali-gold-400 bg-diwali-gold-400/20 ring-2 ring-diwali-gold-400/60 shadow-[0_0_15px_rgba(245,201,106,0.35)] scale-105'
                              : 'border border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10'
                          }`}
                        >
                          {/* Mini Card Swatch */}
                          <div
                            className="w-full aspect-[4/5] rounded-lg shadow-inner relative flex items-center justify-center overflow-hidden"
                            style={{
                              background: `linear-gradient(135deg, ${theme.bgGradient[0]}, ${theme.bgGradient[1]})`,
                              border: `1.5px solid ${theme.borderColor}`,
                            }}
                          >
                            <span className="text-[11px] opacity-80">{currentOccasion.icon}</span>
                            {isSelected && (
                              <span className="absolute top-0.5 right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-diwali-gold-400 text-diwali-night">
                                <Check className="h-2 w-2 stroke-[3]" />
                              </span>
                            )}
                          </div>
                          <span className="mt-1 text-[9px] sm:text-[10px] font-medium text-white/90 truncate w-full">
                            {theme.name.split(' ')[0]}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Download All 8 Colors Batch Button */}
                  <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-white/60">Want all variations?</span>
                    <button
                      type="button"
                      onClick={handleDownloadAllCards}
                      disabled={isGenerating}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-diwali-gold-400/40 bg-diwali-gold-400/10 px-3 py-1.5 text-xs font-semibold text-diwali-gold-300 transition hover:bg-diwali-gold-400 hover:text-diwali-night"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Download All 8</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : previewView === 'styles' ? (
              /* ALL 4 DISTINCT CARD UI DESIGNS GALLERY GRID VIEW */
              <div className="w-full flex flex-col items-center">
                {/* Header Banner for Styles Grid View */}
                <div className="w-full rounded-2xl border border-diwali-gold-400/30 bg-diwali-gold-400/10 p-3 sm:p-4 mb-4 backdrop-blur-md flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      All 4 Distinct Card UI Designs
                    </h4>
                    <p className="text-xs text-white/60">
                      Compare Royal Filigree, Temple Jharokha, Floral Mandala, and Modern Luxe layouts
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleDownloadAllStyles}
                    disabled={isGenerating}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-diwali-gold-400 via-diwali-saffron to-diwali-gold-500 px-4 py-2 text-xs font-bold text-diwali-night shadow-md transition hover:scale-105 active:scale-95"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download All 4 Styles (PNG)</span>
                  </button>
                </div>

                {/* 2-Column Responsive Grid of All 4 Styles */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  {CARD_STYLES.map((style) => {
                    const isSelected = style.id === cardStyle;
                    return (
                      <MiniStyleCard
                        key={style.id}
                        styleItem={style}
                        theme={currentTheme}
                        isSelected={isSelected}
                        onSelect={() => {
                          setCardStyle(style.id);
                          setPreviewView('single');
                        }}
                        onDownload={() => handleDownloadCard(currentTheme, style.id)}
                        isGenerating={isGenerating}
                        renderCardToCanvas={renderCardToCanvas}
                      />
                    );
                  })}
                </div>
              </div>
            ) : (
              /* ALL 8 COLORS GALLERY GRID VIEW */
              <div className="w-full flex flex-col items-center">
                {/* Header Banner for Grid View */}
                <div className="w-full rounded-2xl border border-diwali-gold-400/30 bg-diwali-gold-400/10 p-3 sm:p-4 mb-4 backdrop-blur-md flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      All 8 Festive Color Variations
                    </h4>
                    <p className="text-xs text-white/60">
                      Personalized with your chosen {CARD_STYLES.find((s) => s.id === cardStyle)?.name} style, greeting & photo
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleDownloadAllCards}
                    disabled={isGenerating}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-diwali-gold-400 via-diwali-saffron to-diwali-gold-500 px-4 py-2 text-xs font-bold text-diwali-night shadow-md transition hover:scale-105 active:scale-95"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download All 8 (PNG)</span>
                  </button>
                </div>

                {/* 2-Column Responsive Grid of All 8 Cards */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  {CARD_THEMES.map((theme) => {
                    const isSelected = theme.id === themeId;
                    return (
                      <MiniColorCard
                        key={theme.id}
                        theme={theme}
                        cardStyle={cardStyle}
                        isSelected={isSelected}
                        onSelect={() => {
                          setThemeId(theme.id);
                          setPreviewView('single');
                        }}
                        onDownload={() => handleDownloadCard(theme)}
                        isGenerating={isGenerating}
                        renderCardToCanvas={renderCardToCanvas}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
