import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';

export default function OpeningCeremony({ onOpen }) {
  const [isOpening, setIsOpening] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [progress, setProgress] = useState(0);
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
      // Browser autoplay policy requires user gesture
      chimePlayedRef.current = false; // Allow retry on first tap
    }
  };

  // Spectacular celebratory gold & flower petal sparkle burst
  const triggerOpeningSparkles = () => {
    // 1. Center radiant gold starburst
    confetti({
      particleCount: 110,
      spread: 75,
      origin: { y: 0.55 },
      colors: ['#D4AF37', '#FFF0C2', '#FFE58F', '#B88E1F', '#FFFFFF'],
      startVelocity: 45,
      scalar: 1.2,
      ticks: 220
    });

    // 2. Auspicious Keralam flower shower (Rose petals & Jasmine flowers)
    setTimeout(() => {
      confetti({
        particleCount: 65,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.65 },
        colors: ['#D4AF37', '#F43F5E', '#FFFFFF', '#E11D48', '#FCF7E6'],
        scalar: 1.15
      });
      confetti({
        particleCount: 65,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.65 },
        colors: ['#D4AF37', '#F43F5E', '#FFFFFF', '#E11D48', '#FCF7E6'],
        scalar: 1.15
      });
    }, 200);

    // 3. Falling starlight shimmer
    setTimeout(() => {
      confetti({
        particleCount: 90,
        spread: 130,
        origin: { y: 0.35 },
        colors: ['#D4AF37', '#FFF6D5', '#FFE066', '#FFD700'],
        gravity: 0.75,
        scalar: 0.95,
        ticks: 260
      });
    }, 450);
  };

  const handleOpenInvitation = (fromUserGesture = false) => {
    if (isOpening) return;
    setIsOpening(true);

    if (fromUserGesture) {
      // Direct user tap: browser guarantees full audio playback!
      playChimeSound();
    } else {
      // Auto-opened by timer: attempt chime
      playChimeSound().catch(() => {});

      // If browser blocked sound due to lack of prior tap, play on first screen interaction
      const playOnFirstTouch = () => {
        playChimeSound();
        window.removeEventListener('pointerdown', playOnFirstTouch);
        window.removeEventListener('touchstart', playOnFirstTouch);
        window.removeEventListener('click', playOnFirstTouch);
      };
      window.addEventListener('pointerdown', playOnFirstTouch, { once: true, passive: true });
      window.addEventListener('touchstart', playOnFirstTouch, { once: true, passive: true });
      window.addEventListener('click', playOnFirstTouch, { once: true });
    }

    triggerOpeningSparkles();

    if (onOpen) {
      onOpen();
    }

    // Smooth curtain lift
    setTimeout(() => {
      setIsClosed(true);
    }, 850);
  };

  // Automatic opening animation fallback after 2.2 seconds
  useEffect(() => {
    const duration = 2200;
    const intervalTime = 30;
    const step = (intervalTime / duration) * 100;

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + step;
      });
    }, intervalTime);

    const autoOpenTimer = setTimeout(() => {
      handleOpenInvitation(false);
    }, duration);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(autoOpenTimer);
    };
  }, []);

  if (isClosed) return null;

  return (
    <div
      className={`opening-ceremony-overlay ${isOpening ? 'fade-out' : ''}`}
      onClick={() => handleOpenInvitation(true)}
      role="dialog"
      aria-modal="true"
      aria-label="Wedding Invitation Envelope"
      style={{ cursor: 'pointer' }}
    >
      <div className={`royal-envelope-card glass-card ${isOpening ? 'card-unfold' : ''}`}>
        
        {/* Decorative Auspicious Top Header */}
        <div className="opening-top-invocation">
          <p className="font-malayalam gold-accent opening-sloka-title">
            ॥ ശ്രീ ഗുരുഭ്യോ നമഃ • ശുഭ വിവാഹം ॥
          </p>
          <div className="opening-divider-line">
            <span className="line" />
            <Sparkles size={16} className="gold-accent" />
            <span className="line" />
          </div>
        </div>

        {/* Sacred Glowing Lamp Emblem */}
        <div className="opening-lamp-wrapper">
          <div className="opening-lamp-halo">
            <span className="opening-lamp-emoji">🪔</span>
          </div>
          <span className="opening-invitation-sub">WEDDING INVITATION</span>
        </div>

        {/* Couple Names */}
        <div className="opening-couple-names">
          <h1 className="opening-name-text text-gold-gradient font-royal">
            {weddingConfig.groom.fullName}
          </h1>
          <span className="opening-ampersand font-script">&</span>
          <h1 className="opening-name-text text-gold-gradient font-royal">
            {weddingConfig.bride.fullName}
          </h1>
        </div>

        {/* Date & Location Pill */}
        <div className="opening-date-pill">
          <span>{weddingConfig.weddingDateFormatted}</span>
          <span className="pill-dot">•</span>
          <span>{weddingConfig.venue.name}, {weddingConfig.venue.city}</span>
        </div>

        {/* Auspicious Note */}
        <p className="opening-note-text font-editorial">
          "With the prayers and blessings of our beloved parents and elders, we joyfully invite you to celebrate our wedding."
        </p>

        {/* Tap to Open with Sound Button */}
        <div className="opening-auto-indicator">
          <div className="opening-progress-track">
            <div className="opening-progress-bar" style={{ width: `${Math.min(progress, 100)}%` }} />
          </div>
          <div className="opening-action-wrapper" style={{ marginTop: '0.85rem' }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleOpenInvitation(true);
              }}
              className="btn-royal-open"
              aria-label="Open wedding invitation with chime sound"
            >
              <Sparkles size={18} className="btn-sparkle-icon" />
              <span className="font-malayalam">ക്ഷണക്കത്ത് തുറക്കുക 🔔</span>
              <span className="btn-en-text">TAP TO OPEN (WITH CHIME)</span>
              <Sparkles size={18} className="btn-sparkle-icon" />
            </button>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--color-gold-300)', marginTop: '0.55rem', opacity: 0.9 }}>
            (Tap button or screen to play auspicious chime)
          </p>
        </div>

      </div>
    </div>
  );
}
