import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';

export default function OpeningCeremony({ onOpen }) {
  const [isOpening, setIsOpening] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const chimePlayedRef = useRef(false);

  // Trigger rich, crystal-clear auspicious sparkle chime sound
  const playChimeSound = async () => {
    if (chimePlayedRef.current) return;
    chimePlayedRef.current = true;

    try {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtxClass) return;
      const ctx = new AudioCtxClass();
      
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      // 7-note ascending celestial sparkle cascade (C5, E5, G5, C6, E6, G6, C7)
      const baseNotes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98, 2093.00];
      const startTime = ctx.currentTime;

      baseNotes.forEach((freq, idx) => {
        const noteStart = startTime + idx * 0.085;

        // Primary clear chime tone
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

        // Secondary sparkle overtone for magical temple chime feel
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
    } catch (e) {
      // Audio autoplay gracefully handled if restricted by browser
    }
  };

  // Spectacular celebratory gold & flower petal sparkle burst
  const triggerOpeningSparkles = () => {
    // 1. Center radiant gold starburst
    confetti({
      particleCount: 110,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#D4AF37', '#FFF0C2', '#FFE58F', '#B88E1F', '#FFFFFF'],
      startVelocity: 50,
      scalar: 1.2,
      ticks: 230
    });

    // 2. Auspicious Keralam flower shower (Rose petals & Jasmine flowers)
    setTimeout(() => {
      confetti({
        particleCount: 70,
        angle: 60,
        spread: 65,
        origin: { x: 0, y: 0.6 },
        colors: ['#D4AF37', '#F43F5E', '#FFFFFF', '#E11D48', '#FCF7E6'],
        scalar: 1.15
      });
      confetti({
        particleCount: 70,
        angle: 120,
        spread: 65,
        origin: { x: 1, y: 0.6 },
        colors: ['#D4AF37', '#F43F5E', '#FFFFFF', '#E11D48', '#FCF7E6'],
        scalar: 1.15
      });
    }, 180);

    // 3. Falling starlight shimmer
    setTimeout(() => {
      confetti({
        particleCount: 90,
        spread: 140,
        origin: { y: 0.3 },
        colors: ['#D4AF37', '#FFF6D5', '#FFE066', '#FFD700'],
        gravity: 0.75,
        scalar: 0.95,
        ticks: 260
      });
    }, 400);
  };

  const handleOpenInvitation = (fromUserGesture = false) => {
    if (isOpening) return;
    setIsOpening(true);

    if (fromUserGesture) {
      playChimeSound();
    } else {
      playChimeSound().catch(() => {});
    }

    triggerOpeningSparkles();

    if (onOpen) {
      onOpen();
    }

    // After 3D doors swing open, fade out overlay and unmount
    setTimeout(() => {
      setIsClosed(true);
    }, 1100);
  };

  // Automatically open the doors after a brief cinematic pause to register the grand entrance
  useEffect(() => {
    const autoOpenTimer = setTimeout(() => {
      handleOpenInvitation(false);
    }, 900);

    return () => {
      clearTimeout(autoOpenTimer);
    };
  }, []);

  if (isClosed) return null;

  return (
    <div
      className={`royal-doors-overlay ${isOpening ? 'doors-opened' : ''}`}
      onClick={() => handleOpenInvitation(true)}
      role="dialog"
      aria-modal="true"
      aria-label="Royal Palace Wedding Doors"
      style={{ cursor: 'pointer' }}
    >
      {/* ==============================================================
          LEFT DOOR PANEL (Swings Open to the Left)
          ============================================================== */}
      <div className="royal-door-panel door-left">
        <div className="door-panel-texture">
          
          {/* Kasavu Gold Border Trims */}
          <div className="door-kasavu-trim trim-top" />
          <div className="door-kasavu-trim trim-bottom" />
          <div className="door-inner-seam" />

          {/* Carved Palace Arch Inset */}
          <div className="door-arch-inset">
            <div className="door-invocation">
              <span className="font-malayalam door-sloka">॥ ശ്രീ ഗുരുഭ്യോ നമഃ ॥</span>
              <span className="door-sub-motif">❦</span>
            </div>

            {/* Embossed Royal Monogram */}
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

          {/* Traditional Brass Door Knocker Handle */}
          <div className="door-handle handle-left">
            <div className="handle-plate">
              <div className="handle-ring" />
            </div>
          </div>

        </div>
      </div>

      {/* ==============================================================
          RIGHT DOOR PANEL (Swings Open to the Right)
          ============================================================== */}
      <div className="royal-door-panel door-right">
        <div className="door-panel-texture">
          
          {/* Kasavu Gold Border Trims */}
          <div className="door-kasavu-trim trim-top" />
          <div className="door-kasavu-trim trim-bottom" />
          <div className="door-inner-seam" />

          {/* Carved Palace Arch Inset */}
          <div className="door-arch-inset">
            <div className="door-invocation">
              <span className="font-malayalam door-sloka">॥ ശുഭ വിവാഹം ॥</span>
              <span className="door-sub-motif">❦</span>
            </div>

            {/* Embossed Royal Monogram */}
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

          {/* Traditional Brass Door Knocker Handle */}
          <div className="door-handle handle-right">
            <div className="handle-plate">
              <div className="handle-ring" />
            </div>
          </div>

        </div>
      </div>

      {/* ==============================================================
          CENTER ROYAL MEDALLION (The Auspicious Gate Lock / Seal)
          ============================================================== */}
      <div className="royal-center-medallion glass-card">
        
        {/* Glowing Nilavilakku Halo */}
        <div className="medallion-lamp-wrapper">
          <div className="medallion-lamp-halo">
            <span className="medallion-lamp-icon">🪔</span>
          </div>
          <span className="medallion-tag">WEDDING INVITATION</span>
        </div>

        {/* Couple Names */}
        <div className="medallion-names">
          <h2 className="medallion-name font-royal text-gold-gradient">{weddingConfig.groom.name}</h2>
          <span className="medallion-ampersand font-script">&</span>
          <h2 className="medallion-name font-royal text-gold-gradient">{weddingConfig.bride.name}</h2>
        </div>

        {/* Auspicious Date */}
        <div className="medallion-date-pill">
          <span>{weddingConfig.weddingDateFormatted}</span>
        </div>

        {/* Auspicious Blessing Seal */}
        <div className="medallion-blessing-seal">
          <div className="medallion-divider">
            <span className="divider-line" />
            <Sparkles size={14} className="gold-accent" />
            <span className="divider-line" />
          </div>
          <span className="font-malayalam medallion-blessing-text">॥ ശുഭ വിവാഹം • മംഗളം ഭവതു ॥</span>
        </div>

      </div>

    </div>
  );
}
