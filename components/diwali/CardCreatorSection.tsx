'use client';

import { useCallback, useEffect, useRef, useState, type ChangeEvent } from 'react';
import {
  Check,
  Copy,
  Download,
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
    presetMessages: [
      'May the warm glow of diyas illuminate your home with boundless prosperity, health, and endless joy.',
      'Wishing you and your beloved family a sparkling, vibrant, and blessed Deepavali filled with sweet memories!',
      'May Goddess Lakshmi bless you with abundance and Lord Ganesha remove every obstacle from your path.',
      'Let this Festival of Lights kindle new beginnings, radiant hopes, and peaceful triumphs in your life.',
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
    presetMessages: [
      'Wishing you a sparkling Deepavali and a joyous, prosperous Happy New Year filled with sweet blessings!',
      'May the light of diyas brighten your life and the New Year usher in endless joy, peace, and good health.',
      'Happy Diwali & Saal Mubarak! May Goddess Lakshmi shower your home with abundance in the year ahead.',
      'Celebrating the triumph of light and welcoming a radiant New Year full of fresh hopes and grand achievements!',
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
];

// Pure canvas artwork helper functions
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
) {
  // Garland arch connecting them
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 224, 138, 0.4)';
  ctx.lineWidth = 1.5 * scaleFactor;
  ctx.setLineDash([4 * scaleFactor, 4 * scaleFactor]);
  ctx.beginPath();
  ctx.moveTo(width / 2 - 380 * scaleFactor, baseY + 45 * scaleFactor);
  ctx.quadraticCurveTo(
    width / 2 - 135 * scaleFactor,
    baseY + 65 * scaleFactor,
    width / 2,
    baseY + 55 * scaleFactor,
  );
  ctx.quadraticCurveTo(
    width / 2 + 135 * scaleFactor,
    baseY + 65 * scaleFactor,
    width / 2 + 380 * scaleFactor,
    baseY + 45 * scaleFactor,
  );
  ctx.stroke();
  ctx.restore();

  // Center Diya
  drawOrnateDiya(ctx, width / 2, baseY, 0.65 * scaleFactor, primaryColor);
  // Left flanking Diya
  drawOrnateDiya(
    ctx,
    width / 2 - 270 * scaleFactor,
    baseY + 12 * scaleFactor,
    0.45 * scaleFactor,
    primaryColor,
  );
  // Right flanking Diya
  drawOrnateDiya(
    ctx,
    width / 2 + 270 * scaleFactor,
    baseY + 12 * scaleFactor,
    0.45 * scaleFactor,
    primaryColor,
  );
}

