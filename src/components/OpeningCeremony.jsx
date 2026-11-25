import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import confetti from 'canvas-confetti';
import { Sparkles } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';

export default function OpeningCeremony({ onOpen }) {
  const [isOpening, setIsOpening] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const chimePlayedRef = useRef(false);

  const playChimeSound = async () => {
    if (chimePlayedRef.current) return;
    chimePlayedRef.current = true;
    try {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtxClass) return;
      const ctx = new AudioCtxClass();
      if (ctx.state === 'suspended') await ctx.resume();

      const baseNotes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98, 2093.00];
      const startTime = ctx.currentTime;

      baseNotes.forEach((freq, idx) => {
        const noteStart = startTime + idx * 0.085;

        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(freq, noteStart);
        gain1.gain.setValueAtTime(0.0001, noteStart);
        gain1.gain.linearRampToValueAtTime(0.35, noteStart + 0.025);
        gain1.gain.exponentialRampToValueAtTime(0.0001, noteStart + 1.2);
        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc1.start(noteStart);
        osc1.stop(noteStart + 1.25);

        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(freq * 2, noteStart);
        gain2.gain.setValueAtTime(0.0001, noteStart);
        gain2.gain.linearRampToValueAtTime(0.14, noteStart + 0.02);
        gain2.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.85);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start(noteStart);
        osc2.stop(noteStart + 0.9);
      });
    } catch (e) {}
  };

  const triggerOpeningSparkles = () => {
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#E5A500', '#FFE89A', '#F5C842', '#C8870A', '#FFFFFF'],
      startVelocity: 55,
      scalar: 1.2,
      ticks: 250
    });
    setTimeout(() => {
      confetti({ particleCount: 80, angle: 60,  spread: 70, origin: { x: 0,   y: 0.6 }, colors: ['#E5A500', '#E11D48', '#FFFFFF', '#FCF7E6'], scalar: 1.15 });
      confetti({ particleCount: 80, angle: 120, spread: 70, origin: { x: 1,   y: 0.6 }, colors: ['#E5A500', '#E11D48', '#FFFFFF', '#FCF7E6'], scalar: 1.15 });
    }, 200);
    setTimeout(() => {
      confetti({ particleCount: 100, spread: 160, origin: { y: 0.3 }, colors: ['#E5A500', '#FFF6D5', '#FFE066', '#FFD700'], gravity: 0.7, scalar: 0.9, ticks: 280 });
    }, 450);
  };

  const handleOpenInvitation = (fromUserGesture = false) => {
    if (isOpening) return;
    setIsOpening(true);

    if (fromUserGesture) playChimeSound();
    else playChimeSound().catch(() => {});

    triggerOpeningSparkles();
    if (onOpen) onOpen();

    // Wait for door swing animation to finish, then unmount
    setTimeout(() => setIsClosed(true), 1400);
  };

  // Auto-open after a generous pause — longer on mobile so it's clearly seen
  useEffect(() => {
    // Give the page enough time to fully paint before auto-opening
    const delay = 2200;
    const timer = setTimeout(() => handleOpenInvitation(false), delay);
    return () => clearTimeout(timer);
  }, []);

  if (isClosed) return null;

  // ── Render via Portal into document.body ──────────────────────
  // This escapes any parent overflow / transform / stacking context
  // so the overlay always covers the full viewport on mobile Safari too.
  const overlay = (
    <div
      className={`royal-doors-overlay ${isOpening ? 'doors-opened' : ''}`}
      onClick={() => handleOpenInvitation(true)}
      role="dialog"
      aria-modal="true"
      aria-label="Royal Wedding Doors — tap to open"
    >
      {/* LEFT DOOR */}
      <div className="royal-door-panel door-left">
        <div className="door-panel-texture">
          <div className="door-kasavu-trim trim-top" />
          <div className="door-kasavu-trim trim-bottom" />
          <div className="door-inner-seam" />

          <div className="door-arch-inset">
            <div className="door-invocation">
              <span className="font-malayalam door-sloka">॥ ശ്രീ ഗുരുഭ്യോ നമഃ ॥</span>
              <span className="door-sub-motif">❦</span>
            </div>
            <div className="door-monogram-ring">
              <span className="door-monogram font-royal">M</span>
              <span className="door-monogram-role font-malayalam">വരൻ</span>
            </div>
            <div className="door-filigree-bottom">
              <span className="filigree-line" />
              <span className="filigree-symbol">✤</span>
              <span className="filigree-line" />
            </div>
          </div>

          <div className="door-handle handle-left">
            <div className="handle-plate"><div className="handle-ring" /></div>
          </div>
        </div>
      </div>

      {/* RIGHT DOOR */}
      <div className="royal-door-panel door-right">
        <div className="door-panel-texture">
          <div className="door-kasavu-trim trim-top" />
          <div className="door-kasavu-trim trim-bottom" />
          <div className="door-inner-seam" />

          <div className="door-arch-inset">
            <div className="door-invocation">
              <span className="font-malayalam door-sloka">॥ ശുഭ വിവാഹം ॥</span>
              <span className="door-sub-motif">❦</span>
            </div>
            <div className="door-monogram-ring">
              <span className="door-monogram font-royal">P</span>
              <span className="door-monogram-role font-malayalam">വധു</span>
            </div>
            <div className="door-filigree-bottom">
              <span className="filigree-line" />
              <span className="filigree-symbol">✤</span>
              <span className="filigree-line" />
            </div>
          </div>

          <div className="door-handle handle-right">
            <div className="handle-plate"><div className="handle-ring" /></div>
          </div>
        </div>
      </div>

      {/* CENTER MEDALLION */}
      <div className="royal-center-medallion glass-card">
        <div className="medallion-lamp-wrapper">
          <div className="medallion-lamp-halo">
            <span className="medallion-lamp-icon">🪔</span>
          </div>
          <span className="medallion-tag">WEDDING INVITATION</span>
        </div>

        <div className="medallion-names">
          <h2 className="medallion-name font-royal text-gold">{weddingConfig.groom.name}</h2>
          <span className="medallion-ampersand font-script">&</span>
          <h2 className="medallion-name font-royal text-gold">{weddingConfig.bride.name}</h2>
        </div>

        <div className="medallion-date-pill">
          {weddingConfig.weddingDateFormatted}
        </div>

        <div className="medallion-blessing-seal">
          <div className="medallion-divider">
            <span className="divider-line" />
            <Sparkles size={13} className="gold-accent" />
            <span className="divider-line" />
          </div>
          <span className="font-malayalam medallion-blessing-text">
            ॥ ശുഭ വിവാഹം • മംഗളം ഭവതു ॥
          </span>
        </div>

        {/* Tap prompt — especially helpful on mobile */}
        {!isOpening && (
          <div className="door-tap-hint">
            <span className="door-tap-pulse" />
            <span className="door-tap-text">Tap to open</span>
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(overlay, document.body);
}
