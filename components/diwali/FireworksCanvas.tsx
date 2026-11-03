'use client';

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  type PointerEvent,
} from 'react';
import { FireworksEngine, type CrackerKind } from '@/lib/diwali/fireworks-engine';
import type { SoundEngine } from '@/lib/diwali/sound-engine';

export interface FireworksHandle {
  launchRocket: () => void;
  launchCracker: (kind: CrackerKind) => void;
  setAutoRunning: (on: boolean) => void;
  clear: () => void;
}

interface FireworksCanvasProps {
  sound: SoundEngine;
}

export const FireworksCanvas = forwardRef<FireworksHandle, FireworksCanvasProps>(
  function FireworksCanvas({ sound }, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const engineRef = useRef<FireworksEngine | null>(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx) return;

      const engine = new FireworksEngine(canvas, ctx, (cue) => sound.play(cue));
      engineRef.current = engine;

      const resize = () => {
        engine.resize(
          window.innerWidth,
          window.innerHeight,
          Math.min(window.devicePixelRatio || 1, 2),
        );
      };
      resize();
      window.addEventListener('resize', resize);

      return () => {
        window.removeEventListener('resize', resize);
        engine.destroy();
        engineRef.current = null;
      };
    }, [sound]);

    useImperativeHandle(
      ref,
      () => ({
        launchRocket: () => engineRef.current?.launchRocket(),
        launchCracker: (kind) => engineRef.current?.launchCracker(kind),
        setAutoRunning: (on) => engineRef.current?.setAutoRunning(on),
        clear: () => engineRef.current?.clear(),
      }),
      [],
    );

    const handlePointerDown = (event: PointerEvent<HTMLCanvasElement>) => {
      engineRef.current?.launchRocket(event.clientX, event.clientY);
    };

    return (
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        aria-label="Night sky. Tap anywhere to launch a firework"
        className="fixed inset-0 h-full w-full cursor-crosshair touch-none"
      />
    );
  },
);