export function CardCreatorSection() {
  const [occasionId, setOccasionId] = useState<string>('diwali');
  const [senderName, setSenderName] = useState('The Sharma Family');
  const [recipientName, setRecipientName] = useState('Dearest Friends & Family');
  const [themeId, setThemeId] = useState<string>('midnight-gold');
  const [userImage, setUserImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [textCopied, setTextCopied] = useState(false);

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

  // ==========================================
  // MASTER CANVAS RENDERER (1080 x 1350)
  // ==========================================
  const renderCardToCanvas = useCallback(
    async (canvas: HTMLCanvasElement, scaleFactor: number = 1) => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = 1080 * scaleFactor;
      const height = 1350 * scaleFactor;
      canvas.width = width;
      canvas.height = height;

      // 1. Rich Background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, currentTheme.bgGradient[0]);
      bgGrad.addColorStop(0.5, currentTheme.bgGradient[1]);
      bgGrad.addColorStop(1, currentTheme.bgGradient[2]);
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Central ambient glowing aura
      const radialGlow = ctx.createRadialGradient(
        width / 2,
        420 * scaleFactor,
        60 * scaleFactor,
        width / 2,
        420 * scaleFactor,
        500 * scaleFactor,
      );
      radialGlow.addColorStop(0, 'rgba(255, 224, 138, 0.28)');
      radialGlow.addColorStop(0.4, currentTheme.glowColor);
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
      bottomGlow.addColorStop(0.5, currentTheme.glowColor);
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

      // 3. Ornate Double Gold Borders
      const outerMargin = 38 * scaleFactor;
      const innerMargin = 52 * scaleFactor;

      // Outer gold border
      ctx.strokeStyle = currentTheme.borderColor;
      ctx.lineWidth = 3.5 * scaleFactor;
      ctx.strokeRect(outerMargin, outerMargin, width - outerMargin * 2, height - outerMargin * 2);

      // Inner subtle border
      ctx.strokeStyle = 'rgba(255, 240, 180, 0.38)';
      ctx.lineWidth = 1.5 * scaleFactor;
      ctx.strokeRect(innerMargin, innerMargin, width - innerMargin * 2, height - innerMargin * 2);

      // Royal corner filigree ornaments (all 4 corners)
      const drawRoyalCorner = (cx: number, cy: number, rot: number) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rot);
        ctx.strokeStyle = currentTheme.borderColor;
        ctx.fillStyle = currentTheme.borderColor;
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

      // 4. Hanging Decorative Brass Lanterns (Top left and right)
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
        ctx.fillStyle = currentTheme.borderColor;
        for (let y = 14 * scaleFactor; y < chainLen; y += 18 * scaleFactor) {
          ctx.beginPath();
          ctx.arc(0, y, 2 * scaleFactor, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.translate(0, chainLen);

        // Lantern cap
        ctx.fillStyle = currentTheme.borderColor;
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
        ctx.strokeStyle = currentTheme.borderColor;
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
        ctx.strokeStyle = currentTheme.borderColor;
        ctx.lineWidth = 1.5 * lScale;
        ctx.beginPath();
        ctx.moveTo(0, 44 * lScale);
        ctx.lineTo(0, 62 * lScale);
        ctx.stroke();

        ctx.fillStyle = currentTheme.borderColor;
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

      // 5. Header: Occasion Badge
      ctx.textAlign = 'center';
      ctx.fillStyle = currentTheme.accentColor;
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

      // 6. Centerpiece: Uploaded Photo OR Grand Royal Diya
      const photoCenterY = 415 * scaleFactor;
      const photoRadius = 135 * scaleFactor;

      if (userImage) {
        // Draw user photo in royal gold-filigree framed circle
        try {
          const img = await new Promise<HTMLImageElement>((resolve, reject) => {
            const image = new Image();
            image.onload = () => resolve(image);
            image.onerror = reject;
            image.src = userImage;
          });

          // Outer radiating beads
          for (let i = 0; i < 24; i++) {
            const a = (i * Math.PI * 2) / 24;
            ctx.fillStyle = currentTheme.borderColor;
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
          ctx.strokeStyle = currentTheme.borderColor;
          ctx.lineWidth = 5 * scaleFactor;
          ctx.shadowColor = 'rgba(245, 201, 106, 0.65)';
          ctx.shadowBlur = 24 * scaleFactor;
          ctx.beginPath();
          ctx.arc(width / 2, photoCenterY, photoRadius + 6 * scaleFactor, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();

          // Clip and draw image
          ctx.save();
          ctx.beginPath();
          ctx.arc(width / 2, photoCenterY, photoRadius, 0, Math.PI * 2);
          ctx.clip();

          // Aspect ratio crop
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
        } catch {
          drawOrnateDiya(ctx, width / 2, photoCenterY, scaleFactor, currentTheme.borderColor);
        }
      } else {
        drawOrnateDiya(ctx, width / 2, photoCenterY, scaleFactor, currentTheme.borderColor);
      }

      // 7. Recipient Greeting
      let currentY = 605 * scaleFactor;
      if (recipientName.trim()) {
        ctx.fillStyle = currentTheme.accentColor;
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
      ctx.fillStyle = currentTheme.borderColor;
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
      // Solves the previous empty bottom void with festive grandeur!
      const bottomBaseY = 1070 * scaleFactor;
      drawBottomDiyaTrio(ctx, width, bottomBaseY, scaleFactor, currentTheme.borderColor);

      // 12. Footer Tagline with Sparkles
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.font = `600 ${15 * scaleFactor}px 'Manrope', sans-serif`;
      ctx.fillText(
        `✦  ${currentOccasion.tagline}  ✦`,
        width / 2,
        height - 68 * scaleFactor,
      );
    },
    [currentTheme, currentOccasion, userImage, recipientName, message, senderName],
  );

  // Live render on preview canvas whenever any state changes
  useEffect(() => {
    const canvas = previewCanvasRef.current;
    if (!canvas) return;
    void renderCardToCanvas(canvas, 0.5); // 540x675 for crisp, fast live preview
  }, [renderCardToCanvas]);

  // High-Resolution Download Generator
  const handleDownloadCard = async () => {
    setIsGenerating(true);
    try {
      const exportCanvas = document.createElement('canvas');
      // 1080 x 1350 px (HD standard aspect ratio for social media & print)
      await renderCardToCanvas(exportCanvas, 1);

      const dataUrl = exportCanvas.toDataURL('image/png');
      const link = document.createElement('a');
      const safeName = (senderName || 'Greetings').replace(/[^a-zA-Z0-9_-]/g, '_');
      link.download = `${currentOccasion.filenamePrefix}_${safeName}.png`;
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
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <section id="card-creator" className="relative py-24 px-5 sm:px-8 scroll-mt-20">
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

        <div className="mt-14 grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
          {/* LEFT: Customization Form */}
          <div className="glass-panel p-6 sm:p-8 lg:col-span-7">
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-diwali-gold-400/20 text-diwali-gold-300">
                  <Sparkles className="h-5 w-5" />
                </span>
                <h3 className="font-display text-2xl font-semibold text-white">
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

            <div className="mt-6 space-y-6">
              {/* Occasion / Card Type Selector */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-diwali-gold-300">
                  <Sparkles className="h-3.5 w-3.5" />
                  Select Card Type / Occasion
                </label>
                <div className="mt-2.5 grid grid-cols-3 gap-2">
                  {CARD_OCCASIONS.map((occ) => {
                    const isSelected = occ.id === occasionId;
                    return (
                      <button
                        key={occ.id}
                        type="button"
                        onClick={() => handleOccasionChange(occ.id)}
                        className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 rounded-xl border p-2.5 text-center text-xs font-semibold transition ${
                          isSelected
                            ? 'border-diwali-gold-400 bg-diwali-gold-400/20 text-diwali-gold-200 shadow-[0_0_15px_rgba(245,201,106,0.3)]'
                            : 'border-white/10 bg-white/5 text-white/70 hover:border-white/25 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <span className="text-base">{occ.icon}</span>
                        <span>{occ.name}</span>
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
                  className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 backdrop-blur-sm transition focus:border-diwali-gold-400 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-diwali-gold-400"
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
                  className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 backdrop-blur-sm transition focus:border-diwali-gold-400 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-diwali-gold-400"
                />
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-diwali-gold-300">
                  Your Photo / Family Portrait
                </label>
                <div className="mt-2">
                  {userImage ? (
                    <div className="flex items-center gap-4 rounded-xl border border-diwali-gold-400/40 bg-white/5 p-3 backdrop-blur-sm">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={userImage}
                        alt="Uploaded preview"
                        className="h-16 w-16 rounded-full border-2 border-diwali-gold-400 object-cover shadow-md"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">Photo selected</p>
                        <p className="text-xs text-diwali-gold-300/80">
                          Framed in royal gold filigree on your card
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
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
                          title="Remove photo"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/20 bg-white/[0.03] p-6 text-center transition hover:border-diwali-gold-400/70 hover:bg-white/[0.07]"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-diwali-gold-400/10 text-diwali-gold-300 transition group-hover:scale-110">
                        <Upload className="h-6 w-6" />
                      </div>
                      <p className="mt-3 text-sm font-medium text-white">
                        Click to upload your portrait photo
                      </p>
                      <p className="mt-1 text-xs text-white/50">
                        PNG, JPG or WebP (Or keep empty for Grand Royal Diya)
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
                <div className="mt-2.5 grid grid-cols-2 gap-2.5 sm:grid-cols-5">
                  {CARD_THEMES.map((theme) => {
                    const isSelected = theme.id === themeId;
                    return (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => setThemeId(theme.id)}
                        className={`group relative flex flex-col items-center gap-2 rounded-xl border p-3 text-left transition ${
                          isSelected
                            ? 'border-diwali-gold-400 bg-white/15 shadow-[0_0_20px_rgba(245,201,106,0.3)]'
                            : 'border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10'
                        }`}
                      >
                        <div
                          className="h-7 w-full rounded-md shadow-inner"
                          style={{
                            background: `linear-gradient(135deg, ${theme.bgGradient[0]}, ${theme.bgGradient[1]})`,
                            border: `1px solid ${theme.borderColor}`,
                          }}
                        />
                        <span className="text-[11px] font-medium text-white group-hover:text-diwali-gold-300 text-center">
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
                  className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 p-3 text-sm text-white placeholder-white/40 backdrop-blur-sm transition focus:border-diwali-gold-400 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-diwali-gold-400"
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

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleDownloadCard}
                  disabled={isGenerating}
                  className="group relative flex-1 inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full border border-diwali-gold-300/40 bg-gradient-to-r from-diwali-gold-400 via-diwali-saffron to-diwali-gold-500 py-3.5 px-6 font-semibold text-diwali-night shadow-[0_0_25px_rgba(245,201,106,0.5)] transition duration-300 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(245,201,106,0.7)] active:scale-[0.98] disabled:opacity-50"
                >
                  <Download className="h-5 w-5" />
                  <span>{isGenerating ? 'Rendering HD Card...' : 'Download HD Card (PNG)'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleShareCard}
                  className="glass-button !py-3.5 !px-6"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="h-4 w-4 text-diwali-gold-300" />
                      <span>Share</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Live Interactive Preview */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full text-center mb-3 flex items-center justify-between px-2">
              <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-diwali-gold-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Card Preview
              </span>
              <span className="text-xs text-white/50">1080 × 1350 High-Res</span>
            </div>

            {/* Frame container for canvas */}
            <div className="relative w-full max-w-[430px] rounded-2xl border border-diwali-gold-400/40 p-2.5 bg-gradient-to-b from-white/15 via-white/5 to-black/40 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.9)] backdrop-blur-2xl transition hover:border-diwali-gold-400/70">
              <canvas
                ref={previewCanvasRef}
                className="w-full h-auto rounded-xl shadow-2xl block border border-white/10"
                style={{ aspectRatio: '1080 / 1350' }}
              />

              {/* Bottom Quick-Action Bar */}
              <div className="mt-3.5 flex items-center justify-between gap-2 px-1">
                <span className="text-xs text-diwali-gold-300/90 font-medium truncate">
                  {currentOccasion.icon} {currentOccasion.name} • {currentTheme.name}
                </span>
                <div className="flex items-center gap-2">
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
                        <span>Copy Text</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleDownloadCard}
                    disabled={isGenerating}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-diwali-gold-400/20 border border-diwali-gold-400/40 px-3 py-1.5 text-xs font-semibold text-diwali-gold-300 transition hover:bg-diwali-gold-400 hover:text-diwali-night"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Save PNG</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
